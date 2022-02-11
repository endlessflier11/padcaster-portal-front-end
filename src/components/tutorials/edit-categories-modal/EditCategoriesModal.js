import { FormControl, TextField } from '@mui/material';
import React, { useContext, useEffect, useState, useMemo } from 'react';
import { TutorialsContext } from '../../../contexts/TutorialsContext';
import { toSlug } from '../../../utils/string';
import Modal from '../../modal/Modal';
import styles from './EditCategoriesModal.module.scss';

export default function EditCategoriesModal({ open, handleClose }) {
  const { categories, updateCategories, updatingCategories } = useContext(TutorialsContext);
  const [form, setForm] = useState(null);

  const allCategories = useMemo(() =>
    categories.all.map(id => categories.entities[id])
  , [categories]);

  useEffect(() => {
    if (allCategories && (!form || form.length === 0)) {
      setForm(allCategories);
    }
  }, [allCategories, form]);

  const disabled = useMemo(() => {
    if (form) {
      const empty = form.filter(c => c.title.trim() === '').length > 0;
      const duplicate = form.filter(c => form.filter(c2 => c2.title.trim() === c.title.trim()).length > 1).length > 0;
      const unchanged = form.filter(c => allCategories.filter(c2 => c2.title.trim() === c.title.trim()).length === 0).length === 0;
      return unchanged || empty || duplicate;
    }
    return true;
  }, [form, allCategories]);

  return (
    <Modal
      title="Edit Menu Categories"
      open={open}
      handleClose={handleClose}
      primaryFooterAction={{
        content: 'Update',
        onAction: async () => {
          await updateCategories(form);
          handleClose();
        },
        disabled: disabled,
        loading: updatingCategories
      }}
    >
      {form && form.map(({ id, title }) =>
        <FormControl
          key={id}
          fullWidth
          className={styles.categoryInput}
        >
          <TextField
            value={title}
            onChange={(e) => {
              setForm(form.map(category => {
                if (category.id === id) {
                  return {
                    ...category,
                    title: e.target.value,
                    slug: toSlug(e.target.value)
                  };
                } else {
                  return category
                }
              }))
            }}
          />
        </FormControl>
      )}
    </Modal>
  )
}
