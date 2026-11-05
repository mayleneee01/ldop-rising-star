import React, { useState } from 'react';
import { TrendingUp, CloudSun, BarChart2, Mail, Check } from 'lucide-react';
import { getCategoryTheme } from '../utils/categoryTheme';

export default function Sidebar({ articles, onSelectArticle, darkMode, poll, onVotePoll }) {
  const trendingArticles = articles.filter(a => a.trending).slice(0, 4);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Poll local state fallback
  const [pollVoted, setPollVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [localPoll, setLocalPoll] = useState({
    question: "Apakah fasilitas Wi-Fi kampus ITERA saat ini sudah memadai untuk kebutuhan riset akademik?",
    yes: 412,
    no: 89,
    undecided: 64
  });

  const activePoll = poll || localPoll;
  const totalVotes = (activePoll.yes || 0) + (activePoll.no || 0) + (activePoll.undecided || 0);

  const handleVote = (option) => {
    if (pollVoted) return;
    if (onVotePoll) {
      onVotePoll(option);
    } else {
      setLocalPoll(prev => ({
        ...prev,
        [option]: (prev[option] || 0) + 1
      }));
    }
    setSelectedOption(option);
    setPollVoted(true);
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <aside className="space-y-4 sm:space-y-6">
      {/* Trending / Terpopuler */}
      <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border shadow-sm ${
        darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-red-100 shadow-red-500/5'
      }`}>
        <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="p-2 bg-red-600/10 text-red-600 dark:text-red-400 rounded-xl">
            <TrendingUp size={18} />
          </div>
          <h3 className="font-black text-sm uppercase tracking-wider">Berita Terpopuler</h3>
        </div>
        <div className="space-y-4">
          {trendingArticles.map((art, idx) => {
            const theme = getCategoryTheme(art.category);
            return (
              <div 
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="group cursor-pointer flex items-start space-x-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0 last:pb-0"
              >
                <span className="font-black text-xl text-red-600 dark:text-red-500 w-6 shrink-0 text-right font-serif">
                  0{idx + 1}
                </span>
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border inline-block ${theme.badge}`}>
                    {art.category}
                  </span>
                  <h4 className="text-xs font-bold leading-snug group-hover:text-red-500 transition line-clamp-2 mt-1">
                    {art.title}
                  </h4>
                  <span className="text-[10px] text-zinc-400 mt-1 block">{art.views} pembaca</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campus Weather Widget */}
      <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border shadow-sm ${
        darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-red-100 text-zinc-900 shadow-red-500/5'
      }`}>
        <div className="flex items-center space-x-2 pb-2.5 sm:pb-3 mb-3 sm:mb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="p-1.5 sm:p-2 bg-red-600/10 text-red-600 dark:text-red-400 rounded-xl">
            <CloudSun size={17} />
          </div>
          <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider">Cuaca Kampus ITERA</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl sm:text-2xl font-black font-serif">31°C</div>
            <div className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">Lampung Selatan, Berawan</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] sm:text-xs font-bold text-red-600 dark:text-red-400">Indeks UV: Sedang</div>
            <div className="text-[10px] text-zinc-400">Kelembapan: 78%</div>
          </div>
        </div>
      </div>

      {/* Campus Poll */}
      <div className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border shadow-sm ${
        darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-red-100 text-zinc-900 shadow-red-500/5'
      }`}>
        <div className="flex items-center space-x-2 pb-2.5 sm:pb-3 mb-3 sm:mb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="p-1.5 sm:p-2 bg-red-600/10 text-red-600 dark:text-red-400 rounded-xl">
            <BarChart2 size={17} />
          </div>
          <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider">Jajak Pendapat Mahasiswa</h3>
        </div>
        <p className="text-xs font-semibold mb-3 leading-relaxed">
          {activePoll.question}
        </p>

        <div className="space-y-2 sm:space-y-2.5">
          {[
            { key: 'yes', label: 'Ya, Sangat Memadai' },
            { key: 'no', label: 'Belum Cukup' },
            { key: 'undecided', label: 'Biasa Saja' }
          ].map(opt => {
            const count = activePoll[opt.key] || 0;
            const percent = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            return (
              <button
                key={opt.key}
                onClick={() => handleVote(opt.key)}
                disabled={pollVoted}
                className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold transition relative overflow-hidden ${
                  selectedOption === opt.key
                    ? 'border-red-600 bg-red-600/10 text-red-600 dark:text-red-400'
                    : darkMode 
                      ? 'border-zinc-800 bg-zinc-950/40 hover:bg-zinc-800' 
                      : 'border-zinc-200 bg-zinc-50 hover:bg-red-50/50 hover:border-red-200'
                }`}
              >
                {pollVoted && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-red-600/15 transition-all duration-500" 
                    style={{ width: `${percent}%` }}
                  ></div>
                )}
                <div className="relative z-10 flex justify-between items-center">
                  <span>{opt.label}</span>
                  {pollVoted && <span className="font-black text-red-600 dark:text-red-400">{percent}%</span>}
                </div>
              </button>
            );
          })}
        </div>
        <div className="text-[10px] text-zinc-400 mt-3 text-center">
          Total {totalVotes} partisipan telah memberikan suara.
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className={`p-5 rounded-3xl border shadow-sm ${
        darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-red-100 text-zinc-900 shadow-red-500/5'
      }`}>
        <div className="flex items-center space-x-2 pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="p-2 bg-red-600/10 text-red-600 dark:text-red-400 rounded-xl">
            <Mail size={18} />
          </div>
          <h3 className="font-black text-sm uppercase tracking-wider">Buletin Kampus</h3>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
          Dapatkan rangkuman berita pilihan dan pengumuman akademik langsung ke email Anda setiap pekan.
        </p>

        {subscribed ? (
          <div className="p-3 bg-red-600/10 border border-red-600/30 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold flex items-center gap-2">
            <Check size={16} /> Berhasil berlangganan buletin!
          </div>
        ) : (
          <form onSubmit={handleNewsletter} className="space-y-3">
            <input
              type="email"
              placeholder="Masukkan email anda..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className={`w-full px-4 py-2.5 rounded-xl text-xs border ${
                darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-black'
              } focus:outline-none focus:ring-2 focus:ring-red-600`}
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition"
            >
              Berlangganan Sekarang
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
