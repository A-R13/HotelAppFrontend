import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Register from './components/Register.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import LandingPage from './components/LandingPage.jsx';
import YourListingsPage from './components/listings/YourListingsPage.jsx';
import CreateListing from './components/listings/CreateListing.jsx';
import EditListing from './components/listings/EditListing.jsx';
import SingleListing from './components/SingleListing.jsx';

function App () {
  const [token, setToken] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [dateFilter, setDateFilter] = React.useState(false)
  const [checkIn, setCheckIn] = React.useState('')
  const [checkOut, setCheckOut] = React.useState('')

  return (
    <>
      <Router>
      <Navbar token={token} setToken={setToken}/>
      <Routes>
        <Route path = "/" element={<LandingPage token = {token} dateFilter = {dateFilter} setDateFilter = {setDateFilter}
        setCheckIn = {setCheckIn} setCheckOut = {setCheckOut} />}/>
        <Route path = ":listingId" element={<SingleListing token = {token} dateFilter = {dateFilter}
        checkIn = {checkIn} checkOut = {checkOut} email = {email}/>}/>
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
