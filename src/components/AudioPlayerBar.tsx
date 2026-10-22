import React, { useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, FastForward } from 'lucide-react';
import { MediaSession } from '@capgo/capacitor-media-session';
import { useApp } from '../context/AppContext';
import { QuranDataProvider } from '../services/quranData';

export const AudioPlayerBar: React.FC = () => {
  const { audioState, pauseAudio, resumeAudio, stopAudio, setPlaybackSpeed, language } = useApp();
  const controlsRef = useRef({ pauseAudio, resumeAudio, stopAudio });
  controlsRef.current = { pauseAudio, resumeAudio, stopAudio };
  const audioElement = audioState.audioElement;
  const audioElementRef = useRef(audioElement);
  audioElementRef.current = audioElement;
  const currentAyah = audioState.currentAyah;
  const surahMeta = audioState.currentSurahNum
    ? QuranDataProvider.getSurahMeta(audioState.currentSurahNum)
    : null;
  const surahName = surahMeta
    ? language === 'ur'
      ? surahMeta.nameUrdu
      : surahMeta.nameEnglish
    : audioState.currentSurahNum
      ? `Surah ${audioState.currentSurahNum}`
      : '';

  useEffect(() => {
    void Promise.all([
      MediaSession.setMetadata({
        title: currentAyah ? `${surahName} · Ayah ${currentAyah.numberInSurah}` : 'Quran Recitation',
        artist: 'Mishary Rashid Alafasy',
        album: 'Islam for Everyone',
        artwork: [{ src: new URL('/favicon.svg', window.location.origin).href, sizes: '64x64', type: 'image/svg+xml' }]
      }),
      MediaSession.setPlaybackState({
        playbackState: currentAyah ? (audioState.isPlaying ? 'playing' : 'paused') : 'none'
      })
    ]).catch((error: unknown) => {
      console.error('Unable to update lock-screen recitation controls:', error);
    });
  }, [currentAyah, audioState.isPlaying, language, surahName]);

  useEffect(() => {
    if (!audioElement) return;
    let lastPositionUpdate = 0;
    const updatePosition = (force = false) => {
      const now = Date.now();
      if (!force && now - lastPositionUpdate < 5_000) return;
      if (!Number.isFinite(audioElement.duration) || audioElement.duration <= 0) return;
      lastPositionUpdate = now;
      void MediaSession.setPositionState({
        duration: audioElement.duration,
        position: Math.min(audioElement.currentTime, audioElement.duration),
        playbackRate: audioElement.playbackRate
      }).catch((error: unknown) => {
        console.error('Unable to update lock-screen recitation position:', error);
      });
    };
    const handlePositionChange = () => updatePosition();
    updatePosition(true);
    audioElement.addEventListener('loadedmetadata', handlePositionChange);
    audioElement.addEventListener('timeupdate', handlePositionChange);
    audioElement.addEventListener('seeked', handlePositionChange);
    audioElement.addEventListener('ratechange', handlePositionChange);
    return () => {
      audioElement.removeEventListener('loadedmetadata', handlePositionChange);
      audioElement.removeEventListener('timeupdate', handlePositionChange);
      audioElement.removeEventListener('seeked', handlePositionChange);
      audioElement.removeEventListener('ratechange', handlePositionChange);
    };
  }, [audioElement, audioState.isPlaying, audioState.playbackSpeed]);

  useEffect(() => {
    const registerActions = async () => {
      await Promise.all([
        MediaSession.setActionHandler({ action: 'play' }, () => controlsRef.current.resumeAudio()),
        MediaSession.setActionHandler({ action: 'pause' }, () => controlsRef.current.pauseAudio()),
        MediaSession.setActionHandler({ action: 'stop' }, () => controlsRef.current.stopAudio()),
        MediaSession.setActionHandler({ action: 'seekto' }, (details) => {
          const element = audioElementRef.current;
          if (element && typeof details.seekTime === 'number') {
            element.currentTime = Math.min(Math.max(details.seekTime, 0), element.duration || 0);
          }
        })
      ]);
    };
    void registerActions().catch((error: unknown) => {
      console.error('Unable to register lock-screen recitation controls:', error);
    });

    return () => {
      void Promise.all([
        MediaSession.setPlaybackState({ playbackState: 'none' }),
        MediaSession.setActionHandler({ action: 'play' }, null),
        MediaSession.setActionHandler({ action: 'pause' }, null),
        MediaSession.setActionHandler({ action: 'stop' }, null),
        MediaSession.setActionHandler({ action: 'seekto' }, null)
      ]).catch((error: unknown) => {
        console.error('Unable to clear lock-screen recitation controls:', error);
      });
    };
  }, []);

  if (!currentAyah || !audioState.currentSurahNum) {
    return null;
  }

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
              Ayah {currentAyah.numberInSurah}
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
