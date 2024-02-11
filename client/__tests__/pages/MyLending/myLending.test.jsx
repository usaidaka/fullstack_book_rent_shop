import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import MyLending from '@pages/MyLending';

import store from '../../../src/configureStore';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  ...jest.requireActual('react-router-dom'),
}));

const render = (component) =>
  RtlRender(
    <Provider store={store}>
      <Language>
        <MemoryRouter>{component}</MemoryRouter>
      </Language>
    </Provider>
  );

describe('MyLending', () => {
  test('MyLending Container page is rendered', () => {
    const { getByTestId } = render(<MyLending />);

    const myLendingContainer = getByTestId('myLending-container');
    expect(myLendingContainer).toBeInTheDocument();
    expect(myLendingContainer).toHaveClass('container');
  });

  test('MyLending FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="myLending" />);
    const myLending = screen.getByText('Pinjaman Saya');
    expect(myLending).toBeInTheDocument();

    render(<FormattedMessage id="emptyBook" />);
    const emptyBook = screen.getByText('Buku Masih Kosong');
    expect(emptyBook).toBeInTheDocument();

    render(<FormattedMessage id="lendDate" />);
    const lendDate = screen.getByText('Peminjaman');
    expect(lendDate).toBeInTheDocument();

    render(<FormattedMessage id="returnDate" />);
    const returnDate = screen.getByText('Pengembalian');
    expect(returnDate).toBeInTheDocument();
  });
});
