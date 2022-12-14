
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';

import HistoryRouter from '../history-route/history-route';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly footer', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute('alt', '6 cities logo');
  });
});
