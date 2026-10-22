import React, { useEffect } from 'react';
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
  HandHeart,
  X
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

interface NavigationProps {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isMobileMenuOpen, onCloseMobileMenu }) => {
  const { activePage, setActivePage, language } = useApp();

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseMobileMenu();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobileMenuOpen, onCloseMobileMenu]);

  const selectPage = (page: PageId) => {
    setActivePage(page);
    onCloseMobileMenu();
  };

  return (
    <>
      {/* Desktop Main Navigation Tabs */}
      <nav className="hidden lg:block border-b border-amber-200/50 dark:border-amber-900/30 bg-[#F7FBFF] dark:bg-[#0B1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-start space-x-1 rtl:space-x-reverse overflow-x-auto py-2 no-scrollbar">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const label = language === 'ur' ? item.labelUr : item.labelEn;

              return (
                <button
                  key={item.id}
                  onClick={() => selectPage(item.id)}
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

      <div className={`lg:hidden fixed inset-0 z-50 ${isMobileMenuOpen ? '' : 'pointer-events-none invisible'}`}>
        <button
          type="button"
          onClick={onCloseMobileMenu}
          aria-label={language === 'ur' ? 'مینو بند کریں' : 'Close navigation menu'}
          tabIndex={isMobileMenuOpen ? 0 : -1}
          className={`absolute inset-0 h-full w-full bg-slate-950/50 backdrop-blur-sm transition-opacity duration-200 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <nav
          id="mobile-navigation"
          aria-label={language === 'ur' ? 'مرکزی نیویگیشن' : 'Main navigation'}
          aria-hidden={!isMobileMenuOpen}
          className={`absolute top-0 flex h-full w-[min(21rem,86vw)] flex-col overflow-y-auto bg-[#F7FBFF] p-4 shadow-2xl transition-transform duration-200 dark:bg-[#0B1424] ${language === 'ur' ? 'left-0 border-r' : 'right-0 border-l'} border-amber-200/70 dark:border-amber-900/50 ${isMobileMenuOpen ? 'translate-x-0' : language === 'ur' ? '-translate-x-full' : 'translate-x-full'}`}
        >
          <div className="mb-3 flex items-center justify-between border-b border-amber-200/70 pb-3 dark:border-amber-900/50">
            <div>
              <p className="font-title text-lg font-bold text-emerald-950 dark:text-amber-200">
                {language === 'ur' ? 'اسلام فار ایوری ون' : 'Islam for Everyone'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ur' ? 'نیویگیشن' : 'Navigate to'}
              </p>
            </div>
            <button
              type="button"
              onClick={onCloseMobileMenu}
              aria-label={language === 'ur' ? 'مینو بند کریں' : 'Close navigation menu'}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="rounded-xl p-2 text-slate-600 hover:bg-emerald-50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            const label = language === 'ur' ? item.labelUr : item.labelEn;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectPage(item.id)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                className={`flex min-h-12 items-center gap-3 rounded-xl px-3 py-2.5 text-left rtl:text-right transition-colors ${
                  isActive
                    ? 'bg-emerald-950 text-amber-200 shadow-sm'
                    : 'text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-amber-300' : 'text-emerald-700 dark:text-cyan-300'}`} />
                <span className={`text-sm font-semibold ${language === 'ur' ? 'font-nastaliq' : ''}`}>{label}</span>
                {isActive && <span className="ml-auto rtl:mr-auto rtl:ml-0 h-2 w-2 rounded-full bg-amber-300" />}
              </button>
            );
          })}
          </div>
        </nav>
      </div>
    </>
  );
};
