import {Offer, OffersGrouppedByCity} from './types/offer';
import {Review} from './types/review';
import {MAX_RATING} from './const';

export const getOffersGrouppedByCity = (offers: Offer[]) => {
  const result: OffersGrouppedByCity = {};

  offers.forEach((offer: Offer) => {
    if (result[offer.city.name]) {
      result[offer.city.name].push(offer);
    } else {
      result[offer.city.name] = [offer];
    }
  });

  return result;
};

export function calcRatingStyle(ratingValue: number) {
  return 100 * ratingValue / MAX_RATING;
}

export const getReviewsOfCurrentOffer = (offerId: number, reviews: Review[]) => {
  const reviewsOfCurrentOffer: Review[] = [];

  reviews.forEach((review: Review) => {
    if (review.id === offerId) {
      reviewsOfCurrentOffer.push(review);
    }
  });

  return reviewsOfCurrentOffer;
};
