// app/(tabs)/_layout.tsx
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#A44200', // Rouge cuivré
        tabBarInactiveTintColor: '#767676',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingBottom: 4,
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#F5F5F5', // Fond clair
          borderTopColor: '#D58936', // Orange doré
          borderTopWidth: 1,
          position: 'absolute',
          height: 60,
          paddingHorizontal: 20,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 5,
          ...Platform.select({
            ios: { 
              shadowColor: '#3C1518', 
              shadowOpacity: 0.1, 
              shadowRadius: 10,
              shadowOffset: { width: 0, height: -3 }
            },
            android: { elevation: 5 },
          }),
        },
        tabBarItemStyle: {
          height: 70,
          padding: 5,
        },
      }}
    >
      {/* Accueil */}
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Historique */}
      <Tabs.Screen
        name="historique"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Discussion */}
      <Tabs.Screen
        name="discussion"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Favoris */}
      <Tabs.Screen
        name="favoris"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Profil */}
      <Tabs.Screen
        name="profil"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}