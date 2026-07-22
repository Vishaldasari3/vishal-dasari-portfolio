(function(){
  var s = document.createElement('style');
  s.textContent = `
  html { overflow-x: hidden; } html, body { margin: 0; max-width: 100%; background: #f4f5f9; background-image: radial-gradient(rgba(54,84,224,0.05) 1px, transparent 1px); background-size: 26px 26px; }
  * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
  a { color: #3654e0; text-decoration: none; }
  a:hover { color: #24399e; }

  @media (max-width: 900px) {
    #ts-ball-field { height: 1050px !important; }
  }
  @media (max-width: 1180px) {
    #site-header-row { padding: 18px 20px !important; gap: 12px !important; }
  }
  @media (max-width: 640px) {
    div[style*="40px 56px 32px"] { padding-left: 16px !important; padding-right: 16px !important; padding-top: 44px !important; padding-bottom: 48px !important; }
    div[style*="padding: 28px 24px 4px"] { padding: 16px 12px 4px !important; }
  }

  .ts-ball:hover { filter: brightness(1.08); }
  .ts-ctrl:hover { background: #eaecf3 !important; }
  .ts-stat .v { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #14162b; letter-spacing: -1px; }
  .ts-stat .k { font-size: 12px; font-weight: 500; color: #7a8199; letter-spacing: 0.8px; text-transform: uppercase; margin-top: 3px; }
  @media (max-width: 800px) { #hero-card { grid-template-columns: 1fr !important; padding: 36px 28px !important; } #hero-viewport { display: none; } }
`;
  document.head.appendChild(s);
})();
