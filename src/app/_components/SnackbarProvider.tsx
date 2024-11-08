import { ReactElement, createContext, useContext, useState } from 'react';
import CustomSnackbar from './CustomSnackbar';

interface SnackbarContextProps {
  openSnackbar: (
    message: string,
    severity?: 'error' | 'warning' | 'info' | 'success',
  ) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextProps>({
  openSnackbar: () => {},
  closeSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('info');

  const openSnackbar = (
    message: string,
    severity: 'error' | 'warning' | 'info' | 'success' = 'info',
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <CustomSnackbar
        open={open}
        message={message}
        severity={severity}
        handleClose={closeSnackbar}
      />
    </SnackbarContext.Provider>
  );
};
