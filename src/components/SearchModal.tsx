import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, BookMarked, HeartHandshake, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { QuranDataProvider, SURAHS_METADATA } from '../services/quranData';
import { HadithDataProvider } from '../services/hadithData';
import { DuaDataProvider } from '../services/duaData';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    language,
    setActivePage,
    setSelectedSurahNum,
    setSelectedAyahNum
  } = useApp();

  const t = useTranslation(language);
  const [query, setQuery] = useState('');

  // Search Results
  const { matchingSurahs, matchingVerses, matchingHadiths, matchingDuas } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) {
      return { matchingSurahs: [], matchingVerses: [], matchingHadiths: [], matchingDuas: [] };
    }

    // Match Surahs
    const surahs = SURAHS_METADATA.filter(s =>
      s.nameEnglish.toLowerCase().includes(q) ||
      s.englishMeaning.toLowerCase().includes(q) ||
      s.nameArabic.includes(query) ||
      s.nameUrdu.includes(query) ||
      String(s.number) === q
    ).slice(0, 5);

    // Match Verses
    const verses = QuranDataProvider.search(query).slice(0, 6);

    // Match Hadiths
    const hadiths = HadithDataProvider.searchHadiths(query).slice(0, 5);

    // Match Duas
    const duas = DuaDataProvider.searchDuas(query).slice(0, 5);

    return {
      matchingSurahs: surahs,
      matchingVerses: verses,
      matchingHadiths: hadiths,
      matchingDuas: duas
    };
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelectSurah = (surahNum: number, ayahNum?: number) => {
    setSelectedSurahNum(surahNum);
    if (ayahNum) setSelectedAyahNum(ayahNum);
    setActivePage('quran');
    setIsSearchOpen(false);
  };

  const handleSelectHadith = () => {
    setActivePage('hadith');
    setIsSearchOpen(false);
  };

  const handleSelectDua = () => {
    setActivePage('duas');
    setIsSearchOpen(false);
  };

  const hasResults =
    matchingSurahs.length > 0 ||
    matchingVerses.length > 0 ||
    matchingHadiths.length > 0 ||
    matchingDuas.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FDFBF7] dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-amber-300/40 dark:border-amber-900/60 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Box */}
        <div className="flex items-center gap-3 p-4 border-b border-amber-200/60 dark:border-amber-900/40 bg-stone-50 dark:bg-slate-900/60">
          <Search className="w-5 h-5 text-emerald-800 dark:text-amber-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 bg-transparent text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs px-2.5 py-1 rounded bg-stone-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-stone-300 dark:hover:bg-slate-700"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {query.trim().length < 2 && (
            <div className="py-12 text-center text-slate-400 text-sm">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-600 stroke-1" />
              <p>Type at least 2 characters to search across Quran, Hadith and Duas.</p>
            </div>
          )}

          {query.trim().length >= 2 && !hasResults && (
            <div className="py-12 text-center text-slate-400 text-sm">
              <p>No results found for &ldquo;{query}&rdquo;.</p>
            </div>
          )}

          {/* Surah Matches */}
          {matchingSurahs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-amber-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>{language === 'ur' ? 'سورۃ جات' : 'Surahs'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingSurahs.map((surah) => (
                  <button
                    key={surah.number}
                    onClick={() => handleSelectSurah(surah.number)}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 dark:border-slate-800 hover:border-amber-400/80 hover:bg-emerald-50/50 dark:hover:bg-slate-800/60 transition-colors text-left rtl:text-right"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-800 dark:text-slate-100">
                        {surah.number}. {language === 'ur' ? surah.nameUrdu : surah.nameEnglish}
                      </div>
                      <div className="text-xs text-slate-500">
                        {surah.numberOfAyahs} {t.ayahs} • {surah.revelationType}
                      </div>
                    </div>
                    <span className="font-quran text-lg text-emerald-800 dark:text-amber-300">
                      {surah.nameArabic}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Verses Matches */}
          {matchingVerses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-amber-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" />
                <span>{language === 'ur' ? 'قرآنی آیات' : 'Quranic Verses'}</span>
              </div>
              <div className="space-y-2">
                {matchingVerses.map(({ surah, ayah }) => (
                  <button
                    key={`${surah.number}-${ayah.numberInSurah}`}
                    onClick={() => handleSelectSurah(surah.number, ayah.numberInSurah)}
                    className="w-full text-left rtl:text-right p-3 rounded-xl border border-stone-200 dark:border-slate-800 hover:border-amber-400/80 hover:bg-emerald-50/50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-amber-400 font-semibold mb-1">
                      <span>
                        {surah.nameEnglish} ({surah.number}:{ayah.numberInSurah})
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </div>
                    <p className="font-quran text-right text-base text-slate-900 dark:text-amber-100 mb-1 leading-relaxed">
                      {ayah.textArabic}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {language === 'ur' ? ayah.translationUrdu : ayah.translationEnglish}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hadith Matches */}
          {matchingHadiths.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-amber-400 uppercase tracking-wider mb-2">
                <BookMarked className="w-4 h-4" />
                <span>{language === 'ur' ? 'احادیثِ مبارکہ' : 'Hadiths'}</span>
              </div>
              <div className="space-y-2">
                {matchingHadiths.map((hadith) => (
                  <button
                    key={hadith.id}
                    onClick={handleSelectHadith}
                    className="w-full text-left rtl:text-right p-3 rounded-xl border border-stone-200 dark:border-slate-800 hover:border-amber-400/80 hover:bg-emerald-50/50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-amber-400 font-semibold mb-1">
                      <span>{hadith.bookNameEnglish} #{hadith.hadithNumber}</span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {hadith.grade}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2">
                      {language === 'ur' ? hadith.textUrdu : hadith.textEnglish}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Duas Matches */}
          {matchingDuas.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-amber-400 uppercase tracking-wider mb-2">
                <HeartHandshake className="w-4 h-4" />
                <span>{language === 'ur' ? 'ادعیہ و اذکار' : 'Duas & Azkar'}</span>
              </div>
              <div className="space-y-2">
                {matchingDuas.map((dua) => (
                  <button
                    key={dua.id}
                    onClick={handleSelectDua}
                    className="w-full text-left rtl:text-right p-3 rounded-xl border border-stone-200 dark:border-slate-800 hover:border-amber-400/80 hover:bg-emerald-50/50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="font-bold text-xs text-emerald-900 dark:text-amber-300 mb-1">
                      {language === 'ur' ? dua.titleUrdu : dua.titleEnglish}
                    </div>
                    <p className="font-quran text-right text-sm text-slate-800 dark:text-amber-100 line-clamp-1 mb-1">
                      {dua.arabic}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1">
                      {language === 'ur' ? dua.urdu : dua.english}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
