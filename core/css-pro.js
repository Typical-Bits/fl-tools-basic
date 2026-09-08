/* Pro-only dock CSS. Typical-Bits / hosted from fl-tools-basic. */
(function () {
  if (document.getElementById("fl-tools-pro-style")) return;
  var el = document.createElement("style");
  el.id = "fl-tools-pro-style";
  el.textContent = [
    "html.fl-tools-dock-hidden #fl-tools-dock{display:none!important;}",
    "#fl-dock-show{display:none;position:fixed;right:12px;bottom:16px;z-index:2147483000;width:40px;height:40px;border-radius:999px;border:1px solid #3f3f3f;background:#111;color:#e11d48;cursor:pointer;}",
    "html.fl-tools-dock-hidden #fl-dock-show{display:inline-flex;align-items:center;justify-content:center;}",
    ".flhp-red,.flhp-gold,.flhp-green,.flhp-blue{position:relative!important;}",
    ".flhp-red::after,.flhp-gold::after,.flhp-green::after,.flhp-blue::after{content:\"\";position:absolute;inset:0;pointer-events:none;z-index:4;border-radius:inherit;}",
    ".flhp-red::after{box-shadow:inset 5px 0 0 #8a8a8a;}",
    ".flhp-gold::after{box-shadow:inset 5px 0 0 #c4a574;}",
    ".flhp-green::after{box-shadow:inset 5px 0 0 #0f766e;}",
    ".flhp-blue::after{box-shadow:inset 5px 0 0 #e11d48;}",
    ".flhp-dim{opacity:.45!important;}",
    ".lt-snoozed-card{opacity:.38!important;}",
    ".lt-story-muted{display:none!important;}",
    "html.fl-tools-show-muted .lt-story-muted{display:block!important;opacity:.45;}",
    ".lt-flag-hl{display:inline!important;background-image:var(--lt-flag)!important;background-size:100% 100%!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;-webkit-text-fill-color:transparent!important;}",
    ".lt-note-chip{position:absolute;left:6px;top:6px;z-index:18;background:rgba(17,17,17,.75);color:#d4d4d4;border:1px solid #737373;}",
    ".lt-qa-bar .lt-qa-menu{position:absolute;right:0;bottom:100%;display:none;flex-direction:column;min-width:72px;z-index:30;background:var(--lt-bg,#111);border:1px solid var(--lt-border,#2e2e2e);border-radius:8px;padding:3px;}",
    ".lt-qa-bar .lt-qa-menu.open{display:flex;}"
  ].join("");
  (document.documentElement || document.head).appendChild(el);
})();
