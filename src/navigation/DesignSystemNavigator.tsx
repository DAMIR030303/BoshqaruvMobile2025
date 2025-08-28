// Boshqaruv - Design System Navigator
// Figma integratsiya tizimi uchun navigatsiya

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ComponentGenerator from '../screens/design-system/ComponentGenerator';
import DesignSystemDashboard from '../screens/design-system/DesignSystemDashboard';
import ResponsiveDesignSettings from '../screens/design-system/ResponsiveDesignSettings';
import SyncCenter from '../screens/design-system/SyncCenter';
import TokenManager from '../screens/design-system/TokenManager';
import { theme } from '../theme';

import { DesignSystemStackParamList, DesignSystemTabParamList } from './types';

// Import screens

const Tab = createBottomTabNavigator<DesignSystemTabParamList>();
const Stack = createStackNavigator<DesignSystemStackParamList>();

// Tab Navigator for main design system screens
function DesignSystemTabs() {
  const { colors } = theme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Tokens':
              iconName = focused ? 'color-palette' : 'color-palette-outline';
              break;
            case 'Components':
              iconName = focused ? 'cube' : 'cube-outline';
              break;
            case 'Sync':
              iconName = focused ? 'sync' : 'sync-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.foreground,
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DesignSystemDashboard}
        options={{ title: 'Design System' }}
      />
      <Tab.Screen 
        name="Tokens" 
        component={TokenManager}
        options={{ title: 'Design Tokens' }}
      />
      <Tab.Screen 
        name="Components" 
        component={ComponentGenerator}
        options={{ title: 'Components' }}
      />
      <Tab.Screen 
        name="Sync" 
        component={SyncCenter}
        options={{ title: 'Sync Center' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={ResponsiveDesignSettings}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator for design system with detail screens
export default function DesignSystemNavigator() {
  const { colors } = theme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.foreground,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="DesignSystemDashboard" 
        component={DesignSystemTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ComponentGenerator" 
        component={ComponentGenerator}
        options={{ title: 'Component Generator' }}
      />
      <Stack.Screen 
        name="TokenManager" 
        component={TokenManager}
        options={{ title: 'Token Manager' }}
      />
      <Stack.Screen 
        name="SyncCenter" 
        component={SyncCenter}
        options={{ title: 'Sync Center' }}
      />
      <Stack.Screen 
        name="ResponsiveDesignSettings" 
        component={ResponsiveDesignSettings}
        options={{ title: 'Responsive Settings' }}
      />
    </Stack.Navigator>
  );
}