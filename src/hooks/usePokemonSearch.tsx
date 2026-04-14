import {useEffect, useState} from 'react';
import {pokemonApi, BASE_IMAGE_URL} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
  Result,
} from '../interfaces/PokemonInterfaces';

export const usePokemonSearch = () => {
  // PokeAPI doesn't provide search queries,
  // so we fetch all names and filter client-side

  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const [isFetching, setIsFetching] = useState(true);

  const loadPokemons = async () => {
    setIsFetching(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      '/pokemon?limit=1200',
    );
    mapPokemonList(resp.data.results);
    setIsFetching(false);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `${BASE_IMAGE_URL}/${id}.png`;
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
