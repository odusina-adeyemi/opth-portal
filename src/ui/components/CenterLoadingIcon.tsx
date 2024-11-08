import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const CenterLoadingIcon = ({ show }: { show: boolean }) => {
  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', zIndex: 10 }}>
      {show && <CircularProgress />}
    </Box>
  );
};

export default CenterLoadingIcon;
