import { Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h1">404 Not Found</Typography>
        <Link href="/">Home</Link>
      </Grid>
    </Grid>
  );
};

export default NotFound;
