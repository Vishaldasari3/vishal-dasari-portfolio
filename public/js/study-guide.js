/* Open the destination week before navigating to an article section. */
(function () {
  function reveal(hash) {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    const week = target.closest('.study-week');
    if (week) week.open = true;
    requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
  }
  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href^="#section-"]');
    if (link) reveal(link.getAttribute('href'));
  });
  window.addEventListener('hashchange', () => reveal(location.hash));
  if (location.hash) reveal(location.hash);
})();
