import React from 'react';
import { FormHelperText, Grid, ListItem, Typography } from '@mui/material';
// import { fetchRevenueOperations } from './api/graphql/queries/postOperations';
import ReferralsCard from './_dashboard/_components/ReferralsCard';
import RevenueByClinicsCard from './_dashboard/_components/RevenueByClinicsCard';
import RevenueByDateCard from './_dashboard/_components/RevenueByDateCard';
import DashboardInstructions from './_components/DashboardInstructions';

// build fetch for revenue by clinic
// build fetch for revenue by date
const DemoCaption = () => {
  return (
    <FormHelperText>
      This is demo data. This will be replaced with actual data.
    </FormHelperText>
  );
};
// Home page
export default async function Page() {
  // const { revenue } = await fetchRevenueOperations();
  const handleDateChange = (timePeriod: string) => {
    //  fetch by date;
    // might move this to a client component
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} textAlign={'center'}>
        <Typography variant="h5">
          Welcome to the Co-management Dashboard
        </Typography>
      </Grid>
      {/* <Grid item xs={12} textAlign={'center'}>
        <Typography variant="body1">
          This dashboard is used to manage referrals and patient data for
          ophthalmology patients.
        </Typography>
      </Grid> */}
      <Grid item xs={12} textAlign={'center'}>
        <DashboardInstructions />
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <Typography variant="body1">Ideas for this page:</Typography>
        <ListItem>
          - show all patients who dont have a post op note from optom with a 90
          day countdown
        </ListItem>
        <ListItem>
          - show all patients, or a count, of who doesnt have a consent form
          signed. Click on a providers email to send them a reminder
        </ListItem>
        <ListItem>
          - show all patients who dont have an appointment scheduled post
          surgery
        </ListItem>
        <ListItem>
          - show all patients who dont have a transfer of care letter sent that
          need it (post- surgery)
        </ListItem>
      </Grid> */}
      {/* <Grid item xs={12} md={4}>
        <ReferralsCard patients={patients} />
        <DemoCaption />
      </Grid>
      <Grid item xs={12} md={4}>
        <RevenueByClinicsCard revenue={revenue} />
        <DemoCaption />
      </Grid>
      <Grid item xs={12} md={4}>
        <RevenueByDateCard
          revenue={revenue}
          handleOnChange={handleDateChange}
        />
        <DemoCaption />
      </Grid> */}
    </Grid>
  );
}
