import {createReducer} from '@reduxjs/toolkit';
import {DEFAULT_CITY, SortType, AuthorizationStatus} from '../const';
import {Offer} from '../types/offer';
import {UserData} from '../types/user-data';
import {setCity, setOffersByCity, setCurrentSortType, setSelectedOffer, loadOffers, setOffersLoadingStatus, setError, requireAuthorization} from './action';

type InitalState = {
  currentCity: string;
  offers: Offer[];
  offersByCity: Offer[];
  currentSortType: SortType;
  selectedOfferId: number;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: null | string;
  userData: null | UserData;
}

const initialState: InitalState = {
  currentCity: DEFAULT_CITY,
  offers: [],
  offersByCity: [],
  currentSortType: SortType.Default,
  selectedOfferId: 1,
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userData: null
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffersByCity, (state, action) => {
      state.offersByCity = action.payload;
    })
    .addCase(setCurrentSortType, (state, action) => {
      state.currentSortType = action.payload.currentSortType;
      state.offersByCity = action.payload.offersByCity;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOfferId = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
