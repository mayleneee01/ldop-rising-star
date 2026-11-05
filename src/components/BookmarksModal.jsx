import React from 'react';
import { X, Bookmark, Trash2 } from 'lucide-react';
import { getCategoryTheme } from '../utils/categoryTheme';

export default function BookmarksModal({ isOpen, onClose, bookmarks, articles, onSelectArticle, onToggleBookmark, darkMode }) {
  if (!isOpen) return null;

  const bookmarkedArticles = articles.filter(art => bookmarks.includes(art.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl overflow-y-auto border flex flex-col ${
          darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-red-100 text-zinc-900 shadow-red-500/10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
          darkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/95 border-red-100'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600/10 text-red-600 dark:text-red-400 rounded-xl">
              <Bookmark size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Artikel Tersimpan</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{bookmarkedArticles.length} artikel dalam daftar bacaan Anda</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 rounded-xl border transition ${
              darkMode 
                ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white' 
                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-red-600/10 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <Bookmark size={28} />
              </div>
              <h3 className="font-bold text-base">Belum Ada Artikel Disimpan</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Klik ikon bookmark pada artikel apa pun di halaman utama untuk menyimpannya dan dibaca kembali nanti.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map(article => (
              <div 
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className={`group cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-md flex items-center justify-between gap-4 ${
                  darkMode ? 'bg-zinc-900 border-zinc-800 hover:border-red-600/50' : 'bg-white border-red-100 hover:border-red-600/50 shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <img src={article.image} alt={article.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${getCategoryTheme(article.category).text}`}>
                      {article.category}
                    </span>
                    <h4 className="text-xs font-bold truncate group-hover:text-red-500 transition mt-0.5">
                      {article.title}
                    </h4>
                    <span className="text-[10px] text-zinc-400 mt-1 block">{article.date}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(article.id);
                    }}
                    className="p-2 text-zinc-400 hover:text-red-600 transition rounded-xl hover:bg-red-600/10"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
