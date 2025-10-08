document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('nav').forEach(function (nav) {
    if (nav.querySelector('.mobile-nav-toggle')) return;

    var btn = document.createElement('button');
    btn.className = 'mobile-nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '\u2630';

    nav.insertBefore(btn, nav.firstChild);

    btn.addEventListener('click', function () {
      var opened = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });
  });
});
