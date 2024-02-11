import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import EditProfileAdmin from '@pages/EditProfileAdmin';

import store from '../../../src/configureStore';
import MockAdmin from '../../fixtures/database/admin.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let admin;

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
    admin = _.cloneDeep(MockAdmin);
  });

  test('Book Container page is rendered', () => {
    const { getByTestId } = render(<EditProfileAdmin />);

    const epaContainer = getByTestId('epa-container');
    expect(epaContainer).toBeInTheDocument();
    expect(epaContainer).toHaveClass('container');

    const epaDecoration = getByTestId('epa-decoration');
    expect(epaDecoration).toBeInTheDocument();
    expect(epaDecoration).toHaveClass('decoration');

    const epaForm = getByTestId('epa-form');
    expect(epaForm).toBeInTheDocument();
    expect(epaForm).toHaveClass('form');

    const epaImage = getByTestId('epa-image');
    expect(epaImage).toBeInTheDocument();
    expect(epaImage).toHaveClass('image');

    const epaMainWrapperNameEmail = getByTestId('epa-main-wrapper-name-email');
    expect(epaMainWrapperNameEmail).toBeInTheDocument();
    expect(epaMainWrapperNameEmail).toHaveClass('main-wrapper');

    const epaWrapperName = getByTestId('epa-wrapper-name');
    expect(epaWrapperName).toBeInTheDocument();
    expect(epaWrapperName).toHaveClass('wrapper');

    const epaWrapperEmail = getByTestId('epa-wrapper-email');
    expect(epaWrapperEmail).toBeInTheDocument();
    expect(epaWrapperEmail).toHaveClass('wrapper');

    const epaMainWrapperPhoneAddress = getByTestId('epa-main-wrapper-phone-address');
    expect(epaMainWrapperPhoneAddress).toBeInTheDocument();
    expect(epaMainWrapperPhoneAddress).toHaveClass('main-wrapper');

    const epaWrapperPhone = getByTestId('epa-wrapper-phone');
    expect(epaWrapperPhone).toBeInTheDocument();
    expect(epaWrapperPhone).toHaveClass('wrapper');

    const epaWrapperAddress = getByTestId('epa-wrapper-address');
    expect(epaWrapperAddress).toBeInTheDocument();
    expect(epaWrapperAddress).toHaveClass('wrapper');

    const epaWrapperPassword = getByTestId('epa-wrapper-password');
    expect(epaWrapperPassword).toBeInTheDocument();
    expect(epaWrapperPassword).toHaveClass('wrapper');

    const epaButton = getByTestId('epa-button');
    expect(epaButton).toBeInTheDocument();
    expect(epaButton).toHaveClass('button');

    const epaSubmit = getByTestId('epa-submit');
    expect(epaSubmit).toBeInTheDocument();
    expect(epaSubmit).toHaveClass('submit');

    console.log(admin);
  });

  test('Profile Admin FormattedMessage is rendered with correct id', () => {
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
