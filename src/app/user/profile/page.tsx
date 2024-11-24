import React from 'react';
import { Grid, TextField } from '@mui/material';
import { getLoggedInUser } from '../../../lib/getLoggedInUser';
import { fetchOrganization } from '../../api/graphql/queries/organizations';
import PageTitleHeader from '../../../ui/components/PageTitleHeader';

const UserProfilePage = async () => {
  const user = await getLoggedInUser();
  const organization = await fetchOrganization(user?.organizationId);
console.log('user', user);
  return (
    <Grid container py={2} display={'flex'} justifyContent={'center'}>
      <PageTitleHeader title="User Profile" />
      <Grid item xs={5} pb={1}>
        <TextField
          disabled
          fullWidth
          label="Name"
          margin={'normal'}
          value={`${user?.firstName} ${user?.lastName}`}
          variant="standard"
        />
        <TextField
          disabled
          fullWidth
          label="Email"
          margin={'normal'}
          value={`${user?.email}`}
          variant="standard"
        />
        <TextField
          disabled
          fullWidth
          label="Role"
          margin={'normal'}
          value={`${user?.role}`}
          variant="standard"
        />
        <TextField
          disabled
          fullWidth
          label="Organization"
          margin={'normal'}
          value={`${organization?.name}`}
          variant="standard"
        />
      </Grid>
    </Grid>
  );
};

export default UserProfilePage;
