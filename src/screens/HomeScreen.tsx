import {
  Image,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {styles} from '../theme/appTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import PokemonCard from '../components/PokemonCard';

export default function HomeScreen() {
  const {top} = useSafeAreaInsets();
  // always write all the business logic in a custom hook, here just use the render values
  const {simplePokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      <View style={[styles.globalMargin, homeStyles.centered]}>
        {/* flatlist automaticall does a lazy loading of its items */}
        <FlatList
          data={simplePokemonList}
          keyExtractor={poke => poke.id}
          numColumns={2}
          directionalLockEnabled={true}
          // Header
          ListHeaderComponent={
            <Text
              style={[
                styles.title,
                styles.globalMargin,
                {top: top + 20, marginBottom: top + 20},
                homeStyles.headerPadding,
              ]}>
              Pokedex
            </Text>
          }
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          //  Infinite Scroll
          onEndReached={loadPokemons}
          // 40% above the scroll is our threshold
          onEndReachedThreshold={0.4}
          // loading activity indicator
          ListFooterComponent={
            <ActivityIndicator style={homeStyles.footer} size={20} color="grey" />
          }
        />
      </View>
    </>
  );
}

const homeStyles = StyleSheet.create({
  centered: {
    alignItems: 'center',
  },
  headerPadding: {
    paddingBottom: 10,
  },
  footer: {
    height: 100,
  },
});
