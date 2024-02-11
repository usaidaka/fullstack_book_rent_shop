import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';

import ChangePasswordCustomer from '@pages/ChangePasswordCustomer';

import store from '../../../src/configureStore';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const render = (component) =>
  RtlRender(
    <Provider store={store}>
      <Language>
        <MemoryRouter>{component}</MemoryRouter>
      </Language>
    </Provider>
  );

describe('Change Password Admin', () => {
  test('Change Password Admin Container page is rendered', () => {
    const { getByTestId } = render(<ChangePasswordCustomer />);

    const cpcContainer = getByTestId('cpc-container');
    expect(cpcContainer).toBeInTheDocument();
    expect(cpcContainer).toHaveClass('container');

    const cpcDecoration = getByTestId('cpc-decoration');
    expect(cpcDecoration).toBeInTheDocument();
    expect(cpcDecoration).toHaveClass('decoration');

    const cpcForm = getByTestId('cpc-form');
    expect(cpcForm).toBeInTheDocument();
    expect(cpcForm).toHaveClass('form');

    const cpcWrapperPassword = getByTestId('cpc-wrapper-password');
    expect(cpcWrapperPassword).toBeInTheDocument();
    expect(cpcWrapperPassword).toHaveClass('wrapper');

    const cpcWrapperConfirmPassword = getByTestId('cpc-wrapper-confirm-password');
    expect(cpcWrapperConfirmPassword).toBeInTheDocument();
    expect(cpcWrapperConfirmPassword).toHaveClass('wrapper');
  });

  test('Change Passsword Admin FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="changePassword" />);
    const bookMessage = screen.getByText('Ganti Kata Sandi');
    expect(bookMessage).toBeInTheDocument();

    render(<FormattedMessage id="newPassword" />);
    const registerBook = screen.getByText('Password Baru');
    expect(registerBook).toBeInTheDocument();

    render(<FormattedMessage id="confirmPassword" />);
    const emptyCustomer = screen.getByText('Konfirmasi Sandi');
    expect(emptyCustomer).toBeInTheDocument();
  });
});
