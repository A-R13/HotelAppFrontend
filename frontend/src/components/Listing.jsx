import React from 'react';
import { Button } from '@mui/material';
import SVGRating from './SVGRating';

const Listing = (props) => {
  const listingInfo = props.listing;

  const title = listingInfo.title;
  const propertyType = listingInfo.metadata.propertyType;
  const numBathrooms = listingInfo.metadata.numBathrooms;
  const numBeds = listingInfo.metadata.numBeds;

  const thumbnail = listingInfo.thumbnail;
  const rating = 1;
  const reviewCount = listingInfo.reviews.length;

  const price = listingInfo.price;

  // have a default thumbnail for alt
  return (
    <div className='listing'>
      <img src={thumbnail} alt={''} />
      <h2>{title}</h2>
      <p>Property Type: {propertyType}</p>
      <p>Number of Beds: {numBeds}</p>
      <p>Number of Bathrooms: {numBathrooms}</p>
      <SVGRating value={rating} ></SVGRating>
      <p>{reviewCount} reviews</p>
      <p>Price per Night: ${price}</p>
      <Button onClick={() => console.log('edit btn clicked')}>Edit</Button>
      <Button onClick={() => console.log('delete btn clicked')}>Delete</Button>
    </div>
  );
};

export default Listing;
