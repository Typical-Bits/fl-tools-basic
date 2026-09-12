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
  const TOP_KEY = "fl_settings_launcher_top";
  const PRIORITY = Object.freeze({ studio: 100, vault: 200, basic: 300, pro: 400 });
  const GRID = Object.freeze({
    columns: 4,
    rows: 2,
    gap: 12,
    edge: 12,
    minEdge: 8,
    slots: Object.freeze({
      "fl-vault-launcher": Object.freeze({ row: 0, column: 3 }),
      "fl-studio-launcher": Object.freeze({ row: 1, column: 1 }),
      "fl-settings-launcher": Object.freeze({ row: 1, column: 2 })
    })
  });
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
    if (provider === "basic") {
      if (current !== "basic") {
        html.setAttribute(OWNER_ATTR, "basic");
        emit("userscript-launcher:grid-owner", { protocol: PROTOCOL, owner: "basic" });
      }
      return true;
    }
    if (!current) {
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

  function slotFor(node) {
    if (!node) return null;
    if (node.id && GRID.slots[node.id]) return GRID.slots[node.id];
    const id = node.dataset?.launcherId;
    if (id === "fl-tools-vault") return GRID.slots["fl-vault-launcher"];
    if (id === "fl-tools-studio") return GRID.slots["fl-studio-launcher"];
    if (id === "fl-tools-basic" || id === "fl-tools-pro") return GRID.slots["fl-settings-launcher"];
    return null;
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
    const assignments = new Map();
    const used = new Set();
    const ordered = Array.from(nodes || []).sort(compareNodes);
    ordered.filter(node => !!slotFor(node)).forEach(node => {
      const slot = slotFor(node);
      const key = `${slot.row}:${slot.column}`;
      if (!used.has(key)) {
        assignments.set(node, slot);
        used.add(key);
      }
    });
    const available = [];
    for (let row = 0; row < GRID.rows; row += 1) {
      for (let column = 0; column < GRID.columns; column += 1) {
        if (!used.has(`${row}:${column}`)) available.push({ row, column });
      }
    }
    ordered.filter(node => !assignments.has(node) && !slotFor(node)).forEach(node => {
      const slot = available.shift();
      if (slot) assignments.set(node, slot);
    });
    return assignments;
  }

  function readTop(fallback) {
    try {
      const value = Number.parseFloat(win.localStorage?.getItem(TOP_KEY));
      return Number.isFinite(value) ? value : fallback;
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

  function dimensions(nodes) {
    return Math.max(48, ...Array.from(nodes || []).flatMap(node => [Number(node.offsetWidth) || 0, Number(node.offsetHeight) || 0]));
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
    const panelWidth = Number(panel.offsetWidth) || 320;
    const panelHeight = Number(panel.offsetHeight) || 280;
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
  let drag = null;
  const yielded = new WeakMap();
  const yieldedNodes = new Set();
  const bound = new WeakSet();
  const observed = new WeakSet();
  const sizeObservers = [];

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
      const current = layout();
      const gridHeight = current ? current.rows * current.size + (current.rows - 1) * current.gap : 48 * 2 + GRID.gap;
      const maxTop = Math.max(GRID.minEdge, win.innerHeight - gridHeight - GRID.minEdge);
      setTop(clamp(drag.startTop + delta, GRID.minEdge, maxTop));
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

  function observeSize(node) {
    if (observed.has(node) || typeof win.ResizeObserver !== "function") return;
    observed.add(node);
    const observer = new win.ResizeObserver(schedule);
    observer.observe(node);
    sizeObservers.push(observer);
  }

  function layout() {
    if (!ownsGrid()) return null;
    const state = selectedNodes();
    const list = state.selected;
    if (!list.length) return null;
    const size = dimensions(list);
    const gridHeight = GRID.rows * size + (GRID.rows - 1) * GRID.gap;
    const maxTop = Math.max(GRID.minEdge, win.innerHeight - gridHeight - GRID.minEdge);
    const defaultTop = Math.max(GRID.minEdge, win.innerHeight - gridHeight - GRID.minEdge);
    const top = clamp(readTop(defaultTop), GRID.minEdge, maxTop);
    const assignments = assignSlots(list);
    list.forEach(node => {
      const slot = assignments.get(node);
      if (!slot) {
        yieldNode(node);
        return;
      }
      restoreYielded(node);
      const right = GRID.edge + (GRID.columns - 1 - slot.column) * (size + GRID.gap);
      node.style.setProperty("position", "fixed", "important");
      node.style.setProperty("right", `${right}px`, "important");
      node.style.setProperty("left", "auto", "important");
      node.style.setProperty("top", `${top + slot.row * (size + GRID.gap)}px`, "important");
      node.style.setProperty("bottom", "auto", "important");
      node.dataset.launcherGridManaged = "true";
      node.dataset.launcherGridRow = String(slot.row);
      node.dataset.launcherGridColumn = String(slot.column);
      bind(node);
      observeSize(node);
    });
    doc.documentElement.dataset.flLauncherGridTop = String(Math.round(top));
    doc.documentElement.dataset.flLauncherGridWidth = String(GRID.columns * size + (GRID.columns - 1) * GRID.gap);
    doc.documentElement.dataset.flLauncherGridHeight = String(gridHeight);
    return { top, size, gap: GRID.gap, columns: GRID.columns, rows: GRID.rows, nodes: list.slice() };
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
