import { useContext, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Button, TextField } from '@mui/material';
import { SearchContext } from '../../contexts/SearchContext';
import { TutorialsContext } from '../../contexts/TutorialsContext';
import { UserContext } from '../../contexts/UserContext';
import Modal from '../modal/Modal';
import EditCategoriesModal from './edit-categories-modal/EditCategoriesModal';
import styles from './TutorialsNav.module.scss';

const TutorialsNav = () => {
  const linkContainerRef = useRef(null);
  const {
    categoryId, setCategoryId,
    categories,
    setSubcategoryId
  } = useContext(TutorialsContext);

  const { user } = useContext(UserContext);
  const { query, setQuery } = useContext(SearchContext);
  const [editingCategories, setEditingCategories] = useState(false);

  const allCategories = useMemo(() =>
    categories.all.sort((a, b) => a < b ? -1 : 1).map(id => categories.entities[id])
  , [categories]);

  const handleSelectCategory = (e, id) => {
    if (query) {
      setQuery('');
    }
    setSubcategoryId(null);
    setCategoryId(+id);
    if (linkContainerRef) {
      const scrollLeft = e.target.offsetLeft - (e.target.scrollWidth / 2)
      linkContainerRef.current.scrollLeft = scrollLeft;
    }
  }

  return (
    <div>
      <div
        ref={linkContainerRef}
        className={`${styles.linkContainer} ${user.isAdmin ? styles.editable : ''}`}
      >
        {allCategories.map(({ id, title }) => {
          return (
            <Link href={`/tutorials`} key={id}>
              <a
                className={styles.link}
                onClick={(event) => handleSelectCategory(event, id)}
              >
                <h2
                  id={id}
                  className={id === categoryId ? styles.active : styles.inactive}
                >
                  {title}
                <div className={id === categoryId ? styles.lineActive : styles.lineInactive} />
                </h2>
              </a>
            </Link>
          );
        })}
      </div>
      {user.isAdmin ?
        <div className={styles.adminMenu}>
          <Button
            // TODO: Add edit icon
            // startIcon={() => <EditIcon />}
            className={styles.editButton}
            onClick={() => setEditingCategories(true)}
          >
            EDIT MENU CATEGORIES
          </Button>
        </div>
      : null}

      <EditCategoriesModal
        open={editingCategories}
        handleClose={() => setEditingCategories(false)}
      />
    </div>
  );
}

export default TutorialsNav;

