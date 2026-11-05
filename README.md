# Portal Berita Mini (Mini News Portal) - Kelompok 1

Repository ini dibuat untuk memenuhi penugasan **LDOP Rising Star 2026 Kaderisasi HMIF ITERA**.

---

## Identitas Kelompok & Proyek

| Atribut             | Keterangan                                       |
| :------------------ | :----------------------------------------------- |
| **Tema Proyek**     | **Portal Berita Mini** (_Mini News Portal_)      |
| **Kelompok**        | **Kelompok 1**                                   |
| **Ketua**           | Muhammad Arya Wisma Nur Susanto (125140046)      |
| **Pendamping**      | Najib Abhinaya                                   |
| **Mentor**          | Cania Febrianti                                  |
| **Palet Desain UI** | Merah Putih (_Editorial Red & White_)            |
| **Identitas Logo**  | Hitam Merah (_High-Contrast Black & Red Emblem_) |
| **Tech Stack**      | React.js, Tailwind CSS, LocalStorage API         |

---

## **Struktur Tim & Pembagian Tugas**

### **Kepemimpinan**

| Nama | NIM | Peran | Tanggung Jawab |
| :--- | :--- | :--- | :--- |
| **Muhammad Arya Wisma Nur Susanto** | 125140046 | **Ketua Tim** | - Koordinasi keseluruhan proyek<br>- Quality assurance<br>- Final review implementasi |

### **UI/UX Design Team**

| Nama | NIM | Kontribusi |
| :--- | :--- | :--- |
| **Sulis Nurbaiti** | 125140008 | - Wireframing & visual design |
| **Aydilla Safitri** | 125140010 | - Color palette & branding |
| **Chelsea Izza Nayara** | 125140016 | - Responsive layout design |
| **Asiah** | 125140021 | - Mobile-first optimization |
| **Zahra Salsabila** | 125140177 | - UX flow & interaction design |

### **Frontend Development Team**

| Nama | NIM | Komponen & Fitur |
| :--- | :--- | :--- |
| **Salma Afiifah Putri** | 125140026 | - Navbar & responsive navigation<br>- Dark/light mode toggle |
| **Mentari Sihombing** | 125140031 | - HeroSection & featured articles<br>- Breaking news ticker |
| **Rifqi Al Fikri** | 125140039 | - NewsGrid & category filtering<br>- Search functionality |
| **Raden Roro Ayu Mutiara Insan Kamil** | 125140045 | - ArticleModal & reader interface<br>- Comments & likes system |
| **Anugrah Tsani Abiyyu Rafazi** | 125140131 | - Sidebar widgets<br>- Weather component & polling system |

### **Backend & Logic Team**

| Nama | NIM | Sistem & Data |
| :--- | :--- | :--- |
| **Rafky Subhan Kamil Nasution** | 125140067 | - Bookmarks system & localStorage<br>- User session management |
| **Ahmad Fahmi Muhajir** | 125140199 | - AdminPanel & CRUD operations<br>- Role-based access control |
| **Zhico Apta Pradita** | 125140030 | - Authentication system<br>- Data validation & error handling |

---

### **Anggota Kelompok (14 Orang)**
1. **Muhammad Arya Wisma Nur Susanto** (125140046) - Ketua Tim
2. **Sulis Nurbaiti** (125140008) - UI/UX Design
3. **Aydilla Safitri** (125140010) - UI/UX Design
4. **Chelsea Izza Nayara** (125140016) - UI/UX Design
5. **Asiah** (125140021) - UI/UX Design
6. **Salma Afiifah Putri** (125140026) - Frontend Development
7. **Mentari Sihombing** (125140031) - Frontend Development
8. **Rifqi Al Fikri** (125140039) - Frontend Development
9. **Raden Roro Ayu Mutiara Insan Kamil** (125140045) - Frontend Development
10. **Rafky Subhan Kamil Nasution** (125140067) - Backend & Logic
11. **Anugrah Tsani Abiyyu Rafazi** (125140131) - Frontend Development
12. **Zahra Salsabila** (125140177) - UI/UX Design
13. **Ahmad Fahmi Muhajir** (125140199) - Backend & Logic
14. **Zhico Apta Pradita** (125140030) - Backend & Logic

### **Pembimbing & Pengarah**

- **Pendamping**: Najib Abhinaya
- **Mentor**: Cania Febrianti

---

## Tentang Project

**Portal Berita Mini** adalah aplikasi web berita interaktif, responsif, dan modern yang dirancang khusus untuk civitas akademika ITERA dan publik luas. Aplikasi ini menyajikan jurnalisme terkurasi dalam tema visual **Merah Putih** dengan logo berkarakter **Hitam Merah**, palet aksen multi-kategori cerah, serta dilengkapi **Portal Redaksi & Admin Tersembunyi (Hidden Staff Access)** dengan otentikasi kredensial berbasis teks string (_Role-Based Access Control_).

### Fitur Unggulan

1. **Logo Hitam Merah & Tema Merah Putih Kontras Tinggi**:
   - Lambang emblem heksagonal "ITERA" warna hitam pekat dengan aksen merah cerah dan teks pelengkap berdefinisi tinggi.
   - Tetap terbaca tajam dan elegan di kedua mode tampilan (_Light Mode_ dan _Dark Mode_).
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
     - Kampus ITERA: Merah (_Red_)
     - Teknologi: Biru Langit (_Sky_)
     - Nasional: Nila (_Indigo_)
     - Olahraga: Zamrud (_Emerald_)
     - Gaya Hidup: Kuning Kunyit (_Amber_)
     - Opini: Lembayung (_Violet_)
     - Akademik: Mawar (_Rose_)
     - Riset: Hijau Biru (_Teal_)
     - Prestasi: Biru (_Blue_)
5. **Kilas Berita (Breaking News Ticker)**:
   - Baris informasi singkat berjalan (_animated marquee_) yang menyajikan topik terhangat secara real-time.
6. **Hero & Featured Section**:
   - Sorotan berita utama (_Lead Story_) dengan tata letak visual editorial prestisius disertai dua artikel pendamping yang sedang tren.
7. **Filter & Pencarian Real-Time**:
   - Filter instan berdasarkan kategori dan pencarian dinamis berdasarkan judul, kutipan, maupun nama penulis.
8. **Article Reader Modal**:
   - Pengalaman membaca artikel detail dilengkapi foto resolusi tinggi, metadata lengkap, sistem like interaktif, dan formulir kirim komentar langsung.
9. **Bookmarks Manager**:
   - Simpan artikel favorit ke dalam daftar bacaan pribadi (tersimpan otomatis di _LocalStorage_).
10. **Widget Samping (Sidebar)**:
    - Berita Terpopuler (_Trending Articles_).
    - Widget Cuaca Kampus ITERA.
    - Poling Aspirasi Mahasiswa dengan visualisasi bar persentase hasil suara langsung.
    - Formulir Berlangganan Newsletter.
11. **Bebas Emoji & Bebas Em-Dash**:
    - Disusun dengan kepatuhan mutlak tanpa emoji maupun karakter em-dash pada seluruh kode, teks antarmuka, komponen, dan dataset.

---

## Matriks Hak Akses (Role-Based Access Control)

| Fitur / Tindakan            | Administrator (`admin2026`) | Editor (`editor2026`) | Pengunjung Publik |
| :-------------------------- | :-------------------------: | :-------------------: | :---------------: |
| Membaca Berita & Kategori   |             Ya              |          Ya           |        Ya         |
| Bookmark, Like, & Komentar  |             Ya              |          Ya           |        Ya         |
| Mengisi Poling Mahasiswa    |             Ya              |          Ya           |        Ya         |
| Akses Dashboard Redaksi     |             Ya              |          Ya           |       Tidak       |
| Tambah, Edit, Hapus Artikel |             Ya              |          Ya           |       Tidak       |
| Toggle Utama & Trending     |             Ya              |          Ya           |       Tidak       |
| Tambah & Hapus Kategori     |             Ya              | Dibatasi (Read-only)  |       Tidak       |
| Moderasi & Hapus Komentar   |             Ya              |          Ya           |       Tidak       |
| Sunting Pertanyaan Poling   |             Ya              | Dibatasi (Read-only)  |       Tidak       |
| Reset Suara Poling          |             Ya              |  Dibatasi (Terkunci)  |       Tidak       |
| Reset Data ke Default       |             Ya              |  Dibatasi (Terkunci)  |       Tidak       |

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

## **Timeline Pengembangan**

### **Phase 1: Planning & Design (Minggu 1)**

- **Wireframing** & konsep desain
- **Color palette** merah-putih & branding
- **Struktur komponen** React
- **Database design** (newsData.js)

### **Phase 2: Core Implementation (Minggu 2)**

- **Setup project** React + Vite + Tailwind
- **Navbar** dengan dark mode toggle
- **HeroSection** & breaking news ticker
- **NewsGrid** dengan kategori filtering
- **ArticleModal** dengan sistem komentar
- **Sidebar** widgets (trending, polling, newsletter)

### **Phase 3: Advanced Features (Minggu 3)**

- **Bookmarks system** dengan localStorage
- **AdminPanel** dengan role-based access
- **Authentication system** (admin2026, editor2026)
- **Mobile optimization** & responsive design
- **Performance optimization**

### **Phase 4: Deployment & Documentation (Minggu 4)**

- **Final testing** & bug fixes
- **Build production** (`npm run build`)
- **Documentation** & README update
- **Git workflow** & branch management

---

## **Git Workflow & Branch Strategy**

### **Branch Structure:**

```
main
└── kelompok-1 (development branch)
    ├── feature/navbar-responsive
    ├── feature/mobile-drawer
    ├── feature/admin-panel
    └── bugfix/performance-optimization
```

### **Commit Guidelines:**

```
feat: add mobile drawer without scroll
fix: responsive card layout on mobile
refactor: optimize category grid layout
docs: update README with team structure
style: adjust mobile padding and spacing
```

### **Development Process:**

1. **Clone repository:**

   ```bash
   git clone https://github.com/mayleneee01/ldop-rising-star.git
   cd ldop-rising-star
   git checkout kelompok-1
   ```

2. **Create feature branch:**

   ```bash
   git checkout -b kelompok-1
   ```

3. **Commit changes:**

   ```bash
   git add .
   git commit -m "feat: [descriptive message]"
   ```

4. **Push to remote:**

   ```bash
   git push origin kelompok-1
   ```

5. **Create Pull Request** di GitHub : Merge ke `kelompok-1`

---

## **Deployment Checklist**

### **Pre-deployment:**

- [ ] `npm run build` sukses tanpa error
- [ ] **Mobile testing** di berbagai device sizes
- [ ] **Dark mode** berfungsi di semua komponen
- [ ] **Bookmarks** tersimpan dengan benar
- [ ] **Admin access** bekerja sesuai role

### **Post-deployment:**

- [ ] **Verify GitHub Pages** atau hosting
- [ ] **Test semua user flows**
- [ ] **Documentation** lengkap
- [ ] **Backup data** lokal jika diperlukan

---

## **Contact & Support**

### **Tim Pengembangan:**

- **Ketua:** Muhammad Arya Wisma Nur Susanto (125140046)
- **Frontend Lead:** Salma Afiifah Putri (125140026)
- **UI/UX Lead:** Sulis Nurbaiti (125140008)
- **Backend Lead:** Rafky Subhan Kamil Nasution (125140067)

### **Repository:**

- **URL:** https://github.com/mayleneee01/ldop-rising-star
- **Branch:** `kelompok-1`
- **Live Demo:** (https://ldop.vercel.app/)

---

**LDOP Rising Star 2026 - Himpunan Mahasiswa Informatika (HMIF) Institut Teknologi Sumatera (ITERA)**
Dibuat oleh **Kelompok 1** dengan pembagian peran UI/UX, Frontend, dan Backend.
