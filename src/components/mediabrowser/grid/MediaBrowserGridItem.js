import styles from './MediaBrowserGridItem.module.scss';
import { makeDateString } from '../../../utils/date';
import BigFolderIcon from '../../icons/BigFolderIcon';
import MediaTypes from '../../../types/MediaTypes';
import DownloadIcon from '../../icons/DownloadIcon';
import ShareIcon from '../../icons/ShareIcon';
import TrashIcon from '../../icons/TrashIcon';
import { formatFileSize } from '../../../utils/file';

const MediaBrowserGridItem = ({
  name,
  dateCreated,
  size,
  sharedWith,
  type,
}) => {
  const selectThumbnail = () => {
    if (type === MediaTypes.FOLDER) {
      return <BigFolderIcon />;
    }
    return <div className={styles.thumbnail}>thumbnail goes here</div>;
  };

  return (
    <div className={styles.container}>
      <div>{selectThumbnail(type)}</div>
      <p className={styles.dateCreated}>
        Created {makeDateString(dateCreated)}
      </p>
      <p className={styles.size}>
        {type !== MediaTypes.FOLDER && formatFileSize(size, 2)}
      </p>
      <p className={styles.sharedWith}>
        {type !== MediaTypes.FOLDER &&
          `Shared with: ${
            sharedWith.length > 1 ? `${sharedWith.length} people` : 'only me'
          }`}
      </p>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <DownloadIcon />
        </div>
        <div className={styles.icon}>
          <ShareIcon />
        </div>
        <TrashIcon />
      </div>
    </div>
  );
};

export default MediaBrowserGridItem;
