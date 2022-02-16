import React, { useState, useContext, useEffect, useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MediaBrowserHeader from './MediaBrowserHeader';
import MediaBrowserStatus from './MediaBrowserStatus';
import MediaBrowserList from './list/MediaBrowserList';
import checkBoxTypes from '../../types/CheckboxTypes';
import MyMediaViewTypes from '../../types/MyMediaViewTypes';
import MediaTypes from '../../types/MediaTypes';
import MediaBrowserGrid from './grid/MediaBrowserGrid';
import { DeviceContext } from '../../contexts/DeviceContext';
import { SearchContext } from '../../contexts/SearchContext';
import UploadModal from '../upload/UploadModal';
import { useFilteredMediaList } from '../../pages/effects/media';
import styles from './MediaBrowser.module.scss';
import { downloadMultiFiles } from '../../utils/file';

const MediaBrowser = ({ mediaPath, data, onGotoSubFolder }) => {
  const { query } = useContext(SearchContext);
  const [mediaViewType, setMediaViewType] = useState(MyMediaViewTypes.LIST);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [media, setMedia] = useFilteredMediaList(data, query);
  const [headerCheckboxState, setHeaderCheckboxState] = useState();
  const { isMobile } = useContext(DeviceContext);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    setSelectedMedia([]);
    setHeaderCheckboxState(checkBoxTypes.EMPTY);
  }, [data]);

  const handleMediaItemClick = (index) => () => {
    const newMedia = media.map((item, i) => ({
      ...item,
      isSelected: i === index ? !item.isSelected : item.isSelected,
    }));
    setMedia(newMedia);
    const newSelectedMedia = newMedia.filter((item) => item.isSelected);
    setSelectedMedia(newSelectedMedia);

    switch (newSelectedMedia.length) {
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
    let allChecked;
    if (selectedMedia.length === media.length) {
      setHeaderCheckboxState(checkBoxTypes.EMPTY);
      allChecked = false;
    } else {
      setHeaderCheckboxState(checkBoxTypes.CHECKED);
      allChecked = true;
    }
    const newMedia = media.map((item) => ({ ...item, isSelected: allChecked }));
    setMedia(newMedia);
    setSelectedMedia(newMedia.filter((item) => item.isSelected));
  };

  const toggleMediaViewType = () =>
    setMediaViewType(
      mediaViewType === MyMediaViewTypes.LIST
        ? MyMediaViewTypes.GRID
        : MyMediaViewTypes.LIST
    );

  const toggleUploadModal = () => setShowUploadModal(!showUploadModal);

  const handleShareMultiMedia = useCallback(() => {}, []);

  const handleDeleteMultiMedia = useCallback(() => {}, []);

  const handleDownloadMultiFiles = useCallback(async () => {
    await downloadMultiFiles(
      selectedMedia.map((item) => ({
        url: item.url,
        name: item.name,
      }))
    );
  }, [selectedMedia]);

  const handleGotoSubFolder = useCallback(
    (id) => {
      const currentMedia = media.find((item) => item.id === id);
      if (currentMedia?.type === MediaTypes.FOLDER) {
        onGotoSubFolder(id);
      }
    },
    [media, onGotoSubFolder]
  );

  return (
    <div className={styles.container}>
      {selectedMedia.length ? (
        <MediaBrowserStatus
          mediaSelectedCount={selectedMedia.length}
          onShareMedia={handleShareMultiMedia}
          onDeleteMedia={handleDeleteMultiMedia}
          onDownloadMultiFiles={handleDownloadMultiFiles}
        />
      ) : (
        <MediaBrowserHeader
          mediaPath={mediaPath}
          toggleMediaViewType={toggleMediaViewType}
          mediaViewType={mediaViewType}
          toggleUploadModal={toggleUploadModal}
          onGotoSubFolder={onGotoSubFolder}
        />
      )}
      {!data ? (
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
              onGotoSubFolder={handleGotoSubFolder}
            />
          ) : (
            <MediaBrowserGrid
              media={media}
              onGotoSubFolder={handleGotoSubFolder}
            />
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
