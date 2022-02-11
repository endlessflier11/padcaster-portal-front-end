import { useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import styles from './Article.module.scss'
import { Button } from '@mui/material';
import { UserContext } from '../../../contexts/UserContext';

const Article = ({ article }) => {
  const { user } = useContext(UserContext)
  const router = useRouter();

  const htmlContent = useMemo(() => parse(article.contents), [article.contents]);

  // TODO: Add date once returned from API
  // const date = useMemo(() => {
  //   const split = article.date.split('-');
  //   const d = new Date(split[0], split[1] - 1, split[2]);
  //   return d.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  // }, [article.date]);

  return (
    <div className={styles.container}>
      <h2 className={styles.subcategory}>{article.subcategory?.title}</h2>
      <h1>
        {article.title}

        {user.isAdmin ?
          <Button
            // TODO: Add edit icon
            // startIcon={() => <EditIcon />}
            component={Button}
            className={styles.editButton}
            onClick={() => router.push(`/tutorials/${article.id}/edit`)}
          >
            Edit Article
          </Button>
        : null}
      </h1>
      {/* <h3 className={styles.date}>{date}</h3> */}

      <div className={styles.contents}>
        {htmlContent}
      </div>
    </div>
  );
}

export default Article;

