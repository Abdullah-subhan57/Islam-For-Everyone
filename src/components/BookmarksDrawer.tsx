import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, BookOpen, BookMarked, HeartHandshake } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';

export const BookmarksDrawer: React.FC = () => {
  const {
    isBookmarksOpen,
    setIsBookmarksOpen,
    bookmarks,
    removeBookmark,
    language,
    setActivePage,
    setSelectedSurahNum,
    setSelectedAyahNum
  } = useApp();

  const t = useTranslation(language);

  if (!isBookmarksOpen) return null;

  const handleOpenItem = (item: (typeof bookmarks)[0]) => {
    if (item.type === 'ayah' && item.metadata.surahNumber) {
      setSelectedSurahNum(item.metadata.surahNumber);
      if (item.metadata.ayahNumber) setSelectedAyahNum(item.metadata.ayahNumber);
      setActivePage('quran');
    } else if (item.type === 'hadith') {
      setActivePage('hadith');
    } else if (item.type === 'dua') {
      setActivePage('duas');
    }
    setIsBookmarksOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-[#FDFBF7] dark:bg-[#0F172A] border-l border-amber-200/60 dark:border-amber-900/60 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-200/60 dark:border-amber-900/40 bg-stone-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="font-title text-base font-bold text-slate-800 dark:text-slate-100">
              {t.bookmarks} ({bookmarks.length})
            </h2>
          </div>
          <button
            onClick={() => setIsBookmarksOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <Bookmark className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-600 stroke-1" />
              <p className="text-sm px-4">{t.noBookmarks}</p>
            </div>
          ) : (
            bookmarks.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-800/40 hover:border-amber-400/60 transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {b.type === 'ayah' && <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />}
                    {b.type === 'hadith' && <BookMarked className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                    {b.type === 'dua' && <HeartHandshake className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                      {b.title}
                    </span>
                  </div>
                  <button
                    onClick={() => removeBookmark(b.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {b.arabicPreview && (
                  <p className="font-quran text-right text-sm text-emerald-950 dark:text-amber-100 line-clamp-2 my-1 leading-relaxed">
                    {b.arabicPreview}
                  </p>
                )}

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                  {b.subtitle}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-slate-800/80">
                  <span className="text-[10px] text-slate-400">
                    {new Date(b.timestamp).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleOpenItem(b)}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-800 dark:text-amber-400 hover:underline"
                  >
                    <span>{language === 'ur' ? 'کھولیں' : 'Open'}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
