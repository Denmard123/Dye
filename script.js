/* ============================================================
   SCRIPT.JS — Website by Den Mardiyana Saputra (Dynamic JSON)
   ============================================================ */

/* ============================================================
   🌗 TOGGLE TEMA (DARK / LIGHT MODE) — Sinkron Antar Halaman
   ============================================================ */
   (function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  })();
  
  document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    if (!themeToggle || !themeIcon) return;
  
    const isDark = document.documentElement.classList.contains("dark");
    themeIcon.className = isDark
      ? "fas fa-sun text-yellow-400 text-lg"
      : "fas fa-moon text-gray-700 text-lg";
  
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      const nowDark = document.documentElement.classList.contains("dark");
      themeIcon.className = nowDark
        ? "fas fa-sun text-yellow-400 text-lg"
        : "fas fa-moon text-gray-700 text-lg";
      localStorage.setItem("theme", nowDark ? "dark" : "light");
    });
  });
  
  /* ============================================================
     1.5️⃣ HEADER INTERAKTIF (Scroll & Mobile Toggle)
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("main-header");
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
  
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 20)
          header.classList.add("shadow-lg", "bg-white/90", "dark:bg-gray-900/90");
        else
          header.classList.remove("shadow-lg", "bg-white/90", "dark:bg-gray-900/90");
      });
    }
  
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.classList.toggle("fa-bars");
          icon.classList.toggle("fa-times");
        }
      });
  
      mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          const icon = menuBtn.querySelector("i");
          if (icon) {
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
          }
        });
      });
    }
  });
  
  /* ============================================================
     2️⃣ SIDEBAR CAROUSEL
     ============================================================ */
  let carouselIndex = 0;
  const carouselItems = document.querySelectorAll("#sidebar-carousel .carousel-item");
  function showCarouselItem(index) {
    carouselItems.forEach((item, i) => {
      if (i === index) {
        item.style.opacity = "1";
        item.style.pointerEvents = "auto";
        item.style.transform = "scale(1)";
      } else {
        item.style.opacity = "0";
        item.style.pointerEvents = "none";
        item.style.transform = "scale(0.95)";
      }
    });
  }
  if (carouselItems.length > 0) showCarouselItem(carouselIndex);
  setInterval(() => {
    carouselIndex = (carouselIndex + 1) % carouselItems.length;
    showCarouselItem(carouselIndex);
  }, 5000);
  
  /* ============================================================
     3️⃣ SIDEBAR LABEL DROPDOWN
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    const labelToggle = document.getElementById("label-toggle");
    const labelContainer = document.getElementById("label-container");
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");
  
    if (labelContainer) {
      labelContainer.style.overflow = "visible";
      labelToggle?.addEventListener("click", () => {
        const expanded = labelContainer.classList.toggle("open");
        labelContainer.style.maxHeight = expanded ? labelContainer.scrollHeight + "px" : "0";
        labelContainer.style.opacity = expanded ? "1" : "0";
      });
    }
  
    dropdownBtns.forEach(btn => {
      const menu = btn.nextElementSibling;
      const icon = btn.querySelector("svg");
  
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const open = menu?.classList.contains("open");
  
        document.querySelectorAll(".webapp-menu, .blog-menu, .game-menu").forEach(m => {
          m.classList.remove("open");
          m.style.maxHeight = "0";
          m.style.opacity = "0";
          m.style.pointerEvents = "none";
        });
        document.querySelectorAll(".dropdown-btn svg").forEach(svg => {
          if (svg) svg.style.transform = "rotate(0deg)";
        });
  
        if (!open && menu) {
          menu.classList.add("open");
          menu.style.maxHeight = menu.scrollHeight + "px";
          menu.style.opacity = "1";
          menu.style.pointerEvents = "auto";
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      });
    });
  });
  
  /* ============================================================
     4️⃣ HERO SECTION — Animasi Teks & Avatar
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    const typedText = document.getElementById("typedText");
    if (typedText) {
      const words = ["Website Developer", "Content Creator", "Freelance"];
      let i = 0, j = 0, currentWord = "", isDeleting = false;
  
      const type = () => {
        currentWord = words[i];
        const displayText = isDeleting ? currentWord.substring(0, j--) : currentWord.substring(0, j++);
        typedText.textContent = displayText;
  
        if (!isDeleting && j === currentWord.length + 1) setTimeout(() => { isDeleting = true; type(); }, 1200);
        else if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % words.length; setTimeout(type, 400); }
        else setTimeout(type, isDeleting ? 60 : 100);
      };
      type();
    }
  
    const avatar = document.getElementById("hero-avatar");
    if (avatar) {
      avatar.addEventListener("mousemove", e => {
        const rect = avatar.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        avatar.style.transform = `rotateY(${x/20}deg) rotateX(${-y/20}deg) scale(1.05)`;
      });
      avatar.addEventListener("mouseleave", () => avatar.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)");
    }
  });
  
  /* ============================================================
     🤖 ROBOT INTERAKSI — Ambil dari data.json
     ============================================================ */
  async function initRobots() {
    const res = await fetch('./data/data.json');
    const data = await res.json();
  
    const robotEls = document.querySelectorAll('#robotGrid .robot');
    const projectDetail = document.getElementById('projectDetail');
    const closeDetail = document.getElementById('closeDetail');
    const detailTitle = document.getElementById('detailTitle');
    const detailCards = document.getElementById('detailCards');
  
    if (!robotEls.length || !projectDetail) return;
  
    robotEls.forEach(robot => {
      robot.addEventListener('click', () => {
        const category = robot.dataset.category;
        const list = Object.values(data.labels).flat().filter(p => p.category?.toLowerCase() === category.toLowerCase());
        if (!list || list.length === 0) return;
  
        detailTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Projects`;
        detailCards.innerHTML = list.map(p => `
          <div class="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition transform hover:scale-[1.02] hover:shadow-xl">
            <img src="${p.img}" alt="${p.name}" class="w-full h-40 object-cover">
            <div class="p-4">
              <h5 class="font-bold text-lg mb-2">${p.name}</h5>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">${p.description}</p>
              <div class="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                ${p.specs ? `<p><strong>Bahasa:</strong> ${p.specs.bahasa}</p>
                <p><strong>Layout:</strong> ${p.specs.layout}</p>
                <p><strong>Fitur:</strong> ${p.specs.fitur}</p>` : ''}
              </div>
            </div>
          </div>
        `).join('');
  
        projectDetail.classList.remove('pointer-events-none');
        projectDetail.style.opacity = "1";
      });
    });
  
    closeDetail?.addEventListener('click', () => {
      projectDetail.style.opacity = "0";
      setTimeout(() => projectDetail.classList.add('pointer-events-none'), 200);
    });
  }
  
  document.addEventListener("DOMContentLoaded", initRobots);
  
  /* ============================================================
     🎠 PROJECT CAROUSEL — Ambil dari data.json.carousel
     ============================================================ */
  document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch('./data/data.json');
    const data = await res.json();
  
    const track = document.getElementById("carousel-track");
    const carousel = document.getElementById("project-carousel");
    const dotsContainer = document.getElementById("carousel-dots");
    const nextBtn = document.getElementById("next-slide");
    const prevBtn = document.getElementById("prev-slide");
  
    if (!track || !carousel || !dotsContainer) return;
  
    track.innerHTML = data.carousel.map(item => `
      <div class="min-w-full flex-shrink-0 transition-transform duration-500">
        <img src="${item.img}" alt="${item.caption}" class="w-full h-60 object-cover rounded-xl">
      </div>
    `).join('');
  
    dotsContainer.innerHTML = data.carousel.map((_, i) => `
      <button class="dot w-3 h-3 rounded-full bg-white/30 mx-1 transition-all"></button>
    `).join('');
  
    const slides = track.children;
    const dots = dotsContainer.children;
    let slideIndex = 0;
    let autoPlay;
  
    function updateSlide(index) {
      track.style.transform = `translateX(-${index * 100}%)`;
      Array.from(dots).forEach((dot, i) => {
        dot.classList.toggle("bg-white/70", i === index);
        dot.classList.toggle("bg-white/30", i !== index);
        dot.classList.toggle("scale-110", i === index);
      });
    }
  
    nextBtn?.addEventListener("click", () => { slideIndex = (slideIndex + 1) % slides.length; updateSlide(slideIndex); });
    prevBtn?.addEventListener("click", () => { slideIndex = (slideIndex - 1 + slides.length) % slides.length; updateSlide(slideIndex); });
    Array.from(dots).forEach((dot, i) => dot.addEventListener("click", () => { slideIndex = i; updateSlide(slideIndex); }));
  
    function startAutoPlay() { autoPlay = setInterval(() => { slideIndex = (slideIndex + 1) % slides.length; updateSlide(slideIndex); }, 5000); }
    function stopAutoPlay() { clearInterval(autoPlay); }
    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
  
    updateSlide(slideIndex);
    startAutoPlay();
  });
  
  /* ============================================================
     🌙 FOOTER UX IMPROVEMENT
     ============================================================ */
  document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("footer");
    const yearEl = document.getElementById("year");
  
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (footer) {
      setTimeout(() => {
        footer.classList.remove("opacity-0", "translate-y-5");
        footer.classList.add("opacity-100", "translate-y-0");
      }, 400);
  
      const socialLinks = footer.querySelectorAll("a[aria-label]");
      socialLinks.forEach(link => {
        link.addEventListener("mouseenter", () => link.classList.add("drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"));
        link.addEventListener("mouseleave", () => link.classList.remove("drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"));
      });
    }
  });
  