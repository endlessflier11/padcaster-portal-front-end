import styles from './MediaBrowserListItem.module.scss'
import { useState } from 'react';
import MediaTypes from '../../../types/MediaTypes';
import VideoImageIcon from '../../icons/VideoImageIcon';
import FolderIcon from '../../icons/FolderIcon';
import MediaImageIcon from '../../icons/MediaImageIcon';
import ListMoreHoverIcon from '../../icons/ListMoreHoverIcon';
import { makeDateString } from '../../../utils/date';
import Tooltip from '../../common/Tooltip';

const MediaBrowserListItem = ({
  name,
  dateCreated,
  size,
  sharedWith,
  isSelected,
  type,
  handleMediaItemClick
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectIcon = type => {
    switch (type) {
      case MediaTypes.FOLDER:
        return <FolderIcon />
      case MediaTypes.JPG:
        return <MediaImageIcon />
      case MediaTypes.MP4:
        return <VideoImageIcon />
      default:
        return <></>
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <input
          className={styles.checkbox}
          id={name}
          name={name}
          type="checkbox"
          onChange={handleMediaItemClick}
          checked={isSelected}
        />
      </div>
      <label className={styles.nameWrapper} htmlFor={name}>
        {selectIcon(type)}
        <p className={styles.name}>{name}</p>
      </label>
      <p className={styles.dateCreated}>{makeDateString(dateCreated)}</p>
      <p className={styles.size}>{size}</p>
      <p className={styles.sharedWith}>{sharedWith}</p>
        <Tooltip
          content={(
            <>
              <button className={styles.tooltipButton} onClick={alert}>Move to...</button>
              <button className={styles.tooltipButton} onClick={alert}>Edit access...</button>
            </>            
          )}
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
}

export default MediaBrowserListItem;

