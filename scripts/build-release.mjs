import { mkdir, readFile } from 'node:fs/promises';
import { build } from 'esbuild';

const installUrl =
  'https://github.com/Typical-Bits/fl-tools-basic/releases/download/v0.0.8/FL-Tools-Basic.user.js';
const icon = (await readFile('assets/badges/basic-64.png')).toString('base64');
const icon64 = (await readFile('assets/badges/basic-128.png')).toString('base64');
const metadata = `// ==UserScript==
// @name         FL Tools Basic
// @namespace    https://github.com/Typical-Bits
// @version      0.0.8
// @description  Simple everyday browsing tools for FetLife.
// @author       TypicalBits
// @icon         data:image/png;base64,${icon}
// @icon64       data:image/png;base64,${icon64}
// @match        *://fetlife.com/*
// @match        *://*.fetlife.com/*
// @run-at       document-idle
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @connect      github.com
// @updateURL    ${installUrl}
// @downloadURL  ${installUrl}
// ==/UserScript==`;

const entry = (await readFile('scripts/userscript-entry.js', 'utf8'))
  .replaceAll('fltools:install-error', 'fltools:release-error')
  .replaceAll(
    'https://github.com/Typical-Bits/fl-tools-basic/raw/refs/heads/main/FL-Tools-Basic.user.js',
    installUrl,
  );

await mkdir('dist', { recursive: true });
await build({
  banner: { js: metadata },
  bundle: true,
  entryPoints: ['scripts/userscript-entry.js'],
  format: 'iife',
  legalComments: 'none',
  minify: false,
  outfile: 'dist/FL-Tools-Basic.user.js',
  platform: 'browser',
  plugins: [
    {
      name: 'release-entry',
      setup(buildOptions) {
        buildOptions.onLoad({ filter: /userscript-entry\.js$/ }, () => ({
          contents: entry,
          loader: 'js',
        }));
      },
    },
  ],
  target: ['chrome120', 'edge120'],
});
