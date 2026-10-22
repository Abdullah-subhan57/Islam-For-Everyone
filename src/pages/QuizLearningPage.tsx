import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Award,
  Volume2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { QUIZ_QUESTIONS, ASMA_UL_HUSNA, speakHolyName } from '../services/quizData';
import { TasbihAudioFeedback } from '../services/tasbihPresets';
import { QuizQuestion } from '../types';

export const QuizLearningPage: React.FC = () => {
  const { language, userProfile } = useApp();
  const t = useTranslation(language);

  // Sub-tabs: 'quiz' | 'names'
  const [subTab, setSubTab] = useState<'quiz' | 'names'>('quiz');

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizBadgeUnlocked, setQuizBadgeUnlocked] = useState(() => {
    try {
      return localStorage.getItem('islam360_quiz_completion_badge') === 'true';
    } catch {
      return false;
    }
  });

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    if (isCorrect) {
      setScore((s) => s + 1);
      TasbihAudioFeedback.playTargetReachedChime();
    } else {
      TasbihAudioFeedback.playClickSound();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
      setQuizBadgeUnlocked(true);
      try {
        localStorage.setItem('islam360_quiz_completion_badge', 'true');
      } catch (error) {
        console.error('Unable to save the quiz completion badge:', error);
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const playNameAudioTone = () => {
    TasbihAudioFeedback.playClickSound();
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Page Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-emerald-950 to-teal-950 text-white p-6 sm:p-8 shadow-xl border border-amber-400/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'علمی آزمائش و اسمائے حسنیٰ' : 'Islamic Knowledge & 99 Names'}</span>
            </div>
            <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-amber-200">
              {t.quizTitle}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              {t.quizSubtitle}
            </p>
          </div>

          {/* Sub-tab switcher */}
          <div className="flex items-center bg-emerald-900/60 p-1 rounded-2xl border border-amber-400/30">
            <button
              onClick={() => setSubTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                subTab === 'quiz'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              {t.quiz}
            </button>
            <button
              onClick={() => setSubTab('names')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                subTab === 'names'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              {t.names99}
            </button>
          </div>
        </div>
      </div>

      {/* QUIZ TAB */}
      {subTab === 'quiz' && (
        <div className="max-w-2xl mx-auto space-y-6">
          {!quizCompleted ? (
            <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Progress & Score Bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-stone-100 dark:border-slate-700">
                <span className="font-semibold text-emerald-800 dark:text-amber-300 uppercase tracking-wider">
                  {t.question} {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-slate-900 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                  {t.score}: {score}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-stone-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`
                  }}
                ></div>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-700">
                  {currentQ.category.toUpperCase()} • {currentQ.difficulty.toUpperCase()}
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {currentQ.questionEnglish}
                </h3>
                <p className="font-nastaliq text-lg sm:text-xl text-emerald-950 dark:text-amber-100 text-right leading-loose">
                  {currentQ.questionUrdu}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.optionsEnglish.map((optEn, idx) => {
                  const optUr = currentQ.optionsUrdu[idx];
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let borderClass = 'border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900';
                  if (isSelected && !isAnswerSubmitted) {
                    borderClass = 'border-amber-500 bg-amber-50/60 dark:bg-slate-800 ring-2 ring-amber-400/30';
                  } else if (isAnswerSubmitted) {
                    if (isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30';
                    } else if (isSelected) {
                      borderClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-2xl border text-left rtl:text-right transition-all flex items-center justify-between gap-3 cursor-pointer ${borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0 text-slate-700 dark:text-slate-300">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                            {optEn}
                          </div>
                          <div className="font-nastaliq text-base text-slate-600 dark:text-slate-300">
                            {optUr}
                          </div>
                        </div>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box when submitted */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-900/60 border border-amber-200/80 dark:border-amber-800/40 space-y-2 animate-in fade-in duration-300">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    <span>{t.explanation}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentQ.explanationEnglish}
                  </p>
                  <p className="font-nastaliq text-base text-slate-800 dark:text-slate-200 text-right leading-loose">
                    {currentQ.explanationUrdu}
                  </p>
                  {currentQ.reference && (
                    <span className="text-[11px] text-slate-400 block pt-1">
                      {t.reference}: {currentQ.reference}
                    </span>
                  )}
                </div>
              )}

              {/* Submit / Next Button */}
              <div className="pt-2 flex justify-end">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs bg-emerald-850 hover:bg-emerald-900 text-amber-200 disabled:opacity-40 shadow-md transition-all cursor-pointer"
                  >
                    {t.submitAnswer}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-emerald-950 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentQuestionIndex + 1 < QUIZ_QUESTIONS.length
                        ? t.nextQuestion
                        : 'View Final Result'}
                    </span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed Scorecard */
            <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-8 text-center shadow-xl space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center mx-auto shadow-xl">
                <Trophy className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-title text-2xl font-extrabold text-emerald-950 dark:text-amber-300">
                  {t.quizCompleted}
                </h3>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                  {score >= QUIZ_QUESTIONS.length * 0.7 ? t.excellent : t.goodJob}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 max-w-sm mx-auto">
                <span className="text-xs text-slate-400 uppercase tracking-widest block">
                  Your Final Score
                </span>
                <span className="font-mono text-5xl font-extrabold text-emerald-800 dark:text-amber-400 my-2 block">
                  {score} / {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-500">
                  {Math.round((score / QUIZ_QUESTIONS.length) * 100)}% Correct Answers
                </span>
              </div>

              <button
                onClick={handleRestartQuiz}
                className="px-6 py-3 rounded-xl font-bold text-xs bg-emerald-850 hover:bg-emerald-900 text-amber-200 shadow-md transition-all inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.playAgain}</span>
              </button>
              {quizBadgeUnlocked && (
                <div className="mx-auto max-w-md rounded-2xl border border-amber-300 bg-amber-50 p-4 text-left dark:bg-slate-900">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-amber-200">
                    <Award className="h-5 w-5 text-amber-500" />
                    {language === 'ur' ? 'علمی کوئز مکمل کرنے کا بیج' : 'Knowledge Seeker badge earned'}
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {language === 'ur'
                      ? 'آپ نے مکمل کوئز کامیابی سے ختم کر لیا۔ اپنا سرٹیفکیٹ پرنٹ کریں یا PDF میں محفوظ کریں۔'
                      : 'You completed the full quiz. Print your certificate or save it as a PDF.'}
                  </p>
                  <button onClick={() => window.print()} className="mt-3 rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-amber-100">
                    {language === 'ur' ? 'سرٹیفکیٹ حاصل کریں' : 'Print certificate'}
                  </button>
                </div>
              )}
              <section className="quiz-certificate">
                <div className="certificate-frame">
                  <p className="certificate-brand">Islam for Everyone</p>
                  <h1>{language === 'ur' ? 'تکمیلِ کوئز کا سرٹیفکیٹ' : 'Certificate of Completion'}</h1>
                  <p>{language === 'ur' ? 'یہ سند عطا کی جاتی ہے' : 'This certificate is presented to'}</p>
                  <h2>{userProfile.name || 'Muslim Seeker'}</h2>
                  <p>{language === 'ur' ? 'اسلامی معلومات کا کوئز مکمل کرنے پر' : 'for completing the Islamic Knowledge Quiz'}</p>
                  <strong>{score} / {QUIZ_QUESTIONS.length} · {Math.round((score / QUIZ_QUESTIONS.length) * 100)}%</strong>
                  <p>{new Date().toLocaleDateString(language === 'ur' ? 'ur-PK' : 'en-US')}</p>
                </div>
              </section>
            </div>
          )}
        </div>
      )}

      {/* 99 NAMES OF ALLAH (ASMA-UL-HUSNA) TAB */}
      {subTab === 'names' && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-title text-xl font-bold text-emerald-950 dark:text-amber-300">
              {t.asmaUlHusnaTitle}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 italic font-serif">
              {t.asmaUlHusnaSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ASMA_UL_HUSNA.map((item) => (
              <div
                key={item.number}
                onClick={() => {
                  TasbihAudioFeedback.playClickSound();
                  speakHolyName(item.nameArabic, item.nameEnglish);
                }}
                className="p-5 rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/70 dark:border-amber-900/50 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    #{item.number}
                  </span>
                  <Volume2 className="w-4 h-4 text-slate-300 hover:text-emerald-700" />
                </div>

                <div className="text-center my-3">
                  <h4 className="font-quran text-3xl sm:text-4xl text-emerald-950 dark:text-amber-200 py-1">
                    {item.nameArabic}
                  </h4>
                  <span className="text-xs font-serif font-bold text-emerald-800 dark:text-emerald-400 block mt-1">
                    {item.transliteration}
                  </span>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-slate-700/60 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">
                      {item.nameEnglish}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.meaningEnglish}
                    </p>
                  </div>

                  <div className="text-right pt-1">
                    <span className="font-nastaliq text-base text-emerald-950 dark:text-amber-200 block">
                      {item.nameUrdu}
                    </span>
                    <p className="font-nastaliq text-xs text-slate-600 dark:text-slate-400">
                      {item.meaningUrdu}
                    </p>
                  </div>

                  {item.quranicReference && (
                    <span className="text-[10px] text-slate-400 block pt-1">
                      {item.quranicReference}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
