(function () {
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function timeAgo(iso) {
    var diff = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  }

  function init() {
    var mount = document.getElementById('bp-comments');
    if (!mount) return;
    var slug = document.body.getAttribute('data-slug');
    if (!slug) return;

    mount.innerHTML =
      '<div style="font-size:18px;font-weight:700;color:#14162b;margin-bottom:16px;font-family:Poppins,sans-serif;">Comments</div>' +
      '<form id="bp-comment-form" style="display:flex;flex-direction:column;gap:10px;margin-bottom:26px;">' +
        '<input type="text" id="bp-comment-name" placeholder="Your name" maxlength="60" required style="font-size:14px;padding:11px 14px;border-radius:10px;border:1px solid rgba(28,32,48,0.15);font-family:inherit;">' +
        '<textarea id="bp-comment-text" placeholder="Add a comment..." maxlength="1000" required rows="3" style="font-size:14px;padding:11px 14px;border-radius:10px;border:1px solid rgba(28,32,48,0.15);font-family:inherit;resize:vertical;"></textarea>' +
        '<input type="text" id="bp-comment-hp" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;" tabindex="-1" autocomplete="off">' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
          '<button type="submit" style="font-size:13px;font-weight:600;font-family:Poppins,sans-serif;padding:10px 20px;border-radius:20px;background:#3654e0;color:#fff;border:none;cursor:pointer;">Post comment</button>' +
          '<span id="bp-comment-status" style="font-size:12.5px;color:#9096a8;"></span>' +
        '</div>' +
      '</form>' +
      '<div id="bp-comment-list" style="display:flex;flex-direction:column;gap:14px;"></div>';

    var list = document.getElementById('bp-comment-list');
    var form = document.getElementById('bp-comment-form');
    var status = document.getElementById('bp-comment-status');

    function renderComments(comments) {
      if (!comments || !comments.length) {
        list.innerHTML = '<div style="font-size:14px;color:#9096a8;">No comments yet \u2014 be the first.</div>';
        return;
      }
      list.innerHTML = comments.map(function (c) {
        return '<div style="padding:14px 16px;border-radius:12px;background:rgba(255,255,255,0.65);border:1px solid rgba(28,32,48,0.08);">' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">' +
            '<span style="font-size:13.5px;font-weight:600;color:#14162b;">' + esc(c.name) + '</span>' +
            '<span style="font-size:12px;color:#9096a8;">' + timeAgo(c.created_at) + '</span>' +
          '</div>' +
          '<div style="font-size:14px;color:#4a5069;line-height:1.6;">' + esc(c.text) + '</div>' +
        '</div>';
      }).join('');
    }

    function load() {
      fetch('/api/comments/' + encodeURIComponent(slug))
        .then(function (r) { return r.json(); })
        .then(renderComments)
        .catch(function () { renderComments([]); });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('bp-comment-name').value.trim();
      var text = document.getElementById('bp-comment-text').value.trim();
      var hp = document.getElementById('bp-comment-hp').value;
      if (!name || !text) return;
      status.textContent = 'Posting\u2026';
      fetch('/api/comments/' + encodeURIComponent(slug), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, text: text, hp: hp }),
      })
        .then(function (r) { return r.json(); })
        .then(function () {
          status.textContent = 'Thanks \u2014 your comment is awaiting approval.';
          form.reset();
        })
        .catch(function () { status.textContent = 'Something went wrong. Try again.'; });
    });

    load();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
