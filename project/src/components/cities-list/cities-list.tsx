import {MouseEvent, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {DEFAULT_CITY, SortType} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setCity, setCurrentSortType} from '../../store/action';

type Props = {
  cities: string[];
  currentCity: string;
}

function CitiesList({cities, currentCity}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const offersByCity = useAppSelector((state) => state.offersByCity);

  useEffect(() => {
    dispatch(setCity(DEFAULT_CITY));
  }, [dispatch, cities]);

  function handleCityClick (event: MouseEvent, city: string) {
    event.preventDefault();
    dispatch(setCity(city));
    dispatch(setCurrentSortType(SortType.Default, offersByCity));
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

export default CitiesList;
