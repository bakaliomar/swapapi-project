import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserCard from './UserCard';
import { fetchVehicles } from '../redux/slices/vehicleSlice';
import { vi } from 'vitest';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

vi.mock('../redux/slices/vehicleSlice', () => ({
  fetchVehicles: vi.fn((vehicleUrls) => (dispatch) => {
    dispatch({ type: 'vehicles/fetchVehicles/pending' });
    return Promise.resolve(
      vehicleUrls.map((url, index) => ({
        name: `Vehicle ${index + 1}`,
        url,
      }))
    ).then((vehicles) => {
      dispatch({ type: 'vehicles/fetchVehicles/fulfilled', payload: vehicles });
    }).catch((error) => {
      dispatch({ type: 'vehicles/fetchVehicles/rejected', error: error.message });
    });
  }),
}));

const user = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  gender: 'male',
  edited: '2014-12-20T21:17:50.309Z',
  vehicles: ['http://swapi.dev/api/vehicles/14/', 'http://swapi.dev/api/vehicles/30/'],
};

const initialState = {
  users: {
    loading: false,
    users: [],
    error: null,
  },
  vehicles: {
    loading: false,
    vehicles: [],
    error: null,
  },
};

const store = mockStore(initialState);

const renderWithProviders = (ui, { reduxStore } = {}) => {
  return render(<Provider store={reduxStore || store}>{ui}</Provider>);
};

describe('UserCard Component', () => {
  beforeEach(() => {
    fetchVehicles.mockClear();
  });

  it('renders the user card with user details', () => {
    renderWithProviders(<UserCard user={user} />);

    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 172 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/mass: 77 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/edited: 12\/20\/2014, 9:17:50 pm/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show vehicles/i })).toBeInTheDocument();
  });

  it('dispatches fetchVehicles and opens VehiclePopup when button is clicked', async () => {
    renderWithProviders(<UserCard user={user} />);

    const button = screen.getByRole('button', { name: /show vehicles/i });
    fireEvent.click(button);

    expect(fetchVehicles).toHaveBeenCalledTimes(1);
    expect(fetchVehicles).toHaveBeenCalledWith(user.vehicles);

    // Ensure the VehiclePopup is displayed
    expect(screen.getAllByText(/vehicles/i)).not.toHaveLength(0);
  });

  it('closes VehiclePopup when onClose is called', async () => {
    renderWithProviders(<UserCard user={user} />);

    const button = screen.getByRole('button', { name: /show vehicles/i });
    fireEvent.click(button);

    // Find the close button and simulate a click
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Wait for the VehiclePopup to be removed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
