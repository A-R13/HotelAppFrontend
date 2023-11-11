import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    props.setToken(null);
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'red' }}>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to Airbrb!
          </Typography>
          <Button color="inherit" component={Link} to="/">All listings</Button>
          <Button color="inherit">Your Listings</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit"
            component={Link}
            to="/"
            onClick={(e) => handleLogout(e)}
          >
              Logout
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
