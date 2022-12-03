import {memo} from 'react';
import {MouseEvent, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {DEFAULT_CITY, SortType} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setCurrentCity, setCurrentSortType, setOffersByCity} from '../../store/offer-process/offer-process';
import {getOffers} from '../../store/offer-process/selectors';

type Props = {
  cities: string[];
  currentCity: string;
}

function CitiesList({cities, currentCity}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);

  useEffect(() => {
    dispatch(setCurrentCity(DEFAULT_CITY));
  }, [dispatch, cities]);

  function handleCityClick (event: MouseEvent, city: string) {
    event.preventDefault();
    dispatch(setCurrentCity(city));
    dispatch(setCurrentSortType(SortType.Default));
    dispatch(setOffersByCity(offers));
  }

  return(
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <Link
              className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`}
              to="#todo"
              onClick={(event) => handleCityClick(event, city)}
            >
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(CitiesList);
