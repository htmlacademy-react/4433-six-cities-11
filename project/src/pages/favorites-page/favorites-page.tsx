import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import {Offers, OffersGrouppedByCity} from '../../types/offer';
import Footer from '../../components/footer/footer';
import OfferItem from '../../components/offer-item/offer-item';
import OfferList from '../../components/offer-list/offer-list';

type Props = {
  offersGrouppedByCity: OffersGrouppedByCity;
}

function FavoritesPage({offersGrouppedByCity}: Props): JSX.Element {
  function getOfferElement (offers: OffersGrouppedByCity) {
    const result: string[] = [];

    for(const city in offers){
      result.push(`
        <li className="favorites__locations-items">${city}</li>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={${AppRoute.Room}/${city}}>
                <span>${city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            ${getOfferOfCity(city)}
          </div>
        </li>
      `);
    }

    return result.join('');
  }

  function getOfferOfCity (city: string) {
    const offers: Offers = offersGrouppedByCity[city];

    return <OfferList offers={offers} />;
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
              { getOfferElement(offersGrouppedByCity) }
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
