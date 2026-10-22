import React, { useState } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, FileCode, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../services/translations';
import { QuranDataProvider } from '../services/quranData';

export const DatasetModal: React.FC = () => {
  const { isDatasetModalOpen, setIsDatasetModalOpen, language } = useApp();
  const t = useTranslation(language);

  const [jsonText, setJsonText] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isDatasetModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
      processJson(content);
    };
    reader.readAsText(file);
  };

  const processJson = (raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      const success = QuranDataProvider.importCustomDataset(parsed);
      if (success) {
        setStatusMessage({
          type: 'success',
          text: t.importSuccess
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: t.importError
        });
      }
    } catch (e: any) {
      setStatusMessage({
        type: 'error',
        text: `${t.importError} ${e.message || ''}`
      });
    }
  };

  const handleManualImport = () => {
    if (!jsonText.trim()) return;
    processJson(jsonText);
  };

  const handleDownloadTemplate = () => {
    const sample = {
      "1": [
        {
          "number": 1,
          "numberInSurah": 1,
          "juz": 1,
          "textArabic": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          "textArabicIndopak": "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
          "translationUrdu": "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے",
          "translationEnglish": "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
          "transliteration": "Bismillāhir-Raḥmānir-Raḥīm",
          "audioUrl": "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
        }
      ]
    };

    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quran_dataset_schema_sample.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#FDFBF7] dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-amber-300/40 dark:border-amber-900/60 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-amber-200/60 dark:border-amber-900/40 bg-stone-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h2 className="font-title text-base font-bold text-slate-800 dark:text-slate-100">
              {t.importDataset}
            </h2>
          </div>
          <button
            onClick={() => setIsDatasetModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {t.importDatasetDesc}
          </p>

          {/* Upload Drop Box */}
          <div className="border-2 border-dashed border-amber-300/60 dark:border-amber-900/60 rounded-xl p-6 text-center hover:bg-amber-50/40 dark:hover:bg-slate-800/40 transition-colors">
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              id="quran-file-upload"
            />
            <label
              htmlFor="quran-file-upload"
              className="cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              <FileCode className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-semibold text-emerald-950 dark:text-amber-200">
                Click to browse or drop local Quran .json file
              </span>
              <span className="text-[11px] text-slate-400">
                Supports standard formats: Surah indexed objects or full datasets
              </span>
            </label>
          </div>

          {/* Paste JSON directly */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Or paste custom JSON directly:
              </label>
              <button
                onClick={handleDownloadTemplate}
                className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
              >
                <Download className="w-3 h-3" />
                Download sample JSON schema
              </button>
            </div>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="Paste JSON here..."
              rows={4}
              className="w-full text-xs font-mono p-3 rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-amber-400"
            />
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl flex items-center gap-2 text-xs font-medium ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40'
                  : 'bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300/40'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-200/60 dark:border-amber-900/40 bg-stone-50 dark:bg-slate-900/50 flex justify-end gap-2">
          <button
            onClick={() => setIsDatasetModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-800"
          >
            Close
          </button>
          <button
            onClick={handleManualImport}
            disabled={!jsonText.trim()}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-850 hover:bg-emerald-900 text-amber-200 disabled:opacity-50 transition-colors shadow-xs"
          >
            Apply Dataset
          </button>
        </div>
      </div>
    </div>
  );
};
