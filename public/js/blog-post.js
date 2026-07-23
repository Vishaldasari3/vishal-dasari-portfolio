(function () {
  const SCRIPT_SRC = document.currentScript.src;
  function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  const DOGS = [
    { name: 'Junnu', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/junnu.jpg'), tag: "The self-appointed guardian of this site." },
    { name: 'Jimmy', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/jimmy.jpg'), tag: "Best friends with every rabbit, worst enemy of broken links." },
    { name: 'Bruno', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/bruno.jpg'), tag: "Keeps the cats in line and the 404s in check." },
    { name: 'Simba', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/simba.jpg'), tag: "Small dog, big attitude, zero patience for dead ends." },
    { name: 'Cooper', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/cooper.jpg'), tag: "Fluffy, floppy, and fiercely loyal to lost pages." },
    { name: 'Bagel', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/bagel.jpg'), tag: "Snorting his way through every wrong turn." },
    { name: 'Milo', img: SCRIPT_SRC.replace(/js\/blog-post\.js.*/, 'assets/404-dogs/milo.jpg'), tag: "Too cute to be mad at, even about this 404." },
  ];
  function show404(reason) {
    document.title = 'Post not found — Vishal Dasari';
    const hero = document.getElementById('bp-hero');
    if (hero) { const band = hero.closest('div[style*="padding: 28px"]') || hero.parentElement; band.style.display = 'none'; }
    const main = document.getElementById('bp-content') || document.body;
    const dog = DOGS[Math.floor(Math.random() * DOGS.length)];
    let paws = '';
    for (let i = 0; i < 22; i++) {
      paws += `<span class="bp404-paw" style="position:absolute;bottom:-40px;left:${Math.random() * 100}vw;font-size:30px;opacity:0;cursor:pointer;pointer-events:auto;transition:transform .15s ease;animation:rise ${14 + Math.random() * 10}s linear infinite;animation-delay:${Math.random() * 10}s;">\uD83D\uDC3E</span>`;
    }
    main.innerHTML = `
      <div style="position:relative;min-height:80vh;display:flex;align-items:center;justify-content:center;perspective:1400px;overflow:hidden;background:#f4f5fb;border-radius:20px;padding:60px 20px;">
        <div style="position:absolute;width:420px;height:420px;border-radius:50%;filter:blur(70px);opacity:0.55;background:radial-gradient(circle,#4f6bff,transparent 68%);top:-100px;left:-80px;animation:drift1 16s ease-in-out infinite;"></div>
        <div style="position:absolute;width:360px;height:360px;border-radius:50%;filter:blur(70px);opacity:0.55;background:radial-gradient(circle,#00e0c6,transparent 68%);bottom:-100px;right:-60px;animation:drift2 18s ease-in-out infinite;"></div>
        <div style="position:absolute;width:300px;height:300px;border-radius:50%;filter:blur(70px);opacity:0.55;background:radial-gradient(circle,#ff5fae,transparent 68%);top:35%;left:60%;animation:drift3 14s ease-in-out infinite;"></div>
        <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(60,84,224,0.12) 1px, transparent 1px);background-size:26px 26px;mask-image:radial-gradient(ellipse at center, black 0%, transparent 72%);"></div>
        <div style="position:absolute;font-family:'Syne',sans-serif;font-weight:800;font-size:min(30vw,320px);letter-spacing:-8px;color:transparent;-webkit-text-stroke:1.5px rgba(60,84,224,0.12);pointer-events:none;">404</div>
        ${paws}
        <div id="bp404-card" style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center;padding:48px 40px;width:100%;max-width:580px;overflow:hidden;background:linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(238,241,255,0.85) 45%, rgba(255,240,250,0.8) 100%);backdrop-filter:blur(22px);border:1px solid rgba(255,255,255,0.9);border-radius:26px;box-shadow:0 30px 80px -30px rgba(60,70,140,0.28), 0 0 0 1px rgba(124,92,255,0.08);transform-style:preserve-3d;transition:transform .25s ease;opacity:0;animation:cardIn .8s cubic-bezier(.22,1,.36,1) forwards;">
          <div style="position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg,#4f6bff,#00e0c6,#ff5fae,#4f6bff);background-size:300% auto;animation:sheen 6s linear infinite;"></div>
          <div style="animation:bp404-float 3s ease-in-out infinite;">
            <img id="bp404-img" src="${dog.img}" alt="${dog.name}" style="width:210px;height:210px;object-fit:cover;border-radius:22px;box-shadow:0 24px 50px -18px rgba(60,70,140,0.25);transition:transform .15s ease;transform-style:preserve-3d;">
          </div>
          <div style="font-family:'Syne',sans-serif;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7c5cff;opacity:0;animation:fadeUp .7s ease .15s forwards;">Halted by the guard</div>
          <div style="font-family:'Syne',sans-serif;font-size:38px;font-weight:800;letter-spacing:-1.5px;background:linear-gradient(120deg,#7c9cff,#c39bff,#5eeaff,#7c9cff);background-size:300% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sheen 5s linear infinite;">${dog.name}</div>
          <div style="font-size:17px;font-weight:600;color:#20244a;opacity:0;animation:fadeUp .7s ease .3s forwards;">${esc(dog.tag)}</div>
          <div style="font-size:13.5px;color:#5c6288;max-width:360px;opacity:0;animation:fadeUp .7s ease .45s forwards;">${esc(dog.name + ' sniffed around and found nothing here \u2014 this page is hidden, wandered off, or never existed. Try one of these instead:')}</div>
          <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;perspective:800px;">
            <a href="/blog" class="bp404-b3d" style="position:relative;display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#fff;letter-spacing:0.2px;background:linear-gradient(135deg,#3654e0,#7c5cff,#22ddf5);background-size:220% auto;background-position:0% center;padding:12px 24px;border-radius:26px;text-decoration:none;box-shadow:0 14px 30px -10px rgba(54,84,224,0.5);transform-style:preserve-3d;transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease, background-position .5s ease, letter-spacing .3s ease;opacity:0;animation:fadeUp .7s ease .6s forwards;">
              Back to the blog
              <svg width="14" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6h13M9 1l5 5-5 5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a href="/" class="bp404-b3d" style="position:relative;display:inline-flex;align-items:center;gap:9px;font-size:13px;font-weight:700;color:#fff;letter-spacing:0.2px;background:linear-gradient(135deg,#3654e0,#7c5cff,#22ddf5);background-size:220% auto;background-position:0% center;padding:12px 24px;border-radius:26px;text-decoration:none;box-shadow:0 14px 30px -10px rgba(54,84,224,0.5);transform-style:preserve-3d;transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease, background-position .5s ease, letter-spacing .3s ease;opacity:0;animation:fadeUp .7s ease .6s forwards;">
              Back to home
              <svg width="14" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6h13M9 1l5 5-5 5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
      <style>
        @keyframes drift1{0%,100%{transform:translate(0,0)}50%{transform:translate(60px,40px)}}
        @keyframes drift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-50px,-30px)}}
        @keyframes drift3{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,50px)}}
        @keyframes rise{0%{transform:translateY(0) rotate(0deg);opacity:0;}10%{opacity:.5;}90%{opacity:.35;}100%{transform:translateY(-110vh) rotate(40deg);opacity:0;}}
        @keyframes cardIn{from{opacity:0;transform:translateY(30px) scale(.94);}to{opacity:1;transform:translateY(0) scale(1);}}
        @keyframes bp404-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes sheen{to{background-position:300% center;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
        .bp404-paw:hover{transform:scale(1.4) rotate(-10deg);}
        .bp404-b3d::after{content:'';position:absolute;inset:-3px;border-radius:29px;box-shadow:0 0 0 0 rgba(124,92,255,0.4);opacity:0;transition:opacity .3s ease;pointer-events:none;}
        .bp404-b3d:hover::after{opacity:1;animation:pulseRing 1.1s ease-out infinite;}
        .bp404-b3d:hover{letter-spacing:0.6px;background-position:100% center;}
        .bp404-b3d svg{transition:transform .3s cubic-bezier(.34,1.56,.64,1);}
        .bp404-b3d:hover svg{transform:translateX(5px) scale(1.15);}
        @keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(124,92,255,0.35);}100%{box-shadow:0 0 0 8px rgba(124,92,255,0);}}
      </style>`;
    function playPawTap() {
      const ctx = playPawTap._ctx || (playPawTap._ctx = new (window.AudioContext || window.webkitAudioContext)());
      const t = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(180 + Math.random() * 40, t);
      o.frequency.exponentialRampToValueAtTime(70, t + 0.12);
      g.gain.setValueAtTime(0.16, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.15);
    }
    main.querySelectorAll('.bp404-paw').forEach((el) => el.addEventListener('mouseenter', playPawTap));
    document.querySelectorAll('.bp404-b3d').forEach((el) => {
      el.addEventListener('mouseenter', () => { el.style.transform = 'rotateX(14deg) translateY(-6px) scale(1.06)'; el.style.boxShadow = '0 26px 46px -14px rgba(54,84,224,0.6), 0 0 24px -2px rgba(34,221,245,0.5)'; });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; el.style.boxShadow = '0 14px 30px -10px rgba(54,84,224,0.5)'; });
    });
    const card = document.getElementById('bp404-card'), img = document.getElementById('bp404-img');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      img.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg)`;
      card.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => { img.style.transform = 'rotateY(0) rotateX(0)'; card.style.transform = 'rotateY(0) rotateX(0)'; });

    function confettiBurst(x, y) {
      const colors = ['#3654e0','#7c5cff','#22ddf5','#ff5fae','#4f6bff','#00e0c6'];
      for (let i = 0; i < 26; i++) {
        const c = document.createElement('span');
        const col = colors[Math.floor(Math.random() * colors.length)];
        const ang = Math.random() * Math.PI * 2, dist = 60 + Math.random() * 90;
        const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 40;
        c.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${6 + Math.random() * 5}px;height:${6 + Math.random() * 5}px;background:${col};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};pointer-events:none;z-index:999;opacity:1;transition:transform .8s cubic-bezier(.2,.8,.3,1), opacity .8s ease;`;
        document.body.appendChild(c);
        requestAnimationFrame(() => { c.style.transform = `translate(${dx}px,${dy}px) rotate(${Math.random() * 360}deg)`; c.style.opacity = '0'; });
        setTimeout(() => c.remove(), 850);
      }
    }
    main.querySelectorAll('.bp404-b3d').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const r = el.getBoundingClientRect();
        confettiBurst(r.left + r.width / 2, r.top + r.height / 2);
        const href = el.getAttribute('href');
        setTimeout(() => { window.location.href = href; }, 260);
      });
    });
  }

  function init() {
    const slug = document.body.getAttribute('data-slug');
    const p = window.BLOG_POSTS[slug];
    if (!p) return;

    fetch('/api/posts-visibility')
      .then((r) => r.json())
      .then((data) => {
        if (data.hidden && data.hidden.indexOf(slug) !== -1) show404();
        else renderPost(p);
      })
      .catch(() => renderPost(p));
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
