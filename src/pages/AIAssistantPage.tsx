import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, LoaderCircle, RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  AssistantAvailability,
  AssistantMessage,
  checkAssistantAvailability,
  sendAssistantMessage
} from '../services/assistantApi';
import { ALL_114_SURAHS, QuranDataProvider } from '../services/quranData';
import { PageId } from '../types';

interface ChatMessage extends AssistantMessage {
  id: number;
}

interface AIAssistantPageProps {
  compact?: boolean;
  onClose?: () => void;
}

const normalizeSurahText = (value: string) =>
  value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\u0600-\u06ff]/g, '');

const surahAliases: Record<number, string[]> = {
  1: ['fatiha', 'fatihah'],
  2: ['baqarah', 'baqara'],
  18: ['kahf', 'kahaf'],
  36: ['yaseen', 'yasin'],
  55: ['rahman', 'arrahman'],
  56: ['waqiah', 'waqia'],
  67: ['mulk'],
  112: ['ikhlas', 'ikhlas'],
  113: ['falaq', 'falak'],
  114: ['nas', 'naas']
};

export const AIAssistantPage: React.FC<AIAssistantPageProps> = ({ compact = false, onClose }) => {
  const {
    language,
    assistantMemory,
    setAssistantMemory,
    setActivePage,
    setSelectedSurahNum,
    selectedSurahNum,
    selectedAyahNum,
    setSelectedIbadatGuide,
    playSurah,
    playAdhan,
    openTafseer
  } = useApp();
  const isUrdu = language === 'ur';
  const messages = assistantMemory;
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const setMessages = (update: ChatMessage[] | ((previous: ChatMessage[]) => ChatMessage[])) => {
    const next = typeof update === 'function' ? update(messagesRef.current) : update;
    const retained = next.slice(-1000);
    messagesRef.current = retained;
    setAssistantMemory(retained);
  };
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [assistantAvailability, setAssistantAvailability] = useState<AssistantAvailability>('unavailable');
  const messageListRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(messages.reduce((maximum, message) => Math.max(maximum, message.id + 1), 0));

  useEffect(() => {
    let isMounted = true;
    void checkAssistantAvailability().then((availability) => {
      if (isMounted) setAssistantAvailability(availability);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages, isSending]);

  const submitMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || isSending) return;

    const userMessage: ChatMessage = {
      id: nextMessageId.current++,
      role: 'user',
      content
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setIsSending(true);

    const contextMessages = nextMessages.slice(-12);
    while (contextMessages[0]?.role === 'assistant') contextMessages.shift();

    try {
      const normalized = content.toLocaleLowerCase();
      const openPage = (page: PageId, replyEn: string, replyUr: string) => {
        setActivePage(page);
        return isUrdu ? replyUr : replyEn;
      };
      let localReply: string | null = null;

      if (/(?:adhan|azan|اذان).*(?:play|listen|چل|سن)|(?:play|listen|چلاؤ|سناؤ).*(?:adhan|azan|اذان)/i.test(normalized)) {
        playAdhan();
        localReply = isUrdu ? 'اذان کی آڈیو چلانے کی درخواست بھیج دی ہے۔' : 'I started the Adhan audio.';
      } else if (/(?:qibla|qiblah|قبلہ|compass)/i.test(normalized)) {
        localReply = openPage('qibla', 'I opened the Qibla compass.', 'قبلہ نما کھول دیا ہے۔');
      } else if (/(?:tasbih|tasbeeh|dhikr|zikr|تسبیح|ذکر)/i.test(normalized)) {
        localReply = openPage('tasbih', 'I opened the Tasbih counter.', 'تسبیح کاؤنٹر کھول دیا ہے۔');
      } else if (/(?:calendar|hijri date|islamic date|تقویم|ہجری تاریخ)/i.test(normalized)) {
        localReply = openPage('calendar', 'I opened the Islamic calendar.', 'اسلامی کیلنڈر کھول دیا ہے۔');
      } else if (/(?:99 names|asma.?ul husna|names of Allah|اسماء الحسنیٰ|اللہ کے نام)/i.test(normalized)) {
        localReply = openPage('names99', 'I opened the 99 Names of Allah.', 'اسمائے حسنیٰ کھول دیے ہیں۔');
      } else if (/(?:quiz|test my knowledge|کوئز|سوالات)/i.test(normalized)) {
        localReply = openPage('quiz', 'I opened the learning quiz.', 'سیکھنے والا کوئز کھول دیا ہے۔');
      } else if (/(?:history|seerah|سیرت|اسلامی تاریخ)/i.test(normalized)) {
        localReply = openPage('history', 'I opened Islamic history.', 'اسلامی تاریخ کھول دی ہے۔');
      } else if (/(?:open|show|go to|کھول|دکھا).*(?:ibadat|worship|عبادات)/i.test(normalized)) {
        localReply = openPage('ibadat', 'I opened the Ibadat guide.', 'عبادات گائیڈ کھول دی ہے۔');
      } else if (/(?:open|show|go to|کھول|دکھا).*(?:tracker|account|profile|streak|progress|کھاتہ|پروفائل|پیش رفت)/i.test(normalized)) {
        localReply = openPage('account', 'I opened your account and Salah tracker.', 'آپ کا اکاؤنٹ اور نماز ٹریکر کھول دیا ہے۔');
      } else if (/(?:open|show|go to|کھول|دکھا).*(?:home|dashboard|ہوم|ڈیش بورڈ)/i.test(normalized)) {
        localReply = openPage('home', 'I opened the home dashboard.', 'ہوم ڈیش بورڈ کھول دیا ہے۔');
      } else if (/(?:prayer time|namaz time|نماز کے اوقات|نماز کا وقت|اوقاتِ نماز|open prayer|open namaz|نماز کھول)/i.test(normalized)) {
        localReply = openPage('prayer', 'I opened Prayer Times. You can edit the times there.', 'نماز کے اوقات کا صفحہ کھول دیا ہے؛ وہاں اوقات تبدیل بھی کر سکتے ہیں۔');
      } else if (/(?:hadith|hadees|حدیث|احادیث)/i.test(normalized) && /(?:open|show|find|کھول|دکھا|تلاش)/i.test(normalized)) {
        localReply = openPage('hadith', 'I opened the Hadith collections.', 'حدیث کی کتب کھول دی ہیں۔');
      } else if (/(?:tafsir|tafseer|تفسیر)/i.test(normalized) && /(?:open|show|کھول|دکھا)/i.test(normalized)) {
        const loaded = await QuranDataProvider.getSurahWithAyahs(selectedSurahNum);
        const ayah = loaded.ayahs?.find((item) => item.numberInSurah === selectedAyahNum) ?? loaded.ayahs?.[0];
        if (ayah) {
          openTafseer(selectedSurahNum, ayah);
          localReply = isUrdu
            ? `سورۂ ${loaded.nameUrdu} کی آیت ${ayah.numberInSurah} کی تفسیر کھول دی ہے۔`
            : `I opened the tafseer for ${loaded.nameEnglish}, verse ${ayah.numberInSurah}.`;
        } else {
          localReply = openPage('quran', 'I opened the Quran. Select a verse to view its tafseer.', 'قرآن کھول دیا ہے؛ تفسیر کے لیے کوئی آیت منتخب کریں۔');
        }
      } else if (/(?:quran|قرآن|قرات|تلاوت|recit|surah|سورۃ|سورہ)/i.test(normalized)) {
        const queryText = normalizeSurahText(normalized);
        const surah = ALL_114_SURAHS.find((item) =>
          queryText.includes(normalizeSurahText(item.nameEnglish)) ||
          queryText.includes(normalizeSurahText(item.nameUrdu)) ||
          queryText.includes(normalizeSurahText(item.nameArabic)) ||
          (surahAliases[item.number] ?? []).some((alias) => queryText.includes(normalizeSurahText(alias)))
        );
        const wantsAudio = /(?:play|recit|listen|audio|چلاؤ|سناؤ|تلاوت|آواز)/i.test(normalized);
        if (surah && wantsAudio) {
          const loaded = await QuranDataProvider.getSurahWithAyahs(surah.number);
          if (loaded.ayahs?.length) {
            setSelectedSurahNum(surah.number);
            setActivePage('quran');
            playSurah(surah.number, loaded.ayahs);
            localReply = isUrdu
              ? `سورۂ ${surah.nameUrdu} کی تلاوت شروع کر دی ہے۔`
              : `I started reciting Surah ${surah.nameEnglish}.`;
          } else {
            localReply = openPage('quran', 'The Quran audio/data is unavailable right now. Check your internet connection and try again.', 'قرآن کی آڈیو یا معلومات فی الحال دستیاب نہیں؛ انٹرنیٹ چیک کرکے دوبارہ کوشش کریں۔');
          }
        } else {
          localReply = openPage(
            'quran',
            surah ? `I opened Surah ${surah.nameEnglish}.` : 'I opened the Quran. Choose a Surah to read or listen.',
            surah ? `سورۂ ${surah.nameUrdu} کھول دی ہے۔` : 'قرآن کھول دیا ہے؛ پڑھنے یا سننے کے لیے سورۃ منتخب کریں۔'
          );
          if (surah) setSelectedSurahNum(surah.number);
        }
      } else if (/(?:zakat|zakah|زکو[ٰۃہ])/i.test(normalized)) {
        setSelectedIbadatGuide('zakat');
        localReply = openPage('ibadat', 'I opened the Zakat steps in the Ibadat guide.', 'عبادات گائیڈ میں زکوٰۃ کے مراحل کھول دیے ہیں۔');
      } else if (/(?:hajj|حج|umrah|عمرہ|fast|fasting|roza|روزہ|ghusl|غسل|salah|namaz|نماز)/i.test(normalized)) {
        const guide = /(?:hajj|حج)/i.test(normalized)
          ? 'hajj'
          : /(?:umrah|عمرہ)/i.test(normalized)
            ? 'umrah'
            : /(?:fast|fasting|roza|روزہ)/i.test(normalized)
              ? 'fasting'
              : /(?:ghusl|غسل)/i.test(normalized)
                ? 'ghusl'
                : 'salah';
        setSelectedIbadatGuide(guide);
        localReply = openPage('ibadat', 'I opened the step-by-step Ibadat guide.', 'عبادات کی مرحلہ وار رہنمائی کھول دی ہے۔');
      } else if (/(?:dua|duas|دعا|دعائیں|اذکار)/i.test(normalized)) {
        localReply = openPage('duas', 'I opened Duas & Azkar.', 'دعائیں اور اذکار کھول دیے ہیں۔');
      }

      if (localReply) {
        setMessages((current) => [
          ...current,
          { id: nextMessageId.current++, role: 'assistant', content: localReply }
        ]);
        if (onClose) window.setTimeout(onClose, 700);
        return;
      }

      const reply = await sendAssistantMessage(
        contextMessages.map(({ role, content: messageContent }) => ({
          role,
          content: messageContent
        })),
        language
      );
      setMessages((current) => [
        ...current,
        { id: nextMessageId.current++, role: 'assistant', content: reply }
      ]);
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : (isUrdu ? 'جواب حاصل نہیں ہو سکا۔ دوبارہ کوشش کریں۔' : 'The assistant could not reply. Please try again.')
      );
    } finally {
      setIsSending(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    nextMessageId.current = 0;
    setInput('');
    setError(null);
  };

  const suggestedQuestions = isUrdu
    ? ['اس ایپ میں اذان کی یاد دہانی کیسے لگاؤں؟', 'اسلام میں زکوٰۃ کا عمومی مقصد کیا ہے؟']
    : ['How do I set prayer reminders in this app?', 'What is the general purpose of zakat in Islam?'];

  return (
    <section className={`mx-auto flex flex-col gap-5 ${compact ? 'h-full max-w-none' : 'max-w-4xl pb-8'}`}>
      <header className={`flex flex-wrap items-center justify-between gap-3 ${isUrdu ? 'text-right' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-900 p-3 text-amber-300">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className={`text-xl font-bold text-emerald-950 dark:text-amber-200 ${isUrdu ? 'font-nastaliq' : ''}`}>
              {isUrdu ? 'اسلامی معاون' : 'Islamic Assistant'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {isUrdu ? 'اسلامی معلومات اور ایپ استعمال کرنے میں مدد' : 'General Islamic information and help using the app'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clearConversation}
            disabled={messages.length === 0 && !error}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-amber-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <RotateCcw className="h-4 w-4" />
            {isUrdu ? 'گفتگو صاف کریں' : 'Clear chat'}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={isUrdu ? 'معاون بند کریں' : 'Close assistant'}
              className="rounded-xl border border-stone-200 bg-white p-2 text-slate-600 transition hover:border-amber-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col rounded-3xl border border-amber-200 bg-white p-4 shadow-sm dark:border-amber-900/50 dark:bg-slate-900 sm:p-6">
        <div
          ref={messageListRef}
          role="log"
          aria-live="polite"
          aria-label={isUrdu ? 'گفتگو' : 'Conversation'}
          className={`flex min-h-64 flex-1 flex-col gap-4 overflow-y-auto ${compact ? 'max-h-[calc(100vh-18rem)]' : 'max-h-[55vh]'}`}
        >
          {messages.length === 0 && (
            <div className="m-auto max-w-lg text-center">
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-amber-500" />
              <h3 className={`mb-2 font-semibold text-emerald-950 dark:text-amber-200 ${isUrdu ? 'font-nastaliq' : ''}`}>
                {isUrdu ? 'آپ کس بارے میں جاننا چاہتے ہیں؟' : 'What would you like to know?'}
              </h3>
              <p className="mb-5 text-sm text-slate-600 dark:text-slate-300">
                {isUrdu
                  ? 'یہ معاون عمومی رہنمائی دیتا ہے، مستند عالمِ دین یا فتویٰ کا متبادل نہیں۔'
                  : 'This assistant offers general guidance, not a substitute for a qualified scholar or a fatwa.'}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => setInput(question)}
                    className="rounded-full border border-emerald-200 px-3 py-2 text-xs text-emerald-900 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-200 dark:hover:bg-slate-800"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'self-end bg-emerald-900 text-white'
                  : 'self-start bg-stone-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
              }`}
              dir={isUrdu ? 'rtl' : 'auto'}
            >
              {message.content}
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-2 self-start rounded-2xl bg-stone-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              {isUrdu ? 'جواب تیار ہو رہا ہے…' : 'Preparing a reply…'}
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200">
            {error}
          </p>
        )}

        {assistantAvailability !== 'ready' && (
          <p role="status" className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100" dir={isUrdu ? 'rtl' : 'ltr'}>
            {assistantAvailability === 'needs-key'
              ? (isUrdu
                ? 'AI کے عام جوابات بند ہیں: Gemini key سیٹ نہیں۔ .env.example کو .env میں نقل کرکے GEMINI_API_KEY اپنی فائل میں درج کریں، پھر npm run dev دوبارہ چلائیں۔'
                : 'AI answers are disabled: Gemini is not configured. Copy .env.example to .env, add GEMINI_API_KEY locally, then restart npm run dev.')
              : (isUrdu
                ? 'AI سرور منسلک نہیں۔ موجودہ dev server بند کرکے npm run dev دوبارہ چلائیں؛ ایپ کے مقامی actions پھر بھی دستیاب ہیں۔'
                : 'AI server is not connected. Stop the existing dev server and restart with npm run dev. Local app actions still work.')}
          </p>
        )}

        <form onSubmit={submitMessage} className="mt-5 flex items-end gap-2">
          <label htmlFor="assistant-message" className="sr-only">
            {isUrdu ? 'اپنا سوال لکھیں' : 'Write your question'}
          </label>
          <textarea
            id="assistant-message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            maxLength={4000}
            rows={2}
            disabled={isSending}
            placeholder={isUrdu ? 'اپنا سوال لکھیں…' : 'Ask a question…'}
            className={`min-h-12 flex-1 resize-y rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 ${isUrdu ? 'text-right' : ''}`}
            dir={isUrdu ? 'rtl' : 'auto'}
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            aria-label={isUrdu ? 'سوال بھیجیں' : 'Send question'}
            className="rounded-2xl bg-emerald-900 p-3 text-amber-200 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <p className={`mt-2 text-xs text-slate-500 dark:text-slate-400 ${isUrdu ? 'text-right' : ''}`}>
          {isUrdu
            ? 'قرآن، نماز، حدیث اور عبادات کے مقامی actions انٹرنیٹ کے بغیر بھی دستیاب ہیں؛ عمومی سوالات کے لیے Gemini سرور درکار ہے۔ ذاتی حساس معلومات نہ بھیجیں۔'
            : 'Local Quran, prayer, Hadith, and worship actions work without the AI server. General answers require the Gemini server. Do not share sensitive personal information.'}
        </p>
      </div>
    </section>
  );
};
