import React, {MouseEvent} from 'react';
import {Link} from 'react-router-dom';

type Props = {
  cities: string[];
  onCityClick: (cityName: string) => void;
}

function CitiesList({cities, onCityClick}: Props): JSX.Element {
  function handleCityClick (event: MouseEvent) {
    event.preventDefault();

    if (event.currentTarget.textContent) {
      onCityClick(event.currentTarget.textContent);
    }
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
