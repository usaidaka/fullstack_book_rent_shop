import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import RegisterAdmin from '@pages/RegisterAdmin';

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

describe('Register Admin', () => {
  test('Register Admin Container page is rendered', () => {
    const { getByTestId } = render(<RegisterAdmin />);

    const raContainer = getByTestId('ra-container');
    expect(raContainer).toBeInTheDocument();
    expect(raContainer).toHaveClass('container');

    const raDecoration = getByTestId('ra-decoration');
    expect(raDecoration).toBeInTheDocument();
    expect(raDecoration).toHaveClass('decoration');

    const raForm = getByTestId('ra-form');
    expect(raForm).toBeInTheDocument();
    expect(raForm).toHaveClass('form');

    const raMainWrapperNameEmail = getByTestId('ra-main-wrapper-name-email');
    expect(raMainWrapperNameEmail).toBeInTheDocument();
    expect(raMainWrapperNameEmail).toHaveClass('main-wrapper');

    const raWrapperName = getByTestId('ra-wrapper-name');
    expect(raWrapperName).toBeInTheDocument();
    expect(raWrapperName).toHaveClass('wrapper');

    const raWrapperEmail = getByTestId('ra-wrapper-email');
    expect(raWrapperEmail).toBeInTheDocument();
    expect(raWrapperEmail).toHaveClass('wrapper');

    const raMainWrapperPhoneAddress = getByTestId('ra-main-wrapper-phone-address');
    expect(raMainWrapperPhoneAddress).toBeInTheDocument();
    expect(raMainWrapperPhoneAddress).toHaveClass('main-wrapper');

    const raWrapperPhone = getByTestId('ra-wrapper-phone');
    expect(raWrapperPhone).toBeInTheDocument();
    expect(raWrapperPhone).toHaveClass('wrapper');

    const raWrapperAddress = getByTestId('ra-wrapper-address');
    expect(raWrapperAddress).toBeInTheDocument();
    expect(raWrapperAddress).toHaveClass('wrapper');

    const raWrapperPassword = getByTestId('ra-wrapper-password');
    expect(raWrapperPassword).toBeInTheDocument();
    expect(raWrapperPassword).toHaveClass('wrapper');
  });

  test('Register Admin FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="registerAdmin" />);
    const editProfile = screen.getByText('Daftarkan Admin');
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
