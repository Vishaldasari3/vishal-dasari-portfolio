(function () {
  function confettiBurst(x, y) {
    var colors = ['#3654e0','#7c5cff','#22ddf5','#ff5fae','#4f6bff','#00e0c6'];
    for (var i = 0; i < 22; i++) {
      var c = document.createElement('span');
      var col = colors[Math.floor(Math.random() * colors.length)];
      var ang = Math.random() * Math.PI * 2, dist = 50 + Math.random() * 70;
      var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 30;
      c.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;width:' + (5 + Math.random() * 4) + 'px;height:' + (5 + Math.random() * 4) + 'px;background:' + col + ';border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';pointer-events:none;z-index:999;opacity:1;transition:transform .7s cubic-bezier(.2,.8,.3,1), opacity .7s ease;';
      document.body.appendChild(c);
      requestAnimationFrame(function (el, ddx, ddy) {
        return function () { el.style.transform = 'translate(' + ddx + 'px,' + ddy + 'px) rotate(' + (Math.random() * 360) + 'deg)'; el.style.opacity = '0'; };
      }(c, dx, dy));
      setTimeout(function (el) { return function () { el.remove(); }; }(c), 750);
    }
  }
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
      '<form id="bp-comment-form" style="display:flex;flex-direction:column;gap:10px;margin-bottom:26px;padding:18px;border-radius:16px;background:rgba(255,255,255,0.6);border:1.5px solid rgba(54,84,224,0.35);box-shadow:0 0 0 1px rgba(54,84,224,0.15),0 0 22px rgba(54,84,224,0.22);">' +
        '<input type="text" id="bp-comment-name" placeholder="Your name" maxlength="60" required style="font-size:14px;padding:11px 14px;border-radius:10px;border:1px solid rgba(28,32,48,0.15);font-family:inherit;transition:border-color .15s,box-shadow .15s;">' +
        '<textarea id="bp-comment-text" placeholder="Add a comment..." maxlength="1000" required rows="3" style="font-size:14px;padding:11px 14px;border-radius:10px;border:1px solid rgba(28,32,48,0.15);font-family:inherit;resize:vertical;transition:border-color .15s,box-shadow .15s;"></textarea>' +
        '<input type="text" id="bp-comment-hp" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;" tabindex="-1" autocomplete="off">' +
        '<div style="display:flex;align-items:center;gap:12px;">' +
          '<button type="submit" id="bp-comment-submit" data-no-confetti style="font-size:13px;font-weight:600;font-family:Poppins,sans-serif;padding:10px 20px;border-radius:20px;background:#3654e0;color:#fff;border:none;cursor:pointer;transition:transform .15s,box-shadow .15s,background .15s;">\u{1F4AC} Post comment</button>' +
          '<span id="bp-comment-status" style="font-size:12.5px;color:#9096a8;"></span>' +
        '</div>' +
      '</form>' +
      '<div id="bp-comment-list" style="display:flex;flex-direction:column;gap:14px;"></div>';

    var list = document.getElementById('bp-comment-list');
    var form = document.getElementById('bp-comment-form');
    var status = document.getElementById('bp-comment-status');
    var submitBtn = document.getElementById('bp-comment-submit');
    submitBtn.addEventListener('mouseenter', function () {
      submitBtn.style.transform = 'translateY(-3px) scale(1.04)';
      submitBtn.style.boxShadow = '0 0 18px rgba(54,84,224,0.65), 0 12px 26px -8px rgba(54,84,224,0.6)';
      submitBtn.style.background = '#2c46c4';
    });
    submitBtn.addEventListener('mouseleave', function () {
      submitBtn.style.transform = 'translateY(0) scale(1)';
      submitBtn.style.boxShadow = 'none';
      submitBtn.style.background = '#3654e0';
    });

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
      var r = submitBtn.getBoundingClientRect();
      confettiBurst(r.left + r.width / 2, r.top + r.height / 2);
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
