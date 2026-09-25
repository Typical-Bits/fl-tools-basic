import assert from 'node:assert/strict';
import test from 'node:test';
import { JSDOM } from 'jsdom';
import { CardNavigator } from '../src/card-navigation.js';

function candidate(element, title) {
  return {
    element,
    kind: 'content',
    parsed: { canonicalUrl: element.querySelector('a').href, title },
  };
}

test('card navigation skips hidden containers, wraps, opens, and clears its selection', async () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><article id="one"><a href="/posts/1">One</a></article><article id="hidden" hidden><a href="/posts/2">Hidden</a></article><article id="three"><a href="/posts/3">Three</a></article></body></html>',
    { url: 'https://fetlife.com/home' },
  );
  const elements = [...dom.window.document.querySelectorAll('article')];
  const candidates = [
    candidate(elements[0], 'One'),
    candidate(elements[1], 'Hidden'),
    candidate(elements[2], 'Three'),
  ];
  const selected = [];
  let opened = null;
  elements[0].querySelector('a').addEventListener('click', (event) => {
    event.preventDefault();
    opened = 'One';
  });
  const navigator = new CardNavigator({
    announcer: { announce: (message) => selected.push(message) },
    document: dom.window.document,
    getCandidates: () => candidates,
    onOpen: async (item) => selected.push(`Seen ${item.parsed.title}`),
  });

  assert.equal(navigator.move(1).parsed.title, 'One');
  assert.equal(elements[0].dataset.fltCardSelected, 'true');
  assert.equal(navigator.move(1).parsed.title, 'Three');
  assert.equal(navigator.move(1).parsed.title, 'One');
  assert.equal(navigator.move(-1).parsed.title, 'Three');
  navigator.move(1);
  assert.equal(await navigator.open(), true);
  assert.equal(opened, 'One');
  assert.ok(selected.includes('Seen One'));
  navigator.clear();
  assert.equal(dom.window.document.querySelector('[data-flt-card-selected="true"]'), null);
  dom.window.close();
});

test('card navigation can restrict movement to request candidates', () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><article id="content"><a href="/posts/1">Post</a></article><div id="request" data-clickable-url-value="/events/2026/10/10/example"><a href="/events/2026/10/10/example">Event</a></div></body></html>',
    { url: 'https://fetlife.com/requests' },
  );
  const content = candidate(dom.window.document.getElementById('content'), 'Post');
  const request = {
    element: dom.window.document.getElementById('request'),
    kind: 'event',
    parsed: { canonicalUrl: 'https://fetlife.com/events/2026/10/10/example', title: 'Event' },
  };
  const navigator = new CardNavigator({
    document: dom.window.document,
    getCandidates: () => [content, request],
  });
  assert.equal(navigator.move(1, { kinds: ['event', 'profile'] }), request);
  dom.window.close();
});
