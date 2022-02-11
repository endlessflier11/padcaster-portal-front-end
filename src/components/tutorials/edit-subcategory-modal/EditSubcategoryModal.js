import { FormControl, TextField } from '@mui/material';
import React, { useContext, useState, useMemo } from 'react';
import { TutorialsContext } from '../../../contexts/TutorialsContext';
import { toSlug } from '../../../utils/string';
import Modal from '../../modal/Modal';
import styles from './EditSubcategoryModal.module.scss';

export default function EditSubcategoryModal({ subcategory, open, handleClose }) {
  const { updateSubcategory, updatingSubcategory } = useContext(TutorialsContext);
  const [form, setForm] = useState(subcategory);

  const disabled = useMemo(() =>
    !form || !form.title || form.title === subcategory.title
  , [form, subcategory]);

  const handleSave = async () => {
    try {
      await updateSubcategory(form)
      handleClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal
      title="Edit Subategory"
      open={open}
      handleClose={handleClose}
      primaryFooterAction={{
        content: 'Update',
        onAction: handleSave,
        disabled: disabled,
        loading: updatingSubcategory
      }}
    >
      <FormControl
        fullWidth
        className={styles.categoryInput}
      >
        <TextField
          value={form.title}
          onChange={(e) => {
            setForm({
              ...form,
              title: e.target.value,
              slug: toSlug(e.target.value)
            })
          }}
        />
      </FormControl>
    </Modal>
  )
}
