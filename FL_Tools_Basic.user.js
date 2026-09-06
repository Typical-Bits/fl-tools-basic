// ==UserScript==
// @name         FL_Tools Basic
// @namespace    https://fetlife.com/
// @version      1.1.0
// @updateURL    https://github.com/Typical-Bits/fl-tools-basic/releases/latest/download/FL_Tools_Basic.user.js
// @downloadURL  https://github.com/Typical-Bits/fl-tools-basic/releases/latest/download/FL_Tools_Basic.user.js
// @tag          Social Media
// @description  FetLife dock: filters, soft-block, NSFW/SFW, Seen chip, shortcuts, org cards, infinite scroll, toasts. Standalone.
// @author       TypicalBits
// @license      CC-BY-NC-4.0
// @icon         https://fetlife.com/favicons/favicon-32.png
// @iconURL      https://fetlife.com/favicons/favicon-32.png
// @defaulticon  https://fetlife.com/favicons/favicon-32.png
// @match        https://fetlife.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
/*
  FL_Tools Basic v1.1.0 — standalone dock (filters, soft-block, NSFW/SFW, Seen chip).
  Local-only; English UI; DOM-only (no private APIs).
*/

(function () {
  "use strict";

  const FL_EDITION = "basic";
  /* Silent yield if Pro already claimed (dual-install). Prefer page-world
     signals — Pro may run sandboxed (@grant) so attribute-only checks miss. */
  try {
    const root = document.documentElement;
    const page =
      (typeof unsafeWindow !== "undefined" && unsafeWindow) ||
      window;
    const claim =
      (page && page.__FL_TOOLS_CLAIM__) ||
      root.getAttribute("data-fl-tools-claim") ||
      root.getAttribute("data-fl-tools-edition") ||
      (function () {
        try { return sessionStorage.getItem("fl_tools_claim"); } catch (_) { return null; }
      })();
    if (claim === "pro" || (page && page.__FL_TOOLS_BOOTED__)) return;
    if (!root.getAttribute("data-fl-tools-edition")) {
      root.setAttribute("data-fl-tools-edition", "basic");
    }
  } catch (_) {}

  /* Member-card selectors. FetLife wraps some lists in [data-member-card];
     kinksters grids often only have the rounded visual card + nickname link. */
  const NAME_LINK_SELECTOR = 'a[href^="/"][title]';
  const VISUAL_CARD_SELECTOR = ".w-full.rounded-sm.cursor-pointer";
  const CARD_SELECTOR = "[data-member-card], " + VISUAL_CARD_SELECTOR;
  const FOLLOWS_YOU_PATH = "M12 1v2H0v2h12v2l4-3zM4 9l-4 3 4 3v-2h12v-2H4z";

  /* Injected CSS: FetLife-matched dock tokens, SFW blur, compact, soft feed/card chips. */
  const style = document.createElement("style");
  style.textContent = `
    /* Dark: neutral black/gray (no blue-slate). Accent = favicon red only. */
    #fl-tools-dock {
      color-scheme: dark;
      --lt-bg: #111111;
      --lt-bg-elev: #1a1a1a;
      --lt-bg-input: #0a0a0a;
      --lt-border: #2e2e2e;
      --lt-border-soft: #262626;
      --lt-text: #f3f4f6;
      --lt-text-muted: #a3a3a3;
      --lt-accent: #e11d48;
      --lt-accent-soft: rgba(225, 29, 72, 0.16);
      --lt-gold: #a3a3a3;
      --lt-radius: 8px;
      --lt-ctrl-h: 28px;
      position: fixed; right: 12px; z-index: 2147483000;
      width: 240px; box-sizing: border-box;
      overflow-x: hidden; overflow-y: auto; scrollbar-gutter: stable;
      display: flex; flex-direction: column; gap: 5px;
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
      color: var(--lt-text);
    }
    html.light #fl-tools-dock {
      color-scheme: light;
      --lt-bg: #f9fafb;
      --lt-bg-elev: #ffffff;
      --lt-bg-input: #ffffff;
      --lt-border: #d1d5db;
      --lt-border-soft: #e5e7eb;
      --lt-text: #171717;
      --lt-text-muted: #737373;
      --lt-accent: #e11d48;
      --lt-accent-soft: rgba(225, 29, 72, 0.1);
      --lt-gold: #737373;
    }
    #fl-tools-dock.dock-top { top: 72px; bottom: auto; transform: none; max-height: calc(100vh - 84px); }
    #fl-tools-dock.dock-center { top: 50%; bottom: auto; transform: translateY(-50%); max-height: calc(100vh - 24px); }
    #fl-tools-dock.dock-bottom { top: auto; bottom: 16px; transform: none; max-height: calc(100vh - 32px); }
    #fl-tools-dock.dragging { user-select: none; cursor: ns-resize; }
    #fl-tools-dock.lt-grow-up {
      justify-content: flex-end;
    }
    /* Near bottom: keep header→body order so the panel name stays on top;
       dock is bottom-anchored / flex-end so open panels expand upward. */
    #fl-tools-dock.lt-grow-up .fl-tool-panel {
      display: flex;
      flex-direction: column;
    }
    .fl-tool-panel {
      background: var(--lt-bg);
      border: 1px solid var(--lt-border-soft);
      border-radius: var(--lt-radius);
      padding: 7px 9px;
      width: 100%; max-width: 100%; box-sizing: border-box;
      color: var(--lt-text);
      font-size: 13px; line-height: 1.45;
      box-shadow: 0 1px 2px rgba(0,0,0,.22);
      overflow-x: hidden;
    }
    html.light .fl-tool-panel {
      background: var(--lt-bg);
      border-color: var(--lt-border-soft);
      box-shadow: 0 1px 2px rgba(0,0,0,.08);
    }
    .fl-tool-header {
      display: flex; justify-content: space-between; align-items: center;
      cursor: ns-resize; gap: 8px;
      padding-bottom: 2px;
    }
    .fl-tool-title {
      font-weight: 600; color: var(--lt-text);
      font-size: 13px; letter-spacing: 0.02em;
      line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    /* Remembered last / currently opened panel — favicon red accent. */
    .fl-tool-panel.lt-last-panel {
      border-color: rgba(225, 29, 72, 0.45);
      box-shadow: 0 1px 2px rgba(0,0,0,.22), inset 3px 0 0 #e11d48;
    }
    .fl-tool-panel.lt-last-panel > .fl-tool-header .fl-tool-title::after {
      content: "";
      display: inline-block;
      width: 6px; height: 6px; margin-left: 6px; vertical-align: middle;
      border-radius: 50%; background: #e11d48;
    }
    .fl-tool-panel.lt-panel-open {
      border-color: rgba(225, 29, 72, 0.65);
      box-shadow: 0 1px 2px rgba(0,0,0,.22), inset 3px 0 0 #e11d48,
        0 0 0 1px rgba(225, 29, 72, 0.22);
    }
    html.light .fl-tool-panel.lt-last-panel {
      box-shadow: 0 1px 2px rgba(0,0,0,.08), inset 3px 0 0 #e11d48;
    }
    html.light .fl-tool-panel.lt-panel-open {
      box-shadow: 0 1px 2px rgba(0,0,0,.08), inset 3px 0 0 #e11d48,
        0 0 0 1px rgba(225, 29, 72, 0.2);
    }
    .flhp-legend { margin-top: 6px; color: var(--lt-text-muted); font-size: 11px; line-height: 1.45; font-weight: 400; }
    .flhp-legend-row { display: flex; align-items: center; gap: 6px; margin: 1px 0; }
    .fl-tool-chevron {
      background: none; border: none; color: var(--lt-text-muted);
      cursor: pointer; font-size: 13px; padding: 0 2px; line-height: 1;
      transition: color .15s ease;
    }
    .fl-tool-chevron:hover { color: var(--lt-text); }
    .lt-why-hidden {
      position: absolute; left: 6px; top: 6px; z-index: 12;
      font-size: 10px; padding: 1px 6px; border-radius: 999px;
      background: rgba(0,0,0,.72); color: #e5e5e5; border: 1px solid #e11d48;
      pointer-events: none; max-width: 72%; white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis;
    }
    html.light .lt-why-hidden { background: rgba(255,255,255,.88); color: #171717; }
    .fl-tool-body {
      margin-top: 6px; max-height: min(58vh, 520px);
      overflow-x: hidden; overflow-y: auto; scrollbar-gutter: stable;
      padding-right: 2px; box-sizing: border-box;
    }
    .fl-tool-hidden { display: none !important; }
    .fl-chip-row { display: flex; flex-wrap: wrap; gap: 4px; margin: 0 0 8px; max-height: 72px; overflow: auto; }
    .fl-chip {
      display: inline-flex; align-items: center; gap: 4px;
      background: var(--lt-bg-elev); border: 1px solid var(--lt-border);
      border-radius: 999px; padding: 2px 8px; font-size: 12px; color: var(--lt-text);
    }
    .fl-chip.fl-chip-saved {
      background: transparent; border-color: var(--lt-border-soft); color: var(--lt-text-muted);
    }
    .fl-chip button { border: 0; background: none; color: var(--lt-text-muted); cursor: pointer; padding: 0 2px; font: inherit; }
    .fl-chip.fl-chip-saved button { color: var(--lt-text-muted); }
    .fl-chip button:hover { color: var(--lt-accent); }
    .fl-chip-meta { color: var(--lt-text-muted); font-size: 11px; margin: 0 0 4px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .fl-chip-meta .fl-chip-clear-saved,
    .fl-chip-more {
      background: none; border: 0; color: var(--lt-gold); cursor: pointer; font: inherit; font-size: 11px; padding: 0;
    }
    .fl-suggest-row { display: flex; align-items: stretch; width: 100%; }
    .fl-suggest-row .fl-suggest-pick { flex: 1; }
    .fl-suggest-row .fl-suggest-del { flex: 0 0 auto; width: auto; padding: 5px 10px; color: var(--lt-text-muted); }
    .fl-suggest {
      display: none; max-height: 120px; overflow: auto;
      background: var(--lt-bg-elev); border: 1px solid var(--lt-border);
      border-radius: 6px; margin: 0 0 8px;
    }
    .fl-suggest.open { display: block; }
    .fl-suggest button {
      display: flex; justify-content: space-between; width: 100%;
      background: none; border: 0; color: var(--lt-text); text-align: left;
      padding: 5px 8px; cursor: pointer; font: inherit; font-size: 12px;
    }
    .fl-suggest button:hover { background: var(--lt-accent-soft); }
    .fl-suggest .off { color: var(--lt-text-muted); }
    .fl-add-row { display: flex; align-items: center; gap: 4px; margin-bottom: 6px; }
    .fl-add-row input { flex: 1; margin: 0 !important; height: var(--lt-ctrl-h); }
    .fl-add-row .life-btn {
      width: auto; flex: 0 0 auto; margin: 0; padding: 0 10px;
      height: var(--lt-ctrl-h); line-height: var(--lt-ctrl-h);
    }
    .fl-tool-panel input[type="text"], .fl-tool-panel input[type="number"],
    .fl-tool-panel input[type="search"],
    .fl-tool-panel select, .fl-tool-panel textarea {
      width: 100%; box-sizing: border-box; padding: 5px 8px;
      background: var(--lt-bg-input) !important; color: var(--lt-text) !important;
      border: 1px solid var(--lt-border); border-radius: 6px;
      font: inherit; font-size: 12px; min-height: var(--lt-ctrl-h);
      transition: border-color .15s ease;
      color-scheme: dark;
      -webkit-text-fill-color: var(--lt-text);
    }
    html.light .fl-tool-panel select,
    html.light .fl-tool-panel input[type="text"],
    html.light .fl-tool-panel input[type="number"],
    html.light .fl-tool-panel input[type="search"],
    html.light .fl-tool-panel textarea {
      color-scheme: light;
    }
    .fl-tool-panel select option,
    .fl-tool-panel select optgroup {
      background: var(--lt-bg-input);
      color: var(--lt-text);
    }
    .fl-tool-panel input:focus, .fl-tool-panel select:focus, .fl-tool-panel textarea:focus {
      outline: none; border-color: var(--lt-accent);
    }
    .fl-tool-panel label { cursor: pointer; color: var(--lt-text); }
    .life-hint { color: var(--lt-text-muted); font-size: 11px; margin: 0 0 6px; }
    .life-subhead {
      display: flex; justify-content: space-between; align-items: center;
      cursor: pointer; color: var(--lt-text); font-weight: 600; margin: 4px 0;
    }
    .life-hr { border: 0; border-top: 1px solid var(--lt-border-soft); margin: 8px 0; }
    .life-btn {
      width: 100%; padding: 0 10px; height: var(--lt-ctrl-h); line-height: var(--lt-ctrl-h);
      color: var(--lt-text); border: 1px solid var(--lt-border); border-radius: 6px;
      cursor: pointer; margin-bottom: 6px; font: inherit; font-size: 12px;
      background: var(--lt-bg-elev); transition: background .15s ease, border-color .15s ease;
    }
    .life-btn:hover { border-color: #525252; }
    .life-btn-red {
      background: var(--lt-bg-elev); border-color: var(--lt-border); color: var(--lt-text);
    }
    .life-btn-red:hover { border-color: #525252; background: #1a1a1a; }
    html.light .life-btn-red:hover { background: #f5f5f5; border-color: #a3a3a3; }
    .life-btn-gray { background: var(--lt-bg-elev); }
    .life-toast {
      background: var(--lt-bg-elev); border: 1px solid var(--lt-border); color: var(--lt-text);
      padding: 8px 10px; border-radius: var(--lt-radius); font-size: 12px; line-height: 1.4;
      cursor: pointer;
    }
    .fl-switch-input { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
    .fl-switch {
      display: flex; align-items: center; justify-content: space-between; gap: 10px;
      color: var(--lt-text); cursor: pointer; margin: 6px 0; width: 100%;
      user-select: none;
    }
    .fl-switch-text { flex: 1 1 auto; min-width: 0; line-height: 1.3; }
    /* Exact AMA account-sidebar toggle: 36×18 track, 18px knob, red when on */
    .toggleSwitch {
      position: relative; flex: none;
      width: 36px; height: 18px;
      background: #6b6b6b; border: 0;
      border-radius: 12px; cursor: pointer; box-sizing: border-box;
      transition: background .15s ease;
      vertical-align: top;
    }
    .toggleSwitch::after {
      content: ""; position: absolute; top: 0; left: 0;
      width: 18px; height: 18px; border-radius: 12px;
      background: #d4d4d4;
      box-shadow: 0 1px 2px rgba(0,0,0,.35);
      transition: transform .15s ease, background .15s ease;
    }
    .fl-switch-input:checked + .toggleSwitch {
      background: var(--lt-accent); /* favicon / FL red-600 family */
    }
    .fl-switch-input:checked + .toggleSwitch::after {
      transform: translateX(18px); background: #e8e8e8;
    }
    .fl-switch:hover .toggleSwitch::after { background: #cfcfcf; }
    .fl-switch-input:checked + .toggleSwitch::after,
    .fl-switch:hover .fl-switch-input:checked + .toggleSwitch::after {
      background: #e8e8e8;
    }
    .fl-switch-input:focus-visible + .toggleSwitch {
      outline: 1px dotted currentColor; outline-offset: 2px;
    }
    html.light .toggleSwitch { background: #a3a3a3; }
    html.light .toggleSwitch::after { background: #262626; }
    html.light .fl-switch-input:checked + .toggleSwitch { background: var(--lt-accent); }
    html.light .fl-switch-input:checked + .toggleSwitch::after { background: #262626; }
    @media (max-width: 720px) { #fl-tools-dock { width: min(260px, calc(100vw - 16px)); } }
    #fl-dock-actions {
      display: flex; gap: 6px; width: 100%; box-sizing: border-box; align-items: stretch;
    }
    #fl-dock-actions > button {
      flex: 1 1 0; min-width: 0; box-sizing: border-box; padding: 6px 8px; margin: 0;
      background: transparent; color: var(--lt-gold);
      border: 1px solid var(--lt-border); border-radius: var(--lt-radius);
      cursor: pointer; font: inherit; font-size: 12px; line-height: 1.45; text-align: center;
      transition: background .15s ease, border-color .15s ease;
    }
    #fl-dock-actions > button:hover {
      background: var(--lt-accent-soft); border-color: #e11d48; color: #e11d48;
    }
    #fl-selector-warn { color: var(--lt-gold); font-size: 12px; margin: 6px 0; }
    #fl-markup-banner {
      display: none; width: 100%; box-sizing: border-box;
      margin: 0 0 5px; padding: 8px 10px;
      border-radius: var(--lt-radius, 8px);
      border: 1px solid var(--lt-border);
      background: var(--lt-bg-elev);
      color: var(--lt-text, #f3f4f6);
      font-size: 12px; line-height: 1.4;
      opacity: 1; transition: opacity .7s ease;
    }
    #fl-markup-banner.lt-show { display: block; }
    #fl-markup-banner.lt-fade { opacity: 0; }
    html.light #fl-markup-banner {
      background: rgba(139, 105, 20, 0.12);
      border-color: rgba(139, 105, 20, 0.45);
      color: #1a1a1a;
    }
    .life-alert-strong,
    #fl-exclude-alert {
      background: var(--lt-bg-elev);
      border: 1px solid var(--lt-border);
      color: var(--lt-text, #f3f4f6);
      padding: 8px 10px; border-radius: var(--lt-radius, 8px); font-size: 12px; line-height: 1.45;
      box-shadow: none;
    }
    #fl-exclude-alert .life-btn {
      width: auto; display: inline-block; margin: 6px 6px 0 0; padding: 0 10px;
      height: 26px; line-height: 26px; font-size: 11px;
    }
    #fl-block-panel .life-alert-strong { margin-top: 8px; }
    #fl-soft-list { max-height: 220px; overflow-y: auto; margin: 4px 0 8px; }
    html.fl-tools-hide-banners [data-controller="push-notifications-banner"],
    html.fl-tools-hide-banners [data-controller="pwa-install--prompt"],
    html.fl-tools-hide-banners [data-pwa-install-cta] { display: none !important; }
    html.fl-tools-nsfw main img, html.fl-tools-nsfw main video,
    html.fl-tools-nsfw #main-content img, html.fl-tools-nsfw #main-content video,
    html.fl-tools-nsfw #ptr-main-element img, html.fl-tools-nsfw #ptr-main-element video,
    html.fl-tools-nsfw .content_container img, html.fl-tools-nsfw .content_container video,
    html.fl-tools-nsfw main [class*="blur"], html.fl-tools-nsfw .content_container [class*="blur"],
    html.fl-tools-nsfw #main-content [class*="blur"] {
      filter: none !important;
      -webkit-filter: none !important;
    }
    /* SFW: blur page media. Profile hero/friends live in #main-content, often outside <main>. */
    html.fl-tools-sfw main img,
    html.fl-tools-sfw main picture img,
    html.fl-tools-sfw #main-content img,
    html.fl-tools-sfw #main-content picture img,
    html.fl-tools-sfw #ptr-main-element img,
    html.fl-tools-sfw #ptr-main-element picture img,
    html.fl-tools-sfw .content_container img,
    html.fl-tools-sfw .content_container picture img,
    html.fl-tools-sfw [data-story-uid] img,
    html.fl-tools-sfw [data-feed-dwell-target] img,
    html.fl-tools-sfw [data-test-id="profile-header"] img {
      filter: blur(var(--lt-sfw-blur, 10px)) !important;
      -webkit-filter: blur(var(--lt-sfw-blur, 10px)) !important;
    }
    html.fl-tools-sfw.fl-tools-blur-videos main video,
    html.fl-tools-sfw.fl-tools-blur-videos #main-content video,
    html.fl-tools-sfw.fl-tools-blur-videos #ptr-main-element video,
    html.fl-tools-sfw.fl-tools-blur-videos .content_container video,
    html.fl-tools-sfw.fl-tools-blur-videos [data-story-uid] video,
    html.fl-tools-sfw.fl-tools-blur-videos #account-sidebar video {
      filter: blur(var(--lt-sfw-blur, 10px)) !important;
      -webkit-filter: blur(var(--lt-sfw-blur, 10px)) !important;
    }
    html.fl-tools-sfw:not(.fl-tools-blur-videos) main video,
    html.fl-tools-sfw:not(.fl-tools-blur-videos) #main-content video,
    html.fl-tools-sfw:not(.fl-tools-blur-videos) #ptr-main-element video,
    html.fl-tools-sfw:not(.fl-tools-blur-videos) .content_container video,
    html.fl-tools-sfw:not(.fl-tools-blur-videos) [data-story-uid] video {
      filter: none !important;
      -webkit-filter: none !important;
    }
    /* Site chrome / tiny feed avatars stay sharp unless "blur avatars" is on.
       Do NOT exempt bare header img — profile-header + feed story headers hold real media. */
    html.fl-tools-sfw:not(.fl-tools-blur-avatars) nav img,
    html.fl-tools-sfw:not(.fl-tools-blur-avatars) [data-controller="nav"] img,
    html.fl-tools-sfw:not(.fl-tools-blur-avatars) img.fl-tools-avatar,
    html.fl-tools-sfw:not(.fl-tools-blur-avatars) .flex-none img.size-24px,
    html.fl-tools-sfw:not(.fl-tools-blur-avatars) .flex-none img.size-36px,
    html.fl-tools-sfw:not(.fl-tools-blur-avatars) .flex-none img.xs\:size-36px,
    html.fl-tools-sfw:not(.fl-tools-blur-avatars) img.size-20px,
    html.fl-tools-sfw:not(.fl-tools-blur-avatars) img.size-24px {
      filter: none !important;
      -webkit-filter: none !important;
    }
    /* Account menu profile media always blurred in SFW (even if avatars stay sharp). */
    html.fl-tools-sfw #account-sidebar img,
    html.fl-tools-sfw #account-sidebar picture img {
      filter: blur(var(--lt-sfw-blur, 10px)) !important;
      -webkit-filter: blur(var(--lt-sfw-blur, 10px)) !important;
    }
    #fl-tools-dock, #fl-tools-dock * {
      filter: none !important;
      -webkit-filter: none !important;
    }
    .w-full.rounded-sm.cursor-pointer { position: relative; }
    /* Quick actions on member cards */
    .lt-qa-bar {
      position: absolute; right: 6px; bottom: 6px; z-index: 20;
      display: flex; flex-wrap: wrap; gap: 3px; max-width: 55%;
      justify-content: flex-end; pointer-events: auto;
    }
    /* Feed story actions: under avatar, never over More Options (top-right). */
    .lt-qa-bar.lt-qa-feed {
      position: relative !important;
      right: auto !important; left: auto !important;
      top: auto !important; bottom: auto !important;
      z-index: 15; max-width: 100%; width: 100%;
      margin-top: 4px; justify-content: center; flex-direction: column; align-items: center;
    }
    .lt-qa-bar.lt-qa-feed.lt-qa-feed-inline {
      display: inline-flex !important;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      width: auto !important;
      max-width: none;
      margin: 0 0 0 6px;
      vertical-align: middle;
      flex: none;
    }
    .lt-qa-status-name {
      display: inline-flex !important;
      align-items: center;
      flex-wrap: wrap;
      max-width: 100%;
      overflow: visible !important;
      text-overflow: clip !important;
      white-space: normal !important;
    }
    /* Soft ghost pills — feed + card quick actions */
    .lt-qa-bar button, .lt-qa-bar a.lt-qa-btn {
      margin: 0; padding: 1px 7px; font-size: 10px; line-height: 1.35;
      border-radius: 999px; border: 1px solid rgba(156, 163, 175, 0.45);
      background: rgba(17, 24, 39, 0.35); color: #d1d5db;
      cursor: pointer; text-decoration: none; font-family: inherit;
      backdrop-filter: blur(2px);
      transition: background .15s ease, border-color .15s ease, color .15s ease;
    }
    .lt-qa-bar button:hover, .lt-qa-bar a.lt-qa-btn:hover {
      background: rgba(225, 29, 72, 0.14); border-color: rgba(225, 29, 72, 0.55); color: #fff;
    }
    .lt-qa-bar.lt-qa-feed button, .lt-qa-bar.lt-qa-feed a.lt-qa-btn {
      background: transparent; border-color: rgba(163, 163, 163, 0.35); color: #a3a3a3;
      font-size: 10px; padding: 0 6px; height: 18px; line-height: 16px;
    }
    .lt-qa-bar.lt-qa-feed button:hover, .lt-qa-bar.lt-qa-feed a.lt-qa-btn:hover {
      color: #f3f4f6; border-color: rgba(225, 29, 72, 0.5); background: rgba(225, 29, 72, 0.1);
    }
    .lt-qa-bar button:focus-visible, .lt-qa-bar a.lt-qa-btn:focus-visible {
      outline: 2px solid var(--lt-accent); outline-offset: 1px;
    }
    #fl-limit-hist-list { max-height: 180px; overflow-y: auto; margin: 4px 0 8px; }
    .lt-row { display:flex; align-items:center; gap:6px; margin:0 0 4px; font-size:12px; }
    .lt-row a { color: #fda4af; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .lt-row .meta { color: var(--lt-text-muted, #a3a3a3); flex:none; }
    .lt-row button { margin:0; padding:2px 8px; }

    mark.lt-limit-hl, .lt-limit-hl {
      background: rgba(244, 63, 94, 0.45) !important;
      color: inherit !important;
      border-radius: 2px;
      padding: 0 2px;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
    }
    html.light mark.lt-limit-hl, html.light .lt-limit-hl {
      background: rgba(225, 29, 72, 0.35) !important;
      color: #1a1a1a !important;
    }
    /* Seen chip on list cards (visit log / opened profiles + media). */
    .lt-seen-chip {
      position: absolute; left: 6px; bottom: 6px; z-index: 18;
      font-size: 10px; font-weight: 600; letter-spacing: 0.02em;
      padding: 1px 6px; border-radius: 999px; pointer-events: none;
      background: rgba(17,17,17,.82); color: #f3f4f6;
      border: 1px solid #e11d48; line-height: 1.3;
    }
    html.light .lt-seen-chip {
      background: rgba(255,255,255,.9); color: #171717;
    }
    #fl-panel-search-wrap {
      width: 100%; box-sizing: border-box; padding: 2px 0 2px; margin: 0;
    }
    #fl-panel-search {
      width: 100%; box-sizing: border-box; padding: 5px 8px;
      background: var(--lt-bg-input); color: var(--lt-text);
      border: 1px solid var(--lt-border); border-radius: 6px;
      font: inherit; font-size: 12px; height: var(--lt-ctrl-h);
    }
    #fl-panel-search::placeholder { color: var(--lt-text-muted); }
    #fl-panel-search:focus { outline: none; border-color: var(--lt-accent); }
    .fl-tool-panel.lt-panel-search-miss { display: none !important; }
    html.light .lt-qa-bar button, html.light .lt-qa-bar a.lt-qa-btn {
      background: rgba(255,255,255,0.65); color: #525252; border-color: rgba(115,115,115,0.35);
    }
    html.light .lt-qa-bar button:hover, html.light .lt-qa-bar a.lt-qa-btn:hover {
      background: rgba(225, 29, 72, 0.08); border-color: rgba(225, 29, 72, 0.45); color: #111827;
    }
    html.light .lt-qa-bar.lt-qa-feed button, html.light .lt-qa-bar.lt-qa-feed a.lt-qa-btn {
      background: transparent; border-color: rgba(115, 115, 115, 0.4); color: #737373;
    }
    html.light .lt-row a { color: #262626; }
    html.light .life-btn:hover { border-color: #a3a3a3; }
    html.light .fl-suggest-row .fl-suggest-del { color: #737373; }

    /* Dock-styled confirm modal (replaces window.confirm for soft-block visible). */
    #fl-confirm-overlay {
      position: fixed; inset: 0; z-index: 2147483646;
      background: rgba(0,0,0,.55);
      display: flex; align-items: center; justify-content: center;
      padding: 16px; box-sizing: border-box;
    }
    #fl-confirm-dialog {
      width: min(320px, 100%);
      background: var(--lt-bg, #111111);
      color: var(--lt-text, #f3f4f6);
      border: 1px solid var(--lt-border, #2e2e2e);
      border-radius: var(--lt-radius, 8px);
      box-shadow: 0 12px 40px rgba(0,0,0,.45);
      padding: 14px 14px 12px;
      font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
      font-size: 13px; line-height: 1.45;
    }
    #fl-confirm-dialog .fl-confirm-msg { margin: 0 0 12px; color: var(--lt-text, #f3f4f6); }
    #fl-confirm-dialog .fl-confirm-actions {
      display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;
    }
    #fl-confirm-dialog .fl-confirm-actions .life-btn { margin: 0; width: auto; min-width: 72px; }
    html.light #fl-confirm-dialog {
      background: var(--lt-bg, #f9fafb);
      color: var(--lt-text, #171717);
      border-color: var(--lt-border, #d1d5db);
    }


`;
  (document.head || document.documentElement).appendChild(style);

  /* Keep the dock pinned to the right; Advanced chooses top / center / bottom. */
  let dockDidDrag = false;
  function applyDockPlacement(place) {
    const dock = document.getElementById("fl-tools-dock") || ensureDockRaw();
    const pos = place === "top" || place === "center" || place === "bottom" ? place : "bottom";
    try { localStorage.removeItem("fl_dock_top"); } catch (_) {}
    dock.classList.remove("dock-top", "dock-center", "dock-bottom");
    dock.classList.add("dock-" + pos);
    dock.style.left = "";
    dock.style.top = "";
    dock.style.bottom = "";
    dock.style.right = "12px";
    dock.style.transform = "";
    syncDockGrowDirection();
  }
  /* Keep the whole dock inside the viewport (8px margin). */
  function clampDockTop(top, dock) {
    const margin = 8;
    const h = Math.max(48, (dock && (dock.offsetHeight || dock.getBoundingClientRect().height)) || 48);
    const maxTop = Math.max(margin, window.innerHeight - h - margin);
    const n = Number(top);
    if (!Number.isFinite(n)) return margin;
    return Math.min(maxTop, Math.max(margin, n));
  }
  function applyDockTopPx(dock, top) {
    const clamped = clampDockTop(top, dock);
    dock.classList.remove("dock-center", "dock-bottom");
    dock.classList.add("dock-top");
    dock.style.top = clamped + "px";
    dock.style.bottom = "auto";
    dock.style.right = "12px";
    dock.style.left = "auto";
    dock.style.transform = "none";
    return clamped;
  }
  function applySavedDockTop(dock) {
    try {
      const top = parseInt(localStorage.getItem("fl_dock_top"), 10);
      if (!Number.isFinite(top)) return false;
      const clamped = applyDockTopPx(dock, top);
      if (clamped !== top) {
        try { localStorage.setItem("fl_dock_top", String(clamped)); } catch (_) {}
      }
      return true;
    } catch (_) {
      return false;
    }
  }
  function keepDockInWindow(dock) {
    dock = dock || document.getElementById("fl-tools-dock");
    if (!dock || !dock.classList.contains("dock-top") || !dock.style.top) return;
    const cur = parseInt(dock.style.top, 10);
    if (!Number.isFinite(cur)) return;
    const clamped = clampDockTop(cur, dock);
    if (clamped !== cur) {
      dock.style.top = clamped + "px";
      try { localStorage.setItem("fl_dock_top", String(clamped)); } catch (_) {}
    }
    syncDockGrowDirection();
  }
  function setupDockDrag(dock) {
    if (dock.dataset.dragReady) return;
    dock.dataset.dragReady = "1";
    let active = false, startY = 0, origTop = 0;
    dock.addEventListener("mousedown", (e) => {
      if (!e.target.closest(".fl-tool-header")) return;
      if (e.target.closest("input, textarea, select, label") && !e.target.closest(".fl-tool-chevron")) return;
      const r = dock.getBoundingClientRect();
      startY = e.clientY;
      origTop = r.top;
      active = true;
      dockDidDrag = false;
      dock.classList.add("dragging");
      e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
      if (!active) return;
      const dy = e.clientY - startY;
      if (Math.abs(dy) > 3) dockDidDrag = true;
      applyDockTopPx(dock, origTop + dy);
    });
    window.addEventListener("mouseup", () => {
      if (!active) return;
      active = false;
      dock.classList.remove("dragging");
      if (dockDidDrag) {
        const clamped = applyDockTopPx(dock, parseInt(dock.style.top, 10) || 8);
        try { localStorage.setItem("fl_dock_top", String(clamped)); } catch (_) {}
        syncDockGrowDirection();
      }
    });
    if (!setupDockDrag.resizeBound) {
      setupDockDrag.resizeBound = true;
      window.addEventListener("resize", () => {
        keepDockInWindow(document.getElementById("fl-tools-dock"));
      }, { passive: true });
    }
  }
  function ensureDockRaw() {
    let dock = document.getElementById("fl-tools-dock");
    if (!dock) {
      dock = document.createElement("div");
      dock.id = "fl-tools-dock";
      dock.setAttribute("role", "complementary");
      dock.setAttribute("aria-label", t("dockLabel"));
      document.body.appendChild(dock);
    } else {
      if (!dock.getAttribute("role")) dock.setAttribute("role", "complementary");
      if (!dock.getAttribute("aria-label")) dock.setAttribute("aria-label", t("dockLabel"));
    }
    return dock;
  }
  function ensureDock() {
    const existed = !!document.getElementById("fl-tools-dock");
    const dock = ensureDockRaw();
    setupDockDrag(dock);
    setupDockGrowObserver(dock);
    if (!existed) {
      if (!applySavedDockTop(dock)) applyDockPlacement((loadFilterSettings() || {}).dockAnchor || "bottom");
    }
    syncDockGrowDirection();
    return dock;
  }
  function syncDockGrowDirection() {
    const dock = document.getElementById("fl-tools-dock");
    if (!dock) return;
    if (dock.classList.contains("dock-top") && dock.style.top) {
      const cur = parseInt(dock.style.top, 10);
      if (Number.isFinite(cur)) {
        const clamped = clampDockTop(cur, dock);
        if (clamped !== cur) {
          dock.style.top = clamped + "px";
          try { localStorage.setItem("fl_dock_top", String(clamped)); } catch (_) {}
        }
      }
    }
    const r = dock.getBoundingClientRect();
    const nearBottom = dock.classList.contains("dock-bottom") || (r.bottom >= window.innerHeight - 56);
    dock.classList.toggle("lt-grow-up", nearBottom);
  }
  function setupDockGrowObserver(dock) {
    if (!dock || dock.dataset.growObs) return;
    dock.dataset.growObs = "1";
    const mo = new MutationObserver(() => { syncDockGrowDirection(); });
    mo.observe(dock, { subtree: true, attributes: true, attributeFilter: ["class"] });
    if (!setupDockGrowObserver.win) {
      setupDockGrowObserver.win = true;
      window.addEventListener("resize", syncDockGrowDirection, { passive: true });
    }
  }

  function dockTailAnchor() {
    return document.getElementById("fl-dock-actions")
      || document.getElementById("fl-jump-top");
  }
  /* Accordion: opening one panel collapses the others (Shortcuts included). */

  const LAST_PANEL_KEY = "fl_dock_open_panel";
  function notePanelOpen(id) {
    if (!id) return;
    try { localStorage.setItem(LAST_PANEL_KEY, id); } catch (_) {}
    markLastDockPanel();
  }
  function readLastPanel() {
    try { return localStorage.getItem(LAST_PANEL_KEY) || ""; } catch (_) { return ""; }
  }
  function setPanelOpenState(bodyId, toggleId, open) {
    const body = document.getElementById(bodyId);
    const btn = document.getElementById(toggleId);
    if (body) body.classList.toggle("fl-tool-hidden", !open);
    if (btn) {
      btn.textContent = open ? "▾" : "▸";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? t("collapsePanel") : t("expandPanel"));
      if (bodyId && !btn.getAttribute("aria-controls")) btn.setAttribute("aria-controls", bodyId);
    }
  }
  /* Migrate away from v5.26.0 Tools nest — put panels back on the dock. */
  function unnestFromToolsStack() {
    const tools = document.getElementById("fl-tools-panel");
    const dock = document.getElementById("fl-tools-dock");
    if (!dock) return;
    const tail = dockTailAnchor();
    const body = document.getElementById("fl-tools-body");
    const kids = body ? Array.from(body.children) : [];
    kids.forEach((el) => {
      el.classList.remove("lt-tools-nested");
      if (tail && tail.parentNode === dock) dock.insertBefore(el, tail);
      else dock.appendChild(el);
    });
    if (tools) tools.remove();
  }
  function collapseOtherPanels(exceptId) {
    function maybeCollapse(panelId, bodyId, toggleId, extra) {
      if (exceptId === panelId) return;
      if (extra && extra.indexOf(exceptId) !== -1) return;
      setPanelOpenState(bodyId, toggleId, false);
      if (panelId === "fl-filter-panel") {
        try { localStorage.setItem("fl_panel_collapsed", "1"); } catch (_) {}
      }
    }
    maybeCollapse("fl-filter-panel", "fl-panel-body", "fl-panel-toggle");
    maybeCollapse("flhp-panel", "flhp-main", "flhp-toggle", ["flhp-bar"]);
    maybeCollapse("fl-site-panel", "fl-site-body", "fl-site-toggle");
    maybeCollapse("fl-advanced-panel", "fl-advanced-body", "fl-advanced-toggle");
    maybeCollapse("fl-block-panel", "fl-block-body", "fl-block-toggle");
    maybeCollapse("fl-shortcuts-panel", "fl-shortcuts-body", "fl-shortcuts-toggle");
    if (exceptId) notePanelOpen(exceptId);
    syncDockGrowDirection();
  }  function panelBodyIsOpen(panel) {
    if (!panel) return false;
    const body = panel.querySelector(".fl-tool-body");
    if (!body) return false;
    return !body.classList.contains("fl-tool-hidden");
  }
  function syncOpenPanelHighlight() {
    document.querySelectorAll(".fl-tool-panel.lt-panel-open").forEach((el) => {
      el.classList.remove("lt-panel-open");
    });
    document.querySelectorAll("#fl-tools-dock > .fl-tool-panel").forEach((panel) => {
      if (panelBodyIsOpen(panel)) panel.classList.add("lt-panel-open");
    });
  }
  function markLastDockPanel() {
    const id = readLastPanel();
    document.querySelectorAll(".fl-tool-panel.lt-last-panel").forEach((el) => {
      el.classList.remove("lt-last-panel");
    });
    if (id && id !== "none" && id !== "fl-tools-panel") {
      const panel = document.getElementById(id);
      if (panel && panel.classList.contains("fl-tool-panel")) {
        panel.classList.add("lt-last-panel");
      }
    }
    syncOpenPanelHighlight();
  }
  /* Boot marks last panel only (no auto-expand). */
  function restoreLastDockPanel() {
    markLastDockPanel();
  }
  function escapeAttr(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
  /* On/off control: knob on the left means on (FetLife red track). */
  function chipFieldHtml(id, label, ph, value) {
    return '<label style="display:block;margin-bottom:4px;">' + label + "</label>" +
      '<input type="hidden" id="' + id + '" value="' + escapeAttr(value) + '">' +
      '<div class="fl-chip-meta" id="' + id + '-meta"></div>' +
      '<div class="fl-add-row"><input id="' + id + '-add" type="text" placeholder="' + escapeAttr(ph) + '" autocomplete="off">' +
      '<button type="button" class="life-btn life-btn-gray" id="' + id + '-btn">' + t("addTerm") + "</button></div>" +
      '<div class="fl-suggest" id="' + id + '-suggest"></div>' +
      '<div class="fl-chip-row" id="' + id + '-list"></div>';
  }

  function syncSwitchAria(input) {
    if (!input || !input.classList || !input.classList.contains("fl-switch-input")) return;
    input.setAttribute("aria-checked", input.checked ? "true" : "false");
  }
  function setupSwitchAriaSync() {
    if (setupSwitchAriaSync.bound) return;
    setupSwitchAriaSync.bound = true;
    document.addEventListener("change", (e) => {
      if (e.target && e.target.classList && e.target.classList.contains("fl-switch-input")) syncSwitchAria(e.target);
    }, true);
  }

  function switchHtml(id, label, on) {
    return '<label class="fl-switch"><span class="fl-switch-text">' + label +
      '</span><input id="' + id + '" type="checkbox" class="fl-switch-input" role="switch"' +
      (on ? " checked" : "") + ' aria-checked="' + (on ? "true" : "false") +
      '"><span class="toggleSwitch" aria-hidden="true"></span></label>';
  }

  /* UI strings (English). */
  const I18N = {
    en: {
      shortcuts: "Shortcuts",
      softSearch: "Search nickname",
      unsoft: "×",
      softCount: "{n} soft-blocked",
      softBackup: "Download list",
      blockPanel: "Soft-Block / Block",
      softVisitAlert: "Soft-blocked {name}",
      softVisitWhen: "Since {date}",
      softVisitWhy: "Why: {terms}",
      softVisitWhyNone: "Why: (no terms stored)",
      softVisitRemove: "Remove soft-block",
      softVisitRemoved: "Soft-block removed",
      ageRange: "Age Range",
      matchFiltersHint: "Age, gender, and role dim cards that do not match.",
      genderFilter: "Gender",
      genderPh: "e.g. M, F, NB",
      roleFilter: "Role",
      rolePh: "e.g. switch, sub",
      limitsFiltersHint: "Hard limits dim cards that match these terms.",
      limitsFilter: "Hard Limits",
      limitsPh: "e.g. abdl, diaper",
      hideGender: "Gender",
      hideRole: "Role",
      hideLimits: "Limits: {terms}",
      orgFilter: "Organization cards",
      orgShow: "Show",
      orgDim: "Dim",
      orgHide: "Hide",
      advancedSettings: "Advanced",
      nsfwPanel: "NSFW / SFW",
      profileSettings: "Filters",
      addTerm: "Add",
      chipActive: "{n} active",
      chipMore: "+{n} more",
      chipLess: "Show less",
      chipSaved: "{n} saved",
      clearSaved: "Clear saved",
      removeSaved: "Remove saved",
      combineMode: "Combine lists",
      combineAnd: "AND — match every list",
      combineOr: "OR — match any list",
      matchScope: "Match text in",
      scopeCard: "Whole card",
      scopeTag: "Name + tag line",
      scopeNick: "Nickname only",
      roleMode: "Role list",
      roleMust: "Must match",
      rolePrefer: "Prefer (soft dim if missing)",
      relSettings: "Relationship Settings",
      relHint: "On = show these cards. Off = hide them.",
      relNone: "People I do not follow",
      relFollowing: "People I follow",
      relFollowsYou: "People who follow me",
      relFriends: "Friends",
      infiniteScroll: "Enable Infinite Scroll",
      showing: "Showing {shown} of {total} loaded",
      loadNext: "Load Next {n}",
      noMorePages: "No more pages",
      loading: "Loading ({n})...",
      loadError: "Error loading — try again",
      showToasts: "Show text-match toasts",
      hideBanners: "Hide install / push banners",
      jumpTop: "Jump to top",
      lastPlace: "Last place",
      selectorWarn: "No member cards found on this list page. FetLife markup may have changed.",
      markupWarnFeed: "Home feed not recognized. FetLife markup may have changed — chips/filters may break.",
      markupWarnProfile: "Profile layout not recognized. FetLife markup may have changed — soft-block/highlights may break.",
      markupWarnList: "Member cards not found on this list. FetLife markup may have changed — filters may break.",
      excludeAlert: "Hard Limits matched on {name}",
      limitHitsWhy: "Matched: {terms}",
      limitHitsDismiss: "Dismiss",
      blockYes: "Block on FetLife",
      blockSoft: "Soft block",
      blockNo: "No",
      blockNoSure: "Are you sure? This prompt will not appear again for this profile.",
      blockNoConfirm: "Don't ask again",
      blockNoCancel: "Cancel",
      blockedOn: "Blocked {name} on {date}",
      unblockAsk: "Unblock {name}? They were blocked {date}.",
      unblockYes: "Yes, unblock",
      unblockKeep: "Keep blocked",
      nsfwMode: "NSFW mode",
      modeNsfw: "NSFW (no blur)",
      modeSfw: "SFW (blur on)",
      sfwBlur: "SFW blur strength",
      blurAvatars: "Also blur avatars and icons",
      blurVideos: "Also blur videos",
      hideAge: "Age {age} (range {min}–{max})",
      hideOrg: "Organization",
      hideRel: "Relationship filter",
      nsfwHint: "Only changes how already-visible images look. Does not unlock hidden or private media.",
      qaSoftBlock: "Soft-block",
      limitHistory: "Limit-hit history",
      limitHistSearch: "Search history",
      limitHistClear: "Clear history",
      limitHistDownload: "Download JSON",
      limitHistEmpty: "No limit hits logged",
      limitHistCount: "{n} logged",
      citiesFilter: "City / area",
      citiesPh: "e.g. miami, oregon, berlin",
      hideCity: "City / area",
      panelSearchPh: "Find in panels…",
      dimSeenToday: "Show Seen chip",
      showSeenChip: "Show Seen chip",
      seenChip: "Seen",
      seenChipTitle: "Last seen {date}",
      whyHidden: "Hidden: {reasons}",
      myCity: "My city",
      myCityPh: "e.g. portland, miami",
      sameCityOnly: "Same city only",
      hideSameCity: "Different city",
      locationSettings: "Location",
      softBlockVisible: "Soft-block visible",
      softBlockConfirm: "Soft-block {n} visible people on this page?",
      softBlockedN: "Soft-blocked {n} people",
      softBlockNone: "No visible people to soft-block",
      confirmOk: "Soft-block",
      confirmCancel: "Cancel",
      confirmTitle: "Confirm",
      dockLabel: "FL Tools",
      expandPanel: "Expand panel",
      collapsePanel: "Collapse panel",
    }
  };
  function t(key, vars) {
    let text = I18N.en[key] || key;
    if (vars) Object.keys(vars).forEach((k) => { text = text.replace(new RegExp("\\{" + k + "\\}", "g"), String(vars[k])); });
    return text;
  }

  /* Walk from a nickname link or wrapper up to the card we filter/highlight. */
  function visualCard(el) {
    if (!el) return null;
    if (el.matches && el.matches(VISUAL_CARD_SELECTOR)) return el;
    return (el.querySelector && el.querySelector(VISUAL_CARD_SELECTOR)) || el;
  }
  function closestCard(el) {
    if (!el) return null;
    const wrap = el.closest("[data-member-card]");
    return wrap ? visualCard(wrap) : el.closest(VISUAL_CARD_SELECTOR);
  }
  /* Collect unique member cards. Prefer [data-member-card], else one-name cards. */
  function getMemberCards(root) {
    root = root || document;
    const found = []; const seen = new Set();
    root.querySelectorAll("[data-member-card]").forEach((wrap) => {
      const card = visualCard(wrap);
      if (card && !seen.has(card)) { seen.add(card); found.push(card); }
    });
    if (found.length) return found;
    root.querySelectorAll(NAME_LINK_SELECTOR).forEach((a) => {
      const card = closestCard(a);
      if (!card || seen.has(card)) return;
      if ((card.querySelectorAll(NAME_LINK_SELECTOR) || []).length !== 1) return;
      seen.add(card); found.push(card);
    });
    return found;
  }
  function cardShell(card) { return (card.closest && card.closest("[data-member-card]")) || card; }
  function cardId(card) {
    const wrap = card.closest && card.closest("[data-member-card]");
    return (wrap && wrap.getAttribute("data-member-card")) || card.getAttribute("data-member-card") ||
      ((card.querySelector(NAME_LINK_SELECTOR) || {}).getAttribute("href")) || card.textContent.trim().substring(0, 40);
  }
  function pageKind() {
    const p = location.pathname || "";
    if (/\/kinksters(?:\/|$)/.test(p)) return "kinksters";
    if (/\/friends(?:\/|$)/.test(p)) return "friends";
    if (/\/following(?:\/|$)/.test(p)) return "following";
    if (/\/followers(?:\/|$)/.test(p)) return "followers";
    return "other";
  }
  /* Read JSON from localStorage, trying current key then legacy keys. */
  function readJsonKey(keys) {
    for (const key of keys) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed;
      } catch (_) {}
    }
    return null;
  }

  /* Filter state is sitewide so kinksters/friends/following share one profile. */
  const FILTER_KEY = "fl_profile_filter_settings";
  const FILTER_DEFAULTS = {
    minAge: "18", maxAge: "80", include: "", exclude: "",
    genders: "", roles: "", limits: "",
    minPics: "0", minVids: "0", minWritings: "0",
    hideOrgs: false, orgMode: "off", dimHidden: true,
    combineMode: "and", matchScope: "card", roleMode: "must", preferRoles: "",
    relFollow: true, relFollowing: true, relFollowsYou: true, relFriends: true,
    autoScroll: true, autoloadCount: "100", dockAnchor: "bottom", showToasts: true,
    hideBanners: false, collapsePosts: false, sortBy: "none",
    cities: "", myCity: "", sameCityOnly: false,
    showSeenChip: true, dimSeenToday: true
  };
  function loadFilterSettings() {
    const merged = Object.assign({}, FILTER_DEFAULTS, readJsonKey([FILTER_KEY, "fl_profile_filter_settings_v3", "fl_profile_filter_settings_v2"]) || {});
    if (merged.showSeenChip == null && merged.dimSeenToday != null) merged.showSeenChip = !!merged.dimSeenToday;
    if (merged.showSeenChip == null) merged.showSeenChip = true;
    merged.dimSeenToday = !!merged.showSeenChip;
    if (!merged.relFollow && !merged.relFollowing && !merged.relFollowsYou && !merged.relFriends) {
      merged.relFollow = merged.relFollowing = merged.relFollowsYou = merged.relFriends = true;
    }
    const limits = splitList(merged.limits).concat(splitList(merged.exclude));
    const seen = {};
    merged.limits = limits.filter((term) => { if (seen[term]) return false; seen[term] = true; return true; }).join(", ");
    merged.exclude = merged.limits;
    return merged;
  }
  function saveFilterSettings(settings) { localStorage.setItem(FILTER_KEY, JSON.stringify(settings)); }

  /* Parse "32 F switch • City" style lines. Orgs often have no age — skip age then. */
  const GENDER_TOKENS = { m:1, f:1, mtf:1, ftm:1, cd:1, tv:1, ts:1, is:1, b:1, gf:1, gq:1, nb:1, t:1, male:1, female:1, intersex:1, trans:1, "non-binary":1, nonbinary:1, agender:1, bigender:1, genderqueer:1, genderfluid:1 };
  const ROLE_AS_GENDER = { switch:1, sub:1, dom:1, dominant:1, submissive:1, master:1, mistress:1, slave:1, top:1, bottom:1, sadist:1, masochist:1, brat:1, daddy:1, mommy:1, kinkster:1, fetishist:1, voyeur:1, exhibitionist:1, switchy:1 };
  function parseCardTag(card) {
    const tag = card.querySelector(".text-sm.font-bold.text-gray-300");
    const text = ((tag && tag.textContent) || card.textContent || "").replace(/\s+/g, " ").trim();
    const match = text.match(/^(\d{2,4})\s*([A-Za-z+][\w+\/-]{0,24})?\s*(.*)$/);
    if (!match) return { age: null, gender: "", role: "" };
    const age = parseInt(match[1], 10);
    let gender = (match[2] || "").toLowerCase();
    let role = (match[3] || "").toLowerCase();
    if (gender && !GENDER_TOKENS[gender] && (ROLE_AS_GENDER[gender] || gender.length > 6)) {
      role = (gender + " " + role).trim();
      gender = "";
    }
    return {
      age: (Number.isFinite(age) && age >= 18 && age <= 9999) ? age : null,
      gender: gender,
      role: role
    };
  }
  function genderIsUnset(parsed) { return !parsed || !parsed.gender; }
  function genderMatches(parsed, genders) {
    if (!genders.length) return true;
    const unset = genders.some((g) => /^(none|unset|blank|unknown|\?|-)$/.test(g));
    if (genderIsUnset(parsed)) return unset;
    return genders.some((g) => parsed.gender === g || parsed.gender.indexOf(g) !== -1);
  }
  function isOrgCard(card) {
    const text = (card.textContent || "").toLowerCase();
    return (/\borganization\b|\bgroup\b/.test(text)) && !parseCardTag(card).age;
  }
  function relationLabel(card) {
    const bits = Array.from(card.querySelectorAll("button, a, span.inline-flex")).map((el) => (el.textContent || "").replace(/\s+/g, " ").trim()).filter(Boolean);
    return (bits.join(" | ") || card.textContent || "").replace(/\s+/g, " ").trim();
  }
  /* Relationship flags from button labels + the follows-you SVG path. */
  function isFollowsYou(card) {
    return !![].find.call(card.querySelectorAll("path"), (p) => (p.getAttribute("d") || "").indexOf("M12 1v2H0v2h12v2l4-3z") === 0);
  }
  function currentUserNick() {
    const u = (window.FL && FL.user) || {};
    return String(u.nickname || String(u.profileUrl || "").replace(/^\//, "") || "").toLowerCase();
  }
  function isOwnRelationList() {
    const p = location.pathname || "";
    const me = currentUserNick();
    const id = window.FL && FL.user && String(FL.user.id || "");
    if (/^\/friends(?:\/|$)/.test(p)) return true;
    const m = p.match(/^\/([A-Za-z0-9_.-]+)\/(friends|following|followers)(?:\/|$)/i);
    if (m && me && m[1].toLowerCase() === me) return true;
    if (id && new RegExp("/users/" + id + "/(friends|following|followers)(?:/|$)", "i").test(p)) return true;
    return false;
  }
  function isFollowingThem(card) { return /following/i.test(relationLabel(card)) && !isFollowsYou(card); }
  function isFriend(card) {
    if (pageKind() === "friends" && isOwnRelationList()) return true;
    const btn = card.querySelector("turbo-frame[id^='relation_button'] button, turbo-frame[id^='relation_button'] span.inline-flex");
    const txt = ((btn && btn.textContent) || "").replace(/\s+/g, " ").trim();
    return /^friends?$/i.test(txt);
  }  function parseCount(card, re) {
    const m = (card.textContent || "").match(re);
    return m ? parseInt(m[1].replace(/,/g, ""), 10) : 0;
  }
  /* Media totals as shown on the card ("12 pics", "1 vid", "3 writings"). */
  function parsePicCount(card) { return parseCount(card, /(\d[\d,]*)\s*(?:pics?|photos?|pictures?)/i); }
  function parseVidCount(card) { return parseCount(card, /(\d[\d,]*)\s*(?:vids?|videos?)/i); }
  function parseWritingCount(card) { return parseCount(card, /(\d[\d,]*)\s*(?:writings?|posts?)/i); }
  function splitList(s) { return String(s || "").split(/[,;\n]+/).map((x) => x.trim().toLowerCase()).filter(Boolean); }
  function textHasTerm(text, term) {
    const raw = String(term || "").trim().toLowerCase();
    if (!raw) return false;
    return String(text || "").toLowerCase().indexOf(raw) !== -1;
  }


  function cardHaystack(card, scope, parsed) {
    const nick = String(cardNickname(card) || "").toLowerCase();
    const tagEl = card.querySelector(".text-sm.font-bold.text-gray-300");
    const tag = ((tagEl && tagEl.textContent) || ((parsed && (parsed.gender + " " + parsed.role)) || "")).toLowerCase();
    const all = String(card.textContent || "").toLowerCase();
    if (scope === "nick") return nick;
    if (scope === "tag") return (nick + " " + tag).trim();
    return all;
  }
  /* Location line on member cards: "City, Region" / "Oregon, United States". */
  function cardLocationText(card) {
    if (!card) return "";
    const bits = [];
    const seen = {};
    /* Prefer the dedicated location line under the age/gender tag on kinksters cards. */
    const tag = card.querySelector(".text-sm.font-bold.text-gray-300");
    if (tag) {
      const row = tag.closest("div");
      const locLine = row && row.nextElementSibling;
      if (locLine && /text-sm/.test(locLine.className || "") && !locLine.querySelector("a")) {
        const t = String(locLine.textContent || "").replace(/\s+/g, " ").trim();
        if (t && t.length >= 2 && t.length <= 80) bits.push(t.toLowerCase());
      }
    }
    card.querySelectorAll("span, div").forEach((el) => {
      if (el.querySelector && el.querySelector("a, button, svg, img, input, strong")) {
        /* Prefer leaf-ish nodes; nested wrappers still OK if they only have text+formatting. */
        if (el.children && el.children.length && el.querySelector("a, button, svg, img, input")) return;
      }
      const t = String(el.textContent || "").replace(/\s+/g, " ").trim();
      if (!t || t.length < 2 || t.length > 80) return;
      if (/^\d{2,4}\s/.test(t)) return;
      if (/\b(pics?|vids?|videos?|writings?|posts?)\b/i.test(t)) return;
      const commaLoc = /^[A-Za-zÀ-ÿ0-9].*,\s*[A-Za-zÀ-ÿ]/.test(t);
      const plainLoc = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ .'-]{1,40}$/.test(t) && !/^(follow|following|friends?)$/i.test(t);
      if (!commaLoc && !plainLoc) return;
      const low = t.toLowerCase();
      if (seen[low]) return;
      seen[low] = true;
      bits.push(low);
    });
    if (bits.length) return bits.join(" | ");
    return String(card.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }
  let lastTextToastKey = "";
  /* Generic dock toast helper. */
  function showTextToast(msg, persist) {
    let toast = document.getElementById("fl-text-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "fl-text-toast";
      toast.className = "life-toast";
      toast.title = "Dismiss";
      toast.addEventListener("click", () => { toast.style.display = "none"; });
      ensureDock().appendChild(toast);
    }
    toast.textContent = persist ? msg + "  ×" : msg;
    toast.style.display = "";
    clearTimeout(showTextToast.hideTimer);
    if (!persist) {
      showTextToast.hideTimer = setTimeout(() => { toast.style.display = "none"; }, 6000);
    }
  }
  function reportTextMatches() {
    const toast = document.getElementById("fl-text-toast");
    if (toast) toast.style.display = "none";
  }
  function toInt(v, fb) { const n = parseInt(v, 10); return Number.isFinite(n) ? n : fb; }
  function val(id) { const el = document.getElementById(id); return el ? el.value : ""; }
  function chipValue(id) {
    const hold = document.getElementById(id);
    if (hold) return hold.value || "";
    return val(id);
  }
  const TERM_LIB_KEY = "fl_term_library";
  const CHIP_PREVIEW = 3;
  const chipExpanded = {};
  function chipLibKey(id) {
    return String(id || "").replace(/^fl-/, "");
  }
  function loadTermLib() {
    const lib = Object.assign({ genders: [], roles: [], limits: [], include: [], exclude: [], cities: [] }, readJsonKey([TERM_LIB_KEY]) || {});
    const merged = [].concat(lib.limits || [], lib.exclude || []);
    const seen = {};
    lib.limits = merged.filter((term) => { if (seen[term]) return false; seen[term] = true; return true; });
    return lib;
  }
  function saveTermLib(lib) {
    try { localStorage.setItem(TERM_LIB_KEY, JSON.stringify(lib)); } catch (_) {}
  }
  function rememberTerms(id, terms) {
    const key = chipLibKey(id);
    const lib = loadTermLib();
    const bucket = Array.isArray(lib[key]) ? lib[key].slice() : [];
    terms.forEach((term) => {
      const t0 = String(term || "").trim().toLowerCase();
      if (t0 && bucket.indexOf(t0) === -1) bucket.push(t0);
    });
    lib[key] = bucket.sort();
    saveTermLib(lib);
  }
  function forgetTerm(id, term) {
    const key = chipLibKey(id);
    const lib = loadTermLib();
    lib[key] = (lib[key] || []).filter((item) => item !== term);
    saveTermLib(lib);
  }
  function afterChipChange(id) {
    const hold = document.getElementById(id);
    if (!hold) return;
    autoApplyFilters();
  }
  function clearSavedTerms(id) {
    const key = chipLibKey(id);
    const lib = loadTermLib();
    lib[key] = [];
    saveTermLib(lib);
    const hold = document.getElementById(id);
    if (hold) {
      if (id === "fl-limits") {
        /* Hard limits: Clear saved wipes active + history in one click. */
        hold.value = "";
        afterChipChange(id);
      } else {
        /* Other fields: drop unused history, keep active terms in the library. */
        rememberTerms(id, splitList(hold.value));
      }
    }
    renderChipList(id);
    const input = document.getElementById(id + "-add");
    if (input) renderTermSuggest(id, input.value);
  }
  function removeSavedTerm(id, term) {
    const hold = document.getElementById(id);
    forgetTerm(id, term);
    if (hold) {
      const items = splitList(hold.value).filter((item) => item !== term);
      hold.value = items.join(", ");
    }
    renderChipList(id);
    afterChipChange(id);
    const input = document.getElementById(id + "-add");
    if (input) renderTermSuggest(id, input.value);
  }
  function renderChipList(id) {
    const hold = document.getElementById(id);
    const box = document.getElementById(id + "-list");
    const meta = document.getElementById(id + "-meta");
    if (!hold || !box) return;
    const items = splitList(hold.value);
    rememberTerms(id, items);
    const lib = loadTermLib()[chipLibKey(id)] || [];
    const inactive = lib.filter((term) => items.indexOf(term) === -1);
    if (meta) {
      meta.innerHTML = "";
      const label = document.createElement("span");
      label.textContent = t("chipActive", { n: items.length }) + (lib.length ? " · " + t("chipSaved", { n: lib.length }) : "");
      meta.appendChild(label);
      if (inactive.length || (id === "fl-limits" && items.length)) {
        const clear = document.createElement("button");
        clear.type = "button";
        clear.className = "fl-chip-clear-saved";
        clear.textContent = t("clearSaved");
        clear.title = t("clearSaved");
        clear.addEventListener("click", (e) => {
          e.stopPropagation();
          clearSavedTerms(id);
        });
        meta.appendChild(clear);
      }
    }
    box.innerHTML = "";
    const open = !!chipExpanded[id];
    const activeShown = open ? items : items.slice(0, CHIP_PREVIEW);
    function addChip(term, savedOnly) {
      const chip = document.createElement("span");
      chip.className = "fl-chip" + (savedOnly ? " fl-chip-saved" : "");
      chip.appendChild(document.createTextNode(term));
      const x = document.createElement("button");
      x.type = "button";
      x.textContent = "×";
      x.title = savedOnly ? t("removeSaved") : t("removeSaved");
      x.addEventListener("click", (e) => {
        e.stopPropagation();
        removeSavedTerm(id, term);
      });
      chip.appendChild(x);
      if (savedOnly) {
        chip.title = "Click × to remove from saved";
        chip.addEventListener("click", (e) => {
          if (e.target.closest("button")) return;
          e.stopPropagation();
          const cur = splitList(hold.value);
          if (cur.indexOf(term) === -1) {
            hold.value = cur.concat([term]).join(", ");
            rememberTerms(id, [term]);
            renderChipList(id);
            afterChipChange(id);
          }
        });
      }
      box.appendChild(chip);
    }
    activeShown.forEach((term) => addChip(term, false));
    if (items.length > CHIP_PREVIEW) {
      const more = document.createElement("button");
      more.type = "button";
      more.className = "fl-chip-more";
      more.textContent = open ? t("chipLess") : t("chipMore", { n: items.length - CHIP_PREVIEW });
      more.addEventListener("click", (e) => {
        e.stopPropagation();
        chipExpanded[id] = !open;
        renderChipList(id);
      });
      box.appendChild(more);
    }
    const savedOpen = !!chipExpanded[id + "-saved"];
    const savedShown = savedOpen ? inactive : inactive.slice(0, CHIP_PREVIEW);
    savedShown.forEach((term) => addChip(term, true));
    if (inactive.length > CHIP_PREVIEW) {
      const moreSaved = document.createElement("button");
      moreSaved.type = "button";
      moreSaved.className = "fl-chip-more";
      moreSaved.textContent = savedOpen ? t("chipLess") : t("chipMore", { n: inactive.length - CHIP_PREVIEW });
      moreSaved.addEventListener("click", (e) => {
        e.stopPropagation();
        chipExpanded[id + "-saved"] = !savedOpen;
        renderChipList(id);
      });
      box.appendChild(moreSaved);
    }
  }
  function renderTermSuggest(id, query) {
    const box = document.getElementById(id + "-suggest");
    const hold = document.getElementById(id);
    if (!box || !hold) return;
    const active = splitList(hold.value);
    const q = String(query || "").toLowerCase();
    const lib = loadTermLib()[chipLibKey(id)] || [];
    const rows = lib.filter((term) => !q || term.indexOf(q) !== -1).slice(0, 12);
    box.innerHTML = "";
    if (!rows.length) { box.classList.remove("open"); return; }
    rows.forEach((term) => {
      const on = active.indexOf(term) !== -1;
      const wrap = document.createElement("div");
      wrap.className = "fl-suggest-row";
      const row = document.createElement("button");
      row.type = "button";
      row.className = "fl-suggest-pick" + (on ? "" : " off");
      row.innerHTML = "<span>" + escapeAttr(term) + "</span><span>" + (on ? "✓" : "+") + "</span>";
      row.addEventListener("mousedown", (e) => {
        e.preventDefault();
        if (on) hold.value = active.filter((item) => item !== term).join(", ");
        else hold.value = active.concat([term]).join(", ");
        renderChipList(id);
        afterChipChange(id);
        renderTermSuggest(id, document.getElementById(id + "-add").value);
      });
      const del = document.createElement("button");
      del.type = "button";
      del.className = "fl-suggest-del";
      del.textContent = "×";
      del.title = t("removeSaved");
      del.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeSavedTerm(id, term);
      });
      wrap.appendChild(row);
      wrap.appendChild(del);
      box.appendChild(wrap);
    });
    box.classList.add("open");
  }

  function bindChipField(id) {
    const input = document.getElementById(id + "-add");
    const add = document.getElementById(id + "-btn");
    const hold = document.getElementById(id);
    if (!input || !hold) return;
    if (id === "fl-genders") rememberTerms(id, ["none"]);
    function commit() {
      const next = input.value.trim();
      if (!next) return;
      const items = splitList(hold.value);
      next.split(/[,;]+/).map((x) => x.trim()).filter(Boolean).forEach((term) => {
        if (items.indexOf(term.toLowerCase()) === -1) items.push(term.toLowerCase());
      });
      hold.value = items.join(", ");
      rememberTerms(id, items);
      input.value = "";
      renderChipList(id);
      autoApplyFilters();
      const sug = document.getElementById(id + "-suggest");
      if (sug) sug.classList.remove("open");
    }
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); commit(); }
      if (e.key === "Escape") {
        const sug = document.getElementById(id + "-suggest");
        if (sug) sug.classList.remove("open");
      }
    });
    input.addEventListener("focus", () => renderTermSuggest(id, input.value));
    input.addEventListener("input", () => renderTermSuggest(id, input.value));
    input.addEventListener("blur", () => {
      setTimeout(() => {
        const sug = document.getElementById(id + "-suggest");
        if (sug) sug.classList.remove("open");
      }, 180);
    });
    if (add) add.addEventListener("click", (e) => { e.stopPropagation(); commit(); });
    renderChipList(id);
  }
  function autoApplyFilters() {
    const next = getCurrentFilterSettings();
    saveFilterSettings(next);
    applyFilter(next);
    applyExcludeBlur(next);
    const btn = document.getElementById("fl-load-more");
    if (btn && !btn.disabled) btn.textContent = t("loadNext", { n: currentBatchSize() });
  }
  function checked(id) { const el = document.getElementById(id); return !!(el && el.checked); }

  let isAutoLoading = false, currentNextPageUrl = null;
  const seenMemberIds = new Set();
  function registerExistingCards() { getMemberCards().forEach((c) => seenMemberIds.add(cardId(c))); }

  function shortWhyLabel(reason) {
    const s = String(reason || "").trim();
    if (!s) return "";
    if (/^Age\b/i.test(s)) return "age";
    if (/^Limits:/i.test(s)) return "hard limits";
    if (/^Gender$/i.test(s)) return "gender";
    if (/^Role$/i.test(s)) return "role";
    if (/^Organization$/i.test(s)) return "org";
    if (/^Relationship/i.test(s)) return "relationship";
    if (/^City/i.test(s)) return "city";
    if (/^Different city/i.test(s)) return "city";
    return s.split(":")[0].trim().slice(0, 28).toLowerCase();
  }
  function clearWhyHiddenMarkers(shell, face) {
    if (shell) {
      shell.removeAttribute("title");
      shell.removeAttribute("data-lt-why");
      shell.querySelectorAll(".lt-why-hidden").forEach((n) => n.remove());
    }
    if (face && face !== shell) {
      face.removeAttribute("title");
      face.removeAttribute("data-lt-why");
      face.querySelectorAll(".lt-why-hidden").forEach((n) => n.remove());
    }
  }
  function applyWhyHiddenMarkers(shell, face, reasons, dimmed) {
    const labels = [];
    const seen = {};
    (reasons || []).forEach((r) => {
      const lab = shortWhyLabel(r);
      if (!lab || seen[lab]) return;
      seen[lab] = true;
      labels.push(lab);
    });
    if (!labels.length) return;
    const title = t("whyHidden", { reasons: labels.join(" · ") });
    if (shell) {
      shell.setAttribute("title", title);
      shell.setAttribute("data-lt-why", labels.join("|"));
    }
    if (face) {
      face.setAttribute("title", title);
      face.setAttribute("data-lt-why", labels.join("|"));
    }
    if (dimmed && face) {
      const badge = document.createElement("span");
      badge.className = "lt-why-hidden";
      badge.textContent = labels.join(" · ");
      badge.title = title;
      face.appendChild(badge);
    }
  }

  /* Show, dim, or hide each card. Relation toggles: on = keep, off = drop. */
  function applyFilter(settings) {
    if (isBlockedSettingsPage()) {
      revealAllMemberCards();
      return;
    }
    const genders = splitList(settings.genders);
    const roles = splitList(settings.roles);
    const limits = splitList(settings.limits).concat(splitList(settings.exclude));
    const cities = splitList(settings.cities);
    const myCity = String(settings.myCity || "").trim().toLowerCase();
    const sameCityOnly = !!settings.sameCityOnly && !!myCity;
    const preferRoles = splitList(settings.preferRoles);
    const minAge = settings.minAge === "" || settings.minAge == null ? 18 : toInt(settings.minAge, 18);
    const maxAge = settings.maxAge === "" || settings.maxAge == null ? null : toInt(settings.maxAge, null);
    const combineOr = settings.combineMode === "or";
    const scope = settings.matchScope || "card";
    const rolePrefer = settings.roleMode === "prefer";
    const relSelected = [];
    if (settings.relFollow) relSelected.push("follow");
    if (settings.relFollowing) relSelected.push("following");
    if (settings.relFollowsYou) relSelected.push("followsYou");
    if (settings.relFriends) relSelected.push("friends");
    const cards = getMemberCards();
    let shown = 0;
    cards.forEach((card) => {
      seenMemberIds.add(cardId(card));
      const shell = cardShell(card);
      const parsed = parseCardTag(card);
      const age = parsed.age;
      const hay = cardHaystack(card, scope, parsed);
      const hard = [];
      const soft = [];
      let score = 100;
      if (age !== null && !isOrgCard(card)) {
        if (age < minAge || (maxAge !== null && age > maxAge)) {
          hard.push(t("hideAge", { age: age, min: minAge, max: maxAge == null ? "9999" : maxAge }));
          score -= 40;
        }
      }
      const genderPass = genderMatches(parsed, genders);
      const rolePass = !roles.length || !parsed.role || roles.some((r) => parsed.role.indexOf(r) !== -1);
      const groups = [];
      if (genders.length) groups.push(genderPass);
      if (roles.length && !rolePrefer) groups.push(rolePass);
      if (groups.length) {
        const ok = combineOr ? groups.some(Boolean) : groups.every(Boolean);
        if (!ok) {
          if (genders.length && !genderPass) hard.push(t("hideGender"));
          if (roles.length && !rolePrefer && !rolePass) hard.push(t("hideRole"));
          score -= 35;
        }
      }
      if ((rolePrefer && roles.length && !rolePass) || (preferRoles.length && parsed.role && !preferRoles.some((r) => parsed.role.indexOf(r) !== -1))) {
        soft.push(t("hideRole"));
        score -= 20;
      }
      const limitHits = limits.filter((term) => textHasTerm(hay, term));
      if (limitHits.length) {
        hard.push(t("hideLimits", { terms: limitHits.join(", ") }));
        score -= 45;
      }
      /* Hard limits replaced the old free-text exclude list (same storage key lineage). */
      if ((settings.orgMode === "hide" || settings.orgMode === "dim" || settings.hideOrgs) && isOrgCard(card)) hard.push(t("hideOrg"));
      const relBtn = card.querySelector("form[action*='follow'] button, turbo-frame[id^='relation_button'] button, turbo-frame[id^='relation_button'] span.inline-flex");
      const relTxt = ((relBtn && relBtn.textContent) || "").replace(/\s+/g, " ").trim();
      const flags = {
        follow: /^follow$/i.test(relTxt) || !!card.querySelector("form[action$='/follow']"),
        following: /^following\b/i.test(relTxt),
        followsYou: isFollowsYou(card),
        friends: isFriend(card)
      };
      const knowsRel = !!(relBtn || flags.followsYou || (pageKind() === "friends" && isOwnRelationList()));
      if (knowsRel && !relSelected.some((k) => flags[k])) hard.push(t("hideRel"));
      let cityMiss = false;
      const locHay = (cardLocationText(card) + " " + String(card.textContent || "")).toLowerCase();
      if (cities.length) {
        if (!cities.some((tok) => locHay.indexOf(tok) !== -1)) {
          cityMiss = true;
          hard.push(t("hideCity"));
          score -= 50;
        }
      }
      if (sameCityOnly && locHay.indexOf(myCity) === -1) {
        cityMiss = true;
        hard.push(t("hideSameCity"));
        score -= 50;
      }
      const nick = cardNickname(card);
      const blocked = loadBlockReason(nick);
      const reasons = hard.concat(soft);
      const visible = reasons.length === 0 && !blocked;
      const face = cardFace(card);
      shell.classList.remove("flhp-dim", "flhp-dim-soft", "flhp-dim-hard", "lt-seen-today");
      if (face) face.querySelectorAll(".lt-seen-chip").forEach((n) => n.remove());
      face.classList.remove("flhp-dim", "flhp-dim-soft", "flhp-dim-hard");
      clearWhyHiddenMarkers(shell, face);
      const orgOnly = hard.length === 1 && hard[0] === t("hideOrg") && !soft.length;
      const hideOrg = settings.orgMode === "hide" || (settings.hideOrgs && settings.orgMode !== "dim");
      if (blocked) {
        applyWhyHiddenMarkers(shell, face, ["soft-block"], false);
        shell.style.display = "none";
        face.classList.add("lt-soft-blocked");
        face.onclick = function (e) { e.preventDefault(); e.stopPropagation(); };
      } else if (cityMiss) {
        applyWhyHiddenMarkers(shell, face, reasons, false);
        shell.style.display = "none";
      } else if (visible) {
        shell.style.display = "";
        shown += 1;
      } else if (orgOnly && hideOrg) {
        applyWhyHiddenMarkers(shell, face, reasons, false);
        shell.style.display = "none";
      } else {
        shell.style.display = "";
        const cls = hard.length || score <= 55 ? "flhp-dim-hard" : (soft.length ? "flhp-dim-soft" : "flhp-dim");
        face.classList.add(cls);
        applyWhyHiddenMarkers(shell, face, reasons, true);
        shown += 1;
      }
    });
    applySeenChips(settings);
    const counter = document.getElementById("fl-filter-count");
    if (counter) counter.textContent = t("showing", { shown: shown, total: cards.length });
    reportTextMatches(settings);
    if (isListPage()) {
      enhanceMemberCardActions();
    enhanceFeedStoryActions();
    }
  }
  function getCurrentFilterSettings() {
    return {
      minAge: val("fl-min-age") || "18", maxAge: val("fl-max-age"),
      include: "",
      genders: chipValue("fl-genders"), roles: chipValue("fl-roles"), limits: chipValue("fl-limits"),
      exclude: chipValue("fl-limits"),
      minPics: loadFilterSettings().minPics, minVids: loadFilterSettings().minVids, minWritings: loadFilterSettings().minWritings,
      hideOrgs: (val("fl-org-mode") || loadFilterSettings().orgMode || "off") === "hide", orgMode: val("fl-org-mode") || loadFilterSettings().orgMode || "off",
      dimHidden: true,
      relFollow: checked("fl-rel-follow"), relFollowing: checked("fl-rel-following"),
      relFollowsYou: checked("fl-rel-followsyu"), relFriends: checked("fl-rel-friends"),
      autoScroll: checked("fl-auto-scroll"), autoloadCount: val("fl-autoload-count") || "100",
      dockAnchor: val("fl-dock-anchor") || "bottom",
      showToasts: checked("fl-show-toasts"),
      hideBanners: checked("fl-hide-banners"),
      collapsePosts: false, sortBy: val("fl-sort-by") || "none",
      combineMode: val("fl-combine-mode") || loadFilterSettings().combineMode || "and",
      matchScope: val("fl-match-scope") || loadFilterSettings().matchScope || "card",
      roleMode: val("fl-role-mode") || loadFilterSettings().roleMode || "must",
      preferRoles: document.getElementById("fl-prefer-roles") ? chipValue("fl-prefer-roles") : (loadFilterSettings().preferRoles || ""),
      cities: chipValue("fl-cities"),
      myCity: val("fl-my-city") || loadFilterSettings().myCity || "",
      sameCityOnly: document.getElementById("fl-same-city-only") ? checked("fl-same-city-only") : !!loadFilterSettings().sameCityOnly,
      showSeenChip: document.getElementById("fl-show-seen-chip")
        ? checked("fl-show-seen-chip")
        : (document.getElementById("fl-dim-seen-today") ? checked("fl-dim-seen-today") : showSeenChipEnabled(loadFilterSettings())),
      dimSeenToday: document.getElementById("fl-show-seen-chip")
        ? checked("fl-show-seen-chip")
        : (document.getElementById("fl-dim-seen-today") ? checked("fl-dim-seen-today") : showSeenChipEnabled(loadFilterSettings()))
    };
  }
  function currentBatchSize() { return Math.min(500, Math.max(20, toInt(val("fl-autoload-count") || loadFilterSettings().autoloadCount, 100))); }
  function pageNumFromHref(href) {
    try {
      const u = new URL(href, location.origin);
      const p = u.searchParams.get("page");
      return p ? parseInt(p, 10) : 1;
    } catch (_) {
      return 1;
    }
  }
  function isListPage() {
    return /\/(kinksters|friends|following|followers|favorites|crushes|search)(?:\/|$)/.test(location.pathname || "");
  }
  /* Blocked list: never infinite-scroll or hide/dim cards. */
  function isBlockedSettingsPage() {
    return /^\/settings\/blocked(?:\/|$)/i.test(location.pathname || "");
  }
  function revealAllMemberCards() {
    getMemberCards().forEach((card) => {
      const shell = cardShell(card);
      const face = typeof cardFace === "function" ? cardFace(card) : card;
      if (shell) {
        shell.style.display = "";
        shell.classList.remove("flhp-dim", "flhp-dim-soft", "flhp-dim-hard");
      }
      if (face && face !== shell) {
        face.classList.remove("flhp-dim", "flhp-dim-soft", "flhp-dim-hard");
      }
      clearWhyHiddenMarkers(shell, face);
    });
  }
  /* Next list page: rel=next, then page=N+1, then synthesize ?page= on list URLs. */
  function findNextPageUrl(root) {
    root = root || document;
    const rel = root.querySelector('a[rel="next"]');
    if (rel && rel.getAttribute("href")) return new URL(rel.getAttribute("href"), location.origin).href;
    const currentNum = pageNumFromHref(root === document ? location.href : (currentNextPageUrl || location.href));
    let best = null;
    let bestNum = Infinity;
    root.querySelectorAll('a[href*="page="]').forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      const abs = new URL(href, location.origin).href;
      const n = pageNumFromHref(abs);
      if (n > currentNum && n < bestNum) {
        bestNum = n;
        best = abs;
      }
    });
    if (best) return best;
    if (isListPage()) {
      const u = new URL(currentNextPageUrl || location.href, location.origin);
      u.searchParams.set("page", String(pageNumFromHref(u.href) + 1));
      if (u.href !== (currentNextPageUrl || location.href)) return u.href;
    }
    return null;
  }
  async function fetchPage(url) {
    const res = await fetch(url, { credentials: "include" });
    const doc = new DOMParser().parseFromString(await res.text(), "text/html");
    const cards = [];
    doc.querySelectorAll("[data-member-card]").forEach((n) => cards.push(n));
    if (!cards.length) getMemberCards(doc).forEach((n) => cards.push(cardShell(n)));
    currentNextPageUrl = url;
    return { cards: cards, nextUrl: findNextPageUrl(doc) };
  }
  function cardContainer() {
    const first = getMemberCards()[0];
    return first ? cardShell(first).parentElement : null;
  }
  /* Fetch extra result pages and append unseen cards. 3s gap if more than one page. */
  async function loadNextPages(opts) {
    opts = opts || {};
    if (isBlockedSettingsPage()) return;
    const btn = document.getElementById("fl-load-more");
    const countInput = document.getElementById("fl-autoload-count");
    if (!currentNextPageUrl) currentNextPageUrl = findNextPageUrl(document);
    if (!currentNextPageUrl) { if (btn) { btn.textContent = t("noMorePages"); btn.disabled = true; } return; }
    const container = cardContainer();
    const maxPages = opts.pages != null ? opts.pages : 1;
    if (countInput) countInput.disabled = true;
    if (btn) btn.disabled = true;
    let emptyStreak = 0;
    for (let i = 0; i < maxPages; i += 1) {
      if (i > 0) await new Promise((resolve) => setTimeout(resolve, 3000));
      if (!currentNextPageUrl) { if (btn) btn.textContent = t("noMorePages"); break; }
      if (btn) btn.textContent = t("loading", { n: i + 1 });
      try {
        const before = getMemberCards().length;
        const pack = await fetchPage(currentNextPageUrl);
        currentNextPageUrl = pack.nextUrl;
        let added = 0;
        if (container) pack.cards.forEach((node) => {
          const id = cardId(visualCard(node) || node);
          if (!seenMemberIds.has(id)) {
            seenMemberIds.add(id);
            container.appendChild(node);
            added += 1;
          }
        });
        const y = window.scrollY;
        applyFilter(getCurrentFilterSettings());
       
        if (Math.abs((window.scrollY || 0) - y) > 2) window.scrollTo(0, y);
        /* next page appended */
        if (!added) emptyStreak += 1;
        else emptyStreak = 0;
        if (emptyStreak >= 2 || getMemberCards().length === before && !pack.nextUrl) {
          currentNextPageUrl = null;
          break;
        }
      } catch (err) {
        if (btn) { btn.textContent = t("loadError"); btn.disabled = false; }
        if (countInput) countInput.disabled = false;
        console.error("FL_Tools Filter Error:", err);
        return;
      }
    }
    if (countInput) countInput.disabled = false;
    if (btn && currentNextPageUrl) { btn.textContent = t("loadNext", { n: currentBatchSize() }); btn.disabled = false; }
    else if (btn) { btn.textContent = t("noMorePages"); btn.disabled = true; }
  }
  /* When enabled, load the next batch as the user nears the bottom. */
  function setupInfiniteScroll() {
    if (setupInfiniteScroll.bound) return;
    setupInfiniteScroll.bound = true;
    window.addEventListener("scroll", () => {
      if (isBlockedSettingsPage()) return;
      const enabled = document.getElementById("fl-auto-scroll")
        ? document.getElementById("fl-auto-scroll").checked
        : !!loadFilterSettings().autoScroll;
      if (!enabled || isAutoLoading) return;
      const left = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - ((window.scrollY || 0) + window.innerHeight);
      if (left <= 800) {
        isAutoLoading = true;
        loadNextPages({ pages: 1 }).finally(() => { isAutoLoading = false; });
      }
    }, { passive: true });
  }

  /* Priority: low media (gray) → friends (bronze) → follows you (red) → following (teal). */

  /* Profile / media opens → Seen chip + visit log (local). */
  function normalizeProfilePath(href) {
    try {
      const u = new URL(href, location.origin);
      if (u.origin !== location.origin) return "";
      const path = (u.pathname || "").replace(/\/+$/, "");
      if (!path || path === "/" || path.startsWith("/p/") || path.startsWith("/help") || path.startsWith("/vite")) return "";
      if (/^\/(pictures|videos|posts|events|groups|settings|inbox|search|kinksters|friends|following|followers)/.test(path)) return "";
      const parts = path.split("/").filter(Boolean);
      if (parts.length === 1) return "/" + parts[0];
      /* /nick/pictures|videos|posts|writings/... → author nick */
      if (parts.length >= 2 && /^(pictures|videos|posts|writings)$/i.test(parts[1])) {
        if (/^(home|p|groups|events|inbox|settings|search|explore|places|help|legal|languages)$/i.test(parts[0])) return "";
        return "/" + parts[0];
      }
      return "";
    } catch (_) { return ""; }
  }
  function rememberOpenedHref(href) {
    const path = normalizeProfilePath(href);
    if (!path) return;
    const nick = path.replace(/^\//, "").toLowerCase();
    if (nick) markSeenTodayNick(nick);
  }
  function setupOpenedTracking() {
    if (!setupOpenedTracking.bound) {
      setupOpenedTracking.bound = true;
      document.addEventListener("click", (e) => {
        const a = e.target.closest && e.target.closest('a[href^="/"]');
        if (!a) return;
        rememberOpenedHref(a.getAttribute("href"));
      }, true);
    }
    rememberOpenedHref(location.href);
  }

  /* Seen-chip visit map (opened profiles). */
  const SEEN_TODAY_KEY = "fl_seen_today";
  const VISIT_LOG_KEY = "fl_visit_log";
  function localDateKey() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function formatVisitDate(isoOrDay) {
    const s = String(isoOrDay || "").trim();
    if (!s) return "";
    let d = null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) d = new Date(s + "T12:00:00");
    else {
      const t = Date.parse(s);
      if (Number.isFinite(t)) d = new Date(t);
    }
    if (!d || !Number.isFinite(d.getTime())) return s;
    try {
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
    } catch (_) {
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    }
  }
  function loadVisitMap() {
    try {
      const rawVisit = JSON.parse(localStorage.getItem(VISIT_LOG_KEY) || "null");
      if (rawVisit && typeof rawVisit === "object" && !Array.isArray(rawVisit)) {
        const out = {};
        Object.keys(rawVisit).forEach((k) => {
          const nick = String(k || "").trim().toLowerCase();
          const v = rawVisit[k];
          if (!nick) return;
          if (typeof v === "string" && v) out[nick] = v;
          else if (v && typeof v === "object" && v.at) out[nick] = String(v.at);
        });
        return out;
      }
    } catch (_) {}
    /* Migrate legacy today-only set into persistent map (dated as that day). */
    try {
      const raw = JSON.parse(localStorage.getItem(SEEN_TODAY_KEY) || "null");
      if (raw && typeof raw === "object" && Array.isArray(raw.nicks)) {
        const day = raw.date || localDateKey();
        const out = {};
        raw.nicks.forEach((n) => {
          const nick = String(n || "").trim().toLowerCase();
          if (nick) out[nick] = day;
        });
        saveVisitMap(out);
        return out;
      }
    } catch (_) {}
    return {};
  }
  function saveVisitMap(map) {
    const keys = Object.keys(map || {});
    /* Cap oldest by sorting dates ascending, drop extras. */
    let trimmed = map || {};
    if (keys.length > 1200) {
      const ordered = keys.sort((a, b) => String(trimmed[a]).localeCompare(String(trimmed[b])));
      const keep = ordered.slice(-1200);
      const next = {};
      keep.forEach((k) => { next[k] = trimmed[k]; });
      trimmed = next;
    }
    try { localStorage.setItem(VISIT_LOG_KEY, JSON.stringify(trimmed)); } catch (_) {}
    return trimmed;
  }
  function loadSeenToday() {
    const map = loadVisitMap();
    const today = localDateKey();
    const set = new Set();
    Object.keys(map).forEach((nick) => {
      const v = String(map[nick] || "");
      if (v.indexOf(today) === 0 || v === today) set.add(nick);
    });
    return set;
  }
  function saveSeenToday(set) {
    /* Keep legacy key in sync for exporters / older backups (today slice only). */
    const payload = { date: localDateKey(), nicks: Array.from(set || []).slice(-800) };
    try { localStorage.setItem(SEEN_TODAY_KEY, JSON.stringify(payload)); } catch (_) {}
  }
  function markSeenTodayNick(nick) {
    const n = String(nick || "").trim().toLowerCase();
    if (!n) return;
    const map = loadVisitMap();
    map[n] = new Date().toISOString();
    saveVisitMap(map);
    saveSeenToday(loadSeenToday());
    applySeenChips();
  }
  function showSeenChipEnabled(settings) {
    settings = settings || loadFilterSettings();
    if (settings.showSeenChip != null) return !!settings.showSeenChip;
    /* Migrate: former dimSeenToday=true meant “mark opened”; default chips ON. */
    return settings.dimSeenToday !== false;
  }
  function applySeenChips(settings) {
    settings = settings || loadFilterSettings();
    const on = showSeenChipEnabled(settings);
    const map = on ? loadVisitMap() : null;
    getMemberCards().forEach((card) => {
      const face = cardFace(card);
      const shell = cardShell(card);
      if (shell) shell.classList.remove("lt-seen-today");
      if (!face) return;
      face.classList.remove("lt-seen-today");
      const old = face.querySelector(".lt-seen-chip");
      if (old) old.remove();
      if (!on || !map) return;
      const nick = String(cardNickname(card) || "").toLowerCase();
      const when = nick && map[nick];
      if (!when) return;
      const chip = document.createElement("span");
      chip.className = "lt-seen-chip";
      chip.textContent = t("seenChip");
      chip.title = t("seenChipTitle", { date: formatVisitDate(when) });
      face.appendChild(chip);
    });
  }


  /* Home feed scroll restore: sessionStorage path → scrollY. */
  const HOME_SCROLL_KEY = "fl_home_scroll_map";
  let homeScrollRestoreLock = false;
  let homeScrollRestoredFor = "";
  function loadHomeScrollMap() {
    try {
      const raw = JSON.parse(sessionStorage.getItem(HOME_SCROLL_KEY) || "{}");
      return raw && typeof raw === "object" ? raw : {};
    } catch (_) { return {}; }
  }
  function saveHomeScrollMap(map) {
    try { sessionStorage.setItem(HOME_SCROLL_KEY, JSON.stringify(map)); } catch (_) {}
  }
  function homeScrollPathKey() {
    try { return (location.pathname || "") + (location.search || ""); } catch (_) { return location.pathname || ""; }
  }
  function setupHomeScrollRestore() {
    if (setupHomeScrollRestore.bound) return;
    setupHomeScrollRestore.bound = true;
    let saveT = null;
    window.addEventListener("scroll", () => {
      if (homeScrollRestoreLock || !isHomeFeed()) return;
      clearTimeout(saveT);
      saveT = setTimeout(() => {
        if (homeScrollRestoreLock || !isHomeFeed()) return;
        const map = loadHomeScrollMap();
        map[homeScrollPathKey()] = Math.round(window.scrollY || window.pageYOffset || 0);
        saveHomeScrollMap(map);
      }, 175);
    }, { passive: true });
    function tryRestoreHomeScroll() {
      if (!isHomeFeed()) {
        homeScrollRestoredFor = "";
        return;
      }
      const key = homeScrollPathKey();
      if (homeScrollRestoredFor === key) return;
      const y = loadHomeScrollMap()[key];
      if (y == null || !Number.isFinite(+y)) {
        homeScrollRestoredFor = key;
        return;
      }
      const target = Math.max(0, Math.round(+y));
      homeScrollRestoreLock = true;
      homeScrollRestoredFor = key;
      const apply = () => {
        window.scrollTo(0, target);
      };
      apply();
      requestAnimationFrame(apply);
      setTimeout(apply, 60);
      setTimeout(() => { homeScrollRestoreLock = false; }, 450);
    }
    document.addEventListener("turbo:load", () => {
      homeScrollRestoredFor = "";
      setTimeout(tryRestoreHomeScroll, 40);
    });
    window.addEventListener("pageshow", () => {
      homeScrollRestoredFor = "";
      setTimeout(tryRestoreHomeScroll, 40);
    });
    window.addEventListener("popstate", () => {
      homeScrollRestoredFor = "";
      setTimeout(tryRestoreHomeScroll, 40);
    });
    setTimeout(tryRestoreHomeScroll, 80);
  }

  function applyThemeSync() {
    const html = document.documentElement;
    const light = html.classList.contains("light");
    const dock = document.getElementById("fl-tools-dock");
    if (dock) dock.dataset.flTheme = light ? "light" : "dark";
    /* CSS already keys off html.light — this pass refreshes data attrs for new UI. */
  }
  function setupThemeSync() {
    if (setupThemeSync.bound) return;
    setupThemeSync.bound = true;
    applyThemeSync();
    try {
      new MutationObserver(() => { applyThemeSync(); }).observe(document.documentElement, {
        attributes: true, attributeFilter: ["class"]
      });
    } catch (_) {}
  }

  function ensurePanelSearch() {
    const dock = ensureDock();
    let wrap = document.getElementById("fl-panel-search-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "fl-panel-search-wrap";
      wrap.innerHTML = '<input type="search" id="fl-panel-search" placeholder="' + escapeAttr(t("panelSearchPh")) + '" autocomplete="off">';
      const input = wrap.firstChild;
      const run = () => applyPanelSearch(input.value);
      input.addEventListener("input", run);
      input.addEventListener("search", run);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") { input.value = ""; applyPanelSearch(""); input.blur(); }
      });
    }
    if (wrap.parentElement !== dock || dock.firstChild !== wrap) {
      dock.insertBefore(wrap, dock.firstChild);
    }
  }
  function applyPanelSearch(q) {
    const query = String(q || "").trim().toLowerCase();
    const dock = document.getElementById("fl-tools-dock");
    if (!dock) return;
    dock.querySelectorAll(".fl-tool-panel").forEach((panel) => {
      const id = panel.id || "";
      if (id === "fl-shortcuts-panel") {
        panel.classList.remove("lt-panel-search-miss");
        return;
      }
      if (!query) {
        panel.classList.remove("lt-panel-search-miss");
        return;
      }
      const hay = String(panel.textContent || "").toLowerCase();
      panel.classList.toggle("lt-panel-search-miss", hay.indexOf(query) === -1);
    });
    const actions = document.getElementById("fl-dock-actions");
    if (actions) actions.style.display = "";
    const jump = document.getElementById("fl-jump-top");
    if (jump) jump.style.display = "";
  }

  function tagSmallImages() {
    /* On media/comment pages only tag once per navigation — rescanning every
       applyExtras while comments stream causes classList churn → observer loops. */
    if (isMediaPage()) {
      if (tagSmallImages._donePath === location.pathname) return;
      tagSmallImages._donePath = location.pathname;
    }
    document.querySelectorAll("img").forEach((img) => {
      if (img.closest && img.closest("#fl-tools-dock")) return;
      const w = img.naturalWidth || img.width || img.clientWidth;
      const h = img.naturalHeight || img.height || img.clientHeight;
      if (!(w > 0 && h > 0)) return;
      const small = Math.max(w, h) <= 96;
      if (img.classList.contains("fl-tools-avatar") === small) return;
      img.classList.toggle("fl-tools-avatar", small);
    });
  }
  function toggleNsfwMode() {
    const box = document.getElementById("fl-nsfw-toggle");
    if (box) {
      box.checked = !box.checked;
      box.dispatchEvent(new Event("change"));
      return;
    }
    const ds = loadDisplaySettings();
    const mode = ds.mode === "sfw" ? "nsfw" : "sfw";
    saveDisplaySettings(Object.assign({}, ds, { mode: mode }));
    applyDisplayMode(mode, ds.blurPx);
  }
  function sortLoadedCards(mode) {
    mode = mode || loadFilterSettings().sortBy || "none";
    const parent = cardContainer();
    if (!parent || !mode || mode === "none") return;
    const rows = getMemberCards().map((card) => {
      const tag = parseCardTag(card);
      return { shell: cardShell(card), name: cardNickname(card), age: tag.age || 0, pics: parsePicCount(card) };
    });
    const before = rows.map((r) => r.shell);
    rows.sort((a, b) => {
      if (mode === "name") return a.name.localeCompare(b.name) || a.shell.id.localeCompare(b.shell.id || "");
      if (mode === "age") return a.age - b.age || a.name.localeCompare(b.name);
      if (mode === "pics") return b.pics - a.pics || a.name.localeCompare(b.name);
      return 0;
    });
    let same = before.length === rows.length;
    if (same) {
      for (let i = 0; i < rows.length; i += 1) {
        if (before[i] !== rows[i].shell) { same = false; break; }
      }
    }
    if (same) return;
    rows.forEach((row) => parent.appendChild(row.shell));
  }
  function rememberPlace() {
    const path = location.pathname || "";
    if (/^\/p\//.test(path)) {
      try { localStorage.setItem("fl_last_place", path); } catch (_) {}
    }
    const el = document.getElementById("fl-last-place");
    if (!el) return;
    let last = "";
    try { last = localStorage.getItem("fl_last_place") || ""; } catch (_) {}
    if (last && last !== path) {
      el.innerHTML = t("lastPlace") + ': <a href="' + last + '" style="color:#e8c4c4">' + last + "</a>";
    } else el.textContent = "";
  }
  /* Markup self-check: user-agnostic. No toggle. Banner at dock top, fades after a few seconds.
     Debounced so async feed/list paint can finish; once per path+kind per tab session. */
  const MARKUP_WARN_SESSION_KEY = "fl_markup_warn_session";
  function markupWarnSessionMap() {
    try {
      const raw = JSON.parse(sessionStorage.getItem(MARKUP_WARN_SESSION_KEY) || "{}");
      return raw && typeof raw === "object" ? raw : {};
    } catch (_) { return {}; }
  }
  function markupWarnAlreadyShown(sig) {
    return !!markupWarnSessionMap()[sig];
  }
  function markupWarnMarkShown(sig) {
    const map = markupWarnSessionMap();
    map[sig] = Date.now();
    try { sessionStorage.setItem(MARKUP_WARN_SESSION_KEY, JSON.stringify(map)); } catch (_) {}
  }
  function ensureMarkupBanner() {
    let bar = document.getElementById("fl-markup-banner");
    if (bar) return bar;
    bar = document.createElement("div");
    bar.id = "fl-markup-banner";
    bar.setAttribute("role", "status");
    const dock = ensureDock();
    dock.insertBefore(bar, dock.firstChild);
    return bar;
  }
  function showMarkupWarning(msg, sig) {
    if (!msg) return;
    if (sig && markupWarnAlreadyShown(sig)) return;
    if (sig) markupWarnMarkShown(sig);
    const bar = ensureMarkupBanner();
    bar.textContent = msg;
    bar.classList.add("lt-show");
    bar.classList.remove("lt-fade");
    clearTimeout(showMarkupWarning.fadeTimer);
    clearTimeout(showMarkupWarning.hideTimer);
    showMarkupWarning.fadeTimer = setTimeout(() => {
      bar.classList.add("lt-fade");
      showMarkupWarning.hideTimer = setTimeout(() => {
        bar.classList.remove("lt-show", "lt-fade");
        bar.textContent = "";
      }, 750);
    }, 7000);
  }
  function collectMarkupIssues() {
    const issues = [];
    if (isBlockedInterstitial() || isMediaPage()) return issues;
    if (isListPage()) {
      if (!getMemberCards().length) issues.push({ kind: "list", msg: t("markupWarnList") });
    }
    if (isHomeFeed()) {
      /* Shell (#stories-list) counts as OK so an empty feed does not false-alarm. */
      const hasStories = document.querySelector("[data-story-uid], [data-feed-dwell-target]");
      const hasFeedShell = document.querySelector("#stories-list, [data-following-feed]");
      if (!hasStories && !hasFeedShell) issues.push({ kind: "feed", msg: t("markupWarnFeed") });
    }
    if (isProfileHome()) {
      const ok = document.querySelector("[data-test-id='profile-header'], #main-content, #ptr-main-element");
      if (!ok) issues.push({ kind: "profile", msg: t("markupWarnProfile") });
    }
    return issues;
  }
  function runMarkupSelfCheck() {
    const path = location.pathname || "/";
    const issues = collectMarkupIssues();
    const el = document.getElementById("fl-selector-warn");
    if (el) {
      const listBroken = issues.some((x) => x.kind === "list");
      el.classList.toggle("fl-tool-hidden", !listBroken);
      el.textContent = listBroken ? t("selectorWarn") : "";
    }
    if (!issues.length) return;
    /* One banner: prefer feed > profile > list when multiple (rare). */
    const order = { feed: 0, profile: 1, list: 2 };
    issues.sort((a, b) => (order[a.kind] || 9) - (order[b.kind] || 9));
    const hit = issues[0];
    showMarkupWarning(hit.msg, path + "::" + hit.kind);
  }
  function scheduleMarkupSelfCheck() {
    clearTimeout(scheduleMarkupSelfCheck.timer);
    scheduleMarkupSelfCheck.timer = setTimeout(runMarkupSelfCheck, 1800);
  }
  function warnIfSelectorsBroken() {
    scheduleMarkupSelfCheck();
  }
  function applyBannerPref() {
    document.documentElement.classList.toggle("fl-tools-hide-banners", !!loadFilterSettings().hideBanners);
  }
  function isBlockedInterstitial() {
    if (/you.?ve blocked/i.test(document.title || "")) return true;
    const heading = document.querySelector("h1, h2, article h2");
    return !!(heading && /you.?ve blocked/i.test(heading.textContent || ""));
  }
  function getFeedItems() {
    if (!isHomeFeed() || isBlockedInterstitial()) return [];
    const root = document.querySelector("main") || document.body;
    const nodes = root.querySelectorAll("[data-story-uid], [data-feed-story], [data-controller*='feed-story']");
    return Array.from(nodes).filter((n) => !n.closest("#fl-tools-dock") && (n.innerText || "").length > 40);
  }
  function applyFeedFilter(settings) {
    settings = settings || loadFilterSettings();
    document.querySelectorAll(".fl-tools-collapse-post").forEach((el) => {
      el.classList.remove("fl-tools-collapse-post");
      delete el.dataset.ltCollapseBound;
      const btn = el.querySelector(".fl-tools-expand-post");
      if (btn) btn.remove();
    });
    if (!isHomeFeed() || isBlockedInterstitial()) {
      return;
    }
    const exclude = splitList(settings.exclude);
    getFeedItems().forEach((item) => {
      const text = (item.innerText || "").toLowerCase();
      let visible = true;
      if (exclude.length) visible = !exclude.some((term) => textHasTerm(text, term));
      if (visible) {
        const hit = Array.from(item.querySelectorAll("a[href^='/']")).some((a) => {
          const m = ((a.getAttribute("href") || "").match(/^\/([A-Za-z0-9_.-]+)(?:\/|$)/) || [])[1];
          return m && loadBlockReason(m);
        });
        if (hit) visible = false;
      }
      if (settings.dimHidden && !visible) {
        item.style.display = "";
        item.classList.add("flhp-dim");
      } else {
        item.classList.remove("flhp-dim");
        item.style.display = visible ? "" : "none";
      }
    });
  }
  function profileNickname() {
    const m = (location.pathname || "").match(/^\/([A-Za-z0-9_.-]+)(?:\/|$)/);
    if (!m) return "";
    const nick = m[1];
    if (/^(home|p|groups|events|inbox|settings|search|explore|places|help|legal|languages|pictures|videos|posts|writings|fetishes|discussions|notifications|requests|guide)$/i.test(nick)) return "";
    return nick;
  }
  /** Photo/video/post/writing detail under a member nickname. */
  function isMediaPage() {
    return !!profileNickname() && /^\/[^/]+\/(pictures|videos|posts|writings)(\/|$)/i.test(location.pathname || "");
  }
  /** Profile home only: /nickname or /nickname/ (not media/subpages). */
  function isProfileHome() {
    if (isBlockedInterstitial()) return false;
    if (!profileNickname()) return false;
    return /^\/[^/]+\/?$/.test(location.pathname || "");
  }
  /** Soft-block / exclude prompts: profile home only (not photo/video/post detail). */
  function isMemberProfile() {
    return isProfileHome();
  }
  function profileSectionRoots() {
    const roots = [];
    const about = document.getElementById("about");
    if (about && about.parentElement) roots.push(about.parentElement);
    else if (about) roots.push(about);
    const groups = document.querySelector("[data-profile-groups], #profile-groups-member_of");
    if (groups) roots.push(groups);
    const fets = document.getElementById("profile-fetishes");
    if (fets) roots.push(fets);
    return roots;
  }
  function profileKeySectionsPresent() {
    return profileSectionRoots().length > 0;
  }
  function profileSectionHits(settings) {
    settings = settings || loadFilterSettings();
    const terms = splitList(settings.exclude).concat(splitList(settings.limits));
    if (!terms.length) return [];
    const roots = profileSectionRoots();
    /* Do not scan full main.innerText — freezes rich profiles while activity/widgets stream in. */
    const extra = ((profileNickname() || "") + " " + (document.title || "")).toLowerCase();
    const text = roots.map((el) => (el.innerText || el.textContent || "").toLowerCase()).join("\n") + "\n" + extra;
    const seen = {};
    return terms.filter((term) => {
      if (seen[term] || !textHasTerm(text, term)) return false;
      seen[term] = true;
      return true;
    });
  }
  let limitHlPainting = false;
  function clearLimitHighlights(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll("mark.lt-limit-hl, span.lt-limit-hl").forEach((el) => {
      const parent = el.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(el.textContent || ""), el);
      parent.normalize();
    });
  }
  function limitHlPaintNode(node, re) {
    if (limitHlPainting || !node || !node.parentElement) return;
    const parent = node.parentElement;
    if (/^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|CODE|PRE|SVG|MARK)$/i.test(parent.tagName)) return;
    if (parent.isContentEditable || (parent.closest && parent.closest("[contenteditable='true']"))) return;
    if (parent.closest && (parent.closest("#fl-tools-dock") || parent.closest("mark.lt-limit-hl") || parent.closest(".lt-limit-hl"))) return;
    const text = node.nodeValue;
    if (!text) return;
    re.lastIndex = 0;
    if (!re.test(text)) { re.lastIndex = 0; return; }
    re.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const mark = document.createElement("mark");
      mark.className = "lt-limit-hl";
      mark.textContent = m[0];
      frag.appendChild(mark);
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    limitHlPainting = true;
    try { node.parentNode.replaceChild(frag, node); }
    finally { limitHlPainting = false; }
    re.lastIndex = 0;
  }
  function highlightProfileLimitTerms(settings) {
    if (!isProfileHome() || limitHlPainting || highlightProfileLimitTerms._busy) return;
    settings = settings || loadFilterSettings();
    const roots = profileSectionRoots();
    roots.forEach(clearLimitHighlights);
    const terms = [];
    const seen = {};
    splitList(settings.limits).concat(splitList(settings.exclude)).forEach((term) => {
      if (!term || seen[term]) return;
      seen[term] = true;
      terms.push(term);
    });
    if (!terms.length || !roots.length) return;
    const re = new RegExp("(" + terms.sort((a, b) => b.length - a.length).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "gi");
    highlightProfileLimitTerms._busy = true;
    try {
      roots.forEach((root) => {
        if (!root || (root.id === "fl-tools-dock")) return;
        if (root.closest && root.closest("#fl-tools-dock")) return;
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
          acceptNode(n) {
            const p = n.parentElement;
            if (!p) return NodeFilter.FILTER_REJECT;
            if (p.closest && (p.closest("#fl-tools-dock") || p.closest("mark.lt-limit-hl") || p.closest(".lt-limit-hl"))) return NodeFilter.FILTER_REJECT;
            if (p.isContentEditable || (p.closest && p.closest("[contenteditable='true']"))) return NodeFilter.FILTER_REJECT;
            if (/^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|CODE|PRE|SVG|MARK)$/i.test(p.tagName)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) nodes.push(n);
        nodes.forEach((node) => limitHlPaintNode(node, re));
      });
    } finally { highlightProfileLimitTerms._busy = false; }
  }

  function ensureBlockPanel() {
    const dock = ensureDock();
    let panel = document.getElementById("fl-block-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "fl-block-panel";
      panel.className = "fl-tool-panel";
      const softCore =
        '<input id="fl-soft-search" type="text" placeholder="' + escapeAttr(t("softSearch")) + '" style="margin-bottom:6px">' +
        '<div id="fl-soft-list"></div>' +
        '<button type="button" id="fl-soft-block-visible-block" class="life-btn life-btn-gray">' + t("softBlockVisible") + "</button>" +
        '<button type="button" id="fl-soft-backup" class="life-btn life-btn-gray">' + t("softBackup") + "</button>";
      panel.innerHTML =
        '<div class="fl-tool-header" id="fl-block-header"><div class="fl-tool-title">' + t("blockPanel") +
        '</div><button type="button" id="fl-block-toggle" class="fl-tool-chevron" aria-expanded="false" aria-controls="fl-block-body" aria-label="' + t("expandPanel") + '">▸</button></div>' +
        '<div id="fl-block-body" class="fl-tool-body fl-tool-hidden">' +
        '<div id="fl-soft-count" class="life-hint">' + t("softCount", { n: "0" }) + "</div>" +
        softCore +
        "</div>";
      dock.insertBefore(panel, dock.firstChild);
      document.getElementById("fl-block-header").addEventListener("click", (e) => {
        if (dockDidDrag) { dockDidDrag = false; return; }
        if (e.target.closest("input, label, select, button") && e.target.id !== "fl-block-toggle") return;
        const body = document.getElementById("fl-block-body");
        const open = body.classList.contains("fl-tool-hidden");
        setPanelOpenState("fl-block-body", "fl-block-toggle", open);
        if (open) collapseOtherPanels("fl-block-panel");
        else syncOpenPanelHighlight();
      });
      const softSearch = document.getElementById("fl-soft-search");
      if (softSearch) softSearch.addEventListener("input", renderSoftList);
      const backup = document.getElementById("fl-soft-backup");
      if (backup) backup.addEventListener("click", (e) => { e.stopPropagation(); downloadSoftList(); });
      const softVisB = document.getElementById("fl-soft-block-visible-block");
      if (softVisB && !softVisB.dataset.ltBound) {
        softVisB.dataset.ltBound = "1";
        softVisB.addEventListener("click", (e) => { e.stopPropagation(); softBlockVisibleCards(); });
      }
      renderSoftList();
      enhanceBlockPanelHistory();
    } else if (panel.parentNode !== dock) {
      dock.insertBefore(panel, dock.firstChild);
    }
    enhanceBlockPanelHistory();
    return panel;
  }
  function dockAlert() {
    ensureBlockPanel();
    let bar = document.getElementById("fl-exclude-alert");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "fl-exclude-alert";
      bar.className = "life-alert-strong";
      bar.style.marginTop = "8px";
    }
    const panel = document.getElementById("fl-block-panel");
    const body = document.getElementById("fl-block-body");
    const host = body || panel;
    if (host && bar.parentNode !== host) host.insertBefore(bar, host.firstChild);
    return bar;
  }
  function skippedBlockPrompt(nick) {
    try { return !!(JSON.parse(localStorage.getItem("fl_skip_block_prompt") || "{}")[nick]); } catch (_) { return false; }
  }
  function skipBlockPrompt(nick) {
    try {
      const map = JSON.parse(localStorage.getItem("fl_skip_block_prompt") || "{}");
      map[nick] = true;
      localStorage.setItem("fl_skip_block_prompt", JSON.stringify(map));
    } catch (_) {}
  }
  const BLOCK_REASON_KEY = "fl_block_reasons";
  function blockReasonMap() {
    try { return JSON.parse(localStorage.getItem(BLOCK_REASON_KEY) || "{}"); } catch (_) { return {}; }
  }
  function shortBlockDate(ts) {
    try { return new Date(ts).toLocaleDateString(undefined, { year: "2-digit", month: "numeric", day: "numeric" }); }
    catch (_) { return ""; }
  }
  function saveBlockReason(nick, terms, type) {
    if (!nick) return;
    const map = blockReasonMap();
    map[nick] = { terms: terms || [], at: Date.now(), type: type === "official" ? "official" : "soft" };
    try { localStorage.setItem(BLOCK_REASON_KEY, JSON.stringify(map)); } catch (_) {}
  }
  function loadBlockReason(nick) {
    if (!nick) return null;
    const map = blockReasonMap();
    if (map[nick] && map[nick].at) return map[nick];
    const key = Object.keys(map).find((k) => k.toLowerCase() === String(nick).toLowerCase());
    return key && map[key] && map[key].at ? map[key] : null;
  }
  function cardNickname(card) {
    const wrap = card.closest && card.closest("[data-member-card]");
    const fromAttr = wrap && wrap.getAttribute("data-member-card");
    if (fromAttr) return fromAttr;
    const a = card.querySelector(NAME_LINK_SELECTOR);
    const href = (a && a.getAttribute("href")) || "";
    const m = href.match(/^\/([A-Za-z0-9_.-]+)\/?$/);
    if (m) return m[1];
    return ((a && (a.getAttribute("title") || a.textContent)) || "").trim();
  }
  function cardFace(card) {
    const shell = cardShell(card);
    return visualCard(shell) || card;
  }  function clearBlockReason(nick) {
    if (!nick) return;
    const map = blockReasonMap();
    delete map[nick];
    const lower = String(nick).toLowerCase();
    Object.keys(map).forEach((k) => {
      if (k.toLowerCase() === lower) delete map[k];
    });
    try { localStorage.setItem(BLOCK_REASON_KEY, JSON.stringify(map)); } catch (_) {}
  }
  function softEntries() {
    const map = blockReasonMap();
    return Object.keys(map).map((nick) => Object.assign({ nick: nick }, map[nick] || {}))
      .filter((rec) => rec.at && rec.type !== "official")
      .sort((a, b) => (b.at || 0) - (a.at || 0));
  }
  function renderSoftList() {
    const box = document.getElementById("fl-soft-list");
    const countEl = document.getElementById("fl-soft-count");
    if (!box) return;
    const q = ((document.getElementById("fl-soft-search") || {}).value || "").trim().toLowerCase();
    const all = softEntries();
    if (countEl) countEl.textContent = t("softCount", { n: all.length });
    const filtered = q
      ? all.filter((rec) => rec.nick.toLowerCase().indexOf(q) !== -1)
      : all;
    box.innerHTML = "";
    filtered.forEach((rec) => {
      const row = document.createElement("div");
      row.style.cssText = "display:flex;align-items:center;gap:6px;margin:0 0 4px;font-size:12px;";
      const link = document.createElement("a");
      link.href = "/" + rec.nick;
      link.textContent = rec.nick;
      link.style.cssText = "color:#e8c4c4;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
      const meta = document.createElement("span");
      meta.style.color = "#aaa";
      meta.textContent = shortBlockDate(rec.at);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "life-btn life-btn-gray";
      btn.style.cssText = "margin:0;padding:2px 8px;";
      btn.textContent = t("unsoft");
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        clearBlockReason(rec.nick);
        skipBlockPrompt(rec.nick);
        renderSoftList();
        applyFilter(loadFilterSettings());
      });
      row.appendChild(link);
      row.appendChild(meta);
      row.appendChild(btn);
      box.appendChild(row);
    });
  }
  function downloadSoftList() {
    const blob = new Blob([JSON.stringify(softEntries(), null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "fetlife-soft-blocks.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  function blockForm() {
    return Array.from(document.querySelectorAll("form[action*='blockeds']")).find((form) => {
      const method = (form.querySelector("input[name='_method']") || {}).value || "";
      return method.toLowerCase() !== "delete";
    }) || null;
  }
  function unblockForm() {
    return Array.from(document.querySelectorAll("form[action*='blockeds']")).find((form) => {
      const method = (form.querySelector("input[name='_method']") || {}).value || "";
      return method.toLowerCase() === "delete";
    }) || null;
  }
  function submitOfficialBlock(terms) {
    const nick = profileNickname();
    if (nick) saveBlockReason(nick, terms || [], "official");
    const form = blockForm();
    if (form) {
      if (form.requestSubmit) form.requestSubmit();
      else form.submit();
      return;
    }
    const modalBtn = document.querySelector('[data-id="block"] [data-id="modal-main-action-button"], [data-id="block"] button[type="submit"]');
    if (modalBtn) { modalBtn.click(); return; }
    const idMatch = document.documentElement.innerHTML.match(/blocked_user_id=(\d+)/);
    if (idMatch) location.href = "/blockeds?blocked_user_id=" + idMatch[1] + "&source=Profile";
  }
  function submitOfficialUnblock(nick) {
    if (nick) clearBlockReason(nick);
    const form = unblockForm();
    if (form) {
      if (form.requestSubmit) form.requestSubmit();
      else form.submit();
    }
  }
  function applyUnblockPrompt() {
    if (!isBlockedInterstitial()) return false;
    const nick = profileNickname();
    const rec = loadBlockReason(nick);
    let bar = document.getElementById("fl-exclude-alert");
    if (!rec) {
      if (bar && bar.getAttribute("data-kind") === "unblock") bar.remove();
      return true;
    }
    const when = shortBlockDate(rec.at);
    bar = dockAlert();
    if (bar.getAttribute("data-kind") === "unblock") return true;
    bar.setAttribute("data-kind", "unblock");
    bar.innerHTML = "";
    const text = document.createElement("div");
    text.textContent = t("blockedOn", { name: nick || "this member", date: when });
    const row = document.createElement("div");
    row.style.marginTop = "8px";
    row.style.display = "flex";
    row.style.gap = "8px";
    const unb = document.createElement("button");
    unb.type = "button";
    unb.className = "life-btn life-btn-gray";
    unb.textContent = t("unblockYes");
    unb.addEventListener("click", (e) => {
      e.stopPropagation();
      text.textContent = t("unblockAsk", { name: nick || "this member", date: when });
      row.innerHTML = "";
      const yes = document.createElement("button");
      yes.type = "button";
      yes.className = "life-btn life-btn-red";
      yes.textContent = t("unblockYes");
      yes.addEventListener("click", (ev) => {
        ev.stopPropagation();
        submitOfficialUnblock(nick);
      });
      const keep = document.createElement("button");
      keep.type = "button";
      keep.className = "life-btn life-btn-gray";
      keep.textContent = t("unblockKeep");
      keep.addEventListener("click", (ev) => {
        ev.stopPropagation();
        bar.removeAttribute("data-kind");
        applyUnblockPrompt();
      });
      row.appendChild(yes);
      row.appendChild(keep);
    });
    row.appendChild(unb);
    bar.appendChild(text);
    bar.appendChild(row);
    if (!applyUnblockPrompt.bound) {
      applyUnblockPrompt.bound = true;
      document.addEventListener("click", (e) => {
        const form = e.target.closest && e.target.closest("form[action*='blockeds']");
        if (!form) return;
        const method = (form.querySelector("input[name='_method']") || {}).value || "";
        if (method.toLowerCase() !== "delete") return;
        const who = profileNickname();
        if (!loadBlockReason(who)) return;
        if (e.target.closest("#fl-tools-dock")) return;
        e.preventDefault();
        e.stopPropagation();
        const dockBar = document.getElementById("fl-exclude-alert");
        if (dockBar) dockBar.scrollIntoView({ block: "nearest" });
        const go = document.querySelector("#fl-exclude-alert button");
        if (go) go.click();
      }, true);
    }
    return true;
  }
  function showProfileBlockPrompt(nick, hits) {
    if (!nick || skippedBlockPrompt(nick) || loadBlockReason(nick)) return;
    const terms = (hits || []).map((x) => String(x || "").trim()).filter(Boolean);
    openBlockPanel();
    const bar = dockAlert();
    const sig = "prompt|" + nick + "|" + terms.join(",");
    if (bar.getAttribute("data-kind") === "prompt" && bar.getAttribute("data-sig") === sig) return;
    bar.setAttribute("data-kind", "prompt");
    bar.setAttribute("data-sig", sig);
    bar.innerHTML = "";

    const title = document.createElement("div");
    title.style.fontWeight = "bold";
    title.textContent = t("excludeAlert", { name: nick });
    const why = document.createElement("div");
    why.style.marginTop = "4px";
    why.textContent = terms.length
      ? t("limitHitsWhy", { terms: terms.join(", ") })
      : t("softVisitWhyNone");

    const row = document.createElement("div");
    row.style.cssText = "margin-top:8px;display:flex;flex-wrap:wrap;gap:6px;";

    function finishSoft() {
      saveBlockReason(nick, terms, "soft");
      appendLimitHistory(nick, terms, location.pathname || "");
      renderSoftList();
      applyFilter(loadFilterSettings());
      showSoftBlockNotice(nick, loadBlockReason(nick));
    }

    const soft = document.createElement("button");
    soft.type = "button";
    soft.className = "life-btn life-btn-gray";
    soft.style.cssText = "margin:0;width:auto;flex:1 1 auto;";
    soft.textContent = t("blockSoft");
    soft.addEventListener("click", (e) => {
      e.stopPropagation();
      finishSoft();
    });

    const hard = document.createElement("button");
    hard.type = "button";
    hard.className = "life-btn life-btn-red";
    hard.style.cssText = "margin:0;width:auto;flex:1 1 auto;";
    hard.textContent = t("blockYes");
    hard.addEventListener("click", (e) => {
      e.stopPropagation();
      appendLimitHistory(nick, terms, location.pathname || "");
      submitOfficialBlock(terms);
    });

    const no = document.createElement("button");
    no.type = "button";
    no.className = "life-btn life-btn-gray";
    no.style.cssText = "margin:0;width:auto;flex:1 1 auto;";
    no.textContent = t("blockNo");
    no.addEventListener("click", (e) => {
      e.stopPropagation();
      bar.innerHTML = "";
      const ask = document.createElement("div");
      ask.textContent = t("blockNoSure");
      const confirmRow = document.createElement("div");
      confirmRow.style.cssText = "margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;";
      const confirm = document.createElement("button");
      confirm.type = "button";
      confirm.className = "life-btn life-btn-red";
      confirm.style.cssText = "margin:0;width:auto;flex:1 1 auto;";
      confirm.textContent = t("blockNoConfirm");
      confirm.addEventListener("click", (ev) => {
        ev.stopPropagation();
        skipBlockPrompt(nick);
        bar.remove();
      });
      const cancel = document.createElement("button");
      cancel.type = "button";
      cancel.className = "life-btn life-btn-gray";
      cancel.style.cssText = "margin:0;width:auto;flex:1 1 auto;";
      cancel.textContent = t("blockNoCancel");
      cancel.addEventListener("click", (ev) => {
        ev.stopPropagation();
        /* Dismiss for this visit only — allow prompt again next time. */
        bar.remove();
      });
      const dismiss = document.createElement("button");
      dismiss.type = "button";
      dismiss.className = "life-btn life-btn-gray";
      dismiss.style.cssText = "margin:0;width:auto;flex:1 1 auto;";
      dismiss.textContent = t("limitHitsDismiss");
      dismiss.addEventListener("click", (ev) => {
        ev.stopPropagation();
        bar.remove();
      });
      confirmRow.appendChild(confirm);
      confirmRow.appendChild(cancel);
      bar.appendChild(ask);
      bar.appendChild(confirmRow);
    });

    row.appendChild(soft);
    row.appendChild(hard);
    row.appendChild(no);
    bar.appendChild(title);
    bar.appendChild(why);
    bar.appendChild(row);
  }
  function openBlockPanel() {
    ensureBlockPanel();
    setPanelOpenState("fl-block-body", "fl-block-toggle", true);
    collapseOtherPanels("fl-block-panel");
  }
  function showSoftBlockNotice(nick, rec) {
    if (!nick || !rec || rec.type === "official") {
      const stale = document.getElementById("fl-exclude-alert");
      if (stale && stale.getAttribute("data-kind") === "soft-visit") stale.remove();
      return;
    }
    openBlockPanel();
    renderSoftList();
    const bar = dockAlert();
    const terms = (rec.terms || []).filter(Boolean);
    const when = shortBlockDate(rec.at) || "—";
    const sig = nick + "|" + (rec.at || "") + "|" + terms.join(",");
    if (bar.getAttribute("data-kind") === "soft-visit" && bar.getAttribute("data-sig") === sig) return;
    bar.setAttribute("data-kind", "soft-visit");
    bar.setAttribute("data-sig", sig);
    bar.innerHTML = "";
    const title = document.createElement("div");
    title.style.fontWeight = "bold";
    title.textContent = t("softVisitAlert", { name: nick });
    const whenEl = document.createElement("div");
    whenEl.style.marginTop = "4px";
    whenEl.textContent = t("softVisitWhen", { date: when });
    const whyEl = document.createElement("div");
    whyEl.style.marginTop = "4px";
    whyEl.textContent = terms.length
      ? t("softVisitWhy", { terms: terms.join(", ") })
      : t("softVisitWhyNone");
    const row = document.createElement("div");
    row.style.cssText = "margin-top:8px;display:flex;gap:8px;";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "life-btn life-btn-gray";
    remove.style.margin = "0";
    remove.textContent = t("softVisitRemove");
    remove.addEventListener("click", (e) => {
      e.stopPropagation();
      clearBlockReason(nick);
      skipBlockPrompt(nick);
      renderSoftList();
      applyFilter(loadFilterSettings());
      bar.setAttribute("data-kind", "soft-visit-cleared");
      bar.removeAttribute("data-sig");
      bar.innerHTML = "";
      const done = document.createElement("div");
      done.textContent = t("softVisitRemoved");
      bar.appendChild(done);
      setTimeout(() => {
        if (bar.getAttribute("data-kind") === "soft-visit-cleared") bar.remove();
      }, 1600);
    });
    row.appendChild(remove);
    bar.appendChild(title);
    bar.appendChild(whenEl);
    bar.appendChild(whyEl);
    bar.appendChild(row);
  }
  function applyExcludeBlur(settings) {
    document.documentElement.classList.remove("fl-tools-exclude-blur");
    const stored = loadFilterSettings();
    settings = Object.assign({}, stored, settings || {});
    if (!String(settings.limits || "").trim()) settings.limits = stored.limits || stored.exclude || "";
    if (applyUnblockPrompt()) return;
    const nick = profileNickname();
    if (isMemberProfile() && loadBlockReason(nick)) {
      showSoftBlockNotice(nick, loadBlockReason(nick));
      return;
    }
    if (isMemberProfile()) {
      highlightProfileLimitTerms(settings);
      const hits = profileSectionHits(settings);
      if (hits.length) {
        if (!skippedBlockPrompt(nick)) showProfileBlockPrompt(nick, hits);
      } else {
        const bar = document.getElementById("fl-exclude-alert");
        if (bar && (bar.getAttribute("data-kind") === "prompt" || bar.getAttribute("data-kind") === "soft-visit")) bar.remove();
      }
      /* Soft-list DOM only when newly needed — avoid dock mutations that re-trigger the observer. */
      if (!document.getElementById("fl-block-panel")) ensureBlockPanel();
    }
  }
  const DISPLAY_KEY = "fl_display_settings";
  const DISPLAY_DEFAULTS = { mode: "nsfw", blurPx: 4, blurAvatars: false, blurVideos: true, markReadScroll: false };
  function loadDisplaySettings() {
    const merged = Object.assign({}, DISPLAY_DEFAULTS, readJsonKey([DISPLAY_KEY]) || {});
    merged.mode = merged.mode === "sfw" ? "sfw" : "nsfw";
    const blur = parseInt(merged.blurPx, 10);
    merged.blurPx = Number.isFinite(blur) ? Math.min(10, Math.max(1, blur)) : 4;
    /* Home-feed dim-on-scroll removed. */
    merged.markReadScroll = false;
    return merged;
  }
  function saveDisplaySettings(s) { localStorage.setItem(DISPLAY_KEY, JSON.stringify(s)); }
  function applyDisplayMode(mode, blurPx) {
    const ds = loadDisplaySettings();
    mode = mode || ds.mode;
    blurPx = blurPx == null ? ds.blurPx : blurPx;
    document.documentElement.style.setProperty("--lt-sfw-blur", blurPx + "px");
    document.documentElement.classList.remove("fl-tools-nsfw", "fl-tools-sfw");
    if (mode === "nsfw") document.documentElement.classList.add("fl-tools-nsfw");
    if (mode === "sfw") document.documentElement.classList.add("fl-tools-sfw");
    document.documentElement.classList.toggle("fl-tools-blur-avatars", !!(ds.blurAvatars));
    document.documentElement.classList.toggle("fl-tools-blur-videos", ds.blurVideos !== false);
  }
  function persistDisplay() {
    const box = document.getElementById("fl-nsfw-toggle");
    if (!box) return;
    const mode = box.checked ? "nsfw" : "sfw";
    const blurPx = parseInt((document.getElementById("fl-sfw-blur") || {}).value, 10) || 4;
    const blurAvatars = checked("fl-blur-avatars");
    const blurVideos = checked("fl-blur-videos");
    const prev = loadDisplaySettings();
    saveDisplaySettings(Object.assign({}, prev, {
      mode: mode, blurPx: blurPx, blurAvatars: blurAvatars, blurVideos: blurVideos
    }));
    applyDisplayMode(mode, blurPx);
    const state = document.getElementById("fl-nsfw-state");
    if (state) state.textContent = mode === "sfw" ? t("modeSfw") : t("modeNsfw");
    const label = document.getElementById("fl-blur-val");
    if (label) label.textContent = String(blurPx);
  }
  function buildDisplayPanel() {
    applyDisplayMode(loadDisplaySettings().mode);
  }

  /* Limit-hit history (local). */
  const LIMIT_HIST_KEY = "fl_limit_history";
  const LIMIT_HIST_CAP = 300;


  function loadLimitHistory() {
    const list = readJsonKey([LIMIT_HIST_KEY]) || [];
    return Array.isArray(list) ? list : [];
  }
  function saveLimitHistory(list) {
    const trimmed = (list || []).slice(0, LIMIT_HIST_CAP);
    try { localStorage.setItem(LIMIT_HIST_KEY, JSON.stringify(trimmed)); } catch (_) {}
    return trimmed;
  }
  function appendLimitHistory(nick, terms, path) {
    if (!nick) return;
    const list = loadLimitHistory();
    list.unshift({
      nick: nick,
      terms: terms || [],
      at: Date.now(),
      path: path || (location.pathname || "")
    });
    saveLimitHistory(list);
    renderLimitHistory();
  }



  /* Dock-styled confirm (Escape / Cancel = false). Replaces window.confirm. */
  function confirmDock(message, onResult) {
    const prev = document.getElementById("fl-confirm-overlay");
    if (prev) prev.remove();
    const prevFocus = document.activeElement;
    const overlay = document.createElement("div");
    overlay.id = "fl-confirm-overlay";
    overlay.setAttribute("role", "presentation");
    const dialog = document.createElement("div");
    dialog.id = "fl-confirm-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "fl-confirm-title");
    dialog.setAttribute("aria-describedby", "fl-confirm-msg");
    /* Inherit dock tokens when dock exists. */
    const dock = document.getElementById("fl-tools-dock");
    if (dock) {
      try {
        const cs = getComputedStyle(dock);
        ["--lt-bg", "--lt-bg-elev", "--lt-border", "--lt-text", "--lt-text-muted", "--lt-accent", "--lt-radius"].forEach((k) => {
          const v = cs.getPropertyValue(k);
          if (v) dialog.style.setProperty(k, v.trim());
        });
      } catch (_) {}
    }
    const title = document.createElement("div");
    title.id = "fl-confirm-title";
    title.className = "fl-tool-title";
    title.style.marginBottom = "8px";
    title.textContent = t("confirmTitle");
    const msg = document.createElement("p");
    msg.id = "fl-confirm-msg";
    msg.className = "fl-confirm-msg";
    msg.textContent = message;
    const actions = document.createElement("div");
    actions.className = "fl-confirm-actions";
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "life-btn life-btn-gray";
    cancel.textContent = t("confirmCancel");
    const ok = document.createElement("button");
    ok.type = "button";
    ok.className = "life-btn life-btn-red";
    ok.textContent = t("confirmOk");
    actions.appendChild(cancel);
    actions.appendChild(ok);
    dialog.appendChild(title);
    dialog.appendChild(msg);
    dialog.appendChild(actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    let settled = false;
    function finish(result) {
      if (settled) return;
      settled = true;
      document.removeEventListener("keydown", onKey, true);
      overlay.remove();
      try { if (prevFocus && prevFocus.focus) prevFocus.focus(); } catch (_) {}
      if (typeof onResult === "function") onResult(!!result);
    }
    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault(); e.stopPropagation();
        finish(false);
        return;
      }
      if (e.key === "Tab") {
        const focusables = [cancel, ok];
        const i = focusables.indexOf(document.activeElement);
        if (e.shiftKey) {
          if (i <= 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
        } else {
          if (i === focusables.length - 1 || i === -1) { e.preventDefault(); focusables[0].focus(); }
        }
      }
    }
    cancel.addEventListener("click", (e) => { e.preventDefault(); finish(false); });
    ok.addEventListener("click", (e) => { e.preventDefault(); finish(true); });
    overlay.addEventListener("click", (e) => { if (e.target === overlay) finish(false); });
    document.addEventListener("keydown", onKey, true);
    setTimeout(() => { try { ok.focus(); } catch (_) {} }, 0);
  }

  function softBlockNick(nick) {
    if (!nick) return;
    saveBlockReason(nick, [], "soft");
    ensureBlockPanel();
    renderSoftList();
    applyFilter(loadFilterSettings());
  }
  function softBlockVisibleCards() {
    if (!isListPage()) {
      showTextToast(t("softBlockNone"), false);
      return;
    }
    const nicks = [];
    const seen = {};
    getMemberCards().forEach((card) => {
      const shell = cardShell(card);
      if (!shell || shell.style.display === "none") return;
      const face = cardFace(card);
      if (face && face.classList.contains("lt-soft-blocked")) return;
      /* Skip hard-dimmed / filter-hidden faces; soft-dim still counts as visible. */
      if (face && face.classList.contains("flhp-dim-hard")) return;
      const nick = cardNickname(card);
      if (!nick || seen[nick]) return;
      if (loadBlockReason(nick)) return;
      seen[nick] = true;
      nicks.push(nick);
    });
    if (!nicks.length) {
      showTextToast(t("softBlockNone"), false);
      return;
    }
    confirmDock(t("softBlockConfirm", { n: nicks.length }), (ok) => {
      if (!ok) return;
      nicks.forEach((nick) => saveBlockReason(nick, [], "soft"));
      ensureBlockPanel();
      renderSoftList();
      applyFilter(loadFilterSettings());
      showTextToast(t("softBlockedN", { n: nicks.length }), false);
    });
  }


  function renderLimitHistory() {
    const box = document.getElementById("fl-limit-hist-list");
    const countEl = document.getElementById("fl-limit-hist-count");
    if (!box) return;
    const q = ((document.getElementById("fl-limit-hist-search") || {}).value || "").trim().toLowerCase();
    const all = loadLimitHistory();
    if (countEl) countEl.textContent = t("limitHistCount", { n: all.length });
    const filtered = q ? all.filter((it) => {
      const hay = ((it.nick || "") + " " + (it.terms || []).join(" ") + " " + (it.path || "")).toLowerCase();
      return hay.indexOf(q) !== -1;
    }) : all;
    box.innerHTML = "";
    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "life-hint";
      empty.textContent = t("limitHistEmpty");
      box.appendChild(empty);
      return;
    }
    filtered.slice(0, 80).forEach((it, idx) => {
      const row = document.createElement("div");
      row.className = "lt-row";
      const link = document.createElement("a");
      link.href = "/" + it.nick;
      link.textContent = it.nick;
      link.title = (it.terms || []).join(", ");
      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = shortBlockDate(it.at);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "life-btn life-btn-gray";
      btn.textContent = "×";
      btn.addEventListener("click", (e) => {
        e.preventDefault(); e.stopPropagation();
        const list = loadLimitHistory();
        const at = it.at; const nick = it.nick;
        saveLimitHistory(list.filter((x) => !(x.at === at && x.nick === nick)));
        renderLimitHistory();
      });
      row.appendChild(link); row.appendChild(meta); row.appendChild(btn);
      box.appendChild(row);
    });
  }

  function enhanceBlockPanelHistory() {
    const body = document.getElementById("fl-block-body");
    if (!body || document.getElementById("fl-limit-hist-wrap")) return;
    const wrap = document.createElement("div");
    wrap.id = "fl-limit-hist-wrap";
    wrap.innerHTML =
      '<hr class="life-hr"><div class="life-subhead" id="fl-limit-hist-toggle"><span>' + t("limitHistory") +
      '</span><span id="fl-limit-hist-chevron">▸</span></div>' +
      '<div id="fl-limit-hist-body" class="fl-tool-hidden">' +
      '<div id="fl-limit-hist-count" class="life-hint"></div>' +
      '<input id="fl-limit-hist-search" type="text" placeholder="' + escapeAttr(t("limitHistSearch")) + '" style="margin-bottom:6px">' +
      '<div id="fl-limit-hist-list"></div>' +
      '<button type="button" id="fl-limit-hist-dl" class="life-btn life-btn-gray">' + t("limitHistDownload") + "</button>" +
      '<button type="button" id="fl-limit-hist-clear" class="life-btn life-btn-gray">' + t("limitHistClear") + "</button></div>";
    body.appendChild(wrap);
    document.getElementById("fl-limit-hist-toggle").addEventListener("click", (e) => {
      e.stopPropagation();
      const b = document.getElementById("fl-limit-hist-body");
      const open = b.classList.contains("fl-tool-hidden");
      b.classList.toggle("fl-tool-hidden", !open);
      document.getElementById("fl-limit-hist-chevron").textContent = open ? "▾" : "▸";
      if (open) renderLimitHistory();
    });
    document.getElementById("fl-limit-hist-search").addEventListener("input", renderLimitHistory);
    document.getElementById("fl-limit-hist-dl").addEventListener("click", (e) => {
      e.stopPropagation();
      const blob = new Blob([JSON.stringify(loadLimitHistory(), null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "fetlife-limit-history.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    document.getElementById("fl-limit-hist-clear").addEventListener("click", (e) => {
      e.stopPropagation();
      saveLimitHistory([]);
      renderLimitHistory();
    });
  }


  function storyAuthorNick(el) {
    if (!el) return "";
    const path = el.getAttribute("data-dwell-author-path") || "";
    if (path) {
      const m = path.match(/^\/([A-Za-z0-9_.-]+)/);
      if (m) return m[1];
    }
    const art = el.matches && el.matches("article[data-story-uid]") ? el : el.querySelector && el.querySelector("article[data-story-uid]");
    const node = art || el;
    const ap = node.getAttribute && node.getAttribute("data-dwell-author-path");
    if (ap) {
      const m = ap.match(/^\/([A-Za-z0-9_.-]+)/);
      if (m) return m[1];
    }
    const a = node.querySelector && node.querySelector('a[href^="/"][data-popover], a.link.text-base.font-bold[href^="/"]');
    if (a) {
      const m = ((a.getAttribute("href") || "").match(/^\/([A-Za-z0-9_.-]+)\/?$/));
      if (m) return m[1];
    }
    return "";
  }

  function feedStoryHost(el) {
    if (!el || el.nodeType !== 1) return null;
    if (el.matches && el.matches("[data-story-uid]")) return el;
    if (el.closest) return el.closest("[data-story-uid]");
    return null;
  }


  function storyAuthorNick(el) {
    if (!el) return "";
    const path = el.getAttribute("data-dwell-author-path") || "";
    if (path) {
      const m = path.match(/^\/([A-Za-z0-9_.-]+)/);
      if (m) return m[1];
    }
    const art = el.matches && el.matches("article[data-story-uid]") ? el : el.querySelector && el.querySelector("article[data-story-uid]");
    const node = art || el;
    const ap = node.getAttribute && node.getAttribute("data-dwell-author-path");
    if (ap) {
      const m = ap.match(/^\/([A-Za-z0-9_.-]+)/);
      if (m) return m[1];
    }
    const a = node.querySelector && node.querySelector('a[href^="/"][data-popover], a.link.text-base.font-bold[href^="/"]');
    if (a) {
      const m = ((a.getAttribute("href") || "").match(/^\/([A-Za-z0-9_.-]+)\/?$/));
      if (m) return m[1];
    }
    return "";
  }

  function feedStoryHost(el) {
    if (!el || el.nodeType !== 1) return null;
    if (el.matches && el.matches("[data-story-uid]")) return el;
    if (el.closest) return el.closest("[data-story-uid]");
    return null;
  }
  function isStatusFeedStory(host) {
    const kind = (host.getAttribute("data-dwell-content-type") || "").toLowerCase();
    if (kind === "status") return true;
    return !!(host.querySelector("header.flex.items-center") && !host.querySelector(".flex.justify-start > .flex-none"));
  }
  function unwrapLegacyStatusAvatarCol(host) {
    Array.from(host.querySelectorAll("header .lt-qa-avatar-col")).forEach((wrap) => {
      const parent = wrap.parentNode;
      if (!parent) return;
      while (wrap.firstChild) parent.insertBefore(wrap.firstChild, wrap);
      wrap.remove();
    });
  }
  function ensureFeedAvatarColumn(host) {
    return host.querySelector(".flex.justify-start > .flex-none");
  }
  function findStatusChipAnchor(host) {
    const header = host.querySelector("header.flex");
    if (!header) return null;
    const nameRow = header.querySelector(".min-w-0.flex-auto > .truncate")
      || header.querySelector(".min-w-0 .truncate")
      || header.querySelector(".truncate");
    if (!nameRow) return null;
    nameRow.classList.add("lt-qa-status-name");
    const supporter = nameRow.querySelector('a[title="FetLife Supporter"], a[href*="/support?"]');
    if (supporter) {
      return supporter.closest("span.inline-flex, span.relative") || supporter;
    }
    return nameRow.querySelector('a.link[href^="/"][title], a.link.text-base[href^="/"], a.link[href^="/"]');
  }
  function decorateSoftBlockChip(sb) {
    if (!sb) return sb;
    sb.type = "button";
    sb.textContent = "SB";
    sb.title = t("qaSoftBlock");
    sb.setAttribute("aria-label", t("qaSoftBlock"));
    sb.setAttribute("data-lt-qa", "sb");
    return sb;
  }
  function makeSoftBlockChip(nick) {
    const sb = document.createElement("button");
    decorateSoftBlockChip(sb);
    sb.addEventListener("click", (e) => {
      e.preventDefault(); e.stopPropagation();
      softBlockNick(nick);
    });
    return sb;
  }
  /* Home feed: Soft-block chip under avatar / beside status name. */
  function enhanceFeedStoryActions() {
    if (!isHomeFeed() || isMediaPage()) return;
    const seen = new Set();
    getFeedStories().forEach((el) => {
      const host = feedStoryHost(el);
      if (!host) return;
      const uid = host.getAttribute("data-story-uid") || "";
      if (uid) {
        if (seen.has(uid)) return;
        seen.add(uid);
      }
      const status = isStatusFeedStory(host);
      if (status) unwrapLegacyStatusAvatarCol(host);
      const existing = Array.from(host.querySelectorAll(".lt-qa-feed"));
      if (existing.length) {
        existing.slice(1).forEach((n) => n.remove());
        const keep = existing[0];
        if (!keep.querySelector("[data-lt-qa='sb']")) {
          const nick = storyAuthorNick(host);
          if (nick) keep.appendChild(makeSoftBlockChip(nick));
        } else {
          const sb = keep.querySelector("[data-lt-qa='sb']");
          if (sb) decorateSoftBlockChip(sb);
        }
        if (status && keep) {
          const mount = findStatusChipAnchor(host);
          if (mount) {
            keep.classList.add("lt-qa-feed-inline");
            if (keep.previousElementSibling !== mount) mount.insertAdjacentElement("afterend", keep);
          }
        } else if (!status && keep) {
          keep.classList.remove("lt-qa-feed-inline");
        }
        return;
      }
      const nick = storyAuthorNick(host);
      if (!nick) return;
      const mount = status ? findStatusChipAnchor(host) : ensureFeedAvatarColumn(host);
      if (!mount || !mount.parentNode) return;
      const bar = document.createElement("div");
      bar.className = "lt-qa-bar lt-qa-feed" + (status ? " lt-qa-feed-inline" : "");
      if (uid) bar.setAttribute("data-lt-story", uid);
      bar.appendChild(makeSoftBlockChip(nick));
      if (status) mount.insertAdjacentElement("afterend", bar);
      else mount.appendChild(bar);
    });
  }

  function enhanceMemberCardActions() {
    if (!isListPage() || isMediaPage()) return;
    getMemberCards().forEach((card) => {
      const face = cardFace(card);
      if (!face) return;
      const nick = cardNickname(card);
      if (!nick) return;
      const existing = face.querySelector(".lt-qa-bar");
      if (existing) {
        if (!existing.querySelector("[data-lt-qa='sb']")) {
          existing.appendChild(makeSoftBlockChip(nick));
        } else {
          decorateSoftBlockChip(existing.querySelector("[data-lt-qa='sb']"));
        }
        return;
      }
      const bar = document.createElement("div");
      bar.className = "lt-qa-bar";
      bar.appendChild(makeSoftBlockChip(nick));
      face.appendChild(bar);
    });
  }


  function isHomeFeed() { return /^\/home(?:\/|$)/.test(location.pathname || ""); }

  const READ_KEY = "fl_read_stories_session";
  function readStorySet() {
    try { return new Set(JSON.parse(sessionStorage.getItem(READ_KEY) || "[]")); } catch (_) { return new Set(); }
  }
  function saveReadStories(set) {
    try { sessionStorage.setItem(READ_KEY, JSON.stringify(Array.from(set).slice(-800))); } catch (_) {}
  }
  function getFeedStories() {
    return Array.from(document.querySelectorAll("[data-story-uid]"));
  }
  function clearStoryReadDim() {
    document.querySelectorAll(".lt-story-read").forEach((el) => el.classList.remove("lt-story-read"));
  }
  function markStoryRead(id) {
    if (!id) return;
    const set = readStorySet();
    if (set.has(id)) return;
    set.add(id);
    saveReadStories(set);
    /* No opacity paint — N (next unread) still uses the set. */
  }
  function setupReadTracking() {
    if (setupReadTracking.io) { setupReadTracking.io.disconnect(); setupReadTracking.io = null; }
    clearStoryReadDim();
    if (!isHomeFeed()) return;
    /* Track read for jump-next only; do not dim the feed. */
    setupReadTracking.io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          markStoryRead(entry.target.getAttribute("data-story-uid"));
        }
      });
    }, { threshold: [0.45] });
    getFeedStories().forEach((el) => setupReadTracking.io.observe(el));
  }
  function jumpNextUnread() {
    const read = readStorySet();
    const stories = getFeedStories();
    let next = stories.find((el) => !read.has(el.getAttribute("data-story-uid")) && el.getBoundingClientRect().top > 90);
    if (!next) next = stories.find((el) => !read.has(el.getAttribute("data-story-uid")));
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function wireSiteControls() {
    if (wireSiteControls.bound) return;
    if (!document.getElementById("fl-nsfw-toggle")) return;
    wireSiteControls.bound = true;
    ["fl-nsfw-toggle", "fl-blur-avatars", "fl-blur-videos"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", persistDisplay);
    });
    const blur = document.getElementById("fl-sfw-blur");
    if (blur) blur.addEventListener("input", persistDisplay);
    applyDisplayMode(loadDisplaySettings().mode);
  }
  function buildSitePanel() {
    if (document.getElementById("fl-site-panel")) { wireSiteControls(); return; }
    const ds = loadDisplaySettings();
    const box = document.createElement("div");
    box.id = "fl-site-panel";
    box.className = "fl-tool-panel";
    box.innerHTML =
      '<div class="fl-tool-header" id="fl-site-header"><div class="fl-tool-title">' + t("nsfwPanel") +
      '</div><button type="button" id="fl-site-toggle" class="fl-tool-chevron" aria-expanded="false" aria-controls="fl-site-body" aria-label="' + t("expandPanel") + '">▸</button></div>' +
      '<div id="fl-site-body" class="fl-tool-body fl-tool-hidden">' +
      '<div class="life-hint">' + t("nsfwHint") + "</div>" +
      switchHtml("fl-nsfw-toggle", t("nsfwMode"), ds.mode !== "sfw") +
      '<div class="life-hint" id="fl-nsfw-state">' + (ds.mode === "sfw" ? t("modeSfw") : t("modeNsfw")) + "</div>" +
      '<label style="display:block;margin:8px 0 4px;">' + t("sfwBlur") + ' (<span id="fl-blur-val">' + ds.blurPx + "</span>px)</label>" +
      '<input id="fl-sfw-blur" type="range" min="1" max="10" step="1" value="' + ds.blurPx + '">' +
      switchHtml("fl-blur-avatars", t("blurAvatars"), !!ds.blurAvatars) +
      switchHtml("fl-blur-videos", t("blurVideos"), ds.blurVideos !== false) +
      "</div>";
    ensureDock().appendChild(box);
    document.getElementById("fl-site-header").addEventListener("click", (e) => {
      if (dockDidDrag) { dockDidDrag = false; return; }
      if (e.target.closest("input, label")) return;
      const body = document.getElementById("fl-site-body");
      const open = body.classList.contains("fl-tool-hidden");
      setPanelOpenState("fl-site-body", "fl-site-toggle", open);
      if (open) collapseOtherPanels("fl-site-panel");
      else syncOpenPanelHighlight();
    });
    wireSiteControls();
  }

  function applyExtras() {
    const settings = document.getElementById("fl-filter-panel") ? getCurrentFilterSettings() : loadFilterSettings();
    applyBannerPref();
    applySeenChips(settings);
    rememberPlace();
    warnIfSelectorsBroken();
    applyFeedFilter(settings);
    if (isMediaPage()) { /* skip */ }
    else if (isProfileHome()) scheduleExcludeBlur();
    else applyExcludeBlur(settings);
    applyDisplayMode(loadDisplaySettings().mode);
    tagSmallImages();
    setupOpenedTracking();
    setupReadTracking();
    setupHomeScrollRestore();
    setupThemeSync();
    ensurePanelSearch();
    enhanceMemberCardActions();
    enhanceFeedStoryActions();
  }
  function cancelOutsideDockHide() {
    if (outsideDockHideTimer) {
      clearTimeout(outsideDockHideTimer);
      outsideDockHideTimer = null;
    }
  }
  function setupKeyboard() {
    if (setupKeyboard.bound) return;
    setupKeyboard.bound = true;
    document.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (/INPUT|TEXTAREA|SELECT/.test(tag) || e.target.isContentEditable) return;
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        const body = document.getElementById("fl-panel-body");
        if (body) {
          const open = body.classList.contains("fl-tool-hidden");
          setPanelOpenState("fl-panel-body", "fl-panel-toggle", open);
          localStorage.setItem("fl_panel_collapsed", open ? "0" : "1");
          if (open) collapseOtherPanels("fl-filter-panel");
          syncOpenPanelHighlight();
          syncDockGrowDirection();
        }
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        toggleNsfwMode();
      } else if (e.key === "n" || e.key === "N") {
        jumpNextUnread();
      } else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "Escape") {
        collapseOtherPanels("");
        const body = document.getElementById("fl-panel-body");
        if (body) body.classList.add("fl-tool-hidden");
      }
    });
  }

  /* Build the Profile Filter UI once. Submenus: Location, Relationship Settings. */
  function buildFilterPanel() {
    if (document.getElementById("fl-filter-panel")) return;
    registerExistingCards();
    currentNextPageUrl = findNextPageUrl(document);
    const s = loadFilterSettings();
    const panel = document.createElement("div");
    panel.id = "fl-filter-panel";
    panel.className = "fl-tool-panel";
    panel.innerHTML =
      '<div class="fl-tool-header" id="fl-panel-header"><div class="fl-tool-title">' + t("profileSettings") +
      '</div><button type="button" id="fl-panel-toggle" class="fl-tool-chevron" aria-expanded="true" aria-controls="fl-panel-body" aria-label="' + t("collapsePanel") + '">▾</button></div>' +
      '<div id="fl-panel-body" class="fl-tool-body">' +
      '<label style="display:block;margin-bottom:4px;">' + t("combineMode") + "</label>" +
      '<select id="fl-combine-mode" style="margin-bottom:8px">' +
      '<option value="and"' + ((s.combineMode || "and") !== "or" ? " selected" : "") + ">" + t("combineAnd") + "</option>" +
      '<option value="or"' + (s.combineMode === "or" ? " selected" : "") + ">" + t("combineOr") + "</option>" +
      "</select>" +
      '<label style="display:block;margin-bottom:4px;">' + t("matchScope") + "</label>" +
      '<select id="fl-match-scope" style="margin-bottom:8px">' +
      '<option value="card"' + ((s.matchScope || "card") === "card" ? " selected" : "") + ">" + t("scopeCard") + "</option>" +
      '<option value="tag"' + (s.matchScope === "tag" ? " selected" : "") + ">" + t("scopeTag") + "</option>" +
      '<option value="nick"' + (s.matchScope === "nick" ? " selected" : "") + ">" + t("scopeNick") + "</option>" +
      "</select>" +
      '<label style="display:block;margin-bottom:4px;">' + t("roleMode") + "</label>" +
      '<select id="fl-role-mode" style="margin-bottom:8px">' +
      '<option value="must"' + ((s.roleMode || "must") !== "prefer" ? " selected" : "") + ">" + t("roleMust") + "</option>" +
      '<option value="prefer"' + (s.roleMode === "prefer" ? " selected" : "") + ">" + t("rolePrefer") + "</option>" +
      "</select>" +
      '<div class="life-hint">' + t("matchFiltersHint") + "</div>" +
      '<label style="display:block;margin-bottom:4px;">' + t("ageRange") + "</label>" +
      '<div style="display:flex;gap:6px;margin-bottom:8px;">' +
      '<input id="fl-min-age" type="number" min="18" max="9999" style="width:50%" value="' + escapeAttr(s.minAge || "18") + '">' +
      '<input id="fl-max-age" type="number" min="18" max="9999" style="width:50%" value="' + escapeAttr(s.maxAge || "80") + '"></div>' +
      chipFieldHtml("fl-genders", t("genderFilter"), t("genderPh"), s.genders || "") +
      chipFieldHtml("fl-roles", t("roleFilter"), t("rolePh"), s.roles || "") +
      '<hr class="life-hr">' +
      '<div class="life-hint">' + t("limitsFiltersHint") + "</div>" +
      chipFieldHtml("fl-limits", t("limitsFilter"), t("limitsPh"), s.limits || "") +
      '<div id="fl-filter-count" style="margin:8px 0;font-size:12px;"></div>' +
      '<div id="fl-selector-warn" class="fl-tool-hidden"></div>' +
      '<div id="fl-last-place" class="life-hint"></div>' +
      '<div id="fl-loc-wrap"><hr class="life-hr">' +
      '<div class="life-subhead" id="fl-loc-toggle"><span>' + t("locationSettings") + '</span><span id="fl-loc-chevron">▸</span></div>' +
      '<div id="fl-loc-body" class="fl-tool-hidden">' +
      chipFieldHtml("fl-cities", t("citiesFilter"), t("citiesPh"), s.cities || "") +
      '<label style="display:block;margin-bottom:4px;">' + t("myCity") + "</label>" +
      '<input id="fl-my-city" type="text" placeholder="' + escapeAttr(t("myCityPh")) + '" value="' + escapeAttr(s.myCity || "") + '" style="margin-bottom:6px;width:100%;box-sizing:border-box;">' +
      switchHtml("fl-same-city-only", t("sameCityOnly"), !!s.sameCityOnly) +
      "</div></div>" +
      '<div id="fl-rel-wrap"><hr class="life-hr">' +
      '<div class="life-subhead" id="fl-rel-toggle"><span>' + t("relSettings") + '</span><span id="fl-rel-chevron">▸</span></div>' +
      '<div id="fl-rel-body" class="fl-tool-hidden"><div class="life-hint">' + t("relHint") + "</div>" +
      switchHtml("fl-rel-follow", t("relNone"), s.relFollow) +
      switchHtml("fl-rel-following", t("relFollowing"), s.relFollowing) +
      switchHtml("fl-rel-followsyu", t("relFollowsYou"), s.relFollowsYou) +
      switchHtml("fl-rel-friends", t("relFriends"), s.relFriends) + "</div></div></div>";
        ensureDock().insertBefore(panel, ensureDock().firstChild);

    const panelBody = document.getElementById("fl-panel-body");
    const toggleBtn = document.getElementById("fl-panel-toggle");
    function setCollapsed(collapsed) {
      setPanelOpenState("fl-panel-body", "fl-panel-toggle", !collapsed);
      localStorage.setItem("fl_panel_collapsed", collapsed ? "1" : "0");
      if (!collapsed) collapseOtherPanels("fl-filter-panel");
      else syncOpenPanelHighlight();
    }
    setCollapsed(localStorage.getItem("fl_panel_collapsed") !== "0");
    document.getElementById("fl-panel-header").addEventListener("click", (e) => {
      if (dockDidDrag) { dockDidDrag = false; return; }
      if (e.target.closest("input, textarea, button, select") && e.target.id !== "fl-panel-toggle") return;
      setCollapsed(!panelBody.classList.contains("fl-tool-hidden"));
    });
    function bindSubmenuGroup(items) {
      function setOpen(item, open) {
        const body = document.getElementById(item.body);
        const chevron = document.getElementById(item.chevron);
        if (!body) return;
        body.classList.toggle("fl-tool-hidden", !open);
        if (chevron) chevron.textContent = open ? "▾" : "▸";
      }
      items.forEach((item) => {
        const toggle = document.getElementById(item.toggle);
        if (!toggle) return;
        toggle.addEventListener("click", (e) => {
          e.stopPropagation();
          const body = document.getElementById(item.body);
          const opening = body && body.classList.contains("fl-tool-hidden");
          items.forEach((other) => setOpen(other, opening && other.body === item.body));
        });
      });
    }
    bindSubmenuGroup([
      { toggle: "fl-loc-toggle", body: "fl-loc-body", chevron: "fl-loc-chevron" },
      { toggle: "fl-rel-toggle", body: "fl-rel-body", chevron: "fl-rel-chevron" }
    ]);
    ["fl-combine-mode", "fl-match-scope", "fl-role-mode"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", autoApplyFilters);
    });
    const dockSel = document.getElementById("fl-dock-anchor");
    if (dockSel) dockSel.addEventListener("change", () => {
      const next = getCurrentFilterSettings();
      saveFilterSettings(next);
      applyDockPlacement(next.dockAnchor);
    });
    ["fl-genders", "fl-roles", "fl-limits", "fl-cities"].forEach(bindChipField);
    ["fl-min-age", "fl-max-age"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("change", autoApplyFilters);
      el.addEventListener("input", () => {
        clearTimeout(el._t);
        el._t = setTimeout(autoApplyFilters, 400);
      });
    });
    const sortSel = document.getElementById("fl-sort-by");
    if (sortSel) sortSel.addEventListener("change", () => { const next = getCurrentFilterSettings(); saveFilterSettings(next); sortLoadedCards(next.sortBy); });
    ["fl-rel-follow", "fl-rel-following", "fl-rel-followsyu", "fl-rel-friends", "fl-same-city-only"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", autoApplyFilters);
    });
    const myCityEl = document.getElementById("fl-my-city");
    if (myCityEl) {
      myCityEl.addEventListener("change", autoApplyFilters);
      myCityEl.addEventListener("input", () => {
        clearTimeout(myCityEl._t);
        myCityEl._t = setTimeout(autoApplyFilters, 400);
      });
    }
    const relWrap = document.getElementById("fl-rel-wrap");
    if (relWrap) relWrap.style.display = /friends|following|followers/.test(pageKind()) ? "" : "none";
    wireSiteControls();
    setupInfiniteScroll();
    applyFilter(s);
  }

  function buildAdvancedPanel() {
    if (document.getElementById("fl-advanced-panel")) return;
    const s = loadFilterSettings();
    const box = document.createElement("div");
    box.id = "fl-advanced-panel";
    box.className = "fl-tool-panel";
    const mode = s.orgMode || (s.hideOrgs ? "hide" : "off");
    box.innerHTML =
      '<div class="fl-tool-header" id="fl-advanced-header"><div class="fl-tool-title">' + t("advancedSettings") +
      '</div><button type="button" id="fl-advanced-toggle" class="fl-tool-chevron" aria-expanded="false" aria-controls="fl-advanced-body" aria-label="' + t("expandPanel") + '">▸</button></div>' +
      '<div id="fl-advanced-body" class="fl-tool-body fl-tool-hidden">' +
      '<label style="display:block;margin-bottom:4px;">' + t("orgFilter") + "</label>" +
      '<select id="fl-org-mode" style="margin-bottom:8px">' +
      '<option value="off"' + ((mode !== "dim" && mode !== "hide") ? " selected" : "") + ">" + t("orgShow") + "</option>" +
      '<option value="dim"' + (mode === "dim" ? " selected" : "") + ">" + t("orgDim") + "</option>" +
      '<option value="hide"' + (mode === "hide" ? " selected" : "") + ">" + t("orgHide") + "</option>" +
      "</select>" +
      switchHtml("fl-auto-scroll", t("infiniteScroll"), s.autoScroll) +
      switchHtml("fl-show-toasts", t("showToasts"), s.showToasts !== false) +
      switchHtml("fl-show-seen-chip", t("showSeenChip"), showSeenChipEnabled(s)) +
      switchHtml("fl-hide-banners", t("hideBanners"), !!s.hideBanners) +
      "</div>";
    ensureDock().appendChild(box);
    document.getElementById("fl-advanced-header").addEventListener("click", (e) => {
      if (dockDidDrag) { dockDidDrag = false; return; }
      if (e.target.closest("input, label, select, button") && e.target.id !== "fl-advanced-toggle") return;
      const body = document.getElementById("fl-advanced-body");
      const open = body.classList.contains("fl-tool-hidden");
      setPanelOpenState("fl-advanced-body", "fl-advanced-toggle", open);
      if (open) collapseOtherPanels("fl-advanced-panel");
      else syncOpenPanelHighlight();
    });
    const applyAdv = () => {
      const next = getCurrentFilterSettings();
      next.orgMode = val("fl-org-mode") || "off";
      if (next.orgMode !== "off" && next.orgMode !== "dim" && next.orgMode !== "hide") next.orgMode = "off";
      next.hideOrgs = next.orgMode === "hide";
      next.showSeenChip = checked("fl-show-seen-chip");
      next.dimSeenToday = next.showSeenChip;
      saveFilterSettings(next);
      applyFilter(next);
      applySeenChips(next);
    };
    ["fl-org-mode", "fl-auto-scroll", "fl-show-toasts", "fl-show-seen-chip", "fl-hide-banners"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", applyAdv);
    });
    const seenChipEl = document.getElementById("fl-show-seen-chip");
    if (seenChipEl) seenChipEl.addEventListener("change", () => applySeenChips(getCurrentFilterSettings()));
    setupInfiniteScroll();
  }


  function buildJumpPanel() {
    const dock = ensureDock();
    let row = document.getElementById("fl-dock-actions");
    if (!row) {
      row = document.createElement("div");
      row.id = "fl-dock-actions";
      dock.appendChild(row);
    }
    let jump = document.getElementById("fl-jump-top");
    if (!jump) {
      jump = document.createElement("button");
      jump.type = "button";
      jump.id = "fl-jump-top";
      jump.textContent = t("jumpTop");
      jump.title = t("jumpTop") + " (T)";
      jump.addEventListener("click", (e) => {
        e.stopPropagation();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    if (jump.parentNode !== row) row.appendChild(jump);
    else jump.textContent = t("jumpTop");
    if (row.parentNode === dock) dock.appendChild(row);
    const staleQuick = document.getElementById("fl-quick-save");
    if (staleQuick) staleQuick.remove();
    const staleHide = document.getElementById("fl-hide-dock-btn");
    if (staleHide) staleHide.remove();
    buildShortcutsPanel();
    const sc = document.getElementById("fl-shortcuts-panel");
    if (sc && sc.parentNode === dock && row.parentNode === dock) {
      dock.insertBefore(sc, row);
    }
  }

  function syncDockPanelTitles() {
    const map = {
      "fl-block-header": "blockPanel",
      "fl-panel-header": "profileSettings",
      "fl-site-header": "nsfwPanel",
      "fl-advanced-header": "advancedSettings",
      "fl-shortcuts-header": "shortcuts"
    };
    Object.keys(map).forEach((hid) => {
      const header = document.getElementById(hid);
      if (!header) return;
      const title = header.querySelector(".fl-tool-title");
      if (title) title.textContent = t(map[hid]);
    });
  }

  function buildShortcutsPanel() {
    let box = document.getElementById("fl-shortcuts-panel");
    const legendHtml =
      '<div class="flhp-legend">' +
      '<div class="flhp-legend-row"><strong>S</strong> — NSFW / SFW</div>' +
      '<div class="flhp-legend-row"><strong>F</strong> — filters panel</div>' +
      '<div class="flhp-legend-row"><strong>N</strong> — next unread</div>' +
      '<div class="flhp-legend-row"><strong>Esc</strong> — collapse panels</div>' +
      '<div class="flhp-legend-row"><strong>T</strong> — jump to top</div>' +
      "</div>";
    if (!box) {
      box = document.createElement("div");
      box.id = "fl-shortcuts-panel";
      box.className = "fl-tool-panel";
      box.innerHTML =
        '<div class="fl-tool-header" id="fl-shortcuts-header"><div class="fl-tool-title">' + t("shortcuts") +
        '</div><button type="button" id="fl-shortcuts-toggle" class="fl-tool-chevron" aria-expanded="false" aria-controls="fl-shortcuts-body" aria-label="' + t("expandPanel") + '">▸</button></div>' +
        '<div id="fl-shortcuts-body" class="fl-tool-body fl-tool-hidden">' + legendHtml + "</div>";
      ensureDock().appendChild(box);
      document.getElementById("fl-shortcuts-header").addEventListener("click", (e) => {
        if (dockDidDrag) { dockDidDrag = false; return; }
        if (e.target.closest("input, label, select, button") && e.target.id !== "fl-shortcuts-toggle") return;
        const body = document.getElementById("fl-shortcuts-body");
        const open = body.classList.contains("fl-tool-hidden");
        setPanelOpenState("fl-shortcuts-body", "fl-shortcuts-toggle", open);
        if (open) collapseOtherPanels("fl-shortcuts-panel");
        else syncOpenPanelHighlight();
        syncDockGrowDirection();
      });
    }
  }

  function isCommentRelatedNode(node) {
    if (!node || node.nodeType !== 1) return false;
    const hit = (el) => {
      if (!el || el.nodeType !== 1) return false;
      const id = (el.id || "").toLowerCase();
      const cls = (typeof el.className === "string" ? el.className : "").toLowerCase();
      const dc = (el.getAttribute && (el.getAttribute("data-controller") || "")) || "";
      if (id.indexOf("comment") >= 0) return true;
      if (cls.indexOf("comment") >= 0) return true;
      if (/comment/i.test(dc)) return true;
      const action = (el.getAttribute && (el.getAttribute("action") || "")) || "";
      if (el.tagName === "FORM" && /comment/i.test(action)) return true;
      return false;
    };
    if (hit(node)) return true;
    if (node.closest) {
      if (node.closest("[data-controller*='comment']")) return true;
      if (node.closest("#comments, .comments, [data-comments]")) return true;
      if (node.closest("form[action*='comment']")) return true;
      /* Walk ancestors with case-insensitive id/class/controller checks (no CSS i-flag). */
      let p = node.parentElement;
      for (let i = 0; p && i < 12; i += 1, p = p.parentElement) {
        if (hit(p)) return true;
      }
    }
    return false;
  }
  let excludeBlurTimer = null;
  let excludeBlurDonePath = "";
  let excludeBlurDoneWithSections = false;
  function resetExcludeBlurPathState() {
    excludeBlurDonePath = "";
    excludeBlurDoneWithSections = false;
    if (excludeBlurTimer) { clearTimeout(excludeBlurTimer); excludeBlurTimer = null; }
  }
  /** Debounced profile-home exclude/soft-block scan — once per pathname; re-run if key sections appear later. */
  function scheduleExcludeBlur() {
    if (!isProfileHome()) return;
    const path = location.pathname || "";
    const hasSections = profileKeySectionsPresent();
    if (path === excludeBlurDonePath && excludeBlurDoneWithSections) return;
    if (path === excludeBlurDonePath && !hasSections) return;
    if (excludeBlurTimer) clearTimeout(excludeBlurTimer);
    excludeBlurTimer = setTimeout(function () {
      excludeBlurTimer = null;
      if (!isProfileHome()) return;
      const p = location.pathname || "";
      const sections = profileKeySectionsPresent();
      if (p === excludeBlurDonePath && excludeBlurDoneWithSections) return;
      if (p === excludeBlurDonePath && !sections) return;
      applyExcludeBlur(loadFilterSettings());
      excludeBlurDonePath = p;
      excludeBlurDoneWithSections = sections;
    }, 500);
  }


  function boot() {
    try {
      try { localStorage.removeItem("fl_filter_presets"); } catch (_) {}
      ensureDock(); ensurePanelSearch(); buildFilterPanel(); buildDisplayPanel(); buildSitePanel(); buildAdvancedPanel(); ensureBlockPanel(); buildJumpPanel(); unnestFromToolsStack(); syncDockPanelTitles(); restoreLastDockPanel();
     
      applyFilter(getCurrentFilterSettings()); applyExtras(); setupKeyboard();
      setupHomeScrollRestore(); setupThemeSync();
      if (isProfileHome()) scheduleExcludeBlur();
    } catch (err) { console.error("FL_Tools boot error:", err); }
  }
  let debounce = null;
  function schedule() {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(function () {
      try {
        ensureDock(); buildFilterPanel(); buildDisplayPanel(); buildSitePanel(); buildAdvancedPanel(); ensureBlockPanel(); buildJumpPanel(); unnestFromToolsStack(); syncDockPanelTitles(); restoreLastDockPanel();
        /* Media detail: keep dock/panels alive, avoid full filter/extras storms while comments load. */
        if (isMediaPage()) {
          applyDisplayMode(loadDisplaySettings().mode);
          rememberOpenedHref(location.href);
          setupOpenedTracking();
          setupKeyboard();
         
          ensurePanelSearch();
          setupThemeSync();
         
          return;
        }
        /* Profile home: light panels + debounced exclude blur; skip filter/highlight card storms. */
        if (isProfileHome()) {
          applyDisplayMode(loadDisplaySettings().mode);
         
          setupKeyboard();
         
          scheduleExcludeBlur();
          return;
        }
        applyFilter(getCurrentFilterSettings()); applyExtras();
      } catch (err) { console.error("FL_Tools schedule error:", err); }
    }, 120);
  }
  function start() {
    /* Page-world single-flight: Pro (or another Basic) already owns the page. */
    try {
      const page =
        (typeof unsafeWindow !== "undefined" && unsafeWindow) ||
        window;
      if (page.__FL_TOOLS_BOOTED__) return;
      if (page.__FL_TOOLS_CLAIM__ === "pro") return;
      try {
        if (sessionStorage.getItem("fl_tools_claim") === "pro") return;
      } catch (_) {}
      const root = document.documentElement;
      if (root.getAttribute("data-fl-tools-claim") === "pro" ||
          root.getAttribute("data-fl-tools-edition") === "pro") return;
      page.__FL_TOOLS_BOOTED__ = "basic";
      page.__FL_TOOLS_CLAIM__ = page.__FL_TOOLS_CLAIM__ || "basic";
    } catch (_) {}
    /* Another instance already built the dock — do not double-boot. */
    if (document.getElementById("fl-tools-dock")) return;
    try { ensureDock(); buildFilterPanel(); buildDisplayPanel(); buildSitePanel(); buildAdvancedPanel(); ensureBlockPanel(); buildJumpPanel(); unnestFromToolsStack(); syncDockPanelTitles(); restoreLastDockPanel(); } catch (err) { console.error(err); }
    boot();
    setTimeout(boot, 800);
    setTimeout(boot, 2500);
    /* Re-apply when the site adds page nodes (ignore dock / our chips). */
    new MutationObserver(function (mutations) {
      let dockTouched = false;
      for (const m of mutations) {
        for (const node of m.addedNodes || []) {
          if (node.nodeType !== 1) continue;
          if (node.closest && (node.closest("#fl-tools-dock") || node.closest(".lt-hide-reason") || node.closest(".lt-limit-hl") || node.closest("mark.lt-limit-hl"))) continue;
          if (isCommentRelatedNode(node)) continue;
          const id = node.id || "";
          if (id.indexOf("relation_button") === 0 || (node.closest && node.closest("turbo-frame[id^='relation_button']"))) {
            applyFilter(getCurrentFilterSettings());
           
            return;
          }
          /* Profile home: like media — light dock + debounced once-per-path exclude blur; no sync scan. */
          if (isProfileHome()) {
            if (!dockTouched) { dockTouched = true; ensureDock(); }
            scheduleExcludeBlur();
            continue;
          }
          /* Media detail: light dock ensure only; no schedule / heavy extras. */
          if (isMediaPage()) {
            if (!dockTouched) { dockTouched = true; ensureDock(); }
            continue;
          }
          const member = (node.matches && node.matches("[data-member-card], .w-full.rounded-sm.cursor-pointer")) ||
            (node.querySelector && node.querySelector("[data-member-card], .w-full.rounded-sm.cursor-pointer"));
          const story = isHomeFeed() && (
            (node.matches && node.matches("[data-story-uid]")) ||
            (node.querySelector && node.querySelector("[data-story-uid]"))
          );
          if (!member && !story) continue;
          schedule();
          return;
        }
      }
    }).observe(document.body || document.documentElement, { childList: true, subtree: true });
    document.addEventListener("turbo:load", () => {
      resetExcludeBlurPathState();
      schedule();
     
      ensurePanelSearch();
      applyThemeSync();
      scheduleMarkupSelfCheck();
    });
    document.addEventListener("turbo:frame-load", (e) => {
      const id = (e.target && e.target.id) || "";
      if (id.indexOf("relation_button") === 0) {
        applyFilter(getCurrentFilterSettings());
       
        return;
      }
      if (isProfileHome()) {
        scheduleExcludeBlur();
        return;
      }
      if (isMediaPage()) {
        rememberOpenedHref(location.href);
        return;
      }
      if (e.target && e.target.querySelector && e.target.querySelector("[data-member-card]")) schedule();
    });
  }
  if (document.readyState === "interactive" || document.readyState === "complete") start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
})();
