import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
import Dashboard from '@pages/Dashboard';

import store from '../../../src/configureStore';
import MockDashboard from '../../fixtures/database/dashboard.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let dashboard;

const render = (component) =>
  RtlRender(
    <Provider store={store}>
      <Language>
        <MemoryRouter>{component}</MemoryRouter>
      </Language>
    </Provider>
  );

describe('Dashboard', () => {
  beforeEach(() => {
    dashboard = _.cloneDeep(MockDashboard);
  });

  test('Book Container page is rendered', () => {
    const { getByTestId } = render(<Dashboard />);

    const dashboardMainContainer = getByTestId('dashboard-main-container');
    expect(dashboardMainContainer).toBeInTheDocument();
    expect(dashboardMainContainer).toHaveClass('main-container');

    const dashboardContainer = getByTestId('dashboard-container');
    expect(dashboardContainer).toBeInTheDocument();
    expect(dashboardContainer).toHaveClass('container');

    const dashboardCardCustomer = getByTestId('dashboard-card-customer');
    expect(dashboardCardCustomer).toBeInTheDocument();
    expect(dashboardCardCustomer).toHaveClass('card');

    const dashboardCardBook = getByTestId('dashboard-card-book');
    expect(dashboardCardBook).toBeInTheDocument();
    expect(dashboardCardBook).toHaveClass('card');

    const dashboardCardLending = getByTestId('dashboard-card-lending');
    expect(dashboardCardLending).toBeInTheDocument();
    expect(dashboardCardLending).toHaveClass('card');

    const dashboardCardCategory = getByTestId('dashboard-card-category');
    expect(dashboardCardCategory).toBeInTheDocument();
    expect(dashboardCardCategory).toHaveClass('card');

    console.log(dashboard);
  });

  test('Dashboard FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="hi" />);
    const dashboardMessage = screen.getByText('Hai! Semangat beraktivitas,');
    expect(dashboardMessage).toBeInTheDocument();
  });
});
