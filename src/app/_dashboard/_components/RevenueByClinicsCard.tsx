import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { numberWithCommas } from '../../../lib/utils/utils';

const RevenueByClinicsCard = ({ revenue }: { revenue: number }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" textAlign={'center'}>
          Revenue by Clinic
        </Typography>
        {/* Select Oph Clinic - from user.providers */}
        {/* Graph here for  */}
        <Typography variant="body1">
          Total: ${numberWithCommas(revenue)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RevenueByClinicsCard;
