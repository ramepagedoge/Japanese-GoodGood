import React, { useState } from 'react';
import { Volume2, CheckCircle2, Circle, Lightbulb, Sparkles, X, ChevronRight } from 'lucide-react';
import { SEION_DATA, DAKUON_DATA, YOON_DATA, KANA_ROWS } from '../data/kanaData';
import { playJapaneseAudio } from '../services/audioService';

export default function KanaChart({ progress, onToggleKanaMastery, onAddXP }) {
  const [scriptType, setScriptType] = useState('hiragana'); // 'hiragana' | 'katakana' | 'both'
  const [category, setCategory] = useState('seion'); // 'seion' | 'dakuon' | 'yoon'
  const [selectedRow, setSelectedRow] = useState('all');
  const [activeKanaModal, setActiveKanaModal] = useState(null);

  // Active dataset
  const currentDataset = category === 'seion' 
    ? SEION_DATA 
    : category === 'dakuon' 
      ? DAKUON_DATA 
      : YOON_DATA;

  // Filtered dataset
  const filteredData = selectedRow === 'all' 
    ? currentDataset 
    : currentDataset.filter(item => item.row === selectedRow);

  // Stats calculation
  const masteredCount = currentDataset.filter(k => progress?.kanaMastered?.[k.id]).length;
  const totalCount = currentDataset.length;
  const percentage = Math.round((masteredCount / totalCount) * 100) || 0;

  const handleCardClick = (kanaItem, e) => {
    // If clicking mastery button specifically, handled separately
    if (e.target.closest('.mastery-btn')) return;

    // Play native speech
    const textToSpeak = scriptType === 'katakana' ? kanaItem.katakana : kanaItem.hiragana;
    playJapaneseAudio(textToSpeak);
    setActiveKanaModal(kanaItem);
  };

  const handleToggleMastery = (kanaId) => {
    const isNowMastered = !progress?.kanaMastered?.[kanaId];
    onToggleKanaMastery(kanaId);
    if (isNowMastered) {
      onAddXP?.(5);
    }
  };

  const renderDisplayGlyph = (item) => {
    if (scriptType === 'hiragana') return item.hiragana;
    if (scriptType === 'katakana') return item.katakana;
    return (
      <span className="flex items-baseline space-x-1 justify-center">
        <span>{item.hiragana}</span>
        <span className="text-slate-500 text-xs">/</span>
        <span className="text-slate-400 text-sm">{item.katakana}</span>
      </span>
    );
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Category & Script Controller Header */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-3.5 border border-slate-800 space-y-3">
        {/* Syllabary Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 text-xs font-semibold">
          <button
            onClick={() => { setCategory('seion'); setSelectedRow('all'); }}
            className={`flex-1 py-2 rounded-lg transition-all text-center ${
              category === 'seion' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            清音 (46音)
          </button>
          <button
            onClick={() => { setCategory('dakuon'); setSelectedRow('all'); }}
            className={`flex-1 py-2 rounded-lg transition-all text-center ${
              category === 'dakuon' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            濁音・半濁音 (25音)
          </button>
          <button
            onClick={() => { setCategory('yoon'); setSelectedRow('all'); }}
            className={`flex-1 py-2 rounded-lg transition-all text-center ${
              category === 'yoon' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            拗音 (36音)
          </button>
        </div>

        {/* Script Mode Toggle (Hiragana / Katakana / Both) */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="text-slate-400 font-medium hidden sm:inline">字形顯示:</span>
            <div className="inline-flex bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
              <button
                onClick={() => setScriptType('hiragana')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  scriptType === 'hiragana' ? 'bg-slate-800 text-indigo-300 font-bold' : 'text-slate-400'
                }`}
              >
                平假名
              </button>
              <button
                onClick={() => setScriptType('katakana')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  scriptType === 'katakana' ? 'bg-slate-800 text-indigo-300 font-bold' : 'text-slate-400'
                }`}
              >
                片假名
              </button>
              <button
                onClick={() => setScriptType('both')}
                className={`px-2 py-1 rounded-md transition-all ${
                  scriptType === 'both' ? 'bg-slate-800 text-indigo-300 font-bold' : 'text-slate-400'
                }`}
              >
                對照
              </button>
            </div>
          </div>

          {/* Quick Mastery Progress */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">掌握度:</span>
            <span className="font-bold text-indigo-400">{masteredCount}/{totalCount}</span>
            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Seion Row Selector Chips (Only when in Seion) */}
        {category === 'seion' && (
          <div className="flex space-x-1.5 overflow-x-auto pb-1 pt-0.5 text-xs scrollbar-none no-scrollbar">
            <button
              onClick={() => setSelectedRow('all')}
              className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                selectedRow === 'all' 
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold' 
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800/80 hover:text-slate-200'
              }`}
            >
              全部 (All)
            </button>
            {KANA_ROWS.map(r => (
              <button
                key={r.key}
                onClick={() => setSelectedRow(r.key)}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition-colors ${
                  selectedRow === r.key 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold' 
                    : 'bg-slate-950/80 text-slate-400 border border-slate-800/80 hover:text-slate-200'
                }`}
              >
                {r.name.split(' ')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Kana Cards */}
      <div className={`grid gap-2 sm:gap-3 ${
        category === 'yoon' 
          ? 'grid-cols-3 sm:grid-cols-3' 
          : 'grid-cols-5 sm:grid-cols-5'
      }`}>
        {filteredData.map((item) => {
          const isMastered = Boolean(progress?.kanaMastered?.[item.id]);

          return (
            <div
              key={item.id}
              onClick={(e) => handleCardClick(item, e)}
              className={`relative group cursor-pointer rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-between border transition-all duration-200 active:scale-95 ${
                isMastered 
                  ? 'bg-indigo-950/30 border-indigo-500/40 shadow-sm shadow-indigo-500/10 hover:border-indigo-400' 
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              {/* Top Bar on Card: Mastered Indicator */}
              <div className="w-full flex items-center justify-between text-[11px] mb-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleMastery(item.id);
                  }}
                  className="mastery-btn text-slate-500 hover:text-indigo-400 transition-colors"
                  title={isMastered ? '已掌握' : '點擊標記掌握'}
                >
                  {isMastered ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/20" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-600 hover:text-slate-400" />
                  )}
                </button>

                {/* Speaker icon hint */}
                <Volume2 className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
              </div>

              {/* Central Large Kana Character */}
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-slate-100 group-hover:scale-105 transition-transform duration-150 py-1 font-['Noto_Sans_JP']">
                {renderDisplayGlyph(item)}
              </div>

              {/* Romaji underneath */}
              <div className="text-xs font-semibold text-indigo-400/90 tracking-wide mt-0.5">
                {item.romaji}
              </div>

              {/* Mnemonic pill indicator if available */}
              {item.mnemonic && (
                <div className="mt-1 text-[10px] text-slate-500 truncate max-w-full text-center px-1 hidden sm:block">
                  {item.example?.split(' ')[0]}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal / Bottom Drawer for Kana Deep Dive & Mnemonics */}
      {activeKanaModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveKanaModal(null)}
        >
          <div 
            className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-5 shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setActiveKanaModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Char Display */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600/30 to-rose-600/20 border border-indigo-500/30 flex items-center justify-center text-4xl font-black text-white font-['Noto_Sans_JP'] shadow-lg">
                {scriptType === 'katakana' ? activeKanaModal.katakana : activeKanaModal.hiragana}
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-white tracking-tight">{activeKanaModal.romaji}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                    {category === 'seion' ? '清音' : category === 'dakuon' ? '濁音' : '拗音'}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  平假名: <strong className="text-slate-200">{activeKanaModal.hiragana}</strong> | 片假名: <strong className="text-slate-200">{activeKanaModal.katakana}</strong>
                </div>
                <button
                  onClick={() => playJapaneseAudio(activeKanaModal.hiragana, 0.75)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all mt-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>聽慢速發音 (0.75x)</span>
                </button>
              </div>
            </div>

            {/* Mnemonic Story Box */}
            {activeKanaModal.mnemonic && (
              <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-3.5 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-amber-400">
                  <Lightbulb className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>秒記口訣記憶法</span>
                </div>
                <p className="text-slate-300 leading-relaxed selectable-text">
                  {activeKanaModal.mnemonic}
                </p>
              </div>
            )}

            {/* Example Word */}
            {activeKanaModal.example && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="text-slate-400 font-medium">單字範例:</div>
                  <div className="text-base font-bold text-white mt-0.5 font-['Noto_Sans_JP']">
                    {activeKanaModal.example}
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    意思：{activeKanaModal.meaning}
                  </div>
                </div>
                <button
                  onClick={() => playJapaneseAudio(activeKanaModal.example.split(' ')[0], 0.85)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white transition-colors"
                  title="聆聽範例發音"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bottom Modal Actions */}
            <div className="pt-2 flex items-center space-x-2">
              <button
                onClick={() => {
                  handleToggleMastery(activeKanaModal.id);
                  setActiveKanaModal(null);
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all ${
                  progress?.kanaMastered?.[activeKanaModal.id]
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {progress?.kanaMastered?.[activeKanaModal.id] ? '取消掌握標記' : '標記為已精通 (+5 XP)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
