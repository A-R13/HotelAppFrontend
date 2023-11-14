import React, { Fragment, useState } from 'react';
import BasicModal from './BasicModal';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel
} from '@mui/material';

const AvailabilityModal = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const [availabilities, setAvailabilities] = useState([{ start: '', end: '' }]);

  const handleAddAvailability = () => {
    setAvailabilities([...availabilities, { start: '', end: '' }]);
  };

  const handleRemoveAvailability = () => {
    if (availabilities.length > 1) {
      const newAvailabilities = [...availabilities];
      newAvailabilities.pop();
      setAvailabilities(newAvailabilities);
    }
  };

  const handleDateChange = (idx, field, value) => {
    const newAvailabilities = [...availabilities];
    newAvailabilities[idx][field] = value;

    // check if the start date is after the end date
    if (
      newAvailabilities[idx].start &&
      newAvailabilities[idx].end &&
      new Date(newAvailabilities[idx].start) > new Date(newAvailabilities[idx].end)
    ) {
      setOpen(true);
      setContent('Start date cannot be after end date');
      // reset to empty string
      newAvailabilities[idx][field] = '';
      return;
    }

    setAvailabilities(newAvailabilities);
  };

  const aggregateAvailabilities = () => {
    // sort by start time (ascending order)
    const sortedAvailabilities = availabilities
      .filter((availability) => availability.start && availability.end)
      .sort((a, b) => new Date(a.start) - new Date(b.start));

    const aggregatedAvailabilities = [];

    // availability object to track the current availability range
    const currentRange = { start: '', end: '' };

    // for each availability
    sortedAvailabilities.forEach((availability) => {
      if (!currentRange.start) {
        // if current range is not set then initalize it

        currentRange.start = availability.start;
        currentRange.end = availability.end;
      } else if (new Date(availability.start) <= new Date(currentRange.end)) {
        // if current availability overlaps with the currentRange
        // then we extend the range

        currentRange.end = new Date(Math.max(new Date(currentRange.end),
          new Date(availability.end))).toISOString().split('T')[0];
      } else {
        aggregatedAvailabilities.push({ ...currentRange });
        currentRange.start = availability.start;
        currentRange.end = availability.end;
      }
    });

    // push last availability range to the result if it exists
    if (currentRange.start) {
      aggregatedAvailabilities.push({ ...currentRange });
    }

    return aggregatedAvailabilities;
  };

  const handleSubmit = () => {
    // check to see if any dates were not inputted/empty dates
    const isDateEmpty = availabilities.some(
      (availability) => !availability.start || !availability.end
    );

    if (isDateEmpty) {
      setOpen(true);
      setContent('Please enter all availability dates');
      return;
    }

    const finalAvailabilities = aggregateAvailabilities();
    console.log(finalAvailabilities);

    // close the modal after submitting
    // call fetch to publish the listing
    // nagivate to /

    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Enter Availabilities</DialogTitle>
      <DialogContent>
        {availabilities.map((availability, idx) => (
          <Fragment key={idx}>
            <InputLabel shrink htmlFor={`start-date-${idx}`}>
              {`Start date ${idx + 1}`}
            </InputLabel>
            <TextField
              id={`start-date-${idx}`}
              type="date"
              fullWidth
              value={availability.start}
              onChange={(e) => handleDateChange(idx, 'start', e.target.value)}
              required
            />
            <InputLabel shrink htmlFor={`end-date-${idx}`}>
              {`End Date ${idx + 1}`}
            </InputLabel>
            <TextField
              id={`end-date-${idx}`}
              type="date"
              fullWidth
              value={availability.end}
              onChange={(e) => handleDateChange(idx, 'end', e.target.value)}
              required
            />
          </Fragment>
        ))}
        <Button variant="outlined" onClick={() => handleAddAvailability()}>
          Add Availability
        </Button>
        <Button variant="outlined" onClick={() => handleRemoveAvailability()}>
          Remove Availability
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit()} color="primary">
          Submit
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
      <BasicModal open={open} setOpen={setOpen} content={content}></BasicModal>
    </Dialog>
  );
};

export default AvailabilityModal;
