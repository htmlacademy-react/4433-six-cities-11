export type OfferItem = {
  id: string;
  name: string;
  type: string;
  raiting: number;
  isBookmarked: boolean;
  isPremium: boolean;
  src: string;
  price: {
    value: number;
    currency: string;
    period: string;
  };
};
