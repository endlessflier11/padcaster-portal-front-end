import { useRef } from 'react';
import styles from './UploadFileDrop.module.scss';
import CloudUploadIcon from '../icons/CloudUploadIcon';

const UploadFileDrop = ({ uploads, setUploads }) => {
  const fileInputRef = useRef();

  function handleFiles(files) {
    // TODO: finish implementing when API is more finalized
    console.log('files=', files);
  }

  const defaultDrag = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div
      className={styles.container}
      onDragEnter={defaultDrag}
      onDragOver={defaultDrag}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!event?.dataTransfer?.files) return;
        const files = event.dataTransfer.files;
        handleFiles(files);
      }}
    >
      <CloudUploadIcon />
      <div className={styles.text}>
        Drag and drop files here or
        <label className={styles.label} htmlFor='file-upload' tabIndex='0'>
          {' '}
          browse for files
        </label>
        <input
          type='file'
          id='file-upload'
          ref={fileInputRef}
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>
    </div>
  );
};

export default UploadFileDrop;
