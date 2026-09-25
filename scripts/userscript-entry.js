import { installBasic } from '../src/index.js';
import { installCore } from '@typicalbits/fl-tools-core';

const pageWindow = globalThis.unsafeWindow ?? globalThis.window ?? globalThis;
const productId = 'basic';
const report = (error) => {
  pageWindow.dispatchEvent(
    new pageWindow.CustomEvent('fltools:install-error', {
      detail: Object.freeze({
        message: error instanceof Error ? error.message : String(error),
        productId,
      }),
    }),
  );
};

try {
  installCore(pageWindow, {
    document: pageWindow.document,
    version: '0.0.8',
    window: pageWindow,
  });
  void installBasic(pageWindow.FLTools, {
    changelog: {
      summary: [
        'Keeps every menu fully inside the window after launcher dragging or resizing.',
        'Preserves the launcher position when the menu closes.',
      ],
      version: '0.0.8',
    },
    document: pageWindow.document,
    iconUrl:
      'https://raw.githubusercontent.com/Typical-Bits/fl-tools-basic/main/assets/badges/basic-128.png',
    installUrl:
      'https://github.com/Typical-Bits/fl-tools-basic/raw/refs/heads/main/FL-Tools-Basic.user.js',
    releaseUrl: 'https://github.com/Typical-Bits/fl-tools-basic/releases',
    updateUrl:
      'https://github.com/Typical-Bits/fl-tools-basic/raw/refs/heads/main/FL-Tools-Basic.user.js',
    version: '0.0.8',
    window: pageWindow,
  }).catch(report);
} catch (error) {
  report(error);
}
