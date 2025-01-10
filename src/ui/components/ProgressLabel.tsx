import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProgressWithLabelProps {
  value: number; // Progress value (0-100)
  color: string; // Dynamic color based on progress state
}

const ProgressWithLabel: React.FC<ProgressWithLabelProps> = ({ value, color }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Circular Progress */}
      <CircularProgress
        variant="determinate"
        value={value}
        style={{ color }}
        size={40}
        thickness={4}
      />

      {/* Percentage Label */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ fontSize: 12 }}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressWithLabel;
