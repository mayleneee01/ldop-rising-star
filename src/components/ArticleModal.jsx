import React, { useState } from 'react';
import { X, Clock, User, Bookmark, Heart, MessageSquare, Share2, Send, Check } from 'lucide-react';

export default function ArticleModal({ article, onClose, bookmarks, onToggleBookmark, onLikeArticle, onAddComment, darkMode }) {
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const isBookmarked = bookmarks.includes(article.id);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !userName.trim()) return;
    onAddComment(article.id, {
      id: Date.now(),
      user: userName.trim(),
      text: commentText.trim()
    });
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto border flex flex-col ${
          darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header inside modal */}
        <div className={`sticky top-0 z-20 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
          darkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/90 border-zinc-200'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-sm">
              {article.category}
            </span>
            <span className="text-xs text-zinc-400 hidden sm:inline">• Artikel Utama</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className={`p-2 rounded-full border transition flex items-center gap-1.5 text-xs font-bold ${
                darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
              }`}
              title="Salin Tautan"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
              <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Bagikan'}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-full border transition ${
                isBookmarked 
                  ? 'bg-red-600 border-red-600 text-white' 
                  : darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
              }`}
              title="Simpan Artikel"
            >
              <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
            </button>

            <button 
              onClick={onClose}
              className={`p-2 rounded-full border transition ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:bg-zinc-200'}`}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black font-serif leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{article.author}</div>
                  <div className="text-[11px] text-zinc-400">Tim Redaksi ITERA News • Kelompok 1</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="flex items-center gap-1"><Clock size={14} /> {article.date}</span>
                <button
                  onClick={() => onLikeArticle(article.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/10 text-red-600 dark:text-red-400 hover:bg-red-600/20 transition font-bold"
                >
                  <Heart size={15} fill="currentColor" /> {article.likes} Suka
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-lg h-72 sm:h-[400px]">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Text */}
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-zinc-800 dark:text-zinc-200 font-sans">
            <p className="font-semibold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 italic border-l-4 border-red-600 pl-4 py-1">
              "{article.excerpt}"
            </p>
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Comments Section */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-6">
            <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
              <MessageSquare size={20} className="text-red-600" /> Diskusi & Komentar ({article.comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className={`p-4 sm:p-6 rounded-2xl border space-y-4 ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Tulis Tanggapan Anda</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nama Lengkap / Nama Samaran"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className={`w-full px-4 py-2.5 rounded-xl text-xs border ${
                    darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
                  } focus:outline-none focus:ring-2 focus:ring-red-600`}
                />
              </div>
              <textarea
                rows="3"
                placeholder="Bagikan pendapat atau pertanyaan Anda terkait berita ini..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                className={`w-full px-4 py-2.5 rounded-xl text-xs border ${
                  darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
                } focus:outline-none focus:ring-2 focus:ring-red-600`}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/30 transition flex items-center gap-2"
                >
                  <Send size={14} /> Kirim Komentar
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {article.comments.length === 0 ? (
                <p className="text-xs text-zinc-400 text-center py-6">Belum ada komentar. Jadilah yang pertama memberikan tanggapan!</p>
              ) : (
                article.comments.map((comment) => (
                  <div key={comment.id} className={`p-4 rounded-2xl border ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800/80' : 'bg-white border-zinc-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-red-500">{comment.user}</span>
                      <span className="text-[10px] text-zinc-400">Baru saja</span>
                    </div>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{comment.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
