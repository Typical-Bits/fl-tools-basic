import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const assets = Object.freeze({
  '../assets/badges/compass.svg':
    '77aaedab12f5958e352681e69803f0a0e032ef10bd5395bc9d03e96ae3d7ff50',
  '../assets/badges/compass-64.png':
    '6c37e9130a4739e8d42cbff2559df10afa06c29e0f7ac9e4ea49fc99fee5ae91',
  '../assets/badges/compass-128.png':
    'cd4ea00eaf7ca57243eebd15593ff993c785d9e2bc9e1893fbf31ddd8286e009',
  '../assets/badges/basic.svg': '7c56d826190b1ee56e86fce086dd27590be82e25d85cb369e985c11f31b84ab3',
  '../assets/badges/basic-64.png':
    '1e629f62553a4d877b9bda1fdf324c96a59c4f7aa528c8fc9f3de45bec183be5',
  '../assets/badges/basic-128.png':
    '28f099c8450dfc2eb2d838369d47a9aa3b12c48afbd67fc1c16daf973b3f767e',
  '../assets/badges/fetlife-favicon-48.png':
    'c46241bf85bc80686b00f3f14bda451797909019f806fedb85cbc4fd12845824',
  '../assets/badges/fetlife-favicon.ico':
    '37442b5a2fc5c4ffcfcb39c7bf1cd3b6e5bd2ba64896f0bdbd3e690dd6dc1e75',
  '../assets/badges/pro.svg': '1d83698a42b406b69e0cac2922332e9e03aa0c2d54920d2caea3f982a05b3489',
  '../assets/badges/pro-64.png': 'bb2debe578166ef77768aee0a5915d24d6251783a2c0a3a0917b5fa284cb92f7',
  '../assets/badges/pro-128.png':
    'd5e86cf8922bd9160649d41bf69638a944bd9127d699fa03667bfb427732a7a4',
});

test('Basic publicly hosts every approved exact product asset', async () => {
  for (const [path, expected] of Object.entries(assets)) {
    const bytes = await readFile(new globalThis.URL(path, import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected);
  }
  for (const name of ['basic', 'pro']) {
    const svg = await readFile(
      new globalThis.URL(`../assets/badges/${name}.svg`, import.meta.url),
      'utf8',
    );
    if (name === 'pro') assert.match(svg, /href="data:image\/x-icon;base64,/u);
    else assert.match(svg, /href="fetlife-favicon\.ico"/u);
    assert.doesNotMatch(svg, /stroke=/u);
  }
});
