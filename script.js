document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll(".m-item img"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lb-image");
  const closeBtn = document.querySelector(".lb-close");
  const themeToggle = document.getElementById("themeToggle");
  const typewriter = document.getElementById("typewriter");

  const openLightbox = (img) => {
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    document.body.style.overflow = "";
  };

  images.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".fade").forEach((el) => observer.observe(el));

  const phrases = ["Light. Shadow. Story.", "Cinematic Moments.", "Visual Poetry."];
  let phraseIndex = 0;
  let charIndex = 0;
  let isTyping = true;

  const typeTick = () => {
    const phrase = phrases[phraseIndex];

    if (isTyping) {
      charIndex += 1;
      if (charIndex >= phrase.length) {
        typewriter.textContent = phrase;
        isTyping = false;
        window.setTimeout(typeTick, 1000);
        return;
      }
    } else {
      charIndex -= 1;
      if (charIndex <= 0) {
        isTyping = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        window.setTimeout(typeTick, 250);
        return;
      }
    }

    typewriter.textContent = phrase.slice(0, charIndex);
    window.setTimeout(typeTick, isTyping ? 80 : 40);
  };

  typeTick();

  const applyTheme = (theme) => {
    const isLight = theme === "light";
    document.body.classList.toggle("light", isLight);
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  };

  applyTheme(localStorage.getItem("theme") || "dark");

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
});
