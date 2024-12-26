// 'use client';
// import React, { useRef, useState } from 'react';
// import {
//   Button,
//   CircularProgress,
//   FormControl,
//   FormHelperText,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TextField,
//   Typography
// } from '@mui/material';
// import Link from 'next/link';
// import { Form, Field } from 'react-final-form';
// import {
//   Clinic,
//   Patient,
//   Provider,
//   User,
// } from '../../../../../constants/types/types';
// import AddProvider from '../../../../_components/AddProvider';
// import AddClinic from '../../../../_components/AddClinic';
// import { useSnackbar } from '../../../../_components/SnackbarProvider';
// import {
//   ADD_PATIENT,
//   UPDATE_PATIENT,
// } from '../../../../api/graphql/mutations/patientMutations';
// import { useMutation } from '@apollo/client';
// import {
//   formatPhoneNumber,
//   required,
//   undoPhoneNumberFormat,
// } from '../../../../../lib/utils/utils';

// interface ReferralFormProps {
//   patient?: Patient;
//   optoms: Provider[] | []; // optometrists
//   surgeons: Provider[] | []; // ophthalmologists
//   user: User;
// }

// interface FormValuesProps {
//   clinic: string;
//   email: string;
//   notes: string;
//   patientFirstName: string;
//   patientLastName: string;
//   patientDOB: string;
//   phoneNumber: string;
//   provider: string;
//   surgeon: string;
//   surgeonClinic: string;
// }

// const ReferralForm = ({
//   patient,
//   optoms,
//   surgeons,
//   user,
// }: ReferralFormProps) => {
//   const [surgeonIdSelected, setSurgeonIdSelected] = useState<string>(
//     patient?.surgeonId ?? '',
//   );
//   const [optomIdSelected, setOptomIdSelected] = useState<string>(
//     patient?.referringProviderId ?? '',
//   );

//   const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
//     patient?.phoneNumber ?? undefined,
//   );

//   const { openSnackbar } = useSnackbar();

//   const textFieldRef = useRef<HTMLInputElement>(null);

//   const [createPatient, { loading: createLoading, error: createError }] =
//     useMutation(ADD_PATIENT);
//   const [updatePatient, { loading: updateLoading, error: updateError }] =
//     useMutation(UPDATE_PATIENT);

//   const onSubmit = async (values: FormValuesProps, form: any) => {
//     let clinics = [values.clinic];
//     if (values.surgeonClinic) {
//       clinics.push(values.surgeonClinic);
//     }

//     let providers = [values.provider];
//     if (values.surgeon) {
//       providers.push(values.surgeon);
//     }

//     const patientData = {
//       clinics: clinics, // m-m relationship
//       dob: values.patientDOB,
//       email: values.email,
//       firstName: values.patientFirstName,
//       generalNotes: values.notes,
//       lastName: values.patientLastName,
//       organizationId: user.organizationId,
//       phoneNumber: undoPhoneNumberFormat(phoneNumber) || undefined,
//       providers: providers, // m-m relationship
//       referringClinicId: values.clinic,
//       referringProviderId: values.provider,
//       surgeonClinicId: values.surgeonClinic,
//       surgeonId: surgeonIdSelected === '' ? undefined : surgeonIdSelected,
//     };

//     if (patient) {
//       updatePatient({
//         onCompleted: () => {
//           openSnackbar('Patient updated successfully', 'success');
//         },
//         onError: () => {
//           openSnackbar(`Error updating patient ${updateError}`, 'error');
//         },
//         variables: { id: patient.id, patientInput: patientData },
//       });
//     } else {
//       createPatient({
//         onCompleted: ({ createPatient }) => {
//           if (createPatient) {
//             openSnackbar('Patient created successfully', 'success');
//             form.reset();
//             textFieldRef.current?.focus();
//             setOptomIdSelected('');
//             setSurgeonIdSelected('');
//           } else {
//             openSnackbar(
//               'Error creating patient. Check for invalid inputs',
//               'error',
//             );
//           }
//         },
//         onError: () => {
//           openSnackbar(`Error creating patient ${createError}`, 'error');
//         },
//         variables: { patientInput: patientData },
//       });
//     }
//   };

//   const optom = optoms.find(optom => optom.id === optomIdSelected);
//   const surgeon = surgeons.find(surgeon => surgeon.id === surgeonIdSelected);

//   return (
//     <div>
//       <Grid container>
//         <Form
//           onSubmit={onSubmit}
//           render={({ handleSubmit, submitting, values }) => (
//             <form onSubmit={handleSubmit}>
//               <Grid container>
//                 <Grid item xs={12} alignContent={'center'}>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ fontWeight: 'bold', m: 1 }}>
//                 Information
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'} pr={2}>
//                   <Field
//                     name="patientFirstName"
//                     initialValue={patient?.firstName ?? ''}
//                     validate={required}>
//                     {({ input, meta }) => (
//                       <TextField
//                         id="patientFirstName"
//                         error={meta.error && meta.touched}
//                         label="First name *"
//                         fullWidth
//                         name={input.name}
//                         onChange={input.onChange}
//                         ref={textFieldRef}
//                         sx={{ m: 1 }}
//                         type="text"
//                         variant="outlined"
//                         value={input.value}
//                       />
//                     )}
//                   </Field>
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'} pr={2}>
//                   <Field
//                     name="patientLastName"
//                     initialValue={patient?.lastName ?? ''}
//                     validate={required}>
//                     {({ input, meta }) => (
//                       <TextField
//                         id="patientLastName"
//                         error={meta.error && meta.touched}
//                         label="Last name *"
//                         fullWidth
//                         name={input.name}
//                         onChange={input.onChange}
//                         sx={{ m: 1 }}
//                         type="text"
//                         value={input.value}
//                         variant="outlined"
//                       />
//                     )}
//                   </Field>
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'} pr={2}>
//                   <Field
//                     name="patientDOB"
//                     initialValue={patient?.dob ?? undefined}
//                     validate={required}>
//                     {({ input, meta }) => (
//                       <>
//                         <InputLabel
//                           id="patientDOB"
//                           sx={{
//                             pl: 1,
//                             color: meta.error && meta.touched && '#d32f2f',
//                           }}>
//                           Date of birth *
//                         </InputLabel>
//                         <TextField
//                           id="patientDOB"
//                           error={meta.error && meta.touched}
//                           fullWidth
//                           inputProps={{
//                             max: new Date().toISOString().split('T')[0],
//                           }}
//                           name={input.name}
//                           onChange={input.onChange}
//                           sx={{ m: 1 }}
//                           type="date"
//                           value={input.value}
//                           variant="outlined"
//                         />
//                       </>
//                     )}
//                   </Field>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ fontWeight: 'bold', mt: 1, mx: 1 }}>
//                     Patient Contact Information
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'} pr={2}>
//                   <Field
//                     name="email"
//                     initialValue={patient?.email ?? undefined}>
//                     {({ input }) => (
//                       <TextField
//                         id="email"
//                         label="Email"
//                         fullWidth
//                         name={input.name}
//                         onChange={input.onChange}
//                         sx={{ m: 1 }}
//                         type="email"
//                         value={input.value}
//                         variant="outlined"
//                       />
//                     )}
//                   </Field>
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'} pr={2}>
//                   <Field
//                     name="phoneNumber"
//                     initialValue={patient?.phoneNumber ?? undefined}>
//                     {({ input }) => (
//                       <TextField
//                         id="phoneNumber"
//                         label="Phone number"
//                         fullWidth
//                         inputProps={{ maxLength: 14 }}
//                         name={input.name}
//                         onChange={event => {
//                           input.onChange;
//                           setPhoneNumber(event.target.value);
//                         }}
//                         sx={{ m: 1 }}
//                         type="tel"
//                         value={formatPhoneNumber(phoneNumber)}
//                         variant="outlined"
//                       />
//                     )}
//                   </Field>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ fontWeight: 'bold', mt: 1, mx: 1 }}>
//                     Provider Information
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'} pb={1}>
//                   <Typography sx={{ mt: 1, mx: 1 }} variant="caption">
//                     Select an optometrist
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'}>
//                   {!values.provider?.length && (
//                     <Typography sx={{ mt: 1, mx: 1 }} variant="caption">
//                       Select a provider first
//                     </Typography>
//                   )}
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'} px={1}>
//                   <Field
//                     name="provider"
//                     initialValue={
//                       patient ? patient.referringProviderId : undefined
//                     }
//                     validate={required}>
//                     {({ input, meta }) => (
//                       <FormControl fullWidth error={meta.error && meta.touched}>
//                         <InputLabel id="provider">Provider *</InputLabel>
//                         <Select
//                           id="provider"
//                           label="Provider *"
//                           name={input.name}
//                           onChange={event => {
//                             input.onChange(event);
//                             setOptomIdSelected(event.target.value);
//                           }}
//                           value={optomIdSelected}
//                           variant="outlined">
//                           <MenuItem value={''}>Select a provider</MenuItem>
//                           {optoms?.map(optom => {
//                             return (
//                               <MenuItem key={optom.id} value={optom.id}>
//                                 {optom.firstName} {optom.lastName}
//                               </MenuItem>
//                             );
//                           })}
//                         </Select>
//                         <FormHelperText>
//                           <Link href="/providers/new">
//                             Provider not found?
//                             <AddProvider />
//                           </Link>
//                         </FormHelperText>
//                       </FormControl>
//                     )}
//                   </Field>
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'} px={1}>
//                   <Field
//                     name="clinic"
//                     initialValue={patient?.referringClinicId ?? undefined}
//                     validate={required}>
//                     {({ input, meta }) => (
//                       <FormControl fullWidth error={meta.error && meta.touched}>
//                         <InputLabel id="clinic">Clinic *</InputLabel>
//                         <Select
//                           id="clinic"
//                           disabled={values?.provider ? false : true}
//                           label="Clinic *"
//                           fullWidth
//                           name={input.name}
//                           onChange={input.onChange}
//                           value={input.value}
//                           variant="outlined"
//                           type="text">
//                           <MenuItem value={''}>Select a clinic</MenuItem>
//                           {optom?.clinics?.map((clinic: Clinic) => {
//                             return (
//                               <MenuItem key={clinic.id} value={clinic.id}>
//                                 {clinic.name} - {clinic.city}, {clinic.state}
//                               </MenuItem>
//                             );
//                           })}
//                         </Select>
//                         <FormHelperText>
//                           <Link href={'/clinics/new'}>
//                             Clinic not found?
//                             <AddClinic />
//                           </Link>
//                         </FormHelperText>
//                       </FormControl>
//                     )}
//                   </Field>
//                 </Grid>
//                 <Grid
//                   item
//                   xs={6}
//                   display={'flex'}
//                   alignContent={'center'}
//                   px={1}
//                   pt={1}>
//                   <Field
//                     name="surgeon"
//                     initialValue={patient?.surgeonId ?? undefined}>
//                     {({ input, meta }) => (
//                       <FormControl fullWidth error={meta.error && meta.touched}>
//                         <InputLabel id="surgeonName">Surgeon name</InputLabel>
//                         <Select
//                           id="surgeonName"
//                           label="Surgeon Name"
//                           fullWidth
//                           name={input.name}
//                           onChange={event => {
//                             input.onChange;
//                             setSurgeonIdSelected(event.target.value);
//                           }}
//                           type="text"
//                           value={surgeonIdSelected}
//                           variant="outlined">
//                           <MenuItem value={''}>Select a surgeon</MenuItem>
//                           {surgeons?.map(surgeon => {
//                             return (
//                               <MenuItem key={surgeon.id} value={surgeon.id}>
//                                 {surgeon.firstName} {surgeon.lastName}
//                               </MenuItem>
//                             );
//                           })}
//                         </Select>
//                         <FormHelperText />
//                       </FormControl>
//                     )}
//                   </Field>
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'} px={1} pt={1}>
//                   <Field
//                     name="surgeonClinic"
//                     initialValue={patient?.surgeonClinicId ?? undefined}>
//                     {({ input, meta }) => (
//                       <FormControl fullWidth error={meta.error && meta.touched}>
//                         <InputLabel id="surgeonClinic">
//                           Surgeon clinic
//                         </InputLabel>
//                         <Select
//                           id="surgeonName"
//                           disabled={!surgeonIdSelected}
//                           label="Surgeon Clinic"
//                           fullWidth
//                           name={input.name}
//                           onChange={input.onChange}
//                           type="text"
//                           value={input.value}
//                           variant="outlined">
//                           <MenuItem value={''}>Select a surgeon</MenuItem>
//                           {surgeon?.clinics?.map(clinic => {
//                             return (
//                               <MenuItem key={clinic.id} value={clinic.id}>
//                                 {clinic.name} - {clinic.city}, {clinic.state}
//                               </MenuItem>
//                             );
//                           })}
//                         </Select>
//                         {!surgeonIdSelected && (
//                           <FormHelperText>Select a surgeon</FormHelperText>
//                         )}
//                       </FormControl>
//                     )}
//                   </Field>
//                 </Grid>
//                 <Grid item xs={6} alignContent={'center'}>
//                   <Field
//                     name="notes"
//                     initialValue={patient?.generalNotes ?? undefined}>
//                     {({ input }) => (
//                       <TextField
//                         id="notes"
//                         fullWidth
//                         label="Notes"
//                         multiline
//                         name={input.name}
//                         onChange={input.onChange}
//                         rows={4}
//                         sx={{ m: 1, pr: 2 }}
//                         value={input.value}
//                         variant="outlined"
//                       />
//                     )}
//                   </Field>
//                 </Grid>
//                 <Grid
//                   item
//                   xs={12}
//                   display={'flex'}
//                   alignContent={'center'}
//                   justifyContent={'end'}
//                   p={1}>
//                   <Button
//                     color="primary"
//                     disabled={submitting || createLoading || updateLoading}
//                     onSubmit={handleSubmit}
//                     startIcon={
//                       (submitting || createLoading || updateLoading) && (
//                         <CircularProgress size={20} />
//                       )
//                     }
//                     type="submit"
//                     variant="contained">
//                     {patient ? 'Update' : 'Create'}
//                   </Button>
//                 </Grid>
//               </Grid>
//             </form>
//           )}
//         />
//       </Grid>
//     </div>
//   );
// };

// export default ReferralForm;

'use client';
import React, { useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { Form, Field } from 'react-final-form';
import { useSnackbar } from '../../../../_components/SnackbarProvider';
import {
  Clinic,
  Patient,
  Provider,
  User,
} from '../../../../../constants/types/types';
import { useMutation } from '@apollo/client';
import {
  ADD_PATIENT,
  UPDATE_PATIENT,
} from '../../../../api/graphql/mutations/patientMutations';
import {
  formatPhoneNumber,
  required,
  undoPhoneNumberFormat,
} from '../../../../../lib/utils/utils';
import AddProvider from '../../../../_components/AddProvider';
import AddClinic from '../../../../_components/AddClinic';
import LocationDropdowns from '../../_components/StatesFetch';
// import FileUpload from '../../../../_components/FileUpload';

interface ReferralFormProps {
  patient?: Patient;
  optoms: Provider[] | []; // optometrists
  surgeons: Provider[] | []; // ophthalmologists
  user: User;
}

// interface FormValuesProps {
//   referrerEmail: string;
//   referrerZip: string;
//   referrerCity: string;
//   referrerAddress: string;
//   referrerFax: string;
//   doctorSpecialty: string;
//   clinic: string;
//   email: string;
//   notes: string;
//   patientFirstName: string;
//   patientLastName: string;
//   patientDOB: string; // ISO date format (YYYY-MM-DD)
//   phoneNumber: string;
//   provider: string;
//   surgeon: string;
//   surgeonClinic: string;
//   fax?: string; // Optional, for fax number
//   address?: string; // Optional, for address
//   city?: string; // Optional, for city
//   zip?: string; // Optional, for ZIP code
//   gender?: string; // Optional, male/female
//   interpreterNeeded?: boolean; // Optional, yes/no
//   language?: string; // Optional, for preferred language
//   okToText?: boolean; // Optional, yes/no
//   providerPhoneNumber?: string; // Add this property
//   providerEmail?: string; // Add this property
//   providerAddress?: string; // Add this property
//   insuranceProvider?: string; // Optional, insurance provider
//   insurancePolicyNumber?: string; // Optional, insurance policy number
//   primaryInsuranceProvider?: string; // Optional, primary insurance provider
//   primaryInsuranceIdNumber?: string; // Optional, primary insurance ID
//   primaryInsuranceGroupNumber?: string; // Optional, primary insurance group number
//   secondaryInsuranceProvider?: string; // Optional, secondary insurance provider
//   secondaryInsuranceIdNumber?: string; // Optional, secondary insurance ID
//   secondaryInsuranceGroupNumber?: string; // Optional, secondary insurance group number
//   preferredLocations?: string[]; // Optional, array of preferred locations
//   consultationType?: string[]; // Optional, array of consultation types
//   urgentReferral?: boolean; // Optional, true if urgent
//   attachedFiles?: File[]; // Optional, for file uploads
//   additionalNotes?: string; // Optional, additional notes
//   comanagement?: boolean; // Optional, for co-management preferences
//   comanageYes?: boolean; // Optional, for co-management preferences
//   comanageNo?: boolean; // Optional, for co-management preferences
// }

interface FormValuesProps {
  // Patient Info
  patientFirstName?: string;
  patientLastName?: string;
  patientDOB: string; // ISO date format (YYYY-MM-DD)
  gender?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  zip?: string;
  fax?: string;
  interpreterNeeded?: boolean;
  language?: string;
  okToText?: boolean;
  notes?: string;
  urgentReferral?: boolean;
  preferredLocations?: string[];
  consultationType?: string[];
  comanageYes?: boolean;
  comanageNo?: boolean;
  signUpNewsLetter?: boolean;

  // Appointment Info
  doctorSpecialty?: string;
  additionalConditions?: string;
  chartNotesAttachments?: File[]; // Array of uploaded files

  // Referral Info
  referringClinicId?: string;
  referringProviderId?: string;
  referringEmail?: string;
  referringPhone?: string;
  referringFax?: string;
  referringAddress?: string;
  referringCity?: string;
  referringStateZip?: string;

  // Insurance Info
  primaryInsuranceProviderId?: string;
  primaryInsuranceProviderName?: string;
  primaryInsuranceIdNumber?: string;
  primaryInsuranceGroupNumber?: string;
  secondaryInsuranceProviderId?: string;
  secondaryInsuranceProviderName?: string;
  secondaryInsuranceIdNumber?: string;
  secondaryInsuranceGroupNumber?: string;

  // Surgeon Info
  surgeonId?: string;
  surgeonClinicId?: string;

  // Organization
  organizationId?: string;

  // Relationships
  clinics?: string[];
  providers?: string[];
}

const ReferralForm = ({
  patient,
  optoms,
  surgeons,
  user,
}: ReferralFormProps) => {
  const [surgeonIdSelected, setSurgeonIdSelected] = useState(
    patient?.surgeon ?? '',
  );
  const [optomIdSelected, setOptomIdSelected] = useState(
    patient?.referringProviderId ?? '',
  );
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    patient?.phoneNumber as string | undefined,
  );
  const { openSnackbar } = useSnackbar();
  const textFieldRef = useRef<HTMLInputElement>(null);

  const [createPatient, { loading: createLoading, error: createError }] =
    useMutation(ADD_PATIENT);
  const [updatePatient, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_PATIENT);

  const onSubmit = async (values: FormValuesProps, form: any) => {
    let clinics = values.clinics ?? [];
    if (values.surgeonClinicId) {
      clinics.push(values.surgeonClinicId);
    }

    let providers = values.providers ?? [];
    if (values.surgeonId) {
      providers.push(values.surgeonId);
    }




    const patientData = {
      // Patient Basic Information
      firstName: values.patientFirstName || undefined,
      lastName: values.patientLastName || undefined,
      dob: values.patientDOB,
      gender: values.gender || undefined,
      email: values.email || undefined,
      phoneNumber: values.phoneNumber
        ? undoPhoneNumberFormat(values.phoneNumber)
        : undefined,
      address: values.address || undefined,
      city: values.city || undefined,
      zip: values.zip || undefined,
      fax: values.fax || undefined,
      interpreterNeeded: values.interpreterNeeded || undefined,
      language: values.language || undefined,
      okToText: values.okToText || undefined,
      notes: values.notes || undefined,
      urgentReferral: values.urgentReferral || undefined,
      preferredLocations: values.preferredLocations || [],
      consultationType: values.consultationType || [],
      comanageYes: values.comanageYes || undefined,
      comanageNo: values.comanageNo || undefined,
      signUpNewsLetter: values.signUpNewsLetter || undefined,
    
      // Appointment Info
      appointmentInfo: {
        doctorSpecialty: values.doctorSpecialty || undefined,
        preferredLocations: values.preferredLocations || [],
        consultationType: values.consultationType?.[0] || undefined,
        urgentReferral: values.urgentReferral || undefined,
        additionalConditions: values.additionalConditions || undefined,
        chartNotesAttachments:
          values.chartNotesAttachments?.map(file => file.name) || [],
      },
    
      // Referral Info
      referralInfo: {
        referringClinicId: values.referringClinicId || undefined,
        referringProviderId: values.referringProviderId || undefined,
        referringEmail: values.referringEmail || undefined,
        referringPhone: values.referringPhone
          ? formatPhoneNumber(values.referringPhone)
          : undefined,
        referringFax: values.referringFax || undefined,
        referringAddress: values.referringAddress || undefined,
        referringCity: values.referringCity || undefined,
        referringStateZip: values.referringStateZip || undefined,
      },
    
      // Insurance Info
      insuranceInfo: {
        primaryInsuranceProviderId: values.primaryInsuranceProviderId || undefined,
        primaryInsuranceProviderName:
          values.primaryInsuranceProviderName || undefined,
        primaryInsuranceIdNumber: values.primaryInsuranceIdNumber || undefined,
        primaryInsuranceGroupNumber:
          values.primaryInsuranceGroupNumber || undefined,
        secondaryInsuranceProviderId:
          values.secondaryInsuranceProviderId || undefined,
        secondaryInsuranceProviderName:
          values.secondaryInsuranceProviderName || undefined,
        secondaryInsuranceIdNumber: values.secondaryInsuranceIdNumber || undefined,
        secondaryInsuranceGroupNumber:
          values.secondaryInsuranceGroupNumber || undefined,
      },
    
      // Surgeon Info
      surgeon: {
        id: values.surgeonId || undefined,
        clinicId: values.surgeonClinicId || undefined,
      },
    
      // Organization and Relationships
      organizationId: user.organizationId || undefined,
      clinics: Array.isArray(values.clinics)
        ? values.clinics.filter(Boolean)
        : [],
      providers: Array.isArray(values.providers)
        ? values.providers.filter(Boolean)
        : [],
    };
    

    if (patient) {
      updatePatient({
        onCompleted: () => {
          openSnackbar('Patient updated successfully', 'success');
        },
        onError: () => {
          openSnackbar(`Error updating patient ${updateError}`, 'error');
        },
        variables: { id: patient?.id, patientInput: patientData },
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
        
      });     console.log("PatientData:", patientData);

    }
  };

  const optom = optoms.find(optom => optom?.id === optomIdSelected);
  const surgeon = surgeons?.find(surgeon => surgeon?.id === surgeonIdSelected);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, values }) => (
        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
          {/* Reffering Provider Information       */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', m: 1 }}>
              Referring Provider Information
            </Typography>
          </Grid>

          <Grid item xs={6} alignContent={'center'} pr={2}>
            <Typography sx={{ mt: 1, mx: 1 }} variant="caption">
              Select an optometrist
            </Typography>
          </Grid>
          <Grid item xs={6} alignContent={'center'}>
            {!values.providers?.length && (
              <Typography sx={{ mt: 1, mx: 1 }} variant="caption">
                Select a provider first
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Field
              name="providers"
              initialValue={patient?.referringProviderId ?? ''}
              validate={required}>
              {({ input, meta }) => (
                <FormControl fullWidth error={meta.error && meta.touched}>
                  <InputLabel id="provider">Provider *</InputLabel>
                  <Select
                    id="providers"
                    label="Provider *"
                    name={input.name}
                    onChange={event => {
                      input.onChange(event);
                      setOptomIdSelected(event.target.value);
                    }}
                    value={optomIdSelected}
                    variant="outlined">
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
                    {meta.touched && meta.error
                      ? 'Provider is a required field'
                      : ''}
                  </FormHelperText>
                  {/* <FormHelperText>
                          <Link href="/providers/new">
                            Provider not found?
                            <AddProvider />
                          </Link>
                        </FormHelperText> */}
                </FormControl>
              )}
            </Field>
          </Grid>
          <Grid item xs={6}>
            <Field
              name="clinics"
              initialValue={optom?.clinics?.map(clinic => clinic?.id).join(',') ?? ''}
              validate={required}>
              {({ input, meta }) => (
                <FormControl fullWidth error={meta.error && meta.touched}>
                  <InputLabel id="clinics">Clinic *</InputLabel>
                  <Select
                    id="clinics"
                    disabled={values?.providers ? false : true}
                    label="Clinic *"
                    fullWidth
                    name={input.name}
                    onChange={input.onChange}
                    value={input.value}
                    variant="outlined"
                    type="text">
                    <MenuItem value={''}>Select a clinic</MenuItem>
                    {optom?.clinics?.map((clinic: Clinic) => {
                      {
                        console.log('Clinic ID', clinic?.id);
                      }
                      return (
                        <MenuItem key={clinic?.id} value={clinic?.id}>
                          {clinic?.name} - {clinic?.city}, {clinic?.state}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>
                    {meta.touched && meta.error
                      ? 'Clinic is a required field'
                      : ''}
                  </FormHelperText>
                  {/* <FormHelperText>
                          <Link href={'/clinics/new'}>
                            Clinic not found?
                            <AddClinic />
                          </Link>
                        </FormHelperText> */}
                </FormControl>
              )}
            </Field>
          </Grid>

          {/* Referrer Information */}
          <Grid className="flex gap-2" item xs={6}>
            <Field
              name="referringEmail"
              initialValue={String(
                patient?.referralInfo?.[0]?.referringEmail ?? '',
              )}
              validate={required}>
              {({ input, meta }) => (
                <TextField
                  label="Referrer Email *"
                  type="email"
                  fullWidth
                  error={meta.error && meta.touched}
                  helperText={
                    meta.touched && meta.error ? 'Email is required' : ''
                  }
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>

            <Field
              name="referringPhone"
              initialValue={String(
                patient?.referralInfo?.[0]?.referringPhone ?? '',
              )}
              validate={required}>
              {({ input, meta }) => (
                <TextField
                  label="Referrer Phone *"
                  fullWidth
                  error={meta.error && meta.touched}
                  helperText={
                    meta.touched && meta.error ? 'Phone number is required' : ''
                  }
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={6}>
            <Field
              name="referringFax"
              initialValue={patient?.referralInfo?.[0]?.referringFax ?? ''}>
              {({ input }) => (
                <TextField
                  label="Referrer Fax"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={6}>
            <Field
              name="referringStateZip"
              initialValue={
                patient?.referralInfo?.[0]?.referringStateZip ?? ''
              }>
              {({ input }) => (
                <TextField
                  label="Referrer ZIP Code"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          <Grid className="flex gap-2" item xs={6}>
            <Field
              name="referringAddress"
              initialValue={patient?.referralInfo?.[0]?.referringAddress ?? ''}>
              {({ input }) => (
                <TextField
                  label="Referrer Address"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>

            <Field
              name="referringCity"
              initialValue={patient?.referralInfo?.[0]?.referringCity ?? ''}>
              {({ input }) => (
                <TextField
                  label="Referrer City"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', m: 1 }}>
              Patient Information
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Field
              name="patientFirstName"
              initialValue={String(patient?.firstName ?? '')}
              validate={required}>
              {({ input, meta }) => (
                <TextField
                  error={meta.error && meta.touched}
                  label="First Name *"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={6}>
            <Field
              name="patientLastName"
              initialValue={String(patient?.lastName ?? '')}
              validate={required}>
              {({ input, meta }) => (
                <TextField
                  error={meta.error && meta.touched}
                  label="Last Name *"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          <Grid sx={{ display: 'flex', gap: 1 }} item xs={6}>
            <Field
              name="patientDOB"
              initialValue={patient?.dob ? String(patient.dob) : ''}
              validate={required}>
              {({ input, meta }) => (
                <TextField
                  error={meta.error && meta.touched}
                  helperText={
                    meta.error && meta.touched ? 'DofB is required' : ''
                  }
                  label="Date of Birth *"
                  type="date"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
            <Field
              name="email"
              initialValue={String(patient?.email ?? '')}
              validate={required}>
              {({ input, meta }) => (
                <TextField
                  error={meta.error && meta.touched}
                  helperText={
                    meta.error && meta.touched ? 'Email is required' : ''
                  }
                  label="Email *"
                  typeof="email"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={6}>
            <Field
              name="phoneNumber"
              initialValue={
                patient?.phoneNumber ? String(patient.phoneNumber) : ''
              }
              validate={required}>
              {({ input, meta }) => (
                <TextField
                  error={meta.error && meta.touched}
                  helperText={
                    meta.error && meta.touched ? 'Phone Number is required' : ''
                  }
                  label="Phone Number *"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={12}>
            <Field
              name="address"
              initialValue={patient?.address ? String(patient.address) : ''}
              validate={required}>
              {({ input }) => (
                <TextField
                  label="Address *"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={6}>
            <Field
              name="gender"
              initialValue={patient?.gender ? String(patient.gender) : ''}
              validate={required}>
              {({ input, meta }) => (
                <FormControl fullWidth error={meta.error && meta.touched}>
                  <InputLabel id="gender">Gender *</InputLabel>
                  <Select
                    id="gender"
                    label="Gender *"
                    {...input}
                    variant="outlined">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  <FormHelperText>
                    {meta.error && meta.touched ? 'Please Insert Gender' : ''}
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          </Grid>

          <Grid className="flex gap-2 " item xs={6}>
            <Field name="city" initialValue={patient?.city ?? ''}>
              {({ input }) => (
                <TextField
                  label="City *"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>

            <Field name="zip" initialValue={patient?.zip ?? ''}>
              {({ input }) => (
                <TextField
                  label="Zip "
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          {/* <Grid item xs={12} md={6}>
          </Grid> */}

          {/* Language Field */}
          {/* Language Field */}
          <Grid className="flex gap-12" item xs={12}>
            {/* Interpreter Needed - Radio Buttons - interpreterNeeded */}
            <Field
              name="interpreterNeeded"
              initialValue={patient?.interpreterNeeded ?? false}>
              {({ input }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Interpreter Needed?</FormLabel>
                  <RadioGroup
                    {...input}
                    row
                    value={input.value === true ? 'true' : 'false'}
                    onChange={e => input.onChange(e.target.value === 'true')}>
                    <FormControlLabel
                      value="true"
                      control={<Radio color="primary" />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio color="primary" />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            </Field>

            <Grid item xs={6}>
              <Field
                name="language"
                initialValue={String(patient?.language ?? '')}
                validate={required}>
                {({ input }) => (
                  <TextField
                    label="Language *"
                    fullWidth
                    {...input}
                    variant="outlined"
                  />
                )}
              </Field>
            </Grid>

            {/* Ok to Text - Radio Buttons */}
            <Field name="okToText" initialValue={patient?.okToText ?? false}>
              {({ input }) => (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Ok to Text?</FormLabel>
                  <RadioGroup
                    {...input}
                    row
                    value={input.value === true ? 'true' : 'false'}
                    onChange={e => input.onChange(e.target.value === 'true')}>
                    <FormControlLabel
                      value="true"
                      control={<Radio color="primary" />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio color="primary" />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            </Field>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', m: 1, marginTop: '4px' }}>
              Insurance Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: 'px' }}>
              If the patient has HMO insurance, we will require an
              authorization/referral from their PCP before they can be seen.
              Please send a copy of the patient’s insurance cards and last
              appointment notes.
            </Typography>
          </Grid>

          {/* Insurance Provider Field */}
          {/* Primary Insurance Fields */}
          <Grid item xs={12}>
            <Typography className="mt-4" variant="subtitle1">
              Primary Insurance Provider
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="primaryInsuranceProvider"
              validate={required}
              initialValue={
                (patient?.insuranceInfo?.[0]
                  ?.primaryInsuranceProviderId as string) ?? ''
              }>
              {({ input }) => (
                <TextField
                  label="Primary Insurance Provider *"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="primaryInsuranceIdNumber"
              validate={required}
              initialValue={
                patient?.insuranceInfo?.[0]?.primaryInsuranceIdNumber
                  ? String(patient.insuranceInfo[0].primaryInsuranceIdNumber)
                  : ''
              }>
              {({ input }) => (
                <TextField
                  label="Insurance ID Number *"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="primaryInsuranceGroupNumber"
              validate={required}
              initialValue={String(
                patient?.insuranceInfo?.[0]?.primaryInsuranceGroupNumber ?? '',
              )}>
              {({ input }) => (
                <TextField
                  label="Insurance Group Number *"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          {/* Secondary Insurance Fields */}
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Secondary Insurance Provider
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="secondaryInsuranceProviderId"
              initialValue={
                patient?.insuranceInfo?.[0]?.secondaryInsuranceProviderId ?? ''
              }>
              {({ input }) => (
                <TextField
                  label="Secondary Insurance Provider"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="secondaryInsuranceIdNumber"
              initialValue={
                patient?.insuranceInfo?.[0]?.secondaryInsuranceIdNumber ?? ''
              }>
              {({ input }) => (
                <TextField
                  label="Insurance ID Number"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="secondaryInsuranceGroupNumber"
              initialValue={
                patient?.insuranceInfo?.[0]?.secondaryInsuranceGroupNumber ?? ''
              }>
              {({ input }) => (
                <TextField
                  label="Insurance Group Number"
                  fullWidth
                  {...input}
                  variant="outlined"
                />
              )}
            </Field>
          </Grid>

          {/* Informational Section */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="#4BA7C1"
              style={{ marginTop: '16px' }}>
              Due to certain limitations within our Ambulatory Surgery Centers,
              and in an attempt to provide the best possible care to your
              surgical patients, some procedures offered by our providers must
              be performed at an outside facility. To maintain best practice
              standards for our patients, an outside facility is best suited for
              the following: Children under the age of 18, patients that need
              overnight care, those in need of a Hoyer lift, special lift
              devices, and extra support when transferring, surgeries done under
              general anesthesia, procedures that are combined with a Retina
              physician, and patients with a BMI over 50.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', marginTop: 3 }}>
              Preferred Clinic Location
            </Typography>
          </Grid>

          {/* <Grid item xs={6}>
            <FormControl component="fieldset" fullWidth>
              <Field name="preferredClinic" validate={required}>
                {({ input }) => {
                  // Deduplicate clinics based on unique identifier (e.g., `id`)
                  const uniqueClinics = Array.from(
                    new Map(
                      optoms
                        ?.flatMap(optom => optom.clinics)
                        ?.map(clinic => [clinic.id, clinic]),
                    ).values(),
                  );

                  return (
                    <Select
                      label="Preferred Clinic Location *"
                      fullWidth
                      {...input}
                      variant="outlined"
                      value={input.value || ''} // Ensure controlled input behavior
                    >
                      <MenuItem value="" disabled>
                        Select a location
                      </MenuItem>
                      {uniqueClinics.map(clinic => (
                        <MenuItem
                          key={clinic.id}
                          value={`${clinic.city}, ${clinic.state}`}>
                          {clinic.name} - {clinic.city}, {clinic.state}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
              </Field>
            </FormControl>
          </Grid> */}

          {/* <Grid container spacing={2}> */}
          {/* Doctor/Specialty Selection */}
          <Grid item xs={6}>
            <Typography variant="subtitle1">Doctor/Specialty</Typography>
            <Field name="provider" validate={required}>
              {({ input }) => {
                // Ensure unique providers based on ID
                const uniqueProviders = Array.from(
                  new Map(
                    new Set(optoms?.map(optom => [optom.id, optom])), // Map by unique optom ID
                  ).values(),
                );

                return (
                  <TextField
                    select
                    label="Select a provider *"
                    fullWidth
                    variant="outlined"
                    {...input}
                    onBlur={input.onBlur} // Ensure blur handling
                    value={input.value || ''} // Default to empty string for no selection
                  >
                    <MenuItem value="">None selected</MenuItem>
                    {uniqueProviders.map(optom => (
                      <MenuItem key={optom.id} value={optom.id}>
                        {optom.firstName} {optom.lastName} -{' '}
                        {optom.specialties.join(', ')}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }}
            </Field>
          </Grid>

          {/* Preferred Locations */}

          <Grid item xs={6}>
            <Typography variant="subtitle1">
              Select the patient's preferred location(s) *
            </Typography>
            <Field
              name="preferredLocations"
              initialValue={patient?.preferredLocations?.join(', ') ?? ''}
              validate={required}>
              {({ input }) => {
                // Ensure unique cities
                const uniqueCities = Array.from(
                  new Set(
                    optoms
                      ?.flatMap(optom => optom.clinics)
                      ?.map(clinic => clinic.city),
                  ),
                );

                return (
                  <FormControl fullWidth>
                    <InputLabel id="preferredLocations">
                      Preferred Locations *
                    </InputLabel>
                    <Select
                      labelId="preferredLocations"
                      multiple
                      {...input}
                      value={Array.isArray(input.value) ? input.value : []}
                      onChange={event => {
                        const value = event.target.value;
                        input.onChange(value);
                      }}
                      onClose={() => input.onBlur()} // Ensure blur event is triggered
                      variant="outlined">
                      {uniqueCities.map(city => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }}
            </Field>
          </Grid>

          {/* <LocationDropdowns /> */}
          {/* Consultation Types */}
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              What type of consultation is needed? *
            </Typography>
            <Field
              name="consultationType"
              initialValue={
                Array.isArray(patient?.consultationType)
                  ? patient?.consultationType.join(', ')
                  : (patient?.consultationType ?? '')
              }
              validate={required}>
              {({ input }) => (
                <FormGroup>
                  {[
                    'Cataract Evaluation',
                    'Cornea Consult',
                    'Dry Eye Eval',
                    'LASIK',
                    'General',
                    'Glaucoma Consult',
                    'Refractive',
                    'Retina Consult',
                    'Yag Eval',
                  ].map(type => (
                    <FormControlLabel
                      key={type}
                      control={
                        <Checkbox
                          checked={input.value.includes(type)}
                          onChange={e => {
                            const newValue = e.target.checked
                              ? [...input.value, type]
                              : Array.isArray(input.value)
                                ? input.value.filter(val => val !== type)
                                : [];
                            input.onChange(newValue);
                          }}
                        />
                      }
                      label={type}
                    />
                  ))}
                  {/* "Other" Option */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={input.value.includes('Other')}
                        onChange={e => {
                          const newValue = e.target.checked
                            ? [...input.value, 'Other']
                            : Array.isArray(input.value)
                              ? input.value.filter(val => val !== 'Other')
                              : [];
                          input.onChange(newValue);
                        }}
                      />
                    }
                    label="Other"
                  />
                  <TextField
                    label="Specify Other"
                    fullWidth
                    variant="outlined"
                    disabled={!input.value.includes('Other')}
                  />
                </FormGroup>
              )}
            </Field>
          </Grid>

          {/* Urgent Referral */}
          <Grid item xs={12}>
            <Field
              name="urgentReferral"
              type="checkbox"
              initialValue={patient?.urgentReferral ?? false}>
              {({ input }) => (
                <FormControlLabel
                  control={<Checkbox {...input} />}
                  label={
                    <Typography variant="body1">
                      <strong>URGENT referral</strong> (ex: pain, severe
                      redness, flashes of light/new floaters, etc.)
                    </Typography>
                  }
                />
              )}
            </Field>
          </Grid>

          {/* Notes Section */}
          <Grid item xs={12}>
            <Field name="notes" initialValue={patient?.notes ?? ''}>
              {({ input }) => (
                <TextField
                  label="Additional conditions to be evaluated or notes to the scheduling team"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  {...input}
                />
              )}
            </Field>
          </Grid>

          {/* File Upload */}
          {/* <Grid item xs={12}>
            <Typography variant="subtitle1">
              Please attach most recent chart note(s) & describe the conditions
              to be evaluated and list all patient allergies{' '}
            </Typography>
            <Field name="attachedFiles">
              {({ input }) => (
                <>
                  <input
                    type="file"
                    multiple
                    onChange={e => input.onChange(e.target.files)}
                  />

                  <Typography variant="caption">
                    Uploaded Files:{' '}
                    {Array.from(input.value || [])
                      .map((file: unknown) => (file as File).name)
                      .join(', ')}
                  </Typography>
                </>
              )}
            </Field>
          </Grid> */}

          {/* </Grid> */}

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1 }}>
              Co-management Preferences
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Following our evaluation, we will communicate any findings and/or
              treatment recommendations. If surgery is necessary please indicate
              below if you'd like to co-manage. Regardless, all patients will be
              sent back to the referring provider to resume general eye care as
              appropriate.
            </Typography>
          </Grid>

            <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
              Co-management Preferences
              </FormLabel>
              <FormGroup>
              <Field name="comanageYes" type="checkbox" initialValue={patient?.comanageYes ?? false}>
                {({ input }) => (
                <FormControlLabel
                  control={<Checkbox {...input} />}
                  label="Yes - I'd like to co-manage the patient’s post-op care"
                />
                )}
              </Field>
              <Field name="comanageNo" type="checkbox" initialValue={patient?.comanageNo ?? false}>
                {({ input }) => (
                <FormControlLabel
                  control={<Checkbox {...input} />}
                  label="No - I’d prefer Snyder Eye Institute to assume the patient’s post-op care"
                />
                )}
              </Field>
              </FormGroup>
            </FormControl>
            </Grid>

          <Grid item xs={12}>
            <Field
              name="signUpNewsLetter"
              type="checkbox"
              initialValue={patient?.signUpNewsLetter ?? false}>
              {({ input }) => (
                <FormControlLabel
                  control={<Checkbox {...input} />}
                  label="Click here to sign up for our monthly referral newsletter!"
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={12}>
            <Field
              name="generalNotes"
              initialValue={patient?.generalNotes ?? ''}>
              {({ input }) => (
                <TextField
                  label="Additional Notes"
                  fullWidth
                  {...input}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              )}
            </Field>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={submitting}>
              {submitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Submit'
              )}
            </Button>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default ReferralForm; // add this line to the end of the file
