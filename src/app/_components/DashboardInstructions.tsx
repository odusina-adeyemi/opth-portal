import React from 'react';
import { Grid, List, ListItem, Paper, Typography } from '@mui/material';

const DashboardInstructions = () => {
  return (
    <Grid container pl={1}>
      <Grid item xs={12} textAlign={'left'}>
        <Typography variant="h5">App Usage Instructions</Typography>
      </Grid>
      <Grid item xs={12} textAlign={'left'} mt={1}>
        <Typography variant="h6">
          New to the application? Start by creating a <b>new clinic</b>.
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign={'left'}>
        <Paper>
          <List sx={{ listStyle: 'disc inside' }}>
            <ListItem sx={{ display: 'list-item' }}>
              Navigate to the Clinics page from the sidebar navigation link
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Click &lsquo;Add Clinic&rsquo; near the top of the page
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Fill out information for the clinic and click Create. (Don&lsquo;t
              worry about not having Providers yet)
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} textAlign={'left'} mt={2}>
        <Typography variant="h6">
          Once you have created a clinic, you can <b>add providers</b> to the
          clinic.
        </Typography>
        <Paper>
          <List sx={{ listStyle: 'disc inside' }}>
            <ListItem sx={{ display: 'list-item' }}>
              Navigate to the Providers page from the sidebar navigation link
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Click &lsquo;Add Provider&rsquo; near the top of the page
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Fill out information for the provider and associate them with one
              of the new clinics you have created. Click Create.
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} textAlign={'left'} mt={2}>
        <Typography variant="h6">
          Once you have created a clinic and provider, you can start{' '}
          <b>adding patients or referrals</b>.
        </Typography>
        <Paper>
          <List sx={{ listStyle: 'disc inside' }}>
            <ListItem sx={{ display: 'list-item' }}>
              Navigate to the Referrals page from the sidebar navigation link
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Click &lsquo;Add Referral&rsquo; near the top of the page
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Fill out information for the referral and associate them with a
              provider and a clinic. Click Create.
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} textAlign={'left'} mt={2}>
        <Typography variant="h6">My account </Typography>
        <Paper>
          <List sx={{ listStyle: 'disc inside' }}>
            <ListItem sx={{ display: 'list-item' }}>
              Click the gear icon in the upper right corner and select &lsquo;My
              account&rsquo;
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Add users to this application and assign them roles.
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Add insurance companies - used when assigning insurance to
              referrals
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              Add provider statuses - customized to your preference, used to
              track the status of a provider e.g. based on referral frequency
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardInstructions;
