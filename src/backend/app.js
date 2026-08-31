const API_URL = '../json/api.json';

const container = document.getElementById('container');
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('searchInput');

let products = [];
let currentCategory = 'all';

const categoryDescriptions = {
  sayur: 'Sumber serat, vitamin, dan nutrisi harian untuk gizi keluarga.',
  buah: 'Pilihan buah segar dengan rasa manis alami dan kandungan nutrisi tinggi.',
  frozen_food: 'Produk siap olah yang praktis, cepat, dan tetap terjaga kualitasnya.',
  dairy: 'Produk susu dan olahan segar yang kaya kalsium dan protein.',
  meat: 'Daging pilihan dengan kualitas yang terjaga dan proses yang higienis.'
};

function getCategoryDetail(category) {
  return categoryDescriptions[category] || 'Produk pilihan yang kami jaga kualitasnya agar tetap segar dan bermanfaat.';
}

function formatPrice(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md';

  const categoryDetail = getCategoryDetail(product.kategori);

  card.innerHTML = `
    <div class="relative">
      <img src="${product.gambar}" alt="${product.nama}" class="h-56 w-full object-cover" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80';" />
      <span class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand-700 backdrop-blur-sm">${product.kategori}</span>
    </div>
    <div class="p-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-xl font-bold text-slate-900">${product.nama}</h3>
          <p class="mt-1 text-sm text-slate-500">${product.satuan}</p>
        </div>
        <span class="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">${product.stok} stok</span>
      </div>

      <p class="mt-4 text-sm leading-6 text-slate-600">${product.deskripsi}</p>

      <div class="mt-4 rounded-2xl bg-slate-50 p-3">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Manfaat utama</p>
        <p class="mt-2 text-sm text-slate-700">${categoryDetail}</p>
      </div>

      <div class="mt-5 flex items-center justify-between">
        <p class="text-xl font-black text-brand-700">${formatPrice(product.harga)}</p>
        <button class="rounded-xl border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-100">
          Lihat detail
        </button>
      </div>
    </div>
  `;

  return card;
}

function renderProducts() {
  if (!container) return;

  const keyword = searchInput && searchInput.value ? searchInput.value.trim().toLowerCase() : '';

  const filtered = products.filter((item) => {
    const matchesCategory = currentCategory === 'all' || item.kategori === currentCategory;
    const matchText = !keyword || item.nama.toLowerCase().includes(keyword) || item.deskripsi.toLowerCase().includes(keyword) || item.kategori.toLowerCase().includes(keyword);
    return matchesCategory && matchText;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div class="col-span-full rounded-[24px] border border-dashed border-slate-300 bg-white p-10 text-center">
        <p class="text-lg font-semibold text-slate-700">Produk tidak ditemukan</p>
        <p class="mt-2 text-sm text-slate-500">Coba cari nama atau manfaat yang lain.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  filtered.forEach((product) => {
    container.appendChild(createProductCard(product));
  });
}

function filterByCategory(category) {
  currentCategory = category;

  categoryButtons.forEach((btn) => {
    const active = btn.dataset.category === category;
    btn.className = active
      ? 'category-btn rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white'
      : 'category-btn rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700';
  });

  renderProducts();
}

async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Gagal memuat produk');
    products = await response.json();
    renderProducts();
  } catch (error) {
    if (container) {
      container.innerHTML = `
        <div class="col-span-full rounded-[24px] border border-red-200 bg-red-50 p-8 text-center">
          <p class="text-lg font-semibold text-red-700">Data produk gagal dimuat</p>
          <p class="mt-2 text-sm text-red-600">${error.message}</p>
        </div>
      `;
    }
  }
}

function setupEventListeners() {
  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => filterByCategory(button.dataset.category));
  });

  if (searchInput) {
    searchInput.addEventListener('input', renderProducts);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  if (categoryButtons.length) {
    filterByCategory('all');
  }
  loadProducts();
});
