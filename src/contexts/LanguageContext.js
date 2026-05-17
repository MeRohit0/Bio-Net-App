import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext(undefined);

const translations = {
  en: {
    appName: 'Bio-net India',
    home: 'Home',
    entries: 'Entries',
    add: 'Add',
    map: 'Map',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    welcome: 'Welcome',
    totalEntries: 'Total Entries',
    myEntries: 'My Entries',
    approved: 'Approved',
    pending: 'Pending',
    addEntry: 'Add Entry',
    viewMap: 'View Map',
    traditionalKnowledge: 'Traditional Knowledge',
    agroBiodiversity: 'Agro-Biodiversity',
    commonName: 'Common Name',
    scientificName: 'Scientific Name',
    localName: 'Local Name',
    habitat: 'Habitat',
    description: 'Description',
    takePhoto: 'Take Photo',
    gallery: 'Gallery',
    getLocation: 'Get GPS Location',
    recordAudio: 'Record Audio',
    submit: 'Submit Entry',
    cancel: 'Cancel',
    save: 'Save',
  },
  hi: {
    appName: 'बायो-नेट इंडिया',
    home: 'होम',
    entries: 'प्रविष्टियाँ',
    add: 'जोड़ें',
    map: 'मानचित्र',
    profile: 'प्रोफ़ाइल',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    welcome: 'स्वागत है',
    totalEntries: 'कुल प्रविष्टियाँ',
    myEntries: 'मेरी प्रविष्टियाँ',
    approved: 'स्वीकृत',
    pending: 'लंबित',
    addEntry: 'प्रविष्टि जोड़ें',
    viewMap: 'मानचित्र देखें',
    commonName: 'सामान्य नाम',
    scientificName: 'वैज्ञानिक नाम',
    submit: 'जमा करें',
  },
  kn: {
    appName: 'ಬಯೋ-ನೆಟ್ ಇಂಡಿಯಾ',
    home: 'ಮುಖಪುಟ',
    entries: 'ನಮೂದುಗಳು',
    add: 'ಸೇರಿಸು',
    map: 'ನಕ್ಷೆ',
    profile: 'ಪ್ರೊಫೈಲ್',
    commonName: 'ಸಾಮಾನ್ಯ ಹೆಸರು',
    submit: 'ಸಲ್ಲಿಸು',
  },
  te: {
    appName: 'బయో-నెట్ ఇండియా',
    home: 'హోమ్',
    entries: 'ఎంట్రీలు',
    add: 'జోడించు',
    submit: 'సమర్పించు',
  },
  ml: {
    appName: 'ബയോ-നെറ്റ് ഇന്ത്യ',
    home: 'ഹോം',
    entries: 'എൻട്രികൾ',
    add: 'ചേർക്കുക',
    submit: 'സമർപ്പിക്കുക',
  },
  ta: {
    appName: 'பயோ-நெட் இந்தியா',
    home: 'முகப்பு',
    entries: 'பதிவுகள்',
    add: 'சேர்',
    submit: 'சமர்ப்பிக்கவும்',
  },
  or: {
    appName: 'ବାୟୋ-ନେଟ ଇଣ୍ଡିଆ',
    home: 'ହୋମ୍',
    submit: 'ଦାଖଲ କରନ୍ତୁ',
  },
  bn: {
    appName: 'বায়ো-নেট ইন্ডিয়া',
    home: 'হোম',
    submit: 'জমা দিন',
  },
  mr: {
    appName: 'बायो-नेट इंडिया',
    home: 'मुख्यपृष्ठ',
    submit: 'सबमिट करा',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  const setLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
