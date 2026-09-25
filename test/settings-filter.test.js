import assert from 'node:assert/strict';
import test from 'node:test';
import { profileFilterFacts } from '../src/basic-product.js';
import { cardRequests, evaluateCandidate } from '../src/filter-engine.js';
import {
  applyPreset,
  clearTermHistory,
  deleteCustomPreset,
  forgetTerm,
  normalizeBasicSettings,
  renameCustomPreset,
  reuseTerm,
  saveCustomPreset,
  saveTerms,
} from '../src/settings.js';

test('Basic settings validate retained ranges and built-in presets apply atomically', () => {
  const defaults = normalizeBasicSettings();
  assert.equal(defaults.media.blurPixels, 4);
  assert.equal(normalizeBasicSettings({ preset: null }).preset, 'default');
  assert.equal(defaults.infiniteScroll.enabled, false);
  assert.equal(defaults.feed.focus, 'all');
  assert.equal(defaults.ui.menuWidth, 'full');
  const sfw = applyPreset(defaults, 'sfw');
  assert.equal(sfw.preset, 'sfw');
  assert.equal(sfw.media.mode, 'blur');
  assert.equal(sfw.media.preset, 'sfw');
  assert.equal(sfw.media.blurPixels, 6);
  assert.equal(sfw.filters.combine, 'and');
  assert.deepEqual(sfw.filters.age, { maximum: 80, minimum: 18 });
  assert.deepEqual(sfw.filters.relationships, ['none', 'following', 'follows-you', 'friends']);
  assert.equal(sfw.infiniteScroll.enabled, true);
  assert.equal(sfw.feed.focus, 'focused');
  assert.equal(sfw.pageEnhancements.hideBanners, true);
  const minimal = applyPreset(sfw, 'minimal');
  assert.equal(minimal.media.preset, 'sfw');
  assert.equal(minimal.media.blurPixels, 1);
  assert.equal(minimal.infiniteScroll.enabled, false);
  assert.equal(minimal.feed.focus, 'focused');
  assert.equal(minimal.pageEnhancements.hideBanners, true);
  assert.equal(minimal.seen.presentation, 'dim');
  assert.equal(minimal.seen.showChip, false);
  assert.equal(minimal.ui.notifications, false);
  const restored = applyPreset(minimal, 'default');
  assert.equal(restored.media.preset, 'nsfw');
  assert.equal(restored.infiniteScroll.enabled, true);
  assert.equal(restored.feed.focus, 'all');
  assert.equal(restored.seen.presentation, 'normal');
  assert.equal(restored.seen.showChip, true);
  assert.equal(restored.ui.notifications, true);
  assert.throws(
    () => normalizeBasicSettings({ media: { blurPixels: 11 } }),
    /settings are invalid/,
  );
  assert.throws(
    () => normalizeBasicSettings({ feed: { focus: 'custom' } }),
    /settings are invalid/,
  );
  assert.throws(
    () =>
      normalizeBasicSettings({
        filters: { age: { maximum: 20, minimum: 40 } },
      }),
    /settings are invalid/,
  );
});

test('custom presets retain Browse policy and cannot replace immutable built-ins', () => {
  const current = normalizeBasicSettings({ filters: { combine: 'or' } });
  const saved = saveCustomPreset(current, 'Nearby mix');
  assert.equal(saved.preset, 'Nearby mix');
  assert.equal(saved.presets.custom['Nearby mix'].filters.combine, 'or');
  assert.equal('presets' in saved.presets.custom['Nearby mix'], false);
  assert.throws(() => saveCustomPreset(current, 'sfw'), /reserved/);
});

test('custom presets support update, rename, and confirmed-delete policy semantics', () => {
  const first = saveCustomPreset(
    normalizeBasicSettings({ filters: { combine: 'or' } }),
    'Nearby mix',
  );
  const updated = saveCustomPreset(
    { ...first, filters: { ...first.filters, combine: 'and' } },
    'Nearby mix',
  );
  assert.equal(updated.presets.custom['Nearby mix'].filters.combine, 'and');
  const renamed = renameCustomPreset(updated, 'Nearby mix', 'Local mix');
  assert.equal(renamed.preset, 'Local mix');
  assert.equal('Nearby mix' in renamed.presets.custom, false);
  assert.equal(renamed.presets.custom['Local mix'].preset, 'Local mix');
  assert.throws(() => renameCustomPreset(renamed, 'Missing', 'Other'), /Unknown/);

  const deleted = deleteCustomPreset(renamed, 'Local mix');
  assert.equal(deleted.preset, 'default');
  assert.equal('Local mix' in deleted.presets.custom, false);
  assert.deepEqual(deleted.filters.age, { maximum: 80, minimum: 18 });
  assert.equal(deleted.infiniteScroll.enabled, true);
  assert.equal(deleted.media.preset, 'nsfw');
});

test('filter truth table preserves unknown values and AND/OR semantics', () => {
  const and = normalizeBasicSettings({
    filters: {
      age: { maximum: 45, minimum: 25 },
      combine: 'and',
      genders: ['Woman'],
    },
  });
  assert.equal(evaluateCandidate({ age: 30, gender: 'Woman' }, and).status, 'MATCH');
  assert.equal(evaluateCandidate({ age: 50, gender: 'Woman' }, and).status, 'NO_MATCH');
  assert.equal(evaluateCandidate({ age: 30 }, and).status, 'UNKNOWN');

  const or = normalizeBasicSettings({
    filters: {
      age: { maximum: 45, minimum: 25 },
      combine: 'or',
      genders: ['Woman'],
    },
  });
  assert.equal(evaluateCandidate({ age: 50, gender: 'Woman' }, or).status, 'MATCH');
  assert.equal(evaluateCandidate({ age: 50 }, or).status, 'UNKNOWN');
});

test('native parsed profile facts reach relationship filters without fixture-only attributes', () => {
  const element = {
    dataset: {},
  };
  const settings = normalizeBasicSettings({
    filters: { relationships: ['friends'] },
  });
  const friends = profileFilterFacts(element, {
    age: 35,
    gender: 'f',
    relationship: 'friends',
    roles: ['dominant'],
  });
  assert.equal(friends.relationship, 'friends');
  assert.equal(evaluateCandidate(friends, settings).status, 'MATCH');

  const following = profileFilterFacts(element, { relationship: 'following' });
  assert.equal(evaluateCandidate(following, settings).status, 'NO_MATCH');

  const notFollowing = profileFilterFacts(element, { relationship: 'none' });
  const notFollowingSettings = normalizeBasicSettings({
    filters: { relationships: ['none'] },
  });
  assert.equal(evaluateCandidate(notFollowing, notFollowingSettings).status, 'MATCH');

  const overlapping = profileFilterFacts(element, {
    relationship: 'none',
    relationships: ['none', 'following'],
  });
  const followingSettings = normalizeBasicSettings({
    filters: { relationships: ['following'] },
  });
  assert.deepEqual(overlapping.relationships, ['none', 'following']);
  assert.equal(evaluateCandidate(overlapping, followingSettings).status, 'MATCH');

  const unknown = profileFilterFacts(element, { relationship: null });
  const result = evaluateCandidate(unknown, settings);
  assert.equal(result.status, 'UNKNOWN');
  assert.deepEqual(result.reasons, ['FILTER_RELATIONSHIP']);
});

test('source-backed location and content counts reach retained Basic filters', () => {
  const element = { dataset: {} };
  const facts = profileFilterFacts(element, {
    location: 'Seattle, Washington',
    pictures: 12,
    videos: 2,
    writings: 5,
  });
  const settings = normalizeBasicSettings({
    filters: {
      locations: ['seattle'],
      minimumContent: { pictures: 10, videos: 2, writings: 3 },
    },
  });
  assert.equal(evaluateCandidate(facts, settings).status, 'MATCH');
  assert.equal(evaluateCandidate({ ...facts, pictures: 9 }, settings).status, 'NO_MATCH');
  assert.equal(evaluateCandidate({ ...facts, location: null }, settings).status, 'UNKNOWN');
  assert.throws(
    () => normalizeBasicSettings({ filters: { minimumContent: { pictures: 10000 } } }),
    /minimum content filters/,
  );
});

test('Hard-limit chips suppress matching visible profile text with a distinct reason', () => {
  const settings = normalizeBasicSettings({
    filters: {
      scopes: ['card'],
      terms: { limit: ['smoking'] },
    },
  });
  assert.deepEqual(evaluateCandidate({ card: ['Likes smoking socially'] }, settings), {
    reasons: ['FILTER_HARD_LIMIT'],
    status: 'NO_MATCH',
  });
  assert.equal(evaluateCandidate({ card: ['No tobacco'] }, settings).status, 'MATCH');
  assert.equal(evaluateCandidate({}, settings).status, 'MATCH');
});

test('excluded terms suppress and preferred roles do not become hard filters', () => {
  const settings = normalizeBasicSettings({
    filters: {
      roleMode: 'preferred',
      roles: ['Switch'],
      terms: { exclude: ['spam'], include: [], limit: [] },
    },
  });
  assert.equal(
    evaluateCandidate({ card: ['friendly spam'], roles: ['Switch'] }, settings).status,
    'NO_MATCH',
  );
  const preferred = evaluateCandidate({ card: ['friendly'], roles: ['Switch'] }, settings);
  assert.equal(preferred.status, 'MATCH');
  assert.equal(preferred.preferredRoleMatch, true);
});

test('term history stays field-specific and preserves legacy clear semantics', () => {
  const settings = normalizeBasicSettings({
    filters: { terms: { saved: ['legacy include'] } },
  });
  assert.deepEqual(settings.filters.terms.history.include, ['legacy include']);
  saveTerms(settings, 'exclude', ['spam', 'bots', 'spam']);
  saveTerms(settings, 'limit', ['hard limit']);
  assert.deepEqual(settings.filters.terms.history.exclude, ['spam', 'bots']);
  assert.deepEqual(settings.filters.terms.history.limit, ['hard limit']);
  reuseTerm(settings, 'include', 'legacy include');
  assert.deepEqual(settings.filters.terms.include, ['legacy include']);
  forgetTerm(settings, 'exclude', 'spam');
  assert.deepEqual(settings.filters.terms.exclude, ['bots']);
  assert.deepEqual(settings.filters.terms.history.exclude, ['bots']);
  clearTermHistory(settings, 'exclude');
  assert.deepEqual(settings.filters.terms.exclude, ['bots']);
  assert.deepEqual(settings.filters.terms.history.exclude, ['bots']);
  clearTermHistory(settings, 'limit');
  assert.deepEqual(settings.filters.terms.limit, []);
  assert.deepEqual(settings.filters.terms.history.limit, []);
});

test('card requests keep Soft Block stronger than filter and Seen', () => {
  const settings = normalizeBasicSettings({
    filters: { resultMode: 'dim' },
    seen: { presentation: 'hide' },
    softBlock: { presentation: 'hide' },
  });
  assert.deepEqual(
    cardRequests({ filterResult: { status: 'NO_MATCH' }, seen: true, softBlocked: true }, settings),
    [
      { reason: 'softBlock', state: 'HIDDEN' },
      { reason: 'filter', state: 'DIMMED' },
      { reason: 'seen', state: 'HIDDEN' },
    ],
  );
});
