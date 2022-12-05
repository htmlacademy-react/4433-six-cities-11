import {FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {calcRatingStyle} from '../../util';
import {Offer} from '../../types/offer';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {redirectToRoute} from '../../store/action';
import {setSelectedOffer} from '../../store/offer-process/offer-process';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {fetchOfferStatusAction} from '../../store/api-actions';
import {getSelectedOfferId} from '../../store/offer-process/selectors';

type Props = {
  offer: Offer;
  className?: string;
  imageWrapperClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
};

function OfferItem({offer, className = 'cities__card', imageWrapperClassName = 'cities__image-wrapper', imageWidth = 260, imageHeight = 200}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedOfferId = useAppSelector(getSelectedOfferId);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  function handleHover(id: number) {
    dispatch(setSelectedOffer(id));
  }

  const handleButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchOfferStatusAction({
        status: Number(!offer.isFavorite),
        id: selectedOfferId,
      }));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return(
    <article
      className={`place-card ${className}`}
      onMouseOver={() => handleHover(offer.id)}
      onMouseOut={() => dispatch(setSelectedOffer(0))}
    >
      {offer.isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}

      <div className={`place-card__image-wrapper ${imageWrapperClassName}`}>
        <Link to={`${AppRoute.Room}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={imageWidth} height={imageHeight} alt="Place image" />
        </Link>
      </div>

      <div className={`${offer.isFavorite ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;month</span>
          </div>
          <button className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button" onClick={handleButtonClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">${offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calcRatingStyle(offer.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${offer.id}`}>{offer.title}</Link>
        </h2>

        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferItem;
