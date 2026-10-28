import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import DuoLesson from './components/DuoLesson';
import GrammarGuide from './components/GrammarGuide';
import VocabList from './components/VocabList';
import FlashcardQuiz from './components/FlashcardQuiz';
import KanaChart from './components/KanaChart';
import Dashboard from './components/Dashboard';
import SettingsModal from './components/SettingsModal';
import { X } from 'lucide-react';
import { 
  getLocalProgress, 
  saveLocalProgress, 
  onAuthChange, 
  syncProgressToCloud, 
  fetchCloudProgress, 
  subscribeToCloudProgress,
  DEFAULT_PROGRESS 
} from './services/firebaseService';

export default function App() {
  // Default to Duolingo-style lesson mode!
  const [activeTab, setActiveTab] = useState('duo'); // 'duo' | 'grammar' | 'vocab' | 'flashcards' | 'dashboard'
  const [progress, setProgress] = useState(getLocalProgress);
  const [user, setUser] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isKanaModalOpen, setIsKanaModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 3200);
  }, []);

  // Sync state helper
  const updateProgressAndSync = useCallback((newProgress, isDirectFromCloud = false) => {
    setProgress(newProgress);
    saveLocalProgress(newProgress);

    if (!isDirectFromCloud && user) {
      setIsSyncing(true);
      syncProgressToCloud(user, newProgress)
        .catch((e) => console.warn('Cloud sync error:', e))
        .finally(() => setIsSyncing(false));
    }
  }, [user]);

  // Auth Listener & Cloud Setup
  useEffect(() => {
    const unsubscribeAuth = onAuthChange(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsSyncing(true);
        try {
          const cloudData = await fetchCloudProgress(currentUser);
          if (cloudData) {
            const currentLocal = getLocalProgress();
            const merged = {
              ...currentLocal,
              ...cloudData,
              kanaMastered: { ...(currentLocal.kanaMastered || {}), ...(cloudData.kanaMastered || {}) },
              vocabMastered: { ...(currentLocal.vocabMastered || {}), ...(cloudData.vocabMastered || {}) },
              unitsCompleted: { ...(currentLocal.unitsCompleted || {}), ...(cloudData.unitsCompleted || {}) },
              xp: Math.max(currentLocal.xp || 0, cloudData.xp || 0),
              streak: {
                count: Math.max(currentLocal.streak?.count || 1, cloudData.streak?.count || 1),
                lastActiveDate: new Date().toISOString().slice(0, 10)
              },
              updatedAt: Date.now()
            };
            updateProgressAndSync(merged, true);
            showNotification(`歡迎回來 ${currentUser.displayName || ''}！進度已同步`, 'success');
          } else {
            await syncProgressToCloud(currentUser, progress);
            showNotification('已將目前的學習進度備份至您的 Google 雲端！', 'success');
          }
        } catch (err) {
          console.error('Initial cloud sync error:', err);
        } finally {
          setIsSyncing(false);
        }
      }
    });

    return () => unsubscribeAuth();
  }, [showNotification, updateProgressAndSync]);

  // Real-time Cloud updates listener
  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToCloudProgress(user, (cloudProg) => {
      if (cloudProg && cloudProg.updatedAt && (!progress.updatedAt || cloudProg.updatedAt > progress.updatedAt)) {
        setProgress(cloudProg);
        saveLocalProgress(cloudProg);
      }
    });
    return () => unsub();
  }, [user, progress.updatedAt]);

  // Unit completion in Duo mode
  const handleSaveUnitCompletion = (unitId) => {
    const updated = {
      ...progress,
      unitsCompleted: {
        ...(progress.unitsCompleted || {}),
        [unitId]: true
      }
    };
    updateProgressAndSync(updated);
    showNotification('恭喜突破關卡！已記錄至雲端與本機', 'success');
  };

  const handleToggleKanaMastery = (id) => {
    const updated = {
      ...progress,
      kanaMastered: {
        ...(progress.kanaMastered || {}),
        [id]: !progress.kanaMastered?.[id]
      }
    };
    updateProgressAndSync(updated);
  };

  const handleToggleVocabMastery = (id) => {
    const updated = {
      ...progress,
      vocabMastered: {
        ...(progress.vocabMastered || {}),
        [id]: !progress.vocabMastered?.[id]
      }
    };
    updateProgressAndSync(updated);
  };

  const handleAddXP = (amount) => {
    const updated = {
      ...progress,
      xp: (progress.xp || 0) + amount
    };
    updateProgressAndSync(updated);
  };

  const handleQuizComplete = (score, total) => {
    const updated = {
      ...progress,
      quizStats: {
        total: (progress.quizStats?.total || 0) + total,
        correct: (progress.quizStats?.correct || 0) + score
      }
    };
    updateProgressAndSync(updated);
  };

  const handleUpdateSRS = (itemId, score) => {
    const updated = {
      ...progress,
      kanaSRS: {
        ...(progress.kanaSRS || {}),
        [itemId]: {
          streak: (progress.kanaSRS?.[itemId]?.streak || 0) + (score > 0 ? 1 : 0),
          lastReviewed: Date.now()
        }
      }
    };
    updateProgressAndSync(updated);
  };

  const handleManualSync = async () => {
    if (!user) {
      setIsSettingsOpen(true);
      showNotification('請先登入 Google 帳號以啟用雲端同步', 'info');
      return;
    }
    setIsSyncing(true);
    try {
      await syncProgressToCloud(user, progress);
      showNotification('手動雲端備份成功！', 'success');
    } catch (e) {
      showNotification('同步失敗：' + e.message, 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleImportProgress = (imported) => {
    updateProgressAndSync(imported);
  };

  const handleResetProgress = () => {
    const reset = { ...DEFAULT_PROGRESS, updatedAt: Date.now() };
    updateProgressAndSync(reset);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        user={user}
        streak={progress.streak}
        isSyncing={isSyncing}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenKana={() => setIsKanaModalOpen(true)}
        onNotification={showNotification}
      />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce pointer-events-none">
          <div className={`px-4 py-2 rounded-2xl shadow-xl text-xs font-bold border backdrop-blur-md flex items-center space-x-2 ${
            notification.type === 'success' 
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300' 
              : notification.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/50 text-rose-300'
                : 'bg-indigo-950/90 border-indigo-500/50 text-indigo-300'
          }`}>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Study Arena */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-4 py-4 pb-28">
        {/* TAB 1: DUOLINGO LESSON MODE (DEFAULT) */}
        {activeTab === 'duo' && (
          <DuoLesson
            progress={progress}
            onSaveUnitCompletion={handleSaveUnitCompletion}
            onAddXP={handleAddXP}
            onOpenGrammarUnit={() => setActiveTab('grammar')}
          />
        )}

        {/* TAB 2: SYSTEMATIC GRAMMAR & PARTICLES */}
        {activeTab === 'grammar' && (
          <GrammarGuide
            onStartUnitPractice={() => setActiveTab('duo')}
          />
        )}

        {/* TAB 3: N5 SURVIVAL & SITUATIONAL VOCABULARY */}
        {activeTab === 'vocab' && (
          <VocabList
            progress={progress}
            onToggleVocabMastery={handleToggleVocabMastery}
            onAddXP={handleAddXP}
          />
        )}

        {/* TAB 4: SRS FLASHCARDS & SPEED QUIZZES */}
        {activeTab === 'flashcards' && (
          <FlashcardQuiz
            progress={progress}
            onUpdateSRS={handleUpdateSRS}
            onAddXP={handleAddXP}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {/* TAB 5: DASHBOARD & CLOUD SYNC */}
        {activeTab === 'dashboard' && (
          <Dashboard
            user={user}
            progress={progress}
            onManualSync={handleManualSync}
            isSyncing={isSyncing}
            onOpenSettings={() => setIsSettingsOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Mobile Safe Bottom Navigation (5 tabs) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Settings & Firebase Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        progress={progress}
        onImportProgress={handleImportProgress}
        onResetProgress={handleResetProgress}
        onNotification={showNotification}
      />

      {/* Optional Quick Fifty-Kana Reference Modal (For learners who already know it) */}
      {isKanaModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setIsKanaModalOpen(false)}
        >
          <div 
            className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-4 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white">五十音速查對照表</h3>
                <p className="text-xs text-slate-400">已熟記五十音時，隨時點擊查閱發音與字形</p>
              </div>
              <button 
                onClick={() => setIsKanaModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <KanaChart
              progress={progress}
              onToggleKanaMastery={handleToggleKanaMastery}
              onAddXP={handleAddXP}
            />
          </div>
        </div>
      )}
    </div>
  );
}
