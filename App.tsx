/**
 * BoshqaruvMobile - Asosiy ilova fayli
 * 
 * @author Damir Nurmurodov
 * @version 1.0.0
 * @created 2025
 */

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'

import { store } from './src/app/store'
import CallCenterNavigator from './src/navigation/CallCenterNavigator'
import DesignSystemNavigator from './src/navigation/DesignSystemNavigator'
import DirectorNavigator from './src/navigation/DirectorNavigator'
import HRNavigator from './src/navigation/HRNavigator'
import MainTabNavigator from './src/navigation/MainTabNavigator'
import MarketingNavigator from './src/navigation/MarketingNavigator'
import ProjectManagerNavigator from './src/navigation/ProjectManagerNavigator'
import SuperAdminNavigator from './src/navigation/SuperAdminNavigator'
import LoginScreen from './src/screens/auth/LoginScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator 
            initialRouteName="Auth"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Auth" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="SuperAdmin" component={SuperAdminNavigator} />
            <Stack.Screen name="Director" component={DirectorNavigator} />
            <Stack.Screen name="CallCenter" component={CallCenterNavigator} />
            <Stack.Screen name="HR" component={HRNavigator} />
            <Stack.Screen name="Marketing" component={MarketingNavigator} />
            <Stack.Screen name="ProjectManager" component={ProjectManagerNavigator} />
            <Stack.Screen name="DesignSystem" component={DesignSystemNavigator} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  )
}

const styles = {
  container: { 
    flex: 1
  },
}
