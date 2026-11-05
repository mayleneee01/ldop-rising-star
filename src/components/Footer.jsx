import React from 'react';
import { Newspaper, Lock, KeyRound, UserCheck, Sliders } from 'lucide-react';

export default function Footer({ 
  darkMode, 
  authSession, 
  onOpenAuthModal, 
  onLogout,
  onNavigateToPanel 
}) {
  return (
    <footer className={`border-t transition-colors duration-200 mt-16 ${
      darkMode ? 'bg-black border-zinc-900 text-zinc-300' : 'bg-zinc-950 border-zinc-900 text-zinc-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black border-2 border-red-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-red-600/30 ring-1 ring-black">
                <Newspaper size={20} className="text-red-500" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase font-serif text-white [-webkit-text-stroke:0.5px_black]">
                ITERA <span className="text-red-600 [-webkit-text-stroke:0.5px_black]">NEWS</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
              Portal berita mini resmi hasil karya <strong className="text-white">Kelompok 1</strong> untuk penugasan LDOP Rising Star 2026 di lingkungan Himpunan Mahasiswa Informatika (HMIF) Institut Teknologi Sumatera (ITERA).
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 bg-zinc-900 text-zinc-300 font-semibold rounded-full border border-zinc-800">
                HMIF ITERA
              </span>
              {authSession ? (
                <span className="px-3 py-1 bg-emerald-950/60 text-emerald-400 font-semibold rounded-full border border-emerald-800 flex items-center gap-1.5">
                  <UserCheck size={12} className="text-emerald-400" /> Sesi: {authSession.role.toUpperCase()}
                </span>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 font-semibold rounded-full border border-zinc-800 flex items-center gap-1.5 transition"
                  title="Masuk ke portal staf redaksi"
                >
                  <Lock size={12} className="text-red-500" /> Akses Staf
                </button>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">Rubrik Berita</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="hover:text-red-400 transition cursor-pointer">Akademik & Kampus</li>
              <li className="hover:text-red-400 transition cursor-pointer">Riset & Teknologi</li>
              <li className="hover:text-red-400 transition cursor-pointer">Kemahasiswaan & Prestasi</li>
              <li className="hover:text-red-400 transition cursor-pointer">Opini & Kolom</li>
            </ul>
          </div>

          {/* Mandatory Social Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">HMIF ITERA Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href="https://github.com/hmif-itera" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-red-400 flex items-center gap-2 transition font-medium"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub HMIF ITERA
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/himpunan-mahasiswa-informatika-itera" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-red-400 flex items-center gap-2 transition font-medium"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.5a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5z" />
                  </svg>
                  LinkedIn HMIF ITERA
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 LDOP Rising Star - Kelompok 1 - HMIF ITERA. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-3">
            {authSession ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onNavigateToPanel}
                  className="text-xs font-bold text-red-500 hover:text-red-400 transition flex items-center gap-1"
                >
                  <Sliders size={12} />
                  <span>Panel {authSession.role === 'admin' ? 'Admin' : 'Editor'}</span>
                </button>
                <span>&bull;</span>
                <button
                  onClick={onLogout}
                  className="text-xs font-medium text-zinc-400 hover:text-white transition"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition"
                title="Login Staf Khusus"
              >
                <KeyRound size={12} />
                <span>Portal Staf</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
