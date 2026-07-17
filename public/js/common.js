// Shared header/footer injection + decorative three.js scenes, used by every page.
(function () {
  const NAV_LABELS = { about: 'About', experience: 'Experience', certifications: 'Certs', 'tech-stack': 'Tech Stack', contact: 'Contact' };

  const JS_BASE = new URL('.', document.currentScript.src);
  const PARTIALS_BASE = new URL('../partials/', JS_BASE);

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

    setActiveNav();
    initHeaderScroll();
    initSharedScenes();
    equalizeLogoLines();
    window.addEventListener('resize', equalizeLogoLines, { passive: true });
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
    link.style.background = 'linear-gradient(135deg, #4a63e8, #2c46c9)';
    link.style.padding = '9px 18px';
    link.style.boxShadow = '0 4px 14px rgba(44,70,201,0.4)';
    link.classList.remove(...[...link.classList].filter((c) => c.startsWith('hv')));
    const canvas = document.getElementById('chroma-ring-canvas');
    if (canvas) {
      canvas.style.display = 'block';
      canvas.style.left = '50%';
      canvas.style.top = '50%';
      canvas.style.transform = 'translate(-50%,-50%)';
      link.style.zIndex = '1';
      link.insertBefore(canvas, link.firstChild);
    }
  }

  function initHeaderScroll() {
    const row = document.getElementById('site-header-row');
    const navItems = document.getElementById('site-nav-items');
    const logo = document.querySelector('.logo');
    const blogWrap = document.querySelector('#site-header-grid > div:last-child');
    const onScroll = () => {
      const scrolled = window.scrollY > 24;
      if (row) row.style.boxShadow = scrolled ? '0 6px 22px rgba(28,32,48,0.12)' : '0 4px 16px rgba(28,32,48,0.06)';
      const scale = scrolled ? 0.88 : 1;
      if (navItems) navItems.style.transform = `scale(${scale})`;
      if (blogWrap) blogWrap.style.transform = `scale(${scale})`;
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
    const bgCanvas = document.getElementById('header-bg-canvas');
    if (bgCanvas && window.SharedScenes) {
      window.SharedScenes.createParticleFieldScene(bgCanvas, { layers: [{ n: 24, z: -2, size: 0.05, op: 0.35 }, { n: 16, z: -4, size: 0.03, op: 0.18 }] });
    }
    const blogCanvas = document.getElementById('blog-fx-canvas');
    if (blogCanvas && window.SharedScenes) window.SharedScenes.createSweepScene(blogCanvas);

    waitForThree(() => {
      const THREE = window.THREE;
      const clockState = { t: 0 };
      const renderers = [];

      const ringCanvas = document.getElementById('chroma-ring-canvas');
      if (ringCanvas) {
        const rect = ringCanvas.getBoundingClientRect();
        const w = rect.width || 116, h = rect.height || 54;
        const renderer = new THREE.WebGLRenderer({ canvas: ringCanvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
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
        renderers.push({ renderer, scene, camera, update: () => { segs.forEach((s) => { s.rotation.z += 0.008; }); } });
      }

      const footerCanvas = document.getElementById('footer-canvas');
      if (footerCanvas) {
        const rect3 = footerCanvas.getBoundingClientRect();
        const w3 = rect3.width || 150, h3 = rect3.height || 46;
        const renderer3 = new THREE.WebGLRenderer({ canvas: footerCanvas, alpha: true, antialias: true });
        renderer3.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
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
        renderers.push({ renderer: renderer3, scene: scene3, camera: camera3, update: () => {
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
        clockState.t += 0.016;
        renderers.forEach((r) => { r.update(); r.renderer.render(r.scene, r.camera); });
        requestAnimationFrame(animate);
      };
      animate();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
