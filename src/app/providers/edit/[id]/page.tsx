import React from 'react';
import ProviderForm from '../../_components/ProviderForm';
import PageTitleHeader from '../../../../ui/components/PageTitleHeader';
import { fetchProvider } from '../../../api/graphql/queries/providers';
import { Grid } from '@mui/material';
import { fetchOrganizationClinics } from '../../../api/graphql/queries/clinics';
import { getLoggedInUser } from '../../../../lib/getLoggedInUser';
import BackArrowLink from '../../../../ui/components/BackArrowLink';
import { textLinkColor } from '../../../../lib/css/utils';

const EditProviderPage = async ({ params }: { params: { id: string } }) => {
  const user = await getLoggedInUser();
  const [clinics, provider] = await Promise.all([
    fetchOrganizationClinics(user?.organizationId),
    fetchProvider(params.id),
  ]);

  return (
    <Grid container display={'flex'} justifyContent={'center'}>
      <Grid item xs={12}>
        <PageTitleHeader title={'Edit Provider'} />
      </Grid>
      <Grid item xs={12}>
        <BackArrowLink
          color={textLinkColor}
          href="/providers"
          title="Providers"
        />
      </Grid>
      <Grid item xs={6}>
        <ProviderForm clinics={clinics} provider={provider} user={user} />
      </Grid>
    </Grid>
  );
};

export default EditProviderPage;
