(function(){
  var s = document.createElement('style');
  s.textContent = `
  html { overflow-x: hidden; } html, body { margin: 0; max-width: 100%; background: #f4f5f9; background-image: radial-gradient(rgba(54,84,224,0.05) 1px, transparent 1px); background-size: 26px 26px; }
  * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
  a { color: #3654e0; text-decoration: none; }
  a:hover { color: #24399e; }
  input::placeholder { color: #a7abc0; }
  .bl-stat .v { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #14162b; letter-spacing: -1px; }
  .bl-stat .k { font-size: 12px; font-weight: 500; color: #7a8199; letter-spacing: 0.8px; text-transform: uppercase; margin-top: 3px; }
  .bl-card { position: relative; overflow: hidden; background: rgba(255,255,255,0.75); border: 1px solid rgba(28,32,48,0.1); border-radius: 20px; padding: 24px; display: flex; flex-direction: column; gap: 14px; transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .35s; }
  .bl-card:hover { transform: translateY(-5px); box-shadow: 0 20px 44px -16px rgba(40,50,90,.22); border-color: rgba(54,84,224,.32); }
  .bl-card img { transition: transform .5s cubic-bezier(.22,1,.36,1); }
  .bl-card:hover img { transform: scale(1.04); }
  .bl-card .bl-arrow svg { transition: transform .25s cubic-bezier(.22,1,.36,1); }
  .bl-card:hover .bl-arrow svg { transform: translateX(4px); }
  #bl-featured .bl-card { flex-direction: row; gap: 32px; padding: 24px; align-items: stretch; }
  @media (prefers-reduced-motion: reduce) { .bl-card, .bl-card img { transition: none; } }
  @media (max-width: 900px) {
    #bl-featured .bl-card { flex-direction: column !important; }
    #bl-featured .bl-fimg { width: 100% !important; }
  }

  @media (max-width: 900px) {
    #bl-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 1180px) {
    #site-header-row { padding: 18px 20px !important; gap: 12px !important; }
  }
  @media (max-width: 640px) {
    div[style*="64px 56px 32px"] { padding-left: 16px !important; padding-right: 16px !important; padding-top: 44px !important; padding-bottom: 48px !important; }
    div[style*="padding: 28px 24px 4px"] { padding: 16px 12px 4px !important; }
    #bl-grid { grid-template-columns: 1fr !important; } #bl-grid > div { min-width: 0 !important; }
  }
  @media (max-width: 800px) { #hero-card { grid-template-columns: 1fr !important; padding: 36px 28px !important; } #hero-viewport { display: none; } }
@media (max-width: 860px) { body[data-page="blog"] #site-nav-toggle { margin-left: auto !important; } }
body[data-page="blog"]:not([data-slug]) #site-header-grid > div:last-child { display: none !important; }
`;
  document.head.appendChild(s);
})();
