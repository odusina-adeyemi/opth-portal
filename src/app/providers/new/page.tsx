import React from 'react';
import { Grid } from '@mui/material';
import ProviderForm from '../_components/ProviderForm';
import PageTitleHeader from '../../../ui/components/PageTitleHeader';
import { getLoggedInUser } from '../../../lib/getLoggedInUser';
import { fetchOrganizationClinics } from '../../api/graphql/queries/clinics';
import BackArrowLink from '../../../ui/components/BackArrowLink';
import { textLinkColor } from '../../../lib/css/utils';

const AddProviderPage = async () => {
  const user = await getLoggedInUser();
  const clinics = await fetchOrganizationClinics(user?.organizationId);

  return (
    <>
      <Grid item xs={12}>
        <PageTitleHeader title={'New Provider'} />
      </Grid>
      <Grid item xs={12}>
        <BackArrowLink
          color={textLinkColor}
          href="/providers"
          title="Providers"
        />
      </Grid>
      <Grid item xs={6} pt={1} m={'auto'}>
        <ProviderForm clinics={clinics} user={user} />
      </Grid>
    </>
  );
};

export default AddProviderPage;
