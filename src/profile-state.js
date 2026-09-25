import { canonicalizeFetLifeUrl } from '@typicalbits/fl-tools-core';

export class BasicProfileState {
  #clock;
  #storage;

  constructor({ storage, clock = Date.now }) {
    if (!storage?.get || !storage?.put || !storage?.list) {
      throw new TypeError('Basic profile state requires Core storage');
    }
    this.#storage = storage;
    this.#clock = clock;
  }

  async markSeen({ personId, displayName = null, profileUrl = null, routeKind }) {
    if (!personId || routeKind !== 'PROFILE') return Object.freeze({ status: 'NOT_ELIGIBLE' });
    const current = await this.#storage.get('people', personId);
    const value = current?.value ?? { personId };
    const next = {
      ...value,
      displayName: displayName ?? value.displayName,
      personId,
      basic: {
        ...(value.basic ?? {}),
        profileUrl: canonicalizeFetLifeUrl(profileUrl) ?? value.basic?.profileUrl,
        seenAt: this.#clock(),
      },
    };
    const record = await this.#storage.put('people', personId, next, {
      expectedRevision: current?.revision ?? 0,
    });
    return Object.freeze({ revision: record.revision, status: 'RECORDED' });
  }

  async listRecentlyVisited({ query = '', limit = 100 } = {}) {
    const needle = String(query).trim().toLocaleLowerCase();
    const boundedLimit = Math.min(500, Math.max(1, Number.parseInt(limit, 10) || 100));
    const records = await this.#storage.list('people');
    return records
      .map((record) => record.value)
      .filter((value) => Number.isFinite(value?.basic?.seenAt))
      .map((value) => ({
        displayName: value.displayName ?? null,
        personId: String(value.personId),
        profileUrl: canonicalizeFetLifeUrl(value.basic.profileUrl),
        seenAt: value.basic.seenAt,
      }))
      .filter(
        (value) =>
          !needle ||
          value.personId.toLocaleLowerCase().includes(needle) ||
          value.displayName?.toLocaleLowerCase().includes(needle),
      )
      .sort(
        (left, right) => right.seenAt - left.seenAt || left.personId.localeCompare(right.personId),
      )
      .slice(0, boundedLimit);
  }

  async markUnseen(personId) {
    if (!personId) return false;
    const current = await this.#storage.get('people', personId);
    if (!Number.isFinite(current?.value?.basic?.seenAt)) return false;
    const basic = { ...current.value.basic };
    delete basic.seenAt;
    delete basic.profileUrl;
    await this.#storage.put(
      'people',
      personId,
      { ...current.value, basic },
      { expectedRevision: current.revision },
    );
    return true;
  }

  async setSoftBlock({ personId, displayName = null, reason = '', presentation = 'hide' }) {
    if (!personId || !['hide', 'dim'].includes(presentation)) {
      throw new TypeError('Soft Block identity and presentation are required');
    }
    const current = await this.#storage.get('people', personId);
    const value = current?.value ?? { personId };
    const record = await this.#storage.put(
      'people',
      personId,
      {
        ...value,
        displayName: displayName ?? value.displayName,
        personId,
        basic: {
          ...(value.basic ?? {}),
          softBlock: {
            createdAt: this.#clock(),
            presentation,
            reason: String(reason).trim().slice(0, 240),
          },
        },
      },
      { expectedRevision: current?.revision ?? 0 },
    );
    return Object.freeze({ revision: record.revision, status: 'BLOCKED' });
  }

  async removeSoftBlock(personId) {
    const current = await this.#storage.get('people', personId);
    if (!current?.value.basic?.softBlock) return false;
    const basic = { ...current.value.basic };
    delete basic.softBlock;
    await this.#storage.put(
      'people',
      personId,
      { ...current.value, basic },
      { expectedRevision: current.revision },
    );
    return true;
  }

  async listSoftBlocks() {
    const records = await this.#storage.list('people');
    return Object.freeze(
      records
        .filter((record) => record.value.basic?.softBlock)
        .map((record) =>
          Object.freeze({
            displayName: record.value.displayName ?? null,
            personId: record.value.personId,
            ...record.value.basic.softBlock,
          }),
        ),
    );
  }

  async resetSeen({ confirm }) {
    if (typeof confirm !== 'function' || !(await confirm()))
      return Object.freeze({ cleared: 0, status: 'CANCELLED' });
    const records = await this.#storage.list('people');
    let cleared = 0;
    for (const record of records) {
      if (!record.value.basic?.seenAt) continue;
      const basic = { ...record.value.basic };
      delete basic.seenAt;
      await this.#storage.put(
        'people',
        record.recordKey,
        { ...record.value, basic },
        { expectedRevision: record.revision },
      );
      cleared += 1;
    }
    return Object.freeze({ cleared, status: 'COMPLETE' });
  }

  async nativeBlock({ personId, confirm, perform }) {
    if (!personId || typeof confirm !== 'function' || typeof perform !== 'function') {
      throw new TypeError('Native Block requires identity, confirmation, and site action');
    }
    if (!(await confirm())) return Object.freeze({ status: 'CANCELLED' });
    await perform(personId);
    return Object.freeze({ status: 'REQUESTED' });
  }
}
