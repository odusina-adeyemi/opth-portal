'use client';
import React from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
        <Typography>
          {orgName}
        </Typography>
      </Box>
      <IconButton onClick={handleClick}>
        <AccountCircleIcon  />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <Link href={'/optometrist/user/profile'}> 
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link href={'/optometrist/user/my_account'}>
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
