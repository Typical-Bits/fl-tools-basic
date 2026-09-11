# FL Tools Basic 2.2.6

- Persist ignored hard-limit terms per profile. Previously acknowledged terms no longer trigger reminders; only new matches prompt again.
- Normalize nickname and term casing and whitespace, and preserve cumulative acknowledgments.
- Suppress Pro’s repeated hard-limit sound for acknowledged matches.
- Migrate older boolean ignore flags using the first observed term set as a baseline.

Validated reload persistence, separate profiles, added/removed terms, cumulative ignores, legacy migration, and prompt suppression.
