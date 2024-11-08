import { ReactElement } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarProps {
  duration?: number;
  handleClose: () => void;
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CustomSnackbar = ({
  duration = 4000,
  handleClose,
  open,
  message,
  severity,
}: SnackbarProps): ReactElement => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <div>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
};

export default CustomSnackbar;
