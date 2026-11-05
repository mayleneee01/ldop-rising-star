import React from 'react';
import { Newspaper, Heart, ExternalLink } from 'lucide-react';

export default function Footer({ darkMode }) {
  return (
    <footer className={`mt-16 border-t ${darkMode ? 'bg-gray-950 border-gray-800 text-gray-400' : 'bg-gray-900 border-gray-800 text-gray-300'}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-600 text-white p-2 rounded-xl flex items-center justify-center">
                <Newspaper size={24} />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">ITERANEWS</h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md">
              Portal Berita Mini dikembangkan sebagai bagian dari penugasan proyek LDOP Rising Star 2026 oleh <strong>Kelompok 1</strong> (Username: <code className="text-orange-400 bg-gray-900 px-1.5 py-0.5 rounded">mayleneee01</code>). Menyajikan informasi terkini seputar kampus ITERA, sains, teknologi, dan kehidupan mahasiswa.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href="https://github.com/hmif-itera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 text-gray-200 hover:bg-orange-600 hover:text-white text-xs font-semibold transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg> GitHub HMIF ITERA
              </a>
              <a 
                href="https://www.linkedin.com/company/himpunan-mahasiswa-informatika-itera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 text-gray-200 hover:bg-orange-600 hover:text-white text-xs font-semibold transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg> LinkedIn HMIF ITERA
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Navigasi</h3>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-orange-400 transition">Beranda Utama</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Kampus ITERA</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Teknologi & Sains</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Olahraga & Prestasi</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Gaya Hidup Mahasiswa</a></li>
            </ul>
          </div>

          {/* Group Identity */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Kelompok 1</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><strong>Ketua / Dev:</strong> mayleneee01</li>
              <li><strong>Tema:</strong> Portal Berita Mini</li>
              <li><strong>Repository:</strong> hmif-itera/ldop-rising-star</li>
              <li><strong>Branch:</strong> <code className="text-orange-400">kelompok-1</code></li>
              <li><strong>Status:</strong> Ter-deploy di Vercel</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 Kelompok 1 — LDOP Rising Star HMIF ITERA. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Dibuat dengan <Heart size={13} className="text-red-500 fill-red-500" /> untuk kemajuan Informatika ITERA.
          </p>
        </div>
      </div>
    </footer>
  );
}
