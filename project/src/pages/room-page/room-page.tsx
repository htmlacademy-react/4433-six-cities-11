import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import Header from '../../components/header/header';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import ReviewList from '../../components/review-list/review-list';
import ReviewAdditioForm from '../../components/review-addition-form/review-addition-form';
import {nearsOffers} from '../../mocks/offers';
import {useAppDispatch} from '../../hooks';
import {calcRatingStyle} from '../../util';
import {useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const';
import {loadReviews, loadOffer, fetchOfferAction} from '../../store/api-actions';

function RoomPage(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offerId = Number(params.id);
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const reviewsOfCurrentOffer = useAppSelector((state) => state.reviews);
  const nearByOffer = useAppSelector((state) => state.nearByOffer);

  // dispatch(fetchOfferAction(offerId));

  useEffect(() => {
    dispatch(loadOffer(offerId));
    dispatch(loadReviews(offerId));
  }, [dispatch, offerId]);

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
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
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
            <Map />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OfferList offers={nearsOffers} imageWrapperClassName='near-places__image-wrapper' />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;
