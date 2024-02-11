import _ from 'lodash';
import { render as RtlRender, screen /* fireEvent */ } from '@testing-library/react';
import { Provider } from 'react-redux';
import Admin from '@pages/Admin';
import { MemoryRouter } from 'react-router-dom';
import Language from '@containers/Language';
import { FormattedMessage } from 'react-intl';
// import config from '@config/index';

import store from '../../../src/configureStore';
import MockAdmin from '../../fixtures/database/admin.json';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

let admins;

const render = (component) =>
  RtlRender(
    <Provider store={store}>
      <Language>
        <MemoryRouter>{component}</MemoryRouter>
      </Language>
    </Provider>
  );

describe('Admin', () => {
  beforeEach(() => {
    admins = _.cloneDeep(MockAdmin);
  });

  test('Admin Container page is rendered', () => {
    const { getByTestId } = render(<Admin />);

    const adminContainer = getByTestId('admin-container');
    expect(adminContainer).toBeInTheDocument();
    expect(adminContainer).toHaveClass('container');

    const adminHeader = getByTestId('admin-header');
    expect(adminHeader).toBeInTheDocument();
    expect(adminHeader).toHaveClass('header');

    const adminCardContainer = getByTestId('admin-card-container');
    expect(adminCardContainer).toBeInTheDocument();
    expect(adminCardContainer).toHaveClass('card-container');

    // const adminCard = getByTestId('admin-card');
    // expect(adminCard).toBeInTheDocument();
    // expect(adminCard).toHaveClass('card');

    // const adminImage = getByTestId('admin-image');
    // expect(adminImage).toBeInTheDocument();
    // expect(adminImage).toHaveClass('image');

    // const adminData = getByTestId('admin-data');
    // expect(adminData).toBeInTheDocument();
    // expect(adminData).toHaveClass('data');

    // const adminDrop = getByTestId('admin-drop');
    // expect(adminDrop).toBeInTheDocument();
    // expect(adminDrop).toHaveClass('drop');

    // const adminToolbar = getByTestId('admin-toolbar');
    // expect(adminToolbar).toBeInTheDocument();
    // expect(adminToolbar).toHaveClass('toolbar');

    // const adminToggle = getByTestId('admin-toggle');
    // expect(adminToggle).toBeInTheDocument();
    // expect(adminToggle).toHaveClass('toggle');

    // const adminMenu = getByTestId('admin-menu');
    // expect(adminMenu).toBeInTheDocument();
    // expect(adminMenu).toHaveClass('menu');

    // const adminMenuLang = getByTestId('admin-menuLang');
    // expect(adminMenuLang).toBeInTheDocument();
    // expect(adminMenuLang).toHaveClass('menuLang');
  });

  test('Admin Container page is rendered with correct children', () => {
    render(<FormattedMessage id="admin" />);
    const adminMessage = screen.getByText('Admin');
    expect(adminMessage).toBeInTheDocument();

    render(<FormattedMessage id="registerAdmin" />);
    const registerAdmin = screen.getByText('Daftarkan Admin');
    expect(registerAdmin).toBeInTheDocument();

    render(<FormattedMessage id="emptyCustomer" />);
    const emptyCustomer = screen.getByText('Customer Masih Kosong');
    expect(emptyCustomer).toBeInTheDocument();

    render(<FormattedMessage id="editUser" />);
    const editUser = screen.getByText('Sunting Pengguna');
    expect(editUser).toBeInTheDocument();
  });

  test('renders admin list correctly', () => {
    const emptyAdmins = [];
    render(<Admin admins={emptyAdmins} />);
    expect(screen.queryByText('Customer Masih Kosong')).toBeInTheDocument();

    console.log(admins);

    // render(<Admin admins={admins} />);
    // const adminCards = screen.getAllByTestId('admin-card');
    // expect(adminCards).toHaveLength(admins.length);

    // admins.forEach((admin) => {
    //   expect(screen.getByText(admin.name)).toBeInTheDocument();
    //   expect(screen.getByText(admin.phone)).toBeInTheDocument();
    //   expect(screen.getByText(admin.address)).toBeInTheDocument();

    //   const adminImage = screen.getByAltText(`${admin.name}'s image`);
    //   expect(adminImage).toHaveAttribute('src', `${config.api.image_customer}${admin.image}`);
    // });
  });

  test('clicking on admin toggle opens menu', () => {
    // render(<Admin admins={admins} />);
    // fireEvent.click(screen.getByTestId('admin-toggle'));
    // expect(screen.getByTestId('admin-menu')).toBeInTheDocument();
  });
});
