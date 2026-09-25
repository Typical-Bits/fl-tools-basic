import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { BasicPageTools } from '../src/page-tools.js';

function content(element, title, contentType) {
  return { element, kind: 'content', parsed: { metadata: { contentType }, title } };
}

test('Bookmark finder filters loaded cards by text and content type without changing settings', () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><main><h1>Bookmarks</h1><article id="one">Alpha writing</article><article id="two">Beta picture</article></main></body></html>',
    { url: 'https://fetlife.com/bookmarks' },
  );
  const one = dom.window.document.getElementById('one');
  const two = dom.window.document.getElementById('two');
  const tools = new BasicPageTools({ document: dom.window.document });
  tools.update({
    candidates: [content(one, 'Alpha', 'writings'), content(two, 'Beta', 'pictures')],
    preset: 'default',
    route: { kind: 'feed', params: { view: 'bookmarks' } },
  });
  const input = dom.window.document.querySelector('[data-flt-bookmark-query]');
  input.value = 'beta';
  input.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  assert.equal(one.classList.contains('flt-basic-bookmark-filtered'), true);
  assert.equal(two.classList.contains('flt-basic-bookmark-filtered'), false);
  assert.match(
    dom.window.document.querySelector('[data-flt-page-tools-status]').textContent,
    /1 of 2/,
  );

  input.value = '';
  input.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  const type = dom.window.document.querySelector('[data-flt-bookmark-type]');
  type.value = 'writings';
  type.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
  assert.equal(one.classList.contains('flt-basic-bookmark-filtered'), false);
  assert.equal(two.classList.contains('flt-basic-bookmark-filtered'), true);
  tools.destroy();
  assert.equal(two.classList.contains('flt-basic-bookmark-filtered'), false);
  dom.window.close();
});

test('Requests tools summarize loaded candidate types and navigate requests explicitly', () => {
  const dom = new JSDOM('<!doctype html><html><body><main></main></body></html>', {
    url: 'https://fetlife.com/requests',
  });
  let navigated = 0;
  const tools = new BasicPageTools({
    document: dom.window.document,
    onNextRequest: () => (navigated += 1),
  });
  const requestElements = ['event', 'event', 'profile'].map((kind) => {
    const element = dom.window.document.createElement('article');
    element.dataset.kind = kind;
    dom.window.document.querySelector('main').append(element);
    return element;
  });
  tools.update({
    candidates: [
      { element: requestElements[0], kind: 'event', parsed: {} },
      { element: requestElements[1], kind: 'event', parsed: {} },
      { element: requestElements[2], kind: 'profile', parsed: {} },
    ],
    preset: 'minimal',
    route: { kind: 'feed', params: { view: 'requests' } },
  });
  assert.equal(dom.window.document.documentElement.dataset.fltBasicSurface, 'requests');
  assert.equal(dom.window.document.documentElement.dataset.fltBasicMode, 'minimal');
  assert.match(
    dom.window.document.querySelector('[data-flt-page-tools-status]').textContent,
    /2 events · 1 person/,
  );
  dom.window.document.querySelector('[data-flt-next-request]').click();
  assert.equal(navigated, 1);
  tools.destroy();
  assert.equal(dom.window.document.documentElement.hasAttribute('data-flt-basic-surface'), false);
  dom.window.close();
});
