import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import CitiesList from './cities-list';
import {CITIES, DEFAULT_CITY} from '../../const';

const history = createMemoryHistory();

// проблема
describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <CitiesList cities={Object.keys(CITIES)} currentCity={DEFAULT_CITY}/>
      </HistoryRouter>
    );

    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
  });
});
