import React, { useState } from 'react';
import {
  Repeat,
  Volume2,
  VolumeX,
  Smartphone,
  RotateCcw,
  Sparkles,
  Trophy,
  Plus,
  Minus,
  CheckCircle2,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { TASBIH_PRESETS, TasbihAudioFeedback } from '../services/tasbihPresets';
import { TasbihPreset } from '../types';

export const DigitalTasbihPage: React.FC = () => {
  const { language, tasbihProgress, updateTasbihProgress } = useApp();
  const t = useTranslation(language);

  const selectedPreset = TASBIH_PRESETS.find(({ id }) => id === tasbihProgress.selectedPresetId) ?? TASBIH_PRESETS[0];
  const { count, laps, target, totalCount } = tasbihProgress;
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);

  // Tap handler
  const handleTap = () => {
    if (soundEnabled) {
      TasbihAudioFeedback.playClickSound();
    }
    if (hapticEnabled) {
      TasbihAudioFeedback.triggerHaptic(20);
    }

    const nextCount = count + 1;
    const completedLap = nextCount >= target;
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    if (completedLap) {
      if (soundEnabled) {
        TasbihAudioFeedback.playTargetReachedChime();
      }
      if (hapticEnabled) {
        TasbihAudioFeedback.triggerHaptic(100);
      }
    }
    updateTasbihProgress({
      ...tasbihProgress,
      count: completedLap ? 0 : nextCount,
      laps: laps + Number(completedLap),
      totalCount: totalCount + 1,
      countDate: today,
      countToday: tasbihProgress.countDate === today ? tasbihProgress.countToday + 1 : 1
    });
  };

  const handleReset = () => {
    updateTasbihProgress({ ...tasbihProgress, count: 0, laps: 0 });
  };

  const handleSelectPreset = (preset: TasbihPreset) => {
    updateTasbihProgress({
      ...tasbihProgress,
      selectedPresetId: preset.id,
      target: preset.target,
      count: 0
    });
  };

  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="space-y-6 pb-24">
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-900 text-white p-6 sm:p-8 shadow-xl border border-amber-400/30">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-amber-300 text-xs font-semibold border border-amber-400/30">
            <Repeat className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'شمارندہ تسبیح و اذکار' : 'Digital Tasbih Counter'}</span>
          </div>
          <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-amber-200">
            {t.tasbih}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
            {language === 'ur'
              ? 'روایتی مسنون تسبیحات، درود شریف اور کلمہ طیبہ کے اوراد و وظائف کے لیے حسی شمارندہ۔'
              : 'Interactive tactile bead counter with audio click feedback and lap tracking.'}
          </p>
        </div>
      </div>

      {/* Presets Horizontal Bar */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-4 shadow-sm">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">
          {language === 'ur' ? 'منتخب اذکار و تسبیحات:' : 'Select Dhikr Preset:'}
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {TASBIH_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-850 text-amber-200 border border-amber-400/50 shadow-xs'
                    : 'bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                }`}
              >
                <span className="font-quran text-sm">{preset.arabic}</span>
                <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400">
                  ({preset.target})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Tasbih Dial & Counter */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-8 shadow-sm text-center flex flex-col items-center justify-center">
        {/* Active Phrase Display */}
        <div className="max-w-md mx-auto mb-6">
          <p className="font-quran text-3xl sm:text-4xl text-emerald-950 dark:text-amber-200 leading-loose">
            {selectedPreset.arabic}
          </p>
          <p className="font-nastaliq text-base text-slate-700 dark:text-slate-300 mt-1">
            {selectedPreset.urdu}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {selectedPreset.english}
          </p>
        </div>

        {/* Large Tactile Click Button (Outer Ring with Progress Indicator) */}
        <div className="relative my-4">
          {/* Circular SVG Ring */}
          <svg className="w-64 h-64 sm:w-72 sm:h-72 transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              className="stroke-stone-200 dark:stroke-slate-700 fill-none"
              strokeWidth="10"
            />
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              className="stroke-amber-500 fill-none transition-all duration-200"
              strokeWidth="10"
              strokeDasharray="600"
              strokeDashoffset={600 - (600 * progressPercent) / 100}
              strokeLinecap="round"
            />
          </svg>

          {/* Central Button */}
          <button
            onClick={handleTap}
            className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 text-white shadow-2xl flex flex-col items-center justify-center border-4 border-amber-400/40 hover:scale-102 active:scale-95 transition-transform cursor-pointer select-none"
          >
            <span className="font-mono text-5xl sm:text-6xl font-black text-amber-300">
              {count}
            </span>
            <span className="text-xs uppercase tracking-widest text-emerald-300/80 mt-1">
              / {target}
            </span>
            <span className="text-[10px] text-amber-200/60 mt-1">TAP TO COUNT</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-6">
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              {t.tasbihLap}
            </span>
            <span className="font-mono text-lg font-bold text-emerald-800 dark:text-amber-400">
              {laps}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              {t.tasbihTarget}
            </span>
            <div className="flex items-center justify-center gap-1 font-mono text-base font-bold text-emerald-800 dark:text-amber-400">
              <button
                onClick={() => updateTasbihProgress({ ...tasbihProgress, target: Math.max(1, target - 1) })}
                className="hover:text-amber-500"
              >
                -
              </button>
              <span>{target}</span>
              <button
                onClick={() => updateTasbihProgress({ ...tasbihProgress, target: target + 1 })}
                className="hover:text-amber-500"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-900/60 border border-stone-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Total Lifetime
            </span>
            <span className="font-mono text-lg font-bold text-emerald-800 dark:text-amber-400">
              {totalCount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Controls Bar (Sound toggle, Haptics, Reset) */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2 transition-all ${
              soundEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-amber-300 border-emerald-300/40'
                : 'bg-stone-100 dark:bg-slate-800 text-slate-400 border-stone-200 dark:border-slate-700'
            }`}
            title="Toggle Audio Feedback"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-xs">{soundEnabled ? t.soundOn : t.soundOff}</span>
          </button>

          <button
            onClick={() => setHapticEnabled((prev) => !prev)}
            className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2 transition-all ${
              hapticEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-amber-300 border-emerald-300/40'
                : 'bg-stone-100 dark:bg-slate-800 text-slate-400 border-stone-200 dark:border-slate-700'
            }`}
            title="Toggle Vibration Feedback"
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-xs">{t.hapticFeedback}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-stone-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all"
            title="Reset Counter"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.tasbihReset}</span>
          </button>
        </div>

        {/* Spiritual Benefit Box */}
        {selectedPreset.benefit && (
          <div className="mt-8 max-w-lg text-xs text-emerald-900 dark:text-emerald-300/90 bg-emerald-50/60 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/30">
            <strong>{t.spiritualBenefit}:</strong> {selectedPreset.benefit}
          </div>
        )}
      </div>
    </div>
  );
};
