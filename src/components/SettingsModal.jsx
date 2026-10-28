import React, { useState, useRef } from 'react';
import { X, Key, Cloud, Download, Upload, Trash2, Volume2, Check, ExternalLink, HelpCircle, ShieldCheck } from 'lucide-react';
import { getSavedFirebaseConfig, saveFirebaseConfig, isFirebaseConfigured, logoutUser, loginWithGoogle } from '../services/firebaseService';
import { playJapaneseAudio } from '../services/audioService';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  user, 
  progress, 
  onImportProgress, 
  onResetProgress, 
  onNotification 
}) {
  const [activeTab, setActiveTab] = useState('cloud'); // 'cloud' | 'backup' | 'audio'
  const fileInputRef = useRef(null);

  // Form state for Firebase config
  const existingConfig = getSavedFirebaseConfig() || {};
  const [apiKey, setApiKey] = useState(existingConfig.apiKey || '');
  const [authDomain, setAuthDomain] = useState(existingConfig.authDomain || '');
  const [projectId, setProjectId] = useState(existingConfig.projectId || '');
  const [storageBucket, setStorageBucket] = useState(existingConfig.storageBucket || '');
  const [messagingSenderId, setMessagingSenderId] = useState(existingConfig.messagingSenderId || '');
  const [appId, setAppId] = useState(existingConfig.appId || '');
  const [rawJsonInput, setRawJsonInput] = useState('');
  const [showRawJson, setShowRawJson] = useState(false);

  if (!isOpen) return null;

  const handleSaveConfig = (e) => {
    e.preventDefault();
    try {
      let finalConfig = {};
      if (showRawJson && rawJsonInput.trim()) {
        finalConfig = JSON.parse(rawJsonInput);
      } else {
        finalConfig = {
          apiKey: apiKey.trim(),
          authDomain: authDomain.trim(),
          projectId: projectId.trim(),
          storageBucket: storageBucket.trim(),
          messagingSenderId: messagingSenderId.trim(),
          appId: appId.trim()
        };
      }

      if (!finalConfig.apiKey || !finalConfig.projectId) {
        alert('請至少填寫 apiKey 與 projectId');
        return;
      }

      saveFirebaseConfig(finalConfig);
      onNotification?.('Firebase 設定已儲存！頁面已重新載入以連接服務', 'success');
      onClose();
    } catch (err) {
      alert('解析設定失敗，請確認格式正確：' + err.message);
    }
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nihongoflow_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onNotification?.('學習進度已成功匯出為 JSON 備份檔', 'success');
  };

  // Import JSON backup
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported && (imported.kanaMastered || imported.vocabMastered || imported.xp !== undefined)) {
          onImportProgress(imported);
          onNotification?.('備份進度已成功匯入！', 'success');
          onClose();
        } else {
          alert('匯入的檔案格式不符合 NihongoFlow 備份標準');
        }
      } catch (err) {
        alert('無法解析檔案：' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleClearProgress = () => {
    if (window.confirm('確定要清除所有學習紀錄與單字掌握狀態嗎？此動作無法復原。')) {
      onResetProgress();
      onNotification?.('學習紀錄已重設為初始狀態', 'info');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">系統與跨裝置同步設定</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Pills */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'cloud' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Google 雲端同步
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'backup' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            備份與還原
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'audio' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            語音發音設定
          </button>
        </div>

        {/* TAB 1: CLOUD CONFIG */}
        {activeTab === 'cloud' && (
          <div className="space-y-4 text-xs">
            {/* Current user status */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">目前登入帳號：</span>
                <span className="font-bold text-white">
                  {user ? user.email : '未登入 (本機訪客模式)'}
                </span>
              </div>
              {user ? (
                <button
                  onClick={async () => {
                    await logoutUser();
                    onNotification?.('已登出帳號', 'info');
                  }}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-rose-900/50 hover:text-rose-300 text-slate-300 font-bold transition-colors"
                >
                  登出 Google 帳號
                </button>
              ) : isFirebaseConfigured() ? (
                <button
                  onClick={async () => {
                    try {
                      await loginWithGoogle();
                      onNotification?.('登入成功！', 'success');
                    } catch (e) {
                      alert(e.message);
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md"
                >
                  使用 Google 帳號登入並同步
                </button>
              ) : null}
            </div>

            {/* Firebase Config Setup Form */}
            <form onSubmit={handleSaveConfig} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300 flex items-center space-x-1">
                  <Key className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Firebase 設定金鑰</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="text-indigo-400 hover:underline text-[11px]"
                >
                  {showRawJson ? '切換為個別欄位輸入' : '貼上完整 JSON 物件'}
                </button>
              </div>

              {showRawJson ? (
                <textarea
                  rows={6}
                  value={rawJsonInput}
                  onChange={(e) => setRawJsonInput(e.target.value)}
                  placeholder={`{\n  "apiKey": "AIzaSy...",\n  "authDomain": "...",\n  "projectId": "..."\n}`}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              ) : (
                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] text-slate-400">API Key *</label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-400">Auth Domain</label>
                      <input
                        type="text"
                        value={authDomain}
                        onChange={(e) => setAuthDomain(e.target.value)}
                        placeholder="your-app.firebaseapp.com"
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">Project ID *</label>
                      <input
                        type="text"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        placeholder="your-project-id"
                        className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md active:scale-95"
              >
                儲存設定並啟用雲端同步
              </button>
            </form>

            {/* Fast 3-Step Guide */}
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2">
              <div className="font-bold text-slate-300 flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>如何 2 分鐘免費建立自己的 Firebase 同步？</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 leading-relaxed pl-1 text-[11px]">
                <li>前往 <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-indigo-400 underline inline-flex items-center">Firebase 官網 <ExternalLink className="w-3 h-3 ml-0.5" /></a> 免費「新增專案」。</li>
                <li>點擊「Authentication」啟用「Google」登入服務。</li>
                <li>點擊「Firestore Database」建立資料庫（測試模式允許讀寫）。</li>
                <li>在「專案設定 (Project Settings)」網頁應用程式中複製金鑰貼入上方即可！</li>
              </ol>
            </div>
          </div>
        )}

        {/* TAB 2: BACKUP & RESTORE */}
        {activeTab === 'backup' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="font-bold text-slate-200">免帳號手動備份檔</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                若不想註冊 Firebase，您也可以隨時把學習成果下載為一個 JSON 檔案。在任何手機或電腦上開啟此檔案即可完美還原進度！
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleExportBackup}
                  className="py-2.5 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-bold flex items-center justify-center space-x-1.5 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>匯出備份 JSON</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold flex items-center justify-center space-x-1.5 transition-all active:scale-95"
                >
                  <Upload className="w-4 h-4" />
                  <span>匯入還原進度</span>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImportFile} 
                  accept=".json" 
                  className="hidden" 
                />
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-rose-950/20 border border-rose-500/30 p-4 rounded-2xl space-y-2">
              <div className="font-bold text-rose-400 flex items-center space-x-1.5">
                <Trash2 className="w-4 h-4" />
                <span>危險區域</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                重設所有進度、清空五十音掌握狀態、重設連續打卡天數。
              </p>
              <button
                onClick={handleClearProgress}
                className="py-2 px-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 font-semibold transition-all active:scale-95"
              >
                重設並清除所有學習紀錄
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: AUDIO SETTINGS */}
        {activeTab === 'audio' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="font-bold text-slate-200">日語發音引擎 (Web Speech API)</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                本系統採用瀏覽器內建的原生日語語音引擎（支援 Apple Siri、Google Japanese 等原生音質），無需網路傳輸，手機與電腦均享有零延遲發音。
              </p>

              <div className="pt-2">
                <button
                  onClick={() => playJapaneseAudio('こんにちは、日本語の勉強を始めましょう！', 0.85)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-200 font-bold flex items-center justify-center space-x-2 transition-all active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>測試播放語音：「こんにちは」</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
