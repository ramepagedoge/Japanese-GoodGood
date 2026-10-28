import React from 'react';
import { Trophy, Flame, CheckCircle, Brain, RefreshCw, Cloud, Smartphone, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { SEION_DATA, DAKUON_DATA, YOON_DATA } from '../data/kanaData';
import { VOCAB_DATA } from '../data/vocabData';

export default function Dashboard({ 
  user, 
  progress, 
  onManualSync, 
  isSyncing, 
  onOpenSettings,
  setActiveTab 
}) {
  const totalKana = SEION_DATA.length + DAKUON_DATA.length + YOON_DATA.length;
  const masteredKanaCount = Object.keys(progress?.kanaMastered || {}).filter(k => progress.kanaMastered[k]).length;
  const kanaPercent = Math.round((masteredKanaCount / totalKana) * 100) || 0;

  const totalVocab = VOCAB_DATA.length;
  const masteredVocabCount = Object.keys(progress?.vocabMastered || {}).filter(k => progress.vocabMastered[k]).length;
  const vocabPercent = Math.round((masteredVocabCount / totalVocab) * 100) || 0;

  const xp = progress?.xp || 0;
  const currentLevel = Math.floor(xp / 100) + 1;
  const levelProgress = xp % 100;

  const getLevelTitle = (lvl) => {
    if (lvl <= 1) return '初學者 (初心者)';
    if (lvl <= 3) return '探索者 (探求者)';
    if (lvl <= 5) return '修行者 (修行中)';
    if (lvl <= 8) return '日語精通者 (達人)';
    return '日語大師 (師範)';
  };

  const totalQuiz = progress?.quizStats?.total || 0;
  const correctQuiz = progress?.quizStats?.correct || 0;
  const quizAccuracy = totalQuiz > 0 ? Math.round((correctQuiz / totalQuiz) * 100) : 100;

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Level & XP Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/30 p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-indigo-400 font-bold flex items-center space-x-1.5">
              <Zap className="w-4 h-4 fill-indigo-400" />
              <span>等級進度</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Lv.{currentLevel} {getLevelTitle(currentLevel)}
            </h2>
            <p className="text-xs text-slate-400">
              累積獲得 <strong className="text-indigo-300 font-bold">{xp}</strong> 點 XP
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Trophy className="w-7 h-7" />
          </div>
        </div>

        {/* Progress to next level bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>升級進度</span>
            <span>{levelProgress} / 100 XP</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2x2 Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Streak card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-semibold">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>連續打卡</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {progress?.streak?.count || 1} <span className="text-sm font-normal text-slate-400">天</span>
          </div>
          <div className="text-[11px] text-slate-400">
            天天學習保持手感！
          </div>
        </div>

        {/* Quiz Accuracy card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>測驗正確率</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {quizAccuracy}<span className="text-sm font-normal text-slate-400">%</span>
          </div>
          <div className="text-[11px] text-slate-400">
            累計已測 {totalQuiz} 題
          </div>
        </div>

        {/* Kana Mastery card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">五十音掌握</span>
            <span className="font-bold text-indigo-400">{kanaPercent}%</span>
          </div>
          <div className="text-xl font-bold text-white">
            {masteredKanaCount} / {totalKana} <span className="text-xs font-normal text-slate-400">音</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full" 
              style={{ width: `${kanaPercent}%` }} 
            />
          </div>
        </div>

        {/* Vocab Mastery card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">N5生活單字</span>
            <span className="font-bold text-rose-400">{vocabPercent}%</span>
          </div>
          <div className="text-xl font-bold text-white">
            {masteredVocabCount} / {totalVocab} <span className="text-xs font-normal text-slate-400">句</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-rose-500 rounded-full" 
              style={{ width: `${vocabPercent}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Cloud Sync Status Info Banner */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${user ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {user ? 'Google 雲端同步已連線' : '本機離線模式'}
              </div>
              <div className="text-[11px] text-slate-400">
                {user ? `帳號: ${user.email}` : '進度目前儲存於此瀏覽器'}
              </div>
            </div>
          </div>

          {user ? (
            <button
              onClick={onManualSync}
              disabled={isSyncing}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold active:scale-95 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-400' : ''}`} />
              <span>{isSyncing ? '同步中' : '立即備份'}</span>
            </button>
          ) : (
            <button
              onClick={onOpenSettings}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
            >
              開啟手機同步
            </button>
          )}
        </div>

        {/* Explain how remote sync works */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
          <div className="font-semibold text-slate-300 flex items-center space-x-1.5">
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            <span>如何用手機瀏覽器同步學習？</span>
          </div>
          <p className="leading-relaxed">
            在電腦或手機上使用同一個 Google 帳號登入，背完五十音或單字時，進度會即時自動同步至雲端 Firestore。換手機或外出隨開即學！
          </p>
        </div>
      </div>

      {/* Quick Launch Actions */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          立即行動
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveTab('flashcards')}
            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-indigo-400">SRS 記憶卡</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-sm font-bold text-white">進行快速複習</div>
            <div className="text-[11px] text-slate-400">利用間隔重複加深記憶</div>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 text-left transition-all group"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-rose-400">實戰口語</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-sm font-bold text-white">點餐與問路單字</div>
            <div className="text-[11px] text-slate-400">旅遊最實用的生活對話</div>
          </button>
        </div>
      </div>
    </div>
  );
}
