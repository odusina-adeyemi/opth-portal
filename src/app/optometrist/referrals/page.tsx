import React from 'react';
import ReferralsTable from './_components/ReferralsTable';
import { getLoggedInUser } from '../../../lib/getLoggedInUser';
import { Grid } from '@mui/material';
import PageTitleHeader from '../../../ui/components/PageTitleHeader';
import { mainBackgroundColor } from '../../../lib/css/utils';
import { fetchOrganizationPatients } from '../../../app/api/graphql/queries/patients';

const ReferralsPage = async () => {
  const user = await getLoggedInUser();
  const patients = await fetchOrganizationPatients(user?.organizationId);

  return (
    <>
      <PageTitleHeader title={'Referrals'} />
      <Grid item xs={12} bgcolor={mainBackgroundColor}>
        <ReferralsTable patientData={patients} orgId={user.organizationId} />
      </Grid>
    </>
  );
};

export default ReferralsPage;
