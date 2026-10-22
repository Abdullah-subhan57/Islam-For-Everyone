import { TasbihPreset } from '../types';

export const TASBIH_PRESETS: TasbihPreset[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    urdu: 'سبحان اللہ (اللہ پاک ہے ہر عیب سے)',
    english: 'SubhanAllah (Glory be to Allah)',
    transliteration: 'Subḥānallāh',
    target: 33,
    meaning: 'Allah is free from every imperfection and flaw.',
    benefit: 'Wipes away minor sins and plants a fruitful palm tree in Paradise.'
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    urdu: 'الحمد للہ (سب تعریفیں اللہ ہی کے لیے ہیں)',
    english: 'Alhamdulillah (Praise be to Allah)',
    transliteration: 'Al-ḥamdulillāh',
    target: 33,
    meaning: 'All praise and gratitude belong exclusively to Allah.',
    benefit: 'The Prophet ﷺ said: Alhamdulillah fills the celestial scale (Mizan).'
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    urdu: 'اللہ اکبر (اللہ سب سے بڑا ہے)',
    english: 'Allahu Akbar (Allah is the Greatest)',
    transliteration: 'Allāhu Akbar',
    target: 34,
    meaning: 'Allah is greater than all creation and worldly anxieties.',
    benefit: 'Completes the 100-tasbih following obligatory prayers (Tasbih Fatimi).'
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    urdu: 'استغفر اللہ واتوب الیہ (میں اللہ سے بخشش مانگتا ہوں)',
    english: 'Astaghfirullaha wa atubu ilayh (I seek forgiveness)',
    transliteration: 'Astaghfirullāha wa atūbu ilayh',
    target: 100,
    meaning: 'Humble repentance and turning back to the Creator.',
    benefit: 'Relieves distress, grants unexpected sustenance, and brings profound tranquility.'
  },
  {
    id: 'la-ilaha-illallah',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    urdu: 'لا الہ الا اللہ وحدہ لا شریک لہ',
    english: 'Kalima Tawheed (None worthy of worship except Allah)',
    transliteration: 'Lā ilāha illallāhu waḥdahū lā sharīka lah',
    target: 100,
    meaning: 'Pure Monotheism; the declaration of divine unity.',
    benefit: 'Equivalent to emancipating ten slaves and serves as a fortress against evil.'
  },
  {
    id: 'salawat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    urdu: 'درود شریف (اللہم صل علی محمد و علی آل محمد)',
    english: 'Salawat / Durood upon Prophet Muhammad ﷺ',
    transliteration: 'Allāhumma ṣalli \'alā Muḥammadin wa \'alā āli Muḥammad',
    target: 100,
    meaning: 'Invoking divine peace and blessings upon the Beloved Messenger.',
    benefit: 'Whoever sends one blessing, Allah sends ten blessings upon him and elevates him.'
  },
  {
    id: 'ayat-kareema',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    urdu: 'آیتِ کریمہ (دعا حضرت یونس علیہ السلام)',
    english: 'Ayat-e-Kareema (Supplication of Prophet Yunus AS)',
    transliteration: 'Lā ilāha illā Anta subḥānaka innī kuntu minaẓ-ẓālimīn',
    target: 100,
    meaning: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    benefit: 'No Muslim calls upon Allah with this in distress except that Allah relieves him.'
  },
  {
    id: 'hasbunallah',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    urdu: 'حسبنا اللہ ونعم الوکیل (ہمیں اللہ کافی ہے اور وہی بہترین کارساز ہے)',
    english: 'Hasbunallahu wa ni\'mal-Wakīl',
    transliteration: 'Ḥasbunallāhu wa ni\'mal-Wakīl',
    target: 100,
    meaning: 'Sufficient for us is Allah, and He is the supreme Disposer of affairs.',
    benefit: 'Recited by Prophet Ibrahim (AS) in the fire and the Sahabah at Uhud.'
  },
  {
    id: 'subhanallahi-wa-bihamdihi',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    urdu: 'سبحان اللہ وبحمدہ سبحان اللہ العظیم',
    english: 'SubhanAllahi wa bihamdihi, SubhanAllahil-Azeem',
    transliteration: 'Subḥānallāhi wa biḥamdihī, Subḥānallāhil-\'Aẓīm',
    target: 100,
    meaning: 'Glory be to Allah and His is the praise; Glory be to Allah the Supreme.',
    benefit: 'Two words light on the tongue, heavy on the scale, most beloved to the Most Merciful.'
  },
  {
    id: 'hawqala',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
    urdu: 'لاحول ولا قوۃ الا باللہ العلی العظیم',
    english: 'La hawla wa la quwwata illa billah (Treasure of Jannah)',
    transliteration: 'Lā ḥawla wa lā quwwata illā billāhil-\'Aliyyil-\'Aẓīm',
    target: 100,
    meaning: 'There is no power and no strength except through Allah.',
    benefit: 'One of the treasures of Paradise; shields against anxiety and cures 99 illnesses.'
  },
  {
    id: 'dua-musa',
    arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
    urdu: 'ربِ انی لما انزلت الی من خیر فقیر',
    english: 'Supplication of Prophet Musa (AS) for provision & help',
    transliteration: 'Rabbi innī limā anzalta ilayya min khayrin faqīr',
    target: 33,
    meaning: 'My Lord, indeed I am, for whatever good You would send down to me, in need.',
    benefit: 'Direct Quranic prayer for good marriage, halal employment, and divine shelter.'
  }
];

export class TasbihAudioFeedback {
  private static audioCtx: AudioContext | null = null;

  private static getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      try {
        const AudioClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioClass) {
          this.audioCtx = new AudioClass();
        }
      } catch {
        return null;
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  static playClickSound() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  }

  static playTargetReachedChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
      });
    } catch {}
  }

  static triggerHaptic(duration = 20) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(duration);
      } catch {}
    }
  }
}
