import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import RoomPage from '../../pages/room-page/room-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import FavoritePrivateRoute from '../favorite-private-route/favorite-private-route';
import LoginPrivateRoute from '../login-private-route/login-private-route';
import Loading from '../loading/loading';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import {getAuthorizationStatus, getAuthCheckedStatus} from '../../store/user-process/selectors';
import {getOffersLoadingStatus} from '../../store/offer-data/selectors';

function App(): JSX.Element {
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked || isOffersLoading) {
    return <Loading />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <FavoritePrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage />
              </FavoritePrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Room}/:id`}
            element={<RoomPage />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <LoginPrivateRoute authorizationStatus={authorizationStatus}>
                <LoginPage />
              </LoginPrivateRoute>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
