import React from 'react';
import { X, Bookmark, Clock, ArrowRight } from 'lucide-react';

export default function BookmarksModal({ isOpen, onClose, bookmarks, articles, onSelectArticle, darkMode }) {
  if (!isOpen) return null;

  const bookmarkedArticles = articles.filter(a => bookmarks.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`relative w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl overflow-y-auto border flex flex-col ${
          darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`sticky top-0 z-20 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
          darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'
        }`}>
          <div className="flex items-center space-x-2">
            <Bookmark className="text-orange-600" size={20} fill="currentColor" />
            <h3 className="text-lg font-black">Artikel Tersimpan ({bookmarkedArticles.length})</h3>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full border transition ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Bookmark size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-base font-semibold">Belum ada artikel yang disimpan.</p>
              <p className="text-xs text-gray-500 mt-1">Klik ikon bookmark pada artikel untuk menyimpannya ke daftar bacaan Anda.</p>
            </div>
          ) : (
            bookmarkedArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className={`group cursor-pointer p-4 rounded-2xl border transition hover:shadow-md flex gap-4 items-center ${
                  darkMode ? 'bg-gray-800/50 border-gray-700 hover:border-orange-500' : 'bg-gray-50 border-gray-200 hover:border-orange-300'
                }`}
              >
                <img src={article.image} alt={article.title} className="w-20 h-20 object-cover rounded-xl shrink-0" />
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                      {article.category}
                    </span>
                    <h4 className={`text-sm font-bold line-clamp-2 mt-0.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition ${
                      darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {article.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2">
                    <span className="flex items-center gap-1"><Clock size={12} /> {article.date}</span>
                    <span className="text-orange-600 dark:text-orange-400 font-semibold flex items-center gap-1">
                      Baca <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
