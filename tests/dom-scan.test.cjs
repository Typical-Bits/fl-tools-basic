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
  memberCard({ nick: "SampleUser1", age: 25, gender: "F", role: "switch", extra: "Austin" }) +
  memberCard({ nick: "SampleUser2", age: 45, gender: "M", role: "dom", extra: "Dallas" }) +
  memberCard({ nick: "SampleUser3", age: 30, gender: "F", role: "sub", extra: "hard limit CNC" }) +
  "</main>";

async function openKinksters(browser, { html = LIST_HTML, beforeScript } = {}) {
  const context = await browser.newContext({ viewport: { width: 1000, height: 900 } });
  await context.route("https://fetlife.com/**", (route) =>
    route.fulfill({ contentType: "text/html; charset=utf-8", body: html })
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
  const chromePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/local/bin/google-chrome";
  const browser = await chromium.launch({
    headless: true,
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined
  });
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
        return { sampleuser1: info("SampleUser1"), sampleuser2: info("SampleUser2"), sampleuser3: info("SampleUser3") };
      });
      assert.equal(scan.sampleuser1.display, "", "SampleUser1 (in-range, no limits hit) stays visible");
      assert.equal(scan.sampleuser1.dimHard, false, "SampleUser1 is not hard-dimmed");
      assert.equal(scan.sampleuser2.dimHard, true, "SampleUser2 is hard-dimmed for age");
      assert.match(scan.sampleuser2.why, /age/i);
      assert.equal(scan.sampleuser3.dimHard, true, "SampleUser3 is hard-dimmed for limits");
      assert.match(scan.sampleuser3.why, /hard limits/i);
      await context.close();
    }

    {
      const { context, page } = await openKinksters(browser, {
        beforeScript: async (p) => {
          await p.evaluate(() => {
            localStorage.setItem("fl_profile_filter_settings", JSON.stringify({
              minAge: "18",
              maxAge: "80",
              genders: "F",
              roles: "switch",
              relFollow: true,
              relFollowing: true,
              relFollowsYou: true,
              relFriends: true,
              showSeenChip: true,
              showToasts: false,
              autoScroll: false
            }));
            localStorage.setItem("fl_visit_log", JSON.stringify({ sampleuser1: "2026-09-01T12:00:00.000Z" }));
          });
        }
      });
      await page.locator("#fl-tools-dock").waitFor({ state: "attached" });
      const chips = await page.evaluate(() => {
        const face = (nick) => document.querySelector(`[data-member-card="${nick}"]`)
          ?.querySelector(".w-full.rounded-sm.cursor-pointer");
        const labels = (nick) => Array.from(face(nick)?.querySelectorAll(".lt-card-chip, .lt-seen-chip") || [])
          .map((el) => el.textContent.trim());
        const bar = document.getElementById("fl-browse-chips");
        return {
          sampleuser1: labels("SampleUser1"),
          sampleuser2: labels("SampleUser2"),
          barText: bar ? bar.textContent : "",
          barFixed: bar ? getComputedStyle(bar).position : ""
        };
      });
      assert.ok(!chips.sampleuser1.includes("F"), "FetLife already shows gender; tools do not restack it");
      assert.ok(!chips.sampleuser1.includes("switch"), "FetLife already shows role; tools do not restack it");
      assert.ok(chips.sampleuser1.includes("Seen"), "visited kinksters show a Seen chip on the card");
      assert.ok(!chips.sampleuser2.includes("M"), "SampleUser2’s gender is not restacked as a chip");
      assert.match(chips.barText, /f/i);
      assert.match(chips.barText, /switch/i);
      assert.equal(chips.barFixed, "fixed", "active filter chips stay on screen without opening the dock");
      await context.close();
    }

    {
      const context = await browser.newContext({ viewport: { width: 1000, height: 900 } });
      await context.route("https://fetlife.com/**", (route) =>
        route.fulfill({ contentType: "text/html; charset=utf-8", body: LIST_HTML })
      );
      await context.route("https://api.github.com/**", (route) =>
        route.fulfill({ status: 404, body: "" })
      );
      const page = await context.newPage();
      await page.goto("https://fetlife.com/p/united-states/oregon/portland/kinksters");
      await page.addScriptTag({ content: script });
      await page.locator("#fl-tools-dock").waitFor({ state: "attached" });
      const place = await page.evaluate(() => {
        const face = document.querySelector('[data-member-card="SampleUser1"]')
          ?.querySelector(".w-full.rounded-sm.cursor-pointer");
        return {
          chips: Array.from(face?.querySelectorAll(".lt-card-chip") || []).map((el) => el.textContent.trim()),
          rail: !!face?.querySelector(".lt-card-chips")
        };
      });
      assert.equal(place.rail, false, "place kinksters cards have no chip rail unless Seen");
      assert.ok(!place.chips.includes("F"), "place kinksters cards do not restack identity chips");
      await context.close();
    }

    {
      const { context, page } = await openKinksters(browser, {
        beforeScript: async (p) => {
          await p.evaluate(() => {
            localStorage.setItem("fl_block_reasons", JSON.stringify({
              SampleUser1: { terms: [], at: Date.now(), type: "soft" }
            }));
          });
        }
      });
      await page.locator("#fl-tools-dock").waitFor({ state: "attached" });
      const blocked = await page.evaluate(() => {
        const shell = document.querySelector('[data-member-card="SampleUser1"]');
        const face = shell?.querySelector(".w-full.rounded-sm.cursor-pointer");
        const sampleuser2 = document.querySelector('[data-member-card="SampleUser2"]');
        return {
          sampleuser1Display: shell?.style.display,
          sampleuser1Soft: face?.classList.contains("lt-soft-blocked") || false,
          sampleuser1Why: shell?.getAttribute("data-lt-why") || "",
          sampleuser2Display: sampleuser2?.style.display || "",
          sampleuser2Soft: sampleuser2?.querySelector(".w-full.rounded-sm.cursor-pointer")?.classList.contains("lt-soft-blocked") || false
        };
      });
      assert.equal(blocked.sampleuser1Display, "none", "soft-blocked card is hidden");
      assert.equal(blocked.sampleuser1Soft, true, "soft-blocked face is marked");
      assert.match(blocked.sampleuser1Why, /soft-block/);
      assert.equal(blocked.sampleuser2Display, "", "unblocked card stays visible");
      assert.equal(blocked.sampleuser2Soft, false, "unblocked card is not soft-blocked");
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
