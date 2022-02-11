import styles from './MyMediaIcon.module.scss'

const MyMediaIcon = ({ isActive }) => {
  return (
    <div className={styles.container}>
      <svg
        width="32px"
        height="20px"
        viewBox="0 0 32 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
          <title>my media</title>
          <g
            id="Symbols"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
              <g
                className={isActive ? styles.group : ""}
                id="Main/Sidebar-None-Selected"
                transform="translate(-74.000000, 0.000000)"
                fill="#FFFFFF"
              >
                  <g id="Group-9">
                      <g id="Group-8">
                          <g id="my-media" transform="translate(74.000000, 0.000000)">
                              <path
                                d="M18.4,0 L5.6,0 C2.5072054,0 0,2.41077442 0,5.38461538 L0,14.6153846 C0,17.5892256 2.5072054,20 5.6,20 L18.4,20 C21.4927946,20 24,17.5892256 24,14.6153846 L24,5.38461538 C24,2.41077442 21.4927946,0 18.4,0 Z M5.6,1.53846154 L18.4,1.53846154 C20.609139,1.53846154 22.4,3.26044327 22.4,5.38461538 L22.4,14.6153846 C22.4,16.7395567 20.609139,18.4615385 18.4,18.4615385 L5.6,18.4615385 C3.390861,18.4615385 1.6,16.7395567 1.6,14.6153846 L1.6,5.38461538 C1.6,3.26044327 3.390861,1.53846154 5.6,1.53846154 Z"
                                id="Rectangle"
                                fillRule="nonzero"
                              ></path>
                              <path
                                d="M32.2323023,5.38461538 L26.6178385,5.38461538 C25.3207245,5.38461538 24.2692057,6.41780442 24.2692057,7.69230769 L24.2692057,13.2089022 C24.2692057,13.8209403 24.5166503,14.4079108 24.9571044,14.8406871 C25.8743025,15.741897 27.3613746,15.741897 28.2785727,14.8406871 L33.8930365,9.32409257 C34.3334906,8.89131631 34.5809351,8.30434575 34.5809351,7.69230769 C34.5809351,6.41780442 33.5294164,5.38461538 32.2323023,5.38461538 Z M26.6178385,6.92307692 L32.2323023,6.92307692 C32.6646737,6.92307692 33.0151799,7.26747327 33.0151799,7.69230769 C33.0151799,7.89632038 32.9326984,8.09197723 32.7858804,8.23623599 L27.1714166,13.7528305 C26.8656839,14.0532338 26.3699932,14.0532338 26.0642605,13.7528305 C25.9174424,13.6085718 25.8349609,13.4129149 25.8349609,13.2089022 L25.8349609,7.69230769 C25.8349609,7.26747327 26.1854672,6.92307692 26.6178385,6.92307692 Z"
                                id="Rectangle"
                                fillRule="nonzero"
                                transform="translate(29.425070, 10.450605) rotate(-45.000000) translate(-29.425070, -10.450605) "
                              ></path>
                              <path
                                d="M5.93073293,4.55250605 L13.5125278,5.78783115 C14.0576245,5.87664543 14.4275145,6.39053186 14.3387003,6.93562861 C14.3049836,7.14256421 14.2070772,7.33366779 14.0588221,7.4819229 L7.71235231,13.8283927 C7.32182802,14.2189169 6.68866304,14.2189169 6.29813875,13.8283927 C6.14988364,13.6801375 6.05197721,13.489034 6.01826056,13.2820984 L4.78293546,5.70030352 C4.69412117,5.15520677 5.0640112,4.64132034 5.60910795,4.55250605 C5.71561404,4.53515268 5.82422683,4.53515268 5.93073293,4.55250605 Z"
                                id="Rectangle"
                                transform="translate(9.999272, 9.768842) rotate(-225.000000) translate(-9.999272, -9.768842) "
                              ></path>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </svg>
    </div>
  );
}

export default MyMediaIcon;

