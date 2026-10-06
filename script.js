window.addEventListener('DOMContentLoaded', () => {
    const floatingContainer = document.getElementById('floatingElements');
    const symbols = ['💖', '🎀', '🐰', '✨', '🌸', '💌'];
    
    if (floatingContainer) {
        for (let i = 0; i < 15; i++) {
            const span = document.createElement('span');
            span.classList.add('float-item');
            span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            span.style.left = Math.random() * 100 + 'vw';
            span.style.top = (Math.random() * 20 + 100) + 'vh';
            span.style.fontSize = (Math.random() * 16 + 16) + 'px';
            span.style.animationDuration = (Math.random() * 5 + 5) + 's';
            span.style.animationDelay = (Math.random() * 5) + 's';
            floatingContainer.appendChild(span);
        }
    }

    updateRelationshipDuration();
    
    const quotes = [
        "\"อ้วนคือความสุขที่น่ารักที่สุดในโลกเลยนะ รู้ตัวมั้ย?\"",
        "\"ขอบคุณที่เข้ามาทำให้ทุกวันเป็นวันที่พิเศษนะคะ 💖\"",
        "\"อยู่เป็นรอยยิ้มสดใสแบบนี้ให้พี่ไปนานๆ เลยน้า\"",
        "\"ไม่ว่าจะผ่านไปกี่เดือน พี่ก็รักอ้วนมากขึ้นทุกวันเลยนะ 🐰🎀\""
    ];
    const dailyQuoteEl = document.getElementById('dailyQuote');
    if (dailyQuoteEl) {
        dailyQuoteEl.innerText = quotes[Math.floor(Math.random() * quotes.length)];
    }
});

function switchPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        const phoneContainer = document.querySelector('.phone-container');
        if (phoneContainer) phoneContainer.scrollTop = 0;
    }
}

const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
if (openEnvelopeBtn) {
    openEnvelopeBtn.addEventListener('click', () => {
        const flap = document.querySelector('.envelope-flap');
        if (flap) flap.style.transform = 'rotateX(180deg)';
        playBgMusic();
        setTimeout(() => switchPage('pageHome'), 600);
    });
}

const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');

if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            playBgMusic();
        } else {
            bgMusic.pause();
            if (musicIcon) musicIcon.innerText = '🔇';
        }
    });
}

function playBgMusic() {
    if (bgMusic) {
        bgMusic.volume = 0.5;
        bgMusic.play().then(() => {
            if (musicIcon) musicIcon.innerText = '🎵';
        }).catch(error => {
            console.log("Audio playback error:", error);
            if (musicIcon) musicIcon.innerText = '🔇';
        });
    }
}

function updateRelationshipDuration() {
    const counterEl = document.getElementById('dateCounter');
    if (!counterEl) return;
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 4);
    const today = new Date();
    const diffDays = Math.ceil(Math.abs(today - startDate) / (1000 * 60 * 60 * 24));
    counterEl.innerText = `คบกันมาแล้ว ${diffDays} วัน เต็มๆ 💖`;
}

function openNoteModal(title, text) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalBody').innerText = text;
    document.getElementById('noteModal').classList.add('show');
}

function closeNoteModal() {
    document.getElementById('noteModal').classList.remove('show');
}

let gameInterval = null;
let countdownInterval = null;
let gameScore = 0;
let timeLeft = 20;
let isPlaying = false;

function startGame() {
    const gameArea = document.getElementById('gameArea');
    const startBtn = document.getElementById('startGameBtn');
    
    if (isPlaying) return;
    isPlaying = true;
    gameScore = 0;
    timeLeft = 20;
    
    document.getElementById('scoreVal').innerText = gameScore;
    document.getElementById('timeVal').innerText = timeLeft;
    if (startBtn) startBtn.style.display = 'none';
    
    if (gameArea) {
        gameArea.querySelectorAll('.game-heart').forEach(h => h.remove());

        countdownInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('timeVal').innerText = timeLeft;
            if (timeLeft <= 0) endGame();
        }, 1000);

        gameInterval = setInterval(() => spawnHeart(gameArea), 600);
    }
}

function spawnHeart(container) {
    if (!isPlaying) return;
    const heart = document.createElement('div');
    heart.classList.add('game-heart');
    const emojis = ['💖', '🎀', '🐰', '💗', '✨'];
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    heart.style.left = Math.max(10, Math.floor(Math.random() * (container.clientWidth - 40))) + 'px';
    heart.style.top = Math.max(10, Math.floor(Math.random() * (container.clientHeight - 40))) + 'px';
    
    heart.addEventListener('click', (e) => {
        e.stopPropagation();
        gameScore++;
        document.getElementById('scoreVal').innerText = gameScore;
        heart.remove();
    });
    
    container.appendChild(heart);
    setTimeout(() => { if (heart.parentElement) heart.remove(); }, 1200);
}

function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(countdownInterval);
    
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
        startBtn.style.display = 'block';
        startBtn.innerText = 'เล่นอีกรอบ 💕';
    }
    
    document.getElementById('celebrationText').innerText = `อ้วนเก็บหัวใจได้ ${gameScore} ดวงแน่ะ! เก่งที่สุดเลยคนสวย อยู่รักกันไปนานๆ น้า 🐰💖`;
    document.getElementById('celebrationOverlay').classList.add('show');
}

function closeCelebration() {
    document.getElementById('celebrationOverlay').classList.remove('show');
}