import styles from './DownloadIcon.module.scss';

const DownloadIcon = () => {
  return (
    <div className={styles.container}>
      <svg
        width='12px'
        height='18px'
        viewBox='0 0 12 18'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        className={styles.iconColor}
      >
        <title>Download</title>
        <g id='Icon/download' strokeWidth='1' fillRule='evenodd'>
          <g id='download' transform='translate(-1.000000, 2.000000)'>
            <path
              d='M7,5.68434189e-14 L10,3.91029793 M7,5.68434189e-14 L4,3.91029793 M7,10.0625 L7,2.55795385e-13'
              id='Combined-Shape'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              transform='translate(7.000000, 5.031250) rotate(-180.000000) translate(-7.000000, -5.031250) '
            ></path>
            <path
              d='M13.066104,14 C13.6183887,14 14.066104,14.4477153 14.066104,15 C14.066104,15.5128358 13.6800638,15.9355072 13.1827251,15.9932723 L13.066104,16 L1,16 C0.44771525,16 0,15.5522847 0,15 C0,14.4871642 0.38604019,14.0644928 0.883378875,14.0067277 L1,14 L13.066104,14 Z'
              id='Path-25'
              fillRule='nonzero'
            ></path>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default DownloadIcon;
