import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import UsersListExpand from './_components/UsersListExpand';
import Link from 'next/link';
import { getLoggedInUser } from '../../../lib/getLoggedInUser';
import ProviderStatusList from './_components/ProviderStatusList';
import ProviderStatusFormContainer from './_components/ProviderStatusFormContainer';
import InsuranceCompanyContainer from './_components/InsuranceCompanyContainer';
import PageTitleHeader from '../../../ui/components/PageTitleHeader';
import { fetchOrganizationUsers } from '../../api/graphql/queries/users';
import ArchivedFilesTable from './_components/ArchivedFilesTable';

const UserMyAccountPage = async () => {
  const user = await getLoggedInUser();
  const users = await fetchOrganizationUsers(user?.organizationId);

  return (
    <Grid
      container
      display={'flex'}
      justifyContent={'center'}
      pt={2}
      suppressHydrationWarning
    >
      <PageTitleHeader title="My Account" />
      <Grid item xs={9} pt={1}>
        <Grid container>
          <Grid item xs={6} mb={2} pr={1}>
            <Paper sx={{ p: 2 }}>
              <UsersListExpand loggedInUser={user} users={users} />
              <Link href={'/user/new'}>
                <Button variant="outlined" color="primary">
                  + New User
                </Button>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={6} mb={2} pl={1}>
            <InsuranceCompanyContainer orgId={user.organizationId} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={9} mb={2}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6">Provider statuses</Typography>
              <ProviderStatusList orgId={user.organizationId} />
            </Grid>
            <Grid item xs={6}>
              <ProviderStatusFormContainer orgId={user.organizationId} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Archived uploaded files</Typography>
          <ArchivedFilesTable />
        </Paper>
      </Grid>
    </Grid>
  );
};
export default UserMyAccountPage;
