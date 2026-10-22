import { CityLocation, PrayerTimesData, UserProfile } from '../types';

export const MAJOR_CITIES: CityLocation[] = [
  { name: 'Islamabad', nameUrdu: 'اسلام آباد', country: 'Pakistan', latitude: 33.6844, longitude: 73.0479, timezone: 'Asia/Karachi' },
  { name: 'Lahore', nameUrdu: 'لاہور', country: 'Pakistan', latitude: 31.5204, longitude: 74.3587, timezone: 'Asia/Karachi' },
  { name: 'Karachi', nameUrdu: 'کراچی', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011, timezone: 'Asia/Karachi' },
  { name: 'Rawalpindi', nameUrdu: 'راولپنڈی', country: 'Pakistan', latitude: 33.5651, longitude: 73.0169, timezone: 'Asia/Karachi' },
  { name: 'Faisalabad', nameUrdu: 'فیصل آباد', country: 'Pakistan', latitude: 31.4504, longitude: 73.1350, timezone: 'Asia/Karachi' },
  { name: 'Multan', nameUrdu: 'ملتان', country: 'Pakistan', latitude: 30.1575, longitude: 71.5249, timezone: 'Asia/Karachi' },
  { name: 'Peshawar', nameUrdu: 'پشاور', country: 'Pakistan', latitude: 34.0151, longitude: 71.5249, timezone: 'Asia/Karachi' },
  { name: 'Quetta', nameUrdu: 'کوئٹہ', country: 'Pakistan', latitude: 30.1798, longitude: 66.9750, timezone: 'Asia/Karachi' },
  { name: 'Makkah', nameUrdu: 'مکہ مکرمہ', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262, timezone: 'Asia/Riyadh' },
  { name: 'Madinah', nameUrdu: 'مدینہ منورہ', country: 'Saudi Arabia', latitude: 24.4672, longitude: 39.6111, timezone: 'Asia/Riyadh' },
  { name: 'Dubai', nameUrdu: 'دبئی', country: 'UAE', latitude: 25.2048, longitude: 55.2708, timezone: 'Asia/Dubai' },
  { name: 'Istanbul', nameUrdu: 'استنبول', country: 'Turkey', latitude: 41.0082, longitude: 28.9784, timezone: 'Europe/Istanbul' },
  { name: 'London', nameUrdu: 'لندن', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { name: 'New York', nameUrdu: 'نیویارک', country: 'United States', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York' }
];

export const HIJRI_MONTHS_EN = [
  'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' ath-Thani',
  'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
];

export const HIJRI_MONTHS_UR = [
  'محرم الحرام', 'صفر المظفر', 'ربیع الاول', 'ربیع الثانی',
  'جمادی الاول', 'جمادی الثانی', 'رجب المرجب', 'شعبان المعظم',
  'رمضان المبارک', 'شوال المکرم', 'ذوالقعدۃ', 'ذوالحجۃ'
];

const getZonedDateParts = (date: Date, timeZone: string) => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, Number(value)]));
  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second
  };
};

export class PrayerTimesService {
  /**
   * Calculate Islamic Hijri Date based on Gregorian date
   */
  static getHijriDate(date: Date = new Date()): { day: number; monthIndex: number; monthEn: string; monthUr: string; year: number; formattedEn: string; formattedUr: string } {
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map(({ type, value }) => [type, Number(value)]));
    const mIdx = Math.max(0, Math.min(11, values.month - 1));
    const day = values.day;
    const year = values.year;

    return {
      day,
      monthIndex: mIdx,
      monthEn: HIJRI_MONTHS_EN[mIdx],
      monthUr: HIJRI_MONTHS_UR[mIdx],
      year,
      formattedEn: `${day} ${HIJRI_MONTHS_EN[mIdx]} ${year} AH`,
      formattedUr: `${day} ${HIJRI_MONTHS_UR[mIdx]} ${year} ھ`
    };
  }

  /**
   * Astronomical solar prayer calculations
   */
  static calculatePrayerTimes(
    lat: number,
    lng: number,
    date: Date = new Date(),
    isHanafi: boolean = true,
    timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
  ): PrayerTimesData {
    const zoned = getZonedDateParts(date, timeZone);
    const startOfYear = Date.UTC(zoned.year, 0, 1);
    const dayOfYear = Math.floor((Date.UTC(zoned.year, zoned.month - 1, zoned.day) - startOfYear) / 86_400_000) + 1;
    const gamma = (2 * Math.PI / 365) * (dayOfYear - 1);
    const equationOfTime = 229.18 * (
      0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma)
    );
    const declination =
      0.006918 -
      0.399912 * Math.cos(gamma) +
      0.070257 * Math.sin(gamma) -
      0.006758 * Math.cos(2 * gamma) +
      0.000907 * Math.sin(2 * gamma) -
      0.002697 * Math.cos(3 * gamma) +
      0.00148 * Math.sin(3 * gamma);
    const latitude = (lat * Math.PI) / 180;
    const timezoneOffset = (
      Date.UTC(zoned.year, zoned.month - 1, zoned.day, zoned.hour, zoned.minute, zoned.second) - date.getTime()
    ) / 3_600_000;
    const solarNoon = 12 + (timezoneOffset * 15 - lng) / 15 - equationOfTime / 60;

    const hourAngle = (altitudeDegrees: number): number | null => {
      const altitude = (altitudeDegrees * Math.PI) / 180;
      const cosine = (
        Math.sin(altitude) - Math.sin(latitude) * Math.sin(declination)
      ) / (Math.cos(latitude) * Math.cos(declination));
      if (cosine < -1 || cosine > 1) return null;
      return (Math.acos(cosine) * 12) / Math.PI;
    };

    const sunriseAngle = hourAngle(-0.833);
    const sunriseHours = sunriseAngle ?? 6;
    const nightHours = Math.max(0, 24 - 2 * sunriseHours);
    const twilightFallback = sunriseHours + nightHours / 7;
    const fajrHours = hourAngle(-18) ?? twilightFallback;
    const ishaHours = hourAngle(-18) ?? twilightFallback;
    const asrShadow = isHanafi ? 2 : 1;
    const asrAltitude = Math.atan(1 / (asrShadow + Math.tan(Math.abs(latitude - declination))));
    const asrHours = hourAngle((asrAltitude * 180) / Math.PI) ?? sunriseHours / 2;

    const fajrTime = solarNoon - fajrHours;
    const sunriseTime = solarNoon - sunriseHours;
    const dhuhrTime = solarNoon + 0.03;
    const asrTime = solarNoon + asrHours;
    const maghribTime = solarNoon + sunriseHours;
    const ishaTime = solarNoon + ishaHours;
    const nextFajr = fajrTime <= maghribTime ? fajrTime + 24 : fajrTime;
    const qiyamTime = (maghribTime + nextFajr) / 2;

    const formatHour = (hours: number): string => {
      const totalMinutes = ((Math.round(hours * 60) % 1440) + 1440) % 1440;
      const hour = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const period = hour >= 12 ? 'PM' : 'AM';
      return `${hour % 12 || 12}:${String(minutes).padStart(2, '0')} ${period}`;
    };

    const getMinutes = (hours: number): number => ((Math.round(hours * 60) % 1440) + 1440) % 1440;
    const currentTotalMinutes = zoned.hour * 60 + zoned.minute;

    const prayers = [
      { name: 'Fajr', mins: getMinutes(fajrTime) },
      { name: 'Dhuhr', mins: getMinutes(dhuhrTime) },
      { name: 'Asr', mins: getMinutes(asrTime) },
      { name: 'Maghrib', mins: getMinutes(maghribTime) },
      { name: 'Isha', mins: getMinutes(ishaTime) }
    ];

    let next = prayers[0];
    let diff = prayers[0].mins - currentTotalMinutes;

    for (let i = 0; i < prayers.length; i++) {
      if (prayers[i].mins > currentTotalMinutes) {
        next = prayers[i];
        diff = prayers[i].mins - currentTotalMinutes;
        break;
      }
      if (i === prayers.length - 1) {
        next = prayers[0];
        diff = 1440 - currentTotalMinutes + prayers[0].mins;
      }
    }

    const hoursLeft = Math.floor(diff / 60);
    const minsLeft = diff % 60;

    return {
      fajr: formatHour(fajrTime),
      sunrise: formatHour(sunriseTime),
      dhuhr: formatHour(dhuhrTime),
      asr: formatHour(asrTime),
      maghrib: formatHour(maghribTime),
      isha: formatHour(ishaTime),
      qiyam: formatHour(qiyamTime),
      nextPrayer: next.name,
      timeRemainingMinutes: diff,
      timeRemainingFormatted: `${hoursLeft > 0 ? `${hoursLeft}h ` : ''}${minsLeft}m`
    };
  }

  /**
   * Play Adhan audio
   */
  static playAdhanAudio(adhanType: 'makkah' | 'madinah' = 'makkah'): HTMLAudioElement | void {
    const urls: Record<string, string> = {
      makkah: 'https://cdn.aladhan.com/audio/adhans/a1.mp3',
      madinah: 'https://cdn.aladhan.com/audio/adhans/a2.mp3'
    };

    const audio = new Audio(urls[adhanType]);
    audio.volume = 0.9;
    audio.preload = 'auto';
    void audio.play().catch((error: unknown) => {
      console.error('Unable to play the Adhan audio:', error);
      audio.dispatchEvent(new Event('playerror'));
    });
    return audio;
  }
}

export const DEFAULT_MANUAL_PRAYER_TIMES: NonNullable<UserProfile['manualPrayerTimes']> = {
  fajr: '05:40',
  dhuhr: '13:45',
  asr: '16:15',
  maghrib: '17:30',
  isha: '19:30'
};

export const applyManualPrayerTimes = (
  prayerData: PrayerTimesData,
  manualTimes: UserProfile['manualPrayerTimes'] | null,
  now: Date,
  timeZone: string
): PrayerTimesData => {
  if (manualTimes === null || manualTimes === undefined) return prayerData;

  const dateParts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(now);
  const values = Object.fromEntries(dateParts.map(({ type, value }) => [type, Number(value)]));
  const currentMinute = values.hour * 60 + values.minute;
  const entries = ([
    ['Fajr', 'fajr'],
    ['Dhuhr', 'dhuhr'],
    ['Asr', 'asr'],
    ['Maghrib', 'maghrib'],
    ['Isha', 'isha']
  ] as const).map(([name, key]) => {
    const [hour, minute] = manualTimes[key].split(':').map(Number);
    return { name, key, minutes: hour * 60 + minute };
  });
  const next = entries.find(({ minutes }) => minutes > currentMinute) ?? entries[0];
  const remaining = (next.minutes - currentMinute + 1440) % 1440;
  const hoursLeft = Math.floor(remaining / 60);
  const minutesLeft = remaining % 60;
  const format = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  return {
    ...prayerData,
    fajr: format(manualTimes.fajr),
    dhuhr: format(manualTimes.dhuhr),
    asr: format(manualTimes.asr),
    maghrib: format(manualTimes.maghrib),
    isha: format(manualTimes.isha),
    nextPrayer: next.name,
    timeRemainingMinutes: remaining,
    timeRemainingFormatted: `${hoursLeft > 0 ? `${hoursLeft}h ` : ''}${minutesLeft}m`
  };
};
