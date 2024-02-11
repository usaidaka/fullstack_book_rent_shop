import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import Book from '@pages/Book';

import store from '../../../src/configureStore';
import MockBook from '../../fixtures/database/allBook.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let books;

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
    books = _.cloneDeep(MockBook);
  });

  test('Book Container page is rendered', () => {
    const { getByTestId } = render(<Book />);

    const bookContainer = getByTestId('book-container');
    expect(bookContainer).toBeInTheDocument();
    expect(bookContainer).toHaveClass('container');

    const bookHeader = getByTestId('book-header');
    expect(bookHeader).toBeInTheDocument();
    expect(bookHeader).toHaveClass('header');

    const bookCardContainer = getByTestId('book-card-container');
    expect(bookCardContainer).toBeInTheDocument();
    expect(bookCardContainer).toHaveClass('card-container');

    // const bookCard = getByTestId('book-card');
    // expect(bookCard).toBeInTheDocument();
    // expect(bookCard).toHaveClass('card');

    // const bookImage = getByTestId('book-image');
    // expect(bookImage).toBeInTheDocument();
    // expect(bookImage).toHaveClass('image');

    // const bookData = getByTestId('book-data');
    // expect(bookData).toBeInTheDocument();
    // expect(bookData).toHaveClass('data');

    // const bookDrop = getByTestId('book-drop');
    // expect(bookDrop).toBeInTheDocument();
    // expect(bookDrop).toHaveClass('drop');

    // const bookToolbar = getByTestId('book-toolbar');
    // expect(bookToolbar).toBeInTheDocument();
    // expect(bookToolbar).toHaveClass('toolbar');

    // const bookToggle = getByTestId('book-toggle');
    // expect(bookToggle).toBeInTheDocument();
    // expect(bookToggle).toHaveClass('toggle');

    // const bookMenu = getByTestId('book-menu');
    // expect(bookMenu).toBeInTheDocument();
    // expect(bookMenu).toHaveClass('menu');

    // const bookMenuLang = getByTestId('book-menuLang');
    // expect(bookMenuLang).toBeInTheDocument();
    // expect(bookMenuLang).toHaveClass('menuLang');
  });

  test('Book FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="book" />);
    const bookMessage = screen.getByText('Buku');
    expect(bookMessage).toBeInTheDocument();

    render(<FormattedMessage id="registerBook" />);
    const registerBook = screen.getByText('Daftarkan Buku');
    expect(registerBook).toBeInTheDocument();

    render(<FormattedMessage id="emptyBook" />);
    const emptyBook = screen.getByText('Buku Masih Kosong');
    expect(emptyBook).toBeInTheDocument();

    render(<FormattedMessage id="delete" />);
    const deleteBook = screen.getByText('Hapus');
    expect(deleteBook).toBeInTheDocument();

    render(<FormattedMessage id="editBook" />);
    const editBook = screen.getByText('Sunting Buku');
    expect(editBook).toBeInTheDocument();

    render(<FormattedMessage id="deleteBookConfirmation" />);
    const deleteBookConfirmation = screen.getByText('Apakah anda yakin ingin menghapus buku ini?');
    expect(deleteBookConfirmation).toBeInTheDocument();

    render(<FormattedMessage id="positiveConfirmation" />);
    const positiveConfirmation = screen.getByText('Ya');
    expect(positiveConfirmation).toBeInTheDocument();

    render(<FormattedMessage id="negativeConfirmation" />);
    const negativeConfirmation = screen.getByText('Tidak');
    expect(negativeConfirmation).toBeInTheDocument();
  });

  test('renders book list correctly', () => {
    const emptyBooks = [];
    render(<Book books={emptyBooks} />);
    expect(screen.queryByText('Buku Masih Kosong')).toBeInTheDocument();

    console.log(books);

    // render(<Book books={books} token={token} />);
    // const bookCards = screen.getAllByTestId('book-card');
    // expect(bookCards).toHaveLength(books.length);

    // books.forEach((book) => {
    //   expect(screen.getByText(book.title)).toBeInTheDocument();
    //   expect(screen.getByText(book.author)).toBeInTheDocument();
    //   expect(screen.getByText(book.idCategory)).toBeInTheDocument();
    //   expect(screen.getByText(book.synopsis)).toBeInTheDocument();
    //   expect(screen.getByText(book.publishAt)).toBeInTheDocument();

    //   const bookImage = screen.getByAltText(`${book.name}'s image`);
    //   expect(bookImage).toHaveAttribute('src', `${config.api.image_book}${book.image}`);
    // });
  });

  test('clicking on book toggle opens menu', () => {
    // render(<Book books={books} />);
    // fireEvent.click(screen.getByTestId('book-toggle'));
    // expect(screen.getByTestId('book-menu')).toBeInTheDocument();
  });
});
