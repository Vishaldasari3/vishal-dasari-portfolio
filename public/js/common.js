// Shared header/footer injection + decorative three.js scenes, used by every page.
(function () {
  const NAV_LABELS = { about: 'About', experience: 'Experience', certifications: 'Certs', 'tech-stack': 'Tech Stack', contact: 'Contact' };

  const JS_BASE = new URL('.', document.currentScript.src);
  const PARTIALS_BASE = new URL('../partials/', JS_BASE);

  function confettiBurst(x, y) {
    var colors = ['#3654e0','#7c5cff','#22ddf5','#ff5fae','#4f6bff','#00e0c6'];
    for (var i = 0; i < 22; i++) {
      var c = document.createElement('span');
      var col = colors[Math.floor(Math.random() * colors.length)];
      var ang = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 70;
      var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 30;
      c.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;width:' + (5 + Math.random() * 4) + 'px;height:' + (5 + Math.random() * 4) + 'px;background:' + col + ';border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';pointer-events:none;z-index:9999;opacity:1;transition:transform .7s cubic-bezier(.2,.8,.3,1), opacity .7s ease;';
      document.body.appendChild(c);
      requestAnimationFrame(function (el, ddx, ddy) {
        return function () { el.style.transform = 'translate(' + ddx + 'px,' + ddy + 'px) rotate(' + (Math.random() * 360) + 'deg)'; el.style.opacity = '0'; };
      }(c, dx, dy));
      setTimeout(function (el) { return function () { el.remove(); }; }(c), 750);
    }
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button, a.b3d, .bp404-b3d');
    if (!btn || btn.hasAttribute('data-no-confetti')) return;
    var r = btn.getBoundingClientRect();
    confettiBurst(r.left + r.width / 2, r.top + r.height / 2);
  });

  async function inject() {
    let headerHtml = '', footerHtml = '', css = '';
    try {
      [headerHtml, footerHtml, css] = await Promise.all([
        fetch(new URL('header.html', PARTIALS_BASE)).then((r) => { if (!r.ok) throw new Error('header.html ' + r.status); return r.text(); }),
        fetch(new URL('footer.html', PARTIALS_BASE)).then((r) => { if (!r.ok) throw new Error('footer.html ' + r.status); return r.text(); }),
        fetch(new URL('partials.css', PARTIALS_BASE)).then((r) => { if (!r.ok) throw new Error('partials.css ' + r.status); return r.text(); }),
      ]);
    } catch (err) {
      console.error('Failed to load shared header/footer partials:', err);
      return;
    }
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    const assetsBase = new URL('../assets/', JS_BASE).href;
    const resolvedFooterHtml = footerHtml.replace(/src="assets\//g, 'src="' + assetsBase);

    const headerSlot = document.getElementById('site-header');
    const footerSlot = document.getElementById('site-footer');
    if (headerSlot) headerSlot.innerHTML = headerHtml;
    if (footerSlot) footerSlot.innerHTML = resolvedFooterHtml;

    if (document.body.getAttribute('data-page') === 'blog' && window.initBlogHeader) window.initBlogHeader();

    setActiveNav();
    initNavPill();
    waitForThree(initNavGlow);
    initHeaderScroll();
    initSharedScenes();
    equalizeLogoLines();
    window.addEventListener('resize', equalizeLogoLines, { passive: true });
    initMobileNav();
    if (window.__onPartialsReady) window.__onPartialsReady();
  }

  function setActiveNav() {
    const page = document.body.getAttribute('data-page');
    const navItems = document.getElementById('site-nav-items');
    if (!navItems || !page) return;
    const link = navItems.querySelector(`a[data-page="${page}"]`);
    if (!link) return;
    link.style.position = 'relative';
    link.style.color = '#fff';
    link.style.fontWeight = '600';
    link.style.background = 'linear-gradient(120deg, #3654e0, #7c5cff, #22ddf5, #3654e0)';
    link.style.backgroundSize = '300% 100%';
    link.style.padding = '9px 18px';
    link.style.borderRadius = '999px';
    link.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.22), 0 8px 20px -8px rgba(54,84,224,0.55)';
    link.style.display = 'inline-flex';
    link.style.alignItems = 'center';
    link.style.gap = '7px';
    link.insertAdjacentHTML('afterbegin', '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,#5b8cff,#22ddf5);box-shadow:0 0 8px rgba(34,221,245,.8);flex-shrink:0;"></span>');
    link.classList.add('nav-active-chip');
    link.classList.remove(...[...link.classList].filter((c) => c.startsWith('hv')));
  }

  function initNavPill() {
    const navItems = document.getElementById('site-nav-items');
    const pill = document.getElementById('site-nav-pill');
    if (!navItems || !pill) return;
    const page = document.body.getAttribute('data-page');
    const moveTo = (a) => {
      pill.style.transform = `translate(${a.offsetLeft}px, ${a.offsetTop}px)`;
      pill.style.width = a.offsetWidth + 'px';
      pill.style.height = a.offsetHeight + 'px';
      pill.style.opacity = '1';
    };
    navItems.querySelectorAll('a').forEach((a) => {
      if (a.getAttribute('data-page') === page) return; // active chip has its own style
      a.addEventListener('mouseenter', () => moveTo(a));
    });
    navItems.addEventListener('mouseleave', () => { pill.style.opacity = '0'; });
  }

  function initNavGlow() {
    const nav = document.getElementById('site-nav-items');
    if (!nav || !window.THREE) return;
    const THREE = window.THREE;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border-radius:999px;pointer-events:none;z-index:0;';
    nav.insertBefore(canvas, nav.firstChild);
    let rect = nav.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.setSize(rect.width, rect.height, false);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = { uX: { value: 0.5 }, uA: { value: 0 }, uT: { value: 0 }, uAspect: { value: rect.width / rect.height } };
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
      fragmentShader: `
        varying vec2 vUv; uniform float uX; uniform float uA; uniform float uT; uniform float uAspect;
        void main(){
          vec2 p = vec2(vUv.x * uAspect, vUv.y);
          vec2 c = vec2(uX * uAspect, 0.5);
          float d = distance(p, c);
          float pulse = 1.0 + 0.12 * sin(uT * 2.2);
          float glow = exp(-d * d * 9.0 / pulse);
          vec3 col = mix(vec3(0.29, 0.39, 0.91), vec3(0.13, 0.71, 0.96), clamp(uX, 0.0, 1.0));
          gl_FragColor = vec4(col, glow * uA * 0.30);
        }`,
    })));
    let targetX = 0.5, targetA = 0.35, hovering = false;
    const page = document.body.getAttribute('data-page');
    const active = nav.querySelector(`a[data-page="${page}"]`);
    const idleX = () => active ? (active.offsetLeft + active.offsetWidth / 2) / nav.offsetWidth : 0.5;
    targetX = idleX();
    nav.addEventListener('mousemove', (e) => {
      rect = nav.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width;
      targetA = 1;
      hovering = true;
    });
    nav.addEventListener('mouseleave', () => { targetA = 0.35; hovering = false; });
    window.addEventListener('resize', () => {
      rect = nav.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      uniforms.uAspect.value = rect.width / rect.height;
    }, { passive: true });
    const visible = window.SharedScenes && window.SharedScenes.makeVisibilityGate ? window.SharedScenes.makeVisibilityGate(canvas) : () => !document.hidden;
    const loop = () => {
      requestAnimationFrame(loop);
      if (!visible()) return;
      uniforms.uT.value += 0.016;
      if (!hovering) targetX = idleX() + Math.sin(uniforms.uT.value * 0.6) * 0.02;
      uniforms.uX.value += (targetX - uniforms.uX.value) * 0.09;
      uniforms.uA.value += (targetA - uniforms.uA.value) * 0.07;
      renderer.render(scene, camera);
    };
    loop();
  }

  function initMobileNav() {
    const navToggle = document.getElementById('site-nav-toggle');
    const headerRow = document.getElementById('site-header-row');
    const backdrop = document.getElementById('site-nav-backdrop');
    const navItems = document.getElementById('site-nav-items');
    if (!navToggle || !headerRow) return;
    const l1 = document.getElementById('burger-l1'), l2 = document.getElementById('burger-l2'), l3 = document.getElementById('burger-l3');
    const setOpen = (open) => {
      headerRow.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      if (backdrop) { backdrop.style.display = open ? 'block' : 'none'; requestAnimationFrame(() => { backdrop.style.opacity = open ? '1' : '0'; }); }
      if (l1 && l2 && l3) {
        l1.style.top = open ? '19px' : '15px'; l1.style.transform = open ? 'rotate(45deg)' : 'none';
        l3.style.top = open ? '19px' : '23px'; l3.style.transform = open ? 'rotate(-45deg)' : 'none';
        l2.style.opacity = open ? '0' : '1';
      }
    };
    navToggle.addEventListener('click', () => setOpen(!headerRow.classList.contains('nav-open')));
    if (backdrop) backdrop.addEventListener('click', () => setOpen(false));
    if (navItems) navItems.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  }

  function initHeaderScroll() {
    const row = document.getElementById('site-header-row');
    const navItems = document.getElementById('site-nav-items');
    const logo = document.querySelector('.logo');
    const blogWrap = document.querySelector('#site-header-grid > div:last-child');
    const page = document.body.getAttribute('data-page');
    const onScroll = () => {
      const scrolled = window.scrollY > 24;
      if (row) {
        row.style.top = (scrolled ? 10 : 24) + 'px';
        row.style.background = scrolled ? 'rgba(255,255,255,0.75)' : 'transparent';
        row.style.backdropFilter = scrolled ? 'blur(16px)' : 'none';
        row.style.boxShadow = scrolled ? '0 8px 24px rgba(28,32,48,0.1)' : 'none';
      }
      const scale = scrolled ? 0.86 : 1;
      if (logo) { logo.style.transformOrigin = 'left center'; logo.style.transform = `scale(${scale})`; }
      if (blogWrap) blogWrap.style.transform = `scale(${scrolled ? 0.88 : 1})`;
      if (navItems) {
        navItems.style.padding = scrolled ? '4px' : '7px';
        navItems.querySelectorAll('a').forEach((a) => {
          if (a.getAttribute('data-page') === page) return; // keep active chip padding
          a.style.padding = scrolled ? '7px 13px' : '9px 16px';
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function waitForThree(cb) {
    if (window.SharedScenes) window.SharedScenes.waitForThree(cb);
    else if (window.THREE) cb();
    else requestAnimationFrame(() => waitForThree(cb));
  }

  function equalizeLogoLines() {
    const l1 = document.getElementById('vd-logo-line1');
    const l2 = document.getElementById('vd-logo-line2');
    if (!l1 || !l2) return;
    l1.style.letterSpacing = '1.36px';
    l2.style.letterSpacing = '0.06em';
    const measure = () => {
      const w1 = l1.getBoundingClientRect().width;
      const w2 = l2.getBoundingClientRect().width;
      if (!w1 || !w2) return;
      const narrower = w1 < w2 ? l1 : l2;
      const wider = w1 < w2 ? w2 : w1;
      const narrowerWidth = Math.min(w1, w2);
      if (wider - narrowerWidth < 0.5) return;
      const chars = narrower.textContent.length;
      const extraPerGap = (wider - narrowerWidth) / (chars - 1);
      const base = narrower === l1 ? 1.36 : parseFloat(getComputedStyle(l2).letterSpacing);
      narrower.style.letterSpacing = `${base + extraPerGap}px`;
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => requestAnimationFrame(measure));
    else requestAnimationFrame(measure);
  }

  function initSharedScenes() {
    const blogCanvas = document.getElementById('blog-fx-canvas');
    if (blogCanvas && window.SharedScenes) window.SharedScenes.createSweepScene(blogCanvas);

    const heroCanvas = document.getElementById('hero-icosa-canvas');
    if (heroCanvas && !heroCanvas.dataset.vdInit && window.createIcosaScene) {
      heroCanvas.dataset.vdInit = '1';
      window.createIcosaScene(heroCanvas, 0.13);
    }

    waitForThree(() => {
      const THREE = window.THREE;
      const clockState = { t: 0 };
      const renderers = [];

      const ringCanvas = document.getElementById('chroma-ring-canvas');
      if (ringCanvas) {
        const rect = ringCanvas.getBoundingClientRect();
        const w = rect.width || 116, h = rect.height || 54;
        const renderer = new THREE.WebGLRenderer({ canvas: ringCanvas, alpha: true, antialias: false, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
        renderer.setSize(w, h, false);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
        camera.position.z = 2.6;
        const segs = [];
        [0x3654e0, 0x8a5cf0, 0xd6598f, 0xf0b94a].forEach((c, i) => {
          const geo = new THREE.TorusGeometry(0.95, 0.035, 8, 24, Math.PI / 2);
          const mat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.95 });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.rotation.z = (Math.PI / 2) * i;
          mesh.scale.set(1.4, 0.75, 1);
          scene.add(mesh);
          segs.push(mesh);
        });
        renderers.push({ renderer, scene, camera, visible: window.SharedScenes.makeVisibilityGate(ringCanvas), update: () => { segs.forEach((s) => { s.rotation.z += 0.008; }); } });
      }

      const footerCanvas = document.getElementById('footer-canvas');
      if (footerCanvas) {
        const rect3 = footerCanvas.getBoundingClientRect();
        const w3 = rect3.width || 150, h3 = rect3.height || 46;
        const renderer3 = new THREE.WebGLRenderer({ canvas: footerCanvas, alpha: true, antialias: false, powerPreference: 'low-power' });
        renderer3.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
        renderer3.setSize(w3, h3, false);
        const scene3 = new THREE.Scene();
        const camera3 = new THREE.PerspectiveCamera(50, w3 / h3, 0.1, 100);
        camera3.position.z = 3;
        const fCount = 10;
        const fPositions = new Float32Array(fCount * 3);
        const fGeo = new THREE.BufferGeometry();
        fGeo.setAttribute('position', new THREE.BufferAttribute(fPositions, 3));
        const fMat = new THREE.PointsMaterial({ color: 0xffd77a, size: 0.08, transparent: true, opacity: 0.95 });
        const fPoints = new THREE.Points(fGeo, fMat);
        scene3.add(fPoints);
        renderers.push({ renderer: renderer3, scene: scene3, camera: camera3, visible: window.SharedScenes.makeVisibilityGate(footerCanvas), update: () => {
          const posF = fPoints.geometry.attributes.position;
          for (let i = 0; i < fCount; i++) {
            const a = clockState.t * 1.1 + (i / fCount) * Math.PI * 2;
            const r = 1.05 + Math.sin(clockState.t * 2 + i) * 0.08;
            posF.array[i * 3] = Math.cos(a) * r;
            posF.array[i * 3 + 1] = Math.sin(a) * r * 0.42;
            posF.array[i * 3 + 2] = Math.sin(a * 2 + i) * 0.15;
          }
          posF.needsUpdate = true;
        } });
      }

      const animate = () => {
        requestAnimationFrame(animate);
        if (document.hidden) return;
        clockState.t += 0.016;
        renderers.forEach((r) => { if (!r.visible || r.visible()) { r.update(); r.renderer.render(r.scene, r.camera); } });
      };
      animate();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
