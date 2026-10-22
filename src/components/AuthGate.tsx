import React, { FormEvent, useState } from 'react';
import { BookOpen, LoaderCircle, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthGate: React.FC = () => {
  const {
    language,
    setLanguage,
    authReady,
    authDataReady,
    authUser,
    authError,
    signInWithGoogle,
    requestEmailCode,
    verifyEmailCode,
    signOut
  } = useApp();
  const isUrdu = language === 'ur';
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setBusy(true);
    setLocalError(null);
    try {
      await signInWithGoogle();
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : 'Google sign-in failed.');
      setBusy(false);
    }
  };

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setLocalError(null);
    try {
      if (codeSent) {
        await verifyEmailCode(email, code);
      } else {
        await requestEmailCode(email);
        setCodeSent(true);
      }
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : 'Email verification failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-arabesque-light px-4 py-10 dark:bg-arabesque-dark">
      <section className="w-full max-w-md rounded-3xl border border-amber-300/70 bg-white p-6 shadow-2xl dark:border-amber-900/60 dark:bg-slate-900 sm:p-8">
        <div className="mb-6 flex justify-end gap-1 rounded-xl bg-stone-100 p-1 dark:bg-slate-800">
          <button type="button" onClick={() => setLanguage('en')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${!isUrdu ? 'bg-emerald-900 text-amber-200' : 'text-slate-500'}`}>EN</button>
          <button type="button" onClick={() => setLanguage('ur')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${isUrdu ? 'bg-emerald-900 text-amber-200' : 'text-slate-500'}`}>اردو</button>
        </div>
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="mb-3 rounded-2xl bg-emerald-950 p-3 text-amber-300">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className={`text-2xl font-black text-emerald-950 dark:text-amber-200 ${isUrdu ? 'font-nastaliq' : ''}`}>
            {isUrdu ? 'اسلام فار ایوری ون' : 'Islam for Everyone'}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {isUrdu ? 'اپنی محفوظ عبادت کی یادداشت کے لیے سائن اِن کریں' : 'Sign in to keep your worship progress and assistant memory safe'}
          </p>
        </div>

        {!authReady ? (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-600 dark:text-slate-300">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {isUrdu ? 'اکاؤنٹ لوڈ ہو رہا ہے…' : 'Loading your account…'}
          </div>
        ) : authUser && !authDataReady ? (
          <div className="space-y-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
            <p>{isUrdu ? 'اکاؤنٹ کا محفوظ ڈیٹا لوڈ نہیں ہو سکا۔ Supabase کی schema/RLS ترتیب چیک کریں۔' : 'Your account data could not be loaded. Check the Supabase schema and RLS setup.'}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full rounded-xl bg-emerald-900 px-4 py-2 font-bold text-amber-200"
            >
              {isUrdu ? 'دوبارہ کوشش کریں' : 'Try again'}
            </button>
            <button
              type="button"
              onClick={() => void signOut().catch((error: unknown) => {
                setLocalError(error instanceof Error ? error.message : 'Sign-out failed.');
              })}
              className="w-full rounded-xl border border-amber-700/30 px-4 py-2 font-semibold"
            >
              {isUrdu ? 'لاگ آؤٹ' : 'Sign out'}
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleGoogleSignIn()}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-amber-400 hover:shadow-sm disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <span className="font-black text-lg text-blue-600">G</span>
              {isUrdu ? 'Google اکاؤنٹ سے جاری رکھیں' : 'Continue with Google'}
            </button>

            <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-stone-200 dark:bg-slate-700" />
              {isUrdu ? 'یا ای میل سے' : 'or continue with email'}
              <span className="h-px flex-1 bg-stone-200 dark:bg-slate-700" />
            </div>

            <form onSubmit={(event) => void handleEmailSubmit(event)} className="space-y-3">
              <label className="block space-y-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {isUrdu ? 'ای میل' : 'Email address'}
                <span className="relative block">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={codeSent || busy}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="you@example.com"
                  />
                </span>
              </label>
              {codeSent && (
                <label className="block space-y-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {isUrdu ? 'ای میل پر بھیجا گیا تصدیقی کوڈ' : 'Email verification code'}
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    minLength={6}
                    maxLength={8}
                    value={code}
                    onChange={(event) => setCode(event.target.value.replace(/\s/g, ''))}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm tracking-[0.3em] text-slate-900 outline-none focus:border-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>
              )}
              <button
                type="submit"
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-4 py-3 text-sm font-bold text-amber-200 transition hover:bg-emerald-800 active:scale-[0.99] disabled:opacity-60"
              >
                {busy && <LoaderCircle className="h-4 w-4 animate-spin" />}
                {codeSent
                  ? (isUrdu ? 'کوڈ کی تصدیق کریں' : 'Verify code and sign in')
                  : (isUrdu ? 'تصدیقی کوڈ بھیجیں' : 'Send verification code')}
              </button>
              {codeSent && (
                <button
                  type="button"
                  onClick={() => {
                    setCodeSent(false);
                    setCode('');
                    setLocalError(null);
                  }}
                  className="w-full py-2 text-xs font-semibold text-emerald-800 hover:underline dark:text-emerald-300"
                >
                  {isUrdu ? 'ای میل تبدیل کریں' : 'Use a different email'}
                </button>
              )}
            </form>
          </>
        )}

        {(localError || authError) && (
          <p role="alert" className="mt-4 rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
            {localError ?? authError}
          </p>
        )}
        <p className="mt-5 text-center text-[11px] leading-5 text-slate-500 dark:text-slate-400">
          {isUrdu
            ? 'Google sign-in اور ای میل کوڈ Supabase کے ذریعے تصدیق ہوتے ہیں۔ تصدیق کے بعد آپ کا ڈیٹا آپ کے اکاؤنٹ کے ساتھ محفوظ ہوگا۔'
            : 'Google sign-in and email codes are verified by Supabase. Your data is saved to your account after sign-in.'}
        </p>
      </section>
    </main>
  );
};
