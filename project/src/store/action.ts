import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {UserData} from '../types/user-data';
import {SortType, AuthorizationStatus, AppRoute} from '../const';

const sortings = {
  [SortType.PriceUp]: (offerA: Offer, offerB: Offer) => offerA.price - offerB.price,
  [SortType.PriceDown]: (offerA: Offer, offerB: Offer) => offerB.price - offerA.price,
  [SortType.Top]: (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating
};

export const setCity = createAction('main/setCity',
  (city: string) => ({ payload: city })
);

export const setOffersByCity = createAction('main/setOffersByCity',
  (city: string, offers: Offer[]) => ({ payload: offers.filter((offer) => offer.city.name === city) })
);

export const setSelectedOffer = createAction('main/setSelectedOffer',
  (id: number) => ({ payload: id })
);

export const setCurrentSortType = createAction('offers/sort',
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

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('site/redirectToRoute');

export const setUserData = createAction<UserData>('site/setUserData');
