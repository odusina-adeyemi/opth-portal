import React from 'react';
import { Grid } from '@mui/material';
import PageTitleHeader from '../../../../ui/components/PageTitleHeader';
import ClinicForm from '../../_components/ClinicForm';
import { fetchClinic } from '../../../api/graphql/queries/clinics';
import { fetchOrganizationProviders } from '../../../api/graphql/queries/providers';
import { getLoggedInUser } from '../../../../lib/getLoggedInUser';
import BackArrowLink from '../../../../ui/components/BackArrowLink';
import { textLinkColor } from '../../../../lib/css/utils';

const EditClinicPage = async ({ params }: { params: { id: string } }) => {
  const [user, clinic] = await Promise.all([
    getLoggedInUser(),
    fetchClinic(params.id),
  ]);

  const providers = await fetchOrganizationProviders(user?.organizationId);

  return (
    <>
      <Grid item xs={12}>
        <PageTitleHeader title={'Edit Clinic'} />
      </Grid>
      <Grid item xs={12}>
        <BackArrowLink color={textLinkColor} href="/clinics" title="Clinics" />
      </Grid>
      <Grid item xs={6} pt={1} m={'auto'}>
        <ClinicForm clinic={clinic} providers={providers} user={user} />
      </Grid>
    </>
  );
};

export default EditClinicPage;
