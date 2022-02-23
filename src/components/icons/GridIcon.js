import styles from './GridIcon.module.scss';

const GridIcon = () => {
  return (
    <div className={styles.container}>
      <svg
        width='24px'
        height='24px'
        viewBox='0 0 24 24'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <title>Grid View</title>
        <defs>
          <path
            d='M6,18 L6,22 L2,22 L2,18 L6,18 Z M14,18 L14,22 L10,22 L10,18 L14,18 Z M22,18 L22,22 L18,22 L18,18 L22,18 Z M6,10 L6,14 L2,14 L2,10 L6,10 Z M14,10 L14,14 L10,14 L10,10 L14,10 Z M22,10 L22,14 L18,14 L18,10 L22,10 Z M6,2 L6,6 L2,6 L2,2 L6,2 Z M14,2 L14,6 L10,6 L10,2 L14,2 Z M22,2 L22,6 L18,6 L18,2 L22,2 Z'
            id='path-1'
          ></path>
        </defs>
        <g
          id='icons/glyphs/grid'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g id='ic_grid'>
            <mask id='mask-2' fill='white'>
              <use xlinkHref='#path-1'></use>
            </mask>
            <g id='Combined-Shape'></g>
            <g
              id='general/palette/neutral/grey-dark-1'
              mask='url(#mask-2)'
              fill='#000000'
              fillOpacity='0.8'
            >
              <g
                transform='translate(-5.000000, -5.000000)'
                id='palette/secondary'
              >
                <rect x='0' y='0' width='34' height='34'></rect>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default GridIcon;
