(function () {
  var TYPES = [
    { key: 'insightful', emoji: '\uD83D\uDCA1', label: 'Insightful' },
    { key: 'relatable', emoji: '\uD83D\uDE4C', label: 'Relatable' },
    { key: 'mindblown', emoji: '\u2764\uFE0F', label: 'Loved it!' },
    { key: 'inspiring', emoji: '\uD83D\uDD25', label: 'Inspiring' },
  ];

  function init() {
    var mount = document.getElementById('bp-reactions');
    if (!mount) return;
    var slug = document.body.getAttribute('data-slug');
    if (!slug) return;
    var storageKey = 'reacted:' + slug;
    var reacted = localStorage.getItem(storageKey);

    function render(counts) {
      counts = counts || {};
      mount.innerHTML = '';
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:14px;width:100%;padding:18px;border-radius:20px;background:rgba(255,255,255,0.6);border:1.5px solid rgba(54,84,224,0.35);box-shadow:0 0 0 1px rgba(54,84,224,0.15),0 0 22px rgba(54,84,224,0.25),0 16px 34px -22px rgba(30,40,80,0.28);';
      TYPES.forEach(function (t) {
        var active = reacted === t.key;
        var col = document.createElement('div');
        col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:5px;flex:1;min-width:0;';

        var caption = document.createElement('span');
        caption.style.cssText = 'font-size:9px;font-family:Poppins,sans-serif;color:' + (active ? '#3654e0' : '#5a6078') + ';font-weight:' + (active ? '700' : '500') + ';white-space:nowrap;';
        caption.textContent = t.label;

        var btn = document.createElement('button');
        btn.type = 'button';
        if (reacted) btn.setAttribute('aria-disabled', 'true');
        btn.style.cssText = 'position:relative;width:100%;height:64px;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:' + (reacted ? 'default' : 'pointer') + ';opacity:1;-webkit-appearance:none;appearance:none;color:inherit;transform-style:preserve-3d;perspective:400px;transition:transform .25s cubic-bezier(.2,.8,.3,1.4),box-shadow .25s,background .2s,border-color .2s;font-family:Poppins,sans-serif;background:' + (active ? 'rgba(54,84,224,0.08)' : '#ffffff') + ';border:1.5px solid ' + (active ? '#3654e0' : 'rgba(54,84,224,0.3)') + ';box-shadow:' + (active ? '0 0 16px rgba(54,84,224,0.55),0 10px 24px -10px rgba(54,84,224,0.5)' : '0 0 8px rgba(54,84,224,0.18),0 2px 6px rgba(20,22,43,0.05)') + ';';
        btn.innerHTML = '<span style="font-size:19px;opacity:1;">' + t.emoji + '</span><span style="font-size:9px;color:' + (active ? '#3654e0' : '#9096a8') + ';font-weight:' + (active ? '700' : '400') + ';">' + (counts[t.key] || 0) + '</span>' + (active ? '<span style="position:absolute;top:6px;right:6px;width:7px;height:7px;border-radius:50%;background:#3654e0;"></span>' : '');

        if (!reacted) {
          btn.addEventListener('mouseenter', function () {
            btn.style.transform = 'translateY(-6px) rotateX(10deg) scale(1.06)';
            btn.style.boxShadow = '0 0 26px rgba(54,84,224,0.75),0 0 10px rgba(54,84,224,0.9),0 18px 28px -12px rgba(20,22,43,0.25)';
            btn.style.borderColor = '#3654e0';
          });
          btn.addEventListener('mouseleave', function () {
            btn.style.transform = 'translateY(0) rotateX(0) scale(1)';
            btn.style.boxShadow = '0 0 8px rgba(54,84,224,0.18),0 2px 6px rgba(20,22,43,0.05)';
            btn.style.borderColor = 'rgba(54,84,224,0.3)';
          });
          btn.addEventListener('mousedown', function () { btn.style.transform = 'translateY(-1px) rotateX(4deg) scale(0.96)'; });
          btn.addEventListener('click', function () { react(t.key); });
        }
        col.appendChild(caption);
        col.appendChild(btn);
        row.appendChild(col);
      });
      mount.appendChild(row);
    }

    function fetchCounts() {
      fetch('/api/reactions/' + encodeURIComponent(slug))
        .then(function (r) { return r.json(); })
        .then(render)
        .catch(function () { render({}); });
    }

    function react(key) {
      if (reacted) return;
      reacted = key;
      localStorage.setItem(storageKey, key);
      render({});
      fetch('/api/reactions/' + encodeURIComponent(slug), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: key }),
      })
        .then(function (r) { return r.json(); })
        .then(render)
        .catch(function () {});
    }

    fetchCounts();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
