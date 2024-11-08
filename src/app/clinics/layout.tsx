import React, { ReactElement } from 'react';
import { Grid } from '@mui/material';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <Grid container pt={2}>
      {children}
    </Grid>
  );
};

export default Layout;
