'use client';
import React, { ReactNode } from 'react';
import { Grid, Typography } from '@mui/material';
import SideNavBar from '../ui/components/SideNavBar';
import TopBar from '../ui/components/TopBar';
import { SnackbarProvider } from './_components/SnackbarProvider';
import { ModalProvider } from './_components/ModalProvider';
import { mainBackgroundColor, sideNavBackgroundColor } from '../lib/css/utils';
import { User } from '../constants/types/types';

const LayoutUseClient = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) => {
  if (!user.organizationId) {
    return (
      <>
        <Grid item xs={12}>
          <TopBar user={user} />
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          <Typography variant="h6" color={'black'}>
            Contact admin user or viewpoint co-management support for access to
            your organization
          </Typography>
        </Grid>
      </>
    );
  }

  return (
    <SnackbarProvider>
      <ModalProvider>
        <Grid container>
          <Grid item xs={12}>
            <TopBar user={user} />
          </Grid>
          <Grid
            bgcolor={sideNavBackgroundColor}
            item
            xs={2}
            p={1}
            pt={2}
            display={'flex'}
            alignContent={'center'}
            flexDirection={'column'}
          >
            <SideNavBar />
          </Grid>
          <Grid
            item
            xs={10}
            bgcolor={mainBackgroundColor}
            minHeight={'100vh'}
            flex={1}
          >
            {children}
          </Grid>
        </Grid>
      </ModalProvider>
    </SnackbarProvider>
  );
};

export default LayoutUseClient;
