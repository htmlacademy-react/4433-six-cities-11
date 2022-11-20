import {createReducer} from '@reduxjs/toolkit';
import {DEFAULT_CITY} from '../const';
import {offers} from '../mocks/offers';
import {setCity, setOffersByCity} from './action';

const initialState = {
  currentCity: DEFAULT_CITY,
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setOffersByCity, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
