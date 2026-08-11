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
  @media (max-width: 1150px) {
    #bp-content { grid-template-columns: 1fr !important; gap: 32px !important; }
    #bp-sidebar { position: static !important; flex-direction: row !important; flex-wrap: wrap !important; }
    #bp-toc { display: none !important; }
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
  @media (max-width: 640px) {
    #bp-author-card { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; gap: 14px !important; padding: 12px 16px !important; }
  }
  @media (max-width: 860px) { body[data-page="blog"] #site-nav-toggle { margin-left: auto !important; } }
body[data-page="blog"] #site-header-grid > div:last-child { display: none !important; }

  .bp-reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1); max-width: 100%; overflow: hidden; }
  .bp-reveal.is-visible { opacity: 1; transform: translateY(0); }
  .bp-reveal.is-visible .bp-pillar-bar { transform: scaleY(1) !important; }
  @media (max-width: 560px) {
    .bp-split-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
    .bp-split-grid > div[style*="font-size: 20px"] { display: none !important; }
    .bp-pillars-row { flex-wrap: wrap !important; gap: 18px 10px !important; }
    .bp-pillars-row > div { flex: 1 1 40% !important; max-width: none !important; }
  }

  /* code-hover */
  .bp-code-row { display: flex; gap: 14px; flex-wrap: wrap; }
  .bp-code-card { position: relative; flex: 1 1 260px; min-width: 0; background: #14162b; border-radius: 14px; overflow: hidden; cursor: pointer; border: 1px solid rgba(255,255,255,0.08); }
  .bp-code-head { font-size: 11.5px; font-weight: 600; color: rgba(255,255,255,0.5); padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .bp-code-pre { margin: 0; padding: 14px; font-family: 'SF Mono', Menlo, Consolas, monospace; font-size: 12.5px; line-height: 1.7; color: #d7dcff; white-space: pre-wrap; word-break: break-word; }
  .bp-code-reveal { position: absolute; inset: 0; display: flex; align-items: center; padding: 16px; font-size: 12.5px; font-weight: 600; color: #fff; line-height: 1.55; background: linear-gradient(150deg, var(--accent), color-mix(in srgb, var(--accent) 60%, #14162b)); opacity: 0; transform: translateY(6px); transition: opacity .3s ease, transform .3s ease; }
  .bp-code-card:hover .bp-code-reveal, .bp-code-card.is-open .bp-code-reveal { opacity: 1; transform: translateY(0); }
  .bp-code-hint { width: 100%; text-align: center; font-size: 11.5px; color: #9096a8; }
  @media (max-width: 640px) { .bp-code-card { flex: 1 1 100%; } }

  /* flow diagram */
  .bp-flow-tabs { display: flex; gap: 8px; justify-content: center; margin-bottom: 18px; flex-wrap: wrap; }
  .bp-flow-tab { font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 600; color: #565c78; background: rgba(28,32,48,0.05); border: 1px solid rgba(28,32,48,0.1); border-radius: 20px; padding: 8px 16px; cursor: pointer; }
  .bp-flow-tab.is-active { color: #fff; background: var(--accent); border-color: transparent; }
  .bp-flow-stage { position: relative; padding: 8px 4px 0; }
  .bp-flow-track { position: relative; height: 2px; background: rgba(28,32,48,0.1); margin: 0 20px 22px; border-radius: 2px; }
  .bp-flow-dot { position: absolute; top: 50%; left: 0; width: 10px; height: 10px; margin-top: -5px; border-radius: 50%; background: var(--accent); opacity: 0; }
  .bp-flow-dot.is-playing { animation: bpFlowDot 2.4s ease-in-out infinite; }
  @keyframes bpFlowDot { 0% { left: 0%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
  .bp-flow-nodes { display: none; justify-content: space-between; align-items: flex-start; gap: 8px; flex-wrap: wrap; }
  .bp-flow[data-flow="api"] .bp-flow-nodes-api { display: flex; }
  .bp-flow[data-flow="mcp"] .bp-flow-nodes-mcp { display: flex; }
  .bp-flow[data-flow="api"] .bp-flow-caption-mcp, .bp-flow[data-flow="mcp"] .bp-flow-caption-api { display: none; }
  .bp-flow-node { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; min-width: 64px; max-width: 120px; }
  .bp-flow-node-icon { width: 34px; height: 34px; border-radius: 10px; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; }
  .bp-flow-node-icon svg { width: 18px; height: 18px; }
  .bp-flow-node-sm .bp-flow-node-icon { background: var(--accent2); }
  .bp-flow-node-label { font-size: 11px; font-weight: 600; color: #4a5069; text-align: center; line-height: 1.3; }
  .bp-flow-caption { text-align: center; font-size: 12.5px; color: #63677c; margin-top: 16px; }
  @media (max-width: 560px) { .bp-flow-node { max-width: 84px; } .bp-flow-node-label { font-size: 10px; } }

  /* typing demo */
  .bp-typing { border-radius: 14px; overflow: hidden; background: #14162b; border: 1px solid rgba(255,255,255,0.08); }
  .bp-typing-bar { display: flex; align-items: center; gap: 6px; padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .bp-typing-dot { width: 9px; height: 9px; border-radius: 50%; }
  .bp-typing-tag { margin-left: 10px; font-size: 11.5px; color: rgba(255,255,255,0.45); }
  .bp-typing-body { padding: 16px 14px; font-family: 'SF Mono', Menlo, Consolas, monospace; font-size: 13px; line-height: 1.7; color: #d7dcff; white-space: pre-wrap; word-break: break-word; }
  .bp-typing-who { font-weight: 700; color: var(--accent); margin-right: 8px; }
  .bp-typing-who-agent { display: none; color: var(--accent2); }
  .bp-typing.bp-typing-agent .bp-typing-who-you { display: none; }
  .bp-typing.bp-typing-agent .bp-typing-who-agent { display: inline; }
  .bp-typing-caret { animation: bpBlink 1s step-start infinite; color: #d7dcff; }
  @keyframes bpBlink { 50% { opacity: 0; } }

  /* sticky-note carousel */
  .bp-carousel-stage { position: relative; height: 130px; }
  .bp-carousel-card { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center; padding: 22px 26px; border-radius: 10px; background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 12%, #fff), color-mix(in srgb, var(--accent2) 10%, #fff)); border: 1px solid rgba(28,32,48,0.08); box-shadow: 0 14px 30px -18px rgba(30,40,80,0.25); font-size: 15.5px; font-weight: 600; color: #1c2030; line-height: 1.5; opacity: 0; transform: translateY(10px) rotate(0deg); transition: opacity .45s ease, transform .45s ease; pointer-events: none; }
  .bp-carousel-card.is-active { opacity: 1; transform: translateY(0) rotate(var(--rot)); pointer-events: auto; }
  .bp-carousel-dots { display: flex; gap: 8px; justify-content: center; margin-top: 14px; }
  .bp-carousel-dot { width: 7px; height: 7px; border-radius: 50%; border: none; background: rgba(28,32,48,0.15); cursor: pointer; padding: 0; }
  .bp-carousel-dot.is-active { background: var(--accent); }
  @media (max-width: 560px) { .bp-carousel-stage { height: 160px; } .bp-carousel-card { font-size: 14px; padding: 18px 18px; } }

  /* flight path */
  .bp-flight-svg { width: 100%; height: auto; display: block; }
  .bp-flight-path { stroke: var(--accent); stroke-width: 2; stroke-dasharray: 6 6; opacity: 0.55; }
  .bp-flight-dot-start, .bp-flight-dot-end { fill: var(--accent2); }
  .bp-flight-plane { fill: var(--accent); offset-distance: 0%; animation: bpFly 3.2s ease-in-out infinite alternate; }
  @keyframes bpFly { to { offset-distance: 100%; } }
  .bp-flight-labels { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; color: #4a5069; padding: 0 6px; }
  .bp-flight-caption { text-align: center; font-size: 12px; color: #9096a8; margin-top: 6px; }

  /* slider */
  .bp-slider-labels { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; color: #63677c; margin-bottom: 8px; }
  .bp-slider-input { width: 100%; -webkit-appearance: none; appearance: none; height: 6px; border-radius: 4px; background: rgba(28,32,48,0.1); outline: none; }
  .bp-slider-input::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: var(--accent); box-shadow: 0 2px 8px rgba(0,0,0,0.25); cursor: pointer; }
  .bp-slider-input::-moz-range-thumb { width: 20px; height: 20px; border: none; border-radius: 50%; background: var(--accent); cursor: pointer; }
  .bp-slider-quote { margin-top: 14px; text-align: center; font-size: 15px; font-weight: 600; color: #1c2030; font-style: italic; min-height: 2.6em; display: flex; align-items: center; justify-content: center; }
`;
  document.head.appendChild(s);
})();
