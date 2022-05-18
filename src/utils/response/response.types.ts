import { LocationAreaEncounters, PokemonStat } from "../../models/pokemon/pokemon.types";

export type OnlyName = {
  name: string;
};
export type InfoResponsePokemonTypesMap = {
  type: OnlyName;
};
export type InfoResponsePokemonStatsMap = {
  base_stat: number;
  stat: OnlyName;
};
export type InfoResponseData = {
  id: string;
  name: string;
  types: Array<InfoResponsePokemonTypesMap>;
  location_area_encounters: string;
  stats: Array<InfoResponsePokemonStatsMap>;
};

export type EncResponseDetailsMap = {
  method: OnlyName;
}
export type EncResponseVersionMap = {
  encounter_details: Array<EncResponseDetailsMap>;
  version: OnlyName;
}
export type EncResponseData = {
  location_area: OnlyName;
  version_details: Array<EncResponseVersionMap>;
}

// Clean Info
export type CleanInfoResponseData = {
  id: string;
  name: string;
  types: Array<string>;
  locationAreaEncounters: string;
  stats: PokemonStat;
};

// New Data
export type NewData = {
  id: string;
  name: string;
  types: Array<string>;
  locationAreaEncounters: Array<LocationAreaEncounters>;
  stats: PokemonStat;
};
