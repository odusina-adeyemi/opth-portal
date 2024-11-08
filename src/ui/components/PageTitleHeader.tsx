import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { pageTitleHeaderBackgroundColor } from '../../lib/css/utils';

const PageTitleHeader = ({ title }: { title: string }) => {
  return (
    <Grid
      item
      xs={12}
      bgcolor={pageTitleHeaderBackgroundColor}
      position={'relative'}>
      <Box display={'flex'} alignItems={'center'}>
        <Box
          height={'32px'}
          boxSizing={'border-box'}
          width={'3px'}
          mx={1}
          bgcolor={'white'}
          position="relative"
          left={'10px'}
        />
        <Typography variant="h6" color={'white'} pl={1} fontWeight={'bold'}>
          {title}
        </Typography>
      </Box>
    </Grid>
  );
};

export default PageTitleHeader;
