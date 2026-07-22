(function(){
  var s = document.createElement('style');
  s.textContent = `
  html { overflow-x: hidden; } html, body { margin: 0; max-width: 100%; background: #f4f5f9; background-image: radial-gradient(rgba(54,84,224,0.05) 1px, transparent 1px); background-size: 26px 26px; }
  * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }
  a { color: #3654e0; text-decoration: none; }
  a:hover { color: #24399e; }
  input::placeholder, textarea::placeholder { color: #a7abc0; }

  #ct-left a[href^="mailto"] { overflow-wrap: anywhere; word-break: break-word; }
  .cf-turnstile { max-width: 100%; overflow: hidden; }
  @media (max-width: 980px) {
    #ct-split { grid-template-columns: 1fr !important; }
    #ct-left, #ct-right { min-width: 0 !important; }
    #ct-left { min-height: unset !important; padding: 48px 32px !important; }
    #ct-right { padding: 44px 40px !important; }
  }
  @media (max-width: 700px) {
    #ct-field-row { grid-template-columns: 1fr !important; }
    #ct-section { padding: 0 12px !important; }
    #ct-card { padding: 12px !important; border-radius: 24px !important; }
    #ct-left { padding: 30px 20px !important; }
    #ct-right { padding: 28px 20px !important; gap: 16px !important; }
    #ct-send { width: 100% !important; min-width: 0 !important; }
  }
  @media (max-width: 480px) {
    #ct-section { padding: 0 8px !important; }
    #ct-card { padding: 8px !important; border-radius: 20px !important; }
    #ct-left { padding: 24px 16px !important; }
    #ct-right { padding: 22px 16px !important; }
    #ct-left [style*="font-size: 34px"] { font-size: 24px !important; }
    #ct-left [style*="font-size: 15px"] { font-size: 13.5px !important; }
    #ct-right input, #ct-right textarea, #ct-inquiry { font-size: 16px !important; padding-top: 20px !important; padding-bottom: 8px !important; padding-left: 14px !important; border-radius: 12px !important; }
    #ct-right textarea { padding-top: 24px !important; }
    #ct-send { font-size: 14px !important; padding-left: 16px !important; }
    #ct-send .ct-send-ico { width: 32px !important; height: 32px !important; }
    .ct-chan { padding: 10px 11px !important; gap: 10px !important; }
    .ct-chan > div:first-child { width: 38px !important; height: 38px !important; }
    .cf-turnstile { transform: scale(0.86); transform-origin: left center; }
    #ct-socials { display: none !important; }
  }
  @media (max-width: 1180px) {
    #site-header-row { padding: 18px 20px !important; gap: 12px !important; }
  }
  @media (max-width: 640px) {
    div[style*="56px 40px"], div[style*="56px 100px"], div[style*="56px 47px"] { padding-left: 20px !important; padding-right: 20px !important; }
  }
  @media (max-width: 480px) {
    div[style*="56px 40px"], div[style*="56px 100px"], div[style*="56px 47px"] { padding-left: 16px !important; padding-right: 16px !important; }
  }

  .hv10:hover { transform: translateX(4px); background: rgba(54,84,224,0.06) !important; border-color: rgba(54,84,224,0.3) !important; }
  .hv11:hover, .hv12:hover, .hv13:hover { transform: translateY(-3px); border-color: rgba(54,84,224,0.4) !important; box-shadow: 0 8px 18px -8px rgba(54,84,224,0.35); }
  .hv14:hover { transform: translateY(-3px); box-shadow: 0 20px 40px rgba(54,84,224,0.42); }
  @keyframes ct-spin { to { transform: rotate(360deg); } }
  @keyframes ct-avail-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(31,138,91,0.5); } 50% { box-shadow: 0 0 0 5px rgba(31,138,91,0); } }
  #ct-avail-dot { animation: ct-avail-pulse 2s ease-out infinite; }
  @media (prefers-reduced-motion: reduce) { #ct-avail-dot { animation: none; } }

  /* redesigned glass form fields */
  #ct-right input:not(#ct-hp), #ct-right textarea {
    transition: border-color .25s, box-shadow .25s, background .25s;
    outline: none;
  }
  #ct-right input:not(#ct-hp):hover, #ct-right textarea:hover, #ct-inquiry:hover { border-color: rgba(54,84,224,0.4) !important; }
  #ct-inquiry:focus { border-color: #3654e0 !important; background: #ffffff !important; box-shadow: 0 0 0 4px rgba(54,84,224,0.14), 0 10px 28px -12px rgba(54,84,224,0.4); }
  #ct-right input:not(#ct-hp):focus, #ct-right textarea:focus {
    border-color: #3654e0 !important;
    background: #ffffff !important;
    box-shadow: 0 0 0 4px rgba(54,84,224,0.14), 0 10px 28px -12px rgba(54,84,224,0.4);
  }
  #ct-right input:focus + label, #ct-right textarea:focus + label { color: #3654e0 !important; }
  #ct-right input:not(:placeholder-shown) + label, #ct-right textarea:not(:placeholder-shown) + label { color: #5a6284 !important; }
  @media (max-width: 800px) { #hero-card { grid-template-columns: 1fr !important; padding: 36px 28px !important; } #hero-viewport { display: none; } }

  /* aurora + glass redesign */
  @keyframes ct-aurora1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(46px,34px) scale(1.18); } }
  @keyframes ct-aurora2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-54px,-22px) scale(1.22); } }
  @keyframes ct-aurora3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(32px,-44px) scale(1.12); } }
  .ct-blob { will-change: transform; }
  .ct-chan { transition: transform .2s, background .2s, border-color .2s, box-shadow .2s; }
  .ct-chan:hover { transform: translateY(-3px); background: rgba(255,255,255,0.95) !important; border-color: rgba(54,84,224,0.32) !important; box-shadow: 0 14px 30px -14px rgba(54,84,224,0.35); }

  /* channel icon animations */
  @keyframes ctMailBob { 0%,66%,100% { transform: translateY(0) rotate(0); } 78% { transform: translateY(-2.5px) rotate(-6deg); } 90% { transform: translateY(0) rotate(0); } }
  @keyframes ctMailFlap { 0%,66%,100% { stroke-dashoffset: 0; } 74% { stroke-dashoffset: 22; } 86% { stroke-dashoffset: 0; } }
  @keyframes ctPinBounce { 0%,58%,100% { transform: translateY(0) scaleY(1) scaleX(1); } 70% { transform: translateY(-4px) scaleY(1.06) scaleX(0.97); } 82% { transform: translateY(0) scaleY(0.9) scaleX(1.08); } 90% { transform: translateY(0) scaleY(1.04) scaleX(0.98); } 96% { transform: translateY(0) scaleY(1) scaleX(1); } }
  @keyframes ctClockSpin { to { transform: rotate(360deg); } }
  .ct-anim-mail { transform-origin: 50% 60%; animation: ctMailBob 3.6s ease-in-out infinite; }
  .ct-anim-mail .mail-flap { stroke-dasharray: 22; animation: ctMailFlap 3.6s ease-in-out infinite; }
  .ct-anim-pin { transform-origin: 50% 100%; animation: ctPinBounce 3.4s cubic-bezier(.3,1.5,.5,1) infinite; }
  .clock-min { animation: ctClockSpin 8s steps(16) infinite; }
  .clock-hr { animation: ctClockSpin 48s linear infinite; }
  .ct-chan:hover .ct-anim-mail, .ct-chan:hover .ct-anim-pin { animation-duration: 1.2s; }
  @media (prefers-reduced-motion: reduce) { .ct-anim-mail, .ct-anim-mail .mail-flap, .ct-anim-pin, .clock-min, .clock-hr { animation: none !important; } }

  /* icon tooltips */
  .ct-tip { position: relative; }
  .ct-tip::after { content: attr(data-tip); position: absolute; bottom: calc(100% + 9px); left: 50%; transform: translateX(-50%) translateY(4px); background: #14162b; color: #fff; font-size: 11px; font-weight: 600; letter-spacing: 0.3px; padding: 5px 10px; border-radius: 7px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.18s, transform 0.18s; box-shadow: 0 8px 20px -6px rgba(10,16,40,0.4); z-index: 20; }
  .ct-tip::before { content: ''; position: absolute; bottom: calc(100% + 4px); left: 50%; transform: translateX(-50%); border: 5px solid transparent; border-top-color: #14162b; opacity: 0; transition: opacity 0.18s; z-index: 20; }
  .ct-tip:hover::after { opacity: 1; transform: translateX(-50%) translateY(0); }
  .ct-tip:hover::before { opacity: 1; }

  /* copy email button */
  #ct-copy-email { position: relative; width: 34px; height: 34px; border-radius: 10px; background: rgba(255,255,255,0.7); border: 1px solid rgba(28,32,48,0.12); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; color: #5a6284; transition: background .2s, border-color .2s, color .2s, transform .2s; }
  #ct-copy-email:hover { background: #ffffff; border-color: rgba(54,84,224,0.35); color: #3654e0; transform: translateY(-1px); }
  #ct-copy-email .ic-check { display: none; }
  #ct-copy-email.copied { color: #1f8a5b; border-color: rgba(31,138,91,0.4); background: rgba(31,138,91,0.08); }
  #ct-copy-email.copied .ic-copy { display: none; }
  #ct-copy-email.copied .ic-check { display: block; }
  #ct-copy-email.copied::after { content: 'Copied!'; position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); background: #1f8a5b; color: #fff; font-size: 11px; font-weight: 600; letter-spacing: .3px; padding: 4px 9px; border-radius: 7px; white-space: nowrap; box-shadow: 0 8px 18px -6px rgba(10,16,40,0.35); }
  .ct-soc { transition: transform .22s cubic-bezier(.22,1,.36,1), border-color .22s, box-shadow .22s; }
  .ct-soc:hover { transform: translateY(-3px) scale(1.05); border-color: rgba(124,92,255,0.5) !important; box-shadow: 0 12px 26px -8px rgba(54,84,224,0.4); }
  @media (prefers-reduced-motion: reduce) { .ct-blob { animation: none !important; } }

  /* field validation states */
  .ct-status { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; align-items: center; justify-content: center; pointer-events: none; animation: ctStatusPop .28s cubic-bezier(.34,1.56,.64,1) both; }
  @keyframes ctStatusPop { from { opacity: 0; transform: translateY(-50%) scale(0.4); } to { opacity: 1; transform: translateY(-50%) scale(1); } }
  #ct-message-status.ct-status { animation-name: ctStatusPopM; }
  @keyframes ctStatusPopM { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
  @keyframes ctShake { 10%,90%{transform:translateX(-1px);} 20%,80%{transform:translateX(2px);} 30%,50%,70%{transform:translateX(-4px);} 40%,60%{transform:translateX(4px);} }
  .ct-field-shake { animation: ctShake .4s cubic-bezier(.36,.07,.19,.97); }
  @media (prefers-reduced-motion: reduce) { .ct-field-shake, .ct-status { animation: none !important; } }

  /* send button */
  @keyframes ctBtnGlow {
    0%, 100% { box-shadow: 0 10px 24px -12px rgba(54,84,224,0.55), 0 0 16px -2px rgba(46,168,255,0.32), inset 0 1px 0 rgba(255,255,255,0.3); }
    50% { box-shadow: 0 12px 30px -12px rgba(54,84,224,0.6), 0 0 28px 1px rgba(6,214,240,0.5), inset 0 1px 0 rgba(255,255,255,0.35); }
  }
  .ct-send-btn { animation: ctBtnGlow 3.2s ease-in-out infinite; }
  .ct-send-btn:hover { background: linear-gradient(100deg, #2f4bd6 0%, #1f9dfb 56%, #05c3dd 100%); }
  .ct-send-btn:hover .ct-send-ico { transform: translateX(4px) scale(1.06); box-shadow: 0 12px 26px -6px rgba(6,20,60,0.45); }
  @keyframes ctPlaneBob { 0%,100% { transform: translate(0,0); } 50% { transform: translate(1.5px,-1.5px); } }
  @keyframes ctPlaneFly { 0% { transform: translate(0,0) rotate(0); opacity: 1; } 45% { transform: translate(14px,-14px) rotate(8deg); opacity: 0; } 46% { transform: translate(-11px,11px) rotate(0); opacity: 0; } 70%,100% { transform: translate(0,0); opacity: 1; } }
  #ct-send-icon { animation: ctPlaneBob 2.6s ease-in-out infinite; }
  .ct-send-btn:hover #ct-send-icon { animation: ctPlaneFly 0.9s cubic-bezier(.5,0,.5,1) infinite; }
  @media (prefers-reduced-motion: reduce) { #ct-send-icon, .ct-send-btn:hover #ct-send-icon { animation: none !important; } }
  .ct-send-btn:active { transform: translateY(-1px) scale(0.99); }
  .ct-send-btn:disabled { cursor: default; opacity: 0.92; }  .ct-send-btn:disabled .ct-send-ico { transform: none; }
  @media (prefers-reduced-motion: reduce) { .ct-send-btn { animation: none !important; } }

  /* success animation */
  #ct-success-again:hover { background: rgba(54,84,224,0.14); transform: translateY(-2px); }
  @keyframes ctSPop { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
  @keyframes ctSdraw { to { stroke-dashoffset: 0; } }
  @keyframes ctSring { 0% { transform: scale(0.7); opacity: 0.6; } 100% { transform: scale(1.7); opacity: 0; } }
  @keyframes ctSup { from { transform: translateY(14px); opacity: 0; } to { transform: none; opacity: 1; } }
  @keyframes ctConf { 0% { opacity: 0; transform: translate(-50%,-50%) scale(0); } 25% { opacity: 1; } 100% { opacity: 0; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1); } }
  #ct-success.run .ct-s-badge { animation: ctSPop .55s cubic-bezier(.34,1.56,.64,1) both; }
  #ct-success.run .ct-s-circle { animation: ctSdraw .5s ease-out .12s both; }
  #ct-success.run .ct-s-check { animation: ctSdraw .4s ease-out .5s both; }
  #ct-success.run .ct-s-ring { animation: ctSring 1.1s ease-out .35s both; }
  #ct-success.run .ct-conf { animation: ctConf .85s ease-out .5s both; }
  #ct-success.run .ct-s-title { animation: ctSup .5s ease .58s both; }
  #ct-success.run .ct-s-sub { animation: ctSup .5s ease .72s both; }
  #ct-success.run .ct-s-btn { animation: ctSup .5s ease .86s both; }
  @media (prefers-reduced-motion: reduce) {
    #ct-success.run .ct-s-badge, #ct-success.run .ct-s-circle, #ct-success.run .ct-s-check, #ct-success.run .ct-s-ring, #ct-success.run .ct-conf, #ct-success.run .ct-s-title, #ct-success.run .ct-s-sub, #ct-success.run .ct-s-btn { animation-duration: .01ms !important; }
    #ct-success.run .ct-s-circle, #ct-success.run .ct-s-check { stroke-dashoffset: 0 !important; }
  }
`;
  document.head.appendChild(s);
})();
