(function () {
  const SCRIPT_SRC = document.currentScript.src;
  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function svg(inner) { return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">${inner}</svg>`; }
  const S = 'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
  const ICON_HOME = svg(`<path d="M3 11 12 3l9 8" ${S}/><path d="M5 10v10h14V10" ${S}/>`);
  const ICON_LEAF = svg(`<path d="M12 3c-4.5 0-8.5 4-8.5 9 0 4 3.2 7.2 8.5 9 5.3-1.8 8.5-5 8.5-9 0-5-4-9-8.5-9z" ${S}/><path d="M12 3v18" ${S}/>`);
  const ICON_BRIEFCASE = svg(`<rect x="2" y="7" width="20" height="14" rx="2" ${S}/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" ${S}/><path d="M2 13h20" ${S}/>`);
  const ICON_GIFT = svg(`<rect x="3" y="9" width="18" height="12" rx="1.5" ${S}/><path d="M3 13h18" ${S}/><path d="M12 9v12" ${S}/><path d="M12 9c0-2.5-2-5-4.5-5S5 6 7 8c1 1 3 1 5 1zM12 9c0-2.5 2-5 4.5-5S19 6 17 8c-1 1-3 1-5 1z" ${S}/>`);
  const ICON_UNLOCK = svg(`<rect x="3" y="11" width="18" height="11" rx="2" ${S}/><path d="M7 11V7a5 5 0 0 1 9.9-1" ${S}/>`);
  const ICON_SHIELD = svg(`<path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5z" ${S}/><path d="m9 12 2 2 4-4" ${S}/>`);
  const ICON_CODE = svg(`<path d="m8 6-6 6 6 6" ${S}/><path d="m16 6 6 6-6 6" ${S}/>`);
  const ICON_CLOCK = svg(`<circle cx="12" cy="12" r="9" ${S}/><path d="M12 7v5l3 3" ${S}/>`);
  const ICON_CHAT = svg(`<path d="M21 11.5c0 4.7-4 8.5-9 8.5a9.4 9.4 0 0 1-3.8-.8L3 21l1.7-4.2A8.4 8.4 0 0 1 3 11.5C3 6.8 7 3 12 3s9 3.8 9 8.5z" ${S}/>`);
  const ICON_ROBOT = svg(`<rect x="5" y="8" width="14" height="10" rx="2" ${S}/><circle cx="9" cy="13" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1.1" fill="currentColor" stroke="none"/><path d="M12 8V4M9 4h6" ${S}/>`);
  const ICON_COMPASS = svg(`<circle cx="12" cy="12" r="9" ${S}/><path d="m14.5 9.5-2 5-5 2 2-5z" ${S}/>`);
  const ICON_PLANE = svg(`<path d="M22 2 15 22l-4-9-9-4z" ${S}/>`);
  const ICON_DOC = svg(`<rect x="5" y="3" width="14" height="18" rx="2" ${S}/><path d="M9 8h6M9 12h6M9 16h4" ${S}/>`);
  const ICON_USERS = svg(`<circle cx="9" cy="8" r="3" ${S}/><path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6" ${S}/><circle cx="17" cy="9" r="2.3" ${S}/><path d="M22 20c0-2.6-2-4.7-4.5-5.4" ${S}/>`);
  const ICON_USER = svg(`<circle cx="12" cy="8" r="4" ${S}/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" ${S}/>`);
  const ICON_SERVER = svg(`<rect x="4" y="4" width="16" height="6" rx="1.5" ${S}/><rect x="4" y="14" width="16" height="6" rx="1.5" ${S}/><circle cx="8" cy="7" r=".6" fill="currentColor" stroke="none"/><circle cx="8" cy="17" r=".6" fill="currentColor" stroke="none"/>`);

  function theme(hue) {
    // fixed light green + actual yellow, no per-post hue drift
    const mk = (hh, s, l) => ({ color: `hsl(${hh},${s}%,${l}%)`, bg: `hsla(${hh},${s}%,${l}%,0.1)`, border: `hsla(${hh},${s}%,${l}%,0.22)`, iconBg: `hsla(${hh},${s}%,${l}%,0.18)` });
    return { A: mk(140, 45, 40), B: mk(48, 90, 50), accent: `hsl(140,45%,40%)`, accent2: `hsl(48,90%,50%)` };
  }

  function splitCard(side) {
    return `<div style="display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; padding: 22px 16px; border-radius: 16px; background: ${side.bg}; border: 1px solid ${side.border}; min-width: 0;">
      <div style="width: 44px; height: 44px; border-radius: 12px; background: ${side.iconBg}; display: flex; align-items: center; justify-content: center; color: ${side.color}; flex-shrink: 0;">${side.icon}</div>
      <div style="font-size: 14.5px; font-weight: 700; color: #14162b; line-height: 1.3; min-height: 2.6em; display: flex; align-items: center;">${esc(side.label)}</div>
      <div style="font-size: 12.5px; color: #63677c; line-height: 1.5;">${esc(side.desc)}</div>
    </div>`;
  }
  function renderSplit(leftDef, rightDef, th) {
    const left = { ...leftDef, ...th.A }, right = { ...rightDef, ...th.B };
    return `<div class="bp-reveal" style="margin: 6px 0;">
      <div class="bp-split-grid" style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center;">
        ${splitCard(left)}
        <div style="font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: #9096a8;">${leftDef.op || '\u2192'}</div>
        ${splitCard(right)}
      </div>
    </div>`;
  }
  function renderPillars(steps, th) {
    const n = steps.length;
    return `<div class="bp-reveal" style="margin: 8px 0 4px;">
      <div class="bp-pillars-row" style="display: flex; align-items: flex-end; justify-content: center; gap: 14px; padding: 24px 4px 0;">
        ${steps.map((s, idx) => {
          const t = idx / Math.max(1, n - 1);
          const col = idx % 2 === 0 ? th.A.color : th.B.color;
          return `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; flex: 1; max-width: 150px; min-width: 64px;">
          <div style="width: 38px; height: 38px; border-radius: 10px; background: color-mix(in srgb, ${col} 16%, transparent); display: flex; align-items: center; justify-content: center; color: ${col};">${s.icon}</div>
          <div class="bp-pillar-bar" style="width: 100%; height: ${64 + t * 72}px; border-radius: 10px 10px 0 0; background: linear-gradient(180deg, ${col}, color-mix(in srgb, ${col} 78%, transparent)); transform-origin: bottom; transform: scaleY(0); transition: transform .6s cubic-bezier(.22,1,.36,1); transition-delay: ${idx * 0.12}s; display: flex; align-items: flex-start; justify-content: center; padding-top: 8px;"><span style="font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800; color: #fff;">${idx + 1}</span></div>
          <div style="font-size: 12px; font-weight: 600; color: #4a5069; text-align: center; line-height: 1.3;">${esc(s.label)}</div>
        </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  function renderCodeHover(th) {
    return `<div class="bp-reveal bp-code-row" style="margin: 10px 0;">
      <div class="bp-code-card" style="--accent: ${th.accent};">
        <div class="bp-code-head">chargeCustomer.js</div>
        <pre class="bp-code-pre">function chargeCustomer(amount) {
  return amount * 1.0; // USD only
}</pre>
        <div class="bp-code-reveal">Six months later: multi-currency ships. This function breaks silently for every non-USD customer.</div>
      </div>
      <div class="bp-code-card" style="--accent: ${th.accent2};">
        <div class="bp-code-head">chargeCustomer.js \u2014 v2</div>
        <pre class="bp-code-pre">function chargeCustomer(amount, currency) {
  return convert(amount, currency);
}</pre>
        <div class="bp-code-reveal">Six months later: new currencies plug in without touching this function.</div>
      </div>
      <div class="bp-code-hint">Hover or tap a card</div>
    </div>`;
  }

  function renderFlow(th) {
    const node = (icon, label, small) => `<div class="bp-flow-node${small ? ' bp-flow-node-sm' : ''}"><span class="bp-flow-node-icon">${icon}</span><span class="bp-flow-node-label">${esc(label)}</span></div>`;
    return `<div class="bp-reveal bp-flow" data-flow="api" style="margin: 10px 0; --accent: ${th.accent}; --accent2: ${th.accent2};">
      <div class="bp-flow-tabs">
        <button type="button" class="bp-flow-tab is-active" data-set-flow="api">API call</button>
        <button type="button" class="bp-flow-tab" data-set-flow="mcp">MCP agent</button>
      </div>
      <div class="bp-flow-stage">
        <div class="bp-flow-track"><div class="bp-flow-dot"></div></div>
        <div class="bp-flow-nodes bp-flow-nodes-api">
          ${node(ICON_USER, 'Client')}
          ${node(ICON_SERVER, 'Balance endpoint')}
        </div>
        <div class="bp-flow-nodes bp-flow-nodes-mcp">
          ${node(ICON_USER, 'Client')}
          ${node(ICON_ROBOT, 'Agent')}
          ${node(ICON_CLOCK, 'Balance tool', true)}
          ${node(ICON_DOC, 'Transactions tool', true)}
          ${node(ICON_SERVER, 'Answer')}
        </div>
      </div>
      <div class="bp-flow-caption">
        <span class="bp-flow-caption-api">One fixed call, one fixed response.</span>
        <span class="bp-flow-caption-mcp">The agent picks which tools to call, and in what order.</span>
      </div>
    </div>`;
  }

  function renderTypingDemo(th) {
    return `<div class="bp-reveal bp-typing" data-typed="function calculateTotal(cart) {" style="margin: 10px 0; --accent: ${th.accent}; --accent2: ${th.accent2};">
      <div class="bp-typing-bar">
        <span class="bp-typing-dot" style="background: #ff5f57;"></span><span class="bp-typing-dot" style="background: #febc2e;"></span><span class="bp-typing-dot" style="background: #28c840;"></span>
        <span class="bp-typing-tag">editor.js</span>
      </div>
      <div class="bp-typing-body">
        <span class="bp-typing-who bp-typing-who-you">you \u2192</span><span class="bp-typing-who bp-typing-who-agent">agent \u2192</span>
        <span class="bp-typing-line"></span><span class="bp-typing-caret">|</span>
      </div>
    </div>`;
  }

  function renderCarousel(th) {
    const quotes = [
      'I still Google things I\u2019ve used for five years.',
      'I nodded along in that meeting and looked it up after.',
      'Everyone in this room seems more sure than I feel.',
      'I don\u2019t know how it works. I just know it works.',
      'Some days confidence is just a good night\u2019s sleep.',
    ];
    return `<div class="bp-reveal bp-carousel" style="margin: 10px 0; --accent: ${th.accent}; --accent2: ${th.accent2};">
      <div class="bp-carousel-stage">
        ${quotes.map((q, i) => `<div class="bp-carousel-card${i === 0 ? ' is-active' : ''}" style="--rot: ${(i % 2 === 0 ? -1 : 1) * (2 + i)}deg;">\u201c${esc(q)}\u201d</div>`).join('')}
      </div>
      <div class="bp-carousel-dots">
        ${quotes.map((_, i) => `<button type="button" class="bp-carousel-dot${i === 0 ? ' is-active' : ''}" data-goto="${i}" aria-label="Quote ${i + 1}"></button>`).join('')}
      </div>
    </div>`;
  }

  function renderFlightPath(reverse, from, to, caption, th) {
    const d = reverse ? 'M360,112 Q200,14 40,112' : 'M40,112 Q200,14 360,112';
    const startX = reverse ? 360 : 40, endX = reverse ? 40 : 360;
    return `<div class="bp-reveal bp-flight" style="margin: 10px 0; --accent: ${th.accent}; --accent2: ${th.accent2};">
      <svg viewBox="0 0 400 140" class="bp-flight-svg" preserveAspectRatio="xMidYMid meet">
        <path class="bp-flight-path" d="${d}" fill="none"/>
        <circle cx="${startX}" cy="112" r="5" class="bp-flight-dot-start"/>
        <circle cx="${endX}" cy="112" r="5" class="bp-flight-dot-end"/>
        <g class="bp-flight-plane" style="offset-path: path('${d}');"><path d="M0,-5 L6,0 L0,5 L-3,0 Z"/></g>
      </svg>
      <div class="bp-flight-labels"><span>${esc(from)}</span><span>${esc(to)}</span></div>
      <div class="bp-flight-caption">${esc(caption)}</div>
    </div>`;
  }

  function renderSlider(th) {
    return `<div class="bp-reveal bp-slider-block" style="margin: 10px 0; --accent: ${th.accent}; --accent2: ${th.accent2};">
      <div class="bp-slider-labels"><span>Material</span><span>Spiritual</span></div>
      <input type="range" min="0" max="100" value="50" class="bp-slider-input" id="bp-happiness-slider">
      <div class="bp-slider-quote" id="bp-happiness-quote">Peace of mind outlasts most things money buys.</div>
    </div>`;
  }

  function buildDiagram(id, p) {
    const th = theme(p.hue || 220);
    switch (id) {
      case 'happiness-split': return renderSplit(
        { icon: ICON_HOME, label: 'Material Happiness', desc: 'Money, health, household', op: '+' },
        { icon: ICON_LEAF, label: 'Spiritual Happiness', desc: 'Inner peace, clean conscience' }, th);
      case 'happiness-pillars': return renderPillars([
        { icon: ICON_BRIEFCASE, label: 'Ownership' }, { icon: ICON_GIFT, label: 'Enjoyment' },
        { icon: ICON_UNLOCK, label: 'Freedom From Debt' }, { icon: ICON_SHIELD, label: 'Blameless Life' },
      ], th);
      case 'happiness-slider': return renderSlider(th);
      case 'code-split': return renderSplit(
        { icon: ICON_CODE, label: 'Works Today', desc: 'Passes tests, ships fine', op: 'vs' },
        { icon: ICON_CLOCK, label: 'Lasts Long-Term', desc: 'Survives change, scale, time' }, th);
      case 'code-hover': return renderCodeHover(th);
      case 'engineer-pillars': return renderPillars([
        { icon: ICON_CLOCK, label: 'Patience' }, { icon: ICON_COMPASS, label: 'Curiosity' },
        { icon: ICON_CHAT, label: 'Humility' }, { icon: ICON_USERS, label: 'Communication' }, { icon: ICON_SHIELD, label: 'Confidence' },
      ], th);
      case 'emotional-carousel': return renderCarousel(th);
      case 'api-split': return renderSplit(
        { icon: ICON_CODE, label: 'API', desc: 'Fixed contract, same result every time', op: 'vs' },
        { icon: ICON_ROBOT, label: 'MCP', desc: 'Agent decides which tools to call' }, th);
      case 'api-flow': return renderFlow(th);
      case 'ai2026-split': return renderSplit(
        { icon: ICON_CLOCK, label: 'A Year Ago', desc: 'Reading every line before it shipped' },
        { icon: ICON_COMPASS, label: 'Now', desc: 'Deciding what to build, checking the outcome' }, th);
      case 'ai-typing-demo': return renderTypingDemo(th);
      case 'agents-pillars': return renderPillars([
        { icon: ICON_CODE, label: 'Scripts' }, { icon: ICON_COMPASS, label: 'Automation' }, { icon: ICON_ROBOT, label: 'Agents' },
      ], th);
      case 'decade-flight': return renderFlightPath(false, 'Hyderabad', 'A new country', '10 years', th);
      case 'trip-flight': return renderFlightPath(true, 'A new country', 'Hyderabad', '5 years away, 3 weeks home', th);
      default: return '';
    }
  }

  function initInteractive(root) {
    root.querySelectorAll('.bp-code-card').forEach((card) => {
      card.addEventListener('click', () => card.classList.toggle('is-open'));
    });
    root.querySelectorAll('.bp-flow').forEach((flow) => {
      flow.querySelectorAll('.bp-flow-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
          flow.querySelectorAll('.bp-flow-tab').forEach((t) => t.classList.toggle('is-active', t === tab));
          flow.setAttribute('data-flow', tab.getAttribute('data-set-flow'));
          const dot = flow.querySelector('.bp-flow-dot');
          dot.classList.remove('is-playing'); void dot.offsetWidth; dot.classList.add('is-playing');
        });
      });
      const dot = flow.querySelector('.bp-flow-dot');
      requestAnimationFrame(() => dot.classList.add('is-playing'));
    });
    root.querySelectorAll('.bp-carousel').forEach((car) => {
      const cards = [...car.querySelectorAll('.bp-carousel-card')];
      const dots = [...car.querySelectorAll('.bp-carousel-dot')];
      let idx = 0, timer;
      function show(i) {
        idx = i;
        cards.forEach((c, ci) => c.classList.toggle('is-active', ci === i));
        dots.forEach((d, di) => d.classList.toggle('is-active', di === i));
      }
      function restart() { clearInterval(timer); if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; timer = setInterval(() => show((idx + 1) % cards.length), 3500); }
      dots.forEach((d, i) => d.addEventListener('click', () => { show(i); restart(); }));
      restart();
    });
    const slider = root.querySelector('#bp-happiness-slider');
    if (slider) {
      const quoteEl = root.querySelector('#bp-happiness-quote');
      const quotes = [
        [0, 'A comfortable life is still worth building carefully.'],
        [30, 'Security matters, but it isn\u2019t the whole picture.'],
        [60, 'Peace of mind outlasts most things money buys.'],
        [80, 'A clear conscience is the only asset that never depreciates.'],
      ];
      const paint = (v) => {
        slider.style.background = `linear-gradient(90deg, var(--accent) ${v}%, rgba(28,32,48,0.1) ${v}%)`;
        let text = quotes[0][1];
        for (const [t, q] of quotes) if (v >= t) text = q;
        quoteEl.textContent = text;
      };
      slider.addEventListener('input', (e) => paint(+e.target.value));
      paint(50);
    }
    root.querySelectorAll('.bp-typing').forEach((el) => {
      const full = el.getAttribute('data-typed');
      const lineEl = el.querySelector('.bp-typing-line');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { lineEl.textContent = full; return; }
      const human = Math.max(1, Math.round(full.length * 0.4));
      let i = 0;
      function tick() {
        if (i <= human) {
          lineEl.textContent = full.slice(0, i); i++;
          setTimeout(tick, 55);
        } else if (i <= full.length) {
          if (i === human + 1) el.classList.add('bp-typing-agent');
          lineEl.textContent = full.slice(0, i); i++;
          setTimeout(tick, 12);
        } else {
          setTimeout(() => { i = 0; el.classList.remove('bp-typing-agent'); tick(); }, 2600);
        }
      }
      let started = false;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting && !started) { started = true; tick(); obs.disconnect(); } });
      }, { threshold: 0.3 });
      obs.observe(el);
    });
  }

  const DOGS = [
    { name: 'Junnu', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/junnu.jpg'), tag: "The self-appointed guardian of this site." },
    { name: 'Jimmy', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/jimmy.jpg'), tag: "Best friends with every rabbit, worst enemy of broken links." },
    { name: 'Bruno', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/bruno.jpg'), tag: "Keeps the cats in line and the 404s in check." },
    { name: 'Simba', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/simba.jpg'), tag: "Small dog, big attitude, zero patience for dead ends." },
    { name: 'Cooper', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/cooper.jpg'), tag: "Fluffy, floppy, and fiercely loyal to lost pages." },
    { name: 'Bagel', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/bagel.jpg'), tag: "Snorting his way through every wrong turn." },
    { name: 'Milo', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/milo.jpg'), tag: "Too cute to be mad at, even about this 404." },
  ];
  function show404() {
    const site = window.VD_SITE.resolve(location.hostname, location.port);
    const blogHost = site.isBlog;
    document.title = 'Post not found — Vishal Dasari';
    const hero = document.getElementById('bp-hero');
    if (hero) hero.remove();
    const main = document.getElementById('bp-content');
    if (!main) return;
    const dog = DOGS[Math.floor(Math.random() * DOGS.length)];
    main.className = 'redesign-error';
    main.innerHTML = '<img src="' + dog.img + '" alt="' + esc(dog.name) + ', the page guard" width="170" height="170">' +
      '<p class="eyebrow">404 / A little off the trail</p><h1>This note isn’t here.</h1>' +
      '<p>' + esc(dog.name) + ' checked everywhere. This article is hidden or no longer available.</p>' +
      '<div class="hero-actions"><a class="button primary" href="' + (blogHost ? '/' : '/blog') + '">Back to the journal ↗</a><a class="button secondary" href="' + (blogHost ? site.portfolioOrigin + '/' : '/') + '">Back to home</a></div>';
  }

  function init() {
    const slug = document.body.getAttribute('data-slug');
    const p = window.BLOG_POSTS[slug];
    if (!p) { show404(); return; }

    // Render immediately — don't block first paint on a network round trip.
    // If the post turns out to be hidden, swap to the 404 view once we know.
    renderPost(p);
    fetch('/api/posts-visibility')
      .then((r) => r.json())
      .then((data) => {
        if (data.hidden && data.hidden.indexOf(slug) !== -1) show404();
      })
      .catch(() => {});
  }

  function renderPost(p) {
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
      const coverUrl = new URL(p.coverImg, publicRoot).href;
      if (!coverEl.src || coverEl.getAttribute('src') === '') coverEl.src = coverUrl;
      coverEl.alt = p.title;
    }
    const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const headings = [];
    const bodyEl = document.getElementById('bp-body');
    bodyEl.innerHTML = p.content.map((block, i) => {
      if (block.diagram) return buildDiagram(block.diagram, p);
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

    initInteractive(bodyEl);

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

    const revealEls = document.querySelectorAll('#bp-body .bp-reveal');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
      }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach((el) => obs.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
