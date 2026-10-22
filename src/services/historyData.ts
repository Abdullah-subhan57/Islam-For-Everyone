import { HistoryFigure } from '../types';

const makeHistoryFigure = (
  id: string,
  nameEn: string,
  nameUr: string,
  titleEn: string,
  titleUr: string,
  eraEn: string,
  eraUr: string,
  type: HistoryFigure['type'],
  summaryEn: string,
  summaryUr: string,
  keyEventsEn: string[],
  keyEventsUr: string[],
  lessonsEn: string,
  lessonsUr: string
): HistoryFigure => ({
  id,
  nameEn,
  nameUr,
  titleEn,
  titleUr,
  eraEn,
  eraUr,
  type,
  timeline: eraEn,
  summaryEn,
  summaryUr,
  keyEventsEn,
  keyEventsUr,
  lessonsEn,
  lessonsUr
});

const ADDITIONAL_QURAN_PROPHETS: HistoryFigure[] = [
  makeHistoryFigure('prophet-idris', 'Prophet Idris (AS)', 'حضرت ادریس علیہ السلام', 'A truthful and patient prophet', 'نبیِ صدیق و صابر', 'Early generations', 'ابتدائی نسلیں', 'prophet', 'The Quran praises Idris as a man of truth and prophethood and says he was raised to a high station.', 'قرآن حضرت ادریس علیہ السلام کو صدیق اور نبی قرار دیتا ہے اور بلند مقام عطا ہونے کا ذکر کرتا ہے۔', ['Remembered in the Quran for truthfulness and patience.'], ['قرآن میں صداقت اور صبر کے ساتھ یاد کیے گئے۔'], 'Truthfulness and patience are lasting marks of faith.', 'سچائی اور صبر ایمان کی دائمی خوبیاں ہیں۔'),
  makeHistoryFigure('prophet-hud', 'Prophet Hud (AS)', 'حضرت ہود علیہ السلام', 'Messenger to the people of Aad', 'قومِ عاد کی طرف رسول', 'Ancient Arabia', 'قدیم عرب', 'prophet', 'Hud called the people of Aad to worship Allah alone and warned them against arrogance and oppression.', 'حضرت ہود علیہ السلام نے قومِ عاد کو ایک اللہ کی عبادت کی دعوت دی اور تکبر و ظلم سے خبردار کیا۔', ['Called Aad to abandon idols and seek forgiveness.'], ['قومِ عاد کو بت پرستی چھوڑنے اور استغفار کی دعوت دی۔'], 'Strength and prosperity do not excuse rejecting truth.', 'طاقت اور خوش حالی حق کو رد کرنے کا جواز نہیں۔'),
  makeHistoryFigure('prophet-salih', 'Prophet Salih (AS)', 'حضرت صالح علیہ السلام', 'Messenger to Thamud', 'قومِ ثمود کی طرف رسول', 'Ancient Arabia', 'قدیم عرب', 'prophet', 'Salih called Thamud to worship Allah and presented the she-camel as a sign, after which his people were warned not to harm it.', 'حضرت صالح علیہ السلام نے قومِ ثمود کو توحید کی دعوت دی اور اونٹنی کو نشانی قرار دیا، جسے نقصان پہنچانے سے منع کیا گیا۔', ['Delivered Allah’s message to Thamud and warned them about the sign.'], ['قومِ ثمود تک اللہ کا پیغام پہنچایا اور نشانی کے بارے میں خبردار کیا۔'], 'A clear sign brings responsibility, not permission to transgress.', 'واضح نشانی ذمہ داری بڑھاتی ہے، زیادتی کی اجازت نہیں دیتی۔'),
  makeHistoryFigure('prophet-lut', 'Prophet Lut (AS)', 'حضرت لوط علیہ السلام', 'Messenger to the people of the towns', 'بستیوں کی طرف رسول', 'Ancient Levant', 'قدیم شام', 'prophet', 'Lut called his people to righteousness and warned them against grave wrongdoing; Allah rescued him and the believers with him.', 'حضرت لوط علیہ السلام نے اپنی قوم کو نیکی کی دعوت دی اور سنگین برائیوں سے خبردار کیا؛ اللہ نے آپ اور اہلِ ایمان کو نجات دی۔', ['Called his people to moral conduct and hospitality.'], ['اپنی قوم کو پاکیزگی اور مہمان نوازی کی تعلیم دی۔'], 'Remain steadfast in principle while treating people with justice.', 'اصول پر ثابت قدم رہیں اور لوگوں کے ساتھ انصاف کریں۔'),
  makeHistoryFigure('prophet-ismail', 'Prophet Ismail (AS)', 'حضرت اسماعیل علیہ السلام', 'Son of Ibrahim and keeper of his promise', 'حضرت ابراہیم کے فرزند و صادق الوعد', 'Makkah', 'مکہ مکرمہ', 'prophet', 'Ismail is praised in the Quran for keeping his promise and caring for prayer; he helped Ibrahim raise the foundations of the Kaaba.', 'قرآن حضرت اسماعیل علیہ السلام کی وعدہ وفائی اور نماز کی تاکید بیان کرتا ہے؛ آپ نے حضرت ابراہیم کے ساتھ کعبہ کی بنیادیں بلند کیں۔', ['Helped Ibrahim build the Kaaba.'], ['حضرت ابراہیم علیہ السلام کے ساتھ کعبہ کی تعمیر میں شریک ہوئے۔'], 'Keep promises and make worship part of family life.', 'وعدہ پورا کریں اور عبادت کو خاندانی زندگی کا حصہ بنائیں۔'),
  makeHistoryFigure('prophet-ishaq', 'Prophet Ishaq (AS)', 'حضرت اسحاق علیہ السلام', 'Son of Ibrahim and a righteous prophet', 'حضرت ابراہیم کے فرزند اور نبی', 'Canaan', 'کنعان', 'prophet', 'Ishaq was granted to Ibrahim and Sarah as glad tidings and was among the righteous prophets chosen by Allah.', 'حضرت اسحاق علیہ السلام حضرت ابراہیم و سارہ کو بشارت کے طور پر عطا ہوئے اور اللہ کے برگزیدہ صالح نبی تھے۔', ['Received glad tidings of a son who would be a prophet among the righteous.'], ['صالحین میں سے بیٹے اور نبی کی بشارت عطا ہوئی۔'], 'Hope and gratitude belong together, even after a long wait.', 'طویل انتظار کے بعد بھی امید اور شکر ساتھ رہتے ہیں۔'),
  makeHistoryFigure('prophet-yaqub', 'Prophet Yaqub (AS)', 'حضرت یعقوب علیہ السلام', 'Israel; a patient prophet', 'اسرائیل؛ صابر نبی', 'Canaan and Egypt', 'کنعان و مصر', 'prophet', 'Yaqub taught his family to worship Allah and showed enduring patience through separation from Yusuf.', 'حضرت یعقوب علیہ السلام نے اپنے گھرانے کو اللہ کی بندگی کی وصیت کی اور یوسف سے جدائی پر طویل صبر کیا۔', ['Advised his sons to hold fast to faith.'], ['اپنے بیٹوں کو ایمان پر قائم رہنے کی نصیحت کی۔'], 'Beautiful patience keeps hope alive without denying grief.', 'صبرِ جمیل غم کے باوجود امید قائم رکھتا ہے۔'),
  makeHistoryFigure('prophet-ayyub', 'Prophet Ayyub (AS)', 'حضرت ایوب علیہ السلام', 'An example of steadfast patience', 'صبر و استقامت کی مثال', 'Ancient Levant', 'قدیم شام', 'prophet', 'Ayyub is remembered for turning to Allah in hardship; the Quran describes Allah answering his prayer and relieving his distress.', 'حضرت ایوب علیہ السلام آزمائش میں اللہ کی طرف رجوع کرنے کے لیے معروف ہیں؛ قرآن دعا کی قبولیت اور تکلیف دور ہونے کا ذکر کرتا ہے۔', ['Called upon Allah during hardship and was granted relief.'], ['آزمائش میں اللہ سے دعا کی اور راحت عطا ہوئی۔'], 'Patience can coexist with asking Allah for help.', 'صبر کے ساتھ اللہ سے مدد مانگنا بھی درست ہے۔'),
  makeHistoryFigure('prophet-shuayb', 'Prophet Shuayb (AS)', 'حضرت شعیب علیہ السلام', 'Messenger to Madyan', 'اہلِ مدین کی طرف رسول', 'Madyan', 'مدین', 'prophet', 'Shuayb called Madyan to worship Allah, give full measure, and avoid corruption and dishonest trade.', 'حضرت شعیب علیہ السلام نے اہلِ مدین کو توحید، پورا ناپ تول اور معاشی دیانت کی دعوت دی۔', ['Condemned fraud in weights and measures.'], ['ناپ تول میں کمی اور دھوکے سے منع فرمایا۔'], 'Worship includes fairness in business and public dealings.', 'عبادت میں تجارت اور معاملات کی دیانت بھی شامل ہے۔'),
  makeHistoryFigure('prophet-harun', 'Prophet Harun (AS)', 'حضرت ہارون علیہ السلام', 'Musa’s brother and prophetic helper', 'حضرت موسیٰ کے بھائی اور مددگار نبی', 'Egypt and Sinai', 'مصر و سینا', 'prophet', 'Harun was appointed alongside Musa to support the mission to Pharaoh and guide the Children of Israel.', 'حضرت ہارون علیہ السلام کو فرعون کے سامنے دعوت اور بنی اسرائیل کی رہنمائی میں حضرت موسیٰ کا مددگار مقرر کیا گیا۔', ['Joined Musa in delivering the message to Pharaoh.'], ['فرعون تک پیغام پہنچانے میں حضرت موسیٰ علیہ السلام کے ساتھ رہے۔'], 'Good leadership welcomes capable support and counsel.', 'اچھی قیادت اہل مدد اور مشورے کو قبول کرتی ہے۔'),
  makeHistoryFigure('prophet-dhulkifl', 'Prophet Dhul-Kifl (AS)', 'حضرت ذوالکفل علیہ السلام', 'Among the patient and righteous', 'صابرین و صالحین میں سے', 'Ancient generations', 'قدیم زمانہ', 'prophet', 'Dhul-Kifl is named in the Quran among the patient, good, and righteous servants of Allah.', 'قرآن حضرت ذوالکفل علیہ السلام کو صبر کرنے والے، نیک اور صالح بندوں میں شمار کرتا ہے۔', ['Remembered by the Quran among the patient and righteous.'], ['قرآن نے صابر اور صالح بندوں میں یاد فرمایا۔'], 'Consistency in goodness is worthy of honor.', 'نیکی پر ثابت قدم رہنا قابلِ قدر ہے۔'),
  makeHistoryFigure('prophet-dawud', 'Prophet Dawud (AS)', 'حضرت داؤد علیہ السلام', 'Prophet, king, and recipient of the Zabur', 'نبی، بادشاہ اور صاحبِ زبور', 'Jerusalem', 'بیت المقدس', 'prophet', 'Dawud was given wisdom and the Zabur; the Quran recalls his worship, just judgment, and the mountains praising Allah with him.', 'حضرت داؤد علیہ السلام کو حکمت اور زبور عطا ہوئی؛ قرآن آپ کی عبادت، منصفانہ فیصلوں اور تسبیح کا ذکر کرتا ہے۔', ['Received the Zabur and was instructed to judge justly.'], ['زبور عطا ہوئی اور انصاف کے ساتھ فیصلے کرنے کی تعلیم دی گئی۔'], 'Authority should deepen worship and strengthen justice.', 'اقتدار عبادت میں اضافہ اور انصاف کی مضبوطی کا ذریعہ ہو۔'),
  makeHistoryFigure('prophet-sulayman', 'Prophet Sulayman (AS)', 'حضرت سلیمان علیہ السلام', 'Prophet and grateful ruler', 'نبی اور شکر گزار فرمانروا', 'Ancient Israel', 'قدیم بنی اسرائیل', 'prophet', 'Sulayman was granted a remarkable kingdom and asked Allah to make him grateful for His blessings.', 'حضرت سلیمان علیہ السلام کو عظیم سلطنت عطا ہوئی اور آپ نے اللہ سے نعمتوں کا شکر ادا کرنے کی توفیق مانگی۔', ['Received a kingdom and openly attributed its blessings to Allah.'], ['سلطنت کی نعمت کو اللہ کا فضل قرار دیا اور شکر ادا کیا۔'], 'The greater the blessing, the greater the need for gratitude.', 'نعمت جتنی بڑی ہو، شکر کی ضرورت اتنی ہی زیادہ ہے۔'),
  makeHistoryFigure('prophet-ilyas', 'Prophet Ilyas (AS)', 'حضرت الیاس علیہ السلام', 'Caller to worship Allah alone', 'توحید کی دعوت دینے والے نبی', 'Ancient Levant', 'قدیم شام', 'prophet', 'Ilyas called his people to worship Allah and leave the idol Baal; the Quran praises him among the messengers.', 'حضرت الیاس علیہ السلام نے اپنی قوم کو اللہ کی عبادت اور بعل نامی بت سے دور رہنے کی دعوت دی؛ قرآن انہیں رسولوں میں شمار کرتا ہے۔', ['Called his people away from Baal worship.'], ['اپنی قوم کو بعل کی عبادت چھوڑنے کی دعوت دی۔'], 'Keep calling to truth with clarity and steadfastness.', 'حق کی دعوت وضاحت اور استقامت سے دیتے رہیں۔'),
  makeHistoryFigure('prophet-al-yasa', 'Prophet Al-Yasa (AS)', 'حضرت الیسع علیہ السلام', 'Among the chosen and righteous', 'برگزیدہ اور نیک بندوں میں سے', 'Ancient Levant', 'قدیم شام', 'prophet', 'Al-Yasa is named in the Quran among the excellent and chosen servants of Allah.', 'حضرت الیسع علیہ السلام کا قرآن میں برگزیدہ اور نیک بندوں کے ساتھ ذکر ہے۔', ['Named among the messengers and the excellent.'], ['رسولوں اور بہترین بندوں میں نام لیا گیا۔'], 'A life of goodness may be remembered through faithful service.', 'اخلاص کے ساتھ خدمت نیکی کی یاد باقی رکھتی ہے۔'),
  makeHistoryFigure('prophet-yunus', 'Prophet Yunus (AS)', 'حضرت یونس علیہ السلام', 'Dhun-Nun; a prophet who returned to Allah', 'ذوالنون؛ اللہ کی طرف رجوع کرنے والے نبی', 'Nineveh', 'نینویٰ', 'prophet', 'Yunus called his people and, in distress, prayed from the darkness; Allah rescued him and his people later believed.', 'حضرت یونس علیہ السلام نے اپنی قوم کو دعوت دی اور آزمائش میں اللہ سے دعا کی؛ اللہ نے نجات عطا فرمائی اور بعد میں قوم ایمان لائی۔', ['Prayed in the darkness with the words of divine oneness and glorification.'], ['تاریکی میں توحید اور تسبیح کے کلمات کے ساتھ دعا فرمائی۔'], 'Never despair of Allah’s mercy; return to Him in every trial.', 'اللہ کی رحمت سے مایوس نہ ہوں اور ہر آزمائش میں اسی کی طرف رجوع کریں۔'),
  makeHistoryFigure('prophet-zakariya', 'Prophet Zakariya (AS)', 'حضرت زکریا علیہ السلام', 'A devoted guardian and prophet', 'عبادت گزار نبی اور کفیل', 'Jerusalem', 'بیت المقدس', 'prophet', 'Zakariya served in worship and prayed for a righteous heir; Allah granted him Yahya despite his old age.', 'حضرت زکریا علیہ السلام عبادت گزار نبی تھے؛ بڑھاپے میں صالح اولاد کی دعا کی تو اللہ نے یحییٰ علیہ السلام عطا فرمائے۔', ['Prayed privately for a good successor and received glad tidings of Yahya.'], ['نیک جانشین کے لیے دعا کی اور حضرت یحییٰ علیہ السلام کی بشارت ملی۔'], 'Turn to Allah with hope, even when circumstances seem difficult.', 'حالات مشکل ہوں تب بھی امید کے ساتھ اللہ سے دعا کریں۔'),
  makeHistoryFigure('prophet-yahya', 'Prophet Yahya (AS)', 'حضرت یحییٰ علیہ السلام', 'A chaste and wise prophet', 'پاکیزہ اور صاحبِ حکمت نبی', 'Jerusalem', 'بیت المقدس', 'prophet', 'Yahya was granted wisdom while young and is praised in the Quran for purity, compassion, and dutifulness.', 'حضرت یحییٰ علیہ السلام کو کم عمری میں حکمت عطا ہوئی؛ قرآن آپ کی پاکیزگی، شفقت اور والدین سے نیکی بیان کرتا ہے۔', ['Received wisdom and was commanded to hold firmly to revelation.'], ['حکمت عطا ہوئی اور کتاب کو مضبوطی سے تھامنے کا حکم ملا۔'], 'Knowledge is most beautiful when joined with mercy and self-discipline.', 'علم کے ساتھ رحمت اور پاکیزگی اسے خوبصورت بناتی ہے۔'),
  makeHistoryFigure('prophet-isa', 'Prophet Isa (AS)', 'حضرت عیسیٰ علیہ السلام', 'Al-Masih and messenger to the Children of Israel', 'مسیح اور بنی اسرائیل کی طرف رسول', 'First century CE', 'پہلی صدی عیسوی', 'prophet', 'Isa was born to Maryam by Allah’s command, given the Injil, and supported with signs by Allah’s permission.', 'حضرت عیسیٰ علیہ السلام حضرت مریم کے ہاں اللہ کے حکم سے پیدا ہوئے، انجیل عطا ہوئی اور اللہ کے اذن سے نشانیاں دکھائیں۔', ['Called people to worship Allah and confirmed the Torah.'], ['لوگوں کو اللہ کی عبادت کی دعوت دی اور تورات کی تصدیق فرمائی۔'], 'The Quran honors Isa and Maryam and calls people to worship Allah alone.', 'قرآن حضرت عیسیٰ و مریم علیہما السلام کی تعظیم اور اللہ کی وحدانیت کی دعوت دیتا ہے۔')
];

export const PROPHETS_HISTORY: HistoryFigure[] = [
  {
    id: 'prophet-adam',
    nameEn: 'Prophet Adam (AS)',
    nameUr: 'حضرت آدم علیہ السلام',
    titleEn: 'Abul-Bashar (Father of Mankind)',
    titleUr: 'ابو البشر (پہلے انسان و پیغمبر)',
    eraEn: 'The Beginning of Creation',
    eraUr: 'آغازِ آفرینش',
    type: 'prophet',
    timeline: 'Dawn of Humanity',
    summaryEn: 'Created by Allah directly from clay, granted celestial knowledge, tested in Jannah, and taught mankind the supreme path of Tawbah (repentance).',
    summaryUr: 'اللہ تعالیٰ نے مٹی سے تخلیق فرمایا، تمام اشیاء کے نام سکھائے، اور توبہ و استغفار کا ابدی راستہ انسانیت کو دکھایا۔',
    keyEventsEn: [
      'Honored by angels prostrating at divine command',
      'Taught names and knowledge of all things',
      'Expulsion from Paradise and reunion with Hawwa at Arafat',
      'The profound supplication of forgiveness (Rabbana zalamna anfusana)'
    ],
    keyEventsUr: [
      'اللہ کے حکم پر فرشتوں کا سجدۂ تعظیم',
      'تمام اشیاء کے ناموں اور حقیقتوں کا علم عطا ہونا',
      'زمین پر نزول اور میدانِ عرفات پر حضرت حوا سے ملاقات',
      'توبہ و مغفرت کی جامع قرآنی دعا (ربنا ظلمنا انفسنا)'
    ],
    lessonsEn: 'True repentance reconciles human error with divine mercy; arrogance leads to downfall while humility elevates.',
    lessonsUr: 'غلطی کا اعتراف اور سچی توبہ اللہ کی رحمت کو متوجہ کرتی ہے، عاجزی بلندی عطا کرتی ہے۔'
  },
  {
    id: 'prophet-nuh',
    nameEn: 'Prophet Nuh (AS)',
    nameUr: 'حضرت نوح علیہ السلام',
    titleEn: 'Shaikh al-Anbiya (Elder of the Prophets)',
    titleUr: 'شیخ الانبیاء',
    eraEn: 'Pre-Flood Antiquity',
    eraUr: 'طوفانِ نوح کا دور',
    type: 'prophet',
    timeline: '950 Years of Calling to Tawheed',
    summaryEn: 'Called his idolatrous people to monotheism with unmatched patience for 950 years before constructing the Ark on Mount Judi under divine guidance.',
    summaryUr: 'ساڑھے نو سو سال تک رات دن اپنی قوم کو توحید کی دعوت دی، اور اللہ کے حکم سے سفینۂ نوح تیار کر کے اہل ایمان کو طوفان سے بچایا۔',
    keyEventsEn: [
      'Persistent preaching through centuries without despair',
      'Construction of the historic Ark far from the sea',
      'The Great Deluge cleansing the earth from tyranny',
      'Ark safely coming to rest upon Mount Judi'
    ],
    keyEventsUr: [
      'صدیوں تک بغیر ہمت ہارے دعوتِ حق کا تسلسل',
      'سمندر سے دور پہاڑ پر عظیم الشان کشتی کی تعمیر',
      'عظیم طوفان جس نے سرکش نافرمانوں کو غرق کیا',
      'کوہِ جودی پر سفینۂ نوح کا سلامتی کے ساتھ ٹھہرنا'
    ],
    lessonsEn: 'Patience and steadfast devotion to truth are triumphant, regardless of how few people initially listen.',
    lessonsUr: 'حق کی راہ میں استقامت اور صبر ہی اصل کامیابی ہے، نتیجہ اللہ کے سپرد ہوتا ہے۔'
  },
  {
    id: 'prophet-ibrahim',
    nameEn: 'Prophet Ibrahim (AS)',
    nameUr: 'حضرت ابراہیم علیہ السلام',
    titleEn: 'Khalilullah (Close Friend of Allah) & Father of Prophets',
    titleUr: 'خلیل اللہ و جد الانبیاء',
    eraEn: 'Circa 2000 BCE',
    eraUr: 'قدیم بابل و کنعان کا دور',
    type: 'prophet',
    timeline: 'From Ur (Mesopotamia) to Makkah & Sham',
    summaryEn: 'The champion of pure Monotheism who smashed idols, emerged unscathed from Nimrod\'s inferno, rebuilt the Holy Kaaba, and instituted Hajj.',
    summaryUr: 'توحید کے عظیم سرخیل، بت شکن پیغمبر، جو نمرود کی دہکتی آگ سے بے خوف گزرے، کعبۃ اللہ کو دوبارہ تعمیر کیا اور سنتِ قربانی قائم کی۔',
    keyEventsEn: [
      'Logical refutation of celestial idol worship',
      'Miraculous cooling of Nimrod’s fire into a garden of peace',
      'Leaving Lady Hajar and baby Ismail in the barren valley of Bakkah',
      'Reconstruction of the Holy Kaaba with Ismail (AS) and institution of Hajj'
    ],
    keyEventsUr: [
      'ستارہ پرستوں اور بت پرستوں کا دلائل سے ناطقہ بند کرنا',
      'نمرود کی دہکتی آگ کا گلزار بن جانا',
      'حضرت ہاجرہ اور اسماعیل کو وادیِ مکہ میں بسانا اور چشمۂ زمزم کا پھوٹنا',
      'حضرت اسماعیل کے ساتھ مل کر کعبۃ اللہ کی تعمیر اور حج کا اعلان'
    ],
    lessonsEn: 'Total submission to the Creator transcends material attachments and guarantees eternal legacy.',
    lessonsUr: 'اللہ تعالیٰ کے ہر حکم کے سامنے بلا جھجک سر تسلیمِ خم کرنا ہی اصل ایمان اور بندگی ہے۔'
  },
  {
    id: 'prophet-yusuf',
    nameEn: 'Prophet Yusuf (AS)',
    nameUr: 'حضرت یوسف علیہ السلام',
    titleEn: 'As-Siddiq (The Truthful & Noble)',
    titleUr: 'الصدیق و احسن القصص کا ہیرو',
    eraEn: 'Ancient Egypt',
    eraUr: 'قدیم مصر کا دور',
    type: 'prophet',
    timeline: 'From the Pit to the Throne of Egypt',
    summaryEn: 'His life is termed Ahsan al-Qasas (The Most Beautiful Story) in the Quran: overcoming betrayal, false imprisonment, famine, and forgiving his brothers with supreme grace.',
    summaryUr: 'قرآن مجید کا ’’احسن القصص‘‘، بھائیوں کی سازش، کنویں کی تنہائی، قید و بند کی صعوبتوں سے گزر کر مصر کے تخت پر فائز ہونا اور بھائیوں کو معاف فرمانا۔',
    keyEventsEn: [
      'The prophetic dream of eleven stars, the sun, and the moon',
      'Surviving the well and steadfast resistance against temptation in Potiphar\'s house',
      'Interpreting Pharaoh\'s dream and saving Egypt from catastrophic famine',
      'Emotional reunion and unconditional forgiveness of his brothers'
    ],
    keyEventsUr: [
      'گیارہ ستاروں، سورج اور چاند کے سجدے کا مبارک خواب',
      'کنویں کی آزمائش اور عزیزِ مصر کے محل میں عفت و پاکدامنی کی حفاظت',
      'بادشاہ کے خواب کی تعبیر اور مصر کو ہلاکت خیز قحط سے بچانا',
      'بھائیوں سے ملن اور انتقام کے بجائے ’’لا تثریب علیکم الیوم‘‘ کا اعلان'
    ],
    lessonsEn: 'Chastity, patience in trials, and magnanimous forgiveness turn adversity into triumph.',
    lessonsUr: 'صبر، پاکدامنی اور انتقام کی طاقت کے باوجود معاف کر دینا انسان کو حقیقی عزت دیتا ہے۔'
  },
  {
    id: 'prophet-musa',
    nameEn: 'Prophet Musa (AS)',
    nameUr: 'حضرت موسیٰ علیہ السلام',
    titleEn: 'Kalimullah (The One Who Spoke Directly with Allah)',
    titleUr: 'کلیم اللہ',
    eraEn: 'Ancient Egypt & Sinai',
    eraUr: 'دورِ فرعون و بنی اسرائیل',
    type: 'prophet',
    timeline: 'Exodus of Bani Israel',
    summaryEn: 'Confronted the tyrant Pharaoh with miracles, led Bani Israel through the parted Red Sea, spoke with Allah on Mount Tur, and received the Torah.',
    summaryUr: 'فرعون جیسے جابر حکمران کے سامنے کلمۂ حق کہنا، دریائے نیل کا پھٹنا، کوہِ طور پر باری تعالیٰ سے ہم کلام ہونا اور تورات کا عطا ہونا۔',
    keyEventsEn: [
      'Raised in the palace of the tyrant who decreed the death of boys',
      'Conversation with the Divine at the burning bush on Mount Tur',
      'Parting of the Red Sea and drowning of Pharaoh',
      'Receiving the Ten Commandments and the Torah on Mount Sinai'
    ],
    keyEventsUr: [
      'فرعون کے ہی محل میں پرورش پانا جس نے بچوں کو قتل کروایا تھا',
      'وادیِ طویٰ میں درخت کے نور سے ہمکلامی کا شرف',
      'عصا کے معجزے سے سمندر کا دو لخت ہونا اور فرعون کا غرقاب ہونا',
      'کوہِ طور پر تورات کی تختیاں عطا ہونا'
    ],
    lessonsEn: 'Tyranny however colossal inevitably crumbles before truth; Allah protects His righteous servants against all odds.',
    lessonsUr: 'ظلم جتنا بھی طاقتور ہو، حق کے سامنے ہمیشہ پاش پاش ہوتا ہے اور اللہ اپنے بندوں کا محافظ ہے۔'
  },
  {
    id: 'prophet-muhammad',
    nameEn: 'Prophet Muhammad ﷺ',
    nameUr: 'حضرت محمد مصطفیٰ ﷺ',
    titleEn: 'Khatam an-Nabiyyin & Rahmatan lil-Alamin',
    titleUr: 'خاتم النبیین و رحمۃ للعالمین',
    eraEn: '570 – 632 CE',
    eraUr: 'دورِ نبوت و نزولِ قرآن',
    type: 'prophet',
    timeline: '23 Years of Prophetic Mission',
    summaryEn: 'The Final Messenger of Allah to all humanity, who brought the Holy Quran, transformed Arabian desert tribes into the vanguard of justice and morality, and established the Madinan model state.',
    summaryUr: 'سلسلۂ نبوت کے تاجدار، قرآن مجید کے لانے والے، جنہوں نے جاہلیت میں ڈوبی دنیا کو اخلاق، عدل، علم اور توحید کا روشن مینار بنایا۔',
    keyEventsEn: [
      'First revelation in Cave Hira (Iqra bismi Rabbika)',
      'Perseverance through Makkan persecution and the Night Journey (Isra & Mi\'raj)',
      'The Great Hijrah to Madinah and establishment of the Charter of Madinah (Misaq-e-Madinah)',
      'Fath Makkah and the immortal Farewell Pilgrimage Sermon'
    ],
    keyEventsUr: [
      'غارِ حرا میں پہلی وحی ’’اقرأ باسم ربک‘‘ کا نزول',
      'مکہ میں مظالم پر صبر اور معراج النبی ﷺ کا معجزہ',
      'مدینہ منورہ کی طرف ہجرت اور میثاقِ مدینہ کی بنیاد',
      'فتحِ مکہ اور حجۃ الوداع کا تاریخ ساز عالمگیر خطبہ'
    ],
    lessonsEn: 'The supreme embodiment of mercy, honesty, courage, leadership, and universal compassion.',
    lessonsUr: 'آپ ﷺ کا اسوۂ حسنہ رہتی دنیا تک ہر شعبۂ زندگی کے لیے کامل رہنمائی اور نجات کا ذریعہ ہے۔'
  },
  ...ADDITIONAL_QURAN_PROPHETS
];

export const ISLAMIC_DYNASTIES: HistoryFigure[] = [
  makeHistoryFigure('dynasty-umayyad', 'Umayyad Caliphate', 'خلافتِ امویہ', 'A major early caliphate', 'ابتدائی بڑی خلافت', '661–750 CE', '۴۱–۱۳۲ ہجری', 'empire', 'The Umayyad dynasty ruled from Damascus and governed a vast territory spanning parts of Asia, Africa, and Europe.', 'اموی خاندان نے دمشق سے حکومت کی اور ایشیا، افریقہ اور یورپ کے وسیع علاقوں تک سلطنت پھیلی۔', ['Damascus became the political capital.', 'The Dome of the Rock was built in Jerusalem.', 'Arabic administration expanded across provinces.'], ['دمشق سیاسی دارالحکومت بنا۔', 'بیت المقدس میں قبۃ الصخرہ تعمیر ہوئی۔', 'صوبوں میں عربی انتظامی نظام وسیع ہوا۔'], 'A wide realm requires accountable, just administration.', 'وسیع سلطنت کے لیے جواب دہ اور منصفانہ انتظام ضروری ہے۔'),
  makeHistoryFigure('dynasty-abbasid', 'Abbasid Caliphate', 'خلافتِ عباسیہ', 'Caliphate of Baghdad', 'خلافتِ بغداد', '750–1258 CE (Baghdad period)', '۱۳۲–۶۵۶ ہجری (دورِ بغداد)', 'empire', 'The Abbasid era made Baghdad a major political and intellectual center. Scholars across many fields worked in cities throughout the caliphate; Mongol forces captured Baghdad in 1258.', 'عباسی دور میں بغداد ایک اہم سیاسی اور علمی مرکز بنا۔ خلافت کے شہروں میں مختلف علوم پر کام ہوا؛ ۱۲۵۸ء میں منگول لشکروں نے بغداد پر قبضہ کیا۔', ['Baghdad was founded as the capital in 762 CE.', 'Libraries, translation, medicine, mathematics, and astronomy flourished in many cities.', 'The fall of Baghdad in 1258 ended Abbasid rule there.'], ['۷۶۲ء میں بغداد کو دارالحکومت بنایا گیا۔', 'مختلف شہروں میں کتب خانوں، ترجمہ، طب، ریاضی اور فلکیات کو فروغ ملا۔', '۱۲۵۸ء میں بغداد کے سقوط سے وہاں عباسی اقتدار ختم ہوا۔'], 'Learning thrives through institutions, exchange, and patronage.', 'تعلیم اداروں، علمی تبادلے اور سرپرستی سے ترقی کرتی ہے۔'),
  makeHistoryFigure('dynasty-seljuk', 'Seljuk Sultanate', 'سلطنتِ سلجوقیہ', 'Turkic sultanate and Abbasid-era power', 'ترک سلطنت اور عباسی دور کی قوت', '11th–12th centuries CE', 'پانچویں–چھٹی صدی ہجری', 'empire', 'The Seljuks became a leading power in the Middle East, supported Abbasid caliphs, and established centers of learning across their lands.', 'سلجوق مشرقِ وسطیٰ کی نمایاں قوت بنے، عباسی خلفا کی سرپرستی کی اور اپنے علاقوں میں علمی مراکز قائم کیے۔', ['Tughril Beg entered Baghdad in 1055.', 'Nizam al-Mulk supported the Nizamiyya schools.', 'Seljuk rule shaped Anatolia and the wider region.'], ['طغرل بیگ ۱۰۵۵ء میں بغداد میں داخل ہوئے۔', 'نظام الملک نے مدارسِ نظامیہ کی سرپرستی کی۔', 'سلجوقی اقتدار نے اناطولیہ اور خطے کی تاریخ پر اثر ڈالا۔'], 'Strong institutions can support scholarship and public life.', 'مضبوط ادارے علم اور اجتماعی زندگی کو سہارا دیتے ہیں۔'),
  makeHistoryFigure('dynasty-ayyubid', 'Ayyubid Sultanate', 'سلطنتِ ایوبیہ', 'State founded by Salah ad-Din', 'سلطنتِ صلاح الدین ایوبی', '1171–1260 CE', '۵۶۷–۶۵۸ ہجری', 'empire', 'The Ayyubids, founded by Salah ad-Din, governed Egypt and parts of the Levant and are associated with the recovery of Jerusalem in 1187.', 'صلاح الدین ایوبی کے قائم کردہ ایوبی خاندان نے مصر اور شام کے بعض علاقوں پر حکومت کی؛ ۱۱۸۷ء میں بیت المقدس کی بازیابی اس دور کا اہم واقعہ ہے۔', ['Salah ad-Din established rule in Egypt.', 'Jerusalem came under Ayyubid control in 1187.', 'Hospitals, schools, and fortifications were supported.'], ['صلاح الدین ایوبی نے مصر میں اقتدار قائم کیا۔', '۱۱۸۷ء میں بیت المقدس ایوبی اقتدار میں آیا۔', 'شفاخانوں، مدارس اور قلعہ بندی کی سرپرستی ہوئی۔'], 'Leadership can pair military affairs with public service and restraint.', 'قیادت دفاع کے ساتھ عوامی خدمت اور ضبط کو بھی اہمیت دے۔'),
  makeHistoryFigure('dynasty-mamluk', 'Mamluk Sultanate', 'سلطنتِ ممالیک', 'Sultanate based in Egypt and Syria', 'مصر و شام کی سلطنت', '1250–1517 CE', '۶۴۸–۹۲۳ ہجری', 'empire', 'The Mamluk sultanate ruled Egypt and Syria, resisted the Mongol advance at Ayn Jalut, and hosted scholars and pilgrims.', 'مملوک سلطنت نے مصر اور شام پر حکومت کی، عین جالوت میں منگول پیش قدمی روکی، اور علما و حجاج کی سرپرستی کی۔', ['Mamluk forces defeated the Mongols at Ayn Jalut in 1260.', 'Cairo became a leading center of learning and trade.', 'The sultanate ended after the Ottoman conquest of Egypt.'], ['۱۲۶۰ء میں مملوک لشکر نے عین جالوت میں منگولوں کو شکست دی۔', 'قاہرہ علم و تجارت کا اہم مرکز بنا۔', 'عثمانی فتحِ مصر کے بعد مملوک سلطنت ختم ہوئی۔'], 'Resilience is strengthened by civic institutions and learning.', 'علم اور اجتماعی ادارے معاشرے کو مضبوط بناتے ہیں۔'),
  makeHistoryFigure('dynasty-abbasid-cairo', 'Abbasid Caliphate of Cairo', 'خلافتِ عباسیہ قاہرہ', 'Ceremonial Abbasid caliphate under Mamluk protection', 'مملوک سرپرستی میں عباسی خلافت', '1261–1517 CE', '۶۵۹–۹۲۳ ہجری', 'empire', 'After Baghdad fell, Abbasid caliphs held a ceremonial role in Cairo under Mamluk rule; this was distinct from the earlier Baghdad caliphate.', 'بغداد کے سقوط کے بعد عباسی خلفا نے مملوک دور میں قاہرہ میں رسمی حیثیت برقرار رکھی؛ یہ بغداد کے پہلے عباسی دور سے الگ مرحلہ تھا۔', ['The Abbasid caliphal line was re-established in Cairo in 1261.', 'Political authority rested with the Mamluk sultans.', 'The Cairo line ended with the Ottoman conquest in 1517.'], ['۱۲۶۱ء میں قاہرہ میں عباسی خلافت کی تجدید ہوئی۔', 'سیاسی اقتدار مملوک سلاطین کے پاس رہا۔', '۱۵۱۷ء میں عثمانی فتح کے ساتھ قاہرہ کا یہ سلسلہ ختم ہوا۔'], 'Historical titles and effective political power are not always the same.', 'تاریخی لقب اور حقیقی سیاسی اقتدار ہمیشہ ایک چیز نہیں ہوتے۔'),
  makeHistoryFigure('dynasty-ottoman', 'Ottoman Empire and Caliphate', 'سلطنت و خلافتِ عثمانیہ', 'Long-lived empire centered in Anatolia', 'اناطولیہ مرکز طویل سلطنت', 'c. 1299–1922 CE; caliphate claim ended 1924', 'تقریباً ۶۹۹–۱۳۴۱ ہجری؛ خلافت ۱۹۲۴ء میں ختم', 'empire', 'The Ottoman state grew from Anatolia into a multi-continental empire. It captured Constantinople in 1453; the sultanate ended in 1922 and the caliphate was abolished in 1924.', 'عثمانی ریاست اناطولیہ سے پھیل کر متعدد براعظموں کی سلطنت بنی۔ ۱۴۵۳ء میں قسطنطنیہ فتح ہوا؛ ۱۹۲۲ء میں سلطنتِ سلاطین اور ۱۹۲۴ء میں خلافت کا ادارہ ختم ہوا۔', ['Constantinople was conquered in 1453.', 'Ottoman rule shaped institutions, architecture, and law across many regions.', 'The Republic of Turkey abolished the sultanate in 1922 and the caliphate in 1924.'], ['۱۴۵۳ء میں قسطنطنیہ فتح ہوا۔', 'عثمانی دور نے کئی خطوں کے اداروں، فنِ تعمیر اور قانون پر اثر ڈالا۔', 'ترکی میں ۱۹۲۲ء میں سلطنتِ سلاطین اور ۱۹۲۴ء میں خلافت ختم ہوئی۔'], 'Long-lasting governance requires adaptation, justice, and accountable institutions.', 'دیرپا حکمرانی کے لیے تبدیلی قبول کرنا، انصاف اور جواب دہ ادارے ضروری ہیں۔')
];

export const CALIPHS_HISTORY: HistoryFigure[] = [
  {
    id: 'caliph-abu-bakr',
    nameEn: 'Hazrat Abu Bakr as-Siddiq (RA)',
    nameUr: 'سیدنا ابوبکر صدیق رضی اللہ عنہ',
    titleEn: 'First Rightly Guided Caliph (Al-Khalifah al-Awwal)',
    titleUr: 'خلیفۂ اول، یارِ غار و یارِ مزار',
    eraEn: '11 – 13 AH (632 – 634 CE)',
    eraUr: '۱۱ تا ۱۳ ہجری',
    type: 'caliph',
    timeline: '2 Years and 3 Months of Resolute Leadership',
    summaryEn: 'Closest companion of the Prophet ﷺ, first adult male to accept Islam, preserved the unity of the Ummah during the Ridda wars, and initiated the official compilation of the Holy Quran.',
    summaryUr: 'حضور ﷺ کے سب سے افضل و پیارے رفیق، ہجرت کے ساتھی، فتنۂ ارتداد کا خاتمہ فرمایا اور قرآن مجید کو ایک جلد میں جمع کروایا۔',
    keyEventsEn: [
      'First to confirm the miraculous night journey without hesitation (earning title As-Siddiq)',
      'Steadying the Ummah upon the demise of the Prophet ﷺ ("Whoever worshipped Muhammad, Muhammad has died...")',
      'Decisive crushing of false prophets and preservation of Zakat',
      'Commissioning Zaid ibn Thabit (RA) to compile the Quran into a single Mushaf'
    ],
    keyEventsUr: [
      'واقعۂ معراج کی سب سے پہلے بلا جھجک تصدیق فرما کر ’’صدیق‘‘ کا لقب پانا',
      'وصالِ نبوی ﷺ کے وقت امت کو سنبھالنا (من کان یعبد محمداً...)',
      'جھوٹے مدعیانِ نبوت اور منکرینِ زکوٰۃ کا مکمل خاتمہ',
      'حضرت زید بن ثابتؓ کو قرآن مجید ایک نسخے میں مدون کرنے کی ذمہ داری سونپنا'
    ],
    lessonsEn: 'Uncompromising faith, gentleness paired with steadfast resolve in times of existential crisis.',
    lessonsUr: 'انتہائی نرم دلی کے باوجود حق کے معاملے میں چٹان جیسی مضبوطی اور وفاداری۔'
  },
  {
    id: 'caliph-umar',
    nameEn: 'Hazrat Umar ibn al-Khattab (RA)',
    nameUr: 'سیدنا عمر بن خطاب رضی اللہ عنہ',
    titleEn: 'Al-Farooq (The Discerner of Truth and Falsehood)',
    titleUr: 'خلیفۂ دوم، امیر المومنین الفاروق',
    eraEn: '13 – 23 AH (634 – 644 CE)',
    eraUr: '۱۳ تا ۲۳ ہجری',
    type: 'caliph',
    timeline: '10 Glorious Years of Justice and Expansion',
    summaryEn: 'Established welfare state governance, judicial separation, public treasury (Bayt al-Mal), postal system, Hijri calendar, and brought Jerusalem into Islamic guardianship without bloodshed.',
    summaryUr: 'عدل و انصاف کے سب سے بڑے علمبردار، اسلامی ریاست کو بائیس لاکھ مربع میل تک وسعت دی، بیت المال اور ہجری کیلنڈر کا نظام قائم کیا۔',
    keyEventsEn: [
      'Establishment of the Islamic Hijri calendar system',
      'Conquest of Roman Byzantine territories and Persian Sasanian Empire',
      'Peaceful treaty and entry into Jerusalem (Masjid al-Aqsa)',
      'Night patrols checking on destitute citizens and widows'
    ],
    keyEventsUr: [
      'ہجری تقویم (کیلنڈر) اور تاریخ کا باقاعدہ آغاز',
      'رومی اور ایرانی سلطنتوں کی شکست اور اسلامی سرحدوں کی تاریخی وسعت',
      'بیت المقدس کی پرامن فتح اور عیسائیوں کے ساتھ تاریخ ساز معاہدہ',
      'راتوں کو بھیس بدل کر رعایا کے دکھ درد اور بھوک کی خبر گیری'
    ],
    lessonsEn: 'Accountability in leadership: "If a stray camel dies on the banks of the Euphrates, Umar fears Allah will question him."',
    lessonsUr: 'حکمرانی میں کڑا احتساب: ’’اگر فرات کے کنارے کتا بھی پیاسا مر جائے تو عمر سے بازپرس ہو گی‘‘۔'
  },
  {
    id: 'caliph-uthman',
    nameEn: 'Hazrat Uthman ibn Affan (RA)',
    nameUr: 'سیدنا عثمان بن عفان رضی اللہ عنہ',
    titleEn: 'Dhun-Nurayn (Possessor of the Two Lights)',
    titleUr: 'خلیفۂ سوم، ذو النورین، پیکرِ حیا و سخا',
    eraEn: '23 – 35 AH (644 – 656 CE)',
    eraUr: '۲۳ تا ۳۵ ہجری',
    type: 'caliph',
    timeline: '12 Years of Generosity and Standardization',
    summaryEn: 'Married two daughters of the Prophet ﷺ, purchased the well of Rumah for Muslims, equipped the army of Tabuk, and standardized the official Uthmanic Quranic script sent to all corners of the world.',
    summaryUr: 'رسول اللہ ﷺ کی دو بیٹیوں کے شوہر، بئرِ رومہ خرید کر وقف کرنے والے، اور قرآن مجید کو ایک رسم الخط (مصحفِ عثمانی) پر متحد فرمانے والے۔',
    keyEventsEn: [
      'Single-handedly financing the Army of Hardship (Jaysh al-Usrah) for Tabuk',
      'Standardization and distribution of the Master Mushaf (Rasm Uthmani) globally',
      'Construction of the first Islamic naval fleet',
      'Refusal to spill Muslim blood even while besieged in his own home'
    ],
    keyEventsUr: [
      'غزوۂ تبوک کے لیے اپنے مال سے پورے لشکر کو سامان مہیا کرنا',
      'قرآن پاک کے مستند نسخے تیار کر کے تمام اسلامی صوبوں میں روانہ کرنا',
      'پہلے اسلامی بحری بیڑے کی تشکیل',
      'گھر کے محاصرے کے دوران مسلمانوں کا خون بہانے سے سختی سے انکار اور شہادت'
    ],
    lessonsEn: 'Modesty, philanthropic generosity, and preferring self-sacrifice over civil strife within the community.',
    lessonsUr: 'بے مثال حیا، فی سبیل اللہ سخاوت اور امت کے اتحاد کے لیے اپنی جان قربان کر دینا۔'
  },
  {
    id: 'caliph-ali',
    nameEn: 'Hazrat Ali ibn Abi Talib (RA)',
    nameUr: 'سیدنا علی بن ابی طالب رضی اللہ عنہ',
    titleEn: 'Asadullah (Lion of Allah) & Bab Madinat al-Ilm',
    titleUr: 'خلیفۂ چہارم، اسد اللہ الغالب، باب مدینۃ العلم',
    eraEn: '35 – 40 AH (656 – 661 CE)',
    eraUr: '۳۵ تا ۴۰ ہجری',
    type: 'caliph',
    timeline: '5 Years of Eloquence, Wisdom, and Valour',
    summaryEn: 'Cousin and son-in-law of the Prophet ﷺ (husband of Sayyidah Fatimah), first youth to accept Islam, conqueror of Khaybar, and unparalleled fountain of Arabic eloquence and judicial wisdom.',
    summaryUr: 'دامادِ رسول ﷺ، بچوں میں سب سے پہلے اسلام لانے والے، فاتحِ خیبر، علم و حکمت اور شجاعت کا سمندر جن کے فیصلوں پر صحابہ ناز کرتے تھے۔',
    keyEventsEn: [
      'Sleeping fearless in the Prophet’s bed on the night of Hijrah',
      'Uprooting the fortified gate of Khaybar with heroic valor',
      'Unsurpassed judicial arbitration recorded in Islamic legal history',
      'Monumental sermons and maxims collected in Nahj al-Balaghah'
    ],
    keyEventsUr: [
      'ہجرت کی رات رسول اللہ ﷺ کے بستر پر تلواروں کے سائے میں بے خوف سونا',
      'غزوۂ خیبر کا قلعہ فتح کرنا اور مرحب کو زیر کرنا',
      'پیچیدہ ترین مقدمات کے ایسے عدالتی فیصلے جن کی مثال نہیں ملتی',
      'بلاغت، زہد اور حکمت کے وہ اقوال و خطبات جو تاریخ کا شاہکار ہیں'
    ],
    lessonsEn: 'Courage is nothing without humility; profound knowledge must bear the fruit of selflessness and asceticism.',
    lessonsUr: 'شجاعت علم اور تقویٰ کے بغیر ادھوری ہے، دنیا کی عارضی چمک کے مقابلے میں آخرت کو ترجیح دینا۔'
  }
];
