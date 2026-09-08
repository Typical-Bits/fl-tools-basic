# FL Tools architecture

Typical-Bits only. Do not publish these files to ExtraPotions.

## Editions

- **Basic** (`Typical-Bits/fl-tools-basic`, public): filters, soft-block, NSFW/SFW, Seen, shortcuts, org cards, infinite scroll, toasts.
- **Pro** (`Typical-Bits/fl-tools-pro-dist`, private): Basic surface plus highlighter, whitelist, feed mutes, snooze, notes, visit log, import/export, pride colors, dock hide, limit-hit sound, QA bar.

Both may be installed at once. Pro is primary while it is *live*.

## Live yield (v1.2.0)

Pro stamps `data-fl-tools-live=pro` and `window.__FL_TOOLS_HEARTBEAT__` every 1.5s.

Basic treats Pro as active only if that heartbeat is younger than 4 seconds. Disable Pro (or hide the tab) and the beat dies; Basic takes the dock without a stale claim.

Events:

- `fltools:ready` — edition API published
- `fltools:edition-changed` — Pro live/off

Shared settings stay in `localStorage` keys prefixed `fl_`.

## Shared assets

Host common files on public Basic:

- `assets/fl-tools-launcher-icon.svg` — `@icon` for both editions
- CSS tokens live in each userscript today; next split should move tokens + dock chrome into `assets/fl-tools-core.css` and `@require` a **tagged** Basic release, never `latest`.

Pro remains standalone so a private install still works offline.

## Releases

Install from GitHub Release assets (what Tampermonkey polls):

- Basic: `https://github.com/Typical-Bits/fl-tools-basic/releases/latest/download/FL_Tools_Basic.user.js`
- Pro: `https://github.com/Typical-Bits/fl-tools-pro-dist/releases/latest/download/FL_Tools_Pro.user.js`

Bump via **Actions → Bump release version**. No preview app.
