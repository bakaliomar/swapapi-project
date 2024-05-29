import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async (vehicleUrls) => {
  const vehiclePromises = vehicleUrls.map((url) => axios.get(url));
  const vehicleResponses = await Promise.all(vehiclePromises);
  return vehicleResponses.map((response) => response.data);
});

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    loading: false,
    vehicles: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default vehicleSlice.reducer;
