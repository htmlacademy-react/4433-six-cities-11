import {City} from './types/city';

export enum AppRoute {
  Favorites = '/favorites',
  Login = '/login',
  Main = '/',
  Room = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MAX_RATING = 5;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const CITIES: City = {
  Amsterdam: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  },
  Brussels: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
  Cologne: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  },
  Hamburg: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  }
};
