import { useContext, useMemo } from 'react';
import { UserContext } from '../../contexts/UserContext';
import ImageLoader from '../ImageLoader';
import styles from './HeaderUser.module.scss';

const HeaderUser = () => {
  const { user } = useContext(UserContext);

  const [firstName, userType, imgUrl] = useMemo(() => {
    return [
      (user?.firstName || 'Unknown').toUpperCase(),
      user.isAdmin ? 'Admin' : 'User',
      user.image,
    ];
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.userNameWrapper}>
        <p className={styles.userName}>{firstName}</p>
        <p className={styles.userType}>{userType}</p>
      </div>
      <div
        className={styles.userAvatar}
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        {!imgUrl && firstName[0]}
      </div>
    </div>
  );
};

export default HeaderUser;
