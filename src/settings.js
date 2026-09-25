import { FIXED_SHORTCUTS } from './navigation.js';

const freeze = (value) => Object.freeze(value);

export const BUILT_IN_PRESETS = freeze({
  default: freeze({
    feed: freeze({ focus: 'all' }),
    filters: freeze({
      age: freeze({ maximum: 80, minimum: 18 }),
      combine: 'and',
      genders: freeze([]),
      locations: freeze([]),
      minimumContent: freeze({ pictures: null, videos: null, writings: null }),
      relationships: freeze(['none', 'following', 'follows-you', 'friends']),
      resultMode: 'dim',
      roleMode: 'required',
      roles: freeze([]),
      scopes: freeze(['card']),
      terms: freeze({ exclude: freeze([]), include: freeze([]), limit: freeze([]) }),
    }),
    infiniteScroll: freeze({ enabled: true, pageLimit: 5 }),
    media: freeze({
      blurAvatars: false,
      blurPixels: 4,
      blurVideos: true,
      mode: 'show',
      preset: 'nsfw',
    }),
    pageEnhancements: freeze({
      exactTimestamps: true,
      hideBanners: false,
      pictureNavigation: true,
      sharedInterests: true,
      visitedLinks: true,
    }),
    seen: freeze({ presentation: 'normal', showChip: true }),
    ui: freeze({ notifications: true }),
  }),
  minimal: freeze({
    feed: freeze({ focus: 'focused' }),
    filters: freeze({
      age: freeze({ maximum: 80, minimum: 18 }),
      combine: 'and',
      genders: freeze([]),
      locations: freeze([]),
      minimumContent: freeze({ pictures: null, videos: null, writings: null }),
      relationships: freeze(['none', 'following', 'follows-you', 'friends']),
      resultMode: 'hide',
      roleMode: 'required',
      roles: freeze([]),
      scopes: freeze(['card']),
      terms: freeze({ exclude: freeze([]), include: freeze([]), limit: freeze([]) }),
    }),
    infiniteScroll: freeze({ enabled: false, pageLimit: 1 }),
    media: freeze({
      blurAvatars: false,
      blurPixels: 1,
      blurVideos: true,
      mode: 'blur',
      preset: 'sfw',
    }),
    pageEnhancements: freeze({
      exactTimestamps: false,
      hideBanners: true,
      pictureNavigation: false,
      sharedInterests: false,
      visitedLinks: false,
    }),
    seen: freeze({ presentation: 'dim', showChip: false }),
    ui: freeze({ notifications: false }),
  }),
  sfw: freeze({
    feed: freeze({ focus: 'focused' }),
    filters: freeze({
      age: freeze({ maximum: 80, minimum: 18 }),
      combine: 'and',
      genders: freeze([]),
      locations: freeze([]),
      minimumContent: freeze({ pictures: null, videos: null, writings: null }),
      relationships: freeze(['none', 'following', 'follows-you', 'friends']),
      resultMode: 'dim',
      roleMode: 'required',
      roles: freeze([]),
      scopes: freeze(['card']),
      terms: freeze({ exclude: freeze([]), include: freeze([]), limit: freeze([]) }),
    }),
    infiniteScroll: freeze({ enabled: true, pageLimit: 5 }),
    media: freeze({
      blurAvatars: false,
      blurPixels: 6,
      blurVideos: true,
      mode: 'blur',
      preset: 'sfw',
    }),
    pageEnhancements: freeze({
      exactTimestamps: true,
      hideBanners: true,
      pictureNavigation: true,
      sharedInterests: true,
      visitedLinks: true,
    }),
    seen: freeze({ presentation: 'normal', showChip: true }),
    ui: freeze({ notifications: true }),
  }),
});

export const BASIC_DEFAULTS = freeze({
  feed: freeze({ focus: 'all' }),
  filters: freeze({
    age: freeze({ maximum: null, minimum: null }),
    combine: 'and',
    genders: freeze([]),
    locations: freeze([]),
    minimumContent: freeze({ pictures: null, videos: null, writings: null }),
    resultMode: 'hide',
    relationships: freeze([]),
    roleMode: 'required',
    roles: freeze([]),
    scopes: freeze(['card', 'tags', 'nickname']),
    terms: freeze({
      exclude: freeze([]),
      history: freeze({
        exclude: freeze([]),
        include: freeze([]),
        limit: freeze([]),
      }),
      include: freeze([]),
      limit: freeze([]),
    }),
  }),
  infiniteScroll: freeze({ enabled: false, pageLimit: 5 }),
  media: freeze({
    blurAvatars: false,
    blurPixels: 4,
    blurVideos: true,
    mode: 'show',
    preset: 'nsfw',
  }),
  navigation: freeze({
    shortcuts: FIXED_SHORTCUTS,
  }),
  pageEnhancements: freeze({
    exactTimestamps: true,
    hideBanners: false,
    pictureNavigation: true,
    sharedInterests: true,
    visitedLinks: true,
  }),
  preset: 'default',
  presets: freeze({ custom: freeze({}) }),
  seen: freeze({ presentation: 'normal', showChip: true }),
  softBlock: freeze({ presentation: 'hide' }),
  ui: freeze({
    compact: false,
    dock: 'right',
    highContrast: false,
    menuWidth: 'full',
    notifications: true,
  }),
});

function object(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function clone(value) {
  return globalThis.structuredClone(value);
}

function merge(target, source) {
  if (!object(source)) return target;
  for (const [key, value] of Object.entries(source)) {
    if (!(key in target)) continue;
    target[key] = object(value) && object(target[key]) ? merge(target[key], value) : clone(value);
  }
  return target;
}

export function normalizeBasicSettings(value = {}) {
  const suppliedCustom = value?.presets?.custom;
  if (suppliedCustom !== undefined && !object(suppliedCustom)) {
    throw new TypeError('Basic custom presets are invalid');
  }
  const settings = merge(clone(BASIC_DEFAULTS), value);
  settings.presets.custom = {};
  for (const [name, policy] of Object.entries(suppliedCustom ?? {})) {
    if (customPresetName(name) !== name || !object(policy) || 'presets' in policy) {
      throw new TypeError('Basic custom preset policy is invalid');
    }
    const normalizedPolicy = normalizeBasicSettings({
      ...policy,
      preset: name,
      presets: { custom: {} },
    });
    delete normalizedPolicy.presets;
    settings.presets.custom[name] = normalizedPolicy;
  }
  const legacySaved = value?.filters?.terms?.saved;
  if (Array.isArray(legacySaved)) {
    settings.filters.terms.history.include = [
      ...new Set([...settings.filters.terms.history.include, ...legacySaved]),
    ];
  }
  if (typeof settings.preset !== 'string' || !settings.preset) settings.preset = 'default';
  const {
    feed,
    filters,
    infiniteScroll,
    media,
    navigation,
    pageEnhancements,
    seen,
    softBlock,
    ui,
  } = settings;
  const ageValid = [filters.age.minimum, filters.age.maximum].every(
    (age) => age === null || (Number.isInteger(age) && age >= 18 && age <= 999),
  );
  if (
    !ageValid ||
    (filters.age.minimum !== null &&
      filters.age.maximum !== null &&
      filters.age.minimum > filters.age.maximum) ||
    !['and', 'or'].includes(filters.combine) ||
    !['all', 'focused'].includes(feed.focus) ||
    !['hide', 'dim'].includes(filters.resultMode) ||
    !['required', 'preferred'].includes(filters.roleMode) ||
    !['show', 'blur', 'hide'].includes(media.mode) ||
    !['sfw', 'nsfw'].includes(media.preset) ||
    !Number.isInteger(media.blurPixels) ||
    media.blurPixels < 1 ||
    media.blurPixels > 10 ||
    !Number.isInteger(infiniteScroll.pageLimit) ||
    infiniteScroll.pageLimit < 1 ||
    infiniteScroll.pageLimit > 20 ||
    !['normal', 'dim', 'hide'].includes(seen.presentation) ||
    !['dim', 'hide'].includes(softBlock.presentation) ||
    !['left', 'right'].includes(ui.dock) ||
    !['full', 'compact', 'narrow'].includes(ui.menuWidth) ||
    !object(settings.presets) ||
    !object(settings.presets.custom)
  ) {
    throw new TypeError('Basic Browse settings are invalid');
  }
  for (const list of [
    filters.genders,
    filters.locations,
    filters.relationships,
    filters.roles,
    filters.scopes,
  ]) {
    if (!Array.isArray(list) || list.some((item) => typeof item !== 'string')) {
      throw new TypeError('Basic filter selections must be string arrays');
    }
  }
  if (
    !object(filters.minimumContent) ||
    Object.values(filters.minimumContent).some(
      (count) => count !== null && (!Number.isInteger(count) || count < 0 || count > 9999),
    )
  ) {
    throw new TypeError('Basic minimum content filters are invalid');
  }
  for (const list of [filters.terms.exclude, filters.terms.include, filters.terms.limit]) {
    if (!Array.isArray(list) || list.some((item) => typeof item !== 'string' || !item.trim())) {
      throw new TypeError('Basic terms must be non-empty strings');
    }
  }
  if (!object(filters.terms.history)) throw new TypeError('Basic term history is invalid');
  for (const list of Object.values(filters.terms.history)) {
    if (!Array.isArray(list) || list.some((item) => typeof item !== 'string' || !item.trim())) {
      throw new TypeError('Basic term history must contain non-empty strings');
    }
  }
  if (!object(navigation.shortcuts) || !object(pageEnhancements)) {
    throw new TypeError('Basic navigation and enhancements are invalid');
  }
  return settings;
}

export function saveTerms(settings, kind, terms) {
  if (!['exclude', 'include', 'limit'].includes(kind)) throw new TypeError('Unknown term kind');
  const clean = [...new Set(terms.map((term) => String(term).trim()).filter(Boolean))];
  settings.filters.terms[kind] = clean;
  settings.filters.terms.history[kind] = [
    ...new Set([...settings.filters.terms.history[kind], ...clean]),
  ];
}

export function reuseTerm(settings, kind, term) {
  saveTerms(settings, kind, [...settings.filters.terms[kind], term]);
}

export function forgetTerm(settings, kind, term) {
  settings.filters.terms[kind] = settings.filters.terms[kind].filter((item) => item !== term);
  settings.filters.terms.history[kind] = settings.filters.terms.history[kind].filter(
    (item) => item !== term,
  );
}

export function clearTermHistory(settings, kind) {
  if (!['exclude', 'include', 'limit'].includes(kind)) throw new TypeError('Unknown term kind');
  if (kind === 'limit') settings.filters.terms.limit = [];
  settings.filters.terms.history[kind] = [...settings.filters.terms[kind]];
}

export function applyPreset(current, presetName, custom = {}) {
  const source = BUILT_IN_PRESETS[presetName] ?? custom[presetName];
  if (!source || !object(source)) throw new TypeError('Unknown Basic preset');
  const next = merge(normalizeBasicSettings(current), source);
  next.preset = presetName;
  return normalizeBasicSettings(next);
}

export function saveCustomPreset(settings, name) {
  const cleanName = customPresetName(name);
  const normalized = normalizeBasicSettings(settings);
  const policy = clone(normalized);
  delete policy.presets;
  policy.preset = cleanName;
  normalized.presets.custom[cleanName] = policy;
  normalized.preset = cleanName;
  return normalized;
}

export function renameCustomPreset(settings, currentName, nextName) {
  const normalized = normalizeBasicSettings(settings);
  const cleanName = customPresetName(nextName);
  if (!(currentName in normalized.presets.custom)) throw new TypeError('Unknown custom preset');
  if (cleanName !== currentName && cleanName in normalized.presets.custom) {
    throw new TypeError('Custom preset name already exists');
  }
  const policy = normalized.presets.custom[currentName];
  delete normalized.presets.custom[currentName];
  policy.preset = cleanName;
  normalized.presets.custom[cleanName] = policy;
  if (normalized.preset === currentName) normalized.preset = cleanName;
  return normalized;
}

export function deleteCustomPreset(settings, name) {
  const normalized = normalizeBasicSettings(settings);
  if (!(name in normalized.presets.custom)) throw new TypeError('Unknown custom preset');
  delete normalized.presets.custom[name];
  if (normalized.preset === name) return applyPreset(normalized, 'default');
  return normalized;
}

function customPresetName(name) {
  const cleanName = String(name ?? '').trim();
  if (!/^[\p{L}\p{N}][\p{L}\p{N} _-]{0,39}$/u.test(cleanName) || cleanName in BUILT_IN_PRESETS) {
    throw new TypeError('Custom preset name is invalid or reserved');
  }
  return cleanName;
}
