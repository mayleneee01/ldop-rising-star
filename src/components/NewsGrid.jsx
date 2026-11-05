import React from 'react';
import { Clock, User, Bookmark, Heart, MessageSquare, ArrowRight } from 'lucide-react';

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
      <div className="flex items-center justify-between border-b pb-3 border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">
            {selectedCategory === "Semua" ? "Berita Terbaru" : `Kategori: ${selectedCategory}`}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Menampilkan {filteredArticles.length} artikel pilihan untuk Anda
          </p>
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className={`text-center py-16 rounded-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <p className="text-lg font-semibold text-gray-500">Tidak ada artikel yang ditemukan.</p>
          <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain atau pilih kategori yang berbeda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const isBookmarked = bookmarks.includes(article.id);
            return (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all hover:shadow-xl flex flex-col justify-between ${
                  darkMode ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-orange-300'
                }`}
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-orange-600 text-white text-[11px] font-bold rounded-full shadow-md uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(article.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                        isBookmarked ? 'bg-orange-600 text-white' : 'bg-black/50 text-white hover:bg-black/70'
                      }`}
                    >
                      <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center space-x-3 text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1"><Clock size={13} /> {article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className={`text-base font-bold leading-snug line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition ${
                      darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mt-2 font-normal">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className={`px-5 py-4 border-t flex items-center justify-between text-xs ${
                  darkMode ? 'border-gray-800 bg-gray-950/50' : 'border-gray-100 bg-gray-50/50'
                }`}>
                  <span className="font-medium text-gray-600 dark:text-gray-300 truncate max-w-[140px]">
                    ✍️ {article.author}
                  </span>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <span className="flex items-center gap-1 hover:text-red-500 transition">
                      <Heart size={14} className="text-red-500" /> {article.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} /> {article.comments.length}
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
