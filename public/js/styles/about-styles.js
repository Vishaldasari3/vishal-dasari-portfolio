(function(){
  var s = document.createElement('style');
  s.textContent = `
  html { overflow-x: hidden; } html, body { margin: 0; max-width: 100%; background: #f4f5f9; background-image: radial-gradient(rgba(54,84,224,0.05) 1px, transparent 1px); background-size: 26px 26px; }
  * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
  a { color: #3654e0; text-decoration: none; }
  a:hover { color: #24399e; }

  @media (max-width: 900px) {
    #ab-hero-inner { flex-direction: column-reverse !important; text-align: center !important; gap: 32px !important; }
    #ab-hero-text { align-items: center !important; max-width: 100% !important; }
    #ab-hero-photo { width: 60% !important; max-width: 260px !important; }
    #ab-skills-grid { grid-template-columns: 1fr !important; }
    .ab-sec { grid-template-columns: 1fr !important; gap: 24px !important; padding: 44px 0 !important; }
    .ab-label { position: static !important; }
    .ab-lead { font-size: 22px !important; }
    .ab-stats { grid-template-columns: 1fr 1fr !important; }
    .ab-cols { column-count: 1 !important; }
    .ab-edu-year { font-size: 13px !important; min-width: 60px !important; }
  }
  @media (max-width: 480px) {
    #ab-skills-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 1180px) {
    #site-header-row { padding: 18px 20px !important; gap: 12px !important; }
  }
  @media (max-width: 640px) {
    div[style*="72px 56px 32px"] { padding-left: 16px !important; padding-right: 16px !important; padding-top: 44px !important; padding-bottom: 48px !important; }
    div[style*="padding: 28px 24px 4px"] { padding: 16px 12px 4px !important; }
    #ab-skills-grid { grid-template-columns: 1fr !important; } #ab-skills-grid > div { min-width: 0 !important; }
  }

  .hv20:hover, .hv21:hover, .hv22:hover, .hv23:hover, .hv24:hover, .hv25:hover, .hv26:hover { transform: translateY(-4px); box-shadow: 0 16px 34px rgba(28,32,48,0.1); border-color: #b9c2ee; }
  .ab-sec { display: grid; grid-template-columns: 220px 1fr; gap: 48px; padding: 64px 0; border-top: 1px solid rgba(28,32,48,0.09); }
  .ab-sec:first-child { border-top: none; padding-top: 8px; }
  .ab-label { position: sticky; top: 110px; align-self: start; display: flex; flex-direction: column; gap: 8px; }
  .ab-label .num { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 800; color: #3654e0; letter-spacing: 2px; }
  .ab-label .ttl { font-size: 13px; font-weight: 600; color: #1c2030; letter-spacing: 1.8px; text-transform: uppercase; }
  .ab-lead { font-size: clamp(22px, 2.6vw, 31px); font-weight: 600; color: #14162b; line-height: 1.42; letter-spacing: -0.5px; text-wrap: pretty; }
  .ab-lead em { font-style: normal; background-image: linear-gradient(92deg, #3654e0, #7c5cff 55%, #22b8f5); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .ab-cols { column-count: 2; column-gap: 40px; font-size: 15px; color: #565d73; line-height: 1.85; }
  .ab-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .ab-stat { border: 1px solid rgba(28,32,48,0.1); border-radius: 16px; padding: 20px 22px; background: rgba(255,255,255,0.6); transition: border-color .3s, transform .3s cubic-bezier(.22,1,.36,1); }
  .ab-stat:hover { border-color: rgba(54,84,224,.4); transform: translateY(-3px); }
  .ab-stat .v { font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 800; color: #14162b; letter-spacing: -1px; }
  .ab-stat .k { font-size: 12px; font-weight: 500; color: #7a8199; letter-spacing: 0.8px; text-transform: uppercase; margin-top: 4px; }
  .ab-edu-row { display: flex; align-items: baseline; gap: 28px; padding: 24px 6px; border-bottom: 1px solid rgba(28,32,48,0.09); transition: background .25s, padding-left .3s cubic-bezier(.22,1,.36,1); border-radius: 6px; }
  .ab-edu-row:hover { background: rgba(54,84,224,0.04); padding-left: 16px; }
  .ab-edu-year { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800; color: #3654e0; min-width: 78px; flex-shrink: 0; }
  .ab-edu-item { position: relative; display: flex; gap: 22px; padding: 14px 6px; }
  .ab-edu-node { position: relative; z-index: 1; flex-shrink: 0; width: 16px; display: flex; justify-content: center; padding-top: 6px; }
  .ab-edu-dot { width: 15px; height: 15px; border-radius: 50%; background: #f7f9ff; border: 2px solid #3654e0; display: block; transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s; }
  .ab-edu-card { flex: 1; min-width: 0; background: rgba(255,255,255,0.7); border: 1px solid rgba(28,32,48,0.08); border-radius: 16px; padding: 18px 22px; transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s; }
  .ab-edu-gpa { font-size: 11.5px; font-weight: 700; color: #3654e0; background: rgba(54,84,224,0.08); border: 1px solid rgba(54,84,224,0.2); padding: 3px 10px; border-radius: 999px; flex-shrink: 0; }
  .ab-edu-verify { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 700; color: #3654e0; background: rgba(54,84,224,0.08); border: 1px solid rgba(54,84,224,0.2); padding: 3px 10px; border-radius: 999px; width: fit-content; transition: background .2s, color .2s, border-color .2s; }
  .ab-edu-verify:hover { background: #3654e0; color: #ffffff; border-color: #3654e0; }
  .ab-edu-item:hover .ab-edu-card { transform: translateX(4px); box-shadow: 0 12px 28px -14px rgba(28,32,48,0.22); border-color: rgba(54,84,224,0.25); }
  .ab-edu-item:hover .ab-edu-dot { transform: scale(1.25); box-shadow: 0 0 0 5px rgba(54,84,224,0.14); }
  @media (prefers-reduced-motion: reduce) { .ab-stat, .ab-edu-row, .ab-edu-card, .ab-edu-dot { transition: none; } }
  .hv27:hover { transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,0.24); }
  .ab-skill { position: relative; overflow: hidden; background: rgba(255,255,255,0.75); border: 1px solid rgba(28,32,48,0.1); border-radius: 20px; padding: 26px; transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s; }
  .ab-skill::before { content: ''; position: absolute; inset: 0; background: radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(54,84,224,0.08), transparent 65%); opacity: 0; transition: opacity .3s; pointer-events: none; }
  .ab-skill:hover::before { opacity: 1; }
  .ab-skill:hover { transform: translateY(-5px); box-shadow: 0 20px 44px -16px rgba(40,50,90,.24); border-color: rgba(54,84,224,.3); }
  .ab-skill .sk-num { position: absolute; top: 14px; right: 20px; font-size: 46px; font-weight: 800; color: rgba(28,32,48,0.05); line-height: 1; letter-spacing: -2px; pointer-events: none; }
  .ab-skill .sk-icon { width: 44px; height: 44px; border-radius: 13px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: transform .35s cubic-bezier(.34,1.56,.64,1); position: relative; }
  .ab-skill:hover .sk-icon { transform: scale(1.1) rotate(-4deg); }
  .sk-chip { font-size: 12.5px; color: #3a3f5c; background: transparent; border: 1px solid rgba(28,32,48,0.14); padding: 6px 13px; border-radius: 20px; transition: background .2s, color .2s, border-color .2s, transform .2s; cursor: default; }
  .sk-chip:hover { background: #3654e0; color: #ffffff; border-color: #3654e0; transform: translateY(-2px); }
  #resume-cta-btn:hover { background: #3654e0 !important; color: #ffffff !important; transform: translateY(-2px); box-shadow: 0 10px 22px -8px rgba(54,84,224,0.5); }
  #resume-cta-btn:hover svg { stroke: #ffffff; }
  #resume-cta-btn:hover #resume-cta-arrow { transform: translateY(2px); }
  @keyframes rcta-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  @keyframes rcta-sheen { 0% { transform: translateX(-160%) skewX(-18deg); } 100% { transform: translateX(340%) skewX(-18deg); } }
  @keyframes rcta-line { 0%, 100% { width: 55%; opacity: 0.35; } 50% { width: 80%; opacity: 0.7; } }
  @keyframes rcta-dot { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.6); opacity: 1; } }
  #resume-cta-sheets { animation: rcta-float 4.5s ease-in-out infinite; }
  #resume-sheet-front span:last-child { animation: rcta-line 3.2s ease-in-out infinite; background: #3654e0 !important; }
  #resume-cta-sheen { position: absolute; top: 0; bottom: 0; width: 22%; background: linear-gradient(90deg, transparent, rgba(54,84,224,0.06), transparent); animation: rcta-sheen 5s ease-in-out infinite; pointer-events: none; }
  #resume-cta-dot { animation: rcta-dot 2.4s ease-in-out infinite; }
  #resume-cta:hover #resume-sheet-back { transform: rotate(-12deg) translateX(-3px); }
  #resume-cta:hover #resume-sheet-front { transform: rotate(0deg) translateY(-2px); }
  @media (prefers-reduced-motion: reduce) { #resume-sheet-back, #resume-sheet-front, #resume-cta-btn { transition: none; } #resume-cta-sheets, #resume-sheet-front span:last-child, #resume-cta-sheen, #resume-cta-dot { animation: none; } }
  @media (prefers-reduced-motion: reduce) { .ab-skill, .sk-chip, .ab-skill .sk-icon { transition: none; } }
  @keyframes ab-now-dot { 0%, 100% { box-shadow: 0 0 0 0 rgba(31,138,91,0.5); } 50% { box-shadow: 0 0 0 5px rgba(31,138,91,0); } }
  #ab-now-dot { animation: ab-now-dot 2s ease-out infinite; }
  #ab-now-btn:hover { background: #3654e0; color: #ffffff; border-color: #3654e0; transform: translateY(-2px); }
  @media (prefers-reduced-motion: reduce) { #ab-now-dot { animation: none; } }
  @media (max-width: 640px) {
    #ab-now-card { padding: 22px 20px !important; gap: 16px !important; border-radius: 18px !important; }
    #ab-now-card [style*="font-size: 23px"] { font-size: 18px !important; }
    #ab-now-card [style*="font-size: 14.5px"] { font-size: 13px !important; }
    #ab-now-btn { font-size: 12.5px !important; padding: 9px 16px !important; }
  }
`;
  document.head.appendChild(s);
})();
