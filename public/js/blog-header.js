// Simplified header for blog.html + blog post pages: logo left, "Blog" label center,
// hamburger nav (collapsed dropdown) always available on the right.
(function () {
  function initBlogHeader() {
    const row = document.getElementById('site-header-row');
    const grid = document.getElementById('site-header-grid');
    const blogBtnWrap = grid ? grid.lastElementChild : null;
    const toggle = document.getElementById('site-nav-toggle');
    if (blogBtnWrap) blogBtnWrap.style.display = 'none';
    if (toggle) toggle.style.display = 'inline-flex';
    if (row) {
      const label = document.createElement('span');
      label.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:8px;pointer-events:none;line-height:1.3;overflow:visible;';
      label.innerHTML = '<span style="width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,#5b8cff,#22ddf5);box-shadow:0 0 8px rgba(34,221,245,.7);flex-shrink:0;"></span><span id="blog-header-label" style="display:inline-block;font-family:Poppins,sans-serif;font-size:24px;font-weight:800;letter-spacing:0.3px;line-height:1.6;padding-bottom:4px;background:linear-gradient(120deg,#3654e0,#7c5cff,#22ddf5);-webkit-background-clip:text;background-clip:text;color:transparent;">Blog</span>';
      row.appendChild(label);
    }
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      body[data-page="blog"] #site-nav-toggle { display: inline-flex !important; }
      body[data-page="blog"] #site-nav-items {
        display: flex !important; position: absolute !important; top: calc(100% + 8px) !important; right: 0 !important; left: auto !important;
        flex: none !important; min-width: 0 !important; max-width: none !important; width: 200px !important;
        flex-direction: column !important; align-items: stretch !important; justify-content: flex-start !important; gap: 1px !important;
        background: rgba(255,255,255,0.98) !important; border: 1px solid rgba(224,228,245,0.9) !important; border-radius: 16px !important;
        box-shadow: 0 20px 44px -18px rgba(30,40,80,0.3), 0 1px 0 rgba(255,255,255,0.9) inset !important;
        max-height: 0 !important; overflow: hidden !important; opacity: 0 !important; padding: 0 6px !important;
        visibility: hidden !important; pointer-events: none !important;
        transform: translateY(-6px) scale(0.98) !important; transform-origin: top right !important;
        transition: max-height 0.35s cubic-bezier(.22,1,.36,1), opacity 0.24s ease, transform 0.28s cubic-bezier(.22,1,.36,1), padding 0.26s ease, visibility 0s linear 0.35s !important;
        z-index: 46 !important;
      }
      body[data-page="blog"] #site-header-row.nav-open #site-nav-items { max-height: 300px !important; opacity: 1 !important; padding: 6px !important; visibility: visible !important; pointer-events: auto !important; transform: translateY(0) scale(1) !important; }
      body[data-page="blog"] #site-nav-items::before { display: none !important; }
      body[data-page="blog"] #site-nav-pill { display: none !important; }
      body[data-page="blog"] #site-nav-items a {
        flex: 0 0 auto !important; text-align: left !important; padding: 10px 12px !important; font-size: 13.5px !important;
        white-space: nowrap !important; border-radius: 9px !important; display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 8px !important;
      }
      body[data-page="blog"] #site-nav-items a::after { content: ''; width: 5px; height: 5px; border-radius: 50%; background: linear-gradient(135deg,#5b8cff,#22ddf5); opacity: 0; flex-shrink: 0; transition: opacity .15s; }
      body[data-page="blog"] #site-nav-items a:hover { background: rgba(54,84,224,0.07) !important; color: #0a0c16 !important; }
      body[data-page="blog"] #site-nav-items a:hover::after { opacity: 0.6; }
      @media (max-width: 640px) { #blog-header-label { font-size: 16px !important; } }
    `;
    document.head.appendChild(styleEl);
  }

  window.initBlogHeader = initBlogHeader;
})();
