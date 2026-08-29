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
  liberacao: 'IMG_5292.jpeg',
  manta: 'IMG_5294.jpeg',
  bambooterapia: 'IMG_5289.jpeg',
  pantala: 'IMG_5309.jpeg',
  liberadores: 'IMG_5302.jpeg',
  pedras: 'IMG_5295.jpeg',
  rolo: 'IMG_5298.jpeg',
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

// Liberação miofascial: usa a nova foto enviada na seção desportiva.
const liberacaoImage = document.querySelector('#esportiva .sports-photo img');
if (liberacaoImage) {
  liberacaoImage.src = uploadedImages.liberacao;
  liberacaoImage.alt = 'Massagem desportiva e liberação miofascial';
}

// A seção de materiais passa a apresentar todos os recursos enviados.
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
  if (intro) intro.textContent = 'Recursos escolhidos conforme a técnica e a proposta da sessão, sempre alinhados antes do atendimento.';
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

// Ajustes visuais responsivos: prioriza o enquadramento completo dos objetos,
// evita cortes e mantém textos dentro dos cartões em celulares, tablets e desktops.
const responsiveImageStyle = document.createElement('style');
responsiveImageStyle.textContent = `
  /* Premium: mostra a foto inteira, sem cortar o enquadramento. */
  .card.premium img {
    width: 100%;
    aspect-ratio: 4 / 3;
    height: auto !important;
    object-fit: contain !important;
    object-position: center center !important;
    background: #f2e8dc;
  }

  /* Materiais: o objeto é o foco. A foto completa permanece visível. */
  .equipment-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: stretch;
  }
  .equipment-card {
    min-width: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .equipment-visual {
    height: auto !important;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #eee5da;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .equipment-visual img {
    width: 100%;
    height: 100%;
    object-fit: contain !important;
    object-position: center center !important;
    padding: 10px;
  }
  .equipment-body {
    flex: 1;
    min-width: 0;
  }
  .equipment-body h3,
  .equipment-body p {
    overflow-wrap: anywhere;
  }

  @media (max-width: 1100px) {
    .equipment-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  @media (max-width: 760px) {
    .equipment-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    .equipment-visual { aspect-ratio: 1 / 1; }
    .equipment-visual img { padding: 8px; }
    .equipment-body { padding: 15px; }
    .equipment-body h3 { font-size: 19px; line-height: 1.2; }
    .equipment-body p { font-size: 12.5px; line-height: 1.5; }
    .equipment-body .price { font-size: 23px; margin: 10px 0 4px; }
  }

  @media (max-width: 430px) {
    .equipment-grid { grid-template-columns: 1fr; gap: 16px; }
    .equipment-visual { aspect-ratio: 4 / 3; }
    .equipment-visual img { padding: 12px; }
    .equipment-body { padding: 17px; }
    .equipment-body h3 { font-size: 21px; }
    .equipment-body p { font-size: 13px; }

    .card.premium img {
      aspect-ratio: 4 / 3;
      padding: 0;
    }
  }
`;
document.head.appendChild(responsiveImageStyle);
