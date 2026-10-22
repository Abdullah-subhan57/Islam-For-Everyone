# Islam 360 Ultimate — Islam for Everyone
### Comprehensive Islamic Knowledge, Holy Quran & Hadith Portal

A production-ready Islamic Application inspired by **Islam 360**, built with **React**, **TypeScript**, and **Tailwind CSS**, featuring responsive mobile navigation and a modern navy-and-turquoise palette inspired by traditional Islamic design.

---

## 🚀 Quick Start in VS Code

### 1. Open the Folder in VS Code
Open VS Code, then go to:
- **File** → **Open Folder...**
- Select: `C:\Users\Ali Baba\antigravity\Islam for everyone`

*(Or run from your terminal):*
```bash
code "C:\Users\Ali Baba\antigravity\Islam for everyone"
```

### 2. Install Dependencies
In the VS Code terminal (`Ctrl + ~`):
```bash
npm install
```

### 3. Run the Development Server
Create a local environment file and add your Gemini key there. Keep it server-side; do not use a `VITE_` prefix:
```powershell
Copy-Item .env.example .env
```
Replace the example `GEMINI_API_KEY` value in `.env`, then run:
```bash
npm run dev
```
This starts both Vite and the local assistant API. Open **[http://localhost:3000](http://localhost:3000)** in your browser. If port 3000 is occupied, set `APP_PORT` before starting; the assistant API port can be changed with `ASSISTANT_API_PORT`.

---

## 📖 Key Modules & Features

| # | Page / Feature | Highlights |
|---|---|---|
| **1** | **Home Dashboard** | Dynamic Verse & Hadith of the Day (randomize, play, copy, bookmark), live next prayer countdown, 8-pillar quick access grid, daily streak & reading goal tracker. |
| **2** | **Holy Quran Reader** | 114 Surahs & 30 Juz, Urdu and English translations, and verse audio. Start a full-surah recitation and use media-session controls on supported lock screens. |
| **3** | **Hadith Collections** | Six collections load Arabic, Urdu, and English editions on demand; filter by collection, chapter/topic, number, or text. Results are paginated, and unavailable grades are not guessed. |
| **4** | **Prayer Times & Adhan** | Editable Fajr 05:40, Dhuhr 13:45, Asr 16:15, Maghrib 17:30, and Isha 19:30 defaults; per-account manual times, calculated-time option, optional GPS, and full Adhan audio. |
| **5** | **Qibla Compass** | Uses browser-permitted live GPS to calculate the Kaaba bearing and distance, follows location updates, and gives live turn guidance when the phone compass sensor is available. |
| **6** | **Daily Duas (Hisn al-Muslim)** | Search and filter supplications, use repetition counters, listen with the device's Arabic speech voice, and opt into morning/evening browser notifications while the app is open. |
| **7** | **Digital Tasbih** | Counter, selected dhikr, laps, daily total, and lifetime count are saved locally and synced with an account when Supabase is configured. |
| **8** | **Quiz & 99 Names of Allah** | Bilingual quiz, a saved completion badge, printable certificate, and the 99 Names gallery. |
| **9** | **Islamic History** | The standard list of 25 prophets named in the Quran, the Rashidun caliphs, and historical caliphates/dynasties with bilingual summaries and milestones. |
| **10** | **AI Assistant** | Bilingual server-side Gemini Q&A plus offline navigation actions for app pages and Quran/Adhan audio. Conversation memory is backed up locally and synced per account when configured. |
| **11** | **Ibadat Guide** | Urdu/English step-by-step guides for Salah, fasting, Zakat, Hajj, Umrah, and Ghusl. Salah includes Arabic, transliteration, and translations for each prayer position. |
| **12** | **Sign-in & Cloud Memory** | Optional Supabase Google OAuth and email-code verification, username profile, row-level-security-protected account data, and assistant memory sync. |

### Optional Google/email sign-in and cloud backup

The app runs in local-device mode when Supabase is not configured. Profile, Salah, reading, Tasbih, bookmarks, and assistant progress are saved in browser/device storage. Sign in with Supabase to sync across devices; offline changes are kept locally and restored before older cloud state is synced. Local browser/app data can still be removed by the user or operating system, so configure Supabase cloud sync for a separate backup.

To enable sign-in and account sync:

1. Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) in its SQL Editor. The table uses row-level security so each signed-in user can only read or update their own app state.
2. In Supabase Authentication, enable Google and configure its provider credentials. Add your app URL to the allowed redirect URLs. The Google OAuth callback is `https://<project-ref>.supabase.co/auth/v1/callback`.
3. Configure the Supabase email sign-in template to include the one-time token placeholder `{{ .Token }}` so users receive a verification code. New email accounts ask for a username before the code is sent; the username is stored in auth metadata and the app profile.
4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env`, then restart the dev server. The anon key is public; never put a Supabase service-role key in frontend variables.

Google client secrets and provider credentials belong in the Supabase dashboard, not in this repository or chat. Without these project/provider settings, the login screen cannot authenticate users.

### Data sources and accuracy notes

- Full Hadith editions are fetched from the public-domain [Hadith API dataset](https://github.com/fawazahmed0/hadith-api) only when a collection is selected. An internet connection is required; numbering and edition totals can vary between published editions.
- The editable prayer-time defaults are the requested schedule (05:40, 13:45, 16:15, 17:30, 19:30). Users can save location-specific manual times or switch to local NOAA solar-position calculations using the selected location's IANA time zone, Karachi 18° Fajr/Isha angles, and Hanafi/Shafi Asr method. Local sighting adjustments and authority-specific offsets may differ.
- On the web, prayer and azkar notifications require the app to remain open and browser notifications to be allowed. Capacitor Android/iOS builds can schedule native prayer reminders for the next six days; the schedule is refreshed when the app opens or the user's prayer settings change. Android may ask the user to allow exact alarms; if declined, reminder delivery can be delayed. Reminders are notifications only and do not play full Adhan audio automatically. Browsers and standard local notifications do not let a web page select the operating system's notification ringtone.
- Quran audio uses the Capacitor media-session integration for native media controls and lock-screen metadata. Background playback varies by OS, device, battery settings, and audio source; verify it on a physical Android device with the screen locked. iOS native builds require macOS/Xcode, and this repository currently has no configured iOS project.
- Live Qibla GPS works on HTTPS (or localhost) after the user grants location permission. Live turn-by-turn compass guidance also requires a supported device orientation sensor and permission; otherwise, the app displays the bearing and cardinal direction.
- Dua playback uses the speech voices installed in the user's browser/device; it is not a recorded Qari recitation.
- Local assistant actions (opening Quran, Hadith, prayer, Qibla, Tasbih, calendar, quiz, history, 99 Names, account, dua, and Ibadat pages, plus Quran/Adhan audio) do not require an AI key. General AI answers send conversation context to Google Gemini. Configure `GEMINI_API_KEY` only in the server environment or a local `.env` file; the browser never receives the key. Do not submit sensitive personal information. AI responses are general guidance, not verified citations or religious rulings.
- Salah recitation wording and some positions vary by school. The guide presents common forms, labels school-specific examples such as Witr qunut, and notes where no particular supplication is required; follow a trusted teacher for your tradition.
- The Islamic calendar contains selected observances and historical dates, not an exhaustive chronology. Some religious and historical dates vary by source or are disputed.

### Production server

Build the frontend and start the Express server, which serves both the app and the Gemini API:
```bash
npm run build
npm start
```
Set `PORT`, `GEMINI_API_KEY`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY` in the hosting provider's environment before building. Only the public Supabase URL and anon key are included in frontend assets; the Gemini key remains server-only. The default port is `3000`.

### Publish the app for other people

One straightforward option is a Node web service on Render; the Express server hosts both the built app and assistant API.

1. Create a private GitHub repository and upload this project folder. Do not upload `.env`, `node_modules`, or `dist`; `.gitignore` excludes them.
2. In Render, create a **Web Service** connected to that GitHub repository.
3. Set **Build Command** to `npm install && npm run build` and **Start Command** to `npm start`.
4. Add `GEMINI_API_KEY` in the service's environment variables if you want AI-generated answers. Keep it server-side; never add it as a `VITE_` variable.
5. To enable cross-device sign-in and backup, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Render before building, then add the Render URL to Supabase's allowed redirect URLs and configure the auth callback/templates.
6. Deploy and share the HTTPS URL. Users must allow GPS in their browser for live Qibla; phone compass sensors may require an additional browser permission.

The app works without Supabase, but then progress remains in that user's browser storage. AI answers need a Gemini key; local page navigation and other local actions do not. Check Render's current free-tier limits before choosing it for a public service; a free instance may sleep when unused.

### Build and release the Android app

Use a current Android Studio installation with its bundled JDK and Android SDK:

1. Install dependencies and build/sync the web app and Capacitor plugins:
   ```bash
   npm install
   npm run cap:sync:android
   ```
   `npm run cap:sync:android` runs the Vite production build and copies the result and native plugin configuration into Android.
2. Open the native project with `npm run android:open` (or open the `android` folder in Android Studio), allow Gradle sync to finish, then run the app on an emulator or physical Android device.
3. Test email verification, account/cloud sync, prayer reminder permission/scheduling, and Quran playback with the screen locked on a physical device. Android notification and media-session behavior can vary by OS and manufacturer.
4. In Android Studio, choose **Build → Generate Signed Bundle / APK**, select **Android App Bundle (AAB)** for Google Play, create or select a signing key, and keep the keystore/passwords private and backed up. Do not commit signing credentials or `.env` files.
5. Upload the signed AAB through Google Play Console's testing track before production release. Set production Supabase redirect URLs and server-side `GEMINI_API_KEY` in the hosting environment.

For iOS, use a Mac with Xcode and add/configure the Capacitor iOS platform before building and signing. Desktop packaging is not configured in this repository; use a dedicated Capacitor-compatible desktop runtime if desktop binaries are required.

---

## 🎨 Light Theme & Dual Language (i18n)

- **Light visual design**: Misty white surfaces, deep teal navigation, and bright turquoise accents.
- **Instant Language Switcher (UR / EN)**:
  - English (LTR) with clean typography.
  - Urdu (RTL) with beautiful `Noto Nastaliq Urdu` typography.

---

## 📂 Project Structure

```
Islam for everyone/
├── index.html                   # Entry HTML with Google Fonts
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite bundler configuration
├── server.ts                    # Production Express server
├── scripts/
│   └── dev.mjs                  # Starts Vite and the assistant API together
├── server/
│   └── assistantApi.ts          # Server-only Gemini endpoint and request limits
└── src/
    ├── main.tsx                 # React DOM root entry
    ├── App.tsx                  # Main layout & router
    ├── index.css                # Tailwind styling & Islamic arabesque motifs
    ├── types/
    │   └── index.ts             # TypeScript definitions
    ├── context/
    │   └── AppContext.tsx       # State management (Theme, Language, Bookmarks, Audio)
    ├── components/
    │   ├── Header.tsx           # Calligraphic banner, Hijri date & toggles
    │   ├── Navigation.tsx       # Desktop tabs & mobile dock
    │   ├── AudioPlayerBar.tsx   # Floating recitation player
    │   ├── SearchModal.tsx      # Global search modal (Ctrl+K)
    │   ├── BookmarksDrawer.tsx  # Slide-over saved items drawer
    │   └── DatasetModal.tsx     # Custom Quran JSON dataset importer
    ├── pages/
    │   ├── AIAssistantPage.tsx  # Bilingual Gemini assistant
    │   ├── HomeDashboard.tsx    # Page 1: Dashboard
    │   ├── QuranReader.tsx      # Page 2: Quran Reader
    │   ├── HadithBrowser.tsx    # Page 3: Hadith Collections
    │   ├── PrayerTimesPage.tsx  # Page 4: Prayer Times & Adhan
    │   ├── QiblaCompassPage.tsx # Page 5: Qibla Compass
    │   ├── DuasAzkarPage.tsx    # Page 6: Daily Duas & Azkar
    │   ├── DigitalTasbihPage.tsx# Page 7: Digital Tasbih
    │   └── QuizLearningPage.tsx # Page 8: Quiz & 99 Names
    └── services/
        ├── quranData.ts         # Quran metadata, preloaded Surahs & JSON importer
        ├── hadithData.ts        # Canonical hadiths & books catalog
        ├── prayerTimes.ts       # Solar astronomical calculation & Hijri calendar
        ├── qibla.ts             # Great-circle Kaaba azimuth & Haversine distance
        ├── duaData.ts           # Hisn al-Muslim supplications
        ├── tasbihPresets.ts     # Tasbih presets & Web Audio click synthesizer
        ├── quizData.ts          # Quiz questions & 99 Names of Allah
        └── translations.ts      # Urdu and English i18n dictionaries
```

---

## 🔌 How to Plug In Your Custom Quran Dataset

You can plug in your custom Quran JSON dataset in two easy ways:

1. **Via the User Interface**:
   - Click the **Import JSON** button in the top navigation bar.
   - Drag & drop or select your `.json` file, or paste your JSON directly.
   - It will validate and save to `localStorage` immediately.

2. **Via Code (`src/services/quranData.ts`)**:
   - Call `QuranDataProvider.importCustomDataset(yourDataset)` anywhere in your code or add your JSON objects to `PRELOADED_SURAHS`.
