// Boshqaruv - Super Admin Navigator
// Super Admin uchun asosiy navigator

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AddEmployee from '../screens/admin/AddEmployee';
import ProfileScreen from '../screens/admin/ProfileScreen';
import SuperAdminDashboard from '../screens/admin/SuperAdminDashboard';

const Stack = createStackNavigator();

const SuperAdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboard} />
      <Stack.Screen name="AddEmployee" component={AddEmployee} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default SuperAdminNavigator;
