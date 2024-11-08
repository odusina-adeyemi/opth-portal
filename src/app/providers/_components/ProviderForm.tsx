'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from '@mui/material';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import Link from 'next/link';
import { Form, Field } from 'react-final-form';
import {
  Clinic,
  Provider,
  ProviderClinic,
  ProviderStatus,
  User,
} from '../../../constants/types/types';
import AddClinic from '../../_components/AddClinic';
import { PROVIDER_SPECIALTIES, PROVIDER_TYPES } from '../../../constants/enums';
import { GET_PROVIDER_STATUSES } from '../../api/graphql/queries/providerStatuses';
import { GET_ALL_PROVIDER_CLINIC_DOCUMENTS } from '../../api/graphql/queries/providerClinics';
import { useSnackbar } from '../../_components/SnackbarProvider';
import {
  ADD_PROVIDER,
  UPDATE_PROVIDER,
} from '../../api/graphql/mutations/providerMutations';
import {
  ADD_PROVIDER_CLINIC,
  UPDATE_PROVIDER_CLINIC,
} from '../../api/graphql/mutations/providerClinicMutations';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  formatPhoneNumber,
  required,
  undoPhoneNumberFormat,
} from '../../../lib/utils/utils';
import {
  pageTitleHeaderBackgroundColor,
  sideNavBackgroundColor,
} from '../../../lib/css/utils';
import CheckboxProviderClinicDocs from './CheckboxProviderClinicDocs';
import {
  providerClinicConsentFieldName,
  providerClinicDemographicsFieldName,
  providerClinicW9FieldName,
} from '../../../lib/constants/constants';

interface ProviderFormProps {
  clinics: Clinic[] | [];
  provider?: Provider;
  user: User;
}

interface FormValuesProps {
  associatedProviders: string;
  dateVisitedByLiaison?: string;
  dateVisitedByProvider?: string;
  email?: string;
  image: string;
  firstName: string;
  lastName: string;
  notes: string;
  phoneNumber?: string;
  specialties: string[];
  status: string;
  type: string;
}

export type CheckboxStatesClinicProviderDocuments = {
  [key: string]: {
    [providerClinicConsentFieldName]: boolean;
    [providerClinicDemographicsFieldName]: boolean;
    [providerClinicW9FieldName]: boolean;
  };
};

const ProviderForm = ({ clinics, provider, user }: ProviderFormProps) => {
  const { openSnackbar } = useSnackbar();
  const textFieldRef = useRef<HTMLInputElement>(null);
  let clinicSelectRef = useRef<HTMLInputElement>();

  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    provider?.phoneNumber,
  );
  const [selectedClinics, setSelectedClinics] = useState<Clinic[] | []>(
    provider?.clinics ?? [],
  );

  const [checkboxStates, setCheckboxStates] =
    useState<CheckboxStatesClinicProviderDocuments>({});

  const [selectedDocumentsClinicId, setSelectedDocumentsClinicId] =
    useState<string>(selectedClinics[0]?.id ?? '');

  const [specialties, setSpecialties] = useState<string[] | []>(
    provider?.specialties ?? [],
  );

  const { data: providerStatuses } = useQuery(GET_PROVIDER_STATUSES, {
    variables: { orgId: user.organizationId },
  });

  const [createProvider, { loading: createLoading }] =
    useMutation(ADD_PROVIDER);
  const [updateProvider, { loading: updateLoading }] =
    useMutation(UPDATE_PROVIDER);

  const [createProviderClinic] = useMutation(ADD_PROVIDER_CLINIC);
  const [updateProviderClinic] = useMutation(UPDATE_PROVIDER_CLINIC);

  const handleClinicSelect = (values: Clinic[] | []) => {
    if (values.length) {
      setSelectedDocumentsClinicId(values[0].id);
      // This covers the first selection of a clinic; edge case when
      // adding a provider and no clinic is selected
      if (!provider?.id && !checkboxStates[values[0].id]) {
        setCheckboxStates({
          ...checkboxStates,
          [values[0].id]: {
            [providerClinicConsentFieldName]: false,
            [providerClinicDemographicsFieldName]: false,
            [providerClinicW9FieldName]: false,
          },
        });
      }
      // when a clinic is removed from selectedClinics list alter the checkboxStates to
      // reflect the change
      if (selectedClinics.length > values.length) {
        const newCheckboxStates = { ...checkboxStates };
        selectedClinics.forEach(clinic => {
          if (!values.find(value => value.id === clinic.id)) {
            delete newCheckboxStates[clinic.id];
          }
        });
        setCheckboxStates(newCheckboxStates);
      }
    } else {
      setSelectedDocumentsClinicId('');
      setCheckboxStates({});
    }
    setSelectedClinics(values);
  };

  const [getAllProviderClinicDocuments, { loading: allDocumentsLoading }] =
    useLazyQuery(GET_ALL_PROVIDER_CLINIC_DOCUMENTS, {
      fetchPolicy: 'cache-and-network',
      onCompleted: data => {
        let checkboxData = {};
        data.allProviderClinicDocuments.forEach(
          (clinicProviderDocument: ProviderClinic) => {
            checkboxData = {
              ...checkboxData,
              [clinicProviderDocument.clinicId]: {
                [providerClinicConsentFieldName]:
                  clinicProviderDocument.consentFormOnFile,
                [providerClinicDemographicsFieldName]:
                  clinicProviderDocument.hasDemographics,
                [providerClinicW9FieldName]: clinicProviderDocument.hasW9,
              },
            };
          },
        );
        setCheckboxStates(checkboxData);
      },
      variables: {
        providerId: provider?.id,
      },
    });

  const handleChangeProviderClinicDocuments = (clinicId: string) => {
    setSelectedDocumentsClinicId(clinicId);

    if (!provider?.id && !checkboxStates[clinicId]) {
      setCheckboxStates({
        ...checkboxStates,
        [clinicId]: {
          [providerClinicConsentFieldName]: false,
          [providerClinicDemographicsFieldName]: false,
          [providerClinicW9FieldName]: false,
        },
      });
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setCheckboxStates({
      ...checkboxStates,
      [selectedDocumentsClinicId]: {
        ...checkboxStates[selectedDocumentsClinicId],
        [name]: checked,
      },
    });
  };

  const handleSpecialtyChange = (event: SelectChangeEvent<string[]>) => {
    const specialty = event.target.value;
    // On autofill we get a stringified value.
    setSpecialties(
      typeof specialty === 'string' ? specialty.split(',') : specialty,
    );
  };

  const onSubmit = async (values: FormValuesProps, form: any) => {
    if (!selectedClinics.length) {
      openSnackbar('Please select a clinic', 'error');
      // @ts-ignore
      clinicSelectRef.focus();
      return;
    }
    const providerData = {
      clinics: selectedClinics.map(clinic => clinic.id), // clinics to connect
      existingClinicIds: provider?.clinics?.map(clinic => clinic.id), // might be some clinics to disconnect
      dateVisitedByLiaison: values.dateVisitedByLiaison ?? undefined,
      dateVisitedByProvider: values.dateVisitedByProvider ?? undefined,
      email: values.email ?? '',
      firstName: values.firstName,
      image: values.image, // TODO add image uploader
      lastName: values.lastName,
      organizationId: user.organizationId,
      notes: values.notes ?? '',
      phoneNumber: undoPhoneNumberFormat(phoneNumber) || undefined,
      specialties: specialties.length ? specialties : undefined,
      status: values.status,
      type: values.type,
    };

    if (provider) {
      try {
        const clinicProviderDataArray = Object.entries(checkboxStates).map(
          ([clinicId, documents]) => ({
            providerId: provider.id,
            clinicId,
            consentFormOnFile: documents.consentFormOnFile,
            hasDemographics: documents.hasDemographics,
            hasW9: documents.hasW9,
          }),
        );

        await Promise.all([
          updateProvider({
            variables: {
              id: provider.id,
              providerInput: providerData,
            },
          }),
          updateProviderClinic({
            variables: {
              providerClinicInput: clinicProviderDataArray,
            },
          }),
        ]);
        openSnackbar('Provider updated successfully', 'success');
      } catch (error: any) {
        openSnackbar(`Error updating provider: ${error.message}`, 'error');
      }
    } else {
      createProvider({
        onCompleted: data => {
          const clinicProviderDataArray = Object.entries(checkboxStates).map(
            ([clinicId, documents]) => ({
              providerId: data?.createProvider.id,
              clinicId,
              consentFormOnFile: documents.consentFormOnFile,
              hasDemographics: documents.hasDemographics,
              hasW9: documents.hasW9,
            }),
          );

          createProviderClinic({
            onCompleted: () => {
              openSnackbar('Provider added successfully', 'success');
              form.reset();
              setSelectedClinics([]);
              textFieldRef.current?.focus();
              setCheckboxStates({});
            },
            onError: error => {
              openSnackbar(
                `Provider added successfully, but an error occurred adding the provider/clinic documents: ${error.message}`,
                'error',
              );
            },
            variables: {
              providerClinicInput: clinicProviderDataArray,
            },
          });
        },
        onError: error => {
          openSnackbar(`Error adding provider: ${error.message}`, 'error');
        },
        variables: {
          providerInput: providerData,
        },
      });
    }
  };

  useEffect(() => {
    if (provider?.id) {
      getAllProviderClinicDocuments();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider?.id]);

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Grid container p={1}>
                  <Grid item xs={6} alignContent={'center'} pr={1}>
                    <Field
                      name="firstName"
                      validate={required}
                      initialValue={provider?.firstName ?? ''}>
                      {({ input, meta }) => (
                        <TextField
                          id="firstName"
                          error={meta.error && meta.touched}
                          label="First Name *"
                          fullWidth
                          name={input.name}
                          onChange={input.onChange}
                          ref={textFieldRef}
                          sx={{ m: 1 }}
                          type="text"
                          variant="outlined"
                          value={input.value}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} pr={2}>
                    <Field
                      name="lastName"
                      validate={required}
                      initialValue={provider?.lastName ?? ''}>
                      {({ input, meta }) => (
                        <TextField
                          id="lastName"
                          error={meta.error && meta.touched}
                          label="Last Name *"
                          fullWidth
                          name={input.name}
                          onChange={input.onChange}
                          sx={{ m: 1 }}
                          type="text"
                          value={input.value}
                          variant="outlined"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} pl={1}>
                    <Field name="status" initialValue={provider?.status ?? ''}>
                      {({ input, meta, values }) => (
                        <>
                          <FormControl
                            fullWidth
                            error={
                              meta.error &&
                              meta.touched &&
                              providerStatuses?.providerStatuses.find(
                                (providerStatus: ProviderStatus) =>
                                  providerStatus.status !== values?.status,
                              )
                            }>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                              id="status"
                              label="Status"
                              name={input.name}
                              onChange={input.onChange}
                              value={input.value ?? ''}
                              variant="outlined">
                              <MenuItem value={''}>Select a Status</MenuItem>
                              {providerStatuses?.providerStatuses?.map(
                                (
                                  providerStatus: ProviderStatus,
                                  index: number,
                                ) => {
                                  return (
                                    <MenuItem
                                      key={index}
                                      value={providerStatus.status}>
                                      {providerStatus.status} &nbsp;
                                      <Tooltip
                                        title={providerStatus.description}>
                                        <InfoOutlinedIcon fontSize="small" />
                                      </Tooltip>
                                    </MenuItem>
                                  );
                                },
                              )}
                            </Select>
                          </FormControl>
                          {!providerStatuses?.providerStatuses?.length && (
                            <FormHelperText>
                              Hint: you can add provider statuses from My
                              account
                            </FormHelperText>
                          )}
                        </>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} px={1}>
                    <Field name="clinic">
                      {({ input, meta }) => (
                        <FormControl fullWidth>
                          <Autocomplete
                            id="clinic"
                            disableCloseOnSelect
                            multiple
                            getOptionLabel={option =>
                              `${option.name} - ${option.city}, ${option.state}`
                            }
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            onChange={(_, value) => {
                              input.onChange;
                              handleClinicSelect(value);
                            }}
                            options={clinics}
                            renderInput={params => (
                              <TextField
                                inputRef={input => (clinicSelectRef = input)}
                                {...params}
                                label="Clinic *"
                                variant="standard"
                              />
                            )}
                            value={selectedClinics}
                          />
                          {meta.touched && !selectedClinics.length && (
                            <FormHelperText error>
                              Required {meta.touched}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    </Field>
                    <FormHelperText sx={{ pl: 1 }}>
                      <Link href="/clinics/new">
                        Clinic not found?
                        <AddClinic />
                      </Link>
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} px={1} pt={1}>
                    <Field name="specialties" initialValue={specialties}>
                      {({ input }) => (
                        <FormControl fullWidth>
                          <InputLabel id="specialties">Specialties</InputLabel>
                          <Select
                            id="specialties"
                            label="Specialties"
                            fullWidth
                            multiple
                            name={input.name}
                            onChange={event => {
                              input.onChange;
                              handleSpecialtyChange(event);
                            }}
                            type="text"
                            value={specialties}
                            variant="outlined">
                            <MenuItem value={''}>Select a specialty</MenuItem>
                            {PROVIDER_SPECIALTIES?.map((specialty, index) => {
                              return (
                                <MenuItem
                                  key={`${specialty}-${index}`}
                                  value={specialty}>
                                  {specialty}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} px={1} pt={1}>
                    <Field
                      name="type"
                      validate={required}
                      initialValue={provider?.type ?? ''}>
                      {({ input, meta }) => (
                        <FormControl
                          fullWidth
                          error={meta.error && meta.touched}>
                          <InputLabel id="type">Type *</InputLabel>
                          <Select
                            id="type"
                            label="Type *"
                            fullWidth
                            name={input.name}
                            onChange={input.onChange}
                            type="text"
                            value={input.value}
                            variant="outlined">
                            <MenuItem value={''}>Select a type</MenuItem>
                            {PROVIDER_TYPES?.map((type, index) => {
                              return (
                                <MenuItem key={`${type}-${index}`} value={type}>
                                  {type[0].toUpperCase() + type.slice(1)}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} pt={1} pr={2}>
                    <Field
                      name="email"
                      initialValue={provider?.email ?? undefined}>
                      {({ input }) => (
                        <TextField
                          id="email"
                          fullWidth
                          label="Email"
                          name={input.name}
                          onChange={input.onChange}
                          sx={{ m: 1 }}
                          type="email"
                          value={input.value}
                          variant="outlined"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} pt={1} pr={2}>
                    <Field
                      name="phoneNumber"
                      initialValue={provider?.phoneNumber ?? undefined}>
                      {({ input }) => (
                        <TextField
                          id="phoneNumber"
                          fullWidth
                          label="Cell Phone"
                          inputProps={{ maxLength: 14 }}
                          name={input.name}
                          onChange={event => {
                            input.onChange;
                            setPhoneNumber(event.target.value);
                          }}
                          sx={{ m: 1 }}
                          value={formatPhoneNumber(phoneNumber)}
                          variant="outlined"
                          type="tel"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} pr={1}>
                    <Field
                      name="dateVisitedByProvider"
                      initialValue={
                        provider?.dateVisitedByProvider ?? undefined
                      }>
                      {({ input }) => (
                        <>
                          <InputLabel id="dateVisitedByProvider" sx={{ pl: 1 }}>
                            Date Visited By Provider
                          </InputLabel>
                          <TextField
                            id="dateVisitedByProvider"
                            fullWidth
                            inputProps={{
                              max: new Date().toISOString().split('T')[0],
                            }}
                            name={input.name}
                            onChange={input.onChange}
                            sx={{ m: 1 }}
                            value={input.value}
                            variant="outlined"
                            type="date"
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} pr={2}>
                    <Field
                      name="dateVisitedByLiaison"
                      initialValue={
                        provider?.dateVisitedByProvider ?? undefined
                      }>
                      {({ input }) => (
                        <>
                          <InputLabel id="dateVisitedByLiaison" sx={{ pl: 1 }}>
                            Date Visited By Liaison
                          </InputLabel>
                          <TextField
                            id="dateVisitedByLiaison"
                            fullWidth
                            inputProps={{
                              max: new Date().toISOString().split('T')[0],
                            }}
                            name={input.name}
                            onChange={input.onChange}
                            sx={{ m: 1 }}
                            value={input.value}
                            variant="outlined"
                            type="date"
                          />
                        </>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={12} alignContent={'center'} pl={1} my={1}>
                        <Field
                          name="providerClinicDocuments"
                          initialValue={selectedDocumentsClinicId ?? ''}>
                          {({ input }) => (
                            <FormControl fullWidth>
                              <InputLabel id="selectClinicDocuments">
                                Provider/Clinic Documents
                              </InputLabel>
                              <Select
                                id="selectClinicDocuments"
                                label={'Provider/Clinic Documents'}
                                fullWidth
                                onChange={event => {
                                  handleChangeProviderClinicDocuments(
                                    event.target.value,
                                  );
                                }}
                                variant="outlined"
                                value={input.value}>
                                {selectedClinics.map(clinic => {
                                  return (
                                    <MenuItem key={clinic.id} value={clinic.id}>
                                      {clinic.name} - {clinic.city}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              {!selectedDocumentsClinicId && (
                                <FormHelperText>
                                  Please select clinic
                                </FormHelperText>
                              )}
                            </FormControl>
                          )}
                        </Field>
                        {allDocumentsLoading && (
                          <LinearProgress
                            sx={{
                              bgcolor: pageTitleHeaderBackgroundColor,
                              '.MuiLinearProgress-bar': {
                                bgcolor: sideNavBackgroundColor,
                              },
                            }}
                          />
                        )}
                        <Box
                          display="flex"
                          alignItems={'center'}
                          justifyContent={'space-between'}
                          pt={1}>
                          <CheckboxProviderClinicDocs
                            checked={
                              checkboxStates[selectedDocumentsClinicId]?.[
                                providerClinicConsentFieldName
                              ] ?? false
                            }
                            handleCheckboxChange={handleCheckboxChange}
                            label="Consent form?"
                            name={providerClinicConsentFieldName}
                            providerId={provider?.id}
                            selectedDocumentsClinicId={
                              selectedDocumentsClinicId
                            }
                          />
                        </Box>
                        <Box
                          display="flex"
                          alignItems={'center'}
                          justifyContent={'space-between'}>
                          <CheckboxProviderClinicDocs
                            checked={
                              checkboxStates[selectedDocumentsClinicId]?.[
                                providerClinicW9FieldName
                              ] ?? false
                            }
                            handleCheckboxChange={handleCheckboxChange}
                            label="W9?"
                            name={providerClinicW9FieldName}
                            providerId={provider?.id}
                            selectedDocumentsClinicId={
                              selectedDocumentsClinicId
                            }
                          />
                        </Box>
                        <Box
                          display="flex"
                          alignItems={'center'}
                          justifyContent={'space-between'}>
                          <CheckboxProviderClinicDocs
                            checked={
                              checkboxStates[selectedDocumentsClinicId]?.[
                                providerClinicDemographicsFieldName
                              ] ?? false
                            }
                            handleCheckboxChange={handleCheckboxChange}
                            label="Demographics?"
                            name={providerClinicDemographicsFieldName}
                            providerId={provider?.id}
                            selectedDocumentsClinicId={
                              selectedDocumentsClinicId
                            }
                          />
                        </Box>
                        <Box>
                          {!provider?.id && (
                            <FormHelperText>
                              Must create provider prior to file upload
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} alignContent={'center'} display={'flex'}>
                    <Field
                      name="notes"
                      initialValue={provider?.notes ?? undefined}>
                      {({ input }) => (
                        <TextField
                          id="image"
                          fullWidth
                          label="Notes"
                          multiline
                          name={input.name}
                          onChange={input.onChange}
                          rows={4}
                          sx={{ m: 1 }}
                          value={input.value}
                          variant="outlined"
                        />
                      )}
                    </Field>
                  </Grid>
                  {/* ADD image uploader to S3 GCP equivalent */}
                  {/* <Grid item xs={6} alignContent={'center'} pr={1}>
                    <Field name="image">
                      {({ input }) => (
                        <TextField
                          id="image"
                          disabled
                          fullWidth
                          label="Image Uploader"
                          name={input.name}
                          onChange={input.onChange}
                          sx={{ m: 1 }}
                          value={input.value}
                          variant="outlined"
                        />
                      )}
                    </Field>
                  </Grid> */}
                  <Grid item xs={12} display={'flex'} justifyContent={'end'}>
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
                      {provider ? 'Update' : 'Create'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProviderForm;
