# Portal Berita Mini (Mini News Portal) - Kelompok 1

Repository ini dibuat untuk memenuhi penugasan **LDOP Rising Star 2026 Kaderisasi HMIF ITERA**.

---

## Identitas Kelompok & Proyek

| Atribut | Keterangan |
| :--- | :--- |
| **Tema Proyek** | **Portal Berita Mini** (*Mini News Portal*) |
| **Kelompok** | **Kelompok 1** |
| **Administrator** | Zhico Apta Pradita (125140030) |
| **Pendamping** | Najib Abhinaya |
| **Mentor** | Cania Febrianti |
| **Palet Desain UI** | Merah Putih (*Editorial Red & White*) |
| **Identitas Logo** | Hitam Merah (*High-Contrast Black & Red Emblem*) |

---

## Susunan Tim Kelompok 1

### Administrator
- **Zhico Apta Pradita** (NIM: 125140030) - Administrator

### Editor Redaksi
1. **Sulis Nurbaiti** (NIM: 125140008) - Editor
2. **Aydilla Safitri** (NIM: 125140010) - Editor
3. **Chelsea Izza Nayara** (NIM: 125140016) - Editor
4. **Asiah** (NIM: 125140021) - Editor
5. **Salma Afiifah Putri** (NIM: 125140026) - Editor
6. **Mentari Sihombing** (NIM: 125140031) - Editor
7. **Rifqi Al Fikri** (NIM: 125140039) - Editor
8. **Raden Roro Ayu Mutiara Insan Kamil** (NIM: 125140045) - Editor
9. **Muhammad Arya Wisma Nur Susanto** (NIM: 125140046) - Editor
10. **Rafky Subhan Kamil Nasution** (NIM: 125140067) - Editor
11. **Anugrah Tsani Abiyyu Rafazi** (NIM: 125140131) - Editor
12. **Zahra Salsabila** (NIM: 125140177) - Editor
13. **Ahmad Fahmi Muhajir** (NIM: 125140199) - Editor

### Pembimbing & Pengarah
- **Pendamping**: Najib Abhinaya
- **Mentor**: Cania Febrianti

---

## Tentang Project

**Portal Berita Mini** adalah aplikasi web berita interaktif, responsif, dan modern yang dirancang khusus untuk civitas akademika ITERA dan publik luas. Aplikasi ini menyajikan jurnalisme terkurasi dalam tema visual **Merah Putih** dengan logo berkarakter **Hitam Merah**, palet aksen multi-kategori cerah, serta dilengkapi **Portal Redaksi & Admin Tersembunyi (Hidden Staff Access)** dengan otentikasi kredensial berbasis teks string (*Role-Based Access Control*).

### Fitur Unggulan

1. **Logo Hitam Merah & Tema Merah Putih Kontras Tinggi**:
   - Lambang emblem heksagonal "ITERA" warna hitam pekat dengan aksen merah cerah dan teks pelengkap berdefinisi tinggi.
   - Tetap terbaca tajam dan elegan di kedua mode tampilan (*Light Mode* dan *Dark Mode*).
2. **Akses Staf Tersembunyi & Kredensial String**:
   - Navbar publik tidak menampilkan tombol login admin yang mencolok agar tampilan pembaca tetap bersih dan profesional.
   - Pintu masuk redaksi diakses melalui:
     - Tautan rahasia "Akses Redaksi" pada footer halaman.
     - Pintasan keyboard global: `Ctrl + Shift + A` (atau `Cmd + Shift + A` di macOS).
   - Otentikasi berbasis teks string:
     - **Administrator**: `admin2026` (Akses penuh: kelola artikel, kategori, moderasi komentar, edit poling, dan reset data).
     - **Editor**: `editor2026` (Akses redaksional: tulis, sunting, dan hapus artikel berita; dibatasi dari manajemen kategori, konfigurasi poling, dan reset data).
   - Dilengkapi kartu informasi kredensial instan (quick-fill) pada modal otentikasi untuk kemudahan penilaian dan pengujian.
3. **Desain Mobile-First & Responsif Menyeluruh**:
   - Seluruh komponen (Navbar, Ticker, Hero Section, Grid Berita, Sidebar, Modal Baca, Bookmarks, dan Panel Admin) teroptimasi penuh untuk perangkat smartphone, tablet, maupun desktop.
   - Panel Admin menyediakan tampilan kartu adaptif di layar sempit (< 768px) dan tampilan tabel komprehensif di layar lebar.
4. **Palet Aksen Kategori Diperluas**:
   - Selain fondasi merah-putih-hitam, setiap kategori berita memiliki tema warna pembeda tersendiri:
     - Kampus ITERA: Merah (*Red*)
     - Teknologi: Biru Langit (*Sky*)
     - Nasional: Nila (*Indigo*)
     - Olahraga: Zamrud (*Emerald*)
     - Gaya Hidup: Kuning Kunyit (*Amber*)
     - Opini: Lembayung (*Violet*)
     - Akademik: Mawar (*Rose*)
     - Riset: Hijau Biru (*Teal*)
     - Prestasi: Biru (*Blue*)
5. **Kilas Berita (Breaking News Ticker)**:
   - Baris informasi singkat berjalan (*animated marquee*) yang menyajikan topik terhangat secara real-time.
6. **Hero & Featured Section**:
   - Sorotan berita utama (*Lead Story*) dengan tata letak visual editorial prestisius disertai dua artikel pendamping yang sedang tren.
7. **Filter & Pencarian Real-Time**:
   - Filter instan berdasarkan kategori dan pencarian dinamis berdasarkan judul, kutipan, maupun nama penulis.
8. **Article Reader Modal**:
   - Pengalaman membaca artikel detail dilengkapi foto resolusi tinggi, metadata lengkap, sistem like interaktif, dan formulir kirim komentar langsung.
9. **Bookmarks Manager**:
   - Simpan artikel favorit ke dalam daftar bacaan pribadi (tersimpan otomatis di *LocalStorage*).
10. **Widget Samping (Sidebar)**:
    - Berita Terpopuler (*Trending Articles*).
    - Widget Cuaca Kampus ITERA.
    - Poling Aspirasi Mahasiswa dengan visualisasi bar persentase hasil suara langsung.
    - Formulir Berlangganan Newsletter.
11. **Bebas Emoji & Bebas Em-Dash**:
    - Disusun dengan kepatuhan mutlak tanpa emoji maupun karakter em-dash pada seluruh kode, teks antarmuka, komponen, dan dataset.

---

## Matriks Hak Akses (Role-Based Access Control)

| Fitur / Tindakan | Administrator (`admin2026`) | Editor (`editor2026`) | Pengunjung Publik |
| :--- | :---: | :---: | :---: |
| Membaca Berita & Kategori | Ya | Ya | Ya |
| Bookmark, Like, & Komentar | Ya | Ya | Ya |
| Mengisi Poling Mahasiswa | Ya | Ya | Ya |
| Akses Dashboard Redaksi | Ya | Ya | Tidak |
| Tambah, Edit, Hapus Artikel | Ya | Ya | Tidak |
| Toggle Utama & Trending | Ya | Ya | Tidak |
| Tambah & Hapus Kategori | Ya | Dibatasi (Read-only) | Tidak |
| Moderasi & Hapus Komentar | Ya | Ya | Tidak |
| Sunting Pertanyaan Poling | Ya | Dibatasi (Read-only) | Tidak |
| Reset Suara Poling | Ya | Dibatasi (Terkunci) | Tidak |
| Reset Data ke Default | Ya | Dibatasi (Terkunci) | Tidak |

---

## Tech Stack

- **Framework**: React.js 19 (Vite)
- **Styling**: Tailwind CSS (dengan `darkMode: 'class'`)
- **Icons**: Lucide React (Vector SVG Icons)
- **State & Storage**: React Hooks (`useState`, `useEffect`, `useMemo`) + LocalStorage API

---

## Struktur Direktori Kode

```text
mini-berita/
├── public/                # Aset publik & favicon
├── src/
│   ├── assets/            # Gambar dan aset grafis
│   ├── components/        # Komponen UI modular
│   │   ├── AdminPanel.jsx     # Panel manajemen redaksi (CRUD, stats, poll, moderation, dual view)
│   │   ├── ArticleModal.jsx   # Modal baca artikel detail & komentar
│   │   ├── AuthModal.jsx      # Modal otentikasi staf (admin2026 & editor2026)
│   │   ├── BookmarksModal.jsx # Modal daftar artikel tersimpan
│   │   ├── BreakingTicker.jsx # Berita berjalan (ticker)
│   │   ├── Footer.jsx         # Footer portal berita & trigger portal staf
│   │   ├── HeroSection.jsx    # Sorotan berita utama & tren
│   │   ├── Navbar.jsx         # Bar navigasi, logo kontras tinggi, pencarian & sesi staf
│   │   ├── NewsGrid.jsx       # Grid artikel berita & filter kategori
│   │   └── Sidebar.jsx        # Sidebar (trending, cuaca, poling, newsletter)
│   ├── data/
│   │   └── newsData.js        # Dataset artikel, kategori, & komentar awal
│   ├── utils/
│   │   └── categoryTheme.js   # Utilitas pemetaan tema warna aksen kategori
│   ├── App.jsx            # Komponen utama & router state (Portal, Admin, Auth Modal)
│   ├── App.css            # Styling animasi pendukung
│   ├── index.css          # Konfigurasi Tailwind CSS & utility classes
│   ├── main.jsx           # Entry point aplikasi
├── index.html             # Dokumen HTML utama
├── package.json           # Dependensi project
├── tailwind.config.js     # Konfigurasi Tailwind CSS
└── vite.config.js         # Konfigurasi bundler Vite
```

---

## Panduan Menjalankan Project

1. **Clone repository dan checkout branch**:
   ```bash
   git checkout kelompok-1
   ```

2. **Instalasi dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:5173` pada peramban Anda.

4. **Akses Portal Staf / Redaksi**:
   - Tekan tombol kombinasi `Ctrl + Shift + A` (atau `Cmd + Shift + A` pada Mac).
   - Atau scroll ke footer bawah halaman dan klik tautan **Akses Redaksi**.
   - Masukkan kata sandi akses:
     - Administrator: `admin2026`
     - Editor: `editor2026`
   - Klik **Masuk ke Sistem**.

5. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

**LDOP Rising Star 2026 - Himpunan Mahasiswa Informatika (HMIF) Institut Teknologi Sumatera (ITERA)**
Dibuat oleh Kelompok 1.
