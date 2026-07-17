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
      coverImg: 'assets/blog-ai-coding-cover.png',
    },
    {
      slug: 'a-decade-of-moving',
      title: 'What Ten Years of Moving Countries Taught Me About Career Growth',
      excerpt: 'From an internship in Hyderabad to a cloud migration project in Wilmington \u2014 a few honest reflections on restarting, again and again.',
      tag: 'Personal',
      hue: 340,
      date: 'Jun 2026',
      readTime: '5 min read',
      coverImg: 'assets/blog-post-cover.png',
    },
    {
      slug: 'ai-agents-reshaping-tech',
      title: 'How AI Agents Are Reshaping Programming and Technology Automation',
      excerpt: 'From autocomplete to owning whole workflows: what changes when agents start making judgment calls instead of just suggesting code.',
      tag: 'Tech',
      hue: 200,
      date: 'Jul 2026',
      readTime: '6 min read',
      coverImg: 'assets/blog-ai-agents-cover.png',
    },
  ];

  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  let activeTag = 'All';
  let query = '';

  function render() {
    const tags = ['All', ...Array.from(new Set(postData.map((p) => p.tag)))];
    const tagsEl = document.getElementById('bl-tags');
    tagsEl.innerHTML = tags.map((t) => `
      <button data-tag="${esc(t)}" style="font-size: 14px; font-weight: 600; padding: 9px 18px; border-radius: 20px; border: none; cursor: pointer; background: ${t === activeTag ? '#2c46c9' : 'rgba(44,70,201,0.08)'}; color: ${t === activeTag ? '#ffffff' : '#3d4356'}; transition: background 0.15s, color 0.15s;">${esc(t)}</button>
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
    const grid = document.getElementById('bl-grid');
    grid.innerHTML = filtered.map((p) => {
      const tagColor = `oklch(30% 0.16 ${p.hue})`;
      const tagBg = `oklch(52% 0.16 ${p.hue} / 0.14)`;
      const href = `/blog/${p.slug}`;
      return `
        <div style="display: flex; flex-direction: column; gap: 16px; background: #ffffff; border: 1px solid #e6e8f0; border-radius: 16px; padding: 28px;">
          <div style="width: 100%; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; background: linear-gradient(155deg, oklch(55% 0.15 ${p.hue}) 0%, oklch(42% 0.15 ${p.hue}) 100%);">
            <img src="${p.coverImg}" alt="${esc(p.title)}" style="width:100%;height:100%;object-fit:cover;display:block;" />
          </div>
          <span style="align-self: flex-start; font-size: 12px; font-weight: 600; color: ${tagColor}; background: ${tagBg}; padding: 5px 12px; border-radius: 16px;">${esc(p.tag)}</span>
          <a href="${href}" style="font-size: 20px; font-weight: 700; color: #1c2030; line-height: 1.35;">${esc(p.title)}</a>
          <div style="font-size: 15px; color: #7a8199; line-height: 1.7;">${esc(p.excerpt)}</div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="font-size: 13px; color: #9096a8;">${esc(p.date)} &middot; ${esc(p.readTime)}</div>
            <a href="${href}" style="display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: #3654e0;">
              Read
              <svg width="14" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6h13M9 1l5 5-5 5" stroke="#3654e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  function init() {
    const heroCanvas = document.getElementById('hero-icosa-canvas');
    if (heroCanvas && window.createIcosaScene) window.createIcosaScene(heroCanvas, 0.25);
    document.getElementById('bl-search').addEventListener('input', (e) => { query = e.target.value; render(); });
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
