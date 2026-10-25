(function () {
  const categories = window.VD_DATA.categories;

  const skillDefs = window.VD_DATA.skills;

  let activeCategory = null;
  let soundOn = false;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let audioCtx = null;
  let dragging = null, dragMoved = false, dragStart = { x: 0, y: 0 };
  const refs = [], popped = [];
  let balls = [];
  let fallingWords = [];
  let landedBlocks = [];
  let fieldEl = null;

  const ICON_PLAY = '<svg width="13" height="13" viewBox="0 0 24 24" fill="#5b6178"><path d="M8 5v14l11-7z"/></svg>';
  const ICON_PAUSE = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5b6178" stroke-width="2"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
  const ICON_SOUND_ON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5b6178" stroke-width="2"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>';
  const ICON_SOUND_OFF = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5b6178" stroke-width="2"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M16 9l5 6M21 9l-5 6"/></svg>';

  function playPop() {
    if (!soundOn) return;
    try {
      const ctx = audioCtx || (audioCtx = new (window.AudioContext || window.webkitAudioContext)());
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(950, t);
      o.frequency.exponentialRampToValueAtTime(140, t + 0.14);
      g.gain.setValueAtTime(0.3, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.22);
    } catch (e) {}
  }

  function popBubble(i) {
    if (popped[i]) return;
    popped[i] = true;
    const status = document.getElementById('playground-status');
    if (status) status.textContent = skillDefs[i].name + ' revealed.';
    playPop();
    const el = refs[i];
    const b = balls[i];
    const def = skillDefs[i];
    if (el) {
      el.style.transform += ' scale(1.3)';
      el.style.opacity = '0';
      setTimeout(() => { if (el) el.style.display = 'none'; }, 220);
    }
    if (b && fieldEl) {
      const text = def.name;
      const w = Math.max(64, text.length * 7.5 + 28);
      const h = 42;
      const startX = Math.max(4, Math.min(fieldEl.clientWidth - w - 4, b.x - w / 2));
      const startY = Math.max(4, b.y - h / 2);
      const wordEl = document.createElement('div');
      wordEl.textContent = text;
      Object.assign(wordEl.style, {
        position: 'absolute', left: '0px', top: '0px',
        transform: `translate(${startX}px, ${startY}px)`,
        width: w + 'px', height: h + 'px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '4px 10px', boxSizing: 'border-box',
        background: `oklch(${def.light}% 0.15 ${def.hue})`,
        color: '#ffffff', fontWeight: '600', fontSize: '13px', borderRadius: '10px',
        boxShadow: '0 6px 14px rgba(28,32,48,0.22)', willChange: 'transform',
      });
      fieldEl.appendChild(wordEl);
      fallingWords.push({ el: wordEl, x: startX, y: startY, vy: 0, w, h, landed: false });
    }
  }

  function makeBall(def) {
    const field = document.getElementById('ts-ball-field');
    const w = field.clientWidth, h = field.clientHeight;
    const r = def.size / 2;
    return {
      x: r + Math.random() * (w - def.size),
      y: r + Math.random() * (h - def.size),
      vx: (Math.random() - 0.5) * 4.6,
      vy: (Math.random() - 0.5) * 4.6,
      size: def.size,
    };
  }

  function renderBalls() {
    const field = document.getElementById('ts-ball-field');
    field.innerHTML = '';
    skillDefs.forEach((def, i) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.setAttribute('aria-label', 'Reveal ' + def.name);
      el.className = 'ts-ball';
      el.style.cssText = `position:absolute;top:0;left:0;will-change:transform;width:${def.size}px;height:${def.size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;text-align:center;padding:6px;background:linear-gradient(155deg, oklch(${def.light}% 0.16 ${def.hue} / 0.34) 0%, oklch(${def.light}% 0.16 ${def.hue} / 0.16) 100%);border:1px solid rgba(255,255,255,0.75);box-shadow:0 8px 20px rgba(28,32,48,0.1), inset 0 12px 18px rgba(255,255,255,0.55), inset 0 -12px 20px rgba(28,32,48,0.06);cursor:grab;user-select:none;transition:box-shadow 0.2s, filter 0.2s, transform 0.22s ease-out, opacity 0.22s ease-out;`;
      const span = document.createElement('span');
      span.textContent = def.name;
      span.style.cssText = `font-size:${Math.max(11, Math.round(def.size / 7.2))}px;font-weight:700;color:oklch(${Math.max(24, def.light - 20)}% 0.13 ${def.hue});line-height:1.15;text-shadow:0 1px 1px rgba(255,255,255,0.4);`;
      el.appendChild(span);
      el.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        dragging = i; dragMoved = false; dragStart = { x: e.clientX, y: e.clientY };
        el.setPointerCapture(e.pointerId);
      });
      el.addEventListener('click', (e) => { if (e.detail === 0 && !popped[i]) popBubble(i); });
      field.appendChild(el);
      refs[i] = el;
    });
    fieldEl = field;
  }

  function applyDim() {
    skillDefs.forEach((def, i) => {
      const el = refs[i];
      if (!el) return;
      const dimmed = activeCategory !== null && def.category !== activeCategory;
      el.style.filter = dimmed ? 'grayscale(0.85) opacity(0.28)' : '';
      el.style.pointerEvents = dimmed ? 'none' : '';
      el.disabled = dimmed;
    });
  }

  function renderCategories() {
    const cnt = document.getElementById('ts-stat-count');
    if (cnt) cnt.textContent = String(skillDefs.length).padStart(2, '0');
    const el = document.getElementById('ts-categories');
    el.innerHTML = categories.map((c) => {
      const active = activeCategory === c.key;
      return `<button type="button" aria-pressed="${active}" data-cat="${c.key}" style="display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; padding: 6px 13px; border-radius: 16px; cursor: pointer; background: ${active ? `oklch(52% 0.16 ${c.hue} / 0.14)` : 'transparent'}; color: ${active ? `oklch(30% 0.16 ${c.hue})` : '#5b6178'}; border: 1px solid ${active ? `oklch(52% 0.16 ${c.hue} / 0.45)` : 'rgba(28,32,48,0.14)'}; transition: background .2s, border-color .2s, color .2s;">
        <span style="width: 7px; height: 7px; border-radius: 50%; background: oklch(52% 0.16 ${c.hue}); flex-shrink: 0;"></span>
        ${c.label}
      </div>`;
    }).join('');
    el.querySelectorAll('[data-cat]').forEach((node) => {
      node.addEventListener('click', () => {
        const key = node.getAttribute('data-cat');
        activeCategory = activeCategory === key ? null : key;
        renderCategories();
        applyDim();
        el.querySelector(`[data-cat="${key}"]`).focus();
      });
    });
  }

  function renderControls() {
    document.getElementById('ts-sound-btn').innerHTML = soundOn ? ICON_SOUND_ON : ICON_SOUND_OFF;
    document.getElementById('ts-pause-btn').innerHTML = paused ? ICON_PLAY : ICON_PAUSE;
    document.getElementById('ts-sound-btn').setAttribute('aria-pressed', String(soundOn));
    document.getElementById('ts-pause-btn').setAttribute('aria-pressed', String(paused));
    document.getElementById('ts-pause-btn').setAttribute('aria-label', paused ? 'Resume motion' : 'Pause motion');
  }

  function resetAll() {
    fallingWords.forEach((fw) => { if (fw.el && fw.el.parentNode) fw.el.parentNode.removeChild(fw.el); });
    fallingWords = [];
    landedBlocks = [];
    const w = fieldEl.clientWidth || 1000, h = fieldEl.clientHeight || 560;
    skillDefs.forEach((def, i) => {
      popped[i] = false;
      const r = def.size / 2;
      balls[i] = {
        x: r + Math.random() * (w - def.size),
        y: r + Math.random() * (h - def.size),
        vx: (Math.random() - 0.5) * 4.6,
        vy: (Math.random() - 0.5) * 4.6,
        size: def.size,
      };
      const el = refs[i];
      if (el) {
        el.style.display = 'flex';
        el.style.opacity = '1';
        el.style.transform = `translate(${balls[i].x - r}px, ${balls[i].y - r}px)`;
      }
    });
  }

  function step() {
    if (fieldEl && !paused && !document.hidden && !document.getElementById('stack-playground').hidden) {
      const w = fieldEl.clientWidth, h = fieldEl.clientHeight;
      balls.forEach((b, i) => {
        if (i === dragging || popped[i]) return;
        b.x += b.vx; b.y += b.vy;
        const r = b.size / 2;
        if (b.x - r < 0) { b.x = r; b.vx = Math.abs(b.vx); }
        if (b.x + r > w) { b.x = w - r; b.vx = -Math.abs(b.vx); }
        if (b.y - r < 0) { b.y = r; b.vy = Math.abs(b.vy); }
        if (b.y + r > h) { b.y = h - r; b.vy = -Math.abs(b.vy); }
      });
      for (let i = 0; i < balls.length; i++) {
        if (popped[i]) continue;
        for (let j = i + 1; j < balls.length; j++) {
          if (popped[j]) continue;
          const a = balls[i], b = balls[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const minDist = (a.size + b.size) / 2;
          if (dist < minDist) {
            const overlap = minDist - dist;
            const nx = dx / dist, ny = dy / dist;
            if (i !== dragging) { a.x -= nx * overlap * 0.5; a.y -= ny * overlap * 0.5; }
            if (j !== dragging) { b.x += nx * overlap * 0.5; b.y += ny * overlap * 0.5; }
          }
        }
      }
      fallingWords.forEach((fw) => {
        if (fw.landed) return;
        fw.vy = Math.min(fw.vy + 0.1, 1.8);
        fw.x = Math.max(0, Math.min(w - fw.w, fw.x));
        fw.y += fw.vy;
        let surfaceY = h;
        landedBlocks.forEach((lb) => {
          const overlap = fw.x < lb.x + lb.w && fw.x + fw.w > lb.x;
          if (overlap && lb.y < surfaceY) surfaceY = lb.y;
        });
        if (fw.y + fw.h >= surfaceY) {
          fw.y = surfaceY - fw.h;
          fw.landed = true;
          landedBlocks.push({ x: fw.x, y: fw.y, w: fw.w, h: fw.h });
        }
        fw.el.style.transform = `translate(${fw.x}px, ${fw.y}px)`;
      });
    }
    balls.forEach((b, i) => {
      if (popped[i]) return;
      const el = refs[i];
      if (el) { const r = b.size / 2; el.style.transform = `translate(${b.x - r}px, ${b.y - r}px)`; }
    });
    requestAnimationFrame(step);
  }

  function init() {
    const heroCanvas = document.getElementById('hero-icosa-canvas');
    if (heroCanvas && window.createIcosaScene) window.createIcosaScene(heroCanvas, 0.32);

    renderCategories();
    renderControls();
    renderBalls();
    balls = skillDefs.map(makeBall);

    document.getElementById('ts-sound-btn').addEventListener('click', () => { soundOn = !soundOn; renderControls(); });
    document.getElementById('ts-pause-btn').addEventListener('click', () => { paused = !paused; renderControls(); });
    document.getElementById('ts-reset-btn').addEventListener('click', resetAll);

    window.addEventListener('pointermove', (e) => {
      if (dragging === null) return;
      const dx = e.clientX - dragStart.x, dy = e.clientY - dragStart.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) dragMoved = true;
      const rect = fieldEl.getBoundingClientRect();
      const b = balls[dragging];
      b.x = e.clientX - rect.left; b.y = e.clientY - rect.top;
      b.vx = 0; b.vy = 0;
    });
    window.addEventListener('pointerup', () => {
      if (dragging !== null && !dragMoved) popBubble(dragging);
      dragging = null;
    });
    window.addEventListener('pointercancel', () => { dragging = null; });

    requestAnimationFrame(step);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
