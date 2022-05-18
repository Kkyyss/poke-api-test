export interface Details {
  version: string;
  methods: Array<string>;
}
export interface LocationAreaEncounters {
  area: string;
  details: Array<Details>;
}
export interface PokemonStat {
  hp?: number;
  attack?: number;
  defense?: number;
  "special-attack"?: number;
  "special-defense"?: number;
  speed?: number;
}
export interface PokemonData {
  types: Array<string>;
  locationAreaEncounters: Array<LocationAreaEncounters>;
  stats: PokemonStat;
};
export interface PokemonType {
  id: string;
  name: string;
  data: PokemonData;
  timestamps: string;
};
