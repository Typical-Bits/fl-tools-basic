# Basic vs Pro

Public FetLife userscript dock. **Basic** is this public repo. **Pro** is a separate private distribution (`Typical-Bits/fl-tools-pro-dist`) that includes the Basic surface plus extra tools. Pricing and purchase flow are not documented here.

Both editions may be installed at once. Pro is primary while it is *live* (fresh heartbeat). See [architecture](ARCHITECTURE.md) for the handoff contract.

| Capability | Basic | Pro |
|------------|:-----:|:---:|
| Filters (age, gender, role, limits, city, relationship) | yes | yes |
| Soft-block | yes | yes |
| NSFW / SFW display modes | yes | yes |
| Seen chip | yes | yes |
| Keyboard shortcuts (rebind / off) | yes | yes |
| Org cards, infinite scroll, toasts | yes | yes |
| Dock-styled confirm modal | yes | yes |
| Settings migration + diagnostics | yes | yes |
| Dual-install yield to the other edition | yields to live Pro | primary while live |
| Highlighter | — | yes |
| Whitelist | — | yes |
| Feed mutes | — | yes |
| Snooze | — | yes |
| Notes | — | yes |
| Visit log | — | yes |
| Import / export | — | yes |
| Pride-flag colors | — | yes |
| Dock hide chip | — | yes |
| Limit-hit sound | — | yes |
| QA bar | — | yes |

Shared storage uses `localStorage` keys prefixed `fl_`. Shared CSS/handoff files live on Basic (`assets/`, `core/`) so Pro can vendor them or `@require` a **tagged** Basic release asset — never `latest`.
