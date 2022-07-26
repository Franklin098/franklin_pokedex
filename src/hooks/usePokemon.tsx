import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {PokemonFull} from '../interfaces/PokemonInterfaces';
import {pokemonApi} from '../api/pokemonApi';

export default function usePokemon(id: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  const loadPokemon = async () => {
    const resp = await pokemonApi.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemon(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {isLoading, pokemon};
}
