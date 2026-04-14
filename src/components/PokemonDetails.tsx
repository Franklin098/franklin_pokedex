import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {PokemonFull} from '../interfaces/PokemonInterfaces';
import {ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export default function PokemonDetails({pokemon}: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={StyleSheet.absoluteFill}>
      <View style={styles.typesContainer}>
        <Text style={styles.title}>Types</Text>
        <View style={styles.row}>
          {pokemon.types.map(({type}) => (
            <Text key={type.name} style={styles.tagText}>
              {type.name}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight}kg</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          style={styles.basicSprite}
          uri={pokemon.sprites.front_default}
        />
        <FadeInImage
          style={styles.basicSprite}
          uri={pokemon.sprites.back_default}
        />
        <FadeInImage
          style={styles.basicSprite}
          uri={pokemon.sprites.front_shiny}
        />
        <FadeInImage
          style={styles.basicSprite}
          uri={pokemon.sprites.back_shiny}
        />
      </ScrollView>

      <View style={styles.container}>
        <Text style={styles.title}>Abilities</Text>
        <View style={styles.row}>
          {pokemon.abilities.map(({ability}) => (
            <Text key={ability.name} style={styles.tagText}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Moves</Text>
        <View style={styles.rowWrap}>
          {pokemon.moves.map(({move}) => (
            <Text key={move.name} style={styles.tagText}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map(({stat, base_stat}, index) => (
            <View key={stat.name + index} style={styles.row}>
              <Text style={styles.statName}>{stat.name}</Text>
              <Text style={styles.statValue}>{base_stat}</Text>
            </View>
          ))}
        </View>
        <View style={styles.bottomSprite}>
          <FadeInImage
            style={styles.basicSprite}
            uri={pokemon.sprites.front_shiny}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  typesContainer: {
    marginHorizontal: 20,
    marginTop: 370,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  tagText: {
    fontSize: 19,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statName: {
    fontSize: 19,
    marginRight: 10,
    width: 150,
  },
  statValue: {
    fontSize: 19,
    marginRight: 10,
    fontWeight: 'bold',
  },
  bottomSprite: {
    marginBottom: 20,
    alignItems: 'center',
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
