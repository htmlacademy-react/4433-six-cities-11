import {CityLocation} from './types/city';

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

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  Favorite = '/favorite',
}

export enum SortType {
  Default = 'Popular',
  PriceUp = 'Price: low to high',
  PriceDown = 'Price: high to low',
  Top = 'Top rated first',
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  Process = 'PROCESS'
}

export const MAX_RATING = 5;

export const DEFAULT_CITY = 'Paris';

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const CITIES: CityLocation = {
  Paris: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  },
  Cologne: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13
  },
  Brussels: {
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 13
  },
  Amsterdam: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13
  },
  Hamburg: {
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 13
  },
  Dusseldorf: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13
  }
};

export const TIMEOUT_SHOW_ERROR = 2000;

export const MIN_LENGTH_OF_REVIEW = 50;
export const MAX_LENGTH_OF_REVIEW = 300;

export const MAX_COUNT_OF_REVIEWS = 10;

export const MAX_COUNT_OF_OFFER_IMAGES = 6;

export const LOGIN_REGEXP = /^(?=.*[A-Za-z])(?=.*[0-9]).{2,}$/;
export const MIN_LENGTH_OF_PASSWORD = 1;
