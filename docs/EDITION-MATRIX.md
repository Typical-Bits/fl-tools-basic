# FL Tools editions

**Basic** is the public edition. **Pro** is a private distribution containing the Basic feature set plus additional tools. **Studio** is a separate private workspace and coordination layer.

Any combination may be installed. Studio takes the launcher when present; otherwise Pro remains primary over Basic. Capabilities remain owned by their installed edition—Studio does not unlock Pro.

| Capability | Basic | Pro | Studio |
|------------|:-----:|:---:|:------:|
| Filters, soft-block, SFW/NSFW, Seen, infinite scroll | yes | yes | with Basic or Pro |
| Filter presets (Default, Minimal, SFW) and Reset Seen | yes | yes | with Basic or Pro |
| Basic navigation (F / S / N / T) | yes | yes | with Basic or Pro |
| Org cards, shortcut rebinding | — | yes | with Pro only |
| Highlighter, whitelist, mutes, snooze | — | yes | with Pro only |
| Notes, visit history, import/export | — | yes | with Pro only |
| Profile pins, compare, mentions, private session | — | yes | with Pro only |
| Profile watches | — | owns | manages via Pro |
| Unified launcher, command palette, workspaces | — | — | yes |
| Profile change timeline, encrypted vault, rules, audit, undo, analytics | — | — | yes |

Scan delay / pause / telemetry stay diagnostics-only. Reduced motion follows the OS preference.

Settings remain local. Disabling Studio restores Pro or Basic after its short liveness timeout.

Storage is namespaced (`fl.basic.seen`, `fl.pro.notes`, `fl.studio.vault`) so migrations run per module. Catalog source of truth: [`fl-core/src/catalog.js`](../../fl-core/src/catalog.js). Target architecture: [`ARCHITECTURE.md`](../../ARCHITECTURE.md).
