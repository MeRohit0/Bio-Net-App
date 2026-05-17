import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useUser();
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'mr', name: 'मराठी' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: '#ef4444',
      ngo: '#3b82f6',
      volunteer: '#a855f7',
      community: '#10b981',
      community_user: '#10b981',
      verified_user: '#3b82f6',
      researcher: '#a855f7',
    };
    return colors[role] || colors.community;
  };

  const formatRole = (role) => {
    if (!role) {
      return 'GUEST';
    }

    return role.replace(/_/g, ' ').toUpperCase();
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Info Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={48} color="#ffffff" />
        </View>
        <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
        {user?.phoneNumber && (
          <Text style={styles.userPhone}>{user.phoneNumber}</Text>
        )}
        {user?.email && (
          <Text style={styles.userDetail}>{user.email}</Text>
        )}
        {user?.location && (
          <Text style={styles.userDetail}>{user.location}</Text>
        )}
        {user?.village && user?.district && (
          <Text style={styles.userDetail}>
            {user.village}, {user.district}
          </Text>
        )}
        {user?.gramPanchayat && (
          <Text style={styles.userDetail}>{user.gramPanchayat}</Text>
        )}
        <View
          style={[
            styles.roleBadge,
            { backgroundColor: getRoleBadgeColor(user?.role) },
          ]}
        >
          <Text style={styles.roleText}>
            {formatRole(user?.role)}
          </Text>
        </View>
      </View>

      {/* Language Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language / भाषा</Text>
        <View style={styles.languageGrid}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                language === lang.code && styles.languageButtonActive,
              ]}
              onPress={() => setLanguage(lang.code)}
            >
              <Text
                style={[
                  styles.languageText,
                  language === lang.code && styles.languageTextActive,
                ]}
              >
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Settings Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={24} color="#6b7280" />
          <Text style={styles.menuText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={24} color="#6b7280" />
          <Text style={styles.menuText}>Privacy</Text>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="#6b7280" />
          <Text style={styles.menuText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="information-circle-outline" size={24} color="#6b7280" />
          <Text style={styles.menuText}>About</Text>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* About App */}
      <View style={styles.section}>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>Bio-net India</Text>
          <Text style={styles.aboutText}>
            People's Biodiversity Register under Biological Diversity Act 2002
          </Text>
          <Text style={styles.aboutVersion}>Version 1.0.0</Text>
          <View style={styles.divider} />
          <Text style={styles.aboutFooter}>
            Powered by SARA Centre{'\n'}
            with TCS ProEngage Support
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#ef4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  userDetail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
  },
  roleText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  languageButtonActive: {
    borderColor: '#10b981',
    backgroundColor: '#d1fae5',
  },
  languageText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  languageTextActive: {
    color: '#065f46',
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  aboutCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  aboutVersion: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  aboutFooter: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef4444',
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
  bottomPadding: {
    height: 32,
  },
});
