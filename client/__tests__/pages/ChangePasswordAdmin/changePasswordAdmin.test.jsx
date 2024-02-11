import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';

import ChangePasswordAdmin from '@pages/ChangePasswordAdmin';

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
    const { getByTestId } = render(<ChangePasswordAdmin />);

    const cpaContainer = getByTestId('cpa-container');
    expect(cpaContainer).toBeInTheDocument();
    expect(cpaContainer).toHaveClass('container');

    const cpaDecoration = getByTestId('cpa-decoration');
    expect(cpaDecoration).toBeInTheDocument();
    expect(cpaDecoration).toHaveClass('decoration');

    const cpaForm = getByTestId('cpa-form');
    expect(cpaForm).toBeInTheDocument();
    expect(cpaForm).toHaveClass('form');

    const cpaWrapperPassword = getByTestId('cpa-wrapper-password');
    expect(cpaWrapperPassword).toBeInTheDocument();
    expect(cpaWrapperPassword).toHaveClass('wrapper');

    const cpaWrapperConfirmPassword = getByTestId('cpa-wrapper-confirm-password');
    expect(cpaWrapperConfirmPassword).toBeInTheDocument();
    expect(cpaWrapperConfirmPassword).toHaveClass('wrapper');
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
