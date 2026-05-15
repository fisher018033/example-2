// ========== ТЕМА ==========
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// ========== ПЛАВНЫЙ СКРОЛЛ ==========
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== ПЕРЕКЛЮЧЕНИЕ ТАРИФОВ ==========
let period = 'month';
document.querySelectorAll('.billing-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        period = btn.dataset.period;
        document.querySelectorAll('.billing-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.price-card').forEach(card => {
            const price = card.dataset[period];
            if (price) card.querySelector('.price').innerText = Number(price).toLocaleString() + ' ₽';
        });
    });
});

// ========== КОПИРОВАНИЕ ПРОМОКОДА ==========
const copyBtn = document.getElementById('copyPromoBtn');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const promoCode = document.querySelector('.promo-code').innerText;
        navigator.clipboard.writeText(promoCode).then(() => {
            const msg = document.getElementById('copyMsg');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '✅ Скопировано!';
            msg.innerText = 'Промокод LAND2025 скопирован!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                msg.innerText = '';
            }, 2000);
        });
    });
}

// ========== КАЛЬКУЛЯТОР ==========
function calculateTotal() {
    const type = Number(document.getElementById('calcType').value);
    let total = type;
    if (document.getElementById('calcSEO')?.checked) total += 5000;
    if (document.getElementById('calcAdmin')?.checked) total += 7000;
    if (document.getElementById('calcDesign')?.checked) total += 10000;
    if (document.getElementById('calcUrgent')?.checked) total += 8000;
    document.getElementById('calcResult').innerText = total.toLocaleString() + ' ₽';
}
['calcType', 'calcSEO', 'calcAdmin', 'calcDesign', 'calcUrgent'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', calculateTotal);
});
calculateTotal();

// ========== ТАБЫ ==========
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// ========== ФОРМА КОНТАКТОВ ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = document.querySelector('#contactForm .form-message');
        msg.innerText = '✅ Заявка принята! Мы свяжемся с вами.';
        setTimeout(() => msg.innerText = '', 3000);
        contactForm.reset();
    });
}

// ========== МОДАЛКА ЗАЯВКИ ==========
const modal = document.getElementById('modal');
const modalForm = document.getElementById('modalForm');
document.querySelectorAll('.modal-open').forEach(btn => {
    btn.addEventListener('click', () => modal.style.display = 'flex');
});
document.querySelector('.modal-close')?.addEventListener('click', () => modal.style.display = 'none');
modal?.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Заявка отправлена!');
        modal.style.display = 'none';
        modalForm.reset();
    });
}

// ========== ЭФФЕКТ ЧАСТИЦ НА КАНВАСЕ (АХУЕННЫЙ ФОН) ==========
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let hue = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Градиентный фон (динамический)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (document.body.classList.contains('dark')) {
        gradient.addColorStop(0, '#0a0f1f');
        gradient.addColorStop(0.5, '#141a2e');
        gradient.addColorStop(1, '#0a0f1f');
    } else {
        gradient.addColorStop(0, '#e8f0ff');
        gradient.addColorStop(0.5, '#d4e2fc');
        gradient.addColorStop(1, '#e8f0ff');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Мерцающие звёзды/частицы
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    // Добавляем несколько крупных "звезд" с сиянием
    for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc((i * 131) % canvas.width, (i * 253) % canvas.height, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 200, ${0.3 + Math.sin(Date.now() * 0.001 + i) * 0.2})`;
        ctx.fill();
    }
    
    // Северное сияние / неоновые блики
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 8; i++) {
        const x = (Date.now() * 0.05 + i * 100) % (canvas.width + 400) - 200;
        const y = canvas.height * 0.3 + Math.sin(Date.now() * 0.002 + i) * 50;
        const gradientBlur = ctx.createRadialGradient(x, y, 20, x, y, 150);
        gradientBlur.addColorStop(0, `hsla(${hue + i * 20}, 80%, 60%, 0.15)`);
        gradientBlur.addColorStop(1, `hsla(${hue + i * 20}, 80%, 60%, 0)`);
        ctx.fillStyle = gradientBlur;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.globalCompositeOperation = 'source-over';
    
    hue = (hue + 0.3) % 360;
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();