import {useEffect, useRef, useState} from 'react';
import {pokemonApi, BASE_IMAGE_URL} from '../api/pokemonApi';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
  Result,
} from '../interfaces/PokemonInterfaces';

export const usePokemonPaginated = () => {
  // always the -next- page, useRef to avoid re-renders with useState
  const nextPageUrl = useRef('/pokemon?limit=40');

  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );
    nextPageUrl.current = resp.data.next; // the next page link is in the 'next' attr
    mapPokemonList(resp.data.results);
    setIsLoading(false);
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
    // Use spread operatoar 2 times to save the Previous and New pokemonList:
    // it basically concatenates 2 arrays, in order to have a infinite scroll up and down !
    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    simplePokemonList,
    isLoading,
    loadPokemons,
  };
};
