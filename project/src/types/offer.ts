export type OfferCity = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export type Offer = {
  city: OfferCity;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: {
    id: number;
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
  description: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  id: number;
};

export type OffersGrouppedByCity = Record<string, Offer[]>;

export type OfferStatusData = {
  status: number;
  id: number;
}
