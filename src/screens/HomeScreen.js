import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { getStats } from '../services/api';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const { user } = useUser();
  const [stats, setStats] = useState({
    totalEntries: 0,
    myEntries: 0,
    approved: 0,
    pending: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStats(user?.id);
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Bio-net India</Text>
        <Text style={styles.subtitle}>People's Biodiversity Register</Text>
        <Text style={styles.welcomeText}>
          Welcome, {user?.name || 'User'}!
        </Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.statCardBlue]}>
          <Text style={styles.statNumber}>{stats.totalEntries}</Text>
          <Text style={styles.statLabel}>Total Entries</Text>
        </View>
        <View style={[styles.statCard, styles.statCardGreen]}>
          <Text style={styles.statNumber}>{stats.myEntries}</Text>
          <Text style={styles.statLabel}>My Entries</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.statCardEmerald]}>
          <Text style={styles.statNumber}>{stats.approved}</Text>
          <Text style={styles.statLabel}>Approved</Text>
        </View>
        <View style={[styles.statCard, styles.statCardAmber]}>
          <Text style={styles.statNumber}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionCard, styles.actionCardGreen]}
            onPress={() => navigation.navigate('AddEntry')}
          >
            <Ionicons name="camera" size={32} color="#10b981" />
            <Text style={styles.actionText}>Add Entry</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, styles.actionCardBlue]}
            onPress={() => navigation.navigate('Map')}
          >
            <Ionicons name="map" size={32} color="#3b82f6" />
            <Text style={styles.actionText}>View Map</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, styles.actionCardPurple]}
            onPress={() => navigation.navigate('TraditionalKnowledge')}
          >
            <Ionicons name="book" size={32} color="#a855f7" />
            <Text style={styles.actionText}>Traditional Knowledge</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, styles.actionCardOrange]}
            onPress={() => navigation.navigate('AgroBiodiversity')}
          >
            <Ionicons name="leaf" size={32} color="#f97316" />
            <Text style={styles.actionText}>Agro-Biodiversity</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Bio-net India is a comprehensive People's Biodiversity Register (PBR) app
            developed under India's Biological Diversity Act 2002.
          </Text>
          <Text style={styles.infoText}>
            Powered by SARA Centre with TCS ProEngage volunteer support.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#10b981',
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#d1fae5',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardBlue: {
    backgroundColor: '#3b82f6',
  },
  statCardGreen: {
    backgroundColor: '#10b981',
  },
  statCardEmerald: {
    backgroundColor: '#059669',
  },
  statCardAmber: {
    backgroundColor: '#f59e0b',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  actionCardGreen: {
    backgroundColor: '#d1fae5',
    borderColor: '#10b981',
  },
  actionCardBlue: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  actionCardPurple: {
    backgroundColor: '#f3e8ff',
    borderColor: '#a855f7',
  },
  actionCardOrange: {
    backgroundColor: '#ffedd5',
    borderColor: '#f97316',
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 8,
  },
});
