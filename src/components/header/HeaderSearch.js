import React, { useContext } from 'react';
import styles from './HeaderSearch.module.scss'
import SearchIcon from '../icons/SearchIcon';
import { SearchContext } from '../../contexts/SearchContext';

const HeaderSearch = () => {
  const { query, setQuery } = useContext(SearchContext);

  return (
    <div className={styles.container}>
      <SearchIcon />
      <input
        type="text"
        placeholder="Search"
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default HeaderSearch;

