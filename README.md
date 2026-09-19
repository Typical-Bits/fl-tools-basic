# FL Tools Basic V3

Everyday browsing edition for FL Tools V3. Basic is a clean V3 implementation that registers with
FL Tools Core; it does not contain Core, a V2 compatibility layer, or Pro-only People tools.

## Implemented scope

- One account-scoped Browse configuration shared through Core storage
- Immutable Default, Minimal, and SFW presets plus named custom Browse presets
- Age, gender, role, relationship, include, exclude, and limit filters
- AND/OR matching, card/tag/nickname scopes, and required/preferred roles
- Deterministic unknown-value handling and Core Presentation Policy integration
- Independent normal, dim, and hidden outcomes for filtering, Seen, and Soft Block
- SFW/NSFW selection with show, blur, and hide modes; 1–10 blur strength; avatar and video
  exceptions
- Actual profile-visit Seen recording, optional Seen chips, Reset Seen confirmation, and unrelated
  person-state preservation
- Local Soft Block reasons, dates, list management, revisit state, restoration, and separate
  confirmed native Block access when the host supplies an adapter
- Reversible visited-link, exact-time, shared-interest, banner, and picture-navigation enhancements
- Fixed F/S/N/T navigation with editable-control protection
- Optional bounded Infinite Scroll with one active and one queued request, deduplication, retry,
  cancellation, and native pagination preservation
- Compact layout, left/right launcher docking, high contrast, notification preference, and scoped
  Browse reset
- Dynamic approved Basic badge launcher and exactly two primary destinations: Browse and Settings
- Core-coordinated edition ownership: Basic runs alone, yields completely to Pro, and resumes after
  Pro releases ownership without resetting shared Browse state

All binary choices use semantic toggle switches. Basic creates no checkbox controls.

## Development

Use Node 24 with the sibling `fl-tools-core` V3 workspace present.

```text
npm ci
npm run verify
```

`npm run verify` checks formatting, lint, all fixture/integration tests, and the browser bundle. The
generated `dist/` directory is local build output and is not authoritative source.

## Installation contract

Call `installBasic(window.FLTools, options)` only after Core is available. The required options are
the page `document`, page `window`, and the approved Basic badge URL. Optional adapters may provide
native Block and native picture navigation. Basic requests only its declared, product-scoped Core
capabilities.

## Safety boundaries

- Low-confidence scanner candidates are preserved and receive no durable action.
- SFW is a presentation preference, not a content-safety guarantee.
- Soft Block is local presentation; native FetLife Block is a distinct confirmed action.
- Infinite Scroll accepts same-origin HTML only and removes executable/embedded content before
  appending deduplicated cards.
- Browse reset removes only Browse overrides; Reset Seen removes only Basic Seen timestamps.
- Pro-only fields in People records are neither interpreted nor deleted.
- No telemetry, V2 migration, old Studio/Vault service, redundant pager copy, or fixed product grid
  is included.

## Validation boundary

Sanitized source fixtures, unit tests, Core/Basic integration tests, formatting, lint, bundling, and
dependency audits pass. The user explicitly waived Tampermonkey validation. Live supported-browser
checks are therefore **NOT RUN**, not PASS, and this workspace is not release-authorized.

See `PHASE_6_REVIEW.md` for the acceptance mapping and exact verification record.
