import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {Offer} from '../../types/offer';
import OfferList from '../../components/offer-list/offer-list';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOffersByCity } from '../../store/action';

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

              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span tabIndex={0} className="places__sorting-type">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened" style={{'display': 'none'}}>
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>

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
