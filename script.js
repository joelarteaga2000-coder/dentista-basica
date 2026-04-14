/* ============================================================
SILK DENTAL STUDIO — script.js
Custom Cursor · Navbar · Intersection Observer · Marquee
============================================================ */

(function () {
'use strict';

/* ── 1. CUSTOM CURSOR ───────────────────────────────────────── */
const cursor = document.getElementById('cursor');
let cursorX = 0, cursorY = 0;
let targetX = 0, targetY = 0;
let rafCursor;

if (cursor) {
  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function updateCursor() {
    cursorX += (targetX - cursorX) * 0.15;
    cursorY += (targetY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    rafCursor = requestAnimationFrame(updateCursor);
  }

  updateCursor();

  document.querySelectorAll('a, button, .trat-img-wrap, .doctor-img-frame, .img-plate-main').forEach(el => {
    const isImg = el.classList.contains('trat-img-wrap') ||
                  el.classList.contains('doctor-img-frame') ||
                  el.classList.contains('img-plate-main');

    el.addEventListener('mouseenter', () => {
      cursor.classList.add(isImg ? 'is-img' : 'is-link');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-img', 'is-link');
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

/* ── 2. NAVBAR SCROLL ───────────────────────────────────────── */
const navbar = document.getElementById('navbar');
let lastScroll = 0;
let navTicking = false;

window.addEventListener('scroll', () => {
  if (!navTicking) {
    requestAnimationFrame(() => {
      const current = window.scrollY;

      if (navbar) {
        if (current > 80) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      lastScroll = current;
      navTicking = false;
    });

    navTicking = true;
  }
}, { passive: true });

/* ── 3. RESERVE BAR ─────────────────────────────────────────── */
const reserveBar = document.getElementById('reserveBar');

if (reserveBar) {
  const showObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        if (window.scrollY > 200) {
          reserveBar.classList.add('visible');
        }
      }
    });
  }, { threshold: 0.1 });

  const hero = document.getElementById('hero');
  if (hero) showObserver.observe(hero);

  const contactSection = document.getElementById('contacto');

  if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reserveBar.classList.remove('visible');
        } else if (window.scrollY > 400) {
          reserveBar.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });

    contactObserver.observe(contactSection);
  }
}

/* ── 4. INTERSECTION OBSERVER — REVEAL ──────────────────────── */
const revealEls = document.querySelectorAll('.reveal-fade, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.getAttribute('data-delay') || 0);

      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -48px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

/* ── 5. HERO STAGGER (immediate on load) ────────────────────── */
const heroEls = document.querySelectorAll('.hero .reveal-fade, .hero .reveal-scale');

heroEls.forEach(el => {
  const delay = parseInt(el.getAttribute('data-delay') || 0);

  setTimeout(() => {
    el.classList.add('revealed');
  }, delay + 200);
});

/* ── 6. MARQUEE ─────────────────────────────────────────────── */
const marqueeInner = document.getElementById('marqueeInner');

if (marqueeInner) {
  marqueeInner.addEventListener('mouseenter', () => {
    marqueeInner.style.animationPlayState = 'paused';
  });

  marqueeInner.addEventListener('mouseleave', () => {
    marqueeInner.style.animationPlayState = 'running';
  });
}

/* ── 7. SMOOTH ANCHOR SCROLL ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;

    const target = document.querySelector(id);

    if (target) {
      e.preventDefault();

      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  });
});

/* ── 8. SIGNATURE ANIMATION on scroll ───────────────────────── */
const sigPaths = document.querySelectorAll('.sig-path');

if (sigPaths.length) {
  const sigObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sigPaths.forEach(path => {
          path.style.animation = 'none';
          path.getBoundingClientRect();
          path.style.animation = '';
        });

        sigObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const sigSection = document.querySelector('.dr-signature');
  if (sigSection) sigObserver.observe(sigSection);
}

/* ── 9. CONTACT FORM ────────────────────────────────────────── */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('formSubmit');

if (form && submitBtn) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fName')?.value.trim() || '';
    const phone = document.getElementById('fPhone')?.value.trim() || '';
    const service = document.getElementById('fService')?.value || 'consulta';
    const msg = document.getElementById('fMsg')?.value.trim() || '';

    const waMsg = encodeURIComponent(
      `Hola, soy ${name || 'un paciente'} y deseo agendar una consulta privada en SILK Dental Studio.\n\n` +
      `📱 Teléfono: ${phone}\n` +
      `🦷 Tratamiento de interés: ${service}\n` +
      (msg ? `💬 Mensaje: ${msg}` : '')
    );

    const submitText = submitBtn.querySelector('.submit-text');
    const originalText = submitText.textContent;

    submitText.textContent = 'Redirigiendo...';
    submitBtn.style.background = '#1B3A6B';

    setTimeout(() => {
      window.open(`https://wa.me/5215500000000?text=${waMsg}`, '_blank');
      submitText.textContent = originalText;
      submitBtn.style.background = '';
    }, 700);
  });
}

/* ── 10. TRATAMIENTO IMAGE — PARALLAX SOFT ──────────────────── */
const tratImages = document.querySelectorAll('.trat-img');

if (window.matchMedia('(min-width: 1024px)').matches && tratImages.length) {
  let parTicking = false;

  window.addEventListener('scroll', () => {
    if (!parTicking) {
      requestAnimationFrame(() => {
        tratImages.forEach(img => {
          const wrap = img.closest('.trat-img-wrap');
          if (!wrap) return;

          const rect = wrap.getBoundingClientRect();
          const vh = window.innerHeight;

          if (rect.top < vh && rect.bottom > 0) {
            const progress = (vh - rect.top) / (vh + rect.height);
            const offset = (progress - 0.5) * 40;
            img.style.transform = `scale(1.08) translateY(${offset}px)`;
          }
        });

        parTicking = false;
      });

      parTicking = true;
    }
  }, { passive: true });
}

/* ── 11. TRAT ITEM REVEAL WITH STAGGER ──────────────────────── */
const tratItems = document.querySelectorAll('.trat-item');

const tratObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      tratObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

tratItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(24px)';
  item.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  tratObserver.observe(item);
});

/* ── 12. FORM LABEL FLOAT FIX FOR SELECT ───────────────────── */
const selects = document.querySelectorAll('.form-select');

selects.forEach(sel => {
  sel.addEventListener('change', () => {
    if (sel.value) {
      const label = sel.parentElement.querySelector('.form-label');

      if (label) {
        label.style.top = '-2px';
        label.style.fontSize = '9px';
        label.style.letterSpacing = '2.5px';
        label.style.color = 'var(--stone-2)';
      }
    }
  });
});

})();