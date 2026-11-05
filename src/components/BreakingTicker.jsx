import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

export default function BreakingTicker({ darkMode }) {
  return (
    <div className={`border-b px-4 py-2.5 flex items-center overflow-hidden text-xs sm:text-sm ${
      darkMode ? 'bg-gray-950 border-gray-800 text-gray-300' : 'bg-orange-50 border-orange-100 text-orange-900'
    }`}>
      <div className="flex items-center space-x-2 font-bold px-3 py-1 bg-orange-600 text-white rounded-md shrink-0 shadow-sm mr-4">
        <Flame size={15} className="animate-bounce" />
        <span>BREAKING</span>
      </div>
      <div className="whitespace-nowrap overflow-hidden relative w-full">
        <div className="inline-block animate-marquee font-medium">
          <span>🔴 Mahasiswa Teknik Informatika ITERA Berhasil Ciptakan Inovasi AI Pendeteksi Banjir &nbsp;&bull;&nbsp; </span>
          <span>🚀 Pendaftaran & Pengumpulan LDOP Rising Star 2026 Kelompok 1 Dibuka &nbsp;&bull;&nbsp; </span>
          <span>💡 Rektor Resmikan Pusat Riset Teknologi Masa Depan di Kampus ITERA &nbsp;&bull;&nbsp; </span>
          <span>🏆 Skuad ITERA Sabet Juara Turnamen Regional Sumatra</span>
        </div>
      </div>
    </div>
  );
}
