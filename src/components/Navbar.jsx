import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bookmark, 
  Sun, 
  Moon, 
  Newspaper, 
  Menu, 
  X, 
  Sliders,
  KeyRound,
  UserCheck
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  categories, 
  bookmarksCount, 
  onOpenBookmarks,
  darkMode,
  setDarkMode,
  currentView,
  setCurrentView,
  authSession,
  onOpenAuthModal,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-200 border-b ${
      darkMode ? 'bg-zinc-950/95 border-zinc-800 text-zinc-100' : 'bg-white/95 border-zinc-200 text-zinc-900'
    } backdrop-blur-md shadow-sm`}>
      
      {/* Top Utility Bar */}
      <div className={`px-4 py-1.5 text-xs border-b flex flex-wrap justify-between items-center ${
        darkMode ? 'bg-black border-zinc-800 text-zinc-400' : 'bg-zinc-950 text-zinc-300 border-zinc-900'
      }`}>
        <div className="flex items-center space-x-3">
          <span className="font-black text-red-500 flex items-center gap-1.5 tracking-wider text-[11px] uppercase">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            LDOP RISING STAR 2026
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="hidden sm:inline text-zinc-300 font-medium">
            Kelompok 1 : Portal Berita Mini
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {authSession ? (
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600/20 text-red-400 border border-red-600/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Staf: {authSession.role.toUpperCase()}
              </span>
              <button
                onClick={onOpenAuthModal}
                className="text-zinc-300 hover:text-white transition font-medium text-[11px] flex items-center gap-1"
                title="Kelola Akses Staf"
              >
                <span>Kelola</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="text-zinc-400 hover:text-red-400 transition text-[11px] flex items-center gap-1 font-medium"
              title="Akses Staf Redaksi"
            >
              <KeyRound size={12} className="text-zinc-500" />
              <span className="hidden sm:inline">Staf Redaksi</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Branding: High Contrast Hitam Merah (Black & Red) */}
          <div 
            className="flex items-center space-x-3.5 cursor-pointer select-none group" 
            onClick={() => {
              if (setCurrentView) setCurrentView('portal');
              if (setSelectedCategory) setSelectedCategory('Semua');
            }}
            title="Kembali ke Beranda Berita"
          >
            {/* Black and Red Solid Emblem Badge with High Contrast */}
            <div className="relative w-9 h-9 sm:w-12 sm:h-12 bg-black border-2 border-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform shrink-0 ring-1 ring-black">
              <div className="absolute inset-0 bg-red-600/10 rounded-lg sm:rounded-xl pointer-events-none" />
              <Newspaper className="w-4 h-4 sm:w-6 sm:h-6 text-red-500 group-hover:text-red-400 transition-colors" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-red-600 rounded-full border-2 border-black" />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
                <span className="text-lg sm:text-2xl font-black tracking-tight font-serif text-zinc-950 dark:text-white [-webkit-text-stroke:0.5px_black]">
                  ITERA
                </span>
                <span className="text-lg sm:text-2xl font-black tracking-tight font-serif text-red-600 [-webkit-text-stroke:0.5px_black]">
                  NEWS
                </span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 mb-1 sm:mb-2"></span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase mt-0.5 sm:mt-1">
                Portal Berita Mahasiswa &bull; Kelompok 1
              </p>
            </div>
          </div>

          {/* Search Bar (Only shown in reader/portal mode on medium screens) */}
          {currentView === 'portal' && (
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Cari berita, riset, atau opini kampus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border transition-all focus:outline-none focus:ring-2 focus:ring-red-600 ${
                    darkMode 
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:bg-black' 
                      : 'bg-zinc-100 border-zinc-300 text-zinc-900 placeholder-zinc-500 focus:bg-white focus:border-red-600'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            
            {/* Authenticated Staff Access Control Button (HIDDEN FOR REGULAR PUBLIC READERS) */}
            {authSession && (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setCurrentView(currentView === 'admin' ? 'portal' : 'admin')}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition ${
                    currentView === 'admin'
                      ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/25'
                      : 'bg-zinc-950 border-zinc-900 text-white hover:bg-red-600 hover:border-red-600 dark:bg-zinc-900 dark:border-zinc-800'
                  }`}
                  title={currentView === 'admin' ? 'Kembali ke Portal Berita' : `Buka Panel ${authSession.role === 'admin' ? 'Admin' : 'Editor'}`}
                >
                  {currentView === 'admin' ? (
                    <>
                      <Newspaper size={14} />
                      <span className="hidden sm:inline">Portal Berita</span>
                    </>
                  ) : (
                    <>
                      <Sliders size={14} className="text-red-500" />
                      <span className="capitalize">Panel {authSession.role === 'admin' ? 'Admin' : 'Editor'}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Bookmarks Button (Only relevant for portal view) */}
            {currentView === 'portal' && (
              <button
                onClick={onOpenBookmarks}
                className={`relative p-2 sm:px-3 sm:py-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-bold ${
                  darkMode 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white' 
                    : 'bg-white border-zinc-300 text-zinc-800 hover:bg-red-50 hover:text-red-600 hover:border-red-300 shadow-sm'
                }`}
                title="Artikel Tersimpan"
              >
                <Bookmark size={15} className="text-red-600" />
                <span className="hidden sm:inline">Disimpan</span>
                {bookmarksCount > 0 && (
                  <span className="bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {bookmarksCount}
                  </span>
                )}
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition ${
                darkMode 
                  ? 'bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800' 
                  : 'bg-white border-zinc-300 text-zinc-800 hover:bg-zinc-100 shadow-sm'
              }`}
              title="Ganti Mode Gelap / Terang"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile menu hamburger button */}
            {currentView === 'portal' && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-xl border transition ${
                  darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200' : 'bg-white border-zinc-300 text-zinc-800 shadow-sm'
                }`}
                title="Buka Menu Navigasi"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Bar (In Portal view) */}
        {currentView === 'portal' && (
          <nav className="hidden md:flex items-center space-x-1.5 overflow-x-auto py-2.5 border-t border-zinc-100 dark:border-zinc-800/80 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                    : darkMode
                      ? 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                      : 'text-zinc-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Mobile Slide-Out Side Drawer */}
      {currentView === 'portal' && (
        <div 
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
            mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop overlay */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer panel sliding from right */}
          <div 
            className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-xs h-[100dvh] flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out border-l ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } ${
              darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            {/* Drawer Header - Kompak */}
            <div className={`p-3 border-b flex items-center justify-between ${
              darkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-50'
            }`}>
              <div className="flex items-center space-x-1.5">
                <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                  I
                </div>
                <div>
                  <h3 className="text-[11px] font-black tracking-wider uppercase leading-none">Menu Navigasi</h3>
                  <span className="text-[9px] text-zinc-400 font-medium">Portal Mini Berita</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`p-1 rounded-md border transition ${
                  darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white' : 'bg-white border-zinc-300 text-zinc-700 hover:text-black'
                }`}
                title="Tutup Menu"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Body - Semua konten terlihat tanpa scroll pada viewport standar, aman pada layar kecil */}
            <div className="p-3 space-y-2.5 flex-1 overflow-y-auto">
              {/* Search Bar */}
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-zinc-400">
                  <Search size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Cari berita atau topik..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-[11px] border ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500' : 'bg-zinc-100 border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              {/* Quick Actions (Bookmarks & Dark Mode) */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookmarks();
                  }}
                  className={`flex-1 px-2 py-1.5 rounded-lg border text-[11px] font-bold flex items-center justify-center gap-1 transition ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  <Bookmark size={12} className="text-red-600" />
                  <span>Disimpan</span>
                  {bookmarksCount > 0 && (
                    <span className="bg-red-600 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center ml-0.5">
                      {bookmarksCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`flex-1 px-2 py-1.5 rounded-lg border text-[11px] font-bold flex items-center justify-center gap-1 transition ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800' : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  {darkMode ? <Sun size={12} /> : <Moon size={12} />}
                  <span>{darkMode ? 'Terang' : 'Gelap'}</span>
                </button>
              </div>

              {/* Category selection - Grid kompak */}
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  Kategori
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-bold text-center transition ${
                        selectedCategory === cat
                          ? 'bg-red-600 text-white shadow-sm'
                          : darkMode 
                            ? 'bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800' 
                            : 'bg-zinc-100/70 text-zinc-800 hover:bg-zinc-200'
                      }`}
                      title={cat}
                    >
                      <span className="truncate block">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer (Auth & Staff Access) - Kompak */}
            <div className={`p-3 border-t space-y-2 ${
              darkMode ? 'border-zinc-800 bg-zinc-900/40' : 'border-zinc-200 bg-zinc-50/80'
            }`}>
              {authSession ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                      <UserCheck size={12} className="text-emerald-500" />
                      <span className="font-bold">Akses: {authSession.role}</span>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="px-1.5 py-0.5 text-[11px] text-red-600 font-bold hover:underline"
                    >
                      Keluar
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCurrentView('admin');
                    }}
                    className="w-full py-1.5 px-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Sliders size={12} />
                    <span>Panel Pengelola</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full py-1.5 px-2 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 text-center font-bold text-[11px] transition flex items-center justify-center gap-1"
                >
                  <KeyRound size={12} />
                  <span>Masuk Portal Staf</span>
                </button>
              )}

              <div className="text-[9px] text-center text-zinc-400 font-medium pt-1">
                Kelompok 1 &bull; LDOP 2026
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
