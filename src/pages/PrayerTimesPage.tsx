import React, { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  Volume2,
  Calendar,
  Sparkles,
  Compass,
  ArrowRight,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  CheckCircle2,
  Navigation as NavIcon,
  Bell
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import {
  applyManualPrayerTimes,
  DEFAULT_MANUAL_PRAYER_TIMES,
  PrayerTimesService,
  MAJOR_CITIES
} from '../services/prayerTimes';
import { CityLocation, PrayerTimesData } from '../types';

export const PrayerTimesPage: React.FC = () => {
  const { language, userProfile, updateUserProfile } = useApp();
  const t = useTranslation(language);

  // Selected city location
  const [selectedCity, setSelectedCity] = useState<CityLocation>(() =>
    MAJOR_CITIES.find((city) => city.name === userProfile.city) ?? (
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
    )
  );
  const [isHanafiAsr, setIsHanafiAsr] = useState(true);
  const [manualTimesDraft, setManualTimesDraft] = useState(
    userProfile.manualPrayerTimes ?? DEFAULT_MANUAL_PRAYER_TIMES
  );
  const [manualTimesSaved, setManualTimesSaved] = useState(false);
  const [manualTimesError, setManualTimesError] = useState<string | null>(null);
  const [prayerData, setPrayerData] = useState<PrayerTimesData>(() =>
    applyManualPrayerTimes(
      PrayerTimesService.calculatePrayerTimes(
        selectedCity.latitude,
        selectedCity.longitude,
        new Date(),
        true,
        selectedCity.timezone
      ),
      userProfile.manualPrayerTimes === undefined
        ? DEFAULT_MANUAL_PRAYER_TIMES
        : userProfile.manualPrayerTimes,
      new Date(),
      selectedCity.timezone
    )
  );

  const [isPlayingAdhan, setIsPlayingAdhan] = useState(false);
  const [adhanError, setAdhanError] = useState<string | null>(null);
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'today' | 'monthly'>('today');

  const hijri = PrayerTimesService.getHijriDate();

  // Refresh each minute so the next-prayer countdown stays current.
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setPrayerData(applyManualPrayerTimes(
        PrayerTimesService.calculatePrayerTimes(
          selectedCity.latitude,
          selectedCity.longitude,
          now,
          isHanafiAsr,
          selectedCity.timezone
        ),
        userProfile.manualPrayerTimes === undefined
          ? DEFAULT_MANUAL_PRAYER_TIMES
          : userProfile.manualPrayerTimes,
        now,
        selectedCity.timezone
      ));
    };
    updateTimes();
    const timer = window.setInterval(updateTimes, 60_000);
    return () => window.clearInterval(timer);
  }, [selectedCity, isHanafiAsr, userProfile.manualPrayerTimes]);

  useEffect(() => {
    setManualTimesDraft(userProfile.manualPrayerTimes ?? DEFAULT_MANUAL_PRAYER_TIMES);
  }, [userProfile.manualPrayerTimes]);

  // GPS auto-detect
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsStatus('Geolocation not supported');
      return;
    }
    setGpsStatus('Detecting GPS location...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const customLoc: CityLocation = {
          name: 'My GPS Location',
          nameUrdu: 'میرا مقام',
          country: 'Local',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        setSelectedCity(customLoc);
        updateUserProfile({
          city: customLoc.name,
          latitude: customLoc.latitude,
          longitude: customLoc.longitude,
          timeZone: customLoc.timezone
        });
        setGpsStatus('Location updated via GPS!');
        setTimeout(() => setGpsStatus(null), 3000);
      },
      (err) => {
        setGpsStatus(`GPS error: ${err.message}`);
        setTimeout(() => setGpsStatus(null), 4000);
      }
    );
  };

  const handlePlayAdhan = () => {
    setAdhanError(null);
    const audio = PrayerTimesService.playAdhanAudio();
    if (!audio) {
      setAdhanError(language === 'ur' ? 'اذان کی آڈیو شروع نہیں ہو سکی۔' : 'The Adhan audio could not be started.');
      return;
    }
    setIsPlayingAdhan(true);
    audio.addEventListener('ended', () => setIsPlayingAdhan(false), { once: true });
    audio.addEventListener('error', () => {
      setIsPlayingAdhan(false);
      setAdhanError(language === 'ur' ? 'اذان کی آڈیو لوڈ نہیں ہوئی۔ انٹرنیٹ چیک کریں۔' : 'Adhan audio failed to load. Check your connection.');
    }, { once: true });
    audio.addEventListener('playerror', () => {
      setIsPlayingAdhan(false);
      setAdhanError(language === 'ur' ? 'براؤزر نے آڈیو چلانے سے روکا۔ دوبارہ بٹن دبائیں۔' : 'The browser blocked audio playback. Press the button to try again.');
    }, { once: true });
  };

  const prayersList = [
    { name: t.fajr, rawName: 'Fajr', time: prayerData.fajr, icon: Sunrise, desc: 'Dawn Prayer' },
    { name: t.sunrise, rawName: 'Sunrise', time: prayerData.sunrise, icon: Sun, desc: 'Ishraq Time' },
    { name: t.dhuhr, rawName: 'Dhuhr', time: prayerData.dhuhr, icon: Sun, desc: 'Noon Prayer' },
    { name: t.asr, rawName: 'Asr', time: prayerData.asr, icon: Sun, desc: isHanafiAsr ? 'Hanafi Standard' : 'Shafi / Standard' },
    { name: t.maghrib, rawName: 'Maghrib', time: prayerData.maghrib, icon: Sunset, desc: 'Sunset / Iftar' },
    { name: t.isha, rawName: 'Isha', time: prayerData.isha, icon: Moon, desc: 'Night Prayer' },
    { name: t.qiyam, rawName: 'Qiyam', time: prayerData.qiyam, icon: Sparkles, desc: 'Tahajjud' },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Top Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-8 shadow-xl border border-amber-400/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-amber-300 text-xs font-semibold border border-amber-400/30">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {t.nextPrayer}: {prayerData.nextPrayer} ({prayerData.timeRemainingFormatted} {t.timeRemaining})
              </span>
            </div>
            <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-amber-200">
              {t.prayerTimes}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/90">
              {language === 'ur' ? hijri.formattedUr : hijri.formattedEn} • {selectedCity.name} ({selectedCity.country})
            </p>
          </div>

          {/* Action Buttons: Pre-Adhan Alert & Live Adhan */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const nextVal = !userProfile.preAdhanNotification;
                if (nextVal && 'Notification' in window) {
                  void Notification.requestPermission().then((permission) => {
                    updateUserProfile({ preAdhanNotification: permission === 'granted' });
                    if (permission !== 'granted') {
                      setAdhanError(language === 'ur'
                        ? 'یاددہانی کے لیے نوٹیفکیشن کی اجازت درکار ہے۔'
                        : 'Allow browser notifications to enable prayer reminders.');
                    }
                  });
                } else {
                  updateUserProfile({ preAdhanNotification: nextVal });
                }
              }}
              className={`px-4 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                userProfile.preAdhanNotification
                  ? 'bg-amber-400 text-emerald-950 ring-2 ring-amber-300'
                  : 'bg-emerald-900/80 text-emerald-100 hover:bg-emerald-800/90 border border-emerald-700/60'
              }`}
              title={language === 'ur' ? 'نماز سے ۱۵ منٹ قبل الرٹ الرٹ ٹون' : '15-Minute Pre-Adhan Ringtone Reminder'}
            >
              <Bell className={`w-4 h-4 ${userProfile.preAdhanNotification ? 'text-emerald-950 animate-bounce' : 'text-emerald-300'}`} />
              <span>
                {userProfile.preAdhanNotification
                  ? (language === 'ur' ? '۱۵ منٹ قبل الرٹ: آن' : '15-Min Pre-Adhan: ON')
                  : (language === 'ur' ? '۱۵ منٹ قبل الرٹ: آف' : '15-Min Pre-Adhan: OFF')}
              </span>
            </button>

            <button
              onClick={handlePlayAdhan}
              className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                isPlayingAdhan
                  ? 'bg-amber-400 text-emerald-950 animate-pulse'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 active:scale-95'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingAdhan ? 'Adhan Playing...' : t.adhanAudio}</span>
            </button>
          </div>
        </div>
        {adhanError && <p role="status" className="mt-3 text-xs text-amber-200">{adhanError}</p>}
      </div>

      {/* City & Method Selector Bar */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* City Select */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <MapPin className="w-4 h-4 text-emerald-800 dark:text-amber-400 shrink-0" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.changeCity}:</span>
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const found = MAJOR_CITIES.find((c) => c.name === e.target.value);
              if (found) {
                setSelectedCity(found);
                updateUserProfile({
                  city: found.name,
                  latitude: found.latitude,
                  longitude: found.longitude,
                  timeZone: found.timezone
                });
              }
            }}
            className="flex-1 md:w-48 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden"
          >
            {MAJOR_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {language === 'ur' ? c.nameUrdu : c.name} ({c.country})
              </option>
            ))}
          </select>

          {/* GPS Auto-detect */}
          <button
            onClick={handleDetectGPS}
            className="p-2 rounded-xl bg-emerald-50 dark:bg-slate-700 text-emerald-800 dark:text-amber-300 hover:bg-emerald-100 transition-colors"
            title={t.autoDetectLocation}
          >
            <NavIcon className="w-4 h-4" />
          </button>
        </div>

        {gpsStatus && (
          <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
            {gpsStatus}
          </span>
        )}

        {/* Asr Juristic Method Toggle (Hanafi vs Shafi'i) */}
        <div className="flex items-center bg-stone-100 dark:bg-slate-900 p-1 rounded-xl border border-stone-200 dark:border-slate-800 text-xs">
          <button
            onClick={() => setIsHanafiAsr(true)}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              isHanafiAsr
                ? 'bg-emerald-850 text-amber-200 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.hanafi}
          </button>
          <button
            onClick={() => setIsHanafiAsr(false)}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              !isHanafiAsr
                ? 'bg-emerald-850 text-amber-200 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.standardShafi}
          </button>
        </div>
      </div>

      {/* Daily Prayer Timetable Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {prayersList.map((item, idx) => {
          const Icon = item.icon;
          const isNext = prayerData.nextPrayer.toLowerCase() === item.rawName.toLowerCase();

          return (
            <div
              key={idx}
              className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                isNext
                  ? 'bg-emerald-950 text-white border-amber-400 shadow-xl ring-2 ring-amber-400/30 scale-102'
                  : 'bg-white dark:bg-slate-800/90 border-amber-200/70 dark:border-amber-900/50 shadow-xs hover:border-amber-400'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl ${
                    isNext
                      ? 'bg-emerald-800/80 text-amber-300'
                      : 'bg-stone-100 dark:bg-slate-700/60 text-emerald-800 dark:text-amber-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {isNext && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-emerald-950 animate-pulse">
                    Next Prayer
                  </span>
                )}
              </div>

              <div>
                <span
                  className={`text-xs block font-medium ${
                    isNext ? 'text-emerald-200' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.desc}
                </span>
                <h4
                  className={`font-title text-lg font-bold mt-0.5 ${
                    isNext ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {item.name}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-slate-700/50 flex items-center justify-between">
                <span
                  className={`font-mono text-xl font-extrabold ${
                    isNext ? 'text-amber-300' : 'text-emerald-900 dark:text-amber-300'
                  }`}
                >
                  {item.time}
                </span>
                <CheckCircle2
                  className={`w-4 h-4 ${
                    isNext ? 'text-amber-300' : 'text-stone-300 dark:text-slate-600'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <section className="rounded-3xl border border-amber-200/80 bg-white p-5 shadow-sm dark:border-amber-900/60 dark:bg-slate-800/90">
        <div className="mb-4">
          <h3 className="font-title text-lg font-bold text-emerald-950 dark:text-amber-300">
            {language === 'ur' ? 'نماز کے اوقات خود تبدیل کریں' : 'Set prayer times manually'}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {language === 'ur'
              ? 'یہ اوقات آپ کے اس آلے پر محفوظ رہیں گے۔ وقت 24 گھنٹے کے فارمیٹ میں درج کریں۔'
              : 'These times are saved on this device. Enter times using the 24-hour clock.'}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {([
            ['fajr', t.fajr],
            ['dhuhr', t.dhuhr],
            ['asr', t.asr],
            ['maghrib', t.maghrib],
            ['isha', t.isha]
          ] as const).map(([key, label]) => (
            <label key={key} className="space-y-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
              {label}
              <input
                type="time"
                required
                value={manualTimesDraft[key]}
                onChange={(event) => {
                  setManualTimesError(null);
                  setManualTimesDraft((current) => ({
                    ...current,
                    [key]: event.target.value
                  }));
                }}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              />
            </label>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              if (Object.values(manualTimesDraft).some((value) => !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value))) {
                setManualTimesError(language === 'ur'
                  ? 'پانچوں نمازوں کے لیے درست وقت درج کریں۔'
                  : 'Enter a valid time for all five prayers.');
                return;
              }
              setManualTimesError(null);
              updateUserProfile({ manualPrayerTimes: manualTimesDraft });
              setManualTimesSaved(true);
              window.setTimeout(() => setManualTimesSaved(false), 2500);
            }}
            className="rounded-xl bg-emerald-900 px-4 py-2 text-xs font-bold text-amber-200 transition hover:bg-emerald-800 active:scale-95"
          >
            {manualTimesSaved
              ? (language === 'ur' ? 'محفوظ ہو گیا' : 'Saved')
              : (language === 'ur' ? 'اوقات محفوظ کریں' : 'Save times')}
          </button>
          <button
            type="button"
            onClick={() => {
              updateUserProfile({ manualPrayerTimes: null });
              setManualTimesDraft(DEFAULT_MANUAL_PRAYER_TIMES);
              setManualTimesError(null);
            }}
            className="rounded-xl border border-stone-300 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-amber-400 dark:border-slate-700 dark:text-slate-300"
          >
            {language === 'ur' ? 'حساب شدہ اوقات بحال کریں' : 'Use calculated times'}
          </button>
        </div>
        {manualTimesError && <p role="alert" className="mt-3 text-xs text-rose-600 dark:text-rose-300">{manualTimesError}</p>}
      </section>

      {/* Ramadan / Fasting Timetable Banner */}
      <div className="rounded-3xl bg-amber-50/60 dark:bg-slate-800/60 border border-amber-200/80 dark:border-amber-900/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-title text-sm font-bold text-amber-900 dark:text-amber-300">
            {language === 'ur' ? 'سحر و افطار کے اوقات' : 'Suhoor & Iftar Timings'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Fasting commences at <strong>{prayerData.fajr}</strong> (Suhoor ends) and concludes at{' '}
            <strong>{prayerData.maghrib}</strong> (Iftar sunset).
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/40 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Suhoor</span>
            <span className="font-mono text-xs font-bold text-emerald-800 dark:text-amber-300">
              {prayerData.fajr}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/40 text-center">
            <span className="text-[10px] text-slate-400 block uppercase">Iftar</span>
            <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
              {prayerData.maghrib}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
