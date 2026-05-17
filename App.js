import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { UserProvider } from './src/contexts/UserContext';
import { OfflineProvider } from './src/contexts/OfflineContext';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import BiodiversityListScreen from './src/screens/BiodiversityListScreen';
import BiodiversityFormScreen from './src/screens/BiodiversityFormScreen';
import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import TraditionalKnowledgeScreen from './src/screens/TraditionalKnowledgeScreen';
import AgroBiodiversityScreen from './src/screens/AgroBiodiversityScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Entries') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#6b7280',
        headerStyle: {
          backgroundColor: Platform.OS === 'ios' ? '#ffffff' : '#10b981',
        },
        headerTintColor: Platform.OS === 'ios' ? '#10b981' : '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Bio-net India' }}
      />
      <Tab.Screen 
        name="Entries" 
        component={BiodiversityListScreen}
        options={{ title: 'Biodiversity Entries' }}
      />
      <Tab.Screen 
        name="Add" 
        component={BiodiversityFormScreen}
        options={{ 
          title: 'Add Entry',
          tabBarButton: Platform.OS === 'android' ? () => null : undefined,
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{ title: 'Map View' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
export default function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <OfflineProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={RegistrationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="MainApp" 
                component={MainTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="AddEntry" 
                component={BiodiversityFormScreen}
                options={{ 
                  title: 'Add Biodiversity Entry',
                  headerStyle: {
                    backgroundColor: '#10b981',
                  },
                  headerTintColor: '#fff',
                }}
              />
              <Stack.Screen 
                name="TraditionalKnowledge" 
                component={TraditionalKnowledgeScreen}
                options={{ title: 'Traditional Knowledge' }}
              />
              <Stack.Screen 
                name="AgroBiodiversity" 
                component={AgroBiodiversityScreen}
                options={{ title: 'Agro-Biodiversity' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OfflineProvider>
      </UserProvider>
    </LanguageProvider>
  );
}
