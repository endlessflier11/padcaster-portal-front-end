import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
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
  const isTreeView = useMemo(() => {
    return mediaViewType === MyMediaViewTypes.LIST || isMobile;
  }, [isMobile, mediaViewType]);

  useEffect(() => {
    setSelectedMedia([]);
    setHeaderCheckboxState(checkBoxTypes.EMPTY);
  }, [data]);

  useEffect(() => {
    const newSelectedMedia = media.filter((item) => item.isSelected);
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
  }, [media]);

  const handleMediaItemClick = (index) => () => {
    const newMedia = media.map((item, i) => ({
      ...item,
      isSelected: i === index ? !item.isSelected : item.isSelected,
    }));
    setMedia(newMedia);
  };

  const toggleSelectAllItems = () => {
    const newMedia = media.map((item) => ({
      ...item,
      isSelected: selectedMedia.length !== media.length,
    }));
    setMedia(newMedia);
  };

  const toggleMediaViewType = () =>
    setMediaViewType(
      isTreeView ? MyMediaViewTypes.GRID : MyMediaViewTypes.LIST
    );

  const toggleUploadModal = () => setShowUploadModal(!showUploadModal);

  const handleCancelSelectedMedia = useCallback(() => {
    const newMedia = media.map((item, i) => ({
      ...item,
      isSelected: false,
    }));
    setMedia(newMedia);
  }, [media, setMedia]);

  const handleShareMultiMedia = useCallback(() => {
    console.log('onshare');
  }, []);

  const handleDeleteMultiMedia = useCallback(() => {
    console.log('ondelete');
  }, []);

  const handleDownloadMultiFiles = useCallback(
    async (id) => {
      let downloadingFiles = selectedMedia;
      if (!isTreeView) {
        downloadingFiles = [media.find((item) => item.id === id)];
      }
      await downloadMultiFiles(
        downloadingFiles.map((item) => ({
          url: item.url,
          name: item.name,
        }))
      );
    },
    [isTreeView, media, selectedMedia]
  );

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
          onCancelSelectedMedia={handleCancelSelectedMedia}
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
          {isTreeView ? (
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
              onCancelSelectedMedia={handleCancelSelectedMedia}
              onShareMedia={handleShareMultiMedia}
              onDeleteMedia={handleDeleteMultiMedia}
              onDownloadMultiFiles={handleDownloadMultiFiles}
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
