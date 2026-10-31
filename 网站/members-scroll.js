const memberEntries = document.querySelectorAll('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (memberEntries.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
  document.documentElement.classList.add('members-motion-ready');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle('is-visible', entry.intersectionRatio >= 0.15);
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -24px 0px' });
  for (const entry of memberEntries) observer.observe(entry);
}
