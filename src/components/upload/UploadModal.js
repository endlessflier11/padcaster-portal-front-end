import { useState } from 'react';
import styles from './UploadModal.module.scss';
import UploadFileDrop from './UploadFileDrop';
import UploadList from './UploadList';
import MinimizeWindowIcon from '../icons/MinimizeWindowIcon';
import MaximizeWindowIcon from '../icons/MaximizeWindowIcon';
import CloseIcon from '../icons/CloseIcon';
import UploadModalTypes from '../../types/UploadModalTypes';

const UploadModal = ({ closeModal }) => {
  const defaultUploads = [
    {
      name: 'Chemistry',
      extension: 'mp4',
      progress: 50,
    },
    {
      name: 'BiologyIntro',
      extension: 'mp4',
      progress: 20,
    },
    {
      name: 'Ecosystems',
      extension: 'jpg',
      progress: 89,
    },
    {
      name: 'Ecosystems',
      extension: 'jpg',
      progress: 89,
    },
    {
      name: 'Ecosystems',
      extension: 'jpg',
      progress: 89,
    },
    {
      name: 'Ecosystems',
      extension: 'jpg',
      progress: 89,
    },
    {
      name: 'Ecosystems',
      extension: 'jpg',
      progress: 89,
    },
    {
      name: 'Ecosystems',
      extension: 'jpg',
      progress: 89,
    },
  ];

  const [uploads, setUploads] = useState(defaultUploads);
  const [modalViewType, setModalViewType] = useState(UploadModalTypes.DEFAULT);

  const cancelDownload = (index) => () => {
    const newUploads = uploads.filter((upload, i) => i !== index);
    setUploads(newUploads);
  };

  return (
    <div
      className={
        modalViewType === UploadModalTypes.DEFAULT
          ? styles.containerDefault
          : styles.containerMinimize
      }
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Upload Media</h2>
        <div className={styles.icons}>
          {modalViewType === UploadModalTypes.DEFAULT ? (
            <button
              className={styles.minimize}
              onClick={() => setModalViewType(UploadModalTypes.MINIMIZE)}
            >
              <MinimizeWindowIcon />
            </button>
          ) : (
            <button
              className={styles.default}
              onClick={() => setModalViewType(UploadModalTypes.DEFAULT)}
            >
              <MaximizeWindowIcon />
            </button>
          )}
          <button className={styles.close} onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
      </div>
      {modalViewType !== UploadModalTypes.MINIMIZE && (
        <>
          <UploadFileDrop uploads={uploads} setUploads={setUploads} />
          <UploadList uploads={uploads} cancelDownload={cancelDownload} />
        </>
      )}
    </div>
  );
};

export default UploadModal;
