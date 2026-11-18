const loader = document.querySelector('.site-preloader');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

if (loader && !reducedMotion.matches) {
  loader.classList.add('pages-loader-active');
  setTimeout(() => {
    loader.classList.add('is-leaving');
    setTimeout(() => loader.remove(), 520);
  }, 700);
}

const header = document.querySelector('.site-header');
const menuToggle = header.querySelector('.menu-toggle');
const mobileNav = header.querySelector('.desktop-nav').cloneNode(true);
mobileNav.className = 'mobile-nav';
mobileNav.id = 'mobile-navigation';
mobileNav.hidden = true;
mobileNav.setAttribute('aria-label', 'Мобильная навигация');
const mobileBooking = header.querySelector('.header-cta').cloneNode(true);
mobileBooking.className = '';
mobileNav.append(mobileBooking);
header.append(mobileNav);
menuToggle.setAttribute('aria-controls', mobileNav.id);
menuToggle.classList.add('pages-menu-ready');

function setMenu(open) {
  mobileNav.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
}

menuToggle.addEventListener('click', () => setMenu(mobileNav.hidden));
mobileNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
header.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    setMenu(false);
    menuToggle.focus();
  }
});

const gallery = document.querySelector('.works-carousel');
const viewport = gallery.querySelector('[data-slot="carousel-content"]');
const previous = gallery.querySelector('[data-slot="carousel-previous"]');
const next = gallery.querySelector('[data-slot="carousel-next"]');

if (typeof globalThis.EmblaCarousel === 'function') {
  viewport.classList.add('pages-embla-ready');
  const carousel = globalThis.EmblaCarousel(viewport, { align: 'start', dragFree: true, loop: true });
  const updateArrows = () => {
    previous.disabled = !carousel.canScrollPrev();
    next.disabled = !carousel.canScrollNext();
  };
  carousel.on('reInit', updateArrows).on('select', updateArrows);
  updateArrows();
  previous.addEventListener('click', () => carousel.scrollPrev(reducedMotion.matches));
  next.addEventListener('click', () => carousel.scrollNext(reducedMotion.matches));
  gallery.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') carousel.scrollPrev(reducedMotion.matches);
    else carousel.scrollNext(reducedMotion.matches);
  });
}

const dialog = document.createElement('dialog');
dialog.className = 'work-dialog pages-work-dialog';
dialog.setAttribute('aria-label', 'Просмотр фотографии работы');
const photo = document.createElement('img');
const close = document.createElement('button');
close.type = 'button';
close.setAttribute('data-slot', 'dialog-close');
close.setAttribute('aria-label', 'Закрыть просмотр');
close.textContent = '×';
dialog.append(photo, close);
gallery.after(dialog);

gallery.addEventListener('click', (event) => {
  const image = event.target.closest('.work-button')?.querySelector('img');
  if (!image || dialog.open) return;
  photo.src = image.currentSrc || image.src;
  photo.alt = image.alt;
  dialog.showModal();
});
close.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
