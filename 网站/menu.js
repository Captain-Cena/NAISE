const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
const mobile = window.matchMedia('(max-width: 760px)');

if (toggle && navigation) {
  document.documentElement.classList.add('js');
  toggle.hidden = false;

  function closeMenu({ restoreFocus = false } = {}) {
    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开导航菜单');
    navigation.removeAttribute('data-open');
    if (wasOpen && restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', '关闭导航菜单');
      navigation.setAttribute('data-open', '');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu({ restoreFocus: true });
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.header-inner')) closeMenu();
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  mobile.addEventListener('change', () => closeMenu());
}
