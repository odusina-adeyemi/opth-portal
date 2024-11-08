import { GridColDef, GridValidRowModel } from '@mui/x-data-grid-pro';
import { EYES_TO_BE_DONE, SURGERY_TYPES } from '../enums';
import { valueGetterFormatDbDate } from '../../lib/utils/utils';

export const preOpDataColumns: GridColDef<GridValidRowModel>[] = [
  {
    field: 'id',
    filterable: false,
  },
  {
    editable: true,
    field: 'consultationReportSent',
    headerName: 'Consult report sent',
    type: 'boolean',
  },
  {
    editable: true,
    field: 'delayReason',
    headerName: 'Delay reason',
  },
  {
    editable: true,
    field: 'delayLetterSent',
    headerName: 'Delay letter sent',
    type: 'boolean',
  },
  {
    editable: true,
    field: 'eyesToBeDone',
    headerName: 'Eyes to be done',
    type: 'singleSelect',
    valueOptions: EYES_TO_BE_DONE,
  },
  {
    editable: true,
    field: 'firstEyeSurgeryDate',
    headerName: '1st eye surgery date',
    type: 'date',
    valueGetter: params => {
      if (!params.value) {
        return '';
      }
      return valueGetterFormatDbDate(Number(params.value));
    },
  },
  {
    editable: true,
    field: 'firstEyeSurgeryType',
    headerName: '1st eye surgery type',
    type: 'singleSelect',
    valueOptions: SURGERY_TYPES,
  },
  {
    editable: true,
    field: 'initialAppointmentCompleted',
    headerName: 'Initial appointment completed',
    type: 'boolean',
  },
  {
    editable: true,
    description: 'Is the patient comanaged?',
    field: 'isComanage',
    headerName: 'Comanage?',
    type: 'boolean',
  },
  {
    editable: true,
    description: 'Is the patient on medicare?',
    field: 'isMedicare',
    headerName: 'Medicare?',
    type: 'boolean',
  },
  {
    description: 'Practice needs to pay optometrist for comanagement',
    field: 'toPayOptom',
    headerName: 'Pay optometrist?',
    valueGetter: ({ row }) => {
      if (row?.isComanage && !row.isMedicare) {
        return true;
      }
      return false;
    },
    type: 'boolean',
  },
  {
    editable: true,
    field: 'reasonNotComanage',
    headerName: 'Reason not comanage',
  },

  {
    editable: true,
    field: 'reasonNoSurgeryScheduled',
    headerName: 'Reason no surgery scheduled',
  },
  {
    editable: true,
    field: 'secondEyeSurgeryDate',
    headerName: '2nd eye surgery date',
    type: 'date',
    valueGetter: params => {
      if (!params.value) {
        return '';
      }
      return valueGetterFormatDbDate(Number(params.value));
    },
  },
  {
    editable: true,
    field: 'secondEyeSurgeryType',
    headerName: '2nd eye surgery type',
    type: 'singleSelect',
    valueOptions: SURGERY_TYPES,
  },
  {
    editable: true,
    field: 'surgeryScheduled',
    headerName: 'Surgery scheduled',
    type: 'boolean',
  },
];
