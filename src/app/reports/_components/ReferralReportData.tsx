'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORGANIZATION_PATIENTS } from '../../api/graphql/queries/patients';
// start by fetching from client side...then maybe do server side

const ReferralReportData = ({ orgId }: { orgId: string }) => {
  // fetch all referrals plus count of referrals
  // make orgPatients separate call

  // date variable MUST be an ISO string format to query by the createdAt field
  // endDate needs to be "endDate": "2024-05-01T23:59:59.000Z" if only wanting to
  // query for a single day.  In fact, endDate will always need to be 23:59:59.000Z
  // in order to cover the whole day

  const { data, error, loading } = useQuery(GET_ORGANIZATION_PATIENTS, {
    variables: { startDate: '2024-05-01T00:00:00.000Z', organizationId: orgId },
  });

  // total count of referrals - data.orgPatients.length
  //
  return <div>ReferralReportData</div>;
};

export default ReferralReportData;
