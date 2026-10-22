import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  Moon,
  Sun,
  Search,
  Landmark,
  Compass,
  Clock,
  Award,
  Sparkles,
  Upload,
  User,
  ShieldCheck,
  Bot,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { PrayerTimesService } from '../services/prayerTimes';
import { AIAssistantPage } from '../pages/AIAssistantPage';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, onMobileMenuToggle }) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    bookmarks,
    setIsSearchOpen,
    setIsBookmarksOpen,
    setIsDatasetModalOpen,
    userProfile,
    setActivePage
  } = useApp();

  const t = useTranslation(language);
  const hijri = PrayerTimesService.getHijriDate();

  const gregorianDate = new Intl.DateTimeFormat(language === 'ur' ? 'ur-PK' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  useEffect(() => {
    if (!isAssistantOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsAssistantOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isAssistantOpen]);

  return (
    <>
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 bg-[#F7FBFF]/90 dark:bg-[#0B1424]/90 border-amber-200/60 dark:border-amber-900/40 shadow-xs">
      {/* Top Traditional Calligraphic & Hijri Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-blue-950 to-emerald-950 text-amber-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold tracking-wider text-amber-300">
            {language === 'ur' ? hijri.formattedUr : hijri.formattedEn}
          </span>
          <span className="text-emerald-400/60 hidden sm:inline">|</span>
          <span className="text-emerald-200/80 hidden sm:inline">{gregorianDate}</span>
        </div>

        {/* Streak & Bismillah Motif */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('account')}
            className="flex items-center gap-1.5 bg-emerald-800/60 hover:bg-emerald-700/60 px-2.5 py-0.5 rounded-full border border-amber-400/20 text-amber-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-medium text-[11px]">
              {userProfile.currentStreak} {t.todayStreak} ({userProfile.totalPoints} pts)
            </span>
          </button>

          <span className="font-quran text-amber-200/90 text-sm hidden md:inline tracking-wide">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo with Andalusian Arch Crest */}
        <button
          onClick={() => setActivePage('home')}
          className="flex min-w-0 items-center gap-2 sm:gap-3 text-left rtl:text-right cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-emerald-950 text-amber-300 shadow-md border border-amber-400/60">
            <Landmark className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
            <Moon className="absolute -right-1 -top-1 h-3.5 w-3.5 fill-amber-300 text-amber-300" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="max-w-[6.5rem] truncate font-title text-sm sm:max-w-none sm:text-xl font-black tracking-tight text-emerald-950 dark:text-amber-200 whitespace-nowrap">
                {t.appName}
              </h1>
              <span className="hidden sm:inline-flex text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                Universal
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-xs font-serif">
              {t.appSubtitle}
            </p>
          </div>
        </button>

        {/* Quick Search Bar (Ctrl+K) */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex-1 max-w-md hidden md:flex items-center justify-between px-3.5 py-2 rounded-xl text-sm bg-stone-100/80 dark:bg-slate-800/80 border border-amber-200/80 dark:border-amber-900/50 text-slate-500 dark:text-slate-400 hover:border-amber-400 transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-700 dark:text-amber-400" />
            <span className="truncate text-xs">{t.searchPlaceholder}</span>
          </div>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded border border-stone-200 dark:border-slate-600 shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Action Controls */}
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="lg:hidden inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-amber-200/60 text-emerald-900 transition-colors hover:bg-emerald-50 dark:border-amber-800/40 dark:text-amber-300 dark:hover:bg-slate-800"
            title={isMobileMenuOpen
              ? (language === 'ur' ? 'مینو بند کریں' : 'Close navigation menu')
              : (language === 'ur' ? 'مینو کھولیں' : 'Open navigation menu')}
            aria-label={isMobileMenuOpen
              ? (language === 'ur' ? 'مینو بند کریں' : 'Close navigation menu')
              : (language === 'ur' ? 'مینو کھولیں' : 'Open navigation menu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Mobile search trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
            title={t.searchPlaceholder}
            aria-label="Search"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-800 dark:text-amber-400" />
          </button>

          {/* Custom Quran JSON Dataset Importer */}
          <button
            onClick={() => setIsDatasetModalOpen(true)}
            className="hidden sm:flex p-2 rounded-xl text-emerald-800 dark:text-amber-300 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-amber-200/60 dark:border-amber-800/40 transition-colors items-center gap-1.5 text-xs font-medium"
            title={t.importDataset}
          >
            <Upload className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden xl:inline">{language === 'ur' ? 'قرآن ڈیٹا' : 'Import JSON'}</span>
          </button>

          {/* Bookmarks Drawer Trigger */}
          <button
            onClick={() => setIsBookmarksOpen(true)}
            className="relative hidden sm:inline-flex p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
            title={t.bookmarks}
            aria-label="Bookmarks"
          >
            <Bookmark className="w-5 h-5 text-emerald-800 dark:text-amber-400" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-amber-600 rounded-full shadow-xs">
                {bookmarks.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsAssistantOpen(true)}
            className="hidden sm:inline-flex rounded-xl border border-amber-200/50 p-2 text-slate-700 transition-colors hover:bg-emerald-50 dark:border-amber-800/40 dark:text-slate-200 dark:hover:bg-slate-800"
            title={language === 'ur' ? 'اے آئی معاون' : 'AI Assistant'}
            aria-label={language === 'ur' ? 'اے آئی معاون' : 'AI Assistant'}
          >
            <Bot className="h-5 w-5 text-emerald-800 dark:text-amber-400" />
          </button>

          {/* User Account & Salah Tracker Shortcut */}
          <button
            onClick={() => setActivePage('account')}
            className="hidden sm:inline-flex p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-amber-200/50 dark:border-amber-800/40 transition-colors"
            title="User Profile & Salah Tracker"
          >
            <User className="w-5 h-5 text-emerald-800 dark:text-amber-400" />
          </button>

          {/* Language Toggle (UR / EN) */}
          <div className="flex items-center bg-stone-200/70 dark:bg-slate-800 p-0.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-emerald-850 text-amber-200 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg font-nastaliq transition-all leading-tight ${
                language === 'ur'
                  ? 'bg-emerald-850 text-amber-200 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              اردو
            </button>
          </div>

          {/* Theme Mode Toggle (Emerald Gold vs Midnight Dark) */}
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-amber-200/50 dark:border-amber-800/40 transition-colors"
            title={theme === 'midnight' ? 'Switch to Emerald Gold Light' : 'Switch to Midnight Dark'}
            aria-label="Toggle Theme"
          >
            {theme === 'midnight' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-emerald-900" />
            )}
          </button>
        </div>
      </div>
    </header>
    {isAssistantOpen && (
      <div className="fixed inset-0 z-50">
        <button
          type="button"
          aria-label={language === 'ur' ? 'معاون بند کریں' : 'Close assistant'}
          onClick={() => setIsAssistantOpen(false)}
          className="absolute inset-0 h-full w-full bg-slate-950/45 backdrop-blur-[2px]"
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label={language === 'ur' ? 'اسلامی معاون' : 'Islamic assistant'}
          className={`absolute top-0 flex h-full w-full flex-col overflow-y-auto border-amber-300/50 bg-[#FDFBF7] p-4 shadow-2xl transition-transform duration-300 dark:bg-slate-950 sm:w-[30rem] sm:p-6 ${language === 'ur' ? 'left-0 border-r' : 'right-0 border-l'}`}
        >
          <AIAssistantPage compact onClose={() => setIsAssistantOpen(false)} />
        </aside>
      </div>
    )}
    </>
  );
};
