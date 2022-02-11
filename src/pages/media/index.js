import { useContext, useEffect } from 'react';
import IndexPage from '..';
import { AppContext } from '../../contexts/AppContext';
import ViewType from '../../types/ViewType';

export const MediaPage = () => {
  const { setViewType } = useContext(AppContext);
  useEffect(() => {
    setViewType(ViewType.MEDIA);
  }, [setViewType]);

  return (
    <IndexPage />
  )
}

export default MediaPage;