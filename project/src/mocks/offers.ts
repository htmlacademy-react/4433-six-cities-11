import {Offers} from '../types/offer';

export const offers: Offers = [
  {
    id: '1',
    name: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    raiting: 4,
    isBookmarked: false,
    isPremium: false,
    src: 'img/apartment-01.jpg',
    price: {
      value: 120,
      currency: '€',
      period: 'night',
    }
  }, {
    id: '2',
    name: 'Wood and stone place',
    type: 'Private room',
    raiting: 4,
    isBookmarked: true,
    isPremium: false,
    src: 'img/room.jpg',
    price: {
      value: 80,
      currency: '€',
      period: 'night',
    }
  }, {
    id: '3',
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    raiting: 4,
    isBookmarked: true,
    isPremium: false,
    src: 'img/apartment-02.jpg',
    price: {
      value: 132,
      currency: '€',
      period: 'night',
    }
  }, {
    id: '4',
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    raiting: 5,
    isBookmarked: false,
    isPremium: true,
    src: 'img/apartment-03.jpg',
    price: {
      value: 180,
      currency: '€',
      period: 'night',
    }
  }
];
