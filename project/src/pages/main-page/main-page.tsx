import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import OfferList from '../../components/offer-list/offer-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import {SortType, CITIES} from '../../const';
import CitiesList from '../../components/cities-list/cities-list';
import SortForm from '../../components/sort-form/sort-form';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getOffers} from '../../store/offer-data/selectors';
import {setOffersByCity, setSortedOffers} from '../../store/offer-process/offer-process';
import {getCurrentCity, getSortedOffers, getCurrentSortType, getOffersByCity} from '../../store/offer-process/selectors';

const CITIES_LIST = Object.keys(CITIES);

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);

  const currentCity = useAppSelector(getCurrentCity);
  const offersByCity = useAppSelector(getOffersByCity);

  const currentSortType = useAppSelector(getCurrentSortType);
  const sortedOffers = useAppSelector(getSortedOffers);

  useEffect(() => {
    dispatch(setOffersByCity(offers));
    dispatch(setSortedOffers(sortedOffers));
  }, [dispatch, offers, sortedOffers, currentCity]);

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
          <div className="cities__places-container container">

            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">{offersByCity.length} places to stay in {currentCity}</b>

              <SortForm />

              <div className="cities__places-list places__list tabs__content">
                <OfferList offers={currentSortType === SortType.Default ? offersByCity : sortedOffers } />
              </div>
            </section>

            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offersByCity} city={currentCity} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
