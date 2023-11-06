import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Register from './components/Register.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';

function App () {
  const [token, setToken] = React.useState(null);
  return (
    <>
      <Router>
      <Navbar token={token} setToken={setToken}/>
      <Routes>
        <Route path = "/" element={<>Home Page</>}/>
        <Route path = "/register" element={<Register token = {token} setToken = {setToken}/>}/>
        <Route path = "/login" element={<Login token = {token} setToken = {setToken}/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
