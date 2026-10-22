import React, { useEffect, useState } from 'react';
import { BookOpen, Coins, Droplets, MapPinned, Moon, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IbadatGuideId } from '../types';

type GuideId = IbadatGuideId;

interface Guide {
  id: GuideId;
  titleEn: string;
  titleUr: string;
  summaryEn: string;
  summaryUr: string;
  stepsEn: string[];
  stepsUr: string[];
  dua?: {
    arabic: string;
    transliteration?: string;
    english: string;
    urdu: string;
    source: string;
  };
  recitations?: {
    positionEn: string;
    positionUr: string;
    arabic: string;
    transliteration: string;
    english: string;
    urdu: string;
    noteEn?: string;
    noteUr?: string;
  }[];
  noteEn?: string;
  noteUr?: string;
}

const guides: Guide[] = [
  {
    id: 'salah',
    titleEn: 'How to pray Salah',
    titleUr: 'نماز ادا کرنے کا طریقہ',
    summaryEn: 'A beginner-friendly outline of a rak‘ah. The number of rak‘ahs and some details vary by prayer and school of law.',
    summaryUr: 'ایک رکعت کا ابتدائی طریقہ۔ رکعات کی تعداد اور چند جزئیات نماز اور فقہی مسلک کے مطابق مختلف ہو سکتی ہیں۔',
    stepsEn: [
      'Make wudu, ensure the prayer time has begun, cover the required parts, and face the Qiblah.',
      'Form the intention in your heart, then begin with Takbir: “Allahu akbar.”',
      'Stand and recite Al-Fatihah, followed by another passage of the Quran in the first two rak‘ahs.',
      'Bow (ruku‘), glorify Allah, then stand upright again.',
      'Prostrate (sujud), sit briefly, and prostrate a second time.',
      'Stand for the next rak‘ah and repeat. Sit for tashahhud at the appropriate rak‘ah.',
      'Finish with the final tashahhud and salawat, then close the prayer with salam to each side.'
    ],
    stepsUr: [
      'وضو کریں، نماز کا وقت ہونے کی تصدیق کریں، ستر ڈھانپیں اور قبلہ رخ کھڑے ہوں۔',
      'دل میں نیت کریں اور “اللہ اکبر” کہہ کر نماز شروع کریں۔',
      'قیام میں سورۂ فاتحہ اور پہلی دو رکعتوں میں اس کے بعد قرآن کا کچھ حصہ پڑھیں۔',
      'رکوع میں جائیں، اللہ کی تسبیح کریں، پھر سیدھے کھڑے ہو جائیں۔',
      'سجدہ کریں، تھوڑی دیر بیٹھیں اور دوسرا سجدہ کریں۔',
      'اگلی رکعت کے لیے کھڑے ہوں اور عمل دہرائیں؛ مقررہ رکعت پر تشہد کے لیے بیٹھیں۔',
      'آخری تشہد اور درود کے بعد دائیں اور بائیں سلام پھیر کر نماز مکمل کریں۔'
    ],
    recitations: [
      {
        positionEn: 'Opening takbir (after the intention)',
        positionUr: 'تکبیرِ تحریمہ (نیت کے بعد)',
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar.',
        english: 'Allah is the Greatest.',
        urdu: 'اللہ سب سے بڑا ہے۔',
        noteEn: 'Raise the hands as taught in your school, then begin the opening supplication.',
        noteUr: 'اپنے فقہی مسلک کے طریقے کے مطابق ہاتھ اٹھائیں، پھر ثناء شروع کریں۔'
      },
      {
        positionEn: 'Opening supplication (first rak‘ah, after the opening takbir)',
        positionUr: 'ثناء (پہلی رکعت میں تکبیرِ تحریمہ کے بعد)',
        arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
        transliteration: 'Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta‘ala jadduka, wa la ilaha ghayruk.',
        english: 'Glory and praise be to You, O Allah. Blessed is Your name, exalted is Your majesty, and there is no god besides You.',
        urdu: 'اے اللہ! تو پاک ہے اور تیری ہی تعریف ہے، تیرا نام بابرکت ہے، تیری شان بلند ہے اور تیرے سوا کوئی معبود نہیں۔',
        noteEn: 'A commonly taught opening; wording may differ by school.',
        noteUr: 'یہ عام طور پر پڑھا جانے والا ثناء کا متن ہے؛ فقہی مسلک کے مطابق الفاظ مختلف ہو سکتے ہیں۔'
      },
      {
        positionEn: 'Before Al-Fatihah (first rak‘ah)',
        positionUr: 'سورۂ فاتحہ سے پہلے (پہلی رکعت)',
        arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ، بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'A‘udhu billahi minash-shaytanir-rajim. Bismillahir-Rahmanir-Rahim.',
        english: 'I seek Allah’s protection from Satan, the rejected. In the name of Allah, the Most Compassionate, the Most Merciful.',
        urdu: 'میں اللہ کی پناہ مانگتا ہوں شیطان مردود سے۔ اللہ کے نام سے جو نہایت مہربان، رحم فرمانے والا ہے۔',
        noteEn: 'Seeking protection is generally said at the start; follow your imam and school for details.',
        noteUr: 'تعوذ عموماً ابتدا میں پڑھا جاتا ہے؛ جزئیات میں اپنے امام اور فقہی مسلک کی پیروی کریں۔'
      },
      {
        positionEn: 'Standing (qiyam): Surah Al-Fatihah',
        positionUr: 'قیام: سورۂ فاتحہ',
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝',
        transliteration: 'Alhamdu lillahi rabbil-‘alamin. Ar-Rahmanir-Rahim. Maliki yawmid-din. Iyyaka na‘budu wa iyyaka nasta‘in. Ihdinas-siratal-mustaqim. Siratal-ladhina an‘amta ‘alayhim ghayril-maghdubi ‘alayhim wa lad-dallin.',
        english: 'All praise belongs to Allah, Lord of all worlds; the Most Compassionate, the Most Merciful; Master of the Day of Judgment. You alone we worship and You alone we ask for help. Guide us to the straight path: the path of those You have blessed, not those who earned anger, nor those who went astray.',
        urdu: 'سب تعریف اللہ کے لیے ہے جو تمام جہانوں کا رب ہے، نہایت مہربان، رحم فرمانے والا، روزِ جزا کا مالک۔ ہم تیری ہی عبادت کرتے اور تجھ ہی سے مدد مانگتے ہیں۔ ہمیں سیدھے راستے پر چلا، ان لوگوں کے راستے پر جن پر تو نے انعام فرمایا، نہ ان کے جن پر غضب ہوا اور نہ گمراہوں کے۔',
        noteEn: 'Al-Fatihah is recited in each rak‘ah. Recitation behind the imam has school-specific rulings.',
        noteUr: 'ہر رکعت میں سورۂ فاتحہ پڑھی جاتی ہے۔ امام کے پیچھے قراءت کے احکام فقہی مسلک کے مطابق ہیں۔'
      },
      {
        positionEn: 'After Al-Fatihah',
        positionUr: 'سورۂ فاتحہ کے بعد',
        arabic: 'آمِينَ',
        transliteration: 'Amin.',
        english: 'O Allah, answer our supplication.',
        urdu: 'اے اللہ! ہماری دعا قبول فرما۔',
        noteEn: 'Said after completing Al-Fatihah.',
        noteUr: 'سورۂ فاتحہ مکمل کرنے کے بعد کہا جاتا ہے۔'
      },
      {
        positionEn: 'After Al-Fatihah (first two rak‘ahs): example, Surah Al-Ikhlas',
        positionUr: 'سورۂ فاتحہ کے بعد (پہلی دو رکعتیں): مثال، سورۂ اخلاص',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        transliteration: 'Qul huwa Allahu ahad. Allahus-samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.',
        english: 'Say: He is Allah, the One; Allah, the Eternal Refuge. He neither begets nor is born, and none is comparable to Him.',
        urdu: 'کہہ دیجیے: وہ اللہ ایک ہے، اللہ بے نیاز ہے۔ نہ اس نے کسی کو جنا اور نہ وہ جنا گیا، اور کوئی اس کا ہمسر نہیں۔',
        noteEn: 'This is an example only; another passage of the Quran may be recited.',
        noteUr: 'یہ صرف مثال ہے؛ قرآنِ کریم کا کوئی دوسرا حصہ بھی پڑھا جا سکتا ہے۔'
      },
      {
        positionEn: 'When moving between prayer positions',
        positionUr: 'نماز میں ارکان کے درمیان منتقل ہوتے ہوئے',
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar.',
        english: 'Allah is the Greatest.',
        urdu: 'اللہ سب سے بڑا ہے۔',
        noteEn: 'Say the takbir when moving to the next position, except when rising from ruku‘.',
        noteUr: 'رکوع سے اٹھنے کے علاوہ اگلے رکن کی طرف جاتے ہوئے تکبیر کہیں۔'
      },
      {
        positionEn: 'Bowing (ruku‘)',
        positionUr: 'رکوع',
        arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
        transliteration: 'Subhana Rabbiyal-‘Azim.',
        english: 'Glory be to my Lord, the Magnificent.',
        urdu: 'پاک ہے میرا عظمت والا رب۔',
        noteEn: 'Commonly repeated three times.',
        noteUr: 'عام طور پر تین مرتبہ پڑھا جاتا ہے۔'
      },
      {
        positionEn: 'Rising from ruku‘',
        positionUr: 'رکوع سے اٹھتے ہوئے',
        arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ',
        transliteration: 'Sami‘allahu liman hamidah. Rabbana wa lakal-hamd.',
        english: 'Allah hears the one who praises Him. Our Lord, all praise belongs to You.',
        urdu: 'اللہ نے اس کی سن لی جس نے اس کی حمد کی۔ اے ہمارے رب! تمام تعریف تیرے ہی لیے ہے۔',
        noteEn: 'The imam and a person praying alone say the first phrase; the follower’s wording varies by school.',
        noteUr: 'امام اور اکیلا نماز پڑھنے والا پہلا جملہ کہتے ہیں؛ مقتدی کے الفاظ فقہی مسلک کے مطابق مختلف ہو سکتے ہیں۔'
      },
      {
        positionEn: 'Prostration (sujud)',
        positionUr: 'سجدہ',
        arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
        transliteration: 'Subhana Rabbiyal-A‘la.',
        english: 'Glory be to my Lord, the Most High.',
        urdu: 'پاک ہے میرا بلند و بالا رب۔',
        noteEn: 'Commonly repeated three times in each prostration.',
        noteUr: 'ہر سجدے میں عام طور پر تین مرتبہ پڑھا جاتا ہے۔'
      },
      {
        positionEn: 'Sitting between the two prostrations',
        positionUr: 'دو سجدوں کے درمیان بیٹھ کر',
        arabic: 'رَبِّ اغْفِرْ لِي',
        transliteration: 'Rabbighfir li.',
        english: 'My Lord, forgive me.',
        urdu: 'اے میرے رب! مجھے بخش دے۔'
      },
      {
        positionEn: 'Sitting for tashahhud',
        positionUr: 'تشہد کے لیے بیٹھ کر',
        arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        transliteration: 'At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu ‘alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh. As-salamu ‘alayna wa ‘ala ‘ibadillahis-salihin. Ashhadu an la ilaha illallah, wa ashhadu anna Muhammadan ‘abduhu wa rasuluh.',
        english: 'All greetings, prayers, and good words belong to Allah. Peace be upon you, O Prophet, and Allah’s mercy and blessings. Peace be upon us and Allah’s righteous servants. I bear witness that there is no god but Allah, and Muhammad is His servant and messenger.',
        urdu: 'تمام قولی عبادتیں، نمازیں اور پاکیزہ کلمات اللہ کے لیے ہیں۔ اے نبی! آپ پر سلام، اللہ کی رحمت اور برکتیں ہوں۔ ہم پر اور اللہ کے نیک بندوں پر سلام ہو۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور محمد ﷺ اس کے بندے اور رسول ہیں۔'
      },
      {
        positionEn: 'Final sitting: Salawat Ibrahimiyyah',
        positionUr: 'آخری قعدہ: درودِ ابراہیمی',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
        transliteration: 'Allahumma salli ‘ala Muhammadin wa ‘ala ali Muhammad, kama sallayta ‘ala Ibrahima wa ‘ala ali Ibrahim, innaka Hamidum Majid. Allahumma barik ‘ala Muhammadin wa ‘ala ali Muhammad, kama barakta ‘ala Ibrahima wa ‘ala ali Ibrahim, innaka Hamidum Majid.',
        english: 'O Allah, send blessings upon Muhammad and the family of Muhammad as You sent blessings upon Ibrahim and the family of Ibrahim. You are Praiseworthy, Glorious. O Allah, bless Muhammad and the family of Muhammad as You blessed Ibrahim and the family of Ibrahim. You are Praiseworthy, Glorious.',
        urdu: 'اے اللہ! محمد ﷺ اور آلِ محمد پر رحمت نازل فرما، جیسے تو نے ابراہیم اور آلِ ابراہیم پر رحمت نازل فرمائی؛ بے شک تو تعریف کے لائق، بزرگی والا ہے۔ اے اللہ! محمد ﷺ اور آلِ محمد پر برکت نازل فرما، جیسے تو نے ابراہیم اور آلِ ابراہیم پر برکت نازل فرمائی؛ بے شک تو تعریف کے لائق، بزرگی والا ہے۔'
      },
      {
        positionEn: 'After Salawat in the final sitting: a Quranic supplication',
        positionUr: 'آخری قعدے میں درود کے بعد: قرآنی دعا',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina ‘adhaban-nar.',
        english: 'Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
        urdu: 'اے ہمارے رب! ہمیں دنیا میں بھلائی دے اور آخرت میں بھی بھلائی دے اور ہمیں آگ کے عذاب سے بچا۔',
        noteEn: 'One of many permissible supplications.',
        noteUr: 'یہ متعدد جائز دعاؤں میں سے ایک دعا ہے۔'
      },
      {
        positionEn: 'Ending the prayer (salam)',
        positionUr: 'نماز ختم کرتے ہوئے (سلام)',
        arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
        transliteration: 'As-salamu ‘alaykum wa rahmatullah.',
        english: 'Peace and Allah’s mercy be upon you.',
        urdu: 'تم پر سلامتی اور اللہ کی رحمت ہو۔',
        noteEn: 'Turn to the right and then the left.',
        noteUr: 'پہلے دائیں اور پھر بائیں طرف سلام پھیریں۔'
      },
      {
        positionEn: 'Third rak‘ah of Witr, before ruku‘ (common Hanafi practice)',
        positionUr: 'وتر کی تیسری رکعت میں رکوع سے پہلے (عام حنفی طریقہ)',
        arabic: 'اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ وَنَشْكُرُكَ وَلَا نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ. اللَّهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ وَإِلَيْكَ نَسْعَى وَنَحْفِدُ وَنَرْجُو رَحْمَتَكَ وَنَخْشَى عَذَابَكَ إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحِقٌ',
        transliteration: 'Allahumma inna nasta‘inuka wa nastaghfiruka wa nu’minu bika wa natawakkalu ‘alayka wa nuthni ‘alaykal-khayra wa nashkuruka wa la nakfuruka wa nakhla‘u wa natruku man yafjuruk. Allahumma iyyaka na‘budu wa laka nusalli wa nasjudu wa ilayka nas‘a wa nahfidu wa narju rahmataka wa nakhsha ‘adhabaka inna ‘adhabaka bil-kuffari mulhiq.',
        english: 'O Allah, we seek Your help and forgiveness, believe in You and rely on You. We praise You, thank You, and are not ungrateful. We reject and leave whoever disobeys You. O Allah, You alone we worship; to You we pray and prostrate. We hasten to You, hope for Your mercy, and fear Your punishment. Surely Your punishment overtakes the disbelievers.',
        urdu: 'اے اللہ! ہم تجھ سے مدد اور بخشش مانگتے ہیں، تجھ پر ایمان لاتے اور تجھ ہی پر بھروسا کرتے ہیں۔ تیری اچھی تعریف کرتے، تیرا شکر کرتے اور ناشکری نہیں کرتے۔ جو تیری نافرمانی کرے ہم اس سے الگ ہوتے ہیں۔ اے اللہ! ہم تیری ہی عبادت کرتے، تیرے لیے نماز پڑھتے اور سجدہ کرتے ہیں، تیری طرف کوشش کرتے ہیں، تیری رحمت کی امید رکھتے اور تیرے عذاب سے ڈرتے ہیں۔ بے شک تیرا عذاب کافروں کو پہنچنے والا ہے۔',
        noteEn: 'Qunut wording and placement differ between schools; this is not used in every prayer.',
        noteUr: 'دعائے قنوت کے الفاظ اور محل فقہی مسلک کے مطابق مختلف ہیں؛ یہ ہر نماز میں نہیں پڑھی جاتی۔'
      },
      {
        positionEn: 'After the obligatory prayer (outside salah)',
        positionUr: 'فرض نماز کے بعد (نماز سے باہر)',
        arabic: 'أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا)، اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
        transliteration: 'Astaghfirullah (three times). Allahumma antas-salam wa minkas-salam, tabarakta ya dhal-jalali wal-ikram.',
        english: 'I seek Allah’s forgiveness (three times). O Allah, You are Peace and from You is peace; blessed are You, Owner of majesty and honor.',
        urdu: 'میں اللہ سے بخشش مانگتا ہوں (تین مرتبہ)۔ اے اللہ! تو سلامتی والا ہے اور تجھی سے سلامتی ہے؛ اے جلال و اکرام والے! تو بابرکت ہے۔',
        noteEn: 'This remembrance is after finishing salah, not part of the prayer itself.',
        noteUr: 'یہ ذکر نماز مکمل ہونے کے بعد ہے، نماز کے اندر نہیں۔'
      },
      {
        positionEn: 'Common remembrance after the obligatory prayer (outside salah)',
        positionUr: 'فرض نماز کے بعد کا عام ذکر (نماز سے باہر)',
        arabic: 'سُبْحَانَ اللَّهِ (٣٣)، الْحَمْدُ لِلَّهِ (٣٣)، اللَّهُ أَكْبَرُ (٣٣)، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'SubhanAllah (33 times), Alhamdulillah (33 times), Allahu Akbar (33 times), then: La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa ‘ala kulli shay’in qadir.',
        english: 'Glory be to Allah (33 times), praise be to Allah (33 times), Allah is the Greatest (33 times), then: There is no god but Allah alone, without partner. His is the dominion and praise, and He has power over all things.',
        urdu: 'اللہ پاک ہے (۳۳ مرتبہ)، تمام تعریف اللہ کے لیے ہے (۳۳ مرتبہ)، اللہ سب سے بڑا ہے (۳۳ مرتبہ)، پھر: اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں؛ بادشاہی اور تعریف اسی کے لیے ہے اور وہ ہر چیز پر قادر ہے۔',
        noteEn: 'This is one commonly taught form; other established post-prayer remembrances also exist.',
        noteUr: 'یہ ذکر کی ایک معروف صورت ہے؛ نماز کے بعد دوسرے ثابت اذکار بھی ہیں۔'
      }
    ],
    noteEn: 'This is a basic learning outline, not a ruling on disputed details. Learn the complete prayer from a trusted teacher in your tradition.',
    noteUr: 'یہ سیکھنے کے لیے بنیادی خاکہ ہے، اختلافی جزئیات کا فتویٰ نہیں۔ اپنی روایت کے معتبر استاد سے مکمل طریقہ سیکھیں۔'
  },
  {
    id: 'fasting',
    titleEn: 'How to fast',
    titleUr: 'روزہ رکھنے کا طریقہ',
    summaryEn: 'A practical outline for the Ramadan fast; exemptions and make-up rules depend on circumstances.',
    summaryUr: 'رمضان کے روزے کا عملی خاکہ؛ رخصت اور قضا کے احکام حالات کے مطابق معلوم کریں۔',
    stepsEn: [
      'Intend to fast for Allah; a spoken formula is not required.',
      'Eat and drink before true dawn, and stop when Fajr begins.',
      'From dawn until sunset, abstain from food, drink, and marital relations, and guard your conduct.',
      'At sunset, break the fast. Do not delay iftar without a reason.',
      'If illness, travel, pregnancy, or another circumstance affects fasting, ask a qualified scholar about your specific obligations.'
    ],
    stepsUr: [
      'اللہ کے لیے روزے کی نیت کریں؛ زبان سے مخصوص الفاظ کہنا لازم نہیں۔',
      'صبحِ صادق سے پہلے کھائیں پئیں اور فجر کا وقت شروع ہونے پر رک جائیں۔',
      'صبحِ صادق سے غروبِ آفتاب تک کھانے، پینے اور ازدواجی تعلق سے بچیں اور اپنے اخلاق کی حفاظت کریں۔',
      'غروبِ آفتاب پر روزہ افطار کریں؛ بلا وجہ افطار میں تاخیر نہ کریں۔',
      'بیماری، سفر، حمل یا کسی دوسری صورت میں اپنے مخصوص حکم کے لیے مستند عالم سے رجوع کریں۔'
    ],
    dua: {
      arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
      transliteration: 'Dhahaba az-zama’u wabtallatil-‘uruqu wa thabatal-ajru in sha Allah.',
      english: 'Thirst has gone, the veins are moist, and the reward is assured, if Allah wills.',
      urdu: 'پیاس ختم ہوئی، رگیں تر ہوئیں اور ان شاء اللہ اجر ثابت ہو گیا۔',
      source: 'Sunan Abi Dawud 2357'
    }
  },
  {
    id: 'zakat',
    titleEn: 'How to give Zakat',
    titleUr: 'زکوٰۃ ادا کرنے کا طریقہ',
    summaryEn: 'Zakat depends on eligible assets, liabilities, the lunar year, and scholarly calculation rules.',
    summaryUr: 'زکوٰۃ کا حساب قابلِ زکوٰۃ مال، واجب الادا قرض، قمری سال اور فقہی اصولوں پر منحصر ہے۔',
    stepsEn: [
      'List your zakatable assets and the debts that your school allows you to deduct.',
      'Check whether your eligible wealth reaches the applicable nisab and has met the required period.',
      'Calculate each asset under a reliable method for your school; business goods, investments, and retirement funds can require specialist advice.',
      'Make the intention to give Zakat and deliver it to an eligible recipient or a trustworthy organization that distributes it on your behalf.',
      'Keep a record of the amount and date for next year’s calculation.'
    ],
    stepsUr: [
      'اپنے قابلِ زکوٰۃ اثاثے اور اپنے فقہی مسلک کے مطابق قابلِ کٹوتی واجب الادا قرض درج کریں۔',
      'دیکھیں کہ مال نصاب تک پہنچا اور مطلوبہ قمری مدت پوری ہوئی یا نہیں۔',
      'معتبر فقہی طریقے سے ہر اثاثے کا حساب کریں؛ کاروباری مال، سرمایہ کاری اور ریٹائرمنٹ فنڈ کے لیے ماہر رہنمائی درکار ہو سکتی ہے۔',
      'زکوٰۃ کی نیت کریں اور مستحق فرد یا قابلِ اعتماد تقسیم کرنے والے ادارے تک پہنچائیں۔',
      'اگلے سال کے حساب کے لیے رقم اور تاریخ محفوظ رکھیں۔'
    ],
    noteEn: 'There is no single required Zakat supplication. Nisab values and asset rules vary; use a qualified local scholar or a reputable Zakat calculator.',
    noteUr: 'زکوٰۃ کے لیے کوئی ایک مقررہ دعا لازم نہیں۔ نصاب اور اثاثوں کے احکام مختلف ہو سکتے ہیں؛ مقامی مستند عالم یا معتبر زکوٰۃ کیلکولیٹر سے مدد لیں۔'
  },
  {
    id: 'hajj',
    titleEn: 'How to perform Hajj',
    titleUr: 'حج ادا کرنے کا طریقہ',
    summaryEn: 'A high-level sequence for the commonly taught Hajj rites. Follow your group and qualified guide for exact timings and rulings.',
    summaryUr: 'حج کے معروف مناسک کی عمومی ترتیب۔ اوقات اور احکام کے لیے اپنے قافلے اور مستند رہنما کی ہدایات لیں۔',
    stepsEn: [
      'Enter ihram at the appointed miqat with the intention for your chosen Hajj type and begin the Talbiyah.',
      'On 8 Dhul-Hijjah, proceed to Mina according to your group’s schedule.',
      'On 9 Dhul-Hijjah, stand at Arafah during its prescribed time, then travel to Muzdalifah after sunset.',
      'On 10 Dhul-Hijjah, perform the rites in their valid order as instructed: stoning, sacrifice when required, shaving or trimming hair, and Tawaf al-Ifadah.',
      'Complete Sa‘i when it is due for your Hajj type, and observe the remaining days and stoning rites.',
      'Perform the farewell Tawaf before leaving Makkah when it is required for you.'
    ],
    stepsUr: [
      'مقررہ میقات پر اپنے منتخب حج کی نیت کے ساتھ احرام باندھیں اور تلبیہ پڑھیں۔',
      '۸ ذوالحجہ کو اپنے قافلے کے شیڈول کے مطابق منیٰ جائیں۔',
      '۹ ذوالحجہ کو مقررہ وقت میں عرفات میں وقوف کریں اور غروب کے بعد مزدلفہ روانہ ہوں۔',
      '۱۰ ذوالحجہ کو معتبر ترتیب کے مطابق رمی، واجب قربانی، حلق یا قصر اور طوافِ افاضہ ادا کریں۔',
      'اپنے حج کی قسم کے مطابق سعی مکمل کریں اور باقی ایام و رمی کے مناسک بجا لائیں۔',
      'مکہ سے روانگی سے پہلے، جہاں لازم ہو، طوافِ وداع کریں۔'
    ],
    dua: {
      arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
      transliteration: 'Labbayk Allahumma labbayk, labbayka la sharika laka labbayk. Innal-hamda wan-ni‘mata laka wal-mulk, la sharika lak.',
      english: 'Here I am, O Allah, here I am. You have no partner; here I am. Surely all praise, blessing, and dominion belong to You. You have no partner.',
      urdu: 'حاضر ہوں اے اللہ، حاضر ہوں۔ تیرا کوئی شریک نہیں، حاضر ہوں۔ بے شک تمام تعریف، نعمت اور بادشاہی تیرے ہی لیے ہے، تیرا کوئی شریک نہیں۔',
      source: 'Sahih al-Bukhari 1549; Sahih Muslim 1184'
    }
  },
  {
    id: 'umrah',
    titleEn: 'How to perform Umrah',
    titleUr: 'عمرہ ادا کرنے کا طریقہ',
    summaryEn: 'The core sequence is ihram, Tawaf, Sa‘i, and shaving or trimming the hair.',
    summaryUr: 'عمرے کے بنیادی مناسک احرام، طواف، سعی اور حلق یا قصر ہیں۔',
    stepsEn: [
      'At the miqat, prepare and enter ihram with the intention for Umrah; recite the Talbiyah.',
      'Upon reaching the Sacred Mosque, perform Tawaf around the Ka‘bah seven circuits, beginning at the Black Stone line.',
      'Pray two rak‘ahs where feasible without obstructing others; this is not a reason to push or crowd.',
      'Perform Sa‘i between Safa and Marwah, completing seven lengths and following the marked route.',
      'Have the hair shaved or trimmed to complete Umrah; women trim a small portion according to their scholarly guidance.'
    ],
    stepsUr: [
      'میقات پر تیاری کرکے عمرے کی نیت کے ساتھ احرام باندھیں اور تلبیہ پڑھیں۔',
      'مسجدِ حرام پہنچ کر حجرِ اسود کی سمت سے خانۂ کعبہ کے سات چکر طواف کریں۔',
      'ممکن ہو اور دوسروں کو تکلیف نہ ہو تو دو رکعت ادا کریں؛ دھکم پیل ہرگز نہ کریں۔',
      'صفا و مروہ کے درمیان نشان زدہ راستے پر سات چکر سعی کریں۔',
      'عمرہ مکمل کرنے کے لیے بال منڈوائیں یا کٹوائیں؛ خواتین اپنے فقہی رہنما کے مطابق بالوں کا کچھ حصہ کاٹیں۔'
    ],
    dua: {
      arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
      transliteration: 'Labbayk Allahumma labbayk, labbayka la sharika laka labbayk.',
      english: 'Here I am, O Allah, here I am. You have no partner; here I am.',
      urdu: 'حاضر ہوں اے اللہ، حاضر ہوں۔ تیرا کوئی شریک نہیں، حاضر ہوں۔',
      source: 'Sahih al-Bukhari 1549'
    },
    noteEn: 'There is no fixed authentic supplication for each Tawaf circuit. Make personal dua and avoid treating unsourced circuit-by-circuit formulas as required.',
    noteUr: 'طواف کے ہر چکر کے لیے کوئی مخصوص ثابت شدہ دعا لازم نہیں؛ اپنی دعا کریں اور غیر مستند مقررہ فارمولوں کو ضروری نہ سمجھیں۔'
  },
  {
    id: 'ghusl',
    titleEn: 'How to perform Ghusl',
    titleUr: 'غسل کرنے کا طریقہ',
    summaryEn: 'A common complete-washing method. The minimum valid requirements and details differ by school of law.',
    summaryUr: 'غسل کا ایک معروف مکمل طریقہ۔ کم از کم شرائط اور بعض جزئیات فقہی مسلک کے مطابق مختلف ہیں۔',
    stepsEn: [
      'Make the intention in your heart to purify yourself; no spoken intention is required.',
      'Wash your hands and remove any visible impurity from the body.',
      'Perform wudu as you would for prayer.',
      'Pour water over the head, ensuring it reaches the roots of the hair.',
      'Wash the entire body, beginning with the right side and then the left; ensure water reaches skin folds and any area that may remain dry.',
      'Avoid wasting water and follow your school’s guidance on mouth and nose rinsing and other validity details.'
    ],
    stepsUr: [
      'پاکی کی نیت دل میں کریں؛ زبان سے نیت کے مخصوص الفاظ ضروری نہیں۔',
      'ہاتھ دھوئیں اور جسم پر لگی ظاہری نجاست دور کریں۔',
      'نماز کے وضو کی طرح وضو کریں۔',
      'سر پر پانی ڈالیں تاکہ بالوں کی جڑوں تک پہنچے۔',
      'پورے جسم پر پانی بہائیں؛ پہلے دایاں پھر بایاں حصہ دھوئیں اور جلد کی تہوں سمیت ہر جگہ پانی پہنچائیں۔',
      'پانی ضائع نہ کریں اور کلی، ناک میں پانی اور دیگر شرائط کے لیے اپنے فقہی مسلک کی رہنمائی لیں۔'
    ],
    noteEn: 'No particular supplication is established as required during Ghusl. Ask a qualified scholar about situations such as braids, wounds, or uncertainty about purification.',
    noteUr: 'غسل کے دوران کوئی خاص دعا لازم ثابت نہیں۔ چوٹیوں، زخم یا طہارت کے شک جیسی صورتوں میں مستند عالم سے پوچھیں۔'
  }
];

const iconByGuide: Record<GuideId, React.ComponentType<{ className?: string }>> = {
  salah: BookOpen,
  fasting: Moon,
  zakat: Coins,
  hajj: MapPinned,
  umrah: MapPinned,
  ghusl: Droplets
};

export const IbadatGuidePage: React.FC = () => {
  const { language, selectedIbadatGuide, setSelectedIbadatGuide } = useApp();
  const isUrdu = language === 'ur';
  const [activeGuideId, setActiveGuideId] = useState<GuideId>(selectedIbadatGuide);
  const guide = guides.find(({ id }) => id === activeGuideId) ?? guides[0];
  const Icon = iconByGuide[guide.id];

  useEffect(() => setActiveGuideId(selectedIbadatGuide), [selectedIbadatGuide]);

  return (
    <section className="mx-auto max-w-5xl space-y-6 pb-24">
      <header className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 text-slate-900 shadow-sm sm:p-8">
        <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
          <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-800">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold text-emerald-950 ${isUrdu ? 'font-nastaliq' : ''}`}>
              {isUrdu ? 'عبادات کی مرحلہ وار رہنمائی' : 'Step-by-step Ibadat guide'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {isUrdu
                ? 'بنیادی رہنمائی اور مستند دعائیں؛ فقہی اختلافات میں اپنے معتبر عالم سے رجوع کریں۔'
                : 'Practical introductions and sourced supplications. Consult a trusted scholar for rulings and differences.'}
            </p>
          </div>
        </div>
      </header>

      <nav aria-label={isUrdu ? 'عبادت منتخب کریں' : 'Choose an act of worship'} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {guides.map((item) => {
          const ItemIcon = iconByGuide[item.id];
          const selected = item.id === activeGuideId;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setActiveGuideId(item.id);
                setSelectedIbadatGuide(item.id);
              }}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                selected
                  ? 'border-amber-400 bg-emerald-900 text-amber-200 shadow-md'
                  : 'border-amber-200 bg-white text-emerald-900 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-amber-200'
              } ${isUrdu ? 'flex-row-reverse font-nastaliq' : ''}`}
            >
              <ItemIcon className="h-4 w-4 shrink-0" />
              {isUrdu ? item.titleUr : item.titleEn}
            </button>
          );
        })}
      </nav>

      <article className="rounded-3xl border border-amber-200/80 bg-white p-5 shadow-sm dark:border-amber-900/60 dark:bg-slate-900 sm:p-8">
        <div className={`mb-6 flex items-start gap-3 border-b border-stone-100 pb-5 dark:border-slate-800 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
          <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-800 dark:bg-emerald-950 dark:text-amber-300">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className={`text-xl font-bold text-emerald-950 dark:text-amber-200 ${isUrdu ? 'font-nastaliq' : ''}`}>
              {isUrdu ? guide.titleUr : guide.titleEn}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {isUrdu ? guide.summaryUr : guide.summaryEn}
            </p>
          </div>
        </div>

        <ol className={`space-y-3 ${isUrdu ? 'text-right' : ''}`}>
          {(isUrdu ? guide.stepsUr : guide.stepsEn).map((step, index) => (
            <li key={step} className={`flex items-start gap-3 rounded-2xl bg-stone-50 p-4 dark:bg-slate-800/70 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-xs font-bold text-amber-200">
                {index + 1}
              </span>
              <span className="text-sm leading-7 text-slate-700 dark:text-slate-200">{step}</span>
            </li>
          ))}
        </ol>

        {guide.recitations && (
          <section className="mt-7">
            <h4 className={`mb-4 text-lg font-bold text-emerald-950 dark:text-amber-200 ${isUrdu ? 'text-right font-nastaliq' : ''}`}>
              {isUrdu ? 'نماز میں ہر مقام کی قراءت' : 'What to recite at each point in Salah'}
            </h4>
            <ol className="space-y-3">
              {guide.recitations.map((recitation, index) => (
                <li key={recitation.positionEn} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
                  <h5 className={`mb-3 flex items-center gap-2 text-sm font-bold text-emerald-900 dark:text-amber-200 ${isUrdu ? 'flex-row-reverse text-right font-nastaliq' : ''}`}>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-xs text-amber-200">
                      {index + 1}
                    </span>
                    {isUrdu ? recitation.positionUr : recitation.positionEn}
                  </h5>
                  <p className="text-right font-quran text-xl leading-loose text-emerald-950 dark:text-amber-100" dir="rtl">
                    {recitation.arabic}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300" dir="ltr">
                    {recitation.transliteration}
                  </p>
                  <p className={`mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200 ${isUrdu ? 'text-right' : ''}`}>
                    {isUrdu ? recitation.urdu : recitation.english}
                  </p>
                  {(recitation.noteEn || recitation.noteUr) && (
                    <p className={`mt-2 text-xs leading-6 text-sky-800 dark:text-sky-200 ${isUrdu ? 'text-right' : ''}`}>
                      {isUrdu ? recitation.noteUr : recitation.noteEn}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        {guide.dua && (
          <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/50 dark:bg-amber-950/20">
            <h4 className={`mb-3 text-sm font-bold text-amber-900 dark:text-amber-300 ${isUrdu ? 'text-right font-nastaliq' : ''}`}>
              {isUrdu ? 'دعا اور حوالہ' : 'Supplication and reference'}
            </h4>
            <p className="text-right font-quran text-2xl leading-loose text-emerald-950 dark:text-amber-100" dir="rtl">
              {guide.dua.arabic}
            </p>
            {guide.dua.transliteration && (
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300" dir="ltr">
                {guide.dua.transliteration}
              </p>
            )}
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
              {isUrdu ? guide.dua.urdu : guide.dua.english}
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{guide.dua.source}</p>
          </section>
        )}

        {(guide.noteEn || guide.noteUr) && (
          <p className={`mt-5 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm leading-7 text-sky-950 dark:border-sky-900/70 dark:bg-sky-950/30 dark:text-sky-100 ${isUrdu ? 'text-right' : ''}`}>
            {isUrdu ? guide.noteUr : guide.noteEn}
          </p>
        )}
      </article>
    </section>
  );
};
