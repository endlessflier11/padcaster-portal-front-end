import React, { useState, useContext, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MediaBrowserHeader from './MediaBrowserHeader';
import MediaBrowserStatus from './MediaBrowserStatus';
import MediaBrowserList from './list/MediaBrowserList';
import MediaTypes from '../../types/MediaTypes';
import checkBoxTypes from '../../types/CheckboxTypes';
import MyMediaViewTypes from '../../types/MyMediaViewTypes';
import MediaBrowserGrid from './grid/MediaBrowserGrid';
import { DeviceContext } from '../../contexts/DeviceContext';
import UploadModal from '../upload/UploadModal';
import { useFilteredMediaList } from '../../pages/effects/media';
import styles from './MediaBrowser.module.scss';

const MediaBrowser = ({ mediaPath, data, onGotoSubFolder }) => {
  const [mediaViewType, setMediaViewType] = useState(MyMediaViewTypes.LIST);
  const [mediaSelectedCount, setMediaSelectedCount] = useState(0);
  const [media, setMedia] = useFilteredMediaList(data);
  const [headerCheckboxState, setHeaderCheckboxState] = useState();
  const { isMobile } = useContext(DeviceContext);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    setMediaSelectedCount(0);
    setHeaderCheckboxState(checkBoxTypes.EMPTY);
  }, [data]);

  const handleMediaItemClick = (index) => () => {
    let count = mediaSelectedCount;
    const newMedia = media.map((item, i) => {
      if (i === index) {
        count = item.isSelected ? --count : ++count;
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }
      return item;
    });
    setMediaSelectedCount(count);
    setMedia(newMedia);

    switch (count) {
      case 0:
        setHeaderCheckboxState(checkBoxTypes.EMPTY);
        break;
      case media.length:
        setHeaderCheckboxState(checkBoxTypes.CHECKED);
        break;
      default:
        setHeaderCheckboxState(checkBoxTypes.INDETERMINATE);
    }
  };

  const toggleSelectAllItems = () => {
    let nextHeaderCheckboxState = checkBoxTypes.CHECKED;
    let count = media.length;
    if (mediaSelectedCount === media.length) {
      nextHeaderCheckboxState = checkBoxTypes.EMPTY;
      count = 0;
    }

    setMedia(
      media.map((item) => ({
        ...item,
        isSelected: mediaSelectedCount !== media.length,
      }))
    );
    setMediaSelectedCount(count);
    setHeaderCheckboxState(nextHeaderCheckboxState);
  };

  const toggleMediaViewType = () =>
    setMediaViewType(
      mediaViewType === MyMediaViewTypes.LIST
        ? MyMediaViewTypes.GRID
        : MyMediaViewTypes.LIST
    );

  const toggleUploadModal = () => setShowUploadModal(!showUploadModal);

  const loading = !data;

  return (
    <div className={styles.container}>
      {mediaSelectedCount ? (
        <MediaBrowserStatus mediaSelectedCount={mediaSelectedCount} />
      ) : (
        <MediaBrowserHeader
          mediaPath={mediaPath}
          toggleMediaViewType={toggleMediaViewType}
          mediaViewType={mediaViewType}
          toggleUploadModal={toggleUploadModal}
          onGotoSubFolder={onGotoSubFolder}
        />
      )}
      {loading ? (
        <div className={styles.loadingWrapper}>
          <CircularProgress className={styles.loadingIndicator} />
        </div>
      ) : (
        <>
          {mediaViewType === MyMediaViewTypes.LIST || isMobile ? (
            <MediaBrowserList
              media={media}
              handleMediaItemClick={handleMediaItemClick}
              toggleSelectAllItems={toggleSelectAllItems}
              headerCheckboxState={headerCheckboxState}
              onGotoSubFolder={onGotoSubFolder}
            />
          ) : (
            <MediaBrowserGrid media={media} />
          )}
          {showUploadModal && (
            <UploadModal closeModal={() => setShowUploadModal(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default MediaBrowser;
