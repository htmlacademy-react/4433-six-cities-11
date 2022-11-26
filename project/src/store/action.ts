import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {SortType} from '../const';

const sortings = {
  [SortType.PriceUp]: (offerA: Offer, offerB: Offer) => offerA.price - offerB.price,
  [SortType.PriceDown]: (offerA: Offer, offerB: Offer) => offerB.price - offerA.price,
  [SortType.Top]: (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating
};

const setCity = createAction('main/setCity',
  (city: string) => ({ payload: city })
);

const setOffersByCity = createAction('main/setOffersByCity',
  (city: string, offers: Offer[]) => ({ payload: offers.filter((offer) => offer.city.name === city) })
);

const setSelectedOffer = createAction('main/setSelectedOffer',
  (id: number) => ({ payload: id })
);

const setCurrentSortType = createAction('offers/sort',
  (currentSortType: SortType, offersByCity: Offer[]) => {
    if (currentSortType === SortType.Default) {
      return {
        payload: {
          offersByCity: offersByCity,
          currentSortType: currentSortType
        },
      };
    }

    return {
      payload: {
        offersByCity: [...offersByCity].sort(sortings[currentSortType]),
        currentSortType: currentSortType
      },
    };
  });

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');

export const setError = createAction<string | null>('data/setError');

export {setCity, setOffersByCity, setCurrentSortType, setSelectedOffer};
