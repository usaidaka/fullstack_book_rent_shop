import { render } from '@testing-library/react';
import Example from './index';

describe('Example', () => {
  test('renders welcome message with username', () => {
    const username = 'John';
    const { getByTestId } = render(<Example username={username} />);
    const welcomeMessage = getByTestId('test');
    expect(welcomeMessage).toBeInTheDocument();
    expect(welcomeMessage).toHaveTextContent(`Welcome, ${username}!`);
  });

  test('renders page description', () => {
    const username = 'John';
    const { getByTestId } = render(<Example username={username} />);
    const pageDescription = getByTestId('test-2');
    expect(pageDescription).toBeInTheDocument();
    expect(pageDescription).toHaveTextContent('This is the home page.');
  });

  test('renders default welcome message', () => {
    const { getByTestId } = render(<Example />);
    const welcomeMessage = getByTestId('test');
    expect(welcomeMessage).toBeInTheDocument();
    expect(welcomeMessage).toHaveTextContent('Welcome, aka!');
  });
});
