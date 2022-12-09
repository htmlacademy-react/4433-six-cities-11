import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, DEFAULT_CITY, SortType} from '../../const';
import {Offer} from '../../types/offer';

export type InitialState = {
  currentCity: string;
  sortedOffers: Offer[];
  currentSortType: SortType;
  selectedOfferId: number;
};

const initialState: InitialState = {
  currentCity: DEFAULT_CITY,
  sortedOffers: [],
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
    setSelectedOffer: (state, action: PayloadAction<number>) => {
      state.selectedOfferId = action.payload;
    },
    setCurrentSortType: (state, action: PayloadAction<SortType>) => {
      state.currentSortType = action.payload;
    },
    setSortedOffers: (state, action: PayloadAction<Offer[]>) => {
      state.sortedOffers = action.payload;
    },
  },
});

export const {setCurrentCity, setSelectedOffer, setCurrentSortType, setSortedOffers} = offerProcess.actions;
