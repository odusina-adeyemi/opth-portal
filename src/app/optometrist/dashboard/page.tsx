import { Typography, Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import ReferralsTable from './_components/ReferralsTable';
import { getLoggedInUser } from '../../../lib/getLoggedInUser';
import { fetchOrganizationPatients } from '../../api/graphql/queries/patients';
import { GET_PROVIDER_PATIENTS, fetchProviderPatients } from '../../api/graphql/queries/providers';
import { useQuery } from '@apollo/client';
import { fetchUser, fetchUserByEmail } from '../../api/graphql/queries/users';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { GraphQLClient, gql } from "graphql-request";
import { Patient, Provider } from '../../../constants/types/types';









const page = async () => {
   
    // const GRAPHQL_ENDPOINT = process.env.GRAPHQL_API_URL as string; // Load from .env

    // const fetchProviderPatients = async (): Promise<Patient[]> => {
    //     if (!GRAPHQL_ENDPOINT) {
    //       throw new Error("GRAPHQL_API_URL is not set in .env file");
    //     }
      
    //     try {
    //       const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       });
      
    //       const data = await client.request<{ providerPatients: Patient[] }>(GET_PROVIDER_PATIENTS);
    //       return data.providerPatients;
    //     } catch (error) {
    //       console.error("Error fetching provider patients:", error);
    //       return [];
    //     }
    //   };
const user = await getLoggedInUser();
const providerId = user.providerId || '';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
const patients = await fetchProviderPatients(providerId);
console.log("Patients:", patients);
// console.log("User:", user);

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
                    <ReferralsTable patientData={patients} orgId={user.organizationId || ''}/>
                </Grid>
            </div>
        </div>
    );
};

export default page;

