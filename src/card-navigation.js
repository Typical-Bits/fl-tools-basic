function destination(candidate) {
  const links = [...candidate.element.querySelectorAll('a[href]')];
  const canonical = candidate.parsed?.canonicalUrl;
  if (canonical) {
    const exact = links.find((link) => {
      try {
        return (
          new link.ownerDocument.defaultView.URL(link.getAttribute('href'), link.ownerDocument.URL)
            .href === canonical
        );
      } catch {
        return false;
      }
    });
    if (exact) return exact;
  }
  return links[0] ?? (candidate.element.matches?.('a[href]') ? candidate.element : null);
}

function selectable(candidate, kinds) {
  const element = candidate?.element;
  return (
    element?.isConnected !== false &&
    !element?.hidden &&
    element?.getAttribute?.('aria-hidden') !== 'true' &&
    !element?.classList?.contains('flt-state-hidden') &&
    !element?.matches?.('main, [role="feed"], .flt-root') &&
    (!kinds || kinds.includes(candidate.kind)) &&
    Boolean(destination(candidate) || element?.hasAttribute?.('data-clickable-url-value'))
  );
}

export class CardNavigator {
  #announcer;
  #getCandidates;
  #onOpen;
  #selected;

  constructor({ document, getCandidates, announcer, onOpen }) {
    if (!document?.createElement || typeof getCandidates !== 'function') {
      throw new TypeError('Card navigation requires a document and candidates');
    }
    this.#announcer = announcer;
    this.#getCandidates = getCandidates;
    this.#onOpen = onOpen;
  }

  get selected() {
    return this.#selected ?? null;
  }

  move(delta, { kinds } = {}) {
    const candidates = [...this.#getCandidates()].filter((item) => selectable(item, kinds));
    if (!candidates.length) {
      this.clear();
      this.#announcer?.announce?.('No visible cards are available.');
      return null;
    }
    const current = candidates.indexOf(this.#selected);
    const index =
      current === -1
        ? delta < 0
          ? candidates.length - 1
          : 0
        : (current + delta + candidates.length) % candidates.length;
    this.#select(candidates[index]);
    return this.#selected;
  }

  async open() {
    const candidate = this.#selected;
    if (!candidate || !selectable(candidate)) return false;
    await this.#onOpen?.(candidate);
    const link = destination(candidate);
    if (link) link.click();
    else candidate.element.click?.();
    return true;
  }

  clear() {
    if (this.#selected?.element) delete this.#selected.element.dataset.fltCardSelected;
    this.#selected = undefined;
  }

  #select(candidate) {
    this.clear();
    this.#selected = candidate;
    candidate.element.dataset.fltCardSelected = 'true';
    candidate.element.scrollIntoView?.({
      block: 'nearest',
      behavior:
        candidate.element.ownerDocument.documentElement.classList.contains('flt-reduce-motion') ||
        candidate.element.ownerDocument.defaultView?.matchMedia?.(
          '(prefers-reduced-motion: reduce)',
        ).matches
          ? 'auto'
          : 'smooth',
    });
    const focusTarget = destination(candidate) ?? candidate.element;
    focusTarget.focus?.({ preventScroll: true });
    const label = candidate.parsed?.title ?? candidate.parsed?.displayName ?? candidate.kind;
    this.#announcer?.announce?.(`Selected ${label}.`);
  }
}
