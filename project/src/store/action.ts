import { createAction } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';

const setCity = createAction('main/setCity', (city: string) => ({ payload: city }));

const setOffersByCity = createAction('main/setOffersByCity',
  (city: string) => ({ payload: offers.filter((offer) => offer.city.name === city) })
);

export {setCity, setOffersByCity};
