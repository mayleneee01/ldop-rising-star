export const initialNews = [
  {
    id: 1,
    title: "Mahasiswa Teknik Informatika ITERA Ciptakan Sistem Deteksi Dini Banjir Berbasis IoT & AI",
    category: "Kampus ITERA",
    excerpt: "Tim mahasiswa HMIF ITERA berhasil merancang alat pemantau tinggi muka air sungai berbasis Internet of Things (IoT) yang terintegrasi dengan kecerdasan buatan.",
    content: `Lampung Selatan - Mahasiswa Program Studi Teknik Informatika Institut Teknologi Sumatera (ITERA) kembali menorehkan prestasi gemilang melalui inovasi teknologi tepat guna. Tim yang dimotori oleh mahasiswa angkatan 2023 ini merancang sistem peringatan dini banjir mandiri yang diberi nama "HydroGuard-ITERA".

Sistem ini menggunakan mikrokontroler ESP32 dan sensor ultrasonik yang ditempatkan di beberapa titik aliran sungai rawan di sekitar kampus dan wilayah Lampung Selatan. Data ketinggian air dikirim secara real-time ke cloud server menggunakan protokol MQTT dan dianalisis menggunakan model machine learning sederhana untuk memprediksi potensi banjir dalam rentang waktu 2 jam ke depan.

"Latar belakang pembuatan alat ini adalah kepedulian kami terhadap bencana hidrometeorologi yang kerap terjadi saat musim penghujan. Kami ingin teknologi yang kami pelajari di perkuliahan benar-benar memberi dampak nyata bagi masyarakat," ujar ketua tim pengembang.

Rektor ITERA memberikan apresiasi tinggi atas inovasi ini dan berencana untuk mengintegrasikan HydroGuard ke dalam sistem tanggap darurat kampus serta bekerja sama dengan BPBD Provinsi Lampung.`,
    author: "Tim Jurnalis Kampus",
    authorRole: "Redaktur Teknologi ITERA",
    date: "05 November 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    likes: 142,
    comments: [
      { id: 1, user: "Budi Santoso", text: "Keren banget inovasinya! Semoga bisa segera dipasang di daerah langganan banjir." },
      { id: 2, user: "Siti Rahma", text: "Bangga jadi bagian dari civitas akademika ITERA. Sukses terus tim!" }
    ],
    trending: true,
    featured: true
  },
  {
    id: 2,
    title: "Pendaftaran LDOP Rising Star 2026 Resmi Dibuka: Tantang Diri Jadi Developer Handal",
    category: "Kampus ITERA",
    excerpt: "Kaderisasi tahunan HMIF ITERA kembali hadir dengan tantangan pembuatan portal web mini dan deployment cloud secara kolaboratif.",
    content: `Bandar Lampung - Himpunan Mahasiswa Informatika (HMIF) ITERA resmi membuka rangkaian kegiatan kaderisasi tahunan "LDOP Rising Star 2026". Kegiatan ini dirancang untuk mengasah kemampuan teknis dan kerja sama tim mahasiswa baru dalam membangun aplikasi web modern.

Dalam sambutannya, Ketua HMIF ITERA menekankan pentingnya kolaborasi, penguasaan Git workflow, serta standar penulisan kode yang baik. Setiap kelompok ditantang untuk memilih satu dari 15 tema yang tersedia, mulai dari portal berita mini hingga e-commerce dan sistem pemesanan lapangan.

"Tahun ini standarnya lebih menantang karena peserta wajib melakukan deployment publik, melengkapi dokumentasi README secara komprehensif, serta menerapkan prinsip UI/UX yang responsif," ungkap panitia pelaksana.

Antusiasme peserta terlihat sangat tinggi dengan terkumpulnya berbagai proposal tema di hari pertama pembukaan portal pengumpulan repository.`,
    author: "Panitia LDOP 2026",
    authorRole: "Divisi Pubdok HMIF",
    date: "04 November 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    likes: 98,
    comments: [
      { id: 1, user: "Zhico Apta Pradita", text: "Semangat untuk Kelompok 1! Kita pasti bisa menyelesaikannya dengan hasil terbaik." }
    ],
    trending: true,
    featured: false
  },
  {
    id: 3,
    title: "Perkembangan Artificial Intelligence di Tahun 2026: Agentic AI Mengubah Lanskap Industri Software",
    category: "Teknologi",
    excerpt: "Evolusi AI bergeser dari model tanya-jawab konvensional menuju agen otonom yang mampu merencanakan dan mengeksekusi tugas kompleks secara mandiri.",
    content: `Global - Teknologi kecerdasan buatan (AI) mengalami lompatan besar di tahun 2026. Fokus industri kini beralih ke "Agentic AI", sistem AI yang tidak hanya merespons prompt teks, melainkan dapat bertindak sebagai agen otonom untuk menyelesaikan alur kerja multi-langkah seperti debugging kode, analisis data finansial, hingga orkestrasi infrastruktur cloud.

Para ahli teknologi mencatat bahwa adopsi AI agent di perusahaan rintisan maupun korporasi multinasional telah meningkatkan produktivitas hingga 300%. Kendati demikian, tantangan terkait keamanan siber, prompt injection, dan tata kelola etis tetap menjadi topik utama pembahasan regulator global.

Bagi mahasiswa dan developer pemula, tren ini menuntut penguatan fundamental pemrograman, pemahaman arsitektur sistem, serta kemampuan berkolaborasi dengan asisten AI secara bijak dan produktif.`,
    author: "Dr. Arief Rahman, M.T.",
    authorRole: "Pengamat Teknologi & Dosen",
    date: "03 November 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    likes: 215,
    comments: [],
    trending: true,
    featured: false
  },
  {
    id: 4,
    title: "Tim Sepak Bola ITERA Juara 1 Turnamen Antar Perguruan Tinggi Regional Sumatra",
    category: "Olahraga",
    excerpt: "Menunjukkan taji di lapangan hijau, skuad mahasiswa ITERA sukses membungkam tuan rumah di partai final dramatis.",
    content: `Bandar Lampung - Kebanggaan kembali disumbangkan oleh kontingen atlet mahasiswa ITERA dalam ajang Pekan Olahraga Mahasiswa Regional Sumatra 2026. Tim sepak bola kampus oranye ini sukses mengukir sejarah dengan membawa pulang trofi juara pertama.

Pertandingan final yang digelar di Stadion Pahoman berlangsung sengit dan penuh drama jual-beli serangan. Berkat taktik cemerlang pelatih dan semangat juang tinggi para pemain, ITERA mengunci kemenangan dengan skor tipis 2-1 hingga peluit panjang dibunyikan.

Rektor dan seluruh civitas akademika menyambut kedatangan para atlet dengan suka cita di Gedung Kuliah Umum (GKU) ITERA. Prestasi ini membuktikan bahwa mahasiswa ITERA tidak hanya unggul di bidang akademik dan sains, tetapi juga berprestasi di kancah olahraga regional.`,
    author: "Rian Hidayat",
    authorRole: "Jurnalis Olahraga",
    date: "02 November 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    likes: 87,
    comments: [],
    trending: false,
    featured: false
  },
  {
    id: 5,
    title: "Tips & Trik Produktif Kuliah Sambil Mengikuti Organisasi dan Freelance Coding",
    category: "Gaya Hidup",
    excerpt: "Manajemen waktu adalah kunci utama agar IPK tetap cemerlang tanpa harus mengorbankan pengalaman organisasi dan portofolio proyek.",
    content: `Kampus - Menjadi mahasiswa rumpun sains dan teknologi seringkali mendatangkan tantangan tersendiri dalam membagi waktu antara jadwal kuliah yang padat, tugas praktikum, kepengurusan himpunan, dan proyek sampingan (freelance).

Berikut adalah beberapa tips praktis agar tetap produktif dan terhindar dari burnout:
1. **Gunakan Time Boxing & Calendar:** Catat seluruh jadwal kuliah dan deadline tugas menggunakan aplikasi digital.
2. **Prioritaskan Tugas dengan Matriks Eisenhower:** Bedakan antara hal yang mendesak dan penting.
3. **Manfaatkan Teknik Pomodoro:** Belajar fokus 25 menit diselingi istirahat 5 menit untuk menjaga energi tetap prima.
4. **Jaga Kesehatan Mental & Fisik:** Jangan lupa tidur cukup dan berolahraga rutin.

Dengan manajemen waktu yang disiplin, mahasiswa dapat lulus tepat waktu dengan portofolio karier yang matang sebelum diwisuda.`,
    author: "Dian Permatasari, M.Psi.",
    authorRole: "Konselor & Penulis",
    date: "01 November 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    likes: 130,
    comments: [],
    trending: false,
    featured: false
  },
  {
    id: 6,
    title: "Pemerintah Provinsi Lampung Dorong Kolaborasi Startup Lokal dengan Kampus",
    category: "Nasional",
    excerpt: "Inisiatif digitalisasi daerah terus digalakkan melalui program inkubasi bisnis bersama perguruan tinggi di Provinsi Lampung.",
    content: `Bandar Lampung - Pemerintah Provinsi Lampung melalui Dinas Komunikasi dan Informatika terus mendorong pertumbuhan ekosistem startup digital lokal. Langkah strategis ini diwujudkan melalui kerja sama pentahelix, melibatkan unsur pemerintah, akademisi, pelaku industri, media, dan komunitas.

Dalam forum diskusi yang diadakan di Bandar Lampung, para pelaku usaha rintisan teknologi memaparkan berbagai solusi inovatif untuk sektor pertanian, pariwisata, dan UMKM. Kehadiran kampus seperti ITERA dan Unila dinilai sangat krusial sebagai sumber talenta digital berbakat.

"Kami optimistis talenta muda Lampung memiliki potensi besar untuk menjadi motor penggerak ekonomi digital nasional di masa depan," ujar Kepala Dinas Kominfo Lampung.`,
    author: "Redaksi Nasional",
    authorRole: "Wartawan Senior",
    date: "31 Oktober 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    likes: 76,
    comments: [],
    trending: false,
    featured: false
  }
];

export const categories = [
  "Semua",
  "Kampus ITERA",
  "Teknologi",
  "Nasional",
  "Olahraga",
  "Gaya Hidup",
  "Opini"
];
