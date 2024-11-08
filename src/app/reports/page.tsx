import React from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import PageTitleHeader from '../../ui/components/PageTitleHeader';
import ReferralReportData from './_components/ReferralReportData';
import { getLoggedInUser } from '../../lib/getLoggedInUser';
// alphabetize the reports array

const reports = [
  'All Referring Providers',
  'Gross Income from CM',
  'High Risk Providers',
  'Key Referring Providers',
  'Marketing Analysis',
  'Net Income from CM',
  'New Referring Providers',
  'Providers Not Referring',
  'Referrals Sent per Month',
  'Targeted Providers',
];

const ReportsPage = async () => {
  const user = await getLoggedInUser();

  return (
    <>
      <PageTitleHeader title="Reports" />
      <Grid item xs={12} md={6}>
        <Typography variant="body1">Coming Soon</Typography>
        {/* <ReferralReportData orgId={user?.organizationId} /> */}
        {/* <List>
          {reports.map((report, index) => (
            <Link key={index} href={`/reports/view`}>
              <ListItem>
                <ListItemButton disabled={index !== 3}>
                  {report}
                  {index !== 3 && (
                    <Typography variant="subtitle2"> - Coming soon</Typography>
                  )}
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List> */}
      </Grid>
    </>
  );
};

export default ReportsPage;
