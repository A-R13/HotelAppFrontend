import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import BasicModal from '../components/BasicModal';
import Listing from '../components/listings/Listing';
import { getAllListings, getSpecificListing } from '../Helpers';

const YourListingsPage = ({ token, email }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const [listings, setListings] = useState([]);

  const updateListings = async () => {
    const data = await getAllListings();

    let myListings = [];
    if (data.listings) {
      // extract the users listings
      const allListings = data.listings;
      myListings = allListings.filter((listing) => listing.owner === email);

      const listingsToShow = [];

      const getListingInfo = async (listing) => {
        const updatedListingInfo = await getSpecificListing(listing.id, token);
        // console.log(updatedListingInfo);
        if (updatedListingInfo.listing) {
          updatedListingInfo.listing.id = listing.id;
          listingsToShow.push(updatedListingInfo.listing);
        }
      }

      const arrayOfAsyncs = myListings.map((listing) => getListingInfo(listing))

      await Promise.all(arrayOfAsyncs);
      setListings(listingsToShow);
    } else {
      setOpen(true);
      setContent(data);
    }
  };

  useEffect(() => {
    updateListings();
  }, []);

  if (token === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <>
          You are not logged in.
        </>
      </Box>
    );
  }

  return (
    <>
      <>
        <Button sx={{ marginTop: '1em' }}
          variant="contained"
          aria-label="Create Listing"
          component={Link}
          to='/createListing'>
          Create Listing
        </Button>
      </>

      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
        {listings.map((listing, idx) => (
          <Listing
            key={idx}
            token={token}
            listing={listing}
            updateListings={() => updateListings()}
          />
        ))}
      </Box>

      <BasicModal open={open} setOpen={setOpen} content={content}></BasicModal>
    </>
  );
}

export default YourListingsPage;
