import React, { useState } from 'react';
import { Search, Bookmark, Sun, Moon, Newspaper, Menu, X, Globe, ExternalLink } from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  categories, 
  bookmarksCount, 
  onOpenBookmarks,
  darkMode,
  setDarkMode 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-200 border-b ${darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'} shadow-md`}>
      {/* Top Utility Bar */}
      <div className={`px-4 py-1.5 text-xs border-b flex flex-wrap justify-between items-center ${darkMode ? 'bg-black border-zinc-800/80 text-zinc-400' : 'bg-zinc-900 text-zinc-100 border-zinc-800'}`}>
        <div className="flex items-center space-x-4">
          <span className="font-bold text-red-500 flex items-center gap-1.5 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            LDOP RISING STAR 2026
          </span>
          <span className="hidden sm:inline text-zinc-500">|</span>
          <span className="hidden sm:inline text-zinc-300 font-medium">Kelompok 1 — Portal Berita Mini</span>
        </div>
        <div className="flex items-center space-x-3 font-medium">
          <a 
            href="https://github.com/hmif-itera" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-red-400 flex items-center gap-1 transition"
          >
            <Globe size={13} /> GitHub HMIF
          </a>
          <span className="text-zinc-600">•</span>
          <a 
            href="https://www.linkedin.com/company/himpunan-mahasiswa-informatika-itera" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-red-400 flex items-center gap-1 transition"
          >
            <ExternalLink size={13} /> LinkedIn HMIF
          </a>
        </div>
      </div>

      {/* Main Brand & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setSelectedCategory("Semua")}>
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-black rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Newspaper size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase font-serif flex items-center gap-2">
                ITERA <span className="text-red-600">NEWS</span>
              </h1>
              <p className="text-[11px] font-semibold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                Portal Informasi & Aspirasi Kampus
              </p>
            </div>
          </div>

          {/* Search Bar & Actions */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Cari berita, topik, atau riset..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-full text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-red-600 ${
                  darkMode 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:bg-black' 
                    : 'bg-zinc-100 border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:bg-white'
                }`}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Bookmarks Button */}
            <button
              onClick={onOpenBookmarks}
              className={`relative p-2.5 rounded-full border transition flex items-center gap-2 text-sm font-bold ${
                darkMode 
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white' 
                  : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200 hover:text-black'
              }`}
              title="Artikel Tersimpan"
            >
              <Bookmark size={18} className="text-red-600" />
              <span className="hidden sm:inline">Disimpan</span>
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition ${
                darkMode 
                  ? 'bg-zinc-900 border-zinc-800 text-yellow-400 hover:bg-zinc-800' 
                  : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
              }`}
              title="Ganti Tema"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full border border-zinc-300 dark:border-zinc-700"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <nav className="hidden md:flex items-center space-x-1 overflow-x-auto py-2.5 border-t border-zinc-200 dark:border-zinc-800 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : darkMode
                    ? 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 py-4 border-t space-y-4 ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-full text-sm border ${
                darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-100 border-zinc-200 text-black'
              }`}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white'
                    : darkMode ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-100 text-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
