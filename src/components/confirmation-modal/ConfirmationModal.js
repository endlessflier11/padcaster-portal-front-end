import React from 'react';
import Modal from '../modal/Modal';

export default function ConfirmationModal({ confirmation, open, handleClose, children }) {
  const title = confirmation?.title || 'Confirm';
  const message = confirmation?.message || 'Are you sure?';

  return (
    <Modal
      title={title}
      open={open}
      handleClose={handleClose}
      secondaryFooterAction={{
        content: 'Cancel',
        onAction: () => {
          confirmation?.onCancel();
          handleClose();
        }
      }}
      primaryFooterAction={{
        content: 'Confirm',
        onAction: async () => {
          confirmation?.onConfirm();
          handleClose();
        }
      }}
    >
      {message}
    </Modal>
  );
}
