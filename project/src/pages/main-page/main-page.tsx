import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {Offer} from '../../types/offer';
import OfferList from '../../components/offer-list/offer-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortForm from '../../components/sort-form/sort-form';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {setOffersByCity} from '../../store/action';

type Props = {
  cities: string[];
  offers: Offer[];
}

function MainPage({cities, offers}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.currentCity);
  const offersByCity = useAppSelector((state) => state.offers);

  useEffect(() => {
    dispatch(setOffersByCity(currentCity));
  }, [dispatch, offers, currentCity]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Main</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <CitiesList currentCity={currentCity} cities={cities} />
        </div>

        <div className="cities">
          <div className="cities__places-container container">

            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">{offersByCity.length} places to stay in {currentCity}</b>

              <SortForm />

              <div className="cities__places-list places__list tabs__content">
                <OfferList offers={offersByCity} />
              </div>
            </section>

            <div className="cities__right-section">
              <section className="cities__map map">
                <Map />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
