import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import EditBook from '@pages/EditBook';

import store from '../../../src/configureStore';
import MockBook from '../../fixtures/database/book.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  ...jest.requireActual('react-router-dom'),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  ...jest.requireActual('react-hook-form'),
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

describe('Edit Book', () => {
  beforeEach(() => {
    book = _.cloneDeep(MockBook);
  });

  test('Edit Book Container page is rendered', () => {
    const { getByTestId } = render(<EditBook loadingTest={false} />);

    const ebMainContainer = getByTestId('eb-main-container');
    expect(ebMainContainer).toBeInTheDocument();
    expect(ebMainContainer).toHaveClass('main-container');

    const ebDecoration = getByTestId('eb-decoration');
    expect(ebDecoration).toBeInTheDocument();
    expect(ebDecoration).toHaveClass('decoration');

    const ebFormInput = getByTestId('eb-form-input');
    expect(ebFormInput).toBeInTheDocument();
    expect(ebFormInput).toHaveClass('form-input');

    const ebMainWrapperTitleAuthor = getByTestId('eb-main-wrapper-title-author');
    expect(ebMainWrapperTitleAuthor).toBeInTheDocument();
    expect(ebMainWrapperTitleAuthor).toHaveClass('main-wrapper');

    const ebWrapperTitle = getByTestId('eb-wrapper-title');
    expect(ebWrapperTitle).toBeInTheDocument();
    expect(ebWrapperTitle).toHaveClass('wrapper');

    const ebWrapperAuthor = getByTestId('eb-wrapper-author');
    expect(ebWrapperAuthor).toBeInTheDocument();
    expect(ebWrapperAuthor).toHaveClass('wrapper');

    const ebMainWrapperSynopsisCategoryDate = getByTestId('eb-main-wrapper-synopsis-category-date');
    expect(ebMainWrapperSynopsisCategoryDate).toBeInTheDocument();
    expect(ebMainWrapperSynopsisCategoryDate).toHaveClass('main-wrapper');

    const ebWrapperSynopsis = getByTestId('eb-wrapper-synopsis');
    expect(ebWrapperSynopsis).toBeInTheDocument();
    expect(ebWrapperSynopsis).toHaveClass('wrapper');

    const ebFormSelect = getByTestId('eb-form-select');
    expect(ebFormSelect).toBeInTheDocument();
    expect(ebFormSelect).toHaveClass('form-select');

    const ebWrapperSelect = getByTestId('eb-wrapper-select');
    expect(ebWrapperSelect).toBeInTheDocument();
    expect(ebWrapperSelect).toHaveClass('select');

    const ebWrapperDate = getByTestId('eb-wrapper-date');
    expect(ebWrapperDate).toBeInTheDocument();
    expect(ebWrapperDate).toHaveClass('date');

    const ebImage = getByTestId('eb-image');
    expect(ebImage).toBeInTheDocument();
    expect(ebImage).toHaveClass('image');

    console.log(book);
  });

  test('Edit Book FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="editBook" />);
    const editProfile = screen.getByText('Sunting Buku');
    expect(editProfile).toBeInTheDocument();

    render(<FormattedMessage id="title" />);
    const title = screen.getByText('Judul');
    expect(title).toBeInTheDocument();

    render(<FormattedMessage id="author" />);
    const author = screen.getByText('Penulis');
    expect(author).toBeInTheDocument();

    render(<FormattedMessage id="synopsis" />);
    const synopsis = screen.getByText('Sinopsis');
    expect(synopsis).toBeInTheDocument();

    render(<FormattedMessage id="category" />);
    const category = screen.getByText('Kategori');
    expect(category).toBeInTheDocument();

    render(<FormattedMessage id="publishAt" />);
    const publishAt = screen.getByText('Tanggal Penerbitan');
    expect(publishAt).toBeInTheDocument();
  });
});
