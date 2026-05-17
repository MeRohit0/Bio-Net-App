# 🚀 Bio-net India Mobile App - Complete Setup Guide

## Step-by-Step Installation for JavaScript Version

---

## 📋 Prerequisites

Before starting, ensure you have:

✅ **Node.js 18+** - [Download](https://nodejs.org/)  
✅ **npm** (comes with Node.js)  
✅ **Code Editor** - VS Code recommended  
✅ **Smartphone** - iOS or Android for testing  

Optional:
- **Xcode** (Mac only) - For iOS Simulator
- **Android Studio** - For Android Emulator

---

## 🎯 Step 1: Install Expo CLI

```bash
npm install -g expo-cli
```

Verify installation:
```bash
expo --version
```

Expected output: `6.x.x` or higher

---

## 📱 Step 2: Install Expo Go on Your Phone

### For Testing on Real Device

**iOS:**
1. Open App Store
2. Search "Expo Go"
3. Install the app
4. Open it once

**Android:**
1. Open Google Play Store
2. Search "Expo Go"
3. Install the app
4. Open it once

---

## 💻 Step 3: Setup the Project

### Navigate to Project Directory

```bash
cd bionet-mobile
```

### Install Dependencies

```bash
npm install
```

This will install all required packages:
- React Native
- Expo SDK
- Navigation libraries
- Camera, Location, Audio libraries
- And more...

**Wait time:** 2-5 minutes depending on your internet speed

---

## ⚙️ Step 4: Configure the App

### 4.1 Update API URL

Edit `src/services/api.js`:

```javascript
// Line 4-5
const API_BASE_URL = 'https://your-api-url.com/api';
// Replace with your actual backend API URL
```

### 4.2 Google Maps API Key (Optional)

If you want to use Google Maps:

1. Get API key from [Google Cloud Console](https://console.cloud.google.com)
2. Edit `app.json` and add:

```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```

---

## 🏃 Step 5: Run the App

### Start Development Server

```bash
npm start
```

or

```bash
expo start
```

This will:
1. Start Metro bundler
2. Open browser with QR code
3. Display connection options

**Expected output:**
```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

---

## 📱 Step 6: Test on Your Device

### iOS (iPhone/iPad)

1. **Open Camera App**
2. **Point at QR code** (on your computer screen)
3. **Tap notification** "Open in Expo Go"
4. **App will load** (first time takes 1-2 minutes)

### Android

1. **Open Expo Go app**
2. **Tap "Scan QR Code"**
3. **Point at QR code** (on your computer screen)
4. **App will load** (first time takes 1-2 minutes)

---

## 🧪 Step 7: Test Features

### Test Checklist

- [ ] App launches successfully
- [ ] Login screen appears
- [ ] Can navigate with bottom tabs
- [ ] Home screen shows stats
- [ ] Camera opens when clicking "Take Photo"
- [ ] GPS captures location
- [ ] Audio recording works
- [ ] Form can be submitted
- [ ] Offline mode saves entries
- [ ] Map displays correctly
- [ ] Language switcher works

---

## 🔐 Step 8: Test Permissions

The app will request permissions when you use features:

### iOS
- **Camera:** When you click "Take Photo"
- **Location:** When you click "Get GPS Location"
- **Microphone:** When you click "Record Audio"

**Tap "Allow" for all permissions**

### Android
- Same as iOS - permissions requested on first use
- **Tap "Allow" or "While using the app"**

---

## 🛠️ Step 9: Development Commands

### Available Commands

```bash
# Start development server
npm start

# Start with cache cleared
expo start -c

# Run on Android emulator
npm run android

# Run on iOS simulator (Mac only)
npm run ios

# Run on web browser (limited functionality)
npm run web
```

---

## 📦 Step 10: Build for Production

### Using EAS Build (Recommended)

#### 10.1 Install EAS CLI

```bash
npm install -g eas-cli
```

#### 10.2 Login to Expo

```bash
eas login
```

Create account if you don't have one: https://expo.dev/signup

#### 10.3 Configure Build

```bash
eas build:configure
```

This creates `eas.json` file

#### 10.4 Build Android APK

```bash
eas build --platform android --profile production
```

**Wait time:** 10-20 minutes  
**Output:** Download link for APK file

#### 10.5 Build iOS IPA

```bash
eas build --platform ios --profile production
```

**Requirements:**
- Apple Developer account ($99/year)
- Certificates configured

**Wait time:** 15-30 minutes  
**Output:** Download link for IPA file

---

## 📱 Step 11: Install on Real Device

### Android APK Installation

1. **Download APK** from EAS build
2. **Transfer to phone** (email, USB, cloud)
3. **Open APK file** on phone
4. **Tap "Install"**
5. **May need to allow "Unknown sources"**

### iOS IPA Installation

1. **Upload to App Store Connect**, or
2. **Use TestFlight** for beta testing

---

## 🏪 Step 12: Publish to App Stores

### Google Play Store

#### 12.1 Create Developer Account
- Visit: https://play.google.com/console
- Pay $25 one-time fee
- Complete registration

#### 12.2 Create App
1. Click "Create app"
2. Fill in app details
3. Set content rating
4. Upload APK/AAB

#### 12.3 Store Listing
- Write app description
- Add screenshots (minimum 2)
- Create icon (512x512 PNG)
- Set category
- Add privacy policy URL

#### 12.4 Submit for Review
- Complete all sections
- Click "Submit for review"
- **Review time:** 1-7 days

### Apple App Store

#### 12.1 Join Developer Program
- Visit: https://developer.apple.com
- Pay $99/year
- Complete enrollment

#### 12.2 App Store Connect
1. Create app record
2. Fill in app information
3. Add screenshots (required sizes)
4. Set pricing
5. Write description

#### 12.3 Upload Build
- Use Transporter app
- Upload IPA file
- Select build in App Store Connect

#### 12.4 Submit for Review
- Complete all sections
- Submit for review
- **Review time:** 1-3 days typically

---

## 🐛 Troubleshooting

### Issue: "Metro bundler won't start"

**Solution:**
```bash
expo start -c
# or
npx expo start --clear
```

### Issue: "Dependencies not installing"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "QR code doesn't work"

**Solution:**
1. Ensure phone and computer on same WiFi
2. Try tunnel mode: `expo start --tunnel`
3. Check firewall settings

### Issue: "Camera not working"

**Solution:**
- Test on real device (emulators limited)
- Check permissions in phone settings
- Restart Expo Go app

### Issue: "Location permissions denied"

**Solution:**
1. Go to Settings → Apps → Expo Go
2. Tap Permissions
3. Enable Location → "Allow all the time" or "While using"

### Issue: "App crashes on startup"

**Solution:**
```bash
# Clear Expo cache
expo start -c

# Reinstall dependencies
rm -rf node_modules
npm install

# Restart metro bundler
npm start
```

---

## 🎨 Customization

### Change App Name

Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Change App Icon

1. Create 1024x1024 PNG icon
2. Save as `assets/icon.png`
3. Run `expo start` (auto-regenerates)

### Change Splash Screen

1. Create 1284x2778 PNG image
2. Save as `assets/splash.png`
3. Edit `app.json` splash settings

### Change Theme Colors

Edit `App.js` and screen files:
```javascript
// Primary color (emerald green)
const primaryColor = '#10b981';

// Change to your color
const primaryColor = '#YOUR_COLOR';
```

---

## 📚 Learning Resources

### Documentation
- **Expo:** https://docs.expo.dev
- **React Native:** https://reactnative.dev
- **React Navigation:** https://reactnavigation.org

### Video Tutorials
- Expo YouTube: https://youtube.com/@expo
- React Native School: https://reactnativeschool.com

### Community
- Expo Forums: https://forums.expo.dev
- Discord: https://discord.gg/expo
- Stack Overflow: Tag `expo` or `react-native`

---

## ✅ Production Checklist

Before publishing:

- [ ] Test on both iOS and Android
- [ ] Test offline functionality
- [ ] Verify all permissions work
- [ ] Test camera, GPS, audio
- [ ] Check API integration
- [ ] Review error handling
- [ ] Test form validations
- [ ] Verify data persistence
- [ ] Check performance
- [ ] Create app store assets
- [ ] Write privacy policy
- [ ] Prepare app screenshots
- [ ] Design app icon
- [ ] Test different screen sizes
- [ ] Remove console.log statements
- [ ] Update API_BASE_URL to production

---

## 🎯 Quick Reference

### Start Development
```bash
cd bionet-mobile
npm install
expo start
```

### Build for Testing
```bash
eas build --platform android --profile preview
```

### Build for Production
```bash
eas build --platform android --profile production
eas build --platform ios --profile production
```

### Clear Cache
```bash
expo start -c
```

---

## 🆘 Getting Help

**Stuck? Here's how to get help:**

1. **Check Documentation** - Most answers in Expo docs
2. **Search Forums** - expo.dev/forums
3. **Ask Community** - Discord, Stack Overflow
4. **File Issue** - GitHub if it's a bug

**Contact:**
- Email: support@bionetindia.org
- Website: www.bionetindia.org

---

## 🎉 Congratulations!

You've successfully set up Bio-net India mobile app!

**Next command to start:**
```bash
cd bionet-mobile
npm install
expo start
```

**Then scan QR code with Expo Go app! 📱**

---

**Made with ❤️ for India's Biodiversity Conservation**
