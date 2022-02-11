import { useCallback, useState } from 'react';
import { first, last } from 'lodash';
import MediaTypes from '../../../types/MediaTypes';
import VideoImageIcon from '../../icons/VideoImageIcon';
import FolderIcon from '../../icons/FolderIcon';
import MediaImageIcon from '../../icons/MediaImageIcon';
import ListMoreHoverIcon from '../../icons/ListMoreHoverIcon';
import { makeDateString } from '../../../utils/date';
import { formatFileSize } from '../../../utils/file';
import Tooltip from '../../common/Tooltip';
import styles from './MediaBrowserListItem.module.scss';

const MediaBrowserListItem = ({
  name,
  dateCreated,
  size,
  sharedWith,
  isSelected,
  type,
  handleMediaItemClick,
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

  const formatSharedWith = useCallback((persons) => {
    const otherCount = persons.length - 2;
    const showingPersons = persons.slice(0, 2);
    const lastPerson =
      showingPersons.length === 2 ? last(showingPersons) : null;
    const firstPerson = first(showingPersons);
    let sharedStr = firstPerson;
    if (lastPerson) {
      if (otherCount > 0) {
        sharedStr = sharedStr + `, ${lastPerson}, and ${otherCount} `;
        sharedStr = sharedStr + (otherCount > 1 ? 'Others' : 'Other');
      } else {
        sharedStr = sharedStr + ' and ' + lastPerson;
      }
    }
    return sharedStr;
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
      <label className={styles.nameWrapper} htmlFor={name}>
        {selectIcon(type)}
        <p className={styles.name}>{name}</p>
      </label>
      <p className={styles.dateCreated}>{makeDateString(dateCreated)}</p>
      <p className={styles.size}>{formatFileSize(size, 2)}</p>
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
