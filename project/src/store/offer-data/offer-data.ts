import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OfferData} from '../../types/state';
import {fetchOfferAction, fetchNearOfferAction, fetchOfferInfo, fetchReviewAction, postReviewAction, fetchFavoriteOfferAction, fetchOfferStatusAction} from '../api-actions';

const initialState: OfferData = {
  offers: [],
  currentOffer: null,
  nearOffers: [],
  favoriteOffers: [],
  reviews: [],
  isOffersLoading: false,
  hasError: false
};

export const offerData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // all offers
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOffersLoading = false;
        state.hasError = true;
      })
      // near offers
      .addCase(fetchNearOfferAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchNearOfferAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(fetchNearOfferAction.rejected, (state) => {
        state.hasError = true;
      })
      // favorite offers
      .addCase(fetchFavoriteOfferAction.pending, (state) => {
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFavoriteOfferAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOfferAction.rejected, (state) => {
        state.hasError = true;
      })
      // current offer
      .addCase(fetchOfferInfo.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchOfferInfo.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(fetchOfferInfo.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(fetchOfferStatusAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      // load reviews
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.hasError = false;
      })
      .addCase(fetchReviewAction.rejected, (state) => {
        state.hasError = true;
      })
      // post review
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.hasError = false;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.hasError = true;
      });
  }
});
