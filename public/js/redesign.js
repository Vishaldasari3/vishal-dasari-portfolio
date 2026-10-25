/* Shared navigation and presentation interactions. Service APIs remain unchanged. */
(function () {
  'use strict';
  const data = window.VD_DATA;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function initNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;
    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    }
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 821px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
  }

  function initProjects() {
    const dialog = document.getElementById('project-dialog');
    if (!dialog) return;
    let trigger;
    document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
      const project = data.projects[Number(button.dataset.project)];
      if (!project) return;
      trigger = button;
      document.getElementById('project-dialog-title').textContent = project.title;
      document.getElementById('project-dialog-tags').innerHTML = '<div class="chips">' + project.tags.map(t => '<span>' + esc(t) + '</span>').join('') + '</div>';
      document.getElementById('project-dialog-details').innerHTML = project.details.map(t => '<li>' + esc(t) + '</li>').join('');
      dialog.showModal();
      document.documentElement.classList.add('dialog-open');
    }));
    dialog.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', e => {
      const rect = dialog.getBoundingClientRect();
      if (e.target === dialog && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => { document.documentElement.classList.remove('dialog-open'); if (trigger) trigger.focus(); });
  }

  function initStack() {
    const buttons = document.querySelectorAll('[data-stack-view]');
    if (!buttons.length) return;
    let loading = false;
    buttons.forEach(button => button.addEventListener('click', () => {
      const playground = button.dataset.stackView === 'playground';
      document.getElementById('stack-list').hidden = playground;
      document.getElementById('stack-playground').hidden = !playground;
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      if (playground && !loading) {
        loading = true;
        const script = document.createElement('script');
        script.src = '/js/tech-stack.js';
        script.onerror = () => { loading = false; document.getElementById('playground-status').textContent = 'The playground could not load. The full tool list is available in List view.'; };
        document.body.appendChild(script);
      }
    }));
  }

  function initJournal() {
    const grid = document.getElementById('journal-grid');
    if (!grid) return;
    const input = document.getElementById('journal-search');
    const filters = document.getElementById('journal-filters');
    const status = document.getElementById('journal-status');
    let tag = 'All', posts = [], loaded = false;
    const entrance = document.getElementById('journal-entrance');
    const list = document.getElementById('journal-list');
    let category = '';
    const inCategory = p => p.category === category;
    function routeJournal() {
      category = ['tech', 'personal'].includes(location.hash.slice(1)) ? location.hash.slice(1) : '';
      entrance.hidden = !!category;
      list.hidden = !category;
      tag = 'All'; input.value = '';
      document.getElementById('journal-category').textContent = category === 'tech' ? '01 / Tech notes' : '02 / Personal life';
      document.getElementById('journal-list-title').textContent = category === 'tech' ? 'Inside the build.' : 'Beyond the screen.';
      render();
      if (category) document.getElementById('journal-list-title').focus({preventScroll:true});
    }
    window.addEventListener('hashchange', routeJournal);
    function render() {
      const tags = ['All', ...new Set(posts.filter(inCategory).map(p => p.tag))];
      filters.innerHTML = tags.map(t => `<button type="button" data-tag="${esc(t)}" aria-pressed="${t === tag}">${esc(t)}</button>`).join('');
      const query = input.value.trim().toLowerCase();
      const filtered = posts.filter(p => inCategory(p) && (tag === 'All' || p.tag === tag) && (!query || (p.title + ' ' + p.excerpt + ' ' + p.tag).toLowerCase().includes(query)));
      const featured = tag === 'All' && !query && filtered.length > 1;
      grid.innerHTML = filtered.map((p, i) => `<article class="journal-card ${featured && i === 0 ? 'featured' : ''}"><a href="/blog/${esc(p.slug)}" aria-label="Read ${esc(p.title)}"><img src="${esc(p.coverImg)}" alt="" width="800" height="500" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async"></a><div class="journal-card-body"><div class="journal-meta"><span class="journal-tag">${esc(p.tag)}</span><span>${esc(p.date)} · ${esc(p.readTime)}</span></div><h2><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a></h2><p>${esc(p.excerpt)}</p><a class="text-link" href="/blog/${esc(p.slug)}">Read the note <span aria-hidden="true">↗</span><span class="sr-only">: ${esc(p.title)}</span></a></div></article>`).join('');
      status.textContent = `${filtered.length} ${filtered.length === 1 ? 'note' : 'notes'}${tag === 'All' ? (category === 'tech' ? ' about technology' : ' about life') : ' in ' + tag}${query ? ' matching “' + input.value.trim() + '”' : ''}`;
      document.getElementById('journal-empty').hidden = !loaded || filtered.length !== 0;
    }
    filters.addEventListener('click', e => {
      const button = e.target.closest('[data-tag]');
      if (!button) return;
      tag = button.dataset.tag;
      render();
      filters.querySelectorAll('button').forEach(b => { if (b.dataset.tag === tag) b.focus(); });
    });
    input.addEventListener('input', render);
    document.getElementById('journal-reset').addEventListener('click', () => { tag = 'All'; input.value = ''; render(); input.focus(); });
    routeJournal();
    fetch('/api/posts-visibility').then(r => { if (!r.ok) throw new Error('visibility unavailable'); return r.json(); }).then(result => {
      if (!Array.isArray(result.hidden)) throw new Error('invalid visibility response');
      posts = data.posts.filter(p => !result.hidden.includes(p.slug));
      loaded = true;
      render();
    }).catch(() => { status.textContent = 'The journal is temporarily unavailable. Please refresh to try again.'; });
  }

  function initContact() {
    const form = document.getElementById('ct-form');
    if (!form) return;
    form.addEventListener('submit', e => { e.preventDefault(); document.getElementById('ct-send').click(); });
    // The existing contact handler controls display; do not leave hidden attributes on its error nodes.
    form.querySelectorAll('[id$="-error"]').forEach(el => { el.hidden = false; el.style.display = 'none'; });
    const fields = ['name','email','subject','message'];
    const errors = fields.map(name => document.getElementById('ct-' + name + '-error'));
    const observer = new MutationObserver(() => fields.forEach((name, i) => {
      document.getElementById('ct-' + name).setAttribute('aria-invalid', String(errors[i].style.display === 'block'));
    }));
    errors.forEach(el => observer.observe(el, {attributes:true,attributeFilter:['style']}));
    document.getElementById('ct-send').addEventListener('click', () => {
      requestAnimationFrame(() => {
        const first = fields.find(name => document.getElementById('ct-' + name).getAttribute('aria-invalid') === 'true');
        if (first) document.getElementById('ct-' + first).focus();
      });
    });
    const copy = document.getElementById('ct-copy-email');
    const copyStatus = document.getElementById('copy-status');
    const copyObserver = new MutationObserver(() => { if (copy.classList.contains('copied')) copyStatus.textContent = 'Email address copied.'; });
    copyObserver.observe(copy, {attributes:true,attributeFilter:['class']});
  }

  function initArticleAccessibility() {
    // Article content is rendered by the retained renderer at DOMContentLoaded.
    requestAnimationFrame(() => {
      document.querySelectorAll('.bp-code-card').forEach(card => {
        card.setAttribute('role','button'); card.tabIndex = 0; card.setAttribute('aria-label','Expand code example'); card.setAttribute('aria-expanded','false');
        card.addEventListener('click', () => card.setAttribute('aria-expanded', String(card.classList.contains('is-open'))));
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
      });
      const slider = document.getElementById('bp-happiness-slider');
      if (slider) slider.setAttribute('aria-label','Balance between material and spiritual happiness');
      const name = document.getElementById('bp-comment-name');
      const comment = document.getElementById('bp-comment-text');
      const honeypot = document.getElementById('bp-comment-hp');
      if (name) name.setAttribute('aria-label','Your name');
      if (comment) comment.setAttribute('aria-label','Your comment');
      if (honeypot) honeypot.setAttribute('aria-hidden','true');
    });
  }

  function init() { initNavigation(); initProjects(); initStack(); initJournal(); initContact(); initArticleAccessibility(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
