const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#menu-principal');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialPrev = document.querySelector('.testimonial-arrow.prev');
const testimonialNext = document.querySelector('.testimonial-arrow.next');

if (testimonialTrack && testimonialPrev && testimonialNext) {
  const move = direction => {
    const card = testimonialTrack.querySelector('.testimonial-card');
    const distance = card ? card.getBoundingClientRect().width + 18 : 340;
    testimonialTrack.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };
  testimonialPrev.addEventListener('click', () => move(-1));
  testimonialNext.addEventListener('click', () => move(1));
}
