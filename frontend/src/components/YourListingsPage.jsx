import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BasicModal from './BasicModal';
import Listing from './Listing';
import { getAllListings, getSpecificListing } from '../Helpers';

const YourListingsPage = ({ token, email }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const updateListings = async () => {
      const data = await getAllListings();

      let myListings = [];
      if (data.listings) {
        // extract the users listings
        const allListings = data.listings;
        myListings = allListings.filter((listing) => listing.owner === email);

        const listingsToShow = [];

        myListings.forEach(async (listing) => {
          const updatedListingInfo = await getSpecificListing(listing.id, token);
          console.log(updatedListingInfo);
          if (updatedListingInfo.listing) {
            updatedListingInfo.listing.id = listing.id;
            listingsToShow.push(updatedListingInfo.listing);
          }
        });

        setListings(listingsToShow);
      } else {
        setOpen(true);
        setContent(data);
      }
    };

    updateListings();
  }, []);

  return (
    <>
      <div>
        <Button sx={{ marginTop: '1em' }}
          variant="contained"
          component={Link}
          to='/createListing'>
          Create Listing
        </Button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {listings.map((listing) => (
          <Listing
            key={listing.id}
            listing={listing}
          />
        ))}
      </div>

      <BasicModal open={open} setOpen={setOpen} content={content}>
      </BasicModal>
    </>
  );
}

export default YourListingsPage;
