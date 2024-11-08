'use client';
import { ReactElement } from 'react';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { User } from '../../../constants/types/types';

let baseUrl = 'https://viewpointcomanagement.com';
if (
  typeof window !== 'undefined' &&
  window?.location?.hostname.includes('staging')
) {
  baseUrl = 'https://staging.viewpointcomanagement.com';
}

const uri =
  process.env.NODE_ENV === 'production' // with docker compose up NODE_ENV is "production"
    ? `${baseUrl}/api/graphql`
    : 'http://localhost:3000/api/graphql';

const httpLink = createHttpLink({
  uri,
});

export function ApolloWrapper({
  children,
  token,
  user,
}: {
  children: ReactElement;
  token: string;
  user: User;
}) {
  function makeClient() {
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin':
            process.env.NODE_ENV === 'production'
              ? uri
              : 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
          'Access-Control-Allow-Headers':
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Authorization, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          Authorization: `Bearer ${token}`,
          'X-User-Email': user?.email ?? '',
        },
      };
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
