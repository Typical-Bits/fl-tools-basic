const SETTINGS_KEY = 'basic.seen-items';
const DEFAULT_LIMIT = 512;
const KINDS = new Set(['content', 'event', 'group']);

function cleanText(value, maximum) {
  return typeof value === 'string' ? value.trim().slice(0, maximum) : '';
}

export function normalizeSeenItems(value, limit = DEFAULT_LIMIT) {
  const source = value?.version === 1 && Array.isArray(value.items) ? value.items : [];
  const items = new Map();
  for (const candidate of source) {
    const key = cleanText(candidate?.key, 2_048);
    const kind = cleanText(candidate?.kind, 20);
    if (!key || !KINDS.has(kind) || !Number.isFinite(candidate?.seenAt)) continue;
    items.delete(key);
    items.set(key, {
      key,
      kind,
      seenAt: candidate.seenAt,
      ...(cleanText(candidate.title, 160) ? { title: cleanText(candidate.title, 160) } : {}),
    });
  }
  return {
    items: [...items.values()].sort((left, right) => left.seenAt - right.seenAt).slice(-limit),
    version: 1,
  };
}

export class BasicSeenItems {
  #clock;
  #items = new Map();
  #limit;
  #storage;

  constructor({ storage, clock = Date.now, limit = DEFAULT_LIMIT }) {
    if (
      !storage?.get ||
      !storage?.put ||
      !storage?.delete ||
      !Number.isInteger(limit) ||
      limit < 1
    ) {
      throw new TypeError('Seen items require storage and a positive limit');
    }
    this.#clock = clock;
    this.#limit = limit;
    this.#storage = storage;
  }

  get size() {
    return this.#items.size;
  }

  has(key) {
    return this.#items.has(key);
  }

  async load() {
    try {
      const record = await this.#storage.get('settings', SETTINGS_KEY);
      this.#accept(record?.value);
    } catch (error) {
      if (error?.code !== 'STORAGE_ACCOUNT_AMBIGUOUS') throw error;
      this.#items.clear();
    }
    return this;
  }

  async mark({ key, kind, title }) {
    const item = normalizeSeenItems({
      items: [{ key, kind, seenAt: this.#clock(), title }],
      version: 1,
    }).items[0];
    if (!item) return false;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const record = await this.#storage.get('settings', SETTINGS_KEY);
        const current = normalizeSeenItems(record?.value, this.#limit);
        const next = normalizeSeenItems(
          {
            items: [...current.items.filter((entry) => entry.key !== item.key), item],
            version: 1,
          },
          this.#limit,
        );
        await this.#storage.put('settings', SETTINGS_KEY, next, {
          expectedRevision: record?.revision ?? 0,
        });
        this.#accept(next);
        return true;
      } catch (error) {
        if (error?.code === 'STORAGE_ACCOUNT_AMBIGUOUS') return false;
        if (error?.code !== 'STORAGE_CONFLICT' || attempt === 2) throw error;
      }
    }
    return false;
  }

  async reset() {
    const count = this.#items.size;
    try {
      await this.#storage.delete('settings', SETTINGS_KEY);
    } catch (error) {
      if (error?.code !== 'STORAGE_ACCOUNT_AMBIGUOUS') throw error;
    }
    this.#items.clear();
    return count;
  }

  #accept(value) {
    const normalized = normalizeSeenItems(value, this.#limit);
    this.#items = new Map(normalized.items.map((item) => [item.key, item]));
  }
}

export const SEEN_ITEMS_SETTINGS_KEY = SETTINGS_KEY;
