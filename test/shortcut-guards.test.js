import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { BasicNavigation } from '../src/navigation.js';

test('single keys preserve native shortcuts, text editing, and focused controls', () => {
  const dom = new JSDOM(
    '<body><div id="page"></div><input><textarea></textarea><select></select><button><span>Press</span></button><a href="#">Link</a><details><summary>Help</summary></details><div contenteditable><span id="edit">Typing</span></div><div contenteditable="plaintext-only" id="plain"></div><div role="textbox" id="textbox"></div></body>',
  );
  const { document, KeyboardEvent } = dom.window;
  const calls = [];
  const nav = new BasicNavigation({
    document,
    window: dom.window,
    handlers: { nextCard: () => calls.push('next'), openCard: () => calls.push('open') },
  });
  nav.start();
  const press = (target, key, options = {}) => {
    const event = new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      cancelable: true,
      ...options,
    });
    target.dispatchEvent(event);
    return event.defaultPrevented;
  };
  for (const selector of [
    'input',
    'textarea',
    'select',
    'button span',
    'a',
    'summary',
    '#edit',
    '#plain',
    '#textbox',
  ]) {
    assert.equal(press(document.querySelector(selector), 'k'), false, selector);
    assert.equal(press(document.querySelector(selector), 'Enter'), false, selector);
  }
  const page = document.querySelector('#page');
  for (const key of [
    '?',
    '/',
    '.',
    'c',
    'l',
    'b',
    'ArrowRight',
    'ArrowLeft',
    'g',
    'h',
    'a',
    'p',
    'e',
    'Escape',
  ])
    assert.equal(press(page, key), false, key);
  for (const options of [
    { ctrlKey: true },
    { metaKey: true },
    { altKey: true },
    { shiftKey: true },
    { isComposing: true },
    { repeat: true },
  ])
    assert.equal(press(page, 'k', options), false);
  const prevented = new KeyboardEvent('keydown', { key: 'k', bubbles: true, cancelable: true });
  prevented.preventDefault();
  page.dispatchEvent(prevented);
  assert.deepEqual(calls, []);
  assert.equal(press(page, 'k'), true);
  assert.equal(press(page, 'Enter'), true);
  assert.deepEqual(calls, ['next', 'open']);
  nav.stop();
  assert.equal(press(page, 'k'), false);
  dom.window.close();
});
