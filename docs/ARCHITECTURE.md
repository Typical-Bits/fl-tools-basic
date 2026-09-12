# FL Tools architecture

Typical-Bits only. Shared services live in **fl-core**. Editions stay standalone userscripts, and Basic hosts the shared launcher grid.

```
FL Tools
├── fl-core
│   capabilities, actions, events, scanner, storage, settings,
│   migrations, taxonomy, matcher, profile-model, UI,
│   shortcuts, diagnostics, privacy, pins, compare, mentions,
│   watch, vault, rules, activity
├── Basic
│   filters, presets, soft-block, seen, sfw-nsfw, infinite-scroll, basic-navigation,
│   shared launcher grid host
├── Pro
│   highlighter, whitelist, mutes, snooze, notes, visit-history,
│   org-cards, profile-pins, profile-compare, mentions, watches,
│   private-session, advanced-shortcuts
└── Studio
    orchestration, command-palette, workspaces, watch-manager,
    profile-history, activity-timeline, encrypted vault, rules, audit,
    undo, analytics
```

See [`docs/EDITION-MATRIX.md`](EDITION-MATRIX.md) for the public Basic vs Pro surface.

- **Basic** (`Typical-Bits/fl-tools-basic`, public): filters, soft-block, NSFW/SFW, Seen, fixed navigation keys, infinite scroll.
- **Pro** (`Typical-Bits/fl-tools-pro`, private): Basic surface plus highlighter, whitelist, mutes, snooze, notes, visit history, org cards, shortcut rebinding, profile pins, compare, @mentions, watches, and private session.
- **Studio** (`Typical-Bits/fl-tools-studio`, private): primary launcher, workspaces, command palette, orchestration.

Both Basic and Pro may be installed at once. Pro is primary while it is *live*. Studio is primary while it is live, without unlocking Pro. Studio’s launcher stays to the left of the Basic/Pro button.

## Live yield (v1.2.0)

Source of truth: [`core/handoff.js`](../core/handoff.js). `scripts/sync-core.mjs` inlines it into `FL_Tools_Basic.user.js` so Basic stays a standalone install.

Pro stamps `data-fl-tools-live=pro` and `window.__FL_TOOLS_HEARTBEAT__` every 1.5s.

Basic treats Pro as active only if that heartbeat is younger than 4 seconds **and** Pro UI exists. Disable Pro (or hide the tab) and the beat dies; Basic takes the dock without a stale claim.

Capability announcements use `fl-tools-capabilities-v1`. The protocol implementation is generated from `fl-core/src/capabilities.js`.

Events:

- `fltools:ready` — edition API published
- `fltools:edition-changed` — Pro live/off
- `fltools:capabilities-changed` / `fltools:capabilities-requested` — edition inventory
- `fltools:action` — Studio command palette opens the owning edition's dock panel (`fl-tools-action-v1`)

Shared settings stay in `localStorage` keys prefixed `fl_`.

## Candidate scanner

DOM mutations go through a **candidate classifier** in `fl-core/src/scanner.js` (inlined as `BEGIN generated:scanner`). Added nodes are classified as `profile`, `feed`, or `text`, then only the modules registered for those kinds run.

| Kind | Typical nodes | Modules |
|------|---------------|---------|
| Profile | member cards, `/nickname` links | mentions, notes, pins, highlighter, profile model, watches |
| Feed | `[data-story-uid]` cards, list cards | filters, seen, mutes, snooze |
| Text | text nodes with `@name` | mentions |

Do not fan out from a mutation to every module. Full dock rebuilds stay on boot / `turbo:load`. Silent page helpers (`page-tweaks.js`) piggyback on the same observer: visited nicks, absolute times, shared kinks, fetish groups, and a list pager copy.

Storage is per module (`fl.basic.seen`, `fl.pro.notes`, `fl.studio.vault`), not one JSON blob. See [`ARCHITECTURE.md`](../../ARCHITECTURE.md).

## Shared assets

Host common CSS/handoff on public Basic. **Edit the sources, then run `node scripts/sync-core.mjs`.** `--check` fails CI if generated output drifted.

Capability catalog and coordination protocol: edit `fl-core`, then run `node fl-core/scripts/sync-editions.mjs`.

| Source | Role | Generated |
|--------|------|-----------|
| `assets/fl-tools-core.css` | Tokens + dock/launcher chrome + Basic surface CSS | `core/css-core.js` and `BEGIN generated:css-core` |
| `assets/fl-tools-pro.css` | Pro-only chrome | `core/css-pro.js`. Basic does **not** load this. |
| `core/handoff.js` | Live-yield / heartbeat API (`FLToolsCore`) | `BEGIN generated:handoff` |
| `core/launcher-grid.js` | Basic-owned 4×2 launcher coordinator and offline fallback source | `BEGIN generated:launcher-grid` |
| `fl-core/src/catalog.js` | Edition capability IDs | `BEGIN generated:catalog` in each userscript |
| `fl-core/src/capabilities.js` | Capability protocol | `fl-tools-studio/core/coordination.js` |

Basic is **inlined**, not `@require`. Basic claims the launcher grid when present; Pro, Studio, and Vault vendor the same coordinator as a standalone fallback and yield to Basic through the page owner marker. Core remains optional infrastructure and does not start the grid.

## Releases

Install from GitHub Release assets (what Tampermonkey polls):

- Basic: `https://github.com/Typical-Bits/fl-tools-basic/releases/latest/download/FL_Tools_Basic.user.js`
- Pro: `https://github.com/Typical-Bits/fl-tools-pro/releases/latest/download/FL_Tools_Pro.user.js`

Bump via **Actions → Bump release version**. No preview app. A `@version` bump is required when userscript managers should pick up the change.
