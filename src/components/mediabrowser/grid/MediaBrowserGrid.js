import MediaTypes from '../../../types/MediaTypes';
import styles from './MediaBrowserGrid.module.scss'
import MediaBrowserGridItem from './MediaBrowserGridItem';

const MediaBrowserGrid = ({ media }) => {
  return (
    <div className={styles.container}>
      {media.map((mediaItem, i) => {
        return <MediaBrowserGridItem key={i} {...mediaItem} />
      })}
    </div>
  );
}

export default MediaBrowserGrid;

