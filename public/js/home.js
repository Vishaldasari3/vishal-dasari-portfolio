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
  let nameLine2Locked = false;

  const header = document.getElementById('vd-header');
  const navItems = document.getElementById('vd-nav-items');
  const blogWrap = document.querySelector('#vd-header-grid > div:last-child');
  const logo = document.querySelector('.logo');
  const headshotWrap = document.getElementById('vd-headshot-wrap');
  const headshotShadow = document.getElementById('vd-headshot-shadow');
  const nameBlock = document.getElementById('vd-name-block');
  const introBlock = document.getElementById('vd-intro-block');
  const card = document.getElementById('vd-card');
  const orb1 = document.getElementById('vd-orb1');
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

    const bob = Math.sin(t * 1.1) * 6;
    const parX = mx * 10;
    headshotWrap.style.transform = mounted
      ? `translateX(calc(-50% + ${parX}px)) translateY(${bob + my * 6}px)`
      : `translateX(calc(-50% + ${parX}px)) translateY(${bob + 24}px)`;
    if (headshotShadow) {
      const k = 1 - (bob + 6) / 24; // higher image -> smaller, lighter shadow
      headshotShadow.style.transform = `translateX(calc(-50% + ${parX * 0.6}px)) scale(${0.88 + k * 0.12}, 1)`;
      headshotShadow.style.opacity = mounted ? String(0.7 + k * 0.3) : '0';
    }

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
    if (!nameLine2Locked) {
      nameLine2El.innerHTML = showNameLine2 ? `${escapeHtml(typedNameLine2)}<span style="opacity:${nameCursorVisible && showNameLine2 ? 1 : 0}">${nameCursor2 || '|'}</span>` : '';
      if (showNameLine2 && typedNameLine2 === nameLine2 && nameLine2El.classList.contains('gradname')) {
        nameLine2El.innerHTML = escapeHtml(typedNameLine2);
        nameLine2Locked = true;
      }
    }

    requestAnimationFrame(tick);
  }

  function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

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
            if (typedChars >= fullText.length) {
              clearInterval(roleInterval);
              nameLine2El.classList.add('gradname');
            }
          }, 35);
        }, 500);
      }
    }, 140);
  }

  function initHeaderScenes() {
    initBlogSweep();
  }

  function initBlogSweep() {
    const blogCanvas = document.getElementById('vd-blog-fx-canvas');
    if (!blogCanvas) return;
    if (!window.SharedScenes) { setTimeout(initBlogSweep, 200); return; }
    window.SharedScenes.createSweepScene(blogCanvas);
  }

  function initNavPill() {
    const pill = document.getElementById('vd-nav-pill');
    if (!pill || !navItems) return;
    const links = [...navItems.querySelectorAll('a')];
    const moveTo = (a) => {
      pill.style.transform = `translate(${a.offsetLeft}px, ${a.offsetTop}px)`;
      pill.style.width = a.offsetWidth + 'px';
      pill.style.height = a.offsetHeight + 'px';
      pill.style.opacity = '1';
    };
    links.forEach((a) => a.addEventListener('mouseenter', () => moveTo(a)));
    navItems.addEventListener('mouseleave', () => { pill.style.opacity = '0'; });
  }

  function init() {
    startTime = Date.now();
    equalizeLogoLines();
    initNavPill();
    requestAnimationFrame(() => requestAnimationFrame(() => { mounted = true; applyEntrance(); }));
    setTimeout(() => { mounted = true; applyEntrance(); }, 300);

    initHeaderScenes();

    window.addEventListener('scroll', () => {
      const s = window.scrollY > 24;
      if (s !== scrolled) { scrolled = s; applyScroll(); }
    }, { passive: true });
    applyScroll();

    window.addEventListener('resize', equalizeLogoLines, { passive: true });

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
