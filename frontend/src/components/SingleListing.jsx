import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificListing } from '../Helpers';
import AspectRatio from '@mui/joy/AspectRatio';
// import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import BathroomIcon from '@mui/icons-material/Bathroom';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';

const SingleListing = () => {
  const { listingId } = useParams()
  const [listingInfo, setListingInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    const info = await getSpecificListing(listingId)
    console.log(info.listing)
    setListingInfo(info.listing)
    setLoading(false)
  }, [])

  console.log('listing Id;' + listingId)
  console.log('listing: ' + listingInfo)

  return (
  <>
  {loading
    ? (<>Loading</>)
    : (
    <>
    <Card sx={{ width: 720, height: 600, margin: 'auto', marginTop: '5%' }} >
      <div >
        <Typography level="h2">{listingInfo.title}</Typography>
        <Typography level="body-sm">{listingInfo.address.street + ', ' + listingInfo.address.city + ', ' + listingInfo.address.country}</Typography>
        <Typography level="title-lg">{listingInfo.metadata.propertyType}</Typography>
      </div>
      <AspectRatio minHeight="400px" maxHeight="400px">
        <img
          src= {listingInfo.thumbnail}
          // srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">hello + {listingInfo.metadata.amenities}</Typography>
          <Typography level="body-xs">Total price:</Typography>
          <Typography level="h3">
            $ {listingInfo.price}
          </Typography>
        </div>
        <Box sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}>
          <BedroomParentIcon fontSize='medium'/>: {listingInfo.metadata.bedrooms} (bedrooms)<br/>
          <AirlineSeatIndividualSuiteIcon fontSize='medium'/>: {listingInfo.metadata.numBeds} (beds)<br/>
          <BathroomIcon fontSize='medium'/>: {listingInfo.metadata.numBathrooms} (bathrooms)<br/>
        </Box>
      </CardContent>
    </Card>
    </>
      )}
  </>
  )
}

export default SingleListing;
