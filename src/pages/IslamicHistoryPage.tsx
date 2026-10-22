import React, { useState } from 'react';
import {
  Shield,
  Search,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  Crown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { PROPHETS_HISTORY, CALIPHS_HISTORY, ISLAMIC_DYNASTIES } from '../services/historyData';
import { HistoryFigure } from '../types';

export const IslamicHistoryPage: React.FC = () => {
  const { language } = useApp();
  const t = useTranslation(language);

  const [activeTab, setActiveTab] = useState<'prophets' | 'caliphs' | 'dynasties'>('prophets');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('prophet-muhammad');

  const list: HistoryFigure[] = activeTab === 'prophets'
    ? PROPHETS_HISTORY
    : activeTab === 'caliphs'
      ? CALIPHS_HISTORY
      : ISLAMIC_DYNASTIES;

  const filteredList = list.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.nameEn.toLowerCase().includes(q) ||
      item.nameUr.includes(searchQuery) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.titleUr.includes(searchQuery) ||
      item.eraEn.toLowerCase().includes(q) ||
      item.eraUr.includes(searchQuery) ||
      item.summaryEn.toLowerCase().includes(q) ||
      item.summaryUr.includes(searchQuery) ||
      item.keyEventsEn.some((event) => event.toLowerCase().includes(q)) ||
      item.keyEventsUr.some((event) => event.includes(searchQuery))
    );
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-950 via-emerald-950 to-teal-950 text-white p-6 sm:p-8 shadow-xl border border-amber-400/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
              <Crown className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'قصص الانبیاء و تاریخِ خلافت' : 'Prophetic Legacies & Caliphate History'}</span>
            </div>
            <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-amber-200">
              {language === 'ur' ? 'تاریخِ اسلام و اسوۂ صالحین' : 'Islamic History & Righteous Forebears'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              Timelines of the noble Prophets and Khulafa-e-Rashideen with historical achievements, character, and spiritual lessons.
            </p>
          </div>

          {/* Sub-tab switcher */}
          <div className="flex items-center bg-emerald-900/60 p-1 rounded-2xl border border-amber-400/30">
            <button
              onClick={() => {
                setActiveTab('prophets');
                setExpandedId('prophet-muhammad');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'prophets'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              {language === 'ur' ? 'انبیاء کرامؑ' : 'Prophets (AS)'}
            </button>
            <button
              onClick={() => {
                setActiveTab('caliphs');
                setExpandedId('caliph-abu-bakr');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'caliphs'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              {language === 'ur' ? 'خلفائے راشدینؓ' : 'Caliphs (RA)'}
            </button>
            <button
              onClick={() => {
                setActiveTab('dynasties');
                setExpandedId('dynasty-umayyad');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dynasties'
                  ? 'bg-amber-400 text-emerald-950 shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              {language === 'ur' ? 'سلطنتیں و خلافتیں' : 'Dynasties & Caliphates'}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-4 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'ur'
                ? 'نبی، خلیفہ، سلطنت یا دور تلاش کریں...'
                : 'Search prophets, caliphs, dynasties, or historical events...'
            }
            className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-amber-400"
          />
        </div>
      </div>

      {/* Figures Timeline Cards */}
      <div className="space-y-4">
        {filteredList.map((figure) => {
          const isExpanded = expandedId === figure.id;

          return (
            <div
              key={figure.id}
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                isExpanded
                  ? 'bg-white dark:bg-slate-800/95 border-amber-400 shadow-lg ring-1 ring-amber-400/30'
                  : 'bg-white/80 dark:bg-slate-800/80 border-stone-200 dark:border-slate-700 hover:border-amber-300'
              }`}
            >
              {/* Card Header (clickable to expand/collapse) */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : figure.id)}
                className="flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 flex items-center justify-center font-bold text-lg border border-amber-400/30 shadow-xs">
                    {figure.nameEn.charAt(figure.nameEn.indexOf(' ') + 1 || 0)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-title text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                        {language === 'ur' ? figure.nameUr : figure.nameEn}
                      </h3>
                    </div>

                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                      {language === 'ur' ? figure.titleUr : figure.titleEn} • <span className="font-mono opacity-80">{language === 'ur' ? figure.eraUr : figure.eraEn}</span>
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-stone-100 dark:bg-slate-700/60 text-slate-500">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Expanded Detailed View */}
              {isExpanded && (
                <div className="mt-6 pt-5 border-t border-stone-200 dark:border-slate-700 space-y-6 animate-in fade-in duration-200">
                  {/* Summary */}
                  <div className="space-y-2">
                    <p className={`${language === 'ur' ? 'font-nastaliq text-right text-base sm:text-lg leading-loose' : 'font-sans text-xs sm:text-sm leading-relaxed'} text-slate-700 dark:text-slate-300`}>
                      {language === 'ur' ? figure.summaryUr : figure.summaryEn}
                    </p>
                  </div>

                  {/* Key Historical Milestones */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      {language === 'ur' ? 'اہم تاریخی سنگِ میل و واقعات' : 'Key Historical Milestones'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {figure.keyEventsEn.map((ev, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <div>
                            <p className={`${language === 'ur' ? 'font-nastaliq text-right text-sm' : 'text-xs'} text-slate-800 dark:text-slate-200 font-medium`}>
                              {language === 'ur' ? figure.keyEventsUr?.[idx] : ev}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lessons & Moral Heritage */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-900/60 border border-amber-200/80 dark:border-amber-800/40 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>{language === 'ur' ? 'اسوہ و بصیرت' : 'Spiritual Moral & Leadership Lesson'}</span>
                    </div>
                    <p className={`${language === 'ur' ? 'font-nastaliq text-right text-base' : 'text-xs leading-relaxed'} text-slate-700 dark:text-slate-300 pt-1`}>
                      {language === 'ur' ? figure.lessonsUr : figure.lessonsEn}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
