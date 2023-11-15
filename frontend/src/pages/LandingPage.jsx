import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx'
// import { fileToDataUrl } from '../Helpers';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { getSpecificListing } from '../Helpers.js';

const LandingPage = (props) => {
  const [allListings, setAllListings] = useState([])
  const [bookings, setBookings] = useState([])
  const [filter, setFilter] = useState(false)
  const [filteredListings, setFilteredListings] = useState([])

  // Get all listings when the page is loaded
  useEffect(() => {
    props.setDateFilter(false)
    fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(async (allListings) => {
        const listings = []
        for (const listing of allListings.listings) {
          const info = await getSpecificListing(listing.id)
          if (info.listing.published !== false) {
            info.listing.id = listing.id
            listings.push(info.listing)
          }
        }
        setAllListings(listings)
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
    setFilter = {setFilter} setFilteredListings = {setFilteredListings}
    setDateFilter = {props.setDateFilter} setCheckIn = {props.setCheckIn} setCheckOut = {props.setCheckOut} />
    {filter === true
      ? (<>
      {
        filteredListings.map((listing) => (
          <Button
            key = {listing.id}
            component = {Link}
            to = {`${listing.id}`}
            sx = {{ my: 2 }}
          >
          <Card sx={{ maxWidth: 345, minWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image= {listing.thumbnail}
                title="Listing Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {listing.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {listing.address.street + ', ' + listing.address.city + ', ' + listing.address.country}
                </Typography>
              </CardContent>
              <CardActions>
              <Typography variant="body2" color="text.secondary">
                  {listing.reviews.length + ' reviews'}
                </Typography>
              </CardActions>
            </Card>
          </Button>
        ))}
        </>)
      : <>{
        allListings.map((listing) => (
          <Button
            key = {listing.id}
            component = {Link}
            to = {`${listing.id}`}
            sx = {{ my: 2 }}
          >
            <Card sx={{ maxWidth: 345, minWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                src= {listing.thumbnail}
                title="Listing Image"
                component='img'
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {listing.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {listing.address.street + ', ' + listing.address.city + ', ' + listing.address.country}
                </Typography>
              </CardContent>
              <CardActions>
              <Typography variant="body2" color="text.secondary">
                  {listing.reviews.length + ' reviews'}
                </Typography>
              </CardActions>
            </Card>
          </Button>
        ))}</> }
    </>
  );
}

export default LandingPage;
