import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserList from './components/UserList';
import { Container } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <Container>
        <h1>Star Wars People and Vehicles</h1>
        <UserList />
      </Container>
    </Provider>
  );
}

export default App;
