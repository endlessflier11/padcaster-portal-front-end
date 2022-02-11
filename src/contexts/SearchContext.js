import { createContext, useEffect, useState } from 'react';
import ViewType from '../types/ViewType';

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{
      query, setQuery
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
