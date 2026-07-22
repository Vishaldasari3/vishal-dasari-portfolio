(function(){
  var s = document.createElement('style');
  s.textContent = `
  html { overflow-x: hidden; } html, body { margin: 0; max-width: 100%; background: #f4f5f9; background-image: radial-gradient(rgba(54,84,224,0.05) 1px, transparent 1px); background-size: 26px 26px; }
  * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
  a { color: #3654e0; text-decoration: none; }
  a:hover { color: #24399e; }

  @media (max-width: 900px) {
    #cert-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 1180px) {
    #site-header-row { padding: 18px 20px !important; gap: 12px !important; }
  }
  @media (max-width: 640px) {
    div[style*="72px 56px 32px"] { padding-left: 16px !important; padding-right: 16px !important; padding-top: 44px !important; padding-bottom: 48px !important; }
    div[style*="padding: 28px 24px 4px"] { padding: 16px 12px 4px !important; }
    #cert-grid { grid-template-columns: 1fr !important; } #cert-grid > div { min-width: 0 !important; } .cert-card { padding: 20px !important; }
  }

  .cert-card { position: relative; overflow: hidden; background: rgba(255,255,255,0.75); border: 1px solid rgba(28,32,48,0.1); border-radius: 20px; padding: 28px; display: flex; flex-direction: column; gap: 16px; transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .35s; }
  .cert-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(54,84,224,0.07), transparent 65%); opacity: 0; transition: opacity .3s; pointer-events: none; }
  .cert-card:hover::before { opacity: 1; }
  .cert-card:hover { transform: translateY(-5px); box-shadow: 0 20px 44px -16px rgba(40,50,90,.22); border-color: rgba(54,84,224,.32); }
  .cert-num { position: absolute; top: 16px; right: 22px; font-family: 'Syne', sans-serif; font-size: 44px; font-weight: 800; color: rgba(28,32,48,0.05); line-height: 1; letter-spacing: -2px; pointer-events: none; }
  .cert-chip { font-size: 12px; color: #3a3f5c; border: 1px solid rgba(28,32,48,0.14); padding: 5px 12px; border-radius: 20px; transition: background .2s, color .2s, border-color .2s; }
  .cert-chip:hover { background: #3654e0; color: #fff; border-color: #3654e0; }
  .cert-link svg { transition: transform .25s cubic-bezier(.22,1,.36,1); }
  .cert-card:hover .cert-link svg { transform: translateX(4px); }
  .ct-stat .v { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #14162b; letter-spacing: -1px; }
  .ct-stat .k { font-size: 12px; font-weight: 500; color: #7a8199; letter-spacing: 0.8px; text-transform: uppercase; margin-top: 3px; }
  @media (prefers-reduced-motion: reduce) { .cert-card, .cert-chip, .cert-link svg { transition: none; } }
  @media (max-width: 800px) { #hero-card { grid-template-columns: 1fr !important; padding: 36px 28px !important; } #hero-viewport { display: none; } }
`;
  document.head.appendChild(s);
})();
