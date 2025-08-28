// HR Manager Navigator
// "Navoiyda Bugun" loyihasi HR menejeri uchun navigator

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HRDashboard from '../screens/hr/HRDashboard';
import HRProfile from '../screens/hr/HRProfile';

const Stack = createStackNavigator();

const HRNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HRDashboard" component={HRDashboard} />
      <Stack.Screen name="HRProfile" component={HRProfile} />
    </Stack.Navigator>
  );
};

export default HRNavigator;
