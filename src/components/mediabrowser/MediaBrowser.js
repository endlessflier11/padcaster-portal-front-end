import React, { useState, useContext } from 'react';
import styles from './MediaBrowser.module.scss';
import MediaBrowserHeader from './MediaBrowserHeader';
import MediaBrowserStatus from './MediaBrowserStatus';
import MediaBrowserList from './list/MediaBrowserList';
import MediaTypes from '../../types/MediaTypes';
import checkBoxTypes from '../../types/CheckboxTypes';
import MyMediaViewTypes from '../../types/MyMediaViewTypes';
import MediaBrowserGrid from './grid/MediaBrowserGrid';
import { DeviceContext } from '../../contexts/DeviceContext';
import UploadModal from '../upload/UploadModal';

const defaultMedia = [
  {
    name: 'something',
    dateCreated: new Date(Date.now()),
    size: 345,
    sharedWith: ['person1', 'person2'],
    isSelected: false,
    type: MediaTypes.FOLDER,
  },
  {
    name: 'something else',
    dateCreated: new Date(Date.now()),
    size: 34565,
    sharedWith: ['person1'],
    isSelected: false,
    type: MediaTypes.JPG,
  },
  {
    name: '3rd thing',
    dateCreated: new Date(Date.now()),
    size: 1049812,
    sharedWith: ['person3'],
    isSelected: false,
    type: MediaTypes.MP4,
  },
  {
    name: 'Mitochondria.mp4',
    dateCreated: new Date(Date.now()),
    size: 10492,
    sharedWith: ['person3', 'person5'],
    isSelected: false,
    type: MediaTypes.MP4,
  },
  {
    name: 'Photosynthesis.mp4',
    dateCreated: new Date(Date.now()),
    size: 1049212232,
    sharedWith: ['Only Me'],
    isSelected: false,
    type: MediaTypes.MP4,
  },
  {
    name: 'WorldMap.jpg',
    dateCreated: new Date(Date.now()),
    size: 1049122,
    sharedWith: ['person1', 'person2', 'person3', 'person4', 'person5'],
    isSelected: false,
    type: MediaTypes.JPG,
  },
  {
    name: 'Chart.jpg',
    dateCreated: new Date(Date.now()),
    size: 1049122,
    sharedWith: ['person2', 'person3', 'person4'],
    isSelected: false,
    type: MediaTypes.JPG,
  },
];

const MediaBrowser = () => {
  const [mediaViewType, setMediaViewType] = useState(MyMediaViewTypes.LIST);
  const [mediaSelectedCount, setMediaSelectedCount] = useState(0);
  const [media, setMedia] = useState(defaultMedia);
  const [headerCheckboxState, setHeaderCheckboxState] = useState();
  const { isMobile } = useContext(DeviceContext);
  const [showUploadModal, setShowUploadModal] = useState(false);

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

  return (
    <div className={styles.container}>
      {mediaSelectedCount ? (
        <MediaBrowserStatus mediaSelectedCount={mediaSelectedCount} />
      ) : (
        <MediaBrowserHeader
          toggleMediaViewType={toggleMediaViewType}
          mediaViewType={mediaViewType}
          toggleUploadModal={toggleUploadModal}
        />
      )}
      {mediaViewType === MyMediaViewTypes.LIST || isMobile ? (
        <MediaBrowserList
          media={media}
          handleMediaItemClick={handleMediaItemClick}
          toggleSelectAllItems={toggleSelectAllItems}
          headerCheckboxState={headerCheckboxState}
        />
      ) : (
        <MediaBrowserGrid media={media} />
      )}
      {showUploadModal && (
        <UploadModal closeModal={() => setShowUploadModal(false)} />
      )}
    </div>
  );
};

export default MediaBrowser;
