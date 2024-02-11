import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import Home from '@pages/Home';

import store from '../../../src/configureStore';
import MockBook from '../../fixtures/database/allBook.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let books;

const render = (component) =>
  RtlRender(
    <Provider store={store}>
      <Language>
        <MemoryRouter>{component}</MemoryRouter>
      </Language>
    </Provider>
  );

describe('Home', () => {
  beforeEach(() => {
    books = _.cloneDeep(MockBook);
  });

  test('Home Container page is rendered', () => {
    const { getByTestId } = render(<Home />);

    const homeContainer = getByTestId('home-container');
    expect(homeContainer).toBeInTheDocument();
    expect(homeContainer).toHaveClass('container');
  });

  test('Home FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="emptyBook" />);
    const bookMessage = screen.getByText('Buku Masih Kosong');
    expect(bookMessage).toBeInTheDocument();
  });
});
