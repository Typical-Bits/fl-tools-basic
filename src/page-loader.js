const CANDIDATE_SELECTOR = [
  '[data-member-card]',
  '[data-user-id]',
  '[data-content-id]',
  '[data-story-uid]',
  '[data-event-id]',
  '[data-group-id]',
  '[data-fltools-fixture-kind]',
  'article',
].join(', ');
const UNSAFE_SELECTOR = 'script, style, iframe, object, embed';
const EXPLICIT_NEXT_SELECTOR =
  'a[rel~="next"][href], link[rel~="next"][href], [data-flt-next-page][href]';
const NEXT_LABEL = /^(next(?:\s+page)?(?:\s*[›»])?|›|»)$/i;

function identity(node) {
  for (const name of [
    'data-user-id',
    'data-content-id',
    'data-story-uid',
    'data-event-id',
    'data-group-id',
  ]) {
    const value = node.getAttribute(name) || node.querySelector(`[${name}]`)?.getAttribute(name);
    if (value) return `${name}:${value}`;
  }
  const href = node.matches?.('a[href]')
    ? node.getAttribute('href')
    : node.querySelector('a[href]')?.getAttribute('href');
  return href ? `href:${href}` : null;
}

function listingItems(root) {
  const nodes = [...root.querySelectorAll(CANDIDATE_SELECTOR)];
  return nodes.filter((node) => !nodes.some((other) => other !== node && other.contains(node)));
}

export function listingRoot(document) {
  const last = listingItems(document).at(-1);
  if (last?.parentElement && last.parentElement !== document.documentElement) {
    return last.closest('.flt-loaded-page')?.parentElement ?? last.parentElement;
  }
  return document.querySelector('[role="feed"]') ?? document.querySelector('main') ?? document.body;
}

export function placeAfterListing(document, node) {
  const last = listingItems(document).at(-1);
  if (last) {
    const page = last.closest('.flt-loaded-page');
    (page ?? last).after(node);
  } else listingRoot(document).append(node);
  return node;
}

function currentPageNumber(url) {
  const raw = url.searchParams.get('page');
  if (raw == null || raw === '') return 1;
  const page = Number.parseInt(raw, 10);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function labeledNextLink(root) {
  for (const link of root.querySelectorAll('a[href]')) {
    const aria = String(link.getAttribute('aria-label') ?? '').trim();
    const title = String(link.getAttribute('title') ?? '').trim();
    const text = String(link.textContent ?? '')
      .replace(/\s+/g, ' ')
      .trim();
    if (NEXT_LABEL.test(aria) || NEXT_LABEL.test(title) || NEXT_LABEL.test(text)) return link;
  }
  return null;
}

function nextPageFromQuery(root, baseUrl) {
  const current = new globalThis.URL(baseUrl);
  const page = currentPageNumber(current);
  let best;
  for (const link of root.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.toLowerCase().startsWith('javascript:')) continue;
    let url;
    try {
      url = new globalThis.URL(href, current);
    } catch {
      continue;
    }
    if (url.origin !== current.origin || url.pathname !== current.pathname) continue;
    const linked = Number.parseInt(url.searchParams.get('page') ?? '', 10);
    if (!Number.isInteger(linked) || linked <= page) continue;
    if (!best || linked < best.page) best = { href: url.href, page: linked };
  }
  return best?.href ?? null;
}

export function nativeNextPage(root, baseUrl = root.URL) {
  const explicit = root.querySelector(EXPLICIT_NEXT_SELECTOR);
  const link = explicit ?? labeledNextLink(root);
  if (link?.getAttribute('href')) {
    return new globalThis.URL(link.getAttribute('href'), baseUrl).href;
  }
  return nextPageFromQuery(root, baseUrl);
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
    for (const node of listingItems(document)) {
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
    for (const source of listingItems(parsed)) {
      const key = identity(source);
      if (key && this.#seen.has(key)) continue;
      if (key) this.#seen.add(key);
      const node = this.#document.importNode(source, true);
      node.querySelectorAll(UNSAFE_SELECTOR).forEach((unsafe) => unsafe.remove());
      items.push(node);
    }
    return Object.freeze({
      items: Object.freeze(items),
      nextUrl: nativeNextPage(parsed, url.href),
    });
  }

  append(items) {
    if (!items?.length) return;
    const page = this.#document.createElement('div');
    page.className = 'flt-root flt-loaded-page';
    page.append(...items);
    const sentinel = this.#document.querySelector('.flt-basic-scroll-sentinel');
    if (sentinel?.isConnected) sentinel.before(page);
    else listingRoot(this.#document).append(page);
  }
}
