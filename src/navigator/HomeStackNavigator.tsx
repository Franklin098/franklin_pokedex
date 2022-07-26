import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PockemonScreen from '../screens/PockemonScreen';
import {SimplePokemon} from '../interfaces/PokemonInterfaces';

// Types of differnt props to share in the navigator children

export type RootStackParams = {
  HomeScreen: undefined; // no props for HomeScreen
  PokemonScreen: {simplePokemon: SimplePokemon; color: string}; // props for PokemonScreen
};

const Stack = createStackNavigator<RootStackParams>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PockemonScreen} />
    </Stack.Navigator>
  );
}
