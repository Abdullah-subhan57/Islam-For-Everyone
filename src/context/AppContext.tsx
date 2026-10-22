import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  Ayah,
  AssistantConversationEntry,
  Bookmark,
  DailySalahRecord,
  Language,
  IbadatGuideId,
  PageId,
  PrayerStatus,
  StreakBadge,
  StreakTracker,
  Surah,
  TasbihProgress,
  ThemeMode,
  UserProfile,
  AyahTafseer
} from '../types';
import type { User as AuthUser } from '@supabase/supabase-js';
import { getAyahTafseer, QuranDataProvider } from '../services/quranData';
import { PrayerTimesService } from '../services/prayerTimes';
import { supabase, supabaseConfigured } from '../services/supabase';

interface AudioState {
  isPlaying: boolean;
  currentAyah: Ayah | null;
  currentSurahNum: number | null;
  queuedSurahNum: number | null;
  audioElement: HTMLAudioElement | null;
  playbackSpeed: number;
  error: string | null;
}

interface AppContextType {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  selectedSurahNum: number;
  setSelectedSurahNum: (num: number) => void;
  selectedAyahNum: number | null;
  setSelectedAyahNum: (num: number | null) => void;
  selectedIbadatGuide: IbadatGuideId;
  setSelectedIbadatGuide: (guide: IbadatGuideId) => void;
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'timestamp'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (type: 'ayah' | 'hadith' | 'dua', key: string | number) => boolean;
  streak: StreakTracker;
  recordVerseRead: () => void;
  audioState: AudioState;
  playAyah: (surahNum: number, ayah: Ayah) => void;
  playSurah: (surahNum: number, ayahs: Ayah[]) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  setPlaybackSpeed: (speed: number) => void;
  playAdhan: () => void;

  // Tafseer & Surah Intro Modals
  isTafseerModalOpen: boolean;
  activeTafseerAyah: Ayah | null;
  activeTafseerData: AyahTafseer | null;
  openTafseer: (surahNum: number, ayah: Ayah) => void;
  closeTafseer: () => void;

  isIntroModalOpen: boolean;
  activeIntroSurah: Surah | null;
  openSurahIntro: (surah: Surah) => void;
  closeSurahIntro: () => void;

  // User Profile & Salah Tracker
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  salahLog: Record<string, DailySalahRecord>;
  recordSalahStatus: (date: string, prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha', status: PrayerStatus) => void;
  streakBadges: StreakBadge[];
  assistantMemory: AssistantConversationEntry[];
  setAssistantMemory: (messages: AssistantConversationEntry[]) => void;
  tasbihProgress: TasbihProgress;
  updateTasbihProgress: (progress: TasbihProgress) => void;
  authConfigured: boolean;
  authReady: boolean;
  authDataReady: boolean;
  authUser: AuthUser | null;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  requestEmailCode: (email: string) => Promise<void>;
  verifyEmailCode: (email: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;

  // Global UI Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isBookmarksOpen: boolean;
  setIsBookmarksOpen: (open: boolean) => void;
  isDatasetModalOpen: boolean;
  setIsDatasetModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const THEME_KEY = 'islam360_theme';
const LANG_KEY = 'islam360_lang';
const BOOKMARKS_KEY = 'islam360_bookmarks';
const PROFILE_KEY = 'islam360_user_profile';
const SALAH_LOG_KEY = 'islam360_salah_log';
const TASBIH_PROGRESS_KEY = 'islam360_tasbih_progress';
const getLocalAppStateKey = (userId: string) => `islam360_app_state_${userId}`;
const getLocalDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const getAssistantMemoryKey = (profileId: string) => `islam360_assistant_chat_${profileId}`;
const isSalahDayComplete = (record: DailySalahRecord | undefined) =>
  Boolean(record) && (['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).every(
    (prayer) => record?.[prayer] !== 'none'
  );

interface CloudAppState {
  userProfile: UserProfile;
  salahLog: Record<string, DailySalahRecord>;
  bookmarks: Bookmark[];
  assistantMemory: AssistantConversationEntry[];
  tasbihProgress: TasbihProgress;
}

interface LocalAppSnapshot {
  state: CloudAppState;
  savedAt: number;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const DEFAULT_TASBIH_PROGRESS: TasbihProgress = {
  selectedPresetId: 'subhanallah',
  count: 0,
  laps: 0,
  target: 33,
  totalCount: 0,
  countDate: getLocalDateKey(new Date()),
  countToday: 0
};

const isTasbihProgress = (value: unknown): value is TasbihProgress =>
  isRecord(value) &&
  typeof value.selectedPresetId === 'string' &&
  Number.isInteger(value.count) && Number(value.count) >= 0 &&
  Number.isInteger(value.laps) && Number(value.laps) >= 0 &&
  Number.isInteger(value.target) && Number(value.target) > 0 &&
  Number.isInteger(value.totalCount) && Number(value.totalCount) >= 0 &&
  typeof value.countDate === 'string' &&
  Number.isInteger(value.countToday) && Number(value.countToday) >= 0;

const isUserProfile = (value: unknown): value is UserProfile =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.name === 'string' &&
  typeof value.email === 'string' &&
  typeof value.joinedDate === 'string' &&
  typeof value.city === 'string' &&
  typeof value.totalPoints === 'number' &&
  typeof value.currentStreak === 'number' &&
  typeof value.bestStreak === 'number' &&
  typeof value.preAdhanNotification === 'boolean' &&
  typeof value.onboardingCompleted === 'boolean' &&
  isRecord(value.ramadanLogs);

const isAssistantMemory = (value: unknown): value is AssistantConversationEntry[] =>
  Array.isArray(value) && value.every((entry) =>
    isRecord(entry) &&
    typeof entry.id === 'number' &&
    (entry.role === 'user' || entry.role === 'assistant') &&
    typeof entry.content === 'string'
  );

const parseCloudAppState = (value: unknown): CloudAppState | null => {
  if (
    !isRecord(value) ||
    !isUserProfile(value.userProfile) ||
    !isRecord(value.salahLog) ||
    !Array.isArray(value.bookmarks) ||
    !isAssistantMemory(value.assistantMemory) ||
    (value.tasbihProgress !== undefined && !isTasbihProgress(value.tasbihProgress))
  ) return null;

  return {
    userProfile: value.userProfile,
    salahLog: value.salahLog as Record<string, DailySalahRecord>,
    bookmarks: value.bookmarks as Bookmark[],
    assistantMemory: value.assistantMemory,
    tasbihProgress: isTasbihProgress(value.tasbihProgress)
      ? value.tasbihProgress
      : DEFAULT_TASBIH_PROGRESS
  };
};

const parseLocalAppSnapshot = (value: unknown): LocalAppSnapshot | null => {
  if (!isRecord(value) || typeof value.savedAt !== 'number' || !Number.isFinite(value.savedAt)) return null;
  const state = parseCloudAppState(value.state);
  return state ? { state, savedAt: value.savedAt } : null;
};

const createDefaultProfile = (id: string, name: string, email: string, avatarUrl?: string): UserProfile => ({
  id,
  name,
  email,
  ...(avatarUrl ? { avatarUrl } : {}),
  joinedDate: getLocalDateKey(new Date()),
  city: 'Islamabad',
  totalPoints: 0,
  currentStreak: 0,
  bestStreak: 0,
  preAdhanNotification: false,
  onboardingCompleted: false,
  ramadanLogs: {}
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: 'emerald' (warm light) | 'midnight' (dark) | 'terracotta'
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'emerald' || saved === 'midnight' || saved === 'terracotta') return saved;
      return 'emerald';
    } catch {
      return 'emerald';
    }
  });

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'ur' || saved === 'en') return saved;
      return 'ur'; // default to Urdu for high cultural richness
    } catch {
      return 'ur';
    }
  });

  // Navigation state
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedSurahNum, setSelectedSurahNum] = useState<number>(1);
  const [selectedAyahNum, setSelectedAyahNum] = useState<number | null>(null);
  const [selectedIbadatGuide, setSelectedIbadatGuide] = useState<IbadatGuideId>('salah');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState(false);

  // Tafseer & Intro
  const [isTafseerModalOpen, setIsTafseerModalOpen] = useState(false);
  const [activeTafseerAyah, setActiveTafseerAyah] = useState<Ayah | null>(null);
  const [activeTafseerData, setActiveTafseerData] = useState<AyahTafseer | null>(null);

  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [activeIntroSurah, setActiveIntroSurah] = useState<Surah | null>(null);

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      id: 'usr-1',
      name: 'Muslim Seeker',
      email: '',
      joinedDate: getLocalDateKey(new Date()),
      city: 'Islamabad',
      totalPoints: 0,
      currentStreak: 0,
      bestStreak: 0,
      preAdhanNotification: false,
      onboardingCompleted: false,
      ramadanLogs: {}
    };
  });

  // Salah Tracker Records
  const [salahLog, setSalahLog] = useState<Record<string, DailySalahRecord>>(() => {
    try {
      const saved = localStorage.getItem(SALAH_LOG_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [assistantMemory, setAssistantMemory] = useState<AssistantConversationEntry[]>(() => {
    try {
      const saved = localStorage.getItem(getAssistantMemoryKey(userProfile.id));
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      return isAssistantMemory(parsed) ? parsed : [];
    } catch (error) {
      console.error('Unable to load the assistant memory:', error);
      return [];
    }
  });
  const [tasbihProgress, setTasbihProgress] = useState<TasbihProgress>(() => {
    try {
      const saved = localStorage.getItem(TASBIH_PROGRESS_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (isTasbihProgress(parsed)) return parsed;
      }
      const legacyTotal = Number(localStorage.getItem('islam360_tasbih_lifetime'));
      return Number.isFinite(legacyTotal) && legacyTotal >= 0
        ? { ...DEFAULT_TASBIH_PROGRESS, totalCount: Math.floor(legacyTotal) }
        : DEFAULT_TASBIH_PROGRESS;
    } catch (error) {
      console.error('Unable to load tasbih progress:', error);
      return DEFAULT_TASBIH_PROGRESS;
    }
  });
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authReady, setAuthReady] = useState(!supabaseConfigured);
  const [authDataReady, setAuthDataReady] = useState(!supabaseConfigured);
  const [authError, setAuthError] = useState<string | null>(null);
  const loadedCloudUserId = useRef<string | null>(null);
  const cloudStateReady = useRef(false);
  const localStateRef = useRef<CloudAppState>({
    userProfile,
    salahLog,
    bookmarks,
    assistantMemory,
    tasbihProgress
  });
  localStateRef.current = { userProfile, salahLog, bookmarks, assistantMemory, tasbihProgress };

  // Audio State
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentAyah: null,
    currentSurahNum: null,
    queuedSurahNum: null,
    audioElement: null,
    playbackSpeed: 1.0,
    error: null
  });
  const playbackQueue = useRef<{ surahNum: number; ayahs: Ayah[] } | null>(null);
  const playbackSpeedRef = useRef(1);

  useEffect(() => {
    try {
      localStorage.setItem(getAssistantMemoryKey(userProfile.id), JSON.stringify(assistantMemory));
    } catch (error) {
      console.error('Unable to save the assistant memory:', error);
    }
  }, [assistantMemory, userProfile.id]);

  useEffect(() => {
    if (authUser && !authDataReady) return;
    const accountId = authUser?.id ?? userProfile.id;
    const state: CloudAppState = { userProfile, salahLog, bookmarks, assistantMemory, tasbihProgress };
    localStateRef.current = state;
    try {
      localStorage.setItem(
        getLocalAppStateKey(accountId),
        JSON.stringify({ state, savedAt: Date.now() } satisfies LocalAppSnapshot)
      );
      localStorage.setItem(TASBIH_PROGRESS_KEY, JSON.stringify(tasbihProgress));
      localStorage.setItem('islam360_tasbih_lifetime', String(tasbihProgress.totalCount));
    } catch (error) {
      console.error('Unable to save the local account backup:', error);
      setAuthError('Your latest changes could not be saved on this device. Check available browser storage.');
    }
  }, [authUser, authDataReady, userProfile, salahLog, bookmarks, assistantMemory, tasbihProgress]);

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let isMounted = true;

    const loadUserState = async (user: AuthUser) => {
      if (!isMounted) return;
      setAuthUser(user);
      if (loadedCloudUserId.current === user.id && cloudStateReady.current) {
        setAuthReady(true);
        return;
      }

      loadedCloudUserId.current = user.id;
      cloudStateReady.current = false;
      setAuthReady(false);
      setAuthDataReady(false);
      setAuthError(null);
      const { data, error } = await client
        .from('user_app_state')
        .select('app_state, updated_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!isMounted || loadedCloudUserId.current !== user.id) return;
      if (error) {
        setAuthError(`Could not load your saved account data: ${error.message}`);
        setAuthReady(true);
        return;
      }

      let localSnapshot: LocalAppSnapshot | null = null;
      try {
        const saved = localStorage.getItem(getLocalAppStateKey(user.id));
        localSnapshot = saved ? parseLocalAppSnapshot(JSON.parse(saved)) : null;
      } catch (localError) {
        console.error('Unable to read the local account backup:', localError);
      }

      let accountState: CloudAppState | null = null;
      if (data?.app_state !== undefined && data.app_state !== null) {
        const cloudState = parseCloudAppState(data.app_state);
        if (!cloudState) {
          setAuthError('Your saved account data has an invalid format and was not loaded.');
          setAuthReady(true);
          return;
        }
        if (
          isRecord(data.app_state) &&
          data.app_state.tasbihProgress === undefined &&
          localStateRef.current.userProfile.id === user.id &&
          localStateRef.current.tasbihProgress.totalCount > 0
        ) {
          cloudState.tasbihProgress = localStateRef.current.tasbihProgress;
        }
        const cloudSavedAt = data.updated_at ? Date.parse(data.updated_at) : 0;
        accountState = localSnapshot && localSnapshot.savedAt > cloudSavedAt
          ? localSnapshot.state
          : cloudState;
        if (accountState === localSnapshot?.state) {
          setAuthError('Restoring newer changes from this device and syncing them to your account.');
        }
      } else {
        const metadata = user.user_metadata;
        const name = typeof metadata.full_name === 'string'
          ? metadata.full_name
          : typeof metadata.name === 'string'
            ? metadata.name
            : user.email?.split('@')[0] ?? 'Muslim';
        const avatarUrl = typeof metadata.avatar_url === 'string'
          ? metadata.avatar_url
          : typeof metadata.picture === 'string'
            ? metadata.picture
            : undefined;
        const guestState = localStateRef.current.userProfile.id === 'usr-1'
          ? localStateRef.current
          : null;
        accountState = localSnapshot?.state ?? guestState ?? {
          userProfile: createDefaultProfile(user.id, name, user.email ?? '', avatarUrl),
          salahLog: {},
          bookmarks: [],
          assistantMemory: [],
          tasbihProgress: DEFAULT_TASBIH_PROGRESS
        };
      }

      if (!accountState) {
        setAuthError('Your saved account data could not be restored.');
        setAuthReady(true);
        return;
      }
      accountState = {
        ...accountState,
        userProfile: {
          ...accountState.userProfile,
          id: user.id,
          email: user.email ?? accountState.userProfile.email
        }
      };
      setUserProfile(accountState.userProfile);
      setSalahLog(accountState.salahLog);
      setBookmarks(accountState.bookmarks);
      setAssistantMemory(accountState.assistantMemory);
      setTasbihProgress(accountState.tasbihProgress);
      cloudStateReady.current = true;
      setAuthDataReady(true);
      setAuthReady(true);
    };

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      if (!user) {
        loadedCloudUserId.current = null;
        cloudStateReady.current = false;
        setAuthUser(null);
        setAuthReady(true);
        setAuthDataReady(false);
        setAuthError(null);
        return;
      }
      window.setTimeout(() => void loadUserState(user), 0);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const client = supabase;
    if (!client || !authUser || !authReady || !cloudStateReady.current) return;
    const timer = window.setTimeout(() => {
      void client
        .from('user_app_state')
        .upsert({
          user_id: authUser.id,
          app_state: { userProfile, salahLog, bookmarks, assistantMemory, tasbihProgress },
          updated_at: new Date().toISOString()
        })
        .then(({ error }) => {
          if (error) {
            console.error('Unable to sync account data:', error);
            setAuthError(`Your latest changes could not be synced: ${error.message}`);
          } else {
            setAuthError(null);
          }
        });
    }, 500);
    return () => window.clearTimeout(timer);
  }, [authUser, authReady, userProfile, salahLog, bookmarks, assistantMemory, tasbihProgress]);

  // Apply theme class to document
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
      if (theme === 'midnight') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {}
  }, [theme]);

  // Apply language direction to document
  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, language);
      document.documentElement.setAttribute('dir', language === 'ur' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', language);
    } catch {}
  }, [language]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'midnight' ? 'emerald' : 'midnight'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const signInWithGoogle = async () => {
    if (!supabase) throw new Error('Supabase authentication is not configured.');
    setAuthError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const requestEmailCode = async (email: string) => {
    if (!supabase) throw new Error('Supabase authentication is not configured.');
    setAuthError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: window.location.origin
      }
    });
    if (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const verifyEmailCode = async (email: string, code: string) => {
    if (!supabase) throw new Error('Supabase authentication is not configured.');
    setAuthError(null);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: 'email'
    });
    if (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Unable to save the user profile:', error);
      }
      return updated;
    });
  };

  const updateTasbihProgress = (progress: TasbihProgress) => {
    if (!isTasbihProgress(progress)) {
      console.error('Refusing to save invalid tasbih progress.');
      return;
    }
    setTasbihProgress(progress);
  };

  // Record Salah status (Jamat = 1.0 pt, Qaza = 0.5 pt, streak DOES NOT BREAK on Qaza!)
  const recordSalahStatus = (date: string, prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha', status: PrayerStatus) => {
    setSalahLog(prev => {
      const current = prev[date] || {
        date,
        fajr: 'none',
        dhuhr: 'none',
        asr: 'none',
        maghrib: 'none',
        isha: 'none',
        points: 0
      };

      const updatedRecord: DailySalahRecord = {
        ...current,
        [prayer]: status
      };

      // Recalculate daily points
      let pts = 0;
      (['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).forEach(k => {
        if (updatedRecord[k] === 'jamat') pts += 1.0;
        else if (updatedRecord[k] === 'qaza') pts += 0.5;
      });
      updatedRecord.points = pts;

      const updatedLog = { ...prev, [date]: updatedRecord };
      try {
        localStorage.setItem(SALAH_LOG_KEY, JSON.stringify(updatedLog));
      } catch (error) {
        console.error('Unable to save the Salah log:', error);
      }

      // Update user streak & lifetime points
      const today = getLocalDateKey(new Date());
      let newStreak = 0;
      const todayRecord = updatedLog[today];
      const cursor = new Date(`${today}T12:00:00`);
      if (!isSalahDayComplete(todayRecord)) cursor.setDate(cursor.getDate() - 1);
      while (isSalahDayComplete(updatedLog[getLocalDateKey(cursor)])) {
        newStreak += 1;
        cursor.setDate(cursor.getDate() - 1);
      }

      const missedDateDate = new Date(`${today}T12:00:00`);
      missedDateDate.setDate(missedDateDate.getDate() - 1);
      const missedDate = getLocalDateKey(missedDateDate);
      const streakWasBroken = !isSalahDayComplete(todayRecord) &&
        userProfile.currentStreak > 0 &&
        newStreak === 0;
      if (
        streakWasBroken &&
        typeof Notification !== 'undefined' &&
        Notification.permission === 'granted'
      ) {
        const notificationKey = `islam360_streak_broken_${missedDate}`;
        try {
          if (!localStorage.getItem(notificationKey)) {
            new Notification('Salah streak ended', {
              body: 'Your previous streak has ended. Start a new one with today’s prayers.',
              icon: '/favicon.svg'
            });
            localStorage.setItem(notificationKey, 'true');
          }
        } catch (error) {
          console.error('Unable to send the streak notification:', error);
        }
      }

      updateUserProfile({
        totalPoints: Math.max(0, userProfile.totalPoints + pts - current.points),
        currentStreak: newStreak,
        bestStreak: Math.max(userProfile.bestStreak, newStreak),
        ...(streakWasBroken ? { streakBrokenDate: missedDate } : newStreak > 0 ? { streakBrokenDate: undefined } : {})
      });

      return updatedLog;
    });
  };

  // Streak Milestone Badges
  const streakBadges: StreakBadge[] = [
    {
      id: 'b-7',
      titleEn: '7-Day Istiqamah (Beginner)',
      titleUr: '۷ دن کی استقامت (مبتدی)',
      descriptionEn: 'Maintained unbroken daily prayers for 7 consecutive days.',
      descriptionUr: 'مسلسل ۷ دن تک بغیر ناغہ نماز ادا کرنے کا پہلا اعزاز۔',
      requiredDays: 7,
      icon: '🌱',
      unlocked: userProfile.currentStreak >= 7
    },
    {
      id: 'b-40',
      titleEn: '40-Day Takbeer-e-Ula (Virtuous)',
      titleUr: '۴۰ دن کا چلہ (تکبیرِ اولیٰ فضیلت)',
      descriptionEn: 'The Prophet ﷺ said whoever prays 40 days in congregation is freed from hypocrisy and fire.',
      descriptionUr: 'حدیثِ مبارکہ کے مطابق ۴۰ دن باجماعت نماز کی پابندی منافقت اور آگ سے براءت ہے۔',
      requiredDays: 40,
      icon: '🕌',
      unlocked: userProfile.currentStreak >= 40
    },
    {
      id: 'b-100',
      titleEn: '100-Day Sabir (Stalwart)',
      titleUr: '۱۰۰ دن کا صابر و شاکر مومن',
      descriptionEn: 'Exceptional 100-day consistency in Salah and remembrance of Allah.',
      descriptionUr: 'سو دن تک تسلسل سے نماز اور ذکرِ الٰہی پر ثابت قدم رہنے کا مبارک بیج۔',
      requiredDays: 100,
      icon: '⭐',
      unlocked: userProfile.currentStreak >= 100
    },
    {
      id: 'b-365',
      titleEn: '365-Day Annual Champion',
      titleUr: '۳۶۵ دن کا سالانہ چیمپئن (ولی اللہ)',
      descriptionEn: 'A full solar year of steadfast, unblemished dedication to Salah.',
      descriptionUr: 'پورا سال ہر نماز وقت پر ادا کرنے والے باوفا نمازی کا سب سے بڑا اعزاز۔',
      requiredDays: 365,
      icon: '👑',
      unlocked: userProfile.currentStreak >= 365
    }
  ];

  // Tafseer Modal Open/Close
  const openTafseer = (surahNum: number, ayah: Ayah) => {
    setActiveTafseerAyah(ayah);
    const tafseerData = getAyahTafseer(surahNum, ayah.numberInSurah);
    setActiveTafseerData(tafseerData);
    setIsTafseerModalOpen(true);
  };

  const closeTafseer = () => {
    setIsTafseerModalOpen(false);
    setActiveTafseerAyah(null);
    setActiveTafseerData(null);
  };

  // Surah Intro Modal Open/Close
  const openSurahIntro = (surah: Surah) => {
    setActiveIntroSurah(surah);
    setIsIntroModalOpen(true);
  };

  const closeSurahIntro = () => {
    setIsIntroModalOpen(false);
    setActiveIntroSurah(null);
  };

  // Bookmarking
  const addBookmark = (item: Omit<Bookmark, 'id' | 'timestamp'>) => {
    const newBookmark: Bookmark = {
      ...item,
      id: `${item.type}-${item.metadata.surahNumber || item.metadata.hadithId || item.metadata.duaId}-${item.metadata.ayahNumber || '0'}`,
      timestamp: Date.now()
    };
    setBookmarks(prev => {
      const filtered = prev.filter(b => b.id !== newBookmark.id);
      const updated = [newBookmark, ...filtered];
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Unable to save bookmarks:', error);
      }
      return updated;
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => {
      const updated = prev.filter(b => b.id !== id);
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Unable to save bookmarks:', error);
      }
      return updated;
    });
  };

  const isBookmarked = (type: 'ayah' | 'hadith' | 'dua', key: string | number): boolean => {
    if (type === 'ayah') {
      return bookmarks.some(b => b.type === 'ayah' && b.metadata.ayahNumber === key);
    }
    if (type === 'hadith') {
      return bookmarks.some(b => b.type === 'hadith' && b.metadata.hadithId === key);
    }
    if (type === 'dua') {
      return bookmarks.some(b => b.type === 'dua' && b.metadata.duaId === key);
    }
    return false;
  };

  // Recitation Audio Player
  const startAyahPlayback = (surahNum: number, ayah: Ayah) => {
    if (audioState.audioElement) {
      audioState.audioElement.pause();
    }

    const sNum = String(surahNum).padStart(3, '0');
    const aNum = String(ayah.numberInSurah).padStart(3, '0');
    const url = `https://everyayah.com/data/Alafasy_128kbps/${sNum}${aNum}.mp3`;

    const audio = new Audio(url);
    audio.playbackRate = playbackSpeedRef.current;

    audio.onended = () => {
      const queue = playbackQueue.current;
      const index = queue?.surahNum === surahNum
        ? queue.ayahs.findIndex(item => item.numberInSurah === ayah.numberInSurah)
        : -1;
      const nextAyah = index >= 0 ? queue?.ayahs[index + 1] : undefined;
      if (nextAyah) {
        startAyahPlayback(surahNum, nextAyah);
      } else if (queue?.surahNum === surahNum) {
        playbackQueue.current = null;
        setAudioState(prev => ({
          ...prev,
          isPlaying: false,
          currentAyah: null,
          currentSurahNum: null,
          queuedSurahNum: null,
          audioElement: null
        }));
      } else {
        setAudioState(prev => ({ ...prev, isPlaying: false }));
      }
    };

    audio.onerror = () => {
      playbackQueue.current = null;
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
        queuedSurahNum: null,
        audioElement: null,
        error: 'Recitation audio could not be loaded. Check your connection and try again.'
      }));
    };

    audio.play().then(() => {
      setAudioState({
        isPlaying: true,
        currentAyah: ayah,
        currentSurahNum: surahNum,
        queuedSurahNum: playbackQueue.current?.surahNum ?? null,
        audioElement: audio,
        playbackSpeed: playbackSpeedRef.current,
        error: null
      });
    }).catch(() => {
      setAudioState(prev => ({
        ...prev,
        isPlaying: false,
        error: 'Recitation audio could not be started. Check your connection and try again.'
      }));
    });
  };

  const playAyah = (surahNum: number, ayah: Ayah) => {
    playbackQueue.current = null;
    startAyahPlayback(surahNum, ayah);
  };

  const playSurah = (surahNum: number, ayahs: Ayah[]) => {
    if (ayahs.length === 0) return;
    playbackQueue.current = { surahNum, ayahs };
    startAyahPlayback(surahNum, ayahs[0]);
  };

  const pauseAudio = () => {
    if (audioState.audioElement) {
      audioState.audioElement.pause();
      setAudioState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const resumeAudio = () => {
    if (audioState.audioElement) {
      audioState.audioElement.play().then(() => {
        setAudioState(prev => ({ ...prev, isPlaying: true }));
      }).catch(() => {
        setAudioState(prev => ({
          ...prev,
          isPlaying: false,
          error: 'Recitation audio could not be resumed. Check your connection and try again.'
        }));
      });
    }
  };

  const stopAudio = () => {
    if (audioState.audioElement) {
      audioState.audioElement.pause();
      audioState.audioElement.currentTime = 0;
    }
    setAudioState({
      isPlaying: false,
      currentAyah: null,
      currentSurahNum: null,
      queuedSurahNum: null,
      audioElement: null,
      playbackSpeed: audioState.playbackSpeed,
      error: null
    });
    playbackQueue.current = null;
  };

  const setPlaybackSpeed = (speed: number) => {
    playbackSpeedRef.current = speed;
    if (audioState.audioElement) {
      audioState.audioElement.playbackRate = speed;
    }
    setAudioState(prev => ({ ...prev, playbackSpeed: speed }));
  };

  const playAdhan = () => {
    PrayerTimesService.playAdhanAudio('makkah');
  };

  const recordVerseRead = () => {
    const today = getLocalDateKey(new Date());
    updateUserProfile({
      totalVersesRead: (userProfile.totalVersesRead ?? 0) + 1,
      versesReadToday: userProfile.verseReadDate === today ? (userProfile.versesReadToday ?? 0) + 1 : 1,
      verseReadDate: today
    });
  };

  const streak: StreakTracker = {
    currentStreak: userProfile.currentStreak,
    bestStreak: userProfile.bestStreak,
    lastActiveDate: getLocalDateKey(new Date()),
    versesReadToday: userProfile.verseReadDate === getLocalDateKey(new Date()) ? (userProfile.versesReadToday ?? 0) : 0,
    dailyGoalVerses: 10,
    totalVersesRead: userProfile.totalVersesRead ?? 0,
    tasbihCountToday: tasbihProgress.countDate === getLocalDateKey(new Date())
      ? tasbihProgress.countToday
      : 0
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        activePage,
        setActivePage,
        selectedSurahNum,
        setSelectedSurahNum,
        selectedAyahNum,
        setSelectedAyahNum,
        selectedIbadatGuide,
        setSelectedIbadatGuide,
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        streak,
        recordVerseRead,
        audioState,
        playAyah,
        playSurah,
        pauseAudio,
        resumeAudio,
        stopAudio,
        setPlaybackSpeed,
        playAdhan,

        isTafseerModalOpen,
        activeTafseerAyah,
        activeTafseerData,
        openTafseer,
        closeTafseer,

        isIntroModalOpen,
        activeIntroSurah,
        openSurahIntro,
        closeSurahIntro,

        userProfile,
        updateUserProfile,
        salahLog,
        recordSalahStatus,
        streakBadges,
        assistantMemory,
        setAssistantMemory,
        tasbihProgress,
        updateTasbihProgress,
        authConfigured: supabaseConfigured,
        authReady,
        authDataReady,
        authUser,
        authError,
        signInWithGoogle,
        requestEmailCode,
        verifyEmailCode,
        signOut,

        isSearchOpen,
        setIsSearchOpen,
        isBookmarksOpen,
        setIsBookmarksOpen,
        isDatasetModalOpen,
        setIsDatasetModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
