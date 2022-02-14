import { useCallback, useContext, useEffect, useState } from 'react';
import { get, last } from 'lodash';
import MediaBrowser from '../../components/mediabrowser/MediaBrowser';
import Wrapper from '../../components/wrapper/Wrapper';
import { AppContext } from '../../contexts/AppContext';
import ViewType from '../../types/ViewType';
import { useMediaList } from '../effects/media';

export const MediaPage = () => {
  const { setViewType } = useContext(AppContext);
  const [mediaPath, setMediaPath] = useState([{ id: null, name: 'My Media' }]);
  useEffect(() => {
    setViewType(ViewType.MEDIA);
  }, [setViewType]);

  // TODO: Fetch folders and files list
  const mediaList = useMediaList(get(last(mediaPath), 'id'));

  const handleGotoSubFolder = useCallback(
    (id) => {
      // Check if parent folder exists
      const parentIndex = mediaPath.findIndex((item) => item.id === id);
      if (parentIndex !== -1) {
        setMediaPath(mediaPath.slice(0, parentIndex + 1));
        return;
      }

      // Check if subfolder exsits
      const matchedSubfolder = mediaList.find((item) => item.id === id);
      setMediaPath([
        ...mediaPath,
        {
          id,
          name: matchedSubfolder?.name || 'Unknown Media',
        },
      ]);
    },
    [mediaList, mediaPath]
  );

  return (
    <Wrapper>
      <MediaBrowser
        mediaPath={mediaPath}
        data={mediaList}
        onGotoSubFolder={handleGotoSubFolder}
      ></MediaBrowser>
    </Wrapper>
  );
};

export default MediaPage;
