/* Shared cursor micro-interactions: custom cursor + trail, magnetic, tilt, repulsion text, parallax.
   Include via <script src="js/cursor-effects.js"></script>. */
(function () {
  if (window.__cursorFxBooted) return;
  window.__cursorFxBooted = true;

  var coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (coarse || reduced) return;

  var ACCENT = '#3654e0';

  function ensureGsap(cb) {
    if (window.gsap) return cb();
    var s = document.createElement('script');
    s.src = 'https://unpkg.com/gsap@3.12.5/dist/gsap.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  function boot() {
    var gsap = window.gsap;
    var mouse = { x: -100, y: -100 };
    var ring = { x: -100, y: -100 };
    var particles = [];
    var frame = 0;
    var hoverTarget = null;

    var dotEl = document.createElement('div');
    dotEl.style.cssText = 'position:fixed;top:0;left:0;width:8px;height:8px;margin:0;border-radius:50%;background:' + ACCENT + ';pointer-events:none;z-index:999999;opacity:0;';
    var ringEl = document.createElement('div');
    ringEl.style.cssText = 'position:fixed;top:0;left:0;width:36px;height:36px;margin:0;border-radius:50%;border:2px solid ' + ACCENT + ';display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:999999;opacity:0;';
    var ringLabel = document.createElement('span');
    ringLabel.style.cssText = 'font-size:10px;font-weight:700;letter-spacing:0.5px;color:#fff;opacity:0;font-family:Poppins,sans-serif;';
    ringEl.appendChild(ringLabel);
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:999998;';
    document.body.appendChild(canvas);
    document.body.appendChild(ringEl);
    document.body.appendChild(dotEl);
    var ctx = canvas.getContext('2d');

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    gsap.set(dotEl, { opacity: 1 });
    gsap.set(ringEl, { opacity: 1 });

    window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

    document.addEventListener('pointerover', function (e) {
      var target = e.target.closest('a, button, [data-cursor-label]');
      if (!target || target === hoverTarget) return;
      hoverTarget = target;
      var label = target.getAttribute('data-cursor-label');
      if (label) {
        gsap.to(ringEl, { width: 76, height: 76, background: ACCENT, borderColor: ACCENT, duration: 0.35, ease: 'power3.out' });
        ringLabel.textContent = label;
        gsap.to(ringLabel, { opacity: 1, duration: 0.2 });
      } else {
        gsap.to(ringEl, { width: 64, height: 64, background: 'transparent', borderColor: ACCENT, duration: 0.3, ease: 'power3.out' });
        gsap.to(ringLabel, { opacity: 0, duration: 0.15 });
      }
    }, { passive: true });

    document.addEventListener('pointerout', function (e) {
      var target = e.target.closest('a, button, [data-cursor-label]');
      if (!target) return;
      if (e.relatedTarget && target.contains(e.relatedTarget)) return;
      hoverTarget = null;
      gsap.to(ringEl, { width: 36, height: 36, background: 'transparent', borderColor: ACCENT, duration: 0.35, ease: 'power3.out' });
      gsap.to(ringLabel, { opacity: 0, duration: 0.15 });
    }, { passive: true });

    // magnetic
    document.querySelectorAll('.magnetic').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var rect = el.getBoundingClientRect();
        var relX = e.clientX - (rect.left + rect.width / 2);
        var relY = e.clientY - (rect.top + rect.height / 2);
        gsap.to(el, { x: relX * 0.3, y: relY * 0.3, duration: 0.4, ease: 'power3.out', overwrite: true });
      }, { passive: true });
      el.addEventListener('pointerleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)', overwrite: true });
      }, { passive: true });
    });

    // tilt
    document.querySelectorAll('.tilt').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        var rotY = (px - 0.5) * 2 * 7;
        var rotX = -(py - 0.5) * 2 * 7;
        gsap.to(el, { rotationX: rotX, rotationY: rotY, y: -8, transformPerspective: 800, transformOrigin: 'center', duration: 0.4, ease: 'power2.out', overwrite: true });
      }, { passive: true });
      el.addEventListener('pointerleave', function () {
        gsap.to(el, { rotationX: 0, rotationY: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: true });
      }, { passive: true });
    });

    // repulsion text
    var heroChars = [];
    var heroInView = true;
    document.querySelectorAll('[data-cursor-repel]').forEach(function (el) {
      var text = el.textContent;
      el.textContent = '';
      Array.from(text).forEach(function (ch) {
        var span = document.createElement('span');
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        span.style.display = 'inline-block';
        span.style.willChange = 'transform';
        el.appendChild(span);
        heroChars.push({ el: span, cur: { x: 0, y: 0, rot: 0 } });
      });
      if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) { heroInView = entry.isIntersecting; });
        }, { threshold: 0.1 });
        obs.observe(el);
      }
    });

    // parallax
    var parallaxEls = Array.from(document.querySelectorAll('.parallax-layer')).map(function (el) {
      return { el: el, depth: parseFloat(el.getAttribute('data-depth')) || 0.03, cur: { x: 0, y: 0 } };
    });

    function updateHeroChars() {
      heroChars.forEach(function (c) {
        var rect = c.el.getBoundingClientRect();
        var baseCX = rect.left + rect.width / 2 - c.cur.x;
        var baseCY = rect.top + rect.height / 2 - c.cur.y;
        var dx = baseCX - mouse.x, dy = baseCY - mouse.y;
        var dist = Math.hypot(dx, dy);
        var tx = 0, ty = 0, tr = 0;
        if (dist < 150) {
          var force = (1 - dist / 150) * 46;
          var ang = Math.atan2(dy, dx);
          tx = Math.cos(ang) * force;
          ty = Math.sin(ang) * force;
          tr = (tx / 46) * 12;
        }
        c.cur.x += (tx - c.cur.x) * 0.14;
        c.cur.y += (ty - c.cur.y) * 0.14;
        c.cur.rot += (tr - c.cur.rot) * 0.14;
        c.el.style.transform = 'translate(' + c.cur.x.toFixed(2) + 'px, ' + c.cur.y.toFixed(2) + 'px) rotate(' + c.cur.rot.toFixed(2) + 'deg)';
      });
    }

    function updateParallax() {
      var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      parallaxEls.forEach(function (p) {
        var tx = (mouse.x - cx) * p.depth, ty = (mouse.y - cy) * p.depth;
        p.cur.x += (tx - p.cur.x) * 0.08;
        p.cur.y += (ty - p.cur.y) * 0.08;
        p.el.style.transform = 'translate3d(' + p.cur.x.toFixed(2) + 'px, ' + p.cur.y.toFixed(2) + 'px, 0)';
      });
    }

    function spawnParticle() {
      frame++;
      if (frame % 2 !== 0) return;
      var colors = ['#3654e0', '#2c46c9', '#6f80f0', '#14b8a6'];
      particles.push({ x: ring.x, y: ring.y, size: 2 + Math.random() * 2, color: colors[Math.floor(Math.random() * colors.length)], life: 0, maxLife: 0.5 });
    }

    function updateParticles(dt) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(function (p) { return p.life < p.maxLife; });
      particles.forEach(function (p) {
        p.life += dt;
        var t = p.life / p.maxLife;
        ctx.globalAlpha = (1 - t) * 0.35;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.6), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    gsap.ticker.add(function (time, deltaTime) {
      var dt = Math.min(deltaTime, 50) / 1000;
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;
      dotEl.style.transform = 'translate3d(' + mouse.x + 'px, ' + mouse.y + 'px, 0) translate(-50%, -50%)';
      ringEl.style.transform = 'translate3d(' + ring.x + 'px, ' + ring.y + 'px, 0) translate(-50%, -50%)';
      spawnParticle();
      updateParticles(dt);
      if (heroInView) updateHeroChars();
      updateParallax();
    });
  }

  function start() { ensureGsap(boot); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
