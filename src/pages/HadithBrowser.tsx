import React, { useEffect, useState } from 'react';
import {
  BookMarked,
  Search,
  Filter,
  Bookmark as BookmarkIcon,
  Copy,
  Check,
  Share2,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { HadithDataProvider, HADITH_BOOKS, AUTHENTIC_HADITHS } from '../services/hadithData';
import { Hadith } from '../types';

export const HadithBrowser: React.FC = () => {
  const { language, addBookmark, removeBookmark, isBookmarked } = useApp();
  const t = useTranslation(language);

  const [selectedBookId, setSelectedBookId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hadiths, setHadiths] = useState<Hadith[]>(AUTHENTIC_HADITHS);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isActive = true;
    if (selectedBookId === 'all') {
      setHadiths(AUTHENTIC_HADITHS);
      setLoadError(null);
      setIsLoading(false);
      return () => { isActive = false; };
    }

    setIsLoading(true);
    setLoadError(null);
    HadithDataProvider.loadBook(selectedBookId)
      .then((records) => {
        if (isActive) setHadiths(records);
      })
      .catch((error: unknown) => {
        if (!isActive) return;
        setHadiths(AUTHENTIC_HADITHS.filter((record) => record.bookId === selectedBookId));
        setLoadError(error instanceof Error ? error.message : 'Unable to load this Hadith collection.');
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => { isActive = false; };
  }, [selectedBookId]);

  useEffect(() => setCurrentPage(1), [selectedBookId, selectedCategory, searchQuery]);

  // Filter Hadiths
  const filteredHadiths = hadiths.filter((h) => {
    const matchesBook = selectedBookId === 'all' || h.bookId === selectedBookId;
    if (!matchesBook) return false;
    const matchesCategory = selectedCategory === 'all' || h.tags.includes(selectedCategory);
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      String(h.hadithNumber).includes(q) ||
      h.textArabic.includes(searchQuery) ||
      h.textUrdu.includes(searchQuery) ||
      h.textEnglish.toLowerCase().includes(q) ||
      h.chapterTitleEnglish.toLowerCase().includes(q) ||
      h.chapterTitleUrdu.includes(searchQuery) ||
      h.narratorEnglish.toLowerCase().includes(q) ||
      h.narratorUrdu.includes(searchQuery) ||
      h.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });
  const hadithCategories = [...new Set(hadiths.flatMap((hadith) => hadith.tags))].sort();
  const pageSize = 40;
  const pageCount = Math.max(1, Math.ceil(filteredHadiths.length / pageSize));
  const visibleHadiths = filteredHadiths.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCopy = (h: Hadith) => {
    const text = `${h.textArabic}\n\nUrdu: ${h.textUrdu} (${h.narratorUrdu})\n\nEnglish: ${h.textEnglish} (${h.narratorEnglish})\n\nReference: ${h.reference} [${h.grade}]`;
    navigator.clipboard.writeText(text);
    setCopiedId(h.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleBookmark = (h: Hadith) => {
    const isSaved = isBookmarked('hadith', h.id);
    if (isSaved) {
      removeBookmark(`hadith-${h.id}-0`);
    } else {
      addBookmark({
        type: 'hadith',
        title: `${h.bookNameEnglish} #${h.hadithNumber}`,
        subtitle: language === 'ur' ? h.textUrdu : h.textEnglish,
        arabicPreview: h.textArabic,
        metadata: {
          hadithId: h.id
        }
      });
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-950 via-emerald-950 to-emerald-900 text-white p-6 sm:p-8 shadow-xl border border-amber-400/30">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'صحاحِ ستہ کی مصدقہ احادیث' : 'Sihah Sittah Canonical Collections'}</span>
          </div>
          <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-amber-200">
            {t.exploreHadith}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
            {language === 'ur'
              ? 'صحیح بخاری، صحیح مسلم اور دیگر معتبر کتبِ احادیث کے منتخب ابواب اور ارشاداتِ نبوی ﷺ کا مستند ذخیرہ۔'
              : 'Authentic collections of the sayings, actions, and virtues of the Prophet Muhammad ﷺ with scholarly gradings and verified references.'}
          </p>
        </div>
      </div>

      {/* Book Selection Carousel & Search */}
      <div className="rounded-3xl bg-white dark:bg-slate-800/90 border border-amber-200/80 dark:border-amber-900/60 p-4 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'ur'
                ? 'حدیث نمبر، راوی، عنوان یا متن تلاش کریں...'
                : 'Search by hadith number, topic, narrator, or keyword...'
            }
            className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-700 dark:text-amber-400" />
          <label htmlFor="hadith-category" className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            {language === 'ur' ? 'موضوع:' : 'Category:'}
          </label>
          <select
            id="hadith-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="max-w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-100"
          >
            <option value="all">{language === 'ur' ? 'تمام موضوعات' : 'All categories'}</option>
            {hadithCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <span className="text-[11px] text-slate-400">
            {selectedBookId === 'all'
              ? language === 'ur'
                ? `${hadiths.length} منتخب نمونہ احادیث؛ مکمل مجموعے کے لیے کتاب منتخب کریں`
                : `${hadiths.length} sample hadiths; select a book to load its full edition`
              : language === 'ur'
                ? `${hadiths.length.toLocaleString()} احادیث دستیاب`
                : `${hadiths.length.toLocaleString()} hadiths available`}
          </span>
        </div>

        {/* Books filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedBookId('all')}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedBookId === 'all'
                ? 'bg-emerald-850 text-amber-200 shadow-xs'
                : 'bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {t.allBooks}
          </button>
          {HADITH_BOOKS.map((book) => {
            const isSelected = selectedBookId === book.id;
            return (
              <button
                key={book.id}
                onClick={() => setSelectedBookId(book.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-emerald-850 text-amber-200 shadow-xs'
                    : 'bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                }`}
              >
                <span>{language === 'ur' ? book.nameUrdu : book.nameEnglish}</span>
                <span className="text-[10px] opacity-75 font-mono">({book.totalHadiths})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hadiths Listing */}
      <div className="space-y-4">
        {loadError && (
          <p role="alert" className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
            {loadError} {language === 'ur' ? 'فی الحال اس مجموعے کی مقامی منتخب احادیث دکھائی جا رہی ہیں۔' : 'Showing the locally bundled sample records for this book instead.'}
          </p>
        )}
        {isLoading ? (
          <div className="rounded-3xl border border-amber-200 bg-white p-12 text-center text-sm text-slate-500 dark:bg-slate-800">
            {language === 'ur' ? 'مکمل مجموعہ لوڈ ہو رہا ہے...' : 'Loading the complete collection...'}
          </div>
        ) : filteredHadiths.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-slate-400">
            <BookMarked className="w-10 h-10 mx-auto mb-2 text-slate-400" />
            <p className="text-sm">No Hadiths found matching &ldquo;{searchQuery}&rdquo;.</p>
          </div>
        ) : (
          visibleHadiths.map((h) => {
            const isSaved = isBookmarked('hadith', h.id);

            return (
              <div
                key={h.id}
                className="p-6 rounded-3xl border border-amber-200/70 dark:border-amber-900/50 bg-white dark:bg-slate-800/90 shadow-sm hover:border-amber-400 transition-all space-y-4"
              >
                {/* Hadith Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-amber-300 font-bold text-xs border border-emerald-300/40">
                      {h.bookNameEnglish} #{h.hadithNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      h.grade === 'Sahih' || h.grade === 'Muttafaq Alayh'
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40'
                        : h.grade === 'Unknown'
                          ? 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300/40'
                    }`}>
                      {h.grade}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Bookmark */}
                    <button
                      onClick={() => handleToggleBookmark(h)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                          : 'text-slate-400 hover:text-amber-500'
                      }`}
                      title="Bookmark Hadith"
                    >
                      <BookmarkIcon className={`w-4 h-4 ${isSaved ? 'fill-amber-500' : ''}`} />
                    </button>

                    {/* Copy */}
                    <button
                      onClick={() => handleCopy(h)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-800 dark:hover:text-amber-300 transition-colors"
                      title="Copy Hadith"
                    >
                      {copiedId === h.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Chapter Title & Narrator */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    <strong>{t.chapter}:</strong>{' '}
                    {language === 'ur' ? h.chapterTitleUrdu : h.chapterTitleEnglish}
                  </span>
                  <span>
                    <strong>{t.narrator}:</strong>{' '}
                    {language === 'ur' ? h.narratorUrdu : h.narratorEnglish}
                  </span>
                </div>

                {/* Arabic Text */}
                <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-slate-900/40 border border-amber-100 dark:border-slate-800 text-right">
                  <p className="font-quran text-2xl text-emerald-950 dark:text-amber-100 leading-loose">
                    {h.textArabic}
                  </p>
                </div>

                {/* Urdu Translation */}
                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-800 text-right">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 block mb-1">
                    اردو ترجمہ
                  </span>
                  <p className="font-nastaliq text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                    {h.textUrdu}
                  </p>
                </div>

                {/* English Translation */}
                <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-slate-800/40 border border-stone-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 block mb-1 uppercase tracking-wider">
                    English Translation
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {h.textEnglish}
                  </p>
                </div>

                {/* Footer Reference & Tags */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-400 border-t border-stone-100 dark:border-slate-700/60">
                  <span>{h.reference}</span>
                  <div className="flex items-center gap-1">
                    {h.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
        {!isLoading && filteredHadiths.length > pageSize && (
          <div className="flex items-center justify-center gap-4 rounded-2xl bg-white p-3 dark:bg-slate-800">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="rounded-lg p-2 text-emerald-800 disabled:opacity-40 dark:text-amber-300"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-xs text-slate-600 dark:text-slate-300">
              {currentPage} / {pageCount} · {filteredHadiths.length.toLocaleString()} results
            </span>
            <button
              disabled={currentPage >= pageCount}
              onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
              className="rounded-lg p-2 text-emerald-800 disabled:opacity-40 dark:text-amber-300"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
        <p className="text-center text-[10px] text-slate-400">
          {language === 'ur'
            ? 'مکمل مجموعے کا متن کھلے Hadith API ڈیٹا سے لوڈ ہوتا ہے؛ درجہ بندی نہ ہو تو اسے نامعلوم دکھایا جاتا ہے۔'
            : 'Collection text loads from the open Hadith API dataset. Missing grades are shown as unknown rather than guessed.'}{' '}
          <a href="https://github.com/fawazahmed0/hadith-api" target="_blank" rel="noreferrer" className="underline hover:text-emerald-700 dark:hover:text-amber-300">
            {language === 'ur' ? 'ماخذ اور لائسنس' : 'Source and license'}
          </a>
        </p>
      </div>
    </div>
  );
};
