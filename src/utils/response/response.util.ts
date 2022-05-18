import { LocationAreaEncounters } from "../../models/pokemon/pokemon.types";
import { CleanInfoResponseData, EncResponseData, InfoResponseData } from "./response.types";

export const infoResponseHelper = (data: InfoResponseData): CleanInfoResponseData => ({
  id: data.id,
  name: data.name,
  types: data.types.map(({ type }) => type.name),
  locationAreaEncounters: data.location_area_encounters,
  stats: data.stats.reduce((_newStat, stat) => {
      _newStat[stat.stat.name] = stat.base_stat;
      return _newStat;
  }, {}),
});

export const enconutersAndMethodsResponseHelper = (data: Array<EncResponseData>, area="kanto"): Array<LocationAreaEncounters> => {
  const filteredData = data.reduce((newArr, encounter) => {
    if (encounter.location_area.name.slice(0, area.length) !== area) return newArr;
    const newMap = {};
    newMap['area'] = encounter.location_area.name;
    newMap['details'] = encounter.version_details.map(({ encounter_details, version }) => ({
      version: version.name,
      methods: [...new Set(encounter_details.reduce((_arr, { method }) => {
        _arr.push(method.name);
        return _arr;
      }, []))]
    }));
    newArr.push(newMap);
    return newArr;
  }, []);
  return filteredData;
};
