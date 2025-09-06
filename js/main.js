
// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// Persist theme
(() => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light');
})();

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Filtering
const filterButtons = document.querySelectorAll('[data-filter]');
const items = document.querySelectorAll('.gallery-item');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    items.forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.grid-gallery img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxImg.src = img.src;
    const cap = img.closest('figure')?.querySelector('h3')?.textContent || '';
    lightboxCaption.textContent = cap;
  });
});
lightboxClose?.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
});
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) lightboxClose.click(); });

// Simple form validation (front-end only)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const missing = [];
  ['name','email','message','terms'].forEach(k => {
    if (k === 'terms') { if (!data.get('terms')) missing.push('terms'); }
    else if (!String(data.get(k)).trim()) missing.push(k);
  });
  if (missing.length){
    status.textContent = 'Please complete all fields and agree to the terms.';
    status.style.color = '#ffb3b3';
    return;
  }
  status.textContent = 'Thanks! Your message has been queued (demo only).';
  status.style.color = '#b8ffcf';
  form.reset();
});
