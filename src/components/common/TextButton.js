import React from 'react';
import styles from './TextButton.module.scss';

const TextButton = ({
  icon,
  iconPosition,
  buttonText,
  topOffset,
  onAction,
}) => {
  return (
    <span className={styles.container} onClick={onAction}>
      {icon && iconPosition === 'left' && (
        <div className={styles.leftIcon} style={{ top: `${topOffset}px` }}>
          {React.createElement(icon)}
        </div>
      )}
      <button className={styles.button}>{buttonText}</button>
      {icon && iconPosition === 'right' && (
        <div className={styles.rightIcon} style={{ top: `${topOffset}px` }}>
          {React.createElement(icon)}
        </div>
      )}
    </span>
  );
};

export default TextButton;