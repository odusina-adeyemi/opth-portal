'use client';
import React, { Fragment, useState } from 'react';
import {
  Autocomplete,
  Box,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { InsuranceCompany } from '../../../../../constants/types/types';
import { Check, Delete, Edit } from '@mui/icons-material';
import { useModal } from '../../../../_components/ModalProvider';
import { useSnackbar } from '../../../../_components/SnackbarProvider';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_INSURANCE_COMPANY } from '../../../../api/graphql/mutations/insuranceCompanyMutations';
import CustomDialogContent from '../../../../_components/CustomDialogContent';
import { GET_INSURANCE_COMPANIES_BY_ORG } from '../../../../api/graphql/queries/insuranceCompanies';

const InsuranceCompanyList = ({
  orgId,
  setCompany,
}: {
  orgId: string;
  setCompany: (company: InsuranceCompany | null) => void;
}) => {
  const [companyId, setCompanyId] = useState<string>('');
  const { showModal, hideModal } = useModal();
  const { openSnackbar } = useSnackbar();

  const { data } = useQuery(GET_INSURANCE_COMPANIES_BY_ORG, {
    variables: { id: orgId },
  });

  const [deleteInsuranceCompany] = useMutation(DELETE_INSURANCE_COMPANY);

  const handleChange = (newValue: InsuranceCompany | null) => {
    setCompanyId(newValue?.id || '');
    if (!newValue?.name) {
      setCompany(null);
    }
  };

  const handleEditClick = () => {
    const company = data?.insuranceCompaniesByOrg?.find(
      (company: InsuranceCompany) => company.id === companyId,
    );
    setCompany(company || null);
  };

  const handleDelete = (id: string) => {
    deleteInsuranceCompany({
      onCompleted: () => {
        openSnackbar('Insurance company deleted successfully', 'success');
        hideModal();
        setCompany(null);
        setCompanyId('');
      },
      onError: error => {
        openSnackbar(
          `Error deleting insurance company: ${error.message}`,
          'error',
        );
        hideModal();
      },
      variables: { id },
    });
  };
  const handleDeleteClick = () => {
    showModal(
      <CustomDialogContent
        affirmativeButtonLabel="Yes"
        affirmativeOnClick={() => handleDelete(companyId)}
        negativeButtonLabel="No"
        negativeOnClick={hideModal}
        title={`Are you sure you want to delete this insurance company?`}
      />,
    );
  };

  return (
    <Box display={'flex'}>
      <Box width={'100%'}>
        <FormHelperText>Find company</FormHelperText>
        <Autocomplete
          autoComplete
          options={data?.insuranceCompaniesByOrg ?? []}
          getOptionLabel={(option: InsuranceCompany) => option.name}
          onChange={(_, newValue) => handleChange(newValue)}
          renderInput={params => (
            <TextField
              {...params}
              label="Company"
              inputProps={{ ...params.inputProps }}
              variant="standard"
              sx={{ mt: 1 }}
            />
          )}
          renderOption={(props, option) => {
            // @ts-ignore
            const { key, ...rest } = props;
            if (option.isCommercial) {
              return (
                <Fragment key={key}>
                  <Typography
                    component={'li'}
                    {...rest}
                    variant="subtitle1"
                    display={'flex'}
                    px={1}>
                    {option.name} <Check color="success" />
                  </Typography>
                </Fragment>
              );
            }
            return (
              <Fragment key={key}>
                <Typography
                  {...rest}
                  variant="subtitle1"
                  display={'flex'}
                  px={1}>
                  {option.name}
                </Typography>
              </Fragment>
            );
          }}
        />
        <FormHelperText sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Check color="success" /> = commercial
        </FormHelperText>
      </Box>
      {companyId && (
        <>
          <IconButton onClick={handleEditClick}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton onClick={handleDeleteClick}>
            <Delete fontSize="small" />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default InsuranceCompanyList;
