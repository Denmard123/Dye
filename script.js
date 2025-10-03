document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Apply Initial Theme
  // ===============================
  (function applyInitialTheme() {
    const isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  })();

  // ===============================
  // Dark Mode Toggle
  // ===============================
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const html = document.documentElement;

  function applyTheme() {
    const isDark = localStorage.getItem("theme") === "dark";
    html.classList.toggle("dark", isDark);
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon", "fa-sun");
      themeIcon.classList.add(isDark ? "fa-sun" : "fa-moon");
    }
  }

  applyTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = html.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      if (themeIcon) {
        themeIcon.classList.remove("fa-moon", "fa-sun");
        themeIcon.classList.add(isDark ? "fa-sun" : "fa-moon");
      }
    });
  }

  // ===============================
  // Typing Effect
  // ===============================
  const textElement = document.getElementById("typedText");
  if (textElement) {
    const words = ["Web Developer...", "Freelancer...", "Content Creator..."];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
      let speed = isDeleting ? 50 : 100;
      textElement.textContent = words[wordIndex].substring(0, charIndex);

      if (!isDeleting && charIndex < words[wordIndex].length) charIndex++;
      else if (isDeleting && charIndex > 0) charIndex--;
      else if (!isDeleting && charIndex === words[wordIndex].length) { isDeleting = true; speed = 1500; }
      else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }

      setTimeout(typeEffect, speed);
    }
    typeEffect();
  }

  // ===============================
  // Hero 3D Avatar Effect
  // ===============================
  const avatar = document.getElementById("hero-avatar");
  if (avatar) {
    let x = 0, y = 0, targetX = 0, targetY = 0;
    avatar.addEventListener("mousemove", e => {
      const rect = avatar.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      targetX = offsetX / 15;
      targetY = -offsetY / 15;
    });
    avatar.addEventListener("mouseleave", () => { targetX = 0; targetY = 0; });
    function animateAvatar() { 
      x += (targetX - x) * 0.08; 
      y += (targetY - y) * 0.08;
      avatar.style.transform = `rotateX(${y}deg) rotateY(${x}deg) scale(1.05)`; 
      requestAnimationFrame(animateAvatar);
    }
    animateAvatar();
  }

  // ===============================
  // Hero Background Parallax
  // ===============================
  const hero = document.getElementById("hero-section");
  if (hero) {
    hero.addEventListener("mousemove", e => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 8;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 8;
      hero.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
    });
  }

  // ===============================
  // Sidebar 3D Carousel Interaktif
  // ===============================
  const carousel = document.getElementById("sidebar-carousel");
  if (!carousel) return;

  const items = carousel.querySelectorAll(".carousel-item");
  const total = items.length;
  let index = 0;
  let autoSlide;

  // Update carousel: hanya 1 item tampil
  function updateCarousel() {
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.remove("opacity-0", "pointer-events-none");
        item.classList.add("opacity-100");
      } else {
        item.classList.add("opacity-0", "pointer-events-none");
        item.classList.remove("opacity-100");
      }
    });
  }

  // Tombol prev/next
  document.getElementById("prev-btn").addEventListener("click", () => {
    index = (index - 1 + total) % total;
    updateCarousel();
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    index = (index + 1) % total;
    updateCarousel();
  });

  // Auto slide
  function startAutoSlide() {
    autoSlide = setInterval(() => {
      index = (index + 1) % total;
      updateCarousel();
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // Pause on hover
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  // Init
  updateCarousel();
  startAutoSlide();
});

// Toggle Dropdown
document.querySelectorAll(".dropdown-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const menu = btn.nextElementSibling;
    const svgIcon = btn.querySelector("svg");

    // Toggle menu
    if(menu.classList.contains("max-h-0")){
      menu.classList.remove("max-h-0", "opacity-0", "pointer-events-none");
      menu.classList.add("max-h-40", "opacity-100", "pointer-events-auto"); // adjust max-h as needed
      svgIcon.classList.add("rotate-180");
    } else {
      menu.classList.add("max-h-0", "opacity-0", "pointer-events-none");
      menu.classList.remove("max-h-40", "opacity-100", "pointer-events-auto");
      svgIcon.classList.remove("rotate-180");
    }
  });
});

