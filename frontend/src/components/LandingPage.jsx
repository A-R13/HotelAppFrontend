import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = (props) => {
  const [allListings, setAllListings] = useState([])
  const [bookings, setBookings] = useState([])

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
          sortBookings()
        })
    }
  }, []);

  const sortBookings = () => {
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
    {props.token !== null
      ? (
          allListings.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
          // Add code to make bookings with status higher
        )
      : (allListings.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))}
    <h1>Listings</h1>
    {
      allListings.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
    }
    {
      allListings.map((listing) => (
        <Button
          key = {listing.id}
          component = {Link}
          to = {`${listing.id}`}
          sx = {{ my: 2 }}
        >
          Title: {listing.title}
          Price: {listing.price}
          Reviews: {listing.reviews.length}
        </Button>
      ))}
    </>
  );
}

export default LandingPage;
