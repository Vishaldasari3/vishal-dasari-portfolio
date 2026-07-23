(function(){
  var s = document.createElement('style');
  s.textContent = `
  html { overflow-x: hidden; } html, body { margin: 0; max-width: 100%; background: #aeb8d2; }
  * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
  a { color: #3654e0; text-decoration: none; }
  a:hover { color: #24399e; }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes gradflow {
    0%   { background-position: 240% 0, 0% 50%; }
    28%  { background-position: -120% 0, 84% 50%; }
    28.01% { background-position: 240% 0, 84.03% 50%; }
    100% { background-position: 240% 0, 300% 50%; }
  }
  .gradname {
    display: inline-block;
    background-image:
      linear-gradient(105deg, transparent 44%, rgba(219,234,254,.4) 50%, transparent 56%),
      linear-gradient(90deg, #1e3a8a, #2f6de8, #60a5fa, #2f6de8, #1e3a8a) !important;
    background-size: 240% 100%, 300% 100% !important;
    background-repeat: no-repeat, repeat !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    color: transparent !important;
    animation: gradflow 9s linear infinite;
    filter: drop-shadow(0 4px 18px rgba(59,130,246,.22));
  }
  @media (prefers-reduced-motion: reduce) {
    .gradname { animation: none; }
  }
  @keyframes badgesheen { 0% { transform: translateX(-130%) skewX(-12deg); } 15% { transform: translateX(130%) skewX(-12deg); } 100% { transform: translateX(130%) skewX(-12deg); } }
  .logo-badge::before { content: ''; position: absolute; inset: -55%; background: conic-gradient(from 0deg, #7c3aed, #4f7cff, #06d6f0, #4f7cff, #7c3aed); animation: spin 5s linear infinite; z-index: 0; }
  .logo-badge::after { content: ''; position: absolute; inset: 0; z-index: 3; background: linear-gradient(115deg, transparent 32%, rgba(255,255,255,.28) 46%, transparent 60%); transform: translateX(-130%) skewX(-12deg); animation: badgesheen 6s ease-in-out 2s infinite; pointer-events: none; }
  .logo:hover .logo-badge { transform: scale(1.07) rotate(-2deg); box-shadow: 0 12px 28px -10px rgba(79,124,255,.7); transition: transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s; }
  @media (prefers-reduced-motion: reduce) {
    .logo-badge::before, .logo-badge::after { animation: none !important; }
    .logo:hover .logo-badge { transform: none !important; box-shadow: none !important; transition: none !important; }
  }

  #vd-social a { position: relative; overflow: visible !important; border-radius: 14px !important; background: rgba(255,255,255,0.55) !important; backdrop-filter: blur(10px); border: 1px solid rgba(28,32,48,0.08); box-shadow: 0 4px 14px rgba(28,32,48,0.06); }
  #vd-social a img { border-radius: 8px; padding: 9px; }
  #vd-social a::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 15px;
    background: conic-gradient(from 0deg, #3654e0, #7c5cff, #22ddf5, #3654e0);
    opacity: 0;
    transition: opacity .3s;
    animation: spin 4s linear infinite;
    z-index: -1;
  }
  #vd-social a:hover::before { opacity: 1; }
  #vd-social a:hover { transform: translateY(-4px); box-shadow: 0 14px 28px rgba(28,32,48,0.16), 0 0 20px rgba(54,84,224,0.28); background: #ffffff !important; }
  #vd-social a img { transition: transform .3s cubic-bezier(.22,1,.36,1); }
  #vd-social a:hover img { transform: scale(1.08); }
  #vd-nav-items { position: relative; }
  @keyframes navbreath { 0%, 100% { box-shadow: 0 0 18px 0 rgba(54,84,224,.10); } 50% { box-shadow: 0 0 26px 4px rgba(54,84,224,.20); } }
  #vd-nav-items::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 999px;
    animation: navbreath 5s ease-in-out infinite;
    pointer-events: none;
  }
  @media (prefers-reduced-motion: reduce) { #vd-nav-items::before { animation: none; } }
  #vd-nav-items a { position: relative; z-index: 1; transition: color 0.15s, transform 0.25s cubic-bezier(.22,1,.36,1), padding 0.35s ease !important; }
  #vd-nav-items a:hover { transform: translateY(-1px); }
  #vd-nav-pill {
    position: absolute;
    top: 0;
    left: 0;
    height: 10px;
    width: 10px;
    border-radius: 999px;
    background: #3654e0;
    box-shadow: 0 2px 10px rgba(28,32,48,.14), inset 0 0 0 1px rgba(28,32,48,.05);
    opacity: 0;
    z-index: 0;
    transition: transform .35s cubic-bezier(.22,1,.36,1), width .35s cubic-bezier(.22,1,.36,1), height .35s cubic-bezier(.22,1,.36,1), opacity .25s;
    pointer-events: none;
  }
  #vd-header a:not(.logo):hover { color: #fff !important; }
  @media (prefers-reduced-motion: reduce) {
    #vd-nav-items::before { animation: none; }
  }

  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 12px;
    letter-spacing: .14em;
    text-transform: uppercase;
    font-weight: 700;
    padding: 16px 28px;
    border-radius: 99px;
    overflow: hidden;
    text-decoration: none;
    transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
  }
  .btn:hover { transform: translateY(-3px); }
  .btn-primary {
    color: #fff;
    background: linear-gradient(93deg, #4a63e8 0%, #5b8cff 34%, #3fb6ff 68%, #22ddf5 100%);
    background-size: 220% 100%;
    animation: hueflow 6s linear infinite;
    box-shadow: 0 16px 38px -14px rgba(54,84,224,.55);
  }
  .btn-primary:hover { box-shadow: 0 22px 48px -14px rgba(46,168,255,.6); }
  @keyframes hueflow { to { background-position: 220% 0; } }
  .btn .sheen {
    position: absolute;
    top: 0;
    left: -80%;
    width: 50%;
    height: 100%;
    background: linear-gradient(100deg, transparent, rgba(255,255,255,.55), transparent);
    transform: skewX(-20deg);
    pointer-events: none;
  }
  .btn:hover .sheen { animation: sheen .8s cubic-bezier(.22,1,.36,1); }
  .vd-touch-link:hover { color: #14162B; }
  .vd-touch-link:hover .vd-touch-arrow { transform: translateX(3px); }
  .vd-outline-btn:hover { border-color: #3654e0; background: #3654e0; color: #ffffff; transform: translateY(-2px); box-shadow: 0 12px 30px -10px rgba(54,84,224,0.55); }
  .vd-btn-sheen { position: absolute; top: 0; left: -80%; width: 50%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.65), transparent); transform: skewX(-20deg); pointer-events: none; }
  .vd-outline-btn:hover .vd-btn-sheen { animation: sheen .8s cubic-bezier(.22,1,.36,1); }
  @media (prefers-reduced-motion: reduce) { .vd-outline-btn:hover .vd-btn-sheen { animation: none; } }
  @keyframes sheen { to { left: 130%; } }
  @media (prefers-reduced-motion: reduce) {
    .btn-primary { animation: none; }
    .btn:hover .sheen { animation: none; }
  }

  @media (max-width: 1180px) {
    #vd-logo-badge { width: 38px !important; height: 38px !important; font-size: 14px !important; } #vd-logo-word { font-size: 12px !important; }
    #vd-header { padding: 0 8px !important; gap: 12px !important; }
  }
  @media (max-width: 860px) {
    #vd-header { flex-wrap: wrap !important; row-gap: 10px !important; justify-content: flex-start !important; gap: 10px !important; }
    #vd-header-grid { display: contents !important; }
    #vd-nav-toggle { display: inline-flex !important; order: 3 !important; }
    #vd-nav-items {
      order: 4 !important; position: absolute !important; top: calc(100% + 8px) !important; left: auto !important; right: 0 !important;
      flex: none !important; min-width: 0 !important; max-width: none !important; width: 200px !important; justify-self: unset !important;
      flex-direction: column !important; align-items: stretch !important; justify-content: flex-start !important; gap: 1px !important;
      background: rgba(255,255,255,0.98) !important; border: 1px solid rgba(224,228,245,0.9) !important; border-radius: 16px !important;
      box-shadow: 0 20px 44px -18px rgba(30,40,80,0.3), 0 1px 0 rgba(255,255,255,0.9) inset !important;
      max-height: 0 !important; overflow: hidden !important; opacity: 0 !important; padding: 0 6px !important;
      visibility: hidden !important; pointer-events: none !important;
      transform: translateY(-6px) scale(0.98) !important; transform-origin: top right !important;
      transition: max-height 0.35s cubic-bezier(.22,1,.36,1), opacity 0.24s ease, transform 0.28s cubic-bezier(.22,1,.36,1), padding 0.26s ease, visibility 0s linear 0.35s !important;
      z-index: 46 !important;
    }
    #vd-header.nav-open #vd-nav-items { max-height: 300px !important; opacity: 1 !important; padding: 6px !important; visibility: visible !important; pointer-events: auto !important; transform: translateY(0) scale(1) !important; transition: max-height 0.35s cubic-bezier(.22,1,.36,1), opacity 0.28s ease .04s, transform 0.3s cubic-bezier(.22,1,.36,1), padding 0.26s ease, visibility 0s !important; }
    #vd-nav-items::before { display: none !important; }
    #vd-nav-pill { display: none !important; }
    #vd-nav-items a {
      flex: 0 0 auto !important; text-align: left !important; padding: 10px 12px !important; font-size: 13.5px !important;
      white-space: nowrap !important; min-width: 0 !important; border-radius: 9px !important;
      display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 8px !important;
      transition: color 0.15s, background 0.15s, opacity 0.24s ease, transform 0.26s cubic-bezier(.22,1,.36,1) !important;
    }
    #vd-nav-items a::before { display: none !important; }
    #vd-nav-items a::after { content: ''; width: 5px; height: 5px; border-radius: 50%; background: linear-gradient(135deg,#5b8cff,#22ddf5); opacity: 0; flex-shrink: 0; transition: opacity .15s; }
    #vd-nav-items a:not(.nav-active-chip):hover { background: rgba(54,84,224,0.07) !important; color: #0a0c16 !important; }
    #vd-nav-items a:not(.nav-active-chip):hover::after { opacity: 0.6; }
    #vd-nav-items a.nav-active-chip { background: rgba(54,84,224,0.09) !important; background-image: none !important; color: #3654e0 !important; font-weight: 600 !important; box-shadow: none !important; }
    #vd-nav-items a.nav-active-chip::after { display: none; }
    #vd-header-grid > div:last-child { order: 2 !important; flex: 0 0 auto !important; justify-content: flex-end !important; margin-left: auto !important; }
  }
  @media (max-width: 1180px) {
    #vd-card {
      aspect-ratio: unset !important; min-height: 100vh !important; display: flex !important;
      flex-direction: column !important; align-items: center !important; justify-content: flex-start !important;
      padding: 92px 20px 48px !important; gap: 28px !important;
    }
    #vd-header { position: fixed !important; top: 10px !important; left: 10px !important; right: 10px !important; width: auto !important; flex-wrap: wrap !important; row-gap: 8px !important; padding: 10px 12px !important; border-radius: 16px !important; background: rgba(244,246,253,0.92) !important; backdrop-filter: blur(18px) saturate(1.4) !important; -webkit-backdrop-filter: blur(18px) saturate(1.4) !important; box-shadow: 0 14px 32px -18px rgba(40,50,90,0.35) !important; z-index: 50 !important; }
    #vd-nav-items { flex-wrap: nowrap !important; }
    #vd-headshot-wrap { position: static !important; width: 58% !important; max-width: 320px !important; height: auto !important; transform: none !important; order: 3 !important; }
    #vd-headshot-wrap img { filter: none !important; }
    #vd-name-block { display: contents !important; }
    #vd-name-block > div:first-child { justify-content: center !important; order: 1 !important; }
    #vd-name-block > div:nth-child(2) { text-align: center !important; order: 2 !important; max-width: 100% !important; min-height: 88px !important; }
    #vd-name-block > div:nth-child(2) > div { font-size: 42px !important; }
    #vd-social { order: 4 !important; margin-top: 0 !important; }
    #vd-stats { order: 5 !important; margin-top: 0 !important; flex-wrap: wrap !important; justify-content: center !important; }
    #vd-intro-block { position: static !important; width: 100% !important; max-width: 440px !important; align-items: center !important; text-align: center !important; order: 6 !important; }
    #vd-role-line { max-width: 100% !important; white-space: normal !important; overflow-wrap: anywhere !important; }
    #vd-role-line * { white-space: normal !important; }
    #vd-headshot-shadow { display: none !important; }
  }
  @media (max-width: 640px) {
    #vd-card { padding: 84px 20px 40px !important; gap: 22px !important; }
    #vd-headshot-wrap { width: 52% !important; max-width: 250px !important; }
    #vd-name-block > div:nth-child(2) > div { font-size: 36px !important; }
    #vd-name-block > div:nth-child(2) { min-height: 76px !important; }
  }
  @media (max-width: 480px) {
    #vd-nav-items { gap: 2px !important; }
    #vd-headshot-wrap { width: 48% !important; max-width: 210px !important; }
  }
`;
  document.head.appendChild(s);
})();
