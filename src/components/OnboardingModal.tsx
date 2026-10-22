import React, { useState } from 'react';
import { Sparkles, Mail, User, MapPin, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OnboardingModal: React.FC = () => {
  const { userProfile, updateUserProfile } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Islamabad');
  const [isEmailForm, setIsEmailForm] = useState(false);

  // If user has already completed onboarding, do not show
  if (userProfile.onboardingCompleted) {
    return null;
  }

  const handleGoogleSignup = () => {
    updateUserProfile({
      name: 'Muslim Seeker',
      email: 'user@islamforeveryone.com',
      city: city || 'Islamabad',
      onboardingCompleted: true
    });
  };

  const handleManualSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateUserProfile({
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@islamforeveryone.com`,
      city: city || 'Islamabad',
      onboardingCompleted: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-[#FDFBF7] dark:bg-[#0F172A] rounded-3xl shadow-2xl border-2 border-amber-400/50 overflow-hidden flex flex-col p-6 sm:p-8 text-center relative">
        {/* Decorative Top Arch Accent */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 border-2 border-amber-400 text-amber-300 mx-auto flex items-center justify-center shadow-lg mb-4">
          <span className="font-quran text-3xl font-bold">٣۶۰</span>
        </div>

        <h2 className="font-title text-2xl font-black text-emerald-950 dark:text-amber-200">
          Islam for Everyone
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          Welcome to your personal Islamic Knowledge, Holy Quran, Salah Streak, and Hadith Companion.
        </p>

        {!isEmailForm ? (
          <div className="mt-8 space-y-3">
            {/* Google One-Click Signup */}
            <button
              onClick={handleGoogleSignup}
              className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-stone-300 dark:border-slate-700 hover:border-amber-400 shadow-sm flex items-center justify-center gap-3 transition-all hover:scale-101 active:scale-98 font-bold text-xs text-slate-800 dark:text-slate-100 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Email form trigger */}
            <button
              onClick={() => setIsEmailForm(true)}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-850 hover:bg-emerald-900 text-amber-200 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Create Account with Name & Email</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleManualSignup} className="mt-6 space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Your Full Name / نام
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Abdullah Khan"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. abdullah@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Your Primary City (for exact Salah times)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-amber-400"
                >
                  <option value="Islamabad">Islamabad (Pakistan)</option>
                  <option value="Lahore">Lahore (Pakistan)</option>
                  <option value="Karachi">Karachi (Pakistan)</option>
                  <option value="Makkah">Makkah (Saudi Arabia)</option>
                  <option value="Madinah">Madinah (Saudi Arabia)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEmailForm(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-emerald-850 hover:bg-emerald-900 text-amber-200 font-bold text-xs shadow-md"
              >
                Complete Setup & Start
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Saved securely on your device. Never asked again.</span>
        </div>
      </div>
    </div>
  );
};
