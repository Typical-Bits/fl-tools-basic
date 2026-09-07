# FL_Tools Basic

<p align="center">
  Standalone FetLife userscript dock — filters, soft-block, NSFW/SFW, Seen chip, shortcuts, org cards, infinite scroll, and toasts.
</p>

<p align="center">
  <a href="https://github.com/Typical-Bits/fl-tools-basic/releases/latest"><img alt="Release" src="https://img.shields.io/github/v/release/Typical-Bits/fl-tools-basic?style=flat-square&label=release" /></a>
  <a href="https://github.com/Typical-Bits/fl-tools-basic/releases"><img alt="Downloads" src="https://img.shields.io/github/downloads/Typical-Bits/fl-tools-basic/total?style=flat-square" /></a>
  <a href="https://github.com/Typical-Bits/fl-tools-basic/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/Typical-Bits/fl-tools-basic?style=flat-square" /></a>
  <a href="https://github.com/Typical-Bits/fl-tools-basic/network/members"><img alt="Forks" src="https://img.shields.io/github/forks/Typical-Bits/fl-tools-basic?style=flat-square" /></a>
  <a href="https://github.com/Typical-Bits/fl-tools-basic/issues"><img alt="Issues" src="https://img.shields.io/github/issues/Typical-Bits/fl-tools-basic?style=flat-square" /></a>
  <a href="https://creativecommons.org/licenses/by-nc/4.0/"><img alt="License: CC BY-NC 4.0" src="https://img.shields.io/badge/license-CC%20BY--NC%204.0-lightgrey?style=flat-square" /></a>
</p>

**Author:** [TypicalBits](https://github.com/Typical-Bits) · **Latest:** [v1.1.6](https://github.com/Typical-Bits/fl-tools-basic/releases/tag/v1.1.6)

<p align="center"><img src="assets/fl-tools-launcher-icon.svg" alt="FL Tools Basic icon" width="96" height="96"></p>

| Stat | Value |
|------|-------|
| Edition | **Basic** (lighter; Pro-only features not included) |
| Userscript | `FL_Tools_Basic.user.js` |
| Runs on | `https://fetlife.com/*` |
| Managers | Violentmonkey (preferred), Tampermonkey, others |
| Storage | `localStorage` only (`@grant none`) |
| Dual-install | Yields quietly if **FL_Tools Pro** is already claimed |

Download counts are **Release asset downloads** only (install from [Releases](https://github.com/Typical-Bits/fl-tools-basic/releases)). Hits on the raw `main` file are not counted by GitHub.

## Settings UI

The Basic settings panel stays visible on the right with grouped controls, descriptive switches, and search. Sections remain expanded and settings save automatically on this device.

## Install

1. Install [Violentmonkey](https://violentmonkey.github.io/) (preferred) or [Tampermonkey](https://www.tampermonkey.net/).
2. Download **`FL_Tools_Basic.user.js`** from the [latest release](https://github.com/Typical-Bits/fl-tools-basic/releases/latest).
3. Open / confirm the install prompt in your userscript manager.
4. Visit https://fetlife.com — the dock appears on the right.

Direct asset (counted downloads + manager updates):  
https://github.com/Typical-Bits/fl-tools-basic/releases/latest/download/FL_Tools_Basic.user.js

`@updateURL` / `@downloadURL` point at the Release asset so manager update checks increment the download counter.

## What’s included

- Filters + soft-block  
- NSFW / SFW display modes  
- Seen chip  
- Keyboard shortcuts  
- Org cards, infinite scroll, toasts  
- Dock-styled confirm modal (no `window.confirm`)  

**Not included (Pro):** highlighter, whitelist, feed mutes, snooze, notes, visit log, import/export, pride-flag colors, dock hide chip, limit-hit sound, full QA bar.

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — TypicalBits. Full text in [`LICENSE`](LICENSE). Header: `@license CC-BY-NC-4.0`.

## Changelog

See [GitHub Releases](https://github.com/Typical-Bits/fl-tools-basic/releases) for downloadable versions and notes.

## Release and performance controls

The settings panel includes theme-aware icon treatment, a compact panel option, lightweight scanning, a configurable scan delay, and a pause switch with a visible status indicator. Preferences save locally.

Maintainers can run **Actions → Bump release version** with a semantic version. The workflow updates the userscript header and README release link; publishing a GitHub Release validates both before uploading the matching asset.


The dock now chooses a less crowded side of the viewport, supports double-clicking the panel to remember that side, and keeps labels within the viewport. Identity labels can be clicked to copy their name. Accessibility settings respect reduced-motion preferences and include a high-contrast switch.
