import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import CustomerLending from '@pages/CustomerLending';

import store from '../../../src/configureStore';
import MockLending from '../../fixtures/database/lending.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let customerLending;

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
    customerLending = _.cloneDeep(MockLending);
  });

  test('Book Container page is rendered', () => {
    const { getByTestId } = render(<CustomerLending />);

    const clContainer = getByTestId('cl-container');
    expect(clContainer).toBeInTheDocument();
    expect(clContainer).toHaveClass('container');

    const clHeader = getByTestId('cl-header');
    expect(clHeader).toBeInTheDocument();
    expect(clHeader).toHaveClass('header');

    const clCardContainer = getByTestId('cl-card-container');
    expect(clCardContainer).toBeInTheDocument();
    expect(clCardContainer).toHaveClass('cl-container');

    // const clCard = getByTestId('cl-card');
    // expect(clCard).toBeInTheDocument();
    // expect(clCard).toHaveClass('card');

    // const clImageWrapper = getByTestId('cl-image-wrapper');
    // expect(clImageWrapper).toBeInTheDocument();
    // expect(clImageWrapper).toHaveClass('image-wrapper');

    // const clDesc = getByTestId('cl-desc');
    // expect(clDesc).toBeInTheDocument();
    // expect(clDesc).toHaveClass('desc');

    // const clBookTitle = getByTestId('cl-book-title');
    // expect(clBookTitle).toBeInTheDocument();

    // const clInfo = getByTestId('cl-info');
    // expect(clInfo).toBeInTheDocument();

    // const clCategoryName = getByTestId('cl-category-name');
    // expect(clCategoryName).toBeInTheDocument();

    // const clDivider = getByTestId('cl-divider');
    // expect(clDivider).toBeInTheDocument();

    // const clBookPublishAt = getByTestId('cl-book-publishAt');
    // expect(clBookPublishAt).toBeInTheDocument();

    // const clTime = getByTestId('cl-time');
    // expect(clTime).toBeInTheDocument();
    // expect(clTime).toHaveClass('time');

    // const clTimeWrapperCreatedAt = getByTestId('cl-time-wrapper-createdAt');
    // expect(clTimeWrapperCreatedAt).toBeInTheDocument();

    // const clTimeWrapperDeletedAt = getByTestId('cl-time-wrapper-deletedAt');
    // expect(clTimeWrapperDeletedAt).toBeInTheDocument();

    // const clDeletedAt = getByTestId('cl-deletedAt');
    // expect(clDeletedAt).toBeInTheDocument();
  });

  test('Book FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="customerLending" />);
    const customerLendingMessage = screen.getByText('Peminjaman Pelanggan');
    expect(customerLendingMessage).toBeInTheDocument();

    render(<FormattedMessage id="emptyBook" />);
    const emptyBook = screen.getByText('Buku Masih Kosong');
    expect(emptyBook).toBeInTheDocument();

    render(<FormattedMessage id="lendDate" />);
    const lendDate = screen.getByText('Peminjaman');
    expect(lendDate).toBeInTheDocument();

    render(<FormattedMessage id="returnDate" />);
    const returnDate = screen.getByText('Pengembalian');
    expect(returnDate).toBeInTheDocument();
  });

  test('renders book list correctly', () => {
    const emptyCustomerLending = [];
    render(<CustomerLending customerLending={emptyCustomerLending} />);
    expect(screen.queryByText('Buku Masih Kosong')).toBeInTheDocument();

    console.log(customerLending);

    // render(<CustomerLending customerLending={customerLending} />);
    // const clCard = screen.getAllByTestId('cl-card-container');
    // expect(clCard).toHaveLength(customers.length);

    // customers.forEach((customer) => {
    //   expect(screen.getByText(customer.title)).toBeInTheDocument();
    //   expect(screen.getByText(customer.author)).toBeInTheDocument();
    //   expect(screen.getByText(customer.idCategory)).toBeInTheDocument();
    //   expect(screen.getByText(customer.synopsis)).toBeInTheDocument();
    //   expect(screen.getByText(customer.publishAt)).toBeInTheDocument();

    //   const customerImage = screen.getByAltText(`${customer.name}'s image`);
    //   expect(customerImage).toHaveAttribute('src', `${config.api.image_customer}${customer.image}`);
    // });
  });

  test('clicking on admin toggle opens menu', () => {
    // render(<Book books={books} token={token} />);
    // fireEvent.click(screen.getByTestId('admin-toggle'));
    // expect(screen.getByTestId('admin-menu')).toBeInTheDocument();
  });
});
