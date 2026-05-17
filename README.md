# 📱 Bio-net India Mobile App

## Complete React Native Application with JavaScript

A comprehensive People's Biodiversity Register (PBR) mobile application for iOS and Android, built with React Native, Expo, and JavaScript.

---

## 🎯 Overview

Bio-net India is a mobile app developed under India's Biological Diversity Act 2002, enabling communities to document local biodiversity, traditional knowledge, and environmental observations.

**Organization:** SARA Centre  
**Support:** TCS ProEngage Volunteers

---

## ✨ Features

### Core Functionality
- ✅ **Camera Integration** - Native camera for biodiversity photos
- ✅ **GPS Location** - Automatic GPS tagging for entries
- ✅ **Audio Recording** - Voice notes for field observations
- ✅ **Offline-First** - Works without internet, syncs later
- ✅ **Multilingual** - 9 Indian languages (English, Hindi, Kannada, Telugu, Malayalam, Tamil, Odia, Bengali, Marathi)
- ✅ **Map Visualization** - Interactive maps for sightings
- ✅ **Role-Based Access** - Community User, Volunteer, NGO, Admin

### Native Features
- `expo-camera` - Camera access
- `expo-location` - GPS tracking
- `expo-av` - Audio recording
- `expo-image-picker` - Photo selection
- `react-native-maps` - Map display
- `@react-native-async-storage/async-storage` - Offline storage
- `@react-native-community/netinfo` - Network detection

---

## 📁 Project Structure

```
bionet-mobile/
├── App.js                           # Main app entry with navigation
├── package.json                     # Dependencies
├── app.json                         # Expo configuration
│
├── src/
│   ├── screens/                     # Screen components
│   │   ├── HomeScreen.js
│   │   ├── BiodiversityFormScreen.js
│   │   ├── BiodiversityListScreen.js
│   │   ├── MapScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── LoginScreen.js
│   │   ├── TraditionalKnowledgeScreen.js
│   │   └── AgroBiodiversityScreen.js
│   │
│   ├── services/                    # API services
│   │   └── api.js
│   │
│   └── contexts/                    # React Context providers
│       ├── LanguageContext.js
│       ├── UserContext.js
│       └── OfflineContext.js
│
└── assets/                          # Images, icons, fonts
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Studio (optional)
- Smartphone with Expo Go app

### Installation

1. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

2. **Navigate to project directory**
   ```bash
   cd bionet-mobile
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on your device**
   - **iOS:** Open Camera app, scan QR code
   - **Android:** Open Expo Go app, scan QR code

---

## 📱 Testing on Device

### Method 1: Real Device (Recommended)

1. **Download Expo Go**
   - iOS: App Store → "Expo Go"
   - Android: Play Store → "Expo Go"

2. **Start development server**
   ```bash
   expo start
   ```

3. **Scan QR code**
   - iOS: Use Camera app
   - Android: Use Expo Go app

### Method 2: Emulator/Simulator

**iOS Simulator (Mac only):**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

---

## ⚙️ Configuration

### Update API URL

Edit `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://your-api-url.com/api';
```

### Environment Variables

Create `.env` file:

```env
API_URL=https://your-backend-url.com/api
GOOGLE_MAPS_API_KEY=your_maps_api_key
```

---

## 🔐 Permissions

### iOS (app.json)
- Camera Usage
- Location When In Use
- Microphone Usage

### Android (app.json)
- CAMERA
- ACCESS_FINE_LOCATION
- ACCESS_COARSE_LOCATION
- RECORD_AUDIO
- READ_EXTERNAL_STORAGE
- WRITE_EXTERNAL_STORAGE

All permissions are already configured!

---

## 📦 Building for Production

### Option 1: EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

### Option 2: Classic Build

```bash
# Android APK
expo build:android -t apk

# iOS IPA (requires Apple Developer account)
expo build:ios
```

---

## 🌐 API Integration

### Required Endpoints

Your backend should provide:

```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/biodiversity
POST   /api/biodiversity
PUT    /api/biodiversity/:id
DELETE /api/biodiversity/:id
GET    /api/stats
POST   /api/sync/entries
GET    /api/traditional-knowledge
POST   /api/traditional-knowledge
GET    /api/agro-biodiversity
POST   /api/agro-biodiversity
```

---

## 🎨 Screens

1. **LoginScreen** - Authentication
2. **HomeScreen** - Dashboard with stats
3. **BiodiversityFormScreen** - Form with camera/GPS/audio
4. **BiodiversityListScreen** - List of all entries
5. **MapScreen** - Interactive map view
6. **ProfileScreen** - User profile & settings
7. **TraditionalKnowledgeScreen** - Traditional knowledge module
8. **AgroBiodiversityScreen** - Agricultural biodiversity

---

## 🌍 Multilingual Support

Supported languages:
- English (en)
- हिंदी - Hindi (hi)
- ಕನ್ನಡ - Kannada (kn)
- తెలుగు - Telugu (te)
- മലയാളം - Malayalam (ml)
- தமிழ் - Tamil (ta)
- ଓଡ଼ିଆ - Odia (or)
- বাংলা - Bengali (bn)
- मराठी - Marathi (mr)

---

## 📤 Publishing to App Stores

### Google Play Store

1. Create developer account ($25 one-time)
2. Build APK/AAB: `eas build --platform android`
3. Upload to Play Console
4. Fill store listing
5. Submit for review

### Apple App Store

1. Join Apple Developer Program ($99/year)
2. Build IPA: `eas build --platform ios`
3. Upload via Transporter
4. Create app record in App Store Connect
5. Submit for review

---

## 🔧 Troubleshooting

### Metro Bundler Issues
```bash
expo start -c
# or
npx expo start --clear
```

### Dependencies Not Installing
```bash
rm -rf node_modules
npm install
```

### Camera Not Working
- Test on real device (emulators have limited camera support)
- Check permissions in device settings

### Location Permissions Denied
- Settings → Apps → Expo Go → Permissions → Enable Location

---

## 📚 Documentation

- **Expo Docs:** https://docs.expo.dev
- **React Native:** https://reactnative.dev
- **React Navigation:** https://reactnavigation.org

---

## 🤝 Support

**Organization:** SARA Centre  
**Volunteers:** TCS ProEngage  
**Email:** support@bionetindia.org  
**Website:** www.bionetindia.org

---

## 📄 License

MIT License

---

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure API URL in `src/services/api.js`
3. ✅ Add Google Maps API key (optional)
4. ✅ Run the app: `expo start`
5. ✅ Test on your device with Expo Go
6. ✅ Build production APK/IPA when ready

---

**Made with ❤️ for India's Biodiversity Conservation**
