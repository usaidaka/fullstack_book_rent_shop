import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';
import Customer from '@pages/Customer';

import store from '../../../src/configureStore';
import MockCustomer from '../../fixtures/database/book.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let customers;

const render = (component) =>
  RtlRender(
    <Provider store={store}>
      <Language>
        <MemoryRouter>{component}</MemoryRouter>
      </Language>
    </Provider>
  );

describe('Customer', () => {
  beforeEach(() => {
    customers = _.cloneDeep(MockCustomer);
  });

  test('Customer Container is rendered', () => {
    const { getByTestId } = render(<Customer />);

    const customerContainer = getByTestId('customer-container');
    expect(customerContainer).toBeInTheDocument();
    expect(customerContainer).toHaveClass('container');

    const customerHeader = getByTestId('customer-header');
    expect(customerHeader).toBeInTheDocument();
    expect(customerHeader).toHaveClass('header');

    const customerCardContainer = getByTestId('customer-card-container');
    expect(customerCardContainer).toBeInTheDocument();
    expect(customerCardContainer).toHaveClass('card-container');
  });

  test('Book FormattedMessage is rendered with correct id', () => {
    render(<FormattedMessage id="customer" />);
    const customerMessage = screen.getByText('Pelanggan');
    expect(customerMessage).toBeInTheDocument();

    render(<FormattedMessage id="registerCustomer" />);
    const registerCustomer = screen.getByText('Daftarkan Pelanggan');
    expect(registerCustomer).toBeInTheDocument();

    render(<FormattedMessage id="emptyCustomer" />);
    const emptyCustomer = screen.getByText('Customer Masih Kosong');
    expect(emptyCustomer).toBeInTheDocument();

    render(<FormattedMessage id="editUser" />);
    const editUser = screen.getByText('Sunting Pengguna');
    expect(editUser).toBeInTheDocument();

    render(<FormattedMessage id="customerLending" />);
    const customerLending = screen.getByText('Peminjaman Pelanggan');
    expect(customerLending).toBeInTheDocument();
  });

  test('renders book list correctly', () => {
    const customersEmpty = [];
    render(<Customer customers={customersEmpty} />);
    expect(screen.queryByText('Customer Masih Kosong')).toBeInTheDocument();

    console.log(customers);

    // render(<Customer customers={customers} token={token} />);
    // const adminCards = screen.getAllByTestId('admin-card');
    // expect(adminCards).toHaveLength(customers.length);

    // customers.forEach((book) => {
    //   expect(screen.getByText(book.title)).toBeInTheDocument();
    //   expect(screen.getByText(book.author)).toBeInTheDocument();
    //   expect(screen.getByText(book.idCategory)).toBeInTheDocument();
    //   expect(screen.getByText(book.synopsis)).toBeInTheDocument();
    //   expect(screen.getByText(book.publishAt)).toBeInTheDocument();

    //   const bookImage = screen.getByAltText(`${book.name}'s image`);
    //   expect(bookImage).toHaveAttribute('src', `${config.api.image_customer}${book.image}`);
    // });
  });

  test('clicking on admin toggle opens menu', () => {
    // render(<Customer customers={customers} token={token} />);
    // fireEvent.click(screen.getByTestId('admin-toggle'));
    // expect(screen.getByTestId('admin-menu')).toBeInTheDocument();
  });
});
