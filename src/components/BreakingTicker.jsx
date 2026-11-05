import React from 'react';
import { Radio } from 'lucide-react';

export default function BreakingTicker({ darkMode }) {
  return (
    <div className={`border-b px-4 py-2.5 flex items-center overflow-hidden text-xs sm:text-sm ${
      darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-red-50 border-red-200 text-zinc-800'
    }`}>
      <div className="flex items-center space-x-1.5 font-bold px-2.5 py-1 bg-red-600 text-white rounded text-xs shrink-0 shadow-sm mr-4 tracking-wider uppercase">
        <Radio size={14} className="animate-pulse" />
        <span>KILAS BERITA</span>
      </div>
      <div className="whitespace-nowrap overflow-hidden relative w-full">
        <div className="inline-block animate-marquee font-medium">
          <span className="font-semibold text-red-600">BERITA UTAMA:</span>
          <span> Mahasiswa Teknik Informatika ITERA Berhasil Ciptakan Inovasi AI Pendeteksi Banjir &nbsp;&bull;&nbsp; </span>
          <span className="font-semibold text-red-600">UPDATE:</span>
          <span> Rangkaian LDOP Rising Star 2026 Kelompok 1 Resmi Berjalan &nbsp;&bull;&nbsp; </span>
          <span className="font-semibold text-red-600">RISET:</span>
          <span> Rektor Resmikan Pusat Riset Teknologi Masa Depan di Kampus ITERA &nbsp;&bull;&nbsp; </span>
          <span className="font-semibold text-red-600">PRESTASI:</span>
          <span> Skuad ITERA Sabet Juara Turnamen Regional Sumatra</span>
        </div>
      </div>
    </div>
  );
}
