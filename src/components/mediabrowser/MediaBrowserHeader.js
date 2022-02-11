import styles from './MediaBrowserHeader.module.scss'
import AddFolderIcon from '../icons/AddFolderIcon';
import UploadIcon from '../icons/UploadIcon';
import GridIcon from '../icons/GridIcon';
import ListIcon from '../icons/ListIcon';
import MyMediaViewTypes from '../../types/MyMediaViewTypes';

const MediaBrowserHeader = ({ mediaViewType, toggleMediaViewType, toggleUploadModal }) => {
  return (
    <div className={styles.container}>
      <h1>My Media</h1>
      <div className={styles.rightSide}>
        <div><AddFolderIcon /></div>
        <button className={styles.uploadIcon} onClick={toggleUploadModal}><UploadIcon /></button>
        <div className={styles.pipe}></div>
        <button
          className={styles.gridOrListIcon}
          onClick={toggleMediaViewType}
        >
          {mediaViewType === MyMediaViewTypes.LIST ? <ListIcon /> : <GridIcon />}
        </button>
      </div>
    </div>
  );
}

export default MediaBrowserHeader;

