import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Patient } from '../../../constants/types/types';

const ReferralsCard = ({ patients }: { patients: Patient[] }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" textAlign={'center'}>
          Referrals
        </Typography>
        {/* Graph here for  */}
        <Typography variant="body1">Total: {patients?.length}</Typography>
      </CardContent>
    </Card>
  );
};

export default ReferralsCard;
