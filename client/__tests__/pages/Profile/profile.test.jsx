import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import Profile from '@pages/Profile';

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

describe('Profile', () => {
  test('Profile Container page is rendered', () => {
    const { getByTestId } = render(<Profile />);

    const profileForm = getByTestId('profile-form');
    expect(profileForm).toBeInTheDocument();
    expect(profileForm).toHaveClass('form');

    const profileImage = getByTestId('profile-image');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveClass('image');

    const profileMainWrapperNameEmail = getByTestId('profile-main-wrapper-name-email');
    expect(profileMainWrapperNameEmail).toBeInTheDocument();
    expect(profileMainWrapperNameEmail).toHaveClass('main-wrapper');

    const profileWrapperName = getByTestId('profile-wrapper-name');
    expect(profileWrapperName).toBeInTheDocument();
    expect(profileWrapperName).toHaveClass('wrapper');

    const profileWrapperEmail = getByTestId('profile-wrapper-email');
    expect(profileWrapperEmail).toBeInTheDocument();
    expect(profileWrapperEmail).toHaveClass('wrapper');

    const profileMainWrapperPhoneAddress = getByTestId('profile-main-wrapper-phone-address');
    expect(profileMainWrapperPhoneAddress).toBeInTheDocument();
    expect(profileMainWrapperPhoneAddress).toHaveClass('main-wrapper');

    const profileWrapperPhone = getByTestId('profile-wrapper-phone');
    expect(profileWrapperPhone).toBeInTheDocument();
    expect(profileWrapperPhone).toHaveClass('wrapper');

    const profileWrapperAddress = getByTestId('profile-wrapper-address');
    expect(profileWrapperAddress).toBeInTheDocument();
    expect(profileWrapperAddress).toHaveClass('wrapper');

    const profileWrapperPassword = getByTestId('profile-wrapper-password');
    expect(profileWrapperPassword).toBeInTheDocument();
    expect(profileWrapperPassword).toHaveClass('wrapper');

    const profileButton = getByTestId('profile-button');
    expect(profileButton).toBeInTheDocument();
    expect(profileButton).toHaveClass('button');

    const profileSubmit = getByTestId('profile-submit');
    expect(profileSubmit).toBeInTheDocument();
    expect(profileSubmit).toHaveClass('submit');
  });

  test('Profile FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="editProfile" />);
    const editProfile = screen.getByText('Sunting Profil');
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
