import React, { useState, useEffect } from 'react';
import { Compass, MapPin, CheckCircle2, RotateCw, LocateFixed, LoaderCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { QiblaService } from '../services/qibla';
import { MAJOR_CITIES } from '../services/prayerTimes';
import { CityLocation } from '../types';

export const QiblaCompassPage: React.FC = () => {
  const { language, userProfile } = useApp();
  const t = useTranslation(language);

  const initialCity = MAJOR_CITIES.find(({ name }) => name === userProfile.city);
  const hasSavedCustomLocation = !initialCity &&
    userProfile.latitude !== undefined &&
    userProfile.longitude !== undefined;
  const [selectedCity, setSelectedCity] = useState<CityLocation>(() => initialCity ?? (
    userProfile.latitude !== undefined && userProfile.longitude !== undefined
      ? {
          name: userProfile.city,
          nameUrdu: userProfile.city,
          country: 'Saved location',
          latitude: userProfile.latitude,
          longitude: userProfile.longitude,
          timezone: userProfile.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      : MAJOR_CITIES[0]
  ));
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [hasCompassSensor, setHasCompassSensor] = useState(false);
  const [manualHeading, setManualHeading] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [isLiveLocation, setIsLiveLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const [compassPermissionNeeded, setCompassPermissionNeeded] = useState(false);
  const isUrdu = language === 'ur';

  // Recalculate the bearing whenever live GPS coordinates change.
  const qiblaBearing = Math.round(
    QiblaService.calculateQiblaAngle(selectedCity.latitude, selectedCity.longitude)
  );
  const distanceKm = QiblaService.calculateDistanceToKaaba(
    selectedCity.latitude,
    selectedCity.longitude
  );

  // Active heading is either real sensor or manual slider
  const currentHeading = hasCompassSensor ? deviceHeading : manualHeading;
  const turnDifference = ((qiblaBearing - currentHeading + 540) % 360) - 180;
  const isAligned = hasCompassSensor && Math.abs(turnDifference) <= 5;
  const qiblaDirection = QiblaService.getCardinalDirection(qiblaBearing, language);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const compassEvent = e as DeviceOrientationEvent & { webkitCompassHeading?: number };
      const heading = compassEvent.webkitCompassHeading ?? (e.absolute && e.alpha !== null ? 360 - e.alpha : null);
      if (heading !== null && Number.isFinite(heading)) {
        setHasCompassSensor(true);
        setCompassPermissionNeeded(false);
        setDeviceHeading(Math.round((heading + 360) % 360));
      }
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientationabsolute', handleOrientation);
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useEffect(() => {
    if (!isLiveLocation || !navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setSelectedCity((current) => ({
          ...current,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
        setLocationAccuracy(Math.round(position.coords.accuracy));
        setLocationError(null);
      },
      (error) => {
        setLocationError(error.code === error.PERMISSION_DENIED
          ? (isUrdu ? 'مقام کی اجازت بند ہے؛ براؤزر settings میں Location کی اجازت دیں۔' : 'Location permission is blocked. Allow location in your browser settings.')
          : error.code === error.TIMEOUT
            ? (isUrdu ? 'مقام معلوم کرنے کا وقت ختم ہوگیا؛ دوبارہ کوشش کریں۔' : 'Location lookup timed out. Try again.')
            : (isUrdu ? 'آپ کا مقام معلوم نہیں ہو سکا۔' : 'Your location could not be detected.'));
      },
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 20_000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [isLiveLocation, isUrdu]);

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(isUrdu ? 'اس براؤزر میں GPS مقام دستیاب نہیں۔' : 'Geolocation is not available in this browser.');
      return;
    }
    if (!window.isSecureContext) {
      setLocationError(isUrdu
        ? 'Live GPS کے لیے محفوظ HTTPS ویب سائٹ یا localhost استعمال کریں۔'
        : 'Live GPS requires a secure HTTPS website or localhost.');
      return;
    }
    setIsLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSelectedCity((current) => ({
          ...current,
          name: isUrdu ? 'میرا موجودہ مقام' : 'My current location',
          nameUrdu: 'میرا موجودہ مقام',
          country: isUrdu ? 'موجودہ مقام' : 'Live GPS',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
        setLocationAccuracy(Math.round(position.coords.accuracy));
        setIsLiveLocation(true);
        setIsLocating(false);
      },
      (error) => {
        setLocationError(error.code === error.PERMISSION_DENIED
          ? (isUrdu ? 'مقام کی اجازت نہیں ملی۔ براؤزر میں Location اجازت دیں اور دوبارہ کوشش کریں۔' : 'Location permission was denied. Allow location in your browser and try again.')
          : error.code === error.TIMEOUT
            ? (isUrdu ? 'مقام معلوم کرنے کا وقت ختم ہوگیا؛ دوبارہ کوشش کریں۔' : 'Location lookup timed out. Try again.')
            : (isUrdu ? 'آپ کا مقام معلوم نہیں ہو سکا؛ GPS آن کرکے دوبارہ کوشش کریں۔' : 'Could not detect your location. Turn on GPS and try again.'));
        setIsLocating(false);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 20_000 }
    );
  };

  const handleEnableCompass = async () => {
    const orientationApi = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };
    if (!orientationApi.requestPermission) return;
    try {
      const permission = await orientationApi.requestPermission();
      setCompassPermissionNeeded(permission !== 'granted');
    } catch (error) {
      console.error('Unable to request compass permission:', error);
      setCompassPermissionNeeded(true);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-900 text-white p-6 sm:p-8 shadow-xl border border-amber-400/30">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-amber-300 text-xs font-semibold border border-amber-400/30">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'حقیقی قبلہ رخ و پیمائش' : 'Great Circle Bearing to Kaaba'}</span>
          </div>
          <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-amber-200">
            {t.qiblaCompass}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
            {language === 'ur'
              ? 'مکہ مکرمہ میں واقع کعبۃ اللہ شریف کا عین درست زاویہ اور فاصلہ۔'
              : 'Exact geographic azimuth heading to the Holy Kaaba in Makkah al-Mukarramah.'}
          </p>
        </div>
      </div>

      {/* Location and alignment controls */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <MapPin className="w-4 h-4 text-emerald-800 dark:text-amber-400 shrink-0" />
          <label htmlFor="qibla-city" className="text-xs font-bold text-slate-700 dark:text-slate-300">{t.currentLocation}:</label>
          <select
            id="qibla-city"
            value={selectedCity.name}
            onChange={(e) => {
              const found = MAJOR_CITIES.find((c) => c.name === e.target.value);
              if (found) {
                setSelectedCity(found);
                setIsLiveLocation(false);
                setLocationAccuracy(null);
                setLocationError(null);
              } else if (hasSavedCustomLocation && e.target.value === selectedCity.name) {
                setIsLiveLocation(false);
                setLocationAccuracy(null);
                setLocationError(null);
              }
            }}
            className="flex-1 sm:w-48 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden"
          >
            {isLiveLocation && (
              <option value={selectedCity.name}>
                {isUrdu ? 'میرا موجودہ مقام (GPS)' : 'My current GPS location'}
              </option>
            )}
            {hasSavedCustomLocation && !isLiveLocation && (
              <option value={selectedCity.name}>
                {isUrdu ? `محفوظ مقام: ${selectedCity.name}` : `Saved location: ${selectedCity.name}`}
              </option>
            )}
            {MAJOR_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {language === 'ur' ? c.nameUrdu : c.name} ({c.country})
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleFindLocation}
            disabled={isLocating}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-900 px-3 py-2 text-xs font-bold text-amber-200 transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {isLocating
              ? <LoaderCircle className="h-4 w-4 animate-spin" />
              : <LocateFixed className="h-4 w-4" />}
            {isUrdu ? 'میرا مقام معلوم کریں' : 'Find my location'}
          </button>
        </div>

        {/* Alignment badge */}
        <div
          className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
            isAligned
              ? 'bg-emerald-600 text-white shadow-md animate-pulse'
              : 'bg-stone-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          {isAligned ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>{language === 'ur' ? 'قبلہ رخ درست ہے!' : 'Directly Facing Kaaba!'}</span>
            </>
          ) : (
            <>
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>
                {hasCompassSensor
                  ? (isUrdu
                    ? `${Math.abs(Math.round(turnDifference))}° ${turnDifference > 0 ? 'دائیں' : 'بائیں'} مڑیں`
                    : `Turn ${Math.abs(Math.round(turnDifference))}° ${turnDifference > 0 ? 'right' : 'left'}`)
                  : (isUrdu
                    ? `قبلہ ${qiblaDirection}، ${qiblaBearing}° پر ہے`
                    : `Qibla is ${qiblaDirection}, at ${qiblaBearing}°`)}
              </span>
            </>
          )}
        </div>
        {locationAccuracy !== null && (
          <p role="status" className="text-xs text-slate-500 dark:text-slate-400">
            {isUrdu
              ? `GPS live ہے؛ مقام کی درستگی تقریباً ${locationAccuracy} میٹر۔`
              : `Live GPS active; location accuracy is about ${locationAccuracy} m.`}
          </p>
        )}
        {locationError && (
          <p role="alert" className="rounded-2xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
            {locationError}
          </p>
        )}
        {compassPermissionNeeded && (
          <p role="alert" className="rounded-2xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
            {isUrdu
              ? 'خودکار رخ کے لیے کمپاس sensor کی اجازت آن کریں۔'
              : 'Allow compass sensor access to get live turn-by-turn direction.'}
          </p>
        )}
      </div>

      {/* Main Visual Compass Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-8 shadow-sm text-center flex flex-col items-center justify-center">
        {/* Compass Rosette Container */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-4 flex items-center justify-center">
          {/* Outer Brass Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-amber-600/40 dark:border-amber-500/30 bg-radial from-amber-500/10 via-transparent to-transparent shadow-inner"></div>

          {/* Compass Rose Dial (Rotates with device heading) */}
          <div
            className="absolute inset-2 rounded-full border-2 border-stone-200 dark:border-slate-700 transition-transform duration-200 flex items-center justify-center"
            style={{ transform: `rotate(${-currentHeading}deg)` }}
          >
            {/* Cardinal Marks */}
            <span className="absolute top-2 font-bold text-sm text-red-500">N</span>
            <span className="absolute bottom-2 font-bold text-xs text-slate-400">S</span>
            <span className="absolute right-3 font-bold text-xs text-slate-400">E</span>
            <span className="absolute left-3 font-bold text-xs text-slate-400">W</span>

            {/* Degree ticks around dial */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <div
                key={deg}
                className="absolute w-full h-full pointer-events-none"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div className="w-0.5 h-2 bg-stone-300 dark:bg-slate-600 mx-auto"></div>
              </div>
            ))}

            {/* Holy Kaaba Needle Target */}
            <div
              className="absolute w-full h-full pointer-events-none flex flex-col items-center"
              style={{ transform: `rotate(${qiblaBearing}deg)` }}
            >
              <div className="flex flex-col items-center -mt-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border-2 border-amber-400 text-amber-300 shadow-lg flex items-center justify-center text-xs font-bold">
                  🕋
                </div>
                <div className="w-0.5 h-16 bg-gradient-to-b from-amber-400 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Center Hub & Fixed Device Pointer */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-emerald-950 border-2 border-amber-400 text-amber-200 flex flex-col items-center justify-center shadow-lg">
            <span className="font-mono text-xs font-bold">{currentHeading}°</span>
            <span className="text-[9px] uppercase tracking-wider text-emerald-400">Heading</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-lg mt-6">
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              {t.compassHeading}
            </span>
            <span className="font-mono text-lg font-bold text-emerald-800 dark:text-amber-400">
              {qiblaBearing}° N
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              {t.distanceToKaaba}
            </span>
            <span className="font-mono text-lg font-bold text-emerald-800 dark:text-amber-400">
              {distanceKm.toLocaleString()} km
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              {isUrdu ? 'کعبہ کی سمت' : 'Qibla direction'}
            </span>
            <span className="font-bold text-sm text-emerald-950 dark:text-amber-300">
              {qiblaDirection} · {qiblaBearing}°
            </span>
          </div>
        </div>

        {/* Manual Rotation Slider for Desktop Users */}
        {!hasCompassSensor && (
          <div className="w-full max-w-md mt-6 p-4 rounded-2xl bg-stone-50 dark:bg-slate-900/40 border border-stone-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
              <span>{isUrdu ? 'کمپاس کا رخ موجود نہیں؛ سمت خود طے کریں:' : 'Compass sensor unavailable; set device heading manually:'}</span>
              <span className="font-mono font-bold text-emerald-800 dark:text-amber-400">{manualHeading}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="359"
              value={manualHeading}
              onChange={(e) => setManualHeading(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isUrdu
                  ? 'براہِ راست مڑنے کی ہدایات کے لیے فون کا کمپاس sensor فعال کریں۔'
                  : 'Enable the phone compass sensor for live turn-by-turn guidance.'}
              </p>
              {typeof DeviceOrientationEvent !== 'undefined' &&
                'requestPermission' in DeviceOrientationEvent && (
                  <button
                    type="button"
                    onClick={() => void handleEnableCompass()}
                    className="rounded-lg border border-emerald-700 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:text-amber-200"
                  >
                    {isUrdu ? 'کمپاس آن کریں' : 'Enable compass'}
                  </button>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
