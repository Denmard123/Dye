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
      else if (!isDeleting && charIndex === words[wordIndex].length) {
        isDeleting = true;
        speed = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

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

    avatar.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
    });

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
  // Sidebar Carousel
  // ===============================
  const sidebarCarousel = document.getElementById("sidebar-carousel");
  if (sidebarCarousel) {
    const items = sidebarCarousel.querySelectorAll(".carousel-item");
    const total = items.length;
    let index = 0;
    let autoSlide;

    function updateSidebarCarousel() {
      items.forEach((item, i) => {
        item.classList.toggle("opacity-100", i === index);
        item.classList.toggle("opacity-0", i !== index);
        item.classList.toggle("pointer-events-none", i !== index);
      });
    }

    const prev = document.getElementById("prev-btn");
    const next = document.getElementById("next-btn");

    prev?.addEventListener("click", () => {
      index = (index - 1 + total) % total;
      updateSidebarCarousel();
    });

    next?.addEventListener("click", () => {
      index = (index + 1) % total;
      updateSidebarCarousel();
    });

    function startAutoSlide() {
      autoSlide = setInterval(() => {
        index = (index + 1) % total;
        updateSidebarCarousel();
      }, 3000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlide);
    }

    sidebarCarousel.addEventListener("mouseenter", stopAutoSlide);
    sidebarCarousel.addEventListener("mouseleave", startAutoSlide);

    updateSidebarCarousel();
    startAutoSlide();
  }

  // ===============================
  // Dropdown Label Konten
  // ===============================
  const labelToggle = document.getElementById("label-toggle");
  const labelContainer = document.getElementById("label-container");

  if (labelToggle && labelContainer) {
    labelToggle.addEventListener("click", () => {
      const svg = labelToggle.querySelector("svg");
      labelContainer.classList.toggle("max-h-0");
      labelContainer.classList.toggle("opacity-0");
      svg?.classList.toggle("rotate-180");
    });
  }

  // ===============================
  // Sub-dropdown (Web App, Blog)
  // ===============================
  document.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const menu = btn.nextElementSibling;
      const svg = btn.querySelector("svg");
      const isOpen = !menu.classList.contains("max-h-0");

      // Tutup dropdown lain
      document.querySelectorAll(".dropdown-btn").forEach(other => {
        const otherMenu = other.nextElementSibling;
        const otherSvg = other.querySelector("svg");
        if (otherMenu !== menu) {
          otherMenu.classList.add("max-h-0", "opacity-0", "pointer-events-none");
          otherSvg?.classList.remove("rotate-180");
        }
      });

      // Toggle dropdown aktif
      menu.classList.toggle("max-h-0", isOpen);
      menu.classList.toggle("opacity-0", isOpen);
      menu.classList.toggle("pointer-events-none", isOpen);
      svg?.classList.toggle("rotate-180", !isOpen);
    });
  });

// ===============================
// Project Carousel
// ===============================
const track = document.getElementById("carousel-track");
if (track) {
  const slides = track.children;
  const totalSlides = slides.length;
  const nextBtn = document.getElementById("next-slide");
  const prevBtn = document.getElementById("prev-slide");
  const dots = document.querySelectorAll("#project-carousel [data-slide]");
  let currentIndex = 0;
  let autoSlide;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    track.style.transition = "transform 0.7s ease-in-out";

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-white/70", i === currentIndex);
      dot.classList.toggle("bg-white/30", i !== currentIndex);
    });

    // Scale & opacity untuk efek aktif/tidak aktif
    Array.from(slides).forEach((slide, i) => {
      const img = slide.querySelector("img");
      if (!img) return;
      img.style.transform = i === currentIndex ? "scale(1)" : "scale(0.95)";
      img.style.opacity = i === currentIndex ? "1" : "0.7";
    });
  }

  function goNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  nextBtn?.addEventListener("click", () => { goNext(); resetAutoSlide(); });
  prevBtn?.addEventListener("click", () => { goPrev(); resetAutoSlide(); });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentIndex = Number(dot.dataset.slide);
      updateCarousel();
      resetAutoSlide();
    });
  });

  function startAutoSlide() { autoSlide = setInterval(goNext, 4000); }
  function resetAutoSlide() { clearInterval(autoSlide); startAutoSlide(); }

  // Initialize
  updateCarousel();
  startAutoSlide();

  // Responsif: update posisi saat window di resize
  window.addEventListener("resize", updateCarousel);
}

  // ===============================
  // Tombol Share Project
  // ===============================
  document.querySelectorAll("button[id^='share-']").forEach(btn => {
    btn.addEventListener("click", () => {
      const projectId = btn.id.replace("share-", "");
      const url = window.location.origin + window.location.pathname + "#" + projectId;
      const title = `Lihat project gue!`;
      const text = `Cek project "${projectId}" buatan saya 👇`;
  
      if (navigator.share) {
        // Web Share API
        navigator.share({
          title: title,
          text: text,
          url: url,
        }).catch(err => console.warn("Share dibatalkan:", err));
      } else {
        // Fallback: tampilkan menu share sosial media
        const shareMenu = `
          Pilih cara share:
          1. Salin link ke clipboard
          2. WhatsApp
          3. Twitter
          4. Facebook
          5. Telegram
        `;
        const choice = prompt(shareMenu, "1");
        if (!choice) return;
  
        switch (choice.trim()) {
          case "1": // Copy to clipboard
            navigator.clipboard.writeText(url)
              .then(() => alert("Link project disalin ke clipboard ✅"))
              .catch(() => alert("Gagal menyalin link ❌"));
            break;
          case "2": // WhatsApp
            window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
            break;
          case "3": // Twitter
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
            break;
          case "4": // Facebook
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
            break;
          case "5": // Telegram
            window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
            break;
          default:
            alert("Pilihan tidak valid!");
        }
      }
    });
  });
});

