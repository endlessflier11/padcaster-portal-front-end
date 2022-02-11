import React from 'react';
import ArticlePreview from '../article/ArticlePreview';
import styles from './TutorialSearchResults.module.scss';

export default function TutorialSearchResults({ query, results, searching }) {
  return (
    <div className={styles.searchResultsContainer}>
      <h2>
        {searching || !results ? 'Searching articles...' : null}
        {!searching && results?.length > 0 ? `Search results for "${query}"` : null }
        {!searching && results?.length === 0 ? `No articles found for "${query}"` : null }
      </h2>
      {results && !searching && results.map((article, key) => {
        return (
          <div className={styles.searchResult}
            key={key}
          >
            <ArticlePreview
              article={article}
            />
          </div>
        )
      })}
    </div>
  );
}
