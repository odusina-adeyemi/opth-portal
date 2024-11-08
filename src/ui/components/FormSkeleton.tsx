import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const backgroundColor = '#c2cee2de';

const FormSkeleton = () => {
  return (
    <Grid container display={'flex'} justifyContent={'center'}>
      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        <Skeleton
          width={800}
          height={40}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
      </Grid>
      <Grid item xs={6} display={'flex'} mt={3}>
        <Skeleton
          width={395}
          variant={'rectangular'}
          height={60}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
        <Skeleton
          width={395}
          variant={'rectangular'}
          height={60}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
      </Grid>
      <Grid container display={'flex'} justifyContent={'center'}>
        <Grid item xs={6} display={'flex'} pt={2}>
          <Skeleton
            width={395}
            variant={'rectangular'}
            height={60}
            sx={{ bgcolor: backgroundColor, ml: 1 }}
          />
          <Skeleton
            width={395}
            variant={'rectangular'}
            height={60}
            sx={{ bgcolor: backgroundColor, ml: 1 }}
          />
        </Grid>
      </Grid>
      <Grid item xs={6} display={'flex'} pt={2}>
        <Skeleton
          width={395}
          variant={'rectangular'}
          height={60}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
        <Skeleton
          width={395}
          variant={'rectangular'}
          height={60}
          sx={{ bgcolor: backgroundColor, ml: 1 }}
        />
      </Grid>
      <Grid container display={'flex'} justifyContent={'center'}>
        <Grid item xs={6} display={'flex'} pt={2}>
          <Skeleton
            width={395}
            variant={'rectangular'}
            height={60}
            sx={{ bgcolor: backgroundColor, ml: 1 }}
          />
          <Skeleton
            width={395}
            variant={'rectangular'}
            height={60}
            sx={{ bgcolor: backgroundColor, ml: 1 }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormSkeleton;
