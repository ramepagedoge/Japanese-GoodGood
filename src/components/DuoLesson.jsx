import React, { useState } from 'react';
import { Volume2, Heart, CheckCircle2, XCircle, ArrowRight, Sparkles, ChevronLeft, HelpCircle, Award, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GRAMMAR_UNITS } from '../data/grammarData';
import { playJapaneseAudio } from '../services/audioService';

export default function DuoLesson({ progress, onSaveUnitCompletion, onAddXP, onOpenGrammarUnit }) {
  // Navigation inside Duo
  const [activeUnit, setActiveUnit] = useState(null); // null = path map, object = in-game lesson
  const [exerciseIndex, setExerciseIndex] = useState(0);

  // In-game exercise state
  const [selectedTokens, setSelectedTokens] = useState([]); // For sentence builder: tokens in answer tray
  const [availableTokens, setAvailableTokens] = useState([]); // Remaining tokens in bank
  const [selectedParticle, setSelectedParticle] = useState(null); // For particle choice

  // Answer state: null | 'correct' | 'wrong'
  const [answerStatus, setAnswerStatus] = useState(null);
  const [lives, setLives] = useState(3);
  const [lessonFinished, setLessonFinished] = useState(false);

  // Start a unit
  const handleStartUnit = (unit) => {
    setActiveUnit(unit);
    setExerciseIndex(0);
    setLives(3);
    setLessonFinished(false);
    initExercise(unit.exercises[0]);
  };

  const initExercise = (exercise) => {
    setAnswerStatus(null);
    setSelectedParticle(null);
    if (exercise.type === 'sentence_builder') {
      setSelectedTokens([]);
      // Shuffle token pool with indexed objects so duplicates don't conflict
      const pool = exercise.tokenPool.map((token, idx) => ({ id: `${token}_${idx}`, text: token }));
      setAvailableTokens(pool.sort(() => 0.5 - Math.random()));
    }
  };

  // Sentence builder token clicks
  const handleAddToken = (tokenObj) => {
    if (answerStatus !== null) return;
    setAvailableTokens(prev => prev.filter(t => t.id !== tokenObj.id));
    setSelectedTokens(prev => [...prev, tokenObj]);
  };

  const handleRemoveToken = (tokenObj) => {
    if (answerStatus !== null) return;
    setSelectedTokens(prev => prev.filter(t => t.id !== tokenObj.id));
    setAvailableTokens(prev => [...prev, tokenObj]);
  };

  // Particle choice select
  const handleSelectParticle = (particle) => {
    if (answerStatus !== null) return;
    setSelectedParticle(particle);
  };

  // Check Answer
  const handleCheckAnswer = () => {
    const currentEx = activeUnit.exercises[exerciseIndex];
    let isCorrect = false;

    if (currentEx.type === 'sentence_builder') {
      const userSentence = selectedTokens.map(t => t.text).join('');
      const targetSentence = currentEx.targetSentence.replace(/[\s。]/g, '');
      isCorrect = userSentence === targetSentence;
    } else if (currentEx.type === 'particle_choice') {
      isCorrect = selectedParticle === currentEx.correctParticle;
    }

    if (isCorrect) {
      setAnswerStatus('correct');
      onAddXP?.(10);
      // Play audio of target sentence
      const textToPlay = currentEx.targetSentence || currentEx.sentenceTemplate?.replace('[ ? ]', currentEx.correctParticle);
      if (textToPlay) {
        playJapaneseAudio(textToPlay);
      }
    } else {
      setAnswerStatus('wrong');
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  // Next Question or Finish
  const handleNextQuestion = () => {
    if (exerciseIndex + 1 < activeUnit.exercises.length) {
      const nextIdx = exerciseIndex + 1;
      setExerciseIndex(nextIdx);
      initExercise(activeUnit.exercises[nextIdx]);
    } else {
      // Completed all exercises in unit!
      setLessonFinished(true);
      onAddXP?.(30);
      onSaveUnitCompletion?.(activeUnit.id);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // --- RENDER: LEVEL TREE MAP ---
  if (!activeUnit) {
    return (
      <div className="space-y-6 max-w-xl mx-auto pb-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              多鄰國互動模式 (Duolingo Style)
            </span>
            <h2 className="text-2xl font-black text-white pt-1">文法與助詞闖關</h2>
            <p className="text-xs text-slate-300">
              透過單詞拼句與助詞填空，徹底掌握日語核心造句邏輯！
            </p>
          </div>
        </div>

        {/* Units Path */}
        <div className="space-y-4">
          {GRAMMAR_UNITS.map((unit, index) => {
            const isCompleted = Boolean(progress?.unitsCompleted?.[unit.id]);
            const isAvailable = index === 0 || Boolean(progress?.unitsCompleted?.[GRAMMAR_UNITS[index - 1]?.id]);

            return (
              <div
                key={unit.id}
                className={`rounded-3xl border transition-all duration-200 p-4 sm:p-5 relative ${
                  isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                    : isAvailable
                      ? 'bg-slate-900/90 border-indigo-500/40 shadow-lg shadow-indigo-950/20'
                      : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                      isCompleted 
                        ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' 
                        : 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-300'
                    }`}>
                      {isCompleted ? '⭐' : unit.icon}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-indigo-400">
                        {unit.title.split(':')[0]}
                      </div>
                      <h3 className="text-base font-extrabold text-white">
                        {unit.title.split(':')[1] || unit.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {unit.subtitle}
                      </p>
                    </div>
                  </div>

                  {isCompleted && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold flex items-center space-x-1 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>已掌握</span>
                    </span>
                  )}
                </div>

                {/* Particle Chips in Unit */}
                <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 overflow-x-auto text-xs text-slate-400">
                    <span className="text-[11px] text-slate-500 shrink-0">核心助詞：</span>
                    {unit.particles.map(p => (
                      <span 
                        key={p.particle}
                        className="px-2 py-0.5 rounded-lg bg-slate-800 text-indigo-300 font-bold font-['Noto_Sans_JP']"
                      >
                        {p.particle} ({p.romaji})
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleStartUnit(unit)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/30 active:scale-95 transition-all flex items-center space-x-1 shrink-0 ml-2"
                  >
                    <span>{isCompleted ? '重新練習' : '開始闖關'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- RENDER: IN-GAME EXERCISE PLAYER ---
  const currentEx = activeUnit.exercises[exerciseIndex];
  const progressPercent = ((exerciseIndex + (answerStatus === 'correct' ? 1 : 0)) / activeUnit.exercises.length) * 100;

  return (
    <div className="space-y-4 max-w-xl mx-auto min-h-[75vh] flex flex-col justify-between">
      {/* Top Header: Exit, Progress Bar & Hearts */}
      <div>
        <div className="flex items-center justify-between pb-3">
          <button
            onClick={() => setActiveUnit(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 mx-3 h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Lives (Hearts) */}
          <div className="flex items-center space-x-1 text-rose-500 font-bold text-xs bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-xl">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span>{lives}</span>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-xs text-slate-400 px-1">
          {activeUnit.title} • 第 {exerciseIndex + 1} / {activeUnit.exercises.length} 題
        </div>
      </div>

      {/* --- EXERCISE CONTENT BODY --- */}
      {!lessonFinished ? (
        <div className="space-y-6 my-auto py-4">
          {/* Question Prompt */}
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {currentEx.prompt}
            </h3>
            {currentEx.chineseMeaning && (
              <p className="text-sm font-semibold text-indigo-300">
                中文句意：{currentEx.chineseMeaning}
              </p>
            )}
          </div>

          {/* 1. SENTENCE BUILDER MODE */}
          {currentEx.type === 'sentence_builder' && (
            <div className="space-y-6">
              {/* Answer Tray (Where chosen chips land) */}
              <div className="min-h-[70px] p-3 rounded-2xl bg-slate-900/90 border-2 border-dashed border-slate-700/80 flex flex-wrap gap-2 items-center">
                {selectedTokens.length === 0 ? (
                  <span className="text-xs text-slate-500 select-none">
                    點擊下方詞彙卡片進行句子拼裝...
                  </span>
                ) : (
                  selectedTokens.map((tokenObj) => (
                    <button
                      key={tokenObj.id}
                      onClick={() => handleRemoveToken(tokenObj)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-md font-['Noto_Sans_JP'] active:scale-95 transition-all"
                    >
                      {tokenObj.text}
                    </button>
                  ))
                )}
              </div>

              {/* Available Token Pool Bank */}
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {availableTokens.map((tokenObj) => (
                  <button
                    key={tokenObj.id}
                    onClick={() => handleAddToken(tokenObj)}
                    className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-base border border-slate-700/80 shadow-md active:scale-95 transition-all font-['Noto_Sans_JP']"
                  >
                    {tokenObj.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. PARTICLE CHOICE MODE */}
          {currentEx.type === 'particle_choice' && (
            <div className="space-y-6">
              {/* Sentence with Gap */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide font-['Noto_Sans_JP']">
                  {currentEx.sentenceTemplate.split('[ ? ]').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      <span>{part}</span>
                      {i < arr.length - 1 && (
                        <span className="inline-block px-4 py-1 mx-1.5 rounded-xl bg-indigo-500/20 border-2 border-indigo-400 text-indigo-300 font-bold min-w-[50px]">
                          {selectedParticle || '？'}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 4 Particle Choice Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {currentEx.options.map((particle) => {
                  const isSelected = selectedParticle === particle;
                  return (
                    <button
                      key={particle}
                      disabled={answerStatus !== null}
                      onClick={() => handleSelectParticle(particle)}
                      className={`p-4 rounded-2xl font-black text-2xl border transition-all active:scale-95 font-['Noto_Sans_JP'] ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                          : 'bg-slate-900/80 text-slate-200 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {particle}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* UNIT COMPLETED SCREEN */
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl my-auto animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 text-4xl">
            🏆
          </div>
          <h3 className="text-2xl font-black text-white">恭喜過關！</h3>
          <p className="text-slate-300 text-sm">
            您已成功完成 <strong className="text-white font-bold">{activeUnit.title}</strong> 的所有文法與助詞訓練！
          </p>
          <div className="text-xs font-bold text-indigo-400">
            獲得 XP：+40 點！
          </div>

          <div className="pt-4 flex space-x-3">
            <button
              onClick={() => setActiveUnit(null)}
              className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
            >
              返回關卡地圖
            </button>
          </div>
        </div>
      )}

      {/* --- BOTTOM ACTION / FEEDBACK SHEET (DUOLINGO STYLE) --- */}
      {!lessonFinished && (
        <div className="pt-4">
          {answerStatus === null ? (
            <button
              disabled={
                currentEx.type === 'sentence_builder'
                  ? selectedTokens.length === 0
                  : !selectedParticle
              }
              onClick={handleCheckAnswer}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white font-extrabold text-base shadow-lg shadow-emerald-600/30 active:scale-98 transition-all"
            >
              檢查答案
            </button>
          ) : answerStatus === 'correct' ? (
            <div className="bg-emerald-950/90 border border-emerald-500/50 rounded-3xl p-4 sm:p-5 flex items-center justify-between space-x-3 animate-slide-up">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2 text-emerald-400 font-black text-lg">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>太棒了！完全正確！</span>
                </div>
                <div className="text-xs text-emerald-200/80">
                  {currentEx.targetSentence || currentEx.chineseMeaning}
                </div>
              </div>
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm active:scale-95 transition-all shrink-0"
              >
                繼續
              </button>
            </div>
          ) : (
            <div className="bg-rose-950/90 border border-rose-500/50 rounded-3xl p-4 sm:p-5 space-y-3 animate-slide-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-rose-400 font-black text-lg">
                  <XCircle className="w-6 h-6" />
                  <span>哎呀，差一點點！</span>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs active:scale-95 transition-all"
                >
                  我知道了
                </button>
              </div>

              {/* Show correct answer & explanation */}
              <div className="text-xs text-rose-200/90 space-y-1">
                <div>
                  正確解答：
                  <strong className="text-white ml-1 font-bold">
                    {currentEx.targetSentence || `${currentEx.correctParticle} (${currentEx.sentenceTemplate?.replace('[ ? ]', currentEx.correctParticle)})`}
                  </strong>
                </div>
                {currentEx.explanation && (
                  <p className="text-slate-300 text-[11px] bg-slate-900/60 p-2.5 rounded-xl border border-rose-500/20">
                    💡 助詞解析：{currentEx.explanation}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
