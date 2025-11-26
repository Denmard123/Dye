// 🕒 Tahun otomatis di footer
document.getElementById("year").textContent = new Date().getFullYear();

// 🚀 Load data proyek dari data.json berdasarkan ?id=
async function loadProject() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  if (!projectId) {
    console.error("❌ Tidak ada parameter id di URL!");
    return;
  }

  try {
    const res = await fetch("./data/data.json");
    const data = await res.json();
    const project = data.projects.find(
      p => (p.id || p.slug || p.name).toLowerCase() === projectId.toLowerCase()
    );

    if (!project) {
      document.querySelector("main, section").innerHTML = `
        <div class="min-h-screen flex items-center justify-center text-2xl text-gray-600 dark:text-gray-300">
          Proyek tidak ditemukan 😢
        </div>`;
      return;
    }

    // 🧩 Update judul halaman
    document.title = `${project.title || project.name} | Den Mardiyana Saputra`;

    // ========================================
    // 📌 SEO BLOCK
    // ========================================
    const fullURL = `${location.origin}${location.pathname}?id=${projectId}`;
    const metaDesc = project.subtitle || project.description || "";
    const ogImage = project.preview || project.img;

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.name = "description";
      document.head.appendChild(m);
      return m;
    })();
    metaDescription.content = metaDesc;

    // OG meta
    const ogTitle = document.querySelector('meta[property="og:title"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("property","og:title");
      document.head.appendChild(m);
      return m;
    })();
    ogTitle.content = project.title || project.name;

    const ogDesc = document.querySelector('meta[property="og:description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("property","og:description");
      document.head.appendChild(m);
      return m;
    })();
    ogDesc.content = metaDesc;

    const ogImg = document.querySelector('meta[property="og:image"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("property","og:image");
      document.head.appendChild(m);
      return m;
    })();
    ogImg.content = ogImage;

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]') || (() => {
      const l = document.createElement("link");
      l.rel = "canonical";
      document.head.appendChild(l);
      return l;
    })();
    canonical.href = fullURL;

    // Structured Data JSON-LD
    const ld = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.title || project.name,
      "description": metaDesc,
      "image": ogImage,
      "url": fullURL,
      "author": { "@type": "Person", "name": "Den Mardiyana Saputra" }
    };

    const scriptLD = document.getElementById("structured-data") || (() => {
      const s = document.createElement("script");
      s.id = "structured-data";
      s.type = "application/ld+json";
      document.head.appendChild(s);
      return s;
    })();
    scriptLD.textContent = JSON.stringify(ld);

    // ========================================
    // END SEO BLOCK
    // ========================================

    // HERO SECTION
    const heroImg = document.querySelector("section img");
    const heroTitle = document.querySelector("h1");
    const heroDesc = document.querySelector("h1 + p");
    if(heroImg) heroImg.src = project.preview || project.img;
    if(heroTitle) heroTitle.textContent = project.title || project.name;
    if(heroDesc) heroDesc.textContent = metaDesc;

    // Tombol demo & kode sumber
    const demoBtn = document.querySelector('a.demo-link');
    const sourceBtn = document.querySelector('a.source-link');

    if(demoBtn) {
      if(project.demo) { demoBtn.href = project.demo; demoBtn.classList.remove("hidden"); }
      else demoBtn.classList.add("hidden");
    }

    if(sourceBtn) {
      const sourceLink = project.source || project.repo;
      if(sourceLink) { sourceBtn.href = sourceLink; sourceBtn.classList.remove("hidden"); }
      else sourceBtn.classList.add("hidden");
    }

    // ABOUT & FEATURES
    const aboutText = document.querySelector("section p.text-gray-600");
    if(aboutText) aboutText.textContent = project.about || project.description || "";

    const fiturList = document.querySelector("ul.list-disc");
    if(fiturList) fiturList.innerHTML = (project.features || []).map(f=>`<li>${f}</li>`).join("");

    // IMAGE SHOWCASE
    const showcase = document.querySelector(".grid.grid-cols-1");
    if(showcase) showcase.innerHTML = (project.screenshots || [project.preview || project.img])
      .map(img => `<img src="${img}" alt="${project.title || project.name}" class="rounded-xl shadow-lg hover:scale-105 transition">`).join("");

    // TECHNOLOGIES
    const techWrapper = document.querySelector(".flex.flex-wrap");
    if(techWrapper) {
      const techs = project.technologies || project.tech || [];
      techWrapper.innerHTML = techs.map(t => `<span class="px-4 py-2 bg-gray-100 dark:bg-gray-700/20 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium flex items-center gap-2">${t}</span>`).join("");
    }

    // RELATED PROJECTS
    const relatedGrid = document.querySelector(".related-section .grid");
    if(relatedGrid) {
      const relatedProjects = data.projects.filter(
        p => project.related?.includes(p.id) || project.related?.includes(p.slug) || project.related?.includes(p.title)
      );
      relatedGrid.innerHTML = relatedProjects.length>0 ? relatedProjects.map(p=>`
        <div class="group bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:scale-[1.03] transition cursor-pointer"
          onclick="window.location.href='project.html?id=${p.id || p.slug || p.name}'">
          <img src="${p.preview || p.img}" class="w-full h-40 object-cover group-hover:scale-105 transition">
          <div class="p-4">
            <h4 class="font-bold text-lg mb-2">${p.title || p.name}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">${p.subtitle || p.description || ""}</p>
          </div>
        </div>`).join("") : `<p class="text-center text-gray-500 dark:text-gray-400">Belum ada proyek terkait.</p>`;
    }

  } catch(err) {
    console.error("⚠️ Gagal memuat data proyek:", err);
  }
}

loadProject();
