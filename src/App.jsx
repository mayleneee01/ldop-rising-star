import React, { useState, useEffect } from 'react';
import { initialNews, categories } from './data/newsData';
import Navbar from './components/Navbar';
import BreakingTicker from './components/BreakingTicker';
import HeroSection from './components/HeroSection';
import NewsGrid from './components/NewsGrid';
import Sidebar from './components/Sidebar';
import ArticleModal from './components/ArticleModal';
import BookmarksModal from './components/BookmarksModal';
import Footer from './components/Footer';

export default function App() {
  const [articles, setArticles] = useState(initialNews);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('iteranews_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [bookmarksModalOpen, setBookmarksModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('iteranews_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleLikeArticle = (id) => {
    setArticles(prev => prev.map(art => {
      if (art.id === id) {
        return { ...art, likes: art.likes + 1 };
      }
      return art;
    }));
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(prev => ({ ...prev, likes: prev.likes + 1 }));
    }
  };

  const handleAddComment = (id, newComment) => {
    setArticles(prev => prev.map(art => {
      if (art.id === id) {
        return { ...art, comments: [newComment, ...art.comments] };
      }
      return art;
    }));
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(prev => ({ ...prev, comments: [newComment, ...prev.comments] }));
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 flex flex-col font-sans ${
      darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        bookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksModalOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Breaking News Ticker */}
      <BreakingTicker darkMode={darkMode} />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">
        {/* Hero Section (Only shown when viewing "Semua" and no search query) */}
        {selectedCategory === "Semua" && searchQuery === "" && (
          <HeroSection
            articles={articles}
            onSelectArticle={setSelectedArticle}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            darkMode={darkMode}
          />
        )}

        {/* Grid and Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <NewsGrid
              articles={articles}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onSelectArticle={setSelectedArticle}
              bookmarks={bookmarks}
              onToggleBookmark={handleToggleBookmark}
              darkMode={darkMode}
            />
          </div>

          <div className="lg:col-span-1">
            <Sidebar
              articles={articles}
              onSelectArticle={setSelectedArticle}
              darkMode={darkMode}
            />
          </div>
        </div>
      </main>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
          onLikeArticle={handleLikeArticle}
          onAddComment={handleAddComment}
          darkMode={darkMode}
        />
      )}

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={bookmarksModalOpen}
        onClose={() => setBookmarksModalOpen(false)}
        bookmarks={bookmarks}
        articles={articles}
        onSelectArticle={setSelectedArticle}
        darkMode={darkMode}
      />

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
