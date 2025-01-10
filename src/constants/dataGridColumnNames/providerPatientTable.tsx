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
import ProgressWithLabel from '../../../src/ui/components/ProgressLabel';

const handleDeleteClick = (row: GridValidRowModel) => {
  eventEmitter.emit('deletePatient', row);
};




interface OperationDetails {
    initialAppointmentCompleted?: boolean;
    transferOfCare?: boolean;
    eyesToBeDone?: 'left' | 'right' | 'both';
    firstEyeSurgeryDate?: string;
    secondEyeSurgeryDate?: string;
}

interface PatientRow {
    preOperation?: OperationDetails;
    postOperation?: OperationDetails;
}

interface Progress {
    progress: number;
    color: string;
}

const calculateProgress = (row: PatientRow): Progress => {
    const { preOperation, postOperation } = row;

    if (!preOperation?.initialAppointmentCompleted) return { progress: 0, color: 'red' };
    if (preOperation?.initialAppointmentCompleted) return { progress: 25, color: 'darkyellow' };
    if (postOperation?.transferOfCare) return { progress: 100, color: 'darkgreen' };

    const eyesToBeDone = preOperation?.eyesToBeDone;
    if (eyesToBeDone === 'left' || eyesToBeDone === 'right') {
        if (preOperation?.firstEyeSurgeryDate && new Date(preOperation.firstEyeSurgeryDate) <= new Date()) return { progress: 75, color: 'lightgreen' };
    } else if (eyesToBeDone === 'both') {
        const firstDone = preOperation?.firstEyeSurgeryDate ? new Date(preOperation.firstEyeSurgeryDate) <= new Date() : false;
        const secondDone = preOperation?.secondEyeSurgeryDate ? new Date(preOperation.secondEyeSurgeryDate) <= new Date() : false;
        if (firstDone && secondDone) return { progress: 100, color: 'darkgreen' };
        if (firstDone) return { progress: 62, color: 'lightgreen' };
    }

    return { progress: 50, color: 'yellow' };
};
  


export const ProviderPatientsColumns: GridColDef<GridValidRowModel>[] = [
    {
        field: 'progress',
        headerName: 'Progress',
        renderCell: ({ row }) => {
          const { progress, color } = calculateProgress(row); // Ensure calculateProgress returns { progress, color }
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Pass the color as a prop to ProgressWithLabel */}
              <ProgressWithLabel value={progress} color={color} />
            </Box>
          );
        },
        width: 150,
      },
      
    {
      field: 'name',
      headerName: 'Name',
      valueGetter: (params) => `${params.row.lastName}, ${params.row.firstName}`,
      renderCell: ({ row }) => (
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
      ),
      width: 200,
    },
    {
      field: 'surgeryType',
      headerName: 'Surgery Type',
      valueGetter: (params) => params.row.preOperation?.surgeryType,
      width: 150,
    },
    {
      field: 'postOpVisitDate',
      headerName: 'Post-Op Visit Date',
      valueGetter: (params) => params.row.postOperation?.postOpVisitDate,
      valueFormatter: (params) => {
        return params.value ? dbDateStringToMonthDayYearString(params.value) : 'N/A';
      },
      width: 150,
    },
    {
      field: 'amountToPayProvider',
      headerName: 'Amount of Payment',
      valueGetter: (params) => params.row.postOperation?.amountToPayProvider,
      renderCell: ({ value }) => <Typography>${value?.toFixed(2) ?? '0.00'}</Typography>,
      width: 150,
    },
    {
      field: 'paidOptomDate',
      headerName: 'Date Payment Sent',
      valueGetter: (params) => params.row.postOperation?.paidOptomDate,
      valueFormatter: (params) => {
        return params.value ? dbDateStringToMonthDayYearString(params.value) : 'N/A';
      },
      width: 150,
    },
    {
      field: 'receivedOptomPostOpNotes',
      headerName: 'Post-Op Notes Received',
      valueGetter: (params) => params.row.postOperation?.receivedOptomPostOpNotes,
      renderCell: ({ value }) => (
        <Typography>{value ? 'Yes' : 'No'}</Typography>
      ),
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
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
                    width: 22,
                    height: 22,
                  }}
                />
              </Link>
            </Tooltip>
          }
          label="Edit"
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
        />,
      ],
    },
  ];

