import styles from './HeaderSidebarFlyout.module.scss'
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import IconNav from '../icons/IconNav';

const HeaderSidebarFlyout = () => {
  const { navOpen, setNavOpen } = useContext(AppContext);

  const onClick = () => {
    const open = !navOpen;
    setNavOpen(open);
  }

  return (
    <div className={navOpen ? styles.containerNavOpen : styles.container} onClick={onClick}>
      <IconNav />
    </div>
  );
}

export default HeaderSidebarFlyout;

