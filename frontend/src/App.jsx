import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Register from './components/Register.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import LandingPage from './components/LandingPage.jsx';
import YourListingsPage from './components/YourListingsPage.jsx';
import CreateListing from './components/CreateListing.jsx';

function App () {
  const [token, setToken] = React.useState(null);
  const [email, setEmail] = React.useState('');
  // const [listingAdded, setListingAdded] = React.useState(false);

  return (
    <>
      <Router>
      <Navbar token={token} setToken={setToken}/>
      <Routes>
        <Route path = "/" element={<LandingPage token = {token}/>}/>
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
      </Routes>
    </Router>
    </>
  );
}

export default App;
