# Contributing

FL Tools Basic is a standalone FetLife userscript (CC BY-NC 4.0). Keep changes small and public-safe: do not copy or assume source from the private Pro repo. The public contracts are heartbeat/yield (`window.__FL_TOOLS_HEARTBEAT__`, `data-fl-tools-live=pro`, `FLToolsCore` in `core/handoff.js`) and `fl_` settings keys.

## Setup

No build toolchain beyond Node. The shipped file is `FL_Tools_Basic.user.js` so Tampermonkey/Violentmonkey can install it without `@require`.

## Single source of truth

Edit these, not the generated copies:

- `assets/fl-tools-core.css` — tokens + dock/launcher chrome + Basic surface CSS
- `assets/fl-tools-pro.css` — Pro-only chrome hosted here for Pro to vendor
- `core/handoff.js` — live-yield API

Then sync generated injectors and the inlined regions inside the userscript:

```bash
node scripts/sync-core.mjs          # write
node scripts/sync-core.mjs --check  # CI
```

Do not `@require` `/releases/latest/` from Basic itself. Pro may `@require` a **tagged** Basic release asset after the next version bump, or vendor the same files. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

Do not bump `// @version` unless the change must ship as a new installable release.

## Tests

```bash
node tests/ui-contract.test.js
node --check FL_Tools_Basic.user.js
# Playwright (Chromium), same as CI upgrade-matrix:
npm install --no-save playwright@1.55.0
npx playwright install --with-deps chromium
node tests/settings-migration.test.cjs
node tests/upgrade-matrix.cjs
node tests/handoff.test.cjs
node tests/dom-scan.test.cjs
```

## Pull requests

Use conventional commits (`feat`, `fix`, `chore`, `docs`, `refactor`, `test`). Describe behavior changes and the test plan. License stays CC BY-NC 4.0.
