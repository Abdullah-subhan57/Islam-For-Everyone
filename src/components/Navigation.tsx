import React, { useEffect } from 'react';
import {
  Award,
  BookMarked,
  BookOpen,
  Bookmark,
  Bot,
  Calendar,
  Clock,
  Compass,
  Github,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  HelpCircle,
  Home,
  Languages,
  Repeat,
  Search,
  Shield,
  Upload,
  UserRound
} from 'lucide-react';
import { useApp } from '../context/AppContext';
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
  { id: 'prayer', labelEn: 'Prayer times', labelUr: 'اوقاتِ نماز', icon: Clock },
  { id: 'account', labelEn: 'Salah & account', labelUr: 'صلوٰۃ اور اکاؤنٹ', icon: UserRound },
  { id: 'qibla', labelEn: 'Qibla', labelUr: 'قبلہ', icon: Compass },
  { id: 'duas', labelEn: 'Duas & Azkar', labelUr: 'دعائیں اور اذکار', icon: HeartHandshake },
  { id: 'tasbih', labelEn: 'Digital Tasbih', labelUr: 'ڈیجیٹل تسبیح', icon: Repeat },
  { id: 'quiz', labelEn: 'Quiz', labelUr: 'کوئز', icon: GraduationCap },
  { id: 'names99', labelEn: '99 Names', labelUr: 'اسمائے حسنیٰ', icon: Award },
  { id: 'calendar', labelEn: 'Islamic calendar', labelUr: 'اسلامی کیلنڈر', icon: Calendar },
  { id: 'history', labelEn: 'Islamic history', labelUr: 'اسلامی تاریخ', icon: Shield },
  { id: 'assistant', labelEn: 'AI assistant', labelUr: 'اے آئی معاون', icon: Bot },
  { id: 'ibadat', labelEn: 'Ibadat guide', labelUr: 'عبادات گائیڈ', icon: HandHeart }
];

interface NavigationProps {
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isMobileMenuOpen, onCloseMobileMenu }) => {
  const {
    activePage,
    setActivePage,
    language,
    setLanguage,
    setIsSearchOpen,
    setIsBookmarksOpen,
    setIsDatasetModalOpen,
    userProfile
  } = useApp();
  const isUrdu = language === 'ur';

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

  const closeAndRun = (action: () => void) => {
    action();
    onCloseMobileMenu();
  };

  const openGuide = () => {
    window.dispatchEvent(new Event('islam360:open-guide'));
  };

  const utilityButtonClass = 'flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-900';

  return (
    <div className={`fixed inset-0 z-50 ${isMobileMenuOpen ? '' : 'pointer-events-none invisible'}`}>
      <button
        type="button"
        onClick={onCloseMobileMenu}
        aria-label={isUrdu ? 'مینو بند کریں' : 'Close navigation menu'}
        tabIndex={isMobileMenuOpen ? 0 : -1}
        className={`absolute inset-0 h-full w-full bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-200 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <nav
        id="mobile-navigation"
        aria-label={isUrdu ? 'مرکزی نیویگیشن' : 'Main navigation'}
        aria-hidden={!isMobileMenuOpen}
        className={`absolute top-0 flex h-full w-[min(23rem,88vw)] flex-col overflow-y-auto border-teal-100 bg-[#f8fbfa] p-4 shadow-2xl transition-transform duration-200 ${isUrdu ? 'left-0 border-r' : 'right-0 border-l'} ${isMobileMenuOpen ? 'translate-x-0' : isUrdu ? '-translate-x-full' : 'translate-x-full'}`}
      >
        <div className="mb-3 flex items-center justify-between border-b border-teal-100 pb-3">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" width="40" height="40" className="h-10 w-10 rounded-xl" />
            <div>
              <p className="font-title text-base font-bold text-slate-900">
                {isUrdu ? 'اسلام فار ایوری ون' : 'Islam for Everyone'}
              </p>
              <p className="text-xs text-slate-500">{isUrdu ? 'آپ کا اسلامی ساتھی' : 'Your daily companion'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseMobileMenu}
            aria-label={isUrdu ? 'مینو بند کریں' : 'Close navigation menu'}
            tabIndex={isMobileMenuOpen ? 0 : -1}
            className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-teal-50"
          >
            <span aria-hidden="true" className="text-2xl leading-none">×</span>
          </button>
        </div>

        <div className="mb-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-900">
            {userProfile.name.slice(0, 1).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-slate-800">{userProfile.name}</span>
            <span className="block truncate text-xs text-slate-500">
              {userProfile.username ? `@${userProfile.username}` : userProfile.email || (isUrdu ? 'مقامی پروفائل' : 'Local profile')}
            </span>
          </span>
          <button
            type="button"
            onClick={() => selectPage('account')}
            aria-label={isUrdu ? 'اکاؤنٹ کھولیں' : 'Open account'}
            tabIndex={isMobileMenuOpen ? 0 : -1}
            className="ml-auto rounded-lg p-2 text-teal-800 hover:bg-teal-50"
          >
            <UserRound className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto py-1">
          {NAVIGATION_ITEMS.map(({ id, icon: Icon, labelEn, labelUr }) => {
            const selected = activePage === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectPage(id)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-current={selected ? 'page' : undefined}
                className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left rtl:text-right transition-all active:scale-[0.99] ${
                  selected
                    ? 'bg-teal-800 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-teal-50 hover:text-teal-900'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${selected ? 'text-teal-100' : 'text-teal-800'}`} />
                <span className={`text-sm font-semibold ${isUrdu ? 'font-nastaliq' : ''}`}>
                  {isUrdu ? labelUr : labelEn}
                </span>
                {selected && <span className="ml-auto rtl:mr-auto rtl:ml-0 h-2 w-2 rounded-full bg-white" />}
              </button>
            );
          })}
        </div>

        <div className="mt-3 border-t border-teal-100 pt-3">
          <button type="button" onClick={() => closeAndRun(() => setIsSearchOpen(true))} tabIndex={isMobileMenuOpen ? 0 : -1} className={utilityButtonClass}>
            <Search className="h-4 w-4 text-teal-800" />{isUrdu ? 'تلاش کریں' : 'Search'}
          </button>
          <button type="button" onClick={() => closeAndRun(() => setIsBookmarksOpen(true))} tabIndex={isMobileMenuOpen ? 0 : -1} className={utilityButtonClass}>
            <Bookmark className="h-4 w-4 text-teal-800" />{isUrdu ? 'محفوظ نشانیاں' : 'Bookmarks'}
          </button>
          <button type="button" onClick={() => closeAndRun(() => setIsDatasetModalOpen(true))} tabIndex={isMobileMenuOpen ? 0 : -1} className={utilityButtonClass}>
            <Upload className="h-4 w-4 text-teal-800" />{isUrdu ? 'قرآن ڈیٹا درآمد کریں' : 'Import Quran data'}
          </button>
          <button type="button" onClick={() => closeAndRun(openGuide)} tabIndex={isMobileMenuOpen ? 0 : -1} className={utilityButtonClass}>
            <HelpCircle className="h-4 w-4 text-teal-800" />{isUrdu ? 'ایپ کا رہنما ٹور' : 'Guided app tour'}
          </button>
          <div className="mt-2 flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-slate-100">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Languages className="h-4 w-4 text-teal-800" />
              {isUrdu ? 'زبان' : 'Language'}
            </span>
            <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
              <button type="button" onClick={() => setLanguage('en')} tabIndex={isMobileMenuOpen ? 0 : -1} aria-pressed={!isUrdu} className={`rounded-md px-2.5 py-1 text-xs font-bold ${!isUrdu ? 'bg-teal-800 text-white' : 'text-slate-600'}`}>EN</button>
              <button type="button" onClick={() => setLanguage('ur')} tabIndex={isMobileMenuOpen ? 0 : -1} aria-pressed={isUrdu} className={`rounded-md px-2.5 py-1 text-xs font-bold ${isUrdu ? 'bg-teal-800 text-white' : 'text-slate-600'}`}>اردو</button>
            </div>
          </div>
          <a
            href="https://github.com/Abdullah-subhan57/Islam-For-Everyone"
            target="_blank"
            rel="noreferrer"
            tabIndex={isMobileMenuOpen ? 0 : -1}
            className="mt-3 flex min-h-10 items-center justify-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-teal-900"
          >
            <Github aria-hidden="true" className="h-4 w-4" />
            {isUrdu ? 'GitHub پراجیکٹ' : 'GitHub project'}
          </a>
        </div>
      </nav>
    </div>
  );
};
