/* ========================================
   MOBILE MENU
======================================== */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

const closeMenu = () => {
  nav.classList.remove("is-open");

  menuToggle.textContent = "Menu";
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
};

const openMenu = () => {
  nav.classList.add("is-open");

  menuToggle.textContent = "Close";
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close menu");
};

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.contains("is-open");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu =
    nav.contains(event.target) ||
    menuToggle.contains(event.target);

  if (!clickedInsideMenu) {
    closeMenu();
  }
});


/* ========================================
   SCROLL REVEAL
======================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* ========================================
   COUNTER ANIMATION
======================================== */

const counters = document.querySelectorAll("[data-counter]");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target) || 0;

  if (prefersReducedMotion) {
    counter.textContent = String(target).padStart(2, "0");
    return;
  }

  const duration = 2200;
  const startTime = performance.now();

  const easeOutCubic = (progress) => {
    return 1 - Math.pow(1 - progress, 3);
  };

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easedProgress = easeOutCubic(progress);
    const currentValue = Math.floor(easedProgress * target);

    counter.textContent = String(currentValue).padStart(2, "0");

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = String(target).padStart(2, "0");
    }
  };

  requestAnimationFrame(updateCounter);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;

      if (counter.dataset.animated === "true") return;

      counter.dataset.animated = "true";

      animateCounter(counter);

      observer.unobserve(counter);
    });
  },
  {
    threshold: 0.5
  }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});


/* ========================================
   HERO DECORATION PARALLAX
======================================== */

const hero = document.querySelector(".hero");
const heroDecoration = document.querySelector(".hero-decoration");

const canUseParallax =
  !prefersReducedMotion &&
  window.matchMedia("(pointer: fine)").matches;

if (canUseParallax && hero && heroDecoration) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroDecoration.style.transform = `
      translate(${x * 16}px, calc(-50% + ${y * 16}px))
    `;
  });

  hero.addEventListener("mouseleave", () => {
    heroDecoration.style.transform = "translateY(-50%)";
  });
}


/* ========================================
   CLOSE MENU ON RESIZE
======================================== */

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});