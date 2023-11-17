import * as React from 'react';
import { Button, } from '@mui/material';

export default function submitListingButton ({ handleSubmit }) {
  return (
    <Button name = "submit-listing" type="submit" variant="contained"
      color="success"
      onClick={(e) => handleSubmit(e)}
    >
      Submit
    </Button>
  )
}
