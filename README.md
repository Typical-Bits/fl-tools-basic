# FL_Tools Basic

<p align="center">
  FetLife userscript dock — filters, soft-block, NSFW/SFW, Seen chip, shortcuts, org cards, infinite scroll, and toasts.
</p>

<p align="center">
  <a href="https://github.com/Typical-Bits/fl-tools-basic/releases/latest"><img alt="Release" src="https://img.shields.io/github/v/release/Typical-Bits/fl-tools-basic?style=flat-square&label=release" /></a>
  <a href="https://github.com/Typical-Bits/fl-tools-basic/releases"><img alt="Downloads" src="https://img.shields.io/github/downloads/Typical-Bits/fl-tools-basic/total?style=flat-square" /></a>
  <a href="https://github.com/Typical-Bits/fl-tools-basic/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/Typical-Bits/fl-tools-basic?style=flat-square" /></a>
  <a href="https://github.com/Typical-Bits/fl-tools-basic/network/members"><img alt="Forks" src="https://img.shields.io/github/forks/Typical-Bits/fl-tools-basic?style=flat-square" /></a>
  <a href="https://github.com/Typical-Bits/fl-tools-basic/issues"><img alt="Issues" src="https://img.shields.io/github/issues/Typical-Bits/fl-tools-basic?style=flat-square" /></a>
  <a href="https://creativecommons.org/licenses/by-nc/4.0/"><img alt="License: CC BY-NC 4.0" src="https://img.shields.io/badge/license-CC%20BY--NC%204.0-lightgrey?style=flat-square" /></a>
</p>

**Author:** [TypicalBits](https://github.com/Typical-Bits) · **Latest:** [v1.2.1](https://github.com/Typical-Bits/fl-tools-basic/releases/tag/v1.2.1)

<p align="center"><img src="assets/fl-tools-launcher-icon.svg" alt="FL Tools Basic icon" width="96" height="96"></p>

| Stat | Value |
|------|-------|
| Userscript | `FL_Tools_Basic.user.js` |
| Runs on | `https://fetlife.com/*` |
| Managers | Violentmonkey (preferred), Tampermonkey, others |
| Storage | `localStorage` only (`@grant none`) |

Download counts are **Release asset downloads** only (install from [Releases](https://github.com/Typical-Bits/fl-tools-basic/releases)). Hits on the raw `main` file are not counted by GitHub.

## Settings UI

A compact red launcher button on the right opens the settings rail. Sections use an accordion layout, and every on/off setting is a keyboard-accessible toggle. Click the launcher, press `F`, or use × / Esc / click-outside to close. Settings save automatically on this device.

## Install

1. Install [Violentmonkey](https://violentmonkey.github.io/) (preferred) or [Tampermonkey](https://www.tampermonkey.net/).
2. Download **`FL_Tools_Basic.user.js`** from the [latest release](https://github.com/Typical-Bits/fl-tools-basic/releases/latest).
3. Open / confirm the install prompt in your userscript manager.
4. Visit https://fetlife.com — the launcher appears on the right.

Direct asset (counted downloads + manager updates):
https://github.com/Typical-Bits/fl-tools-basic/releases/latest/download/FL_Tools_Basic.user.js

`@updateURL` / `@downloadURL` point at the Release asset so manager update checks increment the download counter.

## What’s included

- Filters and soft-block
- NSFW / SFW display modes
- Seen chip
- Keyboard shortcuts
- Org cards, infinite scroll, toasts
- Dock-styled confirm modal (no `window.confirm`)
- Collapsible settings rail and launcher button

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — TypicalBits. Full text in [`LICENSE`](LICENSE). Header: `@license CC-BY-NC-4.0`.

## Changelog

See [GitHub Releases](https://github.com/Typical-Bits/fl-tools-basic/releases) for downloadable versions and notes.

## Performance and accessibility

The settings panel includes theme-aware icon treatment, compact launcher mode, lightweight scanning, configurable scan delay, and a pause toggle with a visible status indicator. It respects reduced-motion preferences and includes a high-contrast mode. The status line can show local scan telemetry (scans / skipped).

The dock stays on one side of the viewport, can remember a preferred side, keeps labels on-screen, and lets you click an identity label to copy its name.
