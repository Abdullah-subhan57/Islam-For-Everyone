import React, { FormEvent, useState } from 'react';
import { Github, LoaderCircle, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AuthGateProps {
  onContinueAsGuest?: () => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({ onContinueAsGuest }) => {
  const {
    language,
    setLanguage,
    authReady,
    authDataReady,
    authUser,
    authConfigured,
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
    <main className="auth-screen flex min-h-[100svh] items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
      <section className="auth-card w-full max-w-md rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <a
            href="https://github.com/Abdullah-subhan57/Islam-For-Everyone"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the project on GitHub"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900"
          >
            <Github aria-hidden="true" className="h-4 w-4" />
            GitHub
          </a>
          <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
            <button type="button" onClick={() => setLanguage('en')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${!isUrdu ? 'bg-emerald-900 text-amber-200' : 'text-slate-500'}`}>EN</button>
            <button type="button" onClick={() => setLanguage('ur')} className={`rounded-lg px-3 py-1 text-xs font-semibold ${isUrdu ? 'bg-emerald-900 text-amber-200' : 'text-slate-500'}`}>اردو</button>
          </div>
        </div>
        <div className="mb-6 text-center">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-teal-700">
            {isUrdu ? 'آپ کا ذاتی اسلامی ساتھی' : 'Your personal Islamic companion'}
          </p>
          <h1 className={`text-2xl font-black text-slate-900 sm:text-3xl ${isUrdu ? 'font-nastaliq' : ''}`}>
            {isUrdu ? 'اسلام فار ایوری ون' : 'Islam for Everyone'}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {isUrdu ? 'اپنی محفوظ عبادت کی یادداشت کے لیے سائن اِن کریں' : 'Sign in to keep your worship progress and assistant memory safe'}
          </p>
        </div>

        {!authReady ? (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-600">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {isUrdu ? 'اکاؤنٹ لوڈ ہو رہا ہے…' : 'Loading your account…'}
          </div>
        ) : authUser && !authDataReady ? (
          <div className="space-y-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950">
            <p>{isUrdu ? 'اکاؤنٹ کا محفوظ ڈیٹا لوڈ نہیں ہو سکا۔ Supabase کی schema/RLS ترتیب چیک کریں۔' : 'Your account data could not be loaded. Check the Supabase schema and RLS setup.'}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="classic-primary-button w-full rounded-xl px-4 py-2.5 font-bold"
            >
              {isUrdu ? 'دوبارہ کوشش کریں' : 'Try again'}
            </button>
            <button
              type="button"
              onClick={() => void signOut().catch((error: unknown) => {
                setLocalError(error instanceof Error ? error.message : 'Sign-out failed.');
              })}
              className="classic-secondary-button w-full rounded-xl px-4 py-2 font-semibold"
            >
              {isUrdu ? 'لاگ آؤٹ' : 'Sign out'}
            </button>
          </div>
        ) : !authConfigured ? (
          <div className="space-y-4">
            <p className="rounded-xl border border-teal-100 bg-teal-50/80 px-4 py-3 text-sm leading-6 text-teal-950">
              {isUrdu
                ? 'اکاؤنٹ سائن اِن ابھی ترتیب نہیں دیا گیا۔ آپ مہمان کے طور پر ایپ استعمال کر سکتے ہیں؛ اس ڈیوائس کا ڈیٹا مقامی طور پر محفوظ ہوگا۔'
                : 'Account sign-in has not been configured yet. You can use the app as a guest; progress will be saved on this device.'}
            </p>
            <button
              type="button"
              onClick={onContinueAsGuest}
              className="classic-primary-button flex min-h-12 w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold"
            >
              {isUrdu ? 'مہمان کے طور پر جاری رکھیں' : 'Continue as guest'}
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleGoogleSignIn()}
              className="classic-secondary-button flex min-h-12 w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-bold disabled:opacity-60"
            >
              <span aria-hidden="true" className="font-black text-lg text-blue-600">G</span>
              {isUrdu ? 'Google اکاؤنٹ سے جاری رکھیں' : 'Continue with Google'}
            </button>

            <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              {isUrdu ? 'یا ای میل سے' : 'or continue with email'}
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={(event) => void handleEmailSubmit(event)} className="space-y-3">
              <label className="block space-y-1 text-xs font-semibold text-slate-600">
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
                    className="classic-input w-full rounded-xl py-3 pl-10 pr-3 text-sm text-slate-900"
                    placeholder="you@example.com"
                  />
                </span>
              </label>
              {codeSent && (
                <label className="block space-y-1 text-xs font-semibold text-slate-600">
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
                    className="classic-input w-full rounded-xl px-3 py-3 text-sm tracking-[0.3em] text-slate-900"
                  />
                </label>
              )}
              <button
                type="submit"
                disabled={busy}
                className="classic-primary-button flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold disabled:opacity-60"
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
                  className="w-full rounded-lg py-2 text-xs font-semibold text-emerald-800 transition-colors hover:text-teal-700 hover:underline"
                >
                  {isUrdu ? 'ای میل تبدیل کریں' : 'Use a different email'}
                </button>
              )}
            </form>
          </>
        )}

        {(localError || authError) && (
          <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
            {localError ?? authError}
          </p>
        )}
        <p className="mt-5 text-center text-[11px] leading-5 text-slate-500">
          {isUrdu
            ? 'Google sign-in اور ای میل کوڈ Supabase کے ذریعے تصدیق ہوتے ہیں۔ تصدیق کے بعد آپ کا ڈیٹا آپ کے اکاؤنٹ کے ساتھ محفوظ ہوگا۔'
            : 'Google sign-in and email codes are verified by Supabase. Your data is saved to your account after sign-in.'}
        </p>
      </section>
    </main>
  );
};
