# Launcher Grid Maintenance

Basic's core/launcher-grid.js is the canonical source. Pro, Studio and Vault
carry generated offline copies; do not edit those copies or their marked
userscript blocks directly. No runtime network dependency is required.

The controller preference is Basic, Pro, Vault, Studio. Visible anchor
preference is Pro, Basic, Vault, Studio. Basic's badge yields to Pro.
Launchers have 48px border boxes, a 12px gap, two columns and at most four
rows. Empty outer rows are not reserved. Studio prefers the anchor's left;
Vault prefers the adjacent vertical row. The group opens downward near the
top and upward near the bottom, flipping after drag release with hysteresis.
The prior saved vertical position is migrated to the anchor coordinate.

Use placeMenu for main menus and the command palette. This constrains size
and position to a badge-free region. Vault's secondary view either fits
beside its main menu without intersecting badges or replaces it with Back.
Menus announce fltools:menu-open using settings, studio, palette or vault;
other editions close without stealing focus.

From Basic, synchronize explicit sibling checkouts:

```powershell
node scripts/sync-launcher-grid.mjs ../fl-tools-pro ../fl-tools-studio ../fl-tools-vault
node scripts/sync-launcher-grid.mjs --check ../fl-tools-pro ../fl-tools-studio ../fl-tools-vault
node tests/launcher-grid-browser.cjs
```

The browser test requires Playwright (or FL_PLAYWRIGHT set to its package
path). The synchronization command parses every generated userscript before
writing and supports a read-only drift check. Existing edition build scripts
continue to inline their local generated copy.

Publish the updated editions together to avoid mixing old layout owners
with the new coordinator. Version numbers and release publication are
separate from this synchronization command.
