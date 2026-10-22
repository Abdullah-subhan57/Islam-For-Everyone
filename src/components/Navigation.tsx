import React from 'react';
import {
  Home,
  BookOpen,
  BookMarked,
  Clock,
  Compass,
  HeartHandshake,
  Repeat,
  GraduationCap,
  Calendar,
  Shield,
  UserCheck,
  Bot,
  HandHeart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { PageId } from '../types';

interface NavItem {
  id: PageId;
  labelEn: string;
  labelUr: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', labelEn: 'Home', labelUr: 'مرکزی', icon: Home },
  { id: 'quran', labelEn: 'Quran', labelUr: 'قرآن', icon: BookOpen },
  { id: 'hadith', labelEn: 'Hadith', labelUr: 'حدیث', icon: BookMarked },
  { id: 'prayer', labelEn: 'Prayers', labelUr: 'نماز', icon: Clock },
  { id: 'account', labelEn: 'Salah Tracker', labelUr: 'صلوٰۃ', icon: UserCheck },
  { id: 'calendar', labelEn: 'Calendar', labelUr: 'کیلنڈر', icon: Calendar },
  { id: 'history', labelEn: 'History', labelUr: 'تاریخ', icon: Shield },
  { id: 'assistant', labelEn: 'AI Assistant', labelUr: 'اے آئی معاون', icon: Bot },
  { id: 'qibla', labelEn: 'Qibla', labelUr: 'قبلہ', icon: Compass },
  { id: 'duas', labelEn: 'Duas', labelUr: 'ادعیہ', icon: HeartHandshake },
  { id: 'tasbih', labelEn: 'Tasbih', labelUr: 'تسبیح', icon: Repeat },
  { id: 'quiz', labelEn: 'Quiz & 99', labelUr: 'کوئز', icon: GraduationCap },
  { id: 'ibadat', labelEn: 'Ibadat Guide', labelUr: 'عبادات گائیڈ', icon: HandHeart }
];

export const Navigation: React.FC = () => {
  const { activePage, setActivePage, language } = useApp();

  return (
    <>
      {/* Desktop Main Navigation Tabs */}
      <nav className="hidden lg:block border-b border-amber-200/50 dark:border-amber-900/30 bg-[#FAF7F2] dark:bg-[#0c1322]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-start space-x-1 rtl:space-x-reverse overflow-x-auto py-2 no-scrollbar">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const label = language === 'ur' ? item.labelUr : item.labelEn;

              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`group relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-emerald-900 text-amber-300 shadow-md border-t-2 border-amber-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-emerald-900 dark:hover:text-amber-300 hover:bg-emerald-50/60 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-amber-300' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  />
                  <span className={language === 'ur' ? 'font-nastaliq text-xs' : ''}>{label}</span>
                  {isActive && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-amber-400"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Floating / Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 dark:bg-[#0B1120]/95 backdrop-blur-lg border-t border-amber-200/60 dark:border-amber-900/40 px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around overflow-x-auto no-scrollbar gap-1">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            const label = language === 'ur' ? item.labelUr : item.labelEn;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-all shrink-0 ${
                  isActive
                    ? 'text-emerald-800 dark:text-amber-300 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <div
                  className={`p-1 rounded-full ${
                    isActive ? 'bg-emerald-100 dark:bg-emerald-950 border border-amber-400/30' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-[9px] mt-0.5 truncate max-w-[50px] ${
                    language === 'ur' ? 'font-nastaliq text-[10px] leading-tight' : ''
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
