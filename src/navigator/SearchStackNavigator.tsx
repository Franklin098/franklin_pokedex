import React from 'react';
import SearchScreen from '../screens/SearchScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {SimplePokemon} from '../interfaces/PokemonInterfaces';
import PockemonScreen from '../screens/PockemonScreen';

export type RootStackParams = {
  SearchScreen: undefined; // no props for SeachScreen
  PokemonScreen: {simplePokemon: SimplePokemon; color: string}; // props for PokemonScreen
};

const SearchStack = createStackNavigator<RootStackParams>();

export function SearchStackNavigator() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
      <SearchStack.Screen name="PokemonScreen" component={PockemonScreen} />
    </SearchStack.Navigator>
  );
}
