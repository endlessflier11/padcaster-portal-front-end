import styles from './MediaBrowserListItemHeader.module.scss'
import checkBoxTypes from '../../../types/CheckboxTypes';
import { useEffect, useRef } from 'react';

const MediaBrowserListItemHeader = ({ toggleSelectAllItems, headerCheckboxState }) => {
  useEffect(() => {
    checkboxRef.current.checked = false;
    checkboxRef.current.indeterminate = false;
    if (headerCheckboxState === checkBoxTypes.CHECKED) {
      checkboxRef.current.checked = true;
    } else if (headerCheckboxState === checkBoxTypes.INDETERMINATE) {
      checkboxRef.current.indeterminate = true;
    }
  }, [headerCheckboxState])

  const checkboxRef = useRef({});
  
  return (
    <div className={styles.container}>
      <div>
        <input
          className={styles.checkbox}
          htmlFor="header-row"
          type="checkbox"
          onChange={toggleSelectAllItems}
          ref={checkboxRef}
        />
      </div>
      <label className={styles.nameWrapper} htmlFor="header-row"><h2 className={styles.name}>Name</h2></label>
      <h2 className={styles.dateCreated}>Date Created</h2>
      <h2 className={styles.size}>Size</h2>
      <h2 className={styles.sharedWith}>Shared With</h2>
      <span className={styles.actions}></span>
    </div>
  );
}

export default MediaBrowserListItemHeader;

