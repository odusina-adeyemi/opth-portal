import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const backgroundColor = '#c2cee2de';

const TableSkeleton = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Skeleton
          width={'100%'}
          height={40}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}>
        <Skeleton
          width={200}
          height={40}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
        <Skeleton
          width={200}
          height={40}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
      </Grid>
      <Grid item xs={12} display={'flex'} mt={2}>
        <Skeleton width={120} sx={{ bgcolor: backgroundColor, ml: 1 }} />
        <Skeleton width={120} sx={{ bgcolor: backgroundColor, ml: 1 }} />
        <Skeleton width={120} sx={{ bgcolor: backgroundColor, ml: 1 }} />
        <Skeleton width={120} sx={{ bgcolor: backgroundColor, ml: 1 }} />
        <Skeleton width={120} sx={{ bgcolor: backgroundColor, ml: 1 }} />
        <Skeleton width={120} sx={{ bgcolor: backgroundColor, ml: 1 }} />
        <Skeleton width={120} sx={{ bgcolor: backgroundColor, ml: 1 }} />
        <Skeleton width={120} sx={{ bgcolor: backgroundColor, ml: 1 }} />
        <Skeleton width={120} sx={{ bgcolor: backgroundColor, ml: 1 }} />
        <Skeleton width={120} sx={{ bgcolor: backgroundColor, ml: 1 }} />
      </Grid>
      <Skeleton
        variant="rectangular"
        width={'100%'}
        height={75}
        sx={{ bgcolor: backgroundColor, m: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width={'100%'}
        height={75}
        sx={{ bgcolor: backgroundColor, m: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width={'100%'}
        height={75}
        sx={{ bgcolor: backgroundColor, m: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width={'100%'}
        height={75}
        sx={{ bgcolor: backgroundColor, m: 1 }}
      />
      <Skeleton
        variant="rectangular"
        width={'100%'}
        height={75}
        sx={{ bgcolor: backgroundColor, m: 1 }}
      />
    </Grid>
  );
};

export default TableSkeleton;
