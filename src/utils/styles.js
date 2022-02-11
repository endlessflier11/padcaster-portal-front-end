import { css } from "@emotion/core";

import typefaceBold from '../fonts/Montserrat-Bold.woff2';
import typefaceRegular from '../fonts/Montserrat-Regular.woff2';

const webfonts = css`
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: normal;
    font-display: fallback;
    src: local('Montserrat Regular'), local('Montserrat-Regular'),
      url(${typefaceRegular}) format('woff2');
    unicode-range: U+0100-024f, U+1-1eff, U+20a0-20ab, U+20ad-20cf, U+2c60-2c7f,
      U+A720-A7FF;
  }
  @font-face {
    font-family: 'Montserrat';
    font-style: bold;
    font-weight: bold;
    font-display: fallback;
    src: local('Montserrat Bold'), local('Montserrat-Bold'),
      url(${typefaceBold}) format('woff2');
    unicode-range: U+0100-024f, U+1-1eff, U+20a0-20ab, U+20ad-20cf, U+2c60-2c7f,
      U+A720-A7FF;
  }
`;

export { webfonts as globalStyles };