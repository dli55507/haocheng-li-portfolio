// Small progressive enhancements: fade-in on scroll and a nav border once scrolled.
document.documentElement.classList.add('js');

const nav = document.querySelector('.nav');
const onScroll = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const items = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('is-visible'));
}

// Autoplaying preview videos only play while on screen (saves bandwidth and battery).
const previews = document.querySelectorAll('video[data-autoplay]');
if ('IntersectionObserver' in window) {
  const vo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.play().catch(() => {});
      else e.target.pause();
    }
  }, { threshold: 0.25 });
  previews.forEach((v) => vo.observe(v));
}
