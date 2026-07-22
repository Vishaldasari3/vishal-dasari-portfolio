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
    const subEl = document.getElementById('bp-subtitle');
    if (subEl) subEl.textContent = p.subtitle || '';
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
    const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const headings = [];
    document.getElementById('bp-body').innerHTML = p.content.map((block, i) => {
      if (block.h) {
        const id = slugify(block.h);
        headings.push({ id, text: block.h });
        return `<h2 id="${id}" style="font-size: 21px; font-weight: 700; color: #14162b; letter-spacing: -0.2px; margin: 10px 0 -6px; scroll-margin-top: 100px;">${esc(block.h)}</h2>`;
      }
      if (block.q) return `<blockquote style="margin: 4px 0; padding: 4px 0 4px 20px; border-left: 3px solid #3654e0; font-size: 19px; font-weight: 600; color: #1c2030; line-height: 1.5; font-style: italic;">${esc(block.q)}</blockquote>`;
      if (block.ul) return `<ul style="margin: 0; padding-left: 22px; display: flex; flex-direction: column; gap: 10px;">${block.ul.map((li) => `<li style="font-size: 16.5px; color: #4a5069; line-height: 1.8;">${esc(li)}</li>`).join('')}</ul>`;
      return i === 0
        ? `<div class="bp-lead" style="font-size: 19.5px; color: #2b3050; line-height: 1.8; font-weight: 500;">${esc(block.p)}</div>`
        : `<div style="font-size: 17px; color: #4a5069; line-height: 1.85;">${esc(block.p)}</div>`;
    }).join('');

    const tocBox = document.getElementById('bp-toc');
    const tocList = document.getElementById('bp-toc-list');
    if (tocBox && tocList && headings.length >= 2) {
      tocBox.style.display = 'flex';
      tocList.innerHTML = headings.map((h) =>
        `<a href="#${h.id}" style="font-size: 13px; color: #565c78; line-height: 1.4;">${esc(h.text)}</a>`
      ).join('');
    }

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
