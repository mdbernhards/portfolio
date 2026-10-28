/* Progressive enhancement: content and links work without JavaScript. */
const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#navigation');

if (toggle && navigation) {
  document.documentElement.classList.add('has-js');
  toggle.hidden = false;

  function closeNavigation() {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('span').textContent = '+';
  }

  toggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelector('span').textContent = isOpen ? '−' : '+';
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const wasMobile = window.matchMedia('(max-width: 760px)').matches;
    closeNavigation();
    if (wasMobile) {
      const destination = document.querySelector(link.getAttribute('href'));
      if (destination) {
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
      closeNavigation();
      toggle.focus();
    }
  });

  const mobile = window.matchMedia('(max-width: 760px)');
  mobile.addEventListener('change', closeNavigation);
}
