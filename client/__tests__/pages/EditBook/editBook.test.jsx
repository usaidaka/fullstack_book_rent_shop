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
  ...jest.requireActual('react-router-dom'),
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
    const { getByTestId } = render(<EditBook />);

    const ebMainContainer = getByTestId('eb-main-container');
    expect(ebMainContainer).toBeInTheDocument();
    expect(ebMainContainer).toHaveClass('main-container');

    console.log(book);
  });
});
