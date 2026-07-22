(function () {
  var TYPES = [
    { key: 'insightful', emoji: '\uD83D\uDC4D', label: 'Insightful' },
    { key: 'relatable', emoji: '\u2764\uFE0F', label: 'Relatable' },
    { key: 'mindblown', emoji: '\uD83E\uDD2F', label: 'Mind-blown' },
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
      row.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;';
      TYPES.forEach(function (t) {
        var active = reacted === t.key;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.disabled = !!reacted;
        btn.style.cssText = 'display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600;font-family:Poppins,sans-serif;padding:9px 16px;border-radius:20px;cursor:' + (reacted ? 'default' : 'pointer') + ';transition:transform .15s,background .15s;background:' + (active ? 'rgba(54,84,224,0.12)' : 'rgba(255,255,255,0.7)') + ';border:1px solid ' + (active ? '#3654e0' : 'rgba(28,32,48,0.14)') + ';color:' + (active ? '#3654e0' : '#3a3f5c') + ';';
        btn.innerHTML = '<span style="font-size:16px;">' + t.emoji + '</span><span>' + t.label + '</span><span style="opacity:.55;">' + (counts[t.key] || 0) + '</span>';
        if (!reacted) {
          btn.addEventListener('mouseenter', function () { btn.style.transform = 'translateY(-2px)'; });
          btn.addEventListener('mouseleave', function () { btn.style.transform = 'translateY(0)'; });
          btn.addEventListener('click', function () { react(t.key); });
        }
        row.appendChild(btn);
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
