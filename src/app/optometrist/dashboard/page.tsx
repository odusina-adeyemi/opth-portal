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
import client from '../../../../src/app/api/_apolloClient/apolloClientServerSide';
import { User, Patient, Provider } from '../../../constants/types/types';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';










const page = async () => {
    const kindeClient = getKindeServerSession();
    const user = await kindeClient.getUser();

    // const user: User = await getLoggedInUser();
    // console.log("User:", user);
    //  const patients = await fetchOrganizationPatients(user?.organizationId);
    // // const patients = await fetchCurrentProviderPatients();
    // //   const { data, loading, error } = useQuery(GET_PROVIDER_PATIENTS);
    // // // console.log("dataPatients:",data)
    // const providerId = user?.providerId;
    // // const patients = user?.providerId ? await fetchProviderPatients(providerId) : [];
    // // // const patients: Patient[] = providerPatients.map(provider => ({
    // // //     ...provider,
    // // //     dob: provider.dob || '', // Ensure dob is provided
    // // // }));
    // // // const patients = user?.providerId ? await fetchProviderPatients(providerId) : [];
    // // console.log("Patient:", patients);
    
    let patients: Provider[] = [];
    
    // // Check if the user has a providerId before calling fetchProviderPatients
    // if (user?.providerId) {
    //   try {
    //     const providerId = user?.providerId;
    //     patients = await fetchProviderPatients(providerId);
    //   } catch (error) {
    //     console.error("Error fetching provider patients:", error);
    //     patients = []; // Fallback to an empty array on error
    //   }
    // } else {
    //   console.warn("No providerId found for the user.");
    // }
    
    // console.log("Patients:", patients);
    
    // try {
   
        // Fetch the session
//         const {getUser} = getKindeServerSession();
// const user = await getUser();

// console.log(user);
    
        // if (!user) {
        //   console.error("user not found!.");
        //   return <div>Error: User not found!</div>;
        // }
    
    
     
    

    
    //     if (!user) {
    //       console.log("Fetching user details from the database...");
    //       const dbUser = await fetchUser(userId);
    //       if (dbUser && dbUser.providerId) {
    //         resolvedProviderId = dbUser.providerId;
    //         resolvedOrganizationId = dbUser.organizationId;
    //         console.log("Resolved ProviderID from Database:", resolvedProviderId);
    //       } else {
    //         console.error("User not found in the database.");
    //         return <div>Error: User not found in the database</div>;
    //       }
    //     }
    
    //     if (!resolvedProviderId) {
    //       console.error("Provider ID could not be resolved.");
    //       return <div>Error: Provider ID not found</div>;
    //     }
    
    //     // Fetch provider patients
    //     console.log("Fetching patients for ProviderID:", resolvedProviderId);
    //     const { data, errors } = await client.query({
    //       query: GET_PROVIDER_PATIENTS,
    //       variables: { providerId: resolvedProviderId },
    //     });
    
    //     if (errors || !data) {
    //       console.error("Error fetching patients:", errors);
    //       return <div>Error loading patients</div>;
    //     }
    
    //     const patients = data.providerPatients;
    //     console.log("Fetched Patients:", patients);





    // } 
    //     catch (error) {
    //     console.error("Unexpected error:", error);
    //     return <div>Error: Something went wrong</div>;
    // }



    // const user = await getLoggedInUser();    
    // const patients = await fetchProviderPatients(user?.providerId);
    // console.log("ProviderID:", user?.provider?.id)
    // console.log("Patients:", patients)



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
                    {/* <ReferralsTable patientData={patients} orgId={user.organizationId! || ''} providerId={providerId} /> */}
                </Grid>
            </div>
        </div>
    );
};

export default page;

