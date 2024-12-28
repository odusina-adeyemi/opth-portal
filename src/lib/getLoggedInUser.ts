// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import client from '../app/api/_apolloClient/apolloClientServerSide';
// import { GET_USER_WITH_EMAIL } from '../app/api/graphql/queries/users';
// import { User } from '../constants/types/types';

// export const getLoggedInUser = async (): Promise<User> => {
//   const { getUser } = getKindeServerSession();

//   const kindeUserObj = await getUser();

//   if (!kindeUserObj) {
//     return {} as User;
//   }

//   try {
//     const {
//       data: { me },
//     } = await client.query({
//       fetchPolicy: 'cache-first',
//       query: GET_USER_WITH_EMAIL,
//       variables: { email: kindeUserObj?.email },
//     });

//     return me;
//   } catch (error) {
//     return {} as User;
//   }
// };

// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import client from '../app/api/_apolloClient/apolloClientServerSide'; // Updated Apollo client import
// import { GET_USER_WITH_EMAIL } from '../app/api/graphql/queries/users';
// import { User } from '../constants/types/types';

// export const getLoggedInUser = async (): Promise<User> => {
//   const { getUser } = getKindeServerSession();

//   const kindeUserObj = await getUser();

//   if (!kindeUserObj) {
//     return {} as User; // Return an empty user object if the user is not found
//   }

//   try {
//     const { data } = await client.query({
//       query: GET_USER_WITH_EMAIL, // Apollo client query method
//       variables: { email: kindeUserObj.email },
//       fetchPolicy: 'cache-first', // Keep fetchPolicy
//     });

//     return data?.me ?? ({} as User); // Safely return the user data
//   } catch (error) {
//     console.error('Error fetching logged-in user:', error); // Log error for debugging
//     return {} as User; // Return an empty user object in case of an error
//   }
// };

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import client from '../app/api/_apolloClient/apolloClientServerSide'; // Apollo client import
import { GET_USER_WITH_EMAIL } from '../app/api/graphql/queries/users';
import { User } from '../constants/types/types';

export const getLoggedInUser = async (): Promise<User> => {
  const { getUser } = getKindeServerSession();

  const kindeUserObj = await getUser();

  if (!kindeUserObj) {
    return {} as User; // Return empty object if user is not found
  }

  try {
    const { data } = await client.query({
      query: GET_USER_WITH_EMAIL,
      variables: { email: kindeUserObj.email },
      fetchPolicy: 'cache-first', // Use cache-first policy for the query
    });

    return data?.me ?? ({} as User); // Safely return user data
  } catch (error) {
    console.error('Error fetching logged-in user:', error);
    return {} as User; // Return empty object on error
  }
};
