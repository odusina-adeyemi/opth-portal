import React, { ReactElement } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

interface CustomDialogContentProps {
  affirmativeButtonLabel?: string;
  affirmativeOnClick?: () => void;
  content?: ReactElement | string;
  negativeButtonLabel?: string;
  negativeOnClick?: () => void;
  title: string;
}

const CustomDialogContent = ({
  affirmativeButtonLabel,
  affirmativeOnClick,
  content,
  negativeButtonLabel,
  negativeOnClick,
  title,
}: CustomDialogContentProps): ReactElement => {
  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {affirmativeButtonLabel && (
          <Button
            onClick={affirmativeOnClick}
            variant="contained"
            color="primary">
            {affirmativeButtonLabel}
          </Button>
        )}
        {negativeButtonLabel && (
          <Button
            onClick={negativeOnClick}
            variant="contained"
            color="secondary">
            {negativeButtonLabel}
          </Button>
        )}
      </DialogActions>
    </>
  );
};

export default CustomDialogContent;
