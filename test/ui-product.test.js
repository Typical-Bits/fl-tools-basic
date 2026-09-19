import assert from 'node:assert/strict';
import test from 'node:test';
import { IDBFactory } from 'fake-indexeddb';
import { JSDOM } from 'jsdom';
import { CoreRuntime, CoreUI } from '@typicalbits/fl-tools-core';
import { installBasic } from '../src/basic-product.js';
import { BasicUI } from '../src/basic-ui.js';
import { normalizeBasicSettings } from '../src/settings.js';

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

test('Basic UI exposes two primary destinations and every retained nested family without checkboxes', async () => {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: 'https://fetlife.com/home',
  });
  let id = 0;
  const coreUI = new CoreUI({
    document: dom.window.document,
    idFactory: () => `basic-ui-${++id}`,
    version: '3.0.0',
  });
  coreUI.start();
  const updates = [];
  let resets = 0;
  const ui = new BasicUI({
    coreUI,
    document: dom.window.document,
    onResetSeen: () => {
      resets += 1;
    },
    onSettings: (settings) => {
      updates.push(settings);
      return settings;
    },
    settings: normalizeBasicSettings(),
  });
  assert.deepEqual(
    [...ui.shell.element.querySelectorAll('[role="tab"]')].map((node) => node.textContent),
    ['Browse', 'Settings'],
  );
  assert.deepEqual(
    [...ui.shell.element.querySelectorAll('[data-flt-basic-section]')].map(
      (node) => node.dataset.fltBasicSection,
    ),
    [
      'presets',
      'filters',
      'media',
      'seen',
      'soft-block',
      'infinite-scroll',
      'page-enhancements',
      'appearance',
      'shortcuts',
      'reset',
    ],
  );
  assert.equal(ui.shell.element.querySelector('input[type="checkbox"]'), null);
  assert.ok(ui.shell.element.querySelectorAll('button[role="switch"]').length >= 10);
  [...ui.shell.element.querySelectorAll('button')]
    .find((button) => button.textContent === 'Reset Seen')
    .click();
  assert.equal(resets, 1);
  [...ui.shell.element.querySelectorAll('button')]
    .find((button) => button.textContent === 'SFW')
    .click();
  await Promise.resolve();
  assert.equal(updates.at(-1).preset, 'sfw');
  ui.destroy();
  coreUI.stop();
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
    version: '3.0.0',
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
  const profile = dom.window.document.querySelector('[data-user-id="42"]');
  await waitFor(
    () => profile.querySelector('[data-flt-basic-profile-actions="true"]'),
    'profile actions did not render',
  );
  [...profile.querySelectorAll('button')]
    .find((button) => button.textContent === 'Soft Block')
    .click();
  dom.window.document.querySelector('.flt-dialog textarea').value = 'Local reason';
  [...dom.window.document.querySelectorAll('.flt-dialog-actions button')]
    .find((button) => button.textContent === 'Soft Block')
    .click();
  await waitFor(
    async () =>
      (await runtime.services.storage.get('people', '42'))?.value.basic?.softBlock?.reason ===
      'Local reason',
    'Soft Block was not persisted',
  );
  assert.equal(
    (await runtime.services.storage.get('people', '42')).value.basic.softBlock.reason,
    'Local reason',
  );
  const removeSoftBlock = await waitFor(
    () =>
      [...profile.querySelectorAll('button')].find(
        (button) => button.textContent === 'Remove Soft Block',
      ),
    'Soft Block controls did not rerender',
  );
  removeSoftBlock.click();
  await waitFor(
    async () => !(await runtime.services.storage.get('people', '42'))?.value.basic?.softBlock,
    'Soft Block was not removed',
  );
  assert.equal(
    (await runtime.services.storage.get('people', '42')).value.basic.softBlock,
    undefined,
  );
  [...dom.window.document.querySelectorAll('button')]
    .find((button) => button.textContent === 'SFW')
    .click();
  await waitFor(
    async () => (await runtime.services.storage.getBrowseSettings()).media.preset === 'sfw',
    'SFW settings were not persisted',
  );
  assert.equal((await runtime.services.storage.getBrowseSettings()).media.preset, 'sfw');
  await installed.product.stop();
  assert.equal(dom.window.document.querySelector('.flt-panel'), null);
  assert.equal(dom.window.document.querySelector('.flt-launcher'), null);
  await runtime.stop();
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
    version: '3.0.0',
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
