import React from 'react';
import { Clock, User, Bookmark, Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { getCategoryTheme } from '../utils/categoryTheme';

export default function NewsGrid({ articles, selectedCategory, searchQuery, onSelectArticle, bookmarks, onToggleBookmark, darkMode }) {
  // Filter by category & search query
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "Semua" || article.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-3 border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-black tracking-tight uppercase font-serif flex items-center gap-2">
            <span className="w-3 h-3 bg-red-600 rounded-sm"></span>
            {selectedCategory === "Semua" ? "Berita & Artikel Terbaru" : `Kategori: ${selectedCategory}`}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Menampilkan {filteredArticles.length} artikel pilihan untuk Anda
          </p>
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className={`text-center py-16 rounded-3xl border ${
          darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-red-100 text-zinc-700 shadow-sm'
        }`}>
          <p className="text-lg font-bold">Tidak ada artikel yang ditemukan.</p>
          <p className="text-xs text-zinc-400 mt-1">Coba kata kunci lain atau pilih kategori yang berbeda di atas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredArticles.map((article) => {
            const isBookmarked = bookmarks.includes(article.id);
            const theme = getCategoryTheme(article.category);
            return (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className={`group cursor-pointer rounded-2xl md:rounded-3xl border overflow-hidden shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 flex flex-row md:flex-col justify-between p-3 md:p-0 gap-3 md:gap-0 ${
                  darkMode 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-100 hover:border-red-600/50' 
                    : 'bg-white border-red-100 text-zinc-900 hover:border-red-600/50 shadow-red-500/5'
                }`}
              >
                {/* Image Section */}
                <div className="relative w-28 h-24 sm:w-36 sm:h-28 md:w-full md:h-48 shrink-0 rounded-xl md:rounded-none overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {/* Desktop Category badge */}
                  <div className="hidden md:block absolute top-3 left-3">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full shadow-md border backdrop-blur-md ${theme.badge}`}>
                      {article.category}
                    </span>
                  </div>
                  {/* Desktop Bookmark button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(article.id);
                    }}
                    className={`hidden md:block absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                      isBookmarked 
                        ? 'bg-red-600 text-white shadow-md' 
                        : 'bg-black/50 text-white hover:bg-black/80'
                    }`}
                    title={isBookmarked ? "Hapus dari Simpanan" : "Simpan Artikel"}
                  >
                    <Bookmark size={15} fill={isBookmarked ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 md:p-5">
                  <div>
                    {/* Mobile Category & Bookmark Row */}
                    <div className="flex md:hidden items-center justify-between mb-1">
                      <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded border ${theme.badge}`}>
                        {article.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(article.id);
                        }}
                        className={`p-1 rounded-full transition ${isBookmarked ? 'text-red-600' : 'text-zinc-400 hover:text-red-600'}`}
                        title={isBookmarked ? "Hapus dari Simpanan" : "Simpan Artikel"}
                      >
                        <Bookmark size={13} fill={isBookmarked ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center space-x-1.5 text-[10px] md:text-[11px] text-zinc-400 mb-1 md:mb-2">
                      <span className="flex items-center gap-1 font-medium truncate max-w-[110px] md:max-w-none">
                        <User size={11} className="text-red-500 shrink-0" /> {article.author}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Clock size={11} /> {article.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-bold text-xs sm:text-sm md:text-base leading-snug group-hover:text-red-600 transition line-clamp-2 mb-1 md:mb-2.5">
                      {article.title}
                    </h3>

                    {/* Excerpt (hidden on mobile to keep box a compact rectangle) */}
                    <p className="hidden md:line-clamp-3 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Mobile mini bottom row */}
                  <div className="flex md:hidden items-center justify-between text-[10px] text-zinc-400 pt-1 mt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-center space-x-2.5">
                      <span className="flex items-center gap-1 text-red-600 font-medium">
                        <Heart size={11} fill="currentColor" /> {article.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={11} /> {article.comments.length}
                      </span>
                    </div>
                    <span className="text-red-600 dark:text-red-400 font-bold flex items-center gap-0.5">
                      Baca <ArrowRight size={11} />
                    </span>
                  </div>

                  {/* Desktop full bottom row */}
                  <div className={`hidden md:flex px-5 py-3.5 border-t items-center justify-between text-xs font-semibold -mx-5 -mb-5 mt-auto ${
                    darkMode ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-red-50 bg-red-50/30'
                  }`}>
                    <div className="flex items-center space-x-3 text-zinc-400">
                      <span className="flex items-center gap-1 hover:text-red-500 transition">
                        <Heart size={13} fill="currentColor" className="text-red-600" /> {article.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={13} /> {article.comments.length}
                      </span>
                    </div>
                    <span className="text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                      Baca <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
