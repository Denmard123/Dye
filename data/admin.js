const sectionSelect = document.getElementById('sectionSelect');
const formContainer = document.getElementById('formContainer');
let data = {};

// Ambil data.json dulu
async function loadData() {
  const res = await fetch('data.json');
  data = await res.json();
  renderForm(sectionSelect.value);
}

function renderForm(section) {
  formContainer.innerHTML = '';

  if (section === 'robots') {
    data.robots.forEach((robot, i) => {
      const div = document.createElement('div');
      div.className = 'space-y-1';
      div.innerHTML = `
        <label class="block font-semibold">Robot Name</label>
        <input class="w-full p-2 border rounded" value="${robot.name}" data-index="${i}" data-type="name"/>
        <label class="block font-semibold">Image Path</label>
        <input class="w-full p-2 border rounded" value="${robot.img}" data-index="${i}" data-type="img"/>
        <label class="block font-semibold">Category</label>
        <input class="w-full p-2 border rounded" value="${robot.category}" data-index="${i}" data-type="category"/>
      `;
      formContainer.appendChild(div);
    });
  } else if (section === 'labels') {
    for (const [cat, items] of Object.entries(data.labels)) {
      items.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'space-y-1';
        div.innerHTML = `
          <label class="block font-semibold">Category</label>
          <input class="w-full p-2 border rounded" value="${cat}" data-cat-index="${i}" data-type="category"/>
          <label class="block font-semibold">Project Name</label>
          <input class="w-full p-2 border rounded" value="${item.name}" data-cat="${cat}" data-index="${i}" data-type="name"/>
          <label class="block font-semibold">URL</label>
          <input class="w-full p-2 border rounded" value="${item.url}" data-cat="${cat}" data-index="${i}" data-type="url"/>
          <label class="block font-semibold">Image Path</label>
          <input class="w-full p-2 border rounded" value="${item.img}" data-cat="${cat}" data-index="${i}" data-type="img"/>
          <label class="block font-semibold">Description</label>
          <textarea class="w-full p-2 border rounded" data-cat="${cat}" data-index="${i}" data-type="description">${item.description}</textarea>
          <label class="block font-semibold">Badge Color</label>
          <input class="w-full p-2 border rounded" value="${item.badgeColor}" data-cat="${cat}" data-index="${i}" data-type="badgeColor"/>
        `;
        formContainer.appendChild(div);
      });
    }
  } else if (section === 'carousel') {
    data.carousel.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'space-y-1';
      div.innerHTML = `
        <label class="block font-semibold">Image Path</label>
        <input class="w-full p-2 border rounded" value="${item.img}" data-index="${i}" data-type="img"/>
        <label class="block font-semibold">Caption</label>
        <input class="w-full p-2 border rounded" value="${item.caption}" data-index="${i}" data-type="caption"/>
      `;
      formContainer.appendChild(div);
    });
  }
}

// Update nilai di data object saat input berubah
formContainer.addEventListener('input', e => {
  const type = e.target.dataset.type;
  const index = e.target.dataset.index;
  const cat = e.target.dataset.cat;

  if (type && index !== undefined) {
    if (sectionSelect.value === 'robots') {
      data.robots[index][type] = e.target.value;
    } else if (sectionSelect.value === 'carousel') {
      data.carousel[index][type] = e.target.value;
    } else if (sectionSelect.value === 'labels') {
      data.labels[cat][index][type] = e.target.value;
    }
  }
});

// Render form saat section berubah
sectionSelect.addEventListener('change', e => renderForm(e.target.value));

// Tombol Simpan
document.getElementById('saveBtn').addEventListener('click', async () => {
  // Di sini lo bisa panggil GitHub API buat push data.json
  console.log('Updated data.json:', JSON.stringify(data, null, 2));
  alert('Data JSON sudah terupdate (console.log untuk demo).');
});

loadData();
