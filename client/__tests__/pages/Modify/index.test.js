import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Modify from '@pages/Modify';
import { getStudentDetail, updateStudent } from '@pages/Modify/actions';

const mockStore = configureStore([]);

jest.mock('@pages/Modify/actions', () => ({
  getStudentDetail: jest.fn(),
  updateStudent: jest.fn(),
}));

describe('Modify Component', () => {
  let store;
  const studentDetailData = {
    id: '1',
    name: 'John Doe',
    class: 'X',
    major: 'IPA',
    gender: 'Male',
  };

  beforeEach(() => {
    store = mockStore({
      studentDetailData,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Modify />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders the Modify component', () => {
    // Replace with more specific assertions based on your UI
    expect(screen.getByText('Modify Student')).toBeInTheDocument();
  });

  it('dispatches getStudentDetail action on mount', () => {
    expect(getStudentDetail).toHaveBeenCalledWith(studentDetailData.id, expect.any(Function));
  });

  it('dispatches updateStudent action on form submission', async () => {
    // Replace with more specific assertions based on your UI
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for the asynchronous operations to complete (e.g., dispatching actions)
    await screen.findByTestId('form-container');

    expect(updateStudent).toHaveBeenCalledWith(studentDetailData.id, expect.any(Object));
  });

  it('navigates to "/" after successful getStudentDetail', async () => {
    await screen.findByTestId('form-container');

    // Replace with more specific assertions based on your UI
    expect(store.getActions()).toContainEqual(expect.objectContaining({ type: '@@router/NAVIGATE' }));
  });

  // Add more test cases as needed for other functionalities
});
