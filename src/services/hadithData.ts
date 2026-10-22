import { Hadith, HadithBook } from '../types';

export const HADITH_BOOKS: HadithBook[] = [
  {
    id: 'bukhari',
    nameEnglish: 'Sahih al-Bukhari',
    nameArabic: 'صحيح البخاري',
    nameUrdu: 'صحیح البخاری',
    authorEnglish: 'Imam Muhammad al-Bukhari (194 – 256 AH)',
    totalHadiths: 7563,
    chaptersCount: 97,
    description: 'The highest canonical grade of Hadith literature in Islamic consensus; compiled with extreme rigor over 16 years.'
  },
  {
    id: 'muslim',
    nameEnglish: 'Sahih Muslim',
    nameArabic: 'صحيح مسلم',
    nameUrdu: 'صحیح مسلم',
    authorEnglish: 'Imam Muslim ibn al-Hajjaj (204 – 261 AH)',
    totalHadiths: 7500,
    chaptersCount: 56,
    description: 'Renowned for thematic structural integrity and strict narrator chain authentication.'
  },
  {
    id: 'tirmidhi',
    nameEnglish: 'Jami` at-Tirmidhi',
    nameArabic: 'جامع الترمذي',
    nameUrdu: 'جامع الترمذی',
    authorEnglish: 'Imam Abu Isa Muhammad at-Tirmidhi (209 – 279 AH)',
    totalHadiths: 3956,
    chaptersCount: 49,
    description: 'Uniquely grades every hadith (Sahih, Hasan, Gharib) with judicial opinions of the jurists.'
  },
  {
    id: 'abudawud',
    nameEnglish: 'Sunan Abi Dawud',
    nameArabic: 'سنن أبي داود',
    nameUrdu: 'سنن ابی داؤد',
    authorEnglish: 'Imam Abu Dawud Sulayman (202 – 275 AH)',
    totalHadiths: 5274,
    chaptersCount: 43,
    description: 'A primary repository of legal ahadith (Ahadith al-Ahkam) governing daily fiqh and worship.'
  },
  {
    id: 'nasai',
    nameEnglish: 'Sunan an-Nasa\'i (Al-Mujtaba)',
    nameArabic: 'سنن النسائي',
    nameUrdu: 'سنن نسائی',
    authorEnglish: 'Imam Ahmad an-Nasa\'i (214 – 303 AH)',
    totalHadiths: 5758,
    chaptersCount: 51,
    description: 'Renowned for meticulous scrutiny of subtle transmitter variations and narrator defects.'
  },
  {
    id: 'ibnmajah',
    nameEnglish: 'Sunan Ibn Majah',
    nameArabic: 'سنن ابن ماجه',
    nameUrdu: 'سنن ابن ماجہ',
    authorEnglish: 'Imam Ibn Majah al-Qazwini (209 – 273 AH)',
    totalHadiths: 4341,
    chaptersCount: 37,
    description: 'Outstanding chapter arrangement covering daily lifestyle, moral character, and etiquette.'
  }
];

export const AUTHENTIC_HADITHS: Hadith[] = [
  {
    id: 'bukhari-1',
    bookId: 'bukhari',
    bookNameEnglish: 'Sahih al-Bukhari',
    bookNameUrdu: 'صحیح البخاری',
    hadithNumber: 1,
    chapterTitleEnglish: 'Book 1: Revelation & Intention',
    chapterTitleUrdu: 'کتاب بدء الوحی و نیت کا بیان',
    narratorEnglish: 'Umar ibn al-Khattab (RA)',
    narratorUrdu: 'حضرت عمر بن خطاب رضی اللہ عنہ',
    textArabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ',
    textUrdu: 'اعمال کا دارومدار نیتوں پر ہے اور ہر انسان کے لیے وہی ہے جس کی اس نے نیت کی، پس جس کی ہجرت دنیا حاصل کرنے یا کسی عورت سے نکاح کے لیے ہو تو اس کی ہجرت اسی مقصد کے لیے شمار ہو گی جس کی اس نے نیت کی۔',
    textEnglish: 'Actions are judged by intentions, and every person will get the reward according to what he intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for.',
    grade: 'Muttafaq Alayh',
    reference: 'Sahih al-Bukhari 1, Book 1, Hadith 1',
    tags: ['Intention', 'Niyyah', 'Foundation of Deeds']
  },
  {
    id: 'bukhari-13',
    bookId: 'bukhari',
    bookNameEnglish: 'Sahih al-Bukhari',
    bookNameUrdu: 'صحیح البخاری',
    hadithNumber: 13,
    chapterTitleEnglish: 'Book 2: Belief (Iman)',
    chapterTitleUrdu: 'کتاب الایمان',
    narratorEnglish: 'Anas ibn Malik (RA)',
    narratorUrdu: 'حضرت انس بن مالک رضی اللہ عنہ',
    textArabic: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    textUrdu: 'تم میں سے کوئی شخص اس وقت تک سچا مومن نہیں ہو سکتا جب تک وہ اپنے مسلمان بھائی کے لیے وہی پسند نہ کرے جو خود اپنے لیے پسند کرتا ہے۔',
    textEnglish: 'None of you truly believes until he loves for his brother what he loves for himself.',
    grade: 'Sahih',
    reference: 'Sahih al-Bukhari 13, Book 2, Hadith 6',
    tags: ['Brotherhood', 'Iman', 'Love', 'Character']
  },
  {
    id: 'bukhari-5027',
    bookId: 'bukhari',
    bookNameEnglish: 'Sahih al-Bukhari',
    bookNameUrdu: 'صحیح البخاری',
    hadithNumber: 5027,
    chapterTitleEnglish: 'Book 66: Virtues of the Quran',
    chapterTitleUrdu: 'کتاب فضائل القرآن',
    narratorEnglish: 'Uthman ibn Affan (RA)',
    narratorUrdu: 'حضرت عثمان بن عفان رضی اللہ عنہ',
    textArabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    textUrdu: 'تم میں سے بہترین شخص وہ ہے جو قرآن مجید خود سیکھے اور دوسروں کو سکھائے۔',
    textEnglish: 'The best among you are those who learn the Quran and teach it to others.',
    grade: 'Sahih',
    reference: 'Sahih al-Bukhari 5027, Book 66, Hadith 49',
    tags: ['Quran', 'Knowledge', 'Teaching', 'Virtue']
  },
  {
    id: 'muslim-223',
    bookId: 'muslim',
    bookNameEnglish: 'Sahih Muslim',
    bookNameUrdu: 'صحیح مسلم',
    hadithNumber: 223,
    chapterTitleEnglish: 'Book 2: Purification (Taharah)',
    chapterTitleUrdu: 'کتاب الطہارۃ',
    narratorEnglish: 'Abu Malik al-Ash\'ari (RA)',
    narratorUrdu: 'حضرت ابو مالک اشعری رضی اللہ عنہ',
    textArabic: 'الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ أَوْ تَمْلأُ مَا بَيْنَ السَّمَاوَاتِ وَالأَرْضِ، وَالصَّلاَةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ',
    textUrdu: 'پاکیزگی نصف ایمان ہے، اور الحمد للہ نیکیوں کے پلڑے کو بھر دیتا ہے، اور سبحان اللہ اور الحمد للہ آسمانوں اور زمین کے درمیانی خلا کو بھر دیتے ہیں، اور نماز نور ہے، صدقہ دلیل ہے، صبر روشنی ہے، اور قرآن تمہارے حق میں یا تمہارے خلاف حجت ہے۔',
    textEnglish: 'Purity is half of faith, and Alhamdulillah fills the scale, and SubhanAllah and Alhamdulillah fill what is between heaven and earth, and prayer is a light, charity is a proof, patience is illumination, and the Quran is an argument for you or against you.',
    grade: 'Sahih',
    reference: 'Sahih Muslim 223, Book 2, Hadith 1',
    tags: ['Purity', 'Prayer', 'Tasbih', 'Patience']
  },
  {
    id: 'muslim-2699',
    bookId: 'muslim',
    bookNameEnglish: 'Sahih Muslim',
    bookNameUrdu: 'صحیح مسلم',
    hadithNumber: 2699,
    chapterTitleEnglish: 'Book 48: Supplication & Seeking Knowledge',
    chapterTitleUrdu: 'کتاب الذکر والدعاء والعلم',
    narratorEnglish: 'Abu Hurairah (RA)',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ',
    textArabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
    textUrdu: 'جو شخص علم کی تلاش میں کسی راستے پر چلتا ہے، اللہ تعالیٰ اس کے بدلے اس کے لیے جنت کا راستہ آسان فرما دیتا ہے۔',
    textEnglish: 'Whoever treads a path in search of knowledge, Allah makes easy for him the path to Paradise.',
    grade: 'Sahih',
    reference: 'Sahih Muslim 2699, Book 48, Hadith 36',
    tags: ['Knowledge', 'Paradise', 'Ilm', 'Study']
  },
  {
    id: 'tirmidhi-1987',
    bookId: 'tirmidhi',
    bookNameEnglish: 'Jami` at-Tirmidhi',
    bookNameUrdu: 'جامع الترمذی',
    hadithNumber: 1987,
    chapterTitleEnglish: 'Book 27: Righteousness & Manners',
    chapterTitleUrdu: 'کتاب البر والصلة',
    narratorEnglish: 'Abu Hurairah (RA)',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ',
    textArabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    textUrdu: 'اپنے مسلمان بھائی کے سامنے مسکرا کر ملنا تمہارے لیے صدقہ ہے۔',
    textEnglish: 'Your smiling in the face of your brother is charity for you.',
    grade: 'Hasan',
    reference: 'Jami` at-Tirmidhi 1956, Book 27, Hadith 62',
    tags: ['Smile', 'Charity', 'Akhlaq', 'Kindness']
  },
  {
    id: 'abudawud-4904',
    bookId: 'abudawud',
    bookNameEnglish: 'Sunan Abi Dawud',
    bookNameUrdu: 'سنن ابی داؤد',
    hadithNumber: 4904,
    chapterTitleEnglish: 'Book 43: General Etiquette (Adab)',
    chapterTitleUrdu: 'کتاب الادب',
    narratorEnglish: 'Abdullah ibn Amr (RA)',
    narratorUrdu: 'حضرت عبداللہ بن عمرو رضی اللہ عنہ',
    textArabic: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ',
    textUrdu: 'رحم کرنے والوں پر رحمان رحم فرماتا ہے، تم زمین والوں پر رحم کرو، آسمان والا تم پر رحم فرمائے گا۔',
    textEnglish: 'Those who show mercy will be shown mercy by the Most Merciful. Be merciful to those on the earth and the One in heaven will have mercy upon you.',
    grade: 'Sahih',
    reference: 'Sunan Abi Dawud 4941, Jami at-Tirmidhi 1924',
    tags: ['Mercy', 'Compassion', 'Kindness']
  },
  {
    id: 'nasai-3175',
    bookId: 'nasai',
    bookNameEnglish: 'Sunan an-Nasa\'i',
    bookNameUrdu: 'سنن نسائی',
    hadithNumber: 3175,
    chapterTitleEnglish: 'Book 25: Honoring Parents',
    chapterTitleUrdu: 'کتاب بر الوالدین',
    narratorEnglish: 'Mu\'awiyah ibn Jahima (RA)',
    narratorUrdu: 'حضرت معاویہ بن جاہمہ رضی اللہ عنہ',
    textArabic: 'الْزَمْ رِجْلَهَا فَثَمَّ الْجَنَّةُ',
    textUrdu: 'اپنی ماں کی خدمت کو لازم پکڑ لو، کیونکہ جنت اس کے قدموں کے نیچے ہے۔',
    textEnglish: 'Stay with your mother and serve her feet, for Paradise lies there.',
    grade: 'Sahih',
    reference: 'Sunan an-Nasa\'i 3104, Sunan Ibn Majah 2781',
    tags: ['Parents', 'Mother', 'Paradise', 'Filial Piety']
  },
  {
    id: 'ibnmajah-224',
    bookId: 'ibnmajah',
    bookNameEnglish: 'Sunan Ibn Majah',
    bookNameUrdu: 'سنن ابن ماجہ',
    hadithNumber: 224,
    chapterTitleEnglish: 'Book of Introduction: Seeking Knowledge',
    chapterTitleUrdu: 'کتاب المقدمة فی فضل العلم',
    narratorEnglish: 'Anas ibn Malik (RA)',
    narratorUrdu: 'حضرت انس بن مالک رضی اللہ عنہ',
    textArabic: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    textUrdu: 'علم کا حاصل کرنا ہر مسلمان (مرد اور عورت) پر فرض ہے۔',
    textEnglish: 'Seeking knowledge is an obligation upon every Muslim.',
    grade: 'Hasan',
    reference: 'Sunan Ibn Majah 224, Hadith 224',
    tags: ['Education', 'Knowledge', 'Obligation', 'Women Education']
  }
];

interface HadithEdition {
  metadata: {
    name: string;
    sections?: Record<string, string>;
  };
  hadiths: Array<{
    hadithnumber: number;
    text: string;
    grades?: Array<{ grade: string }>;
    reference?: { book?: number; hadith?: number };
  }>;
}

const loadedCollections = new Map<string, Hadith[]>();
const EDITION_BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions';

export class HadithDataProvider {
  static getBooks(): HadithBook[] {
    return HADITH_BOOKS;
  }

  static getAllHadiths(): Hadith[] {
    return AUTHENTIC_HADITHS;
  }

  static getHadithsByBook(bookId: string): Hadith[] {
    if (bookId === 'all') return AUTHENTIC_HADITHS;
    return AUTHENTIC_HADITHS.filter(h => h.bookId === bookId);
  }

  static getRandomHadith(): Hadith {
    return AUTHENTIC_HADITHS[Math.floor(Math.random() * AUTHENTIC_HADITHS.length)];
  }

  static async loadBook(bookId: string): Promise<Hadith[]> {
    const cached = loadedCollections.get(bookId);
    if (cached) return cached;

    const book = HADITH_BOOKS.find((item) => item.id === bookId);
    if (!book) throw new Error(`Unknown Hadith collection: ${bookId}`);

    const fetchEdition = async (language: 'ara' | 'urd' | 'eng'): Promise<HadithEdition> => {
      const edition = `${language}-${bookId}`;
      const minifiedResponse = await fetch(`${EDITION_BASE_URL}/${edition}.min.json`);
      const response = minifiedResponse.ok
        ? minifiedResponse
        : await fetch(`${EDITION_BASE_URL}/${edition}.json`);
      if (!response.ok) {
        throw new Error(`Could not load ${language} text for ${book.nameEnglish} (${response.status}).`);
      }
      const data: unknown = await response.json();
      if (
        typeof data !== 'object' ||
        data === null ||
        !('metadata' in data) ||
        !('hadiths' in data) ||
        !Array.isArray(data.hadiths)
      ) {
        throw new Error(`The ${language} edition for ${book.nameEnglish} has an invalid format.`);
      }
      return data as HadithEdition;
    };

    const [arabic, urdu, english] = await Promise.all([
      fetchEdition('ara'),
      fetchEdition('urd'),
      fetchEdition('eng')
    ]);
    const urduByNumber = new Map(urdu.hadiths.map((hadith) => [hadith.hadithnumber, hadith]));
    const englishByNumber = new Map(english.hadiths.map((hadith) => [hadith.hadithnumber, hadith]));
    const isSahihCollection = bookId === 'bukhari' || bookId === 'muslim';
    const records = arabic.hadiths.map((hadith): Hadith => {
      const englishHadith = englishByNumber.get(hadith.hadithnumber);
      const urduHadith = urduByNumber.get(hadith.hadithnumber);
      const sectionNumber = String(englishHadith?.reference?.book ?? hadith.reference?.book ?? '');
      const sectionNumberUr = String(urduHadith?.reference?.book ?? sectionNumber);
      const sectionTitle = english.metadata.sections?.[sectionNumber] ?? '';
      const sectionTitleUr = urdu.metadata.sections?.[sectionNumberUr] ?? sectionTitle;
      const gradeLabel = hadith.grades?.[0]?.grade ?? englishHadith?.grades?.[0]?.grade ?? '';
      const normalizedGrade = gradeLabel.toLowerCase();
      const grade: Hadith['grade'] = normalizedGrade.includes('sahih')
        ? 'Sahih'
        : normalizedGrade.includes('hasan')
          ? 'Hasan'
          : normalizedGrade.includes('daif') || normalizedGrade.includes('weak')
            ? 'Daif'
            : isSahihCollection
              ? 'Sahih'
              : 'Unknown';
      const englishText = englishHadith?.text ?? '';
      const narratorMatch = englishText.match(/^Narrated\s+(.+?):/i);
      const narratorUrdu = urduHadith?.text.match(/^([^:：]{2,60})[:：]/)?.[1] ?? '';
      const chapterTitle = sectionTitle ? `Book ${sectionNumber}: ${sectionTitle}` : book.nameEnglish;
      const referenceNumber = englishHadith?.reference?.hadith ?? hadith.hadithnumber;

      return {
        id: `${bookId}-${hadith.hadithnumber}`,
        bookId,
        bookNameEnglish: book.nameEnglish,
        bookNameUrdu: book.nameUrdu,
        hadithNumber: hadith.hadithnumber,
        chapterTitleEnglish: chapterTitle,
        chapterTitleUrdu: sectionTitleUr ? `کتاب ${sectionNumberUr}: ${sectionTitleUr}` : book.nameUrdu,
        narratorEnglish: narratorMatch?.[1] ?? '',
        narratorUrdu,
        textArabic: hadith.text,
        textUrdu: urduHadith?.text ?? '',
        textEnglish: englishText,
        grade,
        reference: `${book.nameEnglish} ${hadith.hadithnumber}, Book ${sectionNumber || '—'}, Hadith ${referenceNumber}`,
        tags: [sectionTitle || 'Hadith']
      };
    });

    loadedCollections.set(bookId, records);
    return records;
  }

  static searchHadiths(query: string): Hadith[] {
    const q = query.trim().toLowerCase();
    if (!q) return AUTHENTIC_HADITHS;

    return AUTHENTIC_HADITHS.filter(h =>
      h.textArabic.includes(query) ||
      h.textUrdu.includes(query) ||
      h.textEnglish.toLowerCase().includes(q) ||
      h.chapterTitleEnglish.toLowerCase().includes(q) ||
      h.narratorEnglish.toLowerCase().includes(q) ||
      h.narratorUrdu.includes(query) ||
      h.tags.some(t => t.toLowerCase().includes(q))
    );
  }
}
