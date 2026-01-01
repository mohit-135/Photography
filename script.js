
// Basic, dependency-free: lightbox + fade-in on scroll for masonry layout

document.addEventListener('DOMContentLoaded', () => {
  const masonry = document.getElementById('masonry');
  const items = Array.from(document.querySelectorAll('.m-item img'));
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-image');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.querySelector('.lb-close');

  // LIGHTBOX: open when clicking any image
  document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".m-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lb-image");
  const closeBtn = document.querySelector(".lb-close");

  // When image is clicked
  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
      document.body.style.overflow = "hidden"; // lock scroll
    });
  });

  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", closeLightbox);

  // Click outside image
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Press Esc to close
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });
});


  // Close functions
  function closeLightbox(){
    lb.classList.remove('active');
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);

  // click outside image closes
  lb.addEventListener('click', (e) => {
    // if click target is the lightbox background (not image or caption)
    if (e.target === lb || e.target === lbCaption || e.target === lbImg.parentElement){
      // do nothing — allow click on image area; only background closes.
    }
    if (e.target === lb) closeLightbox();
  });

  // Escape key closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('active')) closeLightbox();
  });

  // FADE-IN ON SCROLL using IntersectionObserver
  const observerOpts = { root: null, rootMargin: '0px', threshold: 0.12 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, observerOpts);

  // observe figures and other fade elements
  document.querySelectorAll('.fade').forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".m-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lb-image");
  const closeBtn = document.getElementById("closeBtn");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
});


const texts = [
  "Light.Shadow.Story.",
  "Cinematic Moments.",
  "Visual Poetry.",
];

let textIndex = 0;
let charIndex = 0;
const speed = 80;
const delay = 1000;
const el = document.getElementById("typewriter");

function type() {
  if (charIndex < texts[textIndex].length) {
    el.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, speed);
  } else {
    setTimeout(erase, delay);
  }
}

function erase() {
  if (charIndex > 0) {
    el.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, speed / 2);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, speed);
  }
}

type();


const toggleBtn = document.getElementById("themeToggle");

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  toggleBtn.textContent = "🌙";
} else {
  toggleBtn.textContent = "☀️";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  } else {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  }
});

