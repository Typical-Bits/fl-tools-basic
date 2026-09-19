function values(value) {
  return Array.isArray(value) ? value.map((item) => String(item).toLocaleLowerCase()) : null;
}

function includesAny(haystack, needles) {
  return needles.some((needle) => haystack.some((value) => value.includes(needle)));
}

function criterion(active, known, matches, code) {
  if (!active) return null;
  if (!known) return { code, status: 'UNKNOWN' };
  return { code, status: matches ? 'MATCH' : 'NO_MATCH' };
}

export function evaluateCandidate(candidate, settings) {
  const filters = settings.filters;
  const results = [];
  const ageActive = filters.age.minimum !== null || filters.age.maximum !== null;
  const ageKnown = Number.isFinite(candidate.age);
  results.push(
    criterion(
      ageActive,
      ageKnown,
      ageKnown &&
        (filters.age.minimum === null || candidate.age >= filters.age.minimum) &&
        (filters.age.maximum === null || candidate.age <= filters.age.maximum),
      'FILTER_AGE',
    ),
  );
  results.push(
    criterion(
      filters.genders.length > 0,
      typeof candidate.gender === 'string',
      filters.genders.includes(candidate.gender),
      'FILTER_GENDER',
    ),
  );
  const candidateRoles = values(candidate.roles);
  if (filters.roles.length && filters.roleMode === 'required') {
    results.push(
      criterion(
        true,
        candidateRoles !== null,
        candidateRoles !== null && includesAny(candidateRoles, values(filters.roles)),
        'FILTER_ROLE_REQUIRED',
      ),
    );
  }
  const relationshipKnown = typeof candidate.relationship === 'string';
  results.push(
    criterion(
      filters.relationships.length > 0,
      relationshipKnown,
      relationshipKnown && filters.relationships.includes(candidate.relationship),
      'FILTER_RELATIONSHIP',
    ),
  );
  const scoped = filters.scopes.flatMap((scope) => values(candidate[scope]) ?? []);
  const sourceKnown = filters.scopes.some((scope) => values(candidate[scope]) !== null);
  const include = values(filters.terms.include);
  const exclude = values(filters.terms.exclude);
  const limit = values(filters.terms.limit);
  if (exclude.length && sourceKnown && includesAny(scoped, exclude)) {
    return Object.freeze({
      reasons: Object.freeze(['FILTER_EXCLUDED_TERM']),
      status: 'NO_MATCH',
    });
  }
  results.push(
    criterion(include.length > 0, sourceKnown, includesAny(scoped, include), 'FILTER_INCLUDE'),
  );
  const limitValues = values(candidate.limit);
  results.push(
    criterion(
      limit.length > 0,
      limitValues !== null,
      limitValues !== null && includesAny(limitValues, limit),
      'FILTER_LIMIT',
    ),
  );
  const active = results.filter(Boolean);
  const failed = active.filter(({ status }) => status === 'NO_MATCH');
  const unknown = active.filter(({ status }) => status === 'UNKNOWN');
  const matched = active.filter(({ status }) => status === 'MATCH');
  let status = 'MATCH';
  if (filters.combine === 'and') {
    if (failed.length) status = 'NO_MATCH';
    else if (unknown.length) status = 'UNKNOWN';
  } else if (active.length && matched.length === 0) {
    status = unknown.length ? 'UNKNOWN' : 'NO_MATCH';
  }
  return Object.freeze({
    preferredRoleMatch:
      filters.roleMode === 'preferred' &&
      filters.roles.length > 0 &&
      candidateRoles !== null &&
      includesAny(candidateRoles, values(filters.roles)),
    reasons: Object.freeze(
      active.filter((result) => result.status !== 'MATCH').map((result) => result.code),
    ),
    status,
  });
}

export function cardRequests({ filterResult, seen = false, softBlocked = false }, settings) {
  const requests = [];
  if (softBlocked) {
    requests.push({
      reason: 'softBlock',
      state: settings.softBlock.presentation === 'hide' ? 'HIDDEN' : 'DIMMED',
    });
  }
  if (filterResult.status === 'NO_MATCH') {
    requests.push({
      reason: 'filter',
      state: settings.filters.resultMode === 'hide' ? 'HIDDEN' : 'DIMMED',
    });
  }
  if (seen && settings.seen.presentation !== 'normal') {
    requests.push({
      reason: 'seen',
      state: settings.seen.presentation === 'hide' ? 'HIDDEN' : 'DIMMED',
    });
  }
  return requests;
}
