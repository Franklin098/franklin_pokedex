import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import PokemonCard from '../components/PokemonCard';
import {styles as globalStyles} from '../theme/appTheme';
import Loading from '../components/Loading';
import {SimplePokemon} from '../interfaces/PokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

export default function SearchScreen() {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setFilteredPokemons([]);
      return;
    }

    if (isNaN(Number(searchTerm))) {
      // is Not a Number
      setFilteredPokemons(
        simplePokemonList.filter(pokemon =>
          pokemon.name
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
        ),
      );
    } else {
      // is a Number
      let itemFound = simplePokemonList.find(
        pokemon => pokemon.id === searchTerm,
      );
      if (itemFound) {
        let filtered = [];
        filtered.push(itemFound!);
        setFilteredPokemons(filtered);
      }
    }
  }, [searchTerm]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,

        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={value => setSearchTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 30,
        }}
      />

      {/* flatlist automaticall does a lazy loading of its items */}
      <FlatList
        data={filteredPokemons}
        keyExtractor={poke => poke.id}
        numColumns={2}
        directionalLockEnabled={true}
        // Header
        ListHeaderComponent={
          <Text
            style={{
              ...globalStyles.title,
              ...globalStyles.globalMargin,
              top: 30,
              marginTop: top + 30,
              marginBottom: 30,
              paddingBottom: 10,
            }}>
            {searchTerm}
          </Text>
        }
        renderItem={({item, index}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activityContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
