import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  GridActionsCellItem,
  GridColDef,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';
import Link from 'next/link';
import {
  dbDateStringToMonthDayYearString,
  existingFullPhoneNumberFormat,
} from '../../lib/utils/utils';
import { eventEmitter } from '../../app/_components/EventEmitter';
import { pageTitleHeaderBackgroundColor } from '../../lib/css/utils';

const handleDeleteClick = (row: GridValidRowModel) => {
  eventEmitter.emit('deletePatient', row);
};

// these field names are hardcoded, should this be fetched and formatted from the backend?
// Maybe not now, since these are specific to the practices
// Eventually would like these fields to be customizable and rearrangable
export const referralsColumns: GridColDef<GridValidRowModel>[] = [
  // {
  //   field: 'nextStep',
  //   headerName: 'Next Step',
  //   // how to calculate what it renders here?? How to see what column isn't finished yet?
  //   // Calculate it based all other data
  // },
  {
    field: 'id',
    filterable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ textWrap: 'wrap' }}>
          <Link href={`/referrals/edit/${row.id}`}>
            <Typography
              variant="subtitle2"
              sx={{
                color: pageTitleHeaderBackgroundColor,
                textDecoration: 'underline',
              }}
            >
              {row.lastName}, {row.firstName}
            </Typography>
          </Link>
        </Box>
      );
    },
    valueGetter: params => `${params.row.firstName} ${params.row.lastName}`,
    width: 150,
  },
  {
    field: 'dob',
    headerName: 'DOB',
    type: 'date',
    valueFormatter: (params: any) => {
      return dbDateStringToMonthDayYearString(params.value);
    },
    width: 95,
  },
  {
    field: 'emailAndPhone',
    headerName: 'Contact info',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ wordBreak: 'break-word' }}>
          <Typography variant="body2">{row.email}</Typography>
          <Typography variant="body2">
            {existingFullPhoneNumberFormat(row.phoneNumber)}
          </Typography>
        </Box>
      );
    },
    valueGetter: params => `${params.row.email} ${params.row.phoneNumber}`,
    width: 150,
  },
  {
    field: 'providerName',
    flex: 1,
    headerName: 'Provider',
    valueGetter: (params: any) => {
      if (params.row?.referringProvider) {
        const referringProvider = params.row.referringProvider;

        return `${referringProvider?.lastName ?? ''}, ${referringProvider?.firstName ?? ''} `;
      }

      return '';
    },
  },
  {
    field: 'clinicName',
    flex: 1,
    headerName: 'Clinic',
    valueGetter: (params: any) => {
      if (params.row.referringClinic) {
        const referringClinic = params.row.referringClinic;

        return referringClinic?.name ?? '';
      }
      return '';
    },
  },
  {
    field: 'clinicLocation',
    flex: 1,
    headerName: 'Clinic location',
    valueGetter: (params: any) => {
      if (params.row.referringClinic) {
        const referringClinic = params.row.referringClinic;
        return `${referringClinic?.city ?? ''}, ${referringClinic?.state ?? ''}`;
      }
      return '';
    },
  },
  {
    field: 'status',
    flex: 1,
    description: 'Custom status for the provider',
    headerName: 'Status', // for capitalization on the filter dropdown
    type: 'singleSelect',
    valueGetter: (params: any) => {
      if (params.row?.referringProvider) {
        const referringProvider = params.row.referringProvider;

        return referringProvider?.status;
      }
      return '';
    },
    valueOptions: [],
  },
  {
    field: 'surgeon',
    flex: 1,
    headerName: 'Surgeon',
    type: 'singleSelect',
    valueGetter: (params: any) => {
      if (params.row.surgeon) {
        const surgeon = params.row.surgeon;
        return `${surgeon?.firstName ?? ''} ${surgeon?.lastName ?? ''}`;
      }
      return '';
    },
  },
  {
    field: 'generalNotes',
    headerName: 'Notes',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Referral created on',
    type: 'date',
    valueGetter: params => {
      if (!params.value) {
        return '';
      }
      return new Date(Number(params.value));
    },
  },
  {
    field: 'actions',
    flex: 1,
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    getActions: ({ row }) => [
      <GridActionsCellItem
        key={'edit'}
        icon={
          <Tooltip title="Edit">
            <Link href={`/referrals/edit/${row.id}`}>
              <EditIcon
                sx={{
                  color: '#4d4d4d',
                  display: 'block',
                  pb: 0,
                  width: 22,
                  height: 22,
                }}
              />
            </Link>
          </Tooltip>
        }
        label="Edit"
        className="textPrimary"
        color="inherit"
      />,
      <GridActionsCellItem
        key={'delete'}
        icon={
          <Tooltip title="Delete">
            <DeleteIcon
              onClick={() => handleDeleteClick(row)}
              sx={{
                color: 'indianred',
                display: 'block',
                width: 22,
                height: 22,
              }}
            />
          </Tooltip>
        }
        label="Delete"
        color="inherit"
      />,
    ],
  },
];
