'use client';
import { useState } from 'react';
import { Box, Button, ButtonGroup, CircularProgress } from '@mui/material';
import { ButtonName } from './DetailPanelContent';
import {
  pageTitleHeaderBackgroundColor,
  topBarBackgroundColor,
} from '../../../lib/css/utils';

interface ButtonGroupPatientDataType {
  changeTableData: (name: ButtonName) => void;
  disabled: boolean; // if in edit mode then disable the buttons
  patientContactLoading: boolean;
  patientPreOpLoading: boolean;
  patientPostOpLoading: boolean;
}

const ButtonGroupPatientData = ({
  changeTableData,
  disabled,
  patientContactLoading,
  patientPreOpLoading,
  patientPostOpLoading,
}: ButtonGroupPatientDataType) => {
  const [buttonSelected, setButtonSelected] = useState<ButtonName>();
  const handleDataButtonClick = async (event: any) => {
    const name = event.target.name;
    changeTableData(name);
    setButtonSelected(name);
  };

  return (
    <Box mx={2}>
      <ButtonGroup disabled={disabled} variant="outlined">
        <Button
          endIcon={
            patientContactLoading && (
              <CircularProgress size={10} sx={{ color: 'white' }} />
            )
          }
          onClick={handleDataButtonClick}
          name="contact"
          size="small"
          sx={{
            backgroundColor:
              buttonSelected === 'contact'
                ? pageTitleHeaderBackgroundColor
                : 'white',
            color:
              buttonSelected === 'contact'
                ? 'white'
                : pageTitleHeaderBackgroundColor,
            fontSize: '10px',
            width: 100,
            '&:hover': {
              backgroundColor: topBarBackgroundColor,
              color: 'white',
            },
          }}
          variant={buttonSelected === 'contact' ? 'contained' : 'outlined'}>
          Contact
        </Button>
        <Button
          endIcon={
            patientPreOpLoading && (
              <CircularProgress size={10} sx={{ color: 'white' }} />
            )
          }
          onClick={handleDataButtonClick}
          name="preop"
          size="small"
          sx={{
            backgroundColor:
              buttonSelected === 'preop'
                ? pageTitleHeaderBackgroundColor
                : 'white',
            color:
              buttonSelected === 'preop'
                ? 'white'
                : pageTitleHeaderBackgroundColor,
            fontSize: '10px',
            width: 100,
            '&:hover': {
              backgroundColor: topBarBackgroundColor,
              color: 'white',
            },
          }}
          variant={buttonSelected === 'preop' ? 'contained' : 'outlined'}>
          Pre-op
        </Button>
        <Button
          endIcon={
            patientPostOpLoading && (
              <CircularProgress size={10} sx={{ color: 'white' }} />
            )
          }
          onClick={handleDataButtonClick}
          name="postop"
          size="small"
          sx={{
            backgroundColor:
              buttonSelected === 'postop'
                ? pageTitleHeaderBackgroundColor
                : 'white',
            color:
              buttonSelected === 'postop'
                ? 'white'
                : pageTitleHeaderBackgroundColor,
            fontSize: '10px',
            width: 100,
            '&:hover': {
              backgroundColor: topBarBackgroundColor,
              color: 'white',
            },
          }}
          variant={buttonSelected === 'postop' ? 'contained' : 'outlined'}>
          Post-op
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ButtonGroupPatientData;
