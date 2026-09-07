import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const files = process.argv.slice(2);
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  new vm.Script(source, { filename: file });
  assert.match(source, /window\.FLTools/);
  assert.match(source, /fl-settings-launcher/);
  assert.match(source, /fl-tools-dock/);
  assert.match(source, /localStorage/);
}
console.log("FL Tools smoke checks passed:", files.join(", "));
