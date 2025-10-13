/* ============================================================
   SCRIPT.JS — Website by Den Mardiyana Saputra
   ============================================================
   Struktur:
   1. Toggle Tema (Dark / Light)
   2. Sidebar Carousel (Spoiler)
   3. Sidebar Dropdown Labels
   4. Hero Section: Animasi Avatar & Teks
   5. Robot Section (Popup & Detail Project)
   6. Project Carousel (Slide Gambar)
   ============================================================ */

/* ============================================================
   🌗 TOGGLE TEMA (DARK / LIGHT MODE) — Sinkron Antar Halaman
   ============================================================ */

// 🔹 Jalankan langsung di awal agar tidak flicker
(function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})();

// 🔹 Tunggu DOM siap
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // Pastikan tombol & ikon ada (misal di halaman about.html bisa beda)
  if (!themeToggle || !themeIcon) return;

  // Set ikon sesuai tema aktif
  const isDark = document.documentElement.classList.contains("dark");
  themeIcon.className = isDark
    ? "fas fa-sun text-yellow-400 text-lg"
    : "fas fa-moon text-gray-700 text-lg";

  // Event klik untuk toggle tema
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const nowDark = document.documentElement.classList.contains("dark");

    // Ubah ikon
    themeIcon.className = nowDark
      ? "fas fa-sun text-yellow-400 text-lg"
      : "fas fa-moon text-gray-700 text-lg";

    // Simpan ke localStorage
    localStorage.setItem("theme", nowDark ? "dark" : "light");
  });
});

   

   /* ============================================================
   1.5️⃣ HEADER INTERAKTIF (Scroll & Mobile Toggle)
   ============================================================ */
const header = document.getElementById("main-header");
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

// 🔸 Efek shadow & blur saat scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("shadow-lg", "bg-white/90", "dark:bg-gray-900/90");
  } else {
    header.classList.remove("shadow-lg", "bg-white/90", "dark:bg-gray-900/90");
  }
});

// 🔸 Toggle menu di mobile
menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  const icon = menuBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// 🔸 Tutup menu otomatis ketika user klik link
mobileMenu?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    const icon = menuBtn.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});


/* ============================================================
   2️⃣ SIDEBAR CAROUSEL (Spoiler Section Auto Slide)
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
   
   // Auto-slide spoiler setiap 5 detik
   setInterval(() => {
     carouselIndex = (carouselIndex + 1) % carouselItems.length;
     showCarouselItem(carouselIndex);
   }, 5000);
   
   
  /* ============================================================
   3️⃣ SIDEBAR LABEL DROPDOWN — FIXED CLEAN VERSION (NO CLIP BUG)
   ============================================================ */
const labelToggle = document.getElementById("label-toggle");
const labelContainer = document.getElementById("label-container");
const dropdownBtns = document.querySelectorAll(".dropdown-btn");

// pastikan container bisa nampilin dropdown keluar (kalau parent pakai overflow hidden)
labelContainer.style.overflow = "visible";

// Toggle utama: buka/tutup semua label
labelToggle?.addEventListener("click", () => {
  const expanded = labelContainer.classList.toggle("open");
  labelContainer.style.maxHeight = expanded
    ? labelContainer.scrollHeight + "px"
    : "0";
  labelContainer.style.opacity = expanded ? "1" : "0";
});

// Submenu dropdown (Web App, Blog, Game)
dropdownBtns.forEach((btn) => {
  const menu = btn.nextElementSibling;
  const icon = btn.querySelector("svg");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = menu.classList.contains("open");

    // Tutup semua submenu lain
    document.querySelectorAll(".webapp-menu, .blog-menu, .game-menu").forEach((m) => {
      m.classList.remove("open");
      m.style.maxHeight = "0";
      m.style.opacity = "0";
      m.style.pointerEvents = "none";
    });

    document.querySelectorAll(".dropdown-btn svg").forEach((svg) => {
      svg.style.transform = "rotate(0deg)";
    });

    // Buka menu yang diklik
    if (!open) {
      menu.classList.add("open");
      menu.style.maxHeight = menu.scrollHeight + "px";
      menu.style.opacity = "1";
      menu.style.pointerEvents = "auto";
      icon.style.transform = "rotate(180deg)";
    }
  });
});

   
   
/* ============================================================
   4️⃣ HERO SECTION — Animasi Teks & Avatar
   ============================================================ */
   const typedText = document.getElementById("typedText");
   if (typedText) {
     const words = [
       "Wensite Developer",
       "Content Creator",
       "Freelance"
     ];
   
     let i = 0;
     let j = 0;
     let currentWord = "";
     let isDeleting = false;
   
     const type = () => {
       currentWord = words[i];
       const displayText = isDeleting
         ? currentWord.substring(0, j--)
         : currentWord.substring(0, j++);
   
       typedText.textContent = displayText;
   
       if (!isDeleting && j === currentWord.length + 1) {
         isDeleting = true;
         setTimeout(type, 1200);
       } else if (isDeleting && j === 0) {
         isDeleting = false;
         i = (i + 1) % words.length;
         setTimeout(type, 400);
       } else {
         setTimeout(type, isDeleting ? 60 : 100);
       }
     };
   
     type();
   }
   
   /* ============================================================
      4.1️⃣ HERO AVATAR — Efek Interaktif Hover 3D
      ============================================================ */
   const avatar = document.getElementById("hero-avatar");
   if (avatar) {
     avatar.addEventListener("mousemove", (e) => {
       const rect = avatar.getBoundingClientRect();
       const x = e.clientX - rect.left - rect.width / 2;
       const y = e.clientY - rect.top - rect.height / 2;
       avatar.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.05)`;
     });
   
     avatar.addEventListener("mouseleave", () => {
       avatar.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
     });
   }
   
   
/* ============================================================
   🤖 ROBOT INTERAKSI — Langsung Tampilkan Detail Project
   ============================================================ */
   document.addEventListener("DOMContentLoaded", () => {
    const robotEls = document.querySelectorAll('#robotGrid .robot');
    const projectDetail = document.getElementById('projectDetail');
    const closeDetail = document.getElementById('closeDetail');
    const detailTitle = document.getElementById('detailTitle');
    const detailCards = document.getElementById('detailCards');
  
    if (!robotEls.length || !projectDetail) return;
  
    // 🔹 Data Project
    const projects = {
      application: [
        { 
          title: "Habit Tracker", 
          img: "img/HT/HT.png", 
          desc: "Aplikasi pelacak kebiasaan dengan UI minimalis dan sistem progres harian.",
          specs: {
            bahasa: "JavaScript, HTML, CSS",
            layout: "Responsive, grid-based",
            fitur: "Pencatatan kebiasaan, statistik progres, tema gelap"
          }
        },
        { 
          title: "Sss Game", 
          img: "img/SG/Sss.png", 
          desc: "Game ular klasik dengan kontrol keyboard dan sistem skor otomatis.",
          specs: {
            bahasa: "HTML Canvas, JavaScript",
            layout: "Fullscreen mode",
            fitur: "Score tracking, level kecepatan, efek suara"
          }
        },
      ],
      website: [
        { 
          title: "Kutipan Blog", 
          img: "img/B/B.png", 
          desc: "Website berisi artikel inspiratif dan motivasi dengan tema gelap elegan.",
          specs: {
            bahasa: "HTML, TailwindCSS, JS",
            layout: "Blog layout, card grid",
            fitur: "Dark mode, navigasi responsif, SEO optimized"
          }
        },
        { 
          title: "Dye Blog", 
          img: "img/B/favicon_DI.png", 
          desc: "Website dengan cerita pengembangan web dan tutorial sederhana.",
          specs: {
            bahasa: "Blogger XML, HTML, CSS",
            layout: "Minimalist journal style",
            fitur: "Integrasi sitemap, Google Analytics, custom tag"
          }
        },
      ],
    };
  
    // 🔹 Klik Robot → langsung tampilkan detail project
    robotEls.forEach(robot => {
      robot.addEventListener('click', () => {
        const category = robot.dataset.category;
        const list = projects[category];
        if (!list || list.length === 0) return;
  
        // Set judul & render semua card project
        detailTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Projects`;
        detailCards.innerHTML = list.map(p => `
          <div class="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition transform hover:scale-[1.02] hover:shadow-xl">
            <img src="${p.img}" alt="${p.title}" class="w-full h-40 object-cover">
            <div class="p-4">
              <h5 class="font-bold text-lg mb-2">${p.title}</h5>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">${p.desc}</p>
              <div class="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                <p><strong>Bahasa:</strong> ${p.specs.bahasa}</p>
                <p><strong>Layout:</strong> ${p.specs.layout}</p>
                <p><strong>Fitur:</strong> ${p.specs.fitur}</p>
              </div>
            </div>
          </div>
        `).join('');
  
        projectDetail.classList.remove('pointer-events-none');
        projectDetail.style.opacity = "1";
      });
    });
  
    // 🔹 Tombol Tutup Popup Detail
    closeDetail?.addEventListener('click', () => {
      projectDetail.style.opacity = "0";
      setTimeout(() => projectDetail.classList.add('pointer-events-none'), 200);
    });
  });
  
   
 /* ============================================================
   🎠 PROJECT CAROUSEL — Smooth UX + Auto Slide + Pause on Hover
   ============================================================ */
const track = document.getElementById("carousel-track");
const slides = document.querySelectorAll("#carousel-track > div");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.getElementById("next-slide");
const prevBtn = document.getElementById("prev-slide");
const carousel = document.getElementById("project-carousel");

let slideIndex = 0;
let autoPlay;

// 🔹 Update tampilan slide & dot aktif
function updateSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-white/70", i === index);
    dot.classList.toggle("bg-white/30", i !== index);
    dot.classList.toggle("scale-110", i === index);
  });
}

// 🔹 Navigasi manual
nextBtn?.addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length;
  updateSlide(slideIndex);
});
prevBtn?.addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  updateSlide(slideIndex);
});

// 🔹 Navigasi lewat dot
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    slideIndex = i;
    updateSlide(slideIndex);
  });
});

// 🔹 Auto slide setiap 5 detik
function startAutoPlay() {
  autoPlay = setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlide(slideIndex);
  }, 5000);
}
function stopAutoPlay() {
  clearInterval(autoPlay);
}

// 🔹 Pause saat hover, lanjut saat keluar
carousel.addEventListener("mouseenter", stopAutoPlay);
carousel.addEventListener("mouseleave", startAutoPlay);

// 🔹 Inisialisasi
updateSlide(slideIndex);
startAutoPlay();

 /* ============================================================
     🌙 FOOTER UX IMPROVEMENT
     ============================================================ */
     document.addEventListener("DOMContentLoaded", () => {
      const footer = document.getElementById("footer");
      const yearEl = document.getElementById("year");
  
      // Auto-update tahun
      yearEl.textContent = new Date().getFullYear();
  
      // Fade-in saat halaman selesai dimuat
      setTimeout(() => {
        footer.classList.remove("opacity-0", "translate-y-5");
        footer.classList.add("opacity-100", "translate-y-0");
      }, 400);
  
      // Optional: animasi hover link sosial tambahan
      const socialLinks = footer.querySelectorAll("a[aria-label]");
      socialLinks.forEach(link => {
        link.addEventListener("mouseenter", () => link.classList.add("drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"));
        link.addEventListener("mouseleave", () => link.classList.remove("drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"));
      });
    });