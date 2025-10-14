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
    const project = data.projects.find(p => (p.id || p.slug || p.name).toLowerCase() === projectId.toLowerCase());

    if (!project) {
      document.querySelector("main, section").innerHTML = `
        <div class="min-h-screen flex items-center justify-center text-2xl text-gray-600 dark:text-gray-300">
          Proyek tidak ditemukan 😢
        </div>`;
      return;
    }

    // 🧩 Update judul halaman
    document.title = `${project.title || project.name} | Den Mardiyana Saputra`;

   // HERO SECTION
const heroImg = document.querySelector("section img");
const heroTitle = document.querySelector("h1");
const heroDesc = document.querySelector("h1 + p");
if (heroImg) heroImg.src = project.preview || project.img;
if (heroTitle) heroTitle.textContent = project.title || project.name;
if (heroDesc) heroDesc.textContent = project.subtitle || project.description || "";

// Tombol demo & kode sumber
const demoBtn = document.querySelector('a.demo-link');
const sourceBtn = document.querySelector('a.source-link');

if (demoBtn) {
  if (project.demo) {
    demoBtn.href = project.demo;
    demoBtn.classList.remove("hidden");
  } else {
    demoBtn.href = "#";
    demoBtn.classList.add("hidden");
  }
}

if (sourceBtn) {
  const sourceLink = project.source || project.repo;
  if (sourceLink) {
    sourceBtn.href = sourceLink;
    sourceBtn.classList.remove("hidden");
  } else {
    sourceBtn.href = "#";
    sourceBtn.classList.add("hidden");
  }
}

    // ABOUT SECTION
    const aboutText = document.querySelector("section p.text-gray-600");
    if (aboutText) aboutText.textContent = project.about || project.description || "";

    const fiturList = document.querySelector("ul.list-disc");
    if (fiturList) {
      fiturList.innerHTML = (project.features || [])
        .map(f => `<li>${f}</li>`)
        .join("");
    }

    // IMAGE SHOWCASE
    const showcase = document.querySelector(".grid.grid-cols-1");
    if (showcase) {
      showcase.innerHTML = (project.screenshots || [project.preview || project.img])
        .map(img => `<img src="${img}" alt="${project.title || project.name}" class="rounded-xl shadow-lg hover:scale-105 transition">`)
        .join("");
    }

    // TECHNOLOGIES
    const techWrapper = document.querySelector(".flex.flex-wrap");
    if (techWrapper) {
      const techs = project.technologies || project.tech || [];
      techWrapper.innerHTML = techs
        .map(t => `<span class="px-4 py-2 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 rounded-lg text-sm font-medium">${t}</span>`)
        .join("");
    }

    // RELATED PROJECTS
    const relatedGrid = document.querySelector(".related-section .grid");
    if (relatedGrid) {
      const relatedProjects = data.projects.filter(
        p =>
          project.related?.includes(p.id) ||
          project.related?.includes(p.slug) ||
          project.related?.includes(p.title) ||
          project.related?.includes(p.name)
      );

      relatedGrid.innerHTML =
        relatedProjects.length > 0
          ? relatedProjects
              .map(
                p => `
                <div class="group bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:scale-[1.03] transition">
                  <a href="project.html?id=${p.id || p.slug || p.name}">
                    <img src="${p.preview || p.img}" class="w-full h-40 object-cover group-hover:scale-105 transition">
                    <div class="p-4">
                      <h4 class="font-bold text-lg mb-2">${p.title || p.name}</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">${p.subtitle || p.description || ""}</p>
                    </div>
                  </a>
                </div>`
              )
              .join("")
          : `<p class="text-center text-gray-500 dark:text-gray-400">Belum ada proyek terkait.</p>`;
    }
  } catch (err) {
    console.error("⚠️ Gagal memuat data proyek:", err);
  }
}

loadProject();
