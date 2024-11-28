// // "use client"

// import { getLoggedInUser } from '../../../../lib/getLoggedInUser';
// import { fetchOrganization } from '../../../api/graphql/queries/organizations';
// import { Grid, TextField } from '@mui/material';
// import PageTitleHeader from '../../../../ui/components/PageTitleHeader';
// import OptometristDashboard from '../../optometristLayout';
// import { User } from '../../../../constants/types/types';
// import { Organization } from '../../../../constants/types/types';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import LogoutButton from '../../_components/logOut';



// interface UserProfilePageProps {
//   user: User;
//   organization: Organization | null;
// }

// // const handleLogout = () => {
// //   const router = useRouter();
// //   // Perform logout logic (e.g., clearing session cookies, tokens)
// //   localStorage.clear(); // Example: Clear local storage
// //   router.push('/login'); // Redirect to the login page
// // };

// // Since `page.tsx` is a Server Component by default, you can fetch data directly here
// const UserProfilePage = async () => {
//   // Fetch the logged-in user
//   const user = await getLoggedInUser();
//   // Fetch the organization for the logged-in user
//   const organization = await fetchOrganization(user?.organizationId);

//   return (
//     <OptometristDashboard user={user}>
//       <Grid
//         container
//         className="mt-"
//         py={2}
//         display={'flex'}
//         justifyContent={'center'}>
//         <div className=" w-full gap-3 p-6">
//           <div className="w-full  bg-white p-6 rounded-md drop-shadow-md">
//             <div className="flex flex-row gap-4">
//               <div className="mt-3 ">
//                 {user ? (
//                   (user as User & { profileImage?: string }).profileImage ? (
//                     <Image
//                       src={
//                         (user as User & { profileImage?: string })
//                           .profileImage || ''
//                       }
//                       alt={`${user.firstName} ${user.lastName} Profile Picture`}
//                       className=" rounded-full object-cover"
//                       fill
//                     />
//                   ) : (
//                     <div className="w-20 h-20 bg-slate-50 rounded-full text-center text-xl p-6">{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</div>
//                   )
//                 ) : (
//                   <span>NA</span>
//                 )}
//               </div>

//               <div className="mt-6">
//                 <h5>{`${user?.firstName} ${user?.lastName}`}</h5>
//                 <p className="mb-1 text-sm">{user?.email}</p>
//               </div>
//             </div>

//             <h1></h1>
//             <div className="flex flex-row w-full gap-12 mt-8 mb-3">
//               <div className="ml-3">
//                 <p className="text-xs">Role:</p>
//                 <h5 className="">{user?.role}</h5>
//                 <div className="mt-3">
//                   <h1></h1>
//                   <p></p>
//                 </div>
//               </div>
//               <div className="ml-auto">
//                 <p className="text-xs font-medium">Organization Name:</p>
//                 <h5>{organization?.name}</h5>
//                 <div className="mt-3">
//                   <h1></h1>
//                   <p></p>
//                 </div>
//               </div>
//             </div>
//           </div>


// {/* <LogoutButton /> */}
//           {/* <div onClick={handleLogout} className="w-full cursor-pointer rounded-lg flex gap-3 bg-white h-12 p-2 mt-4"> */}

//             {/* <Image
//               src="/assets/logout_icon.svg"
//               alt="Profile Picture"
//               width={20}
//               height={20}
//             />
//             <span className="mt-1">Logout</span> */}
//           {/* </div> */}
//         </div>

//         {/* <PageTitleHeader title="User Profile" />
//         <Grid item xs={5} pb={1}>
//           <TextField
//             disabled
//             fullWidth
//             label="Name"
//             margin={'normal'}
//             value={`${user?.firstName} ${user?.lastName}`}
//             variant="standard"
//           />
//           <TextField
//             disabled
//             fullWidth
//             label="Email"
//             margin={'normal'}
//             value={`${user?.email}`}
//             variant="standard"
//           />
//           <TextField
//             disabled
//             fullWidth
//             label="Role"
//             margin={'normal'}
//             value={`${user?.role}`}
//             variant="standard"
//           />
//           <TextField
//             disabled
//             fullWidth
//             label="Organization"
//             margin={'normal'}
//             value={`${organization?.name}`}
//             variant="standard"
//           />
//         </Grid> */}
//       </Grid>
//     </OptometristDashboard>
//   );
// };

// export default UserProfilePage;




// "use client" removed, this is now a server component

import { getLoggedInUser } from "../../../../lib/getLoggedInUser";
import { fetchOrganization } from "../../../api/graphql/queries/organizations";
import OptometristDashboard from "../../optometristLayout";
import UserProfileCard from "./_component/UserProfileCard";

const UserProfilePage = async () => {
  const user = await getLoggedInUser();
  const organization = await fetchOrganization(user?.organizationId);

  return (
    <OptometristDashboard user={user}>
      <UserProfileCard user={user} organization={organization} />
    </OptometristDashboard>
  );
};

export default UserProfilePage;
