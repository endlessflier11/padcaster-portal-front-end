/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

function addMediaQueryListener(mediaQuery, callback) {
  callback(mediaQuery);
  if (mediaQuery.addEventListener) {
    return mediaQuery.addEventListener('change', callback);
  } else {
    return mediaQuery.addListener(callback);
  }
}

function removeMediaQueryListener(mediaQuery, callback) {
  if (mediaQuery.addEventListener) {
    return mediaQuery.removeEventListener('change', callback);
  } else {
    return mediaQuery.removeListener(callback);
  }
}

const useMedia = (query, defaultState = false) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const onChange = (evt) => {
      setState(evt.matches);
    };

    addMediaQueryListener(mediaQuery, onChange);
    return () => {
      removeMediaQueryListener(mediaQuery, onChange);
    };
  }, []);

  return state;
};

export default useMedia;
