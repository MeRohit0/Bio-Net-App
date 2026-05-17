import React, { createContext, useContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncOfflineEntries } from '../services/api';

const OfflineContext = createContext(undefined);

export function OfflineProvider({ children }) {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineEntries, setOfflineEntries] = useState([]);

  useEffect(() => {
    // Subscribe to network status
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });

    // Load offline entries from storage
    loadOfflineEntries();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Auto-sync when coming online
    if (isOnline && offlineEntries.length > 0) {
      syncEntries();
    }
  }, [isOnline]);

  const loadOfflineEntries = async () => {
    try {
      const stored = await AsyncStorage.getItem('offlineEntries');
      if (stored) {
        setOfflineEntries(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading offline entries:', error);
    }
  };

  const saveOfflineEntry = async (entry) => {
    try {
      const newEntries = [...offlineEntries, { ...entry, _offlineId: Date.now() }];
      await AsyncStorage.setItem('offlineEntries', JSON.stringify(newEntries));
      setOfflineEntries(newEntries);
    } catch (error) {
      console.error('Error saving offline entry:', error);
      throw error;
    }
  };

  const syncEntries = async () => {
    if (!isOnline || offlineEntries.length === 0) return;

    try {
      await syncOfflineEntries(offlineEntries);
      await clearOfflineEntries();
      console.log('Offline entries synced successfully');
    } catch (error) {
      console.error('Error syncing offline entries:', error);
    }
  };

  const clearOfflineEntries = async () => {
    try {
      await AsyncStorage.removeItem('offlineEntries');
      setOfflineEntries([]);
    } catch (error) {
      console.error('Error clearing offline entries:', error);
    }
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        offlineEntries,
        saveOfflineEntry,
        syncEntries,
        clearOfflineEntries,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within OfflineProvider');
  }
  return context;
}
