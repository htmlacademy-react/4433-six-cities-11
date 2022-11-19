export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type CityName = 'Amsterdam' | 'Brussels' | 'Cologne' | 'Hamburg';

export type City = Record<CityName, Location>;
