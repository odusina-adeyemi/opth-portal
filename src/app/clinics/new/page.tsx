import React from 'react';
import { Grid } from '@mui/material';
import ClinicForm from '../_components/ClinicForm';
import PageTitleHeader from '../../../ui/components/PageTitleHeader';
import { getLoggedInUser } from '../../../lib/getLoggedInUser';
import { fetchOrganizationProviders } from '../../api/graphql/queries/providers';
import BackArrowLink from '../../../ui/components/BackArrowLink';
import { textLinkColor } from '../../../lib/css/utils';

const AddClinicPage = async () => {
  const user = await getLoggedInUser();
  const providers = await fetchOrganizationProviders(user?.organizationId);

  return (
    <>
      <Grid item xs={12}>
        <PageTitleHeader title={'New Clinic'} />
      </Grid>
      <Grid item xs={12}>
        <BackArrowLink color={textLinkColor} href="/clinics" title="Clinics" />
      </Grid>
      <Grid item xs={6} pt={1} m={'auto'}>
        <ClinicForm providers={providers} user={user} />
      </Grid>
    </>
  );
};

export default AddClinicPage;
