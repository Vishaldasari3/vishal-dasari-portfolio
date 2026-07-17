(function () {
  const line1 = 'Senior Software Engineer,';
  const line2 = 'based in United States.';
  const fullText = line1 + ' ' + line2;
  const nameLine1 = "I'm";
  const nameLine2 = 'Vishal Dasari';
  const nameFullText = nameLine1 + '\n' + nameLine2;

  let mounted = false;
  let scrolled = false;
  let t = 0, mx = 0, my = 0;
  let typedChars = 0, typedNameChars = 0;
  let nameCursorVisible = false, roleTypingStarted = false;

  const header = document.getElementById('vd-header');
  const navItems = document.getElementById('vd-nav-items');
  const blogWrap = document.querySelector('#vd-header-grid > div:last-child');
  const logo = document.querySelector('.logo');
  const headshotWrap = document.getElementById('vd-headshot-wrap');
  const nameBlock = document.getElementById('vd-name-block');
  const introBlock = document.getElementById('vd-intro-block');
  const card = document.getElementById('vd-card');
  const orb1 = document.getElementById('vd-orb1');
  const orb2 = document.getElementById('vd-orb2');
  const nameLine1El = document.getElementById('vd-name-line1');
  const nameLine2El = document.getElementById('vd-name-line2');
  const roleLineEl = document.getElementById('vd-role-line');

  function applyEntrance() {
    const hiddenY = 'translateY(18px)';
    const shown = 'translateY(0)';
    header.style.opacity = mounted ? '1' : '0';
    header.style.transform = mounted ? shown : hiddenY;
    headshotWrap.style.opacity = mounted ? '1' : '0';
    nameBlock.style.opacity = mounted ? '1' : '0';
    nameBlock.style.transform = mounted ? shown : hiddenY;
    introBlock.style.opacity = mounted ? '1' : '0';
    introBlock.style.transform = mounted ? shown : hiddenY;
  }

  function applyScroll() {
    header.style.top = (scrolled ? 10 : 24) + 'px';
    header.style.background = scrolled ? 'rgba(255,255,255,0.75)' : 'transparent';
    header.style.backdropFilter = scrolled ? 'blur(16px)' : 'none';
    header.style.boxShadow = scrolled ? '0 8px 24px rgba(28,32,48,0.1)' : 'none';
    const scale = scrolled ? 0.86 : 1;
    logo.style.transform = `scale(${scale})`;
    navItems.style.padding = scrolled ? '4px' : '7px';
    const linkPad = scrolled ? '7px 13px' : '9px 16px';
    navItems.querySelectorAll('a').forEach((a) => { a.style.padding = linkPad; });
  }

  function tick() {
    t = (Date.now() - startTime) / 1000;

    const breathe = Math.sin(t * 0.35) * 6;
    card.style.background = `linear-gradient(155deg, #b6bfd8 0%, #aeb8d2 ${55 + breathe}%, #a7b2cd 100%)`;

    const orb1X = -60 + Math.sin(t * 0.25) * 18;
    const orb1Y = -80 + Math.cos(t * 0.2) * 14;
    const orb2X = -50 + Math.cos(t * 0.22) * 16;
    const orb2Y = -70 + Math.sin(t * 0.28) * 12;
    orb1.style.right = orb1X + 'px';
    orb1.style.top = orb1Y + 'px';
    orb2.style.left = orb2X + 'px';
    orb2.style.bottom = orb2Y + 'px';

    const bob = Math.sin(t * 1.1) * 6;
    const parX = mx * 10;
    headshotWrap.style.transform = mounted
      ? `translateX(calc(-50% + ${parX}px)) translateY(${bob + my * 6}px)`
      : `translateX(calc(-50% + ${parX}px)) translateY(${bob + 24}px)`;

    const blink = Math.floor(t * 2) % 2 === 0;

    const combined = fullText.slice(0, typedChars);
    const splitIdx = line1.length;
    let typedLine1 = combined, typedLine2 = '', showLine2 = false;
    if (combined.length > splitIdx) {
      typedLine1 = line1;
      typedLine2 = combined.slice(splitIdx).replace(/^,?\s*/, '');
      showLine2 = true;
    }
    const cursor1 = roleTypingStarted && !showLine2 && blink ? '|' : '';
    const cursor2 = roleTypingStarted && showLine2 && blink ? '|' : '';
    roleLineEl.innerHTML = `<span style="white-space: nowrap;">${escapeHtml(typedLine1)}</span><span>${cursor1}</span>` +
      (showLine2 ? `<br/>${escapeHtml(typedLine2)}<span>${cursor2}</span>` : '');

    const nameCombined = nameFullText.slice(0, typedNameChars);
    const nameSplitIdx = nameLine1.length;
    let typedNameLine1 = nameCombined, typedNameLine2 = '', showNameLine2 = false;
    if (nameCombined.length > nameSplitIdx) {
      typedNameLine1 = nameLine1;
      typedNameLine2 = nameCombined.slice(nameSplitIdx).replace(/^\n/, '');
      showNameLine2 = true;
    }
    const nameCursor1 = nameCursorVisible && !showNameLine2 && blink ? '|' : '';
    const nameCursor2 = nameCursorVisible && showNameLine2 && blink ? '|' : '';
    nameLine1El.innerHTML = `${escapeHtml(typedNameLine1)}<span style="opacity:${nameCursorVisible && !showNameLine2 ? 1 : 0}">${nameCursor1 || '|'}</span>`;
    nameLine2El.innerHTML = showNameLine2 ? `${escapeHtml(typedNameLine2)}<span style="opacity:${nameCursorVisible && showNameLine2 ? 1 : 0}">${nameCursor2 || '|'}</span>` : '';

    requestAnimationFrame(tick);
  }

  function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  let startTime;

  function startTypewriters() {
    nameCursorVisible = true;
    const nameInterval = setInterval(() => {
      typedNameChars++;
      if (typedNameChars >= nameFullText.length) {
        clearInterval(nameInterval);
        setTimeout(() => {
          nameCursorVisible = false;
          roleTypingStarted = true;
          const roleInterval = setInterval(() => {
            typedChars++;
            if (typedChars >= fullText.length) clearInterval(roleInterval);
          }, 35);
        }, 500);
      }
    }, 140);
  }

  function initHeaderScenes() {
    if (!window.SharedScenes) { requestAnimationFrame(initHeaderScenes); return; }
    const bgCanvas = document.getElementById('vd-header-bg-canvas');
    if (bgCanvas) window.SharedScenes.createParticleFieldScene(bgCanvas, { layers: [{ n: 24, z: -2, size: 0.05, op: 0.5 }, { n: 16, z: -4, size: 0.03, op: 0.25 }] });
    const blogCanvas = document.getElementById('vd-blog-fx-canvas');
    if (blogCanvas) window.SharedScenes.createSweepScene(blogCanvas);
  }

  function init() {
    startTime = Date.now();
    requestAnimationFrame(() => requestAnimationFrame(() => { mounted = true; applyEntrance(); }));
    setTimeout(() => { mounted = true; applyEntrance(); }, 300);

    initHeaderScenes();

    window.addEventListener('scroll', () => {
      const s = window.scrollY > 24;
      if (s !== scrolled) { scrolled = s; applyScroll(); }
    }, { passive: true });
    applyScroll();

    headshotWrap.addEventListener('mousemove', (e) => {
      const rect = headshotWrap.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    headshotWrap.addEventListener('mouseleave', () => { mx = 0; my = 0; });

    startTypewriters();
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
