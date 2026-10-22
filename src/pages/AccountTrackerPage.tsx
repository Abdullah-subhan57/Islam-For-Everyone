import React, { useState } from 'react';
import {
  User,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar as CalendarIcon,
  Flame,
  Bell,
  Volume2,
  MapPin,
  Clock,
  ShieldCheck,
  Moon,
  Camera
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { PrayerStatus } from '../types';
import { PrayerTimesService, MAJOR_CITIES } from '../services/prayerTimes';
import { TasbihAudioFeedback } from '../services/tasbihPresets';
import {
  cancelPrayerNotifications,
  requestPrayerNotificationPermission,
  schedulePrayerNotifications,
  scheduleTestPrayerNotification
} from '../services/prayerNotifications';

export const AccountTrackerPage: React.FC = () => {
  const {
    language,
    userProfile,
    updateUserProfile,
    salahLog,
    recordSalahStatus,
    streakBadges,
    playAdhan,
    authConfigured,
    authUser,
    authError,
    signOut
  } = useApp();

  const t = useTranslation(language);
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
  const todayRecord = salahLog[todayStr] || {
    date: todayStr,
    fajr: 'none',
    dhuhr: 'none',
    asr: 'none',
    maghrib: 'none',
    isha: 'none',
    points: 0
  };

  const [notificationTestStatus, setNotificationTestStatus] = useState<string | null>(null);
  const [profileName, setProfileName] = useState(userProfile.name);
  const [profileUsername, setProfileUsername] = useState(userProfile.username ?? '');
  const [profileEmail, setProfileEmail] = useState(userProfile.email);
  const [profileCity, setProfileCity] = useState(userProfile.city);
  const [profileSaved, setProfileSaved] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [authActionError, setAuthActionError] = useState<string | null>(null);

  // Check if current Islamic month is Ramadan
  const hijri = PrayerTimesService.getHijriDate();
  const isRamadanMonth = hijri.monthIndex === 8; // Month 9 is Ramadan (index 8)

  const handleTogglePrayer = (prayerKey: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha', newStatus: PrayerStatus) => {
    TasbihAudioFeedback.playClickSound();
    TasbihAudioFeedback.triggerHaptic(15);
    recordSalahStatus(todayStr, prayerKey, newStatus);
  };

  const handleTestPreAdhanAlert = () => {
    setNotificationTestStatus('Playing the full Adhan audio...');
    const audio = PrayerTimesService.playAdhanAudio();
    audio?.addEventListener('ended', () => setNotificationTestStatus('Adhan audio finished.'), { once: true });
    audio?.addEventListener('error', () => setNotificationTestStatus('Adhan audio could not be loaded. Check your connection.'), { once: true });
    audio?.addEventListener('playerror', () => setNotificationTestStatus('The browser blocked Adhan audio playback. Press Test Adhan again.'), { once: true });

    void scheduleTestPrayerNotification(language).then(() => {
      setNotificationTestStatus(language === 'ur'
        ? 'اذان آڈیو اور نوٹیفکیشن ٹیسٹ شروع ہو گیا۔'
        : 'Adhan audio and notification test started.');
    }).catch((error: unknown) => {
      console.error('Unable to send a test prayer notification:', error);
      setNotificationTestStatus(error instanceof Error
        ? error.message
        : 'Could not send a test notification.');
    });

    window.setTimeout(() => setNotificationTestStatus(null), 6000);
  };

  const handleTogglePrayerAlerts = async () => {
    try {
      if (userProfile.preAdhanNotification) {
        await cancelPrayerNotifications();
        updateUserProfile({ preAdhanNotification: false });
        setNotificationTestStatus(language === 'ur' ? 'نماز کی یاد دہانیاں بند ہیں۔' : 'Prayer reminders are off.');
        return;
      }

      const permissionGranted = await requestPrayerNotificationPermission();
      if (!permissionGranted) {
        setNotificationTestStatus(language === 'ur'
          ? 'نماز کی یاد دہانیوں کے لیے نوٹیفکیشن کی اجازت دیں۔'
          : 'Allow notifications to enable prayer reminders.');
        return;
      }
      const count = await schedulePrayerNotifications(userProfile, language);
      updateUserProfile({ preAdhanNotification: true });
      setNotificationTestStatus(language === 'ur'
        ? `اگلے چھ دنوں کے لیے ${count} موبائل یاد دہانیاں مقرر ہو گئیں۔`
        : `${count} mobile reminders scheduled for the next six days.`);
    } catch (error) {
      console.error('Unable to update prayer reminder schedule:', error);
      setNotificationTestStatus(error instanceof Error
        ? error.message
        : 'Could not update prayer notifications.');
    }
  };

  const prayers = [
    { key: 'fajr' as const, nameEn: 'Fajr', nameUr: 'فجر', desc: 'Dawn Prayer' },
    { key: 'dhuhr' as const, nameEn: 'Dhuhr', nameUr: 'ظہر', desc: 'Noon Prayer' },
    { key: 'asr' as const, nameEn: 'Asr', nameUr: 'عصر', desc: 'Afternoon Prayer' },
    { key: 'maghrib' as const, nameEn: 'Maghrib', nameUr: 'مغرب', desc: 'Sunset Prayer' },
    { key: 'isha' as const, nameEn: 'Isha', nameUr: 'عشاء', desc: 'Night Prayer' }
  ];

  return (
    <div className="space-y-6 pb-24">
      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-3 dark:border-amber-900/50 dark:bg-slate-800">
        <div>
          <p className="text-sm font-bold text-emerald-950 dark:text-amber-200">
            {authConfigured
              ? (language === 'ur' ? 'محفوظ اکاؤنٹ' : 'Secure account')
              : (language === 'ur' ? 'اس آلے پر مقامی موڈ' : 'Local device mode')}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {authConfigured
              ? (authUser?.email ?? '')
              : (language === 'ur'
                ? 'کلاؤڈ بیک اپ اور sign-in کے لیے Supabase کی .env settings درکار ہیں۔'
                : 'Supabase environment settings are needed for sign-in and cloud backup.')}
          </p>
          {authError && <p role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-300">{authError}</p>}
          {authActionError && <p role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-300">{authActionError}</p>}
        </div>
        {authConfigured && authUser && (
          <button
            type="button"
            onClick={() => {
              setAuthActionError(null);
              void signOut().catch((error: unknown) => {
                setAuthActionError(error instanceof Error ? error.message : 'Sign-out failed.');
              });
            }}
            className="rounded-xl border border-stone-300 px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-rose-400 hover:text-rose-700 dark:border-slate-700 dark:text-slate-200"
          >
            {language === 'ur' ? 'لاگ آؤٹ' : 'Sign out'}
          </button>
        )}
      </section>

      {userProfile.streakBrokenDate === yesterdayStr && (
        <section role="status" className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
          <Flame className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm leading-6">
            {language === 'ur'
              ? 'آپ کا پچھلا صلوٰۃ streak ٹوٹ گیا ہے۔ آج سے نیا تسلسل شروع کریں۔'
              : 'Your previous Salah streak ended. Begin a new streak with today’s prayers.'}
          </p>
        </section>
      )}

      {/* User Header Profile Card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-slate-900 p-6 sm:p-8 shadow-sm border border-emerald-200">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <label className="group relative block h-20 w-20 cursor-pointer overflow-hidden rounded-2xl border-2 border-emerald-300 bg-emerald-100 text-emerald-950 shadow-sm">
              {userProfile.avatarUrl ? (
                <img src={userProfile.avatarUrl} alt={`${userProfile.name} profile`} className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-2xl font-black">
                  {userProfile.name.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                <Camera className="h-5 w-5" />
              </span>
              <input
                type="file"
                accept="image/*"
                aria-label={language === 'ur' ? 'پروفائل تصویر تبدیل کریں' : 'Change profile photo'}
                className="sr-only"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  event.currentTarget.value = '';
                  setPhotoError(null);
                  if (!file) return;
                  if (!file.type.startsWith('image/')) {
                    setPhotoError(language === 'ur' ? 'صرف تصویر منتخب کریں۔' : 'Choose an image file.');
                    return;
                  }
                  if (file.size > 1024 * 1024) {
                    setPhotoError(language === 'ur' ? 'تصویر 1 MB سے کم ہونی چاہیے۔' : 'The image must be smaller than 1 MB.');
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (typeof reader.result === 'string') {
                      updateUserProfile({ avatarUrl: reader.result });
                    } else {
                      setPhotoError(language === 'ur' ? 'تصویر محفوظ نہیں ہو سکی۔' : 'The image could not be read.');
                    }
                  };
                  reader.onerror = () => {
                    console.error('Unable to read the selected profile photo:', reader.error);
                    setPhotoError(language === 'ur' ? 'تصویر محفوظ نہیں ہو سکی۔' : 'The image could not be read.');
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </label>
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-600 border border-white">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              const selectedCity = MAJOR_CITIES.find((city) => city.name === profileCity);
              updateUserProfile({
                name: profileName.trim() || 'Muslim',
                username: profileUsername.trim(),
                email: profileEmail.trim(),
                city: profileCity,
                ...(selectedCity ? {
                  latitude: selectedCity.latitude,
                  longitude: selectedCity.longitude,
                  timeZone: selectedCity.timezone
                } : {})
              });
              setProfileSaved(true);
              window.setTimeout(() => setProfileSaved(false), 2500);
            }}
            className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-6 shadow-sm space-y-4"
          >
            <div>
              <h3 className="font-title text-lg font-bold text-emerald-950 dark:text-amber-300">
                {language === 'ur' ? 'اکاؤنٹ کی تفصیلات' : 'Account details'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ur' ? `شمولیت: ${userProfile.joinedDate}` : `Member since ${userProfile.joinedDate}`}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="space-y-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {language === 'ur' ? 'نام' : 'Name'}
                <input value={profileName} onChange={(event) => setProfileName(event.target.value)} className="w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 px-3 py-2 text-sm" />
              </label>
              <label className="space-y-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {language === 'ur' ? 'صارف نام' : 'Username'}
                <input value={profileUsername} onChange={(event) => setProfileUsername(event.target.value.replace(/\s/g, ''))} maxLength={32} className="w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 px-3 py-2 text-sm" />
              </label>
              <label className="space-y-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                Email
                <input type="email" value={profileEmail} onChange={(event) => setProfileEmail(event.target.value)} readOnly={Boolean(authUser)} title={authUser ? (language === 'ur' ? 'تصدیق شدہ ای میل لاگ اِن فراہم کنندہ کے ذریعے تبدیل ہوتی ہے۔' : 'Change a verified email through your sign-in provider.') : undefined} className="w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 px-3 py-2 text-sm read-only:opacity-70" />
              </label>
              <label className="space-y-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {language === 'ur' ? 'شہر' : 'City'}
                <select value={profileCity} onChange={(event) => setProfileCity(event.target.value)} className="w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 px-3 py-2 text-sm">
                  {!MAJOR_CITIES.some((city) => city.name === profileCity) && <option value={profileCity}>{profileCity} (GPS)</option>}
                  {MAJOR_CITIES.map((city) => <option key={city.name} value={city.name}>{language === 'ur' ? city.nameUrdu : city.name}</option>)}
                </select>
              </label>
            </div>
            {photoError && <p role="alert" className="text-xs text-rose-600 dark:text-rose-300">{photoError}</p>}
            <button type="submit" className="rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-amber-100">
              {profileSaved ? (language === 'ur' ? 'محفوظ ہو گیا' : 'Saved') : (language === 'ur' ? 'تفصیلات محفوظ کریں' : 'Save details')}
            </button>
          </form>

          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="font-title text-xl sm:text-2xl font-bold text-amber-200">
                {userProfile.name}
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-800/80 text-amber-300 border border-amber-400/30">
                Active Believer
              </span>
            </div>

            <p className="text-xs text-emerald-200/80">{userProfile.email}</p>
            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Location: {userProfile.city}</span>
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-emerald-900/60 p-3 rounded-2xl border border-amber-400/20">
            <div className="text-center px-3">
              <span className="text-lg font-black font-mono text-amber-300">
                {userProfile.currentStreak}
              </span>
              <span className="block text-[10px] text-emerald-200 uppercase tracking-widest">
                Day Streak
              </span>
            </div>
            <div className="w-px h-8 bg-emerald-800"></div>
            <div className="text-center px-3">
              <span className="text-lg font-black font-mono text-amber-300">
                {userProfile.totalPoints}
              </span>
              <span className="block text-[10px] text-emerald-200 uppercase tracking-widest">
                Salah Points
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Salah Tracker Section */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-stone-200 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <h3 className="font-title text-lg font-bold text-emerald-950 dark:text-amber-300">
                {language === 'ur' ? 'یومیہ صلوٰۃ ٹریکر (نماز کا اندراج)' : 'Daily Salah Tracker & Congregation'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ba-Jamat = <strong>1.0 pt</strong> • Munfarid / Qaza = <strong>0.5 pt</strong> (Streak remains safe & unbroken!)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-amber-300/40">
            <CalendarIcon className="w-4 h-4" />
            <span>Today: {todayRecord.points} / 5.0 Points</span>
          </div>
        </div>

        {/* 5 Prayers Tracker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {prayers.map((prayer) => {
            const currentStatus = todayRecord[prayer.key] || 'none';

            return (
              <div
                key={prayer.key}
                className="p-4 rounded-2xl border border-stone-200 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900/50 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    {prayer.desc}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-title text-sm font-bold text-slate-800 dark:text-slate-100">
                      {language === 'ur' ? prayer.nameUr : prayer.nameEn}
                    </span>
                    <span className="font-quran text-sm text-slate-500">{prayer.nameUr}</span>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="space-y-1.5 pt-2 border-t border-stone-200 dark:border-slate-800">
                  {/* Jamat Checkbox */}
                  <button
                    onClick={() =>
                      handleTogglePrayer(prayer.key, currentStatus === 'jamat' ? 'none' : 'jamat')
                    }
                    className={`w-full py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      currentStatus === 'jamat'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-400'
                    }`}
                  >
                    <span>{language === 'ur' ? 'باجماعت' : 'Ba-Jamat'}</span>
                    <span className="font-mono text-[10px]">+1.0 pt</span>
                  </button>

                  {/* Qaza / Munfarid Checkbox */}
                  <button
                    onClick={() =>
                      handleTogglePrayer(prayer.key, currentStatus === 'qaza' ? 'none' : 'qaza')
                    }
                    className={`w-full py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                      currentStatus === 'qaza'
                        ? 'bg-amber-600 text-white shadow-xs font-bold'
                        : 'bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-amber-400'
                    }`}
                  >
                    <span>{language === 'ur' ? 'قضا / اکیلی' : 'Qaza / Alone'}</span>
                    <span className="font-mono text-[10px]">+0.5 pt</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak Badges Section (40 Days, 100 Days, 365 Days) */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-title text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>{language === 'ur' ? 'استقامت و تسلسل کے اعزازی بیجز' : 'Salah Streak Milestone Badges'}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Earned for unbroken prayer consistency (Hadith of 40 Days Takbeer-e-Ula).
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-slate-900 px-3 py-1 rounded-full border border-amber-300">
            {streakBadges.filter((b) => b.unlocked).length} / {streakBadges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {streakBadges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-amber-50 to-emerald-50 dark:from-slate-800 dark:to-emerald-950/40 border-amber-400 shadow-sm'
                  : 'bg-stone-50 dark:bg-slate-900/50 border-stone-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{badge.icon}</span>
                  {badge.unlocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white uppercase">
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-slate-700 text-slate-500">
                      {badge.requiredDays} Days Req.
                    </span>
                  )}
                </div>

                <h4 className="font-title text-sm font-bold text-slate-800 dark:text-slate-100">
                  {language === 'ur' ? badge.titleUr : badge.titleEn}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {language === 'ur' ? badge.descriptionUr : badge.descriptionEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[10px]">
                  Target: {badge.requiredDays} Days
                </span>
                {badge.unlocked && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 15-Minute Pre-Adhan Notification Toggle & Ringtone */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400">
            <Bell className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-title text-sm font-bold text-slate-800 dark:text-slate-100">
              {language === 'ur' ? 'نماز سے ۱۵ منٹ قبل خودکار اذان الرٹ' : '15-Minute Pre-Adhan Notification Alert'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Sends a browser reminder 15 minutes before prayer and attempts the full Adhan at prayer time while the app is open.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTestPreAdhanAlert}
            className="px-3.5 py-2 rounded-xl border border-amber-300 dark:border-amber-800 text-xs font-semibold text-emerald-850 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Test Adhan</span>
          </button>

          <button
            onClick={() => { void handleTogglePrayerAlerts(); }}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              userProfile.preAdhanNotification ? 'bg-emerald-600 justify-end' : 'bg-stone-300 dark:bg-slate-700 justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
          </button>
        </div>
      </div>

      {notificationTestStatus && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs text-center border border-emerald-300/40">
          {notificationTestStatus}
        </div>
      )}

      {/* Ramadan Fasting Tracker (Active in Ramadan) */}
      <div className="rounded-3xl bg-amber-50/70 dark:bg-slate-800/60 border border-amber-200/80 dark:border-amber-900/60 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-amber-600" />
            <h4 className="font-title text-sm font-bold text-amber-950 dark:text-amber-200">
              {language === 'ur' ? 'ماہِ صیام: رمضان المبارک روزہ ٹریکر' : 'Ramadan Fasting & Tarawih Tracker'}
            </h4>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-300">
            {isRamadanMonth ? 'Ramadan Active' : 'Ramadan Season Mode'}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400">
          This dedicated tracker activates during the holy month of Ramadan to log your daily fasts (Roza), Suhoor, Iftar, and Tarawih prayers.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => {
              const currentLog = userProfile.ramadanLogs[todayStr];
              updateUserProfile({
                ramadanLogs: {
                  ...userProfile.ramadanLogs,
                  [todayStr]: !currentLog
                }
              });
              TasbihAudioFeedback.playClickSound();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              userProfile.ramadanLogs[todayStr]
                ? 'bg-amber-500 text-emerald-950 shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-amber-300 text-slate-700 dark:text-slate-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {userProfile.ramadanLogs[todayStr] ? 'Today\'s Fast Marked (Alhamdulillah)' : 'Mark Today\'s Fast (Roza)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
