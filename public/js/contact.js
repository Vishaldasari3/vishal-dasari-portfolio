(function () {
  // 1. Sign up free at https://formspree.io
  // 2. Create a new form, set its recipient to your email (verify via the link they send)
  // 3. Copy the Form ID (the part after "/f/" in your form's endpoint) and paste it below.
  const FORMSPREE_FORM_ID = 'mpqvpprg';
  const pageLoadedAt = Date.now();
  const MIN_FILL_TIME_MS = 3000;

  function init() {
    const heroCanvas = document.getElementById('hero-icosa-canvas');
    if (heroCanvas && window.createIcosaScene) window.createIcosaScene(heroCanvas, 0.25);

    const fields = ['name', 'email', 'subject', 'message'];
    const borderDefault = '#e6e8f0';
    const borderError = '#e0435a';

    fields.forEach((f) => {
      const el = document.getElementById('ct-' + f);
      el.addEventListener('focus', () => {
        el.style.background = '#ffffff';
        el.style.boxShadow = '0 0 0 4px rgba(54,84,224,0.1)';
      });
      el.addEventListener('blur', () => {
        el.style.background = '#fafbfd';
        el.style.boxShadow = 'none';
      });
      el.addEventListener('input', () => {
        el.style.borderColor = borderDefault;
        document.getElementById('ct-' + f + '-error').style.display = 'none';
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
      const name = document.getElementById('ct-name').value;
      const email = document.getElementById('ct-email').value;
      const subject = document.getElementById('ct-subject').value;
      const message = document.getElementById('ct-message').value;
      const errors = {};
      if (!name.trim()) errors.name = 'Please enter your name.';
      if (!email.trim()) {
        errors.email = 'Please enter your email.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.email = 'Enter a valid email address.';
      }
      if (!subject.trim()) errors.subject = 'Please add a subject.';
      if (!message.trim()) {
        errors.message = 'Please write a message.';
      } else if (message.trim().length < 10) {
        errors.message = 'Message should be at least 10 characters.';
      }
      return errors;
    }

    const sendBtn = document.getElementById('ct-send');
    const sendLabel = document.getElementById('ct-send-label');

    sendBtn.addEventListener('click', async () => {
      document.getElementById('ct-sent-msg').style.display = 'none';
      document.getElementById('ct-top-error').style.display = 'none';
      sendLabel.textContent = 'Send Message';
      const errors = validate();
      fields.forEach((f) => {
        const el = document.getElementById('ct-' + f);
        const errEl = document.getElementById('ct-' + f + '-error');
        if (errors[f]) {
          el.style.borderColor = borderError;
          errEl.textContent = errors[f];
          errEl.style.display = 'block';
        } else {
          el.style.borderColor = borderDefault;
          errEl.style.display = 'none';
        }
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
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: document.getElementById('ct-name').value,
            email: document.getElementById('ct-email').value,
            subject: document.getElementById('ct-subject').value,
            message: document.getElementById('ct-message').value,
            _gotcha: '',
            'cf-turnstile-response': window.__ctCaptchaResponse || '',
          }),
        });
        if (!res.ok) throw new Error('Formspree responded ' + res.status);
        document.getElementById('ct-sent-msg').textContent = 'Thanks \u2014 your message is on its way!';
        document.getElementById('ct-sent-msg').style.display = 'block';
        document.getElementById('ct-top-error').style.display = 'none';
        sendLabel.textContent = 'Sent!';
        fields.forEach((f) => { document.getElementById('ct-' + f).value = ''; });
        if (window.turnstile) window.turnstile.reset();
      } catch (err) {
        console.error(err);
        document.getElementById('ct-top-error').textContent = 'Something went wrong sending your message \u2014 please try again or email directly.';
        document.getElementById('ct-top-error').style.display = 'block';
        sendLabel.textContent = 'Send Message';
      } finally {
        sendBtn.disabled = false;
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
