import React, { useContext, useMemo } from 'react';
import styles from './HeaderSearch.module.scss';
import SearchIcon from '../icons/SearchIcon';
import { SearchContext } from '../../contexts/SearchContext';
import { AppContext } from '../../contexts/AppContext';
import ViewType from '../../types/ViewType';

const HeaderSearch = () => {
  const { query, setQuery } = useContext(SearchContext);
  const { viewType } = useContext(AppContext);

  const placeHolder = useMemo(() => {
    if (viewType === ViewType.MEDIA) return 'Search My Media';
    if (viewType === ViewType.TUTORIALS) return 'Search Tutorials';
    return 'Search';
  }, [viewType]);

  return (
    <div className={styles.container}>
      <SearchIcon />
      <input
        type='text'
        placeholder={placeHolder}
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default HeaderSearch;
