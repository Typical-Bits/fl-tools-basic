// ==UserScript==
// @name         FL Tools Basic
// @namespace    https://fetlife.com/
// @version      2.4.0
// @updateURL    https://github.com/Typical-Bits/fl-tools-basic/releases/latest/download/FL_Tools_Basic.user.js
// @downloadURL  https://github.com/Typical-Bits/fl-tools-basic/releases/latest/download/FL_Tools_Basic.user.js
// @description  Customize FetLife with profile filters, soft-blocking, seen markers, media controls and easier navigation. Works with Studio and yields to Pro when installed.
// @tag          FetLife
// @tag          FL Tools
// @tag          Social Media
// @description  FetLife dock: filters, soft-block, NSFW/SFW, Seen chip, basic navigation, infinite scroll. Yields to live FL_Tools Pro.
// @author       TypicalBits
// @license      CC-BY-NC-4.0
// @icon        https://raw.githubusercontent.com/Typical-Bits/fl-tools-basic/main/assets/fl-tools-basic-icon-64.png?asset=4217521d9bba
// @iconURL     https://raw.githubusercontent.com/Typical-Bits/fl-tools-basic/main/assets/fl-tools-basic-icon-64.png?asset=4217521d9bba
// @defaulticon https://raw.githubusercontent.com/Typical-Bits/fl-tools-basic/main/assets/fl-tools-basic-icon-64.png?asset=4217521d9bba
// @match        https://fetlife.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
/*
  FL_Tools Basic v2.3.1 — standalone dock (filters, soft-block, NSFW/SFW, Seen, navigation).
  Local-only; English UI; DOM-only (no private APIs).
*/

(function flToolsInit() {
  "use strict";
  // Some managers inject before <html> exists; defer safely instead of aborting startup.
  if (!document.documentElement) {
    document.addEventListener("DOMContentLoaded", flToolsInit, { once: true });
    return;
  }

  /* BEGIN generated:launcher-grid */
  /*
   * FL Tools shared launcher grid.
   *
   * Basic is the preferred host for this coordinator. Other editions vendor
   * this file as an offline fallback, but they yield to Basic whenever the
   * page-level owner marker says that Basic is present.
   */
  function createFLToolsLauncherGrid(provider, options) {
    "use strict";

    options = options || {};
    provider = String(provider || "edition").toLowerCase();
    const doc = options.document || (typeof document !== "undefined" ? document : null);
    const win = options.window || (typeof window !== "undefined" ? window : null);
    const PROTOCOL = "userscript-launcher-grid-v2";
    const OWNER_ATTR = "data-fl-tools-grid-owner";
    const LAUNCHER_PROTOCOL = "userscript-launcher-v1";
    const TOP_KEY = "fl_tools_grid_anchor_top_v3";
    const PRIORITY = Object.freeze({ studio: 100, vault: 200, basic: 300, pro: 400 });
    const GRID = Object.freeze({ columns: 2, rows: 4, gap: 12, edge: 12, minEdge: 8 });
    const SELECTOR = [
      `[data-userscript-launcher="${LAUNCHER_PROTOCOL}"]`,
      "#fl-settings-launcher",
      "#fl-studio-launcher",
      "#fl-vault-launcher"
    ].join(",");

    function noOp() {
      return {
        protocol: PROTOCOL,
        provider,
        register(node, meta) { return declare(node, meta || {}); },
        declare,
        position() { return null; },
        positionGrid() { return null; },
        isManaged() { return false; },
        isDragging() { return false; },
        getNodes() { return []; },
        menuPlacement() { return null; },
        setTop() { return null; }
      };
    }

    function declare(node, meta) {
      if (!node) return null;
      meta = meta || {};
      node.dataset.userscriptLauncher = LAUNCHER_PROTOCOL;
      node.dataset.launcherOwner = meta.owner || "TypicalBits";
      if (meta.id) node.dataset.launcherId = meta.id;
      const priority = meta.priority == null ? PRIORITY[meta.edition] || 0 : meta.priority;
      node.dataset.launcherPriority = String(priority);
      node.dataset.launcherPreferredPosition = meta.preferredPosition || "right-bottom";
      return node;
    }

    if (!doc || !win || !doc.documentElement) return noOp();

    function emit(name, detail) {
      try {
        if (typeof win.CustomEvent === "function") win.dispatchEvent(new win.CustomEvent(name, { detail }));
      } catch (_) {}
    }

    function ownsGrid() {
      const html = doc.documentElement;
      let current = html.getAttribute(OWNER_ATTR) || "";
      const rank = { basic: 4, pro: 3, vault: 2, studio: 1 };
      if (!current || (rank[provider] || 0) > (rank[current] || 0)) {
        html.setAttribute(OWNER_ATTR, provider);
        current = provider;
        emit("userscript-launcher:grid-owner", { protocol: PROTOCOL, owner: provider });
      }
      if (current !== provider) releaseYielded();
      return current === provider;
    }

    function nodeKey(node) {
      return String(node && (node.id || node.dataset?.launcherId || ""));
    }

    function nodePriority(node) {
      return Number(node?.dataset?.launcherPriority || 0);
    }

    function compareNodes(a, b) {
      return nodePriority(b) - nodePriority(a) || nodeKey(a).localeCompare(nodeKey(b));
    }

    function visible(node) {
      if (!node || !node.isConnected || node.hidden) return false;
      try {
        const style = win.getComputedStyle(node);
        return style.display !== "none" && style.visibility !== "hidden" && node.getClientRects().length > 0;
      } catch (_) {
        return true;
      }
    }

    function candidateNodes() {
      return Array.from(doc.querySelectorAll(SELECTOR)).filter(node => node && node.isConnected);
    }

    function dedupe(nodes) {
      const byKey = new Map();
      Array.from(nodes || []).forEach(node => {
        const key = nodeKey(node);
        if (!key) return;
        const previous = byKey.get(key);
        if (!previous || compareNodes(node, previous) < 0) byKey.set(key, node);
      });
      return Array.from(byKey.values()).sort(compareNodes);
    }


    function restoreYielded(node) {
      const previous = yielded.get(node);
      if (!previous) return;
      if (previous.value) node.style.setProperty("display", previous.value, previous.priority || "");
      else node.style.removeProperty("display");
      yielded.delete(node);
      yieldedNodes.delete(node);
      delete node.dataset.launcherGridYielded;
    }

    function yieldNode(node) {
      if (!yielded.has(node)) {
        yielded.set(node, {
          value: node.style.getPropertyValue("display"),
          priority: node.style.getPropertyPriority("display")
        });
      }
      node.dataset.launcherGridYielded = "true";
      node.style.setProperty("display", "none", "important");
      yieldedNodes.add(node);
    }

    function releaseYielded() {
      Array.from(yieldedNodes).forEach(restoreYielded);
    }

    function selectedNodes() {
      const all = candidateNodes();
      if (!ownsGrid()) return { all, selected: dedupe(all.filter(visible)) };
      all.forEach(restoreYielded);
      const visibleNodes = all.filter(visible);
      const selected = dedupe(visibleNodes);
      const selectedSet = new Set(selected);
      visibleNodes.forEach(node => { if (!selectedSet.has(node)) yieldNode(node); });
      return { all, selected };
    }

    function assignSlots(nodes) {
      const ordered = Array.from(nodes || []).sort(compareNodes);
      const anchor = ordered.find(node => node.id === "fl-settings-launcher") ||
        ordered.find(node => node.id === "fl-vault-launcher") || ordered[0];
      const assignments = new Map();
      if (!anchor) return assignments;
      assignments.set(anchor, { row: 0, column: 1 });
      const studio = ordered.find(node => node !== anchor && node.id === "fl-studio-launcher");
      if (studio) assignments.set(studio, { row: 0, column: 0 });
      const free = [{ row: 1, column: 1 }, { row: 0, column: 0 },
        { row: 1, column: 0 }, { row: 2, column: 1 }, { row: 2, column: 0 },
        { row: 3, column: 1 }, { row: 3, column: 0 }];
      ordered.filter(node => !assignments.has(node)).forEach(node => {
        const slot = free.find(candidate => ![...assignments.values()].some(used =>
          used.row === candidate.row && used.column === candidate.column));
        if (slot) assignments.set(node, slot);
      });
      return assignments;
    }

    function readTop(fallback) {
      try {
        const value = Number.parseFloat(win.localStorage?.getItem(TOP_KEY));
        if (Number.isFinite(value)) return value;
        // The previous key stored the upper row, with the anchor one row below.
        const legacy = Number.parseFloat(win.localStorage?.getItem("fl_settings_launcher_top"));
        return Number.isFinite(legacy) ? legacy + 60 : fallback;
      } catch (_) {
        return fallback;
      }
    }

    function writeTop(value) {
      try { win.localStorage?.setItem(TOP_KEY, String(value)); } catch (_) {}
    }

    function clamp(value, low, high) {
      return Math.max(low, Math.min(high, value));
    }

    function rectFor(node) {
      try { return node.getBoundingClientRect(); } catch (_) { return { left: 0, top: 0, right: 0, bottom: 0 }; }
    }

    function occupiedArea(nodes, anchor) {
      const list = Array.from(nodes || []);
      if (!list.length && !anchor) return null;
      const first = rectFor(anchor || list[0]);
      return list.reduce((box, node) => {
        const rect = rectFor(node);
        return {
          left: Math.min(box.left, rect.left),
          top: Math.min(box.top, rect.top),
          right: Math.max(box.right, rect.right),
          bottom: Math.max(box.bottom, rect.bottom)
        };
      }, { left: first.left, top: first.top, right: first.right, bottom: first.bottom });
    }

    function menuPlacement(panel, anchor, nodes) {
      if (!panel || !anchor) return null;
      const area = occupiedArea(nodes, anchor);
      if (!area) return null;
      const width = Number(win.innerWidth) || 1024;
      const height = Number(win.innerHeight) || 768;
      const measured = rectFor(panel);
      const panelWidth = Math.ceil(measured.width || Number(panel.offsetWidth) || 320);
      const panelHeight = Math.ceil(measured.height || Number(panel.offsetHeight) || 280);
      const gap = GRID.gap;
      const edge = GRID.minEdge;
      const zones = [
        { name: "left", left: edge, top: edge, width: area.left - gap - edge, height: height - edge * 2 },
        { name: "right", left: area.right + gap, top: edge, width: width - area.right - gap - edge, height: height - edge * 2 },
        { name: "below", left: edge, top: area.bottom + gap, width: width - edge * 2, height: height - area.bottom - gap - edge },
        { name: "above", left: edge, top: edge, width: width - edge * 2, height: area.top - gap - edge }
      ].map(zone => ({ ...zone, width: Math.max(0, zone.width), height: Math.max(0, zone.height) }));
      const fitting = zones.find(zone => zone.width >= panelWidth && zone.height >= panelHeight);
      const zone = fitting || zones.slice().sort((a, b) => b.width * b.height - a.width * a.height)[0];
      if (!zone) return null;
      const usableWidth = Math.min(panelWidth, zone.width);
      const usableHeight = Math.min(panelHeight, zone.height);
      let left = zone.left;
      let top = zone.top;
      if (zone.name === "left") left = area.left - gap - usableWidth;
      if (zone.name === "right") left = area.right + gap;
      if (zone.name === "below") top = area.bottom + gap;
      if (zone.name === "above") top = area.top - gap - usableHeight;
      return {
        protocol: PROTOCOL,
        zone: zone.name,
        left: clamp(left, edge, Math.max(edge, width - usableWidth - edge)),
        top: clamp(top, edge, Math.max(edge, height - usableHeight - edge)),
        maxWidth: zone.width,
        maxHeight: zone.height
      };
    }

    let queued = false;
    let orientation = null;
    let lastLayout = "";
    let drag = null;
    const yielded = new WeakMap();
    const yieldedNodes = new Set();
    const bound = new WeakSet();

    function suppressClick(node) {
      node.dataset.launcherGridSuppressClick = "true";
      win.setTimeout(() => {
        if (node.dataset.launcherGridSuppressClick === "true") delete node.dataset.launcherGridSuppressClick;
      }, 400);
    }

    function finishDrag(event, cancelled) {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const current = drag;
      drag = null;
      schedule();
      delete current.node.dataset.launcherGridDragging;
      if (current.moved || cancelled) suppressClick(current.node);
      try {
        if (current.node.hasPointerCapture(event.pointerId)) current.node.releasePointerCapture(event.pointerId);
      } catch (_) {}
      if (current.moved) event.stopPropagation();
    }

    function bind(node) {
      if (bound.has(node)) return;
      bound.add(node);
      node.addEventListener("pointerdown", event => {
        if (!ownsGrid() || event.button !== 0 || event.isPrimary === false || drag) return;
        const current = layout();
        const rect = rectFor(node);
        drag = { node, pointerId: event.pointerId, startY: event.clientY, startTop: current?.top ?? rect.top, moved: false };
        node.dataset.launcherGridDragging = "true";
        try { node.setPointerCapture(event.pointerId); } catch (_) {}
      }, true);
      node.addEventListener("pointermove", event => {
        if (!ownsGrid() || !drag || drag.node !== node || event.pointerId !== drag.pointerId) return;
        const delta = event.clientY - drag.startY;
        if (Math.abs(delta) <= 4) return;
        drag.moved = true;
        event.preventDefault();
        event.stopPropagation();
        api.setTop(clamp(drag.startTop + delta, GRID.minEdge, win.innerHeight - 48 - GRID.minEdge));
        emit("userscript-launcher:grid-position", { protocol: PROTOCOL, provider, top: readTop(0) });
      }, true);
      node.addEventListener("pointerup", event => finishDrag(event, false), true);
      node.addEventListener("pointercancel", event => finishDrag(event, true), true);
      node.addEventListener("lostpointercapture", event => finishDrag(event, false), true);
      node.addEventListener("click", event => {
        if (node.dataset.launcherGridSuppressClick !== "true") return;
        event.preventDefault();
        event.stopImmediatePropagation();
        delete node.dataset.launcherGridSuppressClick;
      }, true);
      node.addEventListener("dragstart", event => event.preventDefault(), true);
    }


    function layout() {
      if (!ownsGrid()) return null;
      // Optional Core clients delegate here; Core never installs a competing grid.
      doc.documentElement.__flToolsLauncherGridCoordinator__ = api;
      const state = selectedNodes();
      const list = state.selected;
      if (!list.length) return null;
      const size = 48;
      const anchorTop = clamp(readTop(win.innerHeight - size - GRID.minEdge), GRID.minEdge, win.innerHeight - size - GRID.minEdge);
      if (!orientation) orientation = anchorTop < win.innerHeight / 2 ? "down" : "up";
      if (!drag) {
        if (anchorTop < win.innerHeight / 2 - 40) orientation = "down";
        if (anchorTop > win.innerHeight / 2 + 40) orientation = "up";
      }
      const assignments = assignSlots(list);
      const rows = Math.max(1, ...[...assignments.values()].map(slot => slot.row + 1));
      const occupiedHeight = rows * size + (rows - 1) * GRID.gap;
      const top = clamp(orientation === "up" ? anchorTop - (rows - 1) * (size + GRID.gap) : anchorTop,
        GRID.minEdge, Math.max(GRID.minEdge, win.innerHeight - occupiedHeight - GRID.minEdge));
      list.forEach(node => {
        const slot = assignments.get(node);
        if (!slot) {
          yieldNode(node);
          return;
        }
        restoreYielded(node);
        const right = GRID.edge + (GRID.columns - 1 - slot.column) * (size + GRID.gap);
        for (const property of ["width", "height", "min-width", "min-height", "max-width", "max-height"]) node.style.setProperty(property, size + "px", "important");
        node.style.setProperty("box-sizing", "border-box", "important");
        node.style.setProperty("margin", "0", "important");
        node.style.setProperty("transform", "none", "important");
        node.style.setProperty("position", "fixed", "important");
        node.style.setProperty("right", `${right}px`, "important");
        node.style.setProperty("left", "auto", "important");
        node.style.setProperty("top", `${top + (orientation === "up" ? rows - 1 - slot.row : slot.row) * (size + GRID.gap)}px`, "important");
        node.style.setProperty("bottom", "auto", "important");
        node.dataset.launcherGridManaged = "true";
        node.dataset.launcherGridRow = String(slot.row);
        node.dataset.launcherGridColumn = String(slot.column);
        bind(node);
      });
      doc.documentElement.dataset.flLauncherGridTop = String(Math.round(top));
      doc.documentElement.dataset.flLauncherGridWidth = String(GRID.columns * size + (GRID.columns - 1) * GRID.gap);
      doc.documentElement.dataset.flLauncherGridHeight = String(occupiedHeight);
      const actualAnchorTop = orientation === "up" ? top + (rows - 1) * (size + GRID.gap) : top;
      const signature = [win.innerWidth, win.innerHeight, top, rows, orientation, ...list.map(nodeKey)].join(":");
      if (signature !== lastLayout) { lastLayout = signature; emit("userscript-launcher:grid-position", { protocol: PROTOCOL, provider, top: actualAnchorTop }); }
      return { top: actualAnchorTop, size, gap: GRID.gap, columns: GRID.columns, rows, nodes: list.slice() };
    }

    function schedule() {
      if (queued) return;
      queued = true;
      const run = () => { queued = false; layout(); };
      if (typeof win.requestAnimationFrame === "function") win.requestAnimationFrame(run);
      else win.setTimeout(run, 0);
    }

    const api = {
      protocol: PROTOCOL,
      provider,
      declare,
      register(node, meta) {
        declare(node, meta || {});
        schedule();
        emit("userscript-launcher:grid-register", { protocol: PROTOCOL, provider, id: node?.dataset?.launcherId || node?.id || "" });
        return node;
      },
      position: layout,
      positionGrid: layout,
      isManaged(node) { return !!node && node.dataset?.launcherGridManaged === "true"; },
      isDragging(node) { return !!drag && (!node || drag.node === node); },
      getNodes() { return selectedNodes().selected.slice(); },
      occupiedArea(anchor) {
        const state = selectedNodes();
        return occupiedArea(state.selected, anchor || state.selected[0]);
      },
      menuPlacement(panel, anchor) {
        const state = selectedNodes();
        return menuPlacement(panel, anchor, state.selected);
      },
      placeMenu(panel, anchor) {
        if (!panel || panel.hidden || !anchor) return false;
        const style = panel.style;
        style.setProperty("box-sizing", "border-box", "important");
        style.setProperty("max-width", "calc(100dvw - 16px)", "important");
        style.setProperty("max-height", "calc(100dvh - 16px)", "important");
        const placement = menuPlacement(panel, anchor, selectedNodes().selected);
        if (!placement) return false;
        const values = { position: "fixed", transform: "none", "min-width": "0", "min-height": "0",
          "max-width": "min(" + placement.maxWidth + "px, calc(100dvw - 16px))",
          "max-height": "min(" + placement.maxHeight + "px, calc(100dvh - 16px))",
          left: placement.left + "px", top: placement.top + "px", right: "auto", bottom: "auto",
          "overflow-y": "auto", "overscroll-behavior": "contain" };
        for (const [key, value] of Object.entries(values)) style.setProperty(key, value, "important");
        return true;
      },
      setTop(value) {
        if (!Number.isFinite(Number(value))) return layout();
        writeTop(Number(value));
        return layout();
      }
    };

    ownsGrid();
    win.addEventListener("resize", schedule, { passive: true });
    win.addEventListener("userscript-launcher:change", schedule);
    win.addEventListener("userscript-launcher:grid-register", schedule);
    win.addEventListener("userscript-launcher:grid-owner", schedule);
    if (typeof win.MutationObserver === "function") {
      new win.MutationObserver(schedule).observe(doc.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["hidden", "class", "data-userscript-launcher", "data-launcher-id", "data-launcher-priority", OWNER_ATTR]
      });
    }
    schedule();
    return api;
  }
    const FLToolsLauncherGrid = createFLToolsLauncherGrid("basic");
    try {
      const pageWindow = typeof unsafeWindow !== "undefined" && unsafeWindow ? unsafeWindow : window;
      pageWindow.FLToolsBasicGrid = FLToolsLauncherGrid;
      pageWindow.dispatchEvent(new CustomEvent("fltools:basic-grid-ready", { detail: { protocol: FLToolsLauncherGrid.protocol, provider: "basic" } }));
    } catch (_) {}
  /* END generated:launcher-grid */

  const FL_EDITION = "basic";
  const FL_TOOLS_VERSION = "2.4.0";
  const FL_SETTINGS_SCHEMA = 1;
  const FL_SETTINGS_SCHEMA_KEY = "fl_settings_schema_version";
  const FL_CAPABILITY_PROTOCOL = "fl-tools-capabilities-v1";
  /* BEGIN generated:catalog */
  const FL_CAPABILITIES = Object.freeze([
    "filter.apply",
    "filter.preset",
    "filter.soft-block",
    "seen.mark",
    "seen.reset",
    "display.mode",
    "display.infinite-scroll",
    "navigation.next",
    "navigation.previous"
  ]);
  /* END generated:catalog */
  /* BEGIN generated:presets */
  const FL_FILTER_PRESETS = {"default":{"minAge":"18","maxAge":"80","include":"","exclude":"","genders":"","roles":"","limits":"","minPics":"0","minVids":"0","minWritings":"0","hideOrgs":false,"dimHidden":true,"combineMode":"and","matchScope":"card","roleMode":"must","preferRoles":"","relFollow":true,"relFollowing":true,"relFollowsYou":true,"relFriends":true,"autoScroll":true,"autoloadCount":"100","showToasts":true,"hideBanners":false,"collapsePosts":false,"sortBy":"none","cities":"","sameCityOnly":false,"showSeenChip":true,"dimSeenToday":true},"minimal":{"minAge":"18","maxAge":"80","include":"","exclude":"","genders":"","roles":"","limits":"","minPics":"0","minVids":"0","minWritings":"0","hideOrgs":false,"dimHidden":false,"combineMode":"and","matchScope":"card","roleMode":"must","preferRoles":"","relFollow":true,"relFollowing":true,"relFollowsYou":true,"relFriends":true,"autoScroll":false,"autoloadCount":"100","showToasts":false,"hideBanners":false,"collapsePosts":false,"sortBy":"none","cities":"","sameCityOnly":false,"showSeenChip":false,"dimSeenToday":false},"sfw":{"minAge":"18","maxAge":"80","include":"","exclude":"","genders":"","roles":"","limits":"","minPics":"0","minVids":"0","minWritings":"0","hideOrgs":false,"dimHidden":true,"combineMode":"and","matchScope":"card","roleMode":"must","preferRoles":"","relFollow":true,"relFollowing":true,"relFollowsYou":true,"relFriends":true,"autoScroll":true,"autoloadCount":"100","showToasts":true,"hideBanners":true,"collapsePosts":false,"sortBy":"none","cities":"","sameCityOnly":false,"showSeenChip":true,"dimSeenToday":true}};
  const FL_PRESET_DISPLAY = {"default":{"mode":"nsfw"},"minimal":{"mode":"sfw","blurPx":1},"sfw":{"mode":"sfw","blurVideos":true,"blurPx":6}};
  /* END generated:presets */
  /* BEGIN generated:orchestration */
  const FL_ACTION_PROTOCOL = "fl-tools-action-v1";
  const FL_ACTION_TARGETS = Object.freeze({
    "filter.apply": {"kind":"dock","panel":"fl-filter-panel","label":"Open Filters"},
    "filter.preset": {"kind":"dock","panel":"fl-filter-panel","label":"Open Filter Presets"},
    "filter.soft-block": {"kind":"dock","panel":"fl-block-panel","label":"Open soft-block"},
    "seen.mark": {"kind":"dock","panel":"fl-advanced-panel","label":"Open seen settings"},
    "seen.reset": {"kind":"dock","panel":"fl-advanced-panel","label":"Reset seen"},
    "display.mode": {"kind":"dock","panel":"fl-site-panel","label":"Open NSFW / SFW"},
    "display.infinite-scroll": {"kind":"dock","panel":"fl-advanced-panel","label":"Open infinite scroll"},
    "navigation.next": {"kind":"dock","panel":"fl-shortcuts-panel","label":"Open shortcuts"},
    "navigation.previous": {"kind":"dock","panel":"fl-shortcuts-panel","label":"Previous profile"},
    "highlight.apply": {"kind":"dock","panel":"flhp-panel","label":"Open highlighter"},
    "whitelist.apply": {"kind":"dock","panel":"flhp-panel","label":"Open highlighter / whitelist"},
    "mute.create": {"kind":"dock","panel":"fl-block-panel","label":"Open mutes"},
    "snooze.create": {"kind":"dock","panel":"fl-block-panel","label":"Open snooze"},
    "profile.note": {"kind":"dock","panel":"fl-block-panel","focus":"fl-notes-wrap","label":"Open notes"},
    "profile.visit": {"kind":"dock","panel":"fl-advanced-panel","focus":"fl-visit-log-list","label":"Open visit log"},
    "display.org-cards": {"kind":"dock","panel":"fl-advanced-panel","label":"Open org cards"},
    "profile.pin": {"kind":"dock","panel":"fl-profiles-panel","label":"Open profile pins"},
    "profile.compare": {"kind":"dock","panel":"fl-profiles-panel","label":"Open profile compare"},
    "profile.mention": {"kind":"dock","panel":"fl-profiles-panel","label":"Open mentions / profiles"},
    "privacy.session": {"kind":"dock","panel":"fl-profiles-panel","label":"Open private session"},
    "profile.similar": {"kind":"dock","panel":"fl-profiles-panel","label":"Open similar profiles"},
    "profile.watch": {"kind":"dock","panel":"fl-profiles-panel","label":"Open watches"},
    "privacy.clear": {"kind":"dock","panel":"fl-advanced-panel","label":"Open paranoid auto-clear"},
    "navigation.advanced": {"kind":"dock","panel":"fl-shortcuts-panel","label":"Open shortcut editor"},
    "studio.orchestration": {"kind":"studio","tab":"home","label":"Open Studio"},
    "studio.command-palette": {"kind":"studio","tab":"home","label":"Open command palette"},
    "studio.workspaces": {"kind":"studio","tab":"home","label":"Open workspaces"},
    "studio.watch-manager": {"kind":"studio","tab":"watch","label":"Open watch manager"},
    "studio.profile-history": {"kind":"studio","tab":"history","label":"Open profile history"},
    "studio.activity-timeline": {"kind":"studio","tab":"history","label":"Open activity timeline"},
    "studio.secure-notes": {"kind":"studio","tab":"secure-notes","label":"Open secure notes"},
    "vault.profile.archive": {"kind":"vault","panel":"vault-profile-panel","label":"Open profile archive"},
    "vault.media.archive": {"kind":"vault","panel":"vault-media-panel","label":"Open media archive"},
    "vault.export": {"kind":"vault","panel":"vault-export-panel","label":"Export Vault archive"},
    "vault.import": {"kind":"vault","panel":"vault-import-panel","label":"Import Vault archive"},
    "vault.storage": {"kind":"vault","panel":"vault-storage-panel","label":"Open Vault storage"},
    "vault.diagnostics": {"kind":"vault","panel":"vault-diagnostics-panel","label":"Open Vault diagnostics"},
    "studio.rules": {"kind":"studio","tab":"rules","label":"Open rules"},
    "studio.audit": {"kind":"studio","tab":"rules","label":"Open audit log"},
    "studio.undo": {"kind":"studio","tab":"rules","label":"Undo last Studio action"},
    "studio.analytics": {"kind":"studio","tab":"home","label":"Open Studio analytics"}
  });
  const FL_ACTION_CHROME = Object.freeze({
    "fl-filter-panel": {"body":"fl-panel-body","toggle":"fl-panel-toggle"},
    "flhp-panel": {"body":"flhp-main","toggle":"flhp-toggle"},
    "fl-site-panel": {"body":"fl-site-body","toggle":"fl-site-toggle"},
    "fl-advanced-panel": {"body":"fl-advanced-body","toggle":"fl-advanced-toggle"},
    "fl-profiles-panel": {"body":"fl-profiles-body","toggle":"fl-profiles-toggle"},
    "fl-block-panel": {"body":"fl-block-body","toggle":"fl-block-toggle"},
    "fl-shortcuts-panel": {"body":"fl-shortcuts-body","toggle":"fl-shortcuts-toggle"},
    "fl-perf-controls": {"body":"fl-perf-body","toggle":"fl-perf-toggle"},
    "fl-system-panel": {"body":"fl-system-body","toggle":"fl-system-toggle"}
  });
  const FL_ACTION_PARENTS = Object.freeze({
    "fl-site-panel": "fl-filter-panel",
    "fl-shortcuts-panel": "fl-system-panel",
    "fl-perf-controls": "fl-system-panel",
    "fl-advanced-panel": "fl-system-panel"
  });
  const FL_ACTION_ALIASES = Object.freeze({
    "basic.filters": "filter.apply",
    "basic.soft-block": "filter.soft-block",
    "basic.seen": "seen.mark",
    "basic.sfw-nsfw": "display.mode",
    "basic.infinite-scroll": "display.infinite-scroll",
    "basic.navigation": "navigation.next",
    "basic.shortcuts": "navigation.next",
    "basic.nsfw-mode": "display.mode",
    "basic.toasts": "filter.apply",
    "basic.organisation-cards": "display.org-cards",
    "pro.highlighter": "highlight.apply",
    "pro.whitelist": "whitelist.apply",
    "pro.mutes": "mute.create",
    "pro.snooze": "snooze.create",
    "pro.notes": "profile.note",
    "pro.identity-notes": "profile.note",
    "pro.visit-history": "profile.visit",
    "pro.visit-log": "profile.visit",
    "pro.org-cards": "display.org-cards",
    "pro.profile-pins": "profile.pin",
    "pro.profile-compare": "profile.compare",
    "pro.mentions": "profile.mention",
    "pro.private-session": "privacy.session",
    "pro.similar": "profile.similar",
    "pro.watch": "profile.watch",
    "pro.watches": "profile.watch",
    "pro.paranoid-clear": "privacy.clear",
    "pro.advanced-shortcuts": "navigation.advanced",
    "pro.feed-mutes": "mute.create",
    "studio.rule-builder": "studio.rules",
    "studio.audit-history": "studio.audit"
  });
  const FL_EVENT_PROTOCOL = "fl-tools-event-v1";
  const FL_EVENT_NAME = "fltools:event";
  const FL_EVENT_TOPICS = Object.freeze({
    "PROFILE_VISITED": "profile.visited",
    "PROFILE_PIN_CREATED": "profile.pin.created",
    "PROFILE_NOTE_CREATED": "profile.note.created",
    "PROFILE_COMPARED": "profile.compared",
    "MUTE_CREATED": "mute.created",
    "SNOOZE_CREATED": "snooze.created",
    "PROFILE_WATCH_CREATED": "profile.watch.created",
    "PROFILE_CHANGED": "profile.changed"
  });
  const FL_EVENT_PAYLOAD_KEYS = Object.freeze([
    "nick",
    "age",
    "gender",
    "role",
    "location",
    "until",
    "list"
  ]);
  function flCanonicalCapability(id) {
    id = String(id || "").toLowerCase();
    return FL_ACTION_ALIASES[id] || id;
  }
  function flEventPayload(payload) {
    var src = payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};
    var out = {};
    FL_EVENT_PAYLOAD_KEYS.forEach(function (key) {
      if (src[key] == null || src[key] === "") return;
      if (typeof src[key] === "object") return;
      out[key] = src[key];
    });
    return out;
  }
  function flPublishEvent(topic, payload, extra) {
    try {
      if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("fl_private_session") === "1") return false;
    } catch (_) {}
    if (typeof window === "undefined" || typeof window.dispatchEvent !== "function") return false;
    payload = flEventPayload(payload);
    if (topic === "profile.visited") {
      var nick = String(payload.nick || "").toLowerCase();
      var key = "visited:" + nick;
      var now = Date.now();
      flPublishEvent._stamp = flPublishEvent._stamp || {};
      if (nick && flPublishEvent._stamp[key] && now - flPublishEvent._stamp[key] < 30000) return false;
      if (nick) flPublishEvent._stamp[key] = now;
    }
    var detail = {
      protocol: FL_EVENT_PROTOCOL,
      topic: String(topic || ""),
      payload: payload,
      at: new Date().toISOString(),
      source: extra && extra.source ? extra.source : (typeof FL_EDITION !== "undefined" ? FL_EDITION : "studio")
    };
    try {
      window.dispatchEvent(new CustomEvent(FL_EVENT_NAME, { detail: detail }));
      return true;
    } catch (_) {
      return false;
    }
  }
  /* END generated:orchestration */
  /* BEGIN generated:scanner */
  var FLScanner = (function () {
    "use strict";
    const KINDS = Object.freeze({
      PROFILE: "profile",
      FEED: "feed",
      TEXT: "text"
    });

    const KIND_ORDER = Object.freeze(["feed", "profile", "text"]);

    const DEFAULT_MODULES = Object.freeze({
      profile: Object.freeze(["mentions", "notes", "pins", "highlighter", "profile-model", "watches"]),
      feed: Object.freeze(["filters", "seen", "mutes", "snooze"]),
      text: Object.freeze(["mentions"])
    });

    const SELECTORS = Object.freeze({
      feed: "[data-story-uid], [data-feed-story], [data-feed-dwell-target], [data-controller*='feed-story']",
      profileCard: "[data-member-card], .w-full.rounded-sm.cursor-pointer",
      profileLink: "a[href^='/']",
      ignore: [
        "#fl-tools-dock",
        "#fl-settings-launcher",
        "#fl-browse-chips",
        "#fl-studio-panel",
        "#fl-studio-palette",
        "#fl-tools-modal-root",
        ".lt-limit-hl",
        "mark.lt-limit-hl",
        ".lt-mention",
        ".lt-pin-chip",
        ".lt-note-chip",
        ".lt-qa-bar",
        ".lt-seen-chip",
        ".lt-card-chips",
        ".lt-card-chip",
        ".lt-why-hidden",
        "#fl-list-pager-clone",
        ".fl-fetish-groups"
      ].join(", ")
    });

    const RESERVED_NICKS = Object.freeze({
      home: 1, p: 1, groups: 1, events: 1, inbox: 1, settings: 1, search: 1, explore: 1,
      places: 1, help: 1, legal: 1, languages: 1, pictures: 1, videos: 1, posts: 1,
      writings: 1, fetishes: 1, discussions: 1, notifications: 1, requests: 1, guide: 1,
      kinksters: 1, friends: 1, following: 1, followers: 1, about: 1
    });

    const TEXT_SKIP_TAGS = /^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|CODE|PRE|SVG|A|BUTTON|LABEL|MARK|NOSCRIPT)$/i;
    const MENTION_HINT = /@[A-Za-z]/;

    function now() {
      return typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
    }

    function tagName(el) {
      return String((el && el.tagName) || "").toUpperCase();
    }

    function attr(el, name) {
      if (!el || typeof el.getAttribute !== "function") return "";
      return el.getAttribute(name) || "";
    }

    function classNames(el) {
      if (!el) return [];
      if (el.classList && typeof el.classList.contains === "function") {
        return Array.from(el.classList);
      }
      return String(el.className || "").split(/\s+/).filter(Boolean);
    }

    function matchSimple(el, selector) {
      selector = String(selector || "").trim();
      if (!el || el.nodeType !== 1 || !selector) return false;
      if (typeof el.matches === "function") {
        try { return el.matches(selector); } catch (_) { /* fall through to the duck-typed matcher */ }
      }
      let rest = selector;
      const tag = rest.match(/^[a-zA-Z][\w-]*/);
      if (tag) {
        if (tagName(el) !== tag[0].toUpperCase()) return false;
        rest = rest.slice(tag[0].length);
      }
      const tokenRe = /#([A-Za-z][\w-]*)|\.([A-Za-z][\w-]*)|\[([A-Za-z_:][\w-]*)(?:\s*([*^$]?=)\s*(['"]?)([^\]'"]*)\5)?\]/g;
      let match;
      let saw = false;
      while ((match = tokenRe.exec(rest))) {
        saw = true;
        if (match[1]) {
          if (String(el.id || "") !== match[1]) return false;
        } else if (match[2]) {
          if (classNames(el).indexOf(match[2]) === -1) return false;
        } else {
          const name = match[3];
          const op = match[4];
          const expected = match[6] == null ? "" : match[6];
          const present = typeof el.hasAttribute === "function"
            ? el.hasAttribute(name)
            : (el.attrs ? Object.prototype.hasOwnProperty.call(el.attrs, name) : attr(el, name) !== "");
          const value = attr(el, name);
          if (!op) {
            if (!present) return false;
          } else if (op === "=") {
            if (value !== expected) return false;
          } else if (op === "^=") {
            if (value.indexOf(expected) !== 0) return false;
          } else if (op === "*=") {
            if (value.indexOf(expected) === -1) return false;
          } else if (op === "$=") {
            if (value.slice(-expected.length) !== expected) return false;
          }
        }
      }
      return saw || !!tag;
    }

    function elMatches(el, selector) {
      if (!el || el.nodeType !== 1) return false;
      return String(selector || "").split(",").map(function (part) {
        return part.trim();
      }).filter(Boolean).some(function (part) {
        return matchSimple(el, part);
      });
    }

    function parentOf(el) {
      return (el && (el.parentElement || el.parentNode)) || null;
    }

    function closest(el, selector) {
      let node = el && el.nodeType === 3 ? parentOf(el) : el;
      while (node && node.nodeType === 1) {
        if (elMatches(node, selector)) return node;
        node = parentOf(node);
      }
      return null;
    }

    function queryAll(root, selector) {
      if (!root || root.nodeType !== 1) return [];
      if (typeof root.querySelectorAll === "function") {
        try { return Array.from(root.querySelectorAll(selector)); } catch (_) { /* walk */ }
      }
      const found = [];
      walkElements(root, function (el) {
        if (el !== root && elMatches(el, selector)) found.push(el);
      });
      return found;
    }

    function walkElements(root, visit) {
      const kids = root && (root.children || root.childNodes || root.kids) || [];
      Array.from(kids).forEach(function (child) {
        if (!child || child.nodeType !== 1) return;
        visit(child);
        walkElements(child, visit);
      });
    }

    function isIgnored(el, options) {
      if (!el) return true;
      const host = el.nodeType === 3 ? parentOf(el) : el;
      if (!host || host.nodeType !== 1) return true;
      if (closest(host, SELECTORS.ignore)) return true;
      if (options && typeof options.isComment === "function" && options.isComment(host)) return true;
      return false;
    }

    function nickFromHref(href) {
      const raw = String(href || "").split("?")[0].split("#")[0];
      const match = raw.match(/^\/([A-Za-z0-9_.-]+)\/?$/);
      if (!match) return "";
      const nick = match[1].toLowerCase();
      return RESERVED_NICKS[nick] ? "" : nick;
    }

    function isProfileLink(el) {
      if (tagName(el) !== "A") return false;
      return !!nickFromHref(attr(el, "href"));
    }

    function isFeedItem(el) {
      return elMatches(el, SELECTORS.feed);
    }

    function isProfileCard(el) {
      if (!el || el.nodeType !== 1) return false;
      if (attr(el, "data-member-card") || (el.hasAttribute && el.hasAttribute("data-member-card"))) return true;
      if (!elMatches(el, ".w-full.rounded-sm.cursor-pointer")) return false;
      if (isProfileLink(el)) return true;
      return queryAll(el, SELECTORS.profileLink).some(isProfileLink);
    }

    function isTextCandidate(node, options) {
      if (!node || node.nodeType !== 3) return false;
      if (options && options.text === false) return false;
      const parent = parentOf(node);
      if (!parent || parent.nodeType !== 1) return false;
      if (TEXT_SKIP_TAGS.test(tagName(parent))) return false;
      if (parent.isContentEditable) return false;
      if (isIgnored(parent, options)) return false;
      return MENTION_HINT.test(node.nodeValue || node.textContent || "");
    }

    function candidate(node, kinds, reason) {
      const unique = [];
      (kinds || []).forEach(function (kind) {
        if (KIND_ORDER.indexOf(kind) !== -1 && unique.indexOf(kind) === -1) unique.push(kind);
      });
      if (!node || !unique.length) return null;
      return { node: node, kinds: unique, reason: reason || unique[0] };
    }

    function classify(node, options) {
      if (!node || isIgnored(node, options)) return null;
      if (node.nodeType === 3) {
        return isTextCandidate(node, options) ? candidate(node, ["text"], "mention-text") : null;
      }
      if (node.nodeType !== 1) return null;
      if (isFeedItem(node) && !isProfileCard(node)) return candidate(node, ["feed"], "feed-item");
      if (isProfileCard(node)) return candidate(node, ["profile", "feed"], "profile-card");
      if (isProfileLink(node)) return candidate(node, ["profile"], "profile-link");
      return null;
    }

    function collectText(root, options, out) {
      if (options && options.text === false) return;
      const host = root.nodeType === 3 ? parentOf(root) : root;
      if (!host) return;
      const sample = String(host.textContent || host.nodeValue || "");
      if (!MENTION_HINT.test(sample)) return;
      if (typeof host.createTreeWalker === "function" || (typeof document !== "undefined" && document.createTreeWalker && host.nodeType === 1)) {
        try {
          const doc = host.ownerDocument || document;
          const walker = doc.createTreeWalker(host, NodeFilter.SHOW_TEXT, null);
          let node = host.nodeType === 3 ? root : walker.nextNode();
          while (node) {
            if (isTextCandidate(node, options)) out.push(candidate(node, ["text"], "mention-text"));
            node = walker.nextNode();
          }
          return;
        } catch (_) { /* walk childNodes */ }
      }
      function walk(node) {
        if (!node) return;
        if (node.nodeType === 3) {
          if (isTextCandidate(node, options)) out.push(candidate(node, ["text"], "mention-text"));
          return;
        }
        if (node.nodeType !== 1) return;
        if (TEXT_SKIP_TAGS.test(tagName(node))) return;
        Array.from(node.childNodes || node.kids || []).forEach(walk);
      }
      walk(root);
    }

    function collect(root, options) {
      const out = [];
      if (!root || isIgnored(root, options)) return out;
      const self = classify(root, options);
      if (self) out.push(self);
      if (root.nodeType !== 1) return uniqueCandidates(out);

      queryAll(root, SELECTORS.feed).forEach(function (el) {
        if (el === root || isIgnored(el, options) || isProfileCard(el)) return;
        out.push(candidate(el, ["feed"], "feed-item"));
      });

      queryAll(root, SELECTORS.profileCard).forEach(function (el) {
        if (el === root || isIgnored(el, options) || !isProfileCard(el)) return;
        const wrap = closest(el, "[data-member-card]");
        if (wrap && wrap !== el) return;
        out.push(candidate(el, ["profile", "feed"], "profile-card"));
      });

      queryAll(root, SELECTORS.profileLink).forEach(function (el) {
        if (el === root || !isProfileLink(el) || isIgnored(el, options)) return;
        if (closest(el, SELECTORS.profileCard)) return;
        out.push(candidate(el, ["profile"], "profile-link"));
      });

      collectText(root, options, out);
      return uniqueCandidates(out);
    }

    function fromMutations(mutations, options) {
      const out = [];
      Array.from(mutations || []).forEach(function (mutation) {
        Array.from((mutation && mutation.addedNodes) || []).forEach(function (node) {
          if (isIgnored(node, options)) return;
          collect(node, options).forEach(function (item) { out.push(item); });
        });
      });
      return uniqueCandidates(out);
    }

    function uniqueCandidates(list) {
      const order = [];
      const byNode = new Map();
      (list || []).forEach(function (item) {
        if (!item || !item.node) return;
        const kinds = item.kinds || (item.kind ? [item.kind] : []);
        const prev = byNode.get(item.node);
        if (!prev) {
          const next = candidate(item.node, kinds, item.reason);
          if (!next) return;
          byNode.set(item.node, next);
          order.push(next);
          return;
        }
        kinds.forEach(function (kind) {
          if (KIND_ORDER.indexOf(kind) !== -1 && prev.kinds.indexOf(kind) === -1) prev.kinds.push(kind);
        });
      });
      return order;
    }

    function merge(left, right) {
      return uniqueCandidates([].concat(left || [], right || []));
    }

    function kindSet(candidates) {
      const set = {};
      uniqueCandidates(candidates).forEach(function (item) {
        item.kinds.forEach(function (kind) { set[kind] = true; });
      });
      return Object.keys(set);
    }

    function modulesFor(kind) {
      return (DEFAULT_MODULES[kind] || []).slice();
    }

    function nodesFor(candidates, kind) {
      return uniqueCandidates(candidates).filter(function (item) {
        return item.kinds.indexOf(kind) !== -1;
      }).map(function (item) { return item.node; });
    }

    function createScanner(options) {
      const opts = options || {};
      const state = {
        scans: 0,
        skipped: 0,
        durationMs: 0,
        lastScanMs: 0,
        paused: false,
        delayMs: opts.delayMs == null ? 120 : Number(opts.delayMs)
      };
      const handlers = { profile: [], feed: [], text: [] };
      let pending = [];
      let timer = null;
      let seq = 0;

      function record(start, skipped) {
        if (skipped || state.paused) {
          state.skipped += 1;
          return snapshot();
        }
        const elapsed = start == null ? 0 : now() - start;
        state.scans += 1;
        state.lastScanMs = elapsed;
        state.durationMs += elapsed;
        return snapshot();
      }

      function snapshot() {
        return {
          scans: state.scans,
          skipped: state.skipped,
          durationMs: Math.round(state.durationMs),
          lastScanMs: Math.round(state.lastScanMs),
          paused: state.paused,
          delayMs: state.delayMs,
          pending: pending.length
        };
      }

      function register(kind, handler, meta) {
        kind = String(kind || "").toLowerCase();
        if (KIND_ORDER.indexOf(kind) === -1) throw new TypeError("Scanner kind must be profile, feed, or text");
        if (typeof handler !== "function") throw new TypeError("Scanner handler must be a function");
        const info = meta || {};
        const id = String(info.id || handler.name || ("handler-" + (seq += 1)));
        handlers[kind] = handlers[kind].filter(function (entry) { return entry.id !== id; });
        handlers[kind].push({ id: id, fn: handler, modules: info.modules || modulesFor(kind) });
        return id;
      }

      function unregister(id) {
        const key = String(id || "");
        KIND_ORDER.forEach(function (kind) {
          handlers[kind] = handlers[kind].filter(function (entry) { return entry.id !== key; });
        });
      }

      function dispatch(candidates) {
        const batch = uniqueCandidates(candidates);
        if (state.paused) {
          record(null, true);
          return { ran: [], kinds: [], skipped: true, count: batch.length };
        }
        if (!batch.length) return { ran: [], kinds: [], skipped: false, count: 0 };
        const start = now();
        const ran = [];
        KIND_ORDER.forEach(function (kind) {
          const items = batch.filter(function (item) { return item.kinds.indexOf(kind) !== -1; });
          if (!items.length) return;
          handlers[kind].forEach(function (entry) {
            entry.fn({
              kind: kind,
              candidates: items,
              nodes: items.map(function (item) { return item.node; }),
              modules: entry.modules.slice()
            });
            ran.push(entry.id);
          });
        });
        record(start);
        return { ran: ran, kinds: kindSet(batch), skipped: false, count: batch.length };
      }

      function queue(candidates) {
        pending = merge(pending, candidates);
        if (!pending.length) return snapshot();
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        const wait = Math.max(0, Number(state.delayMs) || 0);
        function flush() {
          const batch = pending;
          pending = [];
          timer = null;
          dispatch(batch);
        }
        if (wait === 0) {
          flush();
          return snapshot();
        }
        timer = setTimeout(flush, wait);
        return snapshot();
      }

      function ingest(mutations, extra) {
        return queue(fromMutations(mutations, extra || opts));
      }

      return {
        KINDS: KINDS,
        pause() { state.paused = true; },
        resume() { state.paused = false; },
        setDelay(ms) { state.delayMs = Math.max(0, Number(ms) || 0); },
        shouldSkip() { return state.paused; },
        record,
        snapshot,
        register,
        unregister,
        classify(node) { return classify(node, opts); },
        collect(root) { return collect(root, opts); },
        fromMutations(mutations) { return fromMutations(mutations, opts); },
        dispatch,
        queue,
        ingest,
        kindSet,
        modulesFor,
        resetForTests() {
          pending = [];
          if (timer) clearTimeout(timer);
          timer = null;
          KIND_ORDER.forEach(function (kind) { handlers[kind] = []; });
          state.scans = 0;
          state.skipped = 0;
          state.durationMs = 0;
          state.lastScanMs = 0;
          state.paused = false;
        }
      };
    }
    return {
      KINDS: KINDS,
      KIND_ORDER: KIND_ORDER,
      DEFAULT_MODULES: DEFAULT_MODULES,
      SELECTORS: SELECTORS,
      classify: classify,
      collect: collect,
      fromMutations: fromMutations,
      uniqueCandidates: uniqueCandidates,
      merge: merge,
      kindSet: kindSet,
      modulesFor: modulesFor,
      nodesFor: nodesFor,
      isIgnored: isIgnored,
      isProfileLink: isProfileLink,
      isProfileCard: isProfileCard,
      isFeedItem: isFeedItem,
      createScanner: createScanner
    };
  })();
  /* END generated:scanner */
  /* BEGIN generated:page-tweaks */
  var FLPageTweaks = (function () {
    "use strict";
    const OWN_KINKS_KEY = "fl_own_kinks";
    const FOLLOWERS_KEY = "fl_studio_follower_counts";
    const MAX_FOLLOWER_SNAPSHOTS = 90;
    const RELATIVE_TIME = /\b(\d+\s*(seconds?|minutes?|hours?|days?|weeks?|months?|years?)\s*ago|just now|yesterday|today)\b/i;
    const RESERVED = Object.freeze({
      home: 1, p: 1, groups: 1, events: 1, inbox: 1, settings: 1, search: 1, explore: 1,
      places: 1, help: 1, legal: 1, languages: 1, pictures: 1, videos: 1, posts: 1,
      writings: 1, fetishes: 1, discussions: 1, notifications: 1, requests: 1, guide: 1,
      kinksters: 1, friends: 1, following: 1, followers: 1, about: 1, login: 1, signup: 1
    });
    const FETISH_CATEGORIES = Object.freeze([
      ["giving", "Giving"],
      ["receiving", "Receiving"],
      ["wearing", "Wearing"],
      ["watching others wear", "Watching others wear"],
      ["into", "Into"]
    ]);
    const TOOLS_CHROME = "#fl-tools-dock, #fl-settings-launcher, #fl-studio-panel, #fl-studio-palette, #fl-browse-chips, #fl-studio-launcher";

    function nickFromPath(href) {
      try {
        const raw = String(href || "");
        if (!raw || raw.charAt(0) === "#") return "";
        const path = raw.indexOf("://") >= 0
          ? raw.replace(/^https?:\/\/[^/]+/i, "")
          : raw;
        const clean = path.split(/[?#]/)[0].replace(/\/+$/, "");
        const parts = clean.split("/").filter(Boolean);
        if (!parts.length) return "";
        let nick = parts[0];
        if (parts[0] === "users") {
          nick = parts[2] && !/^\d+$/.test(parts[2]) ? parts[2] : "";
        }
        nick = String(nick || "").toLowerCase();
        if (!nick || RESERVED[nick]) return "";
        return nick;
      } catch (_) {
        return "";
      }
    }

    function isRelativeTime(text) {
      return RELATIVE_TIME.test(String(text || "").trim());
    }

    function formatAbsoluteTime(value) {
      const raw = String(value || "").trim();
      if (!raw) return "";
      let ms = Date.parse(raw);
      if (!Number.isFinite(ms) && /^\d{10,13}$/.test(raw)) {
        ms = raw.length > 10 ? Number(raw) : Number(raw) * 1000;
      }
      if (!Number.isFinite(ms)) return "";
      const d = new Date(ms);
      try {
        return d.toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        });
      } catch (_) {
        return d.toISOString();
      }
    }

    function fetishCategory(hint) {
      const text = String(hint || "").toLowerCase();
      for (let i = 0; i < FETISH_CATEGORIES.length; i += 1) {
        if (text.indexOf(FETISH_CATEGORIES[i][0]) !== -1) return FETISH_CATEGORIES[i][1];
      }
      return "Into";
    }

    function groupFetishEntries(entries) {
      const groups = {};
      FETISH_CATEGORIES.forEach(function (pair) { groups[pair[1]] = []; });
      (entries || []).forEach(function (entry) {
        const name = String(entry && entry.name || "").trim();
        if (!name) return;
        const label = fetishCategory(entry && entry.hint);
        groups[label].push(name);
      });
      return FETISH_CATEGORIES.map(function (pair) {
        return { label: pair[1], items: groups[pair[1]] };
      }).filter(function (group) { return group.items.length; });
    }

    function parseTagLine(text) {
      const clean = String(text || "").replace(/\s+/g, " ").trim();
      const match = clean.match(/(\d{2,3})\s*([A-Za-z+][\w+\/-]{0,24})?\s*(.*)$/);
      if (!match) return { age: null, gender: "", role: "" };
      const age = parseInt(match[1], 10);
      return {
        age: Number.isFinite(age) && age >= 18 && age <= 99 ? age : null,
        gender: String(match[2] || "").toLowerCase(),
        role: String(match[3] || "").toLowerCase().replace(/[•|,].*$/, "").trim()
      };
    }

    function ageBucket(age) {
      if (!age) return "";
      if (age < 25) return "18–24";
      if (age < 30) return "25–29";
      if (age < 40) return "30–39";
      if (age < 50) return "40–49";
      return "50+";
    }

    function countDemographics(tagLines) {
      const stats = { total: 0, genders: {}, roles: {}, ages: {} };
      (tagLines || []).forEach(function (line) {
        const parsed = parseTagLine(line);
        if (!parsed.age && !parsed.gender && !parsed.role) return;
        stats.total += 1;
        if (parsed.gender) stats.genders[parsed.gender] = (stats.genders[parsed.gender] || 0) + 1;
        if (parsed.role) stats.roles[parsed.role] = (stats.roles[parsed.role] || 0) + 1;
        const bucket = ageBucket(parsed.age);
        if (bucket) stats.ages[bucket] = (stats.ages[bucket] || 0) + 1;
      });
      return stats;
    }

    function topCounts(map, limit) {
      return Object.keys(map || {})
        .map(function (key) { return { key: key, count: map[key] }; })
        .sort(function (a, b) { return b.count - a.count || a.key.localeCompare(b.key); })
        .slice(0, limit || 3);
    }

    function formatDemographics(stats) {
      if (!stats || !stats.total) return "No member cards on this page.";
      const bits = [stats.total + (stats.total === 1 ? " person" : " people")];
      topCounts(stats.genders, 3).forEach(function (row) { bits.push(row.key.toUpperCase() + " " + row.count); });
      topCounts(stats.roles, 2).forEach(function (row) { bits.push(row.key + " " + row.count); });
      topCounts(stats.ages, 2).forEach(function (row) { bits.push(row.key + " " + row.count); });
      return bits.join(" · ");
    }

    function parseCountFromHeading(text) {
      const src = String(text || "").replace(/\s+/g, " ");
      const followers = src.match(/([\d,]+)\s*followers\b/i);
      const following = src.match(/([\d,]+)\s*following\b/i);
      function num(match) {
        if (!match) return null;
        const n = parseInt(String(match[1]).replace(/,/g, ""), 10);
        return Number.isFinite(n) ? n : null;
      }
      return { followers: num(followers), following: num(following) };
    }

    function recordFollowerSnapshot(list, snapshot, at) {
      const next = Array.isArray(list) ? list.slice() : [];
      const followers = snapshot && Number.isFinite(snapshot.followers) ? snapshot.followers : null;
      const following = snapshot && Number.isFinite(snapshot.following) ? snapshot.following : null;
      if (followers == null && following == null) return next;
      const stamp = at || new Date().toISOString();
      const last = next[0];
      if (last && last.followers === followers && last.following === following) {
        const prev = Date.parse(last.at || "") || 0;
        if (Date.parse(stamp) - prev < 12 * 3600000) return next;
      }
      next.unshift({ at: stamp, followers: followers, following: following });
      return next.slice(0, MAX_FOLLOWER_SNAPSHOTS);
    }

    function formatFollowerHistory(list) {
      const rows = Array.isArray(list) ? list : [];
      if (!rows.length) return "Open your followers page to snapshot a count. Local only.";
      const latest = rows[0];
      const parts = [];
      if (latest.followers != null) parts.push(latest.followers.toLocaleString() + " followers");
      if (latest.following != null) parts.push(latest.following.toLocaleString() + " following");
      if (rows.length > 1 && rows[1].followers != null && latest.followers != null) {
        const delta = latest.followers - rows[1].followers;
        if (delta) parts.push((delta > 0 ? "+" : "") + delta + " since last snapshot");
      }
      return parts.join(" · ") || "No follower counts yet.";
    }

    function inToolsChrome(el) {
      return !!(el && el.closest && el.closest(TOOLS_CHROME));
    }

    function applyVisitedLinks(root, visitMap) {
      if (!root || typeof root.querySelectorAll !== "function") return 0;
      const map = visitMap && typeof visitMap === "object" ? visitMap : {};
      let painted = 0;
      root.querySelectorAll("a[href^='/'], a[href^='https://fetlife.com/']").forEach(function (link) {
        if (inToolsChrome(link)) return;
        const nick = nickFromPath(link.getAttribute("href") || "");
        if (!nick) {
          link.classList.remove("fl-visited-nick");
          return;
        }
        const seen = Object.prototype.hasOwnProperty.call(map, nick);
        link.classList.toggle("fl-visited-nick", seen);
        if (seen) painted += 1;
      });
      return painted;
    }

    function applyTimestamps(root) {
      if (!root || typeof root.querySelectorAll !== "function") return 0;
      let changed = 0;
      root.querySelectorAll("time[datetime], [datetime]").forEach(function (el) {
        if (inToolsChrome(el) || el.getAttribute("data-fl-time") === "1") return;
        const abs = formatAbsoluteTime(el.getAttribute("datetime"));
        if (!abs) return;
        const current = String(el.textContent || "").trim();
        if (current && !isRelativeTime(current) && current.length > 12) return;
        if (current === abs) {
          el.setAttribute("data-fl-time", "1");
          return;
        }
        if (!el.getAttribute("title")) el.setAttribute("title", current || abs);
        el.textContent = abs;
        el.setAttribute("data-fl-time", "1");
        changed += 1;
      });
      root.querySelectorAll("[title]").forEach(function (el) {
        if (inToolsChrome(el) || el.getAttribute("data-fl-time") === "1") return;
        if (el.tagName === "TIME" || el.hasAttribute("datetime")) return;
        const title = el.getAttribute("title") || "";
        const abs = formatAbsoluteTime(title);
        if (!abs || !isRelativeTime(el.textContent || "")) return;
        el.textContent = abs;
        el.setAttribute("data-fl-time", "1");
        changed += 1;
      });
      return changed;
    }

    function collectOwnKinks(root) {
      const names = [];
      const seen = {};
      const scope = (root && root.querySelector && (root.querySelector("#profile-fetishes") || root)) || root;
      if (!scope || typeof scope.querySelectorAll !== "function") return names;
      scope.querySelectorAll('a[href*="/fetishes/"]').forEach(function (link) {
        const name = String(link.textContent || "").replace(/\s+/g, " ").trim();
        const key = name.toLowerCase();
        if (!name || seen[key]) return;
        seen[key] = true;
        names.push(name);
      });
      return names;
    }

    function applySharedKinks(root, kinks) {
      const set = {};
      (kinks || []).forEach(function (name) {
        const key = String(name || "").trim().toLowerCase();
        if (key) set[key] = true;
      });
      const scope = (root && root.querySelector && (root.querySelector("#profile-fetishes") || root)) || root;
      if (!scope || typeof scope.querySelectorAll !== "function") return 0;
      let hits = 0;
      scope.querySelectorAll('a[href*="/fetishes/"]').forEach(function (link) {
        const key = String(link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        const match = !!set[key];
        link.classList.toggle("fl-shared-kink", match);
        if (match) hits += 1;
      });
      return hits;
    }

    function applyFetishGroups(root) {
      // Native Into / Soft Limits / Hard Limits boundaries carry meaning for matching.
      // Never flatten or move these links: doing so converts declared limits into interests.
      return 0;
    }

    function applyPagerClone(root) {
      // Retain the shared API while removing copies from older scripts or cached pages.
      // Native pagination must remain the only navigation and stay outside the card grid.
      if (!root || typeof root.querySelectorAll !== "function") return false;
      root.querySelectorAll("#fl-list-pager-clone").forEach(function (clone) { clone.remove(); });
      return false;
    }

    function collectPageTagLines(root) {
      const lines = [];
      if (!root || typeof root.querySelectorAll !== "function") return lines;
      const tags = root.querySelectorAll("[data-member-card] .text-sm.font-bold.text-gray-300");
      if (tags.length) {
        tags.forEach(function (el) {
          const text = String(el.textContent || "").replace(/\s+/g, " ").trim();
          if (/\d{2,3}\s+[A-Za-z]/.test(text)) lines.push(text.slice(0, 80));
        });
        return lines;
      }
      root.querySelectorAll("[data-member-card]").forEach(function (el) {
        const text = String(el.textContent || "").replace(/\s+/g, " ").trim();
        const match = text.match(/\d{2,3}\s+[A-Za-z+][\w+\/-]*\s*[A-Za-z][\w+\/-]*/);
        if (match) lines.push(match[0].slice(0, 80));
      });
      return lines;
    }

    function countPageDemographics(root) {
      return countDemographics(collectPageTagLines(root));
    }

    function tick(ctx) {
      ctx = ctx || {};
      const root = ctx.document;
      if (!root) return { visited: 0, times: 0, kinks: 0, groups: 0, pager: false };
      const visited = applyVisitedLinks(root, ctx.visitMap);
      const times = applyTimestamps(root);
      let groups = 0;
      let kinks = 0;
      if (ctx.isProfileHome) {
        if (ctx.ownNick && ctx.profileNick && ctx.ownNick === ctx.profileNick && typeof ctx.saveOwnKinks === "function") {
          const found = collectOwnKinks(root);
          if (found.length) ctx.saveOwnKinks(found);
        }
        groups = applyFetishGroups(root);
        kinks = applySharedKinks(root, ctx.ownKinks || []);
      }
      const pager = ctx.isListPage ? applyPagerClone(root) : false;
      return { visited: visited, times: times, kinks: kinks, groups: groups, pager: pager };
    }
    return {
      OWN_KINKS_KEY: OWN_KINKS_KEY,
      FOLLOWERS_KEY: FOLLOWERS_KEY,
      nickFromPath: nickFromPath,
      isRelativeTime: isRelativeTime,
      formatAbsoluteTime: formatAbsoluteTime,
      groupFetishEntries: groupFetishEntries,
      parseTagLine: parseTagLine,
      countDemographics: countDemographics,
      formatDemographics: formatDemographics,
      parseCountFromHeading: parseCountFromHeading,
      recordFollowerSnapshot: recordFollowerSnapshot,
      formatFollowerHistory: formatFollowerHistory,
      collectOwnKinks: collectOwnKinks,
      applyVisitedLinks: applyVisitedLinks,
      applyTimestamps: applyTimestamps,
      applySharedKinks: applySharedKinks,
      applyFetishGroups: applyFetishGroups,
      applyPagerClone: applyPagerClone,
      countPageDemographics: countPageDemographics,
      tick: tick
    };
  })();
  /* END generated:page-tweaks */
  /* BEGIN generated:storage */
  var FLStorage = (function () {
    "use strict";
    function memoryStore() {
      const data = new Map();
      return {
        getItem(key) { return data.has(key) ? data.get(key) : null; },
        setItem(key, value) { data.set(String(key), String(value)); },
        removeItem(key) { data.delete(key); }
      };
    }

    function backend() {
      try {
        if (typeof localStorage !== "undefined" && localStorage) return localStorage;
      } catch (_) {}
      return memoryStore();
    }

    const ROOT = "fl";

    const LAYOUT = Object.freeze({
      core: Object.freeze(["settings", "metadata"]),
      basic: Object.freeze(["seen", "presets", "filters", "display", "kinks", "terms", "blocks"]),
      pro: Object.freeze(["notes", "mutes", "snoozes", "pins", "visits", "watches", "highlighter", "whitelist", "compare", "paranoid", "shortcuts", "limits"]),
      studio: Object.freeze(["workspaces", "timeline", "audit", "secure_notes", "history", "undo", "facts", "rules", "followers"]),
      vault: Object.freeze(["profiles", "media", "jobs", "settings", "index", "diagnostics"])
    });

    const LEGACY = Object.freeze({
      "core.settings": Object.freeze(["fl_perf_settings"]),
      "core.metadata": Object.freeze(["fl_settings_schema_version"]),
      "basic.seen": Object.freeze(["fl_seen_today"]),
      "basic.presets": Object.freeze(["fl_filter_presets"]),
      "basic.filters": Object.freeze(["fl_profile_filter_settings", "fl_profile_filter_settings_v3", "fl_profile_filter_settings_v2"]),
      "basic.display": Object.freeze(["fl_display_settings"]),
      "basic.kinks": Object.freeze(["fl_own_kinks"]),
      "basic.terms": Object.freeze(["fl_term_library"]),
      "basic.blocks": Object.freeze(["fl_block_reasons"]),
      "pro.notes": Object.freeze(["fl_nick_notes"]),
      "pro.mutes": Object.freeze(["fl_feed_mutes"]),
      "pro.snoozes": Object.freeze(["fl_snooze"]),
      "pro.pins": Object.freeze(["fl_profile_pins"]),
      "pro.visits": Object.freeze(["fl_visit_log"]),
      "pro.watches": Object.freeze(["fl_profile_watches"]),
      "pro.highlighter": Object.freeze(["fl_card_highlighter_settings"]),
      "pro.whitelist": Object.freeze(["fl_whitelist"]),
      "pro.compare": Object.freeze(["fl_profile_snapshots"]),
      "pro.paranoid": Object.freeze(["fl_paranoid"]),
      "pro.shortcuts": Object.freeze(["fl_tools_pro_shortcuts"]),
      "pro.limits": Object.freeze(["fl_limit_history"]),
      "studio.workspaces": Object.freeze(["fl_tools_studio_workspaces"]),
      "studio.timeline": Object.freeze(["fl_studio_timeline"]),
      "studio.audit": Object.freeze(["fl_studio_audit"]),
      "studio.secure_notes": Object.freeze(["fl_studio_vault"]),
      "studio.history": Object.freeze(["fl_studio_history"]),
      "studio.undo": Object.freeze(["fl_studio_undo"]),
      "studio.facts": Object.freeze(["fl_studio_profile_facts"]),
      "studio.rules": Object.freeze(["fl_studio_rules"]),
      "studio.followers": Object.freeze(["fl_studio_follower_counts"])
    });

    function slotForLegacy(legacyKey) {
      const key = String(legacyKey || "");
      const ids = Object.keys(LEGACY);
      for (let i = 0; i < ids.length; i += 1) {
        if (LEGACY[ids[i]].indexOf(key) !== -1) {
          const parts = ids[i].split(".");
          return { id: ids[i], scope: parts[0], name: parts[1] };
        }
      }
      return null;
    }

    function namespacedKeys() {
      const keys = [];
      Object.keys(LAYOUT).forEach(function (scope) {
        LAYOUT[scope].forEach(function (name) {
          keys.push(pathKey(scope, name));
        });
      });
      return keys;
    }

    function pathKey(scope, name) {
      scope = String(scope || "").toLowerCase();
      name = String(name || "").toLowerCase();
      if (!scope || !name) throw new TypeError("Storage path needs a scope and name");
      return ROOT + "." + scope + "." + name;
    }

    function slotId(scope, name) {
      return String(scope || "").toLowerCase() + "." + String(name || "").toLowerCase();
    }

    function parseItem(db, key) {
      try {
        const raw = db.getItem(key);
        if (raw == null || raw === "") return undefined;
        return JSON.parse(raw);
      } catch (_) {
        return undefined;
      }
    }

    function writeItem(db, key, value) {
      try {
        db.setItem(key, JSON.stringify(value));
        return true;
      } catch (_) {
        return false;
      }
    }

    function createStorage(prefix, store) {
      const p = prefix == null ? "fl_" : String(prefix);
      const db = store || backend();
      return {
        prefix: p,
        key(name) { return p + name; },
        read(name, fallback) {
          try {
            const raw = db.getItem(p + name);
            if (raw == null || raw === "") return fallback;
            return JSON.parse(raw);
          } catch (_) {
            return fallback;
          }
        },
        write(name, value) {
          try {
            db.setItem(p + name, JSON.stringify(value));
            return true;
          } catch (_) {
            return false;
          }
        },
        remove(name) {
          try { db.removeItem(p + name); } catch (_) {}
        }
      };
    }

    function namespaced(storage, getNamespace) {
      function ns() {
        if (typeof getNamespace === "function") return String(getNamespace() || "Default") || "Default";
        return String(getNamespace || "Default") || "Default";
      }
      return {
        prefix: storage.prefix,
        key: storage.key,
        read(name, fallback) {
          const bag = storage.read(name, {});
          if (!bag || typeof bag !== "object" || Array.isArray(bag)) return fallback;
          const key = ns();
          return Object.prototype.hasOwnProperty.call(bag, key) ? bag[key] : fallback;
        },
        write(name, value) {
          const raw = storage.read(name, {});
          const bag = (raw && typeof raw === "object" && !Array.isArray(raw)) ? Object.assign({}, raw) : {};
          bag[ns()] = value;
          return storage.write(name, bag);
        },
        remove(name) {
          const raw = storage.read(name, {});
          if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
            storage.remove(name);
            return;
          }
          const bag = Object.assign({}, raw);
          delete bag[ns()];
          storage.write(name, bag);
        }
      };
    }

    function createTree(store) {
      const db = store || backend();

      function slot(scope, name) {
        const id = slotId(scope, name);
        const key = pathKey(scope, name);
        const legacy = LEGACY[id] || [];
        return {
          id,
          key,
          legacy: legacy.slice(),
          read(fallback) {
            const next = parseItem(db, key);
            if (next !== undefined) return next;
            for (let i = 0; i < legacy.length; i += 1) {
              const value = parseItem(db, legacy[i]);
              if (value !== undefined) return value;
            }
            return fallback;
          },
          write(value) {
            const ok = writeItem(db, key, value);
            if (legacy.length) writeItem(db, legacy[0], value);
            return ok;
          },
          remove() {
            try { db.removeItem(key); } catch (_) {}
            for (let i = 0; i < legacy.length; i += 1) {
              try { db.removeItem(legacy[i]); } catch (_) {}
            }
          }
        };
      }

      function ns(scope) {
        scope = String(scope || "").toLowerCase();
        if (!LAYOUT[scope]) throw new TypeError("Unknown storage namespace: " + scope);
        return {
          scope,
          slots: LAYOUT[scope].slice(),
          slot(name) { return slot(scope, name); },
          read(name, fallback) { return slot(scope, name).read(fallback); },
          write(name, value) { return slot(scope, name).write(value); },
          remove(name) { slot(scope, name).remove(); }
        };
      }

      function adoptLegacy() {
        const copied = [];
        Object.keys(LEGACY).forEach(function (id) {
          const parts = id.split(".");
          const cell = slot(parts[0], parts[1]);
          if (parseItem(db, cell.key) !== undefined) return;
          for (let i = 0; i < cell.legacy.length; i += 1) {
            const value = parseItem(db, cell.legacy[i]);
            if (value === undefined) continue;
            cell.write(value);
            copied.push(id);
            break;
          }
        });
        return copied;
      }

      return {
        LAYOUT,
        LEGACY,
        pathKey,
        slotForLegacy,
        namespacedKeys,
        ns,
        slot,
        adoptLegacy
      };
    }
    var tree = createTree();
    try { tree.adoptLegacy(); } catch (_) {}
    function slotFor(key) {
      var mapped = slotForLegacy(key);
      if (mapped) return tree.slot(mapped.scope, mapped.name);
      var match = String(key || "").match(/^fl\.([a-z]+)\.([a-z]+)$/);
      if (match && LAYOUT[match[1]] && LAYOUT[match[1]].indexOf(match[2]) !== -1) {
        return tree.slot(match[1], match[2]);
      }
      return null;
    }
    function get(key, fallback) {
      var cell = slotFor(key);
      if (cell) return cell.read(fallback);
      try {
        var raw = localStorage.getItem(key);
        if (raw == null || raw === "") return fallback;
        return JSON.parse(raw);
      } catch (_) { return fallback; }
    }
    function set(key, value) {
      var cell = slotFor(key);
      if (cell) return cell.write(value);
      try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; }
    }
    function remove(key) {
      var cell = slotFor(key);
      if (cell) { cell.remove(); return; }
      try { localStorage.removeItem(key); } catch (_) {}
    }
    return {
      LAYOUT: LAYOUT,
      LEGACY: LEGACY,
      pathKey: pathKey,
      slotForLegacy: slotForLegacy,
      namespacedKeys: namespacedKeys,
      tree: tree,
      get: get,
      set: set,
      remove: remove,
      adoptLegacy: function () { return tree.adoptLegacy(); }
    };
  })();
  /* END generated:storage */
  const flCandidateScanner = FLScanner.createScanner({ delayMs: 120 });
  function flStudioLive() {
    const beat = Number(document.documentElement.getAttribute("data-fl-tools-studio-beat") || 0);
    return document.documentElement.getAttribute("data-fl-tools-studio") === "live" && Date.now() - beat < 4000;
  }
  function flPublishCapabilities(live = true) {
    window.dispatchEvent(new CustomEvent("fltools:capabilities-changed", { detail: {
      protocol: FL_CAPABILITY_PROTOCOL, edition: FL_EDITION, version: FL_TOOLS_VERSION,
      capabilities: FL_CAPABILITIES, live
    } }));
  }
  function flSyncStudioYield() {
    document.documentElement.classList.toggle("fl-tools-studio-primary", flStudioLive());
  }
  window.addEventListener("fltools:capabilities-requested", () => flPublishCapabilities(true));
  window.addEventListener("fltools:studio-heartbeat", flSyncStudioYield);
  window.addEventListener("pagehide", () => flPublishCapabilities(false));
  flPublishCapabilities(true);
  setInterval(() => { flPublishCapabilities(true); flSyncStudioYield(); }, 1500);
  function flNormaliseObject(defaults, value) {
    const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
    const clean = {};
    Object.keys(defaults).forEach((key) => {
      clean[key] = typeof source[key] === typeof defaults[key] ? source[key] : defaults[key];
    });
    return clean;
  }
  /* Shared handoff API for companion userscripts. Pro is always the primary edition. */
  const FL_TOOLS_HANDOFF = (() => {
    const root = window;
    const current = root.FLTools;
    if (current && current.edition === "pro" && FL_EDITION === "basic") return current;
    const api = current && typeof current === "object" ? current : {};
    Object.assign(api, {
      edition: FL_EDITION,
      version: FL_TOOLS_VERSION,
      primary: FL_EDITION === "pro" || !current || current.edition !== "pro",
      launcherId: "fl-settings-launcher",
      dockId: "fl-tools-dock",
      isPrimary() { return this.edition === "pro" || !root.FLTools || root.FLTools.edition !== "pro"; }
    });
    root.FLTools = api;
    root.dispatchEvent(new CustomEvent("fltools:ready", { detail: api }));
    return api;
  })();
  const FL_LAUNCHER_PROTOCOL = "userscript-launcher-v1";
  const FL_SHORTCUTS_KEY = "fl_tools_basic_shortcuts";
  const FL_SHORTCUT_DEFAULTS = { filters:"F", nsfw:"S", next:"N", top:"T" };
  function flNormaliseShortcut(value) { if (typeof value !== "string") return ""; const raw=value.trim(); if (!raw || /^off$/i.test(raw)) return ""; const parts=raw.split("+").map((v)=>v.trim()).filter(Boolean), key=parts.pop(); if(!key)return ""; const mods=["Ctrl","Alt","Shift","Meta"].filter((mod)=>parts.some((v)=>v.toLowerCase()===mod.toLowerCase())); return [...mods,key.length===1?key.toUpperCase():key].join("+"); }
  function flLoadShortcuts() { return { ...FL_SHORTCUT_DEFAULTS }; }
  function flEventShortcut(event) { return [...(event.ctrlKey?["Ctrl"]:[]),...(event.altKey?["Alt"]:[]),...(event.shiftKey?["Shift"]:[]),...(event.metaKey?["Meta"]:[]),event.key.length===1?event.key.toUpperCase():event.key].join("+"); }
  function flShortcutBlocked(shortcut){const node=document.getElementById("fl-settings-launcher"),priority=Number(node?.dataset.launcherPriority||0),id=node?.dataset.launcherId||"";return [...document.querySelectorAll('[data-userscript-launcher="userscript-launcher-v1"]')].some((el)=>{if(el===node)return false;let shortcuts=[];try{shortcuts=JSON.parse(el.dataset.launcherShortcuts||"[]");}catch(_){}const other=Number(el.dataset.launcherPriority||0);return shortcuts.includes(shortcut)&&(other>priority||(other===priority&&(el.dataset.launcherId||"").localeCompare(id)<0));});}
  function flShortcutMatch(event,action) { const shortcut=flLoadShortcuts()[action]; return !!shortcut&&flEventShortcut(event)===shortcut&&!flShortcutBlocked(shortcut); }
  function flPublishShortcutMetadata(){const launcher=document.getElementById("fl-settings-launcher");if(launcher)launcher.dataset.launcherShortcuts=JSON.stringify(Object.values(flLoadShortcuts()).filter(Boolean));}
  function flDeclareLauncher(node, controls, meta) {
    node.dataset.userscriptLauncher = FL_LAUNCHER_PROTOCOL; node.dataset.launcherOwner = meta.owner; node.dataset.launcherId = meta.id; node.dataset.launcherPriority = String(meta.priority); node.dataset.launcherPreferredPosition = meta.preferredPosition;
    try { FLToolsLauncherGrid.register(node, meta); } catch (_) {}
    let frame = 0; const publish = () => { frame = 0; const rects = controls().filter((el) => el && el.isConnected && el.getClientRects().length).map((el) => el.getBoundingClientRect()); if (!rects.length) return; const area = { left: Math.round(Math.min(...rects.map((r) => r.left))), top: Math.round(Math.min(...rects.map((r) => r.top))), right: Math.round(Math.max(...rects.map((r) => r.right))), bottom: Math.round(Math.max(...rects.map((r) => r.bottom))) }; node.dataset.launcherOccupiedArea = JSON.stringify(area); window.dispatchEvent(new CustomEvent("userscript-launcher:change", { detail: { protocol: FL_LAUNCHER_PROTOCOL, owner: meta.owner, id: meta.id, priority: meta.priority, preferredPosition: meta.preferredPosition, occupiedArea: area } })); };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(publish); }; if (typeof ResizeObserver !== "undefined") { const observer = new ResizeObserver(schedule); controls().filter(Boolean).forEach((el) => observer.observe(el)); } window.addEventListener("resize", schedule, { passive: true }); const checkCollision=()=>{let own=[];try{own=JSON.parse(node.dataset.launcherShortcuts||"[]");}catch(_){}const collision=[...document.querySelectorAll('[data-userscript-launcher="userscript-launcher-v1"]')].some((el)=>{if(el===node)return false;try{return JSON.parse(el.dataset.launcherShortcuts||"[]").some((value)=>own.includes(value));}catch(_){return false;}});node.dataset.launcherShortcutCollision=String(collision);};window.addEventListener("userscript-launcher:change",checkCollision);queueMicrotask(checkCollision);return { publish: schedule };
  }
  const FL_PERF_KEY = "fl_perf_settings";
  const FL_PERF_DEFAULTS = { lightweight: false, scanDelay: 120, compactLauncher: false, paused: false, highContrast: false, updateNotifications:false, dockSide: "auto" };
  function flIsNewerVersion(latest,current){const a=String(latest).split(".").map(Number),b=String(current).split(".").map(Number);if(a.some(Number.isNaN)||b.some(Number.isNaN))return false;for(let i=0;i<Math.max(a.length,b.length);i++){const difference=(a[i]||0)-(b[i]||0);if(difference)return difference>0;}return false;}
  async function flCheckForUpdate(){const p=flLoadPerf(),launcher=document.getElementById("fl-settings-launcher");if(!p.updateNotifications){launcher?.removeAttribute("data-update-available");return;}const key="fl_tools_basic_update_check";try{const cached=JSON.parse(localStorage.getItem(key)||"null");if(cached&&Date.now()-cached.checked<86400000)return flShowUpdate(cached.latest);const response=await fetch("https://api.github.com/repos/Typical-Bits/fl-tools-basic/releases/latest",{headers:{Accept:"application/vnd.github+json"}});if(!response.ok)return;const data=await response.json(),latest=String(data.tag_name||"").replace(/^v/,"");localStorage.setItem(key,JSON.stringify({checked:Date.now(),latest}));flShowUpdate(latest);}catch(_){ }function flShowUpdate(latest){launcher?.removeAttribute("data-update-available");if(!flIsNewerVersion(latest,FL_TOOLS_VERSION))return;launcher?.setAttribute("data-update-available",latest);flSetPerfStatus("Update available: "+latest);}}
  const FL_TELEMETRY = {
    record(start, skipped = false) { return flCandidateScanner.record(start, skipped); },
    snapshot() { return flCandidateScanner.snapshot(); }
  };
  const FL_DIAGNOSTIC_ERRORS = [];
  window.addEventListener("error", (event) => {
      if (flBasicShouldYield()) return; if (/FL[_ ]?Tools/i.test(String(event.message || event.error?.stack || ""))) FL_DIAGNOSTIC_ERRORS.push(String(event.message || event.error)); });
  function flDiagnosticsText() {
    const telemetry = FL_TELEMETRY.snapshot();
    const settings = typeof loadFilterSettings === "function" ? loadFilterSettings() : {};
    const active = Object.values(settings).filter((value) => value === true).length;
    return [`FL Tools Basic ${FL_TOOLS_VERSION}`, `Site: ${location.hostname}`, `Page: ${typeof pageKind === "function" ? pageKind() : location.pathname || "/"}`, `Active options: ${active}`, `Scans: ${telemetry.scans} · skipped ${telemetry.skipped} · last ${telemetry.lastScanMs}ms`, `Errors: ${FL_DIAGNOSTIC_ERRORS.length}${FL_DIAGNOSTIC_ERRORS.length ? " · " + FL_DIAGNOSTIC_ERRORS.at(-1) : ""}`].join("\n");
  }
  function flLoadPerf() {
    try { return flNormaliseObject(FL_PERF_DEFAULTS, FLStorage.get(FL_PERF_KEY) || {}); }
    catch (_) { return Object.assign({}, FL_PERF_DEFAULTS); }
  }
  function flSavePerf(next) {
    try { FLStorage.set(FL_PERF_KEY, Object.assign({}, FL_PERF_DEFAULTS, next)); } catch (_) {}
  }
  function flSetPerfStatus(text) {
    const node = document.getElementById("fl-rail-status");
    if (node) { const t = FL_TELEMETRY.snapshot(); node.textContent = `${text} · scans ${t.scans} · skipped ${t.skipped} · last ${t.lastScanMs}ms`; }
  }
  function flApplyPerf() {
    const p = flLoadPerf();
    document.documentElement.classList.toggle("fl-tools-lightweight", !!p.lightweight);
    document.documentElement.classList.toggle("fl-tools-launcher-compact", !!p.compactLauncher);
    flCandidateScanner.setDelay(Math.max(80, Math.min(1000, Number(p.scanDelay) || 120)));
    if (p.paused) flCandidateScanner.pause();
    else flCandidateScanner.resume();
    flApplyAccessibility(); flSmartDockPlacement();
    flCheckForUpdate();
    flSetPerfStatus(p.paused ? "Scanning paused · changes save automatically" : (p.lightweight ? "Lightweight scanning is on · changes save automatically" : "Standard scanning · changes save automatically"));
  }
  function flSmartDockPlacement() {
    const dock = document.getElementById("fl-tools-dock");
    if (!dock) return;
    const p = flLoadPerf();
    // Keep the dock anchored once chosen. Other userscripts must move around it.
    const side = p.dockSide === "left" || p.dockSide === "right"
      ? p.dockSide
      : (dock.dataset.dockSide === "left" || dock.dataset.dockSide === "right" ? dock.dataset.dockSide : "right");
    dock.style.left = side === "left" ? "12px" : "auto";
    dock.style.right = side === "right" ? "12px" : "auto";
    dock.dataset.dockSide = side;
  }
  function flRememberDockSide(side) {
    if (side !== "left" && side !== "right") return;
    flSavePerf({ dockSide: side }); flSmartDockPlacement();
  }
  function flApplyAccessibility() {
    const p = flLoadPerf();
    document.documentElement.classList.toggle("fl-tools-high-contrast", !!p.highContrast);
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("fl-tools-reduced-motion");
  }
  function flInstallUiEnhancements() {
    if (flInstallUiEnhancements.done) return;
    flInstallUiEnhancements.done = true;
    const dock = document.getElementById("fl-tools-dock");
    if (dock) {
      dock.addEventListener("dblclick", () => flRememberDockSide(dock.dataset.dockSide));
      dock.title = "FL Tools settings · double-click to remember this side";
    }
    flApplyAccessibility(); flSmartDockPlacement();
  }
  const FL_TOOLS_ICON_HTML = '<img src="https://raw.githubusercontent.com/Typical-Bits/fl-tools-basic/main/assets/fl-tools-basic-icon-64.png?asset=4217521d9bba" alt="FL Tools Basic" draggable="false">';
  /* BEGIN generated:handoff */
  /* FL Tools edition handoff. Hosted on Typical-Bits/fl-tools-basic.
     Source of truth — edit here, then run: node scripts/sync-core.mjs
     Pro is primary while its heartbeat is fresh (<4s) AND UI exists. */
  (function (root) {
    var HEARTBEAT_MS = 1500;
    var FRESH_MS = 4000;

    function pageRoot() {
      try {
        if (typeof unsafeWindow !== "undefined" && unsafeWindow) return unsafeWindow;
      } catch (_) {}
      return window;
    }

    function liveProActive() {
      var page = pageRoot();
      var html = document.documentElement;
      var beat = Number((page && page.__FL_TOOLS_HEARTBEAT__) || (html && html.getAttribute("data-fl-tools-beat")) || 0);
      if (!beat || Date.now() - beat >= FRESH_MS) return false;
      if (!document.getElementById("fl-tools-dock") && !document.getElementById("fl-settings-launcher")) return false;
      if (page && page.__FL_TOOLS_BOOTED__ === "pro") return true;
      if (page && page.__FL_TOOLS_CLAIM__ === "pro") return true;
      if (page && page.FLTools && page.FLTools.edition === "pro") return true;
      if (!html) return false;
      return (
        html.getAttribute("data-fl-tools-live") === "pro" ||
        html.getAttribute("data-fl-tools-claim") === "pro" ||
        html.getAttribute("data-fl-tools-edition") === "pro"
      );
    }

    function stampPro(live) {
      var html = document.documentElement;
      var page = pageRoot();
      var beat = String(Date.now());
      html.setAttribute("data-fl-tools-edition", "pro");
      html.setAttribute("data-fl-tools-claim", "pro");
      if (live) html.setAttribute("data-fl-tools-live", "pro");
      else html.removeAttribute("data-fl-tools-live");
      html.setAttribute("data-fl-tools-beat", beat);
      try { sessionStorage.setItem("fl_tools_claim", live ? "pro" : ""); } catch (_) {}
      try {
        page.__FL_TOOLS_CLAIM__ = live ? "pro" : "";
        page.__FL_TOOLS_HEARTBEAT__ = live ? Date.now() : 0;
        if (live) page.__FL_TOOLS_BOOTED__ = "pro";
      } catch (_) {}
      try {
        var s = document.createElement("script");
        s.textContent =
          "window.__FL_TOOLS_CLAIM__='" + (live ? "pro" : "") + "';" +
          "window.__FL_TOOLS_HEARTBEAT__=" + (live ? "Date.now()" : "0") + ";" +
          "document.documentElement.setAttribute('data-fl-tools-edition','pro');" +
          "document.documentElement.setAttribute('data-fl-tools-claim','pro');" +
          (live
            ? "document.documentElement.setAttribute('data-fl-tools-live','pro');"
            : "document.documentElement.removeAttribute('data-fl-tools-live');");
        s.textContent +=
          "document.documentElement.setAttribute('data-fl-tools-beat',String(Date.now()));" +
          "try{sessionStorage.setItem('fl_tools_claim','" + (live ? "pro" : "") + "');}catch(e){}" +
          "try{window.dispatchEvent(new CustomEvent('fltools:edition-changed',{detail:{edition:'" + (live ? "pro" : "off") + "'}}));}catch(e){}";
        (html || document.head || document.documentElement).appendChild(s);
        s.remove();
      } catch (_) {}
    }

    function claimBasic() {
      if (liveProActive()) return false;
      var html = document.documentElement;
      var page = pageRoot();
      html.setAttribute("data-fl-tools-edition", "basic");
      html.setAttribute("data-fl-tools-claim", "basic");
      html.removeAttribute("data-fl-tools-live");
      try { sessionStorage.setItem("fl_tools_claim", "basic"); } catch (_) {}
      try {
        page.__FL_TOOLS_CLAIM__ = "basic";
        if (page.__FL_TOOLS_BOOTED__ !== "pro") page.__FL_TOOLS_BOOTED__ = "basic";
      } catch (_) {}
      return true;
    }

    function startProLive() {
      try { stampPro(true); } catch (_) {}
      try {
        setInterval(function () { stampPro(true); }, HEARTBEAT_MS);
        window.addEventListener("pagehide", function () { try { stampPro(false); } catch (_) {} });
        document.addEventListener("visibilitychange", function () {
          if (document.visibilityState === "hidden") { try { stampPro(false); } catch (_) {} }
          else { try { stampPro(true); } catch (_) {} }
        });
      } catch (_) {}
    }

    function paintBasicIdle(idle) {
      var launch = document.getElementById("fl-settings-launcher");
      var dock = document.getElementById("fl-tools-dock");
      // Basic must never relabel or dim the active Pro launcher.
      if ((launch && launch.getAttribute("data-launcher-id") === "fl-tools-pro") ||
          (dock && dock.getAttribute("data-fl-tools-owner") === "pro")) return;
      if (idle) {
        if (dock) dock.setAttribute("data-fl-tools-idle", "basic");
        if (launch) {
          launch.setAttribute("data-fl-tools-idle", "basic");
          launch.title = "FL Tools Basic idle — Pro is active";
        }
        return;
      }
      if (dock) dock.removeAttribute("data-fl-tools-idle");
      if (launch) {
        launch.removeAttribute("data-fl-tools-idle");
        launch.title = "FL Tools Basic";
      }
    }

    function watchBasicIdle() {
      function tick() { paintBasicIdle(liveProActive()); }
      try {
        setInterval(tick, HEARTBEAT_MS);
        document.addEventListener("visibilitychange", tick);
        window.addEventListener("fltools:edition-changed", tick);
        tick();
      } catch (_) {}
    }

    function boot(edition) {
      if (edition === "pro") {
        startProLive();
        return true;
      }
      if (liveProActive()) {
        paintBasicIdle(true);
        watchBasicIdle();
        return false;
      }
      claimBasic();
      watchBasicIdle();
      return true;
    }

    var api = {
      pageRoot: pageRoot,
      liveProActive: liveProActive,
      claimBasic: claimBasic,
      startProLive: startProLive,
      watchBasicIdle: watchBasicIdle,
      paintBasicIdle: paintBasicIdle,
      boot: boot
    };
    root.FLToolsCore = api;
    root.flPageRoot = pageRoot;
    root.flLiveProActive = liveProActive;
    root.flClaimBasic = claimBasic;
    root.flWatchProHandoff = watchBasicIdle;
  })(typeof unsafeWindow !== "undefined" && unsafeWindow ? unsafeWindow : window);
  /* END generated:handoff */

  function flCore() {
    try {
      if (typeof unsafeWindow !== "undefined" && unsafeWindow && unsafeWindow.FLToolsCore) return unsafeWindow.FLToolsCore;
    } catch (_) {}
    return window.FLToolsCore || null;
  }
  function flPageRoot() {
    const core = flCore();
    if (core && typeof core.pageRoot === "function") return core.pageRoot();
    return (typeof unsafeWindow !== "undefined" && unsafeWindow) || window;
  }
  function flLiveProActive() {
    const core = flCore();
    if (core && typeof core.liveProActive === "function") return !!core.liveProActive();
    return false;
  }
  function flBasicShouldYield() {
    const dock = document.getElementById("fl-tools-dock");
    const launcher = document.getElementById("fl-settings-launcher");
    return document.documentElement.hasAttribute("data-fl-tools-pro-present") || dock?.dataset.flToolsOwner === "pro" || launcher?.dataset.launcherId === "fl-tools-pro" || flLiveProActive();
  }
  function flClaimBasic() {
    const core = flCore();
    if (core && typeof core.claimBasic === "function") return core.claimBasic();
    return false;
  }
  /* Dual-install: yield only if Pro is LIVE (fresh heartbeat + Pro UI).
     sessionStorage "pro" is a leftover hint and must NOT block Basic after
     Pro is disabled (it survives tab reloads). */
  try {
    const root = document.documentElement;
    const page = flPageRoot();
    if (flBasicShouldYield()) return;
    /* Same-document dual Basic: DOM/page stamp only. */
    if (page && page.__FL_TOOLS_BOOTED__ === "basic") return;
    if (root.getAttribute("data-fl-tools-claim") === "basic" && document.getElementById("fl-tools-dock")) return;
    if (document.getElementById("fl-tools-core-style") && document.getElementById("fl-tools-dock")) return;
    flClaimBasic();
  } catch (_) {}

  /* Member-card selectors. FetLife wraps some lists in [data-member-card];
     kinksters grids often only have the rounded visual card + nickname link. */
  const NAME_LINK_SELECTOR = 'a[href^="/"][title]';
  const VISUAL_CARD_SELECTOR = ".w-full.rounded-sm.cursor-pointer";

  /* Injected CSS: tokens + dock chrome from assets/fl-tools-core.css (sync-core). */
  /* BEGIN generated:css-core */
  /* Generated by scripts/sync-core.mjs — do not edit.
     Source: assets/fl-tools-core.css
     Injects shared dock tokens + chrome for Basic and for Pro to vendor. */
  (function () {
    if (document.getElementById("fl-tools-core-style")) return;
    var el = document.createElement("style");
    el.id = "fl-tools-core-style";
    el.textContent = "/* FL Tools shared dock CSS.\n   Source of truth for tokens + dock/launcher chrome + Basic surface styles.\n   Hosted on Typical-Bits/fl-tools-basic.\n   Edit this file, then run: node scripts/sync-core.mjs\n   Pro-only chrome lives in assets/fl-tools-pro.css.\n*/\n\n/* --- Design tokens + dock shell --- */\n/* Dark: neutral black/gray (no blue-slate). Accent = favicon red only. */\n#fl-tools-dock {\n  color-scheme: dark;\n  --lt-bg: #111111;\n  --lt-bg-elev: #1a1a1a;\n  --lt-bg-input: #0a0a0a;\n  --lt-border: #2e2e2e;\n  --lt-border-soft: #262626;\n  --lt-text: #f3f4f6;\n  --lt-text-muted: #a3a3a3;\n  --lt-accent: #e11d48;\n  --lt-accent-soft: rgba(225, 29, 72, 0.16);\n  --lt-gold: #a3a3a3;\n  --lt-radius: 8px;\n  --lt-ctrl-h: 28px;\n  position: fixed; right: 12px; z-index: 2147483000;\n  width: 240px; box-sizing: border-box;\n  overflow-x: hidden; overflow-y: auto; scrollbar-gutter: stable;\n  display: flex; flex-direction: column; gap: 5px;\n  font-family: ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", sans-serif;\n  color: var(--lt-text);\n}\nhtml.light #fl-tools-dock {\n  color-scheme: light;\n  --lt-bg: #f9fafb;\n  --lt-bg-elev: #ffffff;\n  --lt-bg-input: #ffffff;\n  --lt-border: #d1d5db;\n  --lt-border-soft: #e5e7eb;\n  --lt-text: #171717;\n  --lt-text-muted: #737373;\n  --lt-accent: #e11d48;\n  --lt-accent-soft: rgba(225, 29, 72, 0.1);\n  --lt-gold: #737373;\n}\n#fl-tools-dock.dock-top { top: 72px; bottom: auto; transform: none; max-height: calc(100vh - 84px); }\n#fl-tools-dock.dock-center { top: 50%; bottom: auto; transform: translateY(-50%); max-height: calc(100vh - 24px); }\n#fl-tools-dock.dock-bottom { top: auto; bottom: 16px; transform: none; max-height: calc(100vh - 32px); }\n#fl-tools-dock.dragging { user-select: none; cursor: ns-resize; }\n#fl-tools-dock.lt-grow-up {\n  justify-content: flex-end;\n}\n/* Near bottom: keep header→body order so the panel name stays on top;\n   dock is bottom-anchored / flex-end so open panels expand upward. */\n#fl-tools-dock.lt-grow-up .fl-tool-panel {\n  display: flex;\n  flex-direction: column;\n}\n.fl-tool-panel {\n  background: var(--lt-bg);\n  border: 1px solid var(--lt-border-soft);\n  border-radius: var(--lt-radius);\n  padding: 7px 9px;\n  width: 100%; max-width: 100%; box-sizing: border-box;\n  color: var(--lt-text);\n  font-size: 13px; line-height: 1.45;\n  box-shadow: 0 1px 2px rgba(0,0,0,.22);\n  overflow-x: hidden;\n}\nhtml.light .fl-tool-panel {\n  background: var(--lt-bg);\n  border-color: var(--lt-border-soft);\n  box-shadow: 0 1px 2px rgba(0,0,0,.08);\n}\n.fl-tool-header {\n  display: flex; justify-content: space-between; align-items: center;\n  cursor: ns-resize; gap: 8px;\n  padding-bottom: 2px;\n}\n.fl-tool-title {\n  font-weight: 600; color: var(--lt-text);\n  font-size: 13px; letter-spacing: 0.02em;\n  line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\n}\n/* Remembered last / currently opened panel — favicon red accent. */\n.fl-tool-panel.lt-last-panel {\n  border-color: rgba(225, 29, 72, 0.45);\n  box-shadow: 0 1px 2px rgba(0,0,0,.22), inset 3px 0 0 #e11d48;\n}\n.fl-tool-panel.lt-last-panel > .fl-tool-header .fl-tool-title::after {\n  content: \"\";\n  display: inline-block;\n  width: 6px; height: 6px; margin-left: 6px; vertical-align: middle;\n  border-radius: 50%; background: #e11d48;\n}\n.fl-tool-panel.lt-panel-open {\n  border-color: rgba(225, 29, 72, 0.65);\n  box-shadow: 0 1px 2px rgba(0,0,0,.22), inset 3px 0 0 #e11d48,\n    0 0 0 1px rgba(225, 29, 72, 0.22);\n}\nhtml.light .fl-tool-panel.lt-last-panel {\n  box-shadow: 0 1px 2px rgba(0,0,0,.08), inset 3px 0 0 #e11d48;\n}\nhtml.light .fl-tool-panel.lt-panel-open {\n  box-shadow: 0 1px 2px rgba(0,0,0,.08), inset 3px 0 0 #e11d48,\n    0 0 0 1px rgba(225, 29, 72, 0.2);\n}\n.flhp-legend { margin-top: 6px; color: var(--lt-text-muted); font-size: 11px; line-height: 1.45; font-weight: 400; }\n.flhp-legend-row { display: flex; align-items: center; gap: 6px; margin: 1px 0; }\n.fl-shortcut-fixed .flhp-legend-row { justify-content: space-between; }\n.fl-shortcut-fixed strong { color: var(--lt-text); letter-spacing: .04em; }\n.fl-shortcut-editor .flhp-legend-row { justify-content: space-between; }\n.fl-shortcut-editor input { width: 7.5rem; min-width: 0; }\n.fl-nav-focus { outline: 2px solid var(--lt-accent); outline-offset: 2px; border-radius: 8px; }\n.fl-tool-chevron {\n  background: none; border: none; color: var(--lt-text-muted);\n  cursor: pointer; font-size: 13px; padding: 0 2px; line-height: 1;\n  transition: color .15s ease;\n}\n.fl-tool-chevron:hover { color: var(--lt-text); }\n.lt-why-hidden {\n  position: absolute; left: 6px; top: 6px; z-index: 24;\n  font-size: 10px; padding: 1px 6px; border-radius: 999px;\n  background: rgba(0,0,0,.72); color: #e5e5e5; border: 1px solid #e11d48;\n  pointer-events: none; max-width: 72%; white-space: nowrap;\n  overflow: hidden; text-overflow: ellipsis;\n}\nhtml.light .lt-why-hidden { background: rgba(255,255,255,.88); color: #171717; }\n.fl-tool-body {\n  margin-top: 6px; max-height: min(58vh, 520px);\n  overflow-x: hidden; overflow-y: auto; scrollbar-gutter: stable;\n  padding-right: 2px; box-sizing: border-box;\n}\n.fl-tool-hidden { display: none !important; }\n.fl-chip-row { display: flex; flex-wrap: wrap; gap: 4px; margin: 0 0 8px; max-height: 72px; overflow: auto; }\n.fl-chip {\n  display: inline-flex; align-items: center; gap: 4px;\n  background: var(--lt-bg-elev); border: 1px solid var(--lt-border);\n  border-radius: 999px; padding: 2px 8px; font-size: 12px; color: var(--lt-text);\n}\n.fl-chip.fl-chip-saved {\n  background: transparent; border-color: var(--lt-border-soft); color: var(--lt-text-muted);\n}\n.fl-chip button { border: 0; background: none; color: var(--lt-text-muted); cursor: pointer; padding: 0 2px; font: inherit; }\n.fl-chip.fl-chip-saved button { color: var(--lt-text-muted); }\n.fl-chip button:hover { color: var(--lt-accent); }\n.fl-chip-meta { color: var(--lt-text-muted); font-size: 11px; margin: 0 0 4px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }\n.fl-chip-meta .fl-chip-clear-saved,\n.fl-chip-more {\n  background: none; border: 0; color: var(--lt-gold); cursor: pointer; font: inherit; font-size: 11px; padding: 0;\n}\n.fl-suggest-row { display: flex; align-items: stretch; width: 100%; }\n.fl-suggest-row .fl-suggest-pick { flex: 1; }\n.fl-suggest-row .fl-suggest-del { flex: 0 0 auto; width: auto; padding: 5px 10px; color: var(--lt-text-muted); }\n.fl-suggest {\n  display: none; max-height: 120px; overflow: auto;\n  background: var(--lt-bg-elev); border: 1px solid var(--lt-border);\n  border-radius: 6px; margin: 0 0 8px;\n}\n.fl-suggest.open { display: block; }\n.fl-suggest button {\n  display: flex; justify-content: space-between; width: 100%;\n  background: none; border: 0; color: var(--lt-text); text-align: left;\n  padding: 5px 8px; cursor: pointer; font: inherit; font-size: 12px;\n}\n.fl-suggest button:hover { background: var(--lt-accent-soft); }\n.fl-suggest .off { color: var(--lt-text-muted); }\n.fl-add-row { display: grid; grid-template-columns: minmax(0, 1fr) 18%; align-items: center; gap: 4px; margin-bottom: 6px; }\n.fl-add-row input { min-width: 0; margin: 0 !important; height: var(--lt-ctrl-h); }\n.fl-add-row .life-btn {\n  width: 100%; min-width: 0; box-sizing: border-box; margin: 0; padding: 0 4px;\n  height: var(--lt-ctrl-h); line-height: var(--lt-ctrl-h);\n}\n.fl-tool-panel input[type=\"text\"], .fl-tool-panel input[type=\"number\"],\n.fl-tool-panel input[type=\"search\"],\n.fl-tool-panel select, .fl-tool-panel textarea {\n  width: 100%; box-sizing: border-box; padding: 5px 8px;\n  background: var(--lt-bg-input) !important; color: var(--lt-text) !important;\n  border: 1px solid var(--lt-border); border-radius: 6px;\n  font: inherit; font-size: 12px; min-height: var(--lt-ctrl-h);\n  transition: border-color .15s ease;\n  color-scheme: dark;\n  -webkit-text-fill-color: var(--lt-text);\n}\nhtml.light .fl-tool-panel select,\nhtml.light .fl-tool-panel input[type=\"text\"],\nhtml.light .fl-tool-panel input[type=\"number\"],\nhtml.light .fl-tool-panel input[type=\"search\"],\nhtml.light .fl-tool-panel textarea {\n  color-scheme: light;\n}\n.fl-tool-panel select option,\n.fl-tool-panel select optgroup {\n  background: var(--lt-bg-input);\n  color: var(--lt-text);\n}\n.fl-tool-panel input:focus, .fl-tool-panel select:focus, .fl-tool-panel textarea:focus {\n  outline: none; border-color: var(--lt-accent);\n}\n.fl-tool-panel label { cursor: pointer; color: var(--lt-text); }\n.life-hint { color: var(--lt-text-muted); font-size: 11px; margin: 0 0 6px; }\n.life-subhead {\n  display: flex; justify-content: space-between; align-items: center;\n  cursor: pointer; color: var(--lt-text); font-weight: 600; margin: 4px 0;\n}\n.life-hr, .fl-hr { border: 0; border-top: 1px solid var(--lt-border-soft); margin: 8px 0; }\n.life-btn {\n  width: 100%; padding: 0 10px; height: var(--lt-ctrl-h); line-height: var(--lt-ctrl-h);\n  color: var(--lt-text); border: 1px solid var(--lt-border); border-radius: 6px;\n  cursor: pointer; margin-bottom: 6px; font: inherit; font-size: 12px;\n  background: var(--lt-bg-elev); transition: background .15s ease, border-color .15s ease;\n}\n.life-btn:hover { border-color: #525252; }\n.life-btn-red {\n  background: var(--lt-bg-elev); border-color: var(--lt-border); color: var(--lt-text);\n}\n.life-btn-red:hover { border-color: #525252; background: #1a1a1a; }\nhtml.light .life-btn-red:hover { background: #f5f5f5; border-color: #a3a3a3; }\n.life-btn-gray { background: var(--lt-bg-elev); }\n.life-toast {\n  background: var(--lt-bg-elev); border: 1px solid var(--lt-border); color: var(--lt-text);\n  padding: 8px 10px; border-radius: var(--lt-radius); font-size: 12px; line-height: 1.4;\n  cursor: pointer;\n}\n.fl-switch {\n  display: flex; align-items: center; justify-content: space-between; gap: 10px;\n  color: var(--lt-text); cursor: pointer; margin: 6px 0; width: 100%;\n  user-select: none;\n}\n.fl-switch-text { flex: 1 1 auto; min-width: 0; line-height: 1.3; }\n/* Exact AMA account-sidebar toggle: 36×18 track, 18px knob, red when on */\n.toggleSwitch {\n  position: relative; flex: none;\n  width: 36px; height: 18px;\n  background: #6b6b6b; border: 0;\n  border-radius: 12px; cursor: pointer; box-sizing: border-box;\n  padding: 0; margin: 0; appearance: none; -webkit-appearance: none;\n  transition: background .15s ease;\n  vertical-align: top;\n}\n.toggleSwitch::after {\n  content: \"\"; position: absolute; top: 0; left: 0;\n  width: 18px; height: 18px; border-radius: 12px;\n  background: #d4d4d4;\n  box-shadow: 0 1px 2px rgba(0,0,0,.35);\n  transition: transform .15s ease, background .15s ease;\n}\n.toggleSwitch[aria-checked=\"true\"] {\n  background: var(--lt-accent); /* favicon / FL red-600 family */\n}\n.toggleSwitch[aria-checked=\"true\"]::after {\n  transform: translateX(18px); background: #e8e8e8;\n}\n.fl-switch:hover .toggleSwitch::after { background: #cfcfcf; }\n.toggleSwitch[aria-checked=\"true\"]::after,\n.fl-switch:hover .toggleSwitch[aria-checked=\"true\"]::after {\n  background: #e8e8e8;\n}\n.toggleSwitch:focus-visible {\n  outline: 1px dotted currentColor; outline-offset: 2px;\n}\nhtml.light .toggleSwitch { background: #a3a3a3; }\nhtml.light .toggleSwitch::after { background: #262626; }\nhtml.light .toggleSwitch[aria-checked=\"true\"] { background: var(--lt-accent); }\nhtml.light .toggleSwitch[aria-checked=\"true\"]::after { background: #262626; }\n@media (max-width: 720px) { #fl-tools-dock { width: min(260px, calc(100vw - 16px)); } }\n#fl-dock-actions {\n  display: flex; gap: 6px; width: 100%; box-sizing: border-box; align-items: stretch;\n}\n#fl-dock-actions > button {\n  flex: 1 1 0; min-width: 0; box-sizing: border-box; padding: 6px 8px; margin: 0;\n  background: transparent; color: var(--lt-gold);\n  border: 1px solid var(--lt-border); border-radius: var(--lt-radius);\n  cursor: pointer; font: inherit; font-size: 12px; line-height: 1.45; text-align: center;\n  transition: background .15s ease, border-color .15s ease, box-shadow .15s ease, color .15s ease;\n}\n#fl-dock-actions > button:hover {\n  background: var(--lt-accent-soft); border-color: #e11d48; color: #e11d48;\n  box-shadow: 0 0 0 1px rgba(225, 29, 72, 0.22), 0 0 12px rgba(225, 29, 72, 0.32);\n}\n#fl-selector-warn { color: var(--lt-gold); font-size: 12px; margin: 6px 0; }\n#fl-markup-banner {\n  display: none; width: 100%; box-sizing: border-box;\n  margin: 0 0 5px; padding: 8px 10px;\n  border-radius: var(--lt-radius, 8px);\n  border: 1px solid var(--lt-border);\n  background: var(--lt-bg-elev);\n  color: var(--lt-text, #f3f4f6);\n  font-size: 12px; line-height: 1.4;\n  opacity: 1; transition: opacity .7s ease;\n}\n#fl-markup-banner.lt-show { display: block; }\n#fl-markup-banner.lt-fade { opacity: 0; }\nhtml.light #fl-markup-banner {\n  background: rgba(139, 105, 20, 0.12);\n  border-color: rgba(139, 105, 20, 0.45);\n  color: #1a1a1a;\n}\n.life-alert-strong,\n#fl-exclude-alert {\n  background: var(--lt-bg-elev);\n  border: 1px solid var(--lt-border);\n  color: var(--lt-text, #f3f4f6);\n  padding: 8px 10px; border-radius: var(--lt-radius, 8px); font-size: 12px; line-height: 1.45;\n  box-shadow: none;\n}\n.life-alert-strong .fl-block-actions,\n#fl-exclude-alert .fl-block-actions {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 6px;\n  margin-top: 8px;\n}\n.life-alert-strong .fl-block-actions .fl-block-span,\n#fl-exclude-alert .fl-block-actions .fl-block-span {\n  grid-column: 1 / -1;\n}\n.life-alert-strong .life-btn,\n.life-alert-strong .fl-btn,\n#fl-exclude-alert .life-btn,\n#fl-exclude-alert .fl-btn {\n  width: 100%; display: inline-flex; align-items: center; justify-content: center;\n  margin: 0; padding: 0 10px;\n  height: 26px; line-height: 26px; font-size: 11px;\n}\n#fl-tools-dock .fl-prompt-danger {\n  border-color: #e11d48;\n  background: rgba(225, 29, 72, 0.16);\n}\n#fl-factory-reset-prompt[hidden],\n#fl-dock-prompt[hidden] { display: none !important; }\n#fl-tools-dock.fl-settings-rail #fl-dock-prompt { order: 0; }\n#fl-tools-dock #fl-confirm-overlay,\n#fl-tools-dock #fl-tools-modal-root {\n  position: static; inset: auto; background: none; display: block;\n  padding: 0; z-index: auto; box-shadow: none;\n}\n#fl-tools-dock #fl-confirm-dialog,\n#fl-tools-dock #fl-tools-modal {\n  width: 100%; max-width: none; box-shadow: none;\n  border-color: var(--lt-border);\n}\n#fl-tools-dock #fl-tools-modal-backdrop { display: none !important; }\n#fl-action-toast {\n  position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%);\n  z-index: 2147483645; max-width: min(360px, calc(100vw - 24px));\n  box-shadow: 0 8px 24px rgba(0,0,0,.45);\n}\n#fl-block-panel .life-alert-strong { margin-top: 8px; }\n#fl-soft-list { max-height: 220px; overflow-y: auto; margin: 4px 0 8px; }\nhtml.fl-tools-hide-banners [data-controller=\"push-notifications-banner\"],\nhtml.fl-tools-hide-banners [data-controller=\"pwa-install--prompt\"],\nhtml.fl-tools-hide-banners [data-pwa-install-cta] { display: none !important; }\nhtml.fl-tools-nsfw main img, html.fl-tools-nsfw main video,\nhtml.fl-tools-nsfw #main-content img, html.fl-tools-nsfw #main-content video,\nhtml.fl-tools-nsfw #ptr-main-element img, html.fl-tools-nsfw #ptr-main-element video,\nhtml.fl-tools-nsfw .content_container img, html.fl-tools-nsfw .content_container video,\nhtml.fl-tools-nsfw main [class*=\"blur\"], html.fl-tools-nsfw .content_container [class*=\"blur\"],\nhtml.fl-tools-nsfw #main-content [class*=\"blur\"] {\n  filter: none !important;\n  -webkit-filter: none !important;\n}\n/* SFW: blur page media. Profile hero/friends live in #main-content, often outside <main>. */\nhtml.fl-tools-sfw main img,\nhtml.fl-tools-sfw main picture img,\nhtml.fl-tools-sfw #main-content img,\nhtml.fl-tools-sfw #main-content picture img,\nhtml.fl-tools-sfw #ptr-main-element img,\nhtml.fl-tools-sfw #ptr-main-element picture img,\nhtml.fl-tools-sfw .content_container img,\nhtml.fl-tools-sfw .content_container picture img,\nhtml.fl-tools-sfw [data-story-uid] img,\nhtml.fl-tools-sfw [data-feed-dwell-target] img,\nhtml.fl-tools-sfw [data-test-id=\"profile-header\"] img {\n  filter: blur(var(--lt-sfw-blur, 10px)) !important;\n  -webkit-filter: blur(var(--lt-sfw-blur, 10px)) !important;\n}\nhtml.fl-tools-sfw.fl-tools-blur-videos main video,\nhtml.fl-tools-sfw.fl-tools-blur-videos #main-content video,\nhtml.fl-tools-sfw.fl-tools-blur-videos #ptr-main-element video,\nhtml.fl-tools-sfw.fl-tools-blur-videos .content_container video,\nhtml.fl-tools-sfw.fl-tools-blur-videos [data-story-uid] video,\nhtml.fl-tools-sfw.fl-tools-blur-videos #account-sidebar video {\n  filter: blur(var(--lt-sfw-blur, 10px)) !important;\n  -webkit-filter: blur(var(--lt-sfw-blur, 10px)) !important;\n}\nhtml.fl-tools-sfw:not(.fl-tools-blur-videos) main video,\nhtml.fl-tools-sfw:not(.fl-tools-blur-videos) #main-content video,\nhtml.fl-tools-sfw:not(.fl-tools-blur-videos) #ptr-main-element video,\nhtml.fl-tools-sfw:not(.fl-tools-blur-videos) .content_container video,\nhtml.fl-tools-sfw:not(.fl-tools-blur-videos) [data-story-uid] video {\n  filter: none !important;\n  -webkit-filter: none !important;\n}\n/* Site chrome / tiny feed avatars stay sharp unless \"blur avatars\" is on.\n   Do NOT exempt bare header img — profile-header + feed story headers hold real media. */\nhtml.fl-tools-sfw:not(.fl-tools-blur-avatars) nav img,\nhtml.fl-tools-sfw:not(.fl-tools-blur-avatars) [data-controller=\"nav\"] img,\nhtml.fl-tools-sfw:not(.fl-tools-blur-avatars) img.fl-tools-avatar,\nhtml.fl-tools-sfw:not(.fl-tools-blur-avatars) .flex-none img.size-24px,\nhtml.fl-tools-sfw:not(.fl-tools-blur-avatars) .flex-none img.size-36px,\nhtml.fl-tools-sfw:not(.fl-tools-blur-avatars) .flex-none img.xs\\:size-36px,\nhtml.fl-tools-sfw:not(.fl-tools-blur-avatars) img.size-20px,\nhtml.fl-tools-sfw:not(.fl-tools-blur-avatars) img.size-24px {\n  filter: none !important;\n  -webkit-filter: none !important;\n}\n/* Account menu profile media always blurred in SFW (even if avatars stay sharp). */\nhtml.fl-tools-sfw #account-sidebar img,\nhtml.fl-tools-sfw #account-sidebar picture img {\n  filter: blur(var(--lt-sfw-blur, 10px)) !important;\n  -webkit-filter: blur(var(--lt-sfw-blur, 10px)) !important;\n}\n#fl-tools-dock, #fl-tools-dock * {\n  filter: none !important;\n  -webkit-filter: none !important;\n}\n.w-full.rounded-sm.cursor-pointer,\n.lt-card-face {\n  position: relative !important;\n  isolation: isolate;\n}\n.w-full.rounded-sm.cursor-pointer > img,\n.w-full.rounded-sm.cursor-pointer > picture,\n.w-full.rounded-sm.cursor-pointer > a {\n  position: relative;\n  z-index: 0;\n}\n/* Quick actions on member cards */\n.lt-qa-bar {\n  position: absolute; right: 6px; bottom: 6px; z-index: 26;\n  display: flex; flex-wrap: wrap; gap: 3px; max-width: 55%;\n  justify-content: flex-end; pointer-events: auto;\n}\n/* Member actions get their own row below native profile and Follow controls. */\n.lt-card-face > .lt-qa-bar:not(.lt-qa-feed) {\n  position: relative; inset: auto;\n  max-width: none; width: auto; box-sizing: border-box;\n  margin-top: 4px; padding: 0 8px 8px;\n  clear: both;\n}\n/* Feed story actions: under avatar, never over More Options (top-right). */\n.lt-qa-bar.lt-qa-feed {\n  position: relative !important;\n  right: auto !important; left: auto !important;\n  top: auto !important; bottom: auto !important;\n  z-index: 15; max-width: 100%; width: 100%;\n  margin-top: 4px; justify-content: center; flex-direction: column; align-items: center;\n}\n.lt-qa-bar.lt-qa-feed.lt-qa-feed-inline {\n  display: inline-flex !important;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  justify-content: flex-start;\n  width: auto !important;\n  max-width: none;\n  margin: 0 0 0 6px;\n  vertical-align: middle;\n  flex: none;\n}\n.lt-qa-status-name {\n  display: inline-flex !important;\n  align-items: center;\n  flex-wrap: wrap;\n  max-width: 100%;\n  overflow: visible !important;\n  text-overflow: clip !important;\n  white-space: normal !important;\n}\n/* Soft ghost pills — feed + card quick actions */\n.lt-qa-bar button, .lt-qa-bar a.lt-qa-btn {\n  margin: 0; padding: 1px 7px; font-size: 10px; line-height: 1.35;\n  border-radius: 999px; border: 1px solid rgba(156, 163, 175, 0.45);\n  background: rgba(17, 24, 39, 0.35); color: #d1d5db;\n  cursor: pointer; text-decoration: none; font-family: inherit;\n  backdrop-filter: blur(2px);\n  transition: background .15s ease, border-color .15s ease, color .15s ease;\n}\n.lt-qa-bar button:hover, .lt-qa-bar a.lt-qa-btn:hover {\n  background: rgba(225, 29, 72, 0.14); border-color: rgba(225, 29, 72, 0.55); color: #fff;\n}\n.lt-qa-bar.lt-qa-feed button, .lt-qa-bar.lt-qa-feed a.lt-qa-btn {\n  background: transparent; border-color: rgba(163, 163, 163, 0.35); color: #a3a3a3;\n  font-size: 10px; padding: 0 6px; height: 18px; line-height: 16px;\n}\n.lt-qa-bar.lt-qa-feed button:hover, .lt-qa-bar.lt-qa-feed a.lt-qa-btn:hover {\n  color: #f3f4f6; border-color: rgba(225, 29, 72, 0.5); background: rgba(225, 29, 72, 0.1);\n}\n.lt-qa-bar button:focus-visible, .lt-qa-bar a.lt-qa-btn:focus-visible {\n  outline: 2px solid var(--lt-accent); outline-offset: 1px;\n}\n#fl-limit-hist-list { max-height: 180px; overflow-y: auto; margin: 4px 0 8px; }\n.lt-row { display:flex; align-items:center; gap:6px; margin:0 0 4px; font-size:12px; }\n.lt-row a { color: #fda4af; flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n.lt-row .meta { color: var(--lt-text-muted, #a3a3a3); flex:none; }\n.lt-row button { margin:0; padding:2px 8px; }\n\nmark.lt-limit-hl, .lt-limit-hl {\n  background: rgba(244, 63, 94, 0.45) !important;\n  color: inherit !important;\n  border-radius: 2px;\n  padding: 0 2px;\n  box-decoration-break: clone;\n  -webkit-box-decoration-break: clone;\n}\nhtml.light mark.lt-limit-hl, html.light .lt-limit-hl {\n  background: rgba(225, 29, 72, 0.35) !important;\n  color: #1a1a1a !important;\n}\n/* Glanceable chips on list cards (identity + Seen). Sit on the photo, not in the dock. */\n.lt-card-chips {\n  position: absolute; left: 6px; bottom: 6px; z-index: 24;\n  display: flex; flex-wrap: wrap; gap: 4px;\n  max-width: calc(100% - 72px);\n  pointer-events: none;\n}\n.lt-card-chip,\n.lt-seen-chip,\n.lt-note-chip {\n  font-size: 10px; font-weight: 600; letter-spacing: 0.02em;\n  padding: 1px 6px; border-radius: 999px; line-height: 1.3;\n  pointer-events: none;\n  background: rgba(17,17,17,.82); color: #f3f4f6;\n  border: 1px solid #525252;\n}\n.lt-seen-chip {\n  pointer-events: auto; cursor: pointer; font-family: inherit;\n  position: absolute; left: 6px; bottom: 6px; z-index: 24;\n  border-color: #e11d48;\n}\n.lt-card-chips .lt-card-chip,\n.lt-card-chips .lt-seen-chip,\n.lt-card-chips .lt-note-chip {\n  position: static !important;\n  left: auto; top: auto; right: auto; bottom: auto;\n}\nhtml.light .lt-card-chip,\nhtml.light .lt-seen-chip,\nhtml.light .lt-note-chip {\n  background: rgba(255,255,255,.9); color: #171717;\n}\n\n/* Active filter chips stay on the page while browsing kinksters / lists. */\n#fl-browse-chips {\n  position: fixed; left: 12px; bottom: 16px; z-index: 2147482990;\n  display: flex; flex-wrap: wrap; align-items: center; gap: 6px;\n  max-width: min(460px, calc(100vw - 88px));\n  padding: 6px 8px; border-radius: 12px;\n  background: rgba(17,17,17,.9); color: #f3f4f6;\n  border: 1px solid #2e2e2e;\n  font: 12px/1.3 ui-sans-serif, system-ui, sans-serif;\n  box-shadow: 0 8px 24px rgba(0,0,0,.35);\n}\nhtml.light #fl-browse-chips {\n  background: rgba(255,255,255,.94); color: #171717; border-color: #d1d5db;\n}\n#fl-browse-chips .lt-browse-chips-label {\n  color: #a3a3a3; font-size: 10px; font-weight: 700;\n  letter-spacing: .04em; text-transform: uppercase;\n}\nhtml.light #fl-browse-chips .lt-browse-chips-label { color: #737373; }\n#fl-browse-chips .lt-browse-chip {\n  display: inline-flex; align-items: center; gap: 4px;\n  background: #1a1a1a; border: 1px solid #3f3f3f; color: #f3f4f6;\n  border-radius: 999px; padding: 2px 8px; font-size: 12px;\n}\nhtml.light #fl-browse-chips .lt-browse-chip {\n  background: #f5f5f5; border-color: #d4d4d4; color: #171717;\n}\n#fl-browse-chips .lt-browse-chip button {\n  border: 0; background: none; color: #a3a3a3; cursor: pointer;\n  padding: 0 2px; font: inherit;\n}\n#fl-browse-chips .lt-browse-chip button:hover { color: #e11d48; }\n@media (max-width: 720px) {\n  #fl-browse-chips { left: 8px; right: 64px; bottom: 12px; max-width: none; }\n}\n#fl-panel-search-wrap {\n  width: 100%; box-sizing: border-box; padding: 2px 0 2px; margin: 0;\n}\n#fl-panel-search {\n  width: 100%; box-sizing: border-box; padding: 5px 8px;\n  background: var(--lt-bg-input); color: var(--lt-text);\n  border: 1px solid var(--lt-border); border-radius: 6px;\n  font: inherit; font-size: 12px; height: var(--lt-ctrl-h);\n}\n#fl-panel-search::placeholder { color: var(--lt-text-muted); }\n#fl-panel-search:focus { outline: none; border-color: var(--lt-accent); }\n.fl-tool-panel.lt-panel-search-miss { display: none !important; }\nhtml.light .lt-qa-bar button, html.light .lt-qa-bar a.lt-qa-btn {\n  background: rgba(255,255,255,0.65); color: #525252; border-color: rgba(115,115,115,0.35);\n}\nhtml.light .lt-qa-bar button:hover, html.light .lt-qa-bar a.lt-qa-btn:hover {\n  background: rgba(225, 29, 72, 0.08); border-color: rgba(225, 29, 72, 0.45); color: #111827;\n}\nhtml.light .lt-qa-bar.lt-qa-feed button, html.light .lt-qa-bar.lt-qa-feed a.lt-qa-btn {\n  background: transparent; border-color: rgba(115, 115, 115, 0.4); color: #737373;\n}\nhtml.light .lt-row a { color: #262626; }\nhtml.light .life-btn:hover { border-color: #a3a3a3; }\nhtml.light .fl-suggest-row .fl-suggest-del { color: #737373; }\n\n/* Dock-styled confirm modal (replaces window.confirm for soft-block visible). */\n#fl-confirm-overlay {\n  position: fixed; inset: 0; z-index: 2147483646;\n  background: rgba(0,0,0,.55);\n  display: flex; align-items: center; justify-content: center;\n  padding: 16px; box-sizing: border-box;\n}\n#fl-confirm-dialog {\n  width: min(320px, 100%);\n  background: var(--lt-bg, #111111);\n  color: var(--lt-text, #f3f4f6);\n  border: 1px solid var(--lt-border, #2e2e2e);\n  border-radius: var(--lt-radius, 8px);\n  box-shadow: 0 12px 40px rgba(0,0,0,.45);\n  padding: 14px 14px 12px;\n  font-family: ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", sans-serif;\n  font-size: 13px; line-height: 1.45;\n}\n#fl-confirm-dialog .fl-confirm-msg { margin: 0 0 12px; color: var(--lt-text, #f3f4f6); }\n#fl-confirm-dialog .fl-confirm-actions {\n  display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;\n}\n#fl-confirm-dialog .fl-confirm-actions .life-btn { margin: 0; width: auto; min-width: 72px; }\nhtml.light #fl-confirm-dialog {\n  background: var(--lt-bg, #f9fafb);\n  color: var(--lt-text, #171717);\n  border-color: var(--lt-border, #d1d5db);\n}\n\n/* --- Launcher + settings rail chrome --- */\n#fl-settings-launcher { position:fixed!important; right:12px!important; left:auto!important; bottom:auto!important;\n  width:48px!important; height:48px!important; display:flex!important; align-items:center; justify-content:center;\n  z-index:2147483001; padding:0!important; margin:0!important; border:1px solid #e11d4866!important;\n  border-radius:12px!important; background:#171a1f!important; color:#fb7185!important;\n  box-shadow:0 4px 16px #0006; cursor:grab; touch-action:none; user-select:none; }\n#fl-settings-launcher img { width:100%; height:100%; display:block; pointer-events:none; }\n#fl-settings-launcher:hover, #fl-settings-launcher[aria-expanded=\"true\"] { border-color:#fb7185!important; background:#252329!important; }\n#fl-settings-launcher:focus-visible { outline:2px solid #fb7185; outline-offset:3px; }\n#fl-tools-dock.fl-settings-rail { width:300px!important; max-width:calc(100vw - 24px)!important;\n  max-height:calc(100vh - 84px)!important; max-height:calc(100dvh - 84px)!important;\n  right:12px!important; left:auto!important; bottom:auto!important; transform:none!important;\n  display:none!important; flex-direction:column!important; justify-content:flex-start!important;\n  gap:4px!important; padding:10px!important; background:var(--lt-bg)!important;\n  border:1px solid var(--lt-border)!important; border-radius:14px!important; box-shadow:0 18px 50px #0007;\n  overflow:auto!important; scrollbar-width:thin; scrollbar-gutter:auto; font-size:13px; text-align:left;\n  z-index:2147483000!important; }\n#fl-tools-dock.fl-settings-rail.fl-rail-open { display:flex!important; }\n#fl-tools-dock.fl-settings-rail > * { flex-shrink:0; min-width:0; }\n#fl-rail-header { order:-3; display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }\n#fl-rail-header .fl-brand-icon { width:32px; height:32px; flex:none; }\n#fl-rail-header .fl-brand-icon img { display:block; width:100%; height:100%; }\n#fl-rail-header .fl-brand-copy { flex:1; min-width:0; }\n/* Dock accordion order. Scoped to the rail so insertBefore cannot reshuffle the menu. */\n#fl-tools-dock.fl-settings-rail #fl-block-panel { order: 1; }\n#fl-tools-dock.fl-settings-rail #fl-filter-panel { order: 2; }\n#fl-tools-dock.fl-settings-rail #flhp-panel { order: 3; }\n#fl-tools-dock.fl-settings-rail #fl-profiles-panel { order: 4; }\n#fl-tools-dock.fl-settings-rail #fl-system-panel { order: 5; }\n#fl-tools-dock.fl-settings-rail #fl-dock-actions { order: 9; }\n#fl-tools-dock.fl-settings-rail .fl-tool-body > .fl-tool-panel {\n  margin: 4px 0 0;\n  background: var(--lt-bg);\n  border-color: var(--lt-border-soft);\n}\n#fl-tools-dock.fl-settings-rail .fl-tool-body > .fl-tool-panel .fl-tool-header { min-height: 24px; padding: 2px 8px; }\n#fl-tools-dock.fl-settings-rail #fl-system-body {\n  display: flex;\n  flex-direction: column;\n}\n#fl-tools-dock.fl-settings-rail #fl-advanced-panel { order: 1; }\n#fl-tools-dock.fl-settings-rail #fl-perf-controls { order: 2; }\n#fl-tools-dock.fl-settings-rail #fl-shortcuts-panel { order: 3; }\n#fl-tools-dock.fl-settings-rail #fl-dock-prompt { order: 0; }\n#fl-perf-controls label { display:flex; gap:7px; align-items:center; margin:4px 0; color:var(--lt-text-muted); }\n#fl-perf-controls select { margin-left:auto; background:var(--lt-bg-input); color:var(--lt-text); border:1px solid var(--lt-border); border-radius:5px; }\nhtml.fl-tools-lightweight #fl-rail-status { border-color:#eab30866; background:#eab30818; }\nhtml.fl-tools-launcher-compact #fl-settings-launcher { width:40px!important; height:40px!important; border-radius:10px!important; }\nhtml.fl-tools-launcher-compact #fl-tools-dock.fl-settings-rail { padding:10px!important; }\nhtml.fl-tools-high-contrast #fl-tools-dock, html.fl-tools-high-contrast .fl-tool-panel { border-width:2px!important; }\nhtml.fl-tools-reduced-motion *, html.fl-tools-reduced-motion *::before, html.fl-tools-reduced-motion *::after { animation-duration:0.001ms!important; transition-duration:0.001ms!important; scroll-behavior:auto!important; }\nhtml.fl-tools-icon-light #fl-settings-launcher, html.fl-tools-icon-light .fl-brand-icon { filter: brightness(1.08) saturate(.92); }\n#fl-rail-title { color:var(--lt-text); font-size:16px; font-weight:700; line-height:1.3; margin:0; }\n#fl-rail-subtitle { color:var(--lt-text-muted); font-size:11px; margin-top:2px; }\n#fl-rail-close { background:transparent; color:var(--lt-text-muted); border:0; border-radius:8px;\n  width:32px; height:32px; flex:none; cursor:pointer; font:22px/1 Arial,sans-serif; }\n#fl-rail-close:hover { background:var(--lt-bg-elev); color:var(--lt-text); }\n#fl-rail-status { order:-2; padding:7px 9px; border:1px solid #e11d4838; border-radius:8px;\n  background:var(--lt-accent-soft); color:var(--lt-text); font-size:11px; line-height:1.5; }\n#fl-tools-dock.fl-settings-rail #fl-panel-search-wrap { order:-1; margin:0; }\n#fl-tools-dock.fl-settings-rail #fl-panel-search { height:30px; border-radius:7px; }\n#fl-tools-dock.fl-settings-rail .fl-tool-panel { padding:0; border-radius:8px; background:var(--lt-bg-elev); box-shadow:none; transition:border-color .15s ease, box-shadow .15s ease; }\n#fl-tools-dock.fl-settings-rail .fl-tool-header { min-height:28px; padding:3px 8px; cursor:pointer; border-radius:8px; transition:background .15s ease; }\n#fl-tools-dock.fl-settings-rail .fl-tool-title { font-size:12px; letter-spacing:0; white-space:normal; }\n#fl-tools-dock.fl-settings-rail .fl-tool-chevron { min-width:20px; min-height:20px; background:none; border:none; color:var(--lt-text-muted); cursor:pointer; font-size:13px; }\n#fl-tools-dock.fl-settings-rail .fl-tool-header:hover {\n  background: var(--lt-accent-soft);\n}\n#fl-tools-dock.fl-settings-rail .fl-tool-header:hover .fl-tool-chevron { color: var(--lt-text); }\n#fl-tools-dock.fl-settings-rail .fl-tool-panel:has(> .fl-tool-header:hover) {\n  border-color: rgba(225, 29, 72, 0.55);\n  box-shadow: inset 3px 0 0 #e11d48, 0 0 0 1px rgba(225, 29, 72, 0.22), 0 0 14px rgba(225, 29, 72, 0.32);\n}\n#fl-tools-dock.fl-settings-rail .fl-tool-body { padding:0 10px 8px; margin:0; max-height:none; overflow:visible; }\n#fl-tools-dock.fl-settings-rail .fl-tool-body.fl-tool-hidden { display:none !important; }\n#fl-tools-dock.fl-settings-rail .fl-switch { padding:6px 0; margin:0; gap:10px; }\n#fl-tools-dock.fl-settings-rail .fl-switch + .fl-switch { border-top:1px solid var(--lt-border-soft); }\n#fl-tools-dock.fl-settings-rail .fl-switch-text { font-size:12px; line-height:1.3; }\n#fl-tools-dock.fl-settings-rail .fl-rail-description { display:block; font-size:10px; color:var(--lt-text-muted); margin-top:2px; }\n#fl-tools-dock.fl-settings-rail .toggleSwitch { width:34px; height:20px; border-radius:20px; background:#626873; }\n#fl-tools-dock.fl-settings-rail .toggleSwitch::after { width:16px; height:16px; top:2px; left:2px; background:#fff; }\n#fl-tools-dock.fl-settings-rail .toggleSwitch[aria-checked=\"true\"] { background:var(--lt-accent); }\n#fl-tools-dock.fl-settings-rail .toggleSwitch[aria-checked=\"true\"]::after { transform:translateX(14px); }\n#fl-tools-dock.fl-settings-rail :is(button,input,select,textarea):focus-visible { outline:2px solid var(--lt-accent); outline-offset:2px; }\n#fl-tools-dock.fl-settings-rail.lt-dock-compact { padding:8px!important; gap:3px!important; }\n#fl-tools-dock.fl-settings-rail.lt-dock-compact .fl-switch { padding:5px 0; }\n@media(prefers-reduced-motion:reduce) { #fl-tools-dock.fl-settings-rail * { transition:none!important; } }\n@media(forced-colors:active) {\n  #fl-settings-launcher, #fl-tools-dock.fl-settings-rail, #fl-tools-dock.fl-settings-rail .fl-tool-panel { border:1px solid CanvasText!important; }\n  #fl-tools-dock.fl-settings-rail .toggleSwitch { border:1px solid ButtonText; background:ButtonFace; forced-color-adjust:auto; }\n  #fl-tools-dock.fl-settings-rail .toggleSwitch[aria-checked=\"true\"] { background:Highlight; }\n}\n\n\n/* --- Dual-install idle badge --- */\n/* Dual-install: Basic launcher stays visible but idle while Pro is live. */\n#fl-settings-launcher[data-fl-tools-idle=\"basic\"] { opacity: 0.55; }\n#fl-settings-launcher[data-fl-tools-idle=\"basic\"]::after {\n  content: \"Pro\";\n  position: absolute;\n  right: 4px;\n  bottom: 2px;\n  font-size: 9px;\n  font-weight: 700;\n  color: #e11d48;\n}\n\n/* Silent page helpers: visited nicks, shared kinks, fetish groups, list pager copy. */\na.fl-visited-nick { color: #60a5fa; }\nhtml.light a.fl-visited-nick { color: #2563eb; }\na.fl-shared-kink { font-weight: 700; color: #fb7185; }\nhtml.light a.fl-shared-kink { color: #e11d48; }\n.fl-fetish-groups { display: flex; flex-direction: column; gap: 10px; }\n.fl-fetish-group { margin: 0; }\n.fl-fetish-group-label {\n  font-size: 11px; font-weight: 700; letter-spacing: .04em;\n  text-transform: uppercase; color: #a3a3a3; margin: 0 0 4px;\n}\nhtml.light .fl-fetish-group-label { color: #737373; }\n#fl-list-pager-clone {\n  display: flex; flex-wrap: wrap; align-items: center; gap: 6px;\n  margin: 8px 0 12px;\n}\n\n.lt-seen-chip:hover { border-color: #60a5fa; background: #172554; color: #eff6ff; }\n.lt-seen-chip:focus-visible { outline: 2px solid #60a5fa; outline-offset: 2px; }\n\n.lt-card-face > .lt-card-chips { position: relative; inset: auto; max-width: none; margin: 4px 8px 8px; }\n";
    (document.documentElement || document.head).appendChild(el);
  })();
  /* END generated:css-core */


  /* Keep the dock pinned to the right. Placement is drag plus a top / center / bottom fallback. */
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
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
      if (!active) return;
      const dy = e.clientY - startY;
      if (Math.abs(dy) > 3) dockDidDrag = true;
      applyDockTopPx(dock, origTop + dy);
    });
    window.addEventListener("mouseup", () => {
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
        keepDockInWindow(document.getElementById("fl-tools-dock"));
      }, { passive: true });
    }
  }

  /* Settings rail: launcher button + collapsible panels. */
  window.addEventListener("fltools:menu-open", event => {
    if (!flBasicShouldYield() && event.detail !== "settings") setSettingsRailOpen(false, false);
  });
  function setSettingsRailOpen(open, focus) {
    if (flBasicShouldYield()) return;
    if (open) window.dispatchEvent(new CustomEvent("fltools:menu-open", { detail: "settings" }));
    const dock = document.getElementById("fl-tools-dock");
    if (!dock) return;
    dock.classList.toggle("fl-rail-open", !!open);
    syncSettingsRail();
    if (focus) {
      const target = document.getElementById(open ? "fl-rail-close" : "fl-settings-launcher");
      if (target) target.focus({ preventScroll: true });
    }
  }
  function syncSettingsRail() {
    const dock = document.getElementById("fl-tools-dock");
    const launcher = document.getElementById("fl-settings-launcher");
    if (!dock || !launcher) return;
    const open = dock.classList.contains("fl-rail-open");
    launcher.setAttribute("aria-expanded", String(open));
    launcher.setAttribute("aria-label", (open ? "Close" : "Open") + " FL Tools settings");
    launcher.title = (open ? "Close" : "Open") + " settings · drag to reposition";
    positionSettingsRail();
  }
  function positionSettingsRail() {
    if (flBasicShouldYield()) return;
    const dock = document.getElementById("fl-tools-dock");
    const launcher = document.getElementById("fl-settings-launcher");
    if (!dock || !launcher) return;
    const grid = FLToolsLauncherGrid;
    const gridManaged = !!(grid?.isManaged?.(launcher) || launcher.dataset.launcherGridManaged === "true");
    if (gridManaged) grid.positionGrid?.();
    const height = window.innerHeight;
    const launcherRect = launcher.getBoundingClientRect();
    let top = gridManaged ? launcherRect.top : NaN;
    if (!gridManaged) {
      try { top = parseFloat(localStorage.getItem("fl_settings_launcher_top")); } catch (_) {}
      if (!Number.isFinite(top)) {
        const anchor = (loadFilterSettings() || {}).dockAnchor || "bottom";
        top = anchor === "top" ? 72 : anchor === "center" ? (height - 48) / 2 : height - 64;
      }
      top = Math.max(8, Math.min(Math.max(8, height - 56), top));
      launcher.style.top = top + "px";
    }
    const panelHeight = dock.getBoundingClientRect().height || 240;
    if (dock.classList.contains("fl-rail-open") && grid.placeMenu(dock, launcher)) return;
    const desired = top > height / 2 ? top - panelHeight - 10 : top + 58;
    dock.style.setProperty("top", Math.max(8, Math.min(height - panelHeight - 8, desired)) + "px", "important");
  }
  function setPanelOpenState(bodyId, toggleId, open) {
    const body = document.getElementById(bodyId);
    const btn = document.getElementById(toggleId);
    if (body) body.classList.toggle("fl-tool-hidden", !open);
    if (btn) {
      btn.textContent = open ? "▾" : "▸";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Collapse panel" : "Expand panel");
    }
  }
  function dockPanelParent(panelId) {
    return (FL_ACTION_PARENTS && FL_ACTION_PARENTS[panelId]) || "";
  }
  function dockSectionHost(panelId) {
    const parent = dockPanelParent(panelId);
    if (parent === "fl-filter-panel") return document.getElementById("fl-panel-body");
    if (parent === "fl-system-panel") return document.getElementById("fl-system-body");
    return ensureDockRaw();
  }
  function mountDockSection(el, panelId) {
    if (!el) return;
    const host = dockSectionHost(panelId);
    if (!host) return;
    host.appendChild(el);
  }
  function nestDockSections() {
    ensureSystemPanel();
    mountDockSection(document.getElementById("fl-site-panel"), "fl-site-panel");
    mountDockSection(document.getElementById("fl-advanced-panel"), "fl-advanced-panel");
    mountDockSection(document.getElementById("fl-perf-controls"), "fl-perf-controls");
    mountDockSection(document.getElementById("fl-shortcuts-panel"), "fl-shortcuts-panel");
  }
  function ensureSystemPanel() {
    const dock = ensureDockRaw();
    let box = document.getElementById("fl-system-panel");
    if (!box) {
      box = document.createElement("div");
      box.id = "fl-system-panel";
      box.className = "fl-tool-panel";
      box.innerHTML =
        '<div class="fl-tool-header" id="fl-system-header"><div class="fl-tool-title">' + t("systemPanel") +
        '</div><button type="button" id="fl-system-toggle" class="fl-tool-chevron" aria-expanded="false" aria-label="Expand panel">▸</button></div>' +
        '<div id="fl-system-body" class="fl-tool-body fl-tool-hidden"></div>';
      dock.appendChild(box);
    }
    bindPanelHeader("fl-system-header", "fl-system-body", "fl-system-toggle", "fl-system-panel");
    return box;
  }
  function collapseInnerMenus(panel) {
    if (!panel) return;
    panel.querySelectorAll(".fl-tool-panel").forEach((nested) => {
      if (nested === panel) return;
      const body = nested.querySelector(":scope > .fl-tool-body");
      const btn = nested.querySelector(":scope > .fl-tool-header .fl-tool-chevron");
      if (body) body.classList.add("fl-tool-hidden");
      if (btn) {
        btn.textContent = "▸";
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "Expand panel");
      }
    });
    panel.querySelectorAll("#fl-rel-body, #fl-visit-log-body, #fl-settings-io-body, #fl-notes-sub-body").forEach((body) => {
      body.classList.add("fl-tool-hidden");
    });
    panel.querySelectorAll("#fl-rel-chevron, #fl-visit-log-chevron, #fl-settings-io-chevron, #fl-notes-sub-chevron").forEach((chev) => {
      chev.textContent = "▸";
    });
  }
  function collapseOtherPanels(exceptId) {
    const keepParent = dockPanelParent(exceptId);
    [
      ["fl-filter-panel", "fl-panel-body", "fl-panel-toggle"],
      ["fl-site-panel", "fl-site-body", "fl-site-toggle"],
      ["fl-advanced-panel", "fl-advanced-body", "fl-advanced-toggle"],
      ["fl-block-panel", "fl-block-body", "fl-block-toggle"],
      ["fl-shortcuts-panel", "fl-shortcuts-body", "fl-shortcuts-toggle"],
      ["fl-perf-controls", "fl-perf-body", "fl-perf-toggle"],
      ["fl-system-panel", "fl-system-body", "fl-system-toggle"]
    ].forEach(([panelId, bodyId, toggleId]) => {
      if (exceptId === panelId || (keepParent && panelId === keepParent)) return;
      setPanelOpenState(bodyId, toggleId, false);
      collapseInnerMenus(document.getElementById(panelId));
    });
    if (exceptId && !keepParent) collapseInnerMenus(document.getElementById(exceptId));
    if (exceptId) notePanelOpen(exceptId);
    syncOpenPanelHighlight();
    syncDockGrowDirection();
  }
  function openCapabilityPanel(panelId, focusId) {
    const chrome = FL_ACTION_CHROME[panelId];
    if (!chrome) return false;
    const panel = document.getElementById(panelId);
    if (!panel) return false;
    const parentId = dockPanelParent(panelId);
    collapseOtherPanels(panelId);
    if (parentId) {
      const parentChrome = FL_ACTION_CHROME[parentId];
      if (parentChrome) setPanelOpenState(parentChrome.body, parentChrome.toggle, true);
      if (parentId === "fl-filter-panel") {
        try { localStorage.setItem("fl_panel_collapsed", "0"); } catch (_) {}
      }
    }
    setPanelOpenState(chrome.body, chrome.toggle, true);
    try { panel.scrollIntoView({ block: "nearest" }); } catch (_) {}
    return true;
  }
  function setupStudioActions() {
    if (setupStudioActions.bound) return;
    setupStudioActions.bound = true;
    window.addEventListener("fltools:action", function (event) {
      if (flBasicShouldYield()) return;
      const detail = event.detail || {};
      if (detail.protocol && detail.protocol !== FL_ACTION_PROTOCOL) return;
      const id = flCanonicalCapability(detail.id);
      if (id === "filter.preset") {
        applyFilterPreset(detail.preset || "default");
        openCapabilityPanel("fl-filter-panel");
        return;
      }
      if (id === "seen.reset") {
        resetSeen();
        openCapabilityPanel("fl-advanced-panel");
        return;
      }
      const target = FL_ACTION_TARGETS[id] || {};
      const panelId = detail.panel || target.panel;
      if (!panelId) return;
      openCapabilityPanel(panelId, detail.focus || target.focus);
    });
  }
  function bindPanelHeader(headerId, bodyId, toggleId, panelId) {
    const header = document.getElementById(headerId);
    if (!header || header.dataset.collapseBound) return;
    header.dataset.collapseBound = "1";
    header.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
      if (typeof dockDidDrag !== "undefined" && dockDidDrag) { dockDidDrag = false; return; }
      if (dockPanelParent(panelId)) e.stopPropagation();
      if (e.target.closest("input, textarea, select, label") && !e.target.closest(".fl-tool-chevron")) return;
      const body = document.getElementById(bodyId);
      const opening = !!(body && body.classList.contains("fl-tool-hidden"));
      setPanelOpenState(bodyId, toggleId, opening);
      if (opening) collapseOtherPanels(panelId);
      else syncOpenPanelHighlight();
      syncDockGrowDirection();
    });
  }
  function bindAllPanelHeaders() {
    bindPanelHeader("fl-panel-header", "fl-panel-body", "fl-panel-toggle", "fl-filter-panel");
    bindPanelHeader("fl-site-header", "fl-site-body", "fl-site-toggle", "fl-site-panel");
    bindPanelHeader("fl-advanced-header", "fl-advanced-body", "fl-advanced-toggle", "fl-advanced-panel");
    bindPanelHeader("fl-block-header", "fl-block-body", "fl-block-toggle", "fl-block-panel");
    bindPanelHeader("fl-shortcuts-header", "fl-shortcuts-body", "fl-shortcuts-toggle", "fl-shortcuts-panel");
    bindPanelHeader("fl-system-header", "fl-system-body", "fl-system-toggle", "fl-system-panel");
  }
  function aboutDiagnosticsHtml() {
    return '<div class="flhp-legend" style="margin-top:8px"><div class="flhp-legend-row"><strong>About & diagnostics</strong></div></div>' +
      '<pre id="fl-diagnostics-output" style="white-space:pre-wrap;overflow-wrap:anywhere;font:11px/1.35 ui-monospace,monospace;margin:4px 0 8px"></pre>' +
      '<button type="button" class="life-btn life-btn-gray" id="fl-copy-diagnostics">Copy diagnostics</button>';
  }
  function refreshDiagnostics() {
    const out = document.getElementById("fl-diagnostics-output");
    if (out) out.textContent = flDiagnosticsText();
  }
  function bindAboutDiagnostics() {
    const stale = document.getElementById("fl-diagnostics-panel");
    if (stale) stale.remove();
    const body = document.getElementById("fl-perf-body");
    if (body && !document.getElementById("fl-diagnostics-output")) {
      body.insertAdjacentHTML("beforeend", aboutDiagnosticsHtml());
    }
    const copy = document.getElementById("fl-copy-diagnostics");
    if (!copy || copy.dataset.flBound === "1") return;
    copy.dataset.flBound = "1";
    copy.addEventListener("click", async (event) => {
      event.stopPropagation();
      const text = flDiagnosticsText();
      try {
        await navigator.clipboard.writeText(text);
        flSetPerfStatus("Diagnostics copied");
      } catch (_) {
        window.prompt("Copy diagnostics", text);
      }
    });
  }
  function ensureBasicSettingsPanel(dock) {
    flApplyPerf();
    ensureSystemPanel();
    const perfControls = document.getElementById("fl-perf-controls");
    if (!perfControls) {
      const box = document.createElement("div"); box.id = "fl-perf-controls"; box.className = "fl-tool-panel";
      box.innerHTML = '<div class="fl-tool-header" id="fl-perf-header"><div class="fl-tool-title">Performance</div>' +
        '<button type="button" id="fl-perf-toggle" class="fl-tool-chevron" aria-expanded="false" aria-label="Expand panel">▸</button></div>' +
        '<div id="fl-perf-body" class="fl-tool-body fl-tool-hidden">' +
        switchHtml("fl-lightweight-mode", "Lightweight scanning", false) + switchHtml("fl-update-notifications", "Quiet update notifications", false) +
        switchHtml("fl-compact-launcher", "Compact launcher", false) +
        switchHtml("fl-pause-scanning", "Pause scanning", false) +
        switchHtml("fl-high-contrast", "High contrast", false) +
        '<label class="fl-perf-delay">Scan delay <select id="fl-scan-delay"><option value="120">Fast</option><option value="300">Balanced</option><option value="600">Low activity</option></select></label>' +
        aboutDiagnosticsHtml() + '</div>';
      mountDockSection(box, "fl-perf-controls");
      const p = flLoadPerf();
      const light = box.querySelector("#fl-lightweight-mode"); const updates=box.querySelector("#fl-update-notifications"); const compact = box.querySelector("#fl-compact-launcher"); const paused = box.querySelector("#fl-pause-scanning"); const contrast = box.querySelector("#fl-high-contrast"); const delay = box.querySelector("#fl-scan-delay");
      light.checked=!!p.lightweight; updates.checked=!!p.updateNotifications; compact.checked=!!p.compactLauncher; paused.checked=!!p.paused; contrast.checked=!!p.highContrast; delay.value=String(p.scanDelay);
      const save=()=>{flSavePerf({lightweight:light.checked,updateNotifications:updates.checked,compactLauncher:compact.checked,paused:paused.checked,highContrast:contrast.checked,scanDelay:Number(delay.value)||120,dockSide:flLoadPerf().dockSide}); flApplyPerf();};
      light.addEventListener("change",save); compact.addEventListener("change",save); paused.addEventListener("change",save); delay.addEventListener("change",save); contrast.addEventListener("change",save);
      box.querySelector("#fl-perf-header").addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
        if (e.target.closest("input, select, label")) return;
        e.stopPropagation();
        const body = document.getElementById("fl-perf-body");
        const opening = body.classList.contains("fl-tool-hidden");
        body.classList.toggle("fl-tool-hidden", !opening);
        const chev = document.getElementById("fl-perf-toggle");
        if (chev) { chev.textContent = opening ? "▾" : "▸"; chev.setAttribute("aria-expanded", opening ? "true" : "false"); }
        if (opening) {
          collapseOtherPanels("fl-perf-controls");
          refreshDiagnostics();
        }
      });
    }
    bindAboutDiagnostics();
    dock.classList.add("fl-settings-rail");
    dock.setAttribute("role", "region");
    dock.setAttribute("aria-labelledby", "fl-rail-title");
    if (!document.getElementById("fl-rail-header")) {
      const header = document.createElement("div");
      header.id = "fl-rail-header";
      header.innerHTML = '<span class="fl-brand-icon">' + FL_TOOLS_ICON_HTML + '</span><div class="fl-brand-copy"><h2 id="fl-rail-title">FL Tools Basic</h2><div id="fl-rail-subtitle">Settings · Your browsing preferences</div></div>' +
        '<button type="button" id="fl-rail-close" aria-label="Close settings">×</button>';
      dock.prepend(header);
      header.querySelector("#fl-rail-close").addEventListener("click", () => setSettingsRailOpen(false, true));
      const status = document.createElement("div");
      status.id = "fl-rail-status";
      status.textContent = "Changes save automatically on this device.";
      header.after(status);
    }
    if (!document.getElementById("fl-settings-launcher")) {
      const launcher = document.createElement("button");
      launcher.type = "button";
      launcher.id = "fl-settings-launcher";
      launcher.setAttribute("aria-controls", "fl-tools-dock");
      launcher.setAttribute("aria-expanded", "false");
      launcher.setAttribute("aria-label", "Open FL Tools settings");
      launcher.innerHTML = FL_TOOLS_ICON_HTML;
      document.body.appendChild(launcher);
      const launcherDeclaration = flDeclareLauncher(launcher, () => [launcher, dock], { owner:"TypicalBits", id:"fl-tools-basic", priority:300, preferredPosition:"right-bottom" });
      flPublishShortcutMetadata();launcherDeclaration.publish();
      let drag = null, didDrag = false;
      launcher.addEventListener("pointerdown", (event) => {
      if (flBasicShouldYield()) return;
        if (FLToolsLauncherGrid?.isManaged?.(launcher) || launcher.dataset.launcherGridManaged === "true") return;
        if (event.button !== 0) return;
        drag = { y:event.clientY, top:launcher.getBoundingClientRect().top };
        didDrag = false;
        launcher.setPointerCapture(event.pointerId);
      });
      launcher.addEventListener("pointermove", (event) => {
      if (flBasicShouldYield()) return;
        if (FLToolsLauncherGrid?.isManaged?.(launcher) || launcher.dataset.launcherGridManaged === "true") return;
        if (!drag) return;
        const delta = event.clientY - drag.y;
        if (Math.abs(delta) > 4) didDrag = true;
        if (!didDrag) return;
        const top = Math.max(8, Math.min(window.innerHeight - 56, drag.top + delta));
        try { localStorage.setItem("fl_settings_launcher_top", String(top)); } catch (_) {}
        positionSettingsRail();
      });
      launcher.addEventListener("pointerup", () => {
      if (flBasicShouldYield()) return; drag = null; });
      launcher.addEventListener("pointercancel", () => {
      if (flBasicShouldYield()) return; drag = null; didDrag = true; });
      launcher.addEventListener("click", () => {
      if (flBasicShouldYield()) return;
        if (didDrag) { didDrag = false; return; }
        setSettingsRailOpen(!dock.classList.contains("fl-rail-open"), true);
      });
      window.addEventListener("resize", positionSettingsRail, { passive:true });
      window.addEventListener("fl-tools:launcher-position", positionSettingsRail);
      document.addEventListener("pointerdown", (event) => {
      if (flBasicShouldYield()) return;
        if (dock.contains(event.target) || launcher.contains(event.target)) return;
        if (event.target.closest('[role="dialog"], [role="alertdialog"], .fl-confirm-overlay, .lt-qa-menu')) return;
        if (dock.classList.contains("fl-rail-open")) setSettingsRailOpen(false, false);
      });
      document.addEventListener("keydown", (event) => {
      if (flBasicShouldYield()) return;
        if (event.key !== "Escape" || !dock.classList.contains("fl-rail-open")) return;
        if (event.target.id === "fl-panel-search" && event.target.value) return;
        setSettingsRailOpen(false, dock.contains(document.activeElement));
      }, true);
      if (typeof ResizeObserver !== "undefined") new ResizeObserver(positionSettingsRail).observe(dock);
    }
    bindAllPanelHeaders();
    syncSettingsRail();
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
    ensureBasicSettingsPanel(dock);
    setupDockGrowObserver(dock);
    if (!existed) {
      if (!applySavedDockTop(dock)) applyDockPlacement((loadFilterSettings() || {}).dockAnchor || "bottom");
    }
    syncDockGrowDirection();
    return dock;
  }
  function syncDockGrowDirection() {
    if (document.getElementById("fl-settings-launcher")) { positionSettingsRail(); return; }
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
    let growRaf = 0;
    const mo = new MutationObserver(() => {
      if (growRaf) return;
      growRaf = requestAnimationFrame(() => {
        growRaf = 0;
        syncDockGrowDirection();
      });
    });
    /* Class toggles on panels are frequent — debounce to one layout read/frame. */
    mo.observe(dock, { subtree: true, attributes: true, attributeFilter: ["class"] });
    if (!setupDockGrowObserver.win) {
      setupDockGrowObserver.win = true;
      window.addEventListener("resize", syncDockGrowDirection, { passive: true });
    }
  }

  /* Accordion: opening one panel collapses the others (Shortcuts included). */

  const LAST_PANEL_KEY = "fl_dock_open_panel";
  function notePanelOpen(id) {
    if (!id) return;
    try { localStorage.setItem(LAST_PANEL_KEY, id); } catch (_) {}
    markLastDockPanel();
  }
  function readLastPanel() {
    try {
      const id = localStorage.getItem(LAST_PANEL_KEY) || "";
      return id === "fl-diagnostics-panel" ? "fl-perf-controls" : id;
    } catch (_) { return ""; }
  }

  function panelBodyIsOpen(panel) {
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
    if (typeof input.checked !== "boolean") input.checked = input.getAttribute("aria-checked") === "true";
    input.setAttribute("aria-checked", input.checked ? "true" : "false");
  }
  function setupSwitchAriaSync() {
    if (setupSwitchAriaSync.bound) return;
    setupSwitchAriaSync.bound = true;
    document.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
      const control = e.target && e.target.closest ? e.target.closest("button.fl-switch-input") : null;
      if (!control) return;
      control.checked = control.getAttribute("aria-checked") !== "true";
      syncSwitchAria(control);
      control.dispatchEvent(new Event("change", { bubbles: true }));
    }, true);
    document.addEventListener("change", (e) => {
      if (flBasicShouldYield()) return;
      if (e.target && e.target.classList && e.target.classList.contains("fl-switch-input")) syncSwitchAria(e.target);
    }, true);
  }

  function switchHtml(id, label, on) {
    const descriptions = {"fl-nsfw-toggle":"Show unblurred media. Turn off for SFW browsing.","fl-blur-avatars":"Also blur profile pictures in SFW mode.","fl-blur-videos":"Also blur video previews in SFW mode.","fl-auto-scroll":"Load more results as you approach the end of the page.","fl-show-toasts":"Show brief feedback after actions.","fl-show-seen-chip":"Label profiles you have already visited.","fl-hide-banners":"Hide FL Tools informational banners."};
    if (descriptions[id]) label += '<small class="fl-rail-description">' + descriptions[id] + "</small>";
    return '<div class="fl-switch"><span class="fl-switch-text" id="' + id + '-label">' + label +
      '</span><button id="' + id + '" type="button" class="fl-switch-input toggleSwitch" role="switch"' +
      ' aria-labelledby="' + id + '-label" aria-checked="' + (on ? "true" : "false") +
      '"></button></div>';
  }

  /* UI strings (English). */
  const I18N = {
    en: {
      shortcuts: "Shortcuts",
      softSearch: "Search nickname",
      unsoft: "×",
      softCount: "{n} soft-blocked",
      softBackup: "Download list",
      blockPanel: "Soft-Block | Block",
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
      advancedSettings: "Advanced",
      nsfwPanel: "NSFW / SFW",
      profileSettings: "Filters",
      systemPanel: "System",
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
      showToasts: "Show text-match toasts",
      hideBanners: "Hide ads / install / push banners",
      jumpTop: "Jump to top",
      lastPlace: "Last place",
      selectorWarn: "No member cards found on this list page. FetLife markup may have changed.",
      markupWarnFeed: "Home feed not recognized. FetLife markup may have changed — chips/Filters may break.",
      markupWarnProfile: "Profile layout not recognized. FetLife markup may have changed — soft-block/highlights may break.",
      markupWarnList: "Member cards not found on this list. FetLife markup may have changed — Filters may break.",
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
      hideRel: "Relationship Filter",
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
      showSeenChip: "Show Seen chip",
      seenReset: "Reset seen",
      seenResetHint: "Clear Seen chips so visited profiles look new again.",
      factoryReset: "Factory Reset",
      factoryResetHint: "Erase settings, Filters, and cached data on this device.",
      factoryResetWarn: "This cannot be reversed. Settings, Filters, and cached FL Tools data on this device will be deleted, then the page reloads.",
      factoryResetContinue: "Continue",
      presetDefault: "Default",
      presetMinimal: "Minimal",
      presetSfw: "SFW",
      presetHint: "Default is full browse. Minimal turns off Seen, infinite scroll, and toasts, and blurs at 1px. SFW blurs media at 6px or more and hides banners.",
      nsfwPresetHint: "Default is NSFW (no blur). Minimal blurs at 1px. SFW blurs at 6px or more.",
      softBlockToast: "Soft-blocked {name}: {terms}",
      softBlockToastNone: "Soft-blocked {name}",
      blockFetlifeAsk: "Block {name} on FetLife?",
      blockFetlifeWhy: "Continue confirms FetLife’s built-in block. Soft block only hides them in FL Tools.",
      blockFetlifeContinue: "Continue",
      profileBlockHint: "Soft-block hides them in FL Tools. Block on FetLife uses the site’s block.",
      profileBlockIgnored: "Hard limits ignored for this profile.",
      seenChip: "Seen",
      seenChipTitle: "Last seen {date}",
      browseChips: "Active Filters",
      browseChipRemove: "Stop filtering {term}",
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
      dockLabel: "FL Tools"
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
  /* Read JSON from the namespaced tree, trying current key then legacy keys. */
  function readJsonKey(keys) {
    for (const key of keys) {
      try {
        const parsed = FLStorage.get(key);
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
    let raw = null;
    let fromLegacy = false;
    try {
      if (FLStorage.get(FILTER_KEY) == null) {
        fromLegacy = !!(localStorage.getItem("fl_profile_filter_settings_v3") || localStorage.getItem("fl_profile_filter_settings_v2"));
      }
    } catch (_) {}
    raw = readJsonKey([FILTER_KEY, "fl_profile_filter_settings_v3", "fl_profile_filter_settings_v2"]);
    const merged = Object.assign({}, FILTER_DEFAULTS, raw || {});
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
    merged.cities = "";
    merged.myCity = "";
    merged.sameCityOnly = false;
    /* Write-forward legacy v2/v3 keys so a later read always hits FILTER_KEY. */
    if (fromLegacy && raw) {
      try { saveFilterSettings(merged); } catch (_) {}
    }
    return merged;
  }
  function saveFilterSettings(settings) {
    try { FLStorage.set(FILTER_KEY, flNormaliseObject(FILTER_DEFAULTS, settings)); } catch (_) {}
  }
  function migrateFlSettings() {
    let schema = 0;
    try { schema = Number(FLStorage.get(FL_SETTINGS_SCHEMA_KEY) || 0); } catch (_) {}
    if (schema >= FL_SETTINGS_SCHEMA) return;
    saveFilterSettings(loadFilterSettings());
    flSavePerf(flLoadPerf());
    try { FLStorage.set(FL_SETTINGS_SCHEMA_KEY, FL_SETTINGS_SCHEMA); } catch (_) {}
  }
  migrateFlSettings();

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
  function isFriend(card) {
    if (pageKind() === "friends" && isOwnRelationList()) return true;
    const btn = card.querySelector("turbo-frame[id^='relation_button'] button, turbo-frame[id^='relation_button'] span.inline-flex");
    const txt = ((btn && btn.textContent) || "").replace(/\s+/g, " ").trim();
    return /^friends?$/i.test(txt);
  }
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
  /* Generic dock toast helper. */
  function showTextToast(msg, persist) {
    let toast = document.getElementById("fl-text-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "fl-text-toast";
      toast.className = "life-toast";
      toast.title = "Dismiss";
      toast.addEventListener("click", () => {
      if (flBasicShouldYield()) return; toast.style.display = "none"; });
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
    try { FLStorage.set(TERM_LIB_KEY, lib); } catch (_) {}
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
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
        e.stopPropagation();
        removeSavedTerm(id, term);
      });
      chip.appendChild(x);
      if (savedOnly) {
        chip.title = "Click × to remove from saved";
        chip.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
      if (e.key === "Enter") { e.preventDefault(); commit(); }
      if (e.key === "Escape") {
        const sug = document.getElementById(id + "-suggest");
        if (sug) sug.classList.remove("open");
      }
    });
    input.addEventListener("focus", () => renderTermSuggest(id, input.value));
    input.addEventListener("input", () => renderTermSuggest(id, input.value));
    input.addEventListener("blur", () => {
      if (flBasicShouldYield()) return;
      setTimeout(() => {
        const sug = document.getElementById(id + "-suggest");
        if (sug) sug.classList.remove("open");
      }, 180);
    });
    if (add) add.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return; e.stopPropagation(); commit(); });
    renderChipList(id);
  }
  function autoApplyFilters() {
    const next = getCurrentFilterSettings();
    saveFilterSettings(next);
    applyFilter(next);
    applyExcludeBlur(next);
  }
  function checked(id) { const el = document.getElementById(id); return !!(el && (typeof el.checked === "boolean" ? el.checked : el.getAttribute("aria-checked") === "true")); }

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
    if (flBasicShouldYield()) return;
    if (isBlockedSettingsPage()) {
      revealAllMemberCards();
      return;
    }
    const genders = splitList(settings.genders);
    const roles = splitList(settings.roles);
    const limits = splitList(settings.limits).concat(splitList(settings.exclude));
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
      /* Org cards moved to Pro. Basic ignores orgMode. */
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
      const nick = cardNickname(card);
      const blocked = loadBlockReason(nick);
      const reasons = hard.concat(soft);
      const visible = reasons.length === 0 && !blocked;
      const face = cardFace(card);
      shell.classList.remove("flhp-dim", "flhp-dim-soft", "flhp-dim-hard", "lt-seen-today");
      if (face) face.querySelectorAll(".lt-seen-chip, .lt-card-chips").forEach((n) => n.remove());
      face.classList.remove("flhp-dim", "flhp-dim-soft", "flhp-dim-hard");
      clearWhyHiddenMarkers(shell, face);
      if (blocked) {
        applyWhyHiddenMarkers(shell, face, ["soft-block"], false);
        shell.style.display = "none";
        face.classList.add("lt-soft-blocked");
        face.onclick = function (e) { e.preventDefault(); e.stopPropagation(); };
      } else if (visible) {
        shell.style.display = "";
        shown += 1;
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
    if (isListPage()) enhanceMemberCardActions();
    enhanceFeedStoryActions();
  }
  function getCurrentFilterSettings() {
    const stored = loadFilterSettings();
    return {
      minAge: val("fl-min-age") || "18", maxAge: val("fl-max-age"),
      include: "",
      genders: chipValue("fl-genders"), roles: chipValue("fl-roles"), limits: chipValue("fl-limits"),
      exclude: chipValue("fl-limits"),
      minPics: stored.minPics, minVids: stored.minVids, minWritings: stored.minWritings,
      hideOrgs: false, orgMode: "off",
      dimHidden: true,
      relFollow: checked("fl-rel-follow"), relFollowing: checked("fl-rel-following"),
      relFollowsYou: checked("fl-rel-followsyu"), relFriends: checked("fl-rel-friends"),
      autoScroll: checked("fl-auto-scroll"), autoloadCount: val("fl-autoload-count") || "100",
      dockAnchor: val("fl-dock-anchor") || "bottom",
      showToasts: checked("fl-show-toasts"),
      hideBanners: checked("fl-hide-banners"),
      collapsePosts: false, sortBy: val("fl-sort-by") || "none",
      combineMode: val("fl-combine-mode") || stored.combineMode || "and",
      matchScope: val("fl-match-scope") || stored.matchScope || "card",
      roleMode: val("fl-role-mode") || stored.roleMode || "must",
      preferRoles: document.getElementById("fl-prefer-roles") ? chipValue("fl-prefer-roles") : (stored.preferRoles || ""),
      cities: "",
      myCity: "",
      sameCityOnly: false,
      showSeenChip: document.getElementById("fl-show-seen-chip")
        ? checked("fl-show-seen-chip")
        : showSeenChipEnabled(stored),
      dimSeenToday: document.getElementById("fl-show-seen-chip")
        ? checked("fl-show-seen-chip")
        : showSeenChipEnabled(stored)
    };
  }
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
    const countInput = document.getElementById("fl-autoload-count");
    if (!currentNextPageUrl) currentNextPageUrl = findNextPageUrl(document);
    if (!currentNextPageUrl) return;
    const container = cardContainer();
    const maxPages = opts.pages != null ? opts.pages : 1;
    if (countInput) countInput.disabled = true;
    let emptyStreak = 0;
    for (let i = 0; i < maxPages; i += 1) {
      if (i > 0) await new Promise((resolve) => setTimeout(resolve, 3000));
      if (!currentNextPageUrl) break;
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
        if (countInput) countInput.disabled = false;
        console.error("FL_Tools Filter Error:", err);
        return;
      }
    }
    if (countInput) countInput.disabled = false;
  }
  /* When enabled, load the next batch as the user nears the bottom. */
  function setupInfiniteScroll() {
    if (setupInfiniteScroll.bound) return;
    setupInfiniteScroll.bound = true;
    window.addEventListener("scroll", () => {
      if (flBasicShouldYield()) return;
      if (isBlockedSettingsPage()) return;
      const enabled = document.getElementById("fl-auto-scroll")
        ? checked("fl-auto-scroll")
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
      if (flBasicShouldYield()) return;
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
      const rawVisit = FLStorage.get(VISIT_LOG_KEY);
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
      const raw = FLStorage.get(SEEN_TODAY_KEY);
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
    try { FLStorage.set(VISIT_LOG_KEY, trimmed); } catch (_) {}
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
    try { FLStorage.set(SEEN_TODAY_KEY, payload); } catch (_) {}
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
  function clearSeenNick(nick) {
    const map = loadVisitMap();
    delete map[nick];
    saveVisitMap(map);
    saveSeenToday(loadSeenToday());
    applySeenChips();
    FLPageTweaks.applyVisitedLinks(document, map);
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
      face.classList.add("lt-card-face");
      face.classList.remove("lt-seen-today");
      const oldRail = face.querySelector(".lt-card-chips");
      if (oldRail) oldRail.remove();
      const old = face.querySelector(".lt-seen-chip");
      if (old) old.remove();
      const nick = String(cardNickname(card) || "").toLowerCase();
      const when = on && map && nick && map[nick];
      if (!when) return;
      const rail = document.createElement("div");
      rail.className = "lt-card-chips";
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "lt-seen-chip";
      chip.textContent = t("seenChip");
      chip.title = t("seenChipTitle", { date: formatVisitDate(when) }) + " · Click to mark unseen";
      chip.setAttribute("aria-label", "Mark " + nick + " as unseen");
      chip.addEventListener("click", (event) => {
      if (flBasicShouldYield()) return;
        event.preventDefault();
        event.stopPropagation();
        clearSeenNick(nick);
      });
      rail.appendChild(chip);
      face.appendChild(rail);
    });
    renderBrowseChipBar(settings);
  }
  function browseChipGroups(settings) {
    settings = settings || loadFilterSettings();
    return [
      { id: "fl-genders", items: splitList(settings.genders) },
      { id: "fl-roles", items: splitList(settings.roles) },
      { id: "fl-limits", items: splitList(settings.limits).concat(splitList(settings.exclude)) }
    ].map((group) => {
      const seen = {};
      group.items = group.items.filter((term) => {
        if (!term || seen[term]) return false;
        seen[term] = true;
        return true;
      });
      return group;
    }).filter((group) => group.items.length);
  }
  function renderBrowseChipBar(settings) {
    let bar = document.getElementById("fl-browse-chips");
    if (!isListPage() || isMediaPage()) {
      if (bar) bar.remove();
      return;
    }
    const groups = browseChipGroups(settings || loadFilterSettings());
    if (!groups.length) {
      if (bar) bar.remove();
      return;
    }
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "fl-browse-chips";
      bar.setAttribute("aria-label", t("browseChips"));
      document.body.appendChild(bar);
    }
    bar.innerHTML = "";
    const title = document.createElement("span");
    title.className = "lt-browse-chips-label";
    title.textContent = t("browseChips");
    bar.appendChild(title);
    groups.forEach((group) => {
      group.items.forEach((term) => {
        const chip = document.createElement("span");
        chip.className = "lt-browse-chip";
        chip.appendChild(document.createTextNode(term));
        const x = document.createElement("button");
        x.type = "button";
        x.textContent = "×";
        x.title = t("browseChipRemove", { term: term });
        x.setAttribute("aria-label", t("browseChipRemove", { term: term }));
        x.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
          e.preventDefault();
          e.stopPropagation();
          removeSavedTerm(group.id, term);
        });
        chip.appendChild(x);
        bar.appendChild(chip);
      });
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
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
      if (flBasicShouldYield()) return;
      homeScrollRestoredFor = "";
      setTimeout(tryRestoreHomeScroll, 40);
    });
    window.addEventListener("pageshow", () => {
      if (flBasicShouldYield()) return;
      homeScrollRestoredFor = "";
      setTimeout(tryRestoreHomeScroll, 40);
    });
    window.addEventListener("popstate", () => {
      if (flBasicShouldYield()) return;
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
      wrap.innerHTML = '<input type="search" id="fl-panel-search" placeholder="' + escapeAttr(t("panelSearchPh")) + '" aria-label="' + escapeAttr(t("panelSearchPh")) + '" autocomplete="off">';
      const input = wrap.firstChild;
      const run = () => applyPanelSearch(input.value);
      input.addEventListener("input", run);
      input.addEventListener("search", run);
      input.addEventListener("keydown", (e) => {
      if (flBasicShouldYield()) return;
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
      box.checked = box.getAttribute("aria-checked") !== "true";
      syncSwitchAria(box);
      box.dispatchEvent(new Event("change"));
      return;
    }
    const ds = loadDisplaySettings();
    const mode = ds.mode === "sfw" ? "nsfw" : "sfw";
    saveDisplaySettings(Object.assign({}, ds, { mode: mode }));
    applyDisplayMode(mode, ds.blurPx);
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
  function placePictureNavigation() {
    if (flBasicShouldYield()) return;
    if (!/^\/[^/]+\/pictures\/\d+\/?$/.test(location.pathname)) return;
    for (const aside of document.querySelectorAll("aside")) {
      const ad = aside.querySelector('div.text-center:has(> a:is([href^="/tiles/click/"],[href^="https://fetlife.com/tiles/click/"]) > div > img)');
      if (!ad || ad.dataset.flNavigationReplaced) continue;
      const link = Array.from(aside.querySelectorAll('a[data-turbo="true"][href*="/pictures/"]')).find(a => a.parentElement.classList.contains("border-y"));
      if (!link) continue;
      const bar = link.parentElement;
      if (bar.dataset.flAdNavigation || !bar.querySelector('a[href*="/pictures/"]')) continue;
      // Move native nodes so Turbo links and existing handlers keep working.
      const host = bar.parentElement;
      if (!host.classList.contains("lg:block") || !host.classList.contains("hidden")) continue;
      ad.before(host);
      ad.hidden = true;
      ad.dataset.flNavigationReplaced = "1";
      bar.dataset.flAdNavigation = "1";
      bar.setAttribute("aria-label", "Picture navigation");
      bar.setAttribute("role", "navigation");
    }
  }
  function observePictureNavigation() {
    if (observePictureNavigation.bound) return;
    observePictureNavigation.bound = true;
    let frame = 0;
    const schedule = () => {
      if (frame || !/^\/[^/]+\/pictures\/\d+\/?$/.test(location.pathname)) return;
      frame = requestAnimationFrame(() => { frame = 0; placePictureNavigation(); });
    };
    new MutationObserver(schedule).observe(document.body, {childList:true,subtree:true});
    document.addEventListener("turbo:load", schedule);
    schedule();
  }
  function applyBannerPref() {
    if (!document.getElementById("fl-rounded-images-style")) {
      const imageStyle = document.createElement("style");
      imageStyle.id = "fl-rounded-images-style";
      imageStyle.textContent = 'img:not(:where(#fl-tools-dock *,#fl-settings-launcher *,#fl-studio-launcher *,#fl-studio-panel *,#fl-studio-palette *)){border-radius:8px!important}';
      imageStyle.textContent += 'footer:has([data-story-love-button-target="button"]) :is([data-controller~="comment-cta"],[data-open-story-share],[data-story-bookmark-button-target="button"]){border-inline-start:1px solid var(--fl-footer-divider,#606068)!important}';
      imageStyle.textContent += '.lt-qa-bar.lt-qa-feed:not(.lt-qa-feed-inline){contain:inline-size;width:100%!important;min-width:0;max-width:100%;align-items:center;overflow:visible}.lt-qa-bar.lt-qa-feed:not(.lt-qa-feed-inline)>button{flex:none;white-space:nowrap;padding-inline:3px}';
      document.documentElement.appendChild(imageStyle);
    }

    observePictureNavigation();
    if (!document.getElementById("fl-tile-ad-style")) {
      const style = document.createElement("style");
      style.id = "fl-tile-ad-style";
      // Match the complete tile wrapper, not nearby content or ordinary image links.
      style.textContent = 'html.fl-tools-hide-banners div.text-center:has(> a:is([href^="/tiles/click/"],[href^="https://fetlife.com/tiles/click/"]) > div > img:is([src^="/tiles/"],[src^="https://fetlife.com/tiles/"])){display:none!important}';
      document.documentElement.appendChild(style);
    }
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
    getFeedItems().forEach((item) => {
      const text = (item.innerText || "").toLowerCase();
      let visible = true;
      // Feed stories do not participate in profile hard-limit/exclusion matching.
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
  function isDeclaredHardLimits(node) {
    const section = node.closest && node.closest('[data-expand-text-target="clampable"]');
    const label = section && section.firstElementChild;
    return !!(label && /^hard limits\s*:/i.test((label.textContent || "").trim()));
  }
  function profileMatchText(root) {
    const copy = root.cloneNode(true);
    copy.querySelectorAll('[data-expand-text-target="clampable"]').forEach((section) => {
      if (isDeclaredHardLimits(section)) section.remove();
    });
    if (isDeclaredHardLimits(copy)) return "";
    return copy.textContent || "";
  }
  function profileSectionHits(settings) {
    settings = settings || loadFilterSettings();
    const terms = splitList(settings.exclude).concat(splitList(settings.limits));
    if (!terms.length) return [];
    const roots = profileSectionRoots();
    /* Do not scan full main.innerText — freezes rich profiles while activity/widgets stream in. */
    const extra = ((profileNickname() || "") + " " + (document.title || "")).toLowerCase();
    const text = roots.map((el) => profileMatchText(el).toLowerCase()).join("\n") + "\n" + extra;
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
            if (isDeclaredHardLimits(p)) return NodeFilter.FILTER_REJECT;
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
        '</div><button type="button" id="fl-block-toggle" class="fl-tool-chevron" aria-expanded="false" aria-label="Expand panel">▸</button></div>' +
        '<div id="fl-block-body" class="fl-tool-body fl-tool-hidden">' +
        '<div id="fl-soft-count" class="life-hint">' + t("softCount", { n: "0" }) + "</div>" +
        softCore +
        "</div>";
      dock.insertBefore(panel, dock.firstChild);

      const softSearch = document.getElementById("fl-soft-search");
      if (softSearch) softSearch.addEventListener("input", renderSoftList);
      const backup = document.getElementById("fl-soft-backup");
      if (backup) backup.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return; e.stopPropagation(); downloadSoftList(); });
      const softVisB = document.getElementById("fl-soft-block-visible-block");
      if (softVisB && !softVisB.dataset.ltBound) {
        softVisB.dataset.ltBound = "1";
        softVisB.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return; e.stopPropagation(); softBlockVisibleCards(); });
      }
      renderSoftList();
      enhanceBlockPanelHistory();
      bindPanelHeader("fl-block-header", "fl-block-body", "fl-block-toggle", "fl-block-panel");
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
  function normalizedLimitTerms(terms) {
    return [...new Set((terms || []).map(term => String(term).trim().replace(/\s+/g, " ").toLowerCase()).filter(Boolean))];
  }
  function blockPromptAcknowledgments(nick, currentTerms) {
    try {
      const raw = JSON.parse(localStorage.getItem("fl_skip_block_prompt") || "{}");
      const map = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
      const key = String(nick || "").toLowerCase();
      const keys = Object.keys(map).filter(k => k.toLowerCase() === key);
      // Legacy booleans did not record terms. Seed their first observed set once.
      if (keys.some(k => map[k] === true)) {
        for (const k of keys) delete map[k];
        Object.defineProperty(map, key, {value:normalizedLimitTerms(currentTerms), enumerable:true, configurable:true, writable:true});
        localStorage.setItem("fl_skip_block_prompt", JSON.stringify(map));
      }
      return normalizedLimitTerms(Object.keys(map).filter(k => k.toLowerCase() === key).flatMap(k => Array.isArray(map[k]) ? map[k] : []));
    } catch (_) { return []; }
  }
  function newBlockPromptTerms(nick, terms) {
    const acknowledged = new Set(blockPromptAcknowledgments(nick, terms));
    return (terms || []).filter(term => !acknowledged.has(normalizedLimitTerms([term])[0]));
  }
  function skippedBlockPrompt(nick, terms) {
    return !!terms?.length && newBlockPromptTerms(nick, terms).length === 0;
  }
  function skipBlockPrompt(nick, terms) {
    if (!nick) return;
    try {
      const acknowledged = blockPromptAcknowledgments(nick, terms);
      const raw = JSON.parse(localStorage.getItem("fl_skip_block_prompt") || "{}");
      const map = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
      const key = String(nick).toLowerCase();
      for (const k of Object.keys(map)) if (k.toLowerCase() === key) delete map[k];
      Object.defineProperty(map, key, {value:normalizedLimitTerms([...acknowledged, ...(terms || [])]), enumerable:true});
      localStorage.setItem("fl_skip_block_prompt", JSON.stringify(map));
    } catch (_) {}
  }
  const BLOCK_REASON_KEY = "fl_block_reasons";
  function blockReasonMap() {
    try { return FLStorage.get(BLOCK_REASON_KEY) || {}; } catch (_) { return {}; }
  }
  function shortBlockDate(ts) {
    try { return new Date(ts).toLocaleDateString(undefined, { year: "2-digit", month: "numeric", day: "numeric" }); }
    catch (_) { return ""; }
  }
  function saveBlockReason(nick, terms, type) {
    if (!nick) return;
    const map = blockReasonMap();
    map[nick] = { terms: terms || [], at: Date.now(), type: type === "official" ? "official" : "soft" };
    try { FLStorage.set(BLOCK_REASON_KEY, map); } catch (_) {}
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
    try { FLStorage.set(BLOCK_REASON_KEY, map); } catch (_) {}
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
      if (flBasicShouldYield()) return;
        e.stopPropagation();
        e.preventDefault();
        clearBlockReason(rec.nick);
        skipBlockPrompt(rec.nick, rec.terms || []);
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
      confirmFetLifeBlockUi();
      return;
    }
    const modalBtn = document.querySelector('[data-id="block"] [data-id="modal-main-action-button"], [data-id="block"] button[type="submit"]');
    if (modalBtn) { modalBtn.click(); confirmFetLifeBlockUi(); return; }
    const trigger = document.querySelector('[data-id="block"] button, [data-id="block"] a, a[href*="blockeds"]');
    if (trigger) {
      try { trigger.click(); } catch (_) {}
      confirmFetLifeBlockUi();
      return;
    }
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
      if (flBasicShouldYield()) return;
      e.stopPropagation();
      text.textContent = t("unblockAsk", { name: nick || "this member", date: when });
      row.innerHTML = "";
      const yes = document.createElement("button");
      yes.type = "button";
      yes.className = "life-btn life-btn-red";
      yes.textContent = t("unblockYes");
      yes.addEventListener("click", (ev) => {
      if (flBasicShouldYield()) return;
        ev.stopPropagation();
        submitOfficialUnblock(nick);
      });
      const keep = document.createElement("button");
      keep.type = "button";
      keep.className = "life-btn life-btn-gray";
      keep.textContent = t("unblockKeep");
      keep.addEventListener("click", (ev) => {
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
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
  function confirmFetLifeBlockUi() {
    const pick = () => document.querySelector('[data-id="block"] [data-id="modal-main-action-button"], [data-id="block"] button[type="submit"]');
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      const btn = pick();
      if (btn) {
        clearInterval(timer);
        try { btn.click(); } catch (_) {}
        return;
      }
      if (tries >= 25) clearInterval(timer);
    }, 80);
  }
  function showActionToast(msg) {
    let toast = document.getElementById("fl-action-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "fl-action-toast";
      toast.className = "life-toast";
      toast.title = "Dismiss";
      toast.addEventListener("click", () => {
      if (flBasicShouldYield()) return; toast.style.display = "none"; });
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.display = "";
    clearTimeout(showActionToast.hideTimer);
    showActionToast.hideTimer = setTimeout(() => { toast.style.display = "none"; }, 6000);
  }
  function completeSoftBlock(nick, terms) {
    saveBlockReason(nick, terms || [], "soft");
    appendLimitHistory(nick, terms || [], location.pathname || "");
    renderSoftList();
    applyFilter(loadFilterSettings());
    const why = (terms || []).filter(Boolean).join(", ");
    showActionToast(why
      ? t("softBlockToast", { name: nick, terms: why })
      : t("softBlockToastNone", { name: nick }));
    showSoftBlockNotice(nick, loadBlockReason(nick));
  }
  function showProfileBlockPrompt(nick, hits) {
    if (!nick || loadBlockReason(nick)) return;
    const terms = (hits || []).map((x) => String(x || "").trim()).filter(Boolean);
    const skipped = skippedBlockPrompt(nick);
    const urgent = !!(terms.length && !skipped);
    ensureBlockPanel();
    if (urgent) {
      openBlockPanel();
      hardLimitSfwMimic = true;
      applyDisplayMode();
    } else {
      hardLimitSfwMimic = false;
      applyDisplayMode();
    }
    const bar = dockAlert();
    const sig = (urgent ? "prompt" : "visit") + "|" + nick + "|" + terms.join(",") + "|" + (skipped ? "skip" : "");
    if (bar.getAttribute("data-kind") === (urgent ? "prompt" : "visit") && bar.getAttribute("data-sig") === sig) return;
    bar.setAttribute("data-kind", urgent ? "prompt" : "visit");
    bar.setAttribute("data-sig", sig);
    paintProfileBlockMenu(bar, nick, terms, skipped ? "ignored" : (urgent ? "prompt" : "visit"));
  }
  function paintProfileBlockMenu(bar, nick, terms, stage) {
    bar.innerHTML = "";
    const title = document.createElement("div");
    title.style.fontWeight = "bold";
    const why = document.createElement("div");
    why.style.marginTop = "4px";
    if (stage === "fetlife") {
      title.textContent = t("blockFetlifeAsk", { name: nick });
      why.textContent = t("blockFetlifeWhy");
    } else if (terms.length && stage !== "ignored") {
      title.textContent = t("excludeAlert", { name: nick });
      why.textContent = t("limitHitsWhy", { terms: terms.join(", ") });
    } else if (stage === "ignored" && terms.length) {
      title.textContent = t("profileBlockIgnored");
      why.textContent = t("limitHitsWhy", { terms: terms.join(", ") });
    } else {
      title.textContent = t("blockPanel");
      why.textContent = t("profileBlockHint");
    }
    const row = document.createElement("div");
    row.className = "fl-block-actions";

    function addBtn(label, kind, span, onClick) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = (kind === "red" ? "life-btn life-btn-red" : "life-btn life-btn-gray") + (span ? " fl-block-span" : "");
      btn.textContent = label;
      btn.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return; e.stopPropagation(); onClick(); });
      row.appendChild(btn);
      return btn;
    }

    if (stage === "fetlife") {
      addBtn(t("blockSoft"), "gray", false, () => completeSoftBlock(nick, terms));
      addBtn(t("blockFetlifeContinue"), "red", false, () => {
        appendLimitHistory(nick, terms, location.pathname || "");
        submitOfficialBlock(terms);
      });
    } else {
      addBtn(t("blockSoft"), "gray", false, () => completeSoftBlock(nick, terms));
      addBtn(t("blockYes"), "red", false, () => paintProfileBlockMenu(bar, nick, terms, "fetlife"));
      if (stage === "prompt") {
        addBtn(t("blockNo"), "gray", true, () => {
          skipBlockPrompt(nick);
          hardLimitSfwMimic = false;
          applyDisplayMode();
          showProfileBlockPrompt(nick, terms);
        });
      }
    }
    bar.appendChild(title);
    bar.appendChild(why);
    bar.appendChild(row);
  }
  function openBlockPanel() {
    ensureBlockPanel();
    try { applyDockHidden(false); } catch (_) {}
    setSettingsRailOpen(true, false);
    setPanelOpenState("fl-block-body", "fl-block-toggle", true);
    collapseOtherPanels("fl-block-panel");
    try { document.getElementById("fl-block-panel")?.scrollIntoView({ block: "nearest" }); } catch (_) {}
    syncOpenPanelHighlight();
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
      if (flBasicShouldYield()) return;
      e.stopPropagation();
      clearBlockReason(nick);
      skipBlockPrompt(nick, terms);
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
    if (!isMemberProfile() && !isBlockedInterstitial()) {
      if (hardLimitSfwMimic) {
        hardLimitSfwMimic = false;
        applyDisplayMode();
      }
    }
    if (applyUnblockPrompt()) {
      hardLimitSfwMimic = false;
      return;
    }
    const nick = profileNickname();
    if (isMemberProfile() && loadBlockReason(nick)) {
      hardLimitSfwMimic = false;
      applyDisplayMode();
      showSoftBlockNotice(nick, loadBlockReason(nick));
      return;
    }
    if (isMemberProfile()) {
      highlightProfileLimitTerms(settings);
      const hits = profileSectionHits(settings);
      showProfileBlockPrompt(nick, hits);
      if (!document.getElementById("fl-block-panel")) ensureBlockPanel();
    }
  }
  const DISPLAY_KEY = "fl_display_settings";
  const DISPLAY_DEFAULTS = { mode: "nsfw", blurPx: 4, blurAvatars: false, blurVideos: true, markReadScroll: false };
  let hardLimitSfwMimic = false;
  function loadDisplaySettings() {
    const merged = Object.assign({}, DISPLAY_DEFAULTS, readJsonKey([DISPLAY_KEY]) || {});
    merged.mode = merged.mode === "sfw" ? "sfw" : "nsfw";
    const blur = parseInt(merged.blurPx, 10);
    merged.blurPx = Number.isFinite(blur) ? Math.min(10, Math.max(1, blur)) : 4;
    /* Home-feed dim-on-scroll removed. */
    merged.markReadScroll = false;
    return merged;
  }
  function saveDisplaySettings(s) {
    try { FLStorage.set(DISPLAY_KEY, s); } catch (_) {}
  }
  function applyDisplayMode(mode, blurPx) {
    if (flBasicShouldYield()) return;
    const ds = loadDisplaySettings();
    if (hardLimitSfwMimic) {
      mode = "sfw";
      blurPx = Math.max(6, Number(ds.blurPx) || 4);
    } else {
      mode = mode || ds.mode;
      blurPx = blurPx == null ? ds.blurPx : blurPx;
    }
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
  function syncDisplayForm() {
    const ds = loadDisplaySettings();
    setSwitchState("fl-nsfw-toggle", ds.mode !== "sfw");
    setSwitchState("fl-blur-avatars", !!ds.blurAvatars);
    setSwitchState("fl-blur-videos", ds.blurVideos !== false);
    const blur = document.getElementById("fl-sfw-blur");
    if (blur) blur.value = String(ds.blurPx);
    const state = document.getElementById("fl-nsfw-state");
    if (state) state.textContent = ds.mode === "sfw" ? t("modeSfw") : t("modeNsfw");
    const label = document.getElementById("fl-blur-val");
    if (label) label.textContent = String(ds.blurPx);
  }
  function applyDisplayPreset(name) {
    const patch = FL_PRESET_DISPLAY[name];
    if (!patch) return false;
    const ds = loadDisplaySettings();
    const next = Object.assign({}, ds, patch);
    if (name === "minimal") next.blurPx = Math.max(1, Number(patch.blurPx) || 1);
    if (name === "sfw") next.blurPx = Math.max(6, Number(ds.blurPx) || 0, Number(patch.blurPx) || 6);
    saveDisplaySettings(next);
    applyDisplayMode();
    syncDisplayForm();
    return true;
  }
  function bindDisplayPresetButtons() {
    document.querySelectorAll("[data-fl-display-preset]").forEach((btn) => {
      if (btn.dataset.presetBound) return;
      btn.dataset.presetBound = "1";
      btn.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
        e.preventDefault();
        e.stopPropagation();
        applyDisplayPreset(btn.getAttribute("data-fl-display-preset"));
      });
    });
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
    try { FLStorage.set(LIMIT_HIST_KEY, trimmed); } catch (_) {}
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



  /* In-dock confirm (Escape / Cancel = false; Enter / Continue = true). Stays in the settings menu. */
  function promptButtonClass(kind) {
    return kind === "red" ? "life-btn life-btn-red" : "life-btn life-btn-gray";
  }
  function paintPromptBox(box, spec) {
    spec = spec || {};
    box.hidden = false;
    box.classList.add("life-alert-strong", "fl-prompt-block");
    box.classList.toggle("fl-prompt-danger", !!spec.danger);
    box.setAttribute("role", "dialog");
    box.innerHTML = "";
    const title = document.createElement("div");
    title.style.fontWeight = "bold";
    title.textContent = spec.title || t("confirmTitle");
    const msg = document.createElement("div");
    msg.style.marginTop = "4px";
    msg.textContent = spec.message || "";
    const row = document.createElement("div");
    row.className = "fl-block-actions";
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = promptButtonClass("gray");
    cancel.textContent = spec.cancelLabel || t("confirmCancel");
    const ok = document.createElement("button");
    ok.type = "button";
    ok.className = promptButtonClass(spec.danger ? "red" : "gray");
    ok.textContent = spec.okLabel || t("confirmOk");
    row.append(cancel, ok);
    box.append(title, msg, row);
    return { cancel, ok };
  }
  function hidePromptBox(box) {
    if (!box) return;
    box.hidden = true;
    box.textContent = "";
  }
  function wipeFlToolsStorage() {
    ["localStorage", "sessionStorage"].forEach((name) => {
      try {
        const store = window[name];
        const keys = [];
        for (let i = 0; i < store.length; i += 1) {
          const k = store.key(i);
          if (k && /^(fl_|fls_|fl\.)/i.test(k)) keys.push(k);
        }
        keys.forEach((k) => store.removeItem(k));
      } catch (_) {}
    });
  }
  function bindFactoryReset() {
    const btn = document.getElementById("fl-factory-reset");
    const box = document.getElementById("fl-factory-reset-prompt");
    if (!btn || !box || btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
      e.preventDefault();
      e.stopPropagation();
      setSettingsRailOpen(true, false);
      openCapabilityPanel("fl-advanced-panel");
      const actions = paintPromptBox(box, {
        danger: true,
        title: t("factoryReset"),
        message: t("factoryResetWarn"),
        cancelLabel: t("confirmCancel"),
        okLabel: t("factoryResetContinue")
      });
      actions.cancel.addEventListener("click", (ev) => {
      if (flBasicShouldYield()) return; ev.stopPropagation(); hidePromptBox(box); });
      actions.ok.addEventListener("click", (ev) => {
      if (flBasicShouldYield()) return;
        ev.stopPropagation();
        wipeFlToolsStorage();
        location.reload();
      });
    });
  }
  function confirmDock(message, onResult) {
    const stale = document.getElementById("fl-confirm-overlay");
    if (stale) stale.remove();
    setSettingsRailOpen(true, false);
    openCapabilityPanel("fl-block-panel");
    const dock = ensureDock();
    let host = document.getElementById("fl-dock-prompt");
    if (!host) {
      host = document.createElement("div");
      host.id = "fl-dock-prompt";
      const search = document.getElementById("fl-panel-search-wrap");
      if (search && search.parentNode === dock) search.after(host);
      else dock.appendChild(host);
    }
    const actions = paintPromptBox(host, {
      title: t("confirmTitle"),
      message: message,
      cancelLabel: t("confirmCancel"),
      okLabel: t("confirmOk")
    });
    let settled = false;
    function onKey(e) {
      if (e.key !== "Escape") return;
      e.preventDefault();
      e.stopPropagation();
      finish(false);
    }
    function finish(result) {
      if (settled) return;
      settled = true;
      document.removeEventListener("keydown", onKey, true);
      hidePromptBox(host);
      if (typeof onResult === "function") onResult(!!result);
    }
    document.addEventListener("keydown", onKey, true);
    actions.cancel.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return; e.preventDefault(); finish(false); });
    actions.ok.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return; e.preventDefault(); finish(true); });
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
      if (flBasicShouldYield()) return;
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
      '</span></div>' +
      '<div id="fl-limit-hist-body">' +
      '<div id="fl-limit-hist-count" class="life-hint"></div>' +
      '<input id="fl-limit-hist-search" type="text" placeholder="' + escapeAttr(t("limitHistSearch")) + '" style="margin-bottom:6px">' +
      '<div id="fl-limit-hist-list"></div>' +
      '<button type="button" id="fl-limit-hist-dl" class="life-btn life-btn-gray">' + t("limitHistDownload") + "</button>" +
      '<button type="button" id="fl-limit-hist-clear" class="life-btn life-btn-gray">' + t("limitHistClear") + "</button></div>";
    body.appendChild(wrap);

    document.getElementById("fl-limit-hist-search").addEventListener("input", renderLimitHistory);
    document.getElementById("fl-limit-hist-dl").addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
      e.stopPropagation();
      const blob = new Blob([JSON.stringify(loadLimitHistory(), null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "fetlife-limit-history.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    document.getElementById("fl-limit-hist-clear").addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
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
      if (flBasicShouldYield()) return;
      e.preventDefault(); e.stopPropagation();
      softBlockNick(nick);
    });
    return sb;
  }
  /* Home feed: Soft-block chip under avatar / beside status name. */
  function enhanceFeedStoryActions() {
    if (flBasicShouldYield()) return;
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
    if (flBasicShouldYield()) return;
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
      '</div><button type="button" id="fl-site-toggle" class="fl-tool-chevron" aria-expanded="false" aria-label="Expand panel">▸</button></div>' +
      '<div id="fl-site-body" class="fl-tool-body fl-tool-hidden">' +
      '<div class="life-hint">' + t("nsfwHint") + "</div>" +
      switchHtml("fl-nsfw-toggle", t("nsfwMode"), ds.mode !== "sfw") +
      '<div class="life-hint" id="fl-nsfw-state">' + (ds.mode === "sfw" ? t("modeSfw") : t("modeNsfw")) + "</div>" +
      '<label style="display:block;margin:8px 0 4px;">' + t("sfwBlur") + ' (<span id="fl-blur-val">' + ds.blurPx + "</span>px)</label>" +
      '<input id="fl-sfw-blur" type="range" min="1" max="10" step="1" value="' + ds.blurPx + '">' +
      switchHtml("fl-blur-avatars", t("blurAvatars"), !!ds.blurAvatars) +
      switchHtml("fl-blur-videos", t("blurVideos"), ds.blurVideos !== false) +
      '<div id="fl-display-preset-row" style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0">' +
      '<button type="button" class="life-btn life-btn-gray" data-fl-display-preset="default">' + t("presetDefault") + "</button>" +
      '<button type="button" class="life-btn life-btn-gray" data-fl-display-preset="minimal">' + t("presetMinimal") + "</button>" +
      '<button type="button" class="life-btn life-btn-gray" data-fl-display-preset="sfw">' + t("presetSfw") + "</button></div>" +
      '<div class="life-hint">' + t("nsfwPresetHint") + "</div>" +
      "</div>";
    mountDockSection(box, "fl-site-panel");
    bindPanelHeader("fl-site-header", "fl-site-body", "fl-site-toggle", "fl-site-panel");
    wireSiteControls();
    bindDisplayPresetButtons();
  }

  function applyExtras() {
    if (flBasicShouldYield()) return;
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
  function setupKeyboard() {
    if (setupKeyboard.bound) return;
    setupKeyboard.bound = true;
    document.addEventListener("keydown", (e) => {
      if (flBasicShouldYield()) return;
      if (flBasicShouldYield() || e.defaultPrevented) return;
      const tag = (e.target && e.target.tagName) || "";
      if (/INPUT|TEXTAREA|SELECT/.test(tag) || e.target.isContentEditable) return;
      if (flShortcutMatch(e,"filters")) {
        e.preventDefault();
        setSettingsRailOpen(true, false);
        const body = document.getElementById("fl-panel-body");
        if (body) {
          setPanelOpenState("fl-panel-body", "fl-panel-toggle", true);
          collapseOtherPanels("fl-filter-panel");
        }
      } else if (flShortcutMatch(e,"nsfw")) {
        e.preventDefault(); toggleNsfwMode();
      } else if (flShortcutMatch(e,"next")) jumpNextUnread();
      else if (flShortcutMatch(e,"top")) {
        e.preventDefault(); window.scrollTo({ top:0, behavior:"smooth" });
      }
    });
  }

  function setSwitchState(id, on) {
    const el = document.getElementById(id);
    if (!el) return;
    el.checked = !!on;
    el.setAttribute("aria-checked", on ? "true" : "false");
  }
  function syncFilterForm(s) {
    const setVal = (id, value) => { const el = document.getElementById(id); if (el) el.value = value == null ? "" : String(value); };
    setVal("fl-min-age", s.minAge);
    setVal("fl-max-age", s.maxAge);
    const chips = { "fl-genders": "genders", "fl-roles": "roles", "fl-limits": "limits" };
    Object.keys(chips).forEach((id) => {
      const hold = document.getElementById(id);
      if (!hold) return;
      hold.value = s[chips[id]] || "";
      renderChipList(id);
    });
    setVal("fl-combine-mode", s.combineMode || "and");
    setVal("fl-match-scope", s.matchScope || "card");
    setVal("fl-role-mode", s.roleMode || "must");
    setSwitchState("fl-auto-scroll", !!s.autoScroll);
    setSwitchState("fl-show-toasts", s.showToasts !== false);
    setSwitchState("fl-show-seen-chip", !!s.showSeenChip);
    setSwitchState("fl-hide-banners", !!s.hideBanners);
    setSwitchState("fl-rel-follow", s.relFollow !== false);
    setSwitchState("fl-rel-following", s.relFollowing !== false);
    setSwitchState("fl-rel-followsyu", s.relFollowsYou !== false);
    setSwitchState("fl-rel-friends", s.relFriends !== false);
    const ds = loadDisplaySettings();
    setSwitchState("fl-nsfw-toggle", ds.mode !== "sfw");
  }
  function applyFilterPreset(name) {
    const patch = FL_FILTER_PRESETS[name];
    if (!patch) return false;
    const current = loadFilterSettings();
    const next = Object.assign({}, FILTER_DEFAULTS, current, patch, {
      dockAnchor: current.dockAnchor,
      orgMode: current.orgMode,
      cities: "",
      myCity: "",
      sameCityOnly: false
    });
    saveFilterSettings(next);
    try { localStorage.setItem("fl_filter_preset", name); } catch (_) {}
    const displayPatch = FL_PRESET_DISPLAY[name];
    if (displayPatch) applyDisplayPreset(name);
    syncFilterForm(next);
    applyFilter(next);
    applySeenChips(next);
    setupInfiniteScroll();
    return true;
  }
  function bindPresetButtons() {
    document.querySelectorAll("[data-fl-preset]").forEach((btn) => {
      if (btn.dataset.presetBound) return;
      btn.dataset.presetBound = "1";
      btn.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
        e.preventDefault();
        applyFilterPreset(btn.getAttribute("data-fl-preset"));
      });
    });
  }
  function resetSeen() {
    try { FLStorage.remove(VISIT_LOG_KEY); } catch (_) {}
    try { FLStorage.set(SEEN_TODAY_KEY, { date: localDateKey(), nicks: [] }); } catch (_) {}
    applySeenChips();
  }

  /* Build the Profile Filter UI once. Submenu: Relationship Settings. */
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
      '</div><button type="button" id="fl-panel-toggle" class="fl-tool-chevron" aria-expanded="false" aria-label="Expand panel">▸</button></div>' +
      '<div id="fl-panel-body" class="fl-tool-body fl-tool-hidden">' +
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
      '<div id="fl-rel-wrap"><hr class="life-hr">' +
      '<div class="life-subhead" id="fl-rel-toggle"><span>' + t("relSettings") + '</span><span id="fl-rel-chevron">▸</span></div>' +
      '<div id="fl-rel-body" class="fl-tool-hidden"><div class="life-hint">' + t("relHint") + "</div>" +
      switchHtml("fl-rel-follow", t("relNone"), s.relFollow) +
      switchHtml("fl-rel-following", t("relFollowing"), s.relFollowing) +
      switchHtml("fl-rel-followsyu", t("relFollowsYou"), s.relFollowsYou) +
      switchHtml("fl-rel-friends", t("relFriends"), s.relFriends) + "</div></div></div>";
        ensureDock().insertBefore(panel, ensureDock().firstChild);
    bindPanelHeader("fl-panel-header", "fl-panel-body", "fl-panel-toggle", "fl-filter-panel");
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
        if (!toggle || toggle.dataset.collapseBound) return;
        toggle.dataset.collapseBound = "1";
        toggle.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return;
          e.stopPropagation();
          const body = document.getElementById(item.body);
          const opening = body && body.classList.contains("fl-tool-hidden");
          items.forEach((other) => setOpen(other, opening && other.body === item.body));
        });
      });
    }
    bindSubmenuGroup([
      { toggle: "fl-rel-toggle", body: "fl-rel-body", chevron: "fl-rel-chevron" }
    ]);

    ["fl-combine-mode", "fl-match-scope", "fl-role-mode"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", autoApplyFilters);
    });
    ["fl-genders", "fl-roles", "fl-limits"].forEach(bindChipField);
    bindPresetButtons();
    ["fl-min-age", "fl-max-age"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("change", autoApplyFilters);
      el.addEventListener("input", () => {
      if (flBasicShouldYield()) return;
        clearTimeout(el._t);
        el._t = setTimeout(autoApplyFilters, 400);
      });
    });
    ["fl-rel-follow", "fl-rel-following", "fl-rel-followsyu", "fl-rel-friends"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", autoApplyFilters);
    });
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
    box.innerHTML =
      '<div class="fl-tool-header" id="fl-advanced-header"><div class="fl-tool-title">' + t("advancedSettings") +
      '</div><button type="button" id="fl-advanced-toggle" class="fl-tool-chevron" aria-expanded="false" aria-label="Expand panel">▸</button></div>' +
      '<div id="fl-advanced-body" class="fl-tool-body fl-tool-hidden">' +
      switchHtml("fl-auto-scroll", t("infiniteScroll"), s.autoScroll) +
      switchHtml("fl-show-toasts", t("showToasts"), s.showToasts !== false) +
      switchHtml("fl-show-seen-chip", t("showSeenChip"), showSeenChipEnabled(s)) +
      '<button type="button" id="fl-reset-seen" class="life-btn life-btn-gray">' + t("seenReset") + "</button>" +
      '<div class="life-hint">' + t("seenResetHint") + "</div>" +
      switchHtml("fl-hide-banners", t("hideBanners"), !!s.hideBanners) +
      '<hr class="life-hr">' +
      '<button type="button" id="fl-factory-reset" class="life-btn life-btn-red">' + t("factoryReset") + "</button>" +
      '<div class="life-hint">' + t("factoryResetHint") + "</div>" +
      '<div id="fl-factory-reset-prompt" class="life-alert-strong fl-prompt-danger" hidden></div>' +
      "</div>";
    mountDockSection(box, "fl-advanced-panel");
    bindPanelHeader("fl-advanced-header", "fl-advanced-body", "fl-advanced-toggle", "fl-advanced-panel");

    const applyAdv = () => {
      const next = getCurrentFilterSettings();
      next.showSeenChip = checked("fl-show-seen-chip");
      next.dimSeenToday = next.showSeenChip;
      saveFilterSettings(next);
      applyFilter(next);
      applySeenChips(next);
    };
    ["fl-auto-scroll", "fl-show-toasts", "fl-show-seen-chip", "fl-hide-banners"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", applyAdv);
    });
    const seenChipEl = document.getElementById("fl-show-seen-chip");
    if (seenChipEl) seenChipEl.addEventListener("change", () => applySeenChips(getCurrentFilterSettings()));
    const resetSeenBtn = document.getElementById("fl-reset-seen");
    if (resetSeenBtn) resetSeenBtn.addEventListener("click", (e) => {
      if (flBasicShouldYield()) return; e.preventDefault(); resetSeen(); });
    bindFactoryReset();
    setupInfiniteScroll();
  }


  /* BEGIN generated:menu-footer */
  /* Shared menu footer. Author: TypicalBits. */
  var FLMenuFooter = {
    mount({ dock, row, jump, edition, version, studioLive, diagnostics }) {
      if (row.querySelector('.fl-menu-footer')) return;
      const footer = document.createElement('div');
      footer.className = 'fl-menu-footer';
      const release = document.createElement('a');
      release.textContent = edition[0].toUpperCase() + edition.slice(1) + ' ' + version;
      release.href = 'https://github.com/Typical-Bits/fl-tools-' + edition + '/releases/tag/v' + version;
      release.target = '_blank'; release.rel = 'noopener noreferrer'; release.title = 'Release notes';
      const active = document.createElement('span');
      active.className = 'fl-footer-active';
      const info = document.createElement('button');
      info.type = 'button'; info.title = 'Diagnostics';
      info.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h4l3-7 4 14 3-7h4"/></svg>';
      info.setAttribute('aria-label', 'Open troubleshooting diagnostics');
      info.addEventListener('click', e => { e.stopPropagation(); diagnostics(); });
      footer.append(release, active, info); row.prepend(footer);
      const scrollAreas = () => [dock, ...dock.querySelectorAll('.fl-tool-body,#flhp-main')].filter(el =>
        el.getClientRects().length && /auto|scroll/.test(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight + 2);
      const update = () => {
        if (!dock.isConnected) { clearInterval(timer); return; }
        const label = studioLive() ? ' · Studio active · ' : ' · ';
        if (active.textContent !== label) active.textContent = label;
        const hidden = scrollAreas().length === 0;
        if (jump.hidden !== hidden) jump.hidden = hidden;
      };
      // Scroll the menu itself; preserve the page's position.
      jump.addEventListener('click', e => {
        e.stopImmediatePropagation();
        scrollAreas().forEach(el => el.scrollTo({top:0, behavior:'smooth'}));
      }, true);
      dock.addEventListener('click', () => requestAnimationFrame(update));
      dock.addEventListener('input', () => requestAnimationFrame(update));
      const observer = new ResizeObserver(update); observer.observe(dock);
      const timer = setInterval(() => { if (!dock.isConnected) observer.disconnect(); update(); }, 1500);
      update();
    }
  };
  /* END generated:menu-footer */
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
      if (flBasicShouldYield()) return;
        e.stopPropagation();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    if (jump.parentNode !== row) row.appendChild(jump);
    else jump.textContent = t("jumpTop");
    if (row.parentNode === dock) dock.appendChild(row);
    buildShortcutsPanel();
    nestDockSections();
  }

  function syncDockPanelTitles() {
    const map = {
      "fl-block-header": "blockPanel",
      "fl-panel-header": "profileSettings",
      "fl-site-header": "nsfwPanel",
      "fl-advanced-header": "advancedSettings",
      "fl-shortcuts-header": "shortcuts",
      "fl-system-header": "systemPanel"
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
      '<div class="flhp-legend-row"><strong>F</strong> — Filters Menu</div>' +
      '<div class="flhp-legend-row"><strong>N</strong> — next unread</div>' +
      '<div class="flhp-legend-row"><strong>T</strong> — jump to top</div>' +
      '<div class="flhp-legend-row">Rebinding lives in Pro.</div>' +
      "</div>";
    if (!box) {
      box = document.createElement("div");
      box.id = "fl-shortcuts-panel";
      box.className = "fl-tool-panel";
      box.innerHTML =
        '<div class="fl-tool-header" id="fl-shortcuts-header"><div class="fl-tool-title">' + t("shortcuts") +
        '</div><button type="button" id="fl-shortcuts-toggle" class="fl-tool-chevron" aria-expanded="false" aria-label="Expand panel">▸</button></div>' +
        '<div id="fl-shortcuts-body" class="fl-tool-body fl-tool-hidden">' + legendHtml + "</div>";
      mountDockSection(box, "fl-shortcuts-panel");
      bindPanelHeader("fl-shortcuts-header", "fl-shortcuts-body", "fl-shortcuts-toggle", "fl-shortcuts-panel");
    } else {
      bindPanelHeader("fl-shortcuts-header", "fl-shortcuts-body", "fl-shortcuts-toggle", "fl-shortcuts-panel");
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
    if (flBasicShouldYield()) return;
    try {
      try { FLStorage.remove("fl_filter_presets"); } catch (_) {}
      ensureDock(); flInstallUiEnhancements(); ensurePanelSearch(); buildFilterPanel(); applyDisplayMode(loadDisplaySettings().mode); buildSitePanel(); buildAdvancedPanel(); ensureBlockPanel(); buildJumpPanel(); nestDockSections(); syncDockPanelTitles(); restoreLastDockPanel(); bindAllPanelHeaders();
     
      applyFilter(getCurrentFilterSettings()); applyExtras(); setupKeyboard();
      setupHomeScrollRestore(); setupThemeSync();
      if (isProfileHome()) scheduleExcludeBlur();
      schedulePageTweaks();
    } catch (err) { console.error("FL_Tools boot error:", err); }
  }
  let debounce = null;
  function schedule() {
    if (flBasicShouldYield()) return;
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(function () {
      if (flBasicShouldYield()) return;
      try {
        ensureDock(); buildFilterPanel(); applyDisplayMode(loadDisplaySettings().mode); buildSitePanel(); buildAdvancedPanel(); ensureBlockPanel(); buildJumpPanel(); nestDockSections(); syncDockPanelTitles(); restoreLastDockPanel(); bindAllPanelHeaders();
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
    }, Math.max(80, Math.min(1000, Number(flLoadPerf().scanDelay) || 120)));
  }

  function isPrivatePageTweaks() {
    try { return sessionStorage.getItem("fl_private_session") === "1"; } catch (_) { return false; }
  }
  function loadOwnKinks() {
    try {
      const key = (typeof FLPageTweaks !== "undefined" && FLPageTweaks.OWN_KINKS_KEY) || "fl_own_kinks";
      const raw = FLStorage.get(key) || [];
      return Array.isArray(raw) ? raw.map((n) => String(n || "").trim()).filter(Boolean) : [];
    } catch (_) { return []; }
  }
  function saveOwnKinks(names) {
    if (isPrivatePageTweaks()) return;
    try {
      const key = (typeof FLPageTweaks !== "undefined" && FLPageTweaks.OWN_KINKS_KEY) || "fl_own_kinks";
      FLStorage.set(key, (names || []).map((n) => String(n || "").trim()).filter(Boolean).slice(0, 400));
    } catch (_) {}
  }
  function pageTweaksYield() {
    return FL_EDITION === "basic" && typeof flLiveProActive === "function" && flLiveProActive();
  }
  let pageTweaksTimer = null;
  function runPageTweaks() {
    if (pageTweaksYield() || typeof FLPageTweaks === "undefined" || typeof FLPageTweaks.tick !== "function") return;
    FLPageTweaks.tick({
      document: document,
      visitMap: loadVisitMap(),
      isProfileHome: isProfileHome(),
      isListPage: isListPage(),
      ownNick: currentUserNick(),
      profileNick: String(profileNickname() || "").toLowerCase(),
      saveOwnKinks: saveOwnKinks,
      ownKinks: loadOwnKinks()
    });
  }
  function schedulePageTweaks() {
    if (pageTweaksYield()) return;
    if (pageTweaksTimer) clearTimeout(pageTweaksTimer);
    pageTweaksTimer = setTimeout(function () {
      pageTweaksTimer = null;
      runPageTweaks();
    }, 180);
  }
  function bindPageTweaks() {
    if (bindPageTweaks.done) return;
    bindPageTweaks.done = true;
    schedulePageTweaks();
  }

  function bindCandidateScanner() {
    if (bindCandidateScanner.done) return;
    bindCandidateScanner.done = true;
    flCandidateScanner.register("feed", function onFeedCandidates() {
      if (flBasicShouldYield()) return;
      const settings = document.getElementById("fl-filter-panel") ? getCurrentFilterSettings() : loadFilterSettings();
      applyFilter(settings);
      applySeenChips(settings);
      applyFeedFilter(settings);
      enhanceFeedStoryActions();
      schedulePageTweaks();
    }, { id: "feed", modules: ["filters", "seen"] });
    flCandidateScanner.register("profile", function onProfileCandidates() {
      if (flBasicShouldYield()) return;
      const settings = document.getElementById("fl-filter-panel") ? getCurrentFilterSettings() : loadFilterSettings();
      applyFilter(settings);
      applySeenChips(settings);
      enhanceMemberCardActions();
      schedulePageTweaks();
    }, { id: "profile", modules: ["filters", "seen"] });
  }

  function ingestAddedNodes(mutations) {
    if (flBasicShouldYield()) return;
    const ctx = { isComment: isCommentRelatedNode };
    let dockTouched = false;
    const found = [];
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes || []) {
        if (node.nodeType !== 1 && node.nodeType !== 3) continue;
        if (FLScanner.isIgnored(node, ctx)) continue;
        if (node.nodeType === 1) {
          const id = node.id || "";
          if (id.indexOf("relation_button") === 0 || (node.closest && node.closest("turbo-frame[id^='relation_button']"))) {
            applyFilter(getCurrentFilterSettings());
            return;
          }
          if (isProfileHome()) {
            if (!dockTouched) { dockTouched = true; ensureDock(); }
            scheduleExcludeBlur();
            continue;
          }
          if (isMediaPage()) {
            if (!dockTouched) { dockTouched = true; ensureDock(); }
            continue;
          }
        }
        FLScanner.collect(node, ctx).forEach((item) => found.push(item));
      }
    }
    if (found.length) flCandidateScanner.queue(found);
    schedulePageTweaks();
  }

  function start() {
    setupSwitchAriaSync();
    /* Page-world single-flight. Yield only for a live Pro instance. */
    try {
      if (flBasicShouldYield()) return;
      const page = flPageRoot();
      if (page.__FL_TOOLS_BOOTED__ === "basic" && document.getElementById("fl-tools-dock")) return;
      flClaimBasic();
      page.__FL_TOOLS_BOOTED__ = "basic";
    } catch (_) {}
    /* Another Basic already built the dock — do not double-boot. */
    if (document.getElementById("fl-tools-dock")) return;
    setupStudioActions();
    try { ensureDock(); flInstallUiEnhancements(); buildFilterPanel(); applyDisplayMode(loadDisplaySettings().mode); buildSitePanel(); buildAdvancedPanel(); ensureBlockPanel(); buildJumpPanel(); nestDockSections(); syncDockPanelTitles(); restoreLastDockPanel(); bindAllPanelHeaders(); } catch (err) { console.error(err); }
    boot();
    setTimeout(boot, 800);
    setTimeout(boot, 2500);
    bindCandidateScanner();
    bindPageTweaks();
    /* Classify added nodes, then run only the modules that own that kind. */
    new MutationObserver(ingestAddedNodes).observe(document.body || document.documentElement, { childList: true, subtree: true });
    document.addEventListener("turbo:load", () => {
      if (flBasicShouldYield()) return;
      if (flBasicShouldYield()) return;
      resetExcludeBlurPathState();
      schedule();
      schedulePageTweaks();
      ensurePanelSearch();
      applyThemeSync();
      scheduleMarkupSelfCheck();
    });
    document.addEventListener("turbo:frame-load", (e) => {
      if (flBasicShouldYield()) return;
      if (flBasicShouldYield()) return;
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
