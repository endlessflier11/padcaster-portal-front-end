import { useEffect, useRef } from 'react';

export const useDebounce = (func, delay) => {
  const timeout = useRef();
  const callback = useRef();

  useEffect(() => {
    callback.current = func;
  }, [func]);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (delay !== null) {
      timeout.current = setTimeout(callback.current, delay);
      return () => clearTimeout(timeout.current);
    }
  }, [delay]);
}

export default useDebounce;