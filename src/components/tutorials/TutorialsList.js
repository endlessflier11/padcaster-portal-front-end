import React, { useMemo, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { TutorialsContext } from '../../contexts/TutorialsContext';
import { SearchContext } from '../../contexts/SearchContext';
import LayoutType from '../../types/LayoutType';
import Article from './article/Article';
import styles from './TutorialsList.module.scss';
import debounce from 'lodash.debounce';
import ArticlePreview from './article/ArticlePreview';
import TutorialSearchResults from './tutorial-search-results/TutorialSearchResults';
import TutorialSubcategory from './tutorial-subcategory/TutorialSubcategory';
import router from 'next/router';

const TutorialsList = () => {
  const {
    articles,
    categoryId,
    subcategories,
    subcategoryId, setSubcategoryId,
    searchArticles, searchingArticles, articleSearchResults,
    loadingArticles
  } = useContext(TutorialsContext);
  const { query, setQuery } = useContext(SearchContext);

  const subcategoriesList = useMemo(() => {
    return (subcategories.categories[categoryId] || []).map(subId => (
      {
        ...subcategories.entities[subId],
        articles: (articles.subcategories[subId] || []).map(aId => articles.entities[aId])
      }
    ))
  }, [categoryId, subcategories, articles]);

  const subcategory = useMemo(() => subcategories.entities[subcategoryId], [subcategoryId, subcategories]);

  const handleSearchArticles = useRef(debounce((query) => {
    searchArticles(query);
  }, 500));

  const goToSubcategory = (subcategory) => {
    setSubcategoryId(subcategory.id);
  }

  useEffect(() => {
    handleSearchArticles.current(query);
  }, [query, searchArticles, articles]);

  useEffect(() => {
    setQuery('');
  }, [categoryId, subcategoryId, setQuery]);

  if (loadingArticles) {
    return <h2>Loading articles...</h2>
  }

  if (query.length > 3) {
    return (
      <TutorialSearchResults
        query={query}
        searching={searchingArticles}
        results={articleSearchResults}
      />
    )
  }

  if (subcategory) {
    return (
      <TutorialSubcategory
        subcategory={subcategory}
      />
    )
  }

  return (
    <div className={`${styles.container} ${!loadingArticles ? styles.mediumWidth : ''}`}>
      {subcategoriesList.map((subcategory) => {
        return (
          <div className={styles.subcategory} key={subcategory.id}>
            <a href="#" onClick={() => goToSubcategory(subcategory)}>
              <h2>{subcategory.title}</h2>
            </a>
            <div className={styles.subcategoryLinks}>
              {subcategory.articles.length > 0 && (
                <div className={styles.preview}>
                  <ArticlePreview
                    article={subcategory.articles[0]}
                  />
                </div>
              )}
              {subcategory.articles.length > 1 ? (
                <div className={styles.side}>
                  {subcategory.articles.slice(1, 3).map((article, sideKey) =>
                    <a
                      href="#"
                      key={sideKey}
                      className={styles.articleSide}
                      onClick={() => router.push(`/tutorials/${article.id}`)}
                    >
                      {article.title}
                    </a>
                  )}
                  <div className={styles.more}>
                    <button
                      className='text'
                      onClick={() => goToSubcategory(subcategory)}
                    >
                      More &gt;
                    </button>
                  </div>
                </div>
              ): null}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default TutorialsList;

