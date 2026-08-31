// Frontend product listing script
async function fetchProducts() {
  try {
    const res = await fetch("../json/api.json");
    if (!res.ok) throw new Error("Gagal mengambil data");
    const data = await res.json();
    renderProducts(data);
  } catch (err) {
    const container = document.getElementById("products");
    if (container)
      container.innerHTML =
        '<p style="color:crimson">Error: ' + err.message + "</p>";
  }
}

function formatRupiah(v) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(v);
}

function renderProducts(items) {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = items
    .map(
      (it) => `
        <article class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
          <div class="w-full h-36 sm:h-40 md:h-48 flex items-center justify-center bg-white p-4">
            <img loading="lazy" class="max-h-full max-w-full object-contain" src="${encodeURI(it.gambar)}" alt="${it.nama}" onerror="this.src='../../assets/pack/waffle.jpg'" />
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <h3 class="text-lg font-semibold text-slate-900">${it.nama}</h3>
            <div class="text-sm text-slate-500">${it.kategori} • ${it.satuan}</div>
            <div class="text-indigo-600 font-bold mt-1">${formatRupiah(it.harga)}</div>
            <p class="text-slate-700 mt-2 text-sm">${it.deskripsi}</p>
            <div class="text-slate-600 text-sm mt-4 mt-auto">Stok: ${it.stok}</div>
          </div>
        </article>
      `,
    )
    .join("");
}

// Auto-run when loaded
document.addEventListener("DOMContentLoaded", fetchProducts);
