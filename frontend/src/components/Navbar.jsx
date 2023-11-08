import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import BasicModal from './BasicModal';
// import Modal from './Modal';

const Navbar = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('');

  const handleLogout = async (e) => {
    e.preventDefault();

    const token = props.token;

    const response = await fetch('http://localhost:5005/user/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await response.json();

    if (data.error) {
      // show modal
      setOpen(true);
      setContent(data.error);
    }
    navigate('/');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: 'red' }}>
        <AppBar position="static" color='primary'>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome to Airbrb!
            </Typography>
            <Button color="inherit" component={Link} to="/">All listings</Button>
            <Button color="inherit" component={Link} to="/yourListings">Your Listings</Button>
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
      <BasicModal open={open} setOpen={setOpen} content={content}>
      </BasicModal>
    </>
  );
}

export default Navbar;
