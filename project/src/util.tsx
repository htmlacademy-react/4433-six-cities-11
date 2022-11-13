import {Offer, OffersGrouppedByCity} from './types/offer';
import {CityLocation} from './types/city';
import {MAX_RATING} from './const';

export const getOffersGrouppedByCity = (offers: Offer[]) => {
  const cities: string[] = getCitiesArray(offers);
  const offersGrouppedByCity: OffersGrouppedByCity = {};
  let offersForCity: Offer[] = [];

  cities.forEach((city: string) => {
    offers.forEach((offer: Offer) => {
      if (offer.city.name === city) {
        offersForCity.push(offer);
      }
    });

    if (offersForCity.length > 0) {
      offersGrouppedByCity[city] = offersForCity;
      offersForCity = [];
    }
  });

  return offersGrouppedByCity;
};


export const getCitiesArray = (offers: Offer[]) => {
  const cities: string[] = [];

  offers.forEach((el) => {
    if (!cities.includes(el.city.name)) {
      cities.push(el.city.name);
    }
  });

  return cities;
};

export const getCityLocation = (city: string | undefined, offers: Offer[]) => {
  const cityLocation: CityLocation = {
    title: city ? city : '',
    latitude: offers[0].city.location.latitude,
    longitude: offers[0].city.location.longitude,
    zoom: offers[0].city.location.zoom
  };

  return cityLocation;
};

export function calcRaitingStyle(raitingValue: number) {
  return 100 * raitingValue / MAX_RATING;
}
