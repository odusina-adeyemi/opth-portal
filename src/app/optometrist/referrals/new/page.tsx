import React from 'react';
import { Button, Grid } from '@mui/material';
import PageTitleHeader from '../../../../ui/components/PageTitleHeader';
import ReferralForm from './_components/ReferralForm';
import { getLoggedInUser } from '../../../../lib/getLoggedInUser';
import { separateOphOptomProviders } from '../../../../lib/utils/utils';
import BackArrowLink from '../../../../ui/components/BackArrowLink';
import { textLinkColor } from '../../../../lib/css/utils';
import { fetchOrganizationProviders } from '../../../../app/api/graphql/queries/providers';

const NewReferralPage = async () => {
  const user = await getLoggedInUser();
  const providers = await fetchOrganizationProviders(user?.organizationId);

  const { optometristProviders, surgeonProviders } =
    separateOphOptomProviders(providers);

  return (
    <div className="">
      <div className="mt-6">
        <BackArrowLink
          color={textLinkColor}
          href="/referrals"
          title="Referrals"
        />
      </div>
      <div className="bg-white w- h- p-12 mt-8 rounded-xl ml-6 mr-6 text-center flex flex-row gap-4 justify-between ">
        <div>
          {/* <PageTitleHeader title={'New Referral'} /> */}
          <h3 className="text-left">Request for Consultation</h3>
          <p className="text-red-400 text-sm text-left">
            You will have the opportunity to save this information <br />
            in PDF format following submission.
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-xs text-right mb-3">
            To send us Chart/Op notes please click here.
            <br /> Otherwise continue with the form
          </p>
          <Button
            variant="contained"
            color="primary"
            // size="medium"
            href="/upload"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 !capitalize ml-auto p-6"
          >
            Upload Chart
          </Button>
        </div>
      </div>

      <div className="bg-white w- h- p-12 mt-8 rounded-xl ml-6 mr-6 overflow-hidden">
        <ReferralForm
          optoms={optometristProviders}
          surgeons={surgeonProviders}
          user={user}
        />
      </div>
    </div>
  );
};

export default NewReferralPage;
