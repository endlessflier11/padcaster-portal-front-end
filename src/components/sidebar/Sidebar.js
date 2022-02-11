import styles from './Sidebar.module.scss'
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import SidebarLinks from './SidebarLinks';
import SidebarLogo from './SidebarLogo';
import SidebarLink from './SidebarLink';
import SignOutIcon from '../icons/SignOutIcon';
import ViewType from '../../types/ViewType';
import { UserContext } from '../../contexts/UserContext';

const Sidebar = () => {
  const { navOpen } = useContext(AppContext);
  const { logout } = useContext(UserContext);

  return (
    <div className={navOpen ? styles.containerActive : styles.container}>
      <div>
        <SidebarLogo />
        <SidebarLinks />
      </div>
      <div>
        <div className={styles.divider}></div>
        <SidebarLink
          text="Sign Out"
          icon={SignOutIcon}
          type={ViewType.NONE}
          onClick={() => logout()}
        />
      </div>
    </div>
  );
}

export default Sidebar;

