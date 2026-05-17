import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AgroBiodiversityScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="leaf" size={64} color="#f97316" />
        <Text style={styles.title}>Agro-Biodiversity</Text>
        <Text style={styles.subtitle}>
          Document agricultural biodiversity and crop varieties
        </Text>
        <Text style={styles.description}>
          Record information about traditional crop varieties, agricultural
          practices, and agro-biodiversity conservation efforts in your area.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 24,
    alignItems: 'center',
    marginTop: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
});
