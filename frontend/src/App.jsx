import React from 'react';
import { Routes, Route, BrowserRouter as Router, Outlet } from 'react-router-dom'
import Register from './Register';

function App () {
  const [token, setToken] = React.useState(null)
  return (
    <>
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
