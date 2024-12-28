import { Box, Typography } from '@mui/material';
import { GridColDef, GridValidRowModel } from '@mui/x-data-grid-pro';
import {
  existingFullPhoneNumberFormat,
  formatDateObjToNADateString,
} from '../../lib/utils/utils';
import { Clinic, ProviderClinic } from '../types/types';
import CheckIcon from '@mui/icons-material/Check';
import { Close } from '@mui/icons-material';
import ProviderClinicDocumentColumnDisplay from '../../app/providers/_components/ProviderClinicDocumentColumnDisplay';

export const providersAdditionalColumns: GridColDef<GridValidRowModel>[] = [
  {
    field: 'id',
    filterable: false,
    hideable: false,
  },
  {
    field: 'specialties',
    headerName: 'Specialties',
    renderCell: ({ row }) => {
      return (
        <Box>
          {row.specialties?.map((specialty: string) => (
            <Typography
              key={specialty}
              variant="subtitle2"
              sx={{ textTransform: 'capitalize' }}
            >
              {specialty}
            </Typography>
          ))}
        </Box>
      );
    },
    width: 150,
  },
  {
    align: 'center',
    field: 'dateVisitedByProvider',
    headerName: 'Last Visit by Provider',
    valueGetter: ({ row }) => {
      if (!row.dateVisitedByProvider) return '';
      return new Date(row.dateVisitedByProvider);
    },
    valueFormatter: ({ value }) =>
      value ? formatDateObjToNADateString(value) : '', // 'Jan 01 2022'
    type: 'date',
    width: 175,
  },
  {
    align: 'center',
    field: 'dateVisitedByLiaison',
    headerName: 'Last Visit by Liaison',
    valueGetter: ({ row }) => {
      if (!row.dateVisitedByLiaison) return '';
      return new Date(row.dateVisitedByLiaison);
    },
    valueFormatter: ({ value }) =>
      value ? formatDateObjToNADateString(value) : '', // 'Jan 01 2022'
    type: 'date',
    width: 150,
  },
  {
    description: 'W9 on file',
    field: 'hasW9',
    headerName: 'W9',
    renderCell: ({ row }) => {
      return (
        <ProviderClinicDocumentColumnDisplay
          clinics={row.clinics}
          field={'hasW9'}
          providerClinics={row.providerClinics}
        />
      );
    },
    type: 'boolean',
    width: 130,
  },
  {
    description: 'Demographics on file',
    field: 'hasDemographics',
    headerName: 'Demographics',
    renderCell: ({ row }) => {
      return (
        <ProviderClinicDocumentColumnDisplay
          clinics={row.clinics}
          field={'hasDemographics'}
          providerClinics={row.providerClinics}
        />
      );
    },
    type: 'boolean',
    width: 130,
  },
  {
    field: 'consentFormOnFile',
    headerName: 'Consent form on file',
    renderCell: ({ row }) => {
      return (
        <ProviderClinicDocumentColumnDisplay
          clinics={row.clinics}
          field={'consentFormOnFile'}
          providerClinics={row.providerClinics}
        />
      );
    },
    type: 'boolean',
    width: 130,
  },
  {
    field: 'email',
    headerName: 'Email',
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone number',
    type: 'number',
    valueFormatter: ({ value }) => existingFullPhoneNumberFormat(value),
    width: 150,
  },
];
