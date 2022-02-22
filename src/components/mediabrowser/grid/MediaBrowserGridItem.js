import styles from './MediaBrowserGridItem.module.scss';
import { makeDateString } from '../../../utils/date';
import BigFolderIcon from '../../icons/BigFolderIcon';
import MediaTypes from '../../../types/MediaTypes';
import DownloadIcon from '../../icons/DownloadIcon';
import ShareIcon from '../../icons/ShareIcon';
import TrashIcon from '../../icons/TrashIcon';
import { formatFileSize } from '../../../utils/file';

const MediaBrowserGridItem = ({
  id,
  name,
  dateCreated,
  size,
  sharedWith,
  type,
  onGotoSubFolder,
  onShareMedia,
  onDeleteMedia,
  onDownloadMultiFiles,
}) => {
  const selectThumbnail = () => {
    if (type === MediaTypes.FOLDER) {
      return (
        <div className={styles.folderWrapper}>
          <h1 className={styles.folderName} onClick={() => onGotoSubFolder(id)}>
            {name}
          </h1>
          <BigFolderIcon />
        </div>
      );
    }
    return <div className={styles.thumbnail}>thumbnail goes here</div>;
  };

  return (
    <div className={styles.container}>
      <div>{selectThumbnail(type)}</div>
      <p className={styles.dateCreated}>
        Created {makeDateString(dateCreated)}
      </p>
      <p className={styles.size}>{formatFileSize(size, 2)}</p>
      <p className={styles.sharedWith}>
        {`Shared with: ${
          sharedWith.length > 1 ? `${sharedWith.length} people` : 'only me'
        }`}
      </p>
      <div className={styles.icons}>
        <div className={styles.icon} onClick={() => onDownloadMultiFiles(id)}>
          <DownloadIcon />
        </div>
        <div className={styles.icon} onClick={onShareMedia}>
          <ShareIcon />
        </div>
        <div className={styles.icon} onClick={onDeleteMedia}>
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default MediaBrowserGridItem;
