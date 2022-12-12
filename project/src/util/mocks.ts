import {lorem, datatype, address, image} from 'faker';
import {Offer} from '../types/offer';
import {Review} from '../types/review';

export const makeFakeOffer = (id: number): Offer => ({
  bedrooms: datatype.number(10),
  description: lorem.words(),
  goods: datatype.array(datatype.number(10)),
  host: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: lorem.word(),
  },
  id: id,
  images: [image.imageUrl()],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude:  Number(address.longitude()),
    zoom: datatype.number(10),
  },
  maxAdults: datatype.number(10),
  previewImage: image.imageUrl(),
  price: datatype.number(5000),
  rating: datatype.number(5),
  title: lorem.words(),
  type: lorem.word(),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude:  Number(address.longitude()),
      zoom: datatype.number(10),
    },
    name: address.cityName(),
  }
} as Offer);

export const fakeOffer = makeFakeOffer(datatype.number());

export const makeFakeOffers = (count: number): Offer[] => {
  const offers = [];

  for (let i = 0; i < datatype.number(count); i++) {
    offers.push(makeFakeOffer(i));
  }

  offers.push(fakeOffer);
  return offers;
};

export const makeFakeReview = (id: number): Review => ({
  comment: lorem.paragraph(),
  date: String(datatype.datetime()),
  id: id,
  rating: datatype.number(5),
  user: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name:  lorem.word(),
  }
} as Review);

export const fakeReview = makeFakeReview(datatype.number());

export const makeFakeReviews = (count: number): Review[] => {
  const reviews = [];

  for (let i = 0; i < datatype.number(count); i++) {
    reviews.push(makeFakeReview(i));
  }

  return reviews;
};
