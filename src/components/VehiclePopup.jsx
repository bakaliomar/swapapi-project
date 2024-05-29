import React from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Typography, Box, Button } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const VehiclePopup = ({ open, onClose }) => {
  const vehicles = useSelector((state) => state.vehicles.vehicles);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Vehicles</DialogTitle>
      <DialogContent>
        {vehicles.length > 0 ? (
          <List>
            {vehicles.map((vehicle) => (
              <ListItem key={vehicle.url} alignItems="flex-start" sx={{ padding: 2 }}>
                <Box display="flex" alignItems="center">
                  <DirectionsCarIcon sx={{ marginRight: 2, color: 'primary.main' }} />
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="span">
                        {vehicle.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textSecondary">
                          Model: {vehicle.model} | Manufacturer: {vehicle.manufacturer} | Class: {vehicle.vehicle_class}
                        </Typography>
                      </>
                    }
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" align="center" sx={{ marginTop: 4 }}>
            No vehicles available
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehiclePopup;
