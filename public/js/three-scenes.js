// Shared decorative three.js scene builders, used by common.js and home.js.
(function () {
  function waitForThree(cb) {
    if (window.THREE) cb();
    else requestAnimationFrame(() => waitForThree(cb));
  }

  // Returns a () => bool gate that is false when the canvas is off-screen or the tab is hidden,
  // so decorative render loops can skip work instead of starving the main thread.
  function makeVisibilityGate(el) {
    let onScreen = true;
    if (window.IntersectionObserver) {
      new IntersectionObserver((entries) => { onScreen = entries[0].isIntersecting; }).observe(el);
    }
    return () => onScreen && !document.hidden;
  }

  // Full-bleed hero scene: flowing gradient ribbons + soft glow blobs + drifting dust,
  // spanning the whole header band behind the title text, with subtle mouse parallax.
  // Used on page hero banners (about/experience/certs/tech/contact/blog/blog posts).
  function createIcosaScene(canvas, opacity) {
    if (canvas.dataset.vdIcosaInit) return;
    canvas.dataset.vdIcosaInit = '1';
    const baseOpacity = opacity ?? 0.25;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    waitForThree(() => {
      const THREE = window.THREE;
      const parent = canvas.parentElement || canvas;
      let rect = parent.getBoundingClientRect();
      let w = rect.width || 900, h = rect.height || 220;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h, false);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, 0.1, 10);
      camera.position.z = 5;
      const group = new THREE.Group();
      scene.add(group);

      const palette = [
        [0.29, 0.39, 0.91],  // blue
        [0.48, 0.36, 1.0],   // violet
        [0.13, 0.87, 0.96],  // cyan
      ];

      // soft ambient glow blobs
      const glowCanvas = document.createElement('canvas');
      glowCanvas.width = glowCanvas.height = 256;
      const gctx = glowCanvas.getContext('2d');
      const grad = gctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(74,99,232,0.5)');
      grad.addColorStop(0.5, 'rgba(46,168,255,0.18)');
      grad.addColorStop(1, 'rgba(46,168,255,0)');
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 256, 256);
      const glowTex = new THREE.CanvasTexture(glowCanvas);
      const blobs = [0, 1].map((i) => {
        const mat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, opacity: baseOpacity * 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
        const sprite = new THREE.Sprite(mat);
        const scale = h * (1.5 + i * 0.6);
        sprite.scale.set(scale, scale, 1);
        sprite.position.set((i === 0 ? -0.28 : 0.32) * w, (i === 0 ? 0.1 : -0.15) * h, -1);
        group.add(sprite);
        return sprite;
      });

      // flowing gradient ribbons (soft-edged triangle strips), undulating via vertex shader
      const ribbonCount = 3;
      const ribbons = [];
      for (let i = 0; i < ribbonCount; i++) {
        const segs = 28;
        const positions = new Float32Array((segs + 1) * 2 * 3);
        const sides = new Float32Array((segs + 1) * 2);
        for (let s = 0; s <= segs; s++) {
          const x = -w * 0.65 + (w * 1.3) * (s / segs);
          positions[(s * 2) * 3] = x; positions[(s * 2) * 3 + 1] = 0; positions[(s * 2) * 3 + 2] = 0;
          positions[(s * 2 + 1) * 3] = x; positions[(s * 2 + 1) * 3 + 1] = 0; positions[(s * 2 + 1) * 3 + 2] = 0;
          sides[s * 2] = 1; sides[s * 2 + 1] = -1;
        }
        const indices = [];
        for (let s = 0; s < segs; s++) {
          const a = s * 2, b = s * 2 + 1, c = s * 2 + 2, d = s * 2 + 3;
          indices.push(a, b, c, b, d, c);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('side', new THREE.BufferAttribute(sides, 1));
        geo.setIndex(indices);
        const colorA = palette[i % 3], colorB = palette[(i + 1) % 3];
        const mat = new THREE.ShaderMaterial({
          transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
          uniforms: {
            uTime: { value: Math.random() * 10 },
            uAmp: { value: h * (0.09 + Math.random() * 0.06) },
            uFreq: { value: 0.006 + Math.random() * 0.004 },
            uPhase: { value: Math.random() * 10 },
            uYBase: { value: (i / (ribbonCount - 1) - 0.5) * h * 0.7 },
            uThickness: { value: h * (0.02 + Math.random() * 0.015) },
            uHalfW: { value: w / 2 },
            uOpacity: { value: baseOpacity },
            uColorA: { value: new THREE.Vector3(...colorA) },
            uColorB: { value: new THREE.Vector3(...colorB) },
          },
          vertexShader: `
            attribute float side;
            uniform float uTime, uAmp, uFreq, uPhase, uYBase, uThickness;
            varying float vSide;
            varying float vX;
            void main() {
              vSide = side;
              vX = position.x;
              float centerY = uYBase + sin(position.x * uFreq + uTime * 0.3 + uPhase) * uAmp
                + sin(position.x * uFreq * 2.2 - uTime * 0.18 + uPhase * 1.6) * uAmp * 0.35;
              float y = centerY + side * uThickness;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, y, position.z, 1.0);
            }
          `,
          fragmentShader: `
            uniform float uOpacity, uHalfW;
            uniform vec3 uColorA, uColorB;
            varying float vSide;
            varying float vX;
            void main() {
              float edge = smoothstep(1.0, 0.0, abs(vSide));
              float t = (vX + uHalfW) / (uHalfW * 2.0);
              float fade = smoothstep(0.0, 0.12, t) * smoothstep(0.0, 0.12, 1.0 - t);
              vec3 color = mix(uColorA, uColorB, clamp(t, 0.0, 1.0));
              gl_FragColor = vec4(color, uOpacity * edge * fade * 0.9);
            }
          `
        });
        const mesh = new THREE.Mesh(geo, mat);
        group.add(mesh);
        ribbons.push(mat);
      }

      // drifting dust particles
      const N = 18;
      const dustPos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        dustPos[i * 3] = (Math.random() - 0.5) * w;
        dustPos[i * 3 + 1] = (Math.random() - 0.5) * h;
        dustPos[i * 3 + 2] = 0;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({ color: 0x2ea8ff, size: h * 0.012, transparent: true, opacity: baseOpacity * 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
      const dust = new THREE.Points(dustGeo, dustMat);
      group.add(dust);

      const pointer = { x: 0, y: 0 };
      let targetX = 0, targetY = 0;
      if (!reduced) {
        parent.addEventListener('pointermove', (e) => {
          const r = parent.getBoundingClientRect();
          targetX = ((e.clientX - r.left) / r.width - 0.5) * 2;
          targetY = ((e.clientY - r.top) / r.height - 0.5) * 2;
        });
      }

      let t = Math.random() * 10;
      const visible = makeVisibilityGate(canvas);
      const animate = () => {
        requestAnimationFrame(animate);
        if (!visible()) return;
        t += 0.016;
        ribbons.forEach((m) => { m.uniforms.uTime.value = t; });
        if (!reduced) {
          dust.rotation.z += 0.0006;
          pointer.x += (targetX - pointer.x) * 0.04;
          pointer.y += (targetY - pointer.y) * 0.04;
          group.position.x = pointer.x * (w * 0.01);
          group.position.y = -pointer.y * (h * 0.02);
        }
        blobs[0].material.opacity = baseOpacity * (0.75 + 0.25 * Math.sin(t * 0.5));
        blobs[1].material.opacity = baseOpacity * (0.75 + 0.25 * Math.sin(t * 0.4 + 2));
        renderer.render(scene, camera);
      };
      animate();
    });
  }

  // Drifting point-field particles, used behind the sticky header.
  function createParticleFieldScene(canvas, opts) {
    waitForThree(() => {
      const THREE = window.THREE;
      const { color = 0x3654e0, layers = [{ n: 24, z: -2, size: 0.05, op: 0.5 }, { n: 16, z: -4, size: 0.03, op: 0.25 }] } = opts || {};
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || 640, h = rect.height || 140;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h, false);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
      camera.position.z = 6;
      const objs = layers.map((layer) => {
        const positions = new Float32Array(layer.n * 3);
        for (let i = 0; i < layer.n; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 11;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
          positions[i * 3 + 2] = layer.z + (Math.random() - 0.5) * 1.5;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({ color, size: layer.size, transparent: true, opacity: layer.op });
        const points = new THREE.Points(geo, mat);
        points.userData = { baseOpacity: layer.op, twinkleOffset: Math.random() * 10 };
        scene.add(points);
        return points;
      });
      let t = 0;
      const visibleP = makeVisibilityGate(canvas);
      const animate = () => {
        requestAnimationFrame(animate);
        if (!visibleP()) return;
        t += 0.016;
        objs.forEach((o) => {
          o.material.opacity = o.userData.baseOpacity * (0.6 + 0.4 * Math.sin(t * 0.6 + o.userData.twinkleOffset));
          o.rotation.y += 0.0006;
        });
        renderer.render(scene, camera);
      };
      animate();
    });
  }

  // Diagonal light-sweep effect behind a pill button (e.g. the "Blog" CTA).
  function createSweepScene(canvas) {
    waitForThree(() => {
      const THREE = window.THREE;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || 140, h = rect.height || 46;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h, false);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 0.5, -0.5, 0.1, 10);
      camera.position.z = 2;
      const geo = new THREE.PlaneGeometry(0.3, 2.2);
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.z = 0.55;
      scene.add(mesh);
      let t = 0;
      const visibleS = makeVisibilityGate(canvas);
      const animate = () => {
        requestAnimationFrame(animate);
        if (!visibleS()) return;
        t += 0.016;
        const cycle = (t * (1 / 2.6) * 2.6) % 2.6 - 1.3;
        mesh.position.x = cycle;
        renderer.render(scene, camera);
      };
      animate();
    });
  }

  window.SharedScenes = { waitForThree, makeVisibilityGate, createIcosaScene, createParticleFieldScene, createSweepScene };
  // Back-compat alias used by page hero banners.
  window.createIcosaScene = createIcosaScene;
})();
