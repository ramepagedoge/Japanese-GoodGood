import React from 'react';
import { Sparkles, Flame, Cloud, CloudOff, RefreshCw, Settings, LogIn, LogOut, Grid3X3 } from 'lucide-react';
import { loginWithGoogle, logoutUser, isFirebaseConfigured } from '../services/firebaseService';

export default function Navbar({ 
  user, 
  streak, 
  isSyncing, 
  onOpenSettings, 
  onOpenKana,
  onNotification 
}) {
  const isCloudReady = isFirebaseConfigured();

  const handleGoogleAuth = async () => {
    if (!isCloudReady) {
      onOpenSettings();
      onNotification?.('請先在設定中輸入 Firebase 設定以啟用 Google 雲端同步', 'info');
      return;
    }

    try {
      if (user) {
        await logoutUser();
        onNotification?.('已成功登出', 'success');
      } else {
        await loginWithGoogle();
        onNotification?.('Google 登入成功！學習進度已同步至雲端', 'success');
      }
    } catch (err) {
      console.error(err);
      onNotification?.(err.message || '登入失敗，請檢查網路或設定', 'error');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* App Title & Logo */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20 text-white font-black text-lg">
            日
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                NihongoFlow
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              初學日語極速上手・手機雲端同步
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Daily Streak Flame */}
          <div 
            title={`連續學習 ${streak?.count || 1} 天！`}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-semibold"
          >
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{streak?.count || 1} 天</span>
          </div>

          {/* Cloud Sync State Indicator */}
          <button
            onClick={onOpenSettings}
            className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              user 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' 
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800'
            }`}
            title={user ? '雲端同步啟動中' : '本機模式（點擊設定雲端）'}
          >
            {isSyncing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>同步中</span>
              </>
            ) : user ? (
              <>
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                <span>已同步</span>
              </>
            ) : (
              <>
                <CloudOff className="w-3.5 h-3.5 text-slate-400" />
                <span>本機儲存</span>
              </>
            )}
          </button>

          {/* User Profile or Google Login Button */}
          {user ? (
            <div className="flex items-center space-x-2 pl-1">
              <button
                onClick={handleGoogleAuth}
                className="group flex items-center space-x-2 p-1 pr-2.5 rounded-full bg-slate-800/80 border border-slate-700/60 hover:border-slate-600 transition-all text-xs"
                title="點擊登出"
              >
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || '用戶'} 
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="max-w-[70px] sm:max-w-[100px] truncate text-slate-300 font-medium hidden sm:inline">
                  {user.displayName || '已登入'}
                </span>
                <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400 transition-colors ml-0.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleAuth}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Google 同步</span>
              <span className="sm:hidden">登入</span>
            </button>
          )}

          {/* Optional Quick Kana Reference Button */}
          <button
            onClick={onOpenKana}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-all active:scale-95"
            title="五十音快速查閱表 (已熟記可隨時查閱)"
          >
            <Grid3X3 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">五十音</span>
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/70 border border-transparent hover:border-slate-700 transition-all active:scale-95"
            aria-label="系統設定"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
