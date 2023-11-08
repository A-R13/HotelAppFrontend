import React from 'react';

const Listing = (props) => {
  console.log(props.listing);
  const listingInfo = props.listing;

  const title = listingInfo.title;
  // const propertyType = listingInfo.metadata.propertyType;
  // number of  beds
  // numBathrooms
  const thumbnail = listingInfo.thumbnail;
  // svg rating
  // const reviewCount = listingInfo.reviews.length;

  const price = listingInfo.price;

  // have a default thumbnail for alt
  return (
    <div className='listing'>
      <img src={thumbnail} alt={''} />
      <h2>{title}</h2>
      <p>Property Type: {''}</p>
      <p>Number of Beds: {''}</p>
      <p>Number of Bathrooms: {''}</p>
      <p>Rating: {0} (based on {0} reviews)</p>
      <p>Price per Night: ${price}</p>
      {/* <button onClick={() => onEdit(listingInfo.id)}>Edit</button> */}
      {/* <button onClick={() => onDelete(listingInfo.id)}>Delete</button> */}
    </div>
  );
};

export default Listing;
