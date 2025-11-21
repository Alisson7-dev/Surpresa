// ===== Tipagem do texto =====
const startBtn = document.getElementById('startBtn');
const typedTextEl = document.getElementById('typedText');
const originalText = typedTextEl.textContent.trim();
let typingIdx = 0;

function typeReset() {
  typedTextEl.textContent = '';
  typingIdx = 0;
}

function typeOnce() {
  typeReset();
  const step = () => {
    if (typingIdx < originalText.length) {
      typedTextEl.textContent += originalText[typingIdx++];
      setTimeout(step, 30);
    }
  };
  step();
}

startBtn.addEventListener('click', typeOnce);

// ===== Carrossel 1 slide por vez, loop infinito, dots =====
const track = document.getElementById('carouselTrack');
let slides = Array.from(track.children);
const dotsContainer = document.getElementById('dots');
let currentIndex = 0;

// Clonar primeiro slide para loop infinito
const firstClone = slides[0].cloneNode(true);
track.appendChild(firstClone);
slides.push(firstClone);

// Renderiza dots
function renderDots() {
  dotsContainer.innerHTML = '';
  slides.slice(0, -1).forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function updateCarousel() {
  const slideWidth = slides[0].offsetWidth + 20;
  track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
  slides.forEach((s, i) => s.classList.toggle('active', i === currentIndex));
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex % (slides.length - 1));
  });
}

function goToSlide(i) {
  currentIndex = i;
  updateCarousel();
}

function nextSlide() {
  currentIndex++;
  track.style.transition = 'transform 0.5s ease';
  updateCarousel();
  if (currentIndex === slides.length - 1) {
    setTimeout(() => {
      track.style.transition = 'none';
      currentIndex = 0;
      updateCarousel();
    }, 510);
  }
}

renderDots();
updateCarousel();
setInterval(nextSlide, 4000);


// ===== Modal da carta =====
const revealBtn = document.getElementById('revealBtn');
const modal = document.getElementById('modal');
revealBtn.addEventListener('click', () => modal.classList.add('open'));

document.addEventListener('click', (e) => {
  if (e.target.matches('#closeModal') || e.target === modal) modal.classList.remove('open');
});

// ===== Corações flutuantes =====
const heartsArea = document.getElementById('hearts');
function burstHearts(n) {
  for (let i = 0; i < n; i++) {
    const el = document.createElement('div');
    el.className = 'heart';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = 80 + Math.random() * 20 + '%';
    el.style.animationDuration = (3 + Math.random() * 3) + 's';
    heartsArea.appendChild(el);
    setTimeout(() => el.remove(), 7000);
  }
}
setInterval(() => burstHearts(3), 5200);

// Enter também dispara o start
startBtn.addEventListener('keyup', e => { if (e.key === 'Enter') startBtn.click(); });

// ===== Edição
