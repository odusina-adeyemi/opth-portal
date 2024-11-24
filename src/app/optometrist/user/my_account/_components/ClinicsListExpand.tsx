'use client';
import React, { useState } from 'react';
import { Collapse, CardContent, Typography } from '@mui/material';
import ExpandMore from '../../../../../ui/components/ExpandMore';
import { GridExpandMoreIcon } from '@mui/x-data-grid-pro';
import { Clinic } from '../../../../../constants/types/types';

const ClinicsListExpand = ({ clinics }: { clinics: Clinic[] }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Typography variant="h6">
        Total Clinics: {clinics.length}{' '}
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <GridExpandMoreIcon />
        </ExpandMore>
      </Typography>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {clinics.map((clinic: Clinic) => (
            <Typography key={clinic.id}>
              {clinic.name} {clinic.city} {clinic.state}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </>
  );
};

export default ClinicsListExpand;
