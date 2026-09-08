/* FL Tools dock CSS. Typical-Bits / fl-tools-basic */
(function () {
  if (document.getElementById("fl-tools-core-style")) return;
  var el = document.createElement("style");
  el.id = "fl-tools-core-style";
  el.textContent = [
    "#fl-settings-launcher{position:fixed!important;right:12px!important;z-index:2147483001;width:48px!important;height:48px!important;display:flex!important;align-items:center;justify-content:center;padding:0!important;margin:0!important;border:1px solid #e11d4866!important;border-radius:12px!important;background:#171a1f!important;color:#fb7185!important;box-shadow:0 4px 16px #0006;cursor:grab;}",
    "#fl-settings-launcher[data-fl-tools-idle=basic]{opacity:.55;}",
    "#fl-settings-launcher[data-fl-tools-idle=basic]::after{content:\"Pro\";position:absolute;right:4px;bottom:2px;font-size:9px;font-weight:700;color:#e11d48;}",
    "#fl-tools-dock{color-scheme:dark;--lt-bg:#111;--lt-bg-elev:#1a1a1a;--lt-bg-input:#0a0a0a;--lt-border:#2e2e2e;--lt-border-soft:#262626;--lt-text:#f3f4f6;--lt-text-muted:#a3a3a3;--lt-accent:#e11d48;--lt-accent-soft:rgba(225,29,72,.16);--lt-radius:8px;--lt-ctrl-h:28px;position:fixed;right:12px;z-index:2147483000;width:240px;box-sizing:border-box;overflow-x:hidden;overflow-y:auto;display:flex;flex-direction:column;gap:5px;font-family:ui-sans-serif,system-ui,sans-serif;color:var(--lt-text);background:var(--lt-bg)!important;border:1px solid var(--lt-border)!important;border-radius:var(--lt-radius);padding:8px;}",
    "html.light #fl-tools-dock{color-scheme:light;--lt-bg:#f9fafb;--lt-bg-elev:#fff;--lt-bg-input:#fff;--lt-border:#d1d5db;--lt-text:#171717;--lt-text-muted:#737373;}",
    "#fl-tools-dock.dock-top{top:72px;bottom:auto;max-height:calc(100vh - 84px);}",
    "#fl-tools-dock.dock-center{top:50%;transform:translateY(-50%);max-height:calc(100vh - 24px);}",
    "#fl-tools-dock.dock-bottom{top:auto;bottom:16px;max-height:calc(100vh - 32px);}",
    ".fl-tool-panel{background:var(--lt-bg-elev);border:1px solid var(--lt-border-soft);border-radius:8px;padding:7px 9px;color:var(--lt-text);font-size:13px;}",
    ".fl-tool-header{display:flex;justify-content:space-between;align-items:center;cursor:pointer;gap:8px;}",
    ".fl-tool-title{font-weight:600;}",
    ".fl-tool-panel .fl-tool-body{display:none;margin-top:6px;max-height:min(58vh,520px);overflow:auto;}",
    ".fl-tool-panel.is-open .fl-tool-body,.fl-tool-panel .fl-tool-body.is-open,.fl-tool-panel.lt-panel-open .fl-tool-body{display:block;}",
    ".fl-tool-hidden{display:none!important;}",
    ".fl-switch{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:6px 0;width:100%;cursor:pointer;}",
    ".toggleSwitch{position:relative;flex:none;width:36px;height:18px;background:#6b6b6b;border-radius:12px;}",
    ".toggleSwitch::after{content:\"\";position:absolute;top:0;left:0;width:18px;height:18px;border-radius:12px;background:#d4d4d4;}",
    ".fl-switch-input{position:absolute;opacity:0;width:0;height:0;}",
    ".fl-switch-input:checked + .toggleSwitch{background:var(--lt-accent);}",
    ".fl-switch-input:checked + .toggleSwitch::after{transform:translateX(18px);}",
    ".life-btn,.fl-btn{width:100%;padding:0 10px;height:var(--lt-ctrl-h);color:var(--lt-text);border:1px solid var(--lt-border);border-radius:6px;cursor:pointer;margin-bottom:6px;background:var(--lt-bg-elev);font:inherit;font-size:12px;}",
    ".fl-tool-panel input,.fl-tool-panel select,.fl-tool-panel textarea{width:100%;box-sizing:border-box;padding:5px 8px;background:var(--lt-bg-input)!important;color:var(--lt-text)!important;border:1px solid var(--lt-border);border-radius:6px;}",
    "#fl-dock-actions{display:flex;gap:6px;}",
    "#fl-dock-actions>button{flex:1;background:transparent;color:#a3a3a3;border:1px solid var(--lt-border);border-radius:8px;cursor:pointer;padding:6px 8px;}"
  ].join("");
  (document.documentElement || document.head).appendChild(el);
})();
