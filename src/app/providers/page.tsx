import React from 'react';
import { Grid } from '@mui/material';
import { fetchDateOfLastReferralSentByProvider } from '../api/graphql/queries/patients';
import ProvidersTable from './_components/ProvidersTable';
import { Provider } from '../../constants/types/types';
import {
  fetchOrganizationProviders,
  ProviderWithReferral,
} from '../api/graphql/queries/providers';
import { getLoggedInUser } from '../../lib/getLoggedInUser';
import PageTitleHeader from '../../ui/components/PageTitleHeader';
import { mainBackgroundColor } from '../../lib/css/utils';

type LatestProviderReferral = {
  referringProviderId: string;
  lastReferralDate: Date | null | undefined;
};

const ProvidersPage = async () => {
  const user = await getLoggedInUser();
  const providers = await fetchOrganizationProviders(user?.organizationId);

  const latestReferrals: LatestProviderReferral[] =
    await fetchDateOfLastReferralSentByProvider(
      providers?.map((provider: Provider) => provider.id),
    );

  // combine providers and latestReferrals by id
  const providersWithLastReferralDate: ProviderWithReferral[] = providers?.map(
    (provider: Provider) => {
      const lastReferralDate = latestReferrals.find(
        referral => referral.referringProviderId === provider.id,
      );

      return {
        ...provider,
        lastReferralDate: lastReferralDate?.lastReferralDate,
      };
    },
  );

  return (
    <>
      <PageTitleHeader title={'Providers'} />
      <Grid item xs={12} bgcolor={mainBackgroundColor}>
        <ProvidersTable providers={providersWithLastReferralDate} />
      </Grid>
    </>
  );
};

export default ProvidersPage;
