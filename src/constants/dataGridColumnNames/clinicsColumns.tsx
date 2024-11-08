import React from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridValidRowModel,
  GRID_DETAIL_PANEL_TOGGLE_FIELD,
} from '@mui/x-data-grid-pro';
import { eventEmitter } from '../../app/_components/EventEmitter';
import Link from 'next/link';
import { existingFullPhoneNumberFormat } from '../../lib/utils/utils';
import { pageTitleHeaderBackgroundColor } from '../../lib/css/utils';

const handleDeleteClick = (row: GridValidRowModel) => {
  eventEmitter.emit('deleteClinic', row);
};

export const clinicsColumns: GridColDef<GridValidRowModel>[] = [
  {
    field: GRID_DETAIL_PANEL_TOGGLE_FIELD,
    filterable: false,
    headerName: '',
    renderCell: () => (
      <Button
        startIcon={<ExpandMoreIcon />}
        size="small"
        sx={{
          color: pageTitleHeaderBackgroundColor,
          textTransform: 'capitalize',
        }}>
        Providers
      </Button>
    ),
  },
  {
    field: 'id',
    filterable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 120,
  },
  {
    field: 'address',
    headerName: 'Address',
    renderCell: ({ row }) => {
      return (
        <Box>
          <Typography display={'block'} variant="caption">
            {row.address}
          </Typography>
          <Typography display={'block'} variant="caption">
            {row.city}, {row.state}
          </Typography>
          <Typography display={'block'} variant="caption">
            {row.zipCode}
          </Typography>
        </Box>
      );
    },
    valueGetter: ({ row }) =>
      `${row.address}, ${row.city}, ${row.state} ${row.zipCode}`,
    width: 190,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    valueFormatter: ({ value }) => existingFullPhoneNumberFormat(value),
    width: 175,
  },
  {
    field: 'faxNumber',
    headerName: 'Fax Number',
    valueFormatter: ({ value }) => existingFullPhoneNumberFormat(value),
    width: 150,
  },
  {
    field: 'notes',
    flex: 1,
    headerName: 'Notes',
  },
  {
    field: 'referralManager',
    flex: 1,
    headerName: 'Referral Manager',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    flex: 1,
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        key={'edit'}
        icon={
          <Tooltip title="Edit">
            <Link href={`/clinics/edit/${params.row.id}`}>
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
          <Tooltip title="Delete clinic">
            <DeleteIcon sx={{ width: 22, height: 22 }} />
          </Tooltip>
        }
        label="Delete"
        onClick={() => handleDeleteClick(params.row)}
        sx={{ color: 'indianred' }}
      />,
    ],
  },
];
