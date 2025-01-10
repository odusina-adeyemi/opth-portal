import { Typography, Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import ReferralsTable from './_components/ReferralsTable';
import { getLoggedInUser } from '../../../lib/getLoggedInUser';
import { fetchOrganizationPatients } from '../../api/graphql/queries/patients';

interface Patient {
  id: number;
  name: string;
  // Add other patient properties here
}

const user = await getLoggedInUser();
const patients = await fetchOrganizationPatients(user?.organizationId);

const page = () => {
  return (
    <div>
      <div className="flex flex-row p-6 gap-4 w-full mt-6">
        <div className="flex bg-[#6D7FE1] h-36 w-full p-4 gap-3 rounded-md text-white">
          <div>
            <Image
              className="fill-white"
              src="/assets/blueCard.svg"
              alt="Users"
              width={60}
              height={50}
            />
          </div>
          <div className=" text-white">
            <Typography className=" !text-white" variant="h6">
              Revenue YTD
            </Typography>
            <Typography className=" !text-white" variant="h4">
              20
            </Typography>
          </div>
        </div>
        <div className="flex bg-[#6DC5E1] h-36 w-full p-4 gap-3 rounded-md text-white">
          <div>
            <Image
              className="fill-white"
              src="/assets/users.svg"
              alt="Users"
              width={60}
              height={50}
            />
          </div>
          <div className=" text-white">
            <Typography className=" !text-white" variant="h6">
              Revenue MTD
            </Typography>
            <Typography className=" !text-white" variant="h4">
              20
            </Typography>
          </div>
        </div>
        <div className="flex bg-[#9F6FC6] h-36 w-full p-4 gap-3 rounded-md text-white">
          <div>
            <Image
              className="fill-white"
              src="/assets/users.svg"
              alt="Users"
              width={60}
              height={50}
            />
          </div>
          <div className=" text-white">
            <Typography className=" !text-white" variant="h6">
              Patients YTD
            </Typography>
            <Typography className=" !text-white" variant="h4">
              20
            </Typography>
          </div>
        </div>
        <div className="flex bg-[#349BA1] h-36 w-full p-4 gap-3 rounded-md text-white">
          <div>
            <Image
              className="fill-white"
              src="/assets/users.svg"
              alt="Users"
              width={60}
              height={50}
            />
          </div>
          <div className=" text-white">
            <Typography className=" !text-white" variant="h6">
              Patients MTD
            </Typography>
            <Typography className=" !text-white" variant="h4">
              20
            </Typography>
          </div>
        </div>
      </div>

      <div>
        <Grid item xs={12}>
          <ReferralsTable patientData={patients} orgId={user.organizationId} />
        </Grid>
      </div>
    </div>
  );
};

export default page;
