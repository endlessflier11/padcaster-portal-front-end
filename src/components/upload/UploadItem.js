import styles from './UploadItem.module.scss'
import CloseIcon from '../icons/CloseIcon';

const UploadItem = ({ name, extension, progress, cancelDownload }) => {
  return (
    <div className={styles.container}>
      <label className={styles.name} htmlFor={name}>
        {name}.{extension}
      </label>
      <div className={styles.progress} style={{ width: `${progress}%`}}></div>
      <button className={styles.cancel} onClick={cancelDownload}><CloseIcon /></button>
    </div>
  );
}

export default UploadItem;

