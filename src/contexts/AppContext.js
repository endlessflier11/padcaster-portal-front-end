import { createContext, useCallback, useEffect, useState } from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import ViewType from '../types/ViewType';
import { Router } from 'next/router';
import ConfirmationModal from '../components/confirmation-modal/ConfirmationModal';

export const AppContext = createContext();

const AppProvider = ({ children, navigating }) => {
  const [viewType, setViewType] = useState(ViewType.HOME);
  const [navOpen, setNavOpen] = useState(false);
  const [snack, setSnack] = useState(null);
  const [confirmation, setConfirmation] = useState();

  const showSnack = useCallback(({ message, status, title }) =>
    setSnack({ message, status: status || 'info', title })
  , [setSnack]);

  const closeSnack = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false);
  }, [setSnack]);

  useEffect(() => {
    if (navigating && navOpen) {
      setTimeout(() => {
        setNavOpen(false);
      }, 333);
    }
  }, [navigating, navOpen]);

  return (
    <AppContext.Provider value={{
      navOpen, setNavOpen,
      viewType, setViewType,
      snack, closeSnack, showSnack,
      setConfirmation,
    }}>
      {children}

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!snack}
        autoHideDuration={5000}
        onClose={closeSnack}
        message={snack?.message}
      >
        <Alert severity={snack?.status} onClose={closeSnack}>
          {snack?.title ?
            <AlertTitle>{snack?.title}</AlertTitle>
          : null}
          {snack?.message}
        </Alert>
      </Snackbar>

      <ConfirmationModal
        open={!!confirmation}
        confirmation={confirmation}
        handleClose={() => setConfirmation(null)}
      />
    </AppContext.Provider>
  );
}

export default AppProvider;
