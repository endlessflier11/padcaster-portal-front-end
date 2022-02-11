/* eslint-disable react-hooks/exhaustive-deps */
import styles from './SidebarLink.module.scss'
import React, { useRef } from 'react';
import ViewType from '../../types/ViewType';
import ActiveLink from '../common/ActiveLink';

const SidebarLink = ({ text, icon, type, onClick = () => { } }) => {
  // TODO: Add a ref to the link so we can get the data-active attribute passed to it by ActiveLink
  // This is a workaround for the fact that ActiveLink doesn't have a ref
  const linkRef = useRef();
  const selected = linkRef.current?.dataset?.active === 'true';

  return (
    <ActiveLink
      href={`/${type}`}
      passHref
      activeClassName={styles.containerActive}
    >
      <a className={styles.container} ref={linkRef} onClick={onClick}>
        <div
          className={`${styles.icon} ${type === ViewType.NONE ? styles.iconSignOut : ''}`}
        >
          {React.createElement(icon, { selected })}
        </div>
        <button
          className={styles.menu}
        >
          {text}
        </button>

        <div className={styles.highlight} />
      </a>
    </ActiveLink>
  );
}

export default SidebarLink;

