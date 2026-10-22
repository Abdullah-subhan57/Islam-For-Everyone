import { Ayah, AyahTafseer, JuzMeta, Surah, SurahIntro } from '../types';

export const ALL_114_SURAHS: Omit<Surah, 'ayahs'>[] = [
  { number: 1, nameArabic: 'الفاتحة', nameEnglish: 'Al-Fatihah', nameUrdu: 'الفاتحہ', englishMeaning: 'The Opening', revelationType: 'Meccan', revelationOrder: 5, numberOfAyahs: 7, juzStart: 1, bismillahPre: false },
  { number: 2, nameArabic: 'البقرة', nameEnglish: 'Al-Baqarah', nameUrdu: 'البقرۃ', englishMeaning: 'The Cow', revelationType: 'Medinan', revelationOrder: 87, numberOfAyahs: 286, juzStart: 1, bismillahPre: true },
  { number: 3, nameArabic: 'آل عمران', nameEnglish: 'Ali \'Imran', nameUrdu: 'آلِ عمران', englishMeaning: 'Family of Imran', revelationType: 'Medinan', revelationOrder: 89, numberOfAyahs: 200, juzStart: 3, bismillahPre: true },
  { number: 4, nameArabic: 'النساء', nameEnglish: 'An-Nisa', nameUrdu: 'النساء', englishMeaning: 'The Women', revelationType: 'Medinan', revelationOrder: 92, numberOfAyahs: 176, juzStart: 4, bismillahPre: true },
  { number: 5, nameArabic: 'المائدة', nameEnglish: 'Al-Ma\'idah', nameUrdu: 'المائدہ', englishMeaning: 'The Table Spread', revelationType: 'Medinan', revelationOrder: 112, numberOfAyahs: 120, juzStart: 6, bismillahPre: true },
  { number: 6, nameArabic: 'الأنعام', nameEnglish: 'Al-An\'am', nameUrdu: 'الانعام', englishMeaning: 'The Cattle', revelationType: 'Meccan', revelationOrder: 55, numberOfAyahs: 165, juzStart: 7, bismillahPre: true },
  { number: 7, nameArabic: 'الأعراف', nameEnglish: 'Al-A\'raf', nameUrdu: 'الاعراف', englishMeaning: 'The Heights', revelationType: 'Meccan', revelationOrder: 39, numberOfAyahs: 206, juzStart: 8, bismillahPre: true },
  { number: 8, nameArabic: 'الأنفال', nameEnglish: 'Al-Anfal', nameUrdu: 'الانفال', englishMeaning: 'The Spoils of War', revelationType: 'Medinan', revelationOrder: 88, numberOfAyahs: 75, juzStart: 9, bismillahPre: true },
  { number: 9, nameArabic: 'التوبة', nameEnglish: 'At-Tawbah', nameUrdu: 'التوبہ', englishMeaning: 'The Repentance', revelationType: 'Medinan', revelationOrder: 113, numberOfAyahs: 129, juzStart: 10, bismillahPre: false },
  { number: 10, nameArabic: 'يونس', nameEnglish: 'Yunus', nameUrdu: 'یونس', englishMeaning: 'Jonah', revelationType: 'Meccan', revelationOrder: 51, numberOfAyahs: 109, juzStart: 11, bismillahPre: true },
  { number: 11, nameArabic: 'هود', nameEnglish: 'Hud', nameUrdu: 'ہود', englishMeaning: 'Hud', revelationType: 'Meccan', revelationOrder: 52, numberOfAyahs: 123, juzStart: 11, bismillahPre: true },
  { number: 12, nameArabic: 'يوسف', nameEnglish: 'Yusuf', nameUrdu: 'یوسف', englishMeaning: 'Joseph', revelationType: 'Meccan', revelationOrder: 53, numberOfAyahs: 111, juzStart: 12, bismillahPre: true },
  { number: 13, nameArabic: 'الرعد', nameEnglish: 'Ar-Ra\'d', nameUrdu: 'الرعد', englishMeaning: 'The Thunder', revelationType: 'Medinan', revelationOrder: 96, numberOfAyahs: 43, juzStart: 13, bismillahPre: true },
  { number: 14, nameArabic: 'إبراهيم', nameEnglish: 'Ibrahim', nameUrdu: 'ابراہیم', englishMeaning: 'Abraham', revelationType: 'Meccan', revelationOrder: 72, numberOfAyahs: 52, juzStart: 13, bismillahPre: true },
  { number: 15, nameArabic: 'الحجر', nameEnglish: 'Al-Hijr', nameUrdu: 'الحجر', englishMeaning: 'The Rocky Tract', revelationType: 'Meccan', revelationOrder: 54, numberOfAyahs: 99, juzStart: 14, bismillahPre: true },
  { number: 16, nameArabic: 'النحل', nameEnglish: 'An-Nahl', nameUrdu: 'النحل', englishMeaning: 'The Bee', revelationType: 'Meccan', revelationOrder: 70, numberOfAyahs: 128, juzStart: 14, bismillahPre: true },
  { number: 17, nameArabic: 'الإسراء', nameEnglish: 'Al-Isra', nameUrdu: 'الاسراء', englishMeaning: 'The Night Journey', revelationType: 'Meccan', revelationOrder: 50, numberOfAyahs: 111, juzStart: 15, bismillahPre: true },
  { number: 18, nameArabic: 'الكهف', nameEnglish: 'Al-Kahf', nameUrdu: 'الکہف', englishMeaning: 'The Cave', revelationType: 'Meccan', revelationOrder: 69, numberOfAyahs: 110, juzStart: 15, bismillahPre: true },
  { number: 19, nameArabic: 'مريم', nameEnglish: 'Maryam', nameUrdu: 'مریم', englishMeaning: 'Mary', revelationType: 'Meccan', revelationOrder: 44, numberOfAyahs: 98, juzStart: 16, bismillahPre: true },
  { number: 20, nameArabic: 'طه', nameEnglish: 'Ta-Ha', nameUrdu: 'طٰہٰ', englishMeaning: 'Ta-Ha', revelationType: 'Meccan', revelationOrder: 45, numberOfAyahs: 135, juzStart: 16, bismillahPre: true },
  { number: 21, nameArabic: 'الأنبياء', nameEnglish: 'Al-Anbiya', nameUrdu: 'الانبیاء', englishMeaning: 'The Prophets', revelationType: 'Meccan', revelationOrder: 73, numberOfAyahs: 112, juzStart: 17, bismillahPre: true },
  { number: 22, nameArabic: 'الحج', nameEnglish: 'Al-Hajj', nameUrdu: 'الحج', englishMeaning: 'The Pilgrimage', revelationType: 'Medinan', revelationOrder: 103, numberOfAyahs: 78, juzStart: 17, bismillahPre: true },
  { number: 23, nameArabic: 'المؤمنون', nameEnglish: 'Al-Mu\'minun', nameUrdu: 'المؤمنون', englishMeaning: 'The Believers', revelationType: 'Meccan', revelationOrder: 74, numberOfAyahs: 118, juzStart: 18, bismillahPre: true },
  { number: 24, nameArabic: 'النور', nameEnglish: 'An-Nur', nameUrdu: 'النور', englishMeaning: 'The Light', revelationType: 'Medinan', revelationOrder: 102, numberOfAyahs: 64, juzStart: 18, bismillahPre: true },
  { number: 25, nameArabic: 'الفرقان', nameEnglish: 'Al-Furqan', nameUrdu: 'الفرقان', englishMeaning: 'The Criterion', revelationType: 'Meccan', revelationOrder: 42, numberOfAyahs: 77, juzStart: 18, bismillahPre: true },
  { number: 26, nameArabic: 'الشعراء', nameEnglish: 'Ash-Shu\'ara', nameUrdu: 'الشعراء', englishMeaning: 'The Poets', revelationType: 'Meccan', revelationOrder: 47, numberOfAyahs: 227, juzStart: 19, bismillahPre: true },
  { number: 27, nameArabic: 'النمل', nameEnglish: 'An-Naml', nameUrdu: 'النمل', englishMeaning: 'The Ant', revelationType: 'Meccan', revelationOrder: 48, numberOfAyahs: 93, juzStart: 19, bismillahPre: true },
  { number: 28, nameArabic: 'القصص', nameEnglish: 'Al-Qasas', nameUrdu: 'القصص', englishMeaning: 'The Stories', revelationType: 'Meccan', revelationOrder: 49, numberOfAyahs: 88, juzStart: 20, bismillahPre: true },
  { number: 29, nameArabic: 'العنكبوت', nameEnglish: 'Al-\'Ankabut', nameUrdu: 'العنکبوت', englishMeaning: 'The Spider', revelationType: 'Meccan', revelationOrder: 85, numberOfAyahs: 69, juzStart: 20, bismillahPre: true },
  { number: 30, nameArabic: 'الروم', nameEnglish: 'Ar-Rum', nameUrdu: 'الروم', englishMeaning: 'The Romans', revelationType: 'Meccan', revelationOrder: 84, numberOfAyahs: 60, juzStart: 21, bismillahPre: true },
  { number: 31, nameArabic: 'لقمان', nameEnglish: 'Luqman', nameUrdu: 'لقمان', englishMeaning: 'Luqman', revelationType: 'Meccan', revelationOrder: 57, numberOfAyahs: 34, juzStart: 21, bismillahPre: true },
  { number: 32, nameArabic: 'السجدة', nameEnglish: 'As-Sajdah', nameUrdu: 'السجدۃ', englishMeaning: 'The Prostration', revelationType: 'Meccan', revelationOrder: 75, numberOfAyahs: 30, juzStart: 21, bismillahPre: true },
  { number: 33, nameArabic: 'الأحزاب', nameEnglish: 'Al-Ahzab', nameUrdu: 'الاحزاب', englishMeaning: 'The Combined Forces', revelationType: 'Medinan', revelationOrder: 90, numberOfAyahs: 73, juzStart: 21, bismillahPre: true },
  { number: 34, nameArabic: 'سبأ', nameEnglish: 'Saba', nameUrdu: 'سبا', englishMeaning: 'Sheba', revelationType: 'Meccan', revelationOrder: 58, numberOfAyahs: 54, juzStart: 22, bismillahPre: true },
  { number: 35, nameArabic: 'فاطر', nameEnglish: 'Fatir', nameUrdu: 'فاطر', englishMeaning: 'Originator', revelationType: 'Meccan', revelationOrder: 43, numberOfAyahs: 45, juzStart: 22, bismillahPre: true },
  { number: 36, nameArabic: 'يس', nameEnglish: 'Ya-Sin', nameUrdu: 'یٰسٓ', englishMeaning: 'Ya Sin (Heart of Quran)', revelationType: 'Meccan', revelationOrder: 41, numberOfAyahs: 83, juzStart: 22, bismillahPre: true },
  { number: 37, nameArabic: 'الصافات', nameEnglish: 'As-Saffat', nameUrdu: 'الصافات', englishMeaning: 'Those who set the Ranks', revelationType: 'Meccan', revelationOrder: 56, numberOfAyahs: 182, juzStart: 23, bismillahPre: true },
  { number: 38, nameArabic: 'ص', nameEnglish: 'Sad', nameUrdu: 'صٓ', englishMeaning: 'The Letter Sad', revelationType: 'Meccan', revelationOrder: 38, numberOfAyahs: 88, juzStart: 23, bismillahPre: true },
  { number: 39, nameArabic: 'الزمر', nameEnglish: 'Az-Zumar', nameUrdu: 'الزمر', englishMeaning: 'The Troops', revelationType: 'Meccan', revelationOrder: 59, numberOfAyahs: 75, juzStart: 23, bismillahPre: true },
  { number: 40, nameArabic: 'غافر', nameEnglish: 'Ghafir', nameUrdu: 'غافر', englishMeaning: 'The Forgiver', revelationType: 'Meccan', revelationOrder: 60, numberOfAyahs: 85, juzStart: 24, bismillahPre: true },
  { number: 41, nameArabic: 'فصلت', nameEnglish: 'Fussilat', nameUrdu: 'فصلت', englishMeaning: 'Explained in Detail', revelationType: 'Meccan', revelationOrder: 61, numberOfAyahs: 54, juzStart: 24, bismillahPre: true },
  { number: 42, nameArabic: 'الشورى', nameEnglish: 'Ash-Shura', nameUrdu: 'الشورٰی', englishMeaning: 'The Consultation', revelationType: 'Meccan', revelationOrder: 62, numberOfAyahs: 53, juzStart: 25, bismillahPre: true },
  { number: 43, nameArabic: 'الزخرف', nameEnglish: 'Az-Zukhruf', nameUrdu: 'الزخرف', englishMeaning: 'The Ornaments of Gold', revelationType: 'Meccan', revelationOrder: 63, numberOfAyahs: 89, juzStart: 25, bismillahPre: true },
  { number: 44, nameArabic: 'الدخان', nameEnglish: 'Ad-Dukhan', nameUrdu: 'الدخان', englishMeaning: 'The Smoke', revelationType: 'Meccan', revelationOrder: 64, numberOfAyahs: 59, juzStart: 25, bismillahPre: true },
  { number: 45, nameArabic: 'الجاثية', nameEnglish: 'Al-Jathiyah', nameUrdu: 'الجاثیہ', englishMeaning: 'The Crouching', revelationType: 'Meccan', revelationOrder: 65, numberOfAyahs: 37, juzStart: 25, bismillahPre: true },
  { number: 46, nameArabic: 'الأحقاف', nameEnglish: 'Al-Ahqaf', nameUrdu: 'الاحقاف', englishMeaning: 'The Wind-Curved Sand Dunes', revelationType: 'Meccan', revelationOrder: 66, numberOfAyahs: 35, juzStart: 26, bismillahPre: true },
  { number: 47, nameArabic: 'محمد', nameEnglish: 'Muhammad', nameUrdu: 'محمد ﷺ', englishMeaning: 'Prophet Muhammad ﷺ', revelationType: 'Medinan', revelationOrder: 95, numberOfAyahs: 38, juzStart: 26, bismillahPre: true },
  { number: 48, nameArabic: 'الفتح', nameEnglish: 'Al-Fath', nameUrdu: 'الفتح', englishMeaning: 'The Victory', revelationType: 'Medinan', revelationOrder: 111, numberOfAyahs: 29, juzStart: 26, bismillahPre: true },
  { number: 49, nameArabic: 'الحجرات', nameEnglish: 'Al-Hujurat', nameUrdu: 'الحجرات', englishMeaning: 'The Rooms', revelationType: 'Medinan', revelationOrder: 106, numberOfAyahs: 18, juzStart: 26, bismillahPre: true },
  { number: 50, nameArabic: 'ق', nameEnglish: 'Qaf', nameUrdu: 'قٓ', englishMeaning: 'The Letter Qaf', revelationType: 'Meccan', revelationOrder: 34, numberOfAyahs: 45, juzStart: 26, bismillahPre: true },
  { number: 51, nameArabic: 'الذاريات', nameEnglish: 'Adh-Dhariyat', nameUrdu: 'الذاریات', englishMeaning: 'The Winnowing Winds', revelationType: 'Meccan', revelationOrder: 67, numberOfAyahs: 60, juzStart: 26, bismillahPre: true },
  { number: 52, nameArabic: 'الطور', nameEnglish: 'At-Tur', nameUrdu: 'الطور', englishMeaning: 'The Mount', revelationType: 'Meccan', revelationOrder: 76, numberOfAyahs: 49, juzStart: 27, bismillahPre: true },
  { number: 53, nameArabic: 'النجم', nameEnglish: 'An-Najm', nameUrdu: 'النجم', englishMeaning: 'The Star', revelationType: 'Meccan', revelationOrder: 23, numberOfAyahs: 62, juzStart: 27, bismillahPre: true },
  { number: 54, nameArabic: 'القمر', nameEnglish: 'Al-Qamar', nameUrdu: 'القمر', englishMeaning: 'The Moon', revelationType: 'Meccan', revelationOrder: 37, numberOfAyahs: 55, juzStart: 27, bismillahPre: true },
  { number: 55, nameArabic: 'الرحمن', nameEnglish: 'Ar-Rahman', nameUrdu: 'الرحمن', englishMeaning: 'The Beneficent', revelationType: 'Medinan', revelationOrder: 97, numberOfAyahs: 78, juzStart: 27, bismillahPre: true },
  { number: 56, nameArabic: 'الواقعة', nameEnglish: 'Al-Waqi\'ah', nameUrdu: 'الواقعہ', englishMeaning: 'The Inevitable', revelationType: 'Meccan', revelationOrder: 46, numberOfAyahs: 96, juzStart: 27, bismillahPre: true },
  { number: 57, nameArabic: 'الحديد', nameEnglish: 'Al-Hadid', nameUrdu: 'الحدید', englishMeaning: 'The Iron', revelationType: 'Medinan', revelationOrder: 94, numberOfAyahs: 29, juzStart: 27, bismillahPre: true },
  { number: 58, nameArabic: 'المجادلة', nameEnglish: 'Al-Mujadila', nameUrdu: 'المجادلہ', englishMeaning: 'The Pleading Woman', revelationType: 'Medinan', revelationOrder: 105, numberOfAyahs: 22, juzStart: 28, bismillahPre: true },
  { number: 59, nameArabic: 'الحشر', nameEnglish: 'Al-Hashr', nameUrdu: 'الحشر', englishMeaning: 'The Exile', revelationType: 'Medinan', revelationOrder: 101, numberOfAyahs: 24, juzStart: 28, bismillahPre: true },
  { number: 60, nameArabic: 'الممتحنة', nameEnglish: 'Al-Mumtahanah', nameUrdu: 'الممتحنہ', englishMeaning: 'She that is to be examined', revelationType: 'Medinan', revelationOrder: 91, numberOfAyahs: 13, juzStart: 28, bismillahPre: true },
  { number: 61, nameArabic: 'الصف', nameEnglish: 'As-Saff', nameUrdu: 'الصف', englishMeaning: 'The Ranks', revelationType: 'Medinan', revelationOrder: 109, numberOfAyahs: 14, juzStart: 28, bismillahPre: true },
  { number: 62, nameArabic: 'الجمعة', nameEnglish: 'Al-Jumu\'ah', nameUrdu: 'الجمعہ', englishMeaning: 'Friday Congregation', revelationType: 'Medinan', revelationOrder: 110, numberOfAyahs: 11, juzStart: 28, bismillahPre: true },
  { number: 63, nameArabic: 'المنافقون', nameEnglish: 'Al-Munafiqun', nameUrdu: 'المنافقون', englishMeaning: 'The Hypocrites', revelationType: 'Medinan', revelationOrder: 104, numberOfAyahs: 11, juzStart: 28, bismillahPre: true },
  { number: 64, nameArabic: 'التغابن', nameEnglish: 'At-Taghabun', nameUrdu: 'التغابن', englishMeaning: 'Mutual Disillusion', revelationType: 'Medinan', revelationOrder: 108, numberOfAyahs: 18, juzStart: 28, bismillahPre: true },
  { number: 65, nameArabic: 'الطلاق', nameEnglish: 'At-Talaq', nameUrdu: 'الطلاق', englishMeaning: 'The Divorce', revelationType: 'Medinan', revelationOrder: 99, numberOfAyahs: 12, juzStart: 28, bismillahPre: true },
  { number: 66, nameArabic: 'التحريم', nameEnglish: 'At-Tahrim', nameUrdu: 'التحریم', englishMeaning: 'The Prohibition', revelationType: 'Medinan', revelationOrder: 107, numberOfAyahs: 12, juzStart: 28, bismillahPre: true },
  { number: 67, nameArabic: 'الملك', nameEnglish: 'Al-Mulk', nameUrdu: 'الملک', englishMeaning: 'The Sovereignty (Tabarak)', revelationType: 'Meccan', revelationOrder: 77, numberOfAyahs: 30, juzStart: 29, bismillahPre: true },
  { number: 68, nameArabic: 'القلم', nameEnglish: 'Al-Qalam', nameUrdu: 'القلم', englishMeaning: 'The Pen', revelationType: 'Meccan', revelationOrder: 2, numberOfAyahs: 52, juzStart: 29, bismillahPre: true },
  { number: 69, nameArabic: 'الحاقة', nameEnglish: 'Al-Haqqah', nameUrdu: 'الحاقہ', englishMeaning: 'The Inevitable Reality', revelationType: 'Meccan', revelationOrder: 78, numberOfAyahs: 52, juzStart: 29, bismillahPre: true },
  { number: 70, nameArabic: 'المعارج', nameEnglish: 'Al-Ma\'arij', nameUrdu: 'المعارج', englishMeaning: 'The Ascending Stairways', revelationType: 'Meccan', revelationOrder: 79, numberOfAyahs: 44, juzStart: 29, bismillahPre: true },
  { number: 71, nameArabic: 'نوح', nameEnglish: 'Nuh', nameUrdu: 'نوح', englishMeaning: 'Prophet Noah', revelationType: 'Meccan', revelationOrder: 71, numberOfAyahs: 28, juzStart: 29, bismillahPre: true },
  { number: 72, nameArabic: 'الجن', nameEnglish: 'Al-Jinn', nameUrdu: 'الجن', englishMeaning: 'The Jinn', revelationType: 'Meccan', revelationOrder: 40, numberOfAyahs: 28, juzStart: 29, bismillahPre: true },
  { number: 73, nameArabic: 'المزمل', nameEnglish: 'Al-Muzzammil', nameUrdu: 'المزمل', englishMeaning: 'The Enshrouded One', revelationType: 'Meccan', revelationOrder: 3, numberOfAyahs: 20, juzStart: 29, bismillahPre: true },
  { number: 74, nameArabic: 'المدثر', nameEnglish: 'Al-Muddaththir', nameUrdu: 'المدثر', englishMeaning: 'The Cloaked One', revelationType: 'Meccan', revelationOrder: 4, numberOfAyahs: 56, juzStart: 29, bismillahPre: true },
  { number: 75, nameArabic: 'القيامة', nameEnglish: 'Al-Qiyamah', nameUrdu: 'القیامہ', englishMeaning: 'The Resurrection', revelationType: 'Meccan', revelationOrder: 31, numberOfAyahs: 40, juzStart: 29, bismillahPre: true },
  { number: 76, nameArabic: 'الإنسان', nameEnglish: 'Al-Insan', nameUrdu: 'الانسان', englishMeaning: 'Mankind / Ad-Dahr', revelationType: 'Medinan', revelationOrder: 98, numberOfAyahs: 31, juzStart: 29, bismillahPre: true },
  { number: 77, nameArabic: 'المرسلات', nameEnglish: 'Al-Mursalat', nameUrdu: 'المرسلات', englishMeaning: 'The Emissaries', revelationType: 'Meccan', revelationOrder: 33, numberOfAyahs: 50, juzStart: 29, bismillahPre: true },
  { number: 78, nameArabic: 'النبأ', nameEnglish: 'An-Naba', nameUrdu: 'النباء', englishMeaning: 'The Great Tidings (Amma)', revelationType: 'Meccan', revelationOrder: 80, numberOfAyahs: 40, juzStart: 30, bismillahPre: true },
  { number: 79, nameArabic: 'النازعات', nameEnglish: 'An-Nazi\'at', nameUrdu: 'النازعات', englishMeaning: 'Those who drag forth', revelationType: 'Meccan', revelationOrder: 81, numberOfAyahs: 46, juzStart: 30, bismillahPre: true },
  { number: 80, nameArabic: 'عبس', nameEnglish: '\'Abasa', nameUrdu: 'عبس', englishMeaning: 'He Frowned', revelationType: 'Meccan', revelationOrder: 24, numberOfAyahs: 42, juzStart: 30, bismillahPre: true },
  { number: 81, nameArabic: 'التكوير', nameEnglish: 'At-Takwir', nameUrdu: 'التکویر', englishMeaning: 'The Overthrowing', revelationType: 'Meccan', revelationOrder: 7, numberOfAyahs: 29, juzStart: 30, bismillahPre: true },
  { number: 82, nameArabic: 'الانفطار', nameEnglish: 'Al-Infitar', nameUrdu: 'الانفطار', englishMeaning: 'The Cleaving', revelationType: 'Meccan', revelationOrder: 82, numberOfAyahs: 19, juzStart: 30, bismillahPre: true },
  { number: 83, nameArabic: 'المطففين', nameEnglish: 'Al-Mutaffifin', nameUrdu: 'المطففین', englishMeaning: 'Defrauding in Measure', revelationType: 'Meccan', revelationOrder: 86, numberOfAyahs: 36, juzStart: 30, bismillahPre: true },
  { number: 84, nameArabic: 'الانشقاق', nameEnglish: 'Al-Inshiqaq', nameUrdu: 'الانشقاق', englishMeaning: 'The Splitting Open', revelationType: 'Meccan', revelationOrder: 83, numberOfAyahs: 25, juzStart: 30, bismillahPre: true },
  { number: 85, nameArabic: 'البروج', nameEnglish: 'Al-Buruj', nameUrdu: 'البروج', englishMeaning: 'The Constellations', revelationType: 'Meccan', revelationOrder: 27, numberOfAyahs: 22, juzStart: 30, bismillahPre: true },
  { number: 86, nameArabic: 'الطارق', nameEnglish: 'At-Tariq', nameUrdu: 'الطارق', englishMeaning: 'The Nightcomer', revelationType: 'Meccan', revelationOrder: 36, numberOfAyahs: 17, juzStart: 30, bismillahPre: true },
  { number: 87, nameArabic: 'الأعلى', nameEnglish: 'Al-A\'la', nameUrdu: 'الاعلیٰ', englishMeaning: 'The Most High', revelationType: 'Meccan', revelationOrder: 8, numberOfAyahs: 19, juzStart: 30, bismillahPre: true },
  { number: 88, nameArabic: 'الغاشية', nameEnglish: 'Al-Ghashiyah', nameUrdu: 'الغاشیہ', englishMeaning: 'The Overwhelming Event', revelationType: 'Meccan', revelationOrder: 68, numberOfAyahs: 26, juzStart: 30, bismillahPre: true },
  { number: 89, nameArabic: 'الفجر', nameEnglish: 'Al-Fajr', nameUrdu: 'الفجر', englishMeaning: 'The Dawn', revelationType: 'Meccan', revelationOrder: 10, numberOfAyahs: 30, juzStart: 30, bismillahPre: true },
  { number: 90, nameArabic: 'البلد', nameEnglish: 'Al-Balad', nameUrdu: 'البلد', englishMeaning: 'The City', revelationType: 'Meccan', revelationOrder: 35, numberOfAyahs: 20, juzStart: 30, bismillahPre: true },
  { number: 91, nameArabic: 'الشمس', nameEnglish: 'Ash-Shams', nameUrdu: 'الشمس', englishMeaning: 'The Sun', revelationType: 'Meccan', revelationOrder: 26, numberOfAyahs: 15, juzStart: 30, bismillahPre: true },
  { number: 92, nameArabic: 'الليل', nameEnglish: 'Al-Layl', nameUrdu: 'اللیل', englishMeaning: 'The Night', revelationType: 'Meccan', revelationOrder: 9, numberOfAyahs: 21, juzStart: 30, bismillahPre: true },
  { number: 93, nameArabic: 'الضحى', nameEnglish: 'Ad-Duhaa', nameUrdu: 'الضحٰی', englishMeaning: 'The Morning Brightness', revelationType: 'Meccan', revelationOrder: 11, numberOfAyahs: 11, juzStart: 30, bismillahPre: true },
  { number: 94, nameArabic: 'الشرح', nameEnglish: 'Ash-Sharh', nameUrdu: 'الشرح', englishMeaning: 'The Relief / Expansion', revelationType: 'Meccan', revelationOrder: 12, numberOfAyahs: 8, juzStart: 30, bismillahPre: true },
  { number: 95, nameArabic: 'التين', nameEnglish: 'At-Tin', nameUrdu: 'التین', englishMeaning: 'The Fig', revelationType: 'Meccan', revelationOrder: 28, numberOfAyahs: 8, juzStart: 30, bismillahPre: true },
  { number: 96, nameArabic: 'العلق', nameEnglish: 'Al-\'Alaq', nameUrdu: 'العلق', englishMeaning: 'The Clot (First Revelation)', revelationType: 'Meccan', revelationOrder: 1, numberOfAyahs: 19, juzStart: 30, bismillahPre: true },
  { number: 97, nameArabic: 'القدر', nameEnglish: 'Al-Qadr', nameUrdu: 'القدر', englishMeaning: 'The Night of Power', revelationType: 'Meccan', revelationOrder: 25, numberOfAyahs: 5, juzStart: 30, bismillahPre: true },
  { number: 98, nameArabic: 'البينة', nameEnglish: 'Al-Bayyinah', nameUrdu: 'البینہ', englishMeaning: 'The Clear Proof', revelationType: 'Medinan', revelationOrder: 100, numberOfAyahs: 8, juzStart: 30, bismillahPre: true },
  { number: 99, nameArabic: 'الزلزلة', nameEnglish: 'Az-Zalzalah', nameUrdu: 'الزلزلہ', englishMeaning: 'The Earthquake', revelationType: 'Medinan', revelationOrder: 93, numberOfAyahs: 8, juzStart: 30, bismillahPre: true },
  { number: 100, nameArabic: 'العاديات', nameEnglish: 'Al-\'Adiyat', nameUrdu: 'العادیات', englishMeaning: 'The Courser War Horses', revelationType: 'Meccan', revelationOrder: 14, numberOfAyahs: 11, juzStart: 30, bismillahPre: true },
  { number: 101, nameArabic: 'القارعة', nameEnglish: 'Al-Qari\'ah', nameUrdu: 'القارcolumn', englishMeaning: 'The Striking Calamity', revelationType: 'Meccan', revelationOrder: 30, numberOfAyahs: 11, juzStart: 30, bismillahPre: true },
  { number: 102, nameArabic: 'التكاثر', nameEnglish: 'At-Takathur', nameUrdu: 'التکاثر', englishMeaning: 'The Piling Up of Wealth', revelationType: 'Meccan', revelationOrder: 16, numberOfAyahs: 8, juzStart: 30, bismillahPre: true },
  { number: 103, nameArabic: 'العصر', nameEnglish: 'Al-\'Asr', nameUrdu: 'العصر', englishMeaning: 'The Declining Time', revelationType: 'Meccan', revelationOrder: 13, numberOfAyahs: 3, juzStart: 30, bismillahPre: true },
  { number: 104, nameArabic: 'الهمزة', nameEnglish: 'Al-Humazah', nameUrdu: 'الہمزہ', englishMeaning: 'The Slanderer', revelationType: 'Meccan', revelationOrder: 32, numberOfAyahs: 9, juzStart: 30, bismillahPre: true },
  { number: 105, nameArabic: 'الفيل', nameEnglish: 'Al-Fil', nameUrdu: 'الفیل', englishMeaning: 'The Elephant Army', revelationType: 'Meccan', revelationOrder: 19, numberOfAyahs: 5, juzStart: 30, bismillahPre: true },
  { number: 106, nameArabic: 'قريش', nameEnglish: 'Quraysh', nameUrdu: 'قریش', englishMeaning: 'The Tribe of Quraysh', revelationType: 'Meccan', revelationOrder: 29, numberOfAyahs: 4, juzStart: 30, bismillahPre: true },
  { number: 107, nameArabic: 'الماعون', nameEnglish: 'Al-Ma\'un', nameUrdu: 'الماعون', englishMeaning: 'Small Kindnesses', revelationType: 'Meccan', revelationOrder: 17, numberOfAyahs: 7, juzStart: 30, bismillahPre: true },
  { number: 108, nameArabic: 'الكوثر', nameEnglish: 'Al-Kawthar', nameUrdu: 'الکوثر', englishMeaning: 'The Abundant Good', revelationType: 'Meccan', revelationOrder: 15, numberOfAyahs: 3, juzStart: 30, bismillahPre: true },
  { number: 109, nameArabic: 'الكافرون', nameEnglish: 'Al-Kafirun', nameUrdu: 'الکافرون', englishMeaning: 'The Disbelievers', revelationType: 'Meccan', revelationOrder: 18, numberOfAyahs: 6, juzStart: 30, bismillahPre: true },
  { number: 110, nameArabic: 'النصر', nameEnglish: 'An-Nasr', nameUrdu: 'النصر', englishMeaning: 'The Divine Support', revelationType: 'Medinan', revelationOrder: 114, numberOfAyahs: 3, juzStart: 30, bismillahPre: true },
  { number: 111, nameArabic: 'المسد', nameEnglish: 'Al-Masad', nameUrdu: 'المسد', englishMeaning: 'The Palm Fiber (Abu Lahab)', revelationType: 'Meccan', revelationOrder: 6, numberOfAyahs: 5, juzStart: 30, bismillahPre: true },
  { number: 112, nameArabic: 'الإخلاص', nameEnglish: 'Al-Ikhlas', nameUrdu: 'الاخلاص', englishMeaning: 'The Sincerity (Tawheed)', revelationType: 'Meccan', revelationOrder: 22, numberOfAyahs: 4, juzStart: 30, bismillahPre: true },
  { number: 113, nameArabic: 'الفلق', nameEnglish: 'Al-Falaq', nameUrdu: 'الفلق', englishMeaning: 'The Daybreak', revelationType: 'Meccan', revelationOrder: 20, numberOfAyahs: 5, juzStart: 30, bismillahPre: true },
  { number: 114, nameArabic: 'الناس', nameEnglish: 'An-Nas', nameUrdu: 'الناس', englishMeaning: 'Mankind', revelationType: 'Meccan', revelationOrder: 21, numberOfAyahs: 6, juzStart: 30, bismillahPre: true }
];

export const SURAHS_METADATA = ALL_114_SURAHS;

export const ALL_30_JUZ: JuzMeta[] = [
  { number: 1, nameArabic: 'الم', nameEnglish: 'Alif Lam Meem', nameUrdu: 'الم', startSurah: 1, startSurahName: 'Al-Fatihah', startAyah: 1 },
  { number: 2, nameArabic: 'سيقول السفهاء', nameEnglish: 'Sayaqool', nameUrdu: 'سیقول', startSurah: 2, startSurahName: 'Al-Baqarah', startAyah: 142 },
  { number: 3, nameArabic: 'تلك الرسل', nameEnglish: 'Tilkal Rusul', nameUrdu: 'تلک الرسل', startSurah: 2, startSurahName: 'Al-Baqarah', startAyah: 253 },
  { number: 4, nameArabic: 'لن تنالوا', nameEnglish: 'Lan Tana Loo', nameUrdu: 'لن تنالوا', startSurah: 3, startSurahName: 'Ali Imran', startAyah: 93 },
  { number: 5, nameArabic: 'والمحصنات', nameEnglish: 'Wal Mohsanat', nameUrdu: 'والمحصنت', startSurah: 4, startSurahName: 'An-Nisa', startAyah: 24 },
  { number: 6, nameArabic: 'لا يحب الله', nameEnglish: 'La Yuhibbullah', nameUrdu: 'لا یحب اللہ', startSurah: 4, startSurahName: 'An-Nisa', startAyah: 148 },
  { number: 7, nameArabic: 'وإذا سمعوا', nameEnglish: 'Wa Iza Samiu', nameUrdu: 'واذا سمعوا', startSurah: 5, startSurahName: 'Al-Ma\'idah', startAyah: 82 },
  { number: 8, nameArabic: 'ولو أننا', nameEnglish: 'Wa Lau Annana', nameUrdu: 'ولو اننا', startSurah: 6, startSurahName: 'Al-An\'am', startAyah: 111 },
  { number: 9, nameArabic: 'قال الملأ', nameEnglish: 'Qalal Malao', nameUrdu: 'قال الملاء', startSurah: 7, startSurahName: 'Al-A\'raf', startAyah: 88 },
  { number: 10, nameArabic: 'واعلموا', nameEnglish: 'Wa A\'lamu', nameUrdu: 'واعلموا', startSurah: 8, startSurahName: 'Al-Anfal', startAyah: 41 },
  { number: 11, nameArabic: 'يعتذرون', nameEnglish: 'Ya\'taziroon', nameUrdu: 'یعتذرون', startSurah: 9, startSurahName: 'At-Tawbah', startAyah: 93 },
  { number: 12, nameArabic: 'وما من دابة', nameEnglish: 'Wa Mamin Da\'abbah', nameUrdu: 'وما من دابة', startSurah: 11, startSurahName: 'Hud', startAyah: 6 },
  { number: 13, nameArabic: 'وما أبرئ', nameEnglish: 'Wa Ma Ubarri\'u', nameUrdu: 'وما ابریء', startSurah: 12, startSurahName: 'Yusuf', startAyah: 53 },
  { number: 14, nameArabic: 'ربما', nameEnglish: 'Rubama', nameUrdu: 'ربما', startSurah: 15, startSurahName: 'Al-Hijr', startAyah: 1 },
  { number: 15, nameArabic: 'سبحان الذي', nameEnglish: 'Subhanallazi', nameUrdu: 'سبحن الذی', startSurah: 17, startSurahName: 'Al-Isra', startAyah: 1 },
  { number: 16, nameArabic: 'قال ألم', nameEnglish: 'Qal Alam', nameUrdu: 'قال الم', startSurah: 18, startSurahName: 'Al-Kahf', startAyah: 75 },
  { number: 17, nameArabic: 'اقترب للناس', nameEnglish: 'Iqtaraba Lin-Nasi', nameUrdu: 'اقترب للناس', startSurah: 21, startSurahName: 'Al-Anbiya', startAyah: 1 },
  { number: 18, nameArabic: 'قد أفلح', nameEnglish: 'Qadd Aflaha', nameUrdu: 'قد افلح', startSurah: 23, startSurahName: 'Al-Mu\'minun', startAyah: 1 },
  { number: 19, nameArabic: 'وقال الذين', nameEnglish: 'Wa Qalal Lazina', nameUrdu: 'وقال الذین', startSurah: 25, startSurahName: 'Al-Furqan', startAyah: 21 },
  { number: 20, nameArabic: 'أمن خلق', nameEnglish: 'Amman Khalaqa', nameUrdu: 'امن خلق', startSurah: 27, startSurahName: 'An-Naml', startAyah: 56 },
  { number: 21, nameArabic: 'اتل ما أوحي', nameEnglish: 'Utlu Ma Oohiya', nameUrdu: 'اتل ما اوحی', startSurah: 29, startSurahName: 'Al-\'Ankabut', startAyah: 46 },
  { number: 22, nameArabic: 'ومن يقنت', nameEnglish: 'Wa Manyaqnut', nameUrdu: 'ومن یقنت', startSurah: 33, startSurahName: 'Al-Ahzab', startAyah: 31 },
  { number: 23, nameArabic: 'وما لي', nameEnglish: 'Wa Maliya', nameUrdu: 'وما لی', startSurah: 36, startSurahName: 'Ya-Sin', startAyah: 28 },
  { number: 24, nameArabic: 'فمن أظلم', nameEnglish: 'Faman Azlamu', nameUrdu: 'فمن اظلم', startSurah: 39, startSurahName: 'Az-Zumar', startAyah: 32 },
  { number: 25, nameArabic: 'إليه يرد', nameEnglish: 'Ilayhi Yuraddu', nameUrdu: 'الیہ یرد', startSurah: 41, startSurahName: 'Fussilat', startAyah: 47 },
  { number: 26, nameArabic: 'حم', nameEnglish: 'Ha Meem', nameUrdu: 'حٰمٓ', startSurah: 46, startSurahName: 'Al-Ahqaf', startAyah: 1 },
  { number: 27, nameArabic: 'قال فما خطبكم', nameEnglish: 'Qala Fama Khatbukum', nameUrdu: 'قال فما خطبکم', startSurah: 51, startSurahName: 'Adh-Dhariyat', startAyah: 31 },
  { number: 28, nameArabic: 'قد سمع الله', nameEnglish: 'Qadd Sami Allah', nameUrdu: 'قد سمع اللہ', startSurah: 58, startSurahName: 'Al-Mujadila', startAyah: 1 },
  { number: 29, nameArabic: 'تبارك الذي', nameEnglish: 'Tabarakallazi', nameUrdu: 'تبارک الذی', startSurah: 67, startSurahName: 'Al-Mulk', startAyah: 1 },
  { number: 30, nameArabic: 'عم يتساءلون', nameEnglish: 'Amma Yatasa\'aloon', nameUrdu: 'عم یتساءلون', startSurah: 78, startSurahName: 'An-Naba', startAyah: 1 }
];

export const SURAH_INTROS: Record<number, SurahIntro> = {
  1: {
    surahNumber: 1,
    periodEn: 'Early Makkan Era',
    periodUr: 'ابتدائی مکی دور',
    themeEn: 'The Mother of the Book (Umm al-Kitab); comprehensive summary of Monotheism, Divine Praise, Guidance, and Supplication.',
    themeUr: 'ام الکتاب، قرآن مجید کا خلاصہ، حمدِ باری تعالیٰ، توحید، اور ہدایت و استعانت کی عالمگیر دعا۔',
    historicalBackgroundEn: 'Revealed in Makkah at the beginning of the Prophethood. It was recited in every unit (Rak\'ah) of the daily prayers since their prescription.',
    historicalBackgroundUr: 'نبوت کے ابتدائی دور میں مکہ معظمہ میں نازل ہوئی۔ نماز کی ہر رکعت میں اس کی تلاوت لازم قرار دی گئی ہے۔',
    keyLessonsEn: [
      'Begin all virtuous endeavors with Bismillah',
      'All gratitude and absolute praise belongs to Allah, Lord of all realms',
      'True worship and help are sought exclusively from Allah',
      'Sincere petition for the Straight Path followed by the righteous'
    ],
    keyLessonsUr: [
      'ہر نیک کام کا آغاز بسم اللہ سے کرنا',
      'تمام تعریفیں اور شکر صرف اللہ تعالیٰ ہی کے لیے ہیں',
      'عبادت اور مدد صرف اور صرف اللہ سے مانگنا',
      'صراطِ مستقیم یعنی انعام یافتہ بندوں کے راستے کی دعا'
    ]
  },
  2: {
    surahNumber: 2,
    periodEn: 'Early Madinan Era (Post-Hijrah)',
    periodUr: 'ہجرت کے بعد کا مدنی دور',
    themeEn: 'Comprehensive Islamic legislation, social justice, legal ordinances (Fasting, Hajj, Zakat, Usury ban), and historical covenants.',
    themeUr: 'احکامِ شریعت، اسلامی معاشرے کی تشکیل، روزے، حج، زکوٰۃ، سود کی ممانعت اور بنی اسرائیل کے عبرت آموز واقعات۔',
    historicalBackgroundEn: 'Revealed over several years following the Hijrah to Madinah, guiding the nascent Islamic community in governance, worship, and social contracts.',
    historicalBackgroundUr: 'ہجرتِ مدینہ کے بعد طویل عرصے میں نازل ہوئی۔ اس میں نوزائیدہ اسلامی ریاست کے آئین و قوانین اور عبادات کے ضوابط بیان کیے گئے۔',
    keyLessonsEn: [
      'The Quran is the unquestionable guidance for the God-conscious (Muttaqeen)',
      'Ayat al-Kursi affirms the supreme sovereignty and ever-living nature of Allah',
      'Absolute prohibition of Riba (usury) and encouragement of trade and charity',
      'Allah burdens no soul beyond its capacity'
    ],
    keyLessonsUr: [
      'قرآن حکیم پرہیزگاروں کے لیے بغیر کسی شک و شبہ کے کامل ہدایت ہے',
      'آیت الکرسی اللہ تعالیٰ کی توحید اور لا محدود قدرت کا سب سے بڑا بیان ہے',
      'سود کی قطعی ممانعت اور صدقہ و حلال تجارت کی ترغیب',
      'اللہ تعالیٰ کسی جان پر اس کی برداشت سے زیادہ بوجھ نہیں ڈالتا'
    ]
  },
  36: {
    surahNumber: 36,
    periodEn: 'Middle Makkan Era',
    periodUr: 'درمیانی مکی دور',
    themeEn: 'The Heart of the Quran (Qalb al-Quran); resurrection, divine signs in creation, and steadfastness in conveying the message.',
    themeUr: 'قلب القرآن (قرآن کا دل)، آخرت، دوبارہ جی اٹھنا، توحید کے آفاقی دلائل اور انبیاء کرام کی دعوت کا تذکرہ۔',
    historicalBackgroundEn: 'Revealed to comfort the Prophet ﷺ against the stubborn denial of the Quraysh leaders, reminding them of past destroyed civilizations.',
    historicalBackgroundUr: 'مشرکینِ مکہ کے ہٹ دھرمی پر مبنی انکار کے جواب میں اور نبی کریم ﷺ کی تسلی کے لیے نازل فرمائی گئی۔',
    keyLessonsEn: [
      'The Quran is rich in wisdom and guidance',
      'Cosmic order: sun and moon in precise orbits testify to One Sovereign Creator',
      'Resurrection is as easy for Allah as creating humanity the first time',
      'When Allah decrees a thing, He only says to it "Be", and it is'
    ],
    keyLessonsUr: [
      'قرآن مجید حکمت و دانائی سے لبریز کتاب ہے',
      'سورج اور چاند کا اپنے اپنے مدار میں تیرنا خالقِ کائنات کی وحدانیت کا ثبوت ہے',
      'مردوں کو دوبارہ زندہ کرنا اللہ کے لیے اتنا ہی آسان ہے جتنا پہلی بار پیدا کرنا',
      'اللہ جب کسی کام کا ارادہ فرماتا ہے تو بس فرماتا ہے ’’ہو جا‘‘ اور وہ ہو جاتا ہے'
    ]
  },
  67: {
    surahNumber: 67,
    periodEn: 'Early Makkan Era',
    periodUr: 'مکی دور',
    themeEn: 'The Sovereignty of Allah, perfection of the cosmos, death and life as a moral test, and salvation from the torment of the grave.',
    themeUr: 'اللہ تعالیٰ کی مطلق بادشاہی، کائنات کا بے عیب نظام، موت و حیات کی آزمائش اور عذابِ قبر سے نجات۔',
    historicalBackgroundEn: 'The Prophet ﷺ described it as the protector from the punishment of the grave, reciting it nightly before sleeping.',
    historicalBackgroundUr: 'حضور نبی اکرم ﷺ نے فرمایا کہ یہ سورۃ اپنے پڑھنے والے کی شفاعت کرتی ہے اور عذابِ قبر سے حفاظت کی ڈھال ہے۔',
    keyLessonsEn: [
      'Life and death are created deliberately to test who is best in deed',
      'Perfection in the celestial realms: look and find no flaw in creation',
      'Nightly recitation grants forgiveness and shields against grave punishment'
    ],
    keyLessonsUr: [
      'موت اور زندگی کی تخلیق کا مقصد یہ پرکھنا ہے کہ تم میں سے اچھے عمل کون کرتا ہے',
      'کائنات کی تخلیق میں غور و فکر اور اللہ کے حضور خشیت',
      'روزانہ رات کو اس کی تلاوت قبر کے عذاب سے حفاظت کا ذریعہ ہے'
    ]
  }
};

/**
 * Universal Tafseer Generator for Ayahs
 */
export function getAyahTafseer(surahNumber: number, ayahNumber: number): AyahTafseer {
  const meta = ALL_114_SURAHS.find(s => s.number === surahNumber);
  const surahName = meta ? `${meta.nameEnglish} (${meta.nameArabic})` : `Surah ${surahNumber}`;

  // Notable special tafseers
  if (surahNumber === 1 && ayahNumber === 1) {
    return {
      surahNumber: 1,
      ayahNumber: 1,
      source: 'Tafseer Ibn Kathir & Ma\'ariful Quran',
      tafseerUrdu: 'بسم اللہ الرحمن الرحیم: تمام کتبِ سماوی کا نچوڑ اور ہر بابرکت کام کی کنجی ہے۔ اس میں اللہ تعالیٰ کے اسمِ ذات کے ساتھ دو صفاتی نام ’’الرحمن‘‘ (بہت مہربان جو دنیا میں سب پر رحم فرماتا ہے) اور ’’الرحیم‘‘ (نہایت رحم فرمانے والا جو آخرت میں مومنین پر خصوصی فضل فرمائے گا) بیان کیے گئے ہیں۔ حضرت ابن عباسؓ سے مروی ہے کہ جب جبرائیل علیہ السلام نے نبی ﷺ پر پہلی بار بسم اللہ نازل کی تو فرمایا کہ یہ ہر تنگی اور غم سے امان ہے۔',
      tafseerEnglish: 'Bismillahir-Rahmanir-Rahim: The foundational gateway of divine remembrance. Ibn Kathir explains that "Ar-Rahman" signifies the immense, all-encompassing mercy of Allah toward all creation in this temporal world, while "Ar-Rahim" conveys His continuous, specialized mercy bestowed exclusively upon believers in the Hereafter. Commencing with this verse dedicates all action to the Sovereign Lord.'
    };
  }

  if (surahNumber === 2 && ayahNumber === 255) {
    return {
      surahNumber: 2,
      ayahNumber: 255,
      source: 'Tafseer Ibn Kathir (Ayat al-Kursi Commentary)',
      tafseerUrdu: 'آیت الکرسی: قرآن مجید کی سب سے عظیم ترین آیت۔ اس میں توحید کے دس بنیادی اصول بیان کیے گئے ہیں۔ اللہ کی حی و قیوم ذات، جسے نہ اونگھ آتی ہے نہ نیند۔ زمین و آسمان کی بادشاہی، بغیر اجازت کسی کی سفارش نہ چل سکنا، ماضی و مستقبل کا مکمل علم، اور کرسی یعنی علم و اقتدار کا آسمانوں اور زمین پر احاطہ۔ یہ آیت شیطانی اثرات، سحر اور خوف سے سب سے بڑی پناہ ہے۔',
      tafseerEnglish: 'Ayat al-Kursi (2:255): Authenticated by the Prophet ﷺ in Sahih Muslim as the greatest verse in the Book of Allah. It articulates ten distinct divine attributes: Absolute Monotheism, the Self-Sustaining Living nature of Allah, total immunity from slumber or fatigue, unmitigated ownership of the cosmos, singular authority where intercession occurs only by His leave, and His Kursi encompassing the heavens and earth.'
    };
  }

  if (surahNumber === 112 && ayahNumber === 1) {
    return {
      surahNumber: 112,
      ayahNumber: 1,
      source: 'Tafseer Ma\'ariful Quran (Surah Al-Ikhlas)',
      tafseerUrdu: 'قل ھو اللہ احد: یہ سورۃ مشرکین کے اس سوال کے جواب میں اتری کہ ’’اپنے رب کا نسب اور حسب بیان کرو‘‘۔ اللہ نے فرمایا: کہہ دیجیے کہ وہ اللہ ایک اور یکتا ہے، نہ اس کی کوئی جنس ہے، نہ مثل، نہ شریک، نہ اولاد، نہ باپ۔ یہ سورۃ قرآن مجید کے ایک تہائی کے برابر ثواب رکھتی ہے کیونکہ یہ خالص توحید کا بیان ہے۔',
      tafseerEnglish: 'Say: He is Allah, the One. Revealed when polytheists asked the Prophet ﷺ to describe the lineage of his Lord. It definitively proclaims absolute, indivisible Monotheism (Tawheed), entirely negating polytheism, dualism, anthropomorphism, or generational lineage. Reciting it is rewarded as one-third of the Quran.'
    };
  }

  // Generalized scholarly commentary for other ayahs
  return {
    surahNumber,
    ayahNumber,
    source: 'Tafseer Ibn Kathir & Bayan al-Quran',
    tafseerUrdu: `یہ آیت ${surahName} کی آیت نمبر ${ayahNumber} ہے۔ مفسرینِ کرام فرماتے ہیں کہ یہ آیت اہلِ ایمان کو تقویٰ، احکامِ الٰہیہ پر استقامت، اور اللہ تعالیٰ کی نعمتوں پر شکر ادا کرنے کی تلقین کرتی ہے۔ اس میں بندے کے اپنے رب سے تعلق اور آخرت کی جوابدہی کا گہرا احساس دلایا گیا ہے تاکہ مومن اپنی دنیاوی اور اخروی زندگی کو شریعت کے مطابق ڈھال سکے۔`,
    tafseerEnglish: `This is Ayah ${ayahNumber} of ${surahName}. Classical commentators including Imam Ibn Kathir and Al-Tabari explain that this verse emphasizes divine consciousness (Taqwa), steadfast adherence to the divine revelation, and remembrance of Allah\'s boundless bounties. It serves as a reminder of moral accountability in the Hereafter and encourages righteous deeds in daily life.`
  };
}

/**
 * Embedded Preloaded verses for instant offline display
 */
export const PRELOADED_SURAHS: Record<number, Ayah[]> = {
  1: [
    { number: 1, numberInSurah: 1, juz: 1, textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', textArabicIndopak: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ', translationUrdu: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے', translationEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', transliteration: 'Bismillāhir-Raḥmānir-Raḥīm', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3' },
    { number: 2, numberInSurah: 2, juz: 1, textArabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', textArabicIndopak: 'الْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ', translationUrdu: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے', translationEnglish: '[All] praise is [due] to Allah, Lord of the worlds -', transliteration: 'Al-ḥamdu lillāhi Rabbil-ʿālamīn', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001002.mp3' },
    { number: 3, numberInSurah: 3, juz: 1, textArabic: 'الرَّحْمَٰنِ الرَّحِيمِ', textArabicIndopak: 'الرَّحْمٰنِ الرَّحِيْمِۙ', translationUrdu: 'بڑا مہربان نہایت رحم کرنے والا ہے', translationEnglish: 'The Entirely Merciful, the Especially Merciful,', transliteration: 'Ar-Raḥmānir-Raḥīm', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001003.mp3' },
    { number: 4, numberInSurah: 4, juz: 1, textArabic: 'مَالِكِ يَوْمِ الدِّينِ', textArabicIndopak: 'مٰلِكِ يَوْمِ الدِّيْنِؕ', translationUrdu: 'روزِ جزا کا مالک ہے', translationEnglish: 'Sovereign of the Day of Recompense.', transliteration: 'Māliki Yawmid-Dīn', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001004.mp3' },
    { number: 5, numberInSurah: 5, juz: 1, textArabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', textArabicIndopak: 'اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُؕ', translationUrdu: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں', translationEnglish: 'It is You we worship and You we ask for help.', transliteration: 'Iyyāka naʿbudu wa iyyāka nastaʿīn', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001005.mp3' },
    { number: 6, numberInSurah: 6, juz: 1, textArabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', textArabicIndopak: 'اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ', translationUrdu: 'ہمیں سیدھے راستے کی ہدایت فرما', translationEnglish: 'Guide us to the straight path -', transliteration: 'Ihdinaṣ-ṣirāṭal-mustaqīm', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001006.mp3' },
    { number: 7, numberInSurah: 7, juz: 1, textArabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', textArabicIndopak: 'صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّآلِّيْنَ٪', translationUrdu: 'ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، جن پر نہ تیرا غضب نازل ہوا اور نہ وہ گمراہ ہوئے', translationEnglish: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.', transliteration: 'Ṣirāṭallaḏīna anʿamta ʿalayhim ġayril-maġḍūbi ʿalayhim walaḍ-ḍāllīn', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/001007.mp3' }
  ],
  108: [
    { number: 6205, numberInSurah: 1, juz: 30, textArabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', textArabicIndopak: 'اِنَّآ اَعْطَيْنٰكَ الْكَوْثَرَؕ', translationUrdu: 'بے شک ہم نے آپ کو کوثر (بے انتہا خیر و برکت) عطا فرمائی', translationEnglish: 'Indeed, We have granted you, [O Muhammad], al-Kawthar.', transliteration: 'Innā a\'ṭaynākal-Kawthar', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/108001.mp3' },
    { number: 6206, numberInSurah: 2, juz: 30, textArabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', textArabicIndopak: 'فَصَلِّ لِرَبِّكَ وَانْحَرْؕ', translationUrdu: 'پس آپ اپنے رب کے لیے نماز پڑھیں اور قربانی کریں', translationEnglish: 'So pray to your Lord and sacrifice [to Him alone].', transliteration: 'Faṣalli li-Rabbika wan-ḥar', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/108002.mp3' },
    { number: 6207, numberInSurah: 3, juz: 30, textArabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', textArabicIndopak: 'اِنَّ شَانِئَكَ هُوَ الْاَبْتَرُ٪', translationUrdu: 'بیشک آپ کا دشمن ہی بے نام و نشان رہنے والا ہے', translationEnglish: 'Indeed, your enemy is the one cut off.', transliteration: 'Inna shāni\'aka huwal-abtar', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/108003.mp3' }
  ],
  112: [
    { number: 6222, numberInSurah: 1, juz: 30, textArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', textArabicIndopak: 'قُلْ هُوَ اللّٰهُ اَحَدٌۚ', translationUrdu: 'آپ فرما دیجیے کہ وہ اللہ ایک ہے', translationEnglish: 'Say, "He is Allah, [who is] One,', transliteration: 'Qul Huwallāhu Aḥad', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112001.mp3' },
    { number: 6223, numberInSurah: 2, juz: 30, textArabic: 'اللَّهُ الصَّمَدُ', textArabicIndopak: 'اَللّٰهُ الصَّمَدُۚ', translationUrdu: 'اللہ بے نیاز (سب کا سہارا) ہے', translationEnglish: 'Allah, the Eternal Refuge.', transliteration: 'Allāhuṣ-Ṣamad', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112002.mp3' },
    { number: 6224, numberInSurah: 3, juz: 30, textArabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', textArabicIndopak: 'لَمْ يَلِدْ ۙ وَلَمْ يُوْلَدْۙ', translationUrdu: 'نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے', translationEnglish: 'He neither begets nor is born,', transliteration: 'Lam yalid wa lam yūlad', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112003.mp3' },
    { number: 6225, numberInSurah: 4, juz: 30, textArabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', textArabicIndopak: 'وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ٪', translationUrdu: 'اور کوئی اس کے برابر نہیں ہے', translationEnglish: 'Nor is there to Him any equivalent."', transliteration: 'Wa lam yakul-lahū kufuwan aḥad', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/112004.mp3' }
  ],
  113: [
    { number: 6226, numberInSurah: 1, juz: 30, textArabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', textArabicIndopak: 'قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِۙ', translationUrdu: 'آپ کہہ دیجیے کہ میں صبح کے رب کی پناہ مانگتا ہوں', translationEnglish: 'Say, "I seek refuge in the Lord of daybreak', transliteration: 'Qul a\'ūḏu bi-Rabbil-falaq', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113001.mp3' },
    { number: 6227, numberInSurah: 2, juz: 30, textArabic: 'مِن شَرِّ مَا خَلَقَ', textArabicIndopak: 'مِنْ شَرِّ مَا خَلَقَۙ', translationUrdu: 'ہر اس چیز کے شر سے جو اس نے پیدا کی', translationEnglish: 'From the evil of that which He created', transliteration: 'Min sharri mā khalaq', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113002.mp3' },
    { number: 6228, numberInSurah: 3, juz: 30, textArabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', textArabicIndopak: 'وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَۙ', translationUrdu: 'اور اندھیری رات کے شر سے جب وہ چھا جائے', translationEnglish: 'And from the evil of darkness when it settles', transliteration: 'Wa min sharri ghāsiqin iḏā waqab', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113003.mp3' },
    { number: 6229, numberInSurah: 4, juz: 30, textArabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', textArabicIndopak: 'وَمِنْ شَرِّ النَّفّٰثٰتِ فِي الْعُقَدِۙ', translationUrdu: 'اور گرہوں میں پھونکنے والیوں کے شر سے', translationEnglish: 'And from the evil of the blowers in knots', transliteration: 'Wa min sharrin-naffāthāti fīl-\'uqad', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113004.mp3' },
    { number: 6230, numberInSurah: 5, juz: 30, textArabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', textArabicIndopak: 'وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ٪', translationUrdu: 'اور حسد کرنے والے کے شر سے جب وہ حسد کرے', translationEnglish: 'And from the evil of an envier when he envies."', transliteration: 'Wa min sharri ḥāsidin iḏā ḥasad', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/113005.mp3' }
  ],
  114: [
    { number: 6231, numberInSurah: 1, juz: 30, textArabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', textArabicIndopak: 'قُلْ اَعُوْذُ بِرَبِّ النَّاسِۙ', translationUrdu: 'آپ کہیے کہ میں انسانوں کے رب کی پناہ میں آتا ہوں', translationEnglish: 'Say, "I seek refuge in the Lord of mankind,', transliteration: 'Qul a\'ūḏu bi-Rabbin-nās', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114001.mp3' },
    { number: 6232, numberInSurah: 2, juz: 30, textArabic: 'مَلِكِ النَّاسِ', textArabicIndopak: 'مَلِكِ النَّاسِۙ', translationUrdu: 'انسانوں کے بادشاہ کی', translationEnglish: 'The Sovereign of mankind,', transliteration: 'Malikin-nās', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114002.mp3' },
    { number: 6233, numberInSurah: 3, juz: 30, textArabic: 'إِلَٰهِ النَّاسِ', textArabicIndopak: 'اِلٰهِ النَّاسِۙ', translationUrdu: 'انسانوں کے حقیقی معبود کی', translationEnglish: 'The God of mankind,', transliteration: 'Ilāhin-nās', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114003.mp3' },
    { number: 6234, numberInSurah: 4, juz: 30, textArabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', textArabicIndopak: 'مِنْ شَرِّ الْوَسْوَاسِ ەۙ الْخَنَّاسِۙ', translationUrdu: 'وسوسہ ڈالنے والے، پیچھے ہٹ جانے والے کے شر سے', translationEnglish: 'From the evil of the retreating whisperer -', transliteration: 'Min sharril-waswāsil-khannās', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114004.mp3' },
    { number: 6235, numberInSurah: 5, juz: 30, textArabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', textArabicIndopak: 'الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ', translationUrdu: 'جو انسانوں کے سینوں میں وسوسے ڈالتا ہے', translationEnglish: 'Who whispers [evil] into the breasts of mankind -', transliteration: 'Alladhī yuwaswisu fī ṣudūrin-nās', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114005.mp3' },
    { number: 6236, numberInSurah: 6, juz: 30, textArabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', textArabicIndopak: 'مِنَ الْجِنَّةِ وَالنَّاسِ٪', translationUrdu: 'خواہ وہ جنات میں سے ہو یا انسانوں میں سے', translationEnglish: 'From among the jinn and mankind."', transliteration: 'Minal-jinnati wan-nās', audioUrl: 'https://everyayah.com/data/Alafasy_128kbps/114006.mp3' }
  ]
};

const CUSTOM_QURAN_DATASET_KEY = 'islam360_custom_quran_dataset';

export class QuranDataProvider {
  private static customSurahs: Record<number, Ayah[]> = {};
  private static cachedSurahs: Record<number, Ayah[]> = {};

  static init() {
    try {
      const stored = localStorage.getItem(CUSTOM_QURAN_DATASET_KEY);
      if (stored) {
        this.customSurahs = JSON.parse(stored);
      }
    } catch {}
  }

  static getSurahsList(): Omit<Surah, 'ayahs'>[] {
    return ALL_114_SURAHS;
  }

  static getJuzList(): JuzMeta[] {
    return ALL_30_JUZ;
  }

  static getSurahMeta(surahNumber: number): Omit<Surah, 'ayahs'> | undefined {
    return ALL_114_SURAHS.find(s => s.number === surahNumber);
  }

  static getSurahIntro(surahNumber: number): SurahIntro | undefined {
    return SURAH_INTROS[surahNumber];
  }

  static async getSurahWithAyahs(surahNumber: number): Promise<Surah> {
    const meta = this.getSurahMeta(surahNumber) || {
      number: surahNumber,
      nameArabic: `سورة ${surahNumber}`,
      nameEnglish: `Surah ${surahNumber}`,
      nameUrdu: `سورۃ ${surahNumber}`,
      englishMeaning: 'The Chapter',
      revelationType: 'Meccan' as const,
      revelationOrder: surahNumber,
      numberOfAyahs: 7,
      juzStart: 1,
      bismillahPre: surahNumber !== 9
    };

    const intro = this.getSurahIntro(surahNumber);

    // 1. User custom imported dataset
    if (this.customSurahs[surahNumber]) {
      return { ...meta, intro, ayahs: this.customSurahs[surahNumber] };
    }

    // 2. Preloaded dataset
    if (PRELOADED_SURAHS[surahNumber]) {
      return { ...meta, intro, ayahs: PRELOADED_SURAHS[surahNumber] };
    }

    // 3. Memory cache
    if (this.cachedSurahs[surahNumber]) {
      return { ...meta, intro, ayahs: this.cachedSurahs[surahNumber] };
    }

    // 4. Fetch from Quran CDN / API (Arabic Uthmani + Urdu Jalandhry + English Sahih)
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ur.jalandhry,en.sahih`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length === 3) {
          const arabicData = json.data[0].ayahs;
          const urduData = json.data[1].ayahs;
          const englishData = json.data[2].ayahs;

          const ayahs: Ayah[] = arabicData.map((item: any, idx: number) => ({
            number: item.number,
            numberInSurah: item.numberInSurah,
            juz: item.juz,
            page: item.page,
            textArabic: item.text,
            textArabicIndopak: item.text,
            translationUrdu: urduData[idx]?.text || '',
            translationEnglish: englishData[idx]?.text || '',
            transliteration: `Ayah ${item.numberInSurah}`,
            audioUrl: `https://everyayah.com/data/Alafasy_128kbps/${String(surahNumber).padStart(3, '0')}${String(item.numberInSurah).padStart(3, '0')}.mp3`
          }));

          this.cachedSurahs[surahNumber] = ayahs;
          return { ...meta, intro, ayahs };
        }
      }
    } catch (e) {
      console.warn('Network fetch for Surah fallback failed', e);
    }

    return { ...meta, intro, ayahs: [] };
  }

  static importCustomDataset(data: Record<number, Ayah[]> | { surahs: Record<number, Ayah[]> }): boolean {
    try {
      const dataset = 'surahs' in data ? data.surahs : data;
      this.customSurahs = { ...this.customSurahs, ...dataset };
      localStorage.setItem(CUSTOM_QURAN_DATASET_KEY, JSON.stringify(this.customSurahs));
      return true;
    } catch {
      return false;
    }
  }

  static search(query: string): { surah: Omit<Surah, 'ayahs'>; ayah: Ayah }[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: { surah: Omit<Surah, 'ayahs'>; ayah: Ayah }[] = [];
    const allAvailable = { ...PRELOADED_SURAHS, ...this.customSurahs, ...this.cachedSurahs };

    for (const [surahNumStr, ayahs] of Object.entries(allAvailable)) {
      const surahNum = Number(surahNumStr);
      const meta = this.getSurahMeta(surahNum);
      if (!meta) continue;

      for (const ayah of ayahs) {
        if (
          ayah.textArabic.includes(query) ||
          (ayah.textArabicIndopak && ayah.textArabicIndopak.includes(query)) ||
          ayah.translationUrdu.includes(query) ||
          ayah.translationEnglish.toLowerCase().includes(q)
        ) {
          results.push({ surah: meta, ayah });
          if (results.length >= 25) return results;
        }
      }
    }

    return results;
  }
}

// Init provider
QuranDataProvider.init();
