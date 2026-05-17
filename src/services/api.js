import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_BASE_URL = 'https://bionetindia.org/api'; // Replace with your actual API URL

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - logout user
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const login = async (phoneNumber, password) => {
  const response = await api.post('/auth/login', { phoneNumber, password });
  const { token, user } = response.data;
  await AsyncStorage.setItem('authToken', token);
  await AsyncStorage.setItem('user', JSON.stringify(user));
  return { token, user };
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  const { token, user } = response.data;
  if (token) {
    await AsyncStorage.setItem('authToken', token);
  }
  if (user) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  }
  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('user');
};

// Biodiversity APIs
export const createBiodiversityEntry = async (entryData) => {
  const formData = new FormData();
  
  // Append text fields
  Object.keys(entryData).forEach(key => {
    if (key !== 'photos' && key !== 'audioUri') {
      formData.append(key, entryData[key]);
    }
  });

  // Append photos
  if (entryData.photos) {
    entryData.photos.forEach((uri, index) => {
      const photo = {
        uri,
        type: 'image/jpeg',
        name: `photo_${index}.jpg`,
      };
      formData.append('photos', photo);
    });
  }

  // Append audio
  if (entryData.audioUri) {
    const audio = {
      uri: entryData.audioUri,
      type: 'audio/m4a',
      name: 'audio_note.m4a',
    };
    formData.append('audio', audio);
  }

  const response = await api.post('/biodiversity', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getBiodiversityEntries = async (filters) => {
  try {
    const response = await api.get('/biodiversity', { params: filters });
    return response.data;
  } catch (error) {
    // Return mock data if API fails
    return [];
  }
};

export const getBiodiversityEntry = async (id) => {
  const response = await api.get(`/biodiversity/${id}`);
  return response.data;
};

export const updateBiodiversityEntry = async (id, data) => {
  const response = await api.put(`/biodiversity/${id}`, data);
  return response.data;
};

export const deleteBiodiversityEntry = async (id) => {
  const response = await api.delete(`/biodiversity/${id}`);
  return response.data;
};

// Stats API
export const getStats = async (userId) => {
  try {
    const response = await api.get('/stats', { params: { userId } });
    return response.data;
  } catch (error) {
    // Return mock data if API fails
    return {
      totalEntries: 0,
      myEntries: 0,
      approved: 0,
      pending: 0,
    };
  }
};

// Traditional Knowledge APIs
export const createTraditionalKnowledge = async (data) => {
  const response = await api.post('/traditional-knowledge', data);
  return response.data;
};

export const getTraditionalKnowledge = async (filters) => {
  const response = await api.get('/traditional-knowledge', { params: filters });
  return response.data;
};

// Agro-Biodiversity APIs
export const createAgroBiodiversity = async (data) => {
  const response = await api.post('/agro-biodiversity', data);
  return response.data;
};

export const getAgroBiodiversity = async (filters) => {
  const response = await api.get('/agro-biodiversity', { params: filters });
  return response.data;
};

// Validation APIs
export const getPendingValidations = async () => {
  const response = await api.get('/validation/pending');
  return response.data;
};

export const validateEntry = async (entryId, status, comments) => {
  const response = await api.post(`/validation/${entryId}`, { status, comments });
  return response.data;
};

// Sync API for offline entries
export const syncOfflineEntries = async (entries) => {
  const response = await api.post('/sync/entries', { entries });
  return response.data;
};

// Export default instance
export default api;
