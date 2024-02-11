import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import DeleteLending from '@pages/DeleteLending';

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

describe('Delete Lending', () => {
  beforeEach(() => {
    allLending = _.cloneDeep(MockLending);
  });

  test('Delete Lending Container page is rendered', () => {
    const { getByTestId } = render(<DeleteLending />);

    const dlContainer = getByTestId('dl-container');
    expect(dlContainer).toBeInTheDocument();
    expect(dlContainer).toHaveClass('container');

    const dlDecoration = getByTestId('dl-decoration');
    expect(dlDecoration).toBeInTheDocument();
    expect(dlDecoration).toHaveClass('decoration');

    const dlForm = getByTestId('dl-form');
    expect(dlForm).toBeInTheDocument();
    expect(dlForm).toHaveClass('form');

    const dlWrapperEmail = getByTestId('dl-wrapper-email');
    expect(dlWrapperEmail).toBeInTheDocument();
    expect(dlWrapperEmail).toHaveClass('wrapper');

    const dlWrapperBook = getByTestId('dl-wrapper-book');
    expect(dlWrapperBook).toBeInTheDocument();
    expect(dlWrapperBook).toHaveClass('wrapper');

    console.log(allLending);
  });

  test('Delete Lending FormattedMessage is rendered with correct id', () => {
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
