// import { createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import {
//   ApolloClient,
//   InMemoryCache,
//   registerApolloClient,
// } from '@apollo/experimental-nextjs-app-support';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import {
//   validateToken,
//   type jwtValidationResponse,
// } from '@kinde/jwt-validator';
// import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
// import prisma from '../../../../lib/prisma';
// import { writeLogEntry } from '../../../lib/utils/logging';

// type tokenType = string | null;

// const uri =
//   process.env.NODE_ENV === 'production' // with docker compose up NODE_ENV is "production"
//     ? `${process.env.NEXT_PUBLIC_KINDE_SITE_URL}/api/graphql`
//     : 'http://localhost:3000/api/graphql';

// const httpLink = createHttpLink({
//   uri,
// });

// const authLink = setContext(async (_, { headers }) => {
//   // get the authentication token from Kinde
//   const { getAccessTokenRaw, getUser } = getKindeServerSession();
//   let token: tokenType = await getAccessTokenRaw();

//   let user = null;
//   let kindeUser: KindeUser | null = null;

//   try {
//     // Verify and decode the JWT
//     const validationResult: jwtValidationResponse = await validateToken({
//       token,
//       domain: process.env.KINDE_ISSUER_URL,
//     });

//     if (!validationResult.valid) {
//       token = null;
//     }

//     kindeUser = await getUser();
//     console.log('kindeUser', kindeUser);
//     user = await prisma.user.findUnique({
//       where: {
//         email: kindeUser?.email ?? undefined,
//       },
//     });
//     if (!user) {
//       throw new Error('User not found');
//     }
//   } catch (err: any) {
//     writeLogEntry(err.message);
//     token = null;
//   }

//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       'Access-Control-Allow-Credentials': 'true',
//       'Access-Control-Allow-Origin':
//         process.env.NODE_ENV === 'production' ? uri : 'http://localhost:3000',
//       'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
//       'Access-Control-Allow-Headers':
//         'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Authorization, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
//       'Cross-Origin-Opener-Policy': 'same-origin',
//       'Referrer-Policy': 'strict-origin-when-cross-origin',
//       'X-User-Email': kindeUser?.email ?? '',
//       Authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: authLink.concat(httpLink),
//   });
// });

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../../../../lib/prisma';
import { validateToken } from '@kinde/jwt-validator';

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? `${process.env.NEXT_PUBLIC_KINDE_SITE_URL}/api/graphql`
      : 'http://localhost:3000/api/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const { getAccessTokenRaw, getUser } = getKindeServerSession();
  let token: string | null = await getAccessTokenRaw();

  try {
    const validationResult = await validateToken({
      token,
      domain: process.env.KINDE_ISSUER_URL,
    });

    if (!validationResult.valid) token = null;

    const user = await getUser();
    const dbUser = await prisma.user.findUnique({
      where: { email: user?.email ?? undefined },
    });

    if (!dbUser) throw new Error('User not found');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('An unknown error occurred');
    }
    token = null;
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
