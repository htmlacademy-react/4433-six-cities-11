import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {store} from './';
import {AppDispatch, State} from '../types/state';
import {Offer} from '../types/offer';
import {loadOffers, setOffersLoadingStatus, setError, requireAuthorization, redirectToRoute, setUserData, loadReviewsByOffer, loadCurrentOffer, addReview} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, TIMEOUT_SHOW_ERROR, AuthorizationStatus, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {Review} from '../types/review';

export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOfferAction = createAsyncThunk<void, number | null, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOffers',
    async (id, {dispatch, extra: api}) => {
      dispatch(setOffersLoadingStatus(true));
      const {data} = id ? await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`) : await api.get<Offer[]>(APIRoute.Offers);
      dispatch(setOffersLoadingStatus(false));
      if (id) {
        dispatch(loadOffers('near', data));
      } else {
        dispatch(loadOffers('', data));
      }
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Login));
  },
);

export const loadReviews = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadReviewsByOffer',
  async (id, {dispatch, extra: api}) => {
    try {
      const path = `${APIRoute.Reviews}/${id}`;
      const {data} = await api.get<Review[]>(path);
      dispatch(loadReviewsByOffer(data));
    } catch {
      // dispatch(loadCurrentOffer());
    }
  },
);

export const loadOffer = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadReviewsByOffer',
  async (id, {dispatch, extra: api}) => {
    try {
      const path = `${APIRoute.Offers}/${id}`;
      const {data} = await api.get<Offer>(path);
      dispatch(loadCurrentOffer(data));
    } catch {
      // dispatch(loadCurrentOffer({}));
    }
  },
);

export const addReviewForOffer = createAsyncThunk<void, Review, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async (review, {dispatch, extra: api}) => {
    await api.post<Review>(`${APIRoute.Reviews}/${review.id}`, review);
    dispatch(addReview(review));
  },
);
