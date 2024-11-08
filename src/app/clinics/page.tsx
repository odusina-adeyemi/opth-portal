import React from 'react';
import { Grid } from '@mui/material';
import ClinicsTable from './_components/ClinicsTable';
import { getLoggedInUser } from '../../lib/getLoggedInUser';
import { mainBackgroundColor } from '../../lib/css/utils';
import { fetchOrganizationClinics } from '../api/graphql/queries/clinics';
// components
import PageTitleHeader from '../../ui/components/PageTitleHeader';

const ClinicsPage = async () => {
  const user = await getLoggedInUser();
  const clinics = await fetchOrganizationClinics(user?.organizationId);

  return (
    <>
      <PageTitleHeader title={'Clinics'} />
      <Grid item xs={12} bgcolor={mainBackgroundColor}>
        <ClinicsTable clinics={clinics} />
      </Grid>
    </>
  );
};

export default ClinicsPage;
