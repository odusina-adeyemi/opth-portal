import React from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import UsersListExpand from './_components/UsersListExpand';
import Link from 'next/link';
import { getLoggedInUser } from '../../../../lib/getLoggedInUser';
import ProviderStatusList from './_components/ProviderStatusList';
import ProviderStatusFormContainer from './_components/ProviderStatusFormContainer';
import InsuranceCompanyContainer from './_components/InsuranceCompanyContainer';
import PageTitleHeader from '../../../../ui/components/PageTitleHeader';
import { fetchOrganizationUsers } from '../../../api/graphql/queries/users';
import ArchivedFilesTable from './_components/ArchivedFilesTable';
import UsersTables from './_components/UserTable';

const UserMyAccountPage = async () => {
  const user = await getLoggedInUser();
  const users = await fetchOrganizationUsers(user?.organizationId);

  const optometristUsersCount = users.filter(
    user => user.role === 'optometrist',
  ).length;

  return (
    <div
      // container
      // display={'flex'}
      // justifyContent={'center'}
      // pt={2}
      suppressHydrationWarning
    >
      <div className="flex flex-row p-6 gap-4 w-full mt-6">
        <div className="flex bg-[#6D7FE1] h-36 w-full p-4 gap-3 rounded-md text-white">
          <div>
            <Image
              className="fill-white"
              src="/assets/users.svg"
              alt="Users"
              width={60}
              height={50}
            />
          </div>
          <div className=" text-white">
            <Typography className=" !text-white" variant="h6">
              Total Practice Users
            </Typography>
            <Typography className=" !text-white" variant="h4">
              {users.length}
            </Typography>
          </div>
        </div>

        {/* bg-[#6D7FE1] */}
        <div className="flex bg-[#6DC5E1] h-36 w-full p-4 gap-3 rounded-md text-white">
          <div>
            <Image
              className="fill-white"
              src="/assets/users.svg"
              alt="Users"
              width={60}
              height={50}
            />
          </div>
          <div className=" !text-white">
            <Typography className=" !text-white" variant="h6">
              Total Optometrist Users
            </Typography>
            <Typography className=" !text-white" variant="h4">
              {optometristUsersCount}
            </Typography>
          </div>
        </div>
      </div>

      <div className="p-6">
        <UsersTables users={users} />
      </div>
      {/* <PageTitleHeader title="My Account" /> */}
      {/* <Grid item xs={9} pt={1}>
        <Grid container>
          <Grid item xs={6} mb={2} pr={1}>
            <Paper sx={{ p: 2 }}> */}
      {/* <UsersListExpand loggedInUser={user} users={users} /> */}
      {/* <Link href={'/user/new'}>
                <Button variant="outlined" color="primary">
                  + New User
                </Button>
              </Link> */}
      {/* </Paper>
          </Grid>
          <Grid item xs={6} mb={2} pl={1}> */}
      {/* <InsuranceCompanyContainer orgId={user.organizationId} /> */}
      {/* </Grid>
        </Grid>
      </Grid> */}

      {/* <Grid item xs={9} mb={2}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            <Grid item xs={6}> */}
      {/* <Typography variant="h6">Provider statuses</Typography>
              <ProviderStatusList orgId={user.organizationId} /> */}
      {/* </Grid>
            <Grid item xs={6}>
              {/* <ProviderStatusFormContainer orgId={user.organizationId} /> */}
      {/* </Grid> */}
      {/* </Grid> */}
      {/* </Paper> */}
      {/* </Grid> */}
      {/* <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Archived uploaded files</Typography>
          <ArchivedFilesTable />
        </Paper>
      // </Grid> */}
    </div>
  );
};
export default UserMyAccountPage;
