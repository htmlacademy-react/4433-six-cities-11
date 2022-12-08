import {Helmet} from 'react-helmet-async';
import OfferList from '../../components/offer-list/offer-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import {CITIES} from '../../const';
import CitiesList from '../../components/cities-list/cities-list';
import SortForm from '../../components/sort-form/sort-form';
import {useAppSelector} from '../../hooks';
import {getCurrentCity, getOffers} from '../../store/offer-process/selectors';

const CITIES_LIST = Object.keys(CITIES);

function MainPage(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const currentCity = useAppSelector(getCurrentCity);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Main</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <CitiesList currentCity={currentCity} cities={CITIES_LIST} />
        </div>

        <div className="cities">
          { (offers.length > 0) ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {currentCity}</b>
                <SortForm />
                <div className="cities__places-list places__list tabs__content">
                  <OfferList offers={offers} />
                </div>
              </section>

              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={offers} city={currentCity} />
                </section>
              </div>
            </div>
            :
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div> }
        </div>
      </main>
    </div>
  );
}

export default MainPage;
