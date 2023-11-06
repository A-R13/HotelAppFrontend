import React from 'react';
import { Routes, Route, BrowserRouter as Router, Outlet } from 'react-router-dom'
import Register from './Register';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

function App () {
  const [token, setToken] = React.useState(null)
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet/>
    <Router>
      <Routes>
        <Route path = "/" element={<>Home Page</>}/>
        <Route path = "/register" element={<Register token = {token} setToken = {setToken}/>}/>

      </Routes>
    </Router>
    </>
  );
}

export default App;
