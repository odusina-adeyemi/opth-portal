import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const backgroundColor = '#c2cee2de';

const UserProfileSkeleton = () => {
  return (
    <Grid container display={'flex'} justifyContent={'center'}>
      <Grid
        item
        xs={12}
        flexWrap={'wrap'}
        display={'flex'}
        flexDirection={'column'}
        alignContent={'center'}
      >
        <Skeleton
          width={400}
          height={100}
          sx={{ bgcolor: backgroundColor, m: 0 }}
        />
        <Skeleton
          width={400}
          height={75}
          sx={{ bgcolor: backgroundColor, m: 0 }}
        />
        <Skeleton
          width={400}
          height={75}
          sx={{ bgcolor: backgroundColor, m: 0 }}
        />
        <Skeleton
          width={400}
          height={75}
          sx={{ bgcolor: backgroundColor, m: 0 }}
        />
        <Skeleton
          width={400}
          height={75}
          sx={{ bgcolor: backgroundColor, m: 0 }}
        />
        <Skeleton
          width={400}
          height={75}
          sx={{ bgcolor: backgroundColor, m: 0 }}
        />
      </Grid>
    </Grid>
  );
};

export default UserProfileSkeleton;
