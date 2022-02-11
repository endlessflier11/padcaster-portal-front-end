import React, { useContext, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import styles from './TutorialSubcategory.module.scss';
import ArticlePreview from '../article/ArticlePreview';
import EditSubcategoryModal from '../edit-subcategory-modal/EditSubcategoryModal';
import { UserContext } from '../../../contexts/UserContext';
import { TutorialsContext } from '../../../contexts/TutorialsContext';
import { useRouter } from 'next/router';

export default function TutorialSubcategory({ subcategory }) {
  const [editing, setEditing] = useState(false);
  const { user } = useContext(UserContext);
  const { articles } = useContext(TutorialsContext);
  const router = useRouter();

  const articlesList = useMemo(() =>
    (articles.subcategories[subcategory.id] || []).map(id => articles.entities[id])
  , [subcategory, articles]);

  return (
    <div className={`${styles.container} ${styles.mediumWidth}`}>
      <div className={styles.subcategory}>
        <h1 className={styles.title}>
          {subcategory.title}

          {user.isAdmin ?
            <div className={styles.adminMenu}>
              <Button
                // TODO: Add edit icon
                // startIcon={() => <EditIcon />}
                onClick={() => setEditing(true)}
              >
                Edit Subcategory
              </Button>

              <Button
                // TODO: Add plus icon
                // startIcon={() => <PlusIcon />}
                onClick={() => {
                  router.push(`/tutorials/new?subcategory=${subcategory.id}`);
                }}
              >
                Add Article
              </Button>
            </div>
          : null}
        </h1>

        {articlesList.map((article, key) =>
          <div
            className={`${styles.preview} ${styles.fullWidth}`}
              key={key}
          >
            <ArticlePreview
              article={article}
            />
          </div>
        )}

        {articlesList.length === 0 ?
          <h3>No articles found.</h3>
        : null}
      </div>

      <EditSubcategoryModal
        subcategory={subcategory}
        open={editing}
        handleClose={() => setEditing(false)}
      />
    </div>
  );
}
