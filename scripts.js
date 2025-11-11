const navToggle = document.querySelector('.masthead__toggle');
const nav = document.getElementById('primary-nav');
const overlay = document.querySelector('[data-overlay]');
const overlayClose = overlay?.querySelector('[data-action="close-overlay"]');
const overlayEyebrow = overlay?.querySelector('[data-overlay-eyebrow]');
const overlayTitle = overlay?.querySelector('[data-overlay-title]');
const overlayDescription = overlay?.querySelector('[data-overlay-description]');
const overlayEmbed = overlay?.querySelector('[data-overlay-embed]');
const overlayIframe = overlayEmbed?.querySelector('iframe');
const yearTarget = document.querySelector('[data-year]');

const overlayContent = {
  showreel: {
    eyebrow: 'Videoviks Showreel',
    title: "2024 Director's Cut",
    description: 'Experience a charged collection of Videoviks commercial, fashion and experiential work.',
    embed: 'https://player.vimeo.com/video/76979871'
  },
  amelia: {
    eyebrow: 'Director portfolio',
    title: 'Amelia Rhys',
    description:
      'Fashion-first visual stories, kinetic choreography and high-gloss lighting for sport, luxury and youth culture brands.',
    embed: null
  },
  noah: {
    eyebrow: 'Director portfolio',
    title: 'Noah Wells',
    description:
      'Documentary-rooted filmmaking with cinematic polish, partnering with NGOs, automotive and lifestyle pioneers worldwide.',
    embed: null
  },
  sora: {
    eyebrow: 'Director portfolio',
    title: 'Sora Patel',
    description:
      'Experimental technologist crafting speculative futures with practical builds, realtime engines and bold casting.',
    embed: null
  }
};

function setBodyScrollLocked(locked) {
  document.body.style.overflow = locked ? 'hidden' : '';
}

function toggleNav() {
  if (!navToggle || !nav) return;
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  const next = !isOpen;
  navToggle.setAttribute('aria-expanded', String(next));
  if (next) {
    nav.setAttribute('data-open', 'true');
    setBodyScrollLocked(true);
  } else {
    nav.removeAttribute('data-open');
    setBodyScrollLocked(false);
  }
}

function closeNav() {
  if (!navToggle || !nav) return;
  navToggle.setAttribute('aria-expanded', 'false');
  nav.removeAttribute('data-open');
  setBodyScrollLocked(false);
}

function openOverlay(key = 'showreel') {
  if (!overlay) return;
  const content = overlayContent[key] ?? overlayContent.showreel;
  overlayEyebrow && (overlayEyebrow.textContent = content.eyebrow);
  overlayTitle && (overlayTitle.textContent = content.title);
  overlayDescription && (overlayDescription.textContent = content.description);

  if (overlayEmbed) {
    if (content.embed) {
      overlayEmbed.hidden = false;
      if (overlayIframe) {
        overlayIframe.src = content.embed;
      }
    } else {
      overlayEmbed.hidden = true;
      if (overlayIframe) {
        overlayIframe.src = '';
      }
    }
  }

  overlay.hidden = false;
  overlay.dataset.open = 'true';
  setBodyScrollLocked(true);
  requestAnimationFrame(() => overlayClose?.focus());
}

function closeOverlay() {
  if (!overlay) return;
  overlay.hidden = true;
  overlay.dataset.open = 'false';
  if (overlayIframe) {
    overlayIframe.src = overlayContent.showreel.embed;
  }
  setBodyScrollLocked(false);
  overlayClose?.blur();
}

navToggle?.addEventListener('click', toggleNav);

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 960px)').matches) {
      closeNav();
    }
  });
});

overlayClose?.addEventListener('click', closeOverlay);

document.querySelectorAll('[data-action="open-overlay"]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const key = trigger.getAttribute('data-overlay-key') || trigger.getAttribute('data-director');
    if (window.matchMedia('(max-width: 960px)').matches) {
      closeNav();
    }
    openOverlay(key || 'showreel');
  });
});

document.querySelectorAll('[data-director]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.director;
    openOverlay(key);
  });
});

overlay?.addEventListener('click', (event) => {
  if (event.target === overlay) {
    closeOverlay();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (navToggle?.getAttribute('aria-expanded') === 'true') {
      closeNav();
    }
    if (overlay?.dataset.open === 'true') {
      closeOverlay();
    }
  }
});

if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches && overlayEmbed) {
  overlayEmbed.classList.add('is-paused');
  if (overlayIframe) {
    overlayIframe.removeAttribute('autoplay');
  }
}
