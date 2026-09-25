import assert from 'node:assert/strict';
import test from 'node:test';
import { feedFocusRequest } from '../src/feed-focus.js';
import { applyPreset, normalizeBasicSettings } from '../src/settings.js';

function candidate(category, routeKind = 'feed') {
  return {
    context: { route: { kind: routeKind } },
    kind: 'content',
    parsed: { metadata: { feedActivityCategory: category } },
  };
}

test('Feed Focus is owned by Clean and SFW without hiding posts, conversations, or unknown cards', () => {
  const standard = normalizeBasicSettings();
  const clean = applyPreset(standard, 'minimal');
  const sfw = applyPreset(standard, 'sfw');

  assert.equal(feedFocusRequest(candidate('reaction'), standard), null);
  assert.deepEqual(feedFocusRequest(candidate('reaction'), clean), {
    detail: 'Hidden by Clean feed focus because this is reaction activity.',
    reason: 'quiet',
    state: 'HIDDEN',
    treatment: 'feed-reaction',
  });
  assert.deepEqual(feedFocusRequest(candidate('social'), sfw), {
    detail: 'Hidden by SFW feed focus because this is social activity.',
    reason: 'quiet',
    state: 'HIDDEN',
    treatment: 'feed-social',
  });
  assert.equal(feedFocusRequest(candidate('post'), clean), null);
  assert.equal(feedFocusRequest(candidate('conversation'), clean), null);
  assert.equal(feedFocusRequest(candidate('unknown'), clean), null);
});

test('Feed Focus never hides content outside a feed route', () => {
  const clean = applyPreset(normalizeBasicSettings(), 'minimal');
  assert.equal(feedFocusRequest(candidate('reaction', 'content'), clean), null);
  assert.equal(feedFocusRequest({ kind: 'profile' }, clean), null);
});
