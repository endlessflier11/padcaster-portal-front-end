import styles from './SidebarLogo.module.scss'
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import ViewType from '../../types/ViewType';
import { useRouter } from 'next/router';

const SidebarLogo = () => {
  const router = useRouter();
  const { navOpen, setNavOpen, setViewType } = useContext(AppContext);

  const onClick = () => {
    if (navOpen) {
      setNavOpen(false);
    } else {
      router.push('/');
    }
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.placeholder}>Logo here</p>
    </div>
  );
}

export default SidebarLogo;

