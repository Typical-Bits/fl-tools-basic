/* FL Tools edition handoff. Hosted on Typical-Bits/fl-tools-basic.
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
        "try{window.dispatchEvent(new CustomEvent('fltools:edition-changed',{detail:{edition:live?'pro':'off'}}));}catch(e){}";
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
