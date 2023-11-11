import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const SVGRating = (props) => {
  return (
    <Stack spacing={1}>
      <Rating name="rating" defaultValue={props.value} precision={0.5} readOnly />
    </Stack>
  );
}

export default SVGRating;
