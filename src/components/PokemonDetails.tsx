import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {PokemonFull, Type} from '../interfaces/PokemonInterfaces';
import {ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export default function PokemonDetails({pokemon}: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      <View style={{...styles.container, marginTop: 370}}>
        <Text style={styles.title}>Types</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map(({type}) => (
            <Text
              key={type.name}
              style={{...styles.regularText, marginRight: 10}}>
              {type.name}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight}kg</Text>
      </View>
      {/* Types */}
      <View style={{...styles.container}}>
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

      <View style={{...styles.container}}>
        <Text style={styles.title}>Abilities</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              key={ability.name}
              style={{...styles.regularText, marginRight: 10}}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={{...styles.container}}>
        <Text style={styles.title}>Moves</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map(({move}) => (
            <Text
              key={move.name}
              style={{...styles.regularText, marginRight: 10}}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={{...styles.container}}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map(({stat, base_stat}, index) => (
            <View key={stat.name + index} style={{flexDirection: 'row'}}>
              <Text
                style={{...styles.regularText, marginRight: 10, width: 150}}>
                {stat.name}
              </Text>
              <Text
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                  fontWeight: 'bold',
                }}>
                {base_stat}
              </Text>
            </View>
          ))}
        </View>
        <View style={{marginBottom: 20, alignItems: 'center'}}>
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
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
