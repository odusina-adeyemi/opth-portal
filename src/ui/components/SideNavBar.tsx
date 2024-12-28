'use client';
import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { Chip } from '@mui/material';
import { usePathname } from 'next/navigation';
import { pageTitleHeaderBackgroundColor } from '../../lib/css/utils';

const NAVIGATION = [
  { href: '/', name: 'Home' },
  { href: '/action_items', name: 'Action Items' },
  { href: '/referrals', name: 'Referrals' },
  { href: '/providers', name: 'Providers' },
  { href: '/clinics', name: 'Clinics' },
  { href: '/reports', name: 'Reports' },
];

const SideNavBar = () => {
  const pathname = usePathname();

  return NAVIGATION.map((nav, index) => {
    return (
      <Box
        key={index}
        m={0.4}
        bgcolor={
          pathname === nav.href ? pageTitleHeaderBackgroundColor : '#abdae4'
        }
        display={'flex'}
        position={'relative'}
      >
        <Box
          mx={1}
          bgcolor={'white'}
          position="relative"
          left={'10px'}
          width={'2px'}
        />
        <Box ml={1.5}>
          <Link
            href={nav.href}
            style={{
              color: pathname === nav.href ? 'white' : '#0f5262',
              fontWeight: 'bold',
              textAlign: 'left',
            }}
          >
            {nav.name}{' '}
            {nav.name === 'Action Items' && (
              <Chip
                label="Coming Soon"
                variant="outlined"
                color="primary"
                size="small"
                sx={{
                  display: 'block',
                  margin: 'auto',
                  width: 'fit-content',
                }}
              />
            )}
            {nav.name === 'Reports' && (
              <Chip
                label="Coming Soon"
                variant="outlined"
                color="primary"
                size="small"
                sx={{
                  display: 'block',
                  margin: 'auto',
                  width: 'fit-content',
                }}
              />
            )}
          </Link>
        </Box>
      </Box>
    );
  });
};

export default SideNavBar;
