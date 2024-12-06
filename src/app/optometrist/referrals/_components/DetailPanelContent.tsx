'use client';
import React, { useState } from 'react';
import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import ButtonGroupPatientData from './ButtonGroupPatientData';
import {
  DataGridPro,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridValidRowModel,
  useGridApiRef,
} from '@mui/x-data-grid-pro';
// data
import { patientContactColumns } from '../../../../constants/dataGridColumnNames/patientContactColumns';
import { preOpDataColumns } from '../../../../constants/dataGridColumnNames/preOpDataColumns';
import { postOpDataColumns } from '../../../../constants/dataGridColumnNames/postOpDataColumns';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { useModal } from '../../../_components/ModalProvider';
import { useSnackbar } from '../../../_components/SnackbarProvider';
import {
  DELETE_PRE_OPERATION,
  UPDATE_PRE_OPERATION,
} from '../../../api/graphql/mutations/preOperationMutations';
import {
  DELETE_PATIENT_CONTACT,
  UPDATE_PATIENT_CONTACT,
} from '../../../api/graphql/mutations/patientContactMutations';
import {
  DELETE_POST_OPERATION,
  UPDATE_POST_OPERATION,
} from '../../../api/graphql/mutations/postOperationMutations';
import CustomDialogContent from '../../../_components/CustomDialogContent';
import { GET_PATIENT_ALL_OPERATION_STAGES } from '../../../api/graphql/queries/patients';
import DetailPanelToolbar from './DetailPanelToolbar';
import CenterLoadingIcon from '../../../../ui/components/CenterLoadingIcon';
import { GET_INSURANCE_COMPANIES_BY_ORG } from '../../../api/graphql/queries/insuranceCompanies';
import { FirstPage, LastPage } from '@mui/icons-material';
import { GET_PATIENT_CONTACT } from '../../../api/graphql/queries/patientContacts';
import { GET_PATIENT_PRE_OPERATION } from '../../../api/graphql/queries/preOperations';
import { GET_PATIENT_POST_OPERATION } from '../../../api/graphql/queries/postOperations';
import { pageTitleHeaderBackgroundColor } from '../../../../lib/css/utils';

export type ButtonName = 'contact' | 'preop' | 'postop';

const DetailPanelContent = ({
  orgId,
  patientId,
  rowData,
}: {
  orgId: string;
  patientId: GridRowId;
  rowData: GridRowModel;
}) => {
  const [rows, setRows] = useState<GridValidRowModel[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [buttonName, setButtonName] = useState<ButtonName | ''>('');
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { data: insuranceCompanyData } = useQuery(
    GET_INSURANCE_COMPANIES_BY_ORG,
    { variables: { id: orgId } },
  );

  const [
    deletePatientContact,
    { error: deletePatientContactError, loading: deletePatientContactLoading },
  ] = useMutation(DELETE_PATIENT_CONTACT);
  const [updatePatientContact, { loading: updatePatientContactLoading }] =
    useMutation(UPDATE_PATIENT_CONTACT);

  // pre-operation
  const [
    deletePreOperation,
    { error: deleteError, loading: deletePreOpLoading },
  ] = useMutation(DELETE_PRE_OPERATION);
  const [updatePreOperation, { loading: updatePreOpLoading }] =
    useMutation(UPDATE_PRE_OPERATION);

  // post-operation
  const [
    deletePostOperation,
    { error: deletePostOpError, loading: deletePostOpLoading },
  ] = useMutation(DELETE_POST_OPERATION);
  const [updatePostOperation, { loading: updatePostOpLoading }] = useMutation(
    UPDATE_POST_OPERATION,
  );

  const [fetchPatientContactInfo, { loading: patientContactLoading }] =
    useLazyQuery(GET_PATIENT_CONTACT, {
      fetchPolicy: 'cache-and-network',
      variables: { patientId },
      onCompleted: data => {
        setRows(
          data.patientContactIndividual ? [data.patientContactIndividual] : [],
        );
      },
    });

  const [fetchPreOpData, { loading: preOpLoading }] = useLazyQuery(
    GET_PATIENT_PRE_OPERATION,
    {
      fetchPolicy: 'cache-and-network',
      variables: { patientId },
      onCompleted: data => {
        setRows(data.patientPreOperation ? [data.patientPreOperation] : []);
      },
    },
  );

  const [fetchPostOpData, { loading: postOpLoading }] = useLazyQuery(
    GET_PATIENT_POST_OPERATION,
    {
      fetchPolicy: 'cache-and-network',
      variables: { patientId },
      onCompleted: data => {
        setRows(data.patientPostOperation ? [data.patientPostOperation] : []);
      },
    },
  );

  const apiRef = useGridApiRef();

  const { showModal, hideModal } = useModal();
  const { openSnackbar } = useSnackbar();

  const actionsField: GridColDef = {
    align: 'center',
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key={'save'}
            icon={
              <Tooltip title="Save">
                <SaveIcon sx={{ width: 22, height: 22 }} />
              </Tooltip>
            }
            label="Save"
            className="textPrimary"
            onClick={handleSaveClick(id, buttonName)}
            sx={{ color: '#6fc674' }}
          />,
          <GridActionsCellItem
            key={'cancel'}
            icon={
              <Tooltip title="Cancel">
                <CancelIcon sx={{ width: 22, height: 22 }} />
              </Tooltip>
            }
            label="Cancel"
            onClick={handleCancelClick(id)}
            sx={{ color: 'indianred' }}
          />,
        ];
      }
      return [
        <GridActionsCellItem
          key={'edit'}
          icon={
            <Tooltip title="Edit or double click column">
              <EditIcon sx={{ width: 22, height: 22 }} />
            </Tooltip>
          }
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
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
          onClick={handleDeleteClick(id, buttonName)}
          color="inherit"
          sx={{ color: 'indianred' }}
        />,
      ];
    },
  };

  // Need this in order to fetch insurance companies from the db and have them
  // as options to select in the post-operation table
  const insuranceTypeField: GridColDef = {
    editable: true,
    field: 'typeOfInsurance',
    headerName: 'Type of insurance',
    type: 'singleSelect',
    valueOptions: insuranceCompanyData?.insuranceCompaniesByOrg?.map(
      (company: any) => company.name,
    ) ?? ['Please add insurance companies on the My Account page'],
  };

  const changeTableData = (buttonName: ButtonName) => {
    let columnData: GridColDef[] = [];

    if (buttonName === 'contact') {
      fetchPatientContactInfo();
      columnData = patientContactColumns;
    } else if (buttonName === 'preop') {
      fetchPreOpData();
      columnData = preOpDataColumns;
    } else if (buttonName === 'postop') {
      fetchPostOpData();
      postOpDataColumns[1] = insuranceTypeField;
      columnData = postOpDataColumns;
    }

    setColumns(columnData);
    setButtonName(buttonName);
  };

  const finalColumns = [...columns, actionsField];

  // this is to prevent the row from exiting edit mode when the user clicks out of the row
  // may want this to just have a debounce on it instead of preventing it altogether
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // this allows for double click to edit
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleDeleteClick =
    (id: GridRowId | string, buttonName: ButtonName | '') => () => {
      let deleteClick = () => {};
      if (buttonName === 'contact') {
        deleteClick = () => handleDeletePatientContact(id);
      } else if (buttonName === 'preop') {
        deleteClick = () => handleDeletePreOperation(id);
      } else if (buttonName === 'postop') {
        deleteClick = () => handleDeletePostOperation(id);
      }

      showModal(
        <CustomDialogContent
          affirmativeButtonLabel={'Yes'}
          affirmativeOnClick={deleteClick}
          negativeButtonLabel="No"
          negativeOnClick={hideModal}
          title={`Are you sure you want to delete this ${buttonName} data for ${rowData?.firstName} ${rowData?.lastName}?`}
        />,
      );
    };

  const handleDeletePreOperation = (id: GridRowId | string) => {
    deletePreOperation({
      onCompleted: data => {
        openSnackbar('Pre-operation data deleted successfully', 'success');
        setRows(rows.filter(row => row.id !== data?.deletePreOperation.id));
      },
      onError: () => {
        openSnackbar(
          `Error deleting pre-operation data: ${deleteError}`,
          'error',
        );
      },
      variables: {
        id,
      },
    });
    hideModal();
  };

  const handleDeletePatientContact = (id: GridRowId | string) => {
    deletePatientContact({
      onCompleted: data => {
        openSnackbar('Contact data deleted successfully', 'success');
        setRows(rows.filter(row => row.id !== data?.deletePatientContact.id));
      },
      onError: () => {
        openSnackbar(
          `Error deleting contact data: ${deletePatientContactError}`,
          'error',
        );
      },
      variables: {
        id,
      },
    });
    hideModal();
  };

  const handleDeletePostOperation = (id: GridRowId | string) => {
    deletePostOperation({
      onCompleted: data => {
        openSnackbar('Post-operation data deleted successfully', 'success');
        setRows(rows.filter(row => row.id !== data?.deletePostOperation.id));
      },
      onError: () => {
        openSnackbar(
          `Error deleting post-operation data: ${deletePostOpError}`,
          'error',
        );
      },
      variables: {
        id,
      },
    });
    hideModal();
  };

  const handleSaveClick =
    (id: GridRowId, buttonName: ButtonName | '') => () => {
      const {
        __typename,
        id: updatedRowId,
        ...values
      } = apiRef.current.getRowWithUpdatedValues(id, 'id');
      // no "" values allowed to be set; only null allowed in db
      for (const key in values) {
        if (values[key] === '') {
          values[key] = null;
        }
      }

      if (buttonName === 'preop') {
        updatePreOperation({
          onCompleted: data => {
            setRowModesModel({
              ...rowModesModel,
              [id]: { mode: GridRowModes.View },
            });
            // update state using returned values from update mutation
            setRows(
              rows.map(row =>
                row.id === data?.updatePreOperation?.id
                  ? data.updatePreOperation
                  : row,
              ),
            );
            openSnackbar('Pre-operation data updated successfully', 'success');
          },
          onError: error => {
            openSnackbar(
              `Error updating pre-operation data: ${error.message}`,
              'error',
            );
          },
          variables: {
            id,
            preOperationInput: values,
          },
        });
      } else if (buttonName === 'contact') {
        updatePatientContact({
          onCompleted: data => {
            setRowModesModel({
              ...rowModesModel,
              [id]: { mode: GridRowModes.View },
            });
            // update state using returned values from update mutation
            setRows(
              rows.map(row =>
                row.id === data?.updatePatientContact.id
                  ? data.updatePatientContact
                  : row,
              ),
            );
            openSnackbar('Contact data updated successfully', 'success');
          },
          onError: error => {
            openSnackbar(
              `Error updating contact data: ${error.message}`,
              'error',
            );
          },
          variables: {
            id,
            patientContactInput: values,
          },
        });
      } else if (buttonName === 'postop') {
        updatePostOperation({
          onCompleted: data => {
            setRowModesModel({
              ...rowModesModel,
              [id]: { mode: GridRowModes.View },
            });
            // update state using returned values from update mutation
            setRows(
              rows.map(row =>
                row.id === data?.updatePostOperation?.id
                  ? data.updatePostOperation
                  : row,
              ),
            );
            openSnackbar('Post-operation data updated successfully', 'success');
          },
          onError: error => {
            openSnackbar(
              `Error updating post-operation data: ${error.message}`,
              'error',
            );
          },
          variables: {
            id,
            postOperationInput: values,
          },
        });
      }
    };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const noRowsOverlay = () => {
    return (
      <Typography variant="body1" align="center" height={40}>
        No {buttonName} data yet for {rowData?.firstName} {rowData?.lastName}
      </Typography>
    );
  };

  const scrollToBeginning = () => {
    if (apiRef.current) {
      apiRef.current.scrollToIndexes({ colIndex: 0 });
    }
  };

  const scrollToEnd = () => {
    if (apiRef.current) {
      apiRef.current.scrollToIndexes({ colIndex: columns.length - 1 });
    }
  };

  return (
    <Grid container my={2}>
      <CenterLoadingIcon
        show={
          deletePatientContactLoading ||
          deletePreOpLoading ||
          deletePostOpLoading ||
          updatePatientContactLoading ||
          updatePreOpLoading ||
          updatePostOpLoading
        }
      />
      <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
        <ButtonGroupPatientData
          changeTableData={changeTableData}
          disabled={JSON.stringify(rowModesModel) !== '{}'}
          patientContactLoading={patientContactLoading}
          patientPreOpLoading={preOpLoading}
          patientPostOpLoading={postOpLoading}
        />
        {(buttonName === 'preop' || buttonName === 'postop') && (
          <Box>
            <Button
              startIcon={<FirstPage />}
              onClick={scrollToBeginning}
              sx={{ color: pageTitleHeaderBackgroundColor }}
            />
            <Button
              onClick={scrollToEnd}
              startIcon={<LastPage />}
              sx={{ color: pageTitleHeaderBackgroundColor }}
            />
          </Box>
        )}
      </Grid>
      {columns.length !== 0 ? (
        <Grid item xs={12} m={1}>
          <DataGridPro
            apiRef={apiRef}
            columns={finalColumns}
            columnVisibilityModel={{ id: false }}
            editMode="row"
            disableColumnFilter
            disableColumnMenu
            hideFooterRowCount
            onRowEditStop={handleRowEditStop}
            onRowModesModelChange={handleRowModesModelChange}
            processRowUpdate={processRowUpdate}
            rowModesModel={rowModesModel} // this is how i programmatically set the row to edit mode
            rows={rows}
            slots={{
              noRowsOverlay: noRowsOverlay,
              toolbar: DetailPanelToolbar,
            }}
            slotProps={{
              filterPanel: {
                columnsSort: 'asc',
              },
              toolbar: {
                patientContactLoading,
                preOpLoading,
                postOpLoading,
                patientData: rowData,
                patientId,
                selectionName: buttonName,
                rows,
                setRows,
                setRowModesModel,
              },
            }}
          />
        </Grid>
      ) : (
        <Grid item xs={12} m={1}>
          <Typography variant="body1" align="center">
            Please select button to view contact, pre-operation or
            post-operation data
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default DetailPanelContent;
