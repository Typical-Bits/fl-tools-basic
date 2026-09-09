const { chromium } = require("playwright");
const fs = require("node:fs");
const assert = require("node:assert/strict");

const handoff = fs.readFileSync("core/handoff.js", "utf8");

async function withPage(run) {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext();
    await context.route("https://fetlife.com/**", (route) =>
      route.fulfill({ contentType: "text/html", body: "<main></main>" })
    );
    const page = await context.newPage();
    await page.goto("https://fetlife.com/");
    await page.addScriptTag({ content: handoff });
    await run(page);
    await context.close();
  } finally {
    await browser.close();
  }
}

function stampPro(page, { beatAgeMs, ui }) {
  return page.evaluate(({ beatAgeMs, ui }) => {
    const beat = Date.now() - beatAgeMs;
    window.__FL_TOOLS_HEARTBEAT__ = beat;
    window.__FL_TOOLS_BOOTED__ = "pro";
    window.__FL_TOOLS_CLAIM__ = "pro";
    document.documentElement.setAttribute("data-fl-tools-live", "pro");
    document.documentElement.setAttribute("data-fl-tools-claim", "pro");
    document.documentElement.setAttribute("data-fl-tools-edition", "pro");
    document.documentElement.setAttribute("data-fl-tools-beat", String(beat));
    if (ui) {
      if (!document.getElementById("fl-tools-dock")) {
        const dock = document.createElement("div");
        dock.id = "fl-tools-dock";
        document.body.appendChild(dock);
      }
      if (!document.getElementById("fl-settings-launcher")) {
        const launch = document.createElement("button");
        launch.id = "fl-settings-launcher";
        document.body.appendChild(launch);
      }
    }
  }, { beatAgeMs, ui });
}

(async () => {
  await withPage(async (page) => {
    assert.equal(await page.evaluate(() => !!window.FLToolsCore), true, "handoff publishes FLToolsCore");
    assert.equal(await page.evaluate(() => window.FLToolsCore.liveProActive()), false, "missing heartbeat is not live Pro");
  });

  await withPage(async (page) => {
    await stampPro(page, { beatAgeMs: 0, ui: true });
    assert.equal(await page.evaluate(() => window.FLToolsCore.liveProActive()), true, "fresh heartbeat + Pro UI is live");
  });

  await withPage(async (page) => {
    await stampPro(page, { beatAgeMs: 5000, ui: true });
    assert.equal(await page.evaluate(() => window.FLToolsCore.liveProActive()), false, "stale heartbeat is not live Pro");
  });

  await withPage(async (page) => {
    await stampPro(page, { beatAgeMs: 0, ui: false });
    assert.equal(await page.evaluate(() => window.FLToolsCore.liveProActive()), false, "fresh heartbeat without Pro UI is not live");
  });

  await withPage(async (page) => {
    await stampPro(page, { beatAgeMs: 5000, ui: true });
    const claimed = await page.evaluate(() => window.FLToolsCore.boot("basic"));
    assert.equal(claimed, true, "Basic boot succeeds when Pro heartbeat is stale");
    assert.equal(
      await page.evaluate(() => document.documentElement.getAttribute("data-fl-tools-edition")),
      "basic"
    );
  });

  await withPage(async (page) => {
    await stampPro(page, { beatAgeMs: 0, ui: true });
    const claimed = await page.evaluate(() => window.FLToolsCore.boot("basic"));
    assert.equal(claimed, false, "Basic boot yields while Pro heartbeat is fresh");
    assert.equal(
      await page.evaluate(() => document.documentElement.getAttribute("data-fl-tools-live")),
      "pro"
    );
  });

  console.log("Handoff heartbeat contract OK");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
