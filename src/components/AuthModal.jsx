import React, { useState, useEffect, useCallback } from 'react';
import { KeyRound, Lock, UserCheck, X, CheckCircle, AlertCircle, LogOut, ArrowRight, Sliders } from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  authSession, 
  onLogin, 
  onSuccess,
  onLogout, 
  onNavigateToPanel,
  darkMode 
}) {
  const [credentialInput, setCredentialInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleModalClose = useCallback(() => {
    setCredentialInput('');
    setErrorMessage('');
    setSuccessMessage('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleModalClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const trimmed = credentialInput.trim().toLowerCase();

    if (!trimmed) {
      setErrorMessage('Silakan masukkan kredensial akses.');
      return;
    }

    const handleAuthSuccess = (session, successMsg) => {
      if (typeof onLogin === 'function') onLogin(session);
      if (typeof onSuccess === 'function') onSuccess(session);
      setSuccessMessage(successMsg);
      setTimeout(() => {
        onClose();
        if (onNavigateToPanel) onNavigateToPanel();
      }, 700);
    };

    if (trimmed === 'admin2026') {
      const session = {
        role: 'admin',
        title: 'Ketua / Administrator',
        user: 'Muhammad Arya Wisma Nur Susanto',
        accessLevel: 'Akses Penuh',
        permissions: ['create_article', 'edit_article', 'delete_article', 'manage_categories', 'manage_poll', 'moderate_comments', 'reset_data']
      };
      handleAuthSuccess(session, 'Autentikasi Administrator berhasil.');
    } else if (trimmed === 'editor2026') {
      const session = {
        role: 'editor',
        title: 'Redaktur Berita',
        user: 'editor_itera',
        accessLevel: 'Akses Editorial',
        permissions: ['create_article', 'edit_article', 'moderate_comments', 'view_stats']
      };
      handleAuthSuccess(session, 'Autentikasi Editor berhasil.');
    } else {
      setErrorMessage('Kredensial akses tidak valid atau tidak memiliki otorisasi.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-950 border border-red-600/50 flex items-center justify-center text-red-500 shadow-sm">
              <Lock size={18} />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight font-serif flex items-center gap-1.5">
                <span>Portal Staf</span>
                <span className="text-red-600">ITERA NEWS</span>
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Autentikasi tersembunyi untuk Administrator dan Editor
              </p>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            title="Tutup Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Active Session Display if already logged in */}
          {authSession ? (
            <div className={`p-4 rounded-2xl border space-y-4 ${
              darkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-600/30 text-red-600 flex items-center justify-center font-bold">
                    <UserCheck size={18} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                        {authSession.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-600 text-white">
                        {authSession.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Tingkat: {authSession.accessLevel} (User: {authSession.user})
                    </p>
                  </div>
                </div>
              </div>

              {/* Permissions list */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400">
                <div className="font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">Hak Akses Aktif:</div>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle size={11} /> Tulis Artikel
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle size={11} /> Edit Artikel
                  </span>
                  {authSession.role === 'admin' ? (
                    <>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle size={11} /> Hapus Artikel
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle size={11} /> Kelola Kategori
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle size={11} /> Atur Polling & Suara
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle size={11} /> Reset Data Sistem
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <X size={11} /> Hapus (Terkunci)
                      </span>
                      <span className="flex items-center gap-1 text-zinc-400">
                        <X size={11} /> Kategori (Terkunci)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onNavigateToPanel) onNavigateToPanel();
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-red-600/25 transition"
                >
                  <Sliders size={14} />
                  <span>Buka Panel {authSession.role === 'admin' ? 'Admin' : 'Editor'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    setSuccessMessage('Sesi berhasil diakhiri.');
                  }}
                  className="py-2.5 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-zinc-700 dark:text-zinc-300 hover:text-red-600 font-bold text-xs flex items-center space-x-1 transition"
                  title="Keluar dari sesi"
                >
                  <LogOut size={14} />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Kredensial Akses Staf
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                    <KeyRound size={15} />
                  </span>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Masukkan kode kredensial staf"
                    value={credentialInput}
                    onChange={(e) => {
                      setCredentialInput(e.target.value);
                      setErrorMessage('');
                    }}
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border transition-all focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      darkMode 
                        ? 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500' 
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'
                    }`}
                  />
                </div>
              </div>

              {/* Error & Success Messages */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs flex items-start gap-2">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle size={15} className="shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-red-600/25 transition mt-2"
              >
                <span>Masuk ke Panel Terproteksi</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          {/* Quick note on hidden access */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-zinc-400 leading-relaxed text-center">
            Pintasan akses tersembunyi: Tekan <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-zinc-700 dark:text-zinc-300">Ctrl + Shift + A</kbd> atau klik kunci di footer untuk membuka dialog ini kapan saja.
          </div>
        </div>
      </div>
    </div>
  );
}
