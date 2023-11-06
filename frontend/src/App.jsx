import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Register from './components/Register.jsx';
// import MenuIcon from '@mui/icons-material/Menu';
import Navbar from './components/Navbar.jsx';
// import Login from './components/Login.jsx';

function App () {
  const [token, setToken] = React.useState(null)
  return (
    <>
      <Router>
      <Navbar/>
      <Routes>
        <Route path = "/" element={<>Home Page</>}/>
        <Route path = "/register" element={<Register token = {token} setToken = {setToken}/>}/>

      </Routes>
    </Router>
    </>
  );
}

export default App;
