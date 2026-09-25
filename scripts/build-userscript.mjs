import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { build } from 'esbuild';

const installUrl =
  'https://github.com/Typical-Bits/fl-tools-basic/raw/refs/heads/main/FL-Tools-Basic.user.js';
const icon = (await readFile('assets/badges/basic-64.png')).toString('base64');
const icon64 = (await readFile('assets/badges/basic-128.png')).toString('base64');
const metadata = `// ==UserScript==
// @name         FL Tools Basic
// @namespace    https://github.com/Typical-Bits
// @version      0.0.9
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

await mkdir('live-test', { recursive: true });
await build({
  banner: { js: metadata },
  bundle: true,
  entryPoints: ['scripts/userscript-entry.js'],
  format: 'iife',
  legalComments: 'none',
  minify: false,
  outfile: 'FL-Tools-Basic.user.js',
  platform: 'browser',
  target: ['chrome120', 'edge120'],
});
await copyFile('FL-Tools-Basic.user.js', 'live-test/fl-tools-basic-live.user.js');
