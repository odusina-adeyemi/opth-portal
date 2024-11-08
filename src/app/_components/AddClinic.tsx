import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddClinic = () => {
  const handleClick = () => {
    // open modal to add clinic
  };

  return (
    <IconButton onClick={handleClick}>
      <AddIcon fontSize="small" />
    </IconButton>
  );
};

export default AddClinic;
