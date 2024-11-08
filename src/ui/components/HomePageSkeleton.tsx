import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const backgroundColor = '#c2cee2de';

const HomePageSkeleton = () => {
  return (
    <Grid container>
      <Grid item xs={12} pr={2}>
        <Skeleton
          width={'100%'}
          height={56}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
      </Grid>
      <Grid item xs={2} display={'flex'} mt={1}>
        <Skeleton
          width={'100%'}
          variant={'rectangular'}
          height={'35vh'}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
      </Grid>

      <Grid item xs={10} display={'flex'} pt={1} pr={1}>
        <Skeleton
          width={'100%'}
          variant={'rectangular'}
          height={'35vh'}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
      </Grid>
    </Grid>
  );
};

export default HomePageSkeleton;
