/* =============================================
   HEADER SCROLL EFFECT
   ============================================= */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

/* =============================================
   MOBILE MENU
   ============================================= */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  nav.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when a link is clicked
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* =============================================
   ACTIVE NAV LINK (scroll spy)
   ============================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => observer.observe(s));

/* =============================================
   FAQ ACCORDION
   ============================================= */
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const answer = item.querySelector('.faq__answer');
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';

    // Close all others
    document.querySelectorAll('.faq__item').forEach(other => {
      if (other !== item) {
        other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq__answer').classList.remove('open');
      }
    });

    // Toggle current
    btn.setAttribute('aria-expanded', String(!isExpanded));
    answer.classList.toggle('open', !isExpanded);
  });
});

/* =============================================
   CONTACT FORM VALIDATION
   ============================================= */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

function showError(fieldId, message) {
  const errorEl = document.getElementById(`${fieldId}Error`);
  const input = document.getElementById(fieldId);
  if (errorEl) errorEl.textContent = message;
  if (input) input.classList.add('error');
}

function clearError(fieldId) {
  const errorEl = document.getElementById(`${fieldId}Error`);
  const input = document.getElementById(fieldId);
  if (errorEl) errorEl.textContent = '';
  if (input) input.classList.remove('error');
}

// Live validation
['voornaam', 'achternaam', 'email', 'adres'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => {
      if (el.value.trim()) clearError(id);
    });
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let valid = true;

  // Voornaam
  const voornaam = document.getElementById('voornaam').value.trim();
  if (!voornaam) {
    showError('voornaam', 'Vul uw voornaam in.');
    valid = false;
  } else {
    clearError('voornaam');
  }

  // Achternaam
  const achternaam = document.getElementById('achternaam').value.trim();
  if (!achternaam) {
    showError('achternaam', 'Vul uw achternaam in.');
    valid = false;
  } else {
    clearError('achternaam');
  }

  // Email
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('email', 'Vul uw e-mailadres in.');
    valid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'Vul een geldig e-mailadres in.');
    valid = false;
  } else {
    clearError('email');
  }

  // Adres
  const adres = document.getElementById('adres').value.trim();
  if (!adres) {
    showError('adres', 'Vul het adres van het pand in.');
    valid = false;
  } else {
    clearError('adres');
  }

  // Akkoord
  const akkoord = document.getElementById('akkoord').checked;
  if (!akkoord) {
    document.getElementById('akkoordError').textContent = 'U dient akkoord te gaan met de privacyverklaring.';
    valid = false;
  } else {
    document.getElementById('akkoordError').textContent = '';
  }

  if (!valid) return;

  // Simulate form submission
  submitBtn.disabled = true;
  submitBtn.textContent = 'Verzenden...';

  await new Promise(resolve => setTimeout(resolve, 1200));

  form.style.display = 'none';
  formSuccess.hidden = false;
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

/* =============================================
   SMOOTH SCROLL OFFSET (for sticky header)
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* =============================================
   ANIMATE ON SCROLL
   ============================================= */
const animateEls = document.querySelectorAll(
  '.service-card, .step, .review-card, .faq__item, .trustbar__item'
);

const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(i % 4) * 60}ms`;
        entry.target.classList.add('animated');
        animObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
);

animateEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  animObserver.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
<style>
  .animated {
    opacity: 1 !important;
    transform: none !important;
  }
</style>
`);
