import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Paper, Grid, Typography, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BasicModal from './BasicModal';
import { fileToDataUrl } from '../Helpers.js';

// taken from mui
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CreateListing = (props) => {
  const navigate = useNavigate();
  // const [listingAdded, setListingAdded] = useState(false);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [numBathrooms, setNumBathrooms] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [numBeds, setNumBeds] = useState(0);
  const [amenities, setAmenities] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(price) || isNaN(bedrooms) || isNaN(numBathrooms)) {
      setOpen(true);
      setContent('Price, bathrooms and bedrooms need to be a number');
      return;
    }

    const addressObj = {
      street,
      city,
      country
    };

    const metadata = {
      propertyType,
      numBathrooms,
      numBeds,
      bedrooms
    };

    let thumbnailUrl = ''

    try {
      thumbnailUrl = fileToDataUrl(thumbnail);
    } catch (error) {
      setOpen(true);
      setContent('Listing thumbnail was not a png, jpg or jpeg');
      return;
    }

    const listingInfo = JSON.stringify({
      title,
      address: addressObj,
      price: parseInt(price),
      thumbnail: thumbnailUrl,
      metadata
    });

    const response = await fetch('http://localhost:5005/listings/new', {
      method: 'POST',
      body: listingInfo,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      }
    });

    const data = await response.json();
    if (data.error) {
      setOpen(true);
      setContent(data.error);
    } else {
      // go to listings page
      navigate('/yourListings');
      console.log('successfully created listing');
    }
  }

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" align="center" style={{ marginBottom: '20px' }}>
            Enter Listing Details
          </Typography>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Listing Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Listing Price (per night)"
                  name='price'
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload Listing Thumbnail
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                  />
                </Button>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Property Type"
                  name='propertyType'
                  type='text'
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Number of Bathrooms"
                  name='bathrooms'
                  type="number"
                  value={numBathrooms}
                  onChange={(e) => setNumBathrooms(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Bedrooms"
                  name='bedrooms'
                  type='number'
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Number of beds in each bedroom"
                  name='numberOfBeds'
                  type='number'
                  value={numBeds}
                  onChange={(e) => setNumBeds(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amenities"
                  name='amenities'
                  type='text'
                  value={amenities}
                  onChange={(e) => setAmenities(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained"
              color="success"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
            <Button type="submit" variant="contained" color="error"
              component={Link} to="/yourListings"
            >
              Cancel
            </Button>
          </form>
        </Paper>
      </Container>
      <BasicModal open={open} setOpen={setOpen} content={content}>
      </BasicModal>
    </>
  );
}

export default CreateListing;
