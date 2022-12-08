import {memo} from 'react';
import {MouseEvent, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {DEFAULT_CITY, SortType} from '../../const';
import {useAppDispatch} from '../../hooks';
import {setCurrentCity, setCurrentSortType} from '../../store/offer-process/offer-process';

type Props = {
  cities: string[];
  currentCity: string;
}

function CitiesList({cities, currentCity}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentCity(DEFAULT_CITY));
  }, [dispatch, cities]);

  function handleCityClick (event: MouseEvent, city: string) {
    event.preventDefault();
    dispatch(setCurrentCity(city));
    dispatch(setCurrentSortType(SortType.Default));
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
