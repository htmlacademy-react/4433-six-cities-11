import {store} from '../store/index.js';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {UserData} from '../types/user-data';
import {AuthorizationStatus, SortType} from '../const.js';

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: null | UserData;
};

export type OfferData = {
  offers: Offer[];
  isOffersLoading: boolean;
  currentOffer: null | Offer;
  hasError: boolean;
  reviews: Review[];
  nearOffers: Offer[];
};

export type OfferProcess = {
  currentCity: string;
  offersByCity: Offer[];
  sortedOffers: Offer[];
  currentSortType: SortType;
  selectedOfferId: number;
};

export type State = ReturnType<typeof store.getState>;
