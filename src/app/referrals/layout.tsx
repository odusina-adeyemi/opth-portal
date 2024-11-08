import { Grid } from '@mui/material';
import { ReactElement } from 'react';

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <Grid container pt={2}>
      {children}
    </Grid>
  );
};

export default Layout;
