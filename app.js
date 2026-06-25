/* ═══════════════════════════════════════════════════════════
   MyPaulbot.com — Hub Page JS
   Floating dots · Scroll reveal · Smooth nav
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Floating dots background ───────────────────────────
  function createFloatingDots() {
    const container = document.getElementById('float-dots');
    if (!container) return;
    const COUNT = 40;
    for (let i = 0; i < COUNT; i++) {
      const dot = document.createElement('div');
      dot.className = 'float-dot';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.animationDuration = (12 + Math.random() * 20) + 's';
      dot.style.animationDelay = -(Math.random() * 30) + 's';
      dot.style.width = dot.style.height = (1.5 + Math.random() * 3) + 'px';
      dot.style.opacity = (0.08 + Math.random() * 0.15);
      container.appendChild(dot);
    }
  }

  // ── Scroll reveal (IntersectionObserver) ───────────────
  function initScrollReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach((el, i) => {
      el.dataset.revealDelay = i * 80;
      observer.observe(el);
    });
  }

  // ── Smooth scroll for nav links ────────────────────────
  function initSmoothNav() {
    document.querySelectorAll('.hub-nav-link[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ── Nav shrink on scroll ───────────────────────────────
  function initNavScroll() {
    const nav = document.getElementById('hub-nav');
    if (!nav) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 60) {
            nav.style.padding = '10px 24px';
          } else {
            nav.style.padding = '14px 24px';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Init ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    createFloatingDots();
    initScrollReveal();
    initSmoothNav();
    initNavScroll();
  });
})();
