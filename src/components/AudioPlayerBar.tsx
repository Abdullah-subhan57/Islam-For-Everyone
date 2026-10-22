import React from 'react';
import { Play, Pause, Square, Volume2, FastForward } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QuranDataProvider } from '../services/quranData';

export const AudioPlayerBar: React.FC = () => {
  const { audioState, pauseAudio, resumeAudio, stopAudio, setPlaybackSpeed, language } = useApp();

  if (!audioState.currentAyah || !audioState.currentSurahNum) {
    return null;
  }

  const surahMeta = QuranDataProvider.getSurahMeta(audioState.currentSurahNum);
  const surahName = surahMeta
    ? language === 'ur'
      ? surahMeta.nameUrdu
      : surahMeta.nameEnglish
    : `Surah ${audioState.currentSurahNum}`;

  const nextSpeed =
    audioState.playbackSpeed === 1.0
      ? 1.25
      : audioState.playbackSpeed === 1.25
      ? 1.5
      : audioState.playbackSpeed === 1.5
      ? 0.75
      : 1.0;

  return (
    <aside aria-label="Audio Recitation Player" className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto z-40 bg-emerald-950/95 text-amber-100 rounded-2xl p-3 border border-amber-400/30 shadow-2xl backdrop-blur-md transition-all animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-3">
        {/* Reciter & Verse Details */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-amber-400/20 flex items-center justify-center shrink-0 text-amber-300">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-amber-300 truncate">{surahName}</span>
              <span className="text-xs bg-emerald-800 text-amber-200 px-2 py-0.5 rounded-full border border-emerald-700">
                Ayah {audioState.currentAyah.numberInSurah}
              </span>
            </div>
            <p className="text-[11px] text-emerald-300/80 truncate">
              {audioState.error
                ? audioState.error
                : audioState.queuedSurahNum
                  ? 'Full surah recitation • مشاري راشد العفاسي'
                  : 'Qari Mishary Rashid Alafasy • مشاري راشد العفاسي'}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Speed Toggle */}
          <button
            onClick={() => setPlaybackSpeed(nextSpeed)}
            className="px-2 py-1 rounded bg-emerald-900/80 text-[11px] font-mono text-amber-300 border border-emerald-700/60 hover:bg-emerald-800 transition-colors"
            title="Playback Speed"
          >
            {audioState.playbackSpeed}x
          </button>

          {/* Play / Pause */}
          {audioState.isPlaying ? (
            <button
              onClick={pauseAudio}
              className="w-9 h-9 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center hover:bg-amber-300 shadow-md transition-transform active:scale-95 cursor-pointer"
              title="Pause"
            >
              <Pause className="w-4 h-4 fill-emerald-950" />
            </button>
          ) : (
            <button
              onClick={resumeAudio}
              className="w-9 h-9 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center hover:bg-amber-300 shadow-md transition-transform active:scale-95 cursor-pointer"
              title="Play"
            >
              <Play className="w-4 h-4 fill-emerald-950 ml-0.5" />
            </button>
          )}

          {/* Stop / Close */}
          <button
            onClick={stopAudio}
            className="p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/50 transition-colors"
            title="Close Player"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
