(function(){
  var s = document.createElement('style');
  s.textContent = `
  html { overflow-x: hidden; } html, body { margin: 0; max-width: 100%; background: #f4f5f9; }
  * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
  a { color: #3654e0; text-decoration: none; }
  a:hover { color: #24399e; }

  @media (max-width: 1180px) {
    #site-header-row { padding: 18px 20px !important; gap: 12px !important; }
  }
  @media (max-width: 640px) {
    div[style*="padding: 28px 24px 4px"] { padding: 16px 12px 4px !important; }
    #bp-content { padding: 28px 16px 56px !important; gap: 16px !important; }
    #bp-body div { font-size: 15.5px !important; line-height: 1.7 !important; }
    #bp-body h2 { font-size: 18.5px !important; }
    #bp-body li { font-size: 15.5px !important; line-height: 1.7 !important; }
  }
  @media (max-width: 420px) {
    #bp-body div { font-size: 15px !important; }
    #bp-body h2 { font-size: 17.5px !important; }
    #bp-body li { font-size: 15px !important; }
  }
  @media (max-width: 860px) { body[data-page="blog"] #site-nav-toggle { margin-left: auto !important; } }
body[data-page="blog"] #site-header-grid > div:last-child { display: none !important; }
`;
  document.head.appendChild(s);
})();
