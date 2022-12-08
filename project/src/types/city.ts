export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type CityLocation = Record<string, Location>;
