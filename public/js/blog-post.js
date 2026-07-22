(function () {
  const SCRIPT_SRC = document.currentScript.src;
  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function init() {
    const slug = document.body.getAttribute('data-slug');
    const p = window.BLOG_POSTS[slug];
    if (!p) return;

    document.title = p.title + ' — Vishal Dasari';

    document.getElementById('bp-tag').textContent = p.tag;
    document.getElementById('bp-title').textContent = p.title;
    document.getElementById('bp-meta').textContent = `${p.date} \u00b7 ${p.readTime}`;
    const heroCanvas = document.getElementById('hero-icosa-canvas');
    if (heroCanvas && window.createIcosaScene) window.createIcosaScene(heroCanvas, 0.4);
    const scriptSrc = SCRIPT_SRC;
    const publicRoot = new URL('../', scriptSrc); // public/js/ -> public/
    const coverEl = document.getElementById('bp-cover');
    if (coverEl && coverEl.tagName === 'IMG') {
      coverEl.src = new URL(p.coverImg, publicRoot).href;
      coverEl.alt = p.title;
    }
    document.getElementById('bp-body').innerHTML = p.paragraphs.map((para, i) =>
      i === 0
        ? `<div class="bp-lead" style="font-size: 19.5px; color: #2b3050; line-height: 1.8; font-weight: 500;">${esc(para)}</div>`
        : `<div style="font-size: 17px; color: #4a5069; line-height: 1.85;">${esc(para)}</div>`
    ).join('');

    const bar = document.getElementById('bp-progress');
    if (bar) {
      const article = document.getElementById('bp-content');
      const onScroll = () => {
        const total = article.offsetHeight - window.innerHeight * 0.6;
        const p = Math.min(1, Math.max(0, window.scrollY / Math.max(1, total)));
        bar.style.transform = `scaleX(${p})`;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
