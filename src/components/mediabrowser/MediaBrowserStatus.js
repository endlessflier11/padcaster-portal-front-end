import styles from './MediaBrowserStatus.module.scss';
import DownloadIcon from '../icons/DownloadIcon';
import ShareIcon from '../icons/ShareIcon';
import TrashIcon from '../icons/TrashIcon';
import TextButton from '../common/TextButton';

const MediaBrowserStatus = ({
  mediaSelectedCount,
  onCancelSelectedMedia,
  onShareMedia,
  onDeleteMedia,
  onDownloadMultiFiles,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.selectedCountWrapper}>
        <small className={styles.selectedCount}>
          {mediaSelectedCount} Selected
        </small>
        <TextButton buttonText='Cancel' onAction={onCancelSelectedMedia} />
      </div>
      <div className={styles.rightSideButtons}>
        <TextButton
          buttonText='Share'
          icon={ShareIcon}
          iconPosition='left'
          onAction={onShareMedia}
        />
        <TextButton
          buttonText='Download'
          icon={DownloadIcon}
          iconPosition='left'
          topOffset={4}
          onAction={onDownloadMultiFiles}
        />
        <TextButton
          buttonText='Delete'
          icon={TrashIcon}
          iconPosition='left'
          topOffset={2}
          onAction={onDeleteMedia}
        />
      </div>
    </div>
  );
};

export default MediaBrowserStatus;
