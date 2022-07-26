import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
  Result,
} from '../interfaces/PokemonInterfaces';

export const usePokemonSearch = () => {
  // Poke API doesn't provide search queries,
  // so non optimal solution is implemented here fetching 1200 names
  const pokeAPIUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1200';
  const basePictureUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const [isFetching, setIsFetching] = useState(true);

  const loadPokemons = async () => {
    setIsFetching(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(pokeAPIUrl);
    mapPokemonList(resp.data.results);
    setIsFetching(false);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `${basePictureUrl}/${id}.png`;
      return {
        id,
        picture,
        name,
      };
    });

    setSimplePokemonList(newPokemonList);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    simplePokemonList,
    isFetching,
  };
};
