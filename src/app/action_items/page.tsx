import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { getLoggedInUser } from '../../lib/getLoggedInUser';
import ProvidersListExpand from './_components/ProvidersListExpand';
import ReferrerVisitTimelineSelection from './_components/ReferrerVisitTimelineSelection';
import PageTitleHeader from '../../ui/components/PageTitleHeader';

const ActionItemPage = async () => {
  const user = await getLoggedInUser();

  /// Surgeon
  // scheduled visits for established referrers and visits for new referrers...so visits to optom providers
  // Actively referring optometrists should be seen every x months (we will probably
  // use 6 months but would be good to adjust, each practice will want something different).
  // When a visit is done the date and who visited should be recorded. It will then popup again to be done in x months.

  /// Liaison
  //
  return (
    <>
      <PageTitleHeader title="Action Items" />
      <Grid item xs={12} sm={8} mb={2}>
        <Typography variant="body1">Coming soon</Typography>
        {/* <Paper>
          <Typography variant="h6">
            {user.firstName}&apos;s Action Items
          </Typography>
          <Typography variant="body1">Total Visits needed:</Typography>
          <Typography variant="body1">
            Visits needed for new referrers:
          </Typography>
          <Typography variant="body1">
            Visits needed for current referrers:
          </Typography>
        </Paper> */}
      </Grid>
      {/* <Grid item xs={12} sm={8} mb={2}>
        <Paper>
          <Typography variant="h6">
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8} mb={2}>
        <Paper>
          <Typography>
            Adjust the number of months between visits for optometrists
          </Typography>
          <ReferrerVisitTimelineSelection />
        </Paper>
      </Grid> */}
    </>
  );
};

export default ActionItemPage;
