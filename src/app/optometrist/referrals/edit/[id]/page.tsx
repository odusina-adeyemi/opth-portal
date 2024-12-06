import React from 'react';
import { Grid } from '@mui/material';
import { fetchPatient } from '../../../../api/graphql/queries/patients';
import ReferralForm from '../../new/_components/ReferralForm';
import { getLoggedInUser } from '../../../../../lib/getLoggedInUser';
import { separateOphOptomProviders } from '../../../../../lib/utils/utils';
import PageTitleHeader from '../../../../../ui/components/PageTitleHeader';
import BackArrowLink from '../../../../../ui/components/BackArrowLink';
import { textLinkColor } from '../../../../../lib/css/utils';
import { fetchOrganizationProviders } from '../../../../api/graphql/queries/providers';

const EditReferralPage = async ({ params }: { params: { id: string } }) => {
  const user = await getLoggedInUser();
  const [providers, patient] = await Promise.all([
    fetchOrganizationProviders(user?.organizationId),
    fetchPatient(params.id),
  ]);

  const { optometristProviders, surgeonProviders } =
    separateOphOptomProviders(providers);

  return (
    <>
      <Grid item xs={12}>
        <PageTitleHeader title={'Edit Referral'} />
        <BackArrowLink
          color={textLinkColor}
          href="/referrals"
          title={'Referrals'}
        />
      </Grid>
      <Grid item xs={6} m={'auto'}>
        <ReferralForm
          patient={patient}
          optoms={optometristProviders}
          surgeons={surgeonProviders}
          user={user}
        />
      </Grid>
    </>
  );
};

export default EditReferralPage;
