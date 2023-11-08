import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BasicModal from './BasicModal';
import Listing from './Listing';

const YourListingsPage = (props) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const [listings, setListings] = useState([]);

  const handle = async () => {
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    });

    const data = await response.json();
    if (data.error) {
      setOpen(true);
      setContent(data.error);
    } else {
      // go to listings page
      // get all listings for the particular user
      const userListings = data.listings.filter(listing => listing.owner === props.email);
      // for each listing
      //
      setListings(userListings);
    }
  }

  useEffect(() => {
    handle();
  }, []);

  // let updatedListings = null;
  // useEffect(() => {
  //   updatedListings = listings.map(async (listing) => {
  //     const response = await fetch(`http://localhost:5005/listing/${listing.id}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-type': 'application/json',
  //       }
  //     });

  //     const data = await response.json();
  //     // console.log(data);
  //     if (data.error) {
  //       setOpen(true);
  //       setContent(data.error);
  //     } else {
  //       return data;
  //     }
  //   });
  // }, [listings]);

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
