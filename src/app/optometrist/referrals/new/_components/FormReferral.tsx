'use client';
import React, { useState, useRef } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { Clinic, Provider, Patient, User } from '../../../../../constants/types/types';
import AddProvider from '../../../../_components/AddProvider';
import AddClinic from '../../../../_components/AddClinic';
import { useSnackbar } from '../../../../_components/SnackbarProvider';
import {
  ADD_PATIENT,
  UPDATE_PATIENT,
} from '../../../../api/graphql/mutations/patientMutations';
import { useMutation } from '@apollo/client';
import {
  formatPhoneNumber,
  required,
  undoPhoneNumberFormat,
} from '../../../../../lib/utils/utils';

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
  const [surgeonIdSelected, setSurgeonIdSelected] = useState<string>(patient?.surgeonId ?? '');
  const [optomIdSelected, setOptomIdSelected] = useState<string>(patient?.referringProviderId ?? '');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(patient?.phoneNumber ?? undefined);

  const { openSnackbar } = useSnackbar();
  const textFieldRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValuesProps>();

  const [createPatient, { loading: createLoading, error: createError }] = useMutation(ADD_PATIENT);
  const [updatePatient, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_PATIENT);

  const onSubmit = async (values: FormValuesProps) => {
    let clinics = [values.clinic];
    if (values.surgeonClinic) {
      clinics.push(values.surgeonClinic);
    }

    let providers = [values.provider];
    if (values.surgeon) {
      providers.push(values.surgeon);
    }

    const patientData = {
      clinics,
      dob: values.patientDOB,
      email: values.email,
      firstName: values.patientFirstName,
      generalNotes: values.notes,
      lastName: values.patientLastName,
      organizationId: user.organizationId,
      phoneNumber: undoPhoneNumberFormat(phoneNumber) || undefined,
      providers,
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
            reset(); // Reset the form after submission
            textFieldRef.current?.focus();
            setOptomIdSelected('');
            setSurgeonIdSelected('');
          } else {
            openSnackbar('Error creating patient. Check for invalid inputs', 'error');
          }
        },
        onError: () => {
          openSnackbar(`Error creating patient ${createError}`, 'error');
        },
        variables: { patientInput: patientData },
      });
    }
  };

  return (
    <div>
      <Grid container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} alignContent={'center'}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', m: 1 }}>
                Information
              </Typography>
            </Grid>
            <Grid item xs={6} alignContent={'center'} pr={2}>
              <Controller
                name="patientFirstName"
                control={control}
                defaultValue={patient?.firstName ?? ''}
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                  <TextField
                    id="patientFirstName"
                    label="First name *"
                    fullWidth
                    {...field}
                    inputRef={textFieldRef}
                    sx={{ m: 1 }}
                    variant="outlined"
                    error={!!errors.patientFirstName}
                    helperText={errors.patientFirstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} alignContent={'center'} pr={2}>
              <Controller
                name="patientLastName"
                control={control}
                defaultValue={patient?.lastName ?? ''}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                  <TextField
                    id="patientLastName"
                    label="Last name *"
                    fullWidth
                    {...field}
                    sx={{ m: 1 }}
                    variant="outlined"
                    error={!!errors.patientLastName}
                    helperText={errors.patientLastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} alignContent={'center'} pr={2}>
              <Controller
                name="patientDOB"
                control={control}
                defaultValue={patient?.dob ?? undefined}
                rules={{ required: 'Date of birth is required' }}
                render={({ field }) => (
                  <>
                    <InputLabel id="patientDOB" sx={{ pl: 1 }}>
                      Date of birth *
                    </InputLabel>
                    <TextField
                      id="patientDOB"
                      label="Date of birth *"
                      fullWidth
                      {...field}
                      sx={{ m: 1 }}
                      type="date"
                      inputProps={{ max: new Date().toISOString().split('T')[0] }}
                      error={!!errors.patientDOB}
                      helperText={errors.patientDOB?.message}
                    />
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1, mx: 1 }}>
                Patient Contact Information
              </Typography>
            </Grid>
            <Grid item xs={6} alignContent={'center'} pr={2}>
              <Controller
                name="email"
                control={control}
                defaultValue={patient?.email ?? undefined}
                render={({ field }) => (
                  <TextField
                    id="email"
                    label="Email"
                    fullWidth
                    {...field}
                    sx={{ m: 1 }}
                    type="email"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} alignContent={'center'} pr={2}>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue={patient?.phoneNumber ?? undefined}
                render={({ field }) => (
                  <TextField
                    id="phoneNumber"
                    label="Phone number"
                    fullWidth
                    inputProps={{ maxLength: 14 }}
                    {...field}
                    sx={{ m: 1 }}
                    type="tel"
                    value={formatPhoneNumber(phoneNumber)}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      field.onChange(e);
                    }}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1, mx: 1 }}>
                Provider Information
              </Typography>
            </Grid>
            <Grid item xs={6} alignContent={'center'} pb={1}>
              <Typography sx={{ mt: 1, mx: 1 }} variant="caption">
                Select an optometrist
              </Typography>
            </Grid>
            <Grid item xs={6} alignContent={'center'}>
              <Controller
                name="provider"
                control={control}
                defaultValue={patient ? patient.referringProviderId : ''}
                rules={{ required: 'Provider is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.provider}>
                    <InputLabel id="provider">Provider *</InputLabel>
                    <Select
                      id="provider"
                      label="Provider *"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setOptomIdSelected(e.target.value);
                      }}
                      value={optomIdSelected}
                      variant="outlined"
                    >
                      <MenuItem value="">Select a provider</MenuItem>
                      {optoms.map((optom) => (
                        <MenuItem key={optom.id} value={optom.id}>
                          {optom.firstName} {optom.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.provider?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary">
                {createLoading || updateLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  'Submit'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default ReferralForm;
