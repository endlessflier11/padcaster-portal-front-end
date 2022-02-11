/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Wrapper from '../../../../components/wrapper/Wrapper';
import { AppContext } from '../../../../contexts/AppContext';
import { TutorialsContext } from '../../../../contexts/TutorialsContext';
import { CircularProgress } from '@mui/material';
import ArticleEditor from '../../../../components/tutorials/article/ArticleEditor';

export const ArticleEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { showSnack } = useContext(AppContext);
  const { articles, loadArticle, loadingArticles } = useContext(TutorialsContext);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const article = useMemo(() => articles.entities[id], [articles, id]);

  useEffect(() => {
    if (article || !id || loading || loadingArticles) {
      return;
    }
    if (loaded) {
      showSnack({ message: `Article ${id} not found, it may have been moved or deleted.`, status: 'warning' });
      router.push('/tutorials');
      return;
    }
    setLoading(true);
    loadArticle(id)
      .then(res => console.log({ res }))
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      });
  }, [id, article, loaded, loadingArticles, loading]);

  return (
    <Wrapper>
      {!article && loading ? <CircularProgress/> : null}
      {article && !loading ?
        <ArticleEditor
          handleCancel={() => router.push(`/tutorials/${article.id}`)}
          article={article}
        />
      : null}
    </Wrapper>
  )
}

export default ArticleEditPage;
