/* ============================================================
   SCRIPT.JS — Website by Den Mardiyana Saputra (Dynamic JSON)
   ============================================================ */
   document.addEventListener("DOMContentLoaded", async () => {

    /* ============================================================
       🌗 TOGGLE TEMA (DARK / LIGHT MODE)
       ============================================================ */
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const applyTheme = (dark) => {
      document.documentElement.classList.toggle("dark", dark);
      if (themeIcon) themeIcon.className = dark
        ? "fas fa-sun text-yellow-400 text-lg"
        : "fas fa-moon text-gray-700 text-lg";
      localStorage.setItem("theme", dark ? "dark" : "light");
    };
    applyTheme(localStorage.getItem("theme") === "dark");
    themeToggle?.addEventListener("click", () =>
      applyTheme(!document.documentElement.classList.contains("dark"))
    );
  
    /* ============================================================
       🏠 HEADER & MOBILE MENU
       ============================================================ */
       const header = document.getElementById("main-header");
       const menuBtn = document.getElementById("menu-btn");
       const mobileMenu = document.getElementById("mobile-menu");
       const themeToggleBtn = document.getElementById("theme-toggle");
       
       // ====== SCROLL EFFECT HEADER ======
       window.addEventListener("scroll", () => {
         if (!header) return;
         const scrolled = window.scrollY > 20;
         header.classList.toggle("shadow-lg", scrolled);
         header.classList.toggle("bg-white/90", scrolled);
         header.classList.toggle("dark:bg-gray-900/90", scrolled);
       });
       
       // ====== MOBILE MENU TOGGLE ======
       menuBtn?.addEventListener("click", () => {
         mobileMenu.classList.toggle("hidden");
         const icon = menuBtn.querySelector("i");
         if (icon) {
           icon.classList.toggle("fa-bars");
           icon.classList.toggle("fa-times");
         }
       });
       
       // ====== CLOSE MENU AFTER CLICK ======
       mobileMenu?.querySelectorAll("a").forEach(link =>
         link.addEventListener("click", () => {
           mobileMenu.classList.add("hidden");
           const icon = menuBtn.querySelector("i");
           if (icon) {
             icon.classList.add("fa-bars");
             icon.classList.remove("fa-times");
           }
         })
       );
       
       // ====== THEME TOGGLE ======
       if (themeToggleBtn) {
         const html = document.documentElement;
         const userPref = localStorage.getItem("theme");
       
         // apply saved theme
         if (userPref === "dark" || (!userPref && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
           html.classList.add("dark");
           themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
         } else {
           html.classList.remove("dark");
           themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
         }
       
         // toggle button
         themeToggleBtn.addEventListener("click", () => {
           html.classList.toggle("dark");
           const isDark = html.classList.contains("dark");
           localStorage.setItem("theme", isDark ? "dark" : "light");
           themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
         });
       }
       
  
    /* ============================================================
       2️⃣ SIDEBAR CAROUSEL
       ============================================================ */
    let carouselIndex = 0;
    const carouselItems = document.querySelectorAll("#sidebar-carousel .carousel-item");
  
    const showCarouselItem = (index) => {
      carouselItems.forEach((item, i) => {
        item.style.opacity = i === index ? "1" : "0";
        item.style.pointerEvents = i === index ? "auto" : "none";
        item.style.transform = i === index ? "scale(1)" : "scale(0.95)";
      });
    };
  
    if (carouselItems.length) showCarouselItem(carouselIndex);
  
    setInterval(() => {
      carouselIndex = (carouselIndex + 1) % carouselItems.length;
      showCarouselItem(carouselIndex);
    }, 5000);
  
    /* ============================================================
       3️⃣ DROPDOWN SIDEBAR & MOBILE
       ============================================================ */
    const labelToggle = document.getElementById("label-toggle");
    const labelContainer = document.getElementById("label-container");
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");
  
    labelToggle?.addEventListener("click", () => {
      const open = labelContainer.classList.toggle("open");
      labelContainer.style.maxHeight = open ? labelContainer.scrollHeight + "px" : "0";
      labelContainer.style.opacity = open ? "1" : "0";
    });
  
    dropdownBtns.forEach(btn => {
      const menu = btn.nextElementSibling;
      const icon = btn.querySelector("svg");
    
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const open = menu?.classList.contains("open");
    
        // Tutup semua dropdown lain
        document.querySelectorAll(".webapp-menu, .blog-menu, .game-menu").forEach(m => {
          m.classList.remove("open");
          m.style.maxHeight = "0";
          m.style.opacity = "0";
          m.style.pointerEvents = "none";
        });
    
        document.querySelectorAll(".dropdown-btn svg").forEach(svg => {
          svg.style.transform = "rotate(0deg)";
        });
    
        // Buka dropdown yang diklik
        if (!open && menu) {
          menu.classList.add("open");
          menu.style.maxHeight = menu.scrollHeight + "px";
          menu.style.opacity = "1";
          menu.style.pointerEvents = "auto";
          menu.style.overflow = "visible"; // ✅ penting biar isi gak kepotong
          menu.style.position = "relative"; // ✅ pastikan dropdown tampil di atas layer lain
    
          // Auto sesuaikan tinggi parent (misal sidebar)
          const parent = menu.closest('.sidebar, #sidebar, #label-container');
          if (parent) {
            parent.style.overflow = "visible";
            parent.style.maxHeight = "none";
          }
    
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      });
    });
    
  
    /* ============================================================
       4️⃣ HERO SECTION
       ============================================================ */
    const typedText = document.getElementById("typedText");
    if (typedText) {
      const words = ["Website Developer", "Content Creator", "Freelance"];
      let i = 0, j = 0, isDeleting = false;
      const type = () => {
        const word = words[i];
        typedText.textContent = isDeleting ? word.substring(0, j--) : word.substring(0, j++);
        if (!isDeleting && j === word.length + 1)
          setTimeout(() => { isDeleting = true; type(); }, 1200);
        else if (isDeleting && j === 0) {
          isDeleting = false;
          i = (i + 1) % words.length;
          setTimeout(type, 400);
        } else setTimeout(type, isDeleting ? 60 : 100);
      };
      type();
    }
  
    const avatar = document.getElementById("hero-avatar");
    avatar?.addEventListener("mousemove", e => {
      const rect = avatar.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      avatar.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.05)`;
    });
    avatar?.addEventListener("mouseleave", () =>
      avatar.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)"
    );
  
    /* ============================================================
       5️⃣ ROBOT SECTION
       ============================================================ */
       const dataRes = await fetch('./data/data.json');
       const data = await dataRes.json();
     
       const robotEls = document.querySelectorAll('#robotGrid .robot');
       const projectDetail = document.getElementById('projectDetail');
       const closeDetail = document.getElementById('closeDetail');
       const detailTitle = document.getElementById('detailTitle');
       const detailCards = document.getElementById('detailCards');
     
       robotEls.forEach(robot => {
         robot.addEventListener('click', () => {
           const category = robot.dataset.category;
           const list = Object.values(data.labels).flat().filter(p =>
             p.category?.toLowerCase() === category.toLowerCase()
           );
           if (!list.length) return;
     
           // Judul popup
           detailTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Projects`;
     
           // Render Card
           detailCards.innerHTML = list.map((p, i) => `
             <a href="${p.url || '#'}" target="_blank" rel="noopener noreferrer"
                class="group block relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 
                       rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-700/60 
                       shadow-md transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] 
                       hover:shadow-2xl hover:shadow-${p.badgeColor || 'indigo-400'}/30 opacity-0 translate-y-4"
                style="animation: fadeUp 0.5s ease ${i * 0.1}s forwards;">
     
               <!-- Gambar -->
               <div class="relative overflow-hidden">
                 <img src="${p.img}" alt="${p.name}"
                      class="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
                 <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div class="absolute bottom-3 left-1/2 -translate-x-1/2 text-center opacity-0 
                             group-hover:opacity-100 transition-all duration-500">
                   <h5 class="text-white font-semibold text-lg drop-shadow-md">${p.name}</h5>
                 </div>
               </div>
     
               <!-- Konten -->
               <div class="p-5">
                 <span class="inline-block px-3 py-1 text-xs font-semibold text-white bg-${p.badgeColor || 'indigo-500'} 
                              rounded-full shadow-sm mb-3 capitalize">
                   ${p.category}
                 </span>
                 <h5 class="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">${p.name}</h5>
                 <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">${p.description}</p>
     
                 ${
                   p.spek && Array.isArray(p.spek)
                     ? `<ul class="grid grid-cols-2 gap-2 mt-2">
                         ${p.spek.map(s => `
                           <li class="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 
                                       dark:bg-gray-700/40 dark:text-gray-300 flex items-center gap-1
                                       transition-all duration-300 group-hover:bg-${p.badgeColor || 'indigo-500'}/20">
                             <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-${p.badgeColor || 'indigo-500'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                             </svg>
                             ${s}
                           </li>`).join('')}
                       </ul>`
                     : ''
                 }
               </div>
             </a>
           `).join('');
     
           // Tampilkan popup
           projectDetail.classList.remove('pointer-events-none');
           projectDetail.style.opacity = "1";
         });
       });
     
       // Tutup popup
       closeDetail?.addEventListener('click', () => {
         projectDetail.style.opacity = "0";
         setTimeout(() => projectDetail.classList.add('pointer-events-none'), 200);
       });

       // 🔸 Animasi fade-in dari bawah
const style = document.createElement('style');
style.textContent = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);
  
    /* ============================================================
       🎠 PROJECT CAROUSEL — Dinamis dari data.json (Tanpa tabrakan DOM)
       ============================================================ */
    const initCarousel = async () => {
      try {
        const track = document.getElementById("carousel-track");
        const carousel = document.getElementById("project-carousel");
        const dotsContainer = document.getElementById("carousel-dots");
        const nextBtn = document.getElementById("next-slide");
        const prevBtn = document.getElementById("prev-slide");
  
        if (!track || !carousel || !dotsContainer) return;
  
        const slidesData = data.carousel;
        track.innerHTML = slidesData.map(item => `
          <div class="min-w-full flex-shrink-0 flex justify-center items-center relative">
            <img src="${item.img}" alt="${item.caption}" 
              class="w-full h-52 md:h-64 object-cover transition-transform duration-700 hover:scale-105 rounded-xl"
              loading="lazy">
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-md text-sm md:text-base">
              ${item.caption}
            </div>
          </div>
        `).join('');
  
        dotsContainer.innerHTML = slidesData.map((_, i) => `
          <span class="dot w-3 h-3 rounded-full bg-white/30 cursor-pointer transition-all duration-300"
                data-slide="${i}"></span>
        `).join('');
  
        const slides = track.children;
        const dots = dotsContainer.children;
        let slideIndex = 0;
        let autoPlay;
  
        const updateSlide = (index) => {
          track.style.transform = `translateX(-${index * 100}%)`;
          Array.from(dots).forEach((dot, i) => {
            dot.classList.toggle("bg-white/70", i === index);
            dot.classList.toggle("bg-white/30", i !== index);
            dot.classList.toggle("scale-125", i === index);
          });
        };
  
        const nextSlide = () => {
          slideIndex = (slideIndex + 1) % slides.length;
          updateSlide(slideIndex);
        };
  
        const prevSlide = () => {
          slideIndex = (slideIndex - 1 + slides.length) % slides.length;
          updateSlide(slideIndex);
        };
  
        nextBtn?.addEventListener("click", nextSlide);
        prevBtn?.addEventListener("click", prevSlide);
  
        Array.from(dots).forEach((dot, i) => {
          dot.addEventListener("click", () => {
            slideIndex = i;
            updateSlide(slideIndex);
            restartAutoPlay();
          });
        });
  
        const startAutoPlay = () => {
          stopAutoPlay();
          autoPlay = setInterval(nextSlide, 4000);
        };
  
        const stopAutoPlay = () => {
          if (autoPlay) clearInterval(autoPlay);
        };
  
        const restartAutoPlay = () => {
          stopAutoPlay();
          startAutoPlay();
        };
  
        carousel.addEventListener("mouseenter", stopAutoPlay);
        carousel.addEventListener("mouseleave", startAutoPlay);
  
        updateSlide(slideIndex);
        startAutoPlay();
  
      } catch (err) {
        console.error("Gagal memuat carousel:", err);
      }
    };
  
    await initCarousel();
  
    /* ============================================================
       7️⃣ FOOTER UX
       ============================================================ */
    const footer = document.getElementById("footer");
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (footer) {
      setTimeout(() => footer.classList.remove("opacity-0", "translate-y-5"), 400);
      footer.classList.add("opacity-100", "translate-y-0");
      footer.querySelectorAll("a[aria-label]").forEach(link => {
        link.addEventListener("mouseenter", () =>
          link.classList.add("drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]")
        );
        link.addEventListener("mouseleave", () =>
          link.classList.remove("drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]")
        );
      });
    }
  
  });
  