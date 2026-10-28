import React, { useState } from 'react';
import { BookOpen, Sparkles, Volume2, ArrowRight, Lightbulb, AlertTriangle, ShieldCheck, Check } from 'lucide-react';
import { GRAMMAR_UNITS, PARTICLES_SUMMARY } from '../data/grammarData';
import { playJapaneseAudio } from '../services/audioService';

export default function GrammarGuide({ onStartUnitPractice }) {
  const [guideTab, setGuideTab] = useState('particles'); // 'particles' | 'units'
  const [activeParticleFilter, setActiveParticleFilter] = useState('all');

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-6">
      {/* Top Toggle: 助詞速查與特訓 vs 系統文法公式 */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-3 border border-slate-800 space-y-3">
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setGuideTab('particles')}
            className={`flex-1 py-2 rounded-lg transition-all text-center flex items-center justify-center space-x-1.5 ${
              guideTab === 'particles'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🎯 核心助詞速查與混淆特訓</span>
          </button>
          <button
            onClick={() => setGuideTab('units')}
            className={`flex-1 py-2 rounded-lg transition-all text-center flex items-center justify-center space-x-1.5 ${
              guideTab === 'units'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📚 N5 初級文法系統公式庫</span>
          </button>
        </div>
      </div>

      {/* --- TAB 1: PARTICLES MASTER GUIDE --- */}
      {guideTab === 'particles' && (
        <div className="space-y-5">
          {/* Key Pitfall Comparison Cards (The 2 Biggest Japanese Grammar Dilemmas) */}
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Dilemma 1: で vs に */}
            <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-4 sm:p-5 space-y-3 shadow-lg">
              <div className="flex items-center space-x-2 text-indigo-400 font-extrabold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>超高頻混淆：「で」vs「に」</span>
              </div>
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div className="font-bold text-amber-300">①「で」＝ 動作場所、工具手段、交通工具</div>
                  <p className="text-slate-400 mt-0.5">有「動態行為」發生的地方（在圖書館看書、搭電車去、用筷子吃）。</p>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div className="font-bold text-emerald-300">②「に」＝ 著落點、固定存在、具體時間</div>
                  <p className="text-slate-400 mt-0.5">靜止不動的錨點（房間裡有貓咪、早上七點起床、去東京見朋友）。</p>
                </div>
              </div>
            </div>

            {/* Dilemma 2: は vs が */}
            <div className="bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30 rounded-3xl p-4 sm:p-5 space-y-3 shadow-lg">
              <div className="flex items-center space-x-2 text-purple-400 font-extrabold text-sm">
                <Lightbulb className="w-4 h-4 text-purple-400" />
                <span>核心聚光燈：「は」vs「が」</span>
              </div>
              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div className="font-bold text-indigo-300">①「は」＝ 提示主題（聚光燈在後）</div>
                  <p className="text-slate-400 mt-0.5">「私は学生です」：關於我呢，我是一個學生。重心在後面「是學生」。</p>
                </div>
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div className="font-bold text-rose-300">②「が」＝ 鎖定主體（聚光燈在前）</div>
                  <p className="text-slate-400 mt-0.5">「私が田中です」：我才是田中先生！焦點在前面「我」。存在句一律用 が。</p>
                </div>
              </div>
            </div>
          </div>

          {/* All 10 Particles Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              日語十大基礎助詞總覽
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {PARTICLES_SUMMARY.map((item) => (
                <div
                  key={item.symbol}
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-2 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center text-xl font-black font-['Noto_Sans_JP']">
                        {item.symbol}
                      </span>
                      <div>
                        <div className="font-extrabold text-white text-sm">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-indigo-400 font-mono">
                          發音：{item.pronounce}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => playJapaneseAudio(item.example.split(' ')[0])}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors"
                      title="聆聽範例音"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Core function */}
                  <div className="text-xs text-slate-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-amber-400 font-bold">核心：</span> {item.core}
                  </div>

                  {/* Example & Rule */}
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div>
                      範例：<span className="text-slate-200 font-medium font-['Noto_Sans_JP']">{item.example}</span>
                    </div>
                    <div className="text-slate-500">
                      💡 備註：{item.rules}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: SYSTEMATIC GRAMMAR UNITS --- */}
      {guideTab === 'units' && (
        <div className="space-y-4">
          {GRAMMAR_UNITS.map((unit) => (
            <div
              key={unit.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl"
            >
              {/* Unit Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{unit.icon}</span>
                    <h3 className="text-lg font-black text-white">
                      {unit.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {unit.summary}
                  </p>
                </div>

                <button
                  onClick={() => onStartUnitPractice?.(unit)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center space-x-1 shrink-0 ml-2 active:scale-95 transition-all"
                >
                  <span>闖關練習</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grammar Rules & Formulas */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  文法公式與例句
                </div>

                <div className="grid gap-2.5">
                  {unit.rules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-extrabold text-indigo-300 font-mono tracking-tight text-sm">
                          {rule.formula}
                        </div>
                        <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-lg">
                          {rule.meaning}
                        </span>
                      </div>

                      {/* Examples */}
                      <div className="space-y-1.5 pt-1">
                        {rule.examples.map((ex, exIdx) => (
                          <div
                            key={exIdx}
                            className="flex items-center justify-between text-slate-300 py-1 border-t border-slate-800/50"
                          >
                            <div className="space-y-0.5">
                              <div className="font-bold text-white text-sm font-['Noto_Sans_JP']">
                                {ex.jp}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                {ex.romaji} • {ex.zh}
                              </div>
                            </div>

                            <button
                              onClick={() => playJapaneseAudio(ex.jp)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors shrink-0 ml-2"
                              title="播放音檔"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
