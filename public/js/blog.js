(function () {
  const postData = [
    {
      slug: 'ai-in-2026',
      title: 'What Coding With AI Agents Actually Looks Like in 2026',
      excerpt: 'A year ago I was still reviewing every line. Now most of my day is spent deciding what to build, not typing it out. Here\u2019s what actually changed on my team.',
      tag: 'Tech',
      hue: 264,
      date: 'Jul 2026',
      readTime: '6 min read',
      coverImg: '../assets/blog-ai-coding-cover.jpg',
    },
    {
      slug: 'a-decade-of-moving',
      title: 'What Ten Years of Moving Countries Taught Me About Career Growth',
      excerpt: 'From an internship in Hyderabad to a cloud migration project in Wilmington \u2014 a few honest reflections on restarting, again and again.',
      tag: 'Personal',
      hue: 340,
      date: 'Jun 2026',
      readTime: '5 min read',
      coverImg: '../assets/blog-post-cover.jpg',
    },
    {
      slug: 'ai-agents-reshaping-tech',
      title: 'How AI Agents Are Reshaping Programming and Technology Automation',
      excerpt: 'From autocomplete to owning whole workflows: what changes when agents start making judgment calls instead of just suggesting code.',
      tag: 'Tech',
      hue: 200,
      date: 'Jul 2026',
      readTime: '6 min read',
      coverImg: '../assets/blog-ai-agents-cover.jpg',
    },
  ];

  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  let activeTag = 'All';
  let query = '';

  function render() {
    const tags = ['All', ...Array.from(new Set(postData.map((p) => p.tag)))];
    const cnt = document.getElementById('bl-stat-count');
    if (cnt) cnt.textContent = String(postData.length).padStart(2, '0');
    const tcnt = document.getElementById('bl-stat-tags');
    if (tcnt) tcnt.textContent = String(tags.length - 1).padStart(2, '0');
    const tagsEl = document.getElementById('bl-tags');
    tagsEl.innerHTML = tags.map((t) => `
      <button data-tag="${esc(t)}" style="font-size: 12.5px; font-weight: 600; padding: 7px 15px; border-radius: 20px; cursor: pointer; background: ${t === activeTag ? '#2c46c9' : 'transparent'}; color: ${t === activeTag ? '#ffffff' : '#5b6178'}; border: 1px solid ${t === activeTag ? '#2c46c9' : 'rgba(28,32,48,0.14)'}; transition: background 0.15s, color 0.15s, border-color 0.15s;">${esc(t)}</button>
    `).join('');
    tagsEl.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => { activeTag = btn.getAttribute('data-tag'); render(); });
    });

    const tagFiltered = activeTag === 'All' ? postData : postData.filter((p) => p.tag === activeTag);
    const q = query.trim().toLowerCase();
    const filtered = !q ? tagFiltered : tagFiltered.filter((p) =>
      p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q)
    );

    document.getElementById('bl-empty').style.display = filtered.length === 0 ? 'flex' : 'none';
    const featEl = document.getElementById('bl-featured');
    const grid = document.getElementById('bl-grid');
    const cardHtml = (p, i, featured) => {
      const tagColor = `oklch(30% 0.16 ${p.hue})`;
      const href = `/blog/${p.slug}`;
      const img = `<div class="${featured ? 'bl-fimg' : ''}" style="${featured ? 'width: 46%; flex-shrink: 0;' : 'width: 100%;'} aspect-ratio: 16/9; border-radius: 14px; overflow: hidden; background: linear-gradient(155deg, oklch(55% 0.15 ${p.hue}) 0%, oklch(42% 0.15 ${p.hue}) 100%);">
          <img src="${p.coverImg}" alt="${esc(p.title)}" style="width:100%;height:100%;object-fit:cover;display:block;" />
        </div>`;
      const body = `<div style="display: flex; flex-direction: column; gap: 12px; flex: 1; min-width: 0; ${featured ? 'justify-content: center; padding: 8px 12px 8px 0;' : ''}">
          <div style="display: flex; align-items: center; gap: 10px;">
            ${featured ? '<span style="font-size: 11px; font-weight: 700; color: #3654e0; letter-spacing: 1.4px; text-transform: uppercase;">Latest</span><span style="width: 24px; height: 1px; background: rgba(28,32,48,0.2);"></span>' : ''}
            <span style="font-size: 11.5px; font-weight: 600; color: ${tagColor}; letter-spacing: 1.2px; text-transform: uppercase;">${esc(p.tag)}</span>
            <span style="font-size: 12px; color: #9096a8;">${esc(p.date)} &middot; ${esc(p.readTime)}</span>
          </div>
          <a href="${href}" style="font-size: ${featured ? '24px' : '18.5px'}; font-weight: ${featured ? '700' : '600'}; color: #14162b; line-height: 1.35; letter-spacing: -0.3px; text-wrap: pretty;">${esc(p.title)}</a>
          <div style="font-size: ${featured ? '14.5px' : '13.5px'}; color: #7a8199; line-height: 1.7;">${esc(p.excerpt)}</div>
          <a href="${href}" class="bl-arrow" style="display: inline-flex; align-items: center; gap: 7px; font-size: 13.5px; font-weight: 600; color: #3654e0; margin-top: auto; padding-top: 4px;">
            Read article
            <svg width="14" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6h13M9 1l5 5-5 5" stroke="#3654e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>`;
      const num = `<div style="position: absolute; top: ${featured ? '20px' : '14px'}; right: 22px; font-family: 'Syne', sans-serif; font-size: 40px; font-weight: 800; color: rgba(28,32,48,0.05); line-height: 1; letter-spacing: -2px; pointer-events: none; user-select: none; z-index: 1;">${String(i + 1).padStart(2, '0')}</div>`;
      return `<div class="bl-card">${num}${img}${body}</div>`;
    };
    const isDefault = activeTag === 'All' && !q;
    featEl.innerHTML = isDefault && filtered.length > 1 ? cardHtml(filtered[0], 0, true) : '';
    const rest = isDefault && filtered.length > 1 ? filtered.slice(1) : filtered;
    grid.innerHTML = rest.map((p, i) => cardHtml(p, isDefault && filtered.length > 1 ? i + 1 : i, false)).join('');
  }

  function init() {
    const heroCanvas = document.getElementById('hero-icosa-canvas');
    if (heroCanvas && window.createIcosaScene) window.createIcosaScene(heroCanvas, 0.32);
    document.getElementById('bl-search').addEventListener('input', (e) => { query = e.target.value; render(); });
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
