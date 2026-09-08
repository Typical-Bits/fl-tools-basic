const assert = require("node:assert/strict");
const fs = require("node:fs");

const source = fs.readFileSync("FL_Tools_Basic.user.js", "utf8");
const headerVersion = source.match(/^\/\/ @version\s+(\S+)/m)?.[1];
const runtimeVersion = source.match(/const FL_TOOLS_VERSION = "([^"]+)";/)?.[1];

assert.ok(headerVersion, "userscript version is present");
assert.equal(runtimeVersion, headerVersion, "runtime and metadata versions match");
assert.match(source, /const FL_SETTINGS_SCHEMA = 1;/, "settings schema is explicit");
assert.match(source, /migrateFlSettings\(\);/, "legacy settings migrate at startup");
assert.doesNotMatch(source, /type=["']checkbox["']/i, "settings do not use checkbox inputs");
assert.match(source, /<button id=\"' \+ id \+ '\" type=\"button\" class=\"fl-switch-input toggleSwitch\" role=\"switch\"/, "switches are real buttons");
assert.match(source, /aria-checked/, "switches expose accessible state");
assert.match(source, /prefers-reduced-motion:reduce/, "reduced-motion preference is respected");
assert.match(source, /fl-tools-high-contrast/, "high-contrast mode is available");
console.log("UI contract OK");
