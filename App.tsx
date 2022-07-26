import {View, Text} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {HomeStackNavigator} from './src/navigator/HomeStackNavigator';
import TabsNavigator from './src/navigator/TabsNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <TabsNavigator />
    </NavigationContainer>
  );
}
