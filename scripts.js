const navToggle = document.querySelector('[aria-controls="primary-nav-list"]');
const navList = document.getElementById('primary-nav-list');
const overlay = document.querySelector('[data-overlay]');
const overlayPoster = overlay?.querySelector('.overlay__poster');
const closeOverlayButton = overlay?.querySelector('[data-action="close-overlay"]');
const yearTarget = document.querySelector('[data-year]');

if (navList && !navList.dataset.open) {
  navList.dataset.open = 'false';
}

const overlayContent = {
  showreel: {
    eyebrow: 'Showreel',
    title: 'Videoviks 2024 Reel',
    description:
      'This is a placeholder for the Videoviks showreel. Embed your latest reel or behind-the-scenes edit to share the energy of the studio.'
  },
  amelia: {
    eyebrow: 'Director Portfolio',
    title: 'Amelia Rhys',
    description:
      'Energetic commercials that put youth culture, street style and expressive choreography front and centre. Request reels, treatments and creds via hello@videoviks.studio.'
  },
  noah: {
    eyebrow: 'Director Portfolio',
    title: 'Noah Wells',
    description:
      'Documentary-driven narratives blending real stories with cinematic craft. Ask for case studies in the charity, sport and automotive spaces.'
  },
  sora: {
    eyebrow: 'Director Portfolio',
    title: 'Sora Patel',
    description:
      'Speculative futures and hybrid practical/CGI technique reels. Perfect for brands looking to experiment with generative art and immersive experiences.'
  }
};

function toggleNav() {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isExpanded));
  navList.dataset.open = String(!isExpanded);
}

function setOverlayContent(key) {
  if (!overlayPoster || !overlayContent[key]) return;
  const { eyebrow, title, description } = overlayContent[key];
  overlayPoster.innerHTML = `
    <p class="eyebrow">${eyebrow}</p>
    <h3>${title}</h3>
    <p>${description}</p>
  `;
}

function openOverlay(key) {
  if (!overlay) return;
  setOverlayContent(key);
  overlay.hidden = false;
  overlay.dataset.open = 'true';
  requestAnimationFrame(() => closeOverlayButton?.focus());
}

function closeOverlay() {
  if (!overlay) return;
  overlay.hidden = true;
  overlay.dataset.open = 'false';
  closeOverlayButton?.blur();
}

navToggle?.addEventListener('click', toggleNav);

navList?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 720px)').matches) {
      navToggle?.setAttribute('aria-expanded', 'false');
      if (navList) {
        navList.dataset.open = 'false';
      }
    }
  });
});

closeOverlayButton?.addEventListener('click', closeOverlay);

document.querySelectorAll('[data-action="showreel"]').forEach((button) => {
  button.addEventListener('click', () => openOverlay('showreel'));
});

document.querySelectorAll('[data-director]').forEach((button) => {
  button.addEventListener('click', () => openOverlay(button.dataset.director));
});

overlay?.addEventListener('click', (event) => {
  if (event.target === overlay) {
    closeOverlay();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && overlay?.dataset.open === 'true') {
    closeOverlay();
  }
});

if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty('--shadow-soft', 'none');
  const marquee = document.querySelector('.marquee__track');
  marquee?.style.removeProperty('animation');
}
