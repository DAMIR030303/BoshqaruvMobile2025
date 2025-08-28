// Project Manager and Videographer Navigator
// "Navoiyda Bugun" loyihasi Proyekt menejeri va mobilograf uchun navigator

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ProjectManagerDashboard from '../screens/projectmanager/ProjectManagerDashboard';
import ProjectManagerProfile from '../screens/projectmanager/ProjectManagerProfile';

const Stack = createStackNavigator();

const ProjectManagerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProjectManagerDashboard" component={ProjectManagerDashboard} />
      <Stack.Screen name="ProjectManagerProfile" component={ProjectManagerProfile} />
    </Stack.Navigator>
  );
};

export default ProjectManagerNavigator;
