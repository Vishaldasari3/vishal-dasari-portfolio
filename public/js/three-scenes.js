// Shared decorative three.js scene builders, used by common.js and home.js.
(function () {
  function waitForThree(cb) {
    if (window.THREE) cb();
    else requestAnimationFrame(() => waitForThree(cb));
  }

  // Wireframe icosahedron used on page hero banners.
  function createIcosaScene(canvas, opacity) {
    waitForThree(() => {
      const THREE = window.THREE;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || 220, h = rect.height || 220;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h, false);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
      camera.position.z = 3.4;
      const geo = new THREE.IcosahedronGeometry(1, 0);
      const mat = new THREE.MeshBasicMaterial({ color: 0x3654e0, wireframe: true, transparent: true, opacity: opacity ?? 0.25 });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      const animate = () => {
        mesh.rotation.y += 0.004;
        mesh.rotation.x += 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
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
      const animate = () => {
        t += 0.016;
        objs.forEach((o) => {
          o.material.opacity = o.userData.baseOpacity * (0.6 + 0.4 * Math.sin(t * 0.6 + o.userData.twinkleOffset));
          o.rotation.y += 0.0006;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
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
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
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
      const animate = () => {
        t += 0.016;
        const cycle = (t * (1 / 2.6) * 2.6) % 2.6 - 1.3;
        mesh.position.x = cycle;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    });
  }

  window.SharedScenes = { waitForThree, createIcosaScene, createParticleFieldScene, createSweepScene };
  // Back-compat alias used by page hero banners.
  window.createIcosaScene = createIcosaScene;
})();
