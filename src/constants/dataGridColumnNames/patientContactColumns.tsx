import { GridColDef, GridValidRowModel } from '@mui/x-data-grid-pro';
import {
  fromDateTimeStringToNALocaleString,
  valueGetterFormatDbDate,
} from '../../lib/utils/utils';

export const patientContactColumns: GridColDef<GridValidRowModel>[] = [
  {
    field: 'id',
    filterable: false,
  },
  {
    editable: true,
    description: 'Date referral received',
    field: 'dateReferralReceived',
    flex: 1,
    headerName: 'Referral received',
    valueGetter: params => {
      if (!params.value) {
        return '';
      }
      return new Date(Number(params.value));
    },
    valueFormatter: params => {
      if (!params.value) {
        return '';
      }
      return fromDateTimeStringToNALocaleString(Number(params.value));
    },
    type: 'dateTime',
  },
  {
    editable: true,
    description: 'Date comanager became aware of referral',
    field: 'dateComanagerAware',
    flex: 1,
    headerName: 'Comanager aware',
    valueGetter: params => {
      if (!params.value) {
        return '';
      }
      return new Date(Number(params.value));
    },
    valueFormatter: params => {
      if (!params.value) {
        return '';
      }
      return fromDateTimeStringToNALocaleString(Number(params.value));
    },
    type: 'dateTime',
  },
  {
    editable: true,
    description: 'Date of first contact attempt',
    field: 'dateAttemptedFirstContact',
    flex: 1,
    headerName: '1st contact attempt',
    valueGetter: params => {
      if (!params.value) {
        return '';
      }
      return new Date(Number(params.value));
    },
    valueFormatter: params => {
      if (!params.value) {
        return '';
      }
      return fromDateTimeStringToNALocaleString(Number(params.value));
    },
    type: 'dateTime',
  },
  {
    editable: true,
    description: 'Notes from contact attempts',
    field: 'contactNotes',
    flex: 1,
    headerName: 'Contact notes',
  },
  {
    editable: true,
    description: 'Date of initial appointment scheduled',
    field: 'dateInitialAppointmentScheduled',
    flex: 1,
    headerName: 'Appointment set',
    valueGetter: params => {
      if (!params.value) {
        return '';
      }

      return valueGetterFormatDbDate(Number(params.value));
    },
    type: 'date',
  },
];
