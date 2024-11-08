import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddProvider = () => {
  const handleClick = () => {
    // open modal to add provider
  };

  return (
    <IconButton onClick={handleClick}>
      <AddIcon fontSize="small" />
    </IconButton>
  );
};

export default AddProvider;
