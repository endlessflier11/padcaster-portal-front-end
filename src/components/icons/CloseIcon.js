import styles from './CloseIcon.module.scss'

const CloseIcon = () => {
  return (
    <div className={styles.container}>
      <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <title>Close</title>
          <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
              <g id="Icon/close" transform="translate(-3.000000, -3.000000)" stroke="#979797" strokeWidth="3">
                  <g id="Close" transform="translate(10.000000, 10.000000) rotate(-315.000000) translate(-10.000000, -10.000000) translate(3.000000, 3.000000)">
                      <line x1="0" y1="7" x2="14" y2="7" id="Path-7"></line>
                      <line x1="7" y1="14" x2="7" y2="0" id="Path-7"></line>
                  </g>
              </g>
          </g>
      </svg>
    </div>
  );
}

export default CloseIcon;

