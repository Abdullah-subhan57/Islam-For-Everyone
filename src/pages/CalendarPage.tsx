import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  BookOpen,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { CalendarService, ISLAMIC_EVENTS } from '../services/calendarData';
import { PrayerTimesService, HIJRI_MONTHS_EN, HIJRI_MONTHS_UR } from '../services/prayerTimes';
import { IslamicEvent } from '../types';

export const CalendarPage: React.FC = () => {
  const { language } = useApp();
  const t = useTranslation(language);

  const currentHijri = PrayerTimesService.getHijriDate();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentHijri.monthIndex + 1); // 1-12
  const [selectedDay, setSelectedDay] = useState<number>(currentHijri.day);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const daysInMonth = CalendarService.getDaysInHijriMonth(selectedMonth, currentHijri.year);
  const eventsInMonth = CalendarService.getEventsForMonth(selectedMonth);

  const selectedEvent = CalendarService.getEventForHijriDate(selectedDay, selectedMonth);

  const filteredEvents = eventsInMonth.filter((e) => {
    if (categoryFilter === 'all') return true;
    return e.category === categoryFilter;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Calendar Hero Header */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-slate-900 p-6 sm:p-8 shadow-sm border border-emerald-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-emerald-800 text-xs font-semibold border border-emerald-200">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'دوہرا ہجری و عیسوی تقویم' : 'Dual Hijri & Gregorian Calendar'}</span>
            </div>
            <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-emerald-950">
              {language === 'ur'
                ? `${HIJRI_MONTHS_UR[selectedMonth - 1]} ${currentHijri.year} ھ`
                : `${HIJRI_MONTHS_EN[selectedMonth - 1]} ${currentHijri.year} AH`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore key historical milestones, prophetic battles, treaty pacts, and blessed Islamic festivals.
            </p>
          </div>

          {/* Month Navigator Controls */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-emerald-200">
            <button
              onClick={() => setSelectedMonth((m) => (m === 1 ? 12 : m - 1))}
              className="p-2 rounded-xl text-emerald-800 hover:bg-emerald-50 transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
            <span className="font-bold text-xs px-3 text-emerald-950">
              {language === 'ur' ? HIJRI_MONTHS_UR[selectedMonth - 1] : HIJRI_MONTHS_EN[selectedMonth - 1]}
            </span>
            <button
              onClick={() => setSelectedMonth((m) => (m === 12 ? 1 : m + 1))}
              className="p-2 rounded-xl text-emerald-800 hover:bg-emerald-50 transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Monthly Interactive Calendar Grid */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-slate-700">
          <span className="font-title text-sm font-bold text-slate-800 dark:text-slate-100">
            {language === 'ur' ? 'ایامِ ماہ و تاریخی واقعات' : 'Days of the Month & Historic Dates'}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {daysInMonth} Days
          </span>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((dayNum) => {
            const isToday = selectedMonth === currentHijri.monthIndex + 1 && dayNum === currentHijri.day;
            const isSelected = dayNum === selectedDay;
            const eventOnDay = CalendarService.getEventForHijriDate(dayNum, selectedMonth);

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDay(dayNum)}
                className={`p-3 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between min-h-[75px] relative ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 dark:bg-emerald-950/40 ring-2 ring-amber-400/40 shadow-sm'
                    : 'border-stone-200 dark:border-slate-700/80 bg-stone-50/40 dark:bg-slate-900/40 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-mono text-base font-black ${
                      isToday
                        ? 'w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs'
                        : 'text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {eventOnDay && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  )}
                </div>

                {eventOnDay ? (
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 truncate w-full mt-1">
                    {language === 'ur' ? eventOnDay.titleUr : eventOnDay.titleEn}
                  </span>
                ) : (
                  <span className="text-[9px] text-slate-400">Normal</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Event Detailed Spotlight Card */}
      {selectedEvent ? (
        <div className="rounded-3xl bg-amber-50/70 dark:bg-slate-800/80 border-2 border-amber-400/60 p-6 sm:p-8 shadow-md space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500 text-emerald-950 font-bold">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400 block">
                  Event Spotlight • {selectedDay} {HIJRI_MONTHS_EN[selectedMonth - 1]} ({selectedEvent.yearAH || ''})
                </span>
                <h3 className="font-title text-lg sm:text-xl font-bold text-emerald-950 dark:text-amber-200">
                  {language === 'ur' ? selectedEvent.titleUr : selectedEvent.titleEn}
                </h3>
              </div>
            </div>

            <span className="text-xs uppercase font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
              {selectedEvent.category}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {selectedEvent.descriptionEn}
          </p>

          <p className="font-nastaliq text-base sm:text-lg text-emerald-950 dark:text-amber-100 text-right pt-2 border-t border-amber-200/80 dark:border-slate-700 leading-loose">
            {selectedEvent.descriptionUr}
          </p>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700 text-center text-xs text-slate-400">
          No special major historical battle or festival recorded on day {selectedDay} of {HIJRI_MONTHS_EN[selectedMonth - 1]}. Tap any day with a golden dot to view historical events!
        </div>
      )}

      {/* All Events in Selected Month Catalog */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-200 dark:border-slate-700">
          <h3 className="font-title text-base font-bold text-slate-800 dark:text-slate-100">
            Historical Events in {HIJRI_MONTHS_EN[selectedMonth - 1]} ({eventsInMonth.length})
          </h3>

          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              <option value="all">All Categories</option>
              <option value="prophetic">Prophetic Events</option>
              <option value="battle">Historical Battles</option>
              <option value="festivity">Festivities & Ibadat</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => setSelectedDay(ev.hijriDay)}
              className="p-4 rounded-2xl border border-stone-200 dark:border-slate-700 hover:border-amber-400 bg-stone-50/50 dark:bg-slate-900/50 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-slate-700">
                    {ev.hijriDay} {HIJRI_MONTHS_EN[selectedMonth - 1]}
                  </span>
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                    {language === 'ur' ? ev.titleUr : ev.titleEn}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{ev.descriptionEn}</p>
              </div>

              <span className="text-[11px] font-mono text-slate-400 shrink-0">
                {ev.yearAH || ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
