(function(){
  var s = document.createElement('style');
  s.textContent = `
  html { overflow-x: hidden; } html, body { margin: 0; max-width: 100%; background: #f4f5f9; background-image: radial-gradient(rgba(54,84,224,0.05) 1px, transparent 1px); background-size: 26px 26px; }
  * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
  a { color: #3654e0; text-decoration: none; }
  a:hover { color: #24399e; }

  @media (max-width: 900px) {
    #ex-projects-grid { grid-template-columns: 1fr !important; }
    #ex-modal-panel { width: 92% !important; padding: 32px 24px !important; }
  }
  @media (max-width: 1180px) {
    #site-header-row { padding: 18px 20px !important; gap: 12px !important; }
  }
  @media (max-width: 640px) {
    div[style*="72px 56px 32px"] { padding-left: 16px !important; padding-right: 16px !important; padding-top: 44px !important; padding-bottom: 48px !important; }
    div[style*="padding: 28px 24px 4px"] { padding: 16px 12px 4px !important; }
  }
  .hv40:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(44,70,201,0.12); }
  .hv41:hover, .hv42:hover, .hv43:hover { transform: translateY(-3px) scale(1.08); box-shadow: 0 6px 16px rgba(54,84,224,0.35), 0 0 14px rgba(54,84,224,0.4); }

  /* editorial sections */
  .ex-sec { display: grid; grid-template-columns: 220px 1fr; gap: 48px; padding: 64px 0; border-top: 1px solid rgba(28,32,48,0.09); }
  .ex-sec:first-child { border-top: none; padding-top: 8px; }
  .ex-label { position: sticky; top: 110px; align-self: start; display: flex; flex-direction: column; gap: 8px; }
  .ex-label .num { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 800; color: #3654e0; letter-spacing: 2px; }
  .ex-label .ttl { font-size: 13px; font-weight: 600; color: #1c2030; letter-spacing: 1.8px; text-transform: uppercase; }
  .ex-row { display: flex; gap: 32px; padding: 30px 6px; border-bottom: 1px solid rgba(28,32,48,0.09); border-radius: 6px; transition: background .25s, padding-left .3s cubic-bezier(.22,1,.36,1); }
  .ex-row:first-of-type { border-top: 1px solid rgba(28,32,48,0.09); }
  .ex-row:hover { background: rgba(54,84,224,0.04); padding-left: 16px; }
  .ex-year { font-family: 'Syne', sans-serif; font-size: 19px; font-weight: 800; color: #3654e0; line-height: 1.2; }
  .ex-chip { font-size: 12px; color: #3a3f5c; border: 1px solid rgba(28,32,48,0.14); padding: 5px 12px; border-radius: 20px; white-space: nowrap; transition: background .2s, color .2s, border-color .2s; }
  .ex-chip:hover { background: #3654e0; color: #fff; border-color: #3654e0; }

  /* premium timeline */
  .ex-item { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s cubic-bezier(.22,1,.36,1); }
  .ex-item.ex-in { opacity: 1; transform: none; }
  .ex-card { transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s; }
  .ex-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -14px rgba(40,50,90,.22); border-color: rgba(54,84,224,.25) !important; }
  @keyframes ex-pulse { 0% { box-shadow: 0 0 0 0 rgba(54,84,224,.35); } 70% { box-shadow: 0 0 0 10px rgba(54,84,224,0); } 100% { box-shadow: 0 0 0 0 rgba(54,84,224,0); } }
  .ex-dot-now { animation: ex-pulse 2.4s ease-out infinite; }
  /* premium project cards */
  .ex-proj { position: relative; overflow: hidden; }
  .ex-proj::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(54,84,224,0.07), transparent 65%);
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
  }
  .ex-proj:hover::before { opacity: 1; }
  .ex-proj:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -14px rgba(40,50,90,.22); border-color: rgba(54,84,224,.25) !important; }
  .ex-proj svg { transition: transform .25s cubic-bezier(.22,1,.36,1); }
  .ex-proj:hover svg { transform: translateX(5px); }

  @media (prefers-reduced-motion: reduce) {
    .ex-item { opacity: 1 !important; transform: none !important; transition: none; }
    .ex-dot-now { animation: none; }
  }
  @media (max-width: 900px) {
    .ex-item { flex-direction: column !important; gap: 8px !important; }
    .ex-date { width: auto !important; padding-top: 0 !important; }
    .ex-node, #ex-line { display: none !important; }
    .ex-sec { grid-template-columns: 1fr !important; gap: 24px !important; padding: 44px 0 !important; }
    .ex-label { position: static !important; }
    .ex-row { flex-direction: column !important; gap: 10px !important; }
  }
  @media (max-width: 800px) { #hero-card { grid-template-columns: 1fr !important; padding: 36px 28px !important; } #hero-viewport { display: none; } }
`;
  document.head.appendChild(s);
})();
