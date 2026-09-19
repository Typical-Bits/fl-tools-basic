import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { PresentationPolicy } from '@typicalbits/fl-tools-core';
import { cardRequests } from '../src/filter-engine.js';
import { InfiniteScrollController, InfiniteScrollTrigger } from '../src/infinite-scroll.js';
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
  assert.equal((await state.markSeen({ personId: '42', routeKind: 'PROFILE' })).status, 'RECORDED');
  assert.equal((await storage.get('people', '42')).value.basic.seenAt, 1000);
  assert.equal((await state.resetSeen({ confirm: () => false })).status, 'CANCELLED');
  const reset = await state.resetSeen({ confirm: () => true });
  assert.equal(reset.cleared, 1);
  assert.equal((await storage.get('people', '42')).value.favorite, true);
  assert.deepEqual((await storage.get('people', '42')).value.note, { body: 'Pro-owned note' });
  assert.equal((await storage.get('people', '42')).value.quietUntil, 9000);
  assert.equal((await storage.get('people', '42')).value.basic.seenAt, undefined);
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

test('fixed shortcuts do not fire from editable controls and remove their listener', () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><input id="edit"><div id="page"></div></body></html>',
  );
  const calls = [];
  const navigation = new BasicNavigation({
    document: dom.window.document,
    handlers: {
      filters: () => calls.push('filters'),
      next: () => calls.push('next'),
      nsfw: () => calls.push('nsfw'),
      top: () => calls.push('top'),
    },
    window: dom.window,
  });
  navigation.start();
  dom.window.document
    .getElementById('edit')
    .dispatchEvent(new dom.window.KeyboardEvent('keydown', { bubbles: true, key: 'F' }));
  for (const key of ['F', 'S', 'N', 'T']) {
    dom.window.document
      .getElementById('page')
      .dispatchEvent(new dom.window.KeyboardEvent('keydown', { bubbles: true, key }));
  }
  assert.deepEqual(calls, ['filters', 'nsfw', 'next', 'top']);
  navigation.stop();
  dom.window.document
    .getElementById('page')
    .dispatchEvent(new dom.window.KeyboardEvent('keydown', { bubbles: true, key: 'F' }));
  assert.equal(calls.length, 4);
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
