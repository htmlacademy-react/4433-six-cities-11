import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, DEFAULT_CITY, SortType} from '../../const';
import {OfferProcess} from '../../types/state';
import {Offer} from '../../types/offer';

const initialState: OfferProcess = {
  currentCity: DEFAULT_CITY,
  offersByCity: [],
  selectedOfferId: 1,
  currentSortType: SortType.Default,
};

export const offerProcess = createSlice({
  name: NameSpace.Process,
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<string>) => {
      state.currentCity = action.payload;
    },
    setOffersByCity: (state, action: PayloadAction<Offer[]>) => {
      state.offersByCity = action.payload;
    },
    setSelectedOffer: (state, action: PayloadAction<number>) => {
      state.selectedOfferId = action.payload;
    },
    setCurrentSortType: (state, action: PayloadAction<SortType>) => {
      state.currentSortType = action.payload;
    },
  },
});

export const {setCurrentCity, setOffersByCity, setSelectedOffer, setCurrentSortType} = offerProcess.actions;
