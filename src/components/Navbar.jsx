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
    <header className={`sticky top-0 z-50 transition-colors duration-200 border-b ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-900'} shadow-sm`}>
      {/* Top Utility Bar */}
      <div className={`px-4 py-1.5 text-xs border-b flex flex-wrap justify-between items-center ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-400' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            LDOP RISING STAR 2026
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Kelompok 1 — Portal Berita Mini</span>
        </div>
        <div className="flex items-center space-x-3">
          <a 
            href="https://github.com/hmif-itera" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 transition"
          >
            <Globe size={13} /> GitHub HMIF
          </a>
          <span>•</span>
          <a 
            href="https://www.linkedin.com/company/himpunan-mahasiswa-informatika-itera" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 transition"
          >
            <ExternalLink size={13} /> LinkedIn HMIF
          </a>
        </div>
      </div>

      {/* Main Brand & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-600 text-white p-2 rounded-xl shadow-md flex items-center justify-center">
            <Newspaper size={26} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              ITERANEWS
            </h1>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
              Portal Berita Terkini & Terpercaya Civitas Akademika
            </p>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block w-64 lg:w-80">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari berita, topik, atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 text-sm rounded-full border transition focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          <button
            onClick={onOpenBookmarks}
            className={`relative p-2.5 rounded-full border transition flex items-center gap-1.5 text-xs font-semibold ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
            title="Artikel Tersimpan"
          >
            <Bookmark size={18} className="text-orange-600 dark:text-orange-400" />
            <span className="hidden sm:inline">Disimpan</span>
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {bookmarksCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-full border transition ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-yellow-400' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
            }`}
            title="Ubah Mode Tampilan"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <nav className={`border-t px-4 overflow-x-auto scrollbar-none ${darkMode ? 'border-gray-800 bg-gray-900/90' : 'border-gray-200 bg-white/90'}`}>
        <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-2 py-2.5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white shadow-md font-semibold'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-4 py-4 border-t ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 text-sm rounded-full border transition focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white font-semibold'
                    : darkMode
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
