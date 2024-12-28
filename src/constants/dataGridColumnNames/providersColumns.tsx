import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';
import { eventEmitter } from '../../app/_components/EventEmitter';
import Link from 'next/link';
import { Clinic } from '../types/types';
import Image from 'next/image';
import { DBDateStringToYearMonthDay } from '../../lib/utils/utils';
import { PROVIDER_TYPES } from '../enums';
import { pageTitleHeaderBackgroundColor } from '../../lib/css/utils';

const handleDeleteClick = (row: GridValidRowModel) => {
  eventEmitter.emit('deleteProvider', row);
};

export const providersColumns: GridColDef<GridValidRowModel>[] = [
  {
    field: 'id',
    filterable: false,
    hideable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ textWrap: 'wrap' }}>
          <Link href={`/providers/edit/${row.id}`}>
            {/* // Add this back once image uploader is available */}
            {/* <Tooltip
            title={
              <>
              <Typography>This is an img</Typography>
              <Image src={testChart} alt="provider profile" />
              </>
            }> */}
            <Typography
              variant="subtitle2"
              sx={{
                color: pageTitleHeaderBackgroundColor,
                textDecoration: 'underline',
              }}
            >
              {row.lastName}, {row.firstName}
            </Typography>
            {/* </Tooltip> */}
          </Link>
        </Box>
      );
    },
    valueGetter: params => `${params.row.firstName} ${params.row.lastName}`,
    width: 150,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 125,
    type: 'singleSelect',
    valueOptions: PROVIDER_TYPES,
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
    width: 100,
  },
  {
    field: 'clinicNames',
    headerName: 'Clinics',
    renderCell: ({ row }) => {
      return (
        <Box>
          {row.clinics?.map((clinic: Clinic) => (
            <Typography key={clinic.id} variant="subtitle2">
              {clinic.name}
            </Typography>
          ))}
        </Box>
      );
    },
    valueGetter: params =>
      `${params.row.clinics?.map((clinic: Clinic) => clinic.name)}`,
    width: 150,
  },
  {
    field: 'status',
    description: 'Custom status for the provider',
    headerName: 'Status', // for capitalization on the filter dropdown
    flex: 1,
    type: 'singleSelect',
    valueGetter: ({ row }) => {
      return row?.status ?? '';
    },
    valueOptions: [],
  },
  {
    field: 'lastReferralDate',
    headerName: 'Last Referral',
    valueGetter: ({ row }) => {
      if (!row.lastReferralDate) return '';
      return new Date(row.lastReferralDate);
    },
    valueFormatter: ({ value }) => {
      return DBDateStringToYearMonthDay(value);
    },
    type: 'date',
  },
  {
    description: 'W9 and Demographics on file',
    field: 'paperworkUpToDate',
    flex: 1,
    headerName: 'Paperwork',
    type: 'boolean',
    valueGetter: ({ row }) => {
      return row.hasW9 && row.hasDemographics ? true : false;
    },
  },
  {
    description: 'Last visit by provider or liaison',
    field: 'lastVisit',
    headerName: 'Last Visit',
    renderCell: ({ row }) => {
      if (!row.dateVisitedByProvider && !row.dateVisitedByLiaison) {
        return <Typography variant="subtitle2">N/A</Typography>;
      }
      const lastProviderVisit = new Date(row.dateVisitedByProvider);
      const lastLiaisonVisit = new Date(row.dateVisitedByLiaison);
      return (
        <Box>
          <Typography variant="subtitle2">
            {lastProviderVisit > lastLiaisonVisit
              ? DBDateStringToYearMonthDay(row.dateVisitedByProvider)
              : DBDateStringToYearMonthDay(row.dateVisitedByLiaison)}
          </Typography>
          <Typography variant="subtitle2">
            {lastProviderVisit > lastLiaisonVisit
              ? 'by provider'
              : 'by liaison'}
          </Typography>
        </Box>
      );
    },
    valueGetter: ({ row }) => {
      let byWhom =
        row.lastProviderVisit > row.lastLiaisonVisit ? 'provider' : 'liaison';
      if (!row.dateVisitedByProvider && !row.dateVisitedByLiaison) {
        byWhom = 'N/A';
      }

      return `${row.dateVisitedByProvider} ${row.dateVisitedByLiaison} ${byWhom}`;
    },
    width: 150,
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 250,
  },
  {
    field: 'dateVisitedByProvider',
    flex: 1,
    headerName: 'Last Visit by Provider',
    valueGetter: ({ row }) => {
      if (!row.dateVisitedByProvider) return '';
      return new Date(row.dateVisitedByProvider);
    },
    type: 'date',
  },
  {
    field: 'dateVisitedByLiaison',
    flex: 1,
    headerName: 'Last Visit by Liaison',
    valueGetter: ({ row }) => {
      if (!row.dateVisitedByLiaison) return '';
      return new Date(row.dateVisitedByLiaison);
    },
    type: 'date',
  },
  {
    field: 'consentFormOnFile',
    headerName: 'Consent form on file',
    type: 'boolean',
  },
  {
    field: 'hasW9',
    headerName: 'W9',
    type: 'boolean',
  },
  {
    field: 'hasDemographics',
    headerName: 'Demographics',
    type: 'boolean',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    getActions: ({ row }: GridRowParams) => {
      return [
        <GridActionsCellItem
          key={'edit'}
          icon={
            <Tooltip title="Edit">
              <Link href={`/providers/edit/${row.id}`}>
                <EditIcon sx={{ width: 22, height: 22 }} />
              </Link>
            </Tooltip>
          }
          label="Edit"
          onClick={() => {}}
          sx={{
            color: '#4d4d4d',
            pb: 0,
          }}
        />,
        <GridActionsCellItem
          key={'delete'}
          icon={
            <Tooltip title="Delete">
              <DeleteIcon sx={{ width: 22, height: 22 }} />
            </Tooltip>
          }
          label="Delete"
          onClick={() => handleDeleteClick(row)}
          sx={{ color: 'indianred' }}
        />,
      ];
    },
    type: 'actions',
    width: 100,
  },
];
