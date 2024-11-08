'use client';
import React, { useRef, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { Form, Field } from 'react-final-form';
import { Clinic, Provider, User } from '../../../constants/types/types';
import {
  CLINIC_TYPES,
  PROVIDER_CLINIC_TYPES,
  STATES,
} from '../../../constants/enums';
import {
  ADD_CLINIC,
  UPDATE_CLINIC,
} from '../../api/graphql/mutations/clinicMutations';
import { useSnackbar } from '../../_components/SnackbarProvider';
import AddProvider from '../../_components/AddProvider';
import {
  formatPhoneNumber,
  required,
  undoPhoneNumberFormat,
} from '../../../lib/utils/utils';

interface ClinicFormProps {
  clinic?: Clinic;
  providers: Provider[] | []; // optometrists and ophthalmologists
  user: User;
}

interface FormValuesProps {
  address: string;
  city: string;
  email?: string;
  faxNumber?: string;
  name: string;
  notes?: string;
  phoneNumber: string;
  referralManager?: string;
  state: string;
  type: (typeof CLINIC_TYPES)[number];
  zipCode: string;
}

const ClinicForm = ({ clinic, providers, user }: ClinicFormProps) => {
  const { openSnackbar } = useSnackbar();

  const textFieldRef = useRef<HTMLInputElement>(null);

  const [faxNumber, setFaxNumber] = useState<string | undefined>(
    clinic?.faxNumber,
  );
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    clinic?.phoneNumber,
  );
  const [selectedProviders, setSelectedProviders] = useState<Provider[] | []>(
    clinic?.providers ?? [],
  );
  const [selectedState, setSelectedState] = useState<string>(
    clinic?.state ?? '',
  );

  const [
    createClinic,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(ADD_CLINIC);
  const [
    updateClinic,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_CLINIC);

  const handleProvidersSelect = (values: Provider[] | []) => {
    setSelectedProviders(values);
  };

  const handleStateSelect = (value: string) => {
    setSelectedState(value);
  };

  const handleFilterProviders = (type: (typeof CLINIC_TYPES)[number]) => {
    return providers?.filter(
      provider => PROVIDER_CLINIC_TYPES[provider.type] === type,
    );
  };

  const onSubmit = async (values: FormValuesProps, form: any) => {
    if (!selectedState) {
      openSnackbar('Please select state', 'error');
      return;
    }

    const clinicData = {
      address: values.address,
      city: values.city,
      email: values.email ? values.email : '',
      existingProviderIds: clinic?.providers.map(provider => provider.id),
      faxNumber: undoPhoneNumberFormat(faxNumber) || undefined,
      state: selectedState,
      name: values.name,
      notes: values.notes ? values.notes : '',
      organizationId: user.organizationId,
      phoneNumber: undoPhoneNumberFormat(phoneNumber) || undefined,
      providers: selectedProviders.map(provider => provider.id),
      referralManager: values.referralManager ? values.referralManager : '',
      type: values.type,
      zipCode: values.zipCode,
    };

    if (clinic) {
      updateClinic({
        onCompleted: () => {
          openSnackbar('Clinic updated successfully', 'success');
        },
        onError: error => {
          openSnackbar(`Update action failed: ${error.message}`, 'error');
        },
        variables: {
          clinicInput: clinicData,
          id: clinic?.id,
        },
      });
    } else {
      createClinic({
        onCompleted: ({ createClinic }) => {
          if (createClinic) {
            openSnackbar('Clinic added successfully', 'success');
            form.reset();
            textFieldRef.current?.focus();
          } else {
            openSnackbar(
              'Failed to add clinic. Check for invalid inputs',
              'error',
            );
          }
        },
        onError: error => {
          openSnackbar(`Create action failed: ${error.message}`, 'error');
        },
        variables: {
          clinicInput: clinicData,
        },
      });
    }
  };

  return (
    <>
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, values }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container pt={1}>
                    <Grid item xs={6} alignContent={'center'} py={1}>
                      <Field
                        name="name"
                        validate={required}
                        initialValue={clinic?.name ?? ''}>
                        {({ input, meta }) => (
                          <TextField
                            id="name"
                            error={meta.error && meta.touched}
                            fullWidth
                            label="Clinic name *"
                            name={input.name}
                            onChange={input.onChange}
                            ref={textFieldRef}
                            sx={{ pl: 1 }}
                            value={input.value}
                            variant="outlined"
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} alignContent={'center'} pr={1}>
                      <Field
                        name="address"
                        validate={required}
                        initialValue={clinic?.address ?? ''}>
                        {({ input, meta }) => (
                          <TextField
                            id="address"
                            error={meta.error && meta.touched}
                            label="Address *"
                            fullWidth
                            name={input.name}
                            onChange={input.onChange}
                            sx={{ pl: 1 }}
                            type="text"
                            variant="outlined"
                            value={input.value}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} alignContent={'center'} pl={1} py={1}>
                      <Field
                        name="city"
                        validate={required}
                        initialValue={clinic?.city ?? ''}>
                        {({ input, meta }) => (
                          <TextField
                            id="city"
                            error={meta.error && meta.touched}
                            label="City *"
                            fullWidth
                            name={input.name}
                            onChange={input.onChange}
                            type="text"
                            value={input.value}
                            variant="outlined"
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} alignContent={'center'} px={1}>
                      <Field
                        name="state"
                        validate={required}
                        initialValue={selectedState}>
                        {({ input, meta }) => (
                          <FormControl
                            fullWidth
                            error={meta.error && meta.touched}>
                            <Autocomplete
                              id="state"
                              onChange={(_, value) => {
                                input.onChange;
                                handleStateSelect(value ?? '');
                              }}
                              options={STATES}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="State *"
                                  variant="standard"
                                />
                              )}
                              value={selectedState}
                            />
                            {meta.touched && meta.error && (
                              <FormHelperText color={'red'}>
                                Required {meta.touched}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} alignContent={'center'} pl={1} py={1}>
                      <Field
                        name="zipCode"
                        validate={required}
                        initialValue={clinic?.zipCode?.toString() ?? ''}>
                        {({ input, meta }) => (
                          <TextField
                            id="zipCode"
                            error={meta.error && meta.touched}
                            fullWidth
                            inputProps={{
                              minLength: 5,
                              maxLength: 5,
                            }}
                            label="Zip code *"
                            name={input.name}
                            onChange={input.onChange}
                            value={input.value}
                            variant="outlined"
                            type="tel"
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} alignContent={'center'} px={1}>
                      <Field name="email" initialValue={clinic?.email ?? ''}>
                        {({ input }) => (
                          <TextField
                            id="email"
                            fullWidth
                            label="Email"
                            name={input.name}
                            onChange={input.onChange}
                            type="text"
                            value={input.value}
                            variant="outlined"
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} alignContent={'center'} pl={1} py={1}>
                      <Field
                        name="phoneNumber"
                        initialValue={clinic?.phoneNumber ?? ''}>
                        {({ input }) => (
                          <TextField
                            id="phoneNumber"
                            fullWidth
                            label="Phone number"
                            inputProps={{ maxLength: 14 }}
                            name={input.name}
                            onChange={event => {
                              input.onChange;
                              setPhoneNumber(event.target.value);
                            }}
                            value={formatPhoneNumber(phoneNumber)}
                            variant="outlined"
                            type="tel"
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} alignContent={'center'} px={1}>
                      <Field
                        name="faxNumber"
                        initialValue={clinic?.faxNumber ?? ''}>
                        {({ input }) => (
                          <TextField
                            id="faxNumber"
                            fullWidth
                            label="Fax number"
                            inputProps={{ maxLength: 14 }}
                            name={input.name}
                            onChange={event => {
                              input.onChange;
                              setFaxNumber(event.target.value);
                            }}
                            value={formatPhoneNumber(faxNumber)}
                            variant="outlined"
                            type="tel"
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} alignContent={'center'} pl={1}>
                      <Field
                        name="type"
                        validate={required}
                        initialValue={clinic?.type ?? ''}>
                        {({ input, meta }) => (
                          <FormControl
                            fullWidth
                            error={meta.error && meta.touched}>
                            <InputLabel id="type">Type *</InputLabel>
                            <Select
                              id="type"
                              label="Type *"
                              name={input.name}
                              onChange={value => {
                                input.onChange(value);
                                if (selectedProviders.length > 0) {
                                  setSelectedProviders([]);
                                }
                              }}
                              value={input.value}
                              variant="outlined">
                              <MenuItem value={''}>Select a Type</MenuItem>
                              {CLINIC_TYPES?.map((type, index) => {
                                return (
                                  <MenuItem key={index} value={type}>
                                    {type[0].toUpperCase() + type.slice(1)}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} alignContent={'center'} px={1}>
                      <Field name="providers">
                        {({ input, meta }) => (
                          <FormControl
                            fullWidth
                            error={meta.error && meta.touched}>
                            <Autocomplete
                              id="providers"
                              disableCloseOnSelect
                              multiple
                              getOptionLabel={option =>
                                `${option.lastName}, ${option.firstName}`
                              }
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              onChange={(_, value) => {
                                input.onChange;
                                handleProvidersSelect(value);
                              }}
                              options={handleFilterProviders(values.type)}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  error={meta.error && meta.touched}
                                  label={'Providers at clinic'}
                                  variant="standard"
                                />
                              )}
                              value={selectedProviders}
                            />
                            <FormHelperText>
                              If provider not found, can leave blank
                            </FormHelperText>
                            {!values.type && (
                              <FormHelperText sx={{ fontWeight: 'bold' }}>
                                Select type first
                              </FormHelperText>
                            )}
                            {meta.touched && meta.error && (
                              <FormHelperText color={'red'}>
                                Required {meta.touched}
                              </FormHelperText>
                            )}
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      alignContent={'center'}
                      display={'flex'}
                      pl={1}
                      py={1}>
                      <Field
                        name="referralManager"
                        initialValue={clinic?.referralManager ?? ''}>
                        {({ input }) => (
                          <TextField
                            id="referralManager"
                            fullWidth
                            label="Referral manager"
                            name={input.name}
                            onChange={input.onChange}
                            value={input.value}
                            variant="outlined"
                            type="text"
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6} alignContent={'center'} px={1} py={1}>
                      <Field name="notes" initialValue={clinic?.notes ?? ''}>
                        {({ input }) => (
                          <TextField
                            id="notes"
                            fullWidth
                            label="General notes"
                            multiline
                            name={input.name}
                            onChange={input.onChange}
                            rows={4}
                            value={input.value}
                            variant="outlined"
                            type="text"
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      p={1}
                      display={'flex'}
                      justifyContent={'end'}>
                      <Button
                        color="primary"
                        disabled={submitting || createLoading || updateLoading}
                        onSubmit={handleSubmit}
                        startIcon={
                          (submitting || createLoading || updateLoading) && (
                            <CircularProgress size={20} />
                          )
                        }
                        sx={{ textTransform: 'capitalize' }}
                        variant="contained"
                        type="submit">
                        {clinic ? 'Update' : 'Add'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </Grid>
        </Grid>
      </Paper>
      <Grid item xs={12} pt={2}>
        <Box display={'flex'} alignItems={'center'} pl={1}>
          <Link
            href="/providers/new"
            style={{ alignItems: 'center', display: 'flex' }}>
            Provider not found?
            <AddProvider />
          </Link>
        </Box>
      </Grid>
    </>
  );
};

export default ClinicForm;
