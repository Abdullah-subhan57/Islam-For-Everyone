import React from 'react';
import { Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, onMobileMenuToggle }) => {
  const { language, setActivePage } = useApp();
  const menuLabel = isMobileMenuOpen
    ? (language === 'ur' ? 'مینو بند کریں' : 'Close navigation menu')
    : (language === 'ur' ? 'مینو کھولیں' : 'Open navigation menu');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-teal-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-3 sm:h-16 sm:px-6">
        <button
          type="button"
          onClick={() => setActivePage('home')}
          className="flex min-w-0 items-center gap-2.5 rounded-xl text-left transition-transform active:scale-[0.98] rtl:text-right"
          aria-label={language === 'ur' ? 'مرکزی صفحہ' : 'Go to home'}
        >
          <img src="/favicon.svg" alt="" width="40" height="40" className="h-9 w-9 shrink-0 rounded-xl shadow-sm sm:h-10 sm:w-10" />
          <span className="min-w-0">
            <span className="block truncate font-title text-sm font-bold text-slate-900 sm:text-lg">Islam for Everyone</span>
            <span className="hidden text-[10px] text-slate-500 sm:block">علم • عبادت • سکون</span>
          </span>
        </button>

        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-teal-50 text-teal-900 transition-all hover:border-teal-300 hover:bg-teal-100 active:scale-95"
          title={menuLabel}
          aria-label={menuLabel}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
};
