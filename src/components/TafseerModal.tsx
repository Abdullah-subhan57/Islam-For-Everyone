import React from 'react';
import { X, BookOpen, Sparkles, Share2, Copy, Check } from 'lucide-react';
import { AyahTafseer, Ayah } from '../types';
import { useTranslation } from '../services/translations';
import { useApp } from '../context/AppContext';

interface TafseerModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayah: Ayah | null;
  tafseer: AyahTafseer | null;
  surahName: string;
}

export const TafseerModal: React.FC<TafseerModalProps> = ({
  isOpen,
  onClose,
  ayah,
  tafseer,
  surahName
}) => {
  const { language } = useApp();
  const t = useTranslation(language);
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !ayah || !tafseer) return null;

  const handleCopy = () => {
    const text = `${ayah.textArabic}\n\n[Urdu Tafseer]:\n${tafseer.tafseerUrdu}\n\n[English Tafseer]:\n${tafseer.tafseerEnglish}\n\nSource: ${tafseer.source} (${surahName}:${ayah.numberInSurah})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FDFBF7] dark:bg-[#0F172A] rounded-3xl shadow-2xl border border-amber-300/40 dark:border-amber-900/60 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-200/60 dark:border-amber-900/40 bg-stone-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title text-base font-bold text-slate-800 dark:text-slate-100">
                {language === 'ur' ? 'تفسیر و مفہوم' : 'Ayah Tafseer & Commentary'}
              </h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                {surahName} : Ayah {ayah.numberInSurah} • {tafseer.source}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg text-slate-400 hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
              title="Copy Tafseer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Ayah Arabic Box */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-900/50 border border-amber-200/60 dark:border-slate-800 text-right">
            <p className="font-quran text-2xl text-emerald-950 dark:text-amber-100 leading-loose">
              {ayah.textArabicIndopak || ayah.textArabic}
            </p>
          </div>

          {/* Urdu Tafseer Section */}
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تفسیر ابن کثیر و معارف القرآن (اردو)</span>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-800">
              <p className="font-nastaliq text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-loose">
                {tafseer.tafseerUrdu}
              </p>
            </div>
          </div>

          {/* English Tafseer Section */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>English Commentary & Context</span>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/50 border border-stone-200 dark:border-slate-800">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {tafseer.tafseerEnglish}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-amber-200/60 dark:border-amber-900/40 bg-stone-50 dark:bg-slate-900/60 flex justify-between items-center text-xs text-slate-400">
          <span>Source: {tafseer.source}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-bold bg-emerald-850 hover:bg-emerald-900 text-amber-200 shadow-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
