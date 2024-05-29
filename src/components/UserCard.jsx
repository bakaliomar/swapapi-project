import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVehicles } from '../redux/slices/vehicleSlice';
import VehiclePopup from './VehiclePopup';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const UserCard = ({ user }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleShowVehicles = () => {
    setOpen(true);
    dispatch(fetchVehicles(user.vehicles));
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="start">
          <Typography variant="h5" component="div" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Height: {user.height} cm
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mass: {user.mass} kg
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gender: {user.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Edited: {new Date(user.edited).toLocaleString()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, alignSelf: 'center' }}
            onClick={handleShowVehicles}
          >
            Show Vehicles
          </Button>
        </Box>
        <VehiclePopup open={open} onClose={() => setOpen(false)} />
      </CardContent>
    </Card>
  );
};

export default UserCard;
