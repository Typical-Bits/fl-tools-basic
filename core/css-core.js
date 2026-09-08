/* Tiny fallback if css-core.js is not yet on the repo. Typical-Bits only. */
(function () {
  if (document.getElementById("fl-tools-core-style")) return;
  var el = document.createElement("style");
  el.id = "fl-tools-core-style";
  el.textContent = [
    "#fl-tools-dock{color-scheme:dark;--lt-bg:#111;--lt-bg-elev:#1a1a1a;--lt-bg-input:#0a0a0a;--lt-border:#2e2e2e;--lt-border-soft:#262626;--lt-text:#f3f4f6;--lt-text-muted:#a3a3a3;--lt-accent:#e11d48;--lt-accent-soft:rgba(225,29,72,.16);--lt-radius:8px;position:fixed;right:12px;z-index:2147483000;width:240px;box-sizing:border-box;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;gap:5px;font-family:ui-sans-serif,system-ui,sans-serif;color:var(--lt-text);background:var(--lt-bg);border:1px solid var(--lt-border);border-radius:var(--lt-radius);padding:8px;}",
    "html.light #fl-tools-dock{color-scheme:light;--lt-bg:#f9fafb;--lt-bg-elev:#fff;--lt-bg-input:#fff;--lt-border:#d1d5db;--lt-text:#171717;--lt-text-muted:#737373;}",
    "#fl-settings-launcher{position:fixed;right:12px;bottom:16px;z-index:2147483000;width:40px;height:40px;border-radius:999px;border:1px solid #3f3f3f;background:#111;color:#e11d48;cursor:pointer;}",
    "#fl-settings-launcher[data-fl-tools-idle=basic]{opacity:.55;}",
    ".fl-tool-panel{background:var(--lt-bg-elev);border:1px solid var(--lt-border-soft);border-radius:8px;padding:6px 8px;}",
    ".fl-tool-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;}",
    ".fl-tool-panel .fl-tool-body{display:none;}",
    ".fl-tool-panel.is-open .fl-tool-body,.fl-tool-panel .fl-tool-body.is-open{display:block;}",
    ".fl-tool-hidden{display:none !important;}"
  ].join("");
  (document.documentElement || document.head).appendChild(el);
})();
