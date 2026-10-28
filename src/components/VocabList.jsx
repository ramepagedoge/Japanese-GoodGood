import React, { useState, useMemo } from 'react';
import { Search, Volume2, CheckCircle2, Circle, Sparkles, Filter, Bookmark, HelpCircle } from 'lucide-react';
import { VOCAB_CATEGORIES, VOCAB_DATA } from '../data/vocabData';
import { playJapaneseAudio } from '../services/audioService';

export default function VocabList({ progress, onToggleVocabMastery, onAddXP }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMasteredOnly, setFilterMasteredOnly] = useState(false);

  // Filtered list
  const filteredVocab = useMemo(() => {
    return VOCAB_DATA.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Mastered filter
      if (filterMasteredOnly && !progress?.vocabMastered?.[item.id]) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchJap = item.japanese?.toLowerCase().includes(q);
        const matchFuri = item.furigana?.toLowerCase().includes(q);
        const matchKanji = item.kanji?.toLowerCase().includes(q);
        const matchRomaji = item.romaji?.toLowerCase().includes(q);
        const matchChinese = item.chinese?.toLowerCase().includes(q);
        return matchJap || matchFuri || matchKanji || matchRomaji || matchChinese;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, filterMasteredOnly, progress?.vocabMastered]);

  const handleToggle = (id) => {
    const isNowMastered = !progress?.vocabMastered?.[id];
    onToggleVocabMastery(id);
    if (isNowMastered) {
      onAddXP?.(5);
    }
  };

  // Mastered counts
  const totalMastered = Object.keys(progress?.vocabMastered || {}).filter(k => progress.vocabMastered[k]).length;

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Search & Filter Header */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-3.5 border border-slate-800 space-y-3">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋日文、羅馬音或中文意思（如：早安、arigatou、拉麵）..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
            >
              清除
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 pt-0.5 text-xs no-scrollbar">
          {VOCAB_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl shrink-0 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950/80 border border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Filter sub bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-0.5">
          <span>共找到 <strong className="text-indigo-400">{filteredVocab.length}</strong> 個常用句</span>
          <button
            onClick={() => setFilterMasteredOnly(!filterMasteredOnly)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition-colors ${
              filterMasteredOnly
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 font-semibold'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>只看已掌握 ({totalMastered})</span>
          </button>
        </div>
      </div>

      {/* Vocab Cards Grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {filteredVocab.map((item) => {
          const isMastered = Boolean(progress?.vocabMastered?.[item.id]);

          return (
            <div
              key={item.id}
              className={`rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                isMastered 
                  ? 'bg-indigo-950/20 border-indigo-500/30' 
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header Row: Category Badge & Audio & Mastery toggle */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 text-[10px] font-medium">
                    {VOCAB_CATEGORIES.find(c => c.id === item.category)?.name || '基礎'}
                  </span>

                  <div className="flex items-center space-x-2">
                    {/* Normal speed audio */}
                    <button
                      onClick={() => playJapaneseAudio(item.japanese, 0.85)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors"
                      title="標準語速聆聽"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    {/* Slow speed audio (0.7x) */}
                    <button
                      onClick={() => playJapaneseAudio(item.japanese, 0.7)}
                      className="px-1.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-[10px] font-bold transition-colors"
                      title="0.7x 慢速聽"
                    >
                      慢速
                    </button>

                    {/* Mastery Toggle */}
                    <button
                      onClick={() => handleToggle(item.id)}
                      className="text-slate-500 hover:text-indigo-400 transition-colors ml-1"
                      title={isMastered ? '已掌握' : '標記掌握'}
                    >
                      {isMastered ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Japanese Primary Text */}
                <div className="space-y-1">
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-wide font-['Noto_Sans_JP'] select-text">
                    {item.japanese}
                  </div>
                  {item.kanji && item.kanji !== item.japanese && (
                    <div className="text-xs text-slate-400">
                      漢字標記：{item.kanji}
                    </div>
                  )}
                  <div className="text-xs font-semibold text-indigo-400/90 tracking-wide select-text">
                    {item.romaji}
                  </div>
                </div>

                {/* Chinese Meaning */}
                <div className="mt-2.5 text-sm sm:text-base font-semibold text-slate-200 select-text">
                  {item.chinese}
                </div>
              </div>

              {/* Usage Note / Situation Guide */}
              {item.note && (
                <div className="mt-3 pt-2 border-t border-slate-800/60 text-xs text-slate-400 flex items-start space-x-1.5">
                  <span className="text-amber-400 font-bold shrink-0">情境:</span>
                  <span className="leading-relaxed select-text">{item.note}</span>
                </div>
              )}
            </div>
          );
        })}

        {filteredVocab.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 space-y-2">
            <p className="text-sm">找不到符合條件的單字或句子</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setFilterMasteredOnly(false); }}
              className="text-xs text-indigo-400 hover:underline"
            >
              清除所有篩選條件
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
