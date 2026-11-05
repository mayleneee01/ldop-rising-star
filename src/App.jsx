import React, { useState, useEffect } from 'react';
import { initialNews, categories as defaultCategories } from './data/newsData';
import Navbar from './components/Navbar';
import BreakingTicker from './components/BreakingTicker';
import HeroSection from './components/HeroSection';
import NewsGrid from './components/NewsGrid';
import Sidebar from './components/Sidebar';
import ArticleModal from './components/ArticleModal';
import BookmarksModal from './components/BookmarksModal';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';

const defaultPollData = {
  question: "Apakah fasilitas Wi-Fi kampus ITERA saat ini sudah memadai untuk kebutuhan riset akademik?",
  yes: 412,
  no: 89,
  undecided: 64
};

export default function App() {
  // Articles state with localStorage persistence
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('iteranews_articles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => {
            let updated = item;
            if (updated.image && updated.image.includes('photo-1508098682722')) {
              updated = {
                ...updated,
                image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80'
              };
            }
            if (updated.image && updated.image.includes('photo-1523050854058')) {
              updated = {
                ...updated,
                image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80'
              };
            }
            return updated;
          });
        }
      } catch (err) {
        console.error("Gagal membaca artikel tersimpan:", err);
      }
    }
    return initialNews;
  });

  // Categories list state with localStorage persistence
  const [categoriesList, setCategoriesList] = useState(() => {
    const saved = localStorage.getItem('iteranews_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Gagal membaca kategori tersimpan:", err);
      }
    }
    return defaultCategories;
  });

  // Poll state with localStorage persistence
  const [poll, setPoll] = useState(() => {
    const saved = localStorage.getItem('iteranews_poll');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Gagal membaca jajak pendapat:", err);
      }
    }
    return defaultPollData;
  });

  // Authentication session state with localStorage persistence
  const [authSession, setAuthSession] = useState(() => {
    const saved = localStorage.getItem('iteranews_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Gagal membaca sesi autentikasi:", err);
      }
    }
    return null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Current view: 'portal' or 'admin'
  const [currentView, setCurrentView] = useState(() => {
    const saved = localStorage.getItem('iteranews_view');
    return saved === 'admin' ? 'admin' : 'portal';
  });

  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Bookmarks with localStorage persistence
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('iteranews_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [bookmarksModalOpen, setBookmarksModalOpen] = useState(false);
  
  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('iteranews_darkmode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('iteranews_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('iteranews_categories', JSON.stringify(categoriesList));
  }, [categoriesList]);

  useEffect(() => {
    localStorage.setItem('iteranews_poll', JSON.stringify(poll));
  }, [poll]);

  useEffect(() => {
    localStorage.setItem('iteranews_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('iteranews_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    if (authSession) {
      localStorage.setItem('iteranews_auth', JSON.stringify(authSession));
    } else {
      localStorage.removeItem('iteranews_auth');
    }
  }, [authSession]);

  useEffect(() => {
    localStorage.setItem('iteranews_darkmode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Keyboard shortcut Ctrl+Shift+A / Cmd+Shift+A for Staff Authentication
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (authSession) {
          setCurrentView(prev => prev === 'admin' ? 'portal' : 'admin');
        } else {
          setAuthModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [authSession]);

  // Article handlers
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

  const handleVotePoll = (option) => {
    setPoll(prev => ({
      ...prev,
      [option]: (prev[option] || 0) + 1
    }));
  };

  // Admin CRUD Handlers
  const handleCreateArticle = (newArticle) => {
    setArticles(prev => [newArticle, ...prev]);
  };

  const handleUpdateArticle = (updatedArticle) => {
    setArticles(prev => prev.map(art => art.id === updatedArticle.id ? updatedArticle : art));
    if (selectedArticle && selectedArticle.id === updatedArticle.id) {
      setSelectedArticle(updatedArticle);
    }
  };

  const handleDeleteArticle = (id) => {
    setArticles(prev => prev.filter(art => art.id !== id));
    setBookmarks(prev => prev.filter(bId => bId !== id));
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle(null);
    }
  };

  const handleDeleteComment = (articleId, commentId) => {
    setArticles(prev => prev.map(art => {
      if (art.id === articleId) {
        return {
          ...art,
          comments: art.comments.filter(c => c.id !== commentId)
        };
      }
      return art;
    }));
    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c.id !== commentId)
      }));
    }
  };

  const handleAddCategory = (categoryName) => {
    const trimmed = categoryName.trim();
    if (!trimmed || categoriesList.includes(trimmed)) return;
    setCategoriesList(prev => [...prev, trimmed]);
  };

  const handleDeleteCategory = (categoryName) => {
    if (categoryName === "Semua") return;
    setCategoriesList(prev => prev.filter(c => c !== categoryName));
    if (selectedCategory === categoryName) {
      setSelectedCategory("Semua");
    }
  };

  const handleUpdatePoll = (updatedPoll) => {
    setPoll(updatedPoll);
  };

  const handleLogout = () => {
    setAuthSession(null);
    setCurrentView('portal');
  };

  const handleResetData = () => {
    setArticles(initialNews);
    setCategoriesList(defaultCategories);
    localStorage.setItem('iteranews_articles', JSON.stringify(initialNews));
    localStorage.setItem('iteranews_categories', JSON.stringify(defaultCategories));
  };

  const handleResetPoll = () => {
    setPoll(defaultPollData);
    localStorage.setItem('iteranews_poll', JSON.stringify(defaultPollData));
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 flex flex-col font-sans ${
      darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'
    }`}>
      {/* Navbar with Black & Red Logo Badge and Red-White UI */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categoriesList}
        bookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksModalOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentView={currentView}
        setCurrentView={setCurrentView}
        authSession={authSession}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {currentView === 'admin' ? (
        /* Full Admin Panel View */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
          <AdminPanel
            articles={articles}
            onCreateArticle={handleCreateArticle}
            onUpdateArticle={handleUpdateArticle}
            onDeleteArticle={handleDeleteArticle}
            onResetData={handleResetData}
            onDeleteComment={handleDeleteComment}
            categories={categoriesList}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            poll={poll}
            onUpdatePoll={handleUpdatePoll}
            onResetPoll={handleResetPoll}
            onBackToPortal={() => setCurrentView('portal')}
            darkMode={darkMode}
            authSession={authSession}
            onLogout={handleLogout}
            onOpenAuthModal={() => setAuthModalOpen(true)}
          />
        </main>
      ) : (
        /* Reader News Portal View */
        <>
          {/* Breaking News Ticker */}
          <BreakingTicker darkMode={darkMode} />

          {/* Main Content Container */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
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
                  poll={poll}
                  onVotePoll={handleVotePoll}
                />
              </div>
            </div>
          </main>
        </>
      )}

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
        onToggleBookmark={handleToggleBookmark}
        darkMode={darkMode}
      />

      {/* Staff Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        authSession={authSession}
        onLogin={(session) => {
          setAuthSession(session);
          setCurrentView('admin');
        }}
        onSuccess={(session) => {
          setAuthSession(session);
          setCurrentView('admin');
        }}
        onLogout={handleLogout}
        onNavigateToPanel={() => setCurrentView('admin')}
        darkMode={darkMode}
      />

      {/* Footer with Kelompok 1 and HMIF ITERA branding */}
      <Footer 
        darkMode={darkMode}
        authSession={authSession}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onNavigateToPanel={() => {
          if (authSession) {
            setCurrentView('admin');
          } else {
            setAuthModalOpen(true);
          }
        }}
        onLogout={handleLogout}
      />
    </div>
  );
}
