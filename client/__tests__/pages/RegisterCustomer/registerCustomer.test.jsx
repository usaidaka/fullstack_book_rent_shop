import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import RegisterCustomer from '@pages/RegisterCustomer';

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

describe('RegisterCustomer', () => {
  test('RegisterCustomer Container page is rendered', () => {
    const { getByTestId } = render(<RegisterCustomer />);

    const rcContainer = getByTestId('rc-container');
    expect(rcContainer).toBeInTheDocument();
    expect(rcContainer).toHaveClass('container');

    const rcDecoration = getByTestId('rc-decoration');
    expect(rcDecoration).toBeInTheDocument();
    expect(rcDecoration).toHaveClass('decoration');

    const rcForm = getByTestId('rc-form');
    expect(rcForm).toBeInTheDocument();
    expect(rcForm).toHaveClass('form');

    const rcMainWrapperNameEmail = getByTestId('rc-main-wrapper-name-email');
    expect(rcMainWrapperNameEmail).toBeInTheDocument();
    expect(rcMainWrapperNameEmail).toHaveClass('main-wrapper');

    const rcWrapperName = getByTestId('rc-wrapper-name');
    expect(rcWrapperName).toBeInTheDocument();
    expect(rcWrapperName).toHaveClass('wrapper');

    const rcWrapperEmail = getByTestId('rc-wrapper-email');
    expect(rcWrapperEmail).toBeInTheDocument();
    expect(rcWrapperEmail).toHaveClass('wrapper');

    const rcMainWrapperPhoneAddress = getByTestId('rc-main-wrapper-phone-address');
    expect(rcMainWrapperPhoneAddress).toBeInTheDocument();
    expect(rcMainWrapperPhoneAddress).toHaveClass('main-wrapper');

    const rcWrapperPhone = getByTestId('rc-wrapper-phone');
    expect(rcWrapperPhone).toBeInTheDocument();
    expect(rcWrapperPhone).toHaveClass('wrapper');

    const rcWrapperAddress = getByTestId('rc-wrapper-address');
    expect(rcWrapperAddress).toBeInTheDocument();
    expect(rcWrapperAddress).toHaveClass('wrapper');

    const rcWrapperPassword = getByTestId('rc-wrapper-password');
    expect(rcWrapperPassword).toBeInTheDocument();
    expect(rcWrapperPassword).toHaveClass('wrapper');
  });

  test('RegisterCustomer FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="registerCustomer" />);
    const editProfile = screen.getByText('Daftarkan Pelanggan');
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

    render(<FormattedMessage id="confirmPassword" />);
    const confirmPassword = screen.getByText('Konfirmasi Sandi');
    expect(confirmPassword).toBeInTheDocument();
  });
});
