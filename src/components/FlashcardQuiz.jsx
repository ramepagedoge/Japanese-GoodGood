import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Check, Sparkles, HelpCircle, Trophy, ArrowRight, BookOpen, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEION_DATA, DAKUON_DATA, YOON_DATA } from '../data/kanaData';
import { VOCAB_DATA } from '../data/vocabData';
import { playJapaneseAudio } from '../services/audioService';

export default function FlashcardQuiz({ progress, onUpdateSRS, onAddXP, onQuizComplete }) {
  const [practiceMode, setPracticeMode] = useState('flashcard'); // 'flashcard' | 'quiz'
  const [sourceData, setSourceData] = useState('kana'); // 'kana' | 'vocab'

  // --- Flashcard State ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeDeck, setActiveDeck] = useState([]);

  // --- Quiz Mode State ---
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Initialize Decks
  useEffect(() => {
    initializeCards();
  }, [sourceData]);

  const initializeCards = () => {
    let pool = [];
    if (sourceData === 'kana') {
      pool = [...SEION_DATA, ...DAKUON_DATA];
    } else {
      pool = [...VOCAB_DATA];
    }
    // Shuffle
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setActiveDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = (confidenceLevel) => {
    // confidence: 'again' | 'hard' | 'good'
    const currentCard = activeDeck[currentIndex];
    if (currentCard) {
      if (confidenceLevel === 'good') {
        onAddXP?.(5);
        onUpdateSRS?.(currentCard.id, 1);
      } else {
        onUpdateSRS?.(currentCard.id, 0);
      }
    }

    setIsFlipped(false);
    if (currentIndex + 1 < activeDeck.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Re-shuffle when finished deck
      initializeCards();
    }
  };

  // --- Quiz Generator ---
  const startQuiz = () => {
    let pool = sourceData === 'kana' ? [...SEION_DATA, ...DAKUON_DATA] : [...VOCAB_DATA];
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);

    const questions = shuffledPool.map((item) => {
      // Pick 3 random distractors
      const distractors = pool
        .filter(p => p.id !== item.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const options = [item, ...distractors].sort(() => 0.5 - Math.random());

      // Random question style: audio listening (40%) or visual recognition (60%)
      const isAudioType = Math.random() < 0.4;

      return {
        item,
        isAudioType,
        options,
        correctId: item.id
      };
    });

    setQuizQuestions(questions);
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsQuizFinished(false);

    // Auto play audio for first question if it's audio question
    if (questions[0]?.isAudioType) {
      playJapaneseAudio(questions[0].item.japanese || questions[0].item.hiragana);
    }
  };

  const handleOptionSelect = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const q = quizQuestions[quizIndex];
    const isCorrect = option.id === q.correctId;

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      onAddXP?.(10);
      // Play audio on correct
      playJapaneseAudio(q.item.japanese || q.item.hiragana);
    }

    // Auto advance after 1.2s
    setTimeout(() => {
      if (quizIndex + 1 < quizQuestions.length) {
        setQuizIndex(quizIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        const nextQ = quizQuestions[quizIndex + 1];
        if (nextQ.isAudioType) {
          playJapaneseAudio(nextQ.item.japanese || nextQ.item.hiragana);
        }
      } else {
        finishQuiz(quizScore + (isCorrect ? 1 : 0));
      }
    }, 1200);
  };

  const finishQuiz = (finalScore) => {
    setIsQuizFinished(true);
    onQuizComplete?.(finalScore, quizQuestions.length);

    if (finalScore >= 7) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const currentCard = activeDeck[currentIndex];

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {/* Top Switcher: Flashcard vs Quiz & Kana vs Vocab */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-3 border border-slate-800 space-y-3">
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 text-xs font-semibold">
          <button
            onClick={() => setPracticeMode('flashcard')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
              practiceMode === 'flashcard' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3D 翻轉記憶卡</span>
          </button>
          <button
            onClick={() => {
              setPracticeMode('quiz');
              startQuiz();
            }}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
              practiceMode === 'quiz' 
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>速測四選一 (10題)</span>
          </button>
        </div>

        {/* Source Data Filter */}
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-slate-400">練習題庫：</span>
          <div className="inline-flex bg-slate-950 rounded-lg p-0.5 border border-slate-800">
            <button
              onClick={() => setSourceData('kana')}
              className={`px-3 py-1 rounded-md transition-all ${
                sourceData === 'kana' ? 'bg-slate-800 text-indigo-300 font-bold' : 'text-slate-400'
              }`}
            >
              五十音
            </button>
            <button
              onClick={() => setSourceData('vocab')}
              className={`px-3 py-1 rounded-md transition-all ${
                sourceData === 'vocab' ? 'bg-slate-800 text-indigo-300 font-bold' : 'text-slate-400'
              }`}
            >
              N5 生活單字
            </button>
          </div>
        </div>
      </div>

      {/* --- MODE 1: FLASHCARDS --- */}
      {practiceMode === 'flashcard' && currentCard && (
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>進度：卡片 {currentIndex + 1} / {activeDeck.length}</span>
            <button 
              onClick={initializeCards}
              className="flex items-center space-x-1 text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重新洗牌</span>
            </button>
          </div>

          {/* 3D Flip Card Container */}
          <div 
            onClick={handleFlip}
            className="w-full h-80 sm:h-96 cursor-pointer perspective-1000 select-none group"
          >
            <div 
              className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT OF CARD */}
              <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 shadow-2xl p-6 flex flex-col justify-between items-center text-center">
                <div className="w-full flex justify-between items-center text-xs text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 font-medium text-slate-400">
                    {sourceData === 'kana' ? '五十音挑戰' : '常用單字'}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playJapaneseAudio(currentCard.japanese || currentCard.hiragana);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors"
                    title="聆聽發音"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Central Focus Item */}
                <div className="py-4 space-y-2">
                  <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-wide font-['Noto_Sans_JP']">
                    {currentCard.japanese || currentCard.hiragana}
                  </div>
                  {currentCard.kanji && currentCard.kanji !== currentCard.japanese && (
                    <div className="text-lg text-slate-400">
                      ({currentCard.kanji})
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-500 flex items-center space-x-1.5 animate-pulse">
                  <span>點擊卡片翻面看解答</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950/30 to-slate-950 border border-indigo-500/30 shadow-2xl p-6 flex flex-col justify-between items-center text-center">
                <div className="w-full flex justify-between items-center text-xs text-indigo-400">
                  <span className="font-semibold">羅馬拼音：{currentCard.romaji}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      playJapaneseAudio(currentCard.japanese || currentCard.hiragana, 0.75);
                    }}
                    className="p-1.5 rounded-xl bg-slate-800/90 text-indigo-300 hover:text-white transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Answer Info */}
                <div className="space-y-3 py-2">
                  <div className="text-2xl sm:text-3xl font-black text-indigo-300">
                    {currentCard.meaning || currentCard.chinese}
                  </div>

                  {currentCard.mnemonic && (
                    <div className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl text-left max-w-xs mx-auto">
                      💡 口訣：{currentCard.mnemonic}
                    </div>
                  )}

                  {currentCard.note && (
                    <div className="text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-xl max-w-xs mx-auto">
                      📝 {currentCard.note}
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500">
                  請評估記憶熟悉度以進入下一張
                </div>
              </div>
            </div>
          </div>

          {/* Action rating buttons below card */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleNextCard('again')}
              className="py-3 px-2 rounded-2xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-rose-300 text-xs font-bold active:scale-95 transition-all text-center"
            >
              ❌ 忘記了 (重來)
            </button>
            <button
              onClick={() => handleNextCard('hard')}
              className="py-3 px-2 rounded-2xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/30 text-amber-300 text-xs font-bold active:scale-95 transition-all text-center"
            >
              ⚠️ 還不熟 (稍後)
            </button>
            <button
              onClick={() => handleNextCard('good')}
              className="py-3 px-2 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-bold active:scale-95 transition-all text-center shadow-lg shadow-emerald-950/40"
            >
              ✅ 記住了 (+5 XP)
            </button>
          </div>
        </div>
      )}

      {/* --- MODE 2: SPEED QUIZ --- */}
      {practiceMode === 'quiz' && !isQuizFinished && quizQuestions.length > 0 && (
        <div className="space-y-4">
          {/* Header Progress */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>第 {quizIndex + 1} / {quizQuestions.length} 題</span>
            <span className="font-bold text-indigo-400">目前得分：{quizScore}</span>
          </div>

          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 text-center space-y-4 shadow-xl">
            {quizQuestions[quizIndex].isAudioType ? (
              <div className="space-y-3 py-3">
                <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                  🎧 聽音辨音題
                </div>
                <button
                  onClick={() => playJapaneseAudio(quizQuestions[quizIndex].item.japanese || quizQuestions[quizIndex].item.hiragana)}
                  className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
                >
                  <Volume2 className="w-8 h-8" />
                </button>
                <div className="text-xs text-slate-400">
                  點擊重聽發音，選出正確的對應字
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-3">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  請選出正確意思或讀音
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white font-['Noto_Sans_JP']">
                  {quizQuestions[quizIndex].item.japanese || quizQuestions[quizIndex].item.hiragana}
                </div>
                {quizQuestions[quizIndex].item.kanji && (
                  <div className="text-sm text-slate-400">
                    ({quizQuestions[quizIndex].item.kanji})
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="grid grid-cols-2 gap-2.5">
            {quizQuestions[quizIndex].options.map((opt) => {
              const isSelected = selectedOption?.id === opt.id;
              const isCorrectOpt = opt.id === quizQuestions[quizIndex].correctId;

              let btnStyle = 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200';
              if (isAnswered) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-300 font-bold';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleOptionSelect(opt)}
                  className={`p-4 rounded-2xl border text-sm font-semibold transition-all active:scale-98 flex flex-col items-center justify-center min-h-[70px] ${btnStyle}`}
                >
                  {/* If source is vocab, show Chinese; if kana, show romaji or kana */}
                  {sourceData === 'vocab' ? (
                    <span className="text-center">{opt.chinese || opt.meaning}</span>
                  ) : quizQuestions[quizIndex].isAudioType ? (
                    <span className="text-xl font-bold font-['Noto_Sans_JP']">{opt.hiragana} ({opt.romaji})</span>
                  ) : (
                    <span className="text-base">{opt.romaji}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quiz Finished Result Screen */}
      {isQuizFinished && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white">測驗完成！</h3>
          <p className="text-slate-300 text-sm">
            您的成績是 <strong className="text-emerald-400 text-xl">{quizScore}</strong> / {quizQuestions.length} 分
          </p>
          <div className="text-xs text-indigo-400 font-medium">
            獲得 XP：+{quizScore * 10} 點！
          </div>

          <div className="pt-3 flex space-x-3">
            <button
              onClick={startQuiz}
              className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
            >
              再測一次
            </button>
            <button
              onClick={() => setPracticeMode('flashcard')}
              className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs active:scale-95 transition-all"
            >
              返回記憶卡
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
