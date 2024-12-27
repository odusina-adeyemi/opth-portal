'use client';
import React from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import SettingsIcon from '@mui/icons-material/Settings';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

const UserSettings = ({ orgName }: { orgName: string }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box display={'flex'} alignItems={'center'}>
        <Typography color={'white'} variant="caption">
          {orgName}
        </Typography>
      </Box>
      <IconButton onClick={handleClick}>
        <SettingsIcon style={{ fill: 'white' }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link href={'/user/profile'}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link href={'/user/my_account'}>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <LogoutLink>Logout</LogoutLink>{' '}
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserSettings;
