import React from 'react';
import { Grid, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UserSettings from './UserSettings';
import { User } from '../../constants/types/types';
import { topBarBackgroundColor } from '../../lib/css/utils';

const TopBar = ({ user }: { user: User }) => {
  return (
    <Grid container p={1} bgcolor={topBarBackgroundColor}>
      <Grid
        item
        xs={6}
        display="flex"
        justifyContent={'left'}
        alignItems={'center'}
        pl={3}
      >
        <VisibilityIcon style={{ fill: 'white' }} />
        &nbsp;
        <Typography variant="h6" color={'white'}>
          <b>Viewpoint</b> Co-management
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={'right'} pr={3}>
        <UserSettings orgName={user?.organization?.name} />
      </Grid>
    </Grid>
  );
};

export default TopBar;
