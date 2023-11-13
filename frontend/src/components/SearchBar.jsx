import React from 'react';
// import styled from 'styled-components';
// import { CTA } from '../../styles-lib/buttons';
// import { TLVBox } from '../../styles-lib/containers';
// import { flexbox } from '../../styles-lib/mixins';
// import { Title } from '../../styles-lib/typography';
// import LocationInput from './LocationInput';
// import GuestsMenu from './GuestsMenu';
// import DatesSelection from './DatesSelection';
import { Button, TextField, Box } from '@mui/material';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import '../index.css'
import { getSpecificListing } from '../Helpers';

const SearchPanel = (props) => {
  const [dest, setDest] = React.useState('')
  const [price, setPrice] = React.useState([0, 0]);
  const [beds, setBeds] = React.useState([0, 0])
  const [review, setReviews] = React.useState('')

  const getListingDetails = async (listingId) => {
    const response = await getSpecificListing(listingId)
    return response.listing
  }

  // TODO: IMPLEMENT REVIEW SORTING

  const filterListings = async (listing) => {
    if (dest !== '') {
      const filteredArray = listing.filter((listing) =>
        listing.title.toLowerCase().includes(dest.toLowerCase()) ||
        listing.address.city.toLowerCase().includes(dest.toLowerCase()))
      props.setFilter(true)
      props.setFilteredListings(filteredArray)
    } else if (price[0] !== 0 || price[1] !== 0) {
      const filteredArray = listing.filter((item) =>
        item.price >= price[0] && item.price <= price[1]);
      console.log(filteredArray)
      props.setFilter(true)
      props.setFilteredListings(filteredArray)
    } else if ((beds[0] !== 0 || beds[1] !== 0)) {
      const filteredArray = []
      console.log(listing)
      for (const singleListing of listing) {
        const info = await getListingDetails(singleListing.id)
        info.id = singleListing.id
        if (info.metadata.bedrooms >= beds[0] && info.metadata.bedrooms <= beds[1]) {
          filteredArray.push(info)
        }
      }
      props.setFilter(true)
      props.setFilteredListings(filteredArray)
    } else {
      props.setFilter(false)
    }
    // else if () {  IMPLEMENT SORT BY REVIEWS AND AVAILABILITY
  }

  return (
    <div className = 'search-Container'>
      <h2>Book unique places to stay and things to do.</h2>
      <div className = 'search-fields'>
        <TextField
        id = 'filled-basic'
        label = 'Where to'
        variant = 'filled'
        value = {dest}
        onChange={e => setDest(e.target.value)}
        ></TextField>
        <h2 style={{ textAlign: 'left' }}>Price:</h2>
        <Box sx={{ width: 300 }}>
          <Slider
            min={0}
            max={1000}
            getAriaLabel={() => 'Price'}
            value={price}
            onChange={e => setPrice(e.target.value)}
            valueLabelDisplay="auto"
          />
        </Box>
        <h2 style={{ textAlign: 'left' }}>Number of Bedrooms:</h2>
        <Box sx={{ width: 300 }}>
          <Slider
          min={0}
          max={10}
          getAriaLabel={() => 'Bedrooms'}
          value={beds}
          onChange={e => setBeds(e.target.value)}
          valueLabelDisplay="auto"
          />
        </Box>
        <InputLabel id="demo-simple-select-label" style = {{ textAlign: 'left', fontSize: '1.5rem' }}>Reviews</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style = {{ width: '50%' }}
            value={review}
            label="Reviews"
            onChange={e => setReviews(e.target.value)}
          >
            <MenuItem value={1} >Lowest To Highest</MenuItem>
            <MenuItem value={2}>Highest To Lowest</MenuItem>
          </Select>
          <div className='date-picker'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Check-in" />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Check-out" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        <Button className = 'search-submit'onClick= { () => { filterListings(props.allListings) }}>search</Button>
      </div>
    </div>
  );
};

export default SearchPanel;
