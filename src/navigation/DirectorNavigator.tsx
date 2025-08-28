// Direktor Navigator
// "Navoiyda Bugun" loyihasi Direktori uchun navigator

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import DirectorDashboard from '../screens/director/DirectorDashboard';
import DirectorProfile from '../screens/director/DirectorProfile';

const Stack = createStackNavigator();

const DirectorNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DirectorDashboard" component={DirectorDashboard} />
      <Stack.Screen name="DirectorProfile" component={DirectorProfile} />
    </Stack.Navigator>
  );
};

export default DirectorNavigator;
