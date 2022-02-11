import { createContext } from 'react';
import useMedia from '../hooks/useMedia';

export const DeviceContext = createContext();

const DeviceProvider = ({ children }) => {
  const isDesktop = useMedia('(hover: hover)');
  const isTouch = !isDesktop;

  const isLandscape = useMedia('(orientation: landscape)');
  const isPortrait = useMedia('(orientation: portrait)');

  const isXSmall = useMedia('(max-width: 600px)');
  const isSmall = useMedia('(min-width: 600px)');
  const isMedium = useMedia('(min-width: 768px)');
  const isLarge = useMedia('(min-width: 992px)');
  const isXLarge = useMedia('(min-width: 1200px)');

  const isMobile = (isSmall || isXSmall) && isTouch;
  const isTablet = isMedium && isTouch;

  return (
    <DeviceContext.Provider value={{
      isDesktop, isTouch,
      isLandscape, isPortrait,
      isXSmall, isSmall, isMedium, isLarge, isXLarge,
      isMobile, isTablet
    }}>
      {children}
    </DeviceContext.Provider>
  );
}

export default DeviceProvider;
