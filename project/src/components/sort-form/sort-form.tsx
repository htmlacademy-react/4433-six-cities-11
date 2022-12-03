import {useState} from 'react';
import {setCurrentSortType, setOffersByCity} from '../../store/offer-process/offer-process';
import {SortType} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentSortType, getOffersByCity} from '../../store/offer-process/selectors';

function SortForm(): JSX.Element {
  const currentSortType = useAppSelector(getCurrentSortType);
  const offersByCity = useAppSelector(getOffersByCity);
  const dispatch = useAppDispatch();

  const [isActive, setActive] = useState<boolean>(false);

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>

      <span tabIndex={0} className="places__sorting-type" onClick={() => setActive(!isActive)}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul
        className={`places__options places__options--custom ${isActive ? 'places__options--opened' : ''}`}
        onClick={() => setActive(!isActive)}
      >
        {Object.values(SortType).map((type) => (
          <li
            className={`places__option ${type === currentSortType ? 'places__option--active' : ''}`}
            key={type}
            tabIndex={0}
            onClick={() => {
              dispatch(setCurrentSortType(type));
              dispatch(setOffersByCity(offersByCity));
            }}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortForm;
