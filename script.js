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

// Logo tipográfica: substitui as imagens da marca por texto real no site.
const brandStyle = document.createElement('style');
brandStyle.textContent = `
  .brand-wordmark {
    display: inline-block;
    font-family: "Bodoni 72", Didot, "Bodoni MT", "Times New Roman", serif;
    font-size: 41px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.055em;
    color: #3b2114;
    white-space: nowrap;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
  }

  .navbar .brand-wordmark {
    transform: scaleY(1.04);
    transform-origin: left center;
  }

  footer .brand-wordmark {
    color: #d7ad72;
    font-size: 44px;
    letter-spacing: -0.055em;
  }

  @media (max-width: 600px) {
    .brand-wordmark { font-size: 34px; }
    footer .brand-wordmark { font-size: 38px; }
  }
`;
document.head.appendChild(brandStyle);

document.querySelectorAll('.logo, .footer-logo').forEach(logoImage => {
  const wordmark = document.createElement('span');
  wordmark.className = 'brand-wordmark';
  wordmark.textContent = 'TOCSUAV';
  wordmark.setAttribute('role', 'img');
  wordmark.setAttribute('aria-label', 'TOCSUAV');
  logoImage.replaceWith(wordmark);
});

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
