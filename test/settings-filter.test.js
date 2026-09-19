import assert from 'node:assert/strict';
import test from 'node:test';
import { cardRequests, evaluateCandidate } from '../src/filter-engine.js';
import { applyPreset, normalizeBasicSettings, saveCustomPreset } from '../src/settings.js';

test('Basic settings validate retained ranges and built-in presets apply atomically', () => {
  const defaults = normalizeBasicSettings();
  assert.equal(defaults.media.blurPixels, 4);
  assert.equal(normalizeBasicSettings({ preset: null }).preset, 'default');
  assert.equal(defaults.infiniteScroll.enabled, false);
  const sfw = applyPreset(defaults, 'sfw');
  assert.equal(sfw.preset, 'sfw');
  assert.equal(sfw.media.mode, 'blur');
  assert.equal(sfw.media.preset, 'sfw');
  assert.equal(sfw.filters.combine, 'and');
  assert.throws(
    () => normalizeBasicSettings({ media: { blurPixels: 11 } }),
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

test('excluded terms suppress and preferred roles do not become hard filters', () => {
  const settings = normalizeBasicSettings({
    filters: {
      roleMode: 'preferred',
      roles: ['Switch'],
      terms: { exclude: ['spam'], include: [], limit: [], saved: [] },
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
