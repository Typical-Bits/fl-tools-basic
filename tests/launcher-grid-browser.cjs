const fs = require("node:fs");
const assert = require("node:assert/strict");
const { chromium } = require(process.env.FL_PLAYWRIGHT || "playwright");
const source = fs.readFileSync(require("node:path").join(__dirname, "../core/launcher-grid.js"), "utf8");
const permutations = list => list.length ? list.flatMap((item, index) => permutations(list.filter((_, i) => i !== index)).map(rest => [item, ...rest])) : [[]];
(async () => {
  const browser = await chromium.launch({headless:true});
  let runs = 0;
  try {
    for (let mask = 1; mask < 16; mask++) {
      const editions = ["basic", "pro", "vault", "studio"].filter((_, i) => mask & (1 << i));
      for (const order of permutations(editions)) {
        const page = await browser.newPage({viewport:{width:800,height:700}});
        const errors = []; page.on("pageerror", error => errors.push(error.message));
        await page.route("**/*", route => route.fulfill({contentType:"text/html",body:"<body></body>"}));
        await page.goto("http://example.test");
        await page.evaluate(({source, order}) => {
          window.grids = {};
          for (const edition of order) {
            const grid = new Function(source + "; return createFLToolsLauncherGrid")()(edition);
            const node = document.createElement("button");
            node.id = ["basic", "pro"].includes(edition) ? "fl-settings-launcher" : "fl-" + edition + "-launcher";
            node.textContent = edition; node.dataset.edition = edition;
            document.body.append(node);
            grid.register(node, {edition, id:"fl-tools-" + edition});
            window.grids[edition] = grid;
          }
        }, {source, order});
        const owner = ["basic", "pro", "vault", "studio"].find(item => editions.includes(item));
        for (const top of [8, 644]) {
          const result = await page.evaluate(({owner, top}) => {
            const grid = grids[owner]; grid.setTop(top);
            const list = grid.getNodes();
            return {owner:document.documentElement.getAttribute("data-fl-tools-grid-owner"),
              boxes:list.map(node => ({edition:node.dataset.edition, ...node.getBoundingClientRect().toJSON()}))};
          }, {owner, top});
          assert.equal(result.owner, owner);
          const boxes = result.boxes;
          assert.equal(boxes.length, editions.length - (editions.includes("basic") && editions.includes("pro") ? 1 : 0));
          for (const box of boxes) { assert.equal(box.width,48);assert.equal(box.height,48);assert(box.top>=8 && box.bottom<=692); }
          const anchor = boxes.find(box=>box.edition==="pro") || boxes.find(box=>box.edition==="basic") || boxes.find(box=>box.edition==="vault") || boxes[0];
          const studio = boxes.find(box=>box.edition==="studio");
          const vault = boxes.find(box=>box.edition==="vault");
          if(studio && studio!==anchor){assert.equal(anchor.left-studio.right,12);assert.equal(studio.top,anchor.top);}
          if(vault && vault!==anchor){assert.equal(vault.left,anchor.left);assert.equal(top===8 ? vault.top-anchor.bottom : anchor.top-vault.bottom,12);}
        }
        // Basic yields visually to Pro, so drag an actually visible member.
        const target = await page.locator("button:visible").first().boundingBox();
        await page.mouse.move(target.x+24,target.y+24);await page.mouse.down();await page.mouse.move(target.x+24,80,{steps:6});await page.mouse.up();
        const moved = await page.locator("button:visible").first().boundingBox();
        assert(moved.y < 200, "Dragging must move the group, not merely avoid exceptions");
        assert.deepEqual(errors,[]);
        await page.close(); runs++;
      }
    }
    console.log("PASS: "+runs+" edition/load-order combinations; top/bottom placement, exact gaps, yielding, normalized size, and drag without exceptions.");
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
