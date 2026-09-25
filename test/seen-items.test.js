import assert from 'node:assert/strict';
import test from 'node:test';
import { BasicSeenItems, normalizeSeenItems } from '../src/seen-items.js';
import { isCurrentItemRoute } from '../src/basic-product.js';

class Storage {
  record;

  async get() {
    return this.record ? globalThis.structuredClone(this.record) : undefined;
  }

  async put(_store, key, value, { expectedRevision }) {
    assert.equal(key, 'basic.seen-items');
    assert.equal(expectedRevision, this.record?.revision ?? 0);
    this.record = {
      recordKey: key,
      revision: (this.record?.revision ?? 0) + 1,
      value: globalThis.structuredClone(value),
    };
    return globalThis.structuredClone(this.record);
  }

  async delete() {
    this.record = undefined;
    return true;
  }
}

test('seen items retain bounded durable content and event visits', async () => {
  const storage = new Storage();
  const seen = new BasicSeenItems({ clock: () => 500, limit: 2, storage });
  await seen.load();
  assert.equal(await seen.mark({ key: 'content:1', kind: 'content', title: 'One' }), true);
  await seen.mark({ key: 'event:2', kind: 'event', title: 'Two' });
  await seen.mark({ key: 'content:3', kind: 'content', title: 'Three' });
  assert.equal(seen.has('content:1'), false);
  assert.equal(seen.has('event:2'), true);
  assert.equal(seen.has('content:3'), true);
  assert.equal(storage.record.value.items.length, 2);

  const reloaded = new BasicSeenItems({ storage });
  await reloaded.load();
  assert.equal(reloaded.has('event:2'), true);
  assert.equal(await reloaded.reset(), 2);
  assert.equal(reloaded.size, 0);
});

test('seen item normalization rejects unsafe or unsupported records', () => {
  assert.deepEqual(
    normalizeSeenItems({
      items: [
        { key: 'content:1', kind: 'content', seenAt: 2, title: 'One' },
        { key: '', kind: 'content', seenAt: 3 },
        { key: 'person:2', kind: 'profile', seenAt: 4 },
      ],
      version: 1,
    }),
    {
      items: [{ key: 'content:1', kind: 'content', seenAt: 2, title: 'One' }],
      version: 1,
    },
  );
});

test('Seen persistence recognizes detail routes without treating listings as opened items', () => {
  const candidate = (kind, route) => ({ context: { route }, kind });
  assert.equal(
    isCurrentItemRoute(candidate('content', { kind: 'content', params: { contentId: '1' } })),
    true,
  );
  assert.equal(
    isCurrentItemRoute(candidate('event', { kind: 'event', params: { view: 'list' } })),
    false,
  );
  assert.equal(
    isCurrentItemRoute(
      candidate('event', { kind: 'event', params: { pathIds: ['2026', '10'], view: 'detail' } }),
    ),
    true,
  );
  assert.equal(
    isCurrentItemRoute(candidate('group', { kind: 'group', params: { view: 'list' } })),
    false,
  );
  assert.equal(
    isCurrentItemRoute(candidate('group', { kind: 'group', params: { groupId: '42' } })),
    true,
  );
});
