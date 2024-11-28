



"use client"

import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Dashboard,
  People,
  Event,
  Assessment,
  AccountCircle as Profile,
  Notifications,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { SnackbarProvider } from '../../../src/app/_components/SnackbarProvider';
import { ModalProvider } from '../../../src/app/_components/ModalProvider';
import { User } from '../../constants/types/types';
import UserSettings from './ui/_components/UserSettings';

interface OptometristDashboardProps {
  children: React.ReactNode;
  user: User;
}

const drawerWidth = 240;

export default function OptometristDashboard({ children, user }: OptometristDashboardProps) {
  const router = useRouter();

  // Role check: Redirect if the user is not an optometrist
  useEffect(() => {
    if (user?.role?.toLowerCase() !== 'optometrist') {
      router.push('/unauthorized');
    }
  }, [user.role, router]);

  // Navigation links for the sidebar
  const menuItems = useMemo(
    () => [
      { text: 'Dashboard', icon: <Dashboard />, path: '/optometrist/dashboard' },
      { text: 'Patients', icon: <People />, path: '/optometrist/patients' },
      { text: 'Appointments', icon: <Event />, path: '/optometrist/appointments' },
      { text: 'Reports', icon: <Assessment />, path: '/optometrist/reports' },
      { text: 'Profile', icon: <Profile />, path: '/optometrist/user/profile' },
    ],
    []
  );

  // Handle navigation
  const handleNavigation = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  // Determine active route
  const currentPath = usePathname();

  return (
    <SnackbarProvider>
      <ModalProvider>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <CssBaseline />

          {/* Top Bar */}
          <AppBar
            className="!bg-white text-gray-200" // Custom styles
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <Typography variant="h6" className="" noWrap sx={{ flexGrow: 1 }}>
                Opt Dashboard
              </Typography>
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
              <Box className="flex text-gray-200">
                <UserSettings orgName={user?.organization?.name} />
              </Box>
            </Toolbar>
          </AppBar>

          {/* Sidebar */}
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    key={item.text}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      backgroundColor: currentPath === item.path ? '#4BA7C1' : 'white', // Default and darker shade
                      color: currentPath === item.path ? 'white' : '#4BA7C1', // Contrast with default color
                      '&:hover': {
                        backgroundColor: '#67B8D1', // Lighter shade for hover effect
                        color: 'white', // Change text color to white on hover
                        '& .MuiListItemIcon-root': {
                          color: 'white', // Change icon color to white on hover
                        },
                      },
                      '&:focus': {
                        backgroundColor: '#4BA7C1', // Keep default color on focus
                      },
                      borderRadius: 1, // Adds a slight rounded effect
                      cursor: 'pointer',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: currentPath === item.path ? 'white' : '#4BA7C1',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText  primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          {/* Main Content */}
          <div
            className="bg-[#f2f6f8] h-[100vh] w-full align-middle mt-8 p-0"
          >
            {children}
          </div>
        </Box>
      </ModalProvider>
    </SnackbarProvider>
  );
}
