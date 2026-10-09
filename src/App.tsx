import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProfileProvider } from './context/ProfileContext';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}
