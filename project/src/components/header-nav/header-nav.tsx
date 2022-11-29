import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks';
import { getUser } from '../../services/user-data';

function HeaderNav(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = getUser();

  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return(
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to="/">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">{user?.email}</span>
              <span className="header__favorite-count">3</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
              to='/'
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNav;
