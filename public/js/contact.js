(function () {
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

    document.getElementById('ct-send').addEventListener('click', () => {
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
      document.getElementById('ct-sent-msg').style.display = hasErrors ? 'none' : 'block';
      document.getElementById('ct-send-label').textContent = hasErrors ? 'Send Message' : 'Sent!';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
