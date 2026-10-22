import React from 'react';
import { ArrowRight, Github, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  const { language } = useApp();
  const isUrdu = language === 'ur';

  return (
    <main className="welcome-screen relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-10 sm:px-8">
      <div aria-hidden="true" className="welcome-orbit welcome-orbit-one" />
      <div aria-hidden="true" className="welcome-orbit welcome-orbit-two" />
      <section className="welcome-card relative z-10 mx-auto flex w-full max-w-xl flex-col items-center px-6 py-10 text-center sm:px-12 sm:py-14">
        <div className="welcome-logo-frame mb-7">
          <span aria-hidden="true" className="welcome-logo-glow" />
          <img
            src="/favicon.svg"
            alt=""
            className="welcome-logo"
            width="88"
            height="88"
          />
        </div>
        <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-teal-700 sm:text-xs">
          <Sparkles aria-hidden="true" className="h-4 w-4" />
          {isUrdu ? 'علم • عبادت • سکون' : 'Knowledge · Worship · Peace'}
        </p>
        <h1 className={`${isUrdu ? 'font-nastaliq' : 'font-title'} text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl`}>
          {isUrdu ? 'اسلام فار ایوری ون' : 'Islam for Everyone'}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
          {isUrdu
            ? 'قرآن، عبادت اور روزمرہ اسلامی زندگی کے لیے آپ کا پُرسکون ساتھی۔'
            : 'A calm companion for Quran, worship, and the rhythms of everyday Muslim life.'}
        </p>
        <div aria-hidden="true" className="my-8 flex items-center gap-3 text-teal-700/70">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-teal-600/50" />
          <span className="font-quran text-2xl">بِسْمِ اللَّهِ</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-teal-600/50" />
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="classic-primary-button group inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-sm font-bold sm:text-base"
        >
          {isUrdu ? 'شروع کریں' : 'Begin your journey'}
          <ArrowRight aria-hidden="true" className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isUrdu ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
        </button>
        <a
          href="https://github.com/Abdullah-subhan57/Islam-For-Everyone"
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          <Github aria-hidden="true" className="h-4 w-4" />
          {isUrdu ? 'GitHub پر پراجیکٹ دیکھیں' : 'View the project on GitHub'}
        </a>
      </section>
    </main>
  );
};
