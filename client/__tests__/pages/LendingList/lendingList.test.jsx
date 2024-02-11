import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import LendingList from '@pages/LendingList';

import store from '../../../src/configureStore';
import MockLending from '../../fixtures/database/allLending.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let lendingList;

const render = (component) =>
  RtlRender(
    <Provider store={store}>
      <Language>
        <MemoryRouter>{component}</MemoryRouter>
      </Language>
    </Provider>
  );

describe('Book', () => {
  beforeEach(() => {
    lendingList = _.cloneDeep(MockLending);
  });

  test('Book Container page is rendered', () => {
    const { getByTestId } = render(<LendingList />);

    const lendingContainer = getByTestId('lending-container');
    expect(lendingContainer).toBeInTheDocument();
    expect(lendingContainer).toHaveClass('container');

    const lendingHeader = getByTestId('lending-header');
    expect(lendingHeader).toBeInTheDocument();
    expect(lendingHeader).toHaveClass('header');

    const lendingCard = getByTestId('lending-card');
    expect(lendingCard).toBeInTheDocument();
    expect(lendingCard).toHaveClass('card');

    const lendingMainContainer = getByTestId('lending-mainContainer');
    expect(lendingMainContainer).toBeInTheDocument();
    expect(lendingMainContainer).toHaveClass('mainContainer');

    console.log(lendingList);
  });

  test('Book FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="lendingList" />);
    const lendingListMessage = screen.getByText('Peminjaman');
    expect(lendingListMessage).toBeInTheDocument();

    render(<FormattedMessage id="createLending" />);
    const createLending = screen.getByText('Buat Peminjaman');
    expect(createLending).toBeInTheDocument();
  });
});
