import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.Data].currentOffer;
export const getNearbyOffer = (state: State): Offer[] => state[NameSpace.Data].nearOffers;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;
