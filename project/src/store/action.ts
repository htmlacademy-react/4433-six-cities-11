import { createAction } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';

const setCity = createAction('main/setCity', (city: string) => ({ payload: city }));

const setOffersOfCity = createAction('main/setOffersOfCity',
  (city: string) => ({ payload: offers.filter((offer) => offer.city.name === city) })
);

export {setCity, setOffersOfCity};
