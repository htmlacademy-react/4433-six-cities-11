import {Link} from 'react-router-dom';
import {AppRoute, MAX_RAITING} from '../../const';
import {OfferItemType} from '../../types/offer';
import {OfferPrice} from '../../types/offer';

type Props = {
  offer: OfferItemType;
};

function OfferItem({offer}: Props): JSX.Element {
  const offerPrice: OfferPrice = offer.price;

  const offerType = offer.isBookmarked ? 'favorites' : 'cities';
  const previewWidth = offer.isBookmarked ? '150' : '260';
  const previewHeight = offer.isBookmarked ? '110' : '200';

  function calcRaitingStyle(raitingValue: number) {
    const raitingWidth = 100 * raitingValue / MAX_RAITING;

    return raitingWidth;
  }

  return(
    <article className={`${offerType}__card place-card`}>
      {offer.isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}

      <div className={`${offerType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Room}/${offer.id}`}>
          <img className="place-card__image" src={offer.src} width={previewWidth} height={previewHeight} alt="Place image" />
        </Link>
      </div>

      <div className={`${offer.isBookmarked ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{offerPrice.currency}{offerPrice.value}</b>
            <span className="place-card__price-text">&#47;&nbsp;{offerPrice.period}</span>
          </div>
          <button className={`place-card__bookmark-button button ${offer.isBookmarked ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">${offer.isBookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calcRaitingStyle(offer.raiting)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${offer.id}`}>{offer.name}</Link>
        </h2>

        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferItem;
