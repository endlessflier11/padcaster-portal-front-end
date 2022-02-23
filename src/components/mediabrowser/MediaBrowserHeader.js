import { Fragment, useCallback } from 'react';
import styles from './MediaBrowserHeader.module.scss';
import AddFolderIcon from '../icons/AddFolderIcon';
import UploadIcon from '../icons/UploadIcon';
import GridIcon from '../icons/GridIcon';
import ListIcon from '../icons/ListIcon';
import MyMediaViewTypes from '../../types/MyMediaViewTypes';

const MediaBrowserHeader = ({
  mediaPath,
  mediaViewType,
  toggleMediaViewType,
  toggleUploadModal,
  onGotoSubFolder,
}) => {
  const renderPath = useCallback(() => {
    const pathLength = mediaPath?.length || 0;
    return (
      <>
        {(mediaPath || []).map((path, idx) => {
          if (idx === 0) {
            if (pathLength === 1)
              return (
                <h1 key={`path-${path.id}`} className={styles.unlinkedPath}>
                  {path.name}
                </h1>
              );
            else
              return (
                <h1
                  key={`path-${path.id}`}
                  className={styles.linkedPath}
                  onClick={() => onGotoSubFolder(path.id)}
                >
                  {path.name}
                </h1>
              );
          } else {
            if (idx !== pathLength - 1) {
              return (
                <Fragment key={`path-${path.id}`}>
                  <h1 className={styles.splitLine}>&nbsp;/&nbsp;</h1>
                  <h1
                    className={styles.linkedPath}
                    onClick={() => onGotoSubFolder(path.id)}
                  >
                    {path.name}
                  </h1>
                </Fragment>
              );
            } else {
              return (
                <Fragment key={`path-${path.id}`}>
                  <h1 className={styles.splitLine}>&nbsp;/&nbsp;</h1>
                  <h1 className={styles.unlinkedPath}>{path.name}</h1>
                </Fragment>
              );
            }
          }
        })}
      </>
    );
  }, [mediaPath, onGotoSubFolder]);

  return (
    <div className={styles.container}>
      <div className={styles.pathWrapper}>{renderPath()}</div>
      <div className={styles.rightSide}>
        <div>
          <AddFolderIcon />
        </div>
        <button className={styles.uploadIcon} onClick={toggleUploadModal}>
          <UploadIcon />
        </button>
        <div className={styles.pipe}></div>
        <button className={styles.gridOrListIcon} onClick={toggleMediaViewType}>
          {mediaViewType !== MyMediaViewTypes.LIST ? (
            <ListIcon />
          ) : (
            <GridIcon />
          )}
        </button>
      </div>
    </div>
  );
};

export default MediaBrowserHeader;
