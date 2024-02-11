import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import RegisterLending from '@pages/RegisterLending';

import store from '../../../src/configureStore';
import MockLending from '../../fixtures/database/allLending.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let allLending;

const render = (component) =>
  RtlRender(
    <Provider store={store}>
      <Language>
        <MemoryRouter>{component}</MemoryRouter>
      </Language>
    </Provider>
  );

describe('Register Lending', () => {
  beforeEach(() => {
    allLending = _.cloneDeep(MockLending);
  });

  test('Register Lending Container page is rendered', () => {
    const { getByTestId } = render(<RegisterLending />);

    const rlContainer = getByTestId('rl-container');
    expect(rlContainer).toBeInTheDocument();
    expect(rlContainer).toHaveClass('container');

    const rlDecoration = getByTestId('rl-decoration');
    expect(rlDecoration).toBeInTheDocument();
    expect(rlDecoration).toHaveClass('decoration');

    const rlForm = getByTestId('rl-form');
    expect(rlForm).toBeInTheDocument();
    expect(rlForm).toHaveClass('form');

    const rlWrapperEmail = getByTestId('rl-wrapper-email');
    expect(rlWrapperEmail).toBeInTheDocument();
    expect(rlWrapperEmail).toHaveClass('wrapper');

    const rlWrapperBook = getByTestId('rl-wrapper-book');
    expect(rlWrapperBook).toBeInTheDocument();
    expect(rlWrapperBook).toHaveClass('wrapper');

    console.log(allLending);
  });

  test('Register Lending FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="createLending" />);
    const createLending = screen.getByText('Buat Peminjaman');
    expect(createLending).toBeInTheDocument();

    render(<FormattedMessage id="deleteLending" />);
    const deleteLending = screen.getByText('Hapus Sewaan');
    expect(deleteLending).toBeInTheDocument();

    render(<FormattedMessage id="email" />);
    const email = screen.getByText('Surel');
    expect(email).toBeInTheDocument();

    render(<FormattedMessage id="book" />);
    const book = screen.getByText('Buku');
    expect(book).toBeInTheDocument();
  });
});
