import React, { useState } from 'react';
import {
  HeartHandshake,
  Search,
  Bookmark as BookmarkIcon,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Award,
  Play,
  Pause,
  Bell
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { DuaDataProvider, DUA_CATEGORIES } from '../services/duaData';
import { TasbihAudioFeedback } from '../services/tasbihPresets';
import { Dua } from '../types';

export const DuasAzkarPage: React.FC = () => {
  const { language, addBookmark, removeBookmark, isBookmarked } = useApp();
  const t = useTranslation(language);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [audioMessage, setAudioMessage] = useState<string | null>(null);
  const [azkarReminderEnabled, setAzkarReminderEnabled] = useState(() => {
    try {
      return localStorage.getItem('islam360_azkar_reminder') === 'true';
    } catch {
      return false;
    }
  });

  // Per-dua recitation counters
  const [counts, setCounts] = useState<Record<string, number>>({});

  React.useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const handleSpeak = (dua: Dua) => {
    if (!('speechSynthesis' in window)) {
      setAudioMessage(language === 'ur' ? 'اس براؤزر میں آواز کی سہولت دستیاب نہیں۔' : 'Audio playback is not available in this browser.');
      return;
    }
    if (speakingId === dua.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(dua.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.82;
    const arabicVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('ar'));
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => {
      setSpeakingId(null);
      setAudioMessage(language === 'ur' ? 'آواز چل نہیں سکی۔' : 'Could not play the dua audio.');
    };
    setAudioMessage(null);
    setSpeakingId(dua.id);
    window.speechSynthesis.speak(utterance);
  };

  const filteredDuas = DuaDataProvider.getDuasByCategory(selectedCategory).filter((d) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.arabic.includes(searchQuery) ||
      d.urdu.includes(searchQuery) ||
      d.english.toLowerCase().includes(q) ||
      d.titleEnglish.toLowerCase().includes(q) ||
      d.titleUrdu.includes(searchQuery) ||
      d.category.toLowerCase().includes(q) ||
      d.categoryUrdu.includes(searchQuery) ||
      (d.transliteration && d.transliteration.toLowerCase().includes(q))
    );
  });

  const handleRecite = (dua: Dua) => {
    TasbihAudioFeedback.playClickSound();
    TasbihAudioFeedback.triggerHaptic(15);

    setCounts((prev) => {
      const current = prev[dua.id] || 0;
      const next = current + 1;
      if (next === dua.targetCount) {
        TasbihAudioFeedback.playTargetReachedChime();
      }
      return { ...prev, [dua.id]: next };
    });
  };

  const handleResetCount = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleCopy = (d: Dua) => {
    const text = `${d.arabic}\n\nUrdu: ${d.urdu}\n\nEnglish: ${d.english}\n\nReference: ${d.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedId(d.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleBookmark = (d: Dua) => {
    const isSaved = isBookmarked('dua', d.id);
    if (isSaved) {
      removeBookmark(`dua-${d.id}-0`);
    } else {
      addBookmark({
        type: 'dua',
        title: language === 'ur' ? d.titleUrdu : d.titleEnglish,
        subtitle: language === 'ur' ? d.urdu : d.english,
        arabicPreview: d.arabic,
        metadata: {
          duaId: d.id
        }
      });
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-950 via-emerald-950 to-teal-950 text-white p-6 sm:p-8 shadow-xl border border-amber-400/30">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'حصن المسلم' : 'Fortress of the Muslim'}</span>
          </div>
          <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-amber-200">
            {t.duas}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
            {language === 'ur'
              ? 'قرآن حکیم اور صحیح احادیث مبارکہ سے ثابت شدہ روزمرہ مسنون دعائیں، صبح و شام کے اذکار اور حفاظت کی دعائیں۔'
              : 'Daily authentic supplications and morning/evening azkar from Hisn al-Muslim with interactive repetition counters.'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-white dark:bg-slate-800/90 px-4 py-3">
        <div className="text-xs text-slate-600 dark:text-slate-300">
          <span className="font-semibold">{language === 'ur' ? 'صبح و شام کے یاددہانی نوٹیفکیشن' : 'Morning and evening azkar reminders'}</span>
          <span className="block text-[11px] text-slate-400">{language === 'ur' ? 'ایپ کھلی ہو تو صبح ۸ اور شام ۵ بجے' : 'While the app is open: 8 AM and 5 PM'}</span>
        </div>
        <button
          onClick={async () => {
            if (!azkarReminderEnabled && !('Notification' in window)) {
              setAudioMessage(language === 'ur' ? 'اس براؤزر میں نوٹیفکیشن دستیاب نہیں۔' : 'Notifications are not supported in this browser.');
              return;
            }
            if (!azkarReminderEnabled) {
              const permission = await Notification.requestPermission();
              if (permission !== 'granted') {
                setAudioMessage(language === 'ur' ? 'یاددہانی کے لیے نوٹیفکیشن کی اجازت درکار ہے۔' : 'Allow notifications to enable reminders.');
                return;
              }
            }
            const enabled = !azkarReminderEnabled;
            setAzkarReminderEnabled(enabled);
            localStorage.setItem('islam360_azkar_reminder', String(enabled));
          }}
          className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold ${azkarReminderEnabled ? 'bg-emerald-800 text-amber-100' : 'bg-stone-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
        >
          <Bell className="h-4 w-4" />
          {azkarReminderEnabled ? (language === 'ur' ? 'یاددہانی آن' : 'Reminders on') : (language === 'ur' ? 'یاددہانی آن کریں' : 'Enable reminders')}
        </button>
      </div>
      {audioMessage && <p role="status" className="text-xs text-amber-700 dark:text-amber-300">{audioMessage}</p>}

      {/* Category Pills & Search */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-4 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'ur'
                ? 'دعا کا نام، عربی متن یا ترجمہ تلاش کریں...'
                : 'Search supplications by keyword, category, or translation...'
            }
            className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-amber-400"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {DUA_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-emerald-850 text-amber-200 shadow-xs'
                    : 'bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                }`}
              >
                {language === 'ur' ? cat.nameUr : cat.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duas List */}
      <div className="space-y-4">
        {filteredDuas.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-slate-400">
            <HeartHandshake className="w-10 h-10 mx-auto mb-2 text-slate-400" />
            <p className="text-sm">No supplications found for &ldquo;{searchQuery}&rdquo;.</p>
          </div>
        ) : (
          filteredDuas.map((d) => {
            const count = counts[d.id] || 0;
            const isFinished = count >= d.targetCount;
            const isSaved = isBookmarked('dua', d.id);

            return (
              <div
                key={d.id}
                className="p-6 rounded-3xl border border-amber-200/70 dark:border-amber-900/50 bg-white dark:bg-slate-800/90 shadow-sm hover:border-amber-400 transition-all space-y-4"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-slate-700/60">
                  <div>
                    <h3 className="font-title text-base font-bold text-slate-900 dark:text-slate-100">
                      {language === 'ur' ? d.titleUrdu : d.titleEnglish}
                    </h3>
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                      {language === 'ur' ? d.categoryUrdu : d.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSpeak(d)}
                      className={`p-1.5 rounded-lg transition-colors ${speakingId === d.id ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/50' : 'text-slate-400 hover:text-emerald-800 dark:hover:text-amber-300'}`}
                      title={language === 'ur' ? 'عربی دعا سنیں (براؤزر کی آواز)' : 'Listen to Arabic dua (browser voice)'}
                      aria-label={speakingId === d.id ? 'Pause dua audio' : 'Play dua audio'}
                    >
                      {speakingId === d.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    {/* Bookmark */}
                    <button
                      onClick={() => handleToggleBookmark(d)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                          : 'text-slate-400 hover:text-amber-500'
                      }`}
                      title="Bookmark Dua"
                    >
                      <BookmarkIcon className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                    </button>

                    {/* Copy */}
                    <button
                      onClick={() => handleCopy(d)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
                      title="Copy Dua"
                    >
                      {copiedId === d.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-slate-900/40 border border-amber-100 dark:border-slate-800 text-right">
                  <p className="font-quran text-2xl sm:text-3xl text-emerald-950 dark:text-amber-100 leading-loose">
                    {d.arabic}
                  </p>
                </div>

                {/* Transliteration */}
                {d.transliteration && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic font-serif">
                    {d.transliteration}
                  </p>
                )}

                {/* Urdu Translation */}
                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-800 text-right">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-amber-400 block mb-1">
                    اردو ترجمہ
                  </span>
                  <p className="font-nastaliq text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                    {d.urdu}
                  </p>
                </div>

                {/* English Translation */}
                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-amber-400 block mb-1 uppercase tracking-wider">
                    English Translation
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {d.english}
                  </p>
                </div>

                {/* Benefit / Reference */}
                {d.benefits && (
                  <div className="text-xs text-emerald-800 dark:text-emerald-300/90 bg-emerald-50/50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
                    <strong>{language === 'ur' ? 'فضیلت:' : 'Virtue:'}</strong> {d.benefits}
                  </div>
                )}

                {/* Interactive Repetition Counter Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span>{t.reference}: </span>
                    <strong className="text-slate-700 dark:text-slate-300">{d.reference}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {count > 0 && (
                      <button
                        onClick={() => handleResetCount(d.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
                        title="Reset Counter"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => handleRecite(d)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
                        isFinished
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-emerald-850 hover:bg-emerald-900 text-amber-200 shadow-md'
                      }`}
                    >
                      {isFinished ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>
                            {count} / {d.targetCount} (Complete)
                          </span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>
                            {t.repeatCount} ({count} / {d.targetCount})
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
