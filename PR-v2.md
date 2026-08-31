# 🌱 nullmarket — Product Requirement & Brand Specification Document (Lengkap)

> **Platform E-Commerce Sayur & Buah Segar Berbasis Keberlanjutan & Teknologi Modern**

---

## 📌 1. Ikhtisar Proyek (Project Overview)

**nullmarket** adalah platform e-commerce retail makanan segar modern yang dirancang untuk menjembatani kesenjangan antara petani sayur & buah lokal dengan konsumen urban. Menggabungkan kecepatan transaksi dan kepraktisan ekosistem digital ala **Gojek** dengan nilai-nilai kualitas bahan alami, kebersihan pangan, serta kehangatan estetika ala **Ladang Lima**.

Proyek ini menghadirkan pengalaman berbelanja bahan makanan harian yang serba cepat, transparan, dan terpercaya langsung melalui peramban web (*web browser*).

---

## 🎯 2. Target Pengguna & Persona (User Target)

### 1. Urban Professional & Ibu Modern (Primary Target)
* **Demografi:** Pria & Wanita, usia 23–45 tahun, bertempat tinggal di wilayah perkotaan/suburban.
* **Kebutuhan Utama:** Efisiensi waktu berbelanja, kepraktisan pengiriman harian, kepastian kesegaran bahan makanan untuk masakan keluarga.
* **Pain Point:** Kerap tidak sempat pergi ke pasar tradisional dan khawatir bahan makanan di pasar swalayan kurang segar atau terlalu mahal.

### 2. Healthy Lifestyle & Organic Enthusiasts (Secondary Target)
* **Demografi:** Usia 18–40 tahun, pelaku diet sehat, pegiat fitness/gym, vegetarian/vegan, pencinta jus & smoothie harian.
* **Kebutuhan Utama:** Sayur bebas pestisida, buah-buahan organik bersertifikasi, serta transparansi asal-usul bahan (*farm traceability*).
* **Pain Point:** Sulitnya mendapatkan pasokan buah dan sayur organik secara konsisten dengan kualitas yang selalu terjaga.

### 3. Pelanggan B2B Mikro (Micro B2B Target)
* **Demografi:** Pemilik UMKM kuliner, cafe, juice bar, dan catering rumah tangga.
* **Kebutuhan Utama:** Pasokan bahan baku secara berkala dengan standar ukuran, warna, dan tingkat kematangan yang konsisten dengan harga terjangkau.

---

## 👁️ 3. Visi & Misi Strategis

### 🌟 Visi Utama
> *"Menjadi platform agregator dan e-commerce sayur & buah segar paling terpercaya di Indonesia yang menghubungkan langsung hasil panen petani lokal ke dapur konsumen melalui integrasi teknologi yang instan, transparan, dan ramah lingkungan."*

### 🚀 Misi Utama
1. **Aksesibilitas Cepat (Gojek Speed):** Menyediakan pengalaman belanja melalui web yang interaktif, instan, dan responsif tanpa alur pemesanan yang rumit.
2. **Jaminan Mutu & Higienitas (Ladang Lima Standard):** Menjamin bahwa setiap lembar daun sayur dan buah yang dikirimkan telah melewati kurasi kualitatif bertaraf tinggi.
3. **Pemberdayaan Petani Lokal:** Memangkas rantai pasok (*supply chain*) yang tidak efisien demi memberikan imbal hasil yang layak bagi petani serta harga rasional bagi konsumen.
4. **Prinsip Keberlanjutan (Eco-Friendly):** Menggunakan sistem kemasan yang dapat didaur ulang (*biodegradable packaging*) dan meminimalkan keterbuangan pangan (*food waste reduction*).

---

## 🎨 4. Konsep UI/UX & Kombinasi Style Design

Menggabungkan keunggulan visual dari **Gojek** dan **Ladang Lima**:

| Aspek Desain | Inspirasi Gojek (Dynamic & Rapid) | Inspirasi Ladang Lima (Organic & Warm) | Penerapan di **nullmarket** |
| :--- | :--- | :--- | :--- |
| **Warna Utama** | Hijau Energik (`#00880C`) | Warm Beige / Off-White (`#FDFBF7`) | Aksen Hijau Segar (`#10B981`) & Latar Krem Alami (`#FAF9F6`) |
| **Tipografi** | Clean, Bold, Sans-Serif Modern | Warm, Friendly, Editorial Feel | Inter/Helvetica untuk UI + Serif Halus untuk Heading |
| **Elemen UI** | Pill filters, Search Bar, Card Ringkas | Soft Rounded Corners, Minimalist Border | Navigasi Cepat dengan Kartu Berujung Halus (`rounded-xl`) |
| **Pesan Brand** | *"Serba Ada, Serba Cepat"* | *"Alami, Sehat, Bertanggung Jawab"* | *"Kesegaran Alami Kebun Lokal, Hadir Instan di Rumah"* |

---

## 📂 5. Arsitektur File & Struktur Proyek

Arsitektur repositori disusun secara modular untuk mendukung pengembangan komponen web berbasis HTML & Tailwind CSS:

```text
nullmarket/
├── index.html            # Halaman Utama (Homepage, Hero Jumbotron, Katalog Produk, Promo)
├── about.html            # Halaman "Cerita Kami" (Visi Misi, Profil Petani Lokal, Standar Mutu)
├── input.css             # Source CSS Utama (Tailwind Custom Utilities & Directives)
├── output.css            # Production CSS Terkompilasi
├── Notes.md              # Catatan Teknis, Backlog Fitur, & Changelog Pengembangan
├── PR.md                 # Dokumen Spesifikasi Produk Lengkap (File Ini)
├── navbar-v...html       # Komponen Navigasi Modular (Responsif & Search Bar Terintegrasi)
├── jumbotron...html      # Komponen Hero Banner Interaktif (Highlight Promo & Flash Sale)
├── footer-v...html       # Komponen Footer (Informasi Kontak, Kebijakan, Sosmed)
└── about-ver...html      # Iterasi Desain & Layout Halaman About
```

---

## 🛠️ 6. Fitur Utama & Roadmap Pengembangan

### 🟢 Fase 1: MVP Web Application (Current)
- **Interactive Navbar & Instant Search Bar:** Fitur pencarian instan untuk memfilter jenis buah, sayur, dan paket resep.
- **Freshness Indicator Badge:** Indikator informasi tingkat kesegaran dan tanggal panen pada setiap produk.
- **Smart Category Filter:** Pengelompokan berdasarkan (Sayur Hijau, Buah Segar, Organik, Bumbu Dapur, Paket Hemat).
- **Dynamic Jumbotron Promo:** Banner penawaran khusus harian yang responsif di perangkat ponsel maupun desktop.
- **Modular Component Architecture:** Struktur file HTML/CSS yang terbagi rapi untuk memudahkan perawatan kode (*maintenance*).

### 🟡 Fase 2: Interactive Features & Local Storage (Upcoming)
- **Shopping Basket / Cart System:** Penyimpanan keranjang belanja pengguna berbasis *LocalStorage*.
- **Location Selector:** Pemilihan area pengiriman cepat untuk mengkalkulasi estimasi waktu sampai.
- **Recipe & Bundle Recommendation:** Rekomendasi resep masak otomatis sesuai isi keranjang belanja.

---

## 📋 7. Standar Kualitas Produk (Quality Assurance)

Setiap produk yang masuk ke dalam katalog **nullmarket** wajib memenuhi standar:
1. **Zero Pest Damage:** Bebas dari kerusakan akibat hama tanaman.
2. **Hygienic Handling:** Dicuci dan dikemas menggunakan standar sanitasi pangan.
3. **Traceable Origin:** Diketahui asal-usul perkebunan dan kelompok tani penanggung jawabnya.

---
*Dokumentasi Produk Lengkap versi 2.0 — nullmarket © 2026*
