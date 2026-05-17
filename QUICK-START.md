# 🚀 Bio-net India - QUICK START GUIDE

## Get Your App Running in 5 Minutes!

---

## ✅ What You Have

A complete **React Native mobile app** with:
- ✅ JavaScript (not TypeScript)
- ✅ Separate folder: `/bionet-mobile/`
- ✅ iOS & Android support
- ✅ Camera, GPS, Audio features
- ✅ Offline mode
- ✅ 9 languages

---

## 📱 Setup in 3 Commands

### 1️⃣ Navigate to Folder
```bash
cd bionet-mobile
```

### 2️⃣ Install Dependencies
```bash
npm install
```
⏱️ Wait 2-3 minutes...

### 3️⃣ Start the App
```bash
expo start
```

✅ **That's it!** A QR code will appear!

---

## 📲 Run on Your Phone

### iOS (iPhone/iPad)

1. **Download Expo Go** from App Store
2. **Open Camera app**
3. **Scan QR code** on your computer screen
4. **Tap notification** "Open in Expo Go"
5. **App loads!** 🎉

### Android

1. **Download Expo Go** from Play Store
2. **Open Expo Go app**
3. **Tap "Scan QR Code"**
4. **Scan QR code** on your computer screen
5. **App loads!** 🎉

---

## 🎯 First-Time Setup

### Step 1: Install Expo CLI (One Time)

If you don't have Expo CLI:

```bash
npm install -g expo-cli
```

### Step 2: Install Expo Go App

Download on your phone:
- 🍎 **iOS:** App Store → "Expo Go"
- 🤖 **Android:** Play Store → "Expo Go"

---

## 📂 File Structure

```
bionet-mobile/
├── App.js                    ← Main entry point
├── package.json              ← Dependencies
├── app.json                  ← Configuration
│
├── src/
│   ├── screens/             ← 8 screens (.js files)
│   ├── services/            ← API integration
│   └── contexts/            ← State management
│
├── README.md                 ← Full documentation
├── SETUP-GUIDE.md           ← Detailed guide
└── QUICK-START.md           ← This file
```

---

## 🔧 Configuration (Optional)

### Update API URL

Before going to production, edit `src/services/api.js`:

```javascript
// Line 5
const API_BASE_URL = 'https://your-api-url.com/api';
```

Replace with your actual backend URL.

---

## ✅ Feature Test Checklist

Once app is running, test:

- [ ] Login screen appears
- [ ] Click "Continue as Guest"
- [ ] Home screen shows
- [ ] Bottom tabs work
- [ ] Click "Add Entry"
- [ ] Click "Take Photo" (allows camera)
- [ ] Click "Get GPS Location" (allows location)
- [ ] Click "Record Audio" (allows microphone)
- [ ] Try switching languages in Profile
- [ ] Check Map tab
- [ ] Check Entries tab

---

## 🐛 Common Issues & Fixes

### ❌ "expo: command not found"

**Fix:**
```bash
npm install -g expo-cli
```

---

### ❌ "Cannot find module..."

**Fix:**
```bash
rm -rf node_modules
npm install
```

---

### ❌ QR code doesn't work

**Fix 1:** Ensure phone and computer on same WiFi

**Fix 2:** Try tunnel mode:
```bash
expo start --tunnel
```

---

### ❌ App crashes on phone

**Fix:**
```bash
expo start -c
```
(Clears cache)

---

### ❌ Camera not working

**Solution:**
- Must test on REAL device (not emulator)
- Allow permissions when app asks

---

## 🎨 Customize Your App

### Change App Name

Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name"
  }
}
```

### Change Primary Color

Edit `App.js` and screen files:
```javascript
// Find #10b981 (emerald green)
// Replace with your color
```

---

## 📦 Build for Production

### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build
eas build --platform android
```

### iOS IPA

```bash
eas build --platform ios
```
(Requires Apple Developer account - $99/year)

---

## 📚 Need More Help?

📖 **Full Documentation:** See `README.md`  
📖 **Detailed Setup:** See `SETUP-GUIDE.md`  
📖 **Project Overview:** See `PROJECT-SUMMARY.md`

🌐 **Online Resources:**
- Expo Docs: https://docs.expo.dev
- React Native: https://reactnative.dev

💬 **Community:**
- Expo Forums: https://forums.expo.dev
- Discord: https://discord.gg/expo

---

## ⚡ Quick Commands Reference

```bash
# Start development
npm start

# Start with cleared cache
expo start -c

# Run on Android emulator
npm run android

# Run on iOS simulator (Mac only)
npm run ios

# Build for production
eas build --platform android
eas build --platform ios
```

---

## 🎯 What Files Are JavaScript?

ALL files use JavaScript (.js), NOT TypeScript (.tsx):

```
✅ App.js
✅ HomeScreen.js
✅ BiodiversityFormScreen.js
✅ BiodiversityListScreen.js
✅ MapScreen.js
✅ ProfileScreen.js
✅ LoginScreen.js
✅ api.js
✅ LanguageContext.js
✅ UserContext.js
✅ OfflineContext.js
```

No `.tsx` or `.ts` files! Pure JavaScript! 🎉

---

## 🌍 Supported Languages

Switch in Profile screen:

- English
- हिंदी (Hindi)
- ಕನ್ನಡ (Kannada)
- తెలుగు (Telugu)
- മലയാളം (Malayalam)
- தமிழ் (Tamil)
- ଓଡ଼ିଆ (Odia)
- বাংলা (Bengali)
- मराठी (Marathi)

---

## 🎉 You're Ready!

### Next Command:

```bash
cd bionet-mobile && npm install && expo start
```

### Then:

📱 **Scan QR code with Expo Go app!**

---

**Made with ❤️ for India's Biodiversity Conservation**

**SARA Centre | TCS ProEngage**
