export type OfferPrice = {
  value: number;
  currency: string;
  period: string;
}

export type OfferItemType = {
  id: string;
  name: string;
  type: string;
  raiting: number;
  isBookmarked: boolean;
  isPremium: boolean;
  src: string;
  city: string;
  price: OfferPrice;
};

export type Offers = OfferItemType[];
