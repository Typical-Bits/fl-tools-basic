const freeze = (value) => Object.freeze(value);

export const BUILT_IN_PRESETS = freeze({
  default: freeze({
    filters: freeze({}),
    media: freeze({ mode: 'show', preset: 'nsfw' }),
    seen: freeze({ presentation: 'normal', showChip: true }),
  }),
  minimal: freeze({
    filters: freeze({}),
    infiniteScroll: freeze({ enabled: false, pageLimit: 1 }),
    media: freeze({ mode: 'show', preset: 'nsfw' }),
    pageEnhancements: freeze({
      exactTimestamps: false,
      hideBanners: false,
      pictureNavigation: false,
      sharedInterests: false,
      visitedLinks: false,
    }),
    seen: freeze({ presentation: 'normal', showChip: false }),
  }),
  sfw: freeze({
    media: freeze({
      blurAvatars: false,
      blurPixels: 4,
      blurVideos: true,
      mode: 'blur',
      preset: 'sfw',
    }),
  }),
});

export const BASIC_DEFAULTS = freeze({
  filters: freeze({
    age: freeze({ maximum: null, minimum: null }),
    combine: 'and',
    genders: freeze([]),
    resultMode: 'hide',
    relationships: freeze([]),
    roleMode: 'required',
    roles: freeze([]),
    scopes: freeze(['card', 'tags', 'nickname']),
    terms: freeze({
      exclude: freeze([]),
      include: freeze([]),
      limit: freeze([]),
      saved: freeze([]),
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
    shortcuts: freeze({ filters: 'F', next: 'N', nsfw: 'S', top: 'T' }),
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
  seen: freeze({ presentation: 'dim', showChip: true }),
  softBlock: freeze({ presentation: 'hide' }),
  ui: freeze({
    compact: false,
    dock: 'right',
    highContrast: false,
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
  const settings = merge(clone(BASIC_DEFAULTS), value);
  if (typeof settings.preset !== 'string' || !settings.preset) settings.preset = 'default';
  const { filters, infiniteScroll, media, navigation, pageEnhancements, seen, softBlock, ui } =
    settings;
  const ageValid = [filters.age.minimum, filters.age.maximum].every(
    (age) => age === null || (Number.isInteger(age) && age >= 18 && age <= 120),
  );
  if (
    !ageValid ||
    (filters.age.minimum !== null &&
      filters.age.maximum !== null &&
      filters.age.minimum > filters.age.maximum) ||
    !['and', 'or'].includes(filters.combine) ||
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
    !object(settings.presets) ||
    !object(settings.presets.custom)
  ) {
    throw new TypeError('Basic Browse settings are invalid');
  }
  for (const list of [filters.genders, filters.relationships, filters.roles, filters.scopes]) {
    if (!Array.isArray(list) || list.some((item) => typeof item !== 'string')) {
      throw new TypeError('Basic filter selections must be string arrays');
    }
  }
  for (const list of [
    filters.terms.exclude,
    filters.terms.include,
    filters.terms.limit,
    filters.terms.saved,
  ]) {
    if (!Array.isArray(list) || list.some((item) => typeof item !== 'string' || !item.trim())) {
      throw new TypeError('Basic terms must be non-empty strings');
    }
  }
  if (!object(navigation.shortcuts) || !object(pageEnhancements)) {
    throw new TypeError('Basic navigation and enhancements are invalid');
  }
  return settings;
}

export function applyPreset(current, presetName, custom = {}) {
  const source = BUILT_IN_PRESETS[presetName] ?? custom[presetName];
  if (!source || !object(source)) throw new TypeError('Unknown Basic preset');
  const next = merge(normalizeBasicSettings(current), source);
  next.preset = presetName;
  return normalizeBasicSettings(next);
}

export function saveCustomPreset(settings, name) {
  const cleanName = String(name ?? '').trim();
  if (!/^[\p{L}\p{N}][\p{L}\p{N} _-]{0,39}$/u.test(cleanName) || cleanName in BUILT_IN_PRESETS) {
    throw new TypeError('Custom preset name is invalid or reserved');
  }
  const normalized = normalizeBasicSettings(settings);
  const policy = clone(normalized);
  delete policy.presets;
  policy.preset = cleanName;
  normalized.presets.custom[cleanName] = policy;
  normalized.preset = cleanName;
  return normalized;
}
