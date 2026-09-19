export const FIXED_SHORTCUTS = Object.freeze({
  filters: 'F',
  next: 'N',
  nsfw: 'S',
  top: 'T',
});

function isEditable(target) {
  return (
    target?.isContentEditable ||
    ['INPUT', 'SELECT', 'TEXTAREA'].includes(String(target?.tagName ?? '').toUpperCase())
  );
}

export class BasicNavigation {
  #document;
  #handlers;
  #getShortcuts;
  #onKeyDown;
  #window;

  constructor({ document, window, handlers, getShortcuts = () => FIXED_SHORTCUTS }) {
    if (!document?.addEventListener || !window || !handlers) {
      throw new TypeError('Basic navigation dependencies are required');
    }
    this.#document = document;
    this.#window = window;
    this.#handlers = handlers;
    this.#getShortcuts = getShortcuts;
    this.#onKeyDown = (event) => {
      if (event.defaultPrevented || isEditable(event.target)) return;
      const eventShortcut = [
        ...(event.ctrlKey ? ['Ctrl'] : []),
        ...(event.altKey ? ['Alt'] : []),
        ...(event.shiftKey ? ['Shift'] : []),
        ...(event.metaKey ? ['Meta'] : []),
        event.key.length === 1 ? event.key.toUpperCase() : event.key,
      ].join('+');
      const shortcuts = this.#getShortcuts();
      if (eventShortcut === shortcuts.settings) {
        event.preventDefault();
        this.#handlers.settings?.();
      } else if (eventShortcut === shortcuts.filters) {
        event.preventDefault();
        this.#handlers.filters?.();
      } else if (eventShortcut === shortcuts.hide) {
        event.preventDefault();
        this.#handlers.hide?.();
      } else if (eventShortcut === shortcuts.nsfw) {
        event.preventDefault();
        this.#handlers.nsfw?.();
      } else if (eventShortcut === shortcuts.next) {
        event.preventDefault();
        this.#handlers.next?.();
      } else if (eventShortcut === shortcuts.top) {
        event.preventDefault();
        (this.#handlers.top ?? (() => this.#window.scrollTo({ behavior: 'smooth', top: 0 })))();
      }
    };
  }

  start() {
    this.#document.addEventListener('keydown', this.#onKeyDown);
  }

  stop() {
    this.#document.removeEventListener('keydown', this.#onKeyDown);
  }
}
