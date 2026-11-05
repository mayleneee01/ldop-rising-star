import React from 'react';
import { Clock, User, ArrowRight, Bookmark, Heart } from 'lucide-react';

export default function HeroSection({ articles, onSelectArticle, bookmarks, onToggleBookmark, darkMode }) {
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const subArticles = articles.filter(a => a.id !== featuredArticle.id && a.trending).slice(0, 2);

  if (!featuredArticle) return null;

  const isBookmarked = bookmarks.includes(featuredArticle.id);

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Lead Story */}
        <div 
          onClick={() => onSelectArticle(featuredArticle)}
          className={`lg:col-span-2 group cursor-pointer relative rounded-3xl overflow-hidden border shadow-lg transition-all hover:shadow-2xl flex flex-col justify-end ${
            darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          <div className="relative h-80 sm:h-[420px] w-full overflow-hidden">
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-5 left-5 z-10">
              <span className="px-3.5 py-1.5 bg-red-600 text-white text-xs font-black rounded-full shadow-lg uppercase tracking-wider">
                {featuredArticle.category}
              </span>
            </div>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(featuredArticle.id);
              }}
              className={`absolute top-5 right-5 z-10 p-2.5 rounded-full backdrop-blur-md transition ${
                isBookmarked 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'bg-black/50 text-white hover:bg-black/80'
              }`}
              title={isBookmarked ? "Hapus dari Simpanan" : "Simpan Artikel"}
            >
              <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
            </button>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 text-white">
              <div className="flex items-center space-x-4 text-xs font-medium text-zinc-300 mb-2">
                <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <User size={13} className="text-red-400" /> {featuredArticle.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-zinc-400" /> {featuredArticle.date}
                </span>
                <span className="hidden sm:flex items-center gap-1.5 text-red-400 font-bold">
                  <Heart size={13} fill="currentColor" /> {featuredArticle.likes} Suka
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black font-serif leading-tight group-hover:text-red-400 transition mb-3">
                {featuredArticle.title}
              </h2>
              
              <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 mb-4 font-normal leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-bold text-red-400 group-hover:text-red-300">
                Baca Selengkapnya <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Sub Lead / Trending Stories column */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              Pilihan Utama
            </h3>
            <span className="text-xs font-bold text-red-600 dark:text-red-400">Terhangat</span>
          </div>

          {subArticles.map((article) => {
            const isSubBookmarked = bookmarks.includes(article.id);
            return (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className={`group cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-lg flex flex-col justify-between ${
                  darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100 hover:border-red-600/50' : 'bg-white border-zinc-200 text-zinc-900 hover:border-red-600/50'
                }`}
              >
                <div className="flex gap-4 items-center">
                  <div className="relative h-24 w-28 rounded-xl overflow-hidden shrink-0">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400">
                        {article.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(article.id);
                        }}
                        className={`p-1 rounded-full transition ${isSubBookmarked ? 'text-red-600' : 'text-zinc-400 hover:text-red-600'}`}
                      >
                        <Bookmark size={15} fill={isSubBookmarked ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <h4 className="text-xs font-bold leading-snug group-hover:text-red-500 transition line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-[10px] text-zinc-400 mt-2">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Heart size={10} /> {article.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
