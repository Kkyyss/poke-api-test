import dayjs from 'dayjs';
import readlineSync from 'readline-sync';
import { fetchPokemonByIdOrName, fetchPokemonEncountersAndMethods } from '../apis/poke.api';
import Pokemon from '../models/pokemon/pokemon.model';
import cache from '../files';
import { NewData } from '../utils/response/response.types';

const search = async (isID = false) => {
  try {
    const mode = isID ? 'ID' : 'Name';
    const query: string = readlineSync.question(`Search pokemon (${mode}): `, {
        defaultInput: ''
    }).trim().toLowerCase();
    if (!query) {
      console.log('No result found.');
    } else {
      let pokeData = null;
      if (isID)
        pokeData = cache.getPokemonByID(query);
      else
        pokeData = cache.getPokemonByName(query);

      // update cache that over a week old...
      let update = false;
      if (pokeData) {
        const dayDiffs = dayjs().diff(pokeData.timestamps, 'day');
        if (dayDiffs > 7) {
          update = true;
        }
      }

      if (!pokeData || (pokeData && update)) {
        console.log(`searching pokemon ${mode} - ${query}`);
        // Poke API calls
        const data = await fetchPokemonByIdOrName(query);
        const encounterData = await fetchPokemonEncountersAndMethods(data.locationAreaEncounters);
        const newData: NewData = {
          ...data,
          locationAreaEncounters: encounterData,
        }
        const { id, name } = newData;
        delete newData.id;
        delete newData.name;
        console.log(`pokemon ${mode} - ${query} found...`);

        const timestamps = dayjs().toISOString();
        const newRawData = [
          id,
          name,
          JSON.stringify(newData),
          timestamps,
        ].join('|');
        pokeData = new Pokemon({ id: `${id}`, name, data: newData, timestamps });
        if (update) {
          // update existing data...
          await cache.updatePokemonCache(newRawData, pokeData);
        } else {
          // create new data...
          await cache.appendPokemonCache(newRawData, pokeData);
        }
      }

      pokeData.print();
    }
  } catch (err) {
    console.log(err);
  }
  readlineSync.question('Hit Enter key to continue.', {hideEchoBack: true, mask: ''});
}

export default search;
