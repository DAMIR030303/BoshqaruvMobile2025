// Call-center Operator Navigator
// "Navoiyda Bugun" loyihasi Call-center operatori uchun navigator

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import CallCenterDashboard from '../screens/callcenter/CallCenterDashboard';
import CallCenterProfile from '../screens/callcenter/CallCenterProfile';

const Stack = createStackNavigator();

const CallCenterNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CallCenterDashboard" component={CallCenterDashboard} />
      <Stack.Screen name="CallCenterProfile" component={CallCenterProfile} />
    </Stack.Navigator>
  );
};

export default CallCenterNavigator;
