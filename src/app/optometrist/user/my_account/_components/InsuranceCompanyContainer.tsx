'use client';
import React, { useState } from 'react';
import { Grid, Paper, Typography, Divider } from '@mui/material';
import InsuranceCompanyList from './InsuranceCompanyList';
import InsuranceCompanyFormContainer from './InsuranceCompanyFormContainer';
import { InsuranceCompany } from '../../../../../constants/types/types';

const InsuranceCompanyContainer = ({ orgId }: { orgId: string }) => {
  const [company, setCompany] = useState<InsuranceCompany | null>(null);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Insurance companies</Typography>
      <Grid container>
        <Grid item xs={12}>
          <InsuranceCompanyList orgId={orgId} setCompany={setCompany} />
        </Grid>
        <Grid item xs={12} py={2}>
          <Divider sx={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} py={2}>
          <InsuranceCompanyFormContainer company={company} orgId={orgId} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InsuranceCompanyContainer;
