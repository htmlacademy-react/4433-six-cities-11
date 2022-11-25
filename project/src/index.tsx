import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import {CITIES} from './const';
import {offersGrouppedByCity} from './mocks/offers';
import {store} from './store';
import {fetchOfferAction} from './store/api-actions';

const cities = Object.keys(CITIES);
store.dispatch(fetchOfferAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ErrorMessage />

      <App
        cities = {cities}
        offersGrouppedByCity = {offersGrouppedByCity}
      />
    </Provider>
  </React.StrictMode>,
);
