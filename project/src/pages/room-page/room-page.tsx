import {useEffect, FormEvent} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import Header from '../../components/header/header';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import ReviewList from '../../components/review-list/review-list';
import ReviewAdditioForm from '../../components/review-addition-form/review-addition-form';
import {useAppDispatch} from '../../hooks';
import {calcRatingStyle} from '../../util';
import {useAppSelector} from '../../hooks';
import {AuthorizationStatus, AppRoute} from '../../const';
import {fetchReviewAction, fetchOfferInfo, fetchNearOfferAction, fetchOfferStatusAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getCurrentOffer} from '../../store/offer-data/selectors';
import {getReviews, getNearbyOffer} from '../../store/offer-data/selectors';
import {redirectToRoute} from '../../store/action';

function RoomPage(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  const offerId = Number(params.id);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentOffer = useAppSelector(getCurrentOffer);
  const reviewsOfCurrentOffer = useAppSelector(getReviews);
  const nearOffers = useAppSelector(getNearbyOffer);
  const isFavorite = currentOffer ? Number(currentOffer.isFavorite) : null;

  useEffect(() => {
    dispatch(fetchNearOfferAction(offerId));
    dispatch(fetchOfferInfo(offerId));
    dispatch(fetchReviewAction(offerId));
  }, [dispatch, offerId, isFavorite]);

  const handleButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (currentOffer === null) {
      return null;
    }

    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchOfferStatusAction({
        status: Number(!currentOffer.isFavorite),
        id: offerId,
      }));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  if(!currentOffer) {
    return <div>Loading</div>;
  }

  return (
    <div className="page">
      <Helmet>
        <title>Room</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentOffer.images.map((imageSrc) => (
                <div className="property__image-wrapper" key={imageSrc}>
                  <img className="property__image" src={imageSrc} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>

          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium ? <div className="property__mark"><span>Premium</span></div> : ''}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button className={`property__bookmark-button button ${currentOffer.isFavorite ? 'property__bookmark-button--active' : ''}`} type="button" onClick={handleButtonClick}>
                  <svg className="place-card__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">${currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>

              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${calcRatingStyle(currentOffer.rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>

              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>

              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentOffer.goods.map((good: string) => <li className="property__inside-item" key={good}>{good}</li> )}
                </ul>
              </div>

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">{currentOffer.host.name}</span>
                  {currentOffer.host.isPro ? <span className="property__user-status">Pro</span> : ''}
                </div>
                <div className="property__description">
                  <p className="property__text">{currentOffer.description}</p>
                </div>
              </div>

              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsOfCurrentOffer.length}</span></h2>
                <ReviewList reviews={reviewsOfCurrentOffer} />
                { authorizationStatus === AuthorizationStatus.Auth ? <ReviewAdditioForm /> : '' }
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offers={nearOffers} city={currentOffer.city.name} />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OfferList offers={nearOffers} imageWrapperClassName='near-places__image-wrapper' />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;
