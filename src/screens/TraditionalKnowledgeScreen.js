import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TraditionalKnowledgeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="book" size={64} color="#a855f7" />
        <Text style={styles.title}>Traditional Knowledge</Text>
        <Text style={styles.subtitle}>
          Document traditional knowledge associated with biodiversity
        </Text>
        <Text style={styles.description}>
          This module allows you to record traditional knowledge, folklore,
          medicinal uses, and cultural significance of biodiversity in your region.
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
