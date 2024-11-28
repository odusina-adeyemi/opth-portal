import React from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ApolloWrapper } from './api/_apolloClient/ApolloWrapper';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import LoginPage from '../ui/components/LoginPage';
import MuiXLicense from '../MuiXLicense';
import { CssBaseline, Grid, Typography } from '@mui/material';
import { getLoggedInUser } from '../lib/getLoggedInUser';
import LayoutUseClient from './LayoutUseClient';
import TopBar from '../ui/components/TopBar';
import { validateJwtToken } from '../lib/utils/utils';
import OptometristDashboard from "../app/optometrist/optometristLayout"
import './globals.css';

// The build would fail if this was not here
export const dynamic = 'force-dynamic'; // Disables static pre-rendering

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Viewpoint Co-management',
  description: 'CRM for ophthalmology practices and co-management patients',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, getAccessTokenRaw } = getKindeServerSession();
  const [isAuth, user, token] = await Promise.all([
    isAuthenticated(),
    getLoggedInUser(),
    getAccessTokenRaw(),
  ]);
console.log(user)
  let layout = null;

  if (!isAuth) {
    layout = <LoginPage />;
  }

  const isValidToken = await validateJwtToken(token);

  if (isAuth && user?.id && isValidToken) {
    // const isOptometrist = user?.role?.includes('optometrist');
    const isOptometrist = typeof user?.role === 'string' && user.role.toLowerCase() === 'optometrist';

    layout = (
      <AppRouterCacheProvider>
        <ApolloWrapper token={token} user={user}>
          <CssBaseline>
            {/* <OptometristDashboard user={user}>{children}</OptometristDashboard>
            <LayoutUseClient user={user}>{children}</LayoutUseClient> */}
            {isOptometrist ? (
                <OptometristDashboard user={user}>{children}</OptometristDashboard>
              ) : (
                <LayoutUseClient user={user}>{children}</LayoutUseClient>
              )}
            <MuiXLicense />
          </CssBaseline>
        </ApolloWrapper>
      </AppRouterCacheProvider>
    );
  } else if (isAuth && !user?.id) {
    layout = (
      <>
        <Grid item xs={12}>
          <TopBar user={user} />
        </Grid>
        <Grid container p={4}>
          <Grid item xs={12} textAlign={'center'}>
            <Typography variant="h5">
              Welcome to Viewpoint Co-management
            </Typography>
            <Typography variant="body1" mt={3}>
              Bummer! It looks like you&apos;re not in the system yet. Please
              contact your admin or email us at&nbsp;
              <b>support@viewpointcomanagement.com</b>.
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <html lang="en">
      <body className={roboto.className}>
        <main>{layout}</main>
      </body>
    </html>
  );
}
