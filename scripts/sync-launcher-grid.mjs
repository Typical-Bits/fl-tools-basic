// Basic owns the source. Pass edition checkout paths to update offline copies.
// node scripts/sync-launcher-grid.mjs [--check] [path-to-edition ...]
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Script } from "node:vm";
const basic = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const source = readFileSync(join(basic, "core/launcher-grid.js"), "utf8").replace(/\r\n/g, "\n").trimEnd();
new Script(source);
for (const repo of [basic, ...process.argv.slice(2).filter(arg => arg !== "--check").map(arg => resolve(arg))]) {
  const edition = ["Basic", "Pro", "Vault", "Studio"].find(name => existsSync(join(repo, "FL_Tools_" + name + ".user.js")));
  if (!edition) throw new Error("No edition userscript in " + repo);
  const scriptPath = join(repo, "FL_Tools_" + edition + ".user.js");
  const script = readFileSync(scriptPath, "utf8").replace(/\r\n/g, "\n");
  const start = script.indexOf("  /* BEGIN generated:launcher-grid */");
  const end = script.indexOf("  /* END generated:launcher-grid */", start);
  // Existing generators indent Basic/Pro/Studio; Vault historically did not.
  const region = script.slice(start, end);
  const declaration = region.search(/(?:const|var) FLToolsLauncherGrid = createFLToolsLauncherGrid/);
  if (start < 0 || end < 0 || declaration < 0) throw new Error("Missing grid markers: " + scriptPath);
  const tail = region.slice(declaration).trimEnd();
  const next = script.slice(0, start) + "  /* BEGIN generated:launcher-grid */\n" +
    source.split("\n").map(line => line ? "  " + line : line).join("\n") + "\n    " + tail +
    "\n" + script.slice(end);
  new Script(next);
  for (const [file, content] of [[scriptPath, next], [join(repo, "core/launcher-grid.js"), source + "\n"]]) {
    const previous = existsSync(file) ? readFileSync(file, "utf8").replace(/\r\n/g, "\n") : "";
    if (previous === content) continue;
    if (check) throw new Error("Generated grid drift: " + file);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
    console.log(file + ": " + (Buffer.byteLength(content) - Buffer.byteLength(previous)) + " bytes");
  }
}
