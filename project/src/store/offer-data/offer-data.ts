import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, MAX_COUNT_OF_REVIEWS} from '../../const';
import {sortReviews} from '../../util';
import {OfferData} from '../../types/state';
import {fetchOffersAction, fetchNearOffersAction, fetchOfferInfo, fetchReviewsAction, addReviewAction, fetchFavoriteOffersAction, setOfferStatusAction} from '../api-actions';

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
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
        state.hasError = true;
      })
      // near offers
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(fetchNearOffersAction.rejected, (state) => {
        state.hasError = true;
      })
      // favorite offers
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
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
      .addCase(setOfferStatusAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      // load reviews
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        const reviewList = sortReviews(action.payload);
        state.reviews = reviewList.length > MAX_COUNT_OF_REVIEWS ? reviewList.slice(0, MAX_COUNT_OF_REVIEWS) : reviewList;
        state.hasError = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.hasError = true;
      })
      // post review
      .addCase(addReviewAction.fulfilled, (state, action) => {
        const reviewList = sortReviews(action.payload);
        state.reviews = reviewList.length > MAX_COUNT_OF_REVIEWS ? reviewList.slice(0, MAX_COUNT_OF_REVIEWS) : reviewList;
        state.hasError = false;
      })
      .addCase(addReviewAction.rejected, (state) => {
        state.hasError = true;
      });
  }
});
