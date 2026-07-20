(function () {
  // 1. Sign up free at https://formspree.io
  // 2. Create a new form, set its recipient to your email (verify via the link they send)
  // 3. Copy the Form ID (the part after "/f/" in your form's endpoint) and paste it below.
  const FORMSPREE_FORM_ID = 'mpqvpprg';
  const pageLoadedAt = Date.now();
  const MIN_FILL_TIME_MS = 3000;

  function init() {
    const heroCanvas = document.getElementById('hero-icosa-canvas');
    if (heroCanvas && window.createIcosaScene) window.createIcosaScene(heroCanvas, 0.32);

    function updateTz() {
      const el = document.getElementById('ct-tz-time');
      if (!el) return;
      try {
        el.textContent = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit',
          hour12: true, timeZoneName: 'short'
        }).format(new Date());
      } catch (e) { el.textContent = 'EST'; }
    }
    updateTz();
    setInterval(updateTz, 15000);

    const copyBtn = document.getElementById('ct-copy-email');
    if (copyBtn) copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      try {
        await navigator.clipboard.writeText(email);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = email; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        ta.remove();
      }
      copyBtn.classList.add('copied');
      clearTimeout(copyBtn._t);
      copyBtn._t = setTimeout(() => copyBtn.classList.remove('copied'), 1600);
    });

    const fields = ['name', 'email', 'subject', 'message'];
    const borderDefault = '#e6e8f0';
    const borderError = '#e0435a';
    const borderValid = '#1f8a5b';
    const ICON_OK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f8a5b" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    const ICON_ERR = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e0435a" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5" stroke-linecap="round"/><circle cx="12" cy="16.4" r="0.7" fill="#e0435a" stroke="none"/></svg>';

    function fieldError(f) {
      const v = (document.getElementById('ct-' + f).value || '').trim();
      if (f === 'name') return v ? '' : 'Please enter your name.';
      if (f === 'email') {
        if (!v) return 'Please enter your email.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.';
      }
      if (f === 'subject') return v ? '' : 'Please add a subject.';
      if (f === 'message') {
        if (!v) return 'Please write a message.';
        return v.length < 10 ? 'Message should be at least 10 characters.' : '';
      }
      return '';
    }

    function setFieldState(f, state, shake) {
      const el = document.getElementById('ct-' + f);
      const errEl = document.getElementById('ct-' + f + '-error');
      const icon = document.getElementById('ct-' + f + '-status');
      const wrap = el.parentElement;
      if (state === 'invalid') {
        el.style.borderColor = borderError;
        errEl.textContent = fieldError(f);
        errEl.style.display = 'block';
        if (icon) { icon.innerHTML = ICON_ERR; icon.style.display = 'flex'; }
        if (shake && wrap) { wrap.classList.remove('ct-field-shake'); void wrap.offsetWidth; wrap.classList.add('ct-field-shake'); }
      } else if (state === 'valid') {
        el.style.borderColor = borderValid;
        errEl.style.display = 'none';
        if (icon) { icon.innerHTML = ICON_OK; icon.style.display = 'flex'; }
      } else {
        el.style.borderColor = borderDefault;
        errEl.style.display = 'none';
        if (icon) { icon.style.display = 'none'; icon.innerHTML = ''; }
      }
    }

    fields.forEach((f) => {
      const el = document.getElementById('ct-' + f);
      el.addEventListener('focus', () => {
        el.style.background = '#ffffff';
        el.style.boxShadow = '0 0 0 4px rgba(54,84,224,0.1)';
      });
      el.addEventListener('blur', () => {
        el.style.background = '#fafbfd';
        el.style.boxShadow = 'none';
        if (!el.value.trim()) { setFieldState(f, 'neutral'); return; }
        setFieldState(f, fieldError(f) ? 'invalid' : 'valid', false);
      });
      el.addEventListener('input', () => {
        setFieldState(f, 'neutral');
        document.getElementById('ct-sent-msg').style.display = 'none';
        document.getElementById('ct-top-error').style.display = 'none';
        sendLabel.textContent = 'Send it my way';
      });
      if (f !== 'message') {
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('ct-send').click();
          }
        });
      }
    });

    function validate() {
      const errors = {};
      fields.forEach((f) => { const msg = fieldError(f); if (msg) errors[f] = msg; });
      return errors;
    }

    const sendBtn = document.getElementById('ct-send');
    const sendLabel = document.getElementById('ct-send-label');

    function showSuccess() {
      const panel = document.getElementById('ct-success');
      if (!panel) return;
      panel.style.display = 'flex';
      panel.classList.remove('run');
      void panel.offsetWidth;
      panel.classList.add('run');
    }
    const againBtn = document.getElementById('ct-success-again');
    if (againBtn) againBtn.addEventListener('click', () => {
      const panel = document.getElementById('ct-success');
      panel.classList.remove('run');
      panel.style.display = 'none';
      sendLabel.textContent = 'Send it my way';
      const first = document.getElementById('ct-name');
      if (first) first.focus();
    });

    sendBtn.addEventListener('click', async () => {
      document.getElementById('ct-sent-msg').style.display = 'none';
      document.getElementById('ct-top-error').style.display = 'none';
      sendLabel.textContent = 'Send it my way';
      const errors = validate();
      fields.forEach((f) => {
        setFieldState(f, errors[f] ? 'invalid' : 'valid', !!errors[f]);
      });
      const hasErrors = Object.keys(errors).length > 0;
      document.getElementById('ct-top-error').style.display = hasErrors ? 'block' : 'none';
      if (hasErrors) return;

      // Honeypot: bots fill hidden fields, humans never see them.
      if (document.getElementById('ct-hp').value.trim()) {
        document.getElementById('ct-sent-msg').textContent = 'Thanks \u2014 your message is on its way!';
        document.getElementById('ct-sent-msg').style.display = 'block';
        fields.forEach((f) => { document.getElementById('ct-' + f).value = ''; });
        return;
      }
      // Time trap: bots submit near-instantly; require a few seconds of human interaction.
      if (Date.now() - pageLoadedAt < MIN_FILL_TIME_MS) {
        document.getElementById('ct-top-error').textContent = 'Please take a moment before sending \u2014 try again in a couple seconds.';
        document.getElementById('ct-top-error').style.display = 'block';
        return;
      }

      // Cloudflare Turnstile (Formspree checks cf-turnstile-response server-side).
      const captchaEl = document.querySelector('.cf-turnstile');
      const captchaConfigured = captchaEl && !!captchaEl.getAttribute('data-sitekey');
      if (captchaConfigured) {
        const captchaInput = document.querySelector('[name="cf-turnstile-response"]');
        const captchaResponse = captchaInput ? captchaInput.value : '';
        if (!captchaResponse) {
          document.getElementById('ct-top-error').textContent = 'Please complete the verification check.';
          document.getElementById('ct-top-error').style.display = 'block';
          return;
        }
        window.__ctCaptchaResponse = captchaResponse;
      } else {
        window.__ctCaptchaResponse = '';
      }

      if (FORMSPREE_FORM_ID === 'YOUR_FORM_ID') {
        document.getElementById('ct-top-error').textContent = 'Form isn\u2019t connected yet \u2014 add your Formspree form ID in contact.js.';
        document.getElementById('ct-top-error').style.display = 'block';
        return;
      }

      sendBtn.disabled = true;
      sendLabel.textContent = 'Sending\u2026';
      document.getElementById('ct-spinner').style.display = 'inline-block';
      document.getElementById('ct-send-icon').style.display = 'none';
      fields.forEach((f) => { document.getElementById('ct-' + f).disabled = true; });
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: document.getElementById('ct-name').value,
            email: document.getElementById('ct-email').value,
            inquiry: document.getElementById('ct-inquiry').value,
            subject: document.getElementById('ct-subject').value,
            message: document.getElementById('ct-message').value,
            _gotcha: '',
            'cf-turnstile-response': window.__ctCaptchaResponse || '',
          }),
        });
        if (!res.ok) throw new Error('Formspree responded ' + res.status);
        document.getElementById('ct-top-error').style.display = 'none';
        sendLabel.textContent = 'Sent!';
        fields.forEach((f) => { document.getElementById('ct-' + f).value = ''; setFieldState(f, 'neutral'); });
        const inqReset = document.getElementById('ct-inquiry'); if (inqReset) inqReset.selectedIndex = 0;
        if (window.turnstile) window.turnstile.reset();
        showSuccess();
      } catch (err) {
        console.error(err);
        document.getElementById('ct-top-error').textContent = 'Something went wrong sending your message \u2014 please try again or email directly.';
        document.getElementById('ct-top-error').style.display = 'block';
        sendLabel.textContent = 'Send it my way';
      } finally {
        sendBtn.disabled = false;
        document.getElementById('ct-spinner').style.display = 'none';
        document.getElementById('ct-send-icon').style.display = '';
        fields.forEach((f) => { document.getElementById('ct-' + f).disabled = false; });
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
