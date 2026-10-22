import { Capacitor } from '@capacitor/core';
import { LocalNotifications, type LocalNotificationSchema } from '@capacitor/local-notifications';
import { Language, UserProfile } from '../types';
import {
  applyManualPrayerTimes,
  DEFAULT_MANUAL_PRAYER_TIMES,
  MAJOR_CITIES,
  PrayerTimesService
} from './prayerTimes';

const PRAYER_NOTIFICATION_ID_START = 71_000;
const PRAYER_NOTIFICATION_ID_END = 71_100;
const PRAYER_NAMES = [
  { key: 'fajr', name: 'Fajr', nameUr: 'فجر' },
  { key: 'dhuhr', name: 'Dhuhr', nameUr: 'ظہر' },
  { key: 'asr', name: 'Asr', nameUr: 'عصر' },
  { key: 'maghrib', name: 'Maghrib', nameUr: 'مغرب' },
  { key: 'isha', name: 'Isha', nameUr: 'عشاء' }
] as const;

const getZonedDate = (reference: Date, hour: number, minute: number, timeZone: string): Date => {
  const dateParts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(reference);
  const values = Object.fromEntries(dateParts.map(({ type, value }) => [type, Number(value)]));
  const desiredUtc = Date.UTC(values.year, values.month - 1, values.day, hour, minute);
  let timestamp = desiredUtc;

  for (let attempt = 0; attempt < 3; attempt++) {
    const actualParts = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date(timestamp));
    const actual = Object.fromEntries(actualParts.map(({ type, value }) => [type, Number(value)]));
    const actualUtc = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute);
    timestamp += desiredUtc - actualUtc;
  }

  return new Date(timestamp);
};

const getZonedCalendarDate = (reference: Date, dayOffset: number, timeZone: string): Date => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(reference);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, Number(value)]));
  return new Date(Date.UTC(values.year, values.month - 1, values.day + dayOffset, 12));
};

const parsePrayerTime = (time: string): { hour: number; minute: number } | null => {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim());
  if (!match) return null;
  const rawHour = Number(match[1]);
  const minute = Number(match[2]);
  if (rawHour < 1 || rawHour > 12 || minute > 59) return null;
  const hour = (rawHour % 12) + (match[3].toUpperCase() === 'PM' ? 12 : 0);
  return { hour, minute };
};

export const requestPrayerNotificationPermission = async (): Promise<boolean> => {
  if (!Capacitor.isNativePlatform()) {
    if (!('Notification' in window)) return false;
    return (await Notification.requestPermission()) === 'granted';
  }

  const current = await LocalNotifications.checkPermissions();
  const permission = current.display === 'granted'
    ? current
    : await LocalNotifications.requestPermissions();
  return permission.display === 'granted';
};

export const cancelPrayerNotifications = async (): Promise<void> => {
  if (!Capacitor.isNativePlatform()) return;
  const pending = await LocalNotifications.getPending();
  const prayerNotifications = pending.notifications
    .filter(({ id }) => id >= PRAYER_NOTIFICATION_ID_START && id < PRAYER_NOTIFICATION_ID_END)
    .map(({ id }) => ({ id }));
  if (prayerNotifications.length > 0) {
    await LocalNotifications.cancel({ notifications: prayerNotifications });
  }
};

export const scheduleTestPrayerNotification = async (language: Language): Promise<void> => {
  if (!Capacitor.isNativePlatform()) {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      throw new Error('Notification permission is not enabled.');
    }
    new Notification(
      language === 'ur' ? 'نماز کی یاد دہانی کا ٹیسٹ' : 'Prayer reminder test',
      { body: language === 'ur' ? 'موبائل نوٹیفکیشن کام کر رہا ہے۔' : 'Mobile notifications are working.' }
    );
    return;
  }

  const permitted = await requestPrayerNotificationPermission();
  if (!permitted) throw new Error('Notification permission was not granted.');
  if (Capacitor.getPlatform() === 'android') {
    await LocalNotifications.createChannel({
      id: 'prayer-reminders',
      name: language === 'ur' ? 'نماز کی یاد دہانیاں' : 'Prayer reminders',
      description: language === 'ur' ? 'نماز کی یاد دہانیاں' : 'Prayer reminders',
      importance: 4,
      visibility: 1
    });
  }
  await LocalNotifications.schedule({
    notifications: [{
      id: 71_999,
      title: language === 'ur' ? 'نماز کی یاد دہانی کا ٹیسٹ' : 'Prayer reminder test',
      body: language === 'ur' ? 'موبائل نوٹیفکیشن کام کر رہا ہے۔' : 'Mobile notifications are working.',
      schedule: { at: new Date(Date.now() + 1_000), allowWhileIdle: true },
      channelId: Capacitor.getPlatform() === 'android' ? 'prayer-reminders' : undefined
    }]
  });
};

export const schedulePrayerNotifications = async (
  profile: UserProfile,
  language: Language
): Promise<number> => {
  if (!Capacitor.isNativePlatform()) return 0;

  const currentPermission = await LocalNotifications.checkPermissions();
  const permission = currentPermission.display === 'granted'
    ? currentPermission
    : await LocalNotifications.requestPermissions();
  if (permission.display !== 'granted') {
    throw new Error('Notification permission was not granted.');
  }

  if (Capacitor.getPlatform() === 'android') {
    await LocalNotifications.createChannel({
      id: 'prayer-reminders',
      name: language === 'ur' ? 'نماز کی یاد دہانیاں' : 'Prayer reminders',
      description: language === 'ur'
        ? 'نماز سے پہلے اور نماز کے وقت کی یاد دہانیاں'
        : 'Prayer preparation and prayer-time reminders',
      importance: 4,
      visibility: 1
    });
  }

  await cancelPrayerNotifications();

  const city = MAJOR_CITIES.find(({ name }) => name === profile.city);
  const latitude = profile.latitude ?? city?.latitude ?? MAJOR_CITIES[0].latitude;
  const longitude = profile.longitude ?? city?.longitude ?? MAJOR_CITIES[0].longitude;
  const timeZone = profile.timeZone ?? city?.timezone ?? MAJOR_CITIES[0].timezone;
  const notifications: LocalNotificationSchema[] = [];
  const now = new Date();

  for (let dayOffset = 0; dayOffset < 6; dayOffset++) {
    const targetDay = getZonedCalendarDate(now, dayOffset, timeZone);
    const calculated = PrayerTimesService.calculatePrayerTimes(
      latitude,
      longitude,
      targetDay,
      true,
      timeZone
    );
    const times = applyManualPrayerTimes(
      calculated,
      profile.manualPrayerTimes === undefined
        ? DEFAULT_MANUAL_PRAYER_TIMES
        : profile.manualPrayerTimes,
      targetDay,
      timeZone
    );
    const prayerTimes = [times.fajr, times.dhuhr, times.asr, times.maghrib, times.isha];

    prayerTimes.forEach((time, prayerIndex) => {
      const parsed = parsePrayerTime(time);
      if (!parsed) return;
      const prayerDate = getZonedDate(targetDay, parsed.hour, parsed.minute, timeZone);
      const prayer = PRAYER_NAMES[prayerIndex];
      const reminders = [
        {
          offset: 0,
          title: language === 'ur' ? `${prayer.nameUr} کا وقت` : `${prayer.name} prayer time`,
          body: language === 'ur'
            ? `${profile.city} میں نماز کا وقت ہو گیا ہے۔`
            : `It is time for ${prayer.name} in ${profile.city}.`
        },
        {
          offset: 1,
          title: language === 'ur' ? `${prayer.nameUr} کی تیاری` : `Prepare for ${prayer.name}`,
          body: language === 'ur'
            ? `${profile.city} میں نماز میں ۱۵ منٹ باقی ہیں۔`
            : `${prayer.name} begins in 15 minutes in ${profile.city}.`
        }
      ];

      reminders.forEach(({ offset, title, body }) => {
        const scheduledAt = new Date(prayerDate.getTime() - offset * 15 * 60_000);
        if (scheduledAt <= now) return;
        notifications.push({
          id: PRAYER_NOTIFICATION_ID_START + dayOffset * 10 + prayerIndex * 2 + offset,
          title,
          body,
          schedule: { at: scheduledAt, allowWhileIdle: true },
          channelId: Capacitor.getPlatform() === 'android' ? 'prayer-reminders' : undefined,
          extra: { page: 'prayer', prayer: prayer.key }
        });
      });
    });
  }

  if (notifications.length === 0) return 0;
  await LocalNotifications.schedule({ notifications });
  return notifications.length;
};
