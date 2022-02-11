import styles from './UploadList.module.scss'
import UploadItem from './UploadItem';

const UploadList = ({ uploads, cancelDownload }) => {
  return (
    <div className={styles.container}>
      {uploads.map((upload, i) => {
        return <UploadItem key={i} {...upload} cancelDownload={cancelDownload(i)} />
      })}
    </div>
  );
}

export default UploadList;

