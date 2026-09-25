function pageSurface(route) {
  if (route?.params?.view === 'bookmarks') return 'bookmarks';
  if (route?.params?.view === 'requests') return 'requests';
  if (route?.params?.view === 'explore') return 'explore';
  if (route?.params?.view === 'fetishes') return 'fetishes';
  if (route?.params?.place) return 'places';
  if (route?.params?.relationshipList) return 'relationships';
  return route?.kind ?? 'unknown';
}

function cardCandidates(candidates) {
  return [...candidates].filter(
    (candidate) =>
      candidate?.element &&
      candidate.element.isConnected !== false &&
      !candidate.element.matches?.('main, [role="feed"], .flt-root'),
  );
}

export class BasicPageTools {
  #candidates = [];
  #document;
  #onNextRequest;
  #root;
  #surface;

  constructor({ document, onNextRequest } = {}) {
    if (!document?.createElement) throw new TypeError('Page tools require a document');
    this.#document = document;
    this.#onNextRequest = onNextRequest;
  }

  update({ candidates = [], preset = 'default', route } = {}) {
    this.#candidates = cardCandidates(candidates);
    const surface = pageSurface(route);
    this.#document.documentElement.dataset.fltBasicSurface = surface;
    this.#document.documentElement.dataset.fltBasicMode = preset;
    if (surface !== this.#surface || !this.#root?.isConnected) {
      this.#removeRoot();
      this.#surface = surface;
      if (surface === 'bookmarks') this.#mountBookmarks();
      if (surface === 'requests') this.#mountRequests();
    }
    if (surface === 'bookmarks') this.#applyBookmarkFilter();
    if (surface === 'requests') this.#renderRequestSummary();
  }

  destroy() {
    this.#removeRoot();
    for (const element of this.#document.querySelectorAll('.flt-basic-bookmark-filtered')) {
      element.classList.remove('flt-basic-bookmark-filtered');
    }
    delete this.#document.documentElement.dataset.fltBasicSurface;
    delete this.#document.documentElement.dataset.fltBasicMode;
    this.#surface = undefined;
    this.#candidates = [];
  }

  #createRoot() {
    const root = this.#document.createElement('section');
    root.className = 'flt-root flt-basic-page-tools';
    root.dataset.fltBasicPageTools = 'true';
    const main = this.#document.querySelector('main') ?? this.#document.body;
    const heading = [...main.querySelectorAll('h1, h2')].find(
      (node) => node.textContent.trim().toLocaleLowerCase() === this.#surface,
    );
    if (heading) heading.after(root);
    else main.prepend(root);
    this.#root = root;
    return root;
  }

  #mountBookmarks() {
    const root = this.#createRoot();
    root.setAttribute('role', 'search');
    const query = this.#document.createElement('input');
    query.className = 'flt-input';
    query.type = 'search';
    query.placeholder = 'Find loaded bookmarks';
    query.setAttribute('aria-label', 'Find loaded bookmarks');
    query.dataset.fltBookmarkQuery = 'true';
    const type = this.#document.createElement('select');
    type.className = 'flt-input';
    type.setAttribute('aria-label', 'Bookmark content type');
    type.dataset.fltBookmarkType = 'true';
    for (const [value, label] of [
      ['', 'All types'],
      ['writings', 'Writings'],
      ['pictures', 'Pictures'],
      ['videos', 'Videos'],
      ['statuses', 'Statuses'],
    ]) {
      const option = this.#document.createElement('option');
      option.value = value;
      option.textContent = label;
      type.append(option);
    }
    const status = this.#document.createElement('span');
    status.className = 'flt-basic-page-status';
    status.dataset.fltPageToolsStatus = 'true';
    query.addEventListener('input', () => this.#applyBookmarkFilter());
    type.addEventListener('change', () => this.#applyBookmarkFilter());
    root.append(query, type, status);
  }

  #applyBookmarkFilter() {
    if (!this.#root) return;
    const query =
      this.#root.querySelector('[data-flt-bookmark-query]')?.value.trim().toLocaleLowerCase() ?? '';
    const type = this.#root.querySelector('[data-flt-bookmark-type]')?.value ?? '';
    const bookmarks = this.#candidates.filter((candidate) => candidate.kind === 'content');
    let visible = 0;
    for (const candidate of bookmarks) {
      const text = `${candidate.parsed?.title ?? ''} ${candidate.element.textContent ?? ''}`
        .replace(/\s+/g, ' ')
        .trim()
        .toLocaleLowerCase();
      const matches =
        (!query || text.includes(query)) &&
        (!type || candidate.parsed?.metadata?.contentType === type);
      candidate.element.classList.toggle('flt-basic-bookmark-filtered', !matches);
      if (matches) visible += 1;
    }
    const status = this.#root.querySelector('[data-flt-page-tools-status]');
    if (status) status.textContent = `${visible} of ${bookmarks.length} loaded bookmarks`;
  }

  #mountRequests() {
    const root = this.#createRoot();
    const status = this.#document.createElement('span');
    status.className = 'flt-basic-page-status';
    status.dataset.fltPageToolsStatus = 'true';
    const next = this.#document.createElement('button');
    next.className = 'flt-button';
    next.type = 'button';
    next.textContent = 'Next request';
    next.dataset.fltNextRequest = 'true';
    next.addEventListener('click', () => this.#onNextRequest?.());
    root.append(status, next);
  }

  #renderRequestSummary() {
    if (!this.#root) return;
    const counts = new Map();
    for (const candidate of this.#candidates) {
      counts.set(candidate.kind, (counts.get(candidate.kind) ?? 0) + 1);
    }
    const labels = { content: 'content', event: 'event', group: 'group', profile: 'person' };
    const summary = [...counts]
      .map(([kind, count]) => `${count} ${labels[kind] ?? kind}${count === 1 ? '' : 's'}`)
      .join(' · ');
    this.#root.querySelector('[data-flt-page-tools-status]').textContent =
      summary || 'No loaded requests';
    const next = this.#root.querySelector('[data-flt-next-request]');
    if (next) next.disabled = counts.size === 0;
  }

  #removeRoot() {
    this.#root?.remove();
    this.#root = undefined;
  }
}

export { pageSurface };
