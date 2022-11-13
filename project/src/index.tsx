import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers, offersGrouppedByCity} from './mocks/offers';
import {getCitiesArray} from './util';

const cities = getCitiesArray(offers);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      cities = {cities}
      offers = {offers}
      offersGrouppedByCity = {offersGrouppedByCity}
    />
  </React.StrictMode>,
);
