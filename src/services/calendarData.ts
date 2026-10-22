import { IslamicEvent } from '../types';

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  // 1. Muharram
  {
    id: 'ev-1-1',
    hijriMonth: 1,
    hijriDay: 1,
    titleEn: 'Islamic New Year (Al-Hijrah)',
    titleUr: 'آغازِ سالِ نو ہجری',
    yearAH: '1 AH',
    descriptionEn: 'The beginning of the Islamic lunar calendar, marking the migration of Prophet Muhammad ﷺ from Makkah to Madinah.',
    descriptionUr: 'اسلامی نئے سال کا آغاز، جو نبی کریم ﷺ کی مکہ سے مدینہ کی طرف ہجرت مبارکہ کی یاد دلاتا ہے۔',
    category: 'festivity'
  },
  {
    id: 'ev-1-10',
    hijriMonth: 1,
    hijriDay: 10,
    titleEn: 'Day of Ashura & Karbala',
    titleUr: 'یومِ عاشورہ و شہادتِ امام حسینؓ',
    yearAH: '61 AH',
    descriptionEn: 'Deliverance of Prophet Musa (AS) from Pharaoh and the martyrdom of Sayyiduna Imam Hussain (RA) and his companions at Karbala.',
    descriptionUr: 'حضرت موسیٰ علیہ السلام کی فرعون سے نجات اور میدانِ کربلا میں سیدنا امام حسین رضی اللہ عنہ اور رفقا کی لازوال شہادت۔',
    category: 'battle'
  },

  // 2. Safar
  {
    id: 'ev-2-27',
    hijriMonth: 2,
    hijriDay: 27,
    titleEn: 'Departure from Cave of Thawr',
    titleUr: 'غارِ ثور سے مدینہ کی طرف روانگی',
    yearAH: '1 AH',
    descriptionEn: 'Prophet Muhammad ﷺ and Abu Bakr as-Siddiq (RA) commenced their historic journey towards Madinah al-Munawwarah.',
    descriptionUr: 'حضور اقدس ﷺ اور حضرت ابوبکر صدیق رضی اللہ عنہ کی غارِ ثور سے مدینہ منورہ کی طرف تاریخی روانگی۔',
    category: 'prophetic'
  },

  // 3. Rabi' al-Awwal
  {
    id: 'ev-3-12',
    hijriMonth: 3,
    hijriDay: 12,
    titleEn: 'Mawlid an-Nabi ﷺ (Birth of the Beloved Prophet)',
    titleUr: 'ولادت با سعادت ختم المرسلین ﷺ',
    yearAH: '53 BH (571 CE)',
    descriptionEn: 'The blessed arrival of the Mercy to the Worlds, Prophet Muhammad ﷺ, in Makkah al-Mukarramah.',
    descriptionUr: 'رحمتِ دوعالم، شفیعِ امم، حضرت محمد مصطفیٰ ﷺ کی ولادتِ باسعادت کا مبارک ترین دن۔',
    category: 'prophetic'
  },

  // 4. Rabi' ath-Thani
  {
    id: 'ev-4-10',
    hijriMonth: 4,
    hijriDay: 10,
    titleEn: 'Treaty of Hudaybiyyah Consummation',
    titleUr: 'صلح حدیبیہ کا تاریخی واقعہ',
    yearAH: '6 AH',
    descriptionEn: 'The peace treaty that the Quran designated as a "manifest victory" (Fathan Mubeena).',
    descriptionUr: 'صلح حدیبیہ کا تاریخی معاہدہ جسے قرآن مجید نے ’’فتح مبین‘‘ قرار دیا۔',
    category: 'prophetic'
  },

  // 5. Jumada al-Ula
  {
    id: 'ev-5-5',
    hijriMonth: 5,
    hijriDay: 5,
    titleEn: 'Battle of Mu\'tah',
    titleUr: 'غزوۂ موتہ',
    yearAH: '8 AH',
    descriptionEn: 'Heroic confrontation led by Zaid ibn Harithah, Ja\'far ibn Abi Talib, and Khalid ibn al-Walid (Sayfullah).',
    descriptionUr: 'شام کی سرحد پر مسلمانوں کا رومی لشکر سے مقابلہ، جس میں حضرت خالد بن ولیدؓ نے سیف اللہ کا اعزاز پایا۔',
    category: 'battle'
  },

  // 7. Rajab
  {
    id: 'ev-7-27',
    hijriMonth: 7,
    hijriDay: 27,
    titleEn: 'Al-Isra\' wal-Mi\'raj (Night Journey & Ascension)',
    titleUr: 'معراج النبی ﷺ و فرضیتِ نماز',
    yearAH: 'Before Hijrah',
    descriptionEn: 'Miraculous night journey of the Prophet ﷺ to Masjid al-Aqsa and ascension through the heavens, where the five daily prayers were ordained.',
    descriptionUr: 'مسجد حرام سے مسجد اقصی اور وہاں سے سدرۃ المنہیٰ کا معجزاتی سفر، جس میں پانچ وقت کی نماز فرض کی گئی۔',
    category: 'prophetic'
  },

  // 8. Sha'ban
  {
    id: 'ev-8-15',
    hijriMonth: 8,
    hijriDay: 15,
    titleEn: 'Shab-e-Barat (Night of Salvation & Change of Qibla)',
    titleUr: 'شبِ برات و تحویلِ قبلہ',
    yearAH: '2 AH',
    descriptionEn: 'The blessed night of forgiveness and divine decree; also marks the historic redirection of the Qibla to the Holy Kaaba.',
    descriptionUr: 'مغفرت کی مبارک رات اور بیت المقدس سے کعبۃ اللہ کی طرف تحویلِ قبلہ کا عظیم حکم۔',
    category: 'festivity'
  },

  // 9. Ramadan
  {
    id: 'ev-9-1',
    hijriMonth: 9,
    hijriDay: 1,
    titleEn: 'Commencement of Ramadan Fasting',
    titleUr: 'آغازِ ماہِ صیام، رمضان المبارک',
    yearAH: '2 AH',
    descriptionEn: 'The month of mercy, forgiveness, and the revelation of the Holy Quran.',
    descriptionUr: 'ماہِ نزولِ قرآن، رحمت، مغفرت اور جہنم سے آزادی کے مبارک روزوں کا آغاز۔',
    category: 'festivity'
  },
  {
    id: 'ev-9-17',
    hijriMonth: 9,
    hijriDay: 17,
    titleEn: 'Ghazwa-e-Badr (The Day of Criterion)',
    titleUr: 'یوم الفرقان، غزوۂ بدرِ کبریٰ',
    yearAH: '2 AH',
    descriptionEn: 'Decisive first battle where 313 Sahabah triumphed with divine angelic assistance over the Quraysh.',
    descriptionUr: 'حق و باطل کا پہلا فیصلہ کن معرکہ، جس میں ۳۱۳ نہتے مجاہدین نے فرشتوں کی نصرت سے لشکرِ قریش کو شکست دی۔',
    category: 'battle'
  },
  {
    id: 'ev-9-20',
    hijriMonth: 9,
    hijriDay: 20,
    titleEn: 'Fath Makkah (Conquest of Makkah)',
    titleUr: 'فتحِ مکہ مکرمہ',
    yearAH: '8 AH',
    descriptionEn: 'Bloodless triumph of Islam, purification of the Kaaba from idols, and universal general amnesty by the Prophet ﷺ.',
    descriptionUr: 'بغیر خون خرابے کے مکہ مکرمہ کی فتح، کعبہ کی بتوں سے پاکیزگی اور حضور ﷺ کی طرف سے عام معافی کا اعلان۔',
    category: 'prophetic'
  },
  {
    id: 'ev-9-27',
    hijriMonth: 9,
    hijriDay: 27,
    titleEn: 'Laylat al-Qadr (Night of Power & Decree)',
    titleUr: 'لیلۃ القدر (ہزار مہینوں سے افضل رات)',
    yearAH: 'Annual',
    descriptionEn: 'The night better than a thousand months in which the Holy Quran was revealed from the Preserved Tablet.',
    descriptionUr: 'ہزار مہینوں سے افضل ترین رات جس میں لوحِ محفوظ سے قرآن مجید نازل فرمایا گیا۔',
    category: 'festivity'
  },

  // 10. Shawwal
  {
    id: 'ev-10-1',
    hijriMonth: 10,
    hijriDay: 1,
    titleEn: 'Eid al-Fitr (Festival of Fast-Breaking)',
    titleUr: 'عید الفطر المبارک',
    yearAH: '2 AH',
    descriptionEn: 'Joyful day of thanksgiving, congregational prayer, and Sadaqat al-Fitr following the blessed month of Ramadan.',
    descriptionUr: 'رمضان المبارک کے مکمل ہونے پر اللہ تعالیٰ کا شکرانہ، نمازِ عید اور صدقۃ الفطر کی ادائیگی۔',
    category: 'festivity'
  },

  // 12. Dhu al-Hijjah
  {
    id: 'ev-12-8',
    hijriMonth: 12,
    hijriDay: 8,
    titleEn: 'Yawm at-Tarwiyah (Hajj Commences to Mina)',
    titleUr: 'یوم الترویہ، آغازِ مناسکِ حج',
    yearAH: 'Annual',
    descriptionEn: 'Millions of pilgrims don Ihram and head toward Mina, starting the rites of Hajj.',
    descriptionUr: 'عازمینِ حج کا احرام باندھ کر منیٰ کی وادی کی طرف روانگی اور حج کا آغاز۔',
    category: 'festivity'
  },
  {
    id: 'ev-12-9',
    hijriMonth: 12,
    hijriDay: 9,
    titleEn: 'Day of Arafah & Farewell Sermon (Khutbah Hajjat al-Wida)',
    titleUr: 'یومِ عرفہ و خطبۂ حجۃ الوداع',
    yearAH: '10 AH',
    descriptionEn: 'The pinnacle of Hajj on Mount Mercy where Prophet Muhammad ﷺ delivered the universal charter of human rights.',
    descriptionUr: 'حج کا سب سے بڑا رکن، میدانِ عرفات کا وقوف اور حضور ﷺ کا عالمگیر منشورِ انسانیت (خطبہ حجۃ الوداع)۔',
    category: 'prophetic'
  },
  {
    id: 'ev-12-10',
    hijriMonth: 12,
    hijriDay: 10,
    titleEn: 'Eid al-Adha & Sacrifice of Prophet Ibrahim (AS)',
    titleUr: 'عید الاضحیٰ و سنتِ ابراہیمی',
    yearAH: 'Annual',
    descriptionEn: 'Commemoration of the ultimate devotion and sacrifice of Prophet Ibrahim and Ismail (AS).',
    descriptionUr: 'حضرت ابراہیم و اسماعیل علیہما السلام کی تسلیم و رضا کی یاد میں قربانی کا عظیم تہوار۔',
    category: 'festivity'
  }
];

export class CalendarService {
  /**
   * Find historic event for a given Hijri day & month
   */
  static getEventForHijriDate(day: number, month: number): IslamicEvent | undefined {
    return ISLAMIC_EVENTS.find(e => e.hijriDay === day && e.hijriMonth === month);
  }

  /**
   * Get all events in a specific Hijri month
   */
  static getEventsForMonth(month: number): IslamicEvent[] {
    return ISLAMIC_EVENTS.filter(e => e.hijriMonth === month);
  }

  /**
   * Get total days in a Hijri month (approx 29 or 30)
   */
  static getDaysInHijriMonth(month: number, year: number): number {
    // Alternating 30 and 29 days with leap year formula
    const isLeapYear = (year * 11 + 14) % 30 < 11;
    if (month % 2 === 1) return 30;
    if (month === 12 && isLeapYear) return 30;
    return 29;
  }
}
