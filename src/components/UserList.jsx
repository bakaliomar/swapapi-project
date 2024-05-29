import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slices/userSlice';
import UserCard from './UserCard';
import { TextField, Container, Grid, Typography } from '@mui/material';

const SearchField = styled(TextField)`
  margin: 16px 0;
`;

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    dispatch(fetchUsers(event.target.value));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <SearchField
        label="Search by name"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
      />
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item key={user.url} xs={12} sm={6} md={4}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserList;
