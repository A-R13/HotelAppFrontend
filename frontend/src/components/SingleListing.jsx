import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { getSpecificListing, getUserBookingsForListing, makeBooking } from '../Helpers';
import AspectRatio from '@mui/joy/AspectRatio';
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
import Button from '@mui/joy/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BasicModal from './BasicModal.jsx';
import BookingConfirmation from './BookingConfirmation.jsx';

const SingleListing = (props) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const [confirmation, setConfirmation] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState('');

  const { listingId } = useParams()
  const [listingInfo, setListingInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [nights, setNights] = useState(0)
  const [rating, setRating] = useState(0)
  const [bookings, setBookings] = useState([])
  const [checkout, setCheckOut] = React.useState('')
  const [checkIn, setCheckIn] = React.useState('')

  useEffect(async () => {
    const info = await getSpecificListing(listingId)
    setListingInfo(info.listing)
    if (props.token) {
      setBookings(getUserBookingsForListing(props.token, props.email, listingId))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const slideImages = [];
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
    } else {
      setNights(1)
    }
    let sum = 0;
    if (listingInfo.reviews) {
      if (listingInfo.reviews.length !== 0) {
        for (const review of listingInfo.reviews) {
          sum += review.score;
        }
        sum = sum / listingInfo.reviews.length
      }
      setRating(sum)
    }
  }, [listingInfo])

  const makebooking = async () => {
    if (checkout === '' || checkIn === '') {
      setOpen(true)
      setContent('Invalid dates. Please Try again')
      return
    }
    const booking = await makeBooking(props.token, listingId, listingInfo.price * nights, checkIn, checkout)
    if (booking.error) {
      setOpen(true)
      setContent(booking.error)
    } else if (checkIn < listingInfo.availability.start || checkout > listingInfo.availability.end) {
      setOpen(true)
      setContent('Listing is not available between' + `${checkIn.$D}/${checkIn.$M}/${checkIn.$y}` + ' and ' + `${checkout.$D}/${checkout.$M}/${checkout.$y}`)
    } else {
      setConfirmation(true)
      setConfirmationMsg('Booking from ' + `${checkIn.$D}/${checkIn.$M}/${checkIn.$y}` + ' to ' + `${checkout.$D}/${checkout.$M}/${checkout.$y}` + ' has been succesful.')
    }
  }
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
        {bookings && bookings.length > 0
          ? (<>
        {bookings.map((booking, index) => (
          <div key = {index}>
            Booking From {booking.dateRange.start} to {booking.dateRange.end}: {booking.status}
          </div>
        ))}
        </>)
          : (<></>)}
      </CardContent>
      <Stack spacing={1}>
          <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /> ({listingInfo.reviews.length} reviews)
      </Stack>
      {props.token
        ? (<>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Check-in"value={checkIn} onChange={(newValue) => setCheckIn(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Check-out" value={checkout} onChange={(newValue) => setCheckOut(newValue)}/>
            </DemoContainer>
          </LocalizationProvider>
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            onClick={makebooking}
            >
            Book
          </Button>
        </>)
        : (<></>) }
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
      <BasicModal open={open} setOpen={setOpen} content={content}>
      </BasicModal>
      <BookingConfirmation open= {confirmation} setOpen={setConfirmation} content = {confirmationMsg}>
      </BookingConfirmation>
  </>
  )
}

export default SingleListing;
