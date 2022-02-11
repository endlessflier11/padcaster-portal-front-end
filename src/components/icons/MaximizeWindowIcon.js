import styles from './MaximizeWindowIcon.module.scss'

const MaximizeWindowIcon = () => {
  return (
    <div className={styles.container}>
      <svg width="16px" height="15px" viewBox="0 0 16 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <title>Icon/maximize window</title>
          <g id="Icon/maximize-window" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="maximize-window" fill="#979797">
                  <path d="M14,-1 L2,-1 C0.343145751,-1 -1,0.343145751 -1,2 L-1,13 C-1,14.6568542 0.343145751,16 2,16 L14,16 C15.6568542,16 17,14.6568542 17,13 L17,2 C17,0.343145751 15.6568542,-1 14,-1 Z M2,1 L14,1 C14.5522847,1 15,1.44771525 15,2 L15,13 C15,13.5522847 14.5522847,14 14,14 L2,14 C1.44771525,14 1,13.5522847 1,13 L1,2 C1,1.44771525 1.44771525,1 2,1 Z" id="Rectangle" fillRule="nonzero"></path>
                  <rect id="Rectangle" x="0" y="0" width="15" height="4"></rect>
              </g>
          </g>
      </svg>
    </div>
  );
}

export default MaximizeWindowIcon;

