import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers, offersGrouppedByCity} from './mocks/offers';
import {CITIES} from './const';
import {store} from './store';
import {Provider} from 'react-redux';

const cities = Object.keys(CITIES);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        cities = {cities}
        offers = {offers}
        offersGrouppedByCity = {offersGrouppedByCity}
      />
    </Provider>
  </React.StrictMode>,
);
