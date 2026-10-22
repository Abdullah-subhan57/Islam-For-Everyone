/**
 * Core type definitions for Islam for Everyone application
 */

export type Language = 'en' | 'ur';
export type ThemeMode = 'emerald' | 'midnight' | 'terracotta';
export type IbadatGuideId = 'salah' | 'fasting' | 'zakat' | 'hajj' | 'umrah' | 'ghusl';

export type PageId =
  | 'home'
  | 'quran'
  | 'hadith'
  | 'prayer'
  | 'qibla'
  | 'duas'
  | 'tasbih'
  | 'quiz'
  | 'names99'
  | 'calendar'
  | 'history'
  | 'account'
  | 'assistant'
  | 'ibadat';

export interface Ayah {
  number: number;
  numberInSurah: number;
  juz: number;
  page?: number;
  textArabic: string;
  textArabicIndopak?: string;
  translationUrdu: string;
  translationEnglish: string;
  transliteration?: string;
  audioUrl?: string;
  sajda?: boolean;
}

export interface SurahIntro {
  surahNumber: number;
  periodEn: string;
  periodUr: string;
  themeEn: string;
  themeUr: string;
  historicalBackgroundEn: string;
  historicalBackgroundUr: string;
  keyLessonsEn: string[];
  keyLessonsUr: string[];
}

export interface AyahTafseer {
  ayahNumber: number;
  surahNumber: number;
  tafseerUrdu: string;
  tafseerEnglish: string;
  source: string;
}

export interface Surah {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameUrdu: string;
  englishMeaning: string;
  revelationType: 'Meccan' | 'Medinan';
  revelationOrder: number;
  numberOfAyahs: number;
  juzStart: number;
  pageStart?: number;
  bismillahPre?: boolean;
  intro?: SurahIntro;
  ayahs?: Ayah[];
}

export interface JuzMeta {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameUrdu: string;
  startSurah: number;
  startSurahName: string;
  startAyah: number;
}

export interface Hadith {
  id: string;
  bookId: string;
  bookNameEnglish: string;
  bookNameUrdu: string;
  hadithNumber: string | number;
  chapterTitleEnglish: string;
  chapterTitleUrdu: string;
  narratorEnglish: string;
  narratorUrdu: string;
  textArabic: string;
  textUrdu: string;
  textEnglish: string;
  grade: 'Sahih' | 'Hasan' | 'Muttafaq Alayh' | 'Daif' | 'Unknown';
  reference: string;
  tags: string[];
}

export interface HadithBook {
  id: string;
  nameEnglish: string;
  nameArabic: string;
  nameUrdu: string;
  authorEnglish: string;
  totalHadiths: number;
  description: string;
  chaptersCount: number;
}

export interface PrayerTimesData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  qiyam: string;
  nextPrayer: string;
  timeRemainingMinutes: number;
  timeRemainingFormatted: string;
}

export interface CityLocation {
  name: string;
  nameUrdu: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface Dua {
  id: string;
  category: string;
  categoryUrdu: string;
  titleEnglish: string;
  titleUrdu: string;
  arabic: string;
  urdu: string;
  english: string;
  transliteration?: string;
  reference: string;
  targetCount: number;
  benefits?: string;
}

export interface TasbihPreset {
  id: string;
  arabic: string;
  urdu: string;
  english: string;
  transliteration: string;
  target: number;
  meaning: string;
  benefit: string;
}

export interface QuizQuestion {
  id: string;
  category: 'quran' | 'seerah' | 'prophets' | 'caliphs' | 'fiqh' | 'history';
  difficulty: 'easy' | 'medium' | 'hard';
  questionEnglish: string;
  questionUrdu: string;
  optionsEnglish: string[];
  optionsUrdu: string[];
  correctIndex: number;
  explanationEnglish: string;
  explanationUrdu: string;
  reference?: string;
}

export interface Bookmark {
  id: string;
  type: 'ayah' | 'hadith' | 'dua';
  title: string;
  subtitle: string;
  arabicPreview: string;
  timestamp: number;
  metadata: {
    surahNumber?: number;
    ayahNumber?: number;
    hadithId?: string;
    duaId?: string;
  };
}

export interface AsmaUlHusna {
  number: number;
  nameArabic: string;
  transliteration: string;
  nameEnglish: string;
  nameUrdu: string;
  meaningEnglish: string;
  meaningUrdu: string;
  quranicReference?: string;
  spiritualBenefit?: string;
}

export interface IslamicEvent {
  id: string;
  hijriDay: number;
  hijriMonth: number;
  titleEn: string;
  titleUr: string;
  yearAH?: number | string;
  descriptionEn: string;
  descriptionUr: string;
  category: 'prophetic' | 'caliphate' | 'battle' | 'festivity';
}

export interface HistoryFigure {
  id: string;
  nameEn: string;
  nameUr: string;
  titleEn: string;
  titleUr: string;
  eraEn: string;
  eraUr: string;
  type: 'prophet' | 'caliph' | 'empire';
  timeline: string;
  summaryEn: string;
  summaryUr: string;
  keyEventsEn: string[];
  keyEventsUr: string[];
  lessonsEn: string;
  lessonsUr: string;
}

export type PrayerStatus = 'jamat' | 'qaza' | 'none';

export interface AssistantConversationEntry {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export interface DailySalahRecord {
  date: string; // YYYY-MM-DD
  fajr: PrayerStatus;
  dhuhr: PrayerStatus;
  asr: PrayerStatus;
  maghrib: PrayerStatus;
  isha: PrayerStatus;
  tahajjud?: boolean;
  points: number;
}

export interface StreakBadge {
  id: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  requiredDays: number;
  icon: string;
  unlocked: boolean;
}

export interface StreakTracker {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;
  versesReadToday: number;
  dailyGoalVerses: number;
  totalVersesRead: number;
  tasbihCountToday: number;
}

export interface TasbihProgress {
  selectedPresetId: string;
  count: number;
  laps: number;
  target: number;
  totalCount: number;
  countDate: string;
  countToday: number;
}

export interface UserProfile {
  id: string;
  name: string;
  username?: string;
  email: string;
  avatarUrl?: string;
  joinedDate: string;
  city: string;
  latitude?: number;
  longitude?: number;
  timeZone?: string;
  totalPoints: number;
  totalVersesRead?: number;
  versesReadToday?: number;
  verseReadDate?: string;
  currentStreak: number;
  bestStreak: number;
  streakBrokenDate?: string;
  preAdhanNotification: boolean;
  onboardingCompleted: boolean;
  ramadanLogs: Record<string, boolean>; // date -> fasted
  manualPrayerTimes?: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  } | null;
}
