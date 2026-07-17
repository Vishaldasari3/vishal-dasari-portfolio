(function () {
  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function init() {
    const slug = document.body.getAttribute('data-slug');
    const p = window.BLOG_POSTS[slug];
    if (!p) return;

    document.title = p.title + ' — Vishal Dasari';

    const heroBg = document.getElementById('bp-hero');
    heroBg.style.background = `linear-gradient(155deg, oklch(55% 0.15 ${p.hue}) 0%, oklch(38% 0.15 ${p.hue}) 100%)`;
    document.getElementById('bp-tag').textContent = p.tag;
    document.getElementById('bp-title').textContent = p.title;
    document.getElementById('bp-meta').textContent = `${p.date} \u00b7 ${p.readTime}`;
    const rootBase = new URL('../', document.currentScript ? document.currentScript.src : location.href);
    document.getElementById('bp-cover').src = new URL(p.coverImg, rootBase).href;
    document.getElementById('bp-cover').alt = p.title;
    document.getElementById('bp-body').innerHTML = p.paragraphs.map((para) =>
      `<div style="font-size: 17px; color: #3d4356; line-height: 1.85;">${esc(para)}</div>`
    ).join('');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
