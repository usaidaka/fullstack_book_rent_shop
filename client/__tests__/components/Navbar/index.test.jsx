import { render } from '@testing-library/react';

import Navbar from '@components/Navbar';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  ...jest.requireActual('react-redux'),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  ...jest.requireActual('react-router-dom'),
}));

describe('Navbar Component', () => {
  test('Correct render', () => {
    const navbar = render(<Navbar title="Title" locale="en" theme="light" />);
    expect(navbar.getByTestId('navbar')).toBeInTheDocument();
  });

  // test('Should match with snapshot', () => {
  //   const navbar = render(<Navbar title="Title" locale="en" theme="light" />);
  //   expect(navbar).toMatchSnapshot();
  // });
});
