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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto border flex flex-col ${
          darkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header inside modal */}
        <div className={`sticky top-0 z-20 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
          darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full uppercase">
              {article.category}
            </span>
            <span className="text-xs text-gray-400">• {article.date}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2.5 rounded-full border transition ${
                isBookmarked 
                  ? 'bg-orange-600 border-orange-600 text-white' 
                  : darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
              }`}
              title="Simpan Artikel"
            >
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleShare}
              className={`p-2.5 rounded-full border transition ${
                darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
              }`}
              title="Salin Tautan"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
            </button>

            <button
              onClick={onClose}
              className={`p-2.5 rounded-full border transition ${
                darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
              }`}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-6">
          <h1 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className={`flex flex-wrap items-center justify-between py-4 border-y text-sm ${
            darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-100 text-gray-600'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center text-base">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-gray-100">{article.author}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">{article.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-3 sm:mt-0 text-xs">
              <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
              <button 
                onClick={() => onLikeArticle(article.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 font-semibold hover:scale-105 transition"
              >
                <Heart size={16} fill="currentColor" /> {article.likes} Suka
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg max-h-[450px]">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          {/* Article Full Text */}
          <div className={`prose max-w-none text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {article.content}
          </div>

          {/* Comments Section */}
          <div className={`mt-10 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare size={20} className="text-orange-600" />
              Komentar Pembaca ({article.comments.length})
            </h3>

            {/* Comment List */}
            <div className="space-y-4 mb-8">
              {article.comments.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Belum ada komentar. Jadilah yang pertama memberikan tanggapan!</p>
              ) : (
                article.comments.map((comment) => (
                  <div key={comment.id} className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-orange-600 dark:text-orange-400">{comment.user}</span>
                      <span className="text-[10px] text-gray-400">Baru saja</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className={`p-4 sm:p-6 rounded-2xl border ${
              darkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-orange-50/50 border-orange-100'
            }`}>
              <h4 className="text-sm font-bold mb-3">Tulis Komentar</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className={`w-full px-4 py-2 text-xs sm:text-sm rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
                <textarea
                  placeholder="Bagikan pendapat atau tanggapan Anda..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  required
                  className={`w-full px-4 py-2 text-xs sm:text-sm rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Send size={15} /> Kirim Komentar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
