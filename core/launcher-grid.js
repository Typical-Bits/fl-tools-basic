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
