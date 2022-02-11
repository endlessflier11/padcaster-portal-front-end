/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import styles from './Tooltip.module.scss';

const Tooltip = ({ content, children, isVisible, setIsVisible }) => {
  useEffect(() => {
    if (!isVisible) {
      return;
    }
    const handleClick = () => {
      setIsVisible(false);
      window.removeEventListener('click', handleClick);
    }
    window.addEventListener('click', handleClick);
    return () => setIsVisible(false);
  }, [isVisible]);

  return (
    <>
      {children}
      {isVisible && <div className={styles.container}>{content}</div>}
    </>
  );
};

export default Tooltip;