import React from 'react';
import { Button, Typography } from '@mui/material';
import SVGRating from '../SVGRating';
import Image from '../Image';
import { Link } from 'react-router-dom';

const Listing = (props) => {
  const listingInfo = props.listing;

  const title = listingInfo.title;
  const propertyType = listingInfo.metadata.propertyType;
  const numBathrooms = listingInfo.metadata.numBathrooms;
  const numBeds = listingInfo.metadata.numBeds;
  const thumbnail = listingInfo.thumbnail;
  const reviewCount = listingInfo.reviews.length;
  const price = listingInfo.price;

  let total = 0;
  listingInfo.reviews.forEach(review => {
    total += review.score;
  });

  const ratingScore = total / reviewCount;

  // have a default thumbnail for alt
  const listingId = listingInfo.id;
  return (
    <div className='listing'>
      <Image src={thumbnail} alt={'image of property'} />
      <h2>{title}</h2>
      <Typography>Property Type: {propertyType}</Typography>
      <Typography>Number of Beds: {numBeds}</Typography>
      <Typography>Number of Bathrooms: {numBathrooms}</Typography>
      <SVGRating value={ratingScore} ></SVGRating>
      <Typography>{reviewCount} reviews</Typography>
      <Typography>Price per Night: ${price}</Typography>
      <Button component={Link} to={`/editListing/${listingId}`}>Edit</Button>
      <Button onClick={() => console.log('delete btn clicked')}>Delete</Button>
    </div>
  );
};

export default Listing;
