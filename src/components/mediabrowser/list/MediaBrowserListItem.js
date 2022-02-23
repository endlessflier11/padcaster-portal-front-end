import { useCallback, useState } from 'react';
import classNames from 'classnames';
import MediaTypes from '../../../types/MediaTypes';
import VideoImageIcon from '../../icons/VideoImageIcon';
import FolderIcon from '../../icons/FolderIcon';
import MediaImageIcon from '../../icons/MediaImageIcon';
import ListMoreHoverIcon from '../../icons/ListMoreHoverIcon';
import { makeDateString } from '../../../utils/date';
import { formatFileSize } from '../../../utils/file';
import Tooltip from '../../common/Tooltip';
import styles from './MediaBrowserListItem.module.scss';
import { formatSharedWith } from '../../../utils/social';

const MediaBrowserListItem = ({
  id,
  name,
  dateCreated,
  size,
  sharedWith,
  isSelected,
  type,
  handleMediaItemClick,
  onGotoSubFolder,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectIcon = useCallback((type) => {
    switch (type) {
      case MediaTypes.FOLDER:
        return <FolderIcon />;
      case MediaTypes.JPG:
        return <MediaImageIcon />;
      case MediaTypes.MP4:
        return <VideoImageIcon />;
      default:
        return <></>;
    }
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <input
          className={styles.checkbox}
          id={name}
          name={name}
          type='checkbox'
          onChange={handleMediaItemClick}
          checked={isSelected}
        />
      </div>
      <label
        className={styles.nameWrapper}
        htmlFor={type !== MediaTypes.FOLDER ? name : null}
      >
        {selectIcon(type)}
        <p
          className={classNames(
            styles.name,
            type === MediaTypes.FOLDER && styles.folderName
          )}
          onClick={() => onGotoSubFolder(id)}
        >
          {name}
        </p>
      </label>
      <p className={styles.dateCreated}>{makeDateString(dateCreated)}</p>
      <p className={styles.size}>
        {type !== MediaTypes.FOLDER && formatFileSize(size, 2)}
      </p>
      <p className={styles.sharedWith}>{formatSharedWith(sharedWith)}</p>
      <Tooltip
        content={
          <>
            <button className={styles.tooltipButton} onClick={alert}>
              Move to...
            </button>
            <button className={styles.tooltipButton} onClick={alert}>
              Edit access...
            </button>
          </>
        }
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      >
        <button
          className={isVisible ? styles.actionsClicked : styles.actions}
          onClick={() => setIsVisible(!isVisible)}
        >
          <ListMoreHoverIcon />
        </button>
      </Tooltip>
    </div>
  );
};

export default MediaBrowserListItem;
