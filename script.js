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

// Novas imagens enviadas pelo cliente: serviços e materiais.
const uploadedImages = {
  drenagem: 'IMG_5304.jpeg',
  liberacao: 'IMG_5302.jpeg',
  manta: 'IMG_5298.jpeg',
  bambooterapia: 'IMG_5289.jpeg',
  pantala: 'IMG_5292.jpeg',
  liberadores: 'IMG_5294.jpeg',
  pedras: 'IMG_5295.jpeg',
  rolo: 'IMG_5309.jpeg',
  ventosa: 'IMG_5303.jpeg'
};

// Drenagem linfática: usa a nova foto enviada.
const drenagemCard = Array.from(document.querySelectorAll('#servicos .card')).find(card =>
  card.querySelector('h3')?.textContent.trim().toLowerCase().includes('drenagem')
);
if (drenagemCard) {
  const image = drenagemCard.querySelector('img');
  if (image) {
    image.src = uploadedImages.drenagem;
    image.alt = 'Drenagem linfática';
  }
}

// Liberação miofascial: usa a nova foto na seção de massagem desportiva.
const liberacaoImage = document.querySelector('#esportiva .sports-photo img');
if (liberacaoImage) {
  liberacaoImage.src = uploadedImages.liberacao;
  liberacaoImage.alt = 'Massagem desportiva e liberação miofascial';
}

// A seção de equipamentos passa a apresentar todos os materiais enviados.
const equipmentSection = document.querySelector('#equipamentos');
const equipmentGrid = equipmentSection?.querySelector('.equipment-grid');
if (equipmentSection && equipmentGrid) {
  const title = equipmentSection.querySelector('h2');
  const eyebrow = equipmentSection.querySelector('.eyebrow');
  const intro = equipmentSection.querySelector('.section-title p');
  const note = equipmentSection.querySelector('.note');
  const navEquipment = document.querySelector('.nav-links a[href="#equipamentos"]');

  if (eyebrow) eyebrow.textContent = 'Materiais utilizados';
  if (title) title.textContent = 'Materiais utilizados nos serviços';
  if (intro) intro.textContent = 'Os recursos abaixo fazem parte da estrutura da TocSuav e são utilizados conforme o serviço escolhido e o que for alinhado antes da sessão.';
  if (navEquipment) navEquipment.textContent = 'Materiais';
  if (note) note.textContent = 'Os materiais são utilizados conforme a proposta de cada atendimento. Nem todos os recursos são usados em todas as sessões.';

  const materials = [
    {
      name: 'Manta térmica', image: uploadedImages.manta,
      alt: 'Manta térmica para massoterapia',
      description: 'Aquecimento controlado para proporcionar calor e conforto quando esse recurso é adequado.',
      price: 'R$ 60', extra: 'Serviço avulso.'
    },
    {
      name: 'Bambooterapia', image: uploadedImages.bambooterapia,
      alt: 'Bambus para bambooterapia',
      description: 'Bambus utilizados em manobras específicas, permitindo variar pressão e formato do toque conforme a proposta da sessão.'
    },
    {
      name: 'Pantala', image: uploadedImages.pantala,
      alt: 'Pantala para massoterapia',
      description: 'Instrumento manual utilizado para complementar técnicas específicas conforme o objetivo do atendimento.'
    },
    {
      name: 'Liberadores miofasciais', image: uploadedImages.liberadores,
      alt: 'Liberadores miofasciais',
      description: 'Instrumentos utilizados para direcionar o trabalho em regiões de maior tensão dentro da proposta da sessão.'
    },
    {
      name: 'Pedras quentes', image: uploadedImages.pedras,
      alt: 'Pedras quentes para massoterapia',
      description: 'Utilizadas quando adequadas ao atendimento, acrescentando calor e uma sensação diferente ao toque.'
    },
    {
      name: 'Rolo com ventosa', image: uploadedImages.rolo,
      alt: 'Rolo com ventosa',
      description: 'Recurso manual que pode complementar técnicas específicas conforme o serviço e o alinhamento prévio.'
    },
    {
      name: 'Ventosa', image: uploadedImages.ventosa,
      alt: 'Kit de ventosas',
      description: 'Recurso utilizado conforme a proposta da sessão e o que for alinhado antes do atendimento.',
      price: 'R$ 60', extra: 'Serviço avulso.'
    }
  ];

  equipmentGrid.innerHTML = '';
  materials.forEach(material => {
    const article = document.createElement('article');
    article.className = 'equipment-card';
    article.innerHTML = `
      <div class="equipment-visual">
        <img src="${material.image}" alt="${material.alt}" loading="lazy">
      </div>
      <div class="equipment-body">
        <h3>${material.name}</h3>
        <p>${material.description}</p>
        ${material.price ? `<div class="price">${material.price}</div>` : ''}
        ${material.extra ? `<p>${material.extra}</p>` : ''}
      </div>
    `;
    equipmentGrid.appendChild(article);
  });
}
