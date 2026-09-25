import assert from 'node:assert/strict';
import test from 'node:test';
import { IDBFactory } from 'fake-indexeddb';
import { JSDOM } from 'jsdom';
import { CoreRuntime, CoreUI } from '@typicalbits/fl-tools-core';
import { installBasic } from '../src/basic-product.js';
import { BasicUI } from '../src/basic-ui.js';
import { applyPreset, normalizeBasicSettings, saveCustomPreset } from '../src/settings.js';

class Channel {
  addEventListener() {}
  removeEventListener() {}
  postMessage() {}
  close() {}
}

async function waitFor(predicate, message, timeout = 1000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const value = await predicate();
    if (value) return value;
    await new Promise((resolve) => globalThis.setTimeout(resolve, 5));
  }
  assert.fail(message);
}

test('Basic UI consolidates diagnostics under a final System menu', async () => {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: 'https://fetlife.com/home',
  });
  let id = 0;
  const coreUI = new CoreUI({
    document: dom.window.document,
    idFactory: () => `basic-ui-${++id}`,
    version: '0.0.1',
  });
  coreUI.start();
  const updates = [];
  const ui = new BasicUI({
    coreUI,
    document: dom.window.document,
    onSettings: (settings) => {
      updates.push(settings);
      return settings;
    },
    settings: normalizeBasicSettings(),
  });
  assert.equal(ui.shell.element.dataset.fltChromeContract, '1');
  assert.deepEqual(
    [...ui.shell.element.querySelectorAll('.flt-tool-title')].map((node) => node.textContent),
    ['Browse', 'Appearance', 'System'],
  );
  assert.equal(ui.shell.element.querySelector('.flt-nested-header'), null);
  assert.deepEqual(
    [...ui.shell.element.querySelectorAll('[data-flt-basic-section]')].map(
      (node) => node.dataset.fltBasicSection,
    ),
    ['page-enhancements', 'infinite-scroll', 'recently-visited', 'appearance', 'diagnostics'],
  );
  assert.equal(ui.shell.element.querySelector('input[type="checkbox"]'), null);
  assert.deepEqual(
    [...ui.shell.element.querySelectorAll('.flt-toggle-row .flt-label')].map(
      (node) => node.textContent,
    ),
    [
      'Exact timestamps',
      'Hide banners',
      'Picture navigation',
      'Shared interests',
      'Visited links',
      'Auto Page Load',
      'Compact layout',
      'High contrast',
      'Reduce Motion',
      'Notifications',
    ],
  );
  assert.match(ui.shell.element.querySelector('.flt-preset-toolbar').textContent, /Browse mode/);
  assert.deepEqual(
    [...ui.shell.element.querySelectorAll('.flt-preset-toolbar button')].map(
      (button) => button.textContent,
    ),
    ['Standard', 'Clean', 'SFW'],
  );
  assert.ok(ui.shell.element.querySelector('.flt-top-content .flt-preset-toolbar'));
  assert.doesNotMatch(ui.shell.element.textContent, /Presets apply a complete Browse policy/);
  assert.doesNotMatch(ui.shell.element.textContent, /Filters|Media|Seen|Soft Block/);
  assert.deepEqual(
    [...ui.shell.element.querySelectorAll('#flt-basic-view-browse .flt-label')].map(
      (node) => node.textContent,
    ),
    [
      'Exact timestamps',
      'Hide banners',
      'Picture navigation',
      'Shared interests',
      'Visited links',
      'Auto Page Load',
      'Maximum additional pages (1–20)',
      'Pause auto-loading for',
    ],
  );
  assert.deepEqual(
    [...ui.shell.element.querySelectorAll('.flt-shortcut-row')].map((row) => row.textContent),
    [
      'BrowseAlt+Shift+B',
      'Standard1',
      'Clean2',
      'SFW3',
      'Previous cardJ',
      'Next cardK',
      'Open cardEnter',
      'Next pageN',
      'TopT',
    ],
  );
  assert.equal(
    [...ui.shell.element.querySelectorAll('.flt-preset-toolbar button')]
      .find((button) => button.textContent === 'SFW')
      .getAttribute('aria-keyshortcuts'),
    '3',
  );
  [...ui.shell.element.querySelectorAll('button')]
    .find((button) => button.textContent === 'SFW')
    .click();
  await Promise.resolve();
  assert.equal(updates.at(-1).preset, 'sfw');
  assert.equal(
    [...ui.shell.element.querySelectorAll('button')].some(
      (button) => button.textContent === 'Hold to show native',
    ),
    false,
  );
  ui.destroy();
  coreUI.stop();
});

test('Recently Visited shows only the last three profiles and can remove a visit marker', async () => {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: 'https://fetlife.com/home',
  });
  let id = 0;
  const removed = [];
  const coreUI = new CoreUI({
    document: dom.window.document,
    idFactory: () => `basic-visits-${++id}`,
    version: '0.0.1',
  });
  coreUI.start();
  const ui = new BasicUI({
    coreUI,
    document: dom.window.document,
    onMarkUnseen: (personId) => removed.push(personId),
    onSettings: (settings) => settings,
    settings: normalizeBasicSettings(),
    visitHistory: [
      {
        displayName: 'Person 42',
        personId: '42',
        profileUrl: 'https://fetlife.com/users/42',
        seenAt: Date.UTC(2026, 8, 25),
      },
      {
        displayName: 'Another person',
        personId: '7',
        profileUrl: 'https://example.com/unsafe',
        seenAt: Date.UTC(2026, 8, 24),
      },
      {
        displayName: 'Person 8',
        personId: '8',
        profileUrl: 'https://fetlife.com/users/8',
        seenAt: Date.UTC(2026, 8, 23),
      },
      {
        displayName: 'Person 9',
        personId: '9',
        profileUrl: 'https://fetlife.com/users/9',
        seenAt: Date.UTC(2026, 8, 22),
      },
    ],
  });
  const history = ui.shell.element.querySelector('[data-flt-basic-section="recently-visited"]');
  assert.equal(history.querySelectorAll('li').length, 3);
  assert.equal(history.querySelector('a').href, 'https://fetlife.com/users/42');
  assert.doesNotMatch(history.innerHTML, /example\.com/);
  assert.equal(history.querySelector('input[type="search"]'), null);
  assert.doesNotMatch(history.textContent, /Person 9/);
  history.querySelector('button').click();
  assert.deepEqual(removed, ['42']);
  ui.destroy();
  coreUI.stop();
  dom.window.close();
});

test('Basic modes own media policy without exposing granular media controls', async () => {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: 'https://fetlife.com/home',
  });
  let id = 0;
  const coreUI = new CoreUI({
    document: dom.window.document,
    idFactory: () => `basic-media-${++id}`,
    version: '0.0.1',
  });
  coreUI.start();
  let accepted = applyPreset(normalizeBasicSettings(), 'sfw');
  const ui = new BasicUI({
    coreUI,
    document: dom.window.document,
    onSettings: (settings) => {
      accepted = applyPreset(normalizeBasicSettings(settings), settings.preset);
      return accepted;
    },
    settings: accepted,
  });
  assert.equal(ui.shell.element.querySelector('[data-flt-basic-section="media"]'), null);
  assert.doesNotMatch(ui.shell.element.textContent, /Blur strength|Blur avatars|Blur videos/);
  [...ui.shell.element.querySelectorAll('.flt-preset-toolbar button')]
    .find((button) => button.textContent === 'Clean')
    .click();
  await Promise.resolve();
  assert.equal(accepted.preset, 'minimal');
  assert.equal(accepted.media.mode, 'blur');
  assert.equal(accepted.media.blurPixels, 4);
  assert.equal(accepted.media.blurAvatars, true);

  ui.destroy();
  coreUI.stop();
  dom.window.close();
});

test('Basic preserves stored legacy filter state without exposing the filter builder', () => {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: 'https://fetlife.com/home',
  });
  let id = 0;
  const coreUI = new CoreUI({
    document: dom.window.document,
    idFactory: () => `basic-history-${++id}`,
    version: '0.0.1',
  });
  coreUI.start();
  const accepted = normalizeBasicSettings({
    filters: {
      terms: {
        exclude: ['active'],
        history: { exclude: ['active', 'two', 'three', 'four'] },
      },
    },
  });
  const ui = new BasicUI({
    coreUI,
    document: dom.window.document,
    onSettings: (settings) => settings,
    settings: accepted,
  });
  assert.equal(ui.shell.element.querySelector('[data-flt-basic-section="filters"]'), null);
  assert.equal(ui.shell.element.querySelector('.flt-chip'), null);
  assert.deepEqual(accepted.filters.terms.exclude, ['active']);
  assert.deepEqual(accepted.filters.terms.history.exclude, ['active', 'two', 'three', 'four']);
  ui.destroy();
  coreUI.stop();
  dom.window.close();
});

test('Basic removes custom preset controls and consolidates the annotated navigation', () => {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: 'https://fetlife.com/home',
  });
  let id = 0;
  const coreUI = new CoreUI({
    document: dom.window.document,
    idFactory: () => `basic-presets-${++id}`,
    version: '0.0.1',
  });
  coreUI.start();
  const settings = saveCustomPreset(normalizeBasicSettings(), 'Nearby mix');
  const ui = new BasicUI({
    coreUI,
    document: dom.window.document,
    onSettings: (next) => next,
    settings,
  });
  assert.doesNotMatch(
    ui.shell.element.textContent,
    /Custom preset name|Rename Nearby mix|Delete Nearby mix/,
  );
  assert.ok(settings.presets.custom['Nearby mix'], 'existing stored presets are not deleted');
  assert.equal(ui.shell.element.querySelectorAll('.flt-shortcut-row').length, 9);
  assert.equal(ui.shell.element.querySelector('[data-flt-basic-section="media"]'), null);
  assert.ok(
    ui.shell.element.querySelector('#flt-basic-view-system [data-flt-basic-section="diagnostics"]'),
  );
  assert.equal(ui.shell.element.querySelector('#flt-basic-view-advanced'), null);
  ui.destroy();
  coreUI.stop();
  dom.window.close();
});

test('Basic installs through a narrow Core registration, persists settings, and tears down cleanly', async () => {
  const dom = new JSDOM(
    '<!doctype html><html><head></head><body><nav data-nav--ama-toggle-user-id-value="1"></nav><main role="feed"><article data-fltools-fixture-kind="profile" data-user-id="42" data-flt-age="30"><h2 data-fltools-field="display-name">Person 42</h2></article></main></body></html>',
    { url: 'https://fetlife.com/home' },
  );
  let id = 0;
  const runtime = new CoreRuntime({
    accountId: '1',
    channelFactory: () => new Channel(),
    document: dom.window.document,
    idFactory: () => `basic-product-${++id}`,
    indexedDB: new IDBFactory(),
    observerFactory: (callback) => new dom.window.MutationObserver(callback),
    version: '0.0.1',
    window: dom.window,
  });
  await runtime.start();
  const coreSurface = {
    registerProduct: (options) => runtime.registerProduct(options),
    whenReady: Promise.resolve(),
  };
  const installed = await installBasic(coreSurface, {
    document: dom.window.document,
    iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
    window: dom.window,
  });
  assert.equal(runtime.getStatus().products[0].id, 'basic');
  assert.equal(dom.window.document.querySelectorAll('.flt-launcher-button').length, 1);
  assert.equal(dom.window.document.querySelectorAll('.flt-panel').length, 1);
  const launcherButton = dom.window.document.querySelector('.flt-launcher-button');
  const panel = dom.window.document.querySelector('.flt-panel');
  launcherButton.click();
  assert.equal(panel.hidden, false);
  launcherButton.click();
  assert.equal(panel.hidden, true);
  launcherButton.click();
  dom.window.document.body.dispatchEvent(
    new dom.window.MouseEvent('pointerdown', { bubbles: true }),
  );
  assert.equal(panel.hidden, true);
  const hasRelationshipControls = () =>
    [...dom.window.document.querySelectorAll('h3')].some(
      (item) => item.textContent === 'Relationships',
    );
  assert.equal(hasRelationshipControls(), false);
  dom.window.history.pushState({}, '', '/following');
  assert.equal(hasRelationshipControls(), false);
  dom.window.history.pushState({}, '', '/home');
  assert.equal(hasRelationshipControls(), false);
  const profile = dom.window.document.querySelector('[data-user-id="42"]');
  await waitFor(
    () => profile.querySelector('[data-flt-basic-profile-actions="true"]'),
    'profile actions did not render',
  );
  assert.deepEqual(
    [...profile.querySelectorAll('[data-flt-basic-profile-actions="true"] button')].map(
      (button) => button.textContent,
    ),
    ['Mute for session', 'Block'],
  );
  assert.equal(
    profile.querySelector('[data-flt-profile-card-chips]')?.parentElement,
    profile,
    'profile actions must stay inside the profile card',
  );
  assert.doesNotMatch(dom.window.document.body.textContent, /Soft Block/);
  assert.equal(await runtime.services.storage.get('people', '42'), undefined);
  await runtime.services.storage.put('people', '99', {
    personId: '99',
    pro: { note: 'Preset-untouched state' },
  });
  [...dom.window.document.querySelectorAll('button')]
    .find((button) => button.textContent === 'SFW')
    .click();
  await waitFor(
    async () => (await runtime.services.storage.getBrowseSettings()).media.preset === 'sfw',
    'SFW settings were not persisted',
  );
  assert.equal((await runtime.services.storage.getBrowseSettings()).media.preset, 'sfw');
  dom.window.document.body.dispatchEvent(
    new dom.window.KeyboardEvent('keydown', {
      altKey: false,
      bubbles: true,
      code: 'Digit2',
      key: '@',
      shiftKey: false,
    }),
  );
  await waitFor(
    async () => (await runtime.services.storage.getBrowseSettings()).preset === 'minimal',
    'Clean shortcut did not apply its Browse mode',
  );
  assert.equal((await runtime.services.storage.getBrowseSettings()).media.mode, 'blur');
  dom.window.document.body.dispatchEvent(
    new dom.window.KeyboardEvent('keydown', {
      altKey: false,
      bubbles: true,
      code: 'Digit1',
      key: '!',
      shiftKey: false,
    }),
  );
  await waitFor(
    async () =>
      (await runtime.services.storage.getBrowseSettings()).preset === 'default' &&
      [...dom.window.document.querySelectorAll('.flt-preset-toolbar button')]
        .find((button) => button.textContent === 'Standard')
        ?.getAttribute('aria-pressed') === 'true',
    'Standard shortcut did not apply its Browse mode',
  );
  const toggle = (label) =>
    [...dom.window.document.querySelectorAll('.flt-toggle-row')]
      .find((row) => row.querySelector('.flt-label')?.textContent === label)
      ?.querySelector('[role="switch"]');
  toggle('Compact layout').click();
  await waitFor(
    async () =>
      (await runtime.services.storage.getBrowseSettings()).ui.compact &&
      toggle('Compact layout')?.getAttribute('aria-checked') === 'true',
    'compact setting was not persisted',
  );
  toggle('High contrast').click();
  await waitFor(
    async () =>
      (await runtime.services.storage.getBrowseSettings()).ui.highContrast &&
      toggle('High contrast')?.getAttribute('aria-checked') === 'true',
    'contrast setting was not persisted',
  );
  toggle('Notifications').click();
  await waitFor(
    async () => !runtime.services.ui.preferences.value.notifications,
    'notification setting was not persisted',
  );
  await waitFor(async () => {
    const browse = await runtime.services.storage.getBrowseSettings();
    return (
      browse.ui.compact &&
      browse.ui.highContrast &&
      !runtime.services.ui.preferences.value.notifications &&
      browse.ui.dock === 'right'
    );
  }, 'Basic appearance settings were not persisted');
  const menuWidth = [...dom.window.document.querySelectorAll('label')]
    .find((item) => item.textContent.startsWith('Menu width'))
    .querySelector('select');
  menuWidth.value = 'compact';
  menuWidth.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
  await waitFor(
    async () => runtime.services.ui.preferences.value.menuWidth === 'compact',
    'menu width setting was not persisted',
  );
  assert.equal(dom.window.document.documentElement.classList.contains('flt-basic-compact'), true);
  assert.equal(
    dom.window.document.documentElement.classList.contains('flt-basic-high-contrast'),
    true,
  );
  assert.equal(
    dom.window.document.documentElement.classList.contains('flt-basic-launcher-left'),
    false,
  );
  assert.equal(
    dom.window.document.documentElement.classList.contains('flt-menu-width-compact'),
    true,
  );
  assert.equal(
    [...dom.window.document.querySelectorAll('button')].some(
      (button) => button.textContent === 'Hold to show native',
    ),
    false,
  );
  runtime.services.notifications.upsert({
    id: 'basic.preference-test',
    kind: 'SYSTEM',
    message: 'This notice is retained but not rendered while disabled.',
    priority: 'NORMAL',
    title: 'Preference test',
  });
  assert.equal(dom.window.document.querySelector('.flt-notice'), null);
  [...dom.window.document.querySelectorAll('button')]
    .find((button) => button.textContent === 'Reset Browse settings')
    .click();
  [...dom.window.document.querySelectorAll('.flt-dialog-actions button')]
    .find((button) => button.textContent === 'Reset Browse settings')
    .click();
  await waitFor(async () => {
    const browse = normalizeBasicSettings(await runtime.services.storage.getBrowseSettings());
    return (
      !browse.ui.compact &&
      !browse.ui.highContrast &&
      browse.ui.notifications &&
      browse.ui.dock === 'right' &&
      browse.ui.menuWidth === 'full'
    );
  }, 'Basic settings reset did not restore appearance defaults');
  assert.equal(dom.window.document.documentElement.classList.contains('flt-basic-compact'), false);
  assert.equal(
    dom.window.document.documentElement.classList.contains('flt-menu-width-compact'),
    true,
  );
  assert.equal(dom.window.document.querySelector('.flt-notice-title'), null);
  runtime.services.notifications.dismiss('basic.preference-test');
  await installed.product.stop();
  assert.equal(dom.window.document.querySelector('.flt-panel'), null);
  assert.equal(dom.window.document.querySelector('.flt-launcher'), null);
  await runtime.stop();
});

test('stored legacy filters still apply without exposing the filter builder', async () => {
  const dom = new JSDOM(
    `<!doctype html><html><head></head><body>
      <nav data-nav--ama-toggle-user-id-value="1"></nav>
      <main><div data-member-card="ExampleNearby">
        <a href="/ExampleNearby" class="font-bold">ExampleNearby</a>
        <div><span class="text-sm font-bold text-gray-300">35 F dominant</span></div>
        <div class="text-sm">Seattle, Washington</div>
        <a href="/ExampleNearby/pictures">5 pics</a>
        <turbo-frame id="relation_button_example"><button>Follow</button></turbo-frame>
      </div></main>
    </body></html>`,
    { url: 'https://fetlife.com/p/united-states/washington/seattle/kinksters' },
  );
  let id = 0;
  const runtime = new CoreRuntime({
    accountId: '1',
    channelFactory: () => new Channel(),
    document: dom.window.document,
    idFactory: () => `basic-place-${++id}`,
    indexedDB: new IDBFactory(),
    observerFactory: (callback) => new dom.window.MutationObserver(callback),
    version: '0.0.1',
    window: dom.window,
  });
  await runtime.start();
  await runtime.services.storage.setBrowseSettings({
    filters: { age: { maximum: 30, minimum: null }, resultMode: 'hide' },
  });
  const installed = await installBasic(
    {
      registerProduct: (options) => runtime.registerProduct(options),
      whenReady: Promise.resolve(),
    },
    {
      document: dom.window.document,
      iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
      window: dom.window,
    },
  );
  const card = dom.window.document.querySelector('[data-member-card]');
  await waitFor(() => card.hidden, 'Place kinkster card was not hidden');
  assert.equal(dom.window.document.querySelector('[data-flt-filter-impact]'), null);
  assert.equal(dom.window.document.querySelector('[data-flt-basic-section="filters"]'), null);
  assert.equal(
    normalizeBasicSettings(await runtime.services.storage.getBrowseSettings()).filters.resultMode,
    'hide',
  );

  await installed.product.stop();
  await runtime.stop();
  dom.window.close();
});

test('Clean and SFW focus the feed while Standard restores reaction activity', async () => {
  const dom = new JSDOM(
    `<!doctype html><html><head></head><body>
      <nav data-nav--ama-toggle-user-id-value="1"></nav>
      <main role="feed">
        <article data-story-uid="StoryID:700" data-story-type="loved_picture">
          <header>Example loved a picture</header>
        </article>
      </main>
    </body></html>`,
    { url: 'https://fetlife.com/home' },
  );
  let id = 0;
  const runtime = new CoreRuntime({
    accountId: '1',
    channelFactory: () => new Channel(),
    document: dom.window.document,
    idFactory: () => `basic-feed-focus-${++id}`,
    indexedDB: new IDBFactory(),
    observerFactory: (callback) => new dom.window.MutationObserver(callback),
    version: '0.0.1',
    window: dom.window,
  });
  await runtime.start();
  const installed = await installBasic(
    {
      registerProduct: (options) => runtime.registerProduct(options),
      whenReady: Promise.resolve(),
    },
    {
      document: dom.window.document,
      iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
      window: dom.window,
    },
  );
  const card = dom.window.document.querySelector('[data-story-uid]');
  await waitFor(
    () => card.dataset.fltPresentation === 'normal',
    'Standard did not leave reaction activity visible',
  );

  [...dom.window.document.querySelectorAll('.flt-preset-toolbar button')]
    .find((button) => button.textContent === 'Clean')
    .click();
  await waitFor(() => card.hidden, 'Clean did not hide reaction activity');
  assert.equal(card.dataset.fltPresentationTreatment, 'feed-reaction');

  [...dom.window.document.querySelectorAll('.flt-preset-toolbar button')]
    .find((button) => button.textContent === 'Standard')
    .click();
  await waitFor(() => !card.hidden, 'Standard did not restore reaction activity');

  [...dom.window.document.querySelectorAll('.flt-preset-toolbar button')]
    .find((button) => button.textContent === 'SFW')
    .click();
  await waitFor(() => card.hidden, 'SFW did not focus reaction activity');

  await installed.product.stop();
  await runtime.stop();
  dom.window.close();
});

test('Clean and SFW protect media on tag grids and newly loaded tag results', async () => {
  const dom = new JSDOM(
    `<!doctype html><html><head></head><body>
      <nav data-nav--ama-toggle-user-id-value="1"><img id="nav-logo"></nav>
      <div data-tag-results><a href="/Example"><img id="tag-avatar"></a><img id="tag-picture"><video id="tag-video"></video></div>
    </body></html>`,
    { url: 'https://fetlife.com/tags/example' },
  );
  let id = 0;
  const runtime = new CoreRuntime({
    accountId: '1',
    channelFactory: () => new Channel(),
    document: dom.window.document,
    idFactory: () => `basic-tags-${++id}`,
    indexedDB: new IDBFactory(),
    observerFactory: (callback) => new dom.window.MutationObserver(callback),
    version: '0.0.1',
    window: dom.window,
  });
  await runtime.start();
  const installed = await installBasic(
    {
      registerProduct: (options) => runtime.registerProduct(options),
      whenReady: Promise.resolve(),
    },
    {
      document: dom.window.document,
      iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
      window: dom.window,
    },
  );
  const clickPreset = (label) =>
    [...dom.window.document.querySelectorAll('.flt-preset-toolbar button')]
      .find((button) => button.textContent === label)
      .click();

  clickPreset('Clean');
  await waitFor(
    () =>
      ['tag-avatar', 'tag-picture', 'tag-video'].every((elementId) =>
        dom.window.document.getElementById(elementId).classList.contains('flt-media-blurred'),
      ),
    'Clean did not blur tag result media',
  );
  assert.equal(
    dom.window.document.getElementById('nav-logo').classList.contains('flt-media-blurred'),
    false,
  );

  clickPreset('SFW');
  await waitFor(
    async () => (await runtime.services.storage.getBrowseSettings()).preset === 'sfw',
    'SFW tag media settings were not persisted',
  );
  const added = dom.window.document.createElement('img');
  added.id = 'new-tag-picture';
  dom.window.document.querySelector('[data-tag-results]').append(added);
  runtime.services.events.emit('page:settled', { url: dom.window.document.URL });
  await waitFor(
    () => added.classList.contains('flt-media-blurred'),
    'SFW did not protect a newly loaded tag result',
  );
  await new Promise((resolve) => globalThis.setTimeout(resolve, 25));

  await installed.product.stop();
  await runtime.stop();
  dom.window.close();
});

test('Basic can mute a person for only the current session and undo it', async () => {
  const dom = new JSDOM(
    '<!doctype html><html><head></head><body><nav data-nav--ama-toggle-user-id-value="1"></nav><main role="feed"><article data-fltools-fixture-kind="profile" data-user-id="42"><h2 data-fltools-field="display-name">Person 42</h2></article></main></body></html>',
    { url: 'https://fetlife.com/home' },
  );
  let id = 0;
  const runtime = new CoreRuntime({
    accountId: '1',
    channelFactory: () => new Channel(),
    document: dom.window.document,
    idFactory: () => `basic-session-mute-${++id}`,
    indexedDB: new IDBFactory(),
    observerFactory: (callback) => new dom.window.MutationObserver(callback),
    version: '0.0.1',
    window: dom.window,
  });
  await runtime.start();
  const legacy = await runtime.services.storage.put('people', '42', {
    basic: {
      softBlock: { createdAt: 1, presentation: 'hide', reason: 'Legacy state' },
    },
    personId: '42',
  });
  const installed = await installBasic(
    {
      registerProduct: (options) => runtime.registerProduct(options),
      whenReady: Promise.resolve(),
    },
    {
      document: dom.window.document,
      iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
      window: dom.window,
    },
  );
  const profile = dom.window.document.querySelector('[data-user-id="42"]');
  const mute = await waitFor(
    () =>
      [...profile.querySelectorAll('button')].find(
        (button) => button.textContent === 'Mute for session',
      ),
    'session mute action did not render',
  );
  assert.equal(profile.hidden, false, 'legacy Soft Block state must not remain active');
  mute.click();
  await waitFor(() => profile.hidden, 'session mute did not hide the profile');
  assert.deepEqual(await runtime.services.storage.get('people', '42'), legacy);
  assert.match(
    dom.window.document.querySelector('.flt-notice-message').textContent,
    /Nothing was saved/,
  );
  [...dom.window.document.querySelectorAll('.flt-notice-actions button')]
    .find((button) => button.textContent === 'Undo')
    .click();
  await waitFor(() => !profile.hidden, 'Undo did not restore the profile');

  await installed.product.stop();
  await runtime.stop();
  dom.window.close();
});

test('Basic records Seen from an actual durable profile visit, not merely a scanner encounter', async () => {
  const dom = new JSDOM(
    '<!doctype html><html><head></head><body><nav data-nav--ama-toggle-user-id-value="1"></nav><header data-test-id="profile-header"><h1>Person 42</h1></header><main></main></body></html>',
    { url: 'https://fetlife.com/users/42' },
  );
  let id = 0;
  const runtime = new CoreRuntime({
    accountId: '1',
    channelFactory: () => new Channel(),
    document: dom.window.document,
    idFactory: () => `basic-profile-${++id}`,
    indexedDB: new IDBFactory(),
    observerFactory: (callback) => new dom.window.MutationObserver(callback),
    version: '0.0.1',
    window: dom.window,
  });
  await runtime.start();
  const installed = await installBasic(
    {
      registerProduct: (options) => runtime.registerProduct(options),
      whenReady: Promise.resolve(),
    },
    {
      document: dom.window.document,
      iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
      window: dom.window,
    },
  );
  await waitFor(
    async () => Boolean((await runtime.services.storage.get('people', '42'))?.value.basic?.seenAt),
    'profile visit did not record Seen',
  );
  const firstSeenAt = (await runtime.services.storage.get('people', '42')).value.basic.seenAt;
  runtime.services.scanner.refresh(dom.window.document);
  await new Promise((resolve) => globalThis.setTimeout(resolve, 25));
  assert.equal(
    (await runtime.services.storage.get('people', '42')).value.basic.seenAt,
    firstSeenAt,
  );
  await installed.product.stop();
  await runtime.stop();
  dom.window.close();
});

test('Basic records opened content and mounts route-specific page tools', async () => {
  const dom = new JSDOM(
    '<!doctype html><html><head></head><body><nav data-nav--ama-toggle-user-id-value="1"></nav><main><h1>Writing</h1><article data-story-uid="Writing:501"><a href="/posts/501"><h2>Opened writing</h2></a></article></main></body></html>',
    { url: 'https://fetlife.com/posts/501' },
  );
  let id = 0;
  const runtime = new CoreRuntime({
    accountId: '1',
    channelFactory: () => new Channel(),
    document: dom.window.document,
    idFactory: () => `basic-content-${++id}`,
    indexedDB: new IDBFactory(),
    observerFactory: (callback) => new dom.window.MutationObserver(callback),
    version: '0.0.1',
    window: dom.window,
  });
  await runtime.start();
  const installed = await installBasic(
    {
      registerProduct: (options) => runtime.registerProduct(options),
      whenReady: Promise.resolve(),
    },
    {
      document: dom.window.document,
      iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
      window: dom.window,
    },
  );
  const seen = await waitFor(
    () => runtime.services.storage.get('settings', 'basic.seen-items'),
    'opened content was not recorded',
  );
  assert.equal(seen.value.items[0].kind, 'content');
  assert.equal(dom.window.document.documentElement.dataset.fltBasicSurface, 'content');
  await installed.product.stop();
  await runtime.stop();
  dom.window.close();
});

test('Basic summarizes parsed Requests without automating native request actions', async () => {
  const dom = new JSDOM(
    '<!doctype html><html><head></head><body><nav data-nav--ama-toggle-user-id-value="1"></nav><main><div data-clickable-url-value="/events/2026/10/10/example"><a href="/events/2026/10/10/example"><h3>Example event</h3></a><button>Ignore</button></div></main></body></html>',
    { url: 'https://fetlife.com/requests' },
  );
  let id = 0;
  const runtime = new CoreRuntime({
    accountId: '1',
    channelFactory: () => new Channel(),
    document: dom.window.document,
    idFactory: () => `basic-requests-${++id}`,
    indexedDB: new IDBFactory(),
    observerFactory: (callback) => new dom.window.MutationObserver(callback),
    version: '0.0.1',
    window: dom.window,
  });
  await runtime.start();
  const installed = await installBasic(
    {
      registerProduct: (options) => runtime.registerProduct(options),
      whenReady: Promise.resolve(),
    },
    {
      document: dom.window.document,
      iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
      window: dom.window,
    },
  );
  await waitFor(
    () =>
      /1 event/.test(
        dom.window.document.querySelector('[data-flt-page-tools-status]')?.textContent,
      ),
    'Requests summary did not include the parsed event invite',
  );
  assert.ok(
    [...dom.window.document.querySelectorAll('button')].find(
      (button) => button.textContent === 'Ignore',
    ),
  );
  await installed.product.stop();
  await runtime.stop();
  dom.window.close();
});

test('Basic remounts owned styles after a Turbo page settlement', async () => {
  const dom = new JSDOM(
    '<!doctype html><html><head></head><body><nav data-nav--ama-toggle-user-id-value="1"></nav><main role="feed"></main></body></html>',
    { url: 'https://fetlife.com/home' },
  );
  let id = 0;
  const runtime = new CoreRuntime({
    accountId: '1',
    channelFactory: () => new Channel(),
    document: dom.window.document,
    idFactory: () => `basic-turbo-${++id}`,
    indexedDB: new IDBFactory(),
    observerFactory: (callback) => new dom.window.MutationObserver(callback),
    version: '0.0.1',
    window: dom.window,
  });
  await runtime.start();
  const installed = await installBasic(
    {
      registerProduct: (options) => runtime.registerProduct(options),
      whenReady: Promise.resolve(),
    },
    {
      document: dom.window.document,
      iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
      window: dom.window,
    },
  );
  const owned = 'style[data-flt-basic-owned="true"]';
  assert.ok(dom.window.document.querySelector(owned)?.isConnected);
  dom.window.document.querySelector(owned).remove();
  runtime.services.events.emit('page:settled', { url: dom.window.document.URL });
  assert.ok(dom.window.document.querySelector(owned)?.isConnected);
  await installed.product.stop();
  await runtime.stop();
  dom.window.close();
});
