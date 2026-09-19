export class InfiniteScrollController {
  #active;
  #append;
  #enabled = false;
  #fetchPage;
  #limit = 5;
  #loaded = 0;
  #nextUrl;
  #queued = false;
  #seenUrls = new Set();

  constructor({ fetchPage, append }) {
    if (typeof fetchPage !== 'function' || typeof append !== 'function') {
      throw new TypeError('Infinite Scroll requires fetch and append functions');
    }
    this.#fetchPage = fetchPage;
    this.#append = append;
  }

  configure({ enabled, pageLimit }) {
    this.#enabled = Boolean(enabled);
    this.#limit = pageLimit;
    if (!this.#enabled) this.#queued = false;
  }

  setNext(url) {
    this.#nextUrl = url || null;
  }

  async requestNext({ signal } = {}) {
    if (!this.#enabled) return Object.freeze({ status: 'DISABLED' });
    if (this.#active) {
      this.#queued = true;
      return Object.freeze({ status: 'QUEUED' });
    }
    if (!this.#nextUrl || this.#seenUrls.has(this.#nextUrl))
      return Object.freeze({ status: 'END' });
    if (this.#loaded >= this.#limit) return Object.freeze({ status: 'LIMIT' });
    const url = this.#nextUrl;
    this.#seenUrls.add(url);
    this.#active = this.#load(url, signal);
    try {
      return await this.#active;
    } finally {
      this.#active = undefined;
      if (this.#queued && !signal?.aborted) {
        this.#queued = false;
        void this.requestNext({ signal });
      }
    }
  }

  reset() {
    this.#queued = false;
    this.#loaded = 0;
    this.#nextUrl = null;
    this.#seenUrls.clear();
  }

  async #load(url, signal) {
    try {
      const page = await this.#fetchPage(url, { signal });
      if (signal?.aborted) return Object.freeze({ status: 'ABORTED' });
      if (!page || !Array.isArray(page.items)) throw new TypeError('Next page result is invalid');
      await this.#append(page.items);
      this.#loaded += 1;
      this.#nextUrl = page.nextUrl ?? null;
      return Object.freeze({ appended: page.items.length, status: 'APPENDED' });
    } catch (error) {
      this.#seenUrls.delete(url);
      if (signal?.aborted || error?.name === 'AbortError')
        return Object.freeze({ status: 'ABORTED' });
      return Object.freeze({
        error,
        retry: () => this.requestNext({ signal }),
        status: 'FAILED',
      });
    }
  }
}

export class InfiniteScrollTrigger {
  #controller;
  #document;
  #observer;
  #observerFactory;
  #sentinel;

  constructor({ controller, document, observerFactory }) {
    if (!controller?.requestNext || !document?.createElement) {
      throw new TypeError('Infinite Scroll trigger dependencies are required');
    }
    this.#controller = controller;
    this.#document = document;
    this.#observerFactory = observerFactory;
  }

  start({ enabled, signal }) {
    this.stop();
    if (!enabled || typeof this.#observerFactory !== 'function') return false;
    const sentinel = this.#document.createElement('div');
    sentinel.className = 'flt-root flt-basic-scroll-sentinel';
    sentinel.dataset.fltBasicOwned = 'true';
    sentinel.setAttribute('aria-label', 'Load more profiles');
    const status = this.#document.createElement('span');
    status.textContent = 'More profiles load near here.';
    sentinel.append(status);
    this.#document.querySelector('[role="feed"], main')?.after(sentinel);
    this.#observer = this.#observerFactory(async (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      status.textContent = 'Loading more profiles…';
      const result = await this.#controller.requestNext({ signal });
      status.textContent =
        result.status === 'FAILED'
          ? 'More profiles could not be loaded. Use native pagination or retry.'
          : result.status === 'APPENDED'
            ? `${result.appended} more profiles loaded.`
            : 'No more profiles were loaded.';
      if (result.status === 'FAILED') {
        const retry = this.#document.createElement('button');
        retry.className = 'flt-button';
        retry.type = 'button';
        retry.textContent = 'Retry';
        retry.addEventListener('click', () => void result.retry());
        sentinel.append(retry);
      }
    });
    this.#observer.observe(sentinel);
    this.#sentinel = sentinel;
    return true;
  }

  stop() {
    this.#observer?.disconnect();
    this.#observer = undefined;
    this.#sentinel?.remove();
    this.#sentinel = undefined;
  }
}
