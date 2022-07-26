import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SimplePokemon} from '../interfaces/PokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/HomeStackNavigator';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export default function PokemonCard({pokemon}: Props) {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  //Because FlatList distroies this PokemonCard component while  using lazy loading
  // it is not a good practice to have a promise when the component is already destroyed
  // Error Warning: 'Excessive number of pending callbacks'

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
      cache: true,
    })
      .then(result => {
        if (!isMounted.current) {
          return; // do not update state with setBgColor() if already unmounted
        }
        switch (result.platform) {
          case 'android':
            setBgColor(result.dominant || 'grey');
            break;
          case 'ios':
            setBgColor(result.background || 'gret');
          default:
            break;
        }
      })
      .catch(error => console.log('Error while getting color', error));
    return () => {
      isMounted.current = false;
    };
  }, []);

  const goToPokemonCard = () => {
    navigation.navigate('PokemonScreen', {
      simplePokemon: pokemon,
      color: bgColor,
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={goToPokemonCard}>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    right: -20,
    bottom: -10,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.5,
    overflow: 'hidden',
  },
});
