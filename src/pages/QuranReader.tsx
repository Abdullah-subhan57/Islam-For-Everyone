import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Search,
  Sliders,
  Play,
  Pause,
  Bookmark as BookmarkIcon,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Sparkles,
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { QuranDataProvider, ALL_114_SURAHS, ALL_30_JUZ } from '../services/quranData';
import { Ayah, Surah } from '../types';

export const QuranReader: React.FC = () => {
  const {
    language,
    selectedSurahNum,
    setSelectedSurahNum,
    selectedAyahNum,
    setSelectedAyahNum,
    playAyah,
    playSurah,
    pauseAudio,
    resumeAudio,
    audioState,
    addBookmark,
    removeBookmark,
    isBookmarked,
    recordVerseRead,
    openTafseer,
    openSurahIntro
  } = useApp();

  const t = useTranslation(language);

  const [activeTab, setActiveTab] = useState<'surah' | 'juz'>('surah');
  const [searchFilter, setSearchFilter] = useState('');
  const [currentSurahData, setCurrentSurahData] = useState<Surah | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [scriptType, setScriptType] = useState<'indopak' | 'uthmani'>('indopak');
  const [translationMode, setTranslationMode] = useState<'both' | 'urdu' | 'english' | 'none'>('both');
  const [fontSize, setFontSize] = useState<number>(28);
  const [copiedAyahNumber, setCopiedAyahNumber] = useState<number | null>(null);

  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    QuranDataProvider.getSurahWithAyahs(selectedSurahNum).then((data) => {
      if (isMounted) {
        setCurrentSurahData(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedSurahNum]);

  useEffect(() => {
    if (selectedAyahNum && ayahRefs.current[selectedAyahNum]) {
      setTimeout(() => {
        ayahRefs.current[selectedAyahNum]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [selectedAyahNum, currentSurahData]);

  const filteredSurahs = ALL_114_SURAHS.filter((s) => {
    const q = searchFilter.toLowerCase();
    return (
      s.nameEnglish.toLowerCase().includes(q) ||
      s.englishMeaning.toLowerCase().includes(q) ||
      s.nameArabic.includes(searchFilter) ||
      s.nameUrdu.includes(searchFilter) ||
      String(s.number) === q
    );
  });

  const handleCopyAyah = (ayah: Ayah) => {
    const text = `${ayah.textArabic}\n\nUrdu: ${ayah.translationUrdu}\n\nEnglish: ${ayah.translationEnglish} (Quran ${selectedSurahNum}:${ayah.numberInSurah})`;
    navigator.clipboard.writeText(text);
    setCopiedAyahNumber(ayah.numberInSurah);
    setTimeout(() => setCopiedAyahNumber(null), 2000);
  };

  const handleToggleBookmark = (ayah: Ayah) => {
    const isSaved = isBookmarked('ayah', ayah.number);
    if (isSaved) {
      removeBookmark(`ayah-${selectedSurahNum}-${ayah.number}`);
    } else {
      addBookmark({
        type: 'ayah',
        title: `Surah ${currentSurahData?.nameEnglish || selectedSurahNum} (${selectedSurahNum}:${ayah.numberInSurah})`,
        subtitle: language === 'ur' ? ayah.translationUrdu : ayah.translationEnglish,
        arabicPreview: ayah.textArabic,
        metadata: {
          surahNumber: selectedSurahNum,
          ayahNumber: ayah.number
        }
      });
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Selector Bar (All 114 Surahs vs 30 Juz switcher) */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center bg-stone-100 dark:bg-slate-900/80 p-1 rounded-xl border border-stone-200 dark:border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('surah')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'surah'
                  ? 'bg-emerald-850 text-amber-200 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t.surahIndex} (114)
            </button>
            <button
              onClick={() => setActiveTab('juz')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'juz'
                  ? 'bg-emerald-850 text-amber-200 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t.juzIndex} (30)
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={language === 'ur' ? 'سورۃ نمبر یا نام تلاش کریں...' : 'Search Surah (1 to 114)...'}
              className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-amber-400"
            />
          </div>
        </div>

        {/* All 114 Surahs Carousel */}
        {activeTab === 'surah' && (
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar">
            {filteredSurahs.map((surah) => {
              const isSelected = selectedSurahNum === surah.number;
              return (
                <button
                  key={surah.number}
                  onClick={() => {
                    setSelectedSurahNum(surah.number);
                    setSelectedAyahNum(null);
                  }}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-800 text-amber-300 border border-amber-400/50 shadow-xs scale-102'
                      : 'bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400/50'
                  }`}
                >
                  <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                    {surah.number}
                  </span>
                  <span>{language === 'ur' ? surah.nameUrdu : surah.nameEnglish}</span>
                  <span className="font-quran text-sm text-slate-500">{surah.nameArabic}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Juz View Selector */}
        {activeTab === 'juz' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-3 max-h-56 overflow-y-auto">
            {ALL_30_JUZ.map((juz) => (
              <button
                key={juz.number}
                onClick={() => {
                  setSelectedSurahNum(juz.startSurah);
                  setSelectedAyahNum(juz.startAyah);
                  setActiveTab('surah');
                }}
                className="p-2.5 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-900 hover:border-amber-400 text-left rtl:text-right transition-all"
              >
                <div className="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-bold">
                  <span>Juz {juz.number}</span>
                  <span className="font-quran">{juz.nameArabic}</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 truncate">
                  {juz.startSurahName} : {juz.startAyah}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Surah Header Banner with Introduction Trigger */}
      {currentSurahData && (
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-amber-100 p-6 sm:p-8 text-center shadow-xl border border-amber-400/30 overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-amber-300 text-xs font-semibold tracking-widest uppercase border border-amber-400/30">
                {currentSurahData.revelationType === 'Meccan' ? t.meccan : t.medinan} • {currentSurahData.numberOfAyahs} {t.ayahs} • Juz {currentSurahData.juzStart}
              </span>

              {/* Surah Introduction Button */}
              <button
                onClick={() => openSurahIntro(currentSurahData)}
                className="px-3 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{t.surahIntro}</span>
              </button>
              <button
                onClick={() => {
                  const isThisSurahQueued = audioState.queuedSurahNum === selectedSurahNum;
                  if (isThisSurahQueued && audioState.isPlaying) {
                    pauseAudio();
                  } else if (isThisSurahQueued && audioState.audioElement) {
                    resumeAudio();
                  } else if (currentSurahData.ayahs) {
                    playSurah(selectedSurahNum, currentSurahData.ayahs);
                  }
                }}
                className="px-3 py-1 rounded-full bg-emerald-700 hover:bg-emerald-600 text-amber-100 font-bold text-xs flex items-center gap-1.5 border border-amber-300/30 transition-transform active:scale-95"
                title={audioState.queuedSurahNum === selectedSurahNum && audioState.isPlaying ? t.pause : t.play}
              >
                {audioState.queuedSurahNum === selectedSurahNum && audioState.isPlaying
                  ? <Pause className="w-3.5 h-3.5" />
                  : <Play className="w-3.5 h-3.5" />}
                <span>{language === 'ur' ? 'پوری سورت سنیں' : 'Play full surah'}</span>
              </button>
            </div>

            <h2 className="font-quran text-4xl sm:text-5xl text-amber-200 py-1">
              سُورَةُ {currentSurahData.nameArabic}
            </h2>

            <h3 className="font-title text-xl font-bold tracking-wide text-white">
              {currentSurahData.nameEnglish} ({currentSurahData.englishMeaning})
            </h3>

            {/* Bismillah Banner */}
            {currentSurahData.number !== 9 && (
              <div className="pt-3 border-t border-amber-400/20">
                <p className="font-quran text-2xl sm:text-3xl text-amber-300 tracking-wide">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-xs text-emerald-200/80 mt-1 font-serif italic">
                  {t.bismillah}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reader Controls Toolbar */}
      <div className="sticky top-16 z-30 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-200/80 dark:border-amber-900/60 p-3 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-semibold text-slate-500 hidden sm:inline">{t.arabicScript}:</span>
          <button
            onClick={() => setScriptType('indopak')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              scriptType === 'indopak'
                ? 'bg-emerald-850 text-amber-200'
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.indopak}
          </button>
          <button
            onClick={() => setScriptType('uthmani')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              scriptType === 'uthmani'
                ? 'bg-emerald-850 text-amber-200'
                : 'text-slate-600 dark:text-slate-400 hover:bg-stone-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.uthmani}
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <span className="font-semibold text-slate-500 hidden sm:inline">{t.translation}:</span>
          <select
            value={translationMode}
            onChange={(e) => setTranslationMode(e.target.value as any)}
            className="px-2.5 py-1 rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:outline-hidden"
          >
            <option value="both">{t.bothTranslations}</option>
            <option value="urdu">{t.urduOnly}</option>
            <option value="english">{t.englishOnly}</option>
            <option value="none">{t.arabicOnly}</option>
          </select>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setFontSize((prev) => Math.max(20, prev - 2))}
            className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-stone-200"
          >
            A-
          </button>
          <span className="text-xs font-mono text-slate-500">{fontSize}px</span>
          <button
            onClick={() => setFontSize((prev) => Math.min(48, prev + 2))}
            className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-stone-200"
          >
            A+
          </button>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <button
            disabled={selectedSurahNum <= 1}
            onClick={() => {
              setSelectedSurahNum(selectedSurahNum - 1);
              setSelectedAyahNum(null);
            }}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-stone-100"
            title="Previous Surah"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
          <span className="font-bold text-xs px-2 text-emerald-950 dark:text-amber-300">
            {selectedSurahNum} / 114
          </span>
          <button
            disabled={selectedSurahNum >= 114}
            onClick={() => {
              setSelectedSurahNum(selectedSurahNum + 1);
              setSelectedAyahNum(null);
            }}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-stone-100"
            title="Next Surah"
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>

      {/* Verses Container */}
      {isLoading ? (
        <div className="py-24 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-slate-500">Loading Surah Ayahs, Tafseer & Translations...</p>
        </div>
      ) : currentSurahData?.ayahs && currentSurahData.ayahs.length > 0 ? (
        <div className="space-y-4">
          {currentSurahData.ayahs.map((ayah) => {
            const isPlayingThisAyah =
              audioState.isPlaying &&
              audioState.currentSurahNum === selectedSurahNum &&
              audioState.currentAyah?.numberInSurah === ayah.numberInSurah;

            const isSaved = isBookmarked('ayah', ayah.number);

            return (
              <div
                key={ayah.numberInSurah}
                ref={(el) => {
                  ayahRefs.current[ayah.numberInSurah] = el;
                }}
                className={`p-5 rounded-3xl border transition-all duration-300 ${
                  isPlayingThisAyah
                    ? 'bg-amber-50/80 dark:bg-emerald-950/40 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-white dark:bg-slate-800/80 border-stone-200/80 dark:border-slate-700/80 hover:border-amber-300'
                }`}
              >
                {/* Verse Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-700/60 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-amber-300 font-mono font-bold text-xs border border-emerald-300/40">
                      {ayah.numberInSurah}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {currentSurahData.nameEnglish} : {ayah.numberInSurah}
                    </span>
                  </div>

                  {/* Actions for Ayah */}
                  <div className="flex items-center gap-1.5">
                    {/* Read Tafseer Button */}
                    <button
                      onClick={() => openTafseer(selectedSurahNum, ayah)}
                      className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/40 text-[11px] font-bold hover:bg-amber-200 transition-colors"
                    >
                      {t.tafseer}
                    </button>

                    {/* Play Audio Recitation */}
                    <button
                      onClick={() => {
                        if (isPlayingThisAyah) {
                          pauseAudio();
                        } else {
                          playAyah(selectedSurahNum, ayah);
                          recordVerseRead();
                        }
                      }}
                      className="p-1.5 rounded-lg text-emerald-800 dark:text-amber-300 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors"
                      title={isPlayingThisAyah ? t.pause : t.play}
                    >
                      {isPlayingThisAyah ? (
                        <Pause className="w-4 h-4 fill-emerald-800 dark:fill-amber-300" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>

                    {/* Bookmark */}
                    <button
                      onClick={() => handleToggleBookmark(ayah)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                          : 'text-slate-400 hover:text-amber-500'
                      }`}
                      title="Bookmark"
                    >
                      <BookmarkIcon className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                    </button>

                    {/* Copy */}
                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
                      title="Copy Ayah"
                    >
                      {copiedAyahNumber === ayah.numberInSurah ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Verse Text */}
                <div className="text-right my-2">
                  <p
                    className="font-quran text-slate-900 dark:text-amber-50 leading-loose select-text"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {scriptType === 'indopak' && ayah.textArabicIndopak
                      ? ayah.textArabicIndopak
                      : ayah.textArabic}
                  </p>
                </div>

                {/* Transliteration */}
                {ayah.transliteration && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic my-2 font-serif">
                    {ayah.transliteration}
                  </p>
                )}

                {/* Translations */}
                <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-slate-700/60 mt-3">
                  {(translationMode === 'both' || translationMode === 'urdu') && (
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-emerald-800 dark:text-amber-400 block mb-0.5">
                        اردو (مولانا فتح محمد جالندھری)
                      </span>
                      <p className="font-nastaliq text-base sm:text-lg text-slate-800 dark:text-slate-200 select-text leading-relaxed">
                        {ayah.translationUrdu}
                      </p>
                    </div>
                  )}

                  {(translationMode === 'both' || translationMode === 'english') && (
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 dark:text-amber-400 block mb-0.5 uppercase tracking-wider">
                        English (Sahih International)
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 select-text leading-relaxed">
                        {ayah.translationEnglish}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-400" />
          <h4 className="font-bold text-base text-slate-800 dark:text-slate-100">
            {language === 'ur' ? 'آیات لائیو لوڈ ہو رہی ہیں...' : 'Connecting to Quran Dataset...'}
          </h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {language === 'ur'
              ? 'اگر انٹرنیٹ کنکشن دستیاب نہ ہو تو آپ اوپر والے بٹن سے کسٹم JSON فائل بھی امپورٹ کر سکتے ہیں۔'
              : 'You can also drop in your local 114 Surahs JSON dataset anytime using the Import JSON button in the top navigation.'}
          </p>
        </div>
      )}
    </div>
  );
};
