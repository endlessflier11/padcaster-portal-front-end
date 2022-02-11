import styles from './MediaBrowserList.module.scss'
import MediaBrowserListItem from './MediaBrowserListItem';
import MediaBrowserListItemHeader from './MediaBrowserListItemHeader';

const MediaBrowserList = ({ media, handleMediaItemClick, toggleSelectAllItems, headerCheckboxState }) => {
  return (
    <div className={styles.container}>
      <MediaBrowserListItemHeader
        toggleSelectAllItems={toggleSelectAllItems}
        headerCheckboxState={headerCheckboxState}
      />
      {media.map((mediaItem, i) => {
        return (
          <MediaBrowserListItem
            {...mediaItem}
            key={i}
            handleMediaItemClick={handleMediaItemClick(i)}
          />
        )
      })}
    </div>
  );
}

export default MediaBrowserList;

