import {Offer, OffersGrouppedByCity} from './types/offer';
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
