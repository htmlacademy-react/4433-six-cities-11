import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {store} from './';
import {AppDispatch, State} from '../types/state';
import {Offer} from '../types/offer';
import {loadOffers, loadNearOffers, setOffersLoadingStatus, setError, requireAuthorization, redirectToRoute, setUserData, loadReviewsByOffer, loadCurrentOffer} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, TIMEOUT_SHOW_ERROR, AuthorizationStatus, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {Review, ReviewData} from '../types/review';

export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOfferAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchNearOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOfferAction',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(loadNearOffers(data));
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
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    }
    catch (error) {
      dispatch(setError('Can not send your comment'));
    }
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
  'data/loadReviews',
  async (id, {dispatch, extra: api}) => {
    try {
      const path = `${APIRoute.Reviews}/${id}`;
      const {data} = await api.get<Review[]>(path);
      dispatch(loadReviewsByOffer(data));
    } catch {
      dispatch(setError('Can not find reviews'));
    }
  },
);

export const loadOffer = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadOffer',
  async (id, {dispatch, extra: api}) => {
    try {
      const path = `${APIRoute.Offers}/${id}`;
      const {data} = await api.get<Offer>(path);
      dispatch(loadCurrentOffer(data));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const postReviewAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review[]>(`${APIRoute.Reviews}/${id}`, {comment, rating});
    dispatch(loadReviewsByOffer(data));
  },
);
