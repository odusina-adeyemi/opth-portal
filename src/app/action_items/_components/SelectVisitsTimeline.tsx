'use client';
import React, { useState } from 'react';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_CLINIC_REFERRER_STATUS_TIMELINE } from '../../api/graphql/mutations/clinicMutations';
import { VISIT_TIMELINE_OPTIONS } from '../../../constants/enums';
import {
  Clinic,
  ReferringProviderStatusType,
} from '../../../constants/types/types';

type SelectVisitsTimelineProps = {
  provider?: boolean;
  status: ReferringProviderStatusType;
  userClinics: Clinic[];
};

const SelectVisitsTimeline = ({
  provider,
  status,
  userClinics,
}: SelectVisitsTimelineProps) => {
  const [visitTimeline, setVisitTimeline] = useState<string>('' as string);
  const [
    updateClinicReferrerStatusTimeline,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_CLINIC_REFERRER_STATUS_TIMELINE);

  // ACTION_ITEMS Fetch the currently selected timeline options for each status option?
  // onChange instantly saves?
  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value as string;
    setVisitTimeline(selectedValue);
    // save to db
    if (provider) {
      // "provider" indicates saving the surgeon visit timeline

      // clinics have a property called "referrerStatusTimeline" that is an array
      // of objects that contain all of the statuses and their visit timelines
      // pass 'status' and 'selectedValue' to the mutation
      const clinicIds = userClinics.map(clinic => clinic.id);

      updateClinicReferrerStatusTimeline({
        variables: {
          ids: clinicIds, // get these from user obj
          referrerStatus: status,
          timeline: selectedValue,
        },
      });

      // find which role the user is and assign the action_item accordingly?
      // creating action items and assigning them??
      // Todo app?? but for action items
    }
  };

  return (
    <Box display={'flex'}>
      <Select
        onChange={event => handleSelectChange(event)}
        value={visitTimeline}
      >
        {VISIT_TIMELINE_OPTIONS.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <Typography pl={1}>(in months)</Typography>
    </Box>
  );
};

export default SelectVisitsTimeline;
