import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { PresentationPolicy } from '@typicalbits/fl-tools-core';
import { pageLoadingMode } from '../src/basic-product.js';
import { cardRequests } from '../src/filter-engine.js';
import {
  InfiniteScrollController,
  InfiniteScrollTrigger,
  INFINITE_SCROLL_OBSERVER_OPTIONS,
} from '../src/infinite-scroll.js';
import { mediaRequest } from '../src/media.js';
import { BasicNavigation } from '../src/navigation.js';
import { PageEnhancements } from '../src/page-enhancements.js';
import { BrowserPageLoader, nativeNextPage } from '../src/page-loader.js';
import { BasicProfileState } from '../src/profile-state.js';
import { normalizeBasicSettings } from '../src/settings.js';

class MemoryStorage {
  records = new Map();

  async get(_store, key) {
    return globalThis.structuredClone(this.records.get(key));
  }

  async put(_store, key, value, { expectedRevision } = {}) {
    const current = this.records.get(key);
    assert.equal(current?.revision ?? 0, expectedRevision ?? current?.revision ?? 0);
    const record = {
      recordKey: key,
      revision: (current?.revision ?? 0) + 1,
      value: globalThis.structuredClone(value),
    };
    this.records.set(key, record);
    return globalThis.structuredClone(record);
  }

  async list() {
    return globalThis.structuredClone([...this.records.values()]);
  }
}

test('Seen records only eligible visits and reset preserves unrelated person state', async () => {
  const storage = new MemoryStorage();
  storage.records.set('42', {
    recordKey: '42',
    revision: 1,
    value: {
      favorite: true,
      note: { body: 'Pro-owned note' },
      personId: '42',
      quietUntil: 9000,
    },
  });
  const state = new BasicProfileState({ clock: () => 1000, storage });
  assert.equal(
    (await state.markSeen({ personId: '42', routeKind: 'FEED' })).status,
    'NOT_ELIGIBLE',
  );
  assert.equal(
    (
      await state.markSeen({
        displayName: 'Person 42',
        personId: '42',
        profileUrl: 'https://fetlife.com/users/42?source=test',
        routeKind: 'PROFILE',
      })
    ).status,
    'RECORDED',
  );
  assert.equal((await storage.get('people', '42')).value.basic.seenAt, 1000);
  assert.deepEqual(await state.listRecentlyVisited(), [
    {
      displayName: 'Person 42',
      personId: '42',
      profileUrl: 'https://fetlife.com/users/42',
      seenAt: 1000,
    },
  ]);
  assert.equal((await state.listRecentlyVisited({ query: 'person 42' })).length, 1);
  assert.equal(await state.markUnseen('42'), true);
  assert.deepEqual(await state.listRecentlyVisited(), []);
  await state.markSeen({ personId: '42', routeKind: 'PROFILE' });
  assert.equal((await state.resetSeen({ confirm: () => false })).status, 'CANCELLED');
  const reset = await state.resetSeen({ confirm: () => true });
  assert.equal(reset.cleared, 1);
  assert.equal((await storage.get('people', '42')).value.favorite, true);
  assert.deepEqual((await storage.get('people', '42')).value.note, { body: 'Pro-owned note' });
  assert.equal((await storage.get('people', '42')).value.quietUntil, 9000);
  assert.equal((await storage.get('people', '42')).value.basic.seenAt, undefined);
});

test('Recently Visited retains only three profiles without deleting other person state', async () => {
  const storage = new MemoryStorage();
  let now = 0;
  const state = new BasicProfileState({ clock: () => ++now, storage });
  for (const personId of ['1', '2', '3', '4']) {
    if (personId === '1') {
      await state.setSoftBlock({ personId, presentation: 'dim', reason: 'Keep this state' });
    }
    await state.markSeen({
      displayName: `Person ${personId}`,
      personId,
      profileUrl: `https://fetlife.com/users/${personId}`,
      routeKind: 'PROFILE',
    });
  }
  assert.deepEqual(
    (await state.listRecentlyVisited()).map(({ personId }) => personId),
    ['4', '3', '2'],
  );
  const oldest = await storage.get('people', '1');
  assert.equal(oldest.value.basic.seenAt, undefined);
  assert.equal(oldest.value.basic.profileUrl, undefined);
  assert.equal(oldest.value.basic.softBlock.reason, 'Keep this state');
});

test('auto profile loading is exclusive to place kinkster lists', () => {
  assert.equal(pageLoadingMode({ kind: 'profile', params: { placeList: true } }), 'profile');
  assert.equal(pageLoadingMode({ kind: 'profile', params: {} }), 'page');
  assert.equal(pageLoadingMode({ kind: 'feed', params: {} }), 'page');
  assert.equal(pageLoadingMode({ kind: 'unknown', params: { path: '/tags/example' } }), 'page');
});

test('Soft Block is local and native Block never runs without explicit confirmation', async () => {
  const storage = new MemoryStorage();
  const state = new BasicProfileState({ clock: () => 55, storage });
  await state.setSoftBlock({
    personId: '7',
    presentation: 'dim',
    reason: 'Not a match',
  });
  assert.deepEqual(await state.listSoftBlocks(), [
    {
      createdAt: 55,
      displayName: null,
      personId: '7',
      presentation: 'dim',
      reason: 'Not a match',
    },
  ]);
  let nativeCalls = 0;
  assert.equal(
    (
      await state.nativeBlock({
        confirm: () => false,
        perform: () => {
          nativeCalls += 1;
        },
        personId: '7',
      })
    ).status,
    'CANCELLED',
  );
  assert.equal(nativeCalls, 0);
  assert.equal(await state.removeSoftBlock('7'), true);
});

test('media policy keeps NSFW visible and applies detailed SFW exceptions', () => {
  const media = normalizeBasicSettings({
    media: {
      blurAvatars: false,
      blurPixels: 6,
      blurVideos: true,
      mode: 'blur',
      preset: 'sfw',
    },
  }).media;
  assert.equal(mediaRequest(media, 'content').requests[0].state, 'BLURRED');
  assert.equal(mediaRequest(media, 'avatar').requests[0].state, 'VISIBLE');
  assert.equal(mediaRequest(media, 'video').requests[0].state, 'BLURRED');
  assert.equal(mediaRequest({ ...media, preset: 'nsfw' }, 'content').requests[0].state, 'VISIBLE');
});

test('fixed shortcuts use single keys with a modified native-conflict chord and remove their listener', () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><input id="edit"><div id="page"></div></body></html>',
  );
  const calls = [];
  const navigation = new BasicNavigation({
    document: dom.window.document,
    handlers: {
      browse: () => calls.push('browse'),
      clean: () => calls.push('clean'),
      nextCard: () => calls.push('nextCard'),
      next: () => calls.push('next'),
      openCard: () => calls.push('openCard'),
      previousCard: () => calls.push('previousCard'),
      sfw: () => calls.push('sfw'),
      standard: () => calls.push('standard'),
      top: () => calls.push('top'),
    },
    window: dom.window,
  });
  navigation.start();
  dom.window.document.getElementById('edit').dispatchEvent(
    new dom.window.KeyboardEvent('keydown', {
      altKey: true,
      bubbles: true,
      code: 'KeyB',
      key: 'B',
      shiftKey: true,
    }),
  );
  for (const [code, key] of [
    ['KeyB', 'B'],
    ['Digit1', '1'],
    ['Digit2', '2'],
    ['Digit3', '3'],
    ['KeyJ', 'J'],
    ['KeyK', 'K'],
    ['Enter', 'Enter'],
    ['KeyN', 'N'],
    ['KeyT', 'T'],
  ]) {
    dom.window.document.getElementById('page').dispatchEvent(
      new dom.window.KeyboardEvent('keydown', {
        altKey: code === 'KeyB',
        bubbles: true,
        code,
        key,
        shiftKey: code === 'KeyB',
      }),
    );
  }
  assert.deepEqual(calls, [
    'browse',
    'standard',
    'clean',
    'sfw',
    'previousCard',
    'nextCard',
    'openCard',
    'next',
    'top',
  ]);
  dom.window.document
    .getElementById('page')
    .dispatchEvent(new dom.window.KeyboardEvent('keydown', { bubbles: true, key: 'B' }));
  dom.window.document.getElementById('page').dispatchEvent(
    new dom.window.KeyboardEvent('keydown', {
      altKey: true,
      bubbles: true,
      code: 'KeyB',
      key: 'B',
      repeat: true,
      shiftKey: true,
    }),
  );
  assert.equal(calls.length, 9);
  navigation.stop();
  dom.window.document.getElementById('page').dispatchEvent(
    new dom.window.KeyboardEvent('keydown', {
      altKey: true,
      bubbles: true,
      code: 'KeyB',
      key: 'B',
      shiftKey: true,
    }),
  );
  assert.equal(calls.length, 9);
});

test('Infinite Scroll allows one active and one queued request and retries failure', async () => {
  let resolveFirst;
  let calls = 0;
  const appended = [];
  const controller = new InfiniteScrollController({
    append: (items) => appended.push(...items),
    fetchPage: async (url) => {
      calls += 1;
      if (calls === 1) await new Promise((resolve) => (resolveFirst = resolve));
      return { items: [url], nextUrl: calls < 2 ? '/page/2' : null };
    },
  });
  controller.configure({ enabled: true, pageLimit: 3 });
  controller.setNext('/page/1');
  const first = controller.requestNext();
  assert.equal((await controller.requestNext()).status, 'QUEUED');
  assert.equal(calls, 1);
  resolveFirst();
  assert.equal((await first).status, 'APPENDED');
  await new Promise((resolve) => globalThis.setTimeout(resolve, 0));
  assert.equal(calls, 2);
  assert.deepEqual(appended, ['/page/1', '/page/2']);
});

test('Infinite Scroll pause, resume, retry, and session counters are explicit', async () => {
  let fail = true;
  const states = [];
  const controller = new InfiniteScrollController({
    append: () => {},
    fetchPage: async () => {
      if (fail) throw new Error('temporary');
      return { items: ['one', 'two'], nextUrl: null };
    },
  });
  controller.subscribe((state) => states.push(state.status));
  controller.configure({ enabled: true, pageLimit: 2 });
  controller.setNext('/page/2');
  controller.pause();
  assert.equal((await controller.requestNext()).status, 'PAUSED');
  controller.resume();
  assert.equal((await controller.requestNext()).status, 'FAILED');
  assert.equal(controller.state.error, 'temporary');
  fail = false;
  assert.equal((await controller.retry()).status, 'APPENDED');
  assert.equal(controller.state.loadedPages, 1);
  assert.equal(controller.state.loadedItems, 2);
  assert.ok(states.includes('PAUSED'));
  assert.ok(states.includes('FAILED'));
});

test('manual next-page requests work without enabling automatic loading', async () => {
  const appended = [];
  const controller = new InfiniteScrollController({
    append: (items) => appended.push(...items),
    fetchPage: async () => ({ items: ['one'], nextUrl: null }),
  });
  controller.configure({ enabled: false, pageLimit: 2 });
  controller.setNext('/page/2');
  assert.equal((await controller.requestNext()).status, 'DISABLED');
  assert.equal((await controller.requestNext({ manual: true })).status, 'APPENDED');
  assert.deepEqual(appended, ['one']);
  assert.equal(controller.state.enabled, false);
});

test('disabled Infinite Scroll adds no trigger and preserves native pagination', () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><main role="feed"></main><a rel="next" href="/page/2">Next</a></body></html>',
    { url: 'https://fetlife.com/page/1' },
  );
  let observed = 0;
  const trigger = new InfiniteScrollTrigger({
    controller: { requestNext: async () => ({ status: 'END' }) },
    document: dom.window.document,
    observerFactory: () => ({
      disconnect() {},
      observe() {
        observed += 1;
      },
    }),
  });
  assert.equal(trigger.start({ enabled: false }), false);
  assert.equal(observed, 0);
  assert.equal(dom.window.document.querySelector('.flt-basic-scroll-sentinel'), null);
  assert.equal(dom.window.document.querySelector('a[rel="next"]').textContent, 'Next');
});

test('filter, Seen, and Soft Block presentation each apply and fully restore a card', () => {
  const dom = new JSDOM('<!doctype html><html><body><article></article></body></html>');
  const card = dom.window.document.querySelector('article');
  const policy = new PresentationPolicy({ document: dom.window.document });
  const settings = normalizeBasicSettings({
    filters: { resultMode: 'dim' },
    seen: { presentation: 'hide' },
    softBlock: { presentation: 'dim' },
  });
  const cases = [
    {
      expected: 'DIMMED',
      state: { filterResult: { status: 'NO_MATCH' } },
    },
    {
      expected: 'HIDDEN',
      state: { filterResult: { status: 'MATCH' }, seen: true },
    },
    {
      expected: 'DIMMED',
      state: { filterResult: { status: 'MATCH' }, softBlocked: true },
    },
  ];
  for (const fixture of cases) {
    const decision = policy.applyCard(card, cardRequests(fixture.state, settings));
    assert.equal(decision.state, fixture.expected);
    assert.equal(policy.clearCard(card), true);
    assert.equal(card.hidden, false);
    assert.equal(card.dataset.fltPresentation, undefined);
    assert.equal(card.querySelector('[data-flt-presentation-indicator="true"]'), null);
  }
});

test('page enhancements are individually reversible and do not clone native pagination', () => {
  const dom = new JSDOM(`<!doctype html><html><body>
    <time datetime="2026-09-19T12:00:00Z">today</time>
    <div data-flt-banner>Banner</div>
    <a data-flt-person-id="1">Person</a>
    <a data-flt-interest="rope">Rope</a>
    <img data-flt-picture-id="p1">
    <nav rel="next">Native pager</nav>
  </body></html>`);
  const enhancements = new PageEnhancements({ document: dom.window.document });
  enhancements.apply(
    {
      exactTimestamps: true,
      hideBanners: true,
      pictureNavigation: true,
      sharedInterests: true,
      visitedLinks: true,
    },
    {
      interests: new Set(['rope']),
      onPictureNavigate() {},
      seenIds: new Set(['1']),
    },
  );
  assert.ok(dom.window.document.querySelector('.flt-basic-exact-time'));
  assert.equal(dom.window.document.querySelector('[data-flt-banner]').hidden, true);
  assert.equal(dom.window.document.querySelectorAll('nav').length, 1);
  enhancements.clear();
  assert.equal(dom.window.document.querySelector('.flt-basic-exact-time'), null);
  assert.equal(dom.window.document.querySelector('[data-flt-banner]').hidden, false);
  assert.equal(dom.window.document.querySelector('.flt-basic-picture-next'), null);
});

test('browser page loader accepts only same-origin HTML, strips unsafe nodes, and deduplicates identities', async () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><main role="feed"><article data-content-id="1"></article></main><a rel="next" href="/page/2">Next</a></body></html>',
    { url: 'https://fetlife.com/page/1' },
  );
  const loader = new BrowserPageLoader({
    document: dom.window.document,
    fetchImpl: async () => ({
      ok: true,
      text: async () =>
        '<main><article data-content-id="1"></article><article data-content-id="2"><script>bad()</script></article></main><a rel="next" href="/page/3">Next</a>',
    }),
    window: dom.window,
  });
  assert.equal(nativeNextPage(dom.window.document), 'https://fetlife.com/page/2');
  const page = await loader.fetchPage('/page/2');
  assert.equal(page.items.length, 1);
  assert.equal(page.items[0].dataset.contentId, '2');
  assert.equal(page.items[0].querySelector('script'), null);
  assert.equal(page.nextUrl, 'https://fetlife.com/page/3');
  loader.append(page.items);
  assert.equal(dom.window.document.querySelectorAll('[data-content-id]').length, 2);
  await assert.rejects(() => loader.fetchPage('https://example.com/page/2'), /same-origin/);
});

test('native next page follows FetLife numbered links, Next labels, and member cards', async () => {
  const listing = new JSDOM(
    `<!doctype html><html><body>
      <main>
        <div class="grid">
          <article data-member-card=""><a href="/users/1">One</a></article>
        </div>
        <nav>
          <a href="/explore/kinksters?page=2">2</a>
          <a href="/explore/kinksters?page=3">3</a>
        </nav>
      </main>
    </body></html>`,
    { url: 'https://fetlife.com/explore/kinksters' },
  );
  assert.equal(
    nativeNextPage(listing.window.document),
    'https://fetlife.com/explore/kinksters?page=2',
  );

  const labeled = new JSDOM(
    '<!doctype html><html><body><main></main><a href="/friends?page=2" aria-label="Next page">›</a></body></html>',
    { url: 'https://fetlife.com/friends?page=1' },
  );
  assert.equal(nativeNextPage(labeled.window.document), 'https://fetlife.com/friends?page=2');

  const dom = new JSDOM(
    '<!doctype html><html><body><main><article data-member-card=""><a href="/users/1">One</a></article></main></body></html>',
    { url: 'https://fetlife.com/explore/kinksters' },
  );
  const loader = new BrowserPageLoader({
    document: dom.window.document,
    fetchImpl: async () => ({
      ok: true,
      text: async () =>
        '<main><article data-member-card=""><a href="/users/1">One</a></article><article data-member-card=""><a href="/users/2">Two</a></article></main><a href="/explore/kinksters?page=3">3</a>',
    }),
    window: dom.window,
  });
  const trigger = new InfiniteScrollTrigger({
    controller: {
      pause() {},
      requestNext: async () => ({ appended: 1, status: 'APPENDED' }),
      resume() {},
      state: { loadedItems: 0, loadedPages: 0, loading: false, paused: false },
      subscribe(listener) {
        listener(this.state);
        return () => {};
      },
    },
    document: dom.window.document,
    observerFactory: () => ({
      disconnect() {},
      observe() {},
    }),
  });
  assert.equal(trigger.start({ enabled: true }), true);
  const sentinel = dom.window.document.querySelector('.flt-basic-scroll-sentinel');
  assert.equal(sentinel.textContent, '');
  assert.equal(sentinel.getAttribute('aria-hidden'), 'true');
  assert.equal(trigger.start({ enabled: true }), true);
  assert.equal(dom.window.document.querySelectorAll('.flt-basic-scroll-sentinel').length, 1);
  assert.equal(sentinel.previousElementSibling?.dataset.memberCard, '');
  const page = await loader.fetchPage('/explore/kinksters?page=2');
  assert.equal(page.items.length, 1);
  assert.equal(page.items[0].querySelector('a').getAttribute('href'), '/users/2');
  assert.equal(page.nextUrl, 'https://fetlife.com/explore/kinksters?page=3');
  loader.append(page.items);
  assert.equal(INFINITE_SCROLL_OBSERVER_OPTIONS.rootMargin, '200px');
  assert.equal(dom.window.document.querySelectorAll('[data-member-card]').length, 2);
  const loadedPage = sentinel.previousElementSibling;
  assert.equal(loadedPage.classList.contains('flt-loaded-page'), true);
  assert.equal(loadedPage.querySelector('a').getAttribute('href'), '/users/2');
  assert.equal(loadedPage.parentElement, sentinel.parentElement);
  trigger.stop();
  listing.window.close();
  labeled.window.close();
  dom.window.close();
});
