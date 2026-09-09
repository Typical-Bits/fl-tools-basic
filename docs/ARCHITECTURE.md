# FL Tools architecture

Typical-Bits only. Keep these files within this organization.

## Editions

See [`docs/EDITION-MATRIX.md`](EDITION-MATRIX.md) for the public Basic vs Pro surface.

- **Basic** (`Typical-Bits/fl-tools-basic`, public): filters, soft-block, NSFW/SFW, Seen, shortcuts, org cards, infinite scroll, toasts.
- **Pro** (`Typical-Bits/fl-tools-pro-dist`, private): Basic surface plus highlighter, whitelist, feed mutes, snooze, notes, visit log, import/export, pride colors, dock hide, limit-hit sound, QA bar.

Both may be installed at once. Pro is primary while it is *live*.

## Live yield (v1.2.0)

Source of truth: [`core/handoff.js`](../core/handoff.js). `scripts/sync-core.mjs` inlines it into `FL_Tools_Basic.user.js` so Basic stays a standalone install.

Pro stamps `data-fl-tools-live=pro` and `window.__FL_TOOLS_HEARTBEAT__` every 1.5s.

Basic treats Pro as active only if that heartbeat is younger than 4 seconds **and** Pro UI exists (`#fl-tools-dock` or `#fl-settings-launcher`) plus a Pro edition marker (`__FL_TOOLS_BOOTED__` / `__FL_TOOLS_CLAIM__` / `FLTools.edition` / `data-fl-tools-live|claim|edition`). Disable Pro (or hide the tab) and the beat dies; Basic takes the dock without a stale claim.

Events:

- `fltools:ready` — edition API published
- `fltools:edition-changed` — Pro live/off

Shared settings stay in `localStorage` keys prefixed `fl_`.

## Shared assets (single source of truth)

Host common files on public Basic. **Edit the sources, then run `node scripts/sync-core.mjs`.** `--check` fails CI if generated output drifted.

| Source | Role | Generated |
|--------|------|-----------|
| `assets/fl-tools-core.css` | Tokens + dock/launcher chrome + Basic surface CSS | `core/css-core.js` (injector, style id `fl-tools-core-style`) and the `BEGIN generated:css-core` region in `FL_Tools_Basic.user.js` |
| `assets/fl-tools-pro.css` | Pro-only chrome (highlighter, dock hide, snooze, notes, mutes, QA extras) | `core/css-pro.js` (injector, style id `fl-tools-pro-style`). Basic does **not** load this. |
| `core/handoff.js` | Live-yield / heartbeat API (`FLToolsCore`) | `BEGIN generated:handoff` region in `FL_Tools_Basic.user.js` |
| `assets/fl-tools-launcher-icon.svg` | `@icon` for both editions | — |

Basic is **inlined**, not `@require`: Tampermonkey/Violentmonkey can install `FL_Tools_Basic.user.js` alone from a Release asset or from the repo. Do not `@require` `/releases/latest/` — `latest` moves and is a supply-chain footgun.

Pro remains standalone so a private install still works offline. After a version bump, Release assets also include the shared files (see publish workflow). Pro may:

1. **Vendor** — copy `core/handoff.js`, `core/css-core.js` (and optionally `core/css-pro.js`) into the private repo, or run the same wrap from `assets/*.css`, or
2. **`@require` a tagged Basic asset** (never `latest`), e.g.  
   `https://github.com/Typical-Bits/fl-tools-basic/releases/download/v1.5.0/handoff.js`
   Pin the tag that matches the shipped Basic CSS/handoff contract. Tagged releases attach `handoff.js`, `css-core.js`, `css-pro.js`, `fl-tools-core.css`, and `fl-tools-pro.css` alongside the userscript.

## Releases

Install from GitHub Release assets (what Tampermonkey polls):

- Basic: `https://github.com/Typical-Bits/fl-tools-basic/releases/latest/download/FL_Tools_Basic.user.js`
- Pro: `https://github.com/Typical-Bits/fl-tools-pro-dist/releases/latest/download/FL_Tools_Pro.user.js`

Bump via **Actions → Bump release version**. No preview app. A `@version` bump is required when userscript managers should pick up the change (they key off `@version`, not file contents).
