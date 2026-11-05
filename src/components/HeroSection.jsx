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
          className={`lg:col-span-2 group cursor-pointer relative rounded-2xl overflow-hidden border shadow-md transition-all hover:shadow-xl flex flex-col justify-end ${
            darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
          }`}
        >
          <div className="relative h-72 sm:h-96 w-full overflow-hidden">
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                {featuredArticle.category}
              </span>
            </div>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(featuredArticle.id);
              }}
              className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition ${
                isBookmarked ? 'bg-orange-600 text-white' : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white z-10">
              <div className="flex items-center space-x-4 text-xs text-gray-300 mb-2">
                <span className="flex items-center gap-1 font-medium"><User size={14} /> {featuredArticle.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {featuredArticle.date} ({featuredArticle.readTime})</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black leading-tight tracking-tight mb-3 group-hover:text-orange-400 transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-200 line-clamp-2 font-normal">
                {featuredArticle.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* Sub Lead Trending Stories */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
              🔥 Sedang Hangat
            </h3>
            <span className="text-xs text-gray-400">Pilihan Redaksi</span>
          </div>

          {subArticles.map((article) => {
            const isSaved = bookmarks.includes(article.id);
            return (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className={`group cursor-pointer p-4 rounded-xl border transition-all hover:shadow-md flex gap-4 items-center ${
                  darkMode ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-orange-300'
                }`}
              >
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg shrink-0 group-hover:scale-105 transition" 
                />
                <div className="flex flex-col justify-between h-full py-0.5">
                  <div>
                    <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                      {article.category}
                    </span>
                    <h4 className={`text-xs sm:text-sm font-bold line-clamp-2 mt-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition ${
                      darkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {article.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-semibold">
                      Baca <ArrowRight size={12} />
                    </span>
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
