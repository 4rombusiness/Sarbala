/* ============================================================
   Sarbala Studio — Main JS
   ============================================================ */

// ── Language ───────────────────────────────────────────────
const html = document.documentElement;
const langToggle = document.getElementById('langToggle');

function setLang(lang) {
  html.setAttribute('data-lang', lang);
  html.setAttribute('lang', lang);
  try { localStorage.setItem('sarbala-lang', lang); } catch(e) {}
}

function toggleLang() {
  const current = html.getAttribute('data-lang') || 'fa';
  setLang(current === 'fa' ? 'en' : 'fa');
}

(function initLang() {
  let saved = 'fa';
  try { saved = localStorage.getItem('sarbala-lang') || 'fa'; } catch(e) {}
  setLang(saved);
})();

if (langToggle) langToggle.addEventListener('click', toggleLang);

// ── Navigation ──────────────────────────────────────────────
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mmLinks = document.querySelectorAll('.mm-link');

function handleScroll() {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);

  // Scroll-to-top button
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) scrollTop.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

function openMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', function() {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});

mmLinks.forEach(function(link) {
  link.addEventListener('click', closeMenu);
});

// ── Scroll Reveal ───────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-hero');

const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(function(el) { revealObserver.observe(el); });

// Hero elements use the same in-view class but via reveal-hero class
// Trigger hero immediately after preloader
function triggerHero() {
  document.querySelectorAll('.reveal-hero').forEach(function(el, i) {
    setTimeout(function() { el.classList.add('in-view'); }, 200 + i * 120);
  });
}

// ── Preloader ───────────────────────────────────────────────
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(function() {
    if (preloader) preloader.classList.add('done');
    triggerHero();
  }, 400);
});

// Fallback if load fires very late
setTimeout(function() {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('done')) {
    preloader.classList.add('done');
    triggerHero();
  }
}, 2500);

// ── Scroll Top ──────────────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Game card keyboard support ──────────────────────────────
document.querySelectorAll('.game-card').forEach(function(card) {
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// ── Stat counter animation ──────────────────────────────────
function animateCounter(el, target, suffix) {
  let current = 0;
  const increment = target / 45;
  const timer = setInterval(function() {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 28);
}

const counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.dataset.count;
    if (raw) {
      animateCounter(el, parseInt(raw, 10), 'K');
    }
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(function(el) {
  counterObserver.observe(el);
});
