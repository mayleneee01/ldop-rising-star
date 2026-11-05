import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderPlus, 
  MessageSquare, 
  Vote, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Heart, 
  CheckCircle2, 
  Search, 
  X, 
  ArrowLeft, 
  Star, 
  RotateCcw,
  ShieldCheck,
  Tag,
  Save,
  Lock,
  UserCheck,
  LogOut
} from 'lucide-react';
import { getCategoryTheme } from '../utils/categoryTheme';

export default function AdminPanel({
  articles,
  categories,
  onAddArticle,
  onCreateArticle,
  onUpdateArticle,
  onDeleteArticle,
  onResetData,
  onAddCategory,
  onDeleteCategory,
  onDeleteComment,
  pollData,
  poll,
  onUpdatePoll,
  onResetPoll,
  onBackToPortal,
  darkMode,
  authSession,
  onLogout,
  onOpenAuthModal
}) {
  const currentPoll = pollData || poll;
  const handleAddOrCreateArticle = onAddArticle || onCreateArticle;
  const role = authSession?.role || 'admin';
  const isAdmin = role === 'admin';
  const isEditor = role === 'editor';

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'articles', 'categories', 'comments', 'poll'
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [newCatInput, setNewCatInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Form State for Article Modal
  const [formData, setFormData] = useState({
    title: '',
    category: 'Kampus ITERA',
    excerpt: '',
    content: '',
    author: isEditor ? 'Editor Redaksi' : 'Zhico Apta Pradita (Admin)',
    authorRole: isEditor ? 'Redaktur Berita' : 'Lead Reporter Kelompok 1',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    trending: false
  });

  // Poll Form State
  const [pollForm, setPollForm] = useState({
    question: currentPoll?.question || 'Apakah fasilitas Wi-Fi kampus ITERA sudah memenuhi kebutuhan praktikum daring?',
    opt1Text: currentPoll?.options?.[0]?.text || 'Sangat Memadai',
    opt2Text: currentPoll?.options?.[1]?.text || 'Perlu Peningkatan Kecepatan'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Metrics calculation
  const stats = useMemo(() => {
    const totalArticles = articles.length;
    const totalViews = articles.reduce((acc, curr) => acc + (curr.views || 0), 0);
    const totalLikes = articles.reduce((acc, curr) => acc + (curr.likes || 0), 0);
    const totalComments = articles.reduce((acc, curr) => acc + (curr.comments?.length || 0), 0);
    const featuredCount = articles.filter(a => a.featured).length;
    const trendingCount = articles.filter(a => a.trending).length;
    return { totalArticles, totalViews, totalLikes, totalComments, featuredCount, trendingCount };
  }, [articles]);

  // Filtered articles in admin table
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchSearch = art.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          art.author.toLowerCase().includes(searchFilter.toLowerCase());
      const matchCategory = categoryFilter === 'Semua' || art.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [articles, searchFilter, categoryFilter]);

  // Aggregate all comments for moderation
  const allComments = useMemo(() => {
    const list = [];
    articles.forEach(art => {
      if (art.comments && Array.isArray(art.comments)) {
        art.comments.forEach(c => {
          list.push({
            articleId: art.id,
            articleTitle: art.title,
            commentId: c.id,
            user: c.user,
            text: c.text,
            time: c.time || 'Baru saja'
          });
        });
      }
    });
    return list;
  }, [articles]);

  const handleOpenCreateModal = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      category: categories[1] || 'Kampus ITERA',
      excerpt: '',
      content: '',
      author: isEditor ? 'Editor Redaksi' : 'Zhico Apta Pradita (Admin)',
      authorRole: 'Lead Reporter Kelompok 1',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      trending: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title || '',
      category: article.category || 'Kampus ITERA',
      excerpt: article.excerpt || '',
      content: article.content || '',
      author: article.author || 'Tim Redaksi',
      authorRole: article.authorRole || 'Redaktur',
      readTime: article.readTime || '3 min read',
      image: article.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
      featured: Boolean(article.featured),
      trending: Boolean(article.trending)
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.excerpt.trim()) {
      alert('Judul dan ringkasan artikel wajib diisi.');
      return;
    }

    if (editingArticle) {
      onUpdateArticle(editingArticle.id, formData);
      showToast('Artikel berhasil diperbarui.');
    } else {
      if (handleAddOrCreateArticle) {
        handleAddOrCreateArticle({
          ...formData,
          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
          likes: 0,
          views: 1,
          comments: []
        });
      }
      showToast('Artikel baru berhasil diterbitkan.');
    }
    setIsModalOpen(false);
  };

  const handleDeleteArticleClick = (id, title) => {
    if (isEditor) {
      alert('Peran Editor tidak memiliki izin menghapus artikel. Silakan hubungi Administrator.');
      return;
    }
    if (window.confirm(`Yakin ingin menghapus artikel: "${title}"?`)) {
      onDeleteArticle(id);
      showToast('Artikel berhasil dihapus.');
    }
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (isEditor) {
      alert('Penambahan kategori baru hanya dapat dilakukan oleh Administrator.');
      return;
    }
    const trimmed = newCatInput.trim();
    if (!trimmed) return;
    if (categories.map(c => c.toLowerCase()).includes(trimmed.toLowerCase())) {
      alert('Kategori tersebut sudah ada.');
      return;
    }
    if (onAddCategory) {
      onAddCategory(trimmed);
      setNewCatInput('');
      showToast(`Kategori "${trimmed}" berhasil ditambahkan.`);
    }
  };

  const handleDeleteCategoryClick = (catName) => {
    if (isEditor) {
      alert('Penghapusan kategori hanya dapat dilakukan oleh Administrator.');
      return;
    }
    if (catName === 'Semua') {
      alert('Kategori "Semua" adalah kategori sistem dan tidak dapat dihapus.');
      return;
    }
    const count = articles.filter(a => a.category === catName).length;
    if (count > 0) {
      if (!window.confirm(`Masih terdapat ${count} artikel dengan kategori "${catName}". Tetap hapus kategori ini?`)) {
        return;
      }
    }
    if (onDeleteCategory) {
      onDeleteCategory(catName);
      showToast(`Kategori "${catName}" telah dihapus.`);
    }
  };

  const handleSavePoll = (e) => {
    e.preventDefault();
    if (isEditor) {
      alert('Pengaturan poling hanya dapat dimodifikasi oleh Administrator.');
      return;
    }
    if (!onUpdatePoll) return;
    const baseOptions = currentPoll?.options || [
      { id: 'opt1', text: pollForm.opt1Text, votes: 0 },
      { id: 'opt2', text: pollForm.opt2Text, votes: 0 }
    ];
    onUpdatePoll({
      question: pollForm.question,
      options: [
        { ...baseOptions[0], text: pollForm.opt1Text },
        { ...baseOptions[1], text: pollForm.opt2Text }
      ]
    });
    showToast('Konfigurasi poling berhasil disimpan.');
  };

  // Image Presets for Quick Selection
  const imagePresets = [
    { label: 'Kampus & Riset', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Teknologi & AI', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Coding & Mahasiswa', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Olahraga & Turnamen', url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Gaya Hidup & Buku', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 pb-20 ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center space-x-2 animate-fadeIn font-semibold text-sm">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header of Admin Panel */}
      <div className={`border-b sticky top-0 z-40 backdrop-blur-md ${darkMode ? 'bg-zinc-900/95 border-zinc-800' : 'bg-white/95 border-zinc-200 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToPortal}
              className="p-2 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 flex items-center space-x-1.5 transition text-xs font-bold"
              title="Kembali ke Tampilan Pembaca"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">Portal Berita</span>
            </button>
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
            <div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                  isAdmin ? 'bg-red-600 text-white' : 'bg-black text-white border border-red-600 dark:bg-zinc-900'
                }`}>
                  {isAdmin ? 'ADMINISTRATOR' : 'EDITOR REDAKSI'}
                </span>
                <h1 className="text-base sm:text-lg font-black tracking-tight flex items-center space-x-1">
                  <span>{isAdmin ? 'Panel Administrasi' : 'Ruang Kerja'}</span>
                  <span className="text-red-600">{isAdmin ? 'Portal Berita' : 'Editor'}</span>
                </h1>
              </div>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">
                LDOP Rising Star 2026 : Kelompok 1 (User: {authSession?.user || authSession?.username || (isAdmin ? 'Zhico Apta Pradita' : 'Editor Redaksi')})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {onOpenAuthModal && (
              <button
                onClick={onOpenAuthModal}
                className="px-2.5 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 flex items-center space-x-1.5 transition"
                title="Ganti Peran Staf"
              >
                <UserCheck size={14} className="text-red-600" />
                <span className="hidden md:inline">Ganti Peran</span>
              </button>
            )}

            {onLogout && (
              <button
                onClick={() => {
                  if (window.confirm('Keluar dari sesi staff redaksi?')) {
                    onLogout();
                    if (onBackToPortal) onBackToPortal();
                  }
                }}
                className="px-2.5 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30 text-[11px] font-bold flex items-center space-x-1.5 transition"
                title="Keluar dari Panel Redaksi"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}

            <button
              onClick={handleOpenCreateModal}
              className="btn-red-primary text-xs py-2 px-3.5 flex items-center space-x-1.5 shadow-md shadow-red-600/20"
            >
              <Plus size={15} />
              <span className="font-bold">Tulis Artikel</span>
            </button>
          </div>
        </div>

        {/* Role restriction banner for Editor */}
        {isEditor && (
          <div className="bg-zinc-900 text-zinc-200 border-t border-b border-red-600/40 px-4 py-2 text-[11px] flex items-center justify-between">
            <div className="max-w-7xl mx-auto w-full flex items-center space-x-2">
              <ShieldCheck size={14} className="text-red-500 shrink-0" />
              <span>
                <strong>Mode Editor Aktif :</strong> Anda dapat menerbitkan dan memperbarui artikel. Fitur penghapusan artikel, penambahan kategori, poling, dan reset sistem hanya dapat diakses oleh Administrator.
              </span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 overflow-x-auto scrollbar-none border-t border-zinc-100 dark:border-zinc-800/80 pt-2 pb-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition shrink-0 ${
              activeTab === 'dashboard'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-zinc-600 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            <LayoutDashboard size={15} />
            <span>Ringkasan Statistik</span>
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition shrink-0 ${
              activeTab === 'articles'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-zinc-600 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            <FileText size={15} />
            <span>Kelola Artikel ({articles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition shrink-0 ${
              activeTab === 'categories'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-zinc-600 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            <FolderPlus size={15} />
            <span>Kelola Kategori ({categories.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition shrink-0 ${
              activeTab === 'comments'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-zinc-600 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            <MessageSquare size={15} />
            <span>Moderasi Komentar ({allComments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('poll')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition shrink-0 ${
              activeTab === 'poll'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-zinc-600 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-zinc-800'
            }`}
          >
            <Vote size={15} />
            <span>Pengaturan Poling</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: DASHBOARD STATS */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-5 rounded-2xl border shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Artikel</span>
                  <div className="p-2 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-xl">
                    <FileText size={18} />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white font-serif">{stats.totalArticles}</div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  {stats.featuredCount} Berita Utama &bull; {stats.trendingCount} Trending
                </div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Pembaca</span>
                  <div className="p-2 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-xl">
                    <Eye size={18} />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white font-serif">{stats.totalViews.toLocaleString('id-ID')}</div>
                <div className="text-[11px] text-zinc-500 mt-1">Akumulasi kunjungan pembaca</div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Suka</span>
                  <div className="p-2 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-xl">
                    <Heart size={18} />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white font-serif">{stats.totalLikes.toLocaleString('id-ID')}</div>
                <div className="text-[11px] text-zinc-500 mt-1">Interaksi pembaca pada artikel</div>
              </div>

              <div className={`p-5 rounded-2xl border shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Komentar Masuk</span>
                  <div className="p-2 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-xl">
                    <MessageSquare size={18} />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white font-serif">{stats.totalComments}</div>
                <div className="text-[11px] text-zinc-500 mt-1">Aspirasi pembaca yang terdata</div>
              </div>
            </div>

            {/* Middle Section: Quick Breakdown and Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Category Breakdown */}
              <div className={`p-6 rounded-2xl border shadow-sm lg:col-span-2 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <div className="flex items-center justify-between mb-4 border-b pb-3 border-zinc-200 dark:border-zinc-800">
                  <h3 className="font-black text-sm uppercase tracking-wider flex items-center space-x-2">
                    <Tag size={16} className="text-red-600" />
                    <span>Distribusi Artikel Berdasarkan Kategori</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('categories')}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    Kelola Kategori
                  </button>
                </div>
                <div className="space-y-3">
                  {categories.filter(c => c !== 'Semua').map(cat => {
                    const count = articles.filter(a => a.category === cat).length;
                    const percent = articles.length > 0 ? Math.round((count / articles.length) * 100) : 0;
                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{cat}</span>
                          <span className="text-zinc-500">{count} artikel ({percent}%)</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-red-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Info & Reset Card */}
              <div className={`p-6 rounded-2xl border shadow-sm space-y-5 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <h3 className="font-black text-sm uppercase tracking-wider flex items-center space-x-2 border-b pb-3 border-zinc-200 dark:border-zinc-800">
                  <ShieldCheck size={16} className="text-red-600" />
                  <span>Informasi Sistem</span>
                </h3>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Administrator Utama</span>
                    <span className="font-bold">Zhico Apta Pradita (125140030)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Kelompok</span>
                    <span className="font-bold">Kelompok 1 (14 Anggota)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Pendamping</span>
                    <span className="font-bold">Najib Abhinaya</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Mentor</span>
                    <span className="font-bold">Cania Febrianti</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500">Penyimpanan</span>
                    <span className="font-bold text-green-600">LocalStorage Aktif</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (!isAdmin) {
                        alert('Akses Ditolak: Fitur reset data ke standar awal hanya dapat dilakukan oleh Administrator.');
                        return;
                      }
                      if (window.confirm('Apakah Anda yakin ingin mereset seluruh data artikel dan komentar ke kondisi awal?')) {
                        onResetData();
                        showToast('Data artikel berhasil di-reset ke kondisi awal.');
                      }
                    }}
                    disabled={!isAdmin}
                    className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition ${
                      !isAdmin
                        ? 'border-zinc-300 text-zinc-400 bg-zinc-100 dark:border-zinc-800 dark:text-zinc-600 dark:bg-zinc-900/60 cursor-not-allowed'
                        : 'border-red-300 text-red-600 hover:bg-red-50 active:bg-red-100 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-950/20'
                    }`}
                    title={!isAdmin ? 'Hanya Administrator yang memiliki wewenang reset data' : 'Reset Data ke Standar Awal'}
                  >
                    {!isAdmin ? <Lock size={14} /> : <RotateCcw size={14} />}
                    <span>Reset Data {!isAdmin ? '(Khusus Administrator)' : 'ke Standar Awal'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Quick Articles List */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className="flex items-center justify-between mb-4 border-b pb-3 border-zinc-200 dark:border-zinc-800">
                <h3 className="font-black text-sm uppercase tracking-wider flex items-center space-x-2">
                  <Star size={16} className="text-red-600" />
                  <span>Daftar Artikel Terbaru</span>
                </h3>
                <button
                  onClick={() => setActiveTab('articles')}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Buka Manajemen Artikel Lengkap
                </button>
              </div>

              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {articles.slice(0, 5).map(art => (
                  <div key={art.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <img src={art.image} alt={art.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      <div className="overflow-hidden">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600">{art.category}</span>
                        <h4 className="text-xs font-bold truncate max-w-md">{art.title}</h4>
                        <div className="text-[10px] text-zinc-400">{art.date} &bull; {art.author}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => handleOpenEditModal(art)}
                        className="p-1.5 rounded-lg border hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                        title="Edit Artikel"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteArticleClick(art.id, art.title)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/20"
                        title="Hapus Artikel"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARTICLE CRUD MANAGEMENT */}
        {activeTab === 'articles' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter and Search Bar */}
            <div className={`p-4 rounded-2xl border shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Cari judul atau penulis..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                />
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className={`px-3 py-2 rounded-xl text-xs border font-medium focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <button
                  onClick={handleOpenCreateModal}
                  className="btn-red-primary text-xs py-2 px-3.5 flex items-center space-x-1.5 shrink-0"
                >
                  <Plus size={15} />
                  <span>Tambah Artikel</span>
                </button>
              </div>
            </div>

            {/* Articles List: Dual View (Mobile Cards & Desktop Table) */}
            <div className={`rounded-2xl border overflow-hidden shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              
              {/* MOBILE CARDS VIEW (< md) */}
              <div className="block md:hidden divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-10 px-4 text-zinc-400 text-xs">
                    Tidak ada artikel yang cocok dengan filter.
                  </div>
                ) : (
                  filteredArticles.map(art => {
                    const theme = getCategoryTheme(art.category);
                    return (
                      <div key={art.id} className="p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <img 
                            src={art.image} 
                            alt={art.title} 
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-zinc-200 dark:border-zinc-800" 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${theme.badge}`}>
                                {art.category}
                              </span>
                              {art.featured && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-red-600 text-white uppercase">
                                  Utama
                                </span>
                              )}
                              {art.trending && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-zinc-900 text-white dark:bg-zinc-700 uppercase">
                                  Trending
                                </span>
                              )}
                            </div>
                            <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 line-clamp-2">
                              {art.title}
                            </h4>
                            <p className="text-[10px] text-zinc-400 mt-0.5">
                              Oleh {art.author} &bull; {art.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                          <div className="flex items-center space-x-3 text-[11px] text-zinc-500">
                            <span className="flex items-center gap-1"><Eye size={12} /> {art.views}</span>
                            <span className="flex items-center gap-1 text-red-600"><Heart size={12} /> {art.likes}</span>
                            <span className="flex items-center gap-1"><MessageSquare size={12} /> {art.comments?.length || 0}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleOpenEditModal(art)}
                              className="px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[11px] font-bold text-zinc-700 dark:text-zinc-200 flex items-center space-x-1"
                              title="Edit Artikel"
                            >
                              <Edit3 size={13} />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteArticleClick(art.id, art.title)}
                              className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold flex items-center space-x-1 ${
                                isEditor
                                  ? 'border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-600 opacity-60'
                                  : 'border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30'
                              }`}
                              title={isEditor ? 'Editor tidak memiliki wewenang menghapus artikel' : 'Hapus Artikel'}
                            >
                              <Trash2 size={13} />
                              <span>Hapus</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* DESKTOP TABLE VIEW (>= md) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className={`border-b font-black uppercase tracking-wider text-[10px] ${
                    darkMode ? 'bg-zinc-950/60 border-zinc-800 text-zinc-400' : 'bg-red-50/60 border-zinc-200 text-zinc-600'
                  }`}>
                    <tr>
                      <th className="py-3 px-4">Artikel</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Penulis & Tanggal</th>
                      <th className="py-3 px-4 text-center">Interaksi</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {filteredArticles.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-zinc-400">
                          Tidak ada artikel yang cocok dengan filter.
                        </td>
                      </tr>
                    ) : (
                      filteredArticles.map(art => {
                        const theme = getCategoryTheme(art.category);
                        return (
                          <tr key={art.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition">
                            <td className="py-3 px-4 max-w-xs">
                              <div className="flex items-center space-x-3">
                                <img src={art.image} alt={art.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                <div>
                                  <h4 className="font-bold line-clamp-1 text-zinc-900 dark:text-zinc-100">{art.title}</h4>
                                  <p className="text-[10px] text-zinc-400 line-clamp-1">{art.excerpt}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${theme.badge}`}>
                                {art.category}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-semibold text-zinc-800 dark:text-zinc-200">{art.author}</div>
                              <div className="text-[10px] text-zinc-400">{art.date}</div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center space-x-3 text-zinc-500 text-[11px]">
                                <span title="Pembaca" className="flex items-center gap-1">
                                  <Eye size={12} /> {art.views}
                                </span>
                                <span title="Suka" className="flex items-center gap-1 text-red-600">
                                  <Heart size={12} /> {art.likes}
                                </span>
                                <span title="Komentar" className="flex items-center gap-1">
                                  <MessageSquare size={12} /> {art.comments?.length || 0}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                {art.featured && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-600 text-white" title="Berita Utama">
                                    Utama
                                  </span>
                                )}
                                {art.trending && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-zinc-900 text-white dark:bg-zinc-700" title="Trending">
                                    Trending
                                  </span>
                                )}
                                {!art.featured && !art.trending && (
                                  <span className="text-[10px] text-zinc-400">Standar</span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => handleOpenEditModal(art)}
                                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                title="Edit Artikel"
                              >
                                <Edit3 size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteArticleClick(art.id, art.title)}
                                className={`p-1.5 rounded-lg border ${
                                  isEditor 
                                    ? 'border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-600 cursor-not-allowed'
                                    : 'border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30'
                                }`}
                                title={isEditor ? 'Editor tidak memiliki wewenang menghapus artikel' : 'Hapus Artikel'}
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORY MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {/* Add Category Card */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <h3 className="font-black text-sm uppercase tracking-wider flex items-center space-x-2 border-b pb-3 border-zinc-200 dark:border-zinc-800 mb-4">
                <FolderPlus size={16} className="text-red-600" />
                <span>Tambah Kategori Baru</span>
              </h3>

              {isEditor ? (
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 text-xs text-zinc-500 space-y-2">
                  <div className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-300 font-bold">
                    <Lock size={14} className="text-red-600" />
                    <span>Akses Terbatas Editor</span>
                  </div>
                  <p>
                    Penambahan dan penghapusan kategori artikel merupakan wewenang Administrator.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddCategorySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      Nama Kategori
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Beasiswa, Pengabdian..."
                      value={newCatInput}
                      onChange={(e) => setNewCatInput(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!newCatInput.trim()}
                    className="btn-red-primary w-full text-xs py-2.5 flex items-center justify-center space-x-1.5"
                  >
                    <Plus size={15} />
                    <span>Tambahkan Kategori</span>
                  </button>
                </form>
              )}
            </div>

            {/* Existing Categories List */}
            <div className={`p-6 rounded-2xl border shadow-sm md:col-span-2 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className="flex items-center justify-between border-b pb-3 border-zinc-200 dark:border-zinc-800 mb-4">
                <h3 className="font-black text-sm uppercase tracking-wider flex items-center space-x-2">
                  <Tag size={16} className="text-red-600" />
                  <span>Daftar Kategori Aktif ({categories.length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map(cat => {
                  const count = articles.filter(a => a.category === cat).length;
                  const isSystem = cat === 'Semua';
                  const theme = getCategoryTheme(cat);
                  return (
                    <div 
                      key={cat} 
                      className={`p-3.5 rounded-xl border flex items-center justify-between ${
                        darkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${theme.dot}`} />
                        <div>
                          <div className="font-bold text-xs flex items-center space-x-2">
                            <span>{cat}</span>
                            {isSystem && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400">
                                Sistem
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-zinc-400 mt-0.5">{count} artikel terhubung</div>
                        </div>
                      </div>

                      {!isSystem && isAdmin && (
                        <button
                          onClick={() => handleDeleteCategoryClick(cat)}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/20"
                          title="Hapus Kategori"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMMENT MODERATION */}
        {activeTab === 'comments' && (
          <div className="space-y-6 animate-fadeIn">
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className="flex items-center justify-between border-b pb-3 border-zinc-200 dark:border-zinc-800 mb-6">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider flex items-center space-x-2">
                    <MessageSquare size={16} className="text-red-600" />
                    <span>Daftar Komentar Pembaca</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Pantau dan hapus komentar spam atau tidak pantas</p>
                </div>
                <span className="text-xs font-bold text-zinc-500">Total: {allComments.length} Komentar</span>
              </div>

              {allComments.length === 0 ? (
                <div className="text-center py-12 text-zinc-400">
                  Belum ada komentar pembaca yang masuk pada seluruh artikel.
                </div>
              ) : (
                <div className="space-y-3">
                  {allComments.map((com) => (
                    <div 
                      key={`${com.articleId}-${com.commentId}`} 
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        darkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="font-bold text-red-600">{com.user}</span>
                          <span className="text-zinc-400">&bull;</span>
                          <span className="text-zinc-400">{com.time}</span>
                        </div>
                        <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                          "{com.text}"
                        </p>
                        <div className="text-[11px] text-zinc-400 pt-1">
                          Pada artikel: <span className="font-semibold text-zinc-600 dark:text-zinc-300">"{com.articleTitle}"</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Hapus komentar dari "${com.user}"?`)) {
                            onDeleteComment(com.articleId, com.commentId);
                            showToast('Komentar berhasil dihapus.');
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30 text-xs font-bold flex items-center space-x-1.5 shrink-0 self-start sm:self-auto"
                      >
                        <Trash2 size={13} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: POLL SETTINGS */}
        {activeTab === 'poll' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <h3 className="font-black text-sm uppercase tracking-wider flex items-center space-x-2 border-b pb-3 border-zinc-200 dark:border-zinc-800 mb-6">
                <Vote size={16} className="text-red-600" />
                <span>Pengaturan Poling Mahasiswa ITERA</span>
              </h3>

              {isEditor && (
                <div className="mb-5 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 text-xs text-zinc-500 space-y-1">
                  <div className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-300 font-bold">
                    <Lock size={14} className="text-red-600" />
                    <span>Mode Tinjauan Editor (Hanya Baca)</span>
                  </div>
                  <p>
                    Editor dapat meninjau statistik poling mahasiswa, namun konfigurasi pertanyaan dan reset suara hanya dapat diubah oleh Administrator.
                  </p>
                </div>
              )}

              <form onSubmit={handleSavePoll} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Pertanyaan Poling
                  </label>
                  <textarea
                    rows={3}
                    disabled={isEditor}
                    value={pollForm.question}
                    onChange={(e) => setPollForm({ ...pollForm, question: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      isEditor ? 'opacity-70 cursor-not-allowed bg-zinc-100 dark:bg-zinc-950' : ''
                    } ${
                      darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      Label Opsi 1
                    </label>
                    <input
                      type="text"
                      disabled={isEditor}
                      value={pollForm.opt1Text}
                      onChange={(e) => setPollForm({ ...pollForm, opt1Text: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        isEditor ? 'opacity-70 cursor-not-allowed bg-zinc-100 dark:bg-zinc-950' : ''
                      } ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                    <div className="text-[10px] text-zinc-400 mt-1">
                      Perolehan suara saat ini: {pollData?.options?.[0]?.votes || 0} suara
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      Label Opsi 2
                    </label>
                    <input
                      type="text"
                      disabled={isEditor}
                      value={pollForm.opt2Text}
                      onChange={(e) => setPollForm({ ...pollForm, opt2Text: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                        isEditor ? 'opacity-70 cursor-not-allowed bg-zinc-100 dark:bg-zinc-950' : ''
                      } ${
                        darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                      }`}
                    />
                    <div className="text-[10px] text-zinc-400 mt-1">
                      Perolehan suara saat ini: {pollData?.options?.[1]?.votes || 0} suara
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isEditor}
                    className={`text-xs py-2.5 px-5 flex items-center justify-center space-x-2 font-bold ${
                      isEditor 
                        ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed rounded-xl' 
                        : 'btn-red-primary'
                    }`}
                  >
                    <Save size={15} />
                    <span>{isEditor ? 'Simpan Poling (Khusus Admin)' : 'Simpan Pengaturan Poling'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isEditor}
                    onClick={() => {
                      if (!isAdmin) {
                        alert('Akses Ditolak: Hanya Administrator yang dapat mereset suara poling.');
                        return;
                      }
                      if (window.confirm('Reset hitungan suara poling menjadi 0?')) {
                        onResetPoll();
                        showToast('Hitungan suara poling telah di-reset ke 0.');
                      }
                    }}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition ${
                      isEditor
                        ? 'border-zinc-200 dark:border-zinc-800 text-zinc-400 cursor-not-allowed bg-zinc-100 dark:bg-zinc-950'
                        : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    <RotateCcw size={14} />
                    <span>Reset Perolehan Suara</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* ARTICLE CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className={`relative w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto border flex flex-col ${
              darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            {/* Modal Header */}
            <div className={`sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
              darkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/90 border-zinc-200'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-xl">
                  {editingArticle ? <Edit3 size={18} /> : <Plus size={18} />}
                </div>
                <div>
                  <h2 className="text-base font-black tracking-tight">
                    {editingArticle ? 'Edit Artikel Berita' : 'Tambah Artikel Berita Baru'}
                  </h2>
                  <p className="text-[11px] text-zinc-400">
                    Isi detail informasi artikel di bawah ini
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Judul Artikel <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan judul artikel yang menarik..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Kategori <span className="text-red-600">*</span></label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}
                  >
                    {categories.filter(c => c !== 'Semua').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Estimasi Waktu Baca</label>
                  <input
                    type="text"
                    placeholder="Contoh: 3 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Penulis</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Peran / Jabatan Penulis</label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">URL Gambar Sampul</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                />
                {/* Image presets */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  <span className="text-[10px] text-zinc-400 font-semibold mr-1">Preset Cepat:</span>
                  {imagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className="px-2 py-0.5 rounded-md border text-[10px] font-semibold hover:border-red-500 hover:text-red-600 transition"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Ringkasan (Excerpt) <span className="text-red-600">*</span></label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan singkat artikel untuk preview di kartu..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Konten Lengkap Berita</label>
                <textarea
                  rows={6}
                  placeholder="Tuliskan isi berita lengkap di sini..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600 font-mono text-[11px] ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                />
              </div>

              <div className="p-3.5 rounded-xl border flex flex-wrap items-center gap-6 bg-red-50/50 dark:bg-zinc-900 border-red-100 dark:border-zinc-800">
                <label className="flex items-center space-x-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span>Jadikan Berita Utama (Featured Lead Story)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.trending}
                    onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <span>Tandai sebagai Trending</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-red-primary px-6 py-2"
                >
                  {editingArticle ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
