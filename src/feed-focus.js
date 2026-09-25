const FOCUSED_CATEGORIES = new Set(['reaction', 'social']);

function modeLabel(settings) {
  if (settings?.preset === 'sfw') return 'SFW';
  if (settings?.preset === 'minimal') return 'Clean';
  return 'Focused';
}

export function feedFocusRequest(candidate, settings) {
  if (
    candidate?.kind !== 'content' ||
    candidate.context?.route?.kind !== 'feed' ||
    settings?.feed?.focus !== 'focused'
  ) {
    return null;
  }
  const category = candidate.parsed?.metadata?.feedActivityCategory;
  if (!FOCUSED_CATEGORIES.has(category)) return null;
  return Object.freeze({
    detail: `Hidden by ${modeLabel(settings)} feed focus because this is ${category} activity.`,
    reason: 'quiet',
    state: 'HIDDEN',
    treatment: `feed-${category}`,
  });
}
