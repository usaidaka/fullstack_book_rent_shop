import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import RegisterBook from '@pages/RegisterBook';

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

describe('RegisterBook', () => {
  test('RegisterBook Container page is rendered', () => {
    const { getByTestId } = render(<RegisterBook />);

    const rbMainContainer = getByTestId('rb-main-container');
    expect(rbMainContainer).toBeInTheDocument();
    expect(rbMainContainer).toHaveClass('main-container');
  });

  test('RegisterBook FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="registerBook" />);
    const editProfile = screen.getByText('Daftarkan Buku');
    expect(editProfile).toBeInTheDocument();

    render(<FormattedMessage id="name" />);
    const name = screen.getByText('Nama');
    expect(name).toBeInTheDocument();

    render(<FormattedMessage id="email" />);
    const email = screen.getByText('Surel');
    expect(email).toBeInTheDocument();

    render(<FormattedMessage id="phone" />);
    const phone = screen.getByText('Telepon');
    expect(phone).toBeInTheDocument();

    render(<FormattedMessage id="address" />);
    const address = screen.getByText('Alamat');
    expect(address).toBeInTheDocument();

    render(<FormattedMessage id="password" />);
    const password = screen.getByText('Kata Sandi');
    expect(password).toBeInTheDocument();
  });
});
