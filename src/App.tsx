/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { DatasetModal } from './components/DatasetModal';
import { GuidedTour } from './components/GuidedTour';
import { TafseerModal } from './components/TafseerModal';
import { SurahIntroModal } from './components/SurahIntroModal';
import { BookOpen, Minus, Plus, X } from 'lucide-react';
import {
  applyManualPrayerTimes,
  DEFAULT_MANUAL_PRAYER_TIMES,
  PrayerTimesService,
  MAJOR_CITIES
} from './services/prayerTimes';

// Application Pages
import { HomeDashboard } from './pages/HomeDashboard';
import { QuranReader } from './pages/QuranReader';
import { HadithBrowser } from './pages/HadithBrowser';
import { PrayerTimesPage } from './pages/PrayerTimesPage';
import { QiblaCompassPage } from './pages/QiblaCompassPage';
import { DuasAzkarPage } from './pages/DuasAzkarPage';
import { DigitalTasbihPage } from './pages/DigitalTasbihPage';
import { QuizLearningPage } from './pages/QuizLearningPage';
import { CalendarPage } from './pages/CalendarPage';
import { IslamicHistoryPage } from './pages/IslamicHistoryPage';
import { AccountTrackerPage } from './pages/AccountTrackerPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { IbadatGuidePage } from './pages/IbadatGuidePage';
import { AuthGate } from './components/AuthGate';
import { SplashScreen } from './components/SplashScreen';
import { schedulePrayerNotifications } from './services/prayerNotifications';
import { Capacitor } from '@capacitor/core';

const PrayerAlertScheduler: React.FC = () => {
  const { userProfile } = useApp();

  useEffect(() => {
    if (
      !userProfile.preAdhanNotification ||
      Capacitor.isNativePlatform() ||
      !('Notification' in window) ||
      Notification.permission !== 'granted'
    ) return;

    const city = MAJOR_CITIES.find((entry) => entry.name === userProfile.city);
    const latitude = userProfile.latitude ?? city?.latitude ?? MAJOR_CITIES[0].latitude;
    const longitude = userProfile.longitude ?? city?.longitude ?? MAJOR_CITIES[0].longitude;
    const timeZone = userProfile.timeZone ?? city?.timezone ?? MAJOR_CITIES[0].timezone;
    const sentKeys = new Set<string>();

    const notify = (key: string, title: string, body: string, playAdhan: boolean) => {
      if (sentKeys.has(key)) return;
      sentKeys.add(key);
      new Notification(title, { body, icon: '/favicon.svg' });
      if (playAdhan) PrayerTimesService.playAdhanAudio();
    };

    const checkPrayerTimes = () => {
      const now = new Date();
      const local = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
      }).formatToParts(now);
      const parts = Object.fromEntries(local.map(({ type, value }) => [type, value]));
      const dateKey = `${parts.year}-${parts.month}-${parts.day}`;
      const minuteNow = Number(parts.hour) * 60 + Number(parts.minute) + Number(parts.second) / 60;
      const data = applyManualPrayerTimes(
        PrayerTimesService.calculatePrayerTimes(latitude, longitude, now, true, timeZone),
        userProfile.manualPrayerTimes === undefined
          ? DEFAULT_MANUAL_PRAYER_TIMES
          : userProfile.manualPrayerTimes,
        now,
        timeZone
      );
      const prayerNames: Array<[string, string]> = [
        ['Fajr', data.fajr],
        ['Dhuhr', data.dhuhr],
        ['Asr', data.asr],
        ['Maghrib', data.maghrib],
        ['Isha', data.isha]
      ];

      prayerNames.forEach(([name, time]) => {
        const [clock, period] = time.split(' ');
        const [rawHour, minute] = clock.split(':').map(Number);
        const hour = rawHour % 12 + (period === 'PM' ? 12 : 0);
        const target = hour * 60 + minute;
        const difference = ((target - minuteNow + 720 + 1440) % 1440) - 720;
        if (difference > 14 && difference <= 15.5) {
          notify(
            `${dateKey}-${name}-pre`,
            `${name} prayer in 15 minutes`,
            `Prepare for prayer in ${userProfile.city}.`,
            false
          );
        } else if (Math.abs(difference) <= 0.25) {
          notify(
            `${dateKey}-${name}`,
            `${name} prayer time`,
            `The full Adhan is playing for ${userProfile.city}.`,
            true
          );
        }
      });
    };

    checkPrayerTimes();
    const timer = window.setInterval(checkPrayerTimes, 10_000);
    return () => window.clearInterval(timer);
  }, [
    userProfile.city,
    userProfile.latitude,
    userProfile.longitude,
    userProfile.timeZone,
    userProfile.preAdhanNotification,
    userProfile.manualPrayerTimes
  ]);

  return null;
};

const StreakBreakScheduler: React.FC = () => {
  const { userProfile, updateUserProfile, salahLog } = useApp();
  const updateProfileRef = useRef(updateUserProfile);
  updateProfileRef.current = updateUserProfile;

  useEffect(() => {
    const checkStreak = () => {
      const today = new Date();
      const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
      const missedDate = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
      const record = salahLog[missedDate];
      const dayWasComplete = Boolean(record) &&
        (['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).every((prayer) => record?.[prayer] !== 'none');

      if (userProfile.currentStreak > 0 && !dayWasComplete) {
        updateProfileRef.current({ currentStreak: 0, streakBrokenDate: missedDate });
      }

      if (
        userProfile.streakBrokenDate !== missedDate ||
        typeof Notification === 'undefined' ||
        Notification.permission !== 'granted'
      ) return;

      const key = `islam360_streak_broken_${missedDate}`;
      try {
        if (localStorage.getItem(key)) return;
        new Notification('Salah streak ended', {
          body: 'Your previous streak has ended. Start a new one with today’s prayers.',
          icon: '/favicon.svg'
        });
        localStorage.setItem(key, 'true');
      } catch (error) {
        console.error('Unable to send the streak notification:', error);
      }
    };

    checkStreak();
    const timer = window.setInterval(checkStreak, 60_000);
    return () => window.clearInterval(timer);
  }, [salahLog, userProfile.currentStreak, userProfile.streakBrokenDate]);

  return null;
};

const AzkarReminderScheduler: React.FC = () => {
  useEffect(() => {
    const checkReminder = () => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;
      let enabled = false;
      try {
        enabled = localStorage.getItem('islam360_azkar_reminder') === 'true';
      } catch (error) {
        console.error('Unable to read the azkar reminder setting:', error);
        return;
      }
      if (!enabled) return;

      const now = new Date();
      const period = now.getHours() === 8 ? 'morning' : now.getHours() === 17 ? 'evening' : null;
      if (!period) return;
      const dateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const key = `islam360_azkar_notified_${dateKey}_${period}`;
      try {
        if (localStorage.getItem(key)) return;
        new Notification(period === 'morning' ? 'Morning Azkar' : 'Evening Azkar', {
          body: 'It is time for your daily remembrance. Open the duas and azkar collection.',
          icon: '/favicon.svg'
        });
        localStorage.setItem(key, 'true');
      } catch (error) {
        console.error('Unable to send the azkar reminder:', error);
      }
    };

    checkReminder();
    const timer = window.setInterval(checkReminder, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return null;
};

const FloatingTasbih: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(() => {
    try {
      return Number(localStorage.getItem('islam360_floating_tasbih') ?? 0);
    } catch {
      return 0;
    }
  });

  const increment = () => {
    setCount((previous) => {
      const next = previous + 1;
      try {
        localStorage.setItem('islam360_floating_tasbih', String(next));
      } catch (error) {
        console.error('Unable to save the tasbih count:', error);
      }
      return next;
    });
  };

  return (
    <div className="fixed bottom-24 right-4 z-30">
      {isOpen ? (
        <section aria-label="Floating tasbih counter" className="w-52 rounded-2xl border border-amber-300/70 bg-white p-3 shadow-2xl dark:bg-slate-800">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-amber-200">
              <BookOpen className="h-4 w-4" /> Tasbih
            </span>
            <button onClick={() => setIsOpen(false)} aria-label="Close tasbih" className="rounded-lg p-1 text-slate-500 hover:bg-stone-100 dark:hover:bg-slate-700">
              <X className="h-4 w-4" />
            </button>
          </div>
          <button onClick={increment} className="w-full rounded-xl bg-emerald-900 py-3 text-2xl font-bold text-amber-300">
            {count}
          </button>
          <div className="mt-2 flex justify-between">
            <button
              onClick={() => setCount((previous) => {
                const next = Math.max(0, previous - 1);
                try {
                  localStorage.setItem('islam360_floating_tasbih', String(next));
                } catch (error) {
                  console.error('Unable to save the tasbih count:', error);
                }
                return next;
              })}
              aria-label="Decrease tasbih count"
              className="rounded-lg border border-stone-200 p-1.5 dark:border-slate-700"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setCount(0);
                try {
                  localStorage.setItem('islam360_floating_tasbih', '0');
                } catch (error) {
                  console.error('Unable to save the tasbih count:', error);
                }
              }}
              className="text-xs text-slate-500"
            >
              Reset
            </button>
            <button onClick={increment} aria-label="Increase tasbih count" className="rounded-lg border border-stone-200 p-1.5 dark:border-slate-700">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </section>
      ) : (
        <button onClick={() => setIsOpen(true)} className="rounded-full border border-amber-300 bg-emerald-900 px-4 py-3 text-xs font-bold text-amber-200 shadow-xl">
          Tasbih · {count}
        </button>
      )}
    </div>
  );
};

const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return sessionStorage.getItem('islam360_welcome_seen') !== 'true';
    } catch (error) {
      console.error('Unable to read welcome screen preference:', error);
      return true;
    }
  });
  const {
    activePage,
    theme,
    language,
    isTafseerModalOpen,
    closeTafseer,
    activeTafseerAyah,
    activeTafseerData,
    isIntroModalOpen,
    closeSurahIntro,
    activeIntroSurah,
    authConfigured,
    authReady,
    authDataReady,
    authUser,
    userProfile
  } = useApp();

  useEffect(() => {
    if (!userProfile.preAdhanNotification) return;
    void schedulePrayerNotifications(userProfile, language).catch((error: unknown) => {
      console.error('Unable to refresh scheduled prayer notifications:', error);
    });
  }, [
    language,
    userProfile.preAdhanNotification,
    userProfile.city,
    userProfile.latitude,
    userProfile.longitude,
    userProfile.timeZone,
    userProfile.manualPrayerTimes
  ]);

  if (showWelcome) {
    return (
      <SplashScreen
        onContinue={() => {
          try {
            sessionStorage.setItem('islam360_welcome_seen', 'true');
          } catch (error) {
            console.error('Unable to save welcome screen preference:', error);
          }
          setShowWelcome(false);
        }}
      />
    );
  }

  if (!continueAsGuest && (!authConfigured || !authReady || !authUser || !authDataReady)) {
    return (
      <AuthGate
        onContinueAsGuest={!authConfigured ? () => setContinueAsGuest(true) : undefined}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'midnight' ? 'bg-arabesque-dark' : 'bg-arabesque-light'}`}>
      <PrayerAlertScheduler />
      <StreakBreakScheduler />
      <AzkarReminderScheduler />
      {/* Global Top Navbar */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen((open) => !open)}
      />

      {/* Main Navigation Bar */}
      <Navigation
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* Page Content Viewport */}
      <main className="min-w-0 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 pt-4 sm:pt-6">
        {activePage === 'home' && <HomeDashboard />}
        {activePage === 'quran' && <QuranReader />}
        {activePage === 'hadith' && <HadithBrowser />}
        {activePage === 'prayer' && <PrayerTimesPage />}
        {activePage === 'qibla' && <QiblaCompassPage />}
        {activePage === 'duas' && <DuasAzkarPage />}
        {activePage === 'tasbih' && <DigitalTasbihPage />}
        {(activePage === 'quiz' || activePage === 'names99') && <QuizLearningPage />}
        {activePage === 'calendar' && <CalendarPage />}
        {activePage === 'history' && <IslamicHistoryPage />}
        {activePage === 'account' && <AccountTrackerPage />}
        {activePage === 'assistant' && <AIAssistantPage />}
        {activePage === 'ibadat' && <IbadatGuidePage />}
      </main>

      {/* Global Persistent Floating Audio Reciter */}
      <AudioPlayerBar />
      <FloatingTasbih />

      {/* Global Dialogs, Walkthroughs & Drawers */}
      <SearchModal />
      <BookmarksDrawer />
      <DatasetModal />
      <GuidedTour />

      {/* Tafseer & Surah Intro Modals */}
      <TafseerModal
        isOpen={isTafseerModalOpen}
        onClose={closeTafseer}
        ayah={activeTafseerAyah}
        tafseer={activeTafseerData}
        surahName={activeTafseerAyah ? `Surah ${activeTafseerData?.surahNumber || ''}` : ''}
      />
      <SurahIntroModal
        isOpen={isIntroModalOpen}
        onClose={closeSurahIntro}
        surah={activeIntroSurah}
        intro={activeIntroSurah?.intro}
      />

      {/* Traditional Ottoman/Andalusian Footer */}
      <footer className="mt-auto border-t border-amber-200/50 dark:border-amber-900/40 bg-[#FAF7F2] dark:bg-[#0c1322] py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-quran text-lg text-emerald-900 dark:text-amber-300">
            وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ
          </p>
          <p className="font-title font-semibold text-slate-700 dark:text-slate-300">
            Islam for Everyone • اسلام فار ایوری ون
          </p>
          <p className="text-[11px] text-slate-400">
            Complete Holy Quran, Sihah Sittah Hadiths, Solar Prayer Times, Pre-Adhan Alerts, Islamic Calendar, Prophetic History, and Salah Streak Tracker.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
