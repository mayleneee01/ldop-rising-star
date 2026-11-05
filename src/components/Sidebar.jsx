import React, { useState } from 'react';
import { TrendingUp, CloudSun, BarChart2, Mail, CheckCircle, Flame } from 'lucide-react';

export default function Sidebar({ articles, onSelectArticle, darkMode }) {
  const [pollVoted, setPollVoted] = useState(false);
  const [pollOption, setPollOption] = useState(null);
  const [emailSubscribed, setEmailSubscribed] = useState('');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  const trendingArticles = articles.filter(a => a.trending).slice(0, 5);

  const handlePollVote = (option) => {
    setPollOption(option);
    setPollVoted(true);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailSubscribed.trim()) return;
    setSubscribedSuccess(true);
    setEmailSubscribed('');
  };

  return (
    <aside className="space-y-6">
      {/* Weather / Campus Widget */}
      <div className={`p-5 rounded-2xl border shadow-sm ${
        darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 text-white' : 'bg-gradient-to-br from-orange-600 to-amber-600 border-orange-500 text-white'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
            Lampung Selatan
          </span>
          <CloudSun size={28} className="animate-pulse" />
        </div>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-4xl font-black">29°C</h3>
          <span className="text-sm font-medium text-orange-100">Cerah Berawan</span>
        </div>
        <p className="text-xs text-orange-100 mt-2">
          Institut Teknologi Sumatera (ITERA) • Kondisi cuaca kondusif untuk kegiatan akademik & riset luar ruang.
        </p>
      </div>

      {/* Trending / Terpopuler */}
      <div className={`p-5 rounded-2xl border shadow-sm ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h3 className="text-base font-black uppercase tracking-wide text-orange-600 dark:text-orange-400 flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
          <TrendingUp size={18} /> Berita Terpopuler
        </h3>
        <div className="space-y-4">
          {trendingArticles.map((article, index) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer flex items-start space-x-3 pb-3 border-b border-gray-100 dark:border-gray-800/60 last:border-0 last:pb-0"
            >
              <span className="text-2xl font-black text-orange-600/60 dark:text-orange-400/60 w-6 shrink-0">
                0{index + 1}
              </span>
              <div>
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase">
                  {article.category}
                </span>
                <h4 className={`text-xs sm:text-sm font-bold line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition mt-0.5 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {article.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Poll / Jajak Pendapat */}
      <div className={`p-5 rounded-2xl border shadow-sm ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h3 className="text-base font-black uppercase tracking-wide text-orange-600 dark:text-orange-400 flex items-center gap-2 mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
          <BarChart2 size={18} /> Jajak Pendapat Kampus
        </h3>
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Seberapa besar efektivitas penggunaan AI dalam proses pembelajaran di kampus menurut Anda?
        </p>

        {!pollVoted ? (
          <div className="space-y-2">
            {[
              { id: 'sangat', label: 'Sangat Membantu & Inovatif' },
              { id: 'cukup', label: 'Cukup Membantu' },
              { id: 'biasa', label: 'Biasa Saja' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handlePollVote(opt.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
                  darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 hover:bg-orange-50 hover:border-orange-300 text-gray-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
              <CheckCircle size={16} /> Terima kasih atas partisipasi Anda!
            </div>
            <div className="space-y-1 pt-2">
              <div className="flex justify-between font-semibold"><span>Sangat Membantu</span> <span>72%</span></div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-600 h-full w-[72%]"></div>
              </div>
              <div className="flex justify-between font-semibold pt-1"><span>Cukup Membantu</span> <span>21%</span></div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[21%]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <div className={`p-5 rounded-2xl border shadow-sm ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <h3 className="text-base font-black uppercase tracking-wide text-orange-600 dark:text-orange-400 flex items-center gap-2 mb-2 pb-2 border-b border-gray-200 dark:border-gray-800">
          <Mail size={18} /> Buletin Harian
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Dapatkan rangkuman berita pilihan seputar kampus dan teknologi langsung di inbox email Anda.
        </p>

        {subscribedSuccess ? (
          <div className="p-3 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle size={16} /> Berhasil berlangganan buletin!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              placeholder="Alamat Email Anda"
              value={emailSubscribed}
              onChange={(e) => setEmailSubscribed(e.target.value)}
              required
              className={`w-full px-4 py-2.5 text-xs rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900'
              }`}
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md transition"
            >
              Berlangganan Sekarang
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
