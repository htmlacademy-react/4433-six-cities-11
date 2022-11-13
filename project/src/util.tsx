import {OfferItemType, Offers, OffersGrouppedByCity} from './types/offer';
import {CityLocation} from './types/city';

export const getOffersGrouppedByCity = (offers: Offers) => {
  const cities: string[] = getCitiesArray(offers);
  const offersGrouppedByCity: OffersGrouppedByCity = {};
  let offersForCity: Offers = [];

  cities.forEach((city: string) => {
    offers.forEach((offer: OfferItemType) => {
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


export const getCitiesArray = (offers: Offers) => {
  const cities: string[] = [];

  offers.forEach((el) => {
    if (!cities.includes(el.city.name)) {
      cities.push(el.city.name);
    }
  });

  return cities;
};

export const getCityLocation = (city: string | undefined, offers: Offers) => {
  const cityLocation: CityLocation = {
    title: city ? city : '',
    latitude: offers[0].city.location.latitude,
    longitude: offers[0].city.location.longitude,
    zoom: offers[0].city.location.zoom
  };

  return cityLocation;
};
