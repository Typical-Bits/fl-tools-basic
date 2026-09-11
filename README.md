# FL Tools Basic

The public FetLife userscript for everyday browsing. A compact dock on the right filters the feed, quiets people you don’t want to see, and keeps NSFW under your control.

<p align="center">
  <a href="https://github.com/Typical-Bits/fl-tools-basic/releases/latest"><img alt="Release" src="https://img.shields.io/github/v/release/Typical-Bits/fl-tools-basic?style=flat-square&label=release" /></a>
  <a href="https://github.com/Typical-Bits/fl-tools-basic/releases"><img alt="Downloads" src="https://img.shields.io/github/downloads/Typical-Bits/fl-tools-basic/total?style=flat-square" /></a>
  <a href="https://creativecommons.org/licenses/by-nc/4.0/"><img alt="License: CC BY-NC 4.0" src="https://img.shields.io/badge/license-CC%20BY--NC%204.0-lightgrey?style=flat-square" /></a>
</p>

<p align="center"><img src="https://raw.githubusercontent.com/Typical-Bits/fl-tools-basic/main/assets/fl-tools-basic-icon-64.png?asset=4217521d9bba" alt="FL Tools Basic icon" width="96" height="96"></p>

**Author:** [TypicalBits](https://github.com/Typical-Bits) · **Latest:** [v2.1.3](https://github.com/Typical-Bits/fl-tools-basic/releases/tag/v2.1.3)

## Features

- **Filters** — hide or keep cards by role, gender, age, and more
- **Presets** — Default, Minimal, and SFW, plus your own saved setups
- **Soft-Block | Block** — quiet people out of your feed, or follow through to FetLife’s block
- **NSFW / SFW** — blur, hide, or show media the way you want it, with SFW mimic when you need a safer screen
- **Seen** — mark profiles you’ve already looked at and reset when you want a fresh pass
- **Page helpers** — visited nicknames, clock times, shared kinks, and pagination helpers that avoid duplicating native navigation
- **Shortcuts** — F opens the dock; S, N, and T for next, previous, and jump to top
- **Infinite scroll** — keep the feed moving without hunting for the next page
- **Factory Reset** — wipe local FL Tools data from the Advanced panel if you want a clean start

Click the launcher, press **F**, or use × / Esc to close. Settings save on this device.

Highlighter, notes, watches, and profile tools live in [Pro](https://github.com/Typical-Bits/fl-tools-pro). Studio can sit beside Basic, but it does not unlock Pro.

## Install

1. Install [Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey](https://www.tampermonkey.net/).
2. Download [`FL_Tools_Basic.user.js`](https://github.com/Typical-Bits/fl-tools-basic/releases/latest/download/FL_Tools_Basic.user.js) from the [latest release](https://github.com/Typical-Bits/fl-tools-basic/releases/latest).
3. Confirm the install prompt, then visit [fetlife.com](https://fetlife.com).

The launcher appears on the right. If Pro is also installed, Pro takes over this dock. Studio’s button sits 8px to the left. Drag either launcher vertically to move the pair; the position is saved.

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — TypicalBits. See [`LICENSE`](LICENSE).

## Latest changes

See [2.1.3 release notes](RELEASE_NOTES.md).

## New in 2.1.3

- Adapt desktop menus to available space and reposition expanded sections into view.
- Scroll active sections while keeping menu navigation accessible.
- Use mobile bottom sheets; hide launchers while a sheet is open to keep its close button accessible.
- Remove the scanning status strip from the settings header.

Update all installed editions and reload FetLife tabs.
