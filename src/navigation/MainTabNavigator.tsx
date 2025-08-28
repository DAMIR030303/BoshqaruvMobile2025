// Boshqaruv - Main Tab Navigator
// Asosiy ekranlar uchun bottom tab navigator

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Platform } from 'react-native';


import { ResponsiveNavigation } from '../components';
import useResponsive from '../hooks/useResponsive';
import AttendanceScreen from '../screens/main/AttendanceScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import EmployeesScreen from '../screens/main/EmployeesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import TasksScreen from '../screens/main/TasksScreen';
import { colors, spacing, borderRadius, shadows } from '../theme';

import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const { isWeb } = useResponsive();
  
  // Web versiyasida ResponsiveNavigation ishlatamiz
  if (isWeb) {
    const navigationItems = [
      { key: 'Dashboard', label: 'Bosh', icon: 'home', component: DashboardScreen, onPress: () => {} },
      { key: 'Employees', label: 'Xodimlar', icon: 'people', component: EmployeesScreen, onPress: () => {} },
      { key: 'Attendance', label: 'Davomat', icon: 'time', component: AttendanceScreen, onPress: () => {} },
      { key: 'Tasks', label: 'Vazifalar', icon: 'checklist', component: TasksScreen, onPress: () => {} },
      { key: 'Profile', label: 'Profil', icon: 'person', component: ProfileScreen, onPress: () => {} },
    ];
    
    return (
      <ResponsiveNavigation 
        items={navigationItems}
        activeKey="Dashboard"
      />
    );
  }
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.divider,
          borderTopWidth: 1,
          height: 90,
          paddingBottom: 30,
          paddingTop: spacing.md,
          paddingHorizontal: spacing.lg,
          marginBottom: 10,
          ...shadows.lg,
          borderTopLeftRadius: borderRadius.xl,
          borderTopRightRadius: borderRadius.xl,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Bosh',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Employees" 
        component={EmployeesScreen}
        options={{
          tabBarLabel: 'Xodimlar',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="people" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Attendance" 
        component={AttendanceScreen}
        options={{
          tabBarLabel: 'Davomat',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="time" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen}
        options={{
          tabBarLabel: 'Vazifalar',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="checklist" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Tab icon komponenti
const TabIcon = ({ name, color, size }: { name: string; color: string; size: number }) => {
  // Bu yerda React Native Vector Icons ishlatiladi
  // Hozircha chiroyli View qaytaramiz
  return (
    <View 
      style={{ 
        width: size + 4, 
        height: size + 4, 
        backgroundColor: color, 
        borderRadius: (size + 4) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        // Chiroyli shadow
        ...(Platform.OS === 'web' ? {
          boxShadow: `0px 2px 3px ${color}4D`,
        } : {
          shadowColor: color,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 3,
        }),
      }} 
    >
      <View 
        style={{
          width: size - 8,
          height: size - 8,
          backgroundColor: 'white',
          borderRadius: (size - 8) / 2,
          opacity: 0.3,
        }}
      />
    </View>
  );
};

export default MainTabNavigator;
