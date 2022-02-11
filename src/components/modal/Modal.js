import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Paper } from '@mui/material';
import styles from './Modal.module.scss';
import { LoadingButton } from '@mui/lab';

export default function Modal({
  open,
  title,
  children,
  handleClose,
  primaryFooterAction,
  secondaryFooterAction = { content: 'Close', onAction: handleClose },
}) {
  const closeAction = secondaryFooterAction || handleClose ? { content: 'Close', onAction: handleClose } : null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={styles.modal}
    >
      <DialogTitle className={styles.modalHeader}>
        {title}
      </DialogTitle>

      <DialogContent className={styles.modalContent}>
        {children}

        <div className={styles.modalFooterActions}>
          {closeAction ?
            <Button
              className={styles.modalAction}
              onClick={closeAction.onAction}
              color="secondary"
              variant="outlined"
              disabled={closeAction.disabled}
            >
              {closeAction.content}
            </Button>
          : null}

          {primaryFooterAction ?
            <LoadingButton
              className={styles.modalAction}
              onClick={primaryFooterAction.onAction}
              color="primary"
              variant="contained"
              loading={primaryFooterAction.loading}
              disabled={primaryFooterAction.disabled}
            >
              {primaryFooterAction.content}
            </LoadingButton>
          : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
