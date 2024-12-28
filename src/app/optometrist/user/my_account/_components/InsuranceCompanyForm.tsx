'use client';
import React, { useEffect } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Field } from 'react-final-form';
import { required } from '../../../../../lib/utils/utils';
import { InsuranceCompany } from '../../../../../constants/types/types';
import { UPDATE_INSURANCE_COMPANY } from '../../../../api/graphql/mutations/insuranceCompanyMutations';
import { useSnackbar } from '../../../../_components/SnackbarProvider';
import { useMutation } from '@apollo/client';
import { capitalizeFirstLetter } from '../../../../../lib/utils/utils';

const InsuranceCompanyForm = ({
  company,
  formValues,
  isCommercial,
  loading,
  setIsCommercial,
}: {
  company: InsuranceCompany | null;
  formValues: InsuranceCompany;
  isCommercial: boolean;
  loading: boolean;
  setIsCommercial: (isCommercial: boolean) => void;
}) => {
  const { openSnackbar } = useSnackbar();

  const [updateInsuranceCompany] = useMutation(UPDATE_INSURANCE_COMPANY);

  const handleUpdate = () => {
    if (!formValues.isCommercial) {
      formValues.isCommercial = false;
    }
    formValues.name = capitalizeFirstLetter(formValues.name);

    updateInsuranceCompany({
      onCompleted: () => {
        openSnackbar('Insurance company updated successfully', 'success');
      },
      onError: error => {
        openSnackbar(
          `Error updating insurance company: ${error.message}`,
          'error',
        );
      },
      variables: { id: company?.id, insuranceCompanyInput: formValues },
    });
  };

  useEffect(() => {
    setIsCommercial(company?.isCommercial ?? false);
  }, [company, setIsCommercial]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="body1">
          <b>{company?.name ? 'Edit ' : 'Add '}</b>insurance company
        </Typography>
      </Grid>
      <Grid item xs={12} py={1}>
        <Field
          name="name"
          validate={required}
          initialValue={company?.name ?? ''}
        >
          {({ input, meta }) => (
            <TextField
              {...input}
              label="Name"
              error={meta.error && meta.touched}
              helperText={meta.error && meta.touched && meta.error}
              onChange={input.onChange}
            />
          )}
        </Field>
      </Grid>
      <Grid item xs={12}>
        <Field name="isCommercial" type="checkbox">
          {({ input }) => (
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCommercial}
                    onChange={event => {
                      input.onChange(event.target.checked);
                      setIsCommercial(event.target.checked);
                    }}
                  />
                }
                label={'Commercial insurance?'}
              />
            </FormControl>
          )}
        </Field>
      </Grid>
      <Grid item xs={12} py={1} textAlign={'right'}>
        <Button
          color="primary"
          disabled={loading}
          endIcon={loading && <CircularProgress size={10} />}
          onClick={company?.name ? handleUpdate : () => {}}
          sx={{ textTransform: 'capitalize' }}
          type={company?.name ? 'button' : 'submit'}
          variant="contained"
        >
          {company?.name ? 'Update' : 'Add'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default InsuranceCompanyForm;
