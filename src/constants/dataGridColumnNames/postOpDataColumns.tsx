import {
  GridColDef,
  GridRenderEditCellParams,
  GridValidRowModel,
} from '@mui/x-data-grid-pro';
import { valueGetterFormatDbDate } from '../../lib/utils/utils';
import { POST_OFFICE_VISIT_TYPES } from '../enums';
import { TextField } from '@mui/material';

export const postOpDataColumns: GridColDef<GridValidRowModel>[] = [
  {
    field: 'id',
    filterable: false,
  },
  {
    editable: true,
    field: 'typeOfInsurance',
    headerName: 'Type of insurance',
    type: 'singleSelect',
    valueOptions: [],
  },
  {
    editable: true,
    description: 'Amount to be received from insurance',
    field: 'amountToBePaidFromInsurance',
    headerName: 'Insurance $ to collect',
    renderEditCell: (params: GridRenderEditCellParams) => {
      const { id, api, field } = params;

      const handleChange = (event: any) => {
        let inputValue = event.target.value;

        // Limit to two decimal places
        const decimalMatch = inputValue.match(/^\d*\.?\d{0,2}$/);

        if (decimalMatch) {
          api.setEditCellValue({ id, field, value: inputValue });
        }
      };

      return (
        <TextField
          fullWidth
          value={params.value || ''}
          onChange={handleChange}
          type="number"
        />
      );
    },
    type: 'number',
    valueFormatter: params => {
      if (!params.value) {
        return '';
      }
      return `$${params.value}`;
    },
  },
  {
    editable: true,
    description: 'Check and requisition forms are mailed or delivered',
    field: 'checkDelivered', // check is mailed most of the time
    headerName: 'Check/Req mailed',
    type: 'boolean',
  },
  {
    editable: true,
    field: 'checkDeliveryPaperwork',
    headerName: 'Check delivery paperwork',
    type: 'boolean',
  },
  {
    editable: true,
    field: 'checkNumber',
    headerName: 'Check number',
    type: 'number',
  },
  {
    editable: true,
    description: 'Amount to pay provider',
    headerName: 'Amt to provider',
    field: 'amountToPayProvider',
    renderEditCell: (params: GridRenderEditCellParams) => {
      const { id, api, field } = params;

      const handleChange = (event: any) => {
        let inputValue = event.target.value;

        // Limit to two decimal places
        const decimalMatch = inputValue.match(/^\d*\.?\d{0,2}$/);

        if (decimalMatch) {
          api.setEditCellValue({ id, field, value: inputValue });
        }
      };

      return (
        <TextField
          fullWidth
          value={params.value || ''}
          onChange={handleChange}
          type="number"
        />
      );
    },
    type: 'number',
    valueFormatter: params => {
      if (!params.value) {
        return '';
      }
      return `$${params.value}`;
    },
  },
  {
    editable: true,
    field: 'paidOptomDate',
    headerName: 'Check/payment date',
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
    field: 'contactedReferrer',
    headerName: 'Contacted referrer',
    type: 'boolean',
  },
  {
    editable: true,
    description: 'Date of post-op visit',
    field: 'postOpVisitDate',
    headerName: 'Post-op visit',
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
    description: 'Type of post-op visit',
    field: 'postOpVisitType',
    headerName: 'Post-op visit type',
    type: 'singleSelect',
    valueOptions: POST_OFFICE_VISIT_TYPES,
  },
  {
    editable: true,
    description: 'Reason not referred back',
    field: 'reasonNotReferredBack',
    headerName: 'Not referred back',
  },
  {
    editable: true,
    field: 'referralCanceled',
    headerName: 'Referral canceled',
    type: 'boolean',
  },
  {
    editable: true,
    description: 'Reason referral was canceled',
    field: 'referralCanceledReason',
    headerName: 'Canceled reason',
  },
  {
    editable: true,
    field: 'referralCompleted',
    headerName: 'Referral completed',
    type: 'boolean',
  },
  {
    editable: true,
    description: 'Referred back to original clinic',
    field: 'referredBackToOriginalClinic',
    headerName: 'Referred back',
    type: 'boolean',
  },
  {
    editable: true,
    field: 'transferOfCare',
    headerName: 'Transfer of care',
    type: 'boolean',
  },
  {
    editable: true,
    field: 'transferOfCareDate',
    headerName: 'Transfer of care date',
    type: 'date',
    valueGetter: params => {
      if (!params.value) {
        return '';
      }
      return valueGetterFormatDbDate(Number(params.value));
    },
  },
];
