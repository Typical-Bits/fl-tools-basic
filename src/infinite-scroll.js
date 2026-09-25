import { placeAfterListing } from './page-loader.js';

export const INFINITE_SCROLL_OBSERVER_OPTIONS = Object.freeze({ rootMargin: '200px' });

export class InfiniteScrollController {
  #active;
  #append;
  #enabled = false;
  #lastError = null;
  #lastStatus = 'IDLE';
  #listeners = new Set();
  #fetchPage;
  #limit = 5;
  #loaded = 0;
  #loadedItems = 0;
  #nextUrl;
  #paused = false;
  #pauseUntil = 0;
  #pauseTimer;
  #clock;
  #setInterval;
  #clearInterval;
  #queued = false;
  #seenUrls = new Set();

  constructor({
    fetchPage,
    append,
    clock = Date.now,
    setInterval: schedule = globalThis.setInterval,
    clearInterval: cancel = globalThis.clearInterval,
  }) {
    if (typeof fetchPage !== 'function' || typeof append !== 'function') {
      throw new TypeError('Infinite Scroll requires fetch and append functions');
    }
    this.#clock = clock;
    this.#setInterval = schedule;
    this.#clearInterval = cancel;
    this.#fetchPage = fetchPage;
    this.#append = append;
  }

  configure({ enabled, pageLimit }) {
    this.#enabled = Boolean(enabled);
    this.#limit = pageLimit;
    if (!this.#enabled) this.#queued = false;
    this.#notify();
  }

  setNext(url) {
    this.#nextUrl = url || null;
    this.#notify();
  }

  get state() {
    return Object.freeze({
      enabled: this.#enabled,
      error: this.#lastError,
      limit: this.#limit,
      loadedItems: this.#loadedItems,
      loadedPages: this.#loaded,
      loading: Boolean(this.#active),
      nextAvailable: Boolean(this.#nextUrl),
      paused: this.#paused,
      pauseRemainingSeconds: this.#pauseUntil
        ? Math.max(0, Math.ceil((this.#pauseUntil - this.#clock()) / 1000))
        : null,
      queued: this.#queued,
      status: this.#lastStatus,
    });
  }

  subscribe(listener) {
    if (typeof listener !== 'function') throw new TypeError('Infinite Scroll listener is required');
    this.#listeners.add(listener);
    listener(this.state);
    return () => this.#listeners.delete(listener);
  }

  pause(minutes = 0) {
    this.#cancelPauseTimer();
    if ([5, 15, 30, 60].includes(minutes)) {
      this.#pauseUntil = this.#clock() + minutes * 60000;
      this.#pauseTimer = this.#setInterval(() => {
        if (this.#clock() >= this.#pauseUntil) this.resume();
        else this.#notify();
      }, 1000);
    }
    this.#paused = true;
    this.#queued = false;
    this.#lastStatus = 'PAUSED';
    this.#notify();
    return this.state;
  }

  #cancelPauseTimer() {
    if (this.#pauseTimer !== undefined) this.#clearInterval(this.#pauseTimer);
    this.#pauseTimer = undefined;
    this.#pauseUntil = 0;
  }

  resume() {
    this.#cancelPauseTimer();
    this.#paused = false;
    this.#lastStatus = 'READY';
    this.#notify();
    return this.state;
  }

  retry({ manual = false, signal } = {}) {
    if (this.#lastStatus !== 'FAILED')
      return Promise.resolve(Object.freeze({ status: 'NO_RETRY' }));
    return this.requestNext({ manual, signal });
  }

  async requestNext({ manual = false, signal } = {}) {
    if (!this.#enabled && !manual) return Object.freeze({ status: 'DISABLED' });
    if (this.#paused) return Object.freeze({ status: 'PAUSED' });
    if (this.#active) {
      this.#queued = true;
      this.#lastStatus = 'QUEUED';
      this.#notify();
      return Object.freeze({ status: 'QUEUED' });
    }
    if (!this.#nextUrl || this.#seenUrls.has(this.#nextUrl))
      return Object.freeze({ status: 'END' });
    if (this.#loaded >= this.#limit) return Object.freeze({ status: 'LIMIT' });
    const url = this.#nextUrl;
    this.#seenUrls.add(url);
    this.#active = this.#load(url, signal, manual);
    this.#lastStatus = 'LOADING';
    this.#lastError = null;
    this.#notify();
    try {
      return await this.#active;
    } finally {
      this.#active = undefined;
      this.#notify();
      if (this.#queued && !this.#paused && !signal?.aborted) {
        this.#queued = false;
        void this.requestNext({ manual, signal });
      }
    }
  }

  reset() {
    this.#cancelPauseTimer();
    this.#queued = false;
    this.#loaded = 0;
    this.#loadedItems = 0;
    this.#lastError = null;
    this.#lastStatus = 'IDLE';
    this.#paused = false;
    this.#nextUrl = null;
    this.#seenUrls.clear();
    this.#notify();
  }

  async #load(url, signal, manual) {
    try {
      const page = await this.#fetchPage(url, { signal });
      if (signal?.aborted) return Object.freeze({ status: 'ABORTED' });
      if (!page || !Array.isArray(page.items)) throw new TypeError('Next page result is invalid');
      await this.#append(page.items);
      this.#loaded += 1;
      this.#loadedItems += page.items.length;
      this.#nextUrl = page.nextUrl ?? null;
      this.#lastStatus = 'APPENDED';
      return Object.freeze({ appended: page.items.length, status: 'APPENDED' });
    } catch (error) {
      this.#seenUrls.delete(url);
      if (signal?.aborted || error?.name === 'AbortError')
        return Object.freeze({ status: 'ABORTED' });
      this.#lastError = error instanceof Error ? error.message : String(error);
      this.#lastStatus = 'FAILED';
      this.#notify();
      return Object.freeze({
        error,
        retry: () => this.retry({ manual, signal }),
        status: 'FAILED',
      });
    }
  }

  #notify() {
    const state = this.state;
    for (const listener of this.#listeners) listener(state);
  }
}

export class InfiniteScrollTrigger {
  #controller;
  #document;
  #observer;
  #observerFactory;
  #sentinel;
  #unsubscribe;

  constructor({ controller, document, observerFactory }) {
    if (!controller?.requestNext || !document?.createElement) {
      throw new TypeError('Infinite Scroll trigger dependencies are required');
    }
    this.#controller = controller;
    this.#document = document;
    this.#observerFactory = observerFactory;
  }

  start({ enabled, signal, mode = 'page' }) {
    this.stop();
    if (!enabled || typeof this.#observerFactory !== 'function') return false;
    const sentinel = this.#document.createElement('div');
    sentinel.className = 'flt-root flt-basic-scroll-sentinel';
    sentinel.dataset.fltBasicOwned = 'true';
    const profileMode = mode === 'profile';
    const noun = profileMode ? 'profiles' : 'page items';
    sentinel.setAttribute('aria-label', profileMode ? 'Load more profiles' : 'Load the next page');
    const status = this.#document.createElement('span');
    status.textContent = profileMode
      ? 'More profiles load near here.'
      : 'The next page loads near here.';
    const pause = this.#document.createElement('button');
    pause.className = 'flt-button';
    pause.type = 'button';
    pause.addEventListener('click', () => {
      if (this.#controller.state.paused) this.#controller.resume();
      else this.#controller.pause();
    });
    sentinel.append(status, pause);
    let wasPaused = this.#controller.state.paused;
    this.#unsubscribe = this.#controller.subscribe((state) => {
      if (wasPaused && !state.paused && this.#observer) {
        this.#observer.unobserve?.(sentinel);
        this.#observer.observe(sentinel);
      }
      wasPaused = state.paused;
      pause.textContent = state.paused ? 'Resume auto-loading' : 'Pause auto-loading';
      status.textContent = state.paused
        ? `${state.loadedPages} additional pages loaded. Auto-loading paused.`
        : state.loading
          ? `Loading more ${noun}…`
          : `${state.loadedPages} additional pages and ${state.loadedItems} items loaded this session.`;
    });
    placeAfterListing(this.#document, sentinel);
    this.#observer = this.#observerFactory(async (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      status.textContent = `Loading more ${noun}…`;
      const result = await this.#controller.requestNext({ signal });
      if (result.status === 'APPENDED') placeAfterListing(this.#document, sentinel);
      status.textContent =
        result.status === 'FAILED'
          ? `More ${noun} could not be loaded. Use native pagination or retry.`
          : result.status === 'APPENDED'
            ? `${result.appended} more ${noun} loaded.`
            : `No more ${noun} were loaded.`;
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
    this.#unsubscribe?.();
    this.#unsubscribe = undefined;
    this.#sentinel?.remove();
    this.#sentinel = undefined;
  }
}
