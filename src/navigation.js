export const FIXED_SHORTCUTS = Object.freeze({
  browse: 'Alt+Shift+B',
  standard: '1',
  clean: '2',
  sfw: '3',
  previousCard: 'J',
  nextCard: 'K',
  openCard: 'Enter',
  next: 'N',
  top: 'T',
});

function isEditable(target) {
  return (
    target?.isContentEditable ||
    target?.closest?.(
      'input, select, textarea, button, a[href], summary, [role="button"], [role="textbox"], [contenteditable]:not([contenteditable="false"])',
    ) ||
    ['INPUT', 'SELECT', 'TEXTAREA'].includes(String(target?.tagName ?? '').toUpperCase())
  );
}

function pressedShortcut(event) {
  const key = event.code?.startsWith('Key')
    ? event.code.slice(3)
    : event.code?.startsWith('Digit')
      ? event.code.slice(5)
      : event.key.length === 1
        ? event.key.toUpperCase()
        : event.key;
  return [
    ...(event.ctrlKey ? ['Ctrl'] : []),
    ...(event.altKey ? ['Alt'] : []),
    ...(event.shiftKey ? ['Shift'] : []),
    ...(event.metaKey ? ['Meta'] : []),
    key,
  ].join('+');
}

export class BasicNavigation {
  #document;
  #handlers;
  #onKeyDown;
  #window;

  constructor({ document, window, handlers }) {
    if (!document?.addEventListener || !window || !handlers) {
      throw new TypeError('Basic navigation dependencies are required');
    }
    this.#document = document;
    this.#window = window;
    this.#handlers = handlers;
    this.#onKeyDown = (event) => {
      if (event.defaultPrevented || event.isComposing || event.repeat || isEditable(event.target)) {
        return;
      }
      const action = Object.entries(FIXED_SHORTCUTS).find(
        ([, shortcut]) => pressedShortcut(event) === shortcut,
      )?.[0];
      if (!action) return;
      event.preventDefault();
      if (action === 'top') {
        (
          this.#handlers.top ??
          (() =>
            this.#window.scrollTo({
              behavior:
                this.#window.document.documentElement.classList.contains('flt-reduce-motion') ||
                this.#window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
                  ? 'auto'
                  : 'smooth',
              top: 0,
            }))
        )();
        return;
      }
      this.#handlers[action]?.();
    };
  }

  start() {
    this.#document.addEventListener('keydown', this.#onKeyDown);
  }

  stop() {
    this.#document.removeEventListener('keydown', this.#onKeyDown);
  }
}
