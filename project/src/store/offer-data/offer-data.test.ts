import {offerData} from './offer-data';
import {InitialState as OfferData} from './offer-data';
import {fetchOffersAction, fetchNearOffersAction, fetchFavoriteOffersAction, fetchOfferInfo, fetchReviewsAction, addReviewAction, setOfferStatusAction} from '../api-actions';
import {makeFakeOffers, makeFakeReviews, fakeOffer, fakeReview} from '../../util/mocks';
import {MAX_COUNT_OF_REVIEWS} from '../../const';
import {Offer} from '../../types/offer';

const initialState = {
  offers: [],
  currentOffer: null,
  nearOffers: [],
  favoriteOffers: [],
  reviews: [],
  isOffersLoading: false,
  hasError: false
};

const offers = makeFakeOffers(80);
const nearOffers = makeFakeOffers(3);
const favoriteOffers = makeFakeOffers(5);
const reviews = makeFakeReviews(5);
const currentOffer = fakeOffer;
const newReview = fakeReview;

const updateOfferList = (offersList: Offer[], favoriteOffer: Offer) => {
  const updatedOffers = offersList.map((offer) => {
    if (offer.id !== favoriteOffer.id) {
      return offer;
    }

    return favoriteOffer;
  });

  return updatedOffers;
};

describe('Reducer: offerData', () => {
  let state: OfferData;

  it('without additional parameters should return initial state', () => {
    state = initialState;

    expect(offerData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...state});
  });

  it('should update offers by load offers', () => {
    state = initialState;

    expect(offerData.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: offers}))
      .toEqual({...state, offers: offers, isOffersLoading: false, hasError: false});
  });

  it('should update near offers by load near offers', () => {
    state = initialState;

    expect(offerData.reducer(state, {type: fetchNearOffersAction.fulfilled.type, payload: nearOffers}))
      .toEqual({...state, nearOffers: nearOffers, hasError: false});
  });

  it('should update favorite offers by load favorite offers', () => {
    state = initialState;

    expect(offerData.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: favoriteOffers}))
      .toEqual({...state, favoriteOffers: favoriteOffers, hasError: false});
  });

  it('should update current offer by load current offer', () => {
    state = initialState;

    expect(offerData.reducer(state, {type: fetchOfferInfo.fulfilled.type, payload: currentOffer}))
      .toEqual({...state, currentOffer: currentOffer, hasError: false});
  });

  it('should update reviews by load reviews', () => {
    state = initialState;
    const slicedReviews = reviews.length > MAX_COUNT_OF_REVIEWS ? reviews.slice(0, MAX_COUNT_OF_REVIEWS) : reviews;

    expect(offerData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
      .toEqual({...state, reviews: slicedReviews, hasError: false});
  });

  it('should update reviews after post new review', () => {
    state = {...initialState, reviews: reviews};
    const updatedReviews = reviews.length > MAX_COUNT_OF_REVIEWS ? reviews.slice(0, MAX_COUNT_OF_REVIEWS) : reviews.slice();
    updatedReviews.push(newReview);

    expect(offerData.reducer(state, {type: addReviewAction.fulfilled.type, payload: updatedReviews}))
      .toEqual({...state, reviews: updatedReviews, hasError: false});
  });


  it('should update offers, favoriteOffers, nearOffers after change status of current offer', () => {
    state = {
      ...initialState,
      offers: offers,
      nearOffers: nearOffers,
      favoriteOffers: favoriteOffers,
      currentOffer: currentOffer
    };

    const favoriteOffer = {...currentOffer, isFavorite: !currentOffer.isFavorite};

    const updatedOffers = updateOfferList(offers, favoriteOffer);
    const updatedNearOffers = updateOfferList(nearOffers, favoriteOffer);
    const updatedFavoriteOffers = updateOfferList(favoriteOffers, favoriteOffer);

    expect(offerData.reducer(state, {type: setOfferStatusAction.fulfilled.type, payload: reviews}))
      .toEqual({
        ...state,
        offers: updatedOffers,
        nearOffers: updatedNearOffers,
        favoriteOffers: updatedFavoriteOffers,
        currentOffer: favoriteOffer
      });
  });
});

