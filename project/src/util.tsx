import dayjs from 'dayjs';
import {Offer, OffersGrouppedByCity} from './types/offer';
import {Review} from './types/review';
import {MAX_RATING} from './const';

export function calcRatingStyle(ratingValue: number) {
  return 100 * ratingValue / MAX_RATING;
}

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

export const humanizeDate = (date: string) => dayjs(date).format('MMMM YYYY');

export function sortReviews(reviews: Review[]) {
  return reviews.sort((reviewA, reviewB) => dayjs(reviewB.date).diff(dayjs(reviewA.date)));
}
