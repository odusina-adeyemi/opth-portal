import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { numberWithCommas } from '../../../lib/utils/utils';
// import TimeSelections from '../../_components/TimeSelections';

const RevenueByDateCard = ({
  //   handleOnChange,
  revenue,
}: {
  handleOnChange: (value: string) => void;
  revenue: number;
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" textAlign={'center'}>
          Revenue by Date
        </Typography>
        {/* Might need another wrapper use client component or just use useQuery/useLazyQuery */}
        {/* <TimeSelections handleOnChange={() => handleOnChange} /> */}
        {/* Graph here for  comparison of revenue changes */}
        <Typography variant="body1">
          Total: ${numberWithCommas(revenue)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RevenueByDateCard;
