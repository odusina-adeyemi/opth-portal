import React from 'react';
import { Grid, Typography } from '@mui/material';
import NoReferralsCard from './NoReferralsCard';
import { DateRange } from '@mui/icons-material';
import DateRangeReferralsCard from './DateRangeReferralsCard';
import { Clinic, Provider } from '../../../constants/types/types';
/**
 * Shows a particular Key Provider name if
 * 
    - They have no new referrals for last 3 weeks (this should be modifiable for each
provider… default = 3 weeks, but some may be 1-4 weeks)
    Shows last referral date
    Shows a link to open that particular provider)
    - They have new referrals in the last 4 weeks
    - Most overall referrals - w/ most recent referral date
    - least overall referrals - w/ most recent referral date
 * 
 */
interface KeyReferringProvidersProps {
  noReferrals: Omit<Provider, 'createdAt' | 'updatedAt'>[];
  referralProviders: Omit<Provider, 'createdAt' | 'updatedAt'>[];
}

const KeyReferringProviders = ({
  noReferrals,
  referralProviders,
}: KeyReferringProvidersProps) => {
  return (
    <>
      <Grid item xs={12} textAlign="center" mt={2}>
        <Typography variant="h4">Key Referring Providers</Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Typography variant="body2">
          This data is not accurate - for demo purposes only
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} mt={2}>
        <NoReferralsCard noReferrals={noReferrals} />
      </Grid>
      <Grid item xs={12} md={4} mt={2}>
        <DateRangeReferralsCard providers={referralProviders} />
      </Grid>
    </>
  );
};

export default KeyReferringProviders;
