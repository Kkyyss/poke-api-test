import { PokemonData, PokemonType } from "./pokemon.types";

class Pokemon implements PokemonType {
  id: string;
  name: string;
  data: PokemonData;
  timestamps: string;

  constructor(pokemon: PokemonType) {
    const { id, name, data, timestamps } = pokemon;
    this.id = id;
    this.name = name;
    this.data = data;
    this.timestamps = timestamps;
  }

  print() {
    console.log('ID: ', this.id);
    console.log('Name: ', this.name);
    const { types, locationAreaEncounters, stats } = this.data;
    console.log('Types: ', types.join(', '));
    let encounterStr = locationAreaEncounters.reduce((_encounterStr, encounter) => {
      const { details } = encounter;
      const detailStr = details.reduce((_detailStr, detail) => {
        const { version, methods } = detail;
        _detailStr += `\n\t\tversion: ${version}, methods: ${methods.join(', ')}`;
        return _detailStr;
      }, '');
      _encounterStr += `\tarea: ${encounter.area}\n\tdetails:${detailStr}\n`
      return _encounterStr;
    }, '\n');
    if (encounterStr === '\n') encounterStr = '-';
    console.log(`Encounters: ${encounterStr}`);
    let statStr = Object.entries(stats).reduce((_statStr, [key, value]) => _statStr + `\t${key}: ${value}\n`, '\n');
    if (!statStr) statStr = '-';
    console.log(`Stats: ${statStr}`);
  }
}

export default Pokemon;
