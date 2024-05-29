import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import VehiclePopup from './VehiclePopup';
import thunk from 'redux-thunk';
import { vi } from 'vitest';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialStateWithVehicles = {
  vehicles: {
    vehicles: [
      {
        url: 'http://swapi.dev/api/vehicles/14/',
        name: 'Snowspeeder',
        model: 't-47 airspeeder',
        manufacturer: 'Incom corporation',
        vehicle_class: 'airspeeder',
      },
      {
        url: 'http://swapi.dev/api/vehicles/30/',
        name: 'Imperial Speeder Bike',
        model: '74-Z speeder bike',
        manufacturer: 'Aratech Repulsor Company',
        vehicle_class: 'speeder',
      },
    ],
  },
};

const initialStateWithoutVehicles = {
  vehicles: {
    vehicles: [],
  },
};

const renderWithProviders = (ui, { reduxStore } = {}) => {
  return render(<Provider store={reduxStore || store}>{ui}</Provider>);
};

describe('VehiclePopup Component', () => {
  it('renders the vehicle list when vehicles are available', () => {
    const store = mockStore(initialStateWithVehicles);
    renderWithProviders(<VehiclePopup open={true} onClose={vi.fn()} />, { reduxStore: store });

    expect(screen.getByText(/snowspeeder/i)).toBeInTheDocument();
    expect(screen.getByText(/imperial speeder bike/i)).toBeInTheDocument();
    expect(screen.getByText(/model: t-47 airspeeder/i)).toBeInTheDocument();
    expect(screen.getByText(/manufacturer: incom corporation/i)).toBeInTheDocument();
    expect(screen.getByText(/class: airspeeder/i)).toBeInTheDocument();
    expect(screen.getByText(/model: 74-z speeder bike/i)).toBeInTheDocument();
    expect(screen.getByText(/manufacturer: aratech repulsor company/i)).toBeInTheDocument();
    expect(screen.getByText(/class: speeder/i)).toBeInTheDocument();
  });

  it('renders a message when no vehicles are available', () => {
    const store = mockStore(initialStateWithoutVehicles);
    renderWithProviders(<VehiclePopup open={true} onClose={vi.fn()} />, { reduxStore: store });

    expect(screen.getByText(/no vehicles available/i)).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const store = mockStore(initialStateWithVehicles);
    const handleClose = vi.fn();
    renderWithProviders(<VehiclePopup open={true} onClose={handleClose} />, { reduxStore: store });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
