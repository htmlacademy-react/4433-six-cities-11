import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {AuthData} from '../types/auth-data';
import {redirectToRoute} from './action';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOffersAction,
  fetchOfferInfo,
  fetchFavoriteOffersAction,
  setOfferStatusAction,
  fetchNearOffersAction,
  fetchReviewsAction,
  addReviewAction
} from './api-actions';
import {makeFakeOffers, makeFakeReviews, fakeOffer, fakeReviewData} from '../util/mocks';

const mockOffer = fakeOffer;
const mockComments = makeFakeReviews();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123AAA'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch offers when GET /hotels', async () => {
    const mockOffers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch nears offers when GET /hotels/id/nearby', async () => {
    const mockNearOffers = makeFakeOffers();

    mockAPI
      .onGet(`${APIRoute.Offers}/${mockOffer.id}/nearby`)
      .reply(200, mockNearOffers);

    const store = mockStore();

    await store.dispatch(fetchNearOffersAction(mockOffer.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearOffersAction.pending.type,
      fetchNearOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch offer info when GET /hotels/id', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${mockOffer.id}`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchOfferInfo(mockOffer.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferInfo.pending.type,
      fetchOfferInfo.fulfilled.type
    ]);
  });

  it('should dispatch favorite offers when GET /favorite', async () => {
    const mockFavoriteOffers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFavoriteOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoriteOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteOffersAction.pending.type,
      fetchFavoriteOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch offer status when POST /favorite/id/status', async () => {
    const updatedStatusData = {id: mockOffer.id, status: Number(!mockOffer.isFavorite)};

    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockOffer.id}/${updatedStatusData.status}`, updatedStatusData)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(setOfferStatusAction(updatedStatusData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setOfferStatusAction.pending.type,
      setOfferStatusAction.fulfilled.type
    ]);
  });

  it('should dispatch reviews when GET /comments/id', async () => {
    const mockReviews = makeFakeReviews();

    mockAPI
      .onGet(`${APIRoute.Reviews}/${mockOffer.id}`)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(mockOffer.id));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch reviews when POST /comments/id', async () => {
    const {comment, rating} = fakeReviewData;

    mockAPI
      .onPost(`${APIRoute.Reviews}/${mockOffer.id}`, {comment, rating})
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(addReviewAction({id: mockOffer.id, comment: comment, rating: rating}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.fulfilled.type
    ]);
  });
});
