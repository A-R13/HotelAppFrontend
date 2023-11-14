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
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const SingleListing = (props) => {
  const { listingId } = useParams()
  const [listingInfo, setListingInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [nights, setNights] = useState(0)

  useEffect(async () => {
    const info = await getSpecificListing(listingId)
    setListingInfo(info.listing)
    setLoading(false)
  }, [])

  useEffect(() => {
    const slideImages = [];
    // console.log(listingInfo)
    slideImages.push({ url: listingInfo.thumbnail, caption: 'Listing Thumbnail' })

    if (listingInfo.metadata && listingInfo.metadata.propertyImages) {
      for (const img of listingInfo.metadata.propertyImages) {
        slideImages.push({ url: img, caption: 'Property Image' });
      }
    }
    setImages(slideImages)
    if (props.dateFilter) {
      const date1 = props.checkIn;
      const date2 = props.checkOut;
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays)
      console.log('days:' + diffDays)
    }
  }, [listingInfo])

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'contain',
    height: '600px',
  }
  return (
  <>
  {loading
    ? (<>Loading</>)
    : (
    <>
    <Card sx={{ width: 720, minHeight: 650, margin: 'auto', marginTop: '5%' }} >
      <div >
        <Typography level="h2">{listingInfo.title}</Typography>
        <Typography level="body-sm">{listingInfo.address.street + ', ' + listingInfo.address.city + ', ' + listingInfo.address.country}</Typography>
        <Typography level="title-lg">{listingInfo.metadata.propertyType}</Typography>
      </div>
      <AspectRatio minHeight="400px" maxHeight="400px">
        <Slide>
          {images.map((slideImage, index) => (
              <div key={index}>
                <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})`, height: 600 }}>
                </div>
              </div>
          ))}
          </Slide>
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">{listingInfo.metadata.amenities}</Typography>
          {props.dateFilter
            ? (<>
              <Typography level="body-xs">Price Per Stay:</Typography>
              <Typography level="h3">
                $ {listingInfo.price * nights}
              </Typography></>)
            : (<>
             <Typography level="body-xs">Price Per Night:</Typography>
              <Typography level="h3">
                $ {listingInfo.price}
              </Typography>
            </>) }

        </div>
        <Box sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}>
          <BedroomParentIcon fontSize='medium'/>: {listingInfo.metadata.bedrooms} (bedrooms)<br/>
          <AirlineSeatIndividualSuiteIcon fontSize='medium'/>: {listingInfo.metadata.numBeds} (beds)<br/>
          <BathroomIcon fontSize='medium'/>: {listingInfo.metadata.numBathrooms} (bathrooms)<br/>
        </Box>
      </CardContent>
      <Stack spacing={1}>
          <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /> ({listingInfo.reviews.length} reviews)
      </Stack>
      {listingInfo.reviews.map((review) => (
        <div key = {listingInfo.id}>
          <Stack spacing={1}>
            <Rating name="half-rating-read" defaultValue={review.score} precision={0.5} readOnly />
          </Stack> <br/>
          <Typography level="body-xs">{review.comment}</Typography>
        </div>
      ))}
    </Card>
    </>
      )}
  </>
  )
}

export default SingleListing;
