import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import OfferItem from '../../components/offer-item/offer-item';
import {Offers} from '../../types/offer';

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
                        <a className="locations__item-link" href="#todo">
                          <span>{offer.city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferItem offer={offer} />
                    </div>
                  </li>
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
