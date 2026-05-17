import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { useOffline } from '../contexts/OfflineContext';
import { createBiodiversityEntry } from '../services/api';

export default function BiodiversityFormScreen() {
  const navigation = useNavigation();
  const { isOnline, saveOfflineEntry } = useOffline();

  const [formData, setFormData] = useState({
    commonName: '',
    scientificName: '',
    localName: '',
    category: 'flora',
    habitat: '',
    description: '',
    uses: '',
  });

  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [recording, setRecording] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    await Location.requestForegroundPermissionsAsync();
    await Audio.requestPermissionsAsync();
  };

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPhotos([...photos, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        const uris = result.assets.map(asset => asset.uri);
        setPhotos([...photos, ...uris]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is required');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        accuracy: currentLocation.coords.accuracy,
      });

      Alert.alert('Success', 'Location captured successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    }
  };

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const handleSubmit = async () => {
    if (!formData.commonName) {
      Alert.alert('Error', 'Common name is required');
      return;
    }

    if (!location) {
      Alert.alert('Error', 'Please capture GPS location');
      return;
    }

    setLoading(true);

    const entry = {
      ...formData,
      photos,
      location,
      audioUri,
      timestamp: new Date().toISOString(),
    };

    try {
      if (isOnline) {
        await createBiodiversityEntry(entry);
        Alert.alert('Success', 'Entry submitted successfully');
      } else {
        await saveOfflineEntry(entry);
        Alert.alert('Saved Offline', 'Entry will be synced when online');
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <TextInput
          style={styles.input}
          placeholder="Common Name *"
          value={formData.commonName}
          onChangeText={(text) => updateFormData('commonName', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Scientific Name"
          value={formData.scientificName}
          onChangeText={(text) => updateFormData('scientificName', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Local Name"
          value={formData.localName}
          onChangeText={(text) => updateFormData('localName', text)}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Habitat"
          value={formData.habitat}
          onChangeText={(text) => updateFormData('habitat', text)}
          multiline
          numberOfLines={3}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => updateFormData('description', text)}
          multiline
          numberOfLines={4}
        />

        {/* Photos */}
        <Text style={styles.sectionTitle}>Photos</Text>
        <View style={styles.photosContainer}>
          {photos.map((uri, index) => (
            <View key={index} style={styles.photoWrapper}>
              <Image source={{ uri }} style={styles.photo} />
              <TouchableOpacity
                style={styles.removePhotoBtn}
                onPress={() => removePhoto(index)}
              >
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto}>
            <Ionicons name="camera" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
            <Ionicons name="images" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
        </View>

        {/* Location */}
        <Text style={styles.sectionTitle}>Location</Text>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={getCurrentLocation}
        >
          <Ionicons name="location" size={24} color="#ffffff" />
          <Text style={styles.buttonText}>
            {location ? 'Update Location' : 'Get GPS Location'}
          </Text>
        </TouchableOpacity>

        {location && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              📍 {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </Text>
            <Text style={styles.accuracyText}>
              Accuracy: {location.accuracy?.toFixed(1)}m
            </Text>
          </View>
        )}

        {/* Audio */}
        <Text style={styles.sectionTitle}>Audio Note (Optional)</Text>
        <TouchableOpacity
          style={[styles.audioButton, recording && styles.recordingButton]}
          onPress={recording ? stopRecording : startRecording}
        >
          <Ionicons
            name={recording ? 'stop-circle' : 'mic'}
            size={24}
            color="#ffffff"
          />
          <Text style={styles.buttonText}>
            {recording ? 'Stop Recording' : audioUri ? 'Re-record' : 'Record Audio'}
          </Text>
        </TouchableOpacity>

        {audioUri && (
          <View style={styles.audioInfo}>
            <Ionicons name="musical-note" size={20} color="#10b981" />
            <Text style={styles.audioText}>Audio note recorded</Text>
          </View>
        )}

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Submitting...' : 'Submit Entry'}
          </Text>
        </TouchableOpacity>

        {!isOnline && (
          <View style={styles.offlineNotice}>
            <Ionicons name="cloud-offline" size={20} color="#f59e0b" />
            <Text style={styles.offlineText}>
              Offline - Entry will be synced later
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  form: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  photoWrapper: {
    position: 'relative',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removePhotoBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  locationButton: {
    flexDirection: 'row',
    backgroundColor: '#10b981',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  audioButton: {
    flexDirection: 'row',
    backgroundColor: '#a855f7',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  recordingButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  locationInfo: {
    backgroundColor: '#d1fae5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065f46',
  },
  accuracyText: {
    fontSize: 12,
    color: '#059669',
    marginTop: 4,
  },
  audioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#d1fae5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  audioText: {
    fontSize: 14,
    color: '#065f46',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  offlineNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
  },
  offlineText: {
    fontSize: 14,
    color: '#92400e',
    fontWeight: '600',
  },
});
