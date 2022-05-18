import * as fsPromises from 'fs/promises';
import path from 'path';
import Pokemon from '../models/pokemon/pokemon.model';
import { PokemonType } from '../models/pokemon/pokemon.types';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * es6 singleton
 * for cache purpose
*/
let fileHandle = null;
let fileData: Array<string> = []; // raw data, for file writting purpose
const pokeDex: Array<PokemonType> = []; // formatted data
const pokeIdIndexCache: Map<string, number> = new Map(); // cached by id
const pokeNameIndexCache: Map<string, number> = new Map(); // cahced by name

const cacheFilePath = path.join(__dirname, `/caches.txt`);
// pre-cache when program started...
const cacheFile = async () => {
  try {
    console.log('read cache...');
    fileHandle = await fsPromises.open(cacheFilePath, 'r');
    console.log('cache found...');
    fileData = (await fileHandle.readFile({ encoding: 'utf-8' })).split(/\r?\n/);
    // check corner case for empty data (EOF);
    if (!fileData[fileData.length - 1]) fileData.pop();
    // store data into caches...
    fileData.forEach((pokemon, idx) => {
      const [id, name, data, timestamps] = pokemon.split('|');
      pokeDex.push(new Pokemon({ id, name, data: JSON.parse(data), timestamps }));
      pokeIdIndexCache.set(id, idx);
      pokeNameIndexCache.set(name, idx);
    });
  } catch (err) {
    switch (err.code) {
      // if not exist, create the file...
      case 'ENOENT':
        console.log('no cache found...');
        fileHandle = await fsPromises.open(cacheFilePath, 'w');
        console.log('create new cache...');
        break;
      default:
        console.log(err);
    }
  } finally {
    closeFile();
  }
}

// search pokemon by ID: time O(1), space O(N)
const getPokemonByID = (id: string) => pokeIdIndexCache.has(id) ? pokeDex[pokeIdIndexCache.get(id)] : null;
// search pokemon by Name: time O(1), space O(N)
const getPokemonByName = (name: string) => pokeNameIndexCache.has(name) ? pokeDex[pokeNameIndexCache.get(name)] : null;
// update pokemon: time O(N), space O(N)
const updatePokemonCache = async (rawData: string, pokemon: PokemonType) => {
  if (pokeIdIndexCache.has(pokemon.id)) {
    console.log('updating caches...');
    const idx = pokeIdIndexCache.get(pokemon.id);
    pokeDex[idx] = pokemon;
    fileData[idx] = rawData;

    try {
      await fsPromises.writeFile(cacheFilePath, `${fileData.join('\n')}\n`);
    } catch (err) {
      console.error(err);
    }
    console.log('caches updated...');
  }
}
// add pokemon: time O(1), space O(N)
const appendPokemonCache = async (rawData: string, pokemon: PokemonType) => {
  if (!pokeIdIndexCache.has(pokemon.id)) {
    console.log('adding new cache...');
    const { id, name } = pokemon;
    const newIdx = pokeDex.length;
    fileData.push(rawData);
    pokeDex.push(pokemon);
    pokeIdIndexCache.set(id, newIdx);
    pokeNameIndexCache.set(name, newIdx);

    try {
      await fsPromises.appendFile(cacheFilePath, `${rawData}\n`);
    } catch (err) {
      console.error(err);
    }
    console.log('cache added...');
  }
}

const closeFile = async () => {
  fileHandle?.close();
}

export default {
  cacheFile,
  closeFile,
  getPokemonByID,
  getPokemonByName,
  updatePokemonCache,
  appendPokemonCache,
}
