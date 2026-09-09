const { chromium } = require("playwright");
const fs = require("node:fs");
const assert = require("node:assert/strict");

const script = fs.readFileSync("FL_Tools_Basic.user.js", "utf8");

function memberCard({ nick, age, gender, role, extra }) {
  return (
    `<div data-member-card="${nick}">` +
    `<div class="w-full rounded-sm cursor-pointer">` +
    `<a href="/${nick}" title="${nick}">${nick}</a>` +
    `<div class="text-sm font-bold text-gray-300">${age} ${gender} ${role} • ${extra}</div>` +
    `</div></div>`
  );
}

const LIST_HTML =
  "<main>" +
  memberCard({ nick: "Alice", age: 25, gender: "F", role: "switch", extra: "Austin" }) +
  memberCard({ nick: "Bob", age: 45, gender: "M", role: "dom", extra: "Dallas" }) +
  memberCard({ nick: "Cara", age: 30, gender: "F", role: "sub", extra: "hard limit CNC" }) +
  "</main>";

async function openKinksters(browser, { html = LIST_HTML, beforeScript } = {}) {
  const context = await browser.newContext({ viewport: { width: 1000, height: 900 } });
  await context.route("https://fetlife.com/**", (route) =>
    route.fulfill({ contentType: "text/html", body: html })
  );
  await context.route("https://api.github.com/**", (route) =>
    route.fulfill({ status: 404, body: "" })
  );
  const page = await context.newPage();
  await page.goto("https://fetlife.com/kinksters");
  if (beforeScript) await beforeScript(page);
  await page.addScriptTag({ content: script });
  return { context, page };
}

function stampPro(page, { beatAgeMs, ui }) {
  return page.evaluate(({ beatAgeMs, ui }) => {
    const beat = Date.now() - beatAgeMs;
    window.__FL_TOOLS_HEARTBEAT__ = beat;
    window.__FL_TOOLS_BOOTED__ = "pro";
    window.__FL_TOOLS_CLAIM__ = "pro";
    if (!window.FLTools) window.FLTools = { edition: "pro" };
    else window.FLTools.edition = "pro";
    document.documentElement.setAttribute("data-fl-tools-live", "pro");
    document.documentElement.setAttribute("data-fl-tools-claim", "pro");
    document.documentElement.setAttribute("data-fl-tools-edition", "pro");
    document.documentElement.setAttribute("data-fl-tools-beat", String(beat));
    if (ui) {
      const dock = document.createElement("div");
      dock.id = "fl-tools-dock";
      dock.dataset.proStub = "1";
      document.body.appendChild(dock);
      const launch = document.createElement("button");
      launch.id = "fl-settings-launcher";
      launch.dataset.proStub = "1";
      document.body.appendChild(launch);
    }
  }, { beatAgeMs, ui });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    {
      const { context, page } = await openKinksters(browser, {
        beforeScript: async (p) => {
          await p.evaluate(() => {
            localStorage.setItem("fl_profile_filter_settings", JSON.stringify({
              minAge: "18",
              maxAge: "35",
              limits: "cnc",
              genders: "",
              roles: "",
              relFollow: true,
              relFollowing: true,
              relFollowsYou: true,
              relFriends: true,
              showToasts: false,
              autoScroll: false
            }));
          });
        }
      });
      await page.locator("#fl-tools-dock").waitFor({ state: "attached" });
      await page.locator("#fl-tools-core-style").waitFor({ state: "attached" });
      const scan = await page.evaluate(() => {
        const shell = (nick) => document.querySelector(`[data-member-card="${nick}"]`);
        const face = (nick) => shell(nick)?.querySelector(".w-full.rounded-sm.cursor-pointer");
        const info = (nick) => ({
          display: shell(nick)?.style.display || "",
          dimHard: face(nick)?.classList.contains("flhp-dim-hard") || false,
          why: shell(nick)?.getAttribute("data-lt-why") || face(nick)?.getAttribute("data-lt-why") || ""
        });
        return { alice: info("Alice"), bob: info("Bob"), cara: info("Cara") };
      });
      assert.equal(scan.alice.display, "", "Alice (in-range, no limits hit) stays visible");
      assert.equal(scan.alice.dimHard, false, "Alice is not hard-dimmed");
      assert.equal(scan.bob.dimHard, true, "Bob is hard-dimmed for age");
      assert.match(scan.bob.why, /age/i);
      assert.equal(scan.cara.dimHard, true, "Cara is hard-dimmed for limits");
      assert.match(scan.cara.why, /hard limits/i);
      await context.close();
    }

    {
      const { context, page } = await openKinksters(browser, {
        beforeScript: async (p) => {
          await p.evaluate(() => {
            localStorage.setItem("fl_block_reasons", JSON.stringify({
              Alice: { terms: [], at: Date.now(), type: "soft" }
            }));
          });
        }
      });
      await page.locator("#fl-tools-dock").waitFor({ state: "attached" });
      const blocked = await page.evaluate(() => {
        const shell = document.querySelector('[data-member-card="Alice"]');
        const face = shell?.querySelector(".w-full.rounded-sm.cursor-pointer");
        const bob = document.querySelector('[data-member-card="Bob"]');
        return {
          aliceDisplay: shell?.style.display,
          aliceSoft: face?.classList.contains("lt-soft-blocked") || false,
          aliceWhy: shell?.getAttribute("data-lt-why") || "",
          bobDisplay: bob?.style.display || "",
          bobSoft: bob?.querySelector(".w-full.rounded-sm.cursor-pointer")?.classList.contains("lt-soft-blocked") || false
        };
      });
      assert.equal(blocked.aliceDisplay, "none", "soft-blocked card is hidden");
      assert.equal(blocked.aliceSoft, true, "soft-blocked face is marked");
      assert.match(blocked.aliceWhy, /soft-block/);
      assert.equal(blocked.bobDisplay, "", "unblocked card stays visible");
      assert.equal(blocked.bobSoft, false, "unblocked card is not soft-blocked");
      await context.close();
    }

    {
      const { context, page } = await openKinksters(browser, {
        html: "<main></main>",
        beforeScript: (p) => stampPro(p, { beatAgeMs: 0, ui: true })
      });
      const yielded = await page.evaluate(() => ({
        rail: !!document.getElementById("fl-rail-title"),
        live: document.documentElement.getAttribute("data-fl-tools-live"),
        stubDock: document.getElementById("fl-tools-dock")?.dataset.proStub === "1",
        edition: document.documentElement.getAttribute("data-fl-tools-edition")
      }));
      assert.equal(yielded.rail, false, "Basic does not mount its rail while Pro is live");
      assert.equal(yielded.stubDock, true, "Pro stub dock remains");
      assert.equal(yielded.live, "pro");
      await context.close();
    }

    {
      const { context, page } = await openKinksters(browser, {
        html: "<main></main>",
        beforeScript: (p) => stampPro(p, { beatAgeMs: 8000, ui: false })
      });
      await page.locator("#fl-tools-dock").waitFor({ state: "attached" });
      const took = await page.evaluate(() => ({
        title: document.getElementById("fl-rail-title")?.textContent || "",
        edition: document.documentElement.getAttribute("data-fl-tools-edition"),
        claim: document.documentElement.getAttribute("data-fl-tools-claim"),
        live: document.documentElement.getAttribute("data-fl-tools-live")
      }));
      assert.match(took.title, /FL Tools Basic/);
      assert.equal(took.edition, "basic", "stale Pro heartbeat lets Basic claim the dock");
      assert.equal(took.claim, "basic");
      assert.notEqual(took.live, "pro");
      await context.close();
    }

    {
      const { context, page } = await openKinksters(browser, { html: "<main></main>" });
      await page.locator("#fl-tools-dock").waitFor({ state: "attached" });
      const missing = await page.evaluate(() => ({
        title: document.getElementById("fl-rail-title")?.textContent || "",
        edition: document.documentElement.getAttribute("data-fl-tools-edition")
      }));
      assert.match(missing.title, /FL Tools Basic/);
      assert.equal(missing.edition, "basic", "missing heartbeat lets Basic take the dock");
      await context.close();
    }

    console.log("DOM scan + dual-install yield OK");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
