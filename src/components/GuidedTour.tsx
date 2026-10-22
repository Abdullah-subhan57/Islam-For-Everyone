import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookMarked,
  BookOpen,
  Bot,
  Calendar,
  Clock,
  Compass,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Home,
  Repeat,
  Shield,
  UserRound,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';

const TOUR_STEPS: Array<{
  page: PageId;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    page: 'home',
    titleEn: 'Your daily home',
    titleUr: 'آپ کا روزانہ مرکزی صفحہ',
    descriptionEn: 'See the next Salah countdown, daily verse and Hadith, reading progress, and quick links from one place.',
    descriptionUr: 'اگلی نماز کا وقت، روزانہ آیت و حدیث، مطالعے کی پیش رفت اور اہم حصے یہاں دیکھیں۔',
    icon: Home
  },
  {
    page: 'quran',
    titleEn: 'Read and listen to Quran',
    titleUr: 'قرآن پڑھیں اور سنیں',
    descriptionEn: 'Choose a Surah, read Arabic with translations, open Tafseer, bookmark verses, and play recitation.',
    descriptionUr: 'سورت منتخب کریں، عربی اور ترجمہ پڑھیں، تفسیر دیکھیں، آیات محفوظ کریں اور تلاوت سنیں۔',
    icon: BookOpen
  },
  {
    page: 'hadith',
    titleEn: 'Explore Hadith collections',
    titleUr: 'حدیث کی کتب دیکھیں',
    descriptionEn: 'Browse available Hadith collections, search their text, and save useful references.',
    descriptionUr: 'حدیث کی دستیاب کتب میں تلاش کریں اور اہم حوالہ جات محفوظ رکھیں۔',
    icon: BookMarked
  },
  {
    page: 'prayer',
    titleEn: 'Set your prayer times',
    titleUr: 'اپنے اوقاتِ نماز مرتب کریں',
    descriptionEn: 'Choose your city or location, review calculated times, and adjust the schedule to your local authority.',
    descriptionUr: 'اپنا شہر یا مقام منتخب کریں، حساب شدہ اوقات دیکھیں اور اپنے مقامی شیڈول کے مطابق درست کریں۔',
    icon: Clock
  },
  {
    page: 'account',
    titleEn: 'Track Salah and account progress',
    titleUr: 'نماز اور اکاؤنٹ کی پیش رفت',
    descriptionEn: 'Record daily prayers, review streaks, and edit the profile details saved to your account.',
    descriptionUr: 'روزانہ نمازوں کا ریکارڈ، تسلسل اور اکاؤنٹ میں محفوظ پروفائل کی تفصیلات دیکھیں۔',
    icon: UserRound
  },
  {
    page: 'qibla',
    titleEn: 'Find the Qibla',
    titleUr: 'قبلہ معلوم کریں',
    descriptionEn: 'Allow location access to calculate the Kaaba bearing and distance for your current location.',
    descriptionUr: 'موجودہ مقام سے قبلہ کی سمت اور فاصلہ معلوم کرنے کے لیے لوکیشن کی اجازت دیں۔',
    icon: Compass
  },
  {
    page: 'duas',
    titleEn: 'Daily duas and azkar',
    titleUr: 'روزانہ کی دعائیں اور اذکار',
    descriptionEn: 'Browse supplications, read their meanings, and use the repetition counters.',
    descriptionUr: 'دعائیں اور ان کے معنی پڑھیں اور تکرار کے کاؤنٹر استعمال کریں۔',
    icon: HeartHandshake
  },
  {
    page: 'tasbih',
    titleEn: 'Use the digital Tasbih',
    titleUr: 'ڈیجیٹل تسبیح استعمال کریں',
    descriptionEn: 'Choose a dhikr preset and your count is saved on this device and synced to your account when signed in.',
    descriptionUr: 'ذکر منتخب کریں؛ گنتی اس ڈیوائس پر محفوظ اور سائن اِن ہونے پر اکاؤنٹ سے ہم آہنگ ہوتی ہے۔',
    icon: Repeat
  },
  {
    page: 'quiz',
    titleEn: 'Learn with quizzes',
    titleUr: 'کوئز کے ذریعے سیکھیں',
    descriptionEn: 'Practice Islamic knowledge with quizzes and track completed learning activities.',
    descriptionUr: 'اسلامی معلومات کے کوئز حل کریں اور اپنی تعلیمی سرگرمیاں دیکھیں۔',
    icon: GraduationCap
  },
  {
    page: 'names99',
    titleEn: 'Explore the 99 Names',
    titleUr: 'اسمائے حسنیٰ دیکھیں',
    descriptionEn: 'Browse the names, meanings, and references in the Names section.',
    descriptionUr: 'اسمائے حسنیٰ کے نام، معانی اور حوالہ جات دیکھیں۔',
    icon: Award
  },
  {
    page: 'calendar',
    titleEn: 'View the Islamic calendar',
    titleUr: 'اسلامی کیلنڈر دیکھیں',
    descriptionEn: 'Explore Hijri dates, selected observances, and calendar information.',
    descriptionUr: 'ہجری تاریخ، منتخب اسلامی مواقع اور کیلنڈر کی معلومات دیکھیں۔',
    icon: Calendar
  },
  {
    page: 'history',
    titleEn: 'Explore Islamic history',
    titleUr: 'اسلامی تاریخ کا مطالعہ',
    descriptionEn: 'Read the app’s historical timelines and biographies.',
    descriptionUr: 'تاریخی ادوار اور شخصیات کے بارے میں مطالعہ کریں۔',
    icon: Shield
  },
  {
    page: 'assistant',
    titleEn: 'Ask the assistant',
    titleUr: 'معاون سے سوال کریں',
    descriptionEn: 'Use navigation shortcuts locally. General AI responses need the server and Gemini key to be configured.',
    descriptionUr: 'ایپ کے مقامی نیویگیشن شارٹ کٹس استعمال کریں؛ عام AI جوابات کے لیے سرور اور Gemini key درکار ہے۔',
    icon: Bot
  },
  {
    page: 'ibadat',
    titleEn: 'Follow the Ibadat guides',
    titleUr: 'عبادات کی رہنمائی',
    descriptionEn: 'Choose Salah, fasting, Zakat, Hajj, Umrah, or Ghusl for step-by-step guidance.',
    descriptionUr: 'نماز، روزہ، زکوٰۃ، حج، عمرہ یا غسل منتخب کرکے مرحلہ وار رہنمائی لیں۔',
    icon: HandHeart
  }
];

export const GuidedTour: React.FC = () => {
  const { userProfile, setActivePage, language } = useApp();
  const [tourStep, setTourStep] = useState<number | null>(null);
  const isUrdu = language === 'ur';
  const tourKey = `islamforeveryone_tour_completed_${userProfile.id}`;

  useEffect(() => {
    const openTour = () => {
      setTourStep(0);
      setActivePage(TOUR_STEPS[0].page);
    };

    try {
      if (localStorage.getItem(tourKey) !== 'true') openTour();
    } catch (error) {
      console.error('Unable to read guided-tour preference:', error);
    }

    window.addEventListener('islam360:open-guide', openTour);
    return () => window.removeEventListener('islam360:open-guide', openTour);
  }, [setActivePage, tourKey]);

  const finishTour = () => {
    try {
      localStorage.setItem(tourKey, 'true');
    } catch (error) {
      console.error('Unable to save guided-tour preference:', error);
    }
    setTourStep(null);
  };

  const goToStep = (step: number) => {
    setTourStep(step);
    setActivePage(TOUR_STEPS[step].page);
  };

  if (tourStep === null) return null;
  const current = TOUR_STEPS[tourStep];
  const Icon = current.icon;
  const advance = () => {
    if (tourStep + 1 < TOUR_STEPS.length) goToStep(tourStep + 1);
    else finishTour();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/35 p-3 backdrop-blur-[2px] sm:items-center sm:p-5">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="guided-tour-title"
        className="w-full max-w-lg rounded-3xl border border-teal-100 bg-white p-5 shadow-2xl shadow-slate-900/15 sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-800">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800">
                {isUrdu ? `صفحہ ${tourStep + 1} / ${TOUR_STEPS.length}` : `Page ${tourStep + 1} of ${TOUR_STEPS.length}`}
              </span>
              <span className="block text-xs text-slate-500">{isUrdu ? 'ایپ کا رہنما ٹور' : 'Guided app tour'}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={finishTour}
            aria-label={isUrdu ? 'ٹور بند کریں' : 'Close tour'}
            className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-teal-700 transition-all duration-300" style={{ width: `${((tourStep + 1) / TOUR_STEPS.length) * 100}%` }} />
        </div>

        <h2 id="guided-tour-title" className={`text-xl font-bold text-slate-900 sm:text-2xl ${isUrdu ? 'font-nastaliq' : 'font-title'}`}>
          {isUrdu ? current.titleUr : current.titleEn}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {isUrdu ? current.descriptionUr : current.descriptionEn}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => tourStep > 0 && goToStep(tourStep - 1)}
            disabled={tourStep === 0}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl px-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            <ArrowLeft aria-hidden="true" className={`h-4 w-4 ${isUrdu ? 'rotate-180' : ''}`} />
            {isUrdu ? 'پچھلا' : 'Back'}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={advance}
              className="min-h-10 rounded-xl px-3 text-xs font-semibold text-teal-800 transition-colors hover:bg-teal-50"
            >
              {isUrdu ? 'یہ صفحہ چھوڑیں' : 'Skip this page'}
            </button>
            <button
              type="button"
              onClick={advance}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-teal-800 px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-teal-900 active:scale-95"
            >
              {tourStep + 1 === TOUR_STEPS.length
                ? (isUrdu ? 'مکمل' : 'Finish')
                : (isUrdu ? 'اگلا' : 'Next')}
              <ArrowRight aria-hidden="true" className={`h-4 w-4 ${isUrdu ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={finishTour}
          className="mt-3 w-full rounded-lg py-2 text-xs font-medium text-slate-400 transition-colors hover:text-slate-700"
        >
          {isUrdu ? 'پورا ٹور چھوڑ دیں' : 'Skip the entire tour'}
        </button>
      </section>
    </div>
  );
};
