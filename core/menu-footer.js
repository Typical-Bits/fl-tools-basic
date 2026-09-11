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
