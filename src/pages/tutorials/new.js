/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Wrapper from '../../components/wrapper/Wrapper';
import { TutorialsContext } from '../../contexts/TutorialsContext';
import ArticleEditor from '../../components/tutorials/article/ArticleEditor';

export const ArticleNewPage = () => {
  const router = useRouter();
  console.log({ query: router.query, router });
  const { subcategory } = router.query;
  const { } = useContext(TutorialsContext);

  const newArticle = {
    subcategory: subcategory ? +subcategory : null,
    slug: "",
    priority: 0,
    published: false,
    title: "",
    contents: ""
  };

  return (
    <Wrapper>
      <ArticleEditor
        handleCancel={() => router.push(`/tutorials`)}
        article={newArticle}
      />
    </Wrapper>
  )
}

export default ArticleNewPage;
