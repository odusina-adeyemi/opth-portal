import { ReactElement } from 'react';
import { Grid } from '@mui/material';

const Layout = ({ children }: { children: ReactElement }) => {
  return <Grid container>{children}</Grid>;
};

export default Layout;
