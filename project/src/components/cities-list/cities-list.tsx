import {MouseEvent} from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setCity } from '../../store/action';

type Props = {
  cities: string[];
  currentCity: string;
  onCityClick: (cityName: string) => void;
}

function CitiesList({cities, currentCity, onCityClick}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCity(cities[0]));
  }, [dispatch, cities]);

  function handleCityClick (event: MouseEvent) {
    event.preventDefault();

    if (event.currentTarget.textContent) {
      onCityClick(event.currentTarget.textContent);
    }

    dispatch(setCity(currentCity));
  }

  return(
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <Link
              className="locations__item-link tabs__item"
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
