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

// Alterna a frase principal a cada nova visita sem repetir a frase anterior.
const heroTitle = document.querySelector('#hero-title');
const heroTitles = [
  'Permita-se desacelerar. Nós cuidamos do resto.',
  'Seu corpo pede uma pausa. A TocSuav vai até você.',
  'Seu momento de relaxar começa onde você estiver.',
  'Menos correria. Mais cuidado. A TocSuav chega até você.'
];

if (heroTitle) {
  let nextIndex = 0;
  try {
    const storedIndex = localStorage.getItem('tocsuavHeroTitleIndex');
    if (storedIndex !== null) {
      const lastIndex = Number(storedIndex);
      if (Number.isInteger(lastIndex) && lastIndex >= 0 && lastIndex < heroTitles.length) {
        nextIndex = (lastIndex + 1) % heroTitles.length;
      }
    }
    localStorage.setItem('tocsuavHeroTitleIndex', String(nextIndex));
  } catch (error) {
    nextIndex = Math.floor(Math.random() * heroTitles.length);
  }
  heroTitle.textContent = heroTitles[nextIndex];
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
