import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {SortType} from '../const';

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
    switch(currentSortType) {
      case SortType.PriceUp:
        return {
          payload: {
            offersByCity: [...offersByCity].sort((offerA, offerB) => offerA.price - offerB.price),
            currentSortType: currentSortType
          },
        };
      case SortType.PriceDown:
        return {
          payload: {
            offersByCity: [...offersByCity].sort((offerA, offerB) => offerB.price - offerA.price),
            currentSortType: currentSortType
          },
        };
      case SortType.Top:
        return {
          payload: {
            offersByCity: [...offersByCity].sort((offerA, offerB) => offerB.rating - offerA.rating),
            currentSortType: currentSortType
          },
        };
      default:
        return {
          payload: {
            offersByCity: offersByCity,
            currentSortType: currentSortType
          },
        };
    }
  });

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');

export const setError = createAction<string | null>('data/setError');

export {setCity, setOffersByCity, setCurrentSortType, setSelectedOffer};
