// ========== ТЕМА ==========
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeToggle.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
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

// ========== ТАРИФЫ (МЕСЯЦ/ГОД) ==========
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
document.querySelectorAll('.modal-open, .price-btn').forEach(btn => {
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

// ========== CANVAS ФОН (СЕВЕРНОЕ СИЯНИЕ) ==========
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Звёзды
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        speed: 0.005 + Math.random() * 0.01,
        pulse: Math.random() * Math.PI * 2
    });
}

function drawBackground() {
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (document.body.classList.contains('light')) {
        grad.addColorStop(0, '#e8f0ff');
        grad.addColorStop(1, '#d4e2fc');
    } else {
        grad.addColorStop(0, '#020617');
        grad.addColorStop(0.4, '#0a0f1f');
        grad.addColorStop(0.7, '#0f172a');
        grad.addColorStop(1, '#020617');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Мерцающие звёзды
    stars.forEach(s => {
        const twinkle = 0.5 + Math.sin(Date.now() * 0.002 + s.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 200, ${s.alpha * twinkle})`;
        ctx.fill();
    });
    
    // Северное сияние (многослойное, зелёно-голубое)
    const time = Date.now() * 0.001;
    for (let layer = 0; layer < 4; layer++) {
        for (let i = 0; i < 5; i++) {
            const x = (time * 0.08 + layer * 150 + i * 180) % (canvas.width + 600) - 300;
            const y = canvas.height * (0.3 + layer * 0.08) + Math.sin(time * 0.5 + i + layer) * 50;
            const radius = 180 + layer * 40;
            const gradient = ctx.createRadialGradient(x, y, 20, x, y, radius);
            if (document.body.classList.contains('light')) {
                gradient.addColorStop(0, `rgba(37, 99, 235, 0.06)`);
                gradient.addColorStop(1, `rgba(37, 99, 235, 0)`);
            } else {
                const opacity = 0.08 - layer * 0.01;
                gradient.addColorStop(0, `rgba(34, 211, 238, ${opacity})`);
                gradient.addColorStop(0.4, `rgba(59, 130, 246, ${opacity * 0.7})`);
                gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}

function animate() {
    drawBackground();
    requestAnimationFrame(animate);
}
animate();

const themeObserver = new MutationObserver(() => drawBackground());
themeObserver.observe(document.body, { attributes: true });