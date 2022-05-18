import { POKE_API_URL } from '../config';
import { fetchHelper } from './helper.api';
import { infoResponseHelper, enconutersAndMethodsResponseHelper } from '../utils/response/response.util';

// query data by pokemon name or id
export const fetchPokemonByIdOrName = async (query: string) => {
  const { data } = await fetchHelper(`${POKE_API_URL}/pokemon/${query}`);

  return infoResponseHelper(data);
}
// query data by pokemon encounter url
export const fetchPokemonEncountersAndMethods = async (url: string) => {
  const { data } = await fetchHelper(url);

  return enconutersAndMethodsResponseHelper(data);
}
