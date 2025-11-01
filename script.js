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
