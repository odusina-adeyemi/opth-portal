import React from 'react';
import { Clinic, ProviderClinic } from '../../../constants/types/types';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Close } from '@mui/icons-material';

type ProviderClinicDocumentColumnDisplayProps = {
  clinics: Clinic[];
  field: 'hasDemographics' | 'hasW9' | 'consentFormOnFile';
  providerClinics: ProviderClinic[];
};

const ProviderClinicDocumentColumnDisplay = ({
  clinics,
  field,
  providerClinics,
}: ProviderClinicDocumentColumnDisplayProps) => {
  const clinicNames = clinics.reduce(
    (acc: { [key: string]: string }, clinic: Clinic) => {
      acc[clinic.id] = clinic.name;
      return acc;
    },
    {},
  );

  return (
    <Box display={'block'}>
      {providerClinics.map((document: ProviderClinic) => {
        return (
          <Box
            key={document.clinicId}
            display={'flex'}
            alignItems={'center'}
            flexWrap={'wrap'}>
            <Typography display={'block'} variant="caption">
              {clinicNames[document.clinicId]}:{' '}
            </Typography>
            <span>
              {' '}
              {document[field] ? (
                <CheckIcon sx={{ color: 'green' }} />
              ) : (
                <Close color="error" />
              )}
            </span>
          </Box>
        );
      })}
    </Box>
  );
};

export default ProviderClinicDocumentColumnDisplay;
