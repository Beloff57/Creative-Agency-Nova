
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");

  menuToggle.textContent = isOpen ? "Close" : "Menu";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after clicking a link

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.textContent = "Menu";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Scroll reveal

const revealElements = document.querySelectorAll(
  ".services, .work, .about, .contact, .service-item, .work-card"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

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
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});