const CANDIDATE_SELECTOR =
  '[data-user-id], [data-content-id], [data-story-uid], [data-event-id], [data-group-id], article';
const UNSAFE_SELECTOR = 'script, style, iframe, object, embed';

function identity(node) {
  for (const name of [
    'data-user-id',
    'data-content-id',
    'data-story-uid',
    'data-event-id',
    'data-group-id',
  ]) {
    const value = node.getAttribute(name);
    if (value) return `${name}:${value}`;
  }
  const link = node.querySelector('a[href]')?.getAttribute('href');
  return link ? `href:${link}` : null;
}

export class BrowserPageLoader {
  #document;
  #fetch;
  #seen = new Set();
  #window;

  constructor({ document, window, fetchImpl = window?.fetch?.bind(window) }) {
    if (!document?.querySelector || !window?.DOMParser || typeof fetchImpl !== 'function') {
      throw new TypeError('Browser page loader dependencies are required');
    }
    this.#document = document;
    this.#window = window;
    this.#fetch = fetchImpl;
    for (const node of document.querySelectorAll(CANDIDATE_SELECTOR)) {
      const key = identity(node);
      if (key) this.#seen.add(key);
    }
  }

  async fetchPage(value, { signal } = {}) {
    const url = new globalThis.URL(value, this.#document.URL);
    if (url.origin !== new globalThis.URL(this.#document.URL).origin) {
      throw new TypeError('Infinite Scroll only loads same-origin pages');
    }
    const response = await this.#fetch(url.href, {
      credentials: 'same-origin',
      headers: { Accept: 'text/html' },
      signal,
    });
    if (!response.ok) throw new Error(`Next page request failed with ${response.status}`);
    const parsed = new this.#window.DOMParser().parseFromString(await response.text(), 'text/html');
    const items = [];
    for (const source of parsed.querySelectorAll(CANDIDATE_SELECTOR)) {
      const key = identity(source);
      if (key && this.#seen.has(key)) continue;
      if (key) this.#seen.add(key);
      const node = this.#document.importNode(source, true);
      node.querySelectorAll(UNSAFE_SELECTOR).forEach((unsafe) => unsafe.remove());
      items.push(node);
    }
    const next = parsed.querySelector('a[rel="next"], [data-flt-next-page][href]');
    return Object.freeze({
      items: Object.freeze(items),
      nextUrl: next ? new globalThis.URL(next.getAttribute('href'), url).href : null,
    });
  }

  append(items) {
    const root = this.#document.querySelector('[role="feed"], main');
    if (!root) throw new TypeError('No native content container is available');
    root.append(...items);
  }
}

export function nativeNextPage(document) {
  const link = document.querySelector('a[rel="next"], [data-flt-next-page][href]');
  return link ? new globalThis.URL(link.getAttribute('href'), document.URL).href : null;
}
