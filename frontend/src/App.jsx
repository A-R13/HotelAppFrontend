import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Register from './components/Register.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import YourListingsPage from './components/listings/YourListingsPage.jsx';
import CreateListing from './components/listings/CreateListing.jsx';
import EditListing from './components/listings/EditListing.jsx';

function App () {
  const [token, setToken] = React.useState(null);
  const [email, setEmail] = React.useState('');

  return (
    <>
      <Router>
      <Navbar token={token} setToken={setToken}/>
      <Routes>
        <Route path = "/" element={<>Home Page</>}/>
        <Route path = "/register"
          element={
            <Register token = {token} setToken = {setToken}
            email={email} setEmail={setEmail}
            />
          }
        />
        <Route path = "/login"
          element=
            {
              <Login token = {token}
                setToken = {setToken}
                email={email}
                setEmail={setEmail}
              />
            }
        />
        <Route path = "/yourListings" element={<YourListingsPage token = {token} email={email}/>}/>
        <Route path = "/createListing" element={<CreateListing token = {token}/>}/>
        <Route path = "/editListing/:id" element={<EditListing token = {token}/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
