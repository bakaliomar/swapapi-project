import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import vehicleReducer from './slices/vehicleSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    vehicles: vehicleReducer,
  },
});

export default store;