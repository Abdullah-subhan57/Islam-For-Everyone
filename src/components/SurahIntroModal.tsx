import React from 'react';
import { X, Info, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
import { SurahIntro, Surah } from '../types';
import { useApp } from '../context/AppContext';

interface SurahIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  surah: Surah | null;
  intro: SurahIntro | undefined;
}

export const SurahIntroModal: React.FC<SurahIntroModalProps> = ({
  isOpen,
  onClose,
  surah,
  intro
}) => {
  const { language } = useApp();

  if (!isOpen || !surah) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FDFBF7] dark:bg-[#0F172A] rounded-3xl shadow-2xl border border-amber-300/40 dark:border-amber-900/60 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-200/60 dark:border-amber-900/40 bg-stone-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title text-base font-bold text-slate-800 dark:text-slate-100">
                {language === 'ur' ? 'تعارف و شانِ نزول' : 'Surah Introduction & Themes'}
              </h3>
              <p className="text-xs text-emerald-800 dark:text-amber-400 font-semibold">
                Surah {surah.number}. {surah.nameEnglish} ({surah.nameArabic}) • {surah.revelationType}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Overview & Period */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Revelation Period</span>
              <span className="font-bold text-sm text-emerald-950 dark:text-amber-300">
                {intro?.periodEn || surah.revelationType}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Total Verses</span>
              <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                {surah.numberOfAyahs} Ayahs (Juz {surah.juzStart})
              </span>
            </div>
          </div>

          {/* Core Theme */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'مرکزی موضوع و پیغام' : 'Core Theme & Message'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/40 border border-stone-200 dark:border-slate-800">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {intro?.themeEn || `Surah ${surah.nameEnglish} focuses on divine guidance, worship of the One Creator, and moral virtues.`}
              </p>
              {intro?.themeUr && (
                <p className="font-nastaliq text-base text-slate-800 dark:text-slate-200 text-right mt-2 pt-2 border-t border-stone-200/60 dark:border-slate-700/60 leading-relaxed">
                  {intro.themeUr}
                </p>
              )}
            </div>
          </div>

          {/* Historical Background */}
          {intro?.historicalBackgroundEn && (
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{language === 'ur' ? 'شانِ نزول و تاریخی پس منظر' : 'Historical Context & Revelation'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/40 border border-stone-200 dark:border-slate-800">
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {intro.historicalBackgroundEn}
                </p>
                {intro.historicalBackgroundUr && (
                  <p className="font-nastaliq text-base text-slate-800 dark:text-slate-200 text-right mt-2 pt-2 border-t border-stone-200/60 dark:border-slate-700/60 leading-relaxed">
                    {intro.historicalBackgroundUr}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Key Lessons */}
          {intro?.keyLessonsEn && intro.keyLessonsEn.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'ur' ? 'اہم اسباق و رہنمائی' : 'Key Divine Lessons'}
              </span>
              <div className="space-y-2">
                {intro.keyLessonsEn.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                        {lesson}
                      </p>
                      {intro.keyLessonsUr?.[idx] && (
                        <p className="font-nastaliq text-sm text-slate-600 dark:text-slate-400 text-right mt-1">
                          {intro.keyLessonsUr[idx]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-200/60 dark:border-amber-900/40 bg-stone-50 dark:bg-slate-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold text-xs bg-emerald-850 hover:bg-emerald-900 text-amber-200 shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
