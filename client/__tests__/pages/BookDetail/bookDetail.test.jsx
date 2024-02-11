import _ from 'lodash';
import { render as RtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import BookDetail from '@pages/BookDetail';

import store from '../../../src/configureStore';
import MockBook from '../../fixtures/database/book.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let book;

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
    book = _.cloneDeep(MockBook);
  });

  test('Book Container page is rendered', () => {
    const { getByTestId } = render(<BookDetail bookDetail={book} />);

    const bookContainer = getByTestId('book-container');
    expect(bookContainer).toBeInTheDocument();
    expect(bookContainer).toHaveClass('container');

    const bookMainWrapper = getByTestId('book-main-wrapper');
    expect(bookMainWrapper).toBeInTheDocument();
    expect(bookMainWrapper).toHaveClass('main-wrapper');

    const bookWrapper = getByTestId('book-wrapper');
    expect(bookWrapper).toBeInTheDocument();
    expect(bookWrapper).toHaveClass('wrapper');

    const bookImage = getByTestId('book-image');
    expect(bookImage).toBeInTheDocument();
    expect(bookImage).toHaveClass('image');

    const bookSrc = getByTestId('book-src');
    expect(bookSrc).toBeInTheDocument();

    const bookDesc = getByTestId('book-desc');
    expect(bookDesc).toBeInTheDocument();
    expect(bookDesc).toHaveClass('desc');

    const bookTitle = getByTestId('book-title');
    expect(bookTitle).toBeInTheDocument();

    const bookMiniInfo = getByTestId('book-mini-info');
    expect(bookMiniInfo).toBeInTheDocument();
    expect(bookMiniInfo).toHaveClass('mini-info');

    const bookCategory = getByTestId('book-category');
    expect(bookCategory).toBeInTheDocument();

    const bookDivider = getByTestId('book-divider');
    expect(bookDivider).toBeInTheDocument();

    const bookPublishAt = getByTestId('book-publishAt');
    expect(bookPublishAt).toBeInTheDocument();

    const bookSynopsis = getByTestId('book-synopsis');
    expect(bookSynopsis).toBeInTheDocument();
  });
});
