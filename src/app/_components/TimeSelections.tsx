'use client';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

const TIME_PERIODS = ['last 7 days', 'last 30 days', 'Q1', 'Q2', 'Q3', 'Q4'];

const TimeSelections = ({
  handleOnChange,
}: {
  handleOnChange: (value: string) => void;
}) => {
  const [timePeriodSelected, setTimePeriodSelected] = useState('week');

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    handleOnChange(value);
    setTimePeriodSelected(value);
  };

  return (
    <Select
      name="timePeriodSelection"
      value={timePeriodSelected}
      onChange={handleChange}
      variant="outlined"
    >
      <MenuItem value="">Select a time period</MenuItem>
      {TIME_PERIODS.map(timePeriod => (
        <MenuItem key={timePeriod} value={timePeriod}>
          {timePeriod}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TimeSelections;
