import {createReducer} from '@reduxjs/toolkit';
import {DEFAULT_CITY, SortType} from '../const';
import {offers} from '../mocks/offers';
import {setCity, setOffersByCity, setCurrentSortType, setSelectedOffer} from './action';

const initialState = {
  currentCity: DEFAULT_CITY,
  offers: offers,
  offersByCity: offers,
  currentSortType: SortType.Default,
  selectedOfferId: 1
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
    });
});

export {reducer};
