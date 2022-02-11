/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import IndexPage from '.';
import { AppContext } from '../contexts/AppContext';
import ViewType from '../types/ViewType';

export const CatchAllPage = () => {
  const router = useRouter();
  const { view } = router.query;
  const { setViewType } = useContext(AppContext);

  useEffect(() => {
    if (view && view.length > 0) {
      var found = false;
      for (let key in ViewType) {
        if (ViewType[key] === view[0].toLowerCase()) {
          setViewType(ViewType[key]);
          found = true;
          break;
        }
      }
      if (!found) {
        router.push('/');
      }
    }
  }, [view]);

  return (
    <IndexPage />
  )
}

export default CatchAllPage;