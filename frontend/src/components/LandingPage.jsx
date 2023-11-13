import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx'
// import { fileToDataUrl } from '../Helpers';
import '../index.css'

const LandingPage = (props) => {
  const [allListings, setAllListings] = useState([])
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState(false)
  const [filteredListings, setFilteredListings] = useState([])

  // Get all listings when the page is loaded
  useEffect(() => {
    fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((allListings) => {
        setAllListings(allListings.listings)
      })
  }, []);

  useEffect(() => {
    if (props.token !== null) {
      fetch('http://localhost:5005/bookings', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${props.token}`
        },
      }).then((res) => res.json())
        .then((userBookings) => {
          setBookings(userBookings.bookings)
        })
    }
  }, []);

  // Sort alhabetically
  allListings.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
  // If user is logged in sort users own bokoing by pending booked etc.
  if (props.token !== null) {
    for (const booking in bookings) {
      for (const listing in allListings) {
        if (booking.id === listing.id && (booking.status === 'accepted' || booking.status === 'pending')) {
          allListings.sort((a, b) => a.id === listing.id ? -1 : b.id === listing.id ? 1 : 0)
        }
      }
    }
  }
  return (
    <>
    <h1 className = 'text-3xl font-bold underline'>Listings</h1>
    <SearchBar allListings = {allListings} filter = {filter}
    setFilter = {setFilter} setFilteredListings = {setFilteredListings}/>
    {filter === true
      ? (<>{
        filteredListings.map((listing) => (
          <Button
            key = {listing.id}
            component = {Link}
            to = {`${listing.id}`}
            sx = {{ my: 2 }}
          >
            <div className = 'listings'>
              <div className = 'listings__item'>
                <div className = 'listings__image'>
                  <img src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D' alt = 'Property Image'></img>
                </div>
                <div className = 'listings__content'>
                  <div className = 'listings__title'>
                    <span className='greyText'>{listing.address.street + ', ' + listing.address.city + ', ' + listing.address.country}</span>
                    <h2>{listing.title}</h2>
                  </div>
                  <div className='listings_details'>
                    <span className='greyText'> {} </span>
                    <div className='listings__price'>
                      <div className='listings__price__night'>
                        <span>$ {listing.price} per Night</span>
                      </div>
                      <div className = 'listings__rating'>
                      <span>({listing.reviews.length} reviews)</span>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Button>
        ))}</>)
      : <>{
        allListings.map((listing) => (
          <Button
            key = {listing.id}
            component = {Link}
            to = {`${listing.id}`}
            sx = {{ my: 2 }}
          >
            <div className = 'listings'>
              <div className = 'listings__item'>
                <div className = 'listings__image'>
                  <img src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG91c2V8ZW58MHx8MHx8fDA%3D' alt = 'Property Image'></img>
                </div>
                <div className = 'listings__content'>
                  <div className = 'listings__title'>
                    <span className='greyText'>{listing.address.street + ', ' + listing.address.city + ', ' + listing.address.country}</span>
                    <h2>{listing.title}</h2>
                  </div>
                  <div className='listings_details'>
                    <span className='greyText'> {} </span>
                    <div className='listings__price'>
                      <div className='listings__price__night'>
                        <span>$ {listing.price} per Night</span>
                      </div>
                      <div className = 'listings__rating'>
                      <span>({listing.reviews.length} reviews)</span>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Button>
        ))}</> }
    </>
  );
}

export default LandingPage;
