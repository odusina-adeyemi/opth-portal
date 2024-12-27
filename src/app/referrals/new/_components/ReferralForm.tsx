'use client';
import React, { useRef, useState } from 'react';
import {
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
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { Form, Field } from 'react-final-form';
import {
  Clinic,
  Patient,
  Provider,
  User,
} from '../../../../constants/types/types';
import AddProvider from '../../../_components/AddProvider';
import AddClinic from '../../../_components/AddClinic';
import { useSnackbar } from '../../../_components/SnackbarProvider';
import {
  ADD_PATIENT,
  UPDATE_PATIENT,
} from '../../../api/graphql/mutations/patientMutations';
import { useMutation } from '@apollo/client';
import {
  formatPhoneNumber,
  required,
  undoPhoneNumberFormat,
} from '../../../../lib/utils/utils';

interface ReferralFormProps {
  patient?: Patient;
  optoms: Provider[] | []; // optometrists
  surgeons: Provider[] | []; // ophthalmologists
  user: User;
}

interface FormValuesProps {
  clinic: string;
  email: string;
  notes: string;
  patientFirstName: string;
  patientLastName: string;
  patientDOB: string;
  phoneNumber: string;
  provider: string;
  surgeon: string;
  surgeonClinic: string;
}

const ReferralForm = ({
  patient,
  optoms,
  surgeons,
  user,
}: ReferralFormProps) => {
  const [surgeonIdSelected, setSurgeonIdSelected] = useState<string>(
    patient?.surgeonId ?? '',
  );
  const [optomIdSelected, setOptomIdSelected] = useState<string>(
    patient?.referringProviderId ?? '',
  );

  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    patient?.phoneNumber ?? undefined,
  );

  const { openSnackbar } = useSnackbar();

  const textFieldRef = useRef<HTMLInputElement>(null);

  const [createPatient, { loading: createLoading, error: createError }] =
    useMutation(ADD_PATIENT);
  const [updatePatient, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_PATIENT);

  const onSubmit = async (values: FormValuesProps, form: any) => {
    let clinics = [values.clinic];
    if (values.surgeonClinic) {
      clinics.push(values.surgeonClinic);
    }

    let providers = [values.provider];
    if (values.surgeon) {
      providers.push(values.surgeon);
    }

    const patientData = {
      clinics: clinics, // m-m relationship
      dob: values.patientDOB,
      email: values.email,
      firstName: values.patientFirstName,
      generalNotes: values.notes,
      lastName: values.patientLastName,
      organizationId: user.organizationId,
      phoneNumber: undoPhoneNumberFormat(phoneNumber) || undefined,
      providers: providers, // m-m relationship
      referringClinicId: values.clinic,
      referringProviderId: values.provider,
      surgeonClinicId: values.surgeonClinic,
      surgeonId: surgeonIdSelected === '' ? undefined : surgeonIdSelected,
    };

    if (patient) {
      updatePatient({
        onCompleted: () => {
          openSnackbar('Patient updated successfully', 'success');
        },
        onError: () => {
          openSnackbar(`Error updating patient ${updateError}`, 'error');
        },
        variables: { id: patient.id, patientInput: patientData },
      });
    } else {
      createPatient({
        onCompleted: ({ createPatient }) => {
          if (createPatient) {
            openSnackbar('Patient created successfully', 'success');
            form.reset();
            textFieldRef.current?.focus();
            setOptomIdSelected('');
            setSurgeonIdSelected('');
          } else {
            openSnackbar(
              'Error creating patient. Check for invalid inputs',
              'error',
            );
          }
        },
        onError: () => {
          openSnackbar(`Error creating patient ${createError}`, 'error');
        },
        variables: { patientInput: patientData },
      });
    }
  };

  const optom = optoms.find(optom => optom.id === optomIdSelected);
  const surgeon = surgeons.find(surgeon => surgeon.id === surgeonIdSelected);

  return (
    <Paper>
      <Grid container>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12} alignContent={'center'}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', m: 1 }}
                  >
                    Patient Information
                  </Typography>
                </Grid>
                <Grid item xs={6} alignContent={'center'} pr={2}>
                  <Field
                    name="patientFirstName"
                    initialValue={patient?.firstName ?? ''}
                    validate={required}
                  >
                    {({ input, meta }) => (
                      <TextField
                        id="patientFirstName"
                        error={meta.error && meta.touched}
                        label="First name *"
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
                    name="patientLastName"
                    initialValue={patient?.lastName ?? ''}
                    validate={required}
                  >
                    {({ input, meta }) => (
                      <TextField
                        id="patientLastName"
                        error={meta.error && meta.touched}
                        label="Last name *"
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
                <Grid item xs={6} alignContent={'center'} pr={2}>
                  <Field
                    name="patientDOB"
                    initialValue={patient?.dob ?? undefined}
                    validate={required}
                  >
                    {({ input, meta }) => (
                      <>
                        <InputLabel
                          id="patientDOB"
                          sx={{
                            pl: 1,
                            color: meta.error && meta.touched && '#d32f2f',
                          }}
                        >
                          Date of birth *
                        </InputLabel>
                        <TextField
                          id="patientDOB"
                          error={meta.error && meta.touched}
                          fullWidth
                          inputProps={{
                            max: new Date().toISOString().split('T')[0],
                          }}
                          name={input.name}
                          onChange={input.onChange}
                          sx={{ m: 1 }}
                          type="date"
                          value={input.value}
                          variant="outlined"
                        />
                      </>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', mt: 1, mx: 1 }}
                  >
                    Patient Contact Information
                  </Typography>
                </Grid>
                <Grid item xs={6} alignContent={'center'} pr={2}>
                  <Field
                    name="email"
                    initialValue={patient?.email ?? undefined}
                  >
                    {({ input }) => (
                      <TextField
                        id="email"
                        label="Email"
                        fullWidth
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
                <Grid item xs={6} alignContent={'center'} pr={2}>
                  <Field
                    name="phoneNumber"
                    initialValue={patient?.phoneNumber ?? undefined}
                  >
                    {({ input }) => (
                      <TextField
                        id="phoneNumber"
                        label="Phone number"
                        fullWidth
                        inputProps={{ maxLength: 14 }}
                        name={input.name}
                        onChange={event => {
                          input.onChange;
                          setPhoneNumber(event.target.value);
                        }}
                        sx={{ m: 1 }}
                        type="tel"
                        value={formatPhoneNumber(phoneNumber)}
                        variant="outlined"
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', mt: 1, mx: 1 }}
                  >
                    Provider Information
                  </Typography>
                </Grid>
                <Grid item xs={6} alignContent={'center'} pb={1}>
                  <Typography sx={{ mt: 1, mx: 1 }} variant="caption">
                    Select an optometrist
                  </Typography>
                </Grid>
                <Grid item xs={6} alignContent={'center'}>
                  {!values.provider?.length && (
                    <Typography sx={{ mt: 1, mx: 1 }} variant="caption">
                      Select a provider first
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6} alignContent={'center'} px={1}>
                  <Field
                    name="provider"
                    initialValue={
                      patient ? patient.referringProviderId : undefined
                    }
                    validate={required}
                  >
                    {({ input, meta }) => (
                      <FormControl fullWidth error={meta.error && meta.touched}>
                        <InputLabel id="provider">Provider *</InputLabel>
                        <Select
                          id="provider"
                          label="Provider *"
                          name={input.name}
                          onChange={event => {
                            input.onChange(event);
                            setOptomIdSelected(event.target.value);
                          }}
                          value={optomIdSelected}
                          variant="outlined"
                        >
                          <MenuItem value={''}>Select a provider</MenuItem>
                          {optoms?.map(optom => {
                            return (
                              <MenuItem key={optom.id} value={optom.id}>
                                {optom.firstName} {optom.lastName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormHelperText>
                          <Link href="/providers/new">
                            Provider not found?
                            <AddProvider />
                          </Link>
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6} alignContent={'center'} px={1}>
                  <Field
                    name="clinic"
                    initialValue={patient?.referringClinicId ?? undefined}
                    validate={required}
                  >
                    {({ input, meta }) => (
                      <FormControl fullWidth error={meta.error && meta.touched}>
                        <InputLabel id="clinic">Clinic *</InputLabel>
                        <Select
                          id="clinic"
                          disabled={values?.provider ? false : true}
                          label="Clinic *"
                          fullWidth
                          name={input.name}
                          onChange={input.onChange}
                          value={input.value}
                          variant="outlined"
                          type="text"
                        >
                          <MenuItem value={''}>Select a clinic</MenuItem>
                          {optom?.clinics?.map((clinic: Clinic) => {
                            return (
                              <MenuItem key={clinic.id} value={clinic.id}>
                                {clinic.name} - {clinic.city}, {clinic.state}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormHelperText>
                          <Link href={'/clinics/new'}>
                            Clinic not found?
                            <AddClinic />
                          </Link>
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Grid
                  item
                  xs={6}
                  display={'flex'}
                  alignContent={'center'}
                  px={1}
                  pt={1}
                >
                  <Field
                    name="surgeon"
                    initialValue={patient?.surgeonId ?? undefined}
                  >
                    {({ input, meta }) => (
                      <FormControl fullWidth error={meta.error && meta.touched}>
                        <InputLabel id="surgeonName">Surgeon name</InputLabel>
                        <Select
                          id="surgeonName"
                          label="Surgeon Name"
                          fullWidth
                          name={input.name}
                          onChange={event => {
                            input.onChange;
                            setSurgeonIdSelected(event.target.value);
                          }}
                          type="text"
                          value={surgeonIdSelected}
                          variant="outlined"
                        >
                          <MenuItem value={''}>Select a surgeon</MenuItem>
                          {surgeons?.map(surgeon => {
                            return (
                              <MenuItem key={surgeon.id} value={surgeon.id}>
                                {surgeon.firstName} {surgeon.lastName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <FormHelperText />
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6} alignContent={'center'} px={1} pt={1}>
                  <Field
                    name="surgeonClinic"
                    initialValue={patient?.surgeonClinicId ?? undefined}
                  >
                    {({ input, meta }) => (
                      <FormControl fullWidth error={meta.error && meta.touched}>
                        <InputLabel id="surgeonClinic">
                          Surgeon clinic
                        </InputLabel>
                        <Select
                          id="surgeonName"
                          disabled={!surgeonIdSelected}
                          label="Surgeon Clinic"
                          fullWidth
                          name={input.name}
                          onChange={input.onChange}
                          type="text"
                          value={input.value}
                          variant="outlined"
                        >
                          <MenuItem value={''}>Select a surgeon</MenuItem>
                          {surgeon?.clinics?.map(clinic => {
                            return (
                              <MenuItem key={clinic.id} value={clinic.id}>
                                {clinic.name} - {clinic.city}, {clinic.state}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        {!surgeonIdSelected && (
                          <FormHelperText>Select a surgeon</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6} alignContent={'center'}>
                  <Field
                    name="notes"
                    initialValue={patient?.generalNotes ?? undefined}
                  >
                    {({ input }) => (
                      <TextField
                        id="notes"
                        fullWidth
                        label="Notes"
                        multiline
                        name={input.name}
                        onChange={input.onChange}
                        rows={4}
                        sx={{ m: 1, pr: 2 }}
                        value={input.value}
                        variant="outlined"
                      />
                    )}
                  </Field>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display={'flex'}
                  alignContent={'center'}
                  justifyContent={'end'}
                  p={1}
                >
                  <Button
                    color="primary"
                    disabled={submitting || createLoading || updateLoading}
                    onSubmit={handleSubmit}
                    startIcon={
                      (submitting || createLoading || updateLoading) && (
                        <CircularProgress size={20} />
                      )
                    }
                    type="submit"
                    variant="contained"
                  >
                    {patient ? 'Update' : 'Create'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </Grid>
    </Paper>
  );
};

export default ReferralForm;
