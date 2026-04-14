import {StyleSheet, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import PokemonCard from '../components/PokemonCard';
import {styles as globalStyles} from '../theme/appTheme';
import Loading from '../components/Loading';
import {SimplePokemon} from '../interfaces/PokemonInterfaces';

export default function SearchScreen() {
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setFilteredPokemons([]);
      return;
    }

    if (isNaN(Number(searchTerm))) {
      setFilteredPokemons(
        simplePokemonList.filter(pokemon =>
          pokemon.name
            .toLocaleLowerCase()
            .includes(searchTerm.toLocaleLowerCase()),
        ),
      );
    } else {
      const itemFound = simplePokemonList.find(
        pokemon => pokemon.id === searchTerm,
      );
      if (itemFound) {
        setFilteredPokemons([itemFound]);
      }
    }
  }, [searchTerm, simplePokemonList]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput
        onDebounce={value => setSearchTerm(value)}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredPokemons}
        keyExtractor={poke => poke.id}
        numColumns={2}
        directionalLockEnabled={true}
        ListHeaderComponent={
          <Text
            style={[
              globalStyles.title,
              globalStyles.globalMargin,
              styles.listHeader,
            ]}>
            {searchTerm}
          </Text>
        }
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  searchInput: {
    marginBottom: 10,
  },
  listHeader: {
    marginBottom: 20,
    paddingBottom: 10,
  },
});
