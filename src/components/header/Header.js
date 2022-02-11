import styles from './Header.module.scss';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import HeaderSidebarFlyout from './HeaderSidebarFlyout';
import HeaderSearch from './HeaderSearch';
import HeaderUser from './HeaderUser';

const Header = () => {
  const { navOpen } = useContext(AppContext);

  return (
    <div className={navOpen ? styles.containerNavOpen : styles.container}>
      <HeaderSidebarFlyout />
      <HeaderSearch />
      <HeaderUser />
    </div>
  );
};

export default Header;
