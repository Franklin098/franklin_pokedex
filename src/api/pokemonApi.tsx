import axios from 'axios';
import Config from 'react-native-config';

export const BASE_IMAGE_URL = Config.BASE_IMAGE_URL!;

export const pokemonApi = axios.create({
  baseURL: Config.API_BASE_URL,
});
