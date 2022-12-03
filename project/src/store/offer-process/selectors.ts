import {createSelector} from '@reduxjs/toolkit';
import {NameSpace, SortType} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';

const sortings = {
  [SortType.PriceUp]: (offerA: Offer, offerB: Offer) => offerA.price - offerB.price,
  [SortType.PriceDown]: (offerA: Offer, offerB: Offer) => offerB.price - offerA.price,
  [SortType.Top]: (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating
};

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getCurrentCity = (state: State): string => state[NameSpace.Process].currentCity;
export const getSelectedOfferId = (state: State): number => state[NameSpace.Process].selectedOfferId;
export const getCurrentSortType = (state: State): SortType => state[NameSpace.Process].currentSortType;

export const getOffersByCity = createSelector(
  [getOffers, getCurrentCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const getSortedOffers = createSelector(
  [getOffersByCity, getCurrentSortType],
  (offers, currentSortType) => {
    if (currentSortType === SortType.Default) {
      return offers;
    }

    return offers.sort(sortings[currentSortType]);
  }
);
