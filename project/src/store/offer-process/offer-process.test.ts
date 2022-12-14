import {offerProcess} from './offer-process';
import { DEFAULT_CITY, SortType } from '../../const';

describe('Reducer: offer', () => {
  it('without additional parameters should return initial state', () => {
    expect(offerProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentCity: DEFAULT_CITY,
        sortedOffers: [],
        selectedOfferId: 1,
        currentSortType: SortType.Default,
      });
  });
});
