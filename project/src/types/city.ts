export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type CityName = 'Amsterdam' | 'Brussels' | 'Cologne' | 'Hamburg';

export type City = Record<string, Location>;
