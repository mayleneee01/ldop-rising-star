# 📰 Portal Berita Mini (Mini News Portal) — Kelompok 1

Repository ini dibuat untuk memenuhi penugasan **LDOP Rising Star 2026 Kaderisasi HMIF ITERA**.

---

## 📌 Identitas Kader & Kelompok

| Atribut | Keterangan |
| :--- | :--- |
| **Tema Dipilih** | **Tema #4: Portal Berita Mini** (*Portal Berita Mini*) |
| **Username GitHub** | `mayleneee01` |
| **Kelompok** | **Kelompok 1** |
| **Target Branch** | `kelompok-1` |

---

## 👥 Anggota Kelompok 1

1. **Maylene** (`mayleneee01`) — *Lead Frontend / Developer*
2. *Anggota Kelompok 1 lainnya*

---

## 🚀 Tentang Project

**Portal Berita Mini** adalah aplikasi web berita interaktif, responsif, dan modern yang dirancang khusus untuk civitas akademika ITERA dan masyarakat umum. Aplikasi ini menyajikan informasi terkini yang terbagi kedalam berbagai kategori seperti Kampus, Akademik, Teknologi, Opini, dan Lifestyle.

### ✨ Fitur Unggulan
1. **Breaking News Ticker**: Barisan berita kilat terbaru yang berjalan dinamis di bagian atas halaman.
2. **Hero & Featured Section**: Sorotan berita utama (*Lead Story*) dengan layout majalah digital modern.
3. **Kategori Interaktif**: Navigasi dan filter berita dengan kategori yang mudah diakses (Semua, Kampus, Akademik, Teknologi, Opini, Lifestyle).
4. **Pencarian Real-Time**: Fitur pencarian artikel instan berdasarkan judul, ringkasan, maupun kata kunci.
5. **Article Reader Modal**: Tampilan membaca artikel penuh (*full view*) lengkap dengan informasi penulis, tanggal publikasi, estimasi waktu baca, hitungan views & likes, serta tombol *Bookmark*.
6. **Sistem Komentar & Suka (Likes)**: Pengguna dapat memberikan suka dan menambahkan komentar langsung pada setiap artikel.
7. **Bookmarks Manager**: Simpan artikel favorit untuk dibaca kembali nanti menggunakan penyimpanan lokal (*LocalStorage*).
8. **Widget Samping (Sidebar)**:
   - 📈 *Trending Articles*: Daftar berita paling populer dengan nomor urut.
   - 🌤️ *Cuaca Kampus ITERA*: Informasi cuaca real-time wilayah kampus ITERA, Lampung.
   - 📊 *Poling Mahasiswa*: Jajak pendapat interaktif bagi mahasiswa dengan hasil voting langsung.
   - ✉️ *Newsletter Subscription*: Formulir berlangganan buletin berita mingguan.
9. **Desain Responsif & Modern**: Dibangun menggunakan Tailwind CSS dengan dukungan tema bersih ala portal berita profesional.

---

## 🛠️ Tech Stack

- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management & Persistence**: React Hooks (`useState`, `useEffect`) & LocalStorage
- **Build Tool**: Vite

---

## 📂 Struktur Direktori Kode

```text
mini-berita/
├── public/                # Aset publik & favicon
├── src/
│   ├── assets/            # Gambar dan aset grafis
│   ├── components/        # Komponen UI modular
│   │   ├── ArticleModal.jsx   # Modal baca artikel detail & komentar
│   │   ├── BookmarksModal.jsx # Modal daftar artikel tersimpan
│   │   ├── BreakingTicker.jsx # Berita berjalan (ticker)
│   │   ├── Footer.jsx         # Footer portal berita
│   │   ├── HeroSection.jsx    # Sorotan berita utama & tren
│   │   ├── Navbar.jsx         # Bar navigasi, pencarian & menu
│   │   ├── NewsGrid.jsx       # Grid artikel berita & filter kategori
│   │   └── Sidebar.jsx        # Sidebar (trending, cuaca, poling, newsletter)
│   ├── data/
│   │   └── newsData.js        # Dataset artikel, kategori, & komentar awal
│   ├── App.jsx            # Komponen utama & manajemen state global
│   ├── App.css            # Styling tambahan & animasi ticker
│   ├── index.css          # Konfigurasi Tailwind CSS
│   └── main.jsx           # Titik masuk aplikasi React
├── package.json           # Dependensi dan skrip npm
├── README.md              # Dokumentasi project (file ini)
└── vite.config.js         # Konfigurasi Vite
```

---

## ⚙️ Panduan Instalasi & Menjalankan (Local Setup)

Ikuti langkah-langkah berikut untuk menjalankan aplikasi secara lokal di komputer Anda:

1. **Clone repository ini dan pindah ke branch kelompok-1**:
   ```bash
   git clone <repository-url>
   cd mini-berita
   git checkout kelompok-1
   ```

2. **Install semua dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```

4. **Buka di browser**:
   Akses `http://localhost:5173` melalui browser Anda.

5. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

## 🤝 Pemenuhan Syarat Sosial (Social Requirements)

Sebagai bagian dari komitmen kaderisasi LDOP Rising Star 2026 HMIF ITERA, Kelompok 1 telah menunaikan syarat sosial:
- [x] **Follow GitHub Resmi HMIF ITERA** (`@hmif-itera`) oleh `mayleneee01`
- [x] **Follow LinkedIn Resmi HMIF ITERA** oleh anggota Kelompok 1

---

<div align="center">
  <p>Dibuat dengan ❤️ oleh Kelompok 1 (Username: mayleneee01) untuk LDOP Rising Star 2026 HMIF ITERA.</p>
</div>
