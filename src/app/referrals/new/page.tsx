import React from 'react';
import { Grid } from '@mui/material';
import PageTitleHeader from '../../../ui/components/PageTitleHeader';
import ReferralForm from './_components/ReferralForm';
import { getLoggedInUser } from '../../../lib/getLoggedInUser';
import { separateOphOptomProviders } from '../../../lib/utils/utils';
import BackArrowLink from '../../../ui/components/BackArrowLink';
import { textLinkColor } from '../../../lib/css/utils';
import { fetchOrganizationProviders } from '../../api/graphql/queries/providers';

const NewReferralPage = async () => {
  const user = await getLoggedInUser();
  const providers = await fetchOrganizationProviders(user?.organizationId);

  const { optometristProviders, surgeonProviders } =
    separateOphOptomProviders(providers);

  return (
    <>
      <Grid item xs={12} p={1}>
        <PageTitleHeader title={'New Referral'} />
      </Grid>
      <Grid item xs={12}>
        <BackArrowLink
          color={textLinkColor}
          href="/referrals"
          title="Referrals"
        />
      </Grid>
      <Grid item xs={6} m={'auto'}>
        <ReferralForm
          optoms={optometristProviders}
          surgeons={surgeonProviders}
          user={user}
        />
      </Grid>
    </>
  );
};

export default NewReferralPage;
