import React from 'react';
import { Gamepad2, BookText, BookOpen, Layers, BarChart3 } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'duo', label: '闖關練習', icon: Gamepad2, badge: 'NEW' },
    { id: 'grammar', label: '文法助詞', icon: BookText, badge: null },
    { id: 'vocab', label: '生活單詞', icon: BookOpen, badge: null },
    { id: 'flashcards', label: 'SRS卡片', icon: Layers, badge: null },
    { id: 'dashboard', label: '成就同步', icon: BarChart3, badge: null },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/92 backdrop-blur-lg border-t border-slate-800/80 px-2 pb-[env(safe-area-inset-bottom,8px)] pt-1.5 transition-all">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-0.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-indigo-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              {/* Highlight background pill */}
              {isActive && (
                <span className="absolute inset-x-1 inset-y-1 bg-indigo-500/10 rounded-xl border border-indigo-500/20 -z-10" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 text-[8px] font-black uppercase tracking-wider bg-rose-500 text-white rounded-full scale-75">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] mt-1 tracking-tight truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
