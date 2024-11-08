import React, { ReactElement } from 'react';
import { Grid } from '@mui/material';

const ReportsLayout = ({ children }: { children: ReactElement | null }) => {
  return <Grid container>{children}</Grid>;
};

export default ReportsLayout;
