import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {offers} from '../mocks/offers';
import {SortType} from '../const';

const setCity = createAction('main/setCity',
  (city: string) => ({ payload: city })
);

const setOffersByCity = createAction('main/setOffersByCity',
  (city: string) => ({ payload: offers.filter((offer) => offer.city.name === city) })
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

export {setCity, setOffersByCity, setCurrentSortType};
