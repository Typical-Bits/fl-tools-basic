import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { IDBFactory } from 'fake-indexeddb';
import { JSDOM } from 'jsdom';

const userscript = await readFile(
  new globalThis.URL('../FL-Tools-Basic.user.js', import.meta.url),
  'utf8',
);
const compatibilityCopy = await readFile(
  new globalThis.URL('../live-test/fl-tools-basic-live.user.js', import.meta.url),
  'utf8',
);

function userscriptFetch(script) {
  return async () => ({
    ok: true,
    status: 200,
    text: async () => script,
  });
}

test('Basic userscript is self-contained and installs shared Core', () => {
  assert.equal(compatibilityCopy, userscript);
  assert.match(userscript, /@name\s+FL Tools Basic$/m);
  assert.doesNotMatch(userscript, /Live Test/);
  assert.match(userscript, /@version\s+0\.0\.8$/m);
  assert.match(userscript, /@match\s+\*:\/\/fetlife\.com\/\*/);
  assert.match(userscript, /@match\s+\*:\/\/\*\.fetlife\.com\/\*/);
  assert.doesNotMatch(userscript, /@require/);
  assert.match(userscript, /typicalbits\.fl-tools\.core/);
  assert.match(userscript, /fltChromeContract/);
  assert.match(
    userscript,
    /raw\.githubusercontent\.com\/Typical-Bits\/fl-tools-basic\/main\/assets\/badges\/basic-128\.png/,
  );
  assert.match(userscript, /FL Tools Basic did not load|installBasic/);
  assert.match(userscript, /@grant\s+GM_xmlhttpRequest/);
  assert.match(userscript, /@connect\s+raw\.githubusercontent\.com/);
  assert.match(userscript, /@connect\s+github\.com/);
  assert.match(
    userscript,
    /github\.com\/Typical-Bits\/fl-tools-basic\/raw\/refs\/heads\/main\/FL-Tools-Basic\.user\.js/,
  );
});

test('Basic generated installer mounts and opens its launcher', async () => {
  const dom = new JSDOM(
    '<!doctype html><html><head></head><body><button data-nav--ama-toggle-user-id-value="12345"></button><main></main></body></html>',
    { pretendToBeVisual: true, runScripts: 'dangerously', url: 'https://fetlife.com/home' },
  );
  class TestChannel {
    addEventListener() {}
    close() {}
    postMessage() {}
    removeEventListener() {}
  }
  Object.defineProperties(dom.window, {
    BroadcastChannel: { value: TestChannel },
    fetch: { value: userscriptFetch(userscript) },
    indexedDB: { value: new IDBFactory() },
    structuredClone: { value: globalThis.structuredClone },
    unsafeWindow: { value: dom.window },
  });
  const errors = [];
  dom.window.addEventListener('fltools:install-error', ({ detail }) => errors.push(detail));

  dom.window.eval(userscript);
  const deadline = Date.now() + 2_000;
  while (!dom.window.document.querySelector('.flt-launcher-button') && Date.now() < deadline) {
    await new Promise((resolve) => globalThis.setTimeout(resolve, 20));
  }

  const launcher = dom.window.document.querySelector('.flt-launcher-button');
  assert.deepEqual(errors, []);
  assert.equal(launcher?.ariaLabel, 'FL Tools Basic');
  assert.equal(launcher?.dataset.fltChromeContract, '1');
  assert.match(launcher?.querySelector('img')?.src ?? '', /fl-tools-basic.*basic-128\.png/);
  launcher.click();
  const panel = dom.window.document.querySelector('.flt-panel');
  assert.equal(panel?.hidden, false);
  assert.equal(panel?.dataset.fltChromeContract, '1');
  const sections = [...dom.window.document.querySelectorAll('.flt-tool-header')];
  assert.ok(sections.length >= 2);
  assert.equal(
    sections.every((section) => section.getAttribute('aria-expanded') === 'false'),
    true,
  );
  sections[0].click();
  sections[1].click();
  assert.equal(sections[0].getAttribute('aria-expanded'), 'false');
  assert.equal(sections[1].getAttribute('aria-expanded'), 'true');
  dom.window.close();
});

test('manager icons embed the exact approved PNG bytes', async () => {
  const text = await readFile(
    new globalThis.URL('../FL-Tools-Basic.user.js', import.meta.url),
    'utf8',
  );
  const header = text.split('// ==/UserScript==')[0];
  for (const [field, size] of [
    ['icon', 64],
    ['icon64', 128],
  ]) {
    const line = header.split('\n').find((line) => line.startsWith('// @' + field + ' '));
    assert.ok(line?.includes('data:image/png;base64,'));
    const encoded = line.split('data:image/png;base64,')[1].trim();
    const expected = await readFile(
      new globalThis.URL('../assets/badges/basic-' + size + '.png', import.meta.url),
    );
    assert.equal(encoded, expected.toString('base64'));
  }
});
