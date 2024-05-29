import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserList from './UserList';
import { fetchUsers } from '../redux/slices/userSlice';
import { vi } from 'vitest';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

vi.mock('../redux/slices/userSlice', () => ({
  fetchUsers: vi.fn(() => ({
    type: 'users/fetchUsers/pending',
  })),
}));

const initialState = {
  users: {
    loading: false,
    users: [
      { url: '1', name: 'John Doe' },
      { url: '2', name: 'Jane Smith' },
    ],
    error: null,
  },
  vehicles: {
    vehicles: [
      { id: '1', name: 'Car' },
      { id: '2', name: 'Bike' },
    ],
  },
};

const store = mockStore(initialState);

const renderWithProviders = (ui, { reduxStore } = {}) => {
  return render(<Provider store={reduxStore || store}>{ui}</Provider>);
};

describe('UserList Component', () => {
  beforeEach(() => {
    fetchUsers.mockClear();
  });

  it('renders the component', () => {
    renderWithProviders(<UserList />);

    expect(screen.getByText(/user list/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/search by name/i)).toBeInTheDocument();
  });

  it('fetches users on initial render', () => {
    renderWithProviders(<UserList />);
    expect(fetchUsers).toHaveBeenCalledTimes(1);
  });

  it('displays users correctly', () => {
    renderWithProviders(<UserList />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('calls fetchUsers on search input change', () => {
    renderWithProviders(<UserList />);
    
    const searchInput = screen.getByLabelText(/search by name/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(fetchUsers).toHaveBeenCalledTimes(2);
    expect(fetchUsers).toHaveBeenCalledWith('John');
  });
});
