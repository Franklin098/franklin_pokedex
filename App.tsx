import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabsNavigator from './src/navigator/TabsNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabsNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
