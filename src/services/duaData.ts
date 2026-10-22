import { Dua } from '../types';

export const DUA_CATEGORIES = [
  { id: 'all', nameEn: 'All Supplications', nameUr: 'تمام ادعیہ و اذکار' },
  { id: 'protection', nameEn: 'Protection & Nazar (حفاظت)', nameUr: 'حفاظت، جادو اور نظرِ بد' },
  { id: 'morning_evening', nameEn: 'Morning & Evening (صبح و شام)', nameUr: 'صبح و شام کے مسنون اذکار' },
  { id: 'shifa', nameEn: 'Health & Healing (شفاء)', nameUr: 'بیماری اور شفائے کاملہ' },
  { id: 'after_salah', nameEn: 'After Prayer (نماز کے بعد)', nameUr: 'نماز کے بعد کے اذکار' },
  { id: 'sleep', nameEn: 'Sleep & Waking (سونے جاگنے)', nameUr: 'سونے اور جاگنے کی دعائیں' },
  { id: 'travel_home', nameEn: 'Travel & Home (سفر و قیام)', nameUr: 'سفر اور گھر میں داخلہ' },
  { id: 'forgiveness', nameEn: 'Forgiveness & Distress', nameUr: 'توبہ، استغفار اور پریشانی' },
  { id: 'quranic', nameEn: 'Rabbana (40 قرآنی دعائیں)', nameUr: 'قرآنی دعائیں (ربنا)' }
];

export const DUAS_DATA: Dua[] = [
  // 1. Protection & Evil Eye
  {
    id: 'protection-bismillah-allazi',
    category: 'protection',
    categoryUrdu: 'حفاظت، جادو اور نظرِ بد',
    titleEnglish: 'Supreme Protection Against All Harm on Earth & Heaven',
    titleUrdu: 'ہر قسم کے زمینی و آسمانی نقصان سے حفاظت کی دعا',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    urdu: 'اللہ کے نام سے جس کے نام کی برکت سے زمین اور آسمان کی کوئی چیز نقصان نہیں پہنچا سکتی، اور وہی سب کچھ سننے والا اور جاننے والا ہے۔',
    english: 'In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, All-Knowing.',
    transliteration: 'Bismillāhil-laḏī lā yaḍurru maʿas-mihī shay\'un fil-arḍi wa lā fis-samā\'i wa huwas-Samīʿul-ʿAlīm',
    reference: 'Sunan Abi Dawud 5088, Jami` at-Tirmidhi 3388',
    targetCount: 3,
    benefits: 'The Prophet ﷺ said whoever recites this 3 times morning and evening, nothing shall ever harm him.'
  },
  {
    id: 'protection-kalimatillah',
    category: 'protection',
    categoryUrdu: 'حفاظت، جادو اور نظرِ بد',
    titleEnglish: 'Refuge in the Perfect Words of Allah from Evil Creation',
    titleUrdu: 'اللہ کے کامل کلمات کے ذریعے ہر شر سے پناہ',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    urdu: 'میں اللہ کے مکمل اور بابرکت کلمات کے ذریعے پناہ مانگتا ہوں ہر اس چیز کے شر سے جو اس نے پیدا فرمائی۔',
    english: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    transliteration: 'Aʿūḏu bi-kalimātillāhit-tāmmāti min sharri mā khalaq',
    reference: 'Sahih Muslim 2708',
    targetCount: 3,
    benefits: 'Protects from poisonous stings, evil spirits, envy, and unseen calamities.'
  },
  {
    id: 'protection-nazar-hasad',
    category: 'protection',
    categoryUrdu: 'حفاظت، جادو اور نظرِ بد',
    titleEnglish: 'Protection Against the Evil Eye (Nazar) & Envy',
    titleUrdu: 'نظرِ بد اور حاسدین کے شر سے حفاظت کی مسنون دعا',
    arabic: 'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ، مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    urdu: 'میں تمہیں اللہ کے کامل کلمات کی پناہ میں دیتا ہوں ہر شیطان، ہر زہریلے جانور اور ہر نقصان دہ نظرِ بد کے شر سے۔',
    english: 'I seek refuge for you in the perfect words of Allah from every devil and poisonous reptile, and from every evil eye.',
    transliteration: 'Uʿīḏukumā bi-kalimātillāhit-tāmmah, min kulli shayṭānin wa hāmmah, wa min kulli ʿaynin lāmmah',
    reference: 'Sahih al-Bukhari 3371',
    targetCount: 3,
    benefits: 'Prophet Muhammad ﷺ recited this over his beloved grandsons Al-Hasan and Al-Hussain (RA).'
  },

  // 2. Morning & Evening
  {
    id: 'sayyid-al-istighfar',
    category: 'morning_evening',
    categoryUrdu: 'صبح و شام کے مسنون اذکار',
    titleEnglish: 'Sayyid al-Istighfar (The Supreme Master Prayer for Forgiveness)',
    titleUrdu: 'سید الاستغفار (مغفرت و توبہ کی سب سے افضل دعا)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    urdu: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے ہی مجھے پیدا کیا اور میں تیرا ہی بندہ ہوں، اور میں اپنی استطاعت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے کیے کے شر سے تیری پناہ مانگتا ہوں، اپنے اوپر تیری نعمتوں کا اقرار کرتا ہوں، اور اپنے گناہوں کا اعتراف کرتا ہوں، پس مجھے بخش دے، کیونکہ تیرے سوا کوئی گناہوں کو معاف نہیں کر سکتا۔',
    english: 'O Allah, You are my Lord, there is no deity except You. You have created me and I am Your servant, and I abide by Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge before You Your blessing upon me, and I acknowledge my sin, so forgive me, for indeed none forgives sins except You.',
    transliteration: 'Allāhumma Anta Rabbī, lā ilāha illā Anta, khalaqtanī wa anā ʿabduka...',
    reference: 'Sahih al-Bukhari 6306',
    targetCount: 1,
    benefits: 'The Prophet ﷺ said whoever recites this with conviction during the day or night and dies will be among the people of Paradise.'
  },
  {
    id: 'morning-asbahna',
    category: 'morning_evening',
    categoryUrdu: 'صبح و شام کے مسنون اذکار',
    titleEnglish: 'Morning Declaration of Monotheism',
    titleUrdu: 'صبح کے وقت بادشاہی و حمد کا اقرار',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    urdu: 'ہم نے صبح کی اور اللہ کے تمام جہانوں نے صبح کی، سب تعریفیں اللہ کے لیے ہیں، اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کی بادشاہی اور اسی کی حمد ہے اور وہ ہر چیز پر قادر ہے۔',
    english: 'We have entered the morning and the kingdom belongs to Allah, all praise is for Allah. None has the right to be worshipped except Allah alone, without partner.',
    transliteration: 'Aṣbaḥnā wa aṣbaḥal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā sharīka lah...',
    reference: 'Sahih Muslim 2723',
    targetCount: 1,
    benefits: 'Begins the day under divine sovereignty and protection.'
  },

  // 3. Health & Shifa
  {
    id: 'shifa-azhab-al-bas',
    category: 'shifa',
    categoryUrdu: 'بیماری اور شفائے کاملہ',
    titleEnglish: 'Prophetic Prayer for Complete Healing (Shifa)',
    titleUrdu: 'بیماری سے شفائے کاملہ کی مسنون دعا',
    arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ، اشْفِهِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
    urdu: 'اے اللہ! تمام انسانوں کے پالنے والے پروردگار! اس تکلیف کو دور فرما دے، شفا عطا فرما تو ہی شفا دینے والا ہے، تیرے سوا کوئی شفا دینے والا نہیں، ایسی شفا عطا فرما جو کسی بیماری کو باقی نہ چھوڑے۔',
    english: 'O Allah, Lord of mankind, remove the affliction and heal him, for You are the Healer. There is no healing except Your healing, a healing that leaves behind no illness.',
    transliteration: 'Allāhumma Rabban-nāsi aḏhibil-bās, ishfihi wa Antash-Shāfī, lā shifā\'a illā shifā\'uka...',
    reference: 'Sahih al-Bukhari 5743, Sahih Muslim 2191',
    targetCount: 3,
    benefits: 'Recited with the right hand over any sick person for immediate divine comfort and relief.'
  },

  // 4. Forgiveness & Distress
  {
    id: 'distress-yunus',
    category: 'forgiveness',
    categoryUrdu: 'توبہ، استغفار اور پریشانی',
    titleEnglish: 'Dua of Prophet Yunus (Ayat-e-Kareema in Belly of the Whale)',
    titleUrdu: 'آیتِ کریمہ (حضرت یونس علیہ السلام کی دعا)',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    urdu: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔',
    english: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    transliteration: 'Lā ilāha illā Anta subḥānaka innī kuntu minaẓ-ẓālimīn',
    reference: 'Surah Al-Anbiya 21:87',
    targetCount: 100,
    benefits: 'The ultimate prayer for relief from financial, mental, and physical distress.'
  },
  {
    id: 'distress-la-hawla',
    category: 'forgiveness',
    categoryUrdu: 'توبہ، استغفار اور پریشانی',
    titleEnglish: 'Relief from Anxiety, Heavy Burdens & Sorrows',
    titleUrdu: 'غم، پریشانی اور قرض کے بوجھ سے نجات کی دعا',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',
    urdu: 'اے اللہ! میں تیری پناہ مانگتا ہوں فکر اور غم سے، عاجزی اور سستی سے، بخل اور بزدلی سے، اور قرض کے بوجھ اور ظالم لوگوں کے غلبے سے۔',
    english: 'O Allah, I seek refuge in You from grief and sadness, from weakness and laziness, from miserliness and cowardice, from being heavily in debt and from being overpowered by men.',
    transliteration: 'Allāhumma innī aʿūḏu bika minal-hammi wal-ḥazan, wal-ʿajzi wal-kasal...',
    reference: 'Sahih al-Bukhari 2893',
    targetCount: 3,
    benefits: 'Eliminates debt anxiety, procrastination, depression, and social fear.'
  },

  // 5. Quranic Rabbana
  {
    id: 'rabbana-atina',
    category: 'quranic',
    categoryUrdu: 'قرآنی دعائیں (ربنا)',
    titleEnglish: 'Supplication for Comprehensive Good in Both Worlds',
    titleUrdu: 'دنیا اور آخرت کی تمام بھلائیوں کی جامع دعا',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    urdu: 'اے ہمارے پروردگار! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں دوزخ کے عذاب سے بچا۔',
    english: 'Our Lord, grant us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.',
    transliteration: 'Rabbanā ātinā fid-dunyā ḥasanatan wa fīl-ākhirati ḥasanatan wa qinā ʿaḏāban-nār',
    reference: 'Surah Al-Baqarah 2:201',
    targetCount: 3,
    benefits: 'The most frequent and beloved supplication of Prophet Muhammad ﷺ.'
  },
  {
    id: 'rabbana-hablana',
    category: 'quranic',
    categoryUrdu: 'قرآنی دعائیں (ربنا)',
    titleEnglish: 'Supplication for Righteous Spouse and Children (Coolness of Eyes)',
    titleUrdu: 'نیک اولاد، پاکیزہ شریکِ حیات اور آنکھوں کی ٹھنڈک کی دعا',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    urdu: 'اے ہمارے پروردگار! ہمیں ہماری بیویوں اور ہماری اولاد کی طرف سے آنکھوں کی ٹھنڈک عطا فرما اور ہمیں پرہیزگاروں کا پیشوا بنا۔',
    english: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us an example for the righteous.',
    transliteration: 'Rabbanā hablana min azwājinā wa ḏurriyyātinā qurrata aʿyunin wajʿalnā lil-muttaqīna imāmā',
    reference: 'Surah Al-Furqan 25:74',
    targetCount: 3,
    benefits: 'Brings domestic harmony, affectionate marriages, and pious children.'
  }
];

export class DuaDataProvider {
  static getCategories() {
    return DUA_CATEGORIES;
  }

  static getAllDuas(): Dua[] {
    return DUAS_DATA;
  }

  static getDuasByCategory(category: string): Dua[] {
    if (category === 'all') return DUAS_DATA;
    return DUAS_DATA.filter(d => d.category === category);
  }

  static searchDuas(query: string): Dua[] {
    const q = query.trim().toLowerCase();
    if (!q) return DUAS_DATA;
    return DUAS_DATA.filter(d =>
      d.arabic.includes(query) ||
      d.urdu.includes(query) ||
      d.english.toLowerCase().includes(q) ||
      d.titleEnglish.toLowerCase().includes(q) ||
      d.titleUrdu.includes(query)
    );
  }
}
