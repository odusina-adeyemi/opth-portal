'use client';
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  MenuItem,
  Select,
} from '@mui/material';
import { Field } from 'react-final-form';

const STATES_API = 'https://api.zippopotam.us/us'; // Base API for ZIP and City lookup

const LocationDropdowns = () => {
  const [states, setStates] = useState([]); // Holds the list of states
  const [cities, setCities] = useState([]); // Holds the cities and ZIPs for selected state
  const [selectedState, setSelectedState] = useState(''); // User's selected state
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState(null);

  // Hardcoded list of states (for demo purposes)
  // Full list of US states
  const STATE_LIST = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];

  // Simulate fetching states
  useEffect(() => {
    try {
      setStates(STATE_LIST); // Normally you'd fetch this from an API
    } catch (err) {
      setError('Failed to load states');
    } finally {
      setLoadingStates(false);
    }
  }, []);

  // Fetch cities and ZIPs based on selected state
  const fetchCities = async stateAbbr => {
    setLoadingCities(true);
    setError(null);

    try {
      const response = await fetch(`${STATES_API}/${stateAbbr.toLowerCase()}`); // Fetch based on state
      if (!response.ok) throw new Error('Failed to fetch cities and ZIPs');

      const data = await response.json();
      const places = data.places.map(place => ({
        city: place['place name'],
        zip: place['post code'],
      }));

      setCities(places);
    } catch (err) {
      setError('Could not load cities for the selected state.');
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

  return (
    <Grid container spacing={2}>
      {/* State Dropdown */}
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1">Select a State</Typography>
        {loadingStates ? (
          <CircularProgress size={24} />
        ) : (
          <Select
            fullWidth
            value={selectedState}
            onChange={e => {
              setSelectedState(e.target.value);
              fetchCities(e.target.value); // Fetch cities for selected state
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select State
            </MenuItem>
            {states.map(state => (
              <MenuItem key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </Grid>

      {/* City/ZIP Checkboxes */}
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1">Select City/ZIP</Typography>
        {loadingCities ? (
          <CircularProgress size={24} />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Field name="preferredCities">
            {({ input }) => (
              <FormGroup>
                {cities.map((place, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={input.value.includes(
                          `${place.city} (${place.zip})`,
                        )}
                        onChange={e => {
                          const newValue = e.target.checked
                            ? [...input.value, `${place.city} (${place.zip})`]
                            : input.value.filter(
                                val => val !== `${place.city} (${place.zip})`,
                              );
                          input.onChange(newValue);
                        }}
                      />
                    }
                    label={`${place.city} (${place.zip})`}
                  />
                ))}
              </FormGroup>
            )}
          </Field>
        )}
      </Grid>
    </Grid>
  );
};

export default LocationDropdowns;
