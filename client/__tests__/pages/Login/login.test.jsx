import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import Login from '@pages/Login';

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

describe('Login', () => {
  test('Login Container page is rendered', () => {
    const { getByTestId } = render(<Login />);

    const loginContainer = getByTestId('login-container');
    expect(loginContainer).toBeInTheDocument();
    expect(loginContainer).toHaveClass('container');

    const loginDecoration = getByTestId('login-decoration');
    expect(loginDecoration).toBeInTheDocument();
    expect(loginDecoration).toHaveClass('decoration');

    const loginForm = getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
    expect(loginForm).toHaveClass('form');

    const loginWrapperEmail = getByTestId('login-wrapper-email');
    expect(loginWrapperEmail).toBeInTheDocument();
    expect(loginWrapperEmail).toHaveClass('wrapper');

    const loginInputPassword = getByTestId('login-input-password');
    expect(loginInputPassword).toBeInTheDocument();
    expect(loginInputPassword).toHaveClass('input-password');

    const loginVisibility = getByTestId('login-visibility');
    expect(loginVisibility).toBeInTheDocument();
    expect(loginVisibility).toHaveClass('visibility');

    const loginWrapperPassword = getByTestId('login-wrapper-password');
    expect(loginWrapperPassword).toBeInTheDocument();
    expect(loginWrapperPassword).toHaveClass('wrapper');
  });

  test('Login FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="password" />);
    const password = screen.getByText('Kata Sandi');
    expect(password).toBeInTheDocument();

    render(<FormattedMessage id="email" />);
    const email = screen.getByText('Surel');
    expect(email).toBeInTheDocument();

    render(<FormattedMessage id="login" />);
    const login = screen.getByText('Masuk');
    expect(login).toBeInTheDocument();
  });
});
