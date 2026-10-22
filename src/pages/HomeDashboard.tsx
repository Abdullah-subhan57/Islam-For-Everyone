import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  BookMarked,
  Clock,
  Compass,
  HeartHandshake,
  Repeat,
  GraduationCap,
  Sparkles,
  Play,
  Pause,
  Bookmark as BookmarkIcon,
  Copy,
  Check,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Calendar,
  Shield,
  UserCheck,
  Flame,
  Award,
  Bot
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { PRELOADED_SURAHS, QuranDataProvider, ALL_114_SURAHS } from '../services/quranData';
import { HadithDataProvider } from '../services/hadithData';
import {
  applyManualPrayerTimes,
  DEFAULT_MANUAL_PRAYER_TIMES,
  PrayerTimesService,
  MAJOR_CITIES
} from '../services/prayerTimes';
import { CalendarService } from '../services/calendarData';
import { TasbihAudioFeedback } from '../services/tasbihPresets';
import { Ayah, Hadith } from '../types';

export const HomeDashboard: React.FC = () => {
  const {
    language,
    setActivePage,
    setSelectedSurahNum,
    setSelectedAyahNum,
    playAyah,
    pauseAudio,
    audioState,
    addBookmark,
    isBookmarked,
    removeBookmark,
    userProfile,
    salahLog,
    recordSalahStatus,
    openTafseer
  } = useApp();

  const t = useTranslation(language);

  // Dynamic Daily Verse & Hadith state (refreshes on every visit)
  const [dailyVerse, setDailyVerse] = useState<{ surahNum: number; ayah: Ayah }>(() => {
    const surahKeys = Object.keys(PRELOADED_SURAHS).map(Number);
    const randomSurahKey = surahKeys[Math.floor(Math.random() * surahKeys.length)];
    const ayahs = PRELOADED_SURAHS[randomSurahKey];
    const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
    return { surahNum: randomSurahKey, ayah: randomAyah };
  });

  const [dailyHadith, setDailyHadith] = useState<Hadith>(() => HadithDataProvider.getRandomHadith());
  const [copiedType, setCopiedType] = useState<'verse' | 'hadith' | null>(null);
  const [adhanMessage, setAdhanMessage] = useState<string | null>(null);

  // Prayer times for Islamabad / Lahore
  const prayerCity = MAJOR_CITIES.find((city) => city.name === userProfile.city) ?? (
    userProfile.latitude !== undefined && userProfile.longitude !== undefined
      ? {
          name: userProfile.city,
          nameUrdu: userProfile.city,
          country: 'Local',
          latitude: userProfile.latitude,
          longitude: userProfile.longitude,
          timezone: userProfile.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      : MAJOR_CITIES[0]
  );
  const getPrayerData = (now: Date) => applyManualPrayerTimes(
    PrayerTimesService.calculatePrayerTimes(
      prayerCity.latitude,
      prayerCity.longitude,
      now,
      true,
      prayerCity.timezone
    ),
    userProfile.manualPrayerTimes === undefined
      ? DEFAULT_MANUAL_PRAYER_TIMES
      : userProfile.manualPrayerTimes,
    now,
    prayerCity.timezone
  );
  const [prayerData, setPrayerData] = useState(() => getPrayerData(new Date()));

  useEffect(() => {
    const updatePrayerTimes = () => setPrayerData(getPrayerData(new Date()));
    updatePrayerTimes();
    const timer = window.setInterval(updatePrayerTimes, 60_000);
    return () => window.clearInterval(timer);
  }, [prayerCity, userProfile.manualPrayerTimes]);

  // Mini Tasbih on Home
  const [quickTasbihCount, setQuickTasbihCount] = useState(0);

  // Today's Hijri Date & Historical Event
  const hijri = PrayerTimesService.getHijriDate();
  const todayEvent = CalendarService.getEventForHijriDate(hijri.day, hijri.monthIndex + 1);

  const currentDate = new Date();
  const todayStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  const todaySalah = salahLog[todayStr] || {
    date: todayStr,
    fajr: 'none',
    dhuhr: 'none',
    asr: 'none',
    maghrib: 'none',
    isha: 'none',
    points: 0
  };

  const refreshVerse = () => {
    const surahKeys = Object.keys(PRELOADED_SURAHS).map(Number);
    const randomSurahKey = surahKeys[Math.floor(Math.random() * surahKeys.length)];
    const ayahs = PRELOADED_SURAHS[randomSurahKey];
    const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
    setDailyVerse({ surahNum: randomSurahKey, ayah: randomAyah });
  };

  const refreshHadith = () => {
    setDailyHadith(HadithDataProvider.getRandomHadith());
  };

  const handleCopy = (text: string, type: 'verse' | 'hadith') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const isVerseBookmarked = isBookmarked('ayah', dailyVerse.ayah.number);
  const isHadithBookmarked = isBookmarked('hadith', dailyHadith.id);

  const toggleVerseBookmark = () => {
    if (isVerseBookmarked) {
      removeBookmark(`ayah-${dailyVerse.surahNum}-${dailyVerse.ayah.number}`);
    } else {
      addBookmark({
        type: 'ayah',
        title: `Surah ${dailyVerse.surahNum}:${dailyVerse.ayah.numberInSurah}`,
        subtitle: language === 'ur' ? dailyVerse.ayah.translationUrdu : dailyVerse.ayah.translationEnglish,
        arabicPreview: dailyVerse.ayah.textArabic,
        metadata: {
          surahNumber: dailyVerse.surahNum,
          ayahNumber: dailyVerse.ayah.number
        }
      });
    }
  };

  const toggleHadithBookmark = () => {
    if (isHadithBookmarked) {
      removeBookmark(`hadith-${dailyHadith.id}-0`);
    } else {
      addBookmark({
        type: 'hadith',
        title: `${dailyHadith.bookNameEnglish} #${dailyHadith.hadithNumber}`,
        subtitle: language === 'ur' ? dailyHadith.textUrdu : dailyHadith.textEnglish,
        arabicPreview: dailyHadith.textArabic,
        metadata: {
          hadithId: dailyHadith.id
        }
      });
    }
  };

  const handleQuickTasbih = () => {
    TasbihAudioFeedback.playClickSound();
    TasbihAudioFeedback.triggerHaptic(15);
    setQuickTasbihCount(prev => prev + 1);
  };

  const isPlayingDaily =
    audioState.isPlaying &&
    audioState.currentSurahNum === dailyVerse.surahNum &&
    audioState.currentAyah?.number === dailyVerse.ayah.number;

  const surahMeta = QuranDataProvider.getSurahMeta(dailyVerse.surahNum);

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Dedicated Islamic Date & Historical Event Card */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-emerald-950 p-6 sm:p-7 shadow-xl border-2 border-amber-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-amber-300 text-xs font-bold border border-amber-300/40">
            <Calendar className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? hijri.formattedUr : hijri.formattedEn}</span>
          </div>

          <h2 className="font-title text-xl sm:text-2xl font-black text-emerald-950">
            {todayEvent
              ? language === 'ur'
                ? todayEvent.titleUr
                : todayEvent.titleEn
              : language === 'ur'
              ? `یوم المبارک: ${hijri.day} ${hijri.monthUr} ${hijri.year} ھ`
              : `Blessed Day of ${hijri.day} ${hijri.monthEn} ${hijri.year} AH`}
          </h2>

          <p className="text-xs sm:text-sm text-emerald-950/90 leading-relaxed font-sans">
            {todayEvent
              ? language === 'ur'
                ? todayEvent.descriptionUr
                : todayEvent.descriptionEn
              : language === 'ur'
              ? 'اللہ تعالیٰ کے ذکر، تلاوتِ قرآن، اور نماز کی باجماعت ادائیگی کے ساتھ اپنے دن کو بابرکت بنائیں۔'
              : 'Enrich your day with Quranic contemplation, authentic sunnah dhikr, and steadfast congregational prayer.'}
          </p>
        </div>

        <button
          onClick={() => setActivePage('calendar')}
          className="relative z-10 px-5 py-2.5 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-amber-200 font-bold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-2 shrink-0"
        >
          <span>{language === 'ur' ? 'مکمل کیلنڈر دیکھیں' : 'View Full Calendar'}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>

      {/* 2. Hero Prayer Countdown Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-white via-teal-50 to-slate-50 p-5 text-slate-900 shadow-md sm:p-7">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-3 py-1 text-xs font-semibold text-teal-800">
              <Clock className="w-3.5 h-3.5" />
              <span>{t.nextPrayer}: {prayerData.nextPrayer}</span>
            </div>
            <h2 className="font-title text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {prayerData.timeRemainingFormatted} {t.timeRemaining}
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              {prayerCity.name} • Fajr {prayerData.fajr} • Dhuhr {prayerData.dhuhr} • Maghrib {prayerData.maghrib}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setActivePage('prayer')}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white shadow-sm transition-transform hover:bg-teal-900 active:scale-95 md:flex-none"
            >
              <span>{t.prayerTimes}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              onClick={() => {
                setAdhanMessage(null);
                const audio = PrayerTimesService.playAdhanAudio('makkah');
                audio?.addEventListener('playerror', () => setAdhanMessage(
                  language === 'ur' ? 'اذان کی آڈیو نہیں چل سکی۔ دوبارہ کوشش کریں۔' : 'The Adhan audio could not be played. Try again.'
                ), { once: true });
                audio?.addEventListener('error', () => setAdhanMessage(
                  language === 'ur' ? 'اذان کی آڈیو لوڈ نہیں ہوئی۔ انٹرنیٹ چیک کریں۔' : 'Adhan audio failed to load. Check your connection.'
                ), { once: true });
              }}
              className="flex items-center gap-1.5 rounded-xl border border-teal-200 bg-white px-4 py-3 text-xs font-semibold text-teal-800 transition-colors hover:bg-teal-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.adhanAudio}</span>
            </button>
          </div>
          {adhanMessage && <p role="status" className="mt-2 text-xs text-rose-700">{adhanMessage}</p>}
        </div>
      </div>

      {/* 3. Quick Navigation Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-title text-base font-bold text-emerald-950 dark:text-amber-300">
            {t.quickLinks}
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ur' ? 'تمام ۱۲ اسلامی شعبہ جات' : 'All 12 Core Features'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { id: 'quran' as const, title: t.readQuran, subtitle: '114 Surahs & Tafseer', icon: BookOpen, color: 'from-emerald-700 to-emerald-900' },
            { id: 'hadith' as const, title: t.exploreHadith, subtitle: '6 Canonical Books', icon: BookMarked, color: 'from-amber-700 to-amber-900' },
            { id: 'account' as const, title: 'Salah Tracker', subtitle: 'Congregation & Streaks', icon: UserCheck, color: 'from-teal-700 to-teal-900' },
            { id: 'prayer' as const, title: t.prayerTimes, subtitle: 'Adhan & 15-Min Alert', icon: Clock, color: 'from-cyan-700 to-cyan-900' },
            { id: 'calendar' as const, title: 'Dual Calendar', subtitle: 'Events & Hijri Dates', icon: Calendar, color: 'from-indigo-700 to-indigo-900' },
            { id: 'history' as const, title: 'Islamic History', subtitle: 'Prophets & Caliphs', icon: Shield, color: 'from-stone-700 to-stone-900' },
            { id: 'qibla' as const, title: t.qiblaCompass, subtitle: 'GPS Bearing to Kaaba', icon: Compass, color: 'from-emerald-800 to-teal-900' },
            { id: 'duas' as const, title: t.hisnMuslim, subtitle: 'Protection & Azkar', icon: HeartHandshake, color: 'from-rose-700 to-rose-900' },
            { id: 'tasbih' as const, title: t.digitalTasbih, subtitle: 'Bead Ring & Sounds', icon: Repeat, color: 'from-amber-600 to-amber-800' },
            { id: 'quiz' as const, title: t.learnAndQuiz, subtitle: 'Challenge Knowledge', icon: GraduationCap, color: 'from-purple-700 to-purple-900' },
            { id: 'quiz' as const, title: t.names99, subtitle: 'Asma-ul-Husna Audio', icon: Sparkles, color: 'from-emerald-600 to-emerald-800' },
            { id: 'assistant' as const, title: language === 'ur' ? 'اے آئی معاون' : 'AI Assistant', subtitle: language === 'ur' ? 'اسلامی سوالات اور ایپ مدد' : 'Islamic Q&A & app help', icon: Bot, color: 'from-sky-700 to-indigo-900' }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => setActivePage(item.id)}
                className="group p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700/80 hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left rtl:text-right flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color} text-amber-200 shadow-xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 group-hover:text-emerald-800 dark:group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Two Column Section: Dynamic Ayah & Hadith Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dynamic Verse of the Day Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-6 shadow-sm flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-700/60 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-amber-400">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-title text-sm font-bold text-emerald-950 dark:text-amber-300">
                  {t.verseOfTheDay}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {surahMeta?.nameEnglish} ({dailyVerse.surahNum}:{dailyVerse.ayah.numberInSurah}) • {surahMeta?.nameArabic}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={refreshVerse}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
                title="Randomize Ayah"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleVerseBookmark}
                className={`p-1.5 rounded-lg transition-colors ${
                  isVerseBookmarked
                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                    : 'text-slate-400 hover:text-amber-500'
                }`}
                title="Bookmark Ayah"
              >
                <BookmarkIcon className={`w-4 h-4 ${isVerseBookmarked ? 'fill-amber-500' : ''}`} />
              </button>
            </div>
          </div>

          <div className="my-2 p-4 rounded-2xl bg-amber-50/40 dark:bg-slate-900/40 border border-amber-100 dark:border-slate-800 text-right">
            <p className="font-quran text-2xl sm:text-3xl text-emerald-950 dark:text-amber-100 leading-loose">
              {dailyVerse.ayah.textArabicIndopak || dailyVerse.ayah.textArabic}
            </p>
          </div>

          <div className="space-y-2.5 my-3">
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-amber-400 uppercase tracking-wider block mb-1">
                اردو ترجمہ (فتح محمد جالندھری)
              </span>
              <p className="font-nastaliq text-base text-slate-800 dark:text-slate-200 text-right">
                {dailyVerse.ayah.translationUrdu}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-amber-400 uppercase tracking-wider block mb-1">
                English Translation (Sahih International)
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {dailyVerse.ayah.translationEnglish}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-slate-700/60 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isPlayingDaily) {
                    pauseAudio();
                  } else {
                    playAyah(dailyVerse.surahNum, dailyVerse.ayah);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-850 hover:bg-emerald-900 text-amber-200 font-semibold shadow-xs transition-colors"
              >
                {isPlayingDaily ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                <span>{isPlayingDaily ? t.pause : t.play}</span>
              </button>

              <button
                onClick={() => openTafseer(dailyVerse.surahNum, dailyVerse.ayah)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold transition-colors"
              >
                {t.tafseer}
              </button>

              <button
                onClick={() =>
                  handleCopy(
                    `${dailyVerse.ayah.textArabic}\n\nUrdu: ${dailyVerse.ayah.translationUrdu}\n\nEnglish: ${dailyVerse.ayah.translationEnglish} (Quran ${dailyVerse.surahNum}:${dailyVerse.ayah.numberInSurah})`,
                    'verse'
                  )
                }
                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
                title="Copy Ayah"
              >
                {copiedType === 'verse' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedSurahNum(dailyVerse.surahNum);
                setSelectedAyahNum(dailyVerse.ayah.numberInSurah);
                setActivePage('quran');
              }}
              className="font-semibold text-emerald-800 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>{language === 'ur' ? 'مکمل سورت' : 'Full Surah'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Dynamic Hadith of the Day Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-6 shadow-sm flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-slate-700/60 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400">
                <BookMarked className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-title text-sm font-bold text-emerald-950 dark:text-amber-300">
                  {t.hadithOfTheDay}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {dailyHadith.bookNameEnglish} #{dailyHadith.hadithNumber} • {dailyHadith.grade}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={refreshHadith}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
                title="Randomize Hadith"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleHadithBookmark}
                className={`p-1.5 rounded-lg transition-colors ${
                  isHadithBookmarked
                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                    : 'text-slate-400 hover:text-amber-500'
                }`}
                title="Bookmark Hadith"
              >
                <BookmarkIcon className={`w-4 h-4 ${isHadithBookmarked ? 'fill-amber-500' : ''}`} />
              </button>
            </div>
          </div>

          <div className="my-2 p-4 rounded-2xl bg-amber-50/40 dark:bg-slate-900/40 border border-amber-100 dark:border-slate-800 text-right">
            <p className="font-quran text-xl sm:text-2xl text-emerald-950 dark:text-amber-100 leading-loose">
              {dailyHadith.textArabic}
            </p>
          </div>

          <div className="space-y-2.5 my-3">
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block mb-1">
                اردو مفہوم ({dailyHadith.narratorUrdu})
              </span>
              <p className="font-nastaliq text-base text-slate-800 dark:text-slate-200 text-right">
                {dailyHadith.textUrdu}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block mb-1">
                English Translation ({dailyHadith.narratorEnglish})
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {dailyHadith.textEnglish}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-slate-700/60 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleCopy(
                    `${dailyHadith.textArabic}\n\n${dailyHadith.textUrdu}\n\n${dailyHadith.textEnglish} (${dailyHadith.reference})`,
                    'hadith'
                  )
                }
                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
                title="Copy Hadith"
              >
                {copiedType === 'hadith' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <span className="text-[11px] text-slate-400 truncate max-w-xs">{dailyHadith.reference}</span>
            </div>

            <button
              onClick={() => setActivePage('hadith')}
              className="font-semibold text-emerald-800 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>{language === 'ur' ? 'احادیث مطالعہ' : 'All Hadiths'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Quick Salah Streak Tracker Widget on Home */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <h4 className="font-title text-base font-bold text-slate-800 dark:text-slate-100">
              {language === 'ur' ? 'صلوٰۃ ٹریکر: آج کی نمازیں' : 'Salah Tracker: Today\'s Prayers'}
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Current Streak: <strong>{userProfile.currentStreak} Days</strong> • Total Score: <strong>{userProfile.totalPoints} pts</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((p) => {
            const st = todaySalah[p];
            return (
              <button
                key={p}
                onClick={() => setActivePage('account')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  st === 'jamat'
                    ? 'bg-emerald-600 text-white'
                    : st === 'qaza'
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-100 dark:bg-slate-700 text-slate-400'
                }`}
              >
                {p}
              </button>
            );
          })}
          <button
            onClick={() => setActivePage('account')}
            className="p-2 rounded-xl bg-amber-500 text-emerald-950 font-bold text-xs"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
};
