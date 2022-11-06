import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import {Offers} from '../../types/offer';
import Footer from '../../components/footer/footer';
import OfferItem from '../../components/offer-item/offer-item';

type Props = {
  offers: Offers;
}

function FavoritesPage({offers}: Props): JSX.Element {
  function getFavoritesOffersArray() {
    const bookmatedOffersArray: Offers = [];

    offers.map((offer) => {
      if (offer.isBookmarked) {
        bookmatedOffersArray.push(offer);
      }

      return bookmatedOffersArray;
    });

    return bookmatedOffersArray;
  }

  return (
    <div className="page">
      <Helmet>
        <title>Favorites Rooms</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {getFavoritesOffersArray().map((offer) => <li className="favorites__locations-items" key={offer.id}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={`${AppRoute.Room}/${offer.id}`}>
                          <span>{offer.city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferItem
                        offer={offer}
                        className="favorites__card"
                        imageWrapperClassName="favorites__image-wrapper"
                        imageWidth={150}
                        imageHeight={110}
                      />
                    </div>
                  </li>
              )}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
