const { act } = require("react");

const startBtn = document.getElementById('startBtn');
const typedTextEl = document.getElementById('typedText');
const originalText = typedTextEl.textContent.trim()
let typingIdx = 0;

function typeReset(){typedTextEl.textContent = ''; typingIdx = 0}
function typeOnce(){
    typeReset();
     const step = () => {
        if(typingIdx < originalText.length){
            typedTextEl.textContent += originalText[typingIdx++];
            setTimeout(step, 30)
        }
     };
     step()
}
startBtn.addEventListener('click', typeOnce)

const slides = document.getElementById('slides');
const slideEls = document.querySelectorAll('.slide');
const dots = document.getElementById('dots');
let current = 0;

function renderDots(){
    dots.innerHTML = '';
    slideEls.forEach((_, i)=>{
        const d = document.createElement('div');
        d.className = 'dot';
        if(i === 0 ) d.classList.add('active');
        d.addEventListener('click', () => goTo(i));
        dots.appendChild(d)
    });
}

function goTo(i){
    current = i;
    slides.style.transform = `translateX(${-current * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, idx) => d.classList.toggle('active', idx ===  current));

}
renderDots();
setInterval(()=> goTo((current + 1)% slideEls.length),4500);

const musicBtn = document.getElementById('musicBtn');
const Audio= document.getElementById('bgAudio');
let playing = false
musicBtn.addEventListener('onclick', ()=>{
    if (!audio.querySelector('source')){
        alert('addcione a musica no Html dps');
        return;
    }
    if(playing ){audio.pause(); musicBtn.textContent = '▶︎ Tocar música';}
    else{audio.play(); musicBtn.textContent = '❚❚ Pausar'}
});

audio.addEventListener('play', () => playing = true);
audio.addEventListener('pause', () => playing = false);


const revealBtn = document.getElementById('revealBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
revealBtn.addEventListener('click', () => modal.classList.add('open'));
closeModal.addEventListener('click', () => modal.classList.remove('open'));

