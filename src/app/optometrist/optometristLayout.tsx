// // import React from 'react';
// // import { CssBaseline } from '@mui/material';
// // import TopBar from '../../ui/components/TopBar';

// // interface OptometristLayoutProps {
// //   children: React.ReactNode;
// //   user: any;
// // }

// // export default function OptometristLayout({ children, user }: OptometristLayoutProps) {
// //   return (
// //     <>
// //       <CssBaseline />
// //       <TopBar user={user} />
// //       <main>
// //         {/* Add any other optometrist-specific components here */}
// //         {children}
// //       </main>
// //     </>
// //   );
// // }



// import React from 'react';
// import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import { Dashboard, People, Event, Assessment, Notifications, Logout } from '@mui/icons-material';
// import { useRouter } from 'next/router';

// interface OptometristDashboardProps {
//   children: React.ReactNode;
// }

// const drawerWidth = 240;

// export default function OptometristDashboard({ children }: OptometristDashboardProps) {
//   const router = useRouter();

//   // Navigation links for the sidebar
//   const menuItems = [
//     { text: 'Dashboard', icon: <Dashboard />, path: '/optometrist/dashboard' },
//     { text: 'Patients', icon: <People />, path: '/optometrist/patients' },
//     { text: 'Appointments', icon: <Event />, path: '/optometrist/appointments' },
//     { text: 'Reports', icon: <Assessment />, path: '/optometrist/reports' },
//   ];

//   // Handle navigation
//   const handleNavigation = (path: string) => {
//     router.push(path);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />

//       {/* Top Bar */}
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
//             Optometrist Dashboard
//           </Typography>
//           <IconButton color="inherit">
//             <Notifications />
//           </IconButton>
//           <IconButton color="inherit">
//             <Logout />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: 'auto' }}>
//           <List>
//             {menuItems.map((item) => (
//               <ListItem button key={item.text} onClick={() => handleNavigation(item.path)}>
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, p: 3, marginTop: 8, marginLeft: drawerWidth }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// }


"use client";
import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, People, Event, Assessment, Notifications, Logout, AccountCircle as Profile } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import TopBar from '../../ui/components/TopBar';
import { SnackbarProvider } from '../../../src/app/_components/SnackbarProvider';
import { ModalProvider } from '../../../src/app/_components/ModalProvider';
import { User } from '../../constants/types/types';
import UserSettings from './ui/_components/UserSettings';
import UserProfilePage from './user/profile/page';

interface OptometristDashboardProps {
  children: React.ReactNode;
  user: User;
}

const drawerWidth = 240;

export default function OptometristDashboard({ children, user }: OptometristDashboardProps) {
  const router = useRouter();

  // Role check: Redirect if the user is not an optometrist
  useEffect(() => {
    if (user.role !== 'optometrist') {
      router.push('/unauthorized');
      console.log("User", user.role);
    }
  }, [user.role, router]);

  // Navigation links for the sidebar
  const menuItems = useMemo(() => [
    { text: 'Dashboard', icon: <Dashboard />, path: '/optometrist/dashboard' },
    { text: 'Patients', icon: <People />, path: '/optometrist/patients' },
    { text: 'Appointments', icon: <Event />, path: '/optometrist/appointments' },
    { text: 'Reports', icon: <Assessment />, path: '/optometrist/reports' },
    { text: 'Profile', icon: <Profile />, path: '/optometrist/user/profile' },
  ], []);
  

  // Handle navigation
  const handleNavigation = useCallback((path: string) => {
    router.push(path);
  }, [router]);
  

  // Handle logout
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens, redirect to login)
    localStorage.removeItem('token'); // Clear the token from local storage
    // You can add any other logout logic here, such as clearing user data from context or state
    router.push('/login');
  };

  return (
    <SnackbarProvider>
      <ModalProvider>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <CssBaseline />

          {/* Top Bar */}
          <AppBar className='!bg-primary-default' position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
              <Typography variant="h6"  className="" noWrap sx={{ flexGrow: 1 }}>
                Opt Dashboard
              </Typography>
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
              {/* <IconButton color="inherit" onClick={handleLogout}>
                <Logout />
              </IconButton> */}
              <Box className="flex" >
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
                  <ListItem  key={item.text} onClick={() => handleNavigation(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          {/* Main Content */}
          <div className='bg-gray-50 h-[100vh] w-full  align-middle mt-8 p-0'
          // style={{ marginLeft: '2px' }} // Adjust to reduce space between sidebar and main content
          // style={{ marginLeft: drawerWidth }}
            // component="main"
            // sx={{ flexGrow: 1, p: 3, marginTop: 8, marginLeft: drawerWidth }}
          >
            {children}
           
          </div>
        </Box>
      </ModalProvider>
    </SnackbarProvider>
  );
}
