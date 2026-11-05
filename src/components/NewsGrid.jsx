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
        <div className={`text-center py-16 rounded-3xl border ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'}`}>
          <p className="text-lg font-bold">Tidak ada artikel yang ditemukan.</p>
          <p className="text-xs text-zinc-400 mt-1">Coba kata kunci lain atau pilih kategori yang berbeda di atas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const isBookmarked = bookmarks.includes(article.id);
            return (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className={`group cursor-pointer rounded-3xl border overflow-hidden shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100 hover:border-red-600/50' : 'bg-white border-zinc-200 text-zinc-900 hover:border-red-600/50'
                }`}
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                        {article.category}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(article.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                        isBookmarked 
                          ? 'bg-red-600 text-white shadow-md' 
                          : 'bg-black/50 text-white hover:bg-black/80'
                      }`}
                    >
                      <Bookmark size={15} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center space-x-3 text-[11px] text-zinc-400 mb-2">
                      <span className="flex items-center gap-1 font-medium"><User size={12} className="text-red-500" /> {article.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {article.date}</span>
                    </div>

                    <h3 className="font-serif font-bold text-base leading-snug group-hover:text-red-500 transition line-clamp-2 mb-2.5">
                      {article.title}
                    </h3>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className={`px-5 py-3.5 border-t flex items-center justify-between text-xs font-semibold ${
                  darkMode ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-zinc-100 bg-zinc-50'
                }`}>
                  <div className="flex items-center space-x-3 text-zinc-400">
                    <span className="flex items-center gap-1 hover:text-red-500 transition"><Heart size={13} fill="currentColor" className="text-red-600" /> {article.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={13} /> {article.comments.length}</span>
                  </div>
                  <span className="text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                    Baca <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
