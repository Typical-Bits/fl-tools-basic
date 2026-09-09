const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext();
    await context.route('https://fetlife.com/**', route => route.fulfill({ contentType: 'text/html', body: '<main></main>' }));
    const page = await context.newPage();
    await page.goto('https://fetlife.com/');
    await page.evaluate(() => {
      localStorage.setItem('fl_profile_filter_settings_v2', JSON.stringify({ minAge: '30', showToasts: false, unknown: 'drop-me' }));
      localStorage.setItem('fl_perf_settings', JSON.stringify({ lightweight: true, scanDelay: 'invalid' }));
    });
    await page.addScriptTag({ content: fs.readFileSync('FL_Tools_Basic.user.js', 'utf8') });
    const stored = await page.evaluate(() => ({
      schema: localStorage.getItem('fl_settings_schema_version'),
      filter: JSON.parse(localStorage.getItem('fl_profile_filter_settings')),
      perf: JSON.parse(localStorage.getItem('fl_perf_settings'))
    }));
    assert.equal(stored.schema, '1');
    assert.equal(stored.filter.minAge, '30');
    assert.equal(stored.filter.showToasts, false);
    assert.equal(Object.hasOwn(stored.filter, 'unknown'), false);
    assert.equal(stored.perf.lightweight, true);
    assert.equal(stored.perf.scanDelay, 120);
    await page.locator('#fl-diagnostics-panel').waitFor({ state:'attached' });
    await page.locator('#fl-diagnostics-header').evaluate((element) => element.click());
    assert.match(await page.locator('#fl-diagnostics-output').textContent(), /FL Tools Basic 1\.2\.13[\s\S]*Scans:/);
    const shortcut = page.locator('[data-fl-shortcut="filters"]');
    await shortcut.evaluate((input) => { input.value='Alt+X'; input.dispatchEvent(new Event('change', { bubbles:true })); });
    await page.keyboard.press('f'); assert.equal(await page.locator('#fl-tools-dock').evaluate((el) => el.classList.contains('fl-rail-open')), false);
    await page.keyboard.press('Alt+x'); assert.equal(await page.locator('#fl-tools-dock').evaluate((el) => el.classList.contains('fl-rail-open')), true);
    await context.close();
    console.log('Basic settings migration OK');
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
