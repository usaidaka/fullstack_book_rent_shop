import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import EditUser from '@pages/EditUser';

import store from '../../../src/configureStore';
import MockUser from '../../fixtures/database/super.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let user;

const render = (component) =>
  RtlRender(
    <Provider store={store}>
      <Language>
        <MemoryRouter>{component}</MemoryRouter>
      </Language>
    </Provider>
  );

describe('Edit User', () => {
  beforeEach(() => {
    user = _.cloneDeep(MockUser);
  });

  test('Edit User Container page is rendered', () => {
    const { getByTestId } = render(<EditUser />);

    console.log(user);

    const euContainer = getByTestId('eu-container');
    expect(euContainer).toBeInTheDocument();
    expect(euContainer).toHaveClass('container');

    const euDecoration = getByTestId('eu-decoration');
    expect(euDecoration).toBeInTheDocument();
    expect(euDecoration).toHaveClass('decoration');

    const euForm = getByTestId('eu-form');
    expect(euForm).toBeInTheDocument();
    expect(euForm).toHaveClass('form');

    const euImage = getByTestId('eu-image');
    expect(euImage).toBeInTheDocument();
    expect(euImage).toHaveClass('image');

    const euMainWrapperNameEmail = getByTestId('eu-main-wrapper-name-email');
    expect(euMainWrapperNameEmail).toBeInTheDocument();
    expect(euMainWrapperNameEmail).toHaveClass('main-wrapper');

    const euWrapperName = getByTestId('eu-wrapper-name');
    expect(euWrapperName).toBeInTheDocument();
    expect(euWrapperName).toHaveClass('wrapper');

    const euWrapperEmail = getByTestId('eu-wrapper-email');
    expect(euWrapperEmail).toBeInTheDocument();
    expect(euWrapperEmail).toHaveClass('wrapper');

    const euMainWrapperPhoneAddress = getByTestId('eu-main-wrapper-phone-address');
    expect(euMainWrapperPhoneAddress).toBeInTheDocument();
    expect(euMainWrapperPhoneAddress).toHaveClass('main-wrapper');

    const euWrapperPhone = getByTestId('eu-wrapper-phone');
    expect(euWrapperPhone).toBeInTheDocument();
    expect(euWrapperPhone).toHaveClass('wrapper');

    const euWrapperAddress = getByTestId('eu-wrapper-address');
    expect(euWrapperAddress).toBeInTheDocument();
    expect(euWrapperAddress).toHaveClass('wrapper');

    const euWrapperPassword = getByTestId('eu-wrapper-password');
    expect(euWrapperPassword).toBeInTheDocument();
    expect(euWrapperPassword).toHaveClass('wrapper');
  });

  test('Edit User FormattedMessage is rendered with correct id', () => {
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
