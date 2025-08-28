// Marketing Manager Navigator
// "Navoiyda Bugun" loyihasi Marketing boshqaruvchisi uchun navigator

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import MarketingDashboard from '../screens/marketing/MarketingDashboard';
import MarketingProfile from '../screens/marketing/MarketingProfile';

const Stack = createStackNavigator();

const MarketingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MarketingDashboard" component={MarketingDashboard} />
      <Stack.Screen name="MarketingProfile" component={MarketingProfile} />
    </Stack.Navigator>
  );
};

export default MarketingNavigator;
