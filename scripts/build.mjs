import { build } from 'esbuild';

await build({
  bundle: true,
  entryPoints: ['src/index.js'],
  format: 'iife',
  globalName: 'FLToolsBasic',
  outfile: 'dist/fl-tools-basic.js',
  platform: 'browser',
  sourcemap: false,
  target: ['chrome120'],
});
