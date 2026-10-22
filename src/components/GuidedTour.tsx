import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Compass, BookOpen, Clock, Award, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GuidedTour: React.FC = () => {
  const { userProfile, setActivePage } = useApp();

  const [tourStep, setTourStep] = useState<number | null>(null);

  useEffect(() => {
    // If onboarding is completed and tour not seen yet, trigger tour
    const tourSeen = localStorage.getItem('islamforeveryone_tour_completed');
    if (userProfile.onboardingCompleted && !tourSeen) {
      setTourStep(0);
    }
  }, [userProfile.onboardingCompleted]);

  if (tourStep === null) return null;

  const tourSteps = [
    {
      titleEn: 'Welcome to Islam for Everyone! 🕌',
      titleUr: 'اسلام فار ایوری ون میں خوش آمدید!',
      descEn: 'Your spiritual portal with complete 114 Quran Surahs, 6 Hadith books, Prayer Times with Adhan, Salah Tracker, and Islamic History.',
      descUr: 'مکمل قرآن مجید، احادیثِ مبارکہ، قبلہ رخ، اوقاتِ نماز، اور صلوٰۃ ٹریکر کا جامع پلیٹ فارم۔',
      action: () => setActivePage('home'),
      icon: Sparkles
    },
    {
      titleEn: '114 Surahs, Tafseer & Recitation 📖',
      titleUr: 'تلاوتِ قرآن، تفسیر اور سورتوں کا تعارف',
      descEn: 'Read with IndoPak or Uthmani scripts, stacked Urdu and English translations, and tap any Ayah to read deep scholarly Tafseer or listen to Sheikh Mishary Alafasy.',
      descUr: 'ہر سورت کا تفصیلی تعارف اور ہر آیت کی تفسیر (ابن کثیر و معارف القرآن) اردو و انگریزی میں۔',
      action: () => setActivePage('quran'),
      icon: BookOpen
    },
    {
      titleEn: 'Real-Time Prayer Times & Pre-Adhan Alert ⏰',
      titleUr: 'اوقاتِ نماز اور ۱۵ منٹ قبل اذان الرٹ',
      descEn: 'Synchronized with Islamabad & Lahore time with live countdown. Turn on the "15-Min Pre-Adhan Alert" to receive an automatic reminder before prayer!',
      descUr: 'پاکستان کے مستند اوقات اور نماز سے ۱۵ منٹ قبل خودکار اذان بیپ اور نوٹیفکیشن الرٹ۔',
      action: () => setActivePage('prayer'),
      icon: Clock
    },
    {
      titleEn: 'Daily Salah Tracker & Streak Badges 🏆',
      titleUr: 'صلوٰۃ ٹریکر اور استقامت کے بیجز',
      descEn: 'Mark each prayer: Ba-Jamat gives 1.0 point, Munfarid/Qaza gives 0.5 points without breaking your streak! Earn badges for 7, 40, 100, and 365 days of prayer!',
      descUr: 'نماز باجماعت یا قضا کا ریکارڈ رکھیں اور ۴۰ دن اور ۳۶۵ دن کی ناقابلِ شکست استقامت پر بیجز حاصل کریں۔',
      action: () => setActivePage('account'),
      icon: Award
    },
    {
      titleEn: 'Islamic Timeline & Calendar 📅',
      titleUr: 'تاریخِ اسلام اور دوہرا ہجری و عیسوی کیلنڈر',
      descEn: 'Explore the life stories of the Prophets, Khulafa-e-Rashideen, and dual Hijri/Gregorian calendar with mapped historical events.',
      descUr: 'انبیاء کرام کے واقعات اور خلفائے راشدین کے سنہری ادوار کا تاریخ ساز ٹائم لائن۔',
      action: () => setActivePage('history'),
      icon: Shield
    }
  ];

  const current = tourSteps[tourStep];
  const Icon = current.icon;

  const handleNext = () => {
    if (tourStep + 1 < tourSteps.length) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      tourSteps[nextStep].action();
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (tourStep > 0) {
      const prevStep = tourStep - 1;
      setTourStep(prevStep);
      tourSteps[prevStep].action();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('islamforeveryone_tour_completed', 'true');
    setTourStep(null);
    setActivePage('home');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FDFBF7] dark:bg-[#0F172A] rounded-3xl shadow-2xl border-2 border-amber-400 p-6 space-y-4 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500 text-emerald-950 font-bold">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              Guide {tourStep + 1} of {tourSteps.length}
            </span>
          </div>

          <button
            onClick={handleComplete}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Skip Tour
          </button>
        </div>

        <div>
          <h3 className="font-title text-base sm:text-lg font-bold text-emerald-950 dark:text-amber-200">
            {current.titleEn}
          </h3>
          <p className="font-nastaliq text-base text-slate-800 dark:text-slate-200 text-right my-1">
            {current.titleUr}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {current.descEn}
          </p>
        </div>

        {/* Dots progress */}
        <div className="flex items-center justify-center gap-1.5 py-1">
          {tourSteps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === tourStep
                  ? 'w-6 bg-amber-500'
                  : 'w-1.5 bg-stone-300 dark:bg-slate-700'
              }`}
            ></div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-slate-800">
          <button
            disabled={tourStep === 0}
            onClick={handlePrev}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-20 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-xl bg-emerald-850 hover:bg-emerald-900 text-amber-200 font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <span>{tourStep + 1 === tourSteps.length ? 'Get Started' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
