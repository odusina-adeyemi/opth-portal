import React from 'react';
import { CssBaseline } from '@mui/material';
import TopBar from '../../ui/components/TopBar';

interface OptometristLayoutProps {
  children: React.ReactNode;
  user: any;
}

export default function OptometristLayout({ children, user }: OptometristLayoutProps) {
  return (
    <>
      <CssBaseline />
      <TopBar user={user} />
      <main>
        {/* Add any other optometrist-specific components here */}
        {children}
      </main>
    </>
  );
}
