import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, MAX_COUNT_OF_REVIEWS, MAX_COUNT_OF_OFFER_IMAGES} from '../../const';
import {sortReviews} from '../../util';
import {fetchOffersAction, fetchNearOffersAction, fetchOfferInfo, fetchReviewsAction, addReviewAction, fetchFavoriteOffersAction, setOfferStatusAction} from '../api-actions';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

export type InitialState = {
  offers: Offer[];
  isOffersLoading: boolean;
  currentOffer: null | Offer;
  hasError: boolean;
  reviews: Review[];
  nearOffers: Offer[];
  favoriteOffers: Offer[];
};

const initialState: InitialState = {
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
        state.hasError = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state, action) => {
        state.hasError = true;
      })
      // favorite status
      .addCase(setOfferStatusAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;

        const offerItem = state.offers.find((offer) => offer.id === action.payload.id);
        if (offerItem) {
          offerItem.isFavorite = action.payload.isFavorite;
        }

        const nearOfferItem = state.nearOffers.find((offer) => offer.id === action.payload.id);
        if (nearOfferItem) {
          nearOfferItem.isFavorite = action.payload.isFavorite;
        }

        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
        }
      })
      // current offer
      .addCase(fetchOfferInfo.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchOfferInfo.fulfilled, (state, action) => {
        state.currentOffer = action.payload;

        const offerImages = state.currentOffer.images;
        state.currentOffer.images = offerImages.length > MAX_COUNT_OF_OFFER_IMAGES ? offerImages.slice(0, MAX_COUNT_OF_OFFER_IMAGES) : offerImages;
      })
      .addCase(fetchOfferInfo.rejected, (state) => {
        state.hasError = true;
      })
      // reviews
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        const reviewList = sortReviews(action.payload);
        state.reviews = reviewList.length > MAX_COUNT_OF_REVIEWS ? reviewList.slice(0, MAX_COUNT_OF_REVIEWS) : reviewList;
        state.hasError = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.hasError = true;
      })
      // add review
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
