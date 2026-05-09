// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = open ? '0' : '1';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const text = el.innerHTML;
    const num = parseFloat(text.replace(/<[^>]+>/g, ''));
    const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
    if (isNaN(num)) return;
    let start = 0;
    const duration = 1600;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { start = num; clearInterval(timer); }
      el.innerHTML = (Number.isInteger(num) ? Math.floor(start) : Math.round(start * 10) / 10) + suffix;
    }, 16);
  });
}

const statsSection = document.getElementById('stats');
let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    animateCounters();
  }
}, { threshold: 0.3 });
if (statsSection) counterObserver.observe(statsSection);

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const success = document.getElementById('formSuccess');
    btn.disabled = true;
    btn.textContent = 'Envoi en cours...';
    setTimeout(() => {
      btn.style.display = 'none';
      success.classList.add('show');
      this.reset();
    }, 1200);
  });
}
