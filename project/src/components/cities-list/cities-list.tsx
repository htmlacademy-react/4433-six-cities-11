import {MouseEvent} from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setCity } from '../../store/action';

type Props = {
  cities: string[];
  currentCity: string;
}

function CitiesList({cities, currentCity}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCity(cities[0]));
  }, [dispatch, cities]);

  function handleCityClick (event: MouseEvent) {
    event.preventDefault();

    if (event.currentTarget.textContent) {
      dispatch(setCity(event.currentTarget.textContent));
    }
  }

  return(
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <Link
              className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''}`}
              to="#todo"
              onClick={handleCityClick}
            >
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CitiesList;
